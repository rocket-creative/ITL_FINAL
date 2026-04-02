/**
 * Catalog API Route — powered by Supabase
 *
 * GET /api/catalog?q=Flt4          → search results (up to 25)
 * GET /api/catalog?q=Flt4&limit=50 → search results (up to 50)
 * GET /api/catalog?stats=true      → aggregate stats for the UI counters
 *
 * Search strategy (tiered for maximum relevance):
 *   1. gene_name prefix  — "Flt4%" (fastest, highest relevance)
 *   2. Full-text search  — weighted tsvector (handles multi-word queries)
 *   3. Broad contains    — model_abbreviation / catalog number fallback
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase, type CatalogRow, type CatalogStats } from '@/lib/catalog/supabaseClient';

export const dynamic   = 'force-dynamic';
export const runtime   = 'nodejs';

const querySchema = z.object({
  q:     z.string().max(100).optional(),
  limit: z.coerce.number().min(1).max(100).optional().default(25),
  stats: z.string().optional(),
});

const noStore = { 'Cache-Control': 'no-store' };
const cache1m = { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' };

// ─── Stats endpoint ───────────────────────────────────────────────────────────
async function getStats(): Promise<NextResponse> {
  const { data, error } = await supabase
    .from('catalog_stats')
    .select('*')
    .single();

  if (error || !data) {
    // Fallback: count manually
    const { count } = await supabase
      .from('catalog_models')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json(
      { total_models: count ?? 0, unique_genes: 0, model_types: 0, categories: 0, live_models: 0 } as CatalogStats,
      { headers: cache1m }
    );
  }

  return NextResponse.json(data as CatalogStats, { headers: cache1m });
}

// ─── Search ───────────────────────────────────────────────────────────────────
const FIELDS = 'id,gene_name,model_abbreviation,model_type,category,availability,itl_catalog_number';

async function searchCatalog(query: string, limit: number): Promise<NextResponse> {
  const q    = query.trim();
  const seen = new Set<number>();
  const rows: CatalogRow[] = [];

  // Tier 1: gene_name prefix (e.g. "Flt4" → all Flt4-* models first)
  const { data: t1 } = await supabase
    .from('catalog_models')
    .select(FIELDS)
    .ilike('gene_name', `${q}%`)
    .order('gene_name')
    .limit(limit);

  for (const r of t1 ?? []) { seen.add(r.id); rows.push(r); }

  if (rows.length < limit) {
    // Tier 2: weighted full-text search (handles "Flt4 Cre", "humanized PD1", etc.)
    const ftQuery = q.split(/\s+/).filter(Boolean).join(' & ');
    const { data: t2 } = await supabase
      .from('catalog_models')
      .select(FIELDS)
      .textSearch('search_vector', ftQuery, { type: 'plain', config: 'simple' })
      .limit(limit);

    for (const r of t2 ?? []) {
      if (!seen.has(r.id)) { seen.add(r.id); rows.push(r); }
    }
  }

  if (rows.length < limit) {
    // Tier 3: broad contains — model abbreviation, category, catalog number
    const { data: t3 } = await supabase
      .from('catalog_models')
      .select(FIELDS)
      .or(`model_abbreviation.ilike.%${q}%,category.ilike.%${q}%,itl_catalog_number.ilike.%${q}%`)
      .order('gene_name')
      .limit(limit);

    for (const r of t3 ?? []) {
      if (!seen.has(r.id)) { seen.add(r.id); rows.push(r); }
    }
  }

  const models = rows.slice(0, limit).map((r) => ({
    id:            String(r.id),
    geneName:      r.gene_name,
    modelAbbrev:   r.model_abbreviation,
    modelType:     r.model_type,
    category:      r.category,
    availability:  r.availability,
    catalogNumber: r.itl_catalog_number,
  }));

  return NextResponse.json({ models, total: models.length }, { headers: cache1m });
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const sp     = request.nextUrl.searchParams;
  const parsed = querySchema.safeParse({
    q:     sp.get('q')     ?? undefined,
    limit: sp.get('limit') ?? undefined,
    stats: sp.get('stats') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400, headers: noStore });
  }

  const { q, limit, stats } = parsed.data;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(
      { error: 'Catalog not configured', message: 'NEXT_PUBLIC_SUPABASE_URL is not set.' },
      { status: 503, headers: noStore }
    );
  }

  try {
    if (stats === 'true') return await getStats();
    if (q?.trim())        return await searchCatalog(q.trim(), limit);

    // No query — return empty (stats are fetched separately)
    return NextResponse.json({ models: [], total: 0 }, { headers: noStore });
  } catch (e) {
    console.error('[api/catalog]', e);
    return NextResponse.json(
      { error: 'Catalog search failed', message: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500, headers: noStore }
    );
  }
}
