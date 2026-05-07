/**
 * Server-side catalog utilities
 * Used by Server Components (page.tsx, gene-index/page.tsx).
 * Queries Supabase directly — never expose in 'use client' files.
 */

import { supabase, type CatalogRow } from './supabaseClient';

export interface ServerCatalogModel {
  id: string;
  geneName: string;
  modelAbbrev: string;
  modelType: string;
  category: string;
  availability: string;
  catalogNumber: string;
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
 * Server-side search — used by page.tsx SSR preload.
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
 * All unique gene names sorted A–Z (for gene-index page).
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
      if (g) seen.add(g);
    }

    if (data.length < PAGE) break; // last page
    from += PAGE;
  }

  return Array.from(seen).sort((a, b) => a.localeCompare(b));
}

/**
 * All catalog models with full data (including catalog numbers), sorted A–Z by gene name.
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

  return results.map(toModel);
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
  return [...new Set(data.map((r) => r.gene_name).filter(Boolean))].slice(0, limit);
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
      if (g && t) keys.add(`${g}\u0001${t}`);
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
