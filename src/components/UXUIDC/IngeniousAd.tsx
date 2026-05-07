'use client';

/**
 * IngeniousAd - Contextual service CTA for Lab Signals articles
 * Appears within gated content, tailored to article topic.
 * Dual path: topical services plus browse-ready catalog strains.
 */

import Link from 'next/link';

const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  darkGray: '#444444',
};

const DEFAULT_CATALOG_HREF = '/all-catalog-mouse-models/';

interface IngeniousAdProps {
  /** Service page path (e.g. /conditional-knockout-mouse-models) */
  relatedPage: string;
  /** Article category for contextual headline */
  category: string;
  /** Optional custom headline override */
  headline?: string;
  /** Catalog browse/search URL for secondary CTA */
  catalogCtaHref?: string;
}

const CATEGORY_HEADLINES: Record<string, string> = {
  Neuroscience: 'Researching neurodegeneration?',
  Metabolic: 'Studying metabolic disease?',
  Immunology: 'Working with immune models?',
  Oncology: 'Developing cancer therapeutics?',
  Technology: 'Building gene-edited models?',
  'Technical Guide': 'Designing conditional alleles?',
  'Selection Guide': 'Choosing the right model?',
  'Industry Insights': 'Translating research to clinic?',
  Educational: 'Exploring mouse model options?',
  Resources: 'Managing your colony?',
};

export default function IngeniousAd({
  relatedPage,
  category,
  headline,
  catalogCtaHref = DEFAULT_CATALOG_HREF,
}: IngeniousAdProps) {
  const displayHeadline =
    headline || CATEGORY_HEADLINES[category] || 'Advancing your research?';

  const catalogHref = catalogCtaHref || DEFAULT_CATALOG_HREF;

  const btnBase = {
    fontFamily: 'Poppins, sans-serif' as const,
    fontSize: '.85rem' as const,
    fontWeight: 600 as const,
    padding: '12px 22px' as const,
    textDecoration: 'none' as const,
    borderRadius: '6px' as const,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    gap: '8px' as const,
  };

  return (
    <div
      style={{
        marginTop: '45px',
        marginBottom: '30px',
        padding: '28px 24px',
        backgroundColor: BRAND.lightGray,
        borderLeft: `5px solid ${BRAND.gold}`,
        borderRadius: '0 8px 8px 0',
      }}
    >
      <p
        style={{
          fontSize: '.65rem',
          fontWeight: 700,
          fontFamily: 'Poppins, sans-serif',
          color: BRAND.darkGray,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          marginBottom: '10px',
        }}
      >
        From ingenious targeting laboratory
      </p>
      <h4
        style={{
          color: BRAND.black,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 600,
          marginBottom: '12px',
          lineHeight: 1.4,
        }}
      >
        {displayHeadline}
      </h4>
      <p
        style={{
          color: BRAND.darkGray,
          fontFamily: 'Lato, sans-serif',
          fontSize: '.9rem',
          lineHeight: 1.6,
          marginBottom: '18px',
        }}
      >
        Thousands of research ready strains ship from live colonies. Same team designs custom knockouts, knockins, and humanized models when your allele is not on the shelf.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <Link
          href={relatedPage}
          style={{
            ...btnBase,
            backgroundColor: BRAND.black,
            color: BRAND.white,
            border: `2px solid ${BRAND.black}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Explore Services
          <span aria-hidden>→</span>
        </Link>
        <Link
          href={catalogHref}
          style={{
            ...btnBase,
            backgroundColor: BRAND.white,
            color: BRAND.black,
            border: `2px solid ${BRAND.black}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Browse Catalog
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
