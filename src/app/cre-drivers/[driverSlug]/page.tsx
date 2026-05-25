/**
 * Tier 3 — Cre driver hub: /cre-drivers/[driverSlug]/
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { applyCatalogFirstMeta } from '@/lib/seo';
import { CRE_DRIVERS, getDisplayLabelForTissueKey } from '@/lib/search/creDrivers';
import { UXUIDCNavigation, UXUIDCFooter, BreadcrumbSchema } from '@/components/UXUIDC';
import {
  driverCanonicalToSlug,
  driverSlugToCanonical,
  tissueCanonicalToSlug,
} from '@/lib/seo/slugs';
import { buildCreDriverFaqs } from '@/lib/seo/faqBuilders';
import { buildTemplateIntro } from '@/lib/seo/contentTemplates';
import { rationaleForModTissue } from '@/lib/seo/rationaleSnippets';
import { getTopConditionalGeneNames } from '@/lib/catalog/serverCatalog';
import { getPublicationsForPage } from '@/data/pagePublications';

export const revalidate = 86400;
export const dynamicParams = true;

const BASE_URL = 'https://www.genetargeting.com';
const SITE_NAME = 'ingenious targeting laboratory';

export function generateStaticParams() {
  return CRE_DRIVERS.map((d) => ({ driverSlug: driverCanonicalToSlug(d.driver) }));
}

type Props = { params: Promise<{ driverSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { driverSlug } = await params;
  const canon = driverSlugToCanonical(driverSlug);
  if (!canon) return { title: `Cre driver | ${SITE_NAME}` };
  const meta = applyCatalogFirstMeta(
    `${canon} Mouse Line | Catalog + Custom | ITL`,
    `Use ${canon} for tissue restricted recombination in mouse models. Pair with floxed alleles from our catalog or request a custom Cre project. Quote in about twenty four hours.`,
    `/cre-drivers/${driverSlug}`,
  );
  const title = meta.title;
  const description = meta.description;
  const canonical = `${BASE_URL}/cre-drivers/${driverSlug}/`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CreDriverPage({ params }: Props) {
  const { driverSlug } = await params;
  const driverName = driverSlugToCanonical(driverSlug);
  if (!driverName) notFound();
  const row = CRE_DRIVERS.find((d) => d.driver === driverName);
  if (!row) notFound();

  const tissueLabel = getDisplayLabelForTissueKey(row.tissue);
  const tissueLineUrl = `/cre-lines/${tissueCanonicalToSlug(row.tissue)}/`;
  const topGenes = await getTopConditionalGeneNames(5);
  const faqs = buildCreDriverFaqs({ driver: row.driver, tissueLabel });
  const intro = buildTemplateIntro({
    gene: 'Target',
    modCanonical: 'Conditional Knockout',
    tissueLabel: tissueLabel,
  });
  const rationale = rationaleForModTissue('Conditional Knockout', row.tissue);
  const rationale2 = rationaleForModTissue('Knockout', row.tissue);
  const pubs = getPublicationsForPage('/cre-recombinase-mice');
  const dslug = driverCanonicalToSlug(row.driver);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <main id="main-content">
        <section style={{ background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)', padding: '80px 20px 60px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/cre-recombinase-mice/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Cre recombinase</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>{row.driver}</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.4rem', fontWeight: 700, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
              {row.driver} for {tissueLabel} conditional models
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, maxWidth: '860px' }}>{intro}</p>
            <p style={{ marginTop: '16px' }}>
              <Link href={tissueLineUrl} style={{ color: '#7fe5e5', fontWeight: 600, textDecoration: 'none' }}>
                View all {tissueLabel} Cre lines
              </Link>
            </p>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>
              Driver pairing notes
            </h2>
            <p style={{ color: '#444', lineHeight: 1.85, fontSize: '.98rem', marginBottom: '16px' }}>
              {row.notes ??
                `${row.driver} biases recombination toward ${tissueLabel} lineages. Inducible design: ${row.inducible ? `yes, via ${row.inducer ?? 'ligand'}` : 'no, constitutive activity'}.`}
            </p>
            <p style={{ color: '#444', lineHeight: 1.85 }}>{rationale}</p>
            <p style={{ color: '#444', lineHeight: 1.85, marginTop: '12px' }}>{rationale2}</p>
          </div>
        </section>

        <section style={{ background: '#f8f9fa', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#0a253c', marginBottom: '16px' }}>
              Example conditional alleles to pair with {row.driver}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {topGenes.map((g) => (
                <Link
                  key={g}
                  href={`/all-catalog-mouse-models/gene/${encodeURIComponent(g)}/conditional-knockout/${dslug}/`}
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
                  {g} with {row.driver}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#0a253c', marginBottom: '20px' }}>
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
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '16px' }}>References</h2>
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
      </main>
      <UXUIDCFooter />

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Cre recombinase mice', path: '/cre-recombinase-mice' },
          { name: row.driver, path: `/cre-drivers/${driverSlug}` },
        ]}
      />

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
                  { '@type': 'ListItem', position: 2, name: 'Cre recombinase mice', item: `${BASE_URL}/cre-recombinase-mice/` },
                  { '@type': 'ListItem', position: 3, name: row.driver, item: `${BASE_URL}/cre-drivers/${driverSlug}/` },
                ],
              },
              {
                '@type': 'FAQPage',
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
