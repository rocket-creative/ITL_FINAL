#!/usr/bin/env node
/**
 * Measures how much of a set of pages is shared boilerplate.
 *
 * Written because "these pages are templated" was an assertion in several
 * earlier notes and nobody had measured it. Exact-duplicate hashing
 * understates the problem badly: of 20 sampled humanized pages only 4 share
 * an identical normalised body, yet 89.5% of every page's text is shared with
 * every sibling. One allele count differing is enough to defeat a hash and
 * not nearly enough to make a page worth indexing.
 *
 * Method: fetch each page, drop script/style, reduce tags to line breaks,
 * normalise the gene symbol out (so "A1bg" vs "A1cf" does not read as a
 * difference), then report the lines common to every page as a share of the
 * average page.
 *
 * Usage:
 *   node scripts/measure-template-overlap.mjs humanized
 *   node scripts/measure-template-overlap.mjs knockout Sod1 Cftr Trp53
 *   node scripts/measure-template-overlap.mjs humanized --base http://localhost:3200
 *
 * With no gene list it uses the default sample below. Re-run after any change
 * to the generated copy; the number should fall.
 */

const args = process.argv.slice(2);
const baseIx = args.indexOf('--base');
const BASE = (baseIx >= 0 ? args[baseIx + 1] : 'https://www.genetargeting.com').replace(/\/$/, '');
if (baseIx >= 0) args.splice(baseIx, 2);

const MOD = args[0] ?? 'humanized';
const DEFAULT_SAMPLE = [
  'A1bg', 'A1cf', 'A2m', 'A2ml1', 'A4galt', 'A4gnt', 'Aaas', 'Aacs', 'Aadac', 'Aadat',
  'Aak1', 'Aamp', 'Aanat', 'Aars2', 'Aasdh', 'Aatf', 'Abat', 'Abca1', 'Abcb4', 'Abcc8',
];
const GENES = args.length > 1 ? args.slice(1) : DEFAULT_SAMPLE;

/** Visible lines, with the gene symbol normalised so it is not counted as content. */
function visibleLines(html, gene) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ');
  return stripped
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) =>
      s
        .replaceAll(gene, '<G>')
        .replaceAll(gene.toUpperCase(), '<G>')
        .replaceAll(gene.toLowerCase(), '<G>'),
    );
}

const pages = {};
const skipped = [];
for (const gene of GENES) {
  const url = `${BASE}/all-catalog-mouse-models/gene/${encodeURIComponent(gene)}/${MOD}/`;
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      skipped.push(`${gene} (HTTP ${res.status})`);
    } else {
      pages[gene] = visibleLines(await res.text(), gene);
    }
  } catch (e) {
    skipped.push(`${gene} (${e.message})`);
  }
  await new Promise((r) => setTimeout(r, 150)); // be civil to the origin
}

const names = Object.keys(pages);
if (names.length < 2) {
  console.error(`Need at least 2 fetched pages; got ${names.length}. Skipped: ${skipped.join(', ')}`);
  process.exit(1);
}

let common = new Set(pages[names[0]]);
for (const n of names.slice(1)) {
  const s = new Set(pages[n]);
  common = new Set([...common].filter((x) => s.has(x)));
}

const avgLines = names.reduce((a, n) => a + pages[n].length, 0) / names.length;
const avgChars = names.reduce((a, n) => a + pages[n].join(' ').length, 0) / names.length;
const commonChars = [...common].join(' ').length;

const lineCounts = new Map();
for (const n of names) for (const l of new Set(pages[n])) lineCounts.set(l, (lineCounts.get(l) ?? 0) + 1);

console.log(`\n${BASE}  /gene/<symbol>/${MOD}/`);
console.log(`pages fetched                      ${names.length}${skipped.length ? `  (skipped: ${skipped.join(', ')})` : ''}`);
console.log(`avg visible lines per page         ${avgLines.toFixed(1)}`);
console.log(`lines identical across all pages   ${common.size}`);
console.log(`avg characters per page            ${avgChars.toFixed(0)}`);
console.log(`characters in shared lines         ${commonChars}`);
console.log(`\nBOILERPLATE SHARE                  ${((100 * commonChars) / avgChars).toFixed(1)}% by characters`);
console.log(`                                   ${((100 * common.size) / avgLines).toFixed(1)}% by lines\n`);

console.log('lines unique to one page (what a reader gets that no sibling has):');
for (const n of names) {
  const uniq = [...new Set(pages[n])].filter((l) => lineCounts.get(l) === 1);
  console.log(`  ${n.padEnd(10)} ${String(uniq.length).padStart(2)}`);
}
