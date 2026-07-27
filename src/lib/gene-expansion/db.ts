/**
 * Gene expansion database types and server queries.
 */

import { cache } from 'react';
import { supabase } from '@/lib/catalog/supabaseClient';

export type ImpcViability = 'viable' | 'subviable' | 'lethal' | 'unknown';
export type ExpressionSpecificity = 'restricted' | 'broad' | 'ubiquitous' | 'unknown';
export type PageMode = 'build_inquiry';
export type GateRule =
  | 'all'
  | 'ortholog'
  | 'variant'
  | 'expression_restricted'
  | 'gain_of_function'
  | 'conditional_viability';

export interface GeneRow {
  id: string;
  symbol: string;
  mgi_id: string | null;
  name: string | null;
  synonyms: string[];
  human_ortholog_symbol: string | null;
  human_ortholog_hgnc: string | null;
  has_human_ortholog: boolean;
  impc_viability: ImpcViability;
  impc_zygosity: string | null;
  expression_profile: Record<string, unknown> | null;
  expression_specificity: ExpressionSpecificity;
  clinvar_pathogenic_count: number;
  omim_ids: string[];
  disease_associated: boolean;
  existing_allele_count: number;
  existing_conditional_count: number;
  existing_knockout_count: number;
  updated_at: string;
}

export interface ModelTypeRow {
  id: string;
  slug: string;
  display_name: string;
  parent_id: string | null;
  is_per_gene: boolean;
  synonyms: string[];
  gate_rule: GateRule;
}

export interface GeneTypePageRow {
  id: string;
  gene_id: string;
  model_type_id: string;
  page_mode: PageMode;
  catalog_count: number;
  is_indexable: boolean;
  canonical_url: string;
  generated_at: string;
}

export interface BuildInquiryPageContext {
  gene: GeneRow;
  modelType: ModelTypeRow;
  page: GeneTypePageRow;
}

export const getGeneBySymbol = cache(async (symbol: string): Promise<GeneRow | null> => {
  const { data, error } = await supabase
    .from('gene')
    .select('*')
    .eq('symbol', symbol)
    .maybeSingle();

  if (error || !data) return null;
  return data as GeneRow;
});

export const getModelTypeBySlug = cache(async (slug: string): Promise<ModelTypeRow | null> => {
  const { data, error } = await supabase
    .from('model_type')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) return null;
  return data as ModelTypeRow;
});

export const getBuildInquiryPage = cache(
  async (geneSymbol: string, modSlug: string): Promise<BuildInquiryPageContext | null> => {
    const gene = await getGeneBySymbol(geneSymbol);
    if (!gene) return null;

    const modelType = await getModelTypeBySlug(modSlug);
    if (!modelType) return null;

    const { data, error } = await supabase
      .from('gene_type_page')
      .select('*')
      .eq('gene_id', gene.id)
      .eq('model_type_id', modelType.id)
      .eq('page_mode', 'build_inquiry')
      .maybeSingle();

    if (error || !data) return null;

    return {
      gene,
      modelType,
      page: data as GeneTypePageRow,
    };
  },
);

export async function getIndexableBuildInquiryLinksForGene(
  geneSymbol: string,
): Promise<Array<{ slug: string; displayName: string; href: string }>> {
  const gene = await getGeneBySymbol(geneSymbol);
  if (!gene) return [];

  const { data: pages } = await supabase
    .from('gene_type_page')
    .select('is_indexable, model_type_id, canonical_url')
    .eq('gene_id', gene.id)
    .eq('page_mode', 'build_inquiry')
    .eq('is_indexable', true);

  if (!pages?.length) return [];

  const typeIds = pages.map((p) => p.model_type_id);
  const { data: types } = await supabase.from('model_type').select('id, slug, display_name').in('id', typeIds);

  const typeById = new Map((types ?? []).map((t) => [t.id, t]));

  return pages
    .map((p) => {
      const t = typeById.get(p.model_type_id);
      if (!t) return null;
      return {
        slug: t.slug,
        displayName: t.display_name,
        href: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneSymbol)}/${t.slug}/`,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

/**
 * Every indexable build-inquiry URL for a modification, across all genes.
 * Paginates in 1 000-row pages to work around Supabase's default row cap;
 * this spans the whole gene set, so it routinely exceeds a single page.
 */
export async function getIndexableBuildInquiryUrlsByModSlug(
  modSlug: string,
): Promise<Array<{ url: string; lastModified: Date }>> {
  const modelType = await getModelTypeBySlug(modSlug);
  if (!modelType) return [];

  const out: Array<{ url: string; lastModified: Date }> = [];
  const PAGE = 1000;
  let from = 0;

  for (;;) {
    const { data, error } = await supabase
      .from('gene_type_page')
      .select('canonical_url, generated_at')
      .eq('model_type_id', modelType.id)
      .eq('page_mode', 'build_inquiry')
      .eq('is_indexable', true)
      .order('canonical_url')
      .range(from, from + PAGE - 1);

    if (error || !data || data.length === 0) break;

    for (const p of data) {
      out.push({ url: p.canonical_url, lastModified: new Date(p.generated_at) });
    }

    if (data.length < PAGE) break; // last page
    from += PAGE;
  }

  return out;
}

export async function getSiblingBuildInquiryPages(
  geneSymbol: string,
  currentSlug: string,
): Promise<Array<{ slug: string; displayName: string; href: string; isIndexable: boolean }>> {
  const gene = await getGeneBySymbol(geneSymbol);
  if (!gene) return [];

  const { data: pages } = await supabase
    .from('gene_type_page')
    .select('is_indexable, model_type_id')
    .eq('gene_id', gene.id)
    .eq('page_mode', 'build_inquiry');

  if (!pages?.length) return [];

  const typeIds = pages.map((p) => p.model_type_id);
  const { data: types } = await supabase.from('model_type').select('id, slug, display_name').in('id', typeIds);

  const typeById = new Map((types ?? []).map((t) => [t.id, t]));

  return pages
    .map((p) => {
      const t = typeById.get(p.model_type_id);
      if (!t || t.slug === currentSlug) return null;
      return {
        slug: t.slug,
        displayName: t.display_name,
        href: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneSymbol)}/${t.slug}/`,
        isIndexable: p.is_indexable,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export const CANONICAL_MOD_SLUGS = [
  'knockout',
  'conditional-knockout',
  'inducible-knockout',
  'knockin',
  'point-mutation',
  'cdna-knockin',
  'humanized',
  'reporter',
  'overexpression',
  'cre-driver',
  'tag-knockin',
] as const;

export type CanonicalModSlug = (typeof CANONICAL_MOD_SLUGS)[number];
