/**
 * Replace hero inline catalog/quote button rows with sitewide CatalogCustomDualCta.
 * Run: node scripts/migrate-hero-dual-widget.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.join(__dirname, '..', 'src/app');

const DUAL_IMPORT =
  "import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';\n";

const HERO_CTA_RE =
  /<div className="hero-animate flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/section>)/g;

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

function ensureImport(src) {
  if (src.includes('CatalogCustomDualCta')) return src;
  const importMatch = src.match(/^import .+ from .+;$/m);
  if (importMatch) {
    const idx = src.lastIndexOf(importMatch[0]);
    const end = idx + importMatch[0].length;
    return src.slice(0, end) + '\n' + DUAL_IMPORT + src.slice(end);
  }
  return DUAL_IMPORT + src;
}

function widgetBlock(slug) {
  return `
        <section style={{ backgroundColor: '#f5f5f4', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <CatalogCustomDualCta slug="${slug}" utmMedium="page-hero" flush />
          </div>
        </section>
`;
}

let updated = 0;
for (const file of walk(APP_ROOT)) {
  let src = fs.readFileSync(file, 'utf8');
  if (!HERO_CTA_RE.test(src)) continue;
  HERO_CTA_RE.lastIndex = 0;

  const slug = slugFromFile(file);
  let out = src.replace(HERO_CTA_RE, '');
  out = out.replace(
    /(<\/div>\s*<\/section>)(\s*\n\s*\{\/\* Stats)/,
    `$1${widgetBlock(slug)}$2`,
  );
  if (out === src) {
    out = out.replace(/(<\/div>\s*<\/section>)/, `$1${widgetBlock(slug)}`);
  }
  out = ensureImport(out);
  if (out !== src) {
    fs.writeFileSync(file, out);
    updated++;
    console.log('updated', path.relative(APP_ROOT, file));
  }
}

console.log(`Done. ${updated} hero sections updated.`);
