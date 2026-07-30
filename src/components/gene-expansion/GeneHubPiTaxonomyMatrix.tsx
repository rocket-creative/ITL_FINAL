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
        <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>In catalog</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Link
            href={catalogHref}
            style={{
              color: '#008080',
              fontSize: '.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solid #008080',
            }}
          >
            View {mouseSymbol} {child.canonicalModSlug.replace(/-/g, ' ')}
          </Link>
          <Link
            href={orderHref}
            style={{
              display: 'inline-block',
              background: '#008080',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '.78rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Order
          </Link>
        </div>
      </div>
    );
  } else if (child.siteHref) {
    statusNode = (
      <Link
        href={child.siteHref.endsWith('/') ? child.siteHref : `${child.siteHref}/`}
        style={{
          color: '#134978',
          fontSize: '.85rem',
          fontWeight: 600,
          textDecoration: 'none',
          borderBottom: '1px solid #134978',
        }}
      >
        Open related hub
      </Link>
    );
  } else {
    const typeParam = child.canonicalModSlug ?? child.id;
    const quoteHref = `/request-quote/?gene=${geneEnc}&type=${encodeURIComponent(typeParam)}`;
    statusNode = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ color: '#134978', fontWeight: 600, fontSize: '.85rem' }}>Generate</span>
        <Link
          href={quoteHref}
          style={{
            display: 'inline-block',
            background: '#0a253c',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '.78rem',
            fontWeight: 600,
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          Request quote
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: '6px',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minHeight: '100%',
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '.9rem',
          fontWeight: 600,
          color: '#0a253c',
          lineHeight: 1.4,
        }}
      >
        {child.label}
      </p>
      {statusNode}
      {child.quoteNote ? (
        <p style={{ margin: 0, fontSize: '.78rem', color: '#666', lineHeight: 1.5 }}>
          {child.quoteNote}
        </p>
      ) : null}
    </div>
  );
}

export default function GeneHubPiTaxonomyMatrix({
  mouseSymbol,
  humanSymbol,
  catalogByModSlug,
}: GeneHubPiTaxonomyMatrixProps) {
  return (
    <section
      aria-labelledby="gene-hub-pi-taxonomy-heading"
      style={{ background: '#f5f5f4', padding: '56px 20px' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          id="gene-hub-pi-taxonomy-heading"
          style={{
            fontFamily: 'Poppins, sans-serif',
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
            <h3
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#0a253c',
                marginBottom: '14px',
                paddingBottom: '8px',
                borderBottom: '2px solid #008080',
              }}
            >
              {group.label}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '14px',
              }}
            >
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
  );
}
