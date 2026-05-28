/**
 * Site-wide dual CTA migration for service pages.
 * Run: node scripts/migrate-dual-cta-pages.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.join(__dirname, '..', 'src/app');

const EXCLUDED_SEGMENTS = [
  'request-quote',
  'contact',
  'thank-you',
  'api/',
];

const CATALOG_LINK = `              <Link
                href="/all-catalog-mouse-models"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '10px 16px',
                  minWidth: '160px',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>Browse 14,774+ Catalog Models</span>
                <span>→</span>
              </Link>`;

const DUAL_CTA_IMPORT =
  "import CatalogCustomCtaButtons from '@/components/UXUIDC/CatalogCustomCtaButtons';\n";

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === 'page.tsx') acc.push(full);
  }
  return acc;
}

function slugFromFile(file) {
  const rel = path.relative(APP_ROOT, path.dirname(file));
  return rel.replace(/\//g, '-') || 'home';
}

function shouldSkip(file) {
  const rel = path.relative(APP_ROOT, file);
  return EXCLUDED_SEGMENTS.some((seg) => rel.includes(seg));
}

function ensureImport(src) {
  if (src.includes('CatalogCustomCtaButtons')) return src;
  const importMatch = src.match(/^import .+ from .+;$/m);
  if (importMatch) {
    const idx = src.lastIndexOf(importMatch[0]);
    const end = idx + importMatch[0].length;
    return src.slice(0, end) + '\n' + DUAL_CTA_IMPORT + src.slice(end);
  }
  return DUAL_CTA_IMPORT + src;
}

function migrate(src, slug) {
  let out = src;

  out = out.replace(/Request a Quote/g, 'Request Custom Quote');
  out = out.replace(/Request a Custom Quote/g, 'Request Custom Quote');

  // Replace duplicate quote + free consultation footer button pairs
  const dupFooterRe =
    /<div className="animate-in flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">\s*<Link[\s\S]*?href="\/request-quote"[\s\S]*?Request Custom Quote[\s\S]*?<\/Link>\s*<Link[\s\S]*?href="\/request-quote"[\s\S]*?Free Consultation[\s\S]*?<\/Link>\s*<\/div>/g;
  if (dupFooterRe.test(out)) {
    out = out.replace(
      dupFooterRe,
      `<CatalogCustomCtaButtons variant="dark" utmMedium="page-closing" slug="${slug}" />`,
    );
  }

  // Hero: inject catalog link before first hero Request Custom Quote if hero has no catalog yet
  if (
    /hero-animate/.test(out) &&
    !/all-catalog-mouse-models/.test(out) &&
    /Request Custom Quote/.test(out)
  ) {
    out = out.replace(
      /(<div className="hero-animate flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">\s*)(<Link[\s\S]*?Request Custom Quote[\s\S]*?<\/Link>)/,
      `$1${CATALOG_LINK}\n$2`,
    );
  }

  // Closing section with quote + contact (replace contact with catalog in closing flex)
  out = out.replace(
    /(<div className="animate-in flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">\s*<Link[\s\S]*?request-quote[\s\S]*?Request Custom Quote[\s\S]*?<\/Link>\s*)<Link[\s\S]*?href="\/contact"[\s\S]*?<\/Link>/g,
    `$1${CATALOG_LINK}`,
  );

  // Single-button closing: quote only in closing flex → dual component
  const singleClosingRe =
    /<div className="animate-in flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">\s*<Link[\s\S]*?href="\/request-quote"[\s\S]*?Request Custom Quote[\s\S]*?<\/Link>\s*<\/div>/g;
  if (singleClosingRe.test(out) && !out.includes('CatalogCustomCtaButtons')) {
    out = out.replace(
      singleClosingRe,
      `<CatalogCustomCtaButtons variant="dark" utmMedium="page-closing" slug="${slug}" />`,
    );
  }

  if (out !== src) {
    out = ensureImport(out);
  }

  return out;
}

let changed = 0;
for (const file of walk(APP_ROOT)) {
  if (shouldSkip(file)) continue;
  const slug = slugFromFile(file);
  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes('request-quote')) continue;

  const next = migrate(src, slug);
  if (next !== src) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated:', path.relative(APP_ROOT, file));
  }
}

console.log(`\nDone. ${changed} files updated.`);
