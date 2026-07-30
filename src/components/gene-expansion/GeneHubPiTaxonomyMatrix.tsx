/**
 * PI search taxonomy matrix for priority gene hubs.
 */

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PI_TAXONOMY_GROUPS } from '@/data/priorityGenes';
import type { PiTaxonomyChild } from '@/data/priorityGenes';

export type GeneHubPiTaxonomyMatrixProps = {
  mouseSymbol: string;
  humanSymbol: string;
  /** Count of catalog models per canonical modification slug. */
  catalogByModSlug: Record<string, number>;
};

const PI_TAXONOMY_STYLES = `
  .gene-hub-pi-taxonomy {
    font-family: Poppins, sans-serif;
  }
  .gene-hub-pi-taxonomy__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
    gap: 14px;
  }
  .gene-hub-pi-taxonomy__card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 100%;
  }
  .gene-hub-pi-taxonomy__card-title {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #0a253c;
    line-height: 1.4;
  }
  .gene-hub-pi-taxonomy__status {
    font-weight: 600;
    font-size: 0.85rem;
  }
  .gene-hub-pi-taxonomy__status--catalog {
    color: #008080;
  }
  .gene-hub-pi-taxonomy__status--generate {
    color: #134978;
  }
  .gene-hub-pi-taxonomy__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .gene-hub-pi-taxonomy__text-link {
    display: inline-block;
    padding: 8px 0;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid currentColor;
    transition: color 0.15s ease, border-color 0.15s ease;
  }
  .gene-hub-pi-taxonomy__text-link--catalog {
    color: #008080;
  }
  .gene-hub-pi-taxonomy__text-link--catalog:hover {
    color: #006666;
  }
  .gene-hub-pi-taxonomy__text-link--catalog:focus-visible {
    outline: 2px solid #008080;
    outline-offset: 2px;
    border-radius: 2px;
  }
  .gene-hub-pi-taxonomy__text-link--related {
    color: #134978;
  }
  .gene-hub-pi-taxonomy__text-link--related:hover {
    color: #0a253c;
  }
  .gene-hub-pi-taxonomy__text-link--related:focus-visible {
    outline: 2px solid #134978;
    outline-offset: 2px;
    border-radius: 2px;
  }
  .gene-hub-pi-taxonomy__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
  }
  .gene-hub-pi-taxonomy__btn--order {
    background: #008080;
    color: #fff;
  }
  .gene-hub-pi-taxonomy__btn--order:hover {
    background: #006666;
  }
  .gene-hub-pi-taxonomy__btn--order:focus-visible {
    outline: 2px solid #008080;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 128, 128, 0.25);
  }
  .gene-hub-pi-taxonomy__btn--quote {
    background: #0a253c;
    color: #fff;
    width: fit-content;
  }
  .gene-hub-pi-taxonomy__btn--quote:hover {
    background: #134978;
  }
  .gene-hub-pi-taxonomy__btn--quote:focus-visible {
    outline: 2px solid #0a253c;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(10, 37, 60, 0.25);
  }
  .gene-hub-pi-taxonomy__note {
    margin: 0;
    font-size: 0.78rem;
    color: #666;
    line-height: 1.5;
  }
  .gene-hub-pi-taxonomy__group-heading {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0a253c;
    margin: 0 0 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid #008080;
  }
`;

function catalogCountFor(child: PiTaxonomyChild, catalogByModSlug: Record<string, number>): number {
  if (!child.canonicalModSlug) return 0;
  return catalogByModSlug[child.canonicalModSlug] ?? 0;
}

function ChildCard({
  child,
  mouseSymbol,
  catalogByModSlug,
}: {
  child: PiTaxonomyChild;
  mouseSymbol: string;
  catalogByModSlug: Record<string, number>;
}) {
  const count = catalogCountFor(child, catalogByModSlug);
  const geneEnc = encodeURIComponent(mouseSymbol);

  let statusNode: ReactNode;

  if (count > 0 && child.canonicalModSlug) {
    const catalogHref = `/all-catalog-mouse-models/gene/${geneEnc}/${child.canonicalModSlug}/`;
    const orderHref = `/order-catalog-models?gene=${geneEnc}`;
    statusNode = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span className="gene-hub-pi-taxonomy__status gene-hub-pi-taxonomy__status--catalog">
          In catalog
        </span>
        <div className="gene-hub-pi-taxonomy__actions">
          <Link
            href={catalogHref}
            className="gene-hub-pi-taxonomy__text-link gene-hub-pi-taxonomy__text-link--catalog"
          >
            View {mouseSymbol} {child.canonicalModSlug.replace(/-/g, ' ')}
          </Link>
          <Link href={orderHref} className="gene-hub-pi-taxonomy__btn gene-hub-pi-taxonomy__btn--order">
            Order
          </Link>
        </div>
      </div>
    );
  } else if (child.siteHref) {
    statusNode = (
      <Link
        href={child.siteHref.endsWith('/') ? child.siteHref : `${child.siteHref}/`}
        className="gene-hub-pi-taxonomy__text-link gene-hub-pi-taxonomy__text-link--related"
      >
        View related
      </Link>
    );
  } else {
    const typeParam = child.canonicalModSlug ?? child.id;
    const quoteHref = `/request-quote/?gene=${geneEnc}&type=${encodeURIComponent(typeParam)}`;
    statusNode = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span className="gene-hub-pi-taxonomy__status gene-hub-pi-taxonomy__status--generate">
          Available to generate
        </span>
        <Link href={quoteHref} className="gene-hub-pi-taxonomy__btn gene-hub-pi-taxonomy__btn--quote">
          Request a quote
        </Link>
      </div>
    );
  }

  return (
    <div className="gene-hub-pi-taxonomy__card">
      <p className="gene-hub-pi-taxonomy__card-title">{child.label}</p>
      {statusNode}
      {child.quoteNote ? <p className="gene-hub-pi-taxonomy__note">{child.quoteNote}</p> : null}
    </div>
  );
}

export default function GeneHubPiTaxonomyMatrix({
  mouseSymbol,
  humanSymbol,
  catalogByModSlug,
}: GeneHubPiTaxonomyMatrixProps) {
  return (
    <>
      <style>{PI_TAXONOMY_STYLES}</style>
      <section
        className="gene-hub-pi-taxonomy"
        aria-labelledby="gene-hub-pi-taxonomy-heading"
        style={{ background: '#f5f5f4', padding: '56px 20px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            id="gene-hub-pi-taxonomy-heading"
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '8px',
            }}
          >
            {mouseSymbol} model types researchers search for
          </h2>
          <p style={{ color: '#555', fontSize: '.92rem', lineHeight: 1.7, marginBottom: '32px' }}>
            Map common PI search terms for {mouseSymbol} (human {humanSymbol}) to catalog alleles or a
            custom generation quote.
          </p>

          {PI_TAXONOMY_GROUPS.map((group) => (
            <div key={group.id} style={{ marginBottom: '36px' }}>
              <h3 className="gene-hub-pi-taxonomy__group-heading">{group.label}</h3>
              <div className="gene-hub-pi-taxonomy__grid">
                {group.children.map((child) => (
                  <ChildCard
                    key={child.id}
                    child={child}
                    mouseSymbol={mouseSymbol}
                    catalogByModSlug={catalogByModSlug}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
