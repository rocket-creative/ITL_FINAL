'use client';

/**
 * |UXUIDC| Commercial CTA Tracker
 *
 * Mounts once at the root and listens for clicks on any element with a
 * `data-cta` attribute. Sends one `cta_click` event through the existing
 * gtag.js GA4 tag. Internal links no longer carry utm_* parameters, which
 * were starting a new session and overwriting the visitor's real source.
 *
 * `data-cta-location` is the former utm_medium (gene-page-closing,
 * educational-banner, page-closing, and the other placement labels).
 *
 * Schema:
 *   gtag('event', 'cta_click', {
 *     cta_location,
 *     cta_text,
 *     link_url,
 *     page_path,
 *     gene_symbol, // gene pages and gene chips only
 *   })
 */

import { useEffect } from 'react';
import { trackInternalCtaClick } from '@/lib/analytics/ctaClick';

function linkPath(href: string): string {
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return href;
    return `${url.pathname}${url.search}`;
  } catch {
    return href;
  }
}

export default function CommercialCTATracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const cta = target.closest<HTMLAnchorElement>('a[data-cta]');
      if (!cta) return;

      const ctaType = cta.getAttribute('data-cta') ?? 'unknown';
      const location = cta.getAttribute('data-cta-location') || ctaType;
      const gene = cta.getAttribute('data-cta-gene') ?? undefined;
      const destination = cta.getAttribute('href') ?? '';
      const ctaText = (cta.innerText || cta.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 120);

      trackInternalCtaClick({
        ctaLocation: location,
        ctaText,
        linkUrl: linkPath(destination),
        pagePath: window.location.pathname,
        geneSymbol: gene || undefined,
      });
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, []);

  return null;
}
