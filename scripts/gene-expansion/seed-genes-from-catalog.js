#!/usr/bin/env node
/**
 * Seed gene table from distinct catalog_models.gene_name values.
 */

const { getSupabase, sleep } = require('./utils');

const PAGE = 1000;

async function fetchAllGeneNames(supabase) {
  const seen = new Set();
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from('catalog_models')
      .select('gene_name')
      .order('gene_name')
      .range(from, from + PAGE - 1);

    if (error) throw error;
    if (!data?.length) break;

    for (const row of data) {
      if (row.gene_name?.trim()) seen.add(row.gene_name.trim());
    }

    if (data.length < PAGE) break;
    from += PAGE;
    await sleep(50);
  }

  return [...seen].sort((a, b) => a.localeCompare(b));
}

async function main() {
  const supabase = getSupabase(true);
  const symbols = await fetchAllGeneNames(supabase);
  console.log(`Found ${symbols.length} unique gene symbols in catalog_models`);

  const BATCH = 500;
  let upserted = 0;

  for (let i = 0; i < symbols.length; i += BATCH) {
    const chunk = symbols.slice(i, i + BATCH).map((symbol) => ({ symbol }));
    const { error } = await supabase.from('gene').upsert(chunk, { onConflict: 'symbol' });
    if (error) throw error;
    upserted += chunk.length;
    console.log(`  upserted ${upserted}/${symbols.length}`);
  }

  console.log(`Done. ${upserted} gene rows seeded.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
