#!/usr/bin/env node

/**
 * Export Page Metadata for Google Ads
 * 
 * This script extracts metadata from all pages and exports it to CSV format
 * for use with Google Ads Editor bulk upload.
 * 
 * Usage:
 *   node scripts/export-metadata-for-ads.js
 * 
 * Output:
 *   - ads-metadata-export.csv (Google Ads format)
 *   - ads-metadata-export.json (full data for reference)
 * 
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://www.genetargeting.com';
const APP_DIR = path.join(__dirname, '..', 'src', 'app');
const OUTPUT_DIR = path.join(__dirname, '..', 'exports');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract metadata values from a metadata.ts file
 */
function extractMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const title = titleMatch ? titleMatch[1] : null;
    
    // Extract description
    const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
    const description = descMatch ? descMatch[1] : null;
    
    // Extract path
    const pathMatch = content.match(/path:\s*['"`]([^'"`]+)['"`]/);
    const urlPath = pathMatch ? pathMatch[1] : null;
    
    // Extract breadcrumb category (if available)
    const breadcrumbMatch = content.match(/name:\s*['"`]([^'"`]+)['"`],\s*path:\s*['"`]\/([^'"`]+)['"`]/g);
    let category = 'General';
    if (breadcrumbMatch && breadcrumbMatch.length > 1) {
      const secondCrumb = breadcrumbMatch[1];
      const catMatch = secondCrumb.match(/name:\s*['"`]([^'"`]+)['"`]/);
      if (catMatch) {
        category = catMatch[1];
      }
    }
    
    if (!title || !description || !urlPath) {
      return null;
    }
    
    return {
      title,
      description,
      path: urlPath,
      fullUrl: `${BASE_URL}${urlPath}`,
      category,
      // Generate ad copy variations
      headline1: truncate(title, 30),
      headline2: truncate(extractBenefit(description), 30),
      headline3: 'Request a Quote',
      description1: truncate(description, 90),
      description2: 'Custom mouse models since 1998. Expert team. Guaranteed results.',
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Truncate text to max length, preserving word boundaries
 */
function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength - 10) {
    return truncated.substring(0, lastSpace);
  }
  
  return truncated;
}

/**
 * Extract a benefit phrase from description
 */
function extractBenefit(description) {
  if (!description) return 'Expert Mouse Models';
  
  // Common benefit patterns in descriptions
  const patterns = [
    /(\d+\+?\s*years?\s*experience)/i,
    /(\d+,?\d*\+?\s*projects?)/i,
    /(guaranteed\s*\w+)/i,
    /(custom\s*\w+)/i,
    /(expert\s*\w+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  // Return first meaningful phrase
  const firstSentence = description.split('.')[0];
  return truncate(firstSentence, 30);
}

/**
 * Find all metadata.ts files recursively
 */
function findMetadataFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip special directories
      if (!['api', 'components', 'lib', 'node_modules', '.next'].includes(entry.name)) {
        findMetadataFiles(fullPath, files);
      }
    } else if (entry.name === 'metadata.ts') {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Categorize pages for ad groups
 */
function categorize(metadata) {
  const path = metadata.path.toLowerCase();
  const title = metadata.title.toLowerCase();
  
  if (path.includes('knockout')) return 'Knockout Services';
  if (path.includes('knockin')) return 'Knockin Services';
  if (path.includes('humanized')) return 'Humanized Models';
  if (path.includes('cre') || path.includes('flp') || path.includes('rosa26')) return 'Conditional Systems';
  if (path.includes('-services') || path.includes('service')) return 'Services';
  if (path.includes('oncology') || path.includes('cancer') || path.includes('tumor')) return 'Oncology';
  if (path.includes('immuno') || path.includes('immune')) return 'Immunology';
  if (path.includes('neuro') || path.includes('alzheimer') || path.includes('parkinson')) return 'Neuroscience';
  if (path.includes('cardio') || path.includes('heart') || path.includes('atherosclerosis')) return 'Cardiovascular';
  if (path.includes('diabet') || path.includes('metabolic') || path.includes('obesity') || path.includes('nash')) return 'Metabolic';
  if (path.includes('rare-disease')) return 'Rare Disease';
  if (path.includes('mouse-models') || path.includes('-mice')) return 'Disease Models';
  if (path.includes('guide') || path.includes('resource') || path.includes('faq')) return 'Resources';
  
  return 'General';
}

/**
 * Convert to Google Ads CSV format
 */
function toGoogleAdsCSV(allMetadata) {
  const headers = [
    'Campaign',
    'Ad Group',
    'Final URL',
    'Headline 1',
    'Headline 2',
    'Headline 3',
    'Description 1',
    'Description 2',
    'Path 1',
    'Path 2',
  ];
  
  const rows = allMetadata.map(meta => {
    const adGroup = categorize(meta);
    const pathParts = meta.path.replace(/^\//, '').split('/').slice(0, 2);
    
    return [
      'ITL - Dynamic Ads', // Campaign name
      adGroup,
      meta.fullUrl,
      meta.headline1,
      meta.headline2,
      meta.headline3,
      meta.description1,
      meta.description2,
      pathParts[0] || '',
      pathParts[1] || '',
    ];
  });
  
  // Convert to CSV string
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  
  return csvContent;
}

/**
 * Generate keyword suggestions based on metadata
 */
function generateKeywords(metadata) {
  const keywords = [];
  const title = metadata.title.toLowerCase();
  const path = metadata.path.toLowerCase();
  
  // Extract meaningful terms
  const terms = title.split(/[\s|]+/).filter(t => t.length > 3);
  
  // Add phrase match variations
  terms.forEach(term => {
    if (!['mouse', 'models', 'model', 'mice', 'services', 'service'].includes(term)) {
      keywords.push(`"${term} mouse model"`);
      keywords.push(`"${term} mouse"`);
    }
  });
  
  // Add specific combinations
  if (path.includes('knockout')) {
    keywords.push('"knockout mouse"', '"gene knockout"', '"custom knockout mouse"');
  }
  if (path.includes('knockin')) {
    keywords.push('"knockin mouse"', '"gene knockin"', '"custom knockin mouse"');
  }
  if (path.includes('humanized')) {
    keywords.push('"humanized mouse"', '"humanized mouse model"');
  }
  if (path.includes('crispr')) {
    keywords.push('"crispr mouse"', '"crispr mouse model"');
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

// Main execution
console.log('Scanning for metadata files...\n');

const metadataFiles = findMetadataFiles(APP_DIR);
console.log(`Found ${metadataFiles.length} metadata.ts files\n`);

const allMetadata = [];
const errors = [];

metadataFiles.forEach(file => {
  const relativePath = path.relative(APP_DIR, file);
  const metadata = extractMetadata(file);
  
  if (metadata) {
    metadata.sourcePath = relativePath;
    metadata.adGroup = categorize(metadata);
    metadata.keywords = generateKeywords(metadata);
    allMetadata.push(metadata);
    console.log(`✓ ${relativePath}`);
  } else {
    errors.push(relativePath);
    console.log(`✗ ${relativePath} (could not extract metadata)`);
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Processed: ${allMetadata.length} pages`);
console.log(`Errors: ${errors.length} files`);
console.log(`${'='.repeat(50)}\n`);

// Group by ad group for summary
const byAdGroup = {};
allMetadata.forEach(meta => {
  const group = meta.adGroup;
  if (!byAdGroup[group]) byAdGroup[group] = [];
  byAdGroup[group].push(meta);
});

console.log('Pages by Ad Group:');
Object.entries(byAdGroup)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([group, pages]) => {
    console.log(`  ${group}: ${pages.length} pages`);
  });

// Export to CSV
const csvOutput = toGoogleAdsCSV(allMetadata);
const csvPath = path.join(OUTPUT_DIR, 'ads-metadata-export.csv');
fs.writeFileSync(csvPath, csvOutput);
console.log(`\n✓ CSV exported to: ${csvPath}`);

// Export to JSON (full data)
const jsonPath = path.join(OUTPUT_DIR, 'ads-metadata-export.json');
fs.writeFileSync(jsonPath, JSON.stringify({
  exportDate: new Date().toISOString(),
  totalPages: allMetadata.length,
  baseUrl: BASE_URL,
  byAdGroup,
  pages: allMetadata,
}, null, 2));
console.log(`✓ JSON exported to: ${jsonPath}`);

// Generate keyword list
const allKeywords = [...new Set(allMetadata.flatMap(m => m.keywords))];
const keywordsPath = path.join(OUTPUT_DIR, 'suggested-keywords.txt');
fs.writeFileSync(keywordsPath, allKeywords.join('\n'));
console.log(`✓ Keywords exported to: ${keywordsPath}`);

console.log('\n=== EXPORT COMPLETE ===');
console.log('\nNext steps:');
console.log('1. Open Google Ads Editor');
console.log('2. File → Import → From CSV');
console.log(`3. Select: ${csvPath}`);
console.log('4. Review and adjust headlines/descriptions');
console.log('5. Post changes to Google Ads');
console.log('\nFor AdRoll Dynamic Creative:');
console.log('- AdRoll can pull this content directly from your landing pages');
console.log('- Just ensure your metadata is in place (it is!)');
