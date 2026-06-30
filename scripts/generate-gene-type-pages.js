#!/usr/bin/env node
/**
 * Generate gene_type_page rows for all gene × 11 modification combos.
 * Skips combos with catalog_count >= 1. Idempotent upsert.
 */

const fs = require('fs');
const path = require('path');
const {
  getSupabase,
  buildCanonicalUrl,
  sleep,
  fetchAllGenes,
  fetchAllModelTypes,
  writeCache,
  CACHE_DIR,
} = require('./gene-expansion/utils');
const { computeIsIndexable } = require('./gene-expansion/gates');

const CACHE_PATH = path.join(__dirname, 'gene-expansion', '.cache', 'catalog-counts.json');

function loadCatalogCounts() {
  if (!fs.existsSync(CACHE_PATH)) {
    console.warn('No catalog-counts cache. Run gene-expansion:ingest first.');
    return {};
  }
  return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
}

function getCatalogCount(counts, geneSymbol, slug) {
  return counts[geneSymbol]?.[slug] ?? 0;
}

async function main() {
  const supabase = getSupabase(true);
  const catalogCounts = loadCatalogCounts();

  const genes = await fetchAllGenes(supabase);
  const types = await fetchAllModelTypes(supabase);
  console.log(`Generating for ${genes.length} genes × ${types.length} modifications`);

  const stats = {
    skippedCatalog: 0,
    generated: 0,
    indexable: 0,
    noindex: 0,
    retired: 0,
    retiredUrls: [],
    byMod: {},
  };

  for (const mt of types ?? []) {
    stats.byMod[mt.slug] = { generated: 0, indexable: 0, skipped: 0 };
  }

  const BATCH = 500;
  let batch = [];

  async function flush() {
    if (!batch.length) return;
    const { error } = await supabase.from('gene_type_page').upsert(batch, {
      onConflict: 'gene_id,model_type_id',
    });
    if (error) throw error;
    batch = [];
  }

  // Retire build_inquiry rows where catalog now has inventory
  for (const gene of genes ?? []) {
    for (const mt of types ?? []) {
      const catalogCount = getCatalogCount(catalogCounts, gene.symbol, mt.slug);
      if (catalogCount >= 1) {
        stats.skippedCatalog++;
        stats.byMod[mt.slug].skipped++;

        const { data: existing } = await supabase
          .from('gene_type_page')
          .select('id')
          .eq('gene_id', gene.id)
          .eq('model_type_id', mt.id)
          .maybeSingle();

        if (existing) {
          await supabase.from('gene_type_page').delete().eq('id', existing.id);
          stats.retired++;
          stats.retiredUrls.push({
            gene: gene.symbol,
            modSlug: mt.slug,
            url: buildCanonicalUrl(gene.symbol, mt.slug),
            note: 'Catalog inventory now serves this URL; orchestrator prefers catalog at same path',
          });
        }
        continue;
      }

      const { isIndexable } = computeIsIndexable(gene, mt);
      const row = {
        gene_id: gene.id,
        model_type_id: mt.id,
        page_mode: 'build_inquiry',
        catalog_count: catalogCount,
        is_indexable: isIndexable,
        canonical_url: buildCanonicalUrl(gene.symbol, mt.slug),
        generated_at: new Date().toISOString(),
      };

      batch.push(row);
      stats.generated++;
      stats.byMod[mt.slug].generated++;
      if (isIndexable) {
        stats.indexable++;
        stats.byMod[mt.slug].indexable++;
      } else {
        stats.noindex++;
      }

      if (batch.length >= BATCH) {
        await flush();
        await sleep(50);
      }
    }
  }

  await flush();

  const reportPath = path.join(CACHE_DIR, 'generation-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(stats, null, 2));
  if (stats.retiredUrls.length) {
    writeCache('retirement-log.json', stats.retiredUrls);
  }

  console.log('\nGeneration complete:');
  console.log(JSON.stringify(stats, null, 2));
  console.log(`Report: ${reportPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
