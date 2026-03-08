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
    .refine((s) => /^[\w\s\-.,():;/'"]+$/i.test(s), 'Invalid characters in search query'),
  limit: z
    .optional(z.coerce.number().refine((n) => n >= 10 && n <= 100, 'Limit must be between 10 and 100')),
});

const CATALOG_MAX_RESULTS = 8;
const SITE_MAX_RESULTS = 50;

const SPREADSHEET_ID = '1DG54nHKf-A-7Ii8nSHvps74nCXbmNsPk51uL15JzuRU';
const SHEET_NAME = 'ITL-Cat-24-25';

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
  const apiKey = (
    process.env.GOOGLE_SHEETS_API_KEY ??
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY ??
    process.env.CATALOG_API_KEY ??
    ''
  ).trim();

  if (!apiKey) return [];

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}?key=${apiKey}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
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
  } catch {
    return [];
  }
}

const getCachedCatalog = unstable_cache(
  fetchCatalogData,
  ['search-catalog'],
  { revalidate: 300, tags: ['catalog'] }
);

function searchCatalog(
  models: CatalogModel[],
  query: string,
  limit: number = CATALOG_MAX_RESULTS
): Array<{ id: string; title: string; url: string; subtitle?: string }> {
  const term = query.toLowerCase().trim();
  if (!term) return [];

  const searchTerms = term
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/\//g, ' ').trim());

  return models
    .filter((model) => {
      const searchText = Object.values(model)
        .filter((v): v is string => typeof v === 'string')
        .join(' ')
        .toLowerCase()
        .replace(/\//g, ' ');
      return searchTerms.every((t) => searchText.includes(t));
    })
    .slice(0, limit)
    .map((model) => ({
      id: model.id,
      title: model.geneName,
      url: `/search?q=${encodeURIComponent(model.geneName)}`,
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
  const limitParam = searchParams.get('limit');
  const limitToParse = limitParam && limitParam.trim() !== '' ? limitParam : undefined;

  const parsed = searchQuerySchema.safeParse({ q, limit: limitToParse });
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

    const catalogLimit = parsed.data.limit ?? CATALOG_MAX_RESULTS;
    const catalogResults = searchCatalog(catalogModels, query, catalogLimit);

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
