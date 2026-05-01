/**
 * |UXUIDC| Catalog Sticky Rail
 *
 * Persistent floating link on educational pages that nudges readers
 * toward the off-the-shelf catalog. Desktop only — hidden below 1024px
 * to avoid mobile CLS and avoid covering content.
 *
 * Pure CSS positioning so it does not require client JS.
 */

import Link from 'next/link';

interface Props {
  /** Page slug for analytics attribution */
  slug?: string;
  /** Catalog href — defaults to all-catalog */
  href?: string;
  /** Label */
  label?: string;
}

export default function CatalogStickyRail({
  slug = 'unknown',
  href,
  label = 'Skip the build → 14,774 ready models',
}: Props) {
  const finalHref =
    href ||
    `/all-catalog-mouse-models/?utm_source=organic&utm_medium=sticky-rail&utm_campaign=${encodeURIComponent(slug)}`;

  return (
    <>
      <style>{`
        .catalog-sticky-rail {
          display: none;
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 40;
          background: #008080;
          color: #ffffff;
          padding: 12px 18px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.3px;
          box-shadow: 0 6px 20px rgba(0, 64, 64, 0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          font-family: 'Lato', -apple-system, sans-serif;
        }
        .catalog-sticky-rail:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0, 64, 64, 0.45);
        }
        @media (min-width: 1024px) {
          .catalog-sticky-rail { display: inline-flex; align-items: center; gap: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .catalog-sticky-rail { transition: none; }
        }
      `}</style>
      <Link
        href={finalHref}
        className="catalog-sticky-rail"
        data-cta="catalog-sticky-rail"
        data-cta-slug={slug}
        aria-label="Browse 14,774 ready-to-ship catalog mouse models"
      >
        <span aria-hidden="true">⚡</span>
        {label}
      </Link>
    </>
  );
}
