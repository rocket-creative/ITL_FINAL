/**
 * POST /api/unlock-pricing
 *
 * Captures an email in exchange for access to /pricing-guide/. Sends a
 * notification to inquiry@genetargeting.com via Resend, optionally posts to
 * HubSpot Forms, and sets a signed itl_pricing_unlock cookie that the
 * src/proxy.ts middleware checks before serving the gated route.
 *
 * Closed by default: if PRICING_UNLOCK_SECRET is missing the cookie cannot
 * be issued and the request returns 503 with a clear error.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  PRICING_UNLOCK_COOKIE,
  COOKIE_MAX_AGE_SECONDS,
  signUnlockCookie,
} from '@/lib/auth/pricingUnlock';

export const runtime = 'nodejs';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.QUOTE_TO_EMAIL || 'inquiry@genetargeting.com';
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || 'quotes@genetargeting.com';
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const HUBSPOT_PRICING_FORM_ID = process.env.HUBSPOT_PRICING_FORM_ID;

const UnlockBodySchema = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().max(120).optional(),
  company: z.string().trim().max(160).optional(),
  interest: z.string().trim().max(120).optional(),
  source: z.string().trim().max(160).optional(),
  next: z.string().optional(),
});

function safeNextPath(raw: string | undefined): string {
  if (!raw) return '/pricing-guide/';
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/pricing-guide/';
  return raw;
}

async function notifyResend(payload: z.infer<typeof UnlockBodySchema>, ip: string | null) {
  if (!RESEND_API_KEY) {
    console.warn('[unlock-pricing] RESEND_API_KEY not set; skipping notification email');
    return;
  }
  const subject = `Pricing unlock: ${payload.email}${payload.company ? ` (${payload.company})` : ''}`;
  const lines = [
    `Email: ${payload.email}`,
    payload.name ? `Name: ${payload.name}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    payload.interest ? `Interest: ${payload.interest}` : null,
    payload.source ? `Source page: ${payload.source}` : null,
    ip ? `IP: ${ip}` : null,
    `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })} ET`,
  ].filter(Boolean);
  const text = `New pricing unlock request\n\n${lines.join('\n')}\n`;
  const html = `<h2 style="font-family:system-ui;color:#0a253c">Pricing unlock request</h2><pre style="font-family:ui-monospace,monospace;background:#f7f7f7;padding:16px;border-left:4px solid #008080">${lines
    .map((l) => l!.replace(/</g, '&lt;'))
    .join('\n')}</pre>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('[unlock-pricing] Resend error', res.status, err);
    }
  } catch (err) {
    console.error('[unlock-pricing] Resend fetch failed', err);
  }
}

async function notifyHubSpot(payload: z.infer<typeof UnlockBodySchema>, ip: string | null) {
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_PRICING_FORM_ID) return;
  const url = `https://api.hsforms.com/submissions/v3/integrations/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_PRICING_FORM_ID}`;
  const fields = [
    { objectTypeId: '0-1', name: 'email', value: payload.email },
    payload.name ? { objectTypeId: '0-1', name: 'firstname', value: payload.name } : null,
    payload.company ? { objectTypeId: '0-1', name: 'company', value: payload.company } : null,
    payload.interest ? { objectTypeId: '0-1', name: 'jobtitle', value: payload.interest } : null,
  ].filter(Boolean);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: payload.source || '',
          pageName: 'Pricing Unlock',
          ipAddress: ip || undefined,
        },
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('[unlock-pricing] HubSpot error', res.status, err);
    }
  } catch (err) {
    console.error('[unlock-pricing] HubSpot fetch failed', err);
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = UnlockBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const cookieValue = await signUnlockCookie(parsed.data.email);
  if (!cookieValue) {
    return NextResponse.json(
      { error: 'Pricing unlock is not configured. Contact site admin.' },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null;

  await Promise.all([notifyResend(parsed.data, ip), notifyHubSpot(parsed.data, ip)]);

  const redirect = safeNextPath(parsed.data.next);

  const res = NextResponse.json({ ok: true, redirect }, { status: 200 });
  res.cookies.set({
    name: PRICING_UNLOCK_COOKIE,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
  return res;
}
