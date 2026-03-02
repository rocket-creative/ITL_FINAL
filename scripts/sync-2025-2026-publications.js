#!/usr/bin/env node
/**
 * Sync 2025 and 2026 publications from ITL markdown format to publicationsData.ts
 * Parses format: Authors. YEAR\. [Title](URL). *Journal.* Volume
 */

const fs = require('fs');
const path = require('path');

const FILE_2025 = '/Users/rocketcreative/Downloads/2025 Publications.md';
const FILE_2026 = '/Users/rocketcreative/Downloads/2026 Publications.md';
const PUBLICATIONS_DATA = path.join(__dirname, '../src/app/publications/publicationsData.ts');

function parsePublicationLine(line, year) {
  line = line.trim();
  if (!line || line.startsWith('**') || line.startsWith('*http') || line.startsWith('[*')) return null;

  // Match: Authors. YEAR\. [Title](URL). *Journal.* Volume
  // Source has literal "2025\. " (backslash-period)
  const yearPattern = new RegExp(`\\s+${year}\\\\.?\\s+\\[`);
  const yearMatch = line.match(yearPattern);
  if (!yearMatch) return null;

  const yearIdx = line.indexOf(yearMatch[0]);
  const beforeYear = line.substring(0, yearIdx);
  const authors = beforeYear.trim();
  if (!authors.endsWith('.')) return null;

  // Extract [Title](URL)
  const linkMatch = line.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
  if (!linkMatch) return null;
  const title = linkMatch[1];
  const link = linkMatch[2];

  // After the link: . *Journal.* Volume
  const afterLink = line.substring(line.indexOf(linkMatch[0]) + linkMatch[0].length).trim();
  let journal = '';
  let volume = '';

  // Match *Journal* or *Journal.*
  const journalMatch = afterLink.match(/\*\*?\s*([^*]+?)\s*\*\*?\.?\s*(.*)$/);
  if (journalMatch) {
    journal = journalMatch[1].trim();
    let rest = journalMatch[2].trim();
    // Clean up volume - remove leading punctuation
    rest = rest.replace(/^[.,\s]+/, '').trim();
    // Handle "**6**(156):" style - extract volume info
    volume = rest || '';
  } else {
    // Fallback: split on . 
    const parts = afterLink.replace(/^\s*[.,]+\s*/, '').split(/\s+\*\*/);
    journal = (parts[0] || '').replace(/^\*\s*|\.\s*$/g, '').trim();
    volume = (parts[1] || '').replace(/\*\s*/g, '').trim();
  }

  // Clean volume: strip markdown ** and trailing \.
  let cleanVolume = (volume || '').replace(/\*\*/g, '').replace(/\\\.\s*$/, '.').trim();

  // Clean journal: strip leading ". " from typos like "*. iScience.*"
  let cleanJournal = (journal || 'Unknown').replace(/^[.\s]+/, '').trim();

  return {
    authors: authors.endsWith('.') ? authors : authors + '.',
    year: parseInt(year),
    title,
    journal: cleanJournal,
    volume: cleanVolume,
    link
  };
}

function parseFile(filePath, year) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const pubs = [];

  for (const line of lines) {
    const pub = parsePublicationLine(line, year);
    if (pub) pubs.push(pub);
  }

  return pubs;
}

function escapeStr(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

function pubToTs(pub) {
  return `    {
      authors: "${escapeStr(pub.authors)}",
      year: ${pub.year},
      title: "${escapeStr(pub.title)}",
      journal: "${escapeStr(pub.journal)}",
      volume: "${escapeStr(pub.volume)}",
      link: "${escapeStr(pub.link)}"
    }`;
}

// Parse both files
const pubs2025 = parseFile(FILE_2025, '2025');
const pubs2026 = parseFile(FILE_2026, '2026');

console.log('Parsed 2025:', pubs2025.length);
console.log('Parsed 2026:', pubs2026.length);

if (pubs2025.length === 0) {
  console.error('No 2025 publications parsed. Check format.');
  process.exit(1);
}

// Read existing publicationsData to get 2024 and older
const content = fs.readFileSync(PUBLICATIONS_DATA, 'utf8');

// Find blocks: replace from first of 2026/2025 through start of 2024
const start2026 = content.indexOf('  "2026": [');
const start2025 = content.indexOf('  "2025": [');
const start2024 = content.indexOf('  "2024": [');

if (start2024 === -1) {
  console.error('Could not find 2024 block in publicationsData.ts');
  process.exit(1);
}

// Start replacing from 2026 if it exists, else from 2025
const startReplace = (start2026 !== -1 && start2026 < start2025) ? start2026 : start2025;

// Build new 2026 and 2025 blocks
let newBlocks = '';
if (pubs2026.length > 0) {
  newBlocks += `  "2026": [\n${pubs2026.map((p, i) => pubToTs(p) + (i < pubs2026.length - 1 ? ',' : '')).join('\n')}\n  ],\n`;
}
newBlocks += `  "2025": [\n${pubs2025.map((p, i) => pubToTs(p) + (i < pubs2025.length - 1 ? ',' : '')).join('\n')}\n  ],\n`;

const beforeReplace = content.substring(0, startReplace);
const from2024 = content.substring(start2024);

const newContent = beforeReplace + newBlocks + from2024;

fs.writeFileSync(PUBLICATIONS_DATA, newContent);

console.log('Updated publicationsData.ts');
console.log('2026:', pubs2026.length, 'publications');
console.log('2025:', pubs2025.length, 'publications');
