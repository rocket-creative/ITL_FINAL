#!/usr/bin/env node
/**
 * Validates that all redirect destinations return HTTP 200.
 * Usage: node scripts/validate-redirect-destinations.mjs [baseUrl]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const TRUNCATED = [/\/what-is-a-stem-$/, /for-accele$/, /for-custo$/, /trurat-mode$/];

function mergeRedirectRules(primary, supplemental) {
  const bySource = new Map();
  for (const rule of primary) {
    if (rule.source && rule.destination) bySource.set(rule.source, rule);
  }
  for (const rule of supplemental) {
    if (!rule.source || !rule.destination) continue;
    if (TRUNCATED.some((re) => re.test(rule.source))) continue;
    if (!bySource.has(rule.source)) bySource.set(rule.source, rule);
  }
  return [...bySource.values()];
}

const baseUrl = (process.argv[2] || 'https://www.genetargeting.com').replace(/\/$/, '');

const legacy = JSON.parse(
  fs.readFileSync(path.join(root, 'src/lib/legacy/redirects.json'), 'utf8'),
);
const gsc404 = JSON.parse(
  fs.readFileSync(path.join(root, 'src/lib/legacy/404-redirects.json'), 'utf8'),
);

const aliasRedirects = [
  { destination: '/tamoxifen-inducible-cre/' },
  { destination: '/contact/' },
];

const merged = mergeRedirectRules(legacy, gsc404);
const destinations = [...new Set([...merged.map((r) => r.destination), ...aliasRedirects.map((r) => r.destination)])]
  .filter((dest) => !dest.includes(':') && !dest.includes('*'));

console.log(`Checking ${destinations.length} unique destinations against ${baseUrl}\n`);

const failures = [];

for (const dest of destinations) {
  const url = `${baseUrl}${dest.startsWith('/') ? dest : `/${dest}`}`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (res.status >= 400) {
      failures.push({ dest, url, status: res.status });
    } else {
      process.stdout.write('.');
    }
  } catch (err) {
    failures.push({ dest, url, error: err.message });
  }
}

console.log('\n');
if (failures.length === 0) {
  console.log('All destinations returned OK.');
  process.exit(0);
}

console.log(`Failed destinations (${failures.length}):`);
for (const f of failures) {
  console.log(`  ${f.dest} → ${f.url} (${f.status ?? f.error})`);
}
process.exit(1);
