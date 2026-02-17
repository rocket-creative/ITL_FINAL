#!/usr/bin/env node
/**
 * Full sync of publications from master list (publications.md) to publicationsData.ts
 * Run: node scripts/sync-publications.js
 */

const fs = require('fs');
const path = require('path');

const MASTER_PATH = path.join(process.env.HOME || '', 'Downloads', 'publications.md');
const DATA_PATH = path.join(__dirname, '..', 'src', 'app', 'publications', 'publicationsData.ts');

// Extract existing links from publicationsData.ts
function getExistingLinks(dataContent) {
  const links = new Set();
  const linkRegex = /link:\s*["'](https?:\/\/[^"']+)["']/g;
  let m;
  while ((m = linkRegex.exec(dataContent)) !== null) {
    links.add(m[1].replace(/\/$/, ''));
  }
  // Also extract by PMID for matching
  const pmidRegex = /pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/g;
  while ((m = pmidRegex.exec(dataContent)) !== null) {
    links.add(`https://pubmed.ncbi.nlm.nih.gov/${m[1]}`);
  }
  return links;
}

// Improve journal/volume parsing - split on volume pattern
function parseJournalVolume(rest) {
  const s = rest.trim();
  if (!s) return { journal: 'Unknown', volume: '' };
  // Match volume at end: "24(9): e185299", "16(1): 9846", "Online ahead of print", "2(36)"
  const volMatch = s.match(/(\d+\(\d+\)[:\s]*[\d.e\-a-zA-Z]+|Online ahead of print)\s*$/i);
  if (volMatch) {
    const vol = volMatch[1].trim();
    const journal = s.substring(0, s.length - volMatch[0].length).trim().replace(/\s+/g, ' ');
    return { journal: journal || 'Unknown', volume: vol };
  }
  // Try "vkaf224" style
  const altMatch = s.match(/\s+([a-z]+\d+)\s*$/i);
  if (altMatch) {
    const vol = altMatch[1];
    const journal = s.substring(0, s.length - altMatch[0].length).trim();
    return { journal: journal || 'Unknown', volume: vol };
  }
  return { journal: s.replace(/\s+/g, ' '), volume: '' };
}

// Enhanced parser with better journal/volume
function parseMasterFull(content) {
  const byYear = {};
  let currentYear = null;
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const yearH2 = line.match(/^## (\d{4}) Publications/);
    if (yearH2) {
      currentYear = yearH2[1];
      byYear[currentYear] = byYear[currentYear] || [];
      continue;
    }

    const entry = line.match(/^\d+\.\s+(.+?)\.\s+(\d{4})\.\s+\[([^\]]+)\]\(([^)]+)\)\.?\s*(.*)$/);
    if (entry && currentYear) {
      const [, authors, year, title, link, rest] = entry;
      const { journal, volume } = parseJournalVolume(rest);

      let normLink = link;
      const pmid = link.match(/(?:pubmed\.ncbi\.nlm\.nih\.gov|ncbi\.nlm\.nih\.gov\/pubmed)\/(\d+)/);
      if (pmid) normLink = `https://pubmed.ncbi.nlm.nih.gov/${pmid[1]}/`;

      byYear[currentYear].push({
        authors: (authors.trim().endsWith('.') ? authors.trim() : authors.trim() + '.'),
        year: parseInt(year, 10),
        title: title.trim(),
        journal,
        volume,
        link: normLink,
      });
    }
  }
  return byYear;
}

function escapeTS(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

function generateTSFile(byYear) {
  const header = `/**
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

  const years = Object.keys(byYear).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  const parts = [header];

  for (const year of years) {
    parts.push(`  "${year}": [\n`);
    const pubs = byYear[year];
    for (let i = 0; i < pubs.length; i++) {
      const p = pubs[i];
      const vol = p.volume ? `"${escapeTS(p.volume)}"` : '""';
      parts.push(`    {
      authors: "${escapeTS(p.authors)}",
      year: ${p.year},
      title: "${escapeTS(p.title)}",
      journal: "${escapeTS(p.journal)}",
      volume: ${vol},
      link: "${p.link}"
    }${i < pubs.length - 1 ? ',' : ''}\n`);
    }
    parts.push(`  ]${years.indexOf(year) < years.length - 1 ? ',' : ''}\n`);
  }

  parts.push('};\n');
  return parts.join('');
}

function main() {
  const doMerge = process.argv.includes('--merge');
  const doFull = process.argv.includes('--full') || !doMerge;

  if (!fs.existsSync(MASTER_PATH)) {
    console.error('Master file not found:', MASTER_PATH);
    process.exit(1);
  }

  const masterContent = fs.readFileSync(MASTER_PATH, 'utf8');
  const masterByYear = parseMasterFull(masterContent);

  const years = Object.keys(masterByYear).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  const totalPubs = Object.values(masterByYear).flat().length;

  console.log(`Master: ${years.length} years, ${totalPubs} total publications`);

  if (doFull) {
    const tsContent = generateTSFile(masterByYear);
    fs.writeFileSync(DATA_PATH, tsContent);
    console.log(`Regenerated ${DATA_PATH} with ${totalPubs} publications`);
    return;
  }

  // Merge mode: add only missing
  const dataContent = fs.readFileSync(DATA_PATH, 'utf8');
  const existingLinks = getExistingLinks(dataContent);
  const missing = [];

  for (const year of years) {
    for (const pub of masterByYear[year]) {
      const normalized = pub.link.replace(/\/$/, '');
      const exists = existingLinks.has(normalized) || existingLinks.has(normalized + '/');
      if (!exists) missing.push({ year, pub });
    }
  }

  console.log(`Missing: ${missing.length} publications`);
  if (missing.length === 0) {
    console.log('Already in sync!');
    return;
  }

  fs.writeFileSync(
    path.join(__dirname, '..', 'missing-publications.json'),
    JSON.stringify(missing.reduce((a, { year, pub }) => {
      (a[year] = a[year] || []).push(pub);
      return a;
    }, {}), null, 2)
  );
  console.log('Wrote missing-publications.json. Run with --full to regenerate from master.');
}

main();
