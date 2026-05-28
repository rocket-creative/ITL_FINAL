/**
 * Audit app pages for catalog + custom dual path CTA coverage.
 * Run: npx tsx scripts/audit-cta-coverage.ts
 */

import fs from 'fs';
import path from 'path';

const APP_ROOT = path.join(process.cwd(), 'src/app');

const EXCLUDED = new Set([
  'request-quote',
  'contact',
  'thank-you',
  'schedule-meeting/thank-you',
  'order-catalog-models/thank-you',
]);

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === 'page.tsx') acc.push(full);
  }
  return acc;
}

function routeFromFile(file: string): string {
  const rel = path.relative(APP_ROOT, path.dirname(file));
  return rel === '' ? '/' : `/${rel}`;
}

function isExcluded(route: string): boolean {
  if (EXCLUDED.has(route.replace(/^\//, ''))) return true;
  if (route.includes('thank-you')) return true;
  return false;
}

interface Row {
  route: string;
  file: string;
  hasQuote: boolean;
  hasCatalog: boolean;
  hasDualComponent: boolean;
  duplicateQuoteOnly: boolean;
}

const pages = walk(APP_ROOT);
const rows: Row[] = [];

for (const file of pages) {
  const route = routeFromFile(file);
  if (isExcluded(route)) continue;

  const src = fs.readFileSync(file, 'utf8');
  const hasQuote = /request-quote/.test(src);
  const hasCatalog =
    /all-catalog-mouse-models|catalog-mouse-models|CatalogCustomCtaButtons|PageClosingCta/.test(
      src,
    );
  const hasDualComponent = /CatalogCustomCtaButtons|PageClosingCta/.test(src);
  const duplicateQuoteOnly =
    /Free Consultation[\s\S]{0,400}request-quote[\s\S]{0,400}Request a Quote|Request a Quote[\s\S]{0,400}request-quote[\s\S]{0,400}Free Consultation/.test(
      src,
    );

  rows.push({
    route,
    file: path.relative(process.cwd(), file),
    hasQuote,
    hasCatalog,
    hasDualComponent,
    duplicateQuoteOnly,
  });
}

const missingCatalog = rows.filter((r) => r.hasQuote && !r.hasCatalog);
const missingDual = rows.filter((r) => r.hasQuote && !r.hasDualComponent && !r.hasCatalog);
const dupQuote = rows.filter((r) => r.duplicateQuoteOnly);

console.log('\n=== CTA coverage audit ===\n');
console.log(`Pages scanned: ${rows.length}`);
console.log(`Missing catalog path: ${missingCatalog.length}`);
console.log(`Duplicate quote-only footer: ${dupQuote.length}`);
console.log(`Using shared dual components: ${rows.filter((r) => r.hasDualComponent).length}\n`);

if (missingCatalog.length > 0) {
  console.log('--- Missing catalog (has request-quote, no catalog) ---');
  for (const r of missingCatalog) {
    console.log(`  ${r.route}  (${r.file})`);
  }
}

if (dupQuote.length > 0) {
  console.log('\n--- Duplicate quote-only closing CTAs ---');
  for (const r of dupQuote) {
    console.log(`  ${r.route}`);
  }
}

process.exit(missingCatalog.length > 0 ? 1 : 0);
