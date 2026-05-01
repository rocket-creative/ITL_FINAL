/**
 * /custom-mouse-model-pricing — buyer-intent page that ranks for
 * "humanized mice price", "knockout mouse price", "custom mouse model
 * cost", "transgenic mouse pricing". Surfaces starting prices in a
 * comparison table + Offer schema + dedicated quote CTA per service tier.
 *
 * Distinct from /pricing-guide/ (the existing detailed buyer's guide):
 * this page is shorter, comparison-first, and exact-keyword-targeted.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  BreadcrumbSchema,
} from '@/components/UXUIDC';

export const metadata: Metadata = {
  title: 'Custom Mouse Model Pricing | Knockout, Knockin & Humanized | From $17,297',
  description:
    'Custom mouse model pricing: knockout from $17,297, knockin from $19,500, humanized from $24,500, transgenic from $17,297. Quote in 24h. 800+ publications.',
  alternates: {
    canonical: 'https://www.genetargeting.com/custom-mouse-model-pricing/',
  },
  openGraph: {
    title: 'Custom Mouse Model Pricing | Knockout, Knockin & Humanized | ITL',
    description:
      'Custom mouse model pricing — knockout, knockin, humanized, transgenic, conditional. Starting prices, timelines, comparison. Quote in 24h.',
    url: 'https://www.genetargeting.com/custom-mouse-model-pricing/',
    siteName: 'ingenious targeting laboratory',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Mouse Model Pricing | From $17,297 | ITL',
    description:
      'Knockout from $17,297, knockin from $19,500, humanized from $24,500. Quote in 24h.',
  },
};

const tiers = [
  {
    name: 'Knockout Mouse',
    startingPrice: '$17,297',
    sku: 'KO-CUSTOM',
    description:
      'CRISPR or ES cell knockout. Constitutive (full-body) loss-of-function with germline-confirmed founders.',
    timeline: '9–12 months',
    bestFor: ['Loss-of-function studies', 'Recessive disease models', 'Pathway analysis'],
    quoteHref: '/request-quote?utm_source=organic&utm_medium=pricing&utm_campaign=knockout-tier',
    learnMoreHref: '/knockout-mouse-models/',
  },
  {
    name: 'Conditional Knockout (Floxed)',
    startingPrice: '$19,500',
    sku: 'CKO-CUSTOM',
    description:
      'Floxed allele for Cre-mediated conditional deletion. Tissue-specific, inducible, or temporally controlled with CreERT2.',
    timeline: '10–14 months',
    bestFor: ['Tissue-specific knockouts', 'Embryonic-lethal genes', 'Adult-onset modeling'],
    quoteHref: '/request-quote?utm_source=organic&utm_medium=pricing&utm_campaign=conditional-tier',
    learnMoreHref: '/conditional-knockout-mouse-models/',
  },
  {
    name: 'Knockin Mouse',
    startingPrice: '$19,500',
    sku: 'KI-CUSTOM',
    description:
      'Point mutation, reporter, tag, or ORF replacement at the endogenous locus. Precise, single-copy integration.',
    timeline: '10–14 months',
    bestFor: ['Disease variant modeling', 'Reporter lines', 'Protein tagging'],
    quoteHref: '/request-quote?utm_source=organic&utm_medium=pricing&utm_campaign=knockin-tier',
    learnMoreHref: '/knockin-mouse-models/',
  },
  {
    name: 'Humanized Mouse',
    startingPrice: '$24,500',
    sku: 'HUM-CUSTOM',
    description:
      'Drug-target humanization, immune checkpoint humanization (PD1, PDL1, CTLA4, LAG3, TIM3), or complete gene replacement.',
    timeline: '9–14 months',
    bestFor: ['Drug development', 'Immuno-oncology', 'Therapeutic antibody testing'],
    quoteHref: '/request-quote?utm_source=organic&utm_medium=pricing&utm_campaign=humanized-tier',
    learnMoreHref: '/humanized-mouse-models/',
  },
  {
    name: 'Transgenic Mouse',
    startingPrice: '$17,297',
    sku: 'TG-CUSTOM',
    description:
      'BAC, pronuclear, or targeted transgenesis at safe harbor loci (Rosa26, H11). Reporter, Cre driver, or overexpression lines.',
    timeline: '4–9 months',
    bestFor: ['Cre driver lines', 'Reporter lines', 'Overexpression studies'],
    quoteHref: '/request-quote?utm_source=organic&utm_medium=pricing&utm_campaign=transgenic-tier',
    learnMoreHref: '/transgenic-mouse-service/',
  },
  {
    name: 'Off-the-Shelf Catalog',
    startingPrice: 'Quote',
    sku: 'CATALOG',
    description:
      '14,774 ready-to-ship genetically engineered mouse models. Live colonies for many top-requested knockouts, knockins, Cre drivers, and humanized lines.',
    timeline: 'Weeks',
    bestFor: ['Fast project starts', 'Established alleles', 'Lower upfront cost'],
    quoteHref: '/all-catalog-mouse-models/?utm_source=organic&utm_medium=pricing&utm_campaign=catalog-tier',
    learnMoreHref: '/all-catalog-mouse-models/',
  },
];

const faqs = [
  {
    question: 'How much does a custom mouse model cost?',
    answer:
      'Custom mouse model pricing depends on the model type and complexity. Knockout and transgenic mice start at $17,297. Conditional knockouts (floxed alleles) and knockins start at $19,500. Humanized mice start at $24,500. Every project includes a free scientific consultation, fixed-fee quote in 24 hours, and a 100% germline transmission guarantee.',
  },
  {
    question: 'How much do humanized mice cost?',
    answer:
      'Humanized mouse projects start at $24,500. Pricing scales with humanization strategy (drug-target replacement, immune checkpoint humanization, complete gene replacement), allele complexity, and timeline. We have built humanized mice since 1998 with 800+ peer-reviewed publications.',
  },
  {
    question: 'What is the price of a knockout mouse?',
    answer:
      'Custom knockout mouse projects start at $17,297. This includes design, CRISPR or ES cell targeting, screening, and germline-confirmed founders with a 100% germline transmission guarantee. Conditional (floxed) knockouts start at $19,500. Many knockouts are also available as ready-to-ship catalog models — search by gene to check.',
  },
  {
    question: 'Do you offer fixed-fee pricing?',
    answer:
      'Yes. After a free scientific consultation we provide a fixed-fee quote within 24 hours. The fee covers the full project scope through germline-confirmed founders. There are no surprise charges if a project requires additional rounds — we work until we deliver, with a 100% germline transmission guarantee.',
  },
  {
    question: 'Are catalog mouse models cheaper than custom?',
    answer:
      'Catalog mouse models typically have lower upfront cost and ship in weeks rather than 9–14 months. We have 14,774 ready-to-ship models including knockouts, knockins, Cre drivers, transgenic lines, and humanized strains. If a model already exists in our catalog or can be derived from one, this is almost always faster and cheaper than commissioning a custom build.',
  },
  {
    question: 'Why does ingenious targeting laboratory cost what it does?',
    answer:
      'Our pricing reflects 26+ years of mouse model expertise, validated C57BL/6 ES cell lines, dedicated scientific project management, a 100% germline transmission guarantee, and the track record of 2,500+ projects supporting 800+ peer-reviewed publications including in Nature, Cell, and Science. We deliver the mice; you do not pay for failed rounds.',
  },
];

export default function PricingPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Custom Mouse Models', path: '/custom-mouse-models' },
          { name: 'Pricing', path: '/custom-mouse-model-pricing' },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'OfferCatalog',
            name: 'Custom Mouse Model Pricing',
            url: 'https://www.genetargeting.com/custom-mouse-model-pricing/',
            provider: {
              '@type': 'Organization',
              '@id': 'https://www.genetargeting.com/#organization',
              name: 'ingenious targeting laboratory',
              url: 'https://www.genetargeting.com',
            },
            itemListElement: tiers
              .filter((t) => t.startingPrice.startsWith('$'))
              .map((t) => ({
                '@type': 'Offer',
                name: t.name,
                sku: t.sku,
                description: t.description,
                priceCurrency: 'USD',
                price: t.startingPrice.replace(/[^0-9]/g, ''),
                url: `https://www.genetargeting.com${t.quoteHref.split('?')[0]}`,
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'ingenious targeting laboratory',
                },
              })),
          }),
        }}
      />

      <main id="main-content">
        <section
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 100%)',
            padding: '70px 20px 50px',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div
              style={{
                color: '#00d4d4',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Transparent Starting Prices
            </div>
            <h1
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                margin: '0 0 16px 0',
              }}
            >
              Custom mouse model pricing.
              <br />
              <span style={{ color: '#00d4d4' }}>Starting at $17,297. Quote in 24 hours.</span>
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1.05rem',
                lineHeight: 1.65,
                margin: '0 0 24px 0',
                maxWidth: '780px',
              }}
            >
              Knockout, knockin, humanized, conditional, and transgenic mice —
              fixed-fee pricing, 100% germline transmission guarantee, free
              scientific consultation. Or pick from 14,774 ready-to-ship
              catalog models.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/request-quote?utm_source=organic&utm_medium=pricing&utm_campaign=hero"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#0a253c',
                  padding: '13px 22px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Get a Custom Quote in 24h
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/all-catalog-mouse-models/?utm_source=organic&utm_medium=pricing&utm_campaign=hero-catalog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '2px solid rgba(255,255,255,0.55)',
                }}
              >
                Browse 14,774 Catalog Models
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#ffffff', padding: '50px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                margin: '0 0 8px 0',
                textAlign: 'center',
              }}
            >
              Starting prices by mouse model type
            </h2>
            <p
              style={{
                color: '#666',
                textAlign: 'center',
                margin: '0 0 32px 0',
                fontSize: '0.95rem',
              }}
            >
              Final pricing depends on allele complexity, validation needs, and timeline. Free 24h quote.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
              }}
            >
              {tiers.map((tier) => (
                <div
                  key={tier.sku}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                    backgroundColor: '#f8fafa',
                    border: '1px solid #d8e3e6',
                    borderTop: '4px solid #008080',
                    borderRadius: '6px',
                  }}
                >
                  <h3
                    style={{
                      color: '#0a253c',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <div
                    style={{
                      color: '#666',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {tier.startingPrice.startsWith('$') ? 'Starting at' : 'Pricing'}
                  </div>
                  <div
                    style={{
                      color: '#008080',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      marginBottom: '12px',
                    }}
                  >
                    {tier.startingPrice}
                  </div>
                  <p
                    style={{
                      color: '#444',
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      margin: '0 0 14px 0',
                    }}
                  >
                    {tier.description}
                  </p>
                  <div
                    style={{
                      color: '#666',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.4px',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    Typical timeline
                  </div>
                  <div
                    style={{
                      color: '#0a253c',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      marginBottom: '14px',
                    }}
                  >
                    {tier.timeline}
                  </div>
                  <div
                    style={{
                      color: '#666',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.4px',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    Best for
                  </div>
                  <ul
                    style={{
                      margin: '0 0 18px 0',
                      paddingLeft: '18px',
                      color: '#444',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                    }}
                  >
                    {tier.bestFor.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link
                      href={tier.quoteHref}
                      style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        backgroundColor: '#008080',
                        color: '#ffffff',
                        padding: '10px 16px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}
                    >
                      Get a Quote →
                    </Link>
                    <Link
                      href={`${tier.learnMoreHref}?utm_source=organic&utm_medium=pricing&utm_campaign=${tier.sku}-learn`}
                      style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        color: '#008080',
                        padding: '8px 16px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                      }}
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f7f9fa', padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.6rem',
                fontWeight: 700,
                margin: '0 0 18px 0',
              }}
            >
              Frequently asked questions about pricing
            </h2>
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
          </div>
        </section>

        <section
          style={{
            backgroundColor: '#0a253c',
            padding: '50px 20px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.7rem',
                fontWeight: 700,
                margin: '0 0 14px 0',
              }}
            >
              Get your custom mouse model quote in 24 hours.
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1rem',
                lineHeight: 1.6,
                margin: '0 0 22px 0',
              }}
            >
              Free scientific consultation. Fixed-fee quote. 100% germline
              transmission guarantee. Or talk to our team about catalog options.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/request-quote/?utm_source=organic&utm_medium=pricing&utm_campaign=footer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#0a253c',
                  padding: '13px 22px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Request a Quote
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact/?utm_source=organic&utm_medium=pricing&utm_campaign=footer-contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '2px solid rgba(255,255,255,0.4)',
                }}
              >
                Talk to a Scientist
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />
    </div>
  );
}
