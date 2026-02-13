#!/usr/bin/env node

/**
 * Google Indexing API Script
 * Submits URLs to Google for indexing
 * 
 * SETUP:
 * 1. Go to https://console.cloud.google.com
 * 2. Create a new project (or select existing)
 * 3. Enable "Indexing API" (search for it in APIs & Services)
 * 4. Create Service Account: APIs & Services → Credentials → Create Credentials → Service Account
 * 5. Download JSON key file, save as: scripts/google-service-account.json
 * 6. Copy the service account email (e.g., name@project.iam.gserviceaccount.com)
 * 7. Go to Google Search Console → Settings → Users and permissions
 * 8. Add the service account email as "Owner"
 * 
 * USAGE:
 *   node scripts/google-indexing.js              # Submit all URLs from sitemap
 *   node scripts/google-indexing.js --test       # Test with just homepage
 *   node scripts/google-indexing.js --url URL    # Submit single URL
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.genetargeting.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'google-service-account.json');

// Rate limiting: Google allows 200 requests per day
const RATE_LIMIT_DELAY_MS = 1000; // 1 second between requests
const MAX_REQUESTS_PER_RUN = 200;

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load service account credentials
 */
function loadCredentials() {
  if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    log('red', '\n❌ Service account file not found!');
    log('yellow', `\nExpected location: ${SERVICE_ACCOUNT_FILE}`);
    log('blue', '\nSetup instructions:');
    console.log('1. Go to https://console.cloud.google.com');
    console.log('2. Create/select a project');
    console.log('3. Enable "Indexing API"');
    console.log('4. Create Service Account credentials');
    console.log('5. Download JSON key file');
    console.log(`6. Save it as: ${SERVICE_ACCOUNT_FILE}`);
    console.log('7. Add service account email to Search Console as Owner');
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log('red', `\n❌ Error reading service account file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Create JWT for Google API authentication
 */
function createJWT(credentials) {
  const crypto = require('crypto');
  
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signatureInput = `${base64Header}.${base64Payload}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signatureInput);
  const signature = sign.sign(credentials.private_key, 'base64url');

  return `${signatureInput}.${signature}`;
}

/**
 * Get access token from Google
 */
async function getAccessToken(credentials) {
  const jwt = createJWT(credentials);

  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString();

    const options = {
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.access_token) {
            resolve(response.access_token);
          } else {
            reject(new Error(response.error_description || 'Failed to get access token'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Submit URL to Google Indexing API
 */
async function submitUrl(url, accessToken, type = 'URL_UPDATED') {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      type: type, // URL_UPDATED or URL_DELETED
    });

    const options = {
      hostname: 'indexing.googleapis.com',
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve({ success: true, url, response });
          } else {
            resolve({ success: false, url, error: response.error?.message || data });
          }
        } catch (e) {
          resolve({ success: false, url, error: data });
        }
      });
    });

    req.on('error', (e) => resolve({ success: false, url, error: e.message }));
    req.write(postData);
    req.end();
  });
}

/**
 * Fetch sitemap and extract URLs
 */
async function getUrlsFromSitemap() {
  return new Promise((resolve, reject) => {
    https.get(SITEMAP_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        // Extract URLs from sitemap XML
        const urlRegex = /<loc>(.*?)<\/loc>/g;
        const urls = [];
        let match;
        while ((match = urlRegex.exec(data)) !== null) {
          urls.push(match[1]);
        }
        resolve(urls);
      });
    }).on('error', reject);
  });
}

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const isTest = args.includes('--test');
  const singleUrlIndex = args.indexOf('--url');
  const singleUrl = singleUrlIndex !== -1 ? args[singleUrlIndex + 1] : null;

  log('blue', '\n🔍 Google Indexing API Script\n');

  // Load credentials
  log('yellow', '📁 Loading service account credentials...');
  const credentials = loadCredentials();
  log('green', `✓ Loaded credentials for: ${credentials.client_email}\n`);

  // Get access token
  log('yellow', '🔑 Getting access token...');
  let accessToken;
  try {
    accessToken = await getAccessToken(credentials);
    log('green', '✓ Access token obtained\n');
  } catch (error) {
    log('red', `❌ Failed to get access token: ${error.message}`);
    process.exit(1);
  }

  // Determine URLs to submit
  let urls = [];
  
  if (singleUrl) {
    urls = [singleUrl];
    log('blue', `📝 Submitting single URL: ${singleUrl}\n`);
  } else if (isTest) {
    urls = [SITE_URL];
    log('blue', `🧪 Test mode: Submitting homepage only\n`);
  } else {
    log('yellow', '📥 Fetching URLs from sitemap...');
    try {
      urls = await getUrlsFromSitemap();
      log('green', `✓ Found ${urls.length} URLs in sitemap\n`);
    } catch (error) {
      log('red', `❌ Failed to fetch sitemap: ${error.message}`);
      process.exit(1);
    }
  }

  // Limit URLs
  if (urls.length > MAX_REQUESTS_PER_RUN) {
    log('yellow', `⚠️  Limiting to ${MAX_REQUESTS_PER_RUN} URLs (API daily limit)\n`);
    urls = urls.slice(0, MAX_REQUESTS_PER_RUN);
  }

  // Submit URLs
  log('blue', '🚀 Submitting URLs to Google Indexing API...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const progress = `[${i + 1}/${urls.length}]`;
    
    const result = await submitUrl(url, accessToken);
    
    if (result.success) {
      log('green', `${progress} ✓ ${url}`);
      successCount++;
    } else {
      log('red', `${progress} ✗ ${url}`);
      console.log(`    Error: ${result.error}`);
      failCount++;
    }

    // Rate limiting
    if (i < urls.length - 1) {
      await sleep(RATE_LIMIT_DELAY_MS);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  log('blue', '\n📊 Summary:');
  log('green', `   ✓ Successful: ${successCount}`);
  if (failCount > 0) {
    log('red', `   ✗ Failed: ${failCount}`);
  }
  console.log(`   Total: ${urls.length}\n`);

  if (successCount > 0) {
    log('green', '🎉 URLs submitted! Google will crawl them soon (usually within 24-48 hours).\n');
  }
}

// Run
main().catch((error) => {
  log('red', `\n❌ Error: ${error.message}`);
  process.exit(1);
});
