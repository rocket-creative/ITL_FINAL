/**
 * Equal-height PI taxonomy cards (2026 card pattern):
 * CSS Grid stretch + flex column cards + footer margin-top:auto.
 * Reserve note + about slots so primary CTAs align across a row.
 * Do not use fixed card heights (fragile with variable copy).
 */

import Link from 'next/link';
import { PI_TAXONOMY_GROUPS } from '@/data/priorityGenes';
import type { PiTaxonomyChild } from '@/data/priorityGenes';

export type PiTaxonomyEqualCardGridProps = {
  /** When set, catalog inventory can surface View catalog CTAs. */
  mouseSymbol?: string;
  catalogByModSlug?: Record<string, number>;
  /** generation = always quote; gene-hub = catalog when inventory exists */
  mode: 'gene-hub' | 'generation';
};

const STYLES = `
  .pi-eq {
    font-family: Poppins, sans-serif;
  }
  .pi-eq__group {
    margin-bottom: 36px;
  }
  .pi-eq__group-heading {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0a253c;
    margin: 0 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid #008080;
  }
  @media (min-width: 768px) {
    .pi-eq__group-heading { font-size: 1.15rem; }
  }
  .pi-eq__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
    gap: 14px;
    align-items: stretch;
  }
  .pi-eq__card {
    height: 100%;
    min-height: 0;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .pi-eq__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }
  .pi-eq__title {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #0a253c;
    line-height: 1.4;
    text-wrap: balance;
  }
  .pi-eq__note {
    margin: 0;
    font-size: 0.78rem;
    color: #666;
    line-height: 1.5;
    min-height: 2.4em;
  }
  .pi-eq__footer {
    margin-top: auto;
    padding-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pi-eq__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 44px;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    box-sizing: border-box;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
  }
  .pi-eq__btn--catalog {
    background: #008080;
    color: #fff;
  }
  .pi-eq__btn--catalog:hover { background: #006666; }
  .pi-eq__btn--catalog:focus-visible {
    outline: 2px solid #008080;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 128, 128, 0.25);
  }
  .pi-eq__btn--quote {
    background: #0a253c;
    color: #fff;
  }
  .pi-eq__btn--quote:hover { background: #134978; }
  .pi-eq__btn--quote:focus-visible {
    outline: 2px solid #0a253c;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(10, 37, 60, 0.25);
  }
  .pi-eq__about-slot {
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pi-eq__about {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    width: 100%;
    font-size: 0.78rem;
    font-weight: 600;
    color: #134978;
    text-decoration: none;
    text-align: center;
  }
  .pi-eq__about:hover {
    color: #0a253c;
    text-decoration: underline;
  }
  .pi-eq__about:focus-visible {
    outline: 2px solid #134978;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

function catalogCountFor(child: PiTaxonomyChild, catalogByModSlug: Record<string, number>): number {
  if (!child.canonicalModSlug) return 0;
  return catalogByModSlug[child.canonicalModSlug] ?? 0;
}

function quoteTypeParam(child: PiTaxonomyChild): string {
  return child.canonicalModSlug ?? child.id;
}

function aboutHrefFor(child: PiTaxonomyChild): string | null {
  if (!child.siteHref) return null;
  return child.siteHref.endsWith('/') ? child.siteHref : `${child.siteHref}/`;
}

function PiEqualCard({
  child,
  mode,
  mouseSymbol,
  catalogByModSlug,
}: {
  child: PiTaxonomyChild;
  mode: 'gene-hub' | 'generation';
  mouseSymbol?: string;
  catalogByModSlug: Record<string, number>;
}) {
  const aboutHref = aboutHrefFor(child);
  const typeParam = quoteTypeParam(child);
  const geneEnc = mouseSymbol ? encodeURIComponent(mouseSymbol) : '';

  const inCatalog =
    mode === 'gene-hub' &&
    Boolean(mouseSymbol) &&
    catalogCountFor(child, catalogByModSlug) > 0 &&
    Boolean(child.canonicalModSlug);

  const catalogHref =
    inCatalog && mouseSymbol
      ? `/all-catalog-mouse-models/gene/${geneEnc}/${child.canonicalModSlug}/`
      : null;

  const quoteHref = mouseSymbol
    ? `/request-quote/?gene=${geneEnc}&type=${encodeURIComponent(typeParam)}`
    : `/request-quote/?type=${encodeURIComponent(typeParam)}`;

  return (
    <article className="pi-eq__card">
      <div className="pi-eq__body">
        <h4 className="pi-eq__title">{child.label}</h4>
        <p className="pi-eq__note">{child.quoteNote ?? '\u00a0'}</p>
      </div>
      <div className="pi-eq__footer">
        {inCatalog && catalogHref ? (
          <Link href={catalogHref} className="pi-eq__btn pi-eq__btn--catalog">
            View catalog
          </Link>
        ) : (
          <Link href={quoteHref} className="pi-eq__btn pi-eq__btn--quote">
            Request a quote
          </Link>
        )}
        <div className="pi-eq__about-slot">
          {aboutHref ? (
            <Link href={aboutHref} className="pi-eq__about">
              About this service
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function PiTaxonomyEqualCardGrid({
  mouseSymbol,
  catalogByModSlug = {},
  mode,
}: PiTaxonomyEqualCardGridProps) {
  return (
    <div className="pi-eq">
      <style>{STYLES}</style>
      {PI_TAXONOMY_GROUPS.map((group) => (
        <div key={group.id} className="pi-eq__group">
          <h3 className="pi-eq__group-heading">{group.label}</h3>
          <div className="pi-eq__grid">
            {group.children.map((child) => (
              <PiEqualCard
                key={child.id}
                child={child}
                mode={mode}
                mouseSymbol={mouseSymbol}
                catalogByModSlug={catalogByModSlug}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
