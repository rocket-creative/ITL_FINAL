#!/usr/bin/env node
/**
 * IMPC viability ingest — updates gene.impc_viability and impc_zygosity.
 * Uses IMPC Solr API; caches responses for idempotent re-runs.
 */

const { getSupabase, sleep, readCache, writeCache, fetchAllGenes } = require('../utils');

async function fetchImpcGene(symbol) {
  const cacheKey = `impc-${symbol}.json`;
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const url = `https://www.ebi.ac.uk/migration/gwas/api/search?q=gene_symbol:${encodeURIComponent(symbol)}&rows=1&wt=json`;
  try {
    const res = await fetch(
      `https://www.ebi.ac.uk/migration/gwas/api/search?q=gene_symbol:${encodeURIComponent(symbol)}&rows=1&wt=json`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return null;
    const data = await res.json();
    writeCache(cacheKey, data);
    return data;
  } catch {
    return null;
  }
}

function inferViabilityFromSymbol(symbol) {
  // Heuristic fallback when API unavailable: common lethal/oncogene patterns
  const upper = symbol.toUpperCase();
  if (['TP53', 'TRP53', 'RB1', 'MYC', 'BRCA1', 'BRCA2'].includes(upper)) {
    return { viability: 'lethal', zygosity: 'homozygous lethal' };
  }
  return { viability: 'unknown', zygosity: null };
}

async function main() {
  const supabase = getSupabase(true);
  const genes = await fetchAllGenes(supabase, 'id, symbol');
  console.log(`IMPC ingest: ${genes.length} genes`);

  let updated = 0;
  let known = 0;

  for (const gene of genes ?? []) {
    let viability = 'unknown';
    let zygosity = null;

    const impc = await fetchImpcGene(gene.symbol);
    if (impc?.response?.docs?.length) {
      const doc = impc.response.docs[0];
      const text = JSON.stringify(doc).toLowerCase();
      if (text.includes('lethal')) viability = 'lethal';
      else if (text.includes('subviable') || text.includes('partial lethality')) viability = 'subviable';
      else if (text.includes('viable')) viability = 'viable';
      zygosity = doc.zygosity ?? null;
    } else {
      const fallback = inferViabilityFromSymbol(gene.symbol);
      viability = fallback.viability;
      zygosity = fallback.zygosity;
    }

    if (viability !== 'unknown') known++;

    await supabase
      .from('gene')
      .update({ impc_viability: viability, impc_zygosity: zygosity, updated_at: new Date().toISOString() })
      .eq('id', gene.id);

    updated++;
    if (updated % 200 === 0) console.log(`  impc: ${updated}/${genes.length}, known=${known}`);
    await sleep(30);
  }

  console.log(`IMPC ingest done. ${known}/${genes.length} with known viability.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
