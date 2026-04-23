/**
 * Google Ads conversion helpers (client)
 * Centralizes send_to construction and one-shot thank-you firing (Strict Mode safe).
 */

export const THANK_YOU_SESSION_QUOTE = 'itl_thankyou_quote_conv';
export const THANK_YOU_SESSION_START_PROJECT = 'itl_thankyou_start_project_conv';
export const THANK_YOU_SESSION_MEETING = 'itl_thankyou_meeting_conv';
export const THANK_YOU_SESSION_CATALOG_ORDER = 'itl_thankyou_catalog_order_conv';
export const THANK_YOU_SESSION_NEWSLETTER = 'itl_thankyou_newsletter_conv';

export function buildGoogleAdsSendTo(label: string | undefined): string | null {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  const l = label?.trim();
  if (!id || !l) return null;
  return `${id}/${l}`;
}

export function fireGoogleAdsConversion(
  sendTo: string | null,
  params?: { value?: number; currency?: string }
): void {
  if (!sendTo || typeof window === 'undefined') return;
  const g = window.gtag;
  if (typeof g !== 'function') return;
  g('event', 'conversion', {
    send_to: sendTo,
    value: params?.value ?? 1,
    currency: params?.currency ?? 'USD',
  });
}

/**
 * Runs fn once per browser tab session for this key (avoids double fire under React Strict Mode).
 */
export function runThankYouConversionOnce(sessionKey: string, fn: () => void): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(sessionKey) === '1') return;
    sessionStorage.setItem(sessionKey, '1');
  } catch {
    // Storage unavailable; still run once this load
  }
  fn();
}
