#!/usr/bin/env node

/**
 * Google Indexing API Submission Script
 * Submits URLs to Google for immediate indexing
 * 
 * Setup Instructions:
 * 1. Go to https://console.cloud.google.com
 * 2. Create project: "ITL Website Indexing"
 * 3. Enable "Indexing API"
 * 4. Create Service Account
 * 5. Download JSON key as service-account-key.json
 * 6. Add service account email to Google Search Console (Settings → Users)
 * 7. Run: npm install googleapis
 * 8. Run: node scripts/submit-to-google.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://www.genetargeting.com';
const SERVICE_ACCOUNT_KEY_PATH = path.join(__dirname, 'service-account-key.json');

// Check if service account key exists
if (!fs.existsSync(SERVICE_ACCOUNT_KEY_PATH)) {
  console.error('❌ Error: service-account-key.json not found!');
  console.log('\nPlease follow setup instructions:');
  console.log('1. Go to https://console.cloud.google.com');
  console.log('2. Create project: "ITL Website Indexing"');
  console.log('3. Enable "Indexing API"');
  console.log('4. Create Service Account');
  console.log('5. Download JSON key as scripts/service-account-key.json');
  console.log('6. Add service account email to Google Search Console');
  process.exit(1);
}

// Load service account credentials
const key = require(SERVICE_ACCOUNT_KEY_PATH);

// Initialize JWT client
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  null
);

// Priority URLs - Top 50 most important pages to index immediately
const priorityUrls = [
  // Core Pages (High Priority)
  '',
  '/request-quote',
  '/contact',
  '/about-itl',
  
  // Main Service Pages
  '/mouse-model-services',
  '/knockout-mouse-models',
  '/conditional-knockout-mouse-models',
  '/conventional-knockout-mouse-models',
  '/knockin-mouse-models',
  '/humanized-mouse-models',
  
  // High-Value Services
  '/custom-mouse-models',
  '/transgenic-mouse-service',
  '/preclinical-services',
  
  // Popular Technology Pages
  '/rosa26',
  '/fast-mice',
  '/cre-lox-system',
  '/gene-replacement',
  
  // Catalog (Revenue Pages)
  '/catalog-mouse-models',
  '/all-catalog-mouse-models',
  '/humanized-immune-checkpoint-mice',
  '/pd1-humanized-mice',
  '/pdl1-humanized-mice',
  '/ctla4-humanized-mice',
  
  // Therapeutic Areas (High Search Volume)
  '/therapeutic-areas',
  '/oncology-mouse-models',
  '/immuno-oncology-mouse-models',
  '/neuroscience-mouse-models',
  '/alzheimers-mouse-models',
  '/parkinsons-mouse-models',
  '/diabetes-mouse-models',
  '/cardiovascular-mouse-models',
  
  // Resources & Guides
  '/resources',
  '/knockout-strategy-guide',
  '/humanization-strategy-guide',
  '/faq',
  
  // Other Important Pages
  '/technologies',
  '/research-applications',
  '/quality-control',
  '/scientific-leadership',
  '/why-choose-itl',
  '/current-openings',
  
  // Specialized Models
  '/point-mutation-mice',
  '/reporter-knockin',
  '/tissue-specific-knockout',
  '/inducible-conditional-knockout',
  
  // Support
  '/support-services',
  '/mouse-genotyping-service',
];

/**
 * Submit a single URL to Google
 */
async function submitUrl(url) {
  const fullUrl = `${DOMAIN}${url}`;
  
  try {
    await jwtClient.authorize();
    
    const indexing = google.indexing('v3');
    const res = await indexing.urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: fullUrl,
        type: 'URL_UPDATED'
      }
    });
    
    console.log(`✓ Submitted: ${fullUrl}`);
    return { success: true, url: fullUrl, data: res.data };
  } catch (error) {
    console.error(`✗ Failed: ${fullUrl}`);
    console.error(`  Error: ${error.message}`);
    return { success: false, url: fullUrl, error: error.message };
  }
}

/**
 * Submit all URLs with rate limiting
 */
async function submitAll() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Google Indexing API - URL Submission');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Domain: ${DOMAIN}`);
  console.log(`Total URLs: ${priorityUrls.length}`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };
  
  for (let i = 0; i < priorityUrls.length; i++) {
    const url = priorityUrls[i];
    console.log(`[${i + 1}/${priorityUrls.length}] Processing...`);
    
    const result = await submitUrl(url);
    
    if (result.success) {
      results.success++;
    } else {
      results.failed++;
      results.errors.push({ url: result.url, error: result.error });
    }
    
    // Rate limiting: 200 requests per minute = ~300ms between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  SUBMISSION SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`✓ Successful: ${results.success}`);
  console.log(`✗ Failed: ${results.failed}`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  if (results.errors.length > 0) {
    console.log('Failed URLs:');
    results.errors.forEach(err => {
      console.log(`  - ${err.url}`);
      console.log(`    ${err.error}`);
    });
    console.log('');
  }
  
  console.log('Next Steps:');
  console.log('1. Check Google Search Console for indexing status');
  console.log('2. Monitor Coverage report for errors');
  console.log('3. Resubmit failed URLs manually if needed');
  console.log('4. Wait 24-48 hours for full indexing');
  console.log('');
}

/**
 * Check status of a URL
 */
async function checkStatus(url) {
  const fullUrl = `${DOMAIN}${url}`;
  
  try {
    await jwtClient.authorize();
    
    const indexing = google.indexing('v3');
    const res = await indexing.urlNotifications.getMetadata({
      auth: jwtClient,
      url: fullUrl
    });
    
    console.log(`Status for ${fullUrl}:`);
    console.log(JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error(`Error checking status: ${error.message}`);
  }
}

// Command line arguments
const args = process.argv.slice(2);

if (args[0] === '--check' && args[1]) {
  // Check status of specific URL
  checkStatus(args[1]);
} else if (args[0] === '--help') {
  console.log('Usage:');
  console.log('  node scripts/submit-to-google.js          Submit all priority URLs');
  console.log('  node scripts/submit-to-google.js --check /page-url   Check status of URL');
  console.log('  node scripts/submit-to-google.js --help   Show this help');
} else {
  // Submit all URLs
  submitAll();
}
