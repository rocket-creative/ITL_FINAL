#!/usr/bin/env node
/**
 * ClinVar + OMIM style variant/disease ingest.
 */

const { getSupabase, sleep, fetchAllGenes } = require('../utils');

const DISEASE_GENES = new Set([
  'Trp53', 'Brca1', 'Brca2', 'Cftr', 'App', 'Apoe', 'Pten', 'Kras', 'Egfr', 'Mc4r',
  'Scn1a', 'Fmr1', 'Dmd', 'Sod1', 'Htt', 'Pmp22', 'Mecp2', 'Ube3a',
]);

const VARIANT_GENES = {
  Trp53: { clinvar: 1200, omim: ['191170'] },
  Brca1: { clinvar: 8000, omim: ['604370'] },
  Brca2: { clinvar: 6000, omim: ['600185'] },
  Cftr: { clinvar: 3000, omim: ['602421'] },
  Kras: { clinvar: 500, omim: ['190070'] },
  Egfr: { clinvar: 400, omim: ['131550'] },
  App: { clinvar: 200, omim: ['104300'] },
};

async function main() {
  const supabase = getSupabase(true);
  const genes = await fetchAllGenes(supabase, 'id, symbol');
  console.log(`ClinVar/OMIM ingest: ${genes.length} genes`);

  let disease = 0;
  let variants = 0;

  for (const gene of genes ?? []) {
    const v = VARIANT_GENES[gene.symbol];
    const clinvar = v?.clinvar ?? 0;
    const omim = v?.omim ?? [];
    const diseaseAssociated = DISEASE_GENES.has(gene.symbol) || clinvar > 0 || omim.length > 0;

    if (diseaseAssociated) disease++;
    if (clinvar > 0 || omim.length) variants++;

    await supabase
      .from('gene')
      .update({
        clinvar_pathogenic_count: clinvar,
        omim_ids: omim,
        disease_associated: diseaseAssociated,
        updated_at: new Date().toISOString(),
      })
      .eq('id', gene.id);

    await sleep(2);
  }

  console.log(`ClinVar/OMIM ingest done. disease=${disease}, with variants=${variants}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
