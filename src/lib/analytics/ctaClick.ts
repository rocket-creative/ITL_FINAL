/**
 * Internal CTA clicks. Replaces utm_* on in-site links, which were starting
 * a new GA4 session and overwriting the visitor's real source.
 *
 * GA4 is loaded directly via gtag.js in the root layout. This helper uses
 * that existing tag. It does not load a second property.
 *
 * `utm_medium` is the HubSpot field name the cohort form already submits.
 * The click stores the old medium there so a later form post can still
 * attribute the CTA when the landing URL no longer carries it.
 */

export const CTA_MEDIUM_STORAGE_KEY = 'utm_medium';

export interface CtaClickParams {
  ctaLocation: string;
  ctaText: string;
  linkUrl: string;
  pagePath: string;
  geneSymbol?: string;
}

export function rememberCtaLocation(location: string): void {
  if (typeof window === 'undefined' || !location) return;
  try {
    sessionStorage.setItem(CTA_MEDIUM_STORAGE_KEY, location);
  } catch {
    // Private browsing and disabled storage throw.
  }
}

export function readStoredCtaLocation(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem(CTA_MEDIUM_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function trackInternalCtaClick(params: CtaClickParams): void {
  rememberCtaLocation(params.ctaLocation);
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const payload: Record<string, string> = {
    cta_location: params.ctaLocation,
    cta_text: params.ctaText,
    link_url: params.linkUrl,
    page_path: params.pagePath,
  };
  if (params.geneSymbol) payload.gene_symbol = params.geneSymbol;

  window.gtag('event', 'cta_click', payload);
}
