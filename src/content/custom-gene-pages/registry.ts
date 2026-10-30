import type { CatalogLookup } from '@/components/UXUIDC/catalogLookupMap';
import { BATCH1_GENE_PAGES } from './batch1';
import { BATCH2_GENE_PAGES } from './batch2';
import { BATCH3_GENE_PAGES } from './batch3';
import { BATCH4_GENE_PAGES } from './batch4';
import { BATCH5_GENE_PAGES } from './batch5';
import { BATCH6_GENE_PAGES } from './batch6';
import { BATCH7_GENE_PAGES } from './batch7';
import { BATCH8_GENE_PAGES } from './batch8';
import { BATCH9_GENE_PAGES } from './batch9';
import { BATCH10_GENE_PAGES } from './batch10';
import type { CustomGenePageData } from './types';

const INDEX_PATH = '/custom-mouse-models/gene';

const CUSTOM_GENE_PAGES: CustomGenePageData[] = [
  ...BATCH1_GENE_PAGES,
  ...BATCH2_GENE_PAGES,
  ...BATCH3_GENE_PAGES,
  ...BATCH4_GENE_PAGES,
  ...BATCH5_GENE_PAGES,
  ...BATCH6_GENE_PAGES,
  ...BATCH7_GENE_PAGES,
  ...BATCH8_GENE_PAGES,
  ...BATCH9_GENE_PAGES,
  ...BATCH10_GENE_PAGES,
];

const byExact = new Map(CUSTOM_GENE_PAGES.map((page) => [page.symbol, page]));
const byLower = new Map(CUSTOM_GENE_PAGES.map((page) => [page.symbol.toLowerCase(), page]));

export function listCustomGenePages(): CustomGenePageData[] {
  return CUSTOM_GENE_PAGES;
}

export function getCustomGenePage(symbol: string): CustomGenePageData | undefined {
  return byExact.get(symbol);
}

export function getCustomGenePageIgnoreCase(symbol: string): CustomGenePageData | undefined {
  return byLower.get(symbol.toLowerCase());
}

export function customGenePath(symbol: string): string {
  return `${INDEX_PATH}/${encodeURIComponent(symbol)}`;
}

export function customGeneHref(symbol: string): string {
  return `${customGenePath(symbol)}/`;
}

export function customGeneIndexPath(): string {
  return INDEX_PATH;
}

export function customGeneSitemapPaths(): string[] {
  return [INDEX_PATH, ...CUSTOM_GENE_PAGES.map((page) => customGenePath(page.symbol))];
}

export function catalogGeneHref(symbol: string): string {
  return `/all-catalog-mouse-models/gene/${encodeURIComponent(symbol)}/`;
}

/** First sentence of a Why Model paragraph, punctuation included. */
export function firstSentence(paragraph: string): string {
  const match = paragraph.match(/^[\s\S]+?\.(?=\s+[A-Z]|$)/);
  return match ? match[0] : paragraph;
}

const RELATED_PREFIX = 'Related gene targets: ';

export function relatedTargetSymbols(line: string): string[] {
  if (!line.startsWith(RELATED_PREFIX)) return [];
  return line.slice(RELATED_PREFIX.length).split(' · ').filter((symbol) => symbol.length > 0);
}

export function fieldValue(page: CustomGenePageData, label: string): string {
  return page.fields.find((field) => field.label === label)?.value ?? '';
}

export function catalogLookupForGene(page: CustomGenePageData): Partial<CatalogLookup> {
  return {
    searchHref: catalogGeneHref(page.symbol),
    searchLabel: 'Browse catalog models',
    genes: [
      {
        symbol: page.symbol,
        slug: page.symbol,
        blurb: fieldValue(page, 'Aliases'),
      },
    ],
  };
}

export const MODEL_OPTION_HREFS: Record<string, string> = {
  'Conventional knockout': '/conventional-knockout-mouse-models/',
  'Conditional knockout': '/conditional-knockout-mouse-models/',
  'Point mutation / knockin': '/point-mutation-mice/',
  'Reporter knockin': '/reporter-knockin/',
  Humanized: '/humanized-mouse-models/',
  'Targeted transgenic': '/transgenic-mouse-service/',
};
