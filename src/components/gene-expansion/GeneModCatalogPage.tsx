/**
 * Extracted catalog tier-1 page — unchanged output from original [modSlug]/page.tsx.
 */

import Link from 'next/link';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import { availabilityColor, availabilityLabel } from '@/lib/catalog/availability';
import { UXUIDCNavigation, UXUIDCFooter, BreadcrumbSchema } from '@/components/UXUIDC';
import { IconChevronRight } from '@/components/UXUIDC/Icons';
import { tissueCanonicalToSlug } from '@/lib/seo/slugs';
import { CRE_DRIVERS, getDisplayLabelForTissueKey } from '@/lib/search/creDrivers';
import { getCuratedIntro } from '@/lib/seo/curatedIntros';
import { buildTemplateIntro } from '@/lib/seo/contentTemplates';
import { rationaleForModTissue } from '@/lib/seo/rationaleSnippets';
import { buildTierGeneModFaqs } from '@/lib/seo/faqBuilders';
import { getPublicationsForPage } from '@/data/pagePublications';
import { buildCatalogProductSchema } from '@/lib/seo/productSchema';

const BASE_URL = 'https://www.genetargeting.com';

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

export interface GeneModCatalogPageProps {
  geneName: string;
  modSlug: string;
  modCanon: string;
  rawModels: ServerCatalogModel[];
  relatedGenes: string[];
}

export default function GeneModCatalogPage({
  geneName,
  modSlug,
  modCanon,
  rawModels,
  relatedGenes,
}: GeneModCatalogPageProps) {
  const models = rawModels.map(cleanModel).filter((m) => m.modelType === modCanon);

  const curated = getCuratedIntro(geneName);
  const template = buildTemplateIntro({ gene: geneName, modCanonical: modCanon });
  const rationale = rationaleForModTissue(modCanon, undefined);
  const rationale2 = rationaleForModTissue(modCanon, 'liver');
  const faqs = buildTierGeneModFaqs({ gene: geneName, modLabel: modCanon });
  const timeline = `Typical custom projects target study ready cohorts near twenty six weeks from contract start when breeding is direct. Quotes return in about twenty four hours with milestones, pricing, and options for cryo or live dispatch.`;

  const productSchemas = models.map((m) =>
    buildCatalogProductSchema(m, {
      name: m.modelAbbrev || `${geneName} ${m.modelType || ''} Mouse Model`.trim(),
      description: `${m.modelType || 'Genetically engineered'} mouse model for ${geneName}.`,
      additionalProperty: [{ '@type': 'PropertyValue', name: 'Modification type', value: modCanon }],
    }),
  );

  const pubs = getPublicationsForPage('/conditional-knockout-mouse-models');
  const tissues = [...new Set(CRE_DRIVERS.map((d) => d.tissue))].slice(0, 5);

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
                <li><Link href="/all-catalog-mouse-models/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Catalog</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href={`/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{geneName}</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>{modCanon}</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
              {geneName} {modCanon} mouse models
            </h1>
            <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.75, maxWidth: '880px', marginBottom: '24px' }}>
              {curated ? <p style={{ marginBottom: '16px' }}>{curated}</p> : null}
              <p>{template}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#008080', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontWeight: 600, textDecoration: 'none' }}>
                Request a quote <IconChevronRight size={16} color="#fff" />
              </Link>
            </div>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.45rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>
              Catalog table
            </h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>{rationale}</p>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '24px' }}>{rationale2}</p>
            {models.length === 0 ? null : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ background: '#f7f7f7' }}>
                      {['Model', 'Type', 'Category', 'Availability', 'Catalog #', 'Action'].map((h) => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Action' ? 'center' : 'left', fontWeight: 600, borderBottom: '2px solid #e0e0e0' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model, index) => (
                      <tr key={model.id} style={{ background: index % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 600, fontFamily: 'monospace', fontSize: '.85rem' }}>{model.modelAbbrev}</td>
                        <td style={{ padding: '14px 16px' }}>{model.modelType}</td>
                        <td style={{ padding: '14px 16px', color: '#666', fontSize: '.85rem' }}>{model.category}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ color: availabilityColor(model.availability) }}>{availabilityLabel(model.availability)}</span>
                        </td>
                        <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#134978' }}>{model.catalogNumber}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <Link href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}&catalog=${encodeURIComponent(model.catalogNumber)}`} style={{ background: '#008080', color: '#fff', padding: '8px 14px', borderRadius: '4px', fontSize: '.8rem', fontWeight: 600, textDecoration: 'none' }}>Inquire</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section style={{ background: '#f8f9fa', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Why this approach</h2>
            <p style={{ color: '#444', lineHeight: 1.85 }}>{rationale}</p>
            <p style={{ color: '#444', lineHeight: 1.85, marginTop: '12px' }}>{rationale2}</p>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Build timeline and pricing</h2>
            <p style={{ color: '#444', lineHeight: 1.85 }}>{timeline}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
              <Link href="/all-catalog-mouse-models" style={{ display: 'inline-block', padding: '10px 18px', background: '#008080', color: '#fff', borderRadius: '4px', fontWeight: 700, textDecoration: 'none' }}>Browse 14,774+ Catalog Models</Link>
              <Link href="/request-quote" style={{ display: 'inline-block', padding: '10px 18px', background: '#0a253c', color: '#fff', borderRadius: '4px', fontWeight: 700, textDecoration: 'none' }}>Request Custom Quote</Link>
            </div>
          </div>
        </section>

        <section style={{ background: '#f8f9fa', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '20px' }}>FAQ</h2>
            {faqs.map((f) => (
              <div key={f.question} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a253c' }}>{f.question}</h3>
                <p style={{ color: '#444', lineHeight: 1.75 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#fff', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Related models and routes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <Link href={`/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`} style={{ padding: '8px 14px', border: '1px solid #008080', borderRadius: '4px', color: '#008080', fontWeight: 600, textDecoration: 'none' }}>All {geneName} models</Link>
              {modCanon === 'Conditional Knockout' &&
                tissues.map((tk) => (
                  <Link
                    key={tk}
                    href={`/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/conditional-knockout/${tissueCanonicalToSlug(tk)}/`}
                    style={{ padding: '8px 14px', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {geneName} conditional, {getDisplayLabelForTissueKey(tk)}
                  </Link>
                ))}
            </div>
            {relatedGenes.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {relatedGenes.map((g) => (
                  <Link key={g} href={`/all-catalog-mouse-models/gene/${encodeURIComponent(g)}/${modSlug}/`} style={{ padding: '6px 12px', background: '#f0f9f9', borderRadius: '4px', color: '#008080', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>
                    {g} {modCanon}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {pubs.length > 0 ? (
          <section style={{ background: '#f8f9fa', padding: '40px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Citations</h2>
              <ul style={{ paddingLeft: '1.2rem', color: '#444' }}>
                {pubs.slice(0, 6).map((p) => (
                  <li key={p.link} style={{ marginBottom: '8px' }}>
                    <a href={p.link} style={{ color: '#008080' }}>{p.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <UXUIDCFooter />

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'All Catalog Models', path: '/all-catalog-mouse-models' },
          { name: geneName, path: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}` },
          { name: modCanon, path: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}` },
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
