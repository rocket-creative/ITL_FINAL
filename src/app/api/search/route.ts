/**
 * Unified Search API
 * Searches catalog models + site content with validation, rate limiting, and caching
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { unstable_cache } from 'next/cache';
import { searchSiteIndex } from '@/lib/search/siteIndex';
import { checkRateLimit } from '@/lib/search/rateLimit';

const searchQuerySchema = z.object({
  q: z
    .string()
    .max(100)
    .transform((s) => s.trim())
    .refine((s) => s.length >= 1, 'Query cannot be empty')
    .refine((s) => /^[\w\s\-.,()]+$/i.test(s), 'Invalid characters in search query'),
});

const CATALOG_MAX_RESULTS = 8;
const SITE_MAX_RESULTS = 8;

interface CatalogModel {
  id: string;
  geneName: string;
  modelType: string;
  background: string;
  description: string;
  category: string;
  [key: string]: string;
}

async function fetchCatalogData(): Promise<CatalogModel[]> {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/catalog`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 }, // 5 min
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.values || !Array.isArray(data.values) || data.values.length < 2) return [];

  const headerRow = data.values[0] as string[];

  return data.values
    .slice(1)
    .map((row: string[], index: number) => {
      const model: CatalogModel = {
        id: `model-${index}`,
        geneName: row[0] || '',
        modelType: row[1] || '',
        background: row[2] || '',
        description: row[3] || '',
        category: row[4] || '',
      };
      headerRow.forEach((h, i) => {
        if (i > 5 && row[i]) model[h.toLowerCase().replace(/\s+/g, '_')] = row[i];
      });
      return model;
    })
    .filter((m: CatalogModel) => m.geneName);
}

const getCachedCatalog = unstable_cache(
  fetchCatalogData,
  ['search-catalog'],
  { revalidate: 300, tags: ['catalog'] }
);

function searchCatalog(models: CatalogModel[], query: string): Array<{ id: string; title: string; url: string; subtitle?: string }> {
  const term = query.toLowerCase().trim();
  if (!term) return [];

  const searchTerms = term.split(/\s+/).filter(Boolean);

  return models
    .filter((model) => {
      const searchText = [
        model.geneName,
        model.modelType,
        model.background,
        model.description,
        model.category,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return searchTerms.every((t) => searchText.includes(t));
    })
    .slice(0, CATALOG_MAX_RESULTS)
    .map((model) => ({
      id: model.id,
      title: model.geneName,
      url: `/request-quote?model=${encodeURIComponent(model.geneName)}`,
      subtitle: [model.modelType, model.background].filter(Boolean).join(' · ') || undefined,
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

  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q') ?? '';

  const parsed = searchQuerySchema.safeParse({ q });
  if (!parsed.success) {
    const firstIssue = parsed.error.issues?.[0];
    const message = firstIssue?.message ?? 'Invalid search query';
    return NextResponse.json(
      { error: 'Invalid query', message },
      { status: 400 }
    );
  }

  const query = parsed.data.q;
  if (!query) {
    return NextResponse.json({ catalog: [], site: [] });
  }

  try {
    const [catalogModels, siteResults] = await Promise.all([
      getCachedCatalog(),
      Promise.resolve(searchSiteIndex(query, SITE_MAX_RESULTS)),
    ]);

    const catalogResults = searchCatalog(catalogModels, query);

    const siteFormatted = siteResults.map((item) => ({
      id: item.url,
      title: item.title,
      url: item.url,
      subtitle: item.category,
    }));

    return NextResponse.json(
      { catalog: catalogResults, site: siteFormatted },
      {
        headers: {
          'Cache-Control': 'private, max-age=60',
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
