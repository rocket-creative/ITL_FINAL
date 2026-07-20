/**
 * /heterozygous-vs-homozygous — buyer-intent landing page that captures
 * the "heterozygous vs homozygous" GSC query (905 imp / 3 clicks/month).
 * Researchers searching this term are mid-experiment selecting genotypes
 * for an upcoming model build. Sales angle: "We design your breeding
 * scheme — talk to a scientist." Funnels to /breeding-scheme-architect/
 * and /request-quote/.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { buildStandalonePageMetadata } from '@/lib/seo';
import { buildServiceOffer } from '@/lib/seo/productSchema';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  BreadcrumbSchema,
  BreedingSchemeArchitectCTA,
  CatalogCustomDualCta,
} from '@/components/UXUIDC';

export const metadata: Metadata = buildStandalonePageMetadata({
  path: '/heterozygous-vs-homozygous',
  title: 'Heterozygous vs Homozygous in Mice | Catalog + Custom | ITL',
  description:
    'Heterozygous vs homozygous explained for mouse research. Browse catalog strains or request a custom line with a breeding scheme designed for your study. Quote in 24 hours.',
});

const faqs = [
  {
    question: 'What is the difference between heterozygous and homozygous?',
    answer:
      'A heterozygous (Het) mouse carries two different alleles at a given locus — one copy of the modified allele and one copy of the wild-type allele. A homozygous (Hom) mouse carries two identical alleles — either two copies of the modified allele (Hom mutant) or two copies of the wild-type allele (Hom wild-type). For knockout, knockin, and humanized mice, "heterozygous" usually means one engineered allele plus one wild-type, and "homozygous" means both alleles are engineered.',
  },
  {
    question: 'Should I use heterozygous or homozygous mice for my study?',
    answer:
      'Use heterozygous mice when modeling dominant disorders, haploinsufficiency, or when homozygosity is embryonic-lethal. Use homozygous mice when you need full loss of gene function, recessive trait modeling, or maximal phenotype penetrance. For most knockout studies, homozygous mice produce the strongest phenotype but may carry viability or fertility costs. Our scientists help you choose during your free consultation.',
  },
  {
    question: 'How do I breed homozygous mice from a heterozygous founder?',
    answer:
      'Standard breeding scheme: cross two heterozygous (Het × Het) mice. By Mendelian inheritance, ~25% of offspring will be homozygous mutant, ~50% heterozygous, and ~25% homozygous wild-type. Genotype every animal by PCR. For some alleles, especially those with reduced viability, you may need to expand your colony or consider sperm cryopreservation. Our breeding scheme architect tool plans the most efficient route.',
  },
  {
    question: 'Can ingenious targeting laboratory build my homozygous mouse?',
    answer:
      'Yes. Every custom mouse model project from ingenious targeting laboratory delivers germline-confirmed founders. We can also expand colonies to homozygosity, perform speed-expansion breeding, and ship homozygous animals on the timeline you need. Quote in 24 hours. Quote in 24 hours.',
  },
  {
    question: 'How long does it take to get homozygous mice?',
    answer:
      'After germline transmission of founders (typical timeline 9–14 months for a custom build), reaching homozygosity requires one additional generation of Het × Het crosses — roughly 8–10 weeks for sexual maturity plus another 3 weeks of gestation. Total time from project start to homozygous experimental cohort is typically 12–18 months. Catalog models with established homozygous colonies ship in weeks.',
  },
];

export default function HetVsHomPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Resources', path: '/resources' },
          { name: 'Heterozygous vs Homozygous', path: '/heterozygous-vs-homozygous' },
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
            '@type': 'Service',
            name: 'Custom Mouse Model Generation',
            provider: {
              '@type': 'Organization',
              '@id': 'https://www.genetargeting.com/#organization',
              name: 'ingenious targeting laboratory',
              url: 'https://www.genetargeting.com',
            },
            areaServed: 'Worldwide',
            offers: buildServiceOffer('https://www.genetargeting.com/request-quote/'),
          }),
        }}
      />

      <main id="main-content">
        <section className="page-hero"
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
              Mouse Genetics 101
            </div>
            <h1
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.9rem, 4vw, 2.5rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 16px 0',
              }}
            >
              Heterozygous vs homozygous mice — and how to get them.
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
              Picking the right genotype for your study is one of the first design
              decisions in any mouse model project. Here is the practical
              difference, when to use which, and how we plan the breeding scheme
              that gets you experimental animals on time.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/breeding-scheme-architect/?utm_source=organic&utm_medium=resource&utm_campaign=het-vs-hom-hero"
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
                Plan a Breeding Scheme
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/request-quote/?utm_source=organic&utm_medium=resource&utm_campaign=het-vs-hom-hero"
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
                Get a Custom Mouse Quote
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="heterozygous-vs-homozygous" utmMedium="page-hero" flush />
          </div>
        </section>

        <section style={{ backgroundColor: '#ffffff', padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  padding: '26px',
                  backgroundColor: '#f8fafa',
                  border: '1px solid #d8e3e6',
                  borderLeft: '4px solid #008080',
                  borderRadius: '6px',
                }}
              >
                <h2
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    margin: '0 0 10px 0',
                  }}
                >
                  Heterozygous (Het)
                </h2>
                <p
                  style={{
                    color: '#444',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    margin: '0 0 12px 0',
                  }}
                >
                  Two different alleles at the locus. Usually one engineered
                  allele plus one wild-type. Phenotype expression varies by
                  inheritance mode.
                </p>
                <strong
                  style={{
                    color: '#008080',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                  }}
                >
                  Best for
                </strong>
                <ul
                  style={{
                    margin: '6px 0 0 0',
                    paddingLeft: '18px',
                    color: '#444',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}
                >
                  <li>Dominant disorder modeling</li>
                  <li>Haploinsufficiency studies</li>
                  <li>When homozygosity is embryonic lethal</li>
                  <li>Carrier-state phenotype work</li>
                </ul>
              </div>

              <div
                style={{
                  padding: '26px',
                  backgroundColor: '#f8fafa',
                  border: '1px solid #d8e3e6',
                  borderLeft: '4px solid #00d4d4',
                  borderRadius: '6px',
                }}
              >
                <h2
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    margin: '0 0 10px 0',
                  }}
                >
                  Homozygous (Hom)
                </h2>
                <p
                  style={{
                    color: '#444',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    margin: '0 0 12px 0',
                  }}
                >
                  Two identical alleles at the locus. Either both engineered
                  (Hom mutant) or both wild-type (Hom WT). Maximal phenotype
                  penetrance for recessive traits.
                </p>
                <strong
                  style={{
                    color: '#008080',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                  }}
                >
                  Best for
                </strong>
                <ul
                  style={{
                    margin: '6px 0 0 0',
                    paddingLeft: '18px',
                    color: '#444',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}
                >
                  <li>Full loss-of-function knockouts</li>
                  <li>Recessive disease modeling</li>
                  <li>Maximal phenotype expression</li>
                  <li>Reproducible experimental cohorts</li>
                </ul>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#f7f9fa',
                border: '1px solid #d8e3e6',
                borderLeft: '4px solid #008080',
                borderRadius: '6px',
                padding: '22px 24px',
                marginBottom: '36px',
              }}
            >
              <h3
                style={{
                  color: '#0a253c',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '0 0 8px 0',
                }}
              >
                Quick rule of thumb
              </h3>
              <p
                style={{
                  color: '#444',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Most knockout studies need <strong>homozygous mice</strong> for
                clean phenotypes. Most dominant-disease and human-like-carrier
                studies need <strong>heterozygous mice</strong>. If your gene of
                interest is essential for development, plan a conditional
                knockout from the start — homozygous constitutive deletion will
                be embryonic lethal.
              </p>
            </div>

            <h2
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.6rem',
                fontWeight: 700,
                margin: '0 0 18px 0',
              }}
            >
              Frequently asked questions
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

        <BreedingSchemeArchitectCTA />

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
              Skip the breeding plan — we build the mice for you.
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1rem',
                lineHeight: 1.6,
                margin: '0 0 22px 0',
              }}
            >
              Custom knockout, knockin, and humanized mice with quote in 24 hours. We
              deliver germline-confirmed founders and can ship homozygous
              animals on your timeline. Or pick from 14,774 ready catalog
              models.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/request-quote/?utm_source=organic&utm_medium=resource&utm_campaign=het-vs-hom-footer"
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
                Get a Custom Mouse Quote
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/all-catalog-mouse-models/?utm_source=organic&utm_medium=resource&utm_campaign=het-vs-hom-footer"
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
                Browse 14,774 Catalog Models
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="heterozygous-vs-homozygous" utmMedium="page-closing" flush />
          </div>
        </section>
      </main>

      <UXUIDCFooter />
    </div>
  );
}
