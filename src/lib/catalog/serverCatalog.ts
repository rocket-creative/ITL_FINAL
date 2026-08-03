/**
 * Server-side catalog utilities
 * Used by Server Components (page.tsx, gene-index/page.tsx).
 * Queries Supabase directly, never expose in 'use client' files.
 */

import { supabase, type CatalogRow } from './supabaseClient';
import { tier4GenerateStaticParams } from '@/data/seoKeywords';
import { modCanonicalToSlug } from '@/lib/seo/slugs';

export interface ServerCatalogModel {
  id: string;
  geneName: string;
  modelAbbrev: string;
  modelType: string;
  category: string;
  availability: string;
  catalogNumber: string;
}

/**
 * A gene name must resolve to a single URL path segment. A slash (or
 * backslash) cannot survive path routing even when percent-encoded (`%2F`
 * is normalized back to `/` and splits the segment), so any such value is
 * unroutable as a gene page and must never be turned into a URL. Malformed
 * catalog values such as "hOX40(BALB/c)" fall into this bucket.
 */
export function isUrlSafeGeneName(name: string): boolean {
  return name.length > 0 && !/[/\\]/.test(name);
}

/** Map DB row → component shape */
function toModel(row: CatalogRow): ServerCatalogModel {
  return {
    id:            String(row.id),
    geneName:      row.gene_name,
    modelAbbrev:   row.model_abbreviation,
    modelType:     row.model_type,
    category:      row.category,
    availability:  row.availability,
    catalogNumber: row.itl_catalog_number,
  };
}

/**
 * Server-side search, used by page.tsx SSR preload.
 * Tiered strategy: gene prefix → full-text → contains.
 * Returns up to `limit` results.
 */
export async function serverSearch(
  query: string,
  limit = 25
): Promise<ServerCatalogModel[]> {
  const q = query.trim();
  if (!q) return [];

  const seen = new Set<number>();
  const results: CatalogRow[] = [];

  // Tier 1: gene_name starts with query (most relevant for "Flt4")
  const { data: prefixData } = await supabase
    .from('catalog_models')
    .select('id,gene_name,model_abbreviation,model_type,category,availability,itl_catalog_number')
    .ilike('gene_name', `${q}%`)
    .order('gene_name')
    .limit(limit);

  for (const row of prefixData ?? []) {
    seen.add(row.id);
    results.push(row);
  }

  if (results.length >= limit) return results.slice(0, limit).map(toModel);

  // Tier 2: full-text search (handles multi-word, weighted by field)
  const ftQuery = q.split(/\s+/).filter(Boolean).join(' & ');
  const { data: ftData } = await supabase
    .from('catalog_models')
    .select('id,gene_name,model_abbreviation,model_type,category,availability,itl_catalog_number')
    .textSearch('search_vector', ftQuery, { type: 'plain', config: 'simple' })
    .limit(limit);

  for (const row of ftData ?? []) {
    if (!seen.has(row.id)) { seen.add(row.id); results.push(row); }
  }

  if (results.length >= limit) return results.slice(0, limit).map(toModel);

  // Tier 3: broad contains on abbreviation or catalog number
  const { data: broadData } = await supabase
    .from('catalog_models')
    .select('id,gene_name,model_abbreviation,model_type,category,availability,itl_catalog_number')
    .or(`model_abbreviation.ilike.%${q}%,itl_catalog_number.ilike.%${q}%`)
    .order('gene_name')
    .limit(limit);

  for (const row of broadData ?? []) {
    if (!seen.has(row.id)) { seen.add(row.id); results.push(row); }
  }

  return results.slice(0, limit).map(toModel);
}

/**
 * All unique gene names sorted A, Z (for gene-index page).
 * Paginates in 1 000-row pages to work around Supabase's default row cap.
 */
export async function getAllGeneNames(): Promise<string[]> {
  const seen = new Set<string>();
  const PAGE = 1000;
  let from = 0;

  for (;;) {
    const { data, error } = await supabase
      .from('catalog_models')
      .select('gene_name')
      .neq('gene_name', '')
      .order('gene_name')
      .range(from, from + PAGE - 1);

    if (error || !data || data.length === 0) break;

    for (const row of data) {
      const g = (row.gene_name ?? '').trim();
      if (isUrlSafeGeneName(g)) seen.add(g);
    }

    if (data.length < PAGE) break; // last page
    from += PAGE;
  }

  return Array.from(seen).sort((a, b) => a.localeCompare(b));
}

/**
 * All catalog models with full data (including catalog numbers), sorted A, Z by gene name.
 * Paginates in 1 000-row pages to work around Supabase's default row cap.
 * Used by gene-index page to display catalog numbers alongside gene names.
 */
export async function getAllModels(): Promise<ServerCatalogModel[]> {
  const results: CatalogRow[] = [];
  const PAGE = 1000;
  let from = 0;

  for (;;) {
    const { data, error } = await supabase
      .from('catalog_models')
      .select('id,gene_name,model_abbreviation,model_type,category,availability,itl_catalog_number')
      .neq('gene_name', '')
      .order('gene_name')
      .range(from, from + PAGE - 1);

    if (error || !data || data.length === 0) break;

    results.push(...data);

    if (data.length < PAGE) break;
    from += PAGE;
  }

  return results
    .filter((row) => isUrlSafeGeneName((row.gene_name ?? '').trim()))
    .map(toModel);
}

/**
 * All models for a specific gene name.
 * Used by individual gene pages (on-demand ISR).
 */
export async function getModelsByGene(geneName: string): Promise<ServerCatalogModel[]> {
  const { data, error } = await supabase
    .from('catalog_models')
    .select('id,gene_name,model_abbreviation,model_type,category,availability,itl_catalog_number')
    .eq('gene_name', geneName)
    .order('model_type');

  if (error || !data) return [];
  return data.map(toModel);
}

/**
 * Up to `limit` distinct gene names that share the same 3-character prefix.
 * Used for internal linking on individual gene pages.
 */
export async function getRelatedGenes(geneName: string, limit = 10): Promise<string[]> {
  const prefix = geneName.slice(0, 3);
  const { data } = await supabase
    .from('catalog_models')
    .select('gene_name')
    .ilike('gene_name', `${prefix}%`)
    .neq('gene_name', geneName)
    .order('gene_name')
    .limit(limit * 3);

  if (!data) return [];
  return [...new Set(data.map((r) => (r.gene_name ?? '').trim()).filter(isUrlSafeGeneName))].slice(0, limit);
}

// Legacy alias used by gene-index page
export async function getServerCatalog() { return []; } // no longer needed
export function uniqueGeneNames() { return []; }        // replaced by getAllGeneNames
export function filterCatalog() { return []; }          // replaced by serverSearch

/** Distinct gene_name × model_type pairs (sitemap Tier 1, ISR surfaces). */
export async function getDistinctGeneModelTypePairs(): Promise<
  { gene_name: string; model_type: string }[]
> {
  const keys = new Set<string>();
  const PAGE = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('catalog_models')
      .select('gene_name,model_type')
      .neq('gene_name', '')
      .order('gene_name')
      .range(from, from + PAGE - 1);

    if (error || !data || data.length === 0) break;

    for (const row of data) {
      const g = (row.gene_name ?? '').trim();
      const t = (row.model_type ?? '').trim();
      if (t && isUrlSafeGeneName(g)) keys.add(`${g}\u0001${t}`);
    }
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return [...keys].map((k) => {
    const [gene_name, model_type] = k.split('\u0001');
    return { gene_name: gene_name!, model_type: model_type! };
  });
}

/** Genes with conditional style catalog rows, ranked by row count. */
export async function getTopConditionalGeneNames(limit = 8): Promise<string[]> {
  const counts = new Map<string, number>();
  const PAGE = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('catalog_models')
      .select('gene_name')
      .ilike('model_type', '%Conditional%')
      .range(from, from + PAGE - 1);

    if (error || !data || data.length === 0) break;

    for (const row of data) {
      const g = (row.gene_name ?? '').trim();
      if (!g) continue;
      counts.set(g, (counts.get(g) ?? 0) + 1);
    }
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([g]) => g);
}

/** Tier 4 sitemap entries backed by at least one catalog row for gene × mod. */
export async function getIndexableTier4Params(): Promise<
  ReturnType<typeof tier4GenerateStaticParams>
> {
  const pairs = await getDistinctGeneModelTypePairs();
  const pairSet = new Set(
    pairs.map(({ gene_name, model_type }) => {
      const slug = modCanonicalToSlug(model_type);
      return slug ? `${gene_name.toLowerCase()}\u0001${slug}` : '';
    }).filter(Boolean),
  );

  return tier4GenerateStaticParams().filter((t) =>
    pairSet.has(`${t.geneName.toLowerCase()}\u0001${t.modSlug}`),
  );
}

/**
 * Per-gene indexable Tier 4 params (gene × mod × tissue/driver) that are backed
 * by at least one catalog row of the matching model type. Pure over
 * already-fetched models so callers can reuse getModelsByGene without a second
 * round trip. A combo in this list is guaranteed to render a live Tier 4 page.
 */
export function indexableTier4ParamsForModels(
  geneName: string,
  models: ServerCatalogModel[],
): ReturnType<typeof tier4GenerateStaticParams> {
  if (models.length === 0) return [];
  const typeSlugs = new Set(
    models.map((m) => modCanonicalToSlug(m.modelType)).filter(Boolean),
  );
  const lc = geneName.toLowerCase();
  return tier4GenerateStaticParams().filter(
    (t) => t.geneName.toLowerCase() === lc && typeSlugs.has(t.modSlug),
  );
}

/**
 * Prefix-sibling genes that also carry >=1 catalog row of `modelType`.
 * Guarantees cross-links to /gene/{sibling}/{modSlug}(/{tissue}) resolve 200
 * instead of 404-ing when a sibling happens to lack that model type.
 */
export async function getRelatedGenesWithModelType(
  geneName: string,
  modelType: string,
  limit = 8,
): Promise<string[]> {
  const prefix = geneName.slice(0, 3);
  const { data } = await supabase
    .from('catalog_models')
    .select('gene_name')
    .ilike('gene_name', `${prefix}%`)
    .neq('gene_name', geneName)
    .eq('model_type', modelType)
    .order('gene_name')
    .limit(limit * 4);

  if (!data) return [];
  return [...new Set(data.map((r) => r.gene_name).filter(Boolean))].slice(0, limit);
}
