/**
 * Tier 2 — tissue-specific Cre line hub: /cre-lines/[tissueSlug]/
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { applyCatalogFirstMeta } from '@/lib/seo';
import {
  CRE_DRIVERS,
  getDisplayLabelForTissueKey,
} from '@/lib/search/creDrivers';
import { UXUIDCNavigation, UXUIDCFooter, BreadcrumbSchema, CatalogCustomDualCta } from '@/components/UXUIDC';
import {
  driverCanonicalToSlug,
  allTissueLineSlugs,
  tissueCanonicalToSlug,
  tissueSlugToCanonical,
} from '@/lib/seo/slugs';
import { buildCreLineFaqs } from '@/lib/seo/faqBuilders';
import { buildTemplateIntro } from '@/lib/seo/contentTemplates';
import { rationaleForModTissue } from '@/lib/seo/rationaleSnippets';
import { getTopConditionalGeneNames } from '@/lib/catalog/serverCatalog';
import { getPublicationsForPage } from '@/data/pagePublications';

export const revalidate = 86400;
export const dynamicParams = true;

const BASE_URL = 'https://www.genetargeting.com';
const SITE_NAME = 'ingenious targeting laboratory';

export function generateStaticParams() {
  return allTissueLineSlugs().map((tissueSlug) => ({ tissueSlug }));
}

type Props = { params: Promise<{ tissueSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tissueSlug } = await params;
  const canon = tissueSlugToCanonical(tissueSlug);
  if (!canon) return { title: 'Cre lines' };
  const label = getDisplayLabelForTissueKey(canon);
  const meta = applyCatalogFirstMeta(
    `${label} Cre Mouse Lines | Catalog + Generation`,
    `Browse ${label} biased Cre and CreERT2 drivers in the catalog. Request a generated conditional knockout when you need a paired floxed allele. Quote in twenty four hours.`,
    `/cre-lines/${tissueSlug}`,
  );
  const title = meta.title;
  const description = meta.description;
  const canonical = `${BASE_URL}/cre-lines/${tissueSlug}/`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CreLinesTissuePage({ params }: Props) {
  const { tissueSlug } = await params;
  const canon = tissueSlugToCanonical(tissueSlug);
  if (!canon) notFound();

  const label = getDisplayLabelForTissueKey(canon);
  const drivers = CRE_DRIVERS.filter((d) => d.tissue === canon);
  const topGenes = await getTopConditionalGeneNames(6);
  const faqs = buildCreLineFaqs({ tissueLabel: label });
  const intro = buildTemplateIntro({
    gene: 'Target',
    modCanonical: 'Conditional Knockout',
    tissueLabel: label,
  });
  const rationale = rationaleForModTissue('Conditional Knockout', canon);
  const rationale2 = rationaleForModTissue('Knockin', canon);
  const pubs = getPublicationsForPage('/tissue-specific-knockout');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <main id="main-content">
        <section className="page-hero"
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '80px 20px 60px',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>{label} Cre lines</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.4rem', fontWeight: 700, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
              {label} specific Cre mouse lines for conditional alleles
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, maxWidth: '860px' }}>
              {intro}
            </p>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="cre-lines" utmMedium="page-hero" flush />
          </div>
        </section>

        <section style={{ background: '#fff', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>
              Drivers used in {label} programs
            </h2>
            <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '24px' }}>
              {rationale} {rationale2}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {drivers.map((d) => (
                <li key={d.driver} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                  <Link href={`/cre-drivers/${driverCanonicalToSlug(d.driver)}/`} style={{ fontWeight: 700, color: '#008080', textDecoration: 'none', fontSize: '1.05rem' }}>
                    {d.driver}
                  </Link>
                  <p style={{ color: '#555', fontSize: '.92rem', lineHeight: 1.7, margin: '8px 0 0' }}>
                    {d.inducible
                      ? `Inducible via ${d.inducer ?? 'ligand'} control. ${d.notes ?? 'Pair timing experiments with reporter crosses before scaling cohorts.'}`
                      : d.notes ?? 'Constitutive recombinase activity in the labeled lineage under this promoter system.'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ background: '#f8f9fa', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#0a253c', marginBottom: '16px' }}>
              Popular floxed genes crossed to {label} drivers
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {topGenes.map((g) => (
                <Link
                  key={g}
                  href={`/all-catalog-mouse-models/gene/${encodeURIComponent(g)}/conditional-knockout/${tissueCanonicalToSlug(canon)}/`}
                  style={{
                    padding: '8px 14px',
                    background: '#fff',
                    border: '1px solid #008080',
                    borderRadius: '4px',
                    color: '#008080',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '.88rem',
                  }}
                >
                  {g} conditional knockout ({label})
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#0a253c', marginBottom: '20px' }}>
              Frequently asked questions
            </h2>
            {faqs.map((f) => (
              <div key={f.question} style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a253c', marginBottom: '8px' }}>{f.question}</h3>
                <p style={{ color: '#444', lineHeight: 1.75, fontSize: '.95rem' }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {pubs.length > 0 && (
          <section style={{ background: '#f8f9fa', padding: '48px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '16px' }}>
                References
              </h2>
              <ul style={{ paddingLeft: '1.2rem', color: '#444', lineHeight: 1.8 }}>
                {pubs.slice(0, 6).map((p) => (
                  <li key={p.link} style={{ marginBottom: '8px' }}>
                    <a href={p.link} style={{ color: '#008080' }}>{p.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section style={{ background: '#008080', padding: '48px 20px', textAlign: 'center' }}>
          <Link href="/request-quote" style={{ display: 'inline-flex', background: '#fff', color: '#008080', padding: '14px 28px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none' }}>
            Request a quote
          </Link>
        </section>

        {/* Bottom dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="cre-lines" utmMedium="page-closing" flush />
          </div>
        </section>
      </main>
      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
                  { '@type': 'ListItem', position: 2, name: 'Tissue specific knockout', item: `${BASE_URL}/tissue-specific-knockout/` },
                  { '@type': 'ListItem', position: 3, name: `${label} specific`, item: `${BASE_URL}/cre-lines/${tissueSlug}/` },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': `${BASE_URL}/cre-lines/${tissueSlug}/#faq`,
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              },
            ],
          }),
        }}
      />

    </div>
  );
}
