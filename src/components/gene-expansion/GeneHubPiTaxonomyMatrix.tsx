/**
 * PI search taxonomy matrix for priority gene hubs.
 * One primary CTA per card, bottom-aligned. Catalog → View catalog; else → Request a quote.
 * Service hub pages (BAC, Flp, etc.) get a quote CTA plus optional About link.
 */

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
  .gene-hub-pi-taxonomy__note {
    margin: 0;
    font-size: 0.78rem;
    color: #666;
    line-height: 1.5;
  }
  .gene-hub-pi-taxonomy__footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 4px;
  }
  .gene-hub-pi-taxonomy__btn {
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
  .gene-hub-pi-taxonomy__btn--catalog {
    background: #008080;
    color: #fff;
  }
  .gene-hub-pi-taxonomy__btn--catalog:hover {
    background: #006666;
  }
  .gene-hub-pi-taxonomy__btn--catalog:focus-visible {
    outline: 2px solid #008080;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 128, 128, 0.25);
  }
  .gene-hub-pi-taxonomy__btn--quote {
    background: #0a253c;
    color: #fff;
  }
  .gene-hub-pi-taxonomy__btn--quote:hover {
    background: #134978;
  }
  .gene-hub-pi-taxonomy__btn--quote:focus-visible {
    outline: 2px solid #0a253c;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(10, 37, 60, 0.25);
  }
  .gene-hub-pi-taxonomy__about {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #134978;
    text-decoration: none;
    text-align: center;
  }
  .gene-hub-pi-taxonomy__about:hover {
    color: #0a253c;
    text-decoration: underline;
  }
  .gene-hub-pi-taxonomy__about:focus-visible {
    outline: 2px solid #134978;
    outline-offset: 2px;
    border-radius: 2px;
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

function quoteTypeParam(child: PiTaxonomyChild): string {
  return child.canonicalModSlug ?? child.id;
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
  const inCatalog = count > 0 && Boolean(child.canonicalModSlug);
  const aboutHref = child.siteHref
    ? child.siteHref.endsWith('/')
      ? child.siteHref
      : `${child.siteHref}/`
    : null;

  const catalogHref = inCatalog
    ? `/all-catalog-mouse-models/gene/${geneEnc}/${child.canonicalModSlug}/`
    : null;
  const quoteHref = `/request-quote/?gene=${geneEnc}&type=${encodeURIComponent(quoteTypeParam(child))}`;

  return (
    <div className="gene-hub-pi-taxonomy__card">
      <p className="gene-hub-pi-taxonomy__card-title">{child.label}</p>
      {child.quoteNote ? <p className="gene-hub-pi-taxonomy__note">{child.quoteNote}</p> : null}

      <div className="gene-hub-pi-taxonomy__footer">
        {inCatalog && catalogHref ? (
          <Link href={catalogHref} className="gene-hub-pi-taxonomy__btn gene-hub-pi-taxonomy__btn--catalog">
            View catalog
          </Link>
        ) : (
          <Link href={quoteHref} className="gene-hub-pi-taxonomy__btn gene-hub-pi-taxonomy__btn--quote">
            Request a quote
          </Link>
        )}
        {aboutHref ? (
          <Link href={aboutHref} className="gene-hub-pi-taxonomy__about">
            About this service
          </Link>
        ) : null}
      </div>
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
            custom generation quote. Every path below has one clear next step.
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
