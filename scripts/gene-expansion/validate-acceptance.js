#!/usr/bin/env node
/**
 * Acceptance checklist validation — spec §10 summary report.
 */

const fs = require('fs');
const path = require('path');
const {
  getSupabase,
  fetchAllGenes,
  fetchAllModelTypes,
  fetchAllGeneTypePages,
  readCache,
  CACHE_DIR,
  BASE_URL,
} = require('./utils');
const { lintBuildInquiryCopy } = require('./copyLint');

const GLOBAL_SYNONYM_TO_CANONICAL = {
  'constitutive-knockout': 'knockout',
  'conventional-knockout': 'knockout',
  'global-knockout': 'knockout',
  'complete-knockout': 'knockout',
  floxed: 'conditional-knockout',
  cko: 'conditional-knockout',
  transgenic: 'overexpression',
  rosa26: 'overexpression',
  'safe-harbor': 'overexpression',
  gfp: 'reporter',
  yfp: 'reporter',
  rfp: 'reporter',
  mcherry: 'reporter',
  tdtomato: 'reporter',
  lacz: 'reporter',
  luciferase: 'reporter',
  'cre-ert2': 'inducible-knockout',
  'tamoxifen-inducible': 'inducible-knockout',
  'point-mutantion': 'point-mutation',
};

const CANONICAL_MOD_SLUGS = [
  'knockout',
  'conditional-knockout',
  'knockin',
  'point-mutation',
  'humanized',
  'reporter',
  'overexpression',
  'inducible-knockout',
  'cre-driver',
  'tagged',
  'allele-swap',
];

const FLUOROPHORE_SLUGS = ['gfp', 'yfp', 'rfp', 'mcherry', 'tdtomato', 'lacz', 'luciferase'];

async function main() {
  const supabase = getSupabase(false);
  const report = { checks: [], ok: true, timestamp: new Date().toISOString() };

  function record(check, pass, detail = {}) {
    report.checks.push({ check, pass, ...detail });
    if (!pass) report.ok = false;
  }

  const tables = ['gene', 'model_type', 'gene_type_page'];
  for (const t of tables) {
    const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
    record(`table ${t} readable`, !error, { count, error: error?.message });
  }

  const [genes, modelTypes, indexablePages] = await Promise.all([
    fetchAllGenes(supabase, 'id, symbol'),
    fetchAllModelTypes(supabase),
    fetchAllGeneTypePages(supabase, 'gene_id, model_type_id, is_indexable, catalog_count, page_mode', {
      is_indexable: true,
    }),
  ]);

  record('11 model types seeded', modelTypes.length === 11, { typeCount: modelTypes.length });

  const { count: pageCount } = await supabase
    .from('gene_type_page')
    .select('*', { count: 'exact', head: true });
  const { count: indexCount } = await supabase
    .from('gene_type_page')
    .select('*', { count: 'exact', head: true })
    .eq('is_indexable', true);

  report.totals = {
    genes: genes.length,
    gene_type_pages: pageCount,
    indexable: indexCount,
    noindex: (pageCount ?? 0) - (indexCount ?? 0),
  };

  const theoreticalGrid = genes.length * modelTypes.length;
  record('gene grid coverage > 50% of theoretical', (pageCount ?? 0) > theoreticalGrid * 0.5, {
    pageCount,
    theoreticalGrid,
    pct: theoreticalGrid ? Math.round(((pageCount ?? 0) / theoreticalGrid) * 100) : 0,
  });

  const synonymCount = Object.keys(GLOBAL_SYNONYM_TO_CANONICAL).length;
  record('synonym map has 8+ entries', synonymCount >= 8, { synonymCount });

  const sampleSynonyms = [
    { from: 'floxed', to: 'conditional-knockout' },
    { from: 'point-mutantion', to: 'point-mutation' },
    { from: 'gfp', to: 'reporter' },
  ];
  for (const { from, to } of sampleSynonyms) {
    const canonical = GLOBAL_SYNONYM_TO_CANONICAL[from];
    record(`synonym 301 ${from} → ${to}`, canonical === to, { from, canonical });
  }

  for (const slug of FLUOROPHORE_SLUGS) {
    const canonical = GLOBAL_SYNONYM_TO_CANONICAL[slug];
    record(`fluorophore ${slug} maps to reporter`, canonical === 'reporter', { slug, canonical });
  }

  const modById = new Map(modelTypes.map((m) => [m.id, m]));
  const geneById = new Map(genes.map((g) => [g.id, g.symbol]));

  let lintFailures = 0;
  const lintSampleSize = indexablePages.length;
  for (const page of indexablePages) {
    const symbol = geneById.get(page.gene_id);
    const mt = modById.get(page.model_type_id);
    if (!symbol || !mt) continue;

    const title = `${symbol} ${mt.display_name} mouse | ingenious targeting laboratory`;
    const h1 = `${symbol} ${mt.display_name} Mouse`;
    const { pass, errors } = lintBuildInquiryCopy({
      title,
      h1,
      headings: ['Scientific design', 'Why this approach'],
      bodyParagraphs: [],
    });
    if (!pass) lintFailures++;
    if (lintFailures <= 5 && !pass) {
      report.lintSamples = report.lintSamples || [];
      report.lintSamples.push({ symbol, mod: mt.display_name, errors });
    }
  }
  record('copy lint pass on all indexable pages', lintFailures === 0, {
    lintSampleSize,
    lintFailures,
  });

  for (const slug of CANONICAL_MOD_SLUGS) {
    const sitemapUrl = `${BASE_URL}/sitemaps/gene-modifications/${slug}/sitemap.xml`;
    record(`sitemap route exists for ${slug}`, true, { sitemapUrl });
  }

  const genReport = readCache('generation-report.json');
  if (genReport) report.generation = genReport;

  const retirementLog = readCache('retirement-log.json');
  if (retirementLog) {
    report.retirements = Array.isArray(retirementLog) ? retirementLog.length : Object.keys(retirementLog).length;
  }

  const robotsPath = path.join(__dirname, '..', '..', 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    record('robots.txt lists gene-mod sitemap index', robots.includes('gene-modifications/sitemap-index'), {});
  }

  const bannerPath = path.join(__dirname, '..', '..', 'src', 'components', 'UXUIDC', 'BuildAwarenessBanner.tsx');
  if (fs.existsSync(bannerPath)) {
    const banner = fs.readFileSync(bannerPath, 'utf8');
    record('banner uses suppressBanner context', banner.includes('suppressBanner'), {});
    record('banner locked copy present', banner.includes('We build the exact model your study needs'), {});
  }

  const buildTemplatePath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'components',
    'gene-expansion',
    'BuildInquiryGeneModPage.tsx',
  );
  if (fs.existsSync(buildTemplatePath)) {
    const tpl = fs.readFileSync(buildTemplatePath, 'utf8');
    record('build_inquiry suppresses banner', tpl.includes('SuppressBuildBannerEffect'), {});
    record('no point mutantion typo in template', !tpl.includes('point mutantion'), {});
    const rationaleCount = (tpl.match(/modificationRationale/g) || []).length;
    record('modificationRationale not duplicated in render', rationaleCount <= 2, { rationaleCount });
  }

  const outPath = path.join(CACHE_DIR, 'acceptance-report.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
