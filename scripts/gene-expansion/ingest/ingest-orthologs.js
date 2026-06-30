#!/usr/bin/env node
/**
 * Human ortholog ingest — MGI/HGNC style mapping for common symbols.
 */

const { getSupabase, sleep, fetchAllGenes } = require('../utils');

const ORTHOLOG_MAP = {
  Trp53: { symbol: 'TP53', hgnc: '11998' },
  Brca1: { symbol: 'BRCA1', hgnc: '1100' },
  Brca2: { symbol: 'BRCA2', hgnc: '1101' },
  Cftr: { symbol: 'CFTR', hgnc: '1884' },
  App: { symbol: 'APP', hgnc: '620' },
  Apoe: { symbol: 'APOE', hgnc: '613' },
  Pten: { symbol: 'PTEN', hgnc: '9588' },
  Kras: { symbol: 'KRAS', hgnc: '6407' },
  Egfr: { symbol: 'EGFR', hgnc: '3236' },
  Mc4r: { symbol: 'MC4R', hgnc: '6932' },
  Lep: { symbol: 'LEP', hgnc: '6553' },
  Lepr: { symbol: 'LEPR', hgnc: '6554' },
  Sox2: { symbol: 'SOX2', hgnc: '11195' },
  Oct4: { symbol: 'POU5F1', hgnc: '9221' },
  Pou5f1: { symbol: 'POU5F1', hgnc: '9221' },
};

function guessHumanOrtholog(mouseSymbol) {
  if (ORTHOLOG_MAP[mouseSymbol]) return ORTHOLOG_MAP[mouseSymbol];
  // Simple heuristic: same symbol uppercased for many human orthologs
  if (/^[A-Z][a-z0-9]+$/.test(mouseSymbol) && mouseSymbol.length <= 6) {
    return { symbol: mouseSymbol.toUpperCase(), hgnc: null };
  }
  return null;
}

async function main() {
  const supabase = getSupabase(true);
  const genes = await fetchAllGenes(supabase, 'id, symbol');
  console.log(`Ortholog ingest: ${genes.length} genes`);

  let withOrtholog = 0;

  for (const gene of genes ?? []) {
    const orth = guessHumanOrtholog(gene.symbol);
    const has = Boolean(orth?.symbol);

    if (has) withOrtholog++;

    await supabase
      .from('gene')
      .update({
        human_ortholog_symbol: orth?.symbol ?? null,
        human_ortholog_hgnc: orth?.hgnc ?? null,
        has_human_ortholog: has,
        updated_at: new Date().toISOString(),
      })
      .eq('id', gene.id);

    await sleep(2);
  }

  console.log(`Ortholog ingest done. ${withOrtholog}/${genes.length} with human ortholog.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
