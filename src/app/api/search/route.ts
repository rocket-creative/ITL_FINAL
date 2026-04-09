/**
 * Unified Search API — catalog + site content
 * Searches Supabase catalog models + static site index.
 * Returns { catalog, site } for the navbar search dropdown.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { searchSiteIndex } from '@/lib/search/siteIndex';
import { checkRateLimit } from '@/lib/search/rateLimit';
import { supabase } from '@/lib/catalog/supabaseClient';

const searchQuerySchema = z.object({
  q: z
    .string()
    .max(100)
    .transform((s) => s.trim())
    .refine((s) => s.length >= 1, 'Query cannot be empty')
    .refine((s) => /^[\w\s\-.,():;/'"]+$/i.test(s), 'Invalid characters in search query'),
  limit: z
    .optional(z.coerce.number().refine((n) => n >= 10 && n <= 100, 'Limit must be between 10 and 100')),
});

const CATALOG_MAX_RESULTS = 8;
const SITE_MAX_RESULTS    = 50;
const FIELDS = 'id,gene_name,model_abbreviation,model_type,availability,itl_catalog_number';

async function searchCatalog(
  query: string,
  limit: number = CATALOG_MAX_RESULTS
): Promise<Array<{ id: string; title: string; url: string; subtitle?: string }>> {
  const q = query.trim();
  if (!q) return [];

  const seen = new Set<number>();
  const rows: Array<{ id: number; gene_name: string; model_abbreviation: string; model_type: string; availability: string; itl_catalog_number: string }> = [];

  // Tier 1: gene_name prefix (fastest, most relevant for navbar search)
  const { data: t1 } = await supabase
    .from('catalog_models')
    .select(FIELDS)
    .ilike('gene_name', `${q}%`)
    .order('gene_name')
    .limit(limit);

  for (const r of t1 ?? []) { seen.add(r.id); rows.push(r); }

  if (rows.length < limit) {
    // Tier 2: full-text search
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
    // Tier 3: broad contains — model abbreviation and catalog number fallback
    const { data: t3 } = await supabase
      .from('catalog_models')
      .select(FIELDS)
      .or(`model_abbreviation.ilike.%${q}%,itl_catalog_number.ilike.%${q}%`)
      .order('gene_name')
      .limit(limit);

    for (const r of t3 ?? []) {
      if (!seen.has(r.id)) { seen.add(r.id); rows.push(r); }
    }
  }

  return rows.slice(0, limit).map((r) => ({
    id:       String(r.id),
    title:    r.gene_name || r.model_abbreviation,
    url:      `/all-catalog-mouse-models?q=${encodeURIComponent(r.gene_name || r.model_abbreviation)}`,
    subtitle: [r.model_type, r.availability].filter(Boolean).join(' · ') || undefined,
  }));
}

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', message: 'Please try again later.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  const sp          = request.nextUrl.searchParams;
  const q           = sp.get('q') ?? '';
  const limitParam  = sp.get('limit');
  const parsed      = searchQuerySchema.safeParse({ q, limit: limitParam || undefined });

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid query', message: parsed.error.issues?.[0]?.message ?? 'Invalid search query' },
      { status: 400 }
    );
  }

  const query = parsed.data.q;
  if (!query) return NextResponse.json({ catalog: [], site: [] });

  try {
    const catalogLimit = parsed.data.limit ?? CATALOG_MAX_RESULTS;
    const [catalogResults, siteResults] = await Promise.all([
      searchCatalog(query, catalogLimit),
      Promise.resolve(searchSiteIndex(query, SITE_MAX_RESULTS)),
    ]);

    return NextResponse.json(
      {
        catalog: catalogResults,
        site:    siteResults.map((item) => ({
          id:       item.url,
          title:    item.title,
          url:      item.url,
          subtitle: item.category,
        })),
      },
      {
        headers: {
          'Cache-Control':         'private, max-age=60',
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  } catch (e) {
    console.error('[api/search] Error:', e);
    return NextResponse.json(
      { error: 'Search failed', message: 'Please try again.' },
      { status: 500 }
    );
  }
}
