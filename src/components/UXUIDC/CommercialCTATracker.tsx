'use client';

/**
 * |UXUIDC| Commercial CTA Tracker
 *
 * Mounts once at the root and listens for clicks on any element with a
 * `data-cta` attribute. Sends a `commercial_cta_click` event to gtag
 * (GA4) so we can attribute quote requests + catalog visits back to the
 * specific high-traffic page that drove them.
 *
 * Why event delegation: the banner / catalog widgets are server
 * components and we do not want to hydrate every CTA. One global listener
 * covers all of them with zero per-link overhead.
 *
 * Schema:
 *   gtag('event', 'commercial_cta_click', {
 *     cta_type: 'commercial-banner-primary' | 'catalog-gene-chip' | ...
 *     page_slug: '<slug>' | 'unknown',
 *     gene: 'Trp53' | undefined,
 *     destination: '/request-quote?...',
 *     page_path: window.location.pathname,
 *   })
 */

import { useEffect } from 'react';

export default function CommercialCTATracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const cta = target.closest<HTMLAnchorElement>('a[data-cta]');
      if (!cta) return;

      const ctaType = cta.getAttribute('data-cta') ?? 'unknown';
      const slug = cta.getAttribute('data-cta-slug') ?? 'unknown';
      const gene = cta.getAttribute('data-cta-gene') ?? undefined;
      const destination = cta.getAttribute('href') ?? '';

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'commercial_cta_click', {
          cta_type: ctaType,
          page_slug: slug,
          gene,
          destination,
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, []);

  return null;
}
