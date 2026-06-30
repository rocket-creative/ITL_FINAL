#!/usr/bin/env node
/**
 * Catalog count snapshot per gene × canonical mod — normalizes point mutantion.
 */

const { getSupabase, normalizeModelType, normalizeCategory, fetchAllRows } = require('../utils');

const SLUG_RULES = {
  knockout: { types: ['Knockout'] },
  'conditional-knockout': { types: ['Conditional Knockout'] },
  'inducible-knockout': { types: ['Conditional Knockout'], cat: ['inducible', 'creert', 'tamoxifen'] },
  knockin: { types: ['Knockin'], excludeCat: ['point mutation', 'reporter', 'tag', 'cdna', 'humanized'] },
  'point-mutation': { types: ['Knockin'], cat: ['point mutation'] },
  'cdna-knockin': { types: ['Knockin'], cat: ['cdna'] },
  humanized: { types: ['Humanized'] },
  reporter: { types: ['Knockin'], cat: ['reporter', 'gfp', 'yfp', 'rfp', 'mcherry', 'lacz', 'luciferase'] },
  overexpression: { types: ['Transgenic'] },
  'cre-driver': { types: ['Transgenic', 'Knockin'], cat: ['cre', 'driver'] },
  'tag-knockin': { types: ['Knockin'], cat: ['tag', 'flag', 'ha', 'myc', 'v5'] },
};

function matches(row, rule) {
  const mt = normalizeModelType(row.model_type);
  const cat = normalizeCategory(row.category).toLowerCase();
  if (!rule.types.includes(mt)) return false;
  if (rule.cat && !rule.cat.some((c) => cat.includes(c))) return false;
  if (rule.excludeCat && rule.excludeCat.some((c) => cat.includes(c))) return false;
  return true;
}

async function main() {
  const supabase = getSupabase(true);

  const catalog = await fetchAllRows(supabase, 'catalog_models', 'gene_name, model_type, category', 'gene_name');
  console.log(`Catalog normalize: ${catalog.length} catalog rows`);

  const counts = new Map();
  for (const row of catalog ?? []) {
    const g = row.gene_name?.trim();
    if (!g) continue;
    if (!counts.has(g)) counts.set(g, {});
    const geneCounts = counts.get(g);

    for (const [slug, rule] of Object.entries(SLUG_RULES)) {
      if (matches(row, rule)) {
        geneCounts[slug] = (geneCounts[slug] ?? 0) + 1;
      }
    }
  }

  const outPath = require('path').join(__dirname, '..', '.cache', 'catalog-counts.json');
  require('fs').mkdirSync(require('path').dirname(outPath), { recursive: true });
  require('fs').writeFileSync(outPath, JSON.stringify(Object.fromEntries(counts)));

  let genesWithCatalog = counts.size;
  console.log(`Catalog normalize done. ${genesWithCatalog} genes with inventory.`);
  console.log(`Counts cached at ${outPath}`);
  console.log('Normalized point mutantion → point mutation at read time.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
