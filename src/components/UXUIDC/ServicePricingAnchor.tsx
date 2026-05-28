/**
 * |UXUIDC| Service Pricing Anchor + FAQ
 *
 * Above-the-fold (or near-fold) pricing block on commercial service pages.
 * Targets buyer-intent queries like "humanized mice price",
 * "knockout mouse cost", "transgenic mouse service pricing".
 *
 * Includes optional FAQ block + JSON-LD FAQPage schema so SERP shows the
 * pricing answer directly.
 */

import Link from 'next/link';
import { COMMERCIAL_LINKS } from '@/data/commercialCtas';
import PricingUnlockForm from './PricingUnlockForm';

export interface ServicePricingFaq {
  question: string;
  answer: string;
}

interface Props {
  /** Service label, e.g. "Humanized Mice", "Transgenic Mice" */
  serviceLabel: string;
  /** Headline above the price */
  headline: string;
  /** Subline under price block */
  subline: string;
  /** Quote CTA href + UTM params */
  quoteHref: string;
  /** Optional secondary CTA (catalog) */
  secondaryHref?: string;
  /** Optional secondary CTA label */
  secondaryLabel?: string;
  /** FAQs to render + emit as schema */
  faqs?: ServicePricingFaq[];
  /** Anchor id for in-page jump links */
  id?: string;
  /**
   * Page-level interest tag forwarded to the unlock form (used as HubSpot
   * `jobtitle` for funnel attribution). Optional.
   */
  unlockInterest?: string;
}

export default function UXUIDCServicePricingAnchor({
  serviceLabel,
  headline,
  subline,
  quoteHref,
  secondaryHref,
  secondaryLabel,
  faqs = [],
  id = 'pricing',
  unlockInterest,
}: Props) {
  return (
    <section
      id={id}
      aria-label={`${serviceLabel} pricing`}
      style={{
        backgroundColor: '#f8fafa',
        padding: '40px 20px',
        borderTop: '1px solid #e0e8e8',
        borderBottom: '1px solid #e0e8e8',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            alignItems: 'center',
            marginBottom: faqs.length > 0 ? '36px' : 0,
          }}
        >
          <div>
            <div
              style={{
                color: '#008080',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {serviceLabel} Pricing
            </div>
            <h2
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.6rem',
                fontWeight: 700,
                lineHeight: 1.25,
                margin: '0 0 8px 0',
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                color: '#444',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {subline}
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d8e3e6',
              borderLeft: '4px solid #008080',
              borderRadius: '6px',
              padding: '22px 24px',
            }}
          >
            <div
              style={{
                color: '#666',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Starting at
            </div>
            <div style={{ marginBottom: '14px' }}>
              <PricingUnlockForm
                interest={unlockInterest ?? serviceLabel}
                source={`service-pricing-anchor:${serviceLabel}`}
                ctaLabel="Get prices"
                placeholder="Add your work email"
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                href={secondaryHref ?? COMMERCIAL_LINKS.catalogAll}
                data-cta="service-pricing-catalog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#008080',
                  color: '#ffffff',
                  padding: '11px 18px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.3px',
                }}
              >
                {secondaryLabel ?? 'Browse 14,774+ Catalog Models'}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={quoteHref}
                data-cta="service-pricing-custom-quote"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#0a253c',
                  color: '#ffffff',
                  padding: '11px 18px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.3px',
                }}
              >
                Request Custom Quote
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {faqs.length > 0 && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #d8e3e6',
                    borderRadius: '6px',
                    padding: '14px 18px',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      color: '#0a253c',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      listStyle: 'none',
                    }}
                  >
                    {faq.question}
                  </summary>
                  <p
                    style={{
                      color: '#444',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      margin: '10px 0 0 0',
                    }}
                  >
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
