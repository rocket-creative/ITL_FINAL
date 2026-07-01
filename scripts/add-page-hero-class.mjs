/**
 * Add page-hero class to the first navy/gradient hero section in each page.
 * Run: node scripts/add-page-hero-class.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const APP_ROOT = path.join(ROOT, 'src/app');
const COMPONENTS_ROOT = path.join(ROOT, 'src/components');

const SKIP_FILES = new Set([
  'BreedingSchemeArchitectCTA.tsx',
  'ResourceLinks.tsx',
  'TestimonialsSection.tsx',
  'AIAssistantPanel.tsx',
  'UpgradeModal.tsx',
]);

const HERO_STYLE_RE =
  /(?:linear-gradient[\s\S]{0,120}?#0a253c|background(?:Color)?:[\s\S]{0,80}?(?:BRAND\.navy|['"]#0a253c['"]|0a253c))/i;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(tsx|jsx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function injectPageHeroClass(sectionTag) {
  if (sectionTag.includes('page-hero')) return sectionTag;

  if (/className="([^"]*)"/.test(sectionTag)) {
    return sectionTag.replace(/className="([^"]*)"/, (_, classes) => {
      if (classes.includes('page-hero')) return `className="${classes}"`;
      return `className="${classes} page-hero"`;
    });
  }

  if (/className=\{`([^`]*)`\}/.test(sectionTag)) {
    return sectionTag.replace(/className=\{`([^`]*)`\}/, (_, classes) => {
      if (classes.includes('page-hero')) return `className={\`${classes}\`}`;
      return `className={\`${classes} page-hero\`}`;
    });
  }

  return sectionTag.replace('<section', '<section className="page-hero"');
}

function processFile(filePath, src) {
  if (src.includes('page-hero') && !HERO_STYLE_RE.test(src)) return null;

  const mainIdx = src.indexOf('<main');
  const searchFrom = mainIdx === -1 ? 0 : mainIdx;
  const slice = src.slice(searchFrom);

  const sectionRe = /<section[\s\S]*?style=\{\{[\s\S]*?\}\}[^>]*>/g;
  let match;
  let updated = null;

  while ((match = sectionRe.exec(slice)) !== null) {
    const block = match[0];
    if (!HERO_STYLE_RE.test(block)) continue;

    const absStart = searchFrom + match.index;
    const newSection = injectPageHeroClass(block);
    if (newSection === block) continue;

    updated = src.slice(0, absStart) + newSection + src.slice(absStart + block.length);
    break;
  }

  return updated;
}

function processClientFiles(dir) {
  let count = 0;
  for (const file of walk(dir)) {
    const base = path.basename(file);
    if (SKIP_FILES.has(base)) continue;
    if (!file.includes('Client.tsx') && !file.includes('Content.tsx') && !file.includes('GeneMod') && !file.includes('BuildInquiry')) {
      if (!file.endsWith('page.tsx') && dir === APP_ROOT) continue;
    }

    let src = fs.readFileSync(file, 'utf8');
    if (!HERO_STYLE_RE.test(src)) continue;

    const out = processFile(file, src);
    if (out && out !== src) {
      fs.writeFileSync(file, out);
      count++;
      console.log('updated', path.relative(ROOT, file));
    }
  }
  return count;
}

let updated = 0;

for (const file of walk(APP_ROOT)) {
  if (!file.endsWith('page.tsx')) continue;
  const src = fs.readFileSync(file, 'utf8');
  if (!HERO_STYLE_RE.test(src)) continue;
  const out = processFile(file, src);
  if (out && out !== src) {
    fs.writeFileSync(file, out);
    updated++;
    console.log('updated', path.relative(ROOT, file));
  }
}

for (const sub of ['gene-expansion', 'legacy']) {
  updated += processClientFiles(path.join(COMPONENTS_ROOT, sub));
}

updated += processClientFiles(path.join(APP_ROOT, 'request-quote'));
updated += processClientFiles(path.join(APP_ROOT, 'pricing-guide'));
updated += processClientFiles(path.join(APP_ROOT, 'order-catalog-models'));
updated += processClientFiles(path.join(APP_ROOT, 'all-catalog-mouse-models'));

console.log(`Done. ${updated} files updated with page-hero class.`);
