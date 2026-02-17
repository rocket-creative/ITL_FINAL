#!/usr/bin/env node
/**
 * Script to parse master publications.md and generate publicationsData.ts
 * This ensures the website exactly matches the verified ITL master list.
 */

const fs = require('fs');
const path = require('path');

// Input and output paths
const INPUT_FILE = process.argv[2] || '/Users/rocketcreative/Downloads/publications.md';
const OUTPUT_FILE = path.join(__dirname, '../src/app/publications/publicationsData.ts');

// Read the markdown file
const markdown = fs.readFileSync(INPUT_FILE, 'utf8');

// Parse publications by year
const publicationsByYear = {};
let currentYear = null;

// Split by lines for easier parsing
const lines = markdown.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Check for year heading: ## 2025 Publications (21)
  const yearMatch = line.match(/^##\s+(\d{4})\s+Publications/);
  if (yearMatch) {
    currentYear = yearMatch[1];
    publicationsByYear[currentYear] = [];
    continue;
  }
  
  // Check for publication entry: starts with number followed by period
  const pubMatch = line.match(/^(\d+)\.\s+(.+)/);
  if (pubMatch && currentYear) {
    const content = pubMatch[2];
    
    // Parse the publication
    const publication = parsePublication(content, parseInt(currentYear));
    if (publication) {
      publicationsByYear[currentYear].push(publication);
    }
  }
}

/**
 * Parse a single publication line
 * Format: Authors. Year. [Title](URL). Journal Volume: Pages.
 */
function parsePublication(content, year) {
  // Find the markdown link - look for ](http pattern to find the URL start
  // This handles titles with brackets like [a] in chemical names
  
  // Strategy: find the last ]( followed by http which indicates the real link
  let linkStart = -1;
  let linkEnd = -1;
  let titleStart = -1;
  
  // Find pattern: [Title](URL) where URL starts with http
  // We need to find the [ that starts the title, not any [] inside the title
  
  // First, find all occurrences of ](http
  const linkPattern = /\]\(https?:\/\/[^)]+\)/g;
  let lastMatch = null;
  let match;
  
  while ((match = linkPattern.exec(content)) !== null) {
    lastMatch = match;
  }
  
  if (!lastMatch) {
    console.warn(`No link found in: ${content.substring(0, 100)}...`);
    return null;
  }
  
  // Now find the opening [ for this link by searching backwards
  const urlStartPos = lastMatch.index;
  let bracketCount = 0;
  let titleStartPos = -1;
  
  // The pattern is [Title](URL)
  // We need to find the [ that matches the ] at urlStartPos
  
  // Search backwards from the ] position to find matching [
  for (let i = urlStartPos; i >= 0; i--) {
    if (content[i] === ']') {
      bracketCount++;
    } else if (content[i] === '[') {
      bracketCount--;
      if (bracketCount === 0) {
        titleStartPos = i;
        break;
      }
    }
  }
  
  if (titleStartPos === -1) {
    console.warn(`Could not find title start in: ${content.substring(0, 100)}...`);
    return null;
  }
  
  // Extract components
  const beforeLink = content.substring(0, titleStartPos);
  const title = content.substring(titleStartPos + 1, urlStartPos);
  
  // Extract URL - between ( and )
  const urlMatch = content.substring(urlStartPos).match(/\]\((https?:\/\/[^)]+)\)/);
  const link = urlMatch ? urlMatch[1] : '';
  
  // Get after link content
  const urlEndPos = urlStartPos + urlMatch[0].length;
  const afterLink = content.substring(urlEndPos).trim();
  
  // Parse authors - everything before the year in beforeLink
  // Format: "Authors. Year. "
  const yearPattern = new RegExp(`\\s*${year}\\.?\\s*$`);
  let authors = beforeLink.replace(yearPattern, '').trim();
  
  // Ensure authors ends with period
  if (!authors.endsWith('.')) {
    authors = authors + '.';
  }
  
  // Parse journal and volume from afterLink
  // Format: ". Journal Volume: Pages." or similar
  let journal = '';
  let volume = '';
  
  // Remove leading punctuation
  let journalVolume = afterLink.replace(/^[\.\,\s]+/, '').trim();
  
  if (journalVolume) {
    // Pattern: Journal Volume(Issue): Pages or just Journal Name
    // Try to split on volume pattern
    
    // Look for volume patterns like: 15(1): 123 or 15: 123-145 or Online ahead of print
    const volumePatterns = [
      // Pattern: Journal Name Volume(Issue): Pages
      /^(.+?)\s+(\d+\([^)]+\):\s*\S+.*)$/,
      // Pattern: Journal Name Volume: Pages  
      /^(.+?)\s+(\d+:\s*\d+.*)$/,
      // Pattern: Journal Name. Volume(Issue): Pages (with period separator)
      /^(.+?)\.\s*(\d+\([^)]+\):\s*\S+.*)$/,
      // Pattern: Journal Volume(Issue): Pages (no separator)
      /^(.+?)(\d+\([^)]+\):\s*\S+.*)$/,
    ];
    
    let matched = false;
    
    for (const pattern of volumePatterns) {
      const m = journalVolume.match(pattern);
      if (m) {
        journal = m[1].replace(/[\.\,]+$/, '').trim();
        volume = m[2].replace(/[\.\,]+$/, '').trim();
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      // Check for special cases
      if (journalVolume.toLowerCase().includes('online ahead of print')) {
        const parts = journalVolume.split(/[\.\,]?\s*Online ahead of print/i);
        journal = parts[0].replace(/[\.\,]+$/, '').trim();
        volume = 'Online ahead of print';
      } else if (journalVolume.toLowerCase().includes('biorxiv')) {
        journal = 'bioRxiv';
        volume = '';
      } else {
        // Everything is journal name or unstructured
        journal = journalVolume.replace(/[\.\,]+$/, '').trim();
        volume = '';
      }
    }
  }
  
  return {
    authors: authors,
    year: year,
    title: title,
    journal: journal || 'Unknown',
    volume: volume,
    link: link
  };
}

/**
 * Generate TypeScript file content
 */
function generateTypeScript(pubsByYear) {
  const years = Object.keys(pubsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  let content = `/**
 * Publications Data for ingenious targeting laboratory
 * 
 * HOW TO UPDATE:
 * 1. Add new publications to the beginning of the appropriate year array
 * 2. If adding a new year, create a new entry at the top of the publicationsByYear object
 * 3. Each publication should have: authors, year, title, journal, volume/issue info, link
 * 
 * FORMAT:
 * {
 *   authors: "Author A, Author B, Author C.",
 *   year: 2025,
 *   title: "Publication title here.",
 *   journal: "Journal Name",
 *   volume: "Volume(Issue): Pages", // or "Online ahead of print"
 *   link: "https://pubmed.ncbi.nlm.nih.gov/xxxxx/"
 * }
 * 
 * GENERATED FROM MASTER LIST: ${new Date().toISOString().split('T')[0]}
 * Source: /Users/rocketcreative/Downloads/publications.md
 */

export interface Publication {
  authors: string;
  year: number;
  title: string;
  journal: string;
  volume: string;
  link?: string; // PubMed or other article URL
}

export interface PublicationsByYear {
  [year: string]: Publication[];
}

export const publicationsByYear: PublicationsByYear = {
`;

  for (const year of years) {
    const pubs = pubsByYear[year];
    content += `  "${year}": [\n`;
    
    for (let i = 0; i < pubs.length; i++) {
      const pub = pubs[i];
      const isLast = i === pubs.length - 1;
      
      // Escape special characters in strings
      const escapeStr = (str) => {
        if (!str) return '';
        return str
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n');
      };
      
      content += `    {\n`;
      content += `      authors: "${escapeStr(pub.authors)}",\n`;
      content += `      year: ${pub.year},\n`;
      content += `      title: "${escapeStr(pub.title)}",\n`;
      content += `      journal: "${escapeStr(pub.journal)}",\n`;
      content += `      volume: "${escapeStr(pub.volume)}",\n`;
      content += `      link: "${escapeStr(pub.link)}"\n`;
      content += `    }${isLast ? '' : ','}\n`;
    }
    
    content += `  ],\n`;
  }

  content += `};

// Helper functions
export function getAllPublications(): Publication[] {
  return Object.values(publicationsByYear).flat();
}

export function getPublicationsByYear(year: string): Publication[] {
  return publicationsByYear[year] || [];
}

export function getYears(): string[] {
  return Object.keys(publicationsByYear).sort((a, b) => parseInt(b) - parseInt(a));
}

export function getTotalPublications(): number {
  return getAllPublications().length;
}
`;

  return content;
}

// Generate and write the file
const tsContent = generateTypeScript(publicationsByYear);
fs.writeFileSync(OUTPUT_FILE, tsContent);

// Print summary
const totalPubs = Object.values(publicationsByYear).reduce((sum, arr) => sum + arr.length, 0);
console.log('=== Publication Sync Complete ===');
console.log(`Total years: ${Object.keys(publicationsByYear).length}`);
console.log(`Total publications: ${totalPubs}`);
console.log('\nPublications per year:');
Object.keys(publicationsByYear)
  .sort((a, b) => parseInt(b) - parseInt(a))
  .forEach(year => {
    console.log(`  ${year}: ${publicationsByYear[year].length}`);
  });
console.log(`\nOutput: ${OUTPUT_FILE}`);
