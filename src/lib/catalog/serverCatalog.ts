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
 * Uses a lean SELECT to avoid pulling unnecessary columns.
 */
export async function getAllGeneNames(): Promise<string[]> {
  const { data } = await supabase
    .from('catalog_models')
    .select('gene_name')
    .neq('gene_name', '')
    .order('gene_name');

  if (!data) return [];

  const seen = new Set<string>();
  for (const row of data) {
    const g = (row.gene_name ?? '').trim();
    if (g) seen.add(g);
  }
  return Array.from(seen).sort((a, b) => a.localeCompare(b));
}

// Legacy alias used by gene-index page
export async function getServerCatalog() { return []; } // no longer needed
export function uniqueGeneNames() { return []; }        // replaced by getAllGeneNames
export function filterCatalog() { return []; }          // replaced by serverSearch
