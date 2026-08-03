/**
 * Tier 4 — gene × modification × tissue or Cre driver
 * /all-catalog-mouse-models/gene/[geneName]/[modSlug]/[tissueOrDriverSlug]/
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getModelsByGene, getRelatedGenesWithModelType } from '@/lib/catalog/serverCatalog';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import { availabilityColor, availabilityLabel } from '@/lib/catalog/availability';
import { UXUIDCNavigation, UXUIDCFooter, BreadcrumbSchema, CatalogCustomDualCta } from '@/components/UXUIDC';
import { IconChevronRight } from '@/components/UXUIDC/Icons';
import { tier4GenerateStaticParams } from '@/data/seoKeywords';
import {
  modSlugToCanonical,
  resolveTissueOrDriverSlug,
  tissueCanonicalToSlug,
  driverCanonicalToSlug,
} from '@/lib/seo/slugs';
import { CRE_DRIVERS, getDisplayLabelForTissueKey } from '@/lib/search/creDrivers';
import { getCuratedIntro } from '@/lib/seo/curatedIntros';
import { getGeneModNote } from '@/lib/seo/geneModNotes';
import { buildTemplateIntro } from '@/lib/seo/contentTemplates';
import { rationaleForModTissue } from '@/lib/seo/rationaleSnippets';
import { buildTierGeneModFaqs } from '@/lib/seo/faqBuilders';
import { getPublicationsForPage } from '@/data/pagePublications';
import { buildCatalogProductSchema } from '@/lib/seo/productSchema';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return tier4GenerateStaticParams();
}

const BASE_URL = 'https://www.genetargeting.com';
const SITE_NAME = 'ingenious targeting laboratory';

type Props = {
  params: Promise<{ geneName: string; modSlug: string; tissueOrDriverSlug: string }>;
};

function stripSmoc(s: string | undefined | null): string {
  if (!s) return '';
  return s.replace(/smoc/gi, 'ITL').replace(/shanghai model organisms?( center)?/gi, 'ITL').trim();
}

function cleanModel(m: ServerCatalogModel): ServerCatalogModel {
  return {
    ...m,
    modelAbbrev: stripSmoc(m.modelAbbrev),
    modelType: stripSmoc(m.modelType),
    category: stripSmoc(m.category),
    availability: stripSmoc(m.availability),
    catalogNumber: stripSmoc(m.catalogNumber),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { geneName: rawG, modSlug, tissueOrDriverSlug } = await params;
  const geneName = decodeURIComponent(rawG);
  const modCanon = modSlugToCanonical(modSlug);
  const resolved = resolveTissueOrDriverSlug(tissueOrDriverSlug);
  if (!modCanon || !resolved) return { title: `${geneName} models | ${SITE_NAME}` };
  const labelThird =
    resolved.kind === 'tissue'
      ? getDisplayLabelForTissueKey(resolved.canonical)
      : resolved.canonical;
  const title = `${geneName} ${modCanon} mouse ${labelThird} | ITL`;
  const description = `${geneName} ${modCanon.toLowerCase()} models with ${String(labelThird).toLowerCase()} context. Catalog availability and quotes from ${SITE_NAME}.`;
  const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/${tissueOrDriverSlug}/`;
  const models = (await getModelsByGene(geneName))
    .map(cleanModel)
    .filter((m) => m.modelType === modCanon);
  const indexable = models.length >= 1;
  return {
    title,
    description,
    alternates: { canonical },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function GeneModContextTierPage({ params }: Props) {
  const { geneName: rawG, modSlug, tissueOrDriverSlug } = await params;
  const geneName = decodeURIComponent(rawG);
  const modCanon = modSlugToCanonical(modSlug);
  const resolved = resolveTissueOrDriverSlug(tissueOrDriverSlug);
  if (!modCanon || !resolved) notFound();

  const rawModels = await getModelsByGene(geneName);
  if (rawModels.length === 0) notFound();
  const models = rawModels.map(cleanModel).filter((m) => m.modelType === modCanon);
  if (models.length === 0) notFound();

  // Cross-links reuse this page's modSlug + tissue/driver slug; only siblings
  // that also carry a matching catalog model type resolve to a live Tier 4 page.
  const relatedGenes = await getRelatedGenesWithModelType(geneName, modCanon, 6);

  const driverRow = resolved.kind === 'driver' ? CRE_DRIVERS.find((d) => d.driver === resolved.canonical) : undefined;
  const tissueKey = resolved.kind === 'tissue' ? resolved.canonical : driverRow?.tissue;
  const tissueLabel = tissueKey ? getDisplayLabelForTissueKey(tissueKey) : '';

  const curated = getCuratedIntro(geneName);
  const template = buildTemplateIntro({
    gene: geneName,
    modCanonical: modCanon,
    tissueLabel: resolved.kind === 'tissue' ? tissueLabel : driverRow ? getDisplayLabelForTissueKey(driverRow.tissue) : undefined,
  });
  const rationale = rationaleForModTissue(modCanon, tissueKey);
  const modNote = getGeneModNote(geneName, modSlug);
  const faqs = buildTierGeneModFaqs({
    gene: geneName,
    modLabel: modCanon,
    tissueOrDriver: tissueOrDriverSlug,
  });
  const catalogQuoteNote = `The ${geneName} ${modCanon} lines listed above are catalog models. Send us the catalog number and our team confirms current availability, pricing, and whether the line ships cryopreserved or live.`;
  const generationQuoteNote = `If your study needs a ${geneName} allele configuration that is not listed above, our scientific team designs and generates it. Model generation quotes return in about twenty four hours with milestones for genotyping, QC, and dispatch.`;

  const extraProps: { '@type': 'PropertyValue'; name: string; value: string }[] = [];
  if (resolved.kind === 'tissue') {
    extraProps.push({ '@type': 'PropertyValue', name: 'Tissue specificity', value: tissueLabel });
  } else {
    extraProps.push({ '@type': 'PropertyValue', name: 'Cre driver', value: resolved.canonical });
    const bias = tissueLabel || driverRow?.tissue;
    if (bias) extraProps.push({ '@type': 'PropertyValue', name: 'Tissue bias', value: bias });
  }

  const productSchemas = models.map((m) =>
    buildCatalogProductSchema(m, {
      name: m.modelAbbrev || `${geneName} ${m.modelType || ''} Mouse Model`.trim(),
      description: `${m.modelType} mouse model for ${geneName}.`,
      additionalProperty: [{ '@type': 'PropertyValue', name: 'Modification type', value: modCanon }, ...extraProps],
    }),
  );

  const pubs = getPublicationsForPage('/tissue-specific-knockout');
  const h1Third =
    resolved.kind === 'tissue' ? `${tissueLabel} specific context` : `${resolved.canonical} pairing`;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <main id="main-content">
        <section className="page-hero" style={{ background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)', padding: '80px 20px 60px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href={`/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{geneName}</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href={`/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{modCanon}</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>{h1Third}</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.35rem', fontWeight: 700, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
              {geneName} {modCanon} mouse — {h1Third}
            </h1>
            <div style={{ fontSize: '1rem', lineHeight: 1.75, maxWidth: '900px' }}>
              {curated && <p style={{ color: 'rgba(255,255,255,0.92)', marginBottom: '14px' }}>{curated}</p>}
              <p style={{ color: 'rgba(255,255,255,0.92)' }}>{template}</p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Link href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#008080', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontWeight: 600, textDecoration: 'none' }}>
                Order catalog model <IconChevronRight size={16} color="#fff" />
              </Link>
            </div>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="all-catalog-mouse-models" utmMedium="page-hero" flush />
          </div>
        </section>

        {resolved.kind === 'driver' && driverRow && (
          <section style={{ background: '#fff', padding: '40px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Driver pairing</h2>
              <p style={{ color: '#444', lineHeight: 1.85, fontSize: '.98rem' }}>
                {driverRow.notes ??
                  `${driverRow.driver} biases toward ${tissueLabel || driverRow.tissue}. Inducible: ${driverRow.inducible ? `yes (${driverRow.inducer ?? 'ligand'})` : 'no'}.`}
              </p>
              <p style={{ marginTop: '12px' }}>
                <Link href={`/cre-drivers/${driverCanonicalToSlug(driverRow.driver)}/`} style={{ color: '#008080', fontWeight: 600 }}>
                  Open {driverRow.driver} hub page
                </Link>
                {tissueKey ? (
                  <>
                    {' · '}
                    <Link href={`/cre-lines/${tissueCanonicalToSlug(tissueKey)}/`} style={{ color: '#008080', fontWeight: 600 }}>
                      {tissueLabel} Cre line index
                    </Link>
                  </>
                ) : null}
              </p>
            </div>
          </section>
        )}

        <section style={{ background: '#fff', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Catalog options</h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>{rationale}</p>
            {models.length === 0 ? (
              <p style={{ color: '#666' }}>No published {modCanon} line is listed for {geneName} today. Request a generated build using the quote link above.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', fontSize: '.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f7f7f7' }}>
                      {['Model', 'Type', 'Category', 'Availability', 'Catalog #', ''].map((h) => (
                        <th key={h} style={{ padding: '12px', textAlign: h ? 'left' : 'center', fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model, i) => (
                      <tr key={model.id} style={{ background: i % 2 ? '#fafafa' : '#fff' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 600 }}>{model.modelAbbrev}</td>
                        <td style={{ padding: '12px' }}>{model.modelType}</td>
                        <td style={{ padding: '12px', color: '#666' }}>{model.category}</td>
                        <td style={{ padding: '12px', color: availabilityColor(model.availability) }}>{availabilityLabel(model.availability)}</td>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: '#134978' }}>{model.catalogNumber}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <Link href={`/order-catalog-models?model=${encodeURIComponent(model.modelAbbrev || geneName)}&catalog=${encodeURIComponent(model.catalogNumber)}`} style={{ background: '#008080', color: '#fff', padding: '8px 12px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.8rem' }}>Inquire</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {modNote ? (
          <section style={{ background: '#f8f9fa', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a253c' }}>
                Designing a {geneName} {modCanon} allele
              </h2>
              <p style={{ color: '#444', lineHeight: 1.85, marginTop: '12px' }}>{modNote}</p>
            </div>
          </section>
        ) : null}

        <section style={{ background: '#fff', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a253c', marginBottom: '8px' }}>Pricing and quotes</h2>
            <p style={{ color: '#444', lineHeight: 1.85 }}>{catalogQuoteNote}</p>
            <p style={{ color: '#444', lineHeight: 1.85, marginTop: '12px' }}>{generationQuoteNote}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '14px' }}>
              <Link href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`} style={{ display: 'inline-block', padding: '10px 18px', background: '#008080', color: '#fff', borderRadius: '4px', fontWeight: 700, textDecoration: 'none' }}>Order a catalog {geneName} model</Link>
              <Link href="/request-quote" style={{ display: 'inline-block', padding: '10px 18px', background: '#0a253c', color: '#fff', borderRadius: '4px', fontWeight: 700, textDecoration: 'none' }}>Request a model generation quote</Link>
            </div>
          </div>
        </section>

        <section style={{ background: '#f8f9fa', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a253c', marginBottom: '16px' }}>FAQ</h2>
            {faqs.map((f) => (
              <div key={f.question} style={{ marginBottom: '18px' }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0a253c' }}>{f.question}</h3>
                <p style={{ color: '#444', lineHeight: 1.75 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#fff', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Related links</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Link href={`/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/`} style={{ padding: '8px 14px', border: '1px solid #008080', borderRadius: '4px', color: '#008080', fontWeight: 600, textDecoration: 'none' }}>{geneName} {modCanon} hub</Link>
              {tissueKey ? (
                <Link href={`/cre-lines/${tissueCanonicalToSlug(tissueKey)}/`} style={{ padding: '8px 14px', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontWeight: 600, textDecoration: 'none' }}>
                  {tissueLabel} Cre lines
                </Link>
              ) : null}
              {driverRow ? (
                <Link href={`/cre-drivers/${driverCanonicalToSlug(driverRow.driver)}/`} style={{ padding: '8px 14px', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontWeight: 600, textDecoration: 'none' }}>
                  {driverRow.driver} page
                </Link>
              ) : null}
            </div>
            {relatedGenes.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                {relatedGenes.map((g) => (
                  <Link key={g} href={`/all-catalog-mouse-models/gene/${encodeURIComponent(g)}/${modSlug}/${tissueOrDriverSlug}/`} style={{ padding: '6px 12px', background: '#f0f9f9', borderRadius: '4px', color: '#008080', fontSize: '.84rem', fontWeight: 600, textDecoration: 'none' }}>
                    {g} same route
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {pubs.length > 0 && (
          <section style={{ background: '#f8f9fa', padding: '36px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0a253c' }}>Citations</h2>
              <ul style={{ paddingLeft: '1.1rem', color: '#444', marginTop: '10px' }}>
                {pubs.slice(0, 6).map((p) => (
                  <li key={p.link} style={{ marginBottom: '8px' }}>
                    <a href={p.link} style={{ color: '#008080' }}>{p.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Bottom dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="all-catalog-mouse-models" utmMedium="page-closing" flush />
          </div>
        </section>
      </main>
      <UXUIDCFooter />

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Catalog', path: '/all-catalog-mouse-models' },
          { name: geneName, path: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}` },
          { name: modCanon, path: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}` },
          { name: h1Third, path: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/${tissueOrDriverSlug}` },
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
                  { '@type': 'ListItem', position: 2, name: 'Catalog', item: `${BASE_URL}/all-catalog-mouse-models/` },
                  { '@type': 'ListItem', position: 3, name: geneName, item: `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/` },
                  { '@type': 'ListItem', position: 4, name: modCanon, item: `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/` },
                  { '@type': 'ListItem', position: 5, name: h1Third, item: `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/${tissueOrDriverSlug}/` },
                ],
              },
              ...(models.length > 0 ? productSchemas : []),
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
