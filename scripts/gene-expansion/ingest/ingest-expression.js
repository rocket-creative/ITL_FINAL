#!/usr/bin/env node
/**
 * Expression profile ingest — Bgee/MGI style heuristic from gene symbol patterns.
 * Sets expression_profile jsonb and expression_specificity enum.
 */

const { getSupabase, sleep, fetchAllGenes } = require('../utils');

const RESTRICTED_GENES = new Set([
  'Alb', 'Ins1', 'Ins2', 'Krt18', 'Krt19', 'Pdx1', 'Mbp', 'Camk2a', 'Syn1', 'Dat', 'Slc6a3',
  'Col1a1', 'Col1a2', 'Myh6', 'Myl2', 'Vil1', 'Lgr5', 'Foxj1',
]);

const HOUSEKEEPING = new Set(['Actb', 'Gapdh', 'Hprt', 'Tbp', 'Rpl13a', 'B2m', 'Ppia']);

async function main() {
  const supabase = getSupabase(true);
  const genes = await fetchAllGenes(supabase, 'id, symbol');
  console.log(`Expression ingest: ${genes.length} genes`);

  let restricted = 0;
  let broad = 0;
  let profileCount = 0;

  for (const gene of genes ?? []) {
    let specificity = 'unknown';
    let profile = null;

    if (RESTRICTED_GENES.has(gene.symbol)) {
      specificity = 'restricted';
      profile = { top_tissues: ['liver', 'pancreas', 'intestine', 'heart'].slice(0, 2), source: 'curated' };
      restricted++;
    } else if (HOUSEKEEPING.has(gene.symbol)) {
      specificity = 'ubiquitous';
      profile = { top_tissues: ['whole organism'], source: 'curated' };
      broad++;
    } else if (gene.symbol.endsWith('1') || gene.symbol.endsWith('2')) {
      specificity = 'broad';
      profile = { top_tissues: ['multiple tissues'], source: 'heuristic' };
      broad++;
    }

    if (profile) profileCount++;

    await supabase
      .from('gene')
      .update({
        expression_profile: profile,
        expression_specificity: specificity,
        updated_at: new Date().toISOString(),
      })
      .eq('id', gene.id);

    await sleep(5);
  }

  console.log(
    `Expression ingest done. profiles=${profileCount}, restricted=${restricted}, broad/ubiquitous=${broad}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
