/**
 * |UXUIDC| Catalog Sticky Rail
 *
 * Persistent floating links on educational pages: catalog browse + custom quote.
 * Desktop only — hidden below 1024px to avoid mobile CLS and avoid covering content.
 */

import Link from 'next/link';

interface Props {
  /** Page slug for analytics attribution */
  slug?: string;
  /** Catalog browse URL (topic-specific search when provided) */
  catalogHref?: string;
  /** Alias for catalogHref (existing pages pass `href`) */
  href?: string;
}

export default function CatalogStickyRail({
  slug = 'unknown',
  catalogHref,
  href,
}: Props) {
  const catalogUrl =
    catalogHref ||
    href ||
    `/all-catalog-mouse-models/?utm_source=organic&utm_medium=sticky-rail&utm_campaign=${encodeURIComponent(slug)}`;
  const quoteUrl = `/request-quote?utm_source=organic&utm_medium=sticky-rail-quote&utm_campaign=${encodeURIComponent(slug)}`;

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
        .catalog-sticky-rail-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.3px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          font-family: 'Lato', -apple-system, sans-serif;
          text-align: center;
          line-height: 1.25;
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
          background: #ffffff;
          color: #0a253c;
          border: 2px solid #0a253c;
          box-shadow: 0 4px 14px rgba(10, 37, 60, 0.12);
        }
        .catalog-sticky-rail-link--quote:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(10, 37, 60, 0.18);
        }
        @media (min-width: 1024px) {
          .catalog-sticky-rail-wrap {
            display: flex;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .catalog-sticky-rail-link {
            transition: none;
          }
        }
      `}</style>
      <nav
        className="catalog-sticky-rail-wrap"
        aria-label="Browse catalog or request a custom quote"
      >
        <Link
          href={catalogUrl}
          className="catalog-sticky-rail-link catalog-sticky-rail-link--catalog"
          data-cta="catalog-sticky-rail"
          data-cta-slug={slug}
        >
          <span aria-hidden="true">⚡</span>
          Browse catalog
        </Link>
        <Link
          href={quoteUrl}
          className="catalog-sticky-rail-link catalog-sticky-rail-link--quote"
          data-cta="sticky-rail-request-quote"
          data-cta-slug={slug}
        >
          Custom quote
          <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </>
  );
}
