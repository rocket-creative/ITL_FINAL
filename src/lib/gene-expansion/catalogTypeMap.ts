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
    // "fluorescent" is excluded so plain knockin and reporter stay disjoint:
    // the catalog's category vocabulary says "Fluorescent Model" where this
    // table said "reporter", so without it both slugs matched the same rows.
    categoryExcludes: ['point mutation', 'reporter', 'fluorescent', 'tag', 'cdna', 'humanized'],
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
    // "fluorescent" is how the catalog actually labels reporter lines
    // ("Fluorescent Model"); none of the marker names below appear in the
    // category column, so without it this rule matched nothing.
    categoryIncludes: [
      'reporter',
      'fluorescent',
      'gfp',
      'yfp',
      'rfp',
      'mcherry',
      'tdtomato',
      'lacz',
      'luciferase',
    ],
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

/**
 * Human label for a modification slug, mirroring model_type.display_name.
 *
 * `slugToCatalogDisplay` returns the broad catalog model_type a slug matches
 * against ("Knockin" for reporter, point-mutation, tag-knockin, cdna-knockin),
 * which is the wrong string to show a reader: it put the H1 "<gene> Knockin
 * mouse models" on five different URLs. Use this for anything user facing and
 * `slugToCatalogDisplay` only for matching catalog rows.
 */
export const SLUG_DISPLAY_LABEL: Record<string, string> = {
  knockout: 'Knockout',
  'conditional-knockout': 'Conditional Knockout',
  'inducible-knockout': 'Inducible Knockout',
  knockin: 'Knockin',
  'point-mutation': 'Point Mutation Knockin',
  'cdna-knockin': 'cDNA Knockin',
  humanized: 'Humanized',
  reporter: 'Reporter',
  overexpression: 'Overexpression / Safe Harbor',
  'cre-driver': 'Cre Driver Line',
  'tag-knockin': 'Epitope Tag Knockin',
};

/** Display label for a slug, falling back to the catalog model type. */
export function slugDisplayLabel(slug: string, fallback: string): string {
  return SLUG_DISPLAY_LABEL[slug.toLowerCase().trim()] ?? fallback;
}

/** True when this slug has its own catalog match rule. */
export function hasCatalogRuleForSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(CATALOG_MATCH_BY_SLUG, slug.toLowerCase().trim());
}

/**
 * Catalog rows that genuinely belong to a modification slug.
 *
 * Prefer this over comparing `model.modelType` to the slug's broad catalog
 * type. Several slugs collapse onto one model_type, so the bare comparison
 * served identical model tables (and identical copy) from distinct URLs:
 * knockin / reporter / point-mutation / tag-knockin / cdna-knockin all
 * rendered every Knockin row, and inducible-knockout rendered every
 * Conditional Knockout row — advertising floxed lines as inducible stock.
 * Slugs without a rule (e.g. transgenic, immunodeficient) keep exact matching.
 */
export function catalogModelsForSlug(
  models: ServerCatalogModel[],
  slug: string,
  modelType: string | null,
): ServerCatalogModel[] {
  const key = slug.toLowerCase().trim();
  if (hasCatalogRuleForSlug(key)) {
    return filterCatalogForSlug(models, key as CanonicalModSlug);
  }
  if (!modelType) return [];
  return models.filter((m) => normalizeCatalogString(m.modelType) === modelType);
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
