/**
 * Catalog API Route
 * Proxies Google Sheets catalog data server-side to avoid CORS and keep API key private.
 * Used by CatalogSearch component.
 */

import { NextResponse } from 'next/server';

const SPREADSHEET_ID = '1DG54nHKf-A-7Ii8nSHvps74nCXbmNsPk51uL15JzuRU';
const SHEET_NAME = 'ITL-Cat-24-25';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

const noStore = { 'Cache-Control': 'no-store' };

export async function GET() {
  const apiKey = (
    process.env.GOOGLE_SHEETS_API_KEY ??
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY ??
    process.env.CATALOG_API_KEY ??
    ''
  ).trim();

  if (!apiKey) {
    console.warn(
      '[api/catalog] GOOGLE_SHEETS_API_KEY, NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY, and CATALOG_API_KEY all missing. Check Vercel → Settings → Environment Variables, scope, and redeploy.'
    );
    return NextResponse.json(
      {
        error: 'Catalog not configured',
        message:
          'GOOGLE_SHEETS_API_KEY is not set. Try /api/catalog/status to debug. In Vercel: add GOOGLE_SHEETS_API_KEY or CATALOG_API_KEY, scope Production/Preview, then redeploy.',
      },
      { status: 503, headers: noStore }
    );
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}?key=${apiKey}`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[api/catalog] Google Sheets error:', res.status, errBody);
      return NextResponse.json(
        {
          error: 'Failed to fetch catalog data',
          message: res.status === 403
            ? 'Catalog API access denied. Check GOOGLE_SHEETS_API_KEY and Google Sheets API access.'
            : `Upstream error: ${res.status}`,
        },
        { status: 502 }
      );
    }

    const data = await res.json();

    if (!data.values || !Array.isArray(data.values) || data.values.length < 2) {
      return NextResponse.json(
        { error: 'No catalog data', message: 'Spreadsheet is empty or invalid.' },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error('[api/catalog] Fetch error:', e);
    return NextResponse.json(
      {
        error: 'Failed to fetch catalog data',
        message: e instanceof Error ? e.message : 'Network or server error.',
      },
      { status: 502 }
    );
  }
}
