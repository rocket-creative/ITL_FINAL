/**
 * Replace inline ctaData footer sections with PageClosingCta on hub pages.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.join(__dirname, '..', 'src/app');

const IMPORT_LINE =
  "import PageClosingCta from '@/components/UXUIDC/PageClosingCta';\n";

const CTA_BLOCK_RE =
  /\{\/\* CTA Section \*\/\}\s*<section style=\{\{ background: '(?:#008080|#0a253c)', padding: '60px 20px' \}\}>[\s\S]*?\{ctaData\.secondaryButton\.label\}[\s\S]*?<\/section>/g;

function slugFromFile(file) {
  const rel = path.relative(APP_ROOT, path.dirname(file));
  return rel.replace(/\//g, '-') || 'home';
}

function ensureImport(src) {
  if (src.includes('PageClosingCta')) return src;
  const m = src.match(/^import .+ from .+;$/m);
  if (!m) return IMPORT_LINE + src;
  const idx = src.indexOf(m[0]) + m[0].length;
  return src.slice(0, idx) + '\n' + IMPORT_LINE + src.slice(idx);
}

const files = [
  'catalog-mouse-models/page.tsx',
  'custom-mouse-models/page.tsx',
  'custom-projects/page.tsx',
  'disease-model-catalog/page.tsx',
  'publications/page.tsx',
  'glossary/page.tsx',
  'resources/page.tsx',
  'gene-replacement/page.tsx',
  'conditional-vs-conventional-guide/page.tsx',
  'cre-line-selection-guide/page.tsx',
  'c57bl6-mouse-background/page.tsx',
  'balbc-mouse-background/page.tsx',
  'inducible-conditional-knockout/page.tsx',
  'bac-to-bac-large-scale-targeting/page.tsx',
  'double-checkpoint-mice/page.tsx',
  'pd1-humanized-mice/page.tsx',
  'pdl1-humanized-mice/page.tsx',
  'lag3-humanized-mice/page.tsx',
];

let changed = 0;
for (const rel of files) {
  const file = path.join(APP_ROOT, rel);
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  if (!src.includes('ctaData.secondaryButton')) continue;

  const slug = slugFromFile(file);
  const replacement = `<PageClosingCta title={ctaData.title} description={ctaData.description} slug="${slug}" />`;

  const next = ensureImport(src).replace(CTA_BLOCK_RE, replacement);
  if (next !== src) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('hub updated:', rel);
  }
}

console.log(`Hub pages updated: ${changed}`);
