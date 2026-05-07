/**
 * Unified Search API — catalog + site content
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { searchSiteIndex } from '@/lib/search/siteIndex';
import { checkRateLimit } from '@/lib/search/rateLimit';
import { supabase } from '@/lib/catalog/supabaseClient';
import { getCachedCatalogGeneNames } from '@/lib/search/catalogGeneCache';
import { parseQuery } from '@/lib/search/parseQuery';
import { buildSeoUrl } from '@/lib/seo/searchUrl';

const searchQuerySchema = z.object({
  q: z
    .string()
    .max(100)
    .transform((s) => s.trim())
    .refine((s) => s.length >= 1, 'Query cannot be empty')
    .refine((s) => /^[\w\s\-.,():;/'"]+$/i.test(s), 'Invalid characters in search query'),
  limit: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === undefined ? undefined : Number(v)))
    .refine((n) => n === undefined || (!Number.isNaN(n) && n >= 10 && n <= 100), 'Limit must be between 10 and 100'),
});

const SITE_MAX_RESULTS = 50;
const NAV_DEFAULT_LIMIT = 8;

const ROW_FIELDS =
  'id,gene_name,model_abbreviation,model_type,availability,itl_catalog_number';

interface CatalogPayload {
  id: string;
  title: string;
  url: string;
  subtitle?: string;
}

type DbCatalogRow = {
  id: number;
  gene_name: string | null;
  model_abbreviation: string | null;
  model_type: string | null;
  availability: string | null;
  itl_catalog_number: string | null;
};

function rowToCatalogPayload(r: DbCatalogRow): CatalogPayload {
  const gene = r.gene_name || r.model_abbreviation || '';
  return {
    id: String(r.id),
    title: gene,
    url: `/all-catalog-mouse-models/gene/${encodeURIComponent(gene)}`,
    subtitle: [r.model_type, r.availability].filter(Boolean).join(' · ') || undefined,
  };
}

function readableMod(mt: string): string {
  if (mt === 'Conditional Knockout') return 'Conditional knockout';
  if (mt === 'Knockout') return 'Knockout';
  if (mt === 'Knockin') return 'Knockin';
  if (mt === 'Humanized') return 'Humanized';
  if (mt === 'Transgenic') return 'Transgenic';
  const low = mt.toLowerCase();
  return low.charAt(0).toUpperCase() + low.slice(1);
}

function composeBestBet(
  parsed: ReturnType<typeof parseQuery>,
  catalogGeneSet: Set<string>
): CatalogPayload | null {
  const gene = parsed.geneCandidates[0];
  const mt = parsed.modificationTypes[0];
  if (!gene || !mt) return null;

  const subtitle = `Custom ${readableMod(mt).toLowerCase()} — request a quote in 24 hours`;
  const modLabel = readableMod(mt);
  const url = buildSeoUrl(parsed, catalogGeneSet);

  return {
    id: 'bestbet',
    title: `${gene} ${modLabel} mouse model`,
    url,
    subtitle,
  };
}

async function fetchGeneModBoost(
  gene: string,
  modelTypeSubstring: string,
  cap: number
): Promise<DbCatalogRow[]> {
  const { data, error } = await supabase
    .from('catalog_models')
    .select(ROW_FIELDS)
    .eq('gene_name', gene)
    .ilike('model_type', `%${modelTypeSubstring}%`)
    .order('gene_name')
    .limit(cap);

  if (error || !data) return [];
  return data as DbCatalogRow[];
}

async function tieredFallback(
  qTier1Hint: string,
  rawMultiWord: string,
  limit: number,
  seenIds: Set<number>
): Promise<DbCatalogRow[]> {
  const cap = Math.max(limit, 0);
  const out: DbCatalogRow[] = [];

  const { data: t1 } = await supabase
    .from('catalog_models')
    .select(ROW_FIELDS)
    .ilike('gene_name', `${qTier1Hint}%`)
    .order('gene_name')
    .limit(cap);

  for (const r of t1 ?? []) {
    if (!seenIds.has(r.id)) {
      seenIds.add(r.id);
      out.push(r as DbCatalogRow);
      if (out.length >= cap) return out;
    }
  }

  const ftQuery = rawMultiWord.split(/\s+/).filter(Boolean).join(' & ');
  const { data: t2 } = await supabase
    .from('catalog_models')
    .select(ROW_FIELDS)
    .textSearch('search_vector', ftQuery, { type: 'plain', config: 'simple' })
    .limit(cap);

  for (const r of t2 ?? []) {
    if (!seenIds.has(r.id)) {
      seenIds.add(r.id);
      out.push(r as DbCatalogRow);
      if (out.length >= cap) return out;
    }
  }

  const rawTrim = rawMultiWord.trim();
  const compact = rawTrim.replace(/\s+/g, '').replace(/%/g, '');
  const q3 = compact.length > 2 ? compact.slice(0, 40) : rawTrim.slice(0, 20).replace(/%/g, '');
  if (q3.length > 2) {
    const { data: t3 } = await supabase
      .from('catalog_models')
      .select(ROW_FIELDS)
      .or(`model_abbreviation.ilike.%${q3}%,itl_catalog_number.ilike.%${q3}%`)
      .order('gene_name')
      .limit(cap);

    for (const r of t3 ?? []) {
      if (!seenIds.has(r.id)) {
        seenIds.add(r.id);
        out.push(r as DbCatalogRow);
        if (out.length >= cap) return out;
      }
    }
  }

  return out;
}

async function mergedCatalogResults(
  rawQuery: string,
  parsed: ReturnType<typeof parseQuery>,
  limit: number
): Promise<CatalogPayload[]> {
  const seen = new Set<number>();
  const rows: DbCatalogRow[] = [];
  const pushRows = (arr: DbCatalogRow[]) => {
    for (const r of arr) {
      if (rows.length >= limit) break;
      if (!seen.has(r.id)) {
        seen.add(r.id);
        rows.push(r);
      }
    }
  };

  const gene = parsed.geneCandidates[0];
  const mod = parsed.modificationTypes[0];

  if (gene && mod) {
    const boost = await fetchGeneModBoost(gene, mod, limit);
    pushRows(boost);
  }

  if (rows.length < limit && gene) {
    const { data: pref } = await supabase
      .from('catalog_models')
      .select(ROW_FIELDS)
      .ilike('gene_name', `${gene}%`)
      .order('gene_name')
      .limit(limit);
    pushRows((pref ?? []) as DbCatalogRow[]);
  }

  if (rows.length < limit) {
    const hint = gene ?? rawQuery.trim();
    const more = await tieredFallback(hint, rawQuery.trim(), limit - rows.length, seen);
    pushRows(more);
  }

  return rows.slice(0, limit).map(rowToCatalogPayload);
}

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const { allowed, remaining: rateLimitedRemaining } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', message: 'Please try again later.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  const sp = request.nextUrl.searchParams;
  const qRaw = sp.get('q') ?? '';
  const limitRaw = sp.get('limit');

  const parsedZ = searchQuerySchema.safeParse({
    q: qRaw,
    limit: limitRaw ?? undefined,
  });

  if (!parsedZ.success) {
    return NextResponse.json(
      { error: 'Invalid query', message: parsedZ.error.issues?.[0]?.message ?? 'Invalid search query' },
      { status: 400 }
    );
  }

  const query = parsedZ.data.q;
  if (!query) return NextResponse.json({ catalog: [], site: [] });

  const catalogCap = parsedZ.data.limit ?? NAV_DEFAULT_LIMIT;

  try {
    const catalogGenesArr = await getCachedCatalogGeneNames();
    const catalogGeneSet = new Set(catalogGenesArr);
    const parsed = parseQuery(query, catalogGenesArr);

    const [catalogHits, siteResults] = await Promise.all([
      mergedCatalogResults(query, parsed, catalogCap),
      Promise.resolve(searchSiteIndex(query, SITE_MAX_RESULTS, { parsed })),
    ]);

    const bestBet = composeBestBet(parsed, catalogGeneSet);

    const catalogFinal: CatalogPayload[] = [];
    if (bestBet) catalogFinal.push(bestBet);

    /** Total rows including synthetic best bet */
    let remaining = catalogCap - catalogFinal.length;
    let i = 0;
    while (remaining > 0 && i < catalogHits.length) {
      catalogFinal.push(catalogHits[i]!);
      i++;
      remaining -= 1;
    }

    return NextResponse.json(
      {
        catalog: catalogFinal.slice(0, catalogCap),
        site: siteResults.map((item) => ({
          id: item.url,
          title: item.title,
          url: item.url,
          subtitle: item.category,
          description: item.description,
        })),
      },
      {
        headers: {
          'Cache-Control': 'private, max-age=60',
          'X-RateLimit-Remaining': String(rateLimitedRemaining),
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
