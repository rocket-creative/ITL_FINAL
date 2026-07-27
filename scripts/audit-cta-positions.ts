/**
 * Audit app pages for TOP + BOTTOM dual-path CTA coverage.
 * Counts dual-CTA widget instances (direct + wrapper components) per page.
 * Run: npx tsx scripts/audit-cta-positions.ts
 */

import fs from 'fs';
import path from 'path';

const APP_ROOT = path.join(process.cwd(), 'src/app');

const EXCLUDED = new Set([
  // Forms / conversion endpoints
  'request-quote',
  'contact',
  'general-contact',
  'schedule-meeting',
  'order-catalog-models',
  // Legal / system / admin / utility
  'accessibility',
  'privacy',
  'terms',
  'admin',
  'og-preview',
  'test-contact',
  'search',
  'current-openings',
  'lab-signals-welcome',
]);

// Widget-rendering tokens: each occurrence ~ one dual-CTA widget instance.
const WIDGET_TOKENS = [
  'CatalogCustomDualCta',
  'PageClosingCta',
  'UXUIDCStartProjectCTA',
  'StartProjectCTA',
  'UXUIDCEducationalSalesBanner',
  'EducationalSalesBanner',
  'CatalogGeneLookup',
  'AnimatedCTASection',
];

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
  const clean = route.replace(/^\//, '');
  if (route.includes('thank-you')) return true;
  for (const ex of EXCLUDED) {
    if (clean === ex || clean.startsWith(`${ex}/`)) return true;
  }
  return false;
}

/** Positions of JSX usages (opening tags) of widget-rendering components, ignoring imports. */
function widgetPositions(src: string): number[] {
  const positions: number[] = [];
  for (const token of WIDGET_TOKENS) {
    const re = new RegExp(`<${token}[\\s/>]`, 'g');
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) positions.push(m.index);
  }
  return positions.sort((a, b) => a - b);
}

const pages = walk(APP_ROOT);
const rows: { route: string; file: string; count: number; ratio: number | null }[] = [];

for (const file of pages) {
  const route = routeFromFile(file);
  if (isExcluded(route)) continue;
  const src = fs.readFileSync(file, 'utf8');
  const pos = widgetPositions(src);
  const ratio = pos.length === 1 ? pos[0] / src.length : null;
  rows.push({ route, file: path.relative(process.cwd(), file), count: pos.length, ratio });
}

const none = rows.filter((r) => r.count === 0);
const one = rows.filter((r) => r.count === 1);
const twoPlus = rows.filter((r) => r.count >= 2);

console.log('\n=== CTA position audit (top + bottom) ===\n');
console.log(`Target pages scanned: ${rows.length}`);
console.log(`  0 widgets (needs top + bottom): ${none.length}`);
console.log(`  1 widget  (needs one more):     ${one.length}`);
console.log(`  2+ widgets (top + bottom ok):   ${twoPlus.length}\n`);

if (none.length) {
  console.log('--- 0 widgets (add TOP + BOTTOM) ---');
  for (const r of none) console.log(`  ${r.file}`);
}
if (one.length) {
  console.log('\n--- 1 widget (position ratio: <0.5 likely TOP present->add BOTTOM; >=0.5 likely BOTTOM present->add TOP) ---');
  for (const r of one) console.log(`  ${(r.ratio ?? 0).toFixed(2)}  ${r.file}`);
}

process.exit(0);
