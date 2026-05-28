/**
 * |UXUIDC| Catalog Sticky Rail
 *
 * Persistent floating links on educational pages: catalog browse + custom quote.
 * Desktop only — hidden below 1024px to avoid mobile CLS and avoid covering content.
 */

import Link from 'next/link';
import { COMMERCIAL_LINKS, commercialUtmHref } from '@/data/commercialCtas';

interface Props {
  /** Page slug for analytics attribution */
  slug?: string;
  /** Catalog browse URL (topic-specific search when provided) */
  catalogHref?: string;
  /** Alias for catalogHref (existing pages pass `href`) */
  href?: string;
}

const linkBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '11px 16px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.82rem',
  letterSpacing: '0.3px',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  fontFamily: 'Lato, -apple-system, sans-serif',
  textAlign: 'center' as const,
  lineHeight: 1.25,
};

export default function CatalogStickyRail({
  slug = 'unknown',
  catalogHref,
  href,
}: Props) {
  const catalogUrl =
    catalogHref ||
    href ||
    commercialUtmHref(COMMERCIAL_LINKS.catalogAll, {
      source: 'organic',
      medium: 'sticky-rail',
      campaign: slug,
    });
  const quoteUrl = commercialUtmHref(COMMERCIAL_LINKS.requestQuote, {
    source: 'organic',
    medium: 'sticky-rail-quote',
    campaign: slug,
  });

  return (
    <>
      <style>{`
        .catalog-sticky-rail-wrap {
          display: none;
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 40;
          flex-direction: column;
          gap: 8px;
          align-items: stretch;
          max-width: min(280px, calc(100vw - 48px));
        }
        .catalog-sticky-rail-link--catalog {
          background: #008080;
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(0, 64, 64, 0.35);
        }
        .catalog-sticky-rail-link--catalog:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0, 64, 64, 0.45);
        }
        .catalog-sticky-rail-link--quote {
          background: #0a253c;
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(10, 37, 60, 0.35);
        }
        .catalog-sticky-rail-link--quote:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(10, 37, 60, 0.45);
        }
        @media (min-width: 1024px) {
          .catalog-sticky-rail-wrap {
            display: flex;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .catalog-sticky-rail-link--catalog:hover,
          .catalog-sticky-rail-link--quote:hover {
            transform: none;
          }
        }
      `}</style>
      <nav
        className="catalog-sticky-rail-wrap"
        aria-label="Browse catalog or request a custom quote"
      >
        <Link
          href={catalogUrl}
          className="catalog-sticky-rail-link--catalog"
          style={linkBase}
          data-cta="catalog-sticky-rail"
          data-cta-slug={slug}
        >
          <span aria-hidden="true">⚡</span>
          Browse catalog
        </Link>
        <Link
          href={quoteUrl}
          className="catalog-sticky-rail-link--quote"
          style={linkBase}
          data-cta="sticky-rail-request-quote"
          data-cta-slug={slug}
        >
          Request custom quote
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href={COMMERCIAL_LINKS.customHub}
          style={{
            ...linkBase,
            padding: '6px 12px',
            fontSize: '0.72rem',
            fontWeight: 500,
            color: '#0a253c',
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid #d8e3e6',
            boxShadow: '0 2px 8px rgba(10, 37, 60, 0.08)',
          }}
          data-cta="sticky-rail-custom-services"
          data-cta-slug={slug}
        >
          Custom model services
        </Link>
      </nav>
    </>
  );
}
