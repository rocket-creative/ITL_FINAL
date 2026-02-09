/**
 * Catalog status check – debug endpoint for GOOGLE_SHEETS_API_KEY.
 * GET /api/catalog/status returns { configured, source } (never the key).
 * Use this to verify the env var is visible in production (e.g. Vercel).
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET() {
  const a = (process.env.GOOGLE_SHEETS_API_KEY ?? '').trim();
  const b = (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY ?? '').trim();
  const c = (process.env.CATALOG_API_KEY ?? '').trim();
  const configured = !!(a || b || c);
  const source = a ? 'GOOGLE_SHEETS_API_KEY' : b ? 'NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY' : c ? 'CATALOG_API_KEY' : 'none';

  return NextResponse.json(
    {
      configured,
      source,
      hint: configured
        ? undefined
        : 'Add GOOGLE_SHEETS_API_KEY or CATALOG_API_KEY in Vercel → Settings → Environment Variables, scope Production/Preview, redeploy. Check Vercel → Logs for [api/catalog].',
    },
    {
      headers: { 'Cache-Control': 'no-store' },
    }
  );
}
