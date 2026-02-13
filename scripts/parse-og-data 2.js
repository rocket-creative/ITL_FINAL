/**
 * Script to parse OG-IMAGE-GUIDE.md and generate the full ogImageConfig.ts
 * Run with: node scripts/parse-og-data.js
 */

const fs = require('fs');
const path = require('path');

// Read the guide file
const guidePath = path.join(__dirname, '..', 'OG-IMAGE-GUIDE.md');
const content = fs.readFileSync(guidePath, 'utf-8');

// Parse the content
const lines = content.split('\n');
const pages = [];

let currentPage = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Match URL lines
  if (line.startsWith('- URL: ')) {
    const url = line.replace('- URL: ', '').replace(/`/g, '').trim();
    if (currentPage) {
      pages.push(currentPage);
    }
    currentPage = { url };
  }
  
  // Match OG Text lines
  if (line.startsWith('- OG Text: ') && currentPage) {
    const ogText = line.replace('- OG Text: ', '').replace(/"/g, '').trim();
    currentPage.ogText = ogText;
  }
  
  // Match Priority lines
  if (line.includes('Priority: TIER') && currentPage) {
    if (line.includes('TIER 1')) currentPage.tier = 1;
    else if (line.includes('TIER 2')) currentPage.tier = 2;
    else currentPage.tier = 3;
  }
}

// Add last page
if (currentPage) {
  pages.push(currentPage);
}

console.log(`Parsed ${pages.length} pages`);

// Split OG text into 3 lines
function splitOGText(text) {
  const parts = text.split('|').map(p => p.trim());
  
  if (parts.length === 1) {
    // Single text, use as line 1, create generic line 2 and 3
    return {
      line1: parts[0],
      line2: 'Expert Gene Targeting',
      line3: 'Since 1998'
    };
  } else if (parts.length === 2) {
    return {
      line1: parts[0],
      line2: parts[1],
      line3: 'Learn More'
    };
  } else {
    return {
      line1: parts[0],
      line2: parts[1],
      line3: parts[2] || 'Explore Our Solutions'
    };
  }
}

// Generate TypeScript config
let tsContent = `/**
 * OG Image Configuration
 * Auto-generated from OG-IMAGE-GUIDE.md
 * Contains all 156 pages
 */

export interface OGImageConfig {
  slug: string;
  line1: string;
  line2: string;
  line3: string;
  tier: 1 | 2 | 3;
}

export const OG_IMAGE_DATA: Record<string, OGImageConfig> = {
`;

pages.forEach(page => {
  if (!page.ogText) return;
  
  const lines = splitOGText(page.ogText);
  const slug = page.url.replace('/', '') || 'homepage';
  
  tsContent += `  '${page.url}': {
    slug: '${slug}',
    line1: '${lines.line1.replace(/'/g, "\\'")}',
    line2: '${lines.line2.replace(/'/g, "\\'")}',
    line3: '${lines.line3.replace(/'/g, "\\'")}',
    tier: ${page.tier || 2},
  },
`;
});

tsContent += `};

/**
 * Get OG image configuration for a given path
 */
export function getOGImageConfig(path: string): OGImageConfig | null {
  return OG_IMAGE_DATA[path] || null;
}

/**
 * Get all OG image configurations
 */
export function getAllOGImageConfigs(): OGImageConfig[] {
  return Object.values(OG_IMAGE_DATA);
}

/**
 * Get OG image URL for a given path
 */
export function getOGImageURL(path: string, baseUrl: string = 'https://www.genetargeting.com'): string {
  const config = getOGImageConfig(path);
  if (!config) return \`\${baseUrl}/images/og/default-og.png\`;
  
  const params = new URLSearchParams({
    line1: config.line1,
    line2: config.line2,
    line3: config.line3,
  });
  
  return \`\${baseUrl}/api/og?\${params.toString()}\`;
}
`;

// Write the file
const outputPath = path.join(__dirname, '..', 'src', 'data', 'ogImageConfig.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`✅ Generated ${outputPath}`);
console.log(`✅ Total pages: ${pages.length}`);
