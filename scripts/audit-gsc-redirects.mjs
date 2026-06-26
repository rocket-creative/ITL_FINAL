#!/usr/bin/env node
/**
 * Audit redirect sources from a GSC CSV export.
 * Usage: node scripts/audit-gsc-redirects.mjs [csvPath] [baseUrl]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const csvPath = process.argv[2] || path.join(root, 'GSC_Redirect_Failures.csv');
const baseUrl = (process.argv[3] || 'https://www.genetargeting.com').replace(/\/$/, '');

function rootDir() {
  return root;
}

function parseCsvUrls(content) {
  const lines = content.split(/\r?\n/).slice(1);
  const urls = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const col = line.split(',')[0]?.trim().replace(/^"|"$/g, '');
    if (!col) continue;
    if (col.startsWith('http')) {
      try {
        urls.push(new URL(col).pathname.replace(/\/$/, '') || '/');
      } catch {
        urls.push(col);
      }
    } else {
      urls.push(col.startsWith('/') ? col.replace(/\/$/, '') || '/' : `/${col}`);
    }
  }
  return [...new Set(urls)];
}

if (!fs.existsSync(csvPath)) {
  console.error(`CSV not found: ${csvPath}`);
  console.error('Export "Page with redirect — FAILED" URLs from GSC and pass the file path.');
  process.exit(1);
}

const sources = parseCsvUrls(fs.readFileSync(csvPath, 'utf8'));
console.log(`Testing ${sources.length} source URLs against ${baseUrl}\n`);

const groups = {
  ok: [],
  loop: [],
  notFound: [],
  chain: [],
  badStatus: [],
  error: [],
};

for (const source of sources) {
  const url = `${baseUrl}${source === '/' ? '/' : `${source}/`}`;
  try {
    let current = url;
    const hops = [];
    for (let i = 0; i < 5; i++) {
      const res = await fetch(current, { redirect: 'manual' });
      hops.push({ url: current, status: res.status });
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get('location');
        if (!loc) break;
        current = loc.startsWith('http') ? loc : `${baseUrl}${loc.startsWith('/') ? loc : `/${loc}`}`;
        continue;
      }
      if (res.status === 404) {
        groups.notFound.push({ source, hops });
      } else if (res.status >= 400) {
        groups.badStatus.push({ source, hops, status: res.status });
      } else if (hops.length > 2) {
        groups.chain.push({ source, hops });
      } else {
        groups.ok.push(source);
      }
      break;
    }
    if (hops.length >= 5) groups.loop.push({ source, hops });
  } catch (err) {
    groups.error.push({ source, error: err.message });
  }
}

for (const [name, items] of Object.entries(groups)) {
  if (items.length) console.log(`${name}: ${items.length}`);
}
console.log('\nSample failures:');
for (const item of [...groups.notFound, ...groups.chain, ...groups.badStatus].slice(0, 10)) {
  console.log(JSON.stringify(item, null, 2));
}
