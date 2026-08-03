/**
 * /humanized-mouse-services — short, conversion-focused landing page that
 * captures the exact-keyword query "humanized mouse services" + "humanized
 * mice price" (currently 358 + 332 + 98 imp/month with zero clicks). Links
 * to /humanized-mouse-models/ for the full technical/marketing page.
 *
 * Distinct content (services + pricing focus, not strategy depth) so this
 * does not duplicate /humanized-mouse-models/. Has its own canonical.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { applyCatalogFirstMeta } from '@/lib/seo';
import { buildServiceOffer } from '@/lib/seo/productSchema';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCServicePricingAnchor,
  BreadcrumbSchema,
  CatalogCustomDualCta,
} from '@/components/UXUIDC';

const servicesMeta = applyCatalogFirstMeta(
  'Humanized Mouse Services | Catalog + Generation | 24h Quote',
  'Humanized mouse services since 1998. Browse catalog checkpoint lines or request generated humanization (PD1, PDL1, CTLA4, LAG3, TIM3). 800+ publications.',
  '/humanized-mouse-services',
);

export const metadata: Metadata = {
  title: servicesMeta.title,
  description: servicesMeta.description,
  alternates: {
    canonical: 'https://www.genetargeting.com/humanized-mouse-services/',
  },
  openGraph: {
    title: servicesMeta.title,
    description: servicesMeta.description,
    url: 'https://www.genetargeting.com/humanized-mouse-services/',
    siteName: 'ingenious targeting laboratory',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: servicesMeta.title,
    description: servicesMeta.description,
  },
};

const services = [
  {
    title: 'Immune Checkpoint Humanization',
    targets: ['PD1', 'PDL1', 'CTLA4', 'LAG3', 'TIM3'],
    description:
      'Replace mouse immune checkpoint genes with human orthologs for therapeutic antibody efficacy testing. Single, double, and combination checkpoint humanization.',
    href: '/humanized-immune-checkpoint-mice/',
  },
  {
    title: 'Drug-Target Humanization',
    targets: ['Receptors', 'Enzymes', 'Membrane proteins'],
    description:
      'Humanize the gene encoding your therapeutic target so mouse models become predictive of human pharmacology and efficacy.',
    href: '/humanized-mouse-models/',
  },
  {
    title: 'Complete Gene Replacement',
    targets: ['Full coding region', 'Plus regulatory elements'],
    description:
      'Replace the entire mouse gene with the human ortholog at the endogenous locus. Best for studying human-specific biology.',
    href: '/gene-replacement/',
  },
  {
    title: 'Off-the-Shelf Humanized Lines',
    targets: ['hSCAP', 'hCFH', 'PD1 humanized', 'PDL1 humanized'],
    description:
      'Skip the build entirely. Browse our catalog of ready-to-ship humanized mouse models from live colonies.',
    href: '/all-catalog-mouse-models/?q=humanized',
  },
];

export default function HumanizedMouseServicesPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Mouse Model Generation', path: '/custom-mouse-models' },
          { name: 'Humanized Mouse Services', path: '/humanized-mouse-services' },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Humanized Mouse Services',
            serviceType: 'Generated humanized mouse model generation',
            provider: {
              '@type': 'Organization',
              '@id': 'https://www.genetargeting.com/#organization',
              name: 'ingenious targeting laboratory',
              url: 'https://www.genetargeting.com',
            },
            areaServed: 'Worldwide',
            description:
              'Generated humanized mouse models for drug development. Drug-target humanization, immune checkpoint humanization (PD1, PDL1, CTLA4, LAG3, TIM3), and complete gene replacement. Since 1998. 800+ peer-reviewed publications.',
            offers: buildServiceOffer('https://www.genetargeting.com/request-quote/', 'Humanized'),
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
                display: 'inline-block',
                color: '#00d4d4',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Humanized Mouse Services Since 1998
            </div>
            <h1
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                margin: '0 0 18px 0',
                letterSpacing: '-0.5px',
              }}
            >
              Humanized mouse services for drug development.
              <br />
              <span style={{ color: '#00d4d4' }}>Pricing & 24h quote.</span>
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
              We have built humanized mouse models since 1998. Drug-target
              humanization, immune checkpoint humanization (PD1, PDL1, CTLA4,
              LAG3, TIM3), and complete gene replacement. 800+ peer-reviewed
              publications. 100% germline transmission guarantee.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/request-quote?utm_source=organic&utm_medium=service&utm_campaign=humanized-services-hero"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#0a253c',
                  padding: '13px 24px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Get a Quote in 24 Hours
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/all-catalog-mouse-models/?q=humanized&utm_source=organic&utm_medium=service&utm_campaign=humanized-services-catalog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '2px solid rgba(255,255,255,0.55)',
                }}
              >
                Browse Humanized Catalog
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="humanized-mouse-services" utmMedium="page-hero" flush />
          </div>
        </section>

        <UXUIDCServicePricingAnchor
          serviceLabel="Humanized Mouse"
          headline="Generated humanized mice — fixed-fee quote in 24 hours."
          unlockInterest="Humanized Mouse"
          subline="Pricing scales with humanization strategy (drug-target replacement, immune checkpoint, complete gene replacement) and allele complexity. Free scientific consultation included."
          quoteHref="/request-quote?utm_source=organic&utm_medium=service&utm_campaign=humanized-services-pricing"
          secondaryHref="/all-catalog-mouse-models/?q=humanized&utm_source=organic&utm_medium=service&utm_campaign=humanized-services-catalog-pricing"
          secondaryLabel="See Off-the-Shelf Lines"
          faqs={[
            {
              question: 'How much do humanized mice cost?',
              answer:
                'Pricing scales with humanization strategy (drug-target replacement, immune checkpoint humanization, complete gene replacement), allele complexity, and delivery timeline. Add your work email above to get current pricing or request a fixed-fee quote in 24 hours after a free scientific consultation. We deliver germline-confirmed founders.',
            },            {
              question: 'What humanization strategies do you offer?',
              answer:
                'Three strategies: (1) drug-target humanization — replace the gene encoding your therapeutic target so mouse models become predictive of human pharmacology, (2) immune checkpoint humanization (PD1, PDL1, CTLA4, LAG3, TIM3) — for checkpoint inhibitor efficacy testing, and (3) complete gene replacement — replace the entire mouse gene with the human ortholog for human-specific biology studies.',
            },
            {
              question: 'Do you have ready-to-ship humanized mice?',
              answer:
                'Yes. Our catalog includes 14,774+ ready-to-ship genetically engineered mouse models, including humanized lines such as hSCAP, hCFH, PD1 humanized, and PDL1 humanized. Search the catalog by gene to see live-colony availability before commissioning a generated build.',
            },
            {
              question: 'Do you guarantee germline transmission?',
              answer:
                'Yes. Every model generation humanized mouse project from ingenious targeting laboratory carries a 100% germline transmission guarantee. We deliver germline-confirmed founders or we keep working until we do.',
            },
          ]}
        />

        <section style={{ backgroundColor: '#ffffff', padding: '50px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              Four humanized mouse services. One vendor.
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {services.map((svc) => (
                <Link
                  key={svc.href}
                  href={`${svc.href}${svc.href.includes('?') ? '&' : '?'}utm_source=organic&utm_medium=service&utm_campaign=humanized-services-card`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '22px',
                    backgroundColor: '#f8fafa',
                    border: '1px solid #d8e3e6',
                    borderLeft: '4px solid #008080',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  <h3
                    style={{
                      color: '#0a253c',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {svc.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {svc.targets.map((t) => (
                      <span
                        key={t}
                        style={{
                          backgroundColor: 'rgba(0,128,128,0.08)',
                          color: '#008080',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '3px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      color: '#444',
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {svc.description}
                  </p>
                  <span
                    style={{
                      color: '#008080',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginTop: 'auto',
                    }}
                  >
                    Learn more →
                  </span>
                </Link>
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
                fontSize: '1.8rem',
                fontWeight: 700,
                margin: '0 0 14px 0',
              }}
            >
              Want the full technical breakdown?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1rem',
                lineHeight: 1.6,
                margin: '0 0 22px 0',
              }}
            >
              See our complete humanized mouse models page with strategy
              comparisons, validation methods, and case studies.
            </p>
            <Link
              href="/humanized-mouse-models/?utm_source=organic&utm_medium=service&utm_campaign=humanized-services-deep-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                color: '#0a253c',
                padding: '13px 24px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              See Full Humanized Mouse Models Page
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom dual-path CTA */}
      <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta slug="humanized-mouse-services" utmMedium="page-closing" flush />
        </div>
      </section>

      <UXUIDCFooter />
    </div>
  );
}
