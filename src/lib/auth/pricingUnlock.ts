/**
 * Pricing unlock cookie helpers
 *
 * Used by the /api/unlock-pricing route (sign) and src/proxy.ts middleware
 * (verify) so the cookie format stays in one place. Web Crypto only, works
 * in both the Edge runtime (middleware) and Node runtime (API route).
 *
 * Cookie value format: base64url(HMAC-SHA256(payload, secret)) + "." + base64url(payload)
 *   payload = JSON.stringify({ e: emailLowercased, t: issuedAtMs })
 *
 * Verification rejects tokens older than COOKIE_MAX_AGE_SECONDS so a stolen
 * cookie cannot grant indefinite access.
 */

export const PRICING_UNLOCK_COOKIE = 'itl_pricing_unlock';
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

interface UnlockPayload {
  e: string;
  t: number;
}

function getSecret(): string {
  const secret = process.env.PRICING_UNLOCK_SECRET;
  if (!secret || secret.length < 16) {
    // Fail closed: empty/short secret means signMs cannot produce trustworthy
    // cookies and verify will reject everything. Surface in logs once.
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn('[pricingUnlock] PRICING_UNLOCK_SECRET is missing or too short');
    }
    return '';
  }
  return secret;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmacSha256(key: string, message: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(message));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) return false;
  let diff = 0;
  for (let i = 0; i < a.byteLength; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * Issue a fresh signed unlock cookie value for the given email.
 */
export async function signUnlockCookie(email: string): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const payload: UnlockPayload = { e: email.trim().toLowerCase(), t: Date.now() };
  const payloadJson = JSON.stringify(payload);
  const sig = await hmacSha256(secret, payloadJson);
  const sigPart = base64UrlEncode(sig);
  const payloadPart = base64UrlEncode(new TextEncoder().encode(payloadJson));
  return `${sigPart}.${payloadPart}`;
}

/**
 * Verify an unlock cookie value. Returns true only if signature is valid AND
 * the issued-at timestamp is within COOKIE_MAX_AGE_SECONDS.
 */
export async function verifyUnlockCookie(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const secret = getSecret();
  if (!secret) return false;

  const parts = value.split('.');
  if (parts.length !== 2) return false;
  const [sigPart, payloadPart] = parts;

  let payloadBytes: Uint8Array;
  try {
    payloadBytes = base64UrlDecode(payloadPart);
  } catch {
    return false;
  }

  const payloadJson = new TextDecoder().decode(payloadBytes);
  let payload: UnlockPayload;
  try {
    payload = JSON.parse(payloadJson);
  } catch {
    return false;
  }

  if (typeof payload?.e !== 'string' || typeof payload?.t !== 'number') return false;

  const ageSec = (Date.now() - payload.t) / 1000;
  if (ageSec < 0 || ageSec > COOKIE_MAX_AGE_SECONDS) return false;

  const expected = await hmacSha256(secret, payloadJson);

  let provided: Uint8Array;
  try {
    provided = base64UrlDecode(sigPart);
  } catch {
    return false;
  }

  return timingSafeEqual(expected, provided);
}
