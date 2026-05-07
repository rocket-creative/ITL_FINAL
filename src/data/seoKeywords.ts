/**
 * Keyword targets and allowlists for Tier 1 / Tier 4 generateStaticParams.
 * Expand from GSC exports as needed.
 */

import { modSlugToCanonical } from '@/lib/seo/slugs';

export interface KeywordTarget {
  query: string;
  primaryUrl: string;
  estVolume?: number;
  currentPosition?: number;
  gscImpressions?: number;
}

const BASE = 'https://www.genetargeting.com';

/** Flagship genes for cold-start SEO (deduped). */
export const TIER1_GENE_SEED = [
  'Trp53',
  'Brca1',
  'Brca2',
  'Pten',
  'Myc',
  'Kras',
  'Apc',
  'Rb1',
  'Egfr',
  'Erbb2',
  'Pdcd1',
  'Cd274',
  'Ctla4',
  'Lag3',
  'Havcr2',
  'Tigit',
  'Pdcd1lg2',
  'App',
  'Psen1',
  'Psen2',
  'Mapt',
  'Snca',
  'Htt',
  'Sod1',
  'Apoe',
  'Tardbp',
  'Fus',
  'Lepr',
  'Pparg',
  'Insr',
  'Foxo1',
  'Fgf21',
  'Adipoq',
  'Glp1r',
  'Tnf',
  'Il6',
  'Il10',
  'Il17a',
  'Foxp3',
  'Stat3',
  'Stat6',
  'Nfkb1',
  'Ldlr',
  'Pcsk9',
  'Myh6',
  'Myh7',
] as const;

/** Mod slugs with real catalog coverage; trim list to control build surface. */
export const TIER1_MOD_SLUGS = [
  'conditional-knockout',
  'knockout',
  'knockin',
  'humanized',
] as const;

export type Tier1Param = { geneName: string; modSlug: (typeof TIER1_MOD_SLUGS)[number] };
export type Tier4Param = { geneName: string; modSlug: string; tissueOrDriverSlug: string };

export function tier1GenerateStaticParams(): { geneName: string; modSlug: string }[] {
  const out: { geneName: string; modSlug: string }[] = [];
  for (const geneName of TIER1_GENE_SEED) {
    for (const modSlug of TIER1_MOD_SLUGS) {
      if (!modSlugToCanonical(modSlug)) continue;
      out.push({ geneName, modSlug });
    }
  }
  return out.slice(0, 150);
}

/** Curated high-demand gene × mod × tissue or driver (~50). Tissue uses line-specific slug. */
const TIER4_SEED: Tier4Param[] = [
  { geneName: 'Trp53', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Trp53', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'albumin-cre' },
  { geneName: 'Pten', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Pten', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'albumin-cre' },
  { geneName: 'Brca1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Brca2', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Kras', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Myc', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Apc', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'intestine-specific' },
  { geneName: 'Pdcd1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 't-cell-specific' },
  { geneName: 'Pdcd1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'cd4-cre' },
  { geneName: 'Cd274', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Ctla4', modSlug: 'conditional-knockout', tissueOrDriverSlug: 't-cell-specific' },
  { geneName: 'Lag3', modSlug: 'conditional-knockout', tissueOrDriverSlug: 't-cell-specific' },
  { geneName: 'Egfr', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'lung-specific' },
  { geneName: 'Egfr', modSlug: 'knockout', tissueOrDriverSlug: 'lung-specific' },
  { geneName: 'Erbb2', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'mammary-specific' },
  { geneName: 'Apoe', modSlug: 'knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'App', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'neuron-specific' },
  { geneName: 'App', modSlug: 'knockout', tissueOrDriverSlug: 'forebrain-specific' },
  { geneName: 'Mapt', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'neuron-specific' },
  { geneName: 'Snca', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'neuron-specific' },
  { geneName: 'Htt', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'neuron-specific' },
  { geneName: 'Sod1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'neuron-specific' },
  { geneName: 'Tnf', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'myeloid-specific' },
  { geneName: 'Il6', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'myeloid-specific' },
  { geneName: 'Il6', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Foxp3', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'treg-specific' },
  { geneName: 'Foxp3', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'foxp3-cre' },
  { geneName: 'Stat3', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Nfkb1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'myeloid-specific' },
  { geneName: 'Myh6', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'heart-specific' },
  { geneName: 'Myh6', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'myh6-cre' },
  { geneName: 'Insr', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'pancreas-beta-specific' },
  { geneName: 'Pparg', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'adipocyte-specific' },
  { geneName: 'Ldlr', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Pcsk9', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'liver-specific' },
  { geneName: 'Rb1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'retina-specific' },
  { geneName: 'Mtor', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'kidney-specific' },
  { geneName: 'Vegfa', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'endothelial-specific' },
  { geneName: 'Flt1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'endothelial-specific' },
  { geneName: 'Cdh5', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'endothelial-specific' },
  { geneName: 'Lepr', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'neuron-specific' },
  { geneName: 'Glp1r', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'pancreas-beta-specific' },
  { geneName: 'Cd19', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'b-cell-specific' },
  { geneName: 'Ms4a1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'cd19-cre' },
  { geneName: 'Pik3ca', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'mammary-specific' },
  { geneName: 'Tigit', modSlug: 'conditional-knockout', tissueOrDriverSlug: 't-cell-specific' },
  { geneName: 'Havcr2', modSlug: 'conditional-knockout', tissueOrDriverSlug: 't-cell-specific' },
  { geneName: 'Cx3cr1', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'microglia-specific' },
  { geneName: 'Trem2', modSlug: 'conditional-knockout', tissueOrDriverSlug: 'microglia-specific' },
];

export function tier4GenerateStaticParams(): { geneName: string; modSlug: string; tissueOrDriverSlug: string }[] {
  return TIER4_SEED.slice(0, 55);
}

function tierPath(gene: string, modSlug: string, third?: string): string {
  const g = encodeURIComponent(gene);
  if (third) return `/all-catalog-mouse-models/gene/${g}/${modSlug}/${third}/`;
  return `/all-catalog-mouse-models/gene/${g}/${modSlug}/`;
}

export const seoKeywords: KeywordTarget[] = (() => {
  const targets: KeywordTarget[] = [];
  for (const g of TIER1_GENE_SEED) {
    for (const ms of TIER1_MOD_SLUGS) {
      const canon = modSlugToCanonical(ms);
      if (!canon) continue;
      const q = `${g} ${canon.toLowerCase()} mouse`;
      targets.push({ query: q, primaryUrl: `${BASE}${tierPath(g, ms)}` });
    }
  }
  for (const row of TIER4_SEED) {
    targets.push({
      query: `${row.geneName} ${(modSlugToCanonical(row.modSlug) ?? '').toLowerCase()} ${row.tissueOrDriverSlug.replace(/-/g, ' ')}`,
      primaryUrl: `${BASE}${tierPath(row.geneName, row.modSlug, row.tissueOrDriverSlug)}`,
    });
  }
  targets.push(
    { query: 'liver specific cre mouse', primaryUrl: `${BASE}/cre-lines/liver-specific/` },
    { query: 't cell specific cre', primaryUrl: `${BASE}/cre-lines/t-cell-specific/` },
    { query: 'albumin cre mouse', primaryUrl: `${BASE}/cre-drivers/albumin-cre/` },
    { query: 'cd4 cre mouse', primaryUrl: `${BASE}/cre-drivers/cd4-cre/` }
  );
  return targets;
})();
