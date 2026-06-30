/**
 * Maps canonical modification slugs to catalog model_type / category filters.
 */

import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import type { CanonicalModSlug } from './db';

export interface CatalogMatchRule {
  modelTypes: string[];
  categoryIncludes?: string[];
  categoryExcludes?: string[];
}

/** Normalize catalog strings at read time. */
export function normalizeCatalogString(s: string | null | undefined): string {
  if (!s) return '';
  return s.replace(/point mutantion/gi, 'point mutation').trim();
}

export const CATALOG_MATCH_BY_SLUG: Record<CanonicalModSlug, CatalogMatchRule> = {
  knockout: { modelTypes: ['Knockout'] },
  'conditional-knockout': { modelTypes: ['Conditional Knockout'] },
  'inducible-knockout': {
    modelTypes: ['Conditional Knockout'],
    categoryIncludes: ['inducible', 'creert', 'tamoxifen', 'tet'],
  },
  knockin: {
    modelTypes: ['Knockin'],
    categoryExcludes: ['point mutation', 'reporter', 'tag', 'cdna', 'humanized'],
  },
  'point-mutation': {
    modelTypes: ['Knockin'],
    categoryIncludes: ['point mutation'],
  },
  'cdna-knockin': {
    modelTypes: ['Knockin'],
    categoryIncludes: ['cdna', 'cDNA'],
  },
  humanized: { modelTypes: ['Humanized'] },
  reporter: {
    modelTypes: ['Knockin'],
    categoryIncludes: ['reporter', 'gfp', 'yfp', 'rfp', 'mcherry', 'tdtomato', 'lacz', 'luciferase'],
  },
  overexpression: { modelTypes: ['Transgenic'] },
  'cre-driver': {
    modelTypes: ['Transgenic', 'Knockin'],
    categoryIncludes: ['cre', 'driver'],
  },
  'tag-knockin': {
    modelTypes: ['Knockin'],
    categoryIncludes: ['tag', 'flag', 'ha', 'myc', 'v5'],
  },
};

function matchesRule(model: ServerCatalogModel, rule: CatalogMatchRule): boolean {
  const modelType = normalizeCatalogString(model.modelType);
  const category = normalizeCatalogString(model.category).toLowerCase();

  if (!rule.modelTypes.some((t) => modelType === t)) return false;

  if (rule.categoryIncludes?.length) {
    const hit = rule.categoryIncludes.some((needle) => category.includes(needle.toLowerCase()));
    if (!hit) return false;
  }

  if (rule.categoryExcludes?.length) {
    const excluded = rule.categoryExcludes.some((needle) => category.includes(needle.toLowerCase()));
    if (excluded) return false;
  }

  return true;
}

export function countCatalogForSlug(models: ServerCatalogModel[], slug: CanonicalModSlug): number {
  const rule = CATALOG_MATCH_BY_SLUG[slug];
  if (!rule) return 0;
  return models.filter((m) => matchesRule(m, rule)).length;
}

export function filterCatalogForSlug(
  models: ServerCatalogModel[],
  slug: CanonicalModSlug,
): ServerCatalogModel[] {
  const rule = CATALOG_MATCH_BY_SLUG[slug];
  if (!rule) return [];
  return models.filter((m) => matchesRule(m, rule));
}

/** Map build_inquiry slug to request-quote modification_type select value. */
export const SLUG_TO_QUOTE_MOD: Record<string, string> = {
  knockout: 'knockout',
  'conditional-knockout': 'conditional',
  'inducible-knockout': 'conditional',
  knockin: 'knockin',
  'point-mutation': 'point_mutation',
  'cdna-knockin': 'knockin',
  humanized: 'humanization',
  reporter: 'reporter',
  overexpression: 'knockin',
  'cre-driver': 'knockin',
  'tag-knockin': 'knockin',
};

/** Resolve slug for catalog tier pages (legacy modSlugToCanonical). */
export function slugToCatalogDisplay(slug: string): string | null {
  const map: Record<string, string> = {
    knockout: 'Knockout',
    'conditional-knockout': 'Conditional Knockout',
    'inducible-knockout': 'Conditional Knockout',
    knockin: 'Knockin',
    humanized: 'Humanized',
    overexpression: 'Transgenic',
    transgenic: 'Transgenic',
    'point-mutation': 'Knockin',
    'cdna-knockin': 'Knockin',
    reporter: 'Knockin',
    'tag-knockin': 'Knockin',
    'cre-driver': 'Transgenic',
  };
  return map[slug] ?? null;
}
