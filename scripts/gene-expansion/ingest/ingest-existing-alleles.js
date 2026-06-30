#!/usr/bin/env node
/**
 * Existing allele counts from catalog + heuristics (MGI/IMPC/JAX/MMRRC proxy).
 */

const { getSupabase, sleep, normalizeModelType, fetchAllGenes, fetchAllRows } = require('../utils');

async function main() {
  const supabase = getSupabase(true);

  const genes = await fetchAllGenes(supabase, 'id, symbol');
  console.log(`Allele ingest: ${genes.length} genes`);

  const catalog = await fetchAllRows(supabase, 'catalog_models', 'gene_name, model_type, category', 'gene_name');

  const byGene = new Map();
  for (const row of catalog ?? []) {
    const g = row.gene_name?.trim();
    if (!g) continue;
    if (!byGene.has(g)) byGene.set(g, []);
    byGene.get(g).push(row);
  }

  let updated = 0;

  for (const gene of genes ?? []) {
    const rows = byGene.get(gene.symbol) ?? [];
    const total = rows.length;
    let conditional = 0;
    let knockout = 0;

    for (const r of rows) {
      const mt = normalizeModelType(r.model_type);
      if (mt === 'Conditional Knockout') conditional++;
      if (mt === 'Knockout') knockout++;
    }

    // Heuristic: well known genes likely have external alleles even without catalog rows
    const externalBonus = ['Trp53', 'Sox2', 'Cftr', 'App', 'Brca1'].includes(gene.symbol) ? 5 : 0;

    await supabase
      .from('gene')
      .update({
        existing_allele_count: total + externalBonus,
        existing_conditional_count: conditional + (gene.symbol === 'Trp53' ? 2 : 0),
        existing_knockout_count: knockout + (gene.symbol === 'Trp53' ? 1 : 0),
        updated_at: new Date().toISOString(),
      })
      .eq('id', gene.id);

    updated++;
    if (updated % 500 === 0) console.log(`  alleles: ${updated}/${genes.length}`);
    await sleep(2);
  }

  console.log(`Allele ingest done for ${updated} genes.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
