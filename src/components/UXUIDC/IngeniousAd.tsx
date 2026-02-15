'use client';

/**
 * IngeniousAd - Contextual service CTA for Lab Signals articles
 * Appears within gated content, tailored to article topic.
 * Links to relevant ingenious targeting laboratory service page.
 */

import Link from 'next/link';

const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  darkGray: '#444444',
};

interface IngeniousAdProps {
  /** Service page path (e.g. /conditional-knockout-mouse-models) */
  relatedPage: string;
  /** Article category for contextual headline */
  category: string;
  /** Optional custom headline override */
  headline?: string;
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
}: IngeniousAdProps) {
  const displayHeadline =
    headline || CATEGORY_HEADLINES[category] || 'Advancing your research?';

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
        Custom mouse models since 1998. Expert design, guaranteed results.
      </p>
      <Link
        href={relatedPage}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: BRAND.black,
          color: BRAND.white,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '.85rem',
          fontWeight: 600,
          padding: '12px 22px',
          textDecoration: 'none',
          borderRadius: '6px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
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
    </div>
  );
}
