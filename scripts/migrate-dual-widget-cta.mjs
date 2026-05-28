/**
 * Replace CatalogCustomCtaButtons with sitewide CatalogCustomDualCta widget.
 * Run: node scripts/migrate-dual-widget-cta.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.join(__dirname, '..', 'src');

const EXCLUDED = [
  'request-quote',
  'contact',
  'thank-you',
  'api/',
  'CatalogCustomCtaButtons.tsx',
  'CatalogCustomDualCta.tsx',
  'PageClosingCta.tsx',
  'StartProjectCTA.tsx',
  'AnimatedCTASection.tsx',
  'EducationalSalesBanner.tsx',
];

const DUAL_IMPORT =
  "import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';\n";
const BUTTONS_IMPORT = "import CatalogCustomCtaButtons from '@/components/UXUIDC/CatalogCustomCtaButtons';\n";

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function shouldSkip(file) {
  const rel = path.relative(APP_ROOT, file);
  return EXCLUDED.some((seg) => rel.includes(seg));
}

function slugFromAppPage(file) {
  const m = file.match(/src\/app\/(.+)\/page\.tsx$/);
  if (!m) return null;
  return m[1].replace(/\//g, '-') || 'home';
}

function ensureDualImport(src) {
  if (src.includes('CatalogCustomDualCta')) return src;
  if (src.includes('CatalogCustomCtaButtons')) {
    return src.replace(BUTTONS_IMPORT, DUAL_IMPORT);
  }
  const importMatch = src.match(/^import .+ from .+;$/m);
  if (importMatch) {
    const idx = src.lastIndexOf(importMatch[0]);
    const end = idx + importMatch[0].length;
    return src.slice(0, end) + '\n' + DUAL_IMPORT + src.slice(end);
  }
  return DUAL_IMPORT + src;
}

function migrateButtons(src, fallbackSlug) {
  return src.replace(/<CatalogCustomCtaButtons([^/]*)\/>/g, (_, attrs) => {
    const slug = attrs.match(/slug=(?:"([^"]+)"|{`([^`]+)`}|{([^}]+)})/);
    const medium = attrs.match(/utmMedium="([^"]+)"/);
    const resolvedSlug = slug?.[1] ?? slug?.[2] ?? slug?.[3] ?? fallbackSlug ?? 'site';
    const resolvedMedium = medium?.[1] ?? 'page-cta';
    return `<CatalogCustomDualCta slug="${resolvedSlug}" utmMedium="${resolvedMedium}" flush />`;
  });
}

/** Navy closing blocks: drop redundant h2/p when only buttons remain as widget */
function simplifyNavyClosing(src) {
  return src.replace(
    /<section([^>]*backgroundColor:\s*['"]#0a253c['"][^>]*)>([\s\S]*?)<\/section>/g,
    (full, sectionAttrs, inner) => {
      if (!inner.includes('CatalogCustomDualCta')) return full;
      if (!inner.match(/<h2[\s\S]*?<\/h2>[\s\S]*?<p[\s\S]*?<\/p>[\s\S]*<CatalogCustomDualCta/)) {
        return full;
      }
      const wrapperMatch = inner.match(
        /<div[^>]*style=\{\{[^}]*maxWidth[^}]*\}\}[^>]*>([\s\S]*?)<\/div>\s*$/,
      );
      if (!wrapperMatch) return full;
      const dualOnly = wrapperMatch[1].replace(
        /<h2[\s\S]*?<\/h2>\s*<p[\s\S]*?<\/p>\s*/g,
        '',
      );
      if (!dualOnly.includes('CatalogCustomDualCta')) return full;
      const cleanAttrs = sectionAttrs.replace(
        /style=\{\{[^}]*backgroundColor:\s*'#0a253c'[^}]*\}\}/,
        '',
      );
      return `<section${cleanAttrs} style={{ backgroundColor: '#f5f5f4', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            ${dualOnly.trim()}
          </div>
        </section>`;
    },
  );
}

let updated = 0;
for (const file of walk(APP_ROOT)) {
  if (shouldSkip(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  if (!src.includes('CatalogCustomCtaButtons')) continue;

  const fallbackSlug = slugFromAppPage(file);
  const next = simplifyNavyClosing(migrateButtons(ensureDualImport(src), fallbackSlug));
  if (next !== src) {
    fs.writeFileSync(file, next);
    updated++;
    console.log('updated', path.relative(APP_ROOT, file));
  }
}

console.log(`Done. ${updated} files updated.`);
