/**
 * GTM dataLayer event helpers
 *
 * Single source of truth for the named events the GTM workspace listens for.
 * Each helper pushes a normalized payload to `window.dataLayer`. GTM custom
 * event triggers match on `event` and read value/currency via DataLayer
 * Variables (`dlv.value`, `dlv.currency`).
 *
 * Conversion tags (Google Ads Conversion Tracking) live in the GTM workspace,
 * NOT in this repo. Adding a new conversion is a GTM publish, not a deploy.
 *
 * @see docs-important/GTM-SETUP-GUIDE.md for workspace configuration
 */

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export type GtmEventName =
  | 'itl_quote_submit'
  | 'itl_catalog_order'
  | 'itl_meeting_request'
  | 'itl_start_project'
  | 'itl_contact_submit'
  | 'itl_newsletter_signup'
  | 'itl_generic_thank_you';

export interface GtmConversionPayload {
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

/**
 * Low level push. Safe on server (no-ops). Initializes dataLayer if missing
 * so events queued before the GTM snippet runs are not lost.
 */
export function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

function pushEvent(event: GtmEventName, payload: GtmConversionPayload = {}): void {
  pushDataLayer({
    event,
    currency: payload.currency ?? 'USD',
    ...payload,
  });
}

/**
 * Quote request submitted. Primary conversion (value 100 USD by default).
 * Triggered from /request-quote/thank-you/.
 */
export function pushQuoteSubmit(payload: GtmConversionPayload = {}): void {
  pushEvent('itl_quote_submit', { value: 100, ...payload });
}

/**
 * Catalog model order placed. Primary conversion (value 500 USD by default).
 * Triggered from /order-catalog-models/thank-you/.
 */
export function pushCatalogOrder(payload: GtmConversionPayload = {}): void {
  pushEvent('itl_catalog_order', { value: 500, ...payload });
}

/**
 * Consultation meeting requested. Primary conversion (value 250 USD by default).
 * Triggered from /schedule-meeting/thank-you/.
 */
export function pushMeetingRequest(payload: GtmConversionPayload = {}): void {
  pushEvent('itl_meeting_request', { value: 250, ...payload });
}

/**
 * Start your project pricing guide download. Secondary conversion.
 * Triggered from /start-your-project/thank-you/.
 */
export function pushStartProject(payload: GtmConversionPayload = {}): void {
  pushEvent('itl_start_project', { value: 1, ...payload });
}

/**
 * Contact form submission. Secondary conversion.
 * Triggered from contact form thank you flows and trackContactSubmission.
 */
export function pushContactSubmit(payload: GtmConversionPayload = {}): void {
  pushEvent('itl_contact_submit', { value: 1, ...payload });
}

/**
 * Newsletter (Lab Signals) signup. Secondary conversion.
 */
export function pushNewsletterSignup(payload: GtmConversionPayload = {}): void {
  pushEvent('itl_newsletter_signup', { value: 1, ...payload });
}

/**
 * Generic thank you page hit. Catch all for the legacy /thank-you/ route.
 */
export function pushGenericThankYou(payload: GtmConversionPayload = {}): void {
  pushEvent('itl_generic_thank_you', { value: 1, ...payload });
}
