/**
 * Individual Gene Page — /all-catalog-mouse-models/gene/[geneName]
 * On-demand ISR: rendered on first request, cached at Vercel edge for 24h.
 * NO generateStaticParams — zero impact on build time.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getModelsByGene, getRelatedGenes } from '@/lib/catalog/serverCatalog';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import { UXUIDCNavigation, UXUIDCFooter, BreadcrumbSchema } from '@/components/UXUIDC';
import { IconChevronRight } from '@/components/UXUIDC/Icons';

// On-demand ISR: pages render on first request, cache at edge for 24h.
// After 24h, next visitor triggers background re-render (stale-while-revalidate).
export const revalidate = 86400;
export const dynamicParams = true;
// DO NOT add generateStaticParams — build stays fast (362 pages, not 14,000+)

const BASE_URL  = 'https://www.genetargeting.com';
const SITE_NAME = 'ingenious targeting laboratory';

type Props = { params: Promise<{ geneName: string }> };

// Strip any SMOC references from data fields before rendering
function stripSmoc(s: string | undefined | null): string {
  if (!s) return '';
  return s.replace(/smoc/gi, 'ITL').replace(/shanghai model organisms?( center)?/gi, 'ITL').trim();
}

function cleanModel(m: ServerCatalogModel): ServerCatalogModel {
  return {
    ...m,
    modelAbbrev: stripSmoc(m.modelAbbrev),
    modelType:   stripSmoc(m.modelType),
    category:    stripSmoc(m.category),
    availability: stripSmoc(m.availability),
    catalogNumber: stripSmoc(m.catalogNumber),
  };
}

function buildMetaDescription(geneName: string, models: ServerCatalogModel[]): string {
  const modelCount = models.length;
  const types = [...new Set(models.map(m => m.modelType))].filter(Boolean);
  const typeStr = types.length > 0 ? types.slice(0, 3).join(', ') : 'genetically engineered';
  const readyModels = models.filter(m => {
    const a = (m.availability || '').toLowerCase();
    return a.includes('live') || a.includes('available') || a.includes('ready');
  });
  const hasReady = readyModels.length > 0;

  const parts: string[] = [];
  parts.push(`${modelCount} ${geneName} ${typeStr} mouse model${modelCount > 1 ? 's' : ''}`);
  if (hasReady) parts.push('ready to ship');
  parts.push(`from ${SITE_NAME}`);
  parts.push('Best pricing guaranteed');
  parts.push('Browse catalog numbers, request a quote, or inquire about custom models');
  return parts.join('. ') + '.';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { geneName: rawParam } = await params;
  const geneName = decodeURIComponent(rawParam);
  const models   = (await getModelsByGene(geneName)).map(cleanModel);

  if (models.length === 0) {
    return { title: `${geneName} Mouse Models | ${SITE_NAME}` };
  }

  const title       = `${geneName} Mouse Models — Ready to Ship | ${SITE_NAME}`;
  const description = buildMetaDescription(geneName, models);
  const canonical   = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function getAvailabilityColor(a: string): string {
  const v = (a || '').toLowerCase();
  if (v.includes('live')) return '#2e7d32';
  if (v.includes('sperm') || v.includes('embryo') || v.includes('cryo')) return '#e65100';
  return '#555';
}

export default async function GenePage({ params }: Props) {
  const { geneName: rawParam } = await params;
  const geneName = decodeURIComponent(rawParam);

  const [rawModels, relatedGenes] = await Promise.all([
    getModelsByGene(geneName),
    getRelatedGenes(geneName),
  ]);

  if (rawModels.length === 0) return notFound();

  const models = rawModels.map(cleanModel);

  const hasLiveModels = models.some(m => {
    const a = (m.availability || '').toLowerCase();
    return a.includes('live') || a.includes('available') || a.includes('ready');
  });

  const types = [...new Set(models.map(m => m.modelType))].filter(Boolean);
  const typeStr = types.length > 0 ? types.slice(0, 3).join(', ') : 'genetically engineered';
  const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`;

  const productSchemas = models.map(m => ({
    '@type': 'Product',
    name: m.modelAbbrev || `${geneName} Mouse Model`,
    description: `${m.modelType || 'Genetically engineered'} mouse model for ${geneName}. ${m.category ? `Category: ${m.category}.` : ''} Available as ${m.availability || 'inquiry'}.`,
    sku: m.catalogNumber,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      seller: { '@type': 'Organization', name: SITE_NAME },
      availability: (m.availability || '').toLowerCase().includes('live')
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      url: `${BASE_URL}/order-catalog-models?gene=${encodeURIComponent(geneName)}&catalog=${encodeURIComponent(m.catalogNumber)}`,
    },
  }));

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">

        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,212,212,0.15)', border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px', padding: '6px 14px', marginBottom: '20px',
            }}>
              <span style={{ color: '#00d4d4', fontSize: '10px' }}>●</span>
              <span style={{ color: '#fff', fontSize: '.85rem', fontWeight: 500 }}>
                {models.length} Model{models.length !== 1 ? 's' : ''} Available
              </span>
            </div>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/all-catalog-mouse-models" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>All Catalog Models</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/all-catalog-mouse-models/gene-index" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Gene Index</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>{geneName}</li>
              </ol>
            </nav>

            <h1 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '2.8rem', fontWeight: 700,
              color: '#fff', marginBottom: '16px', lineHeight: 1.2,
            }}>
              {geneName} Mouse Models
            </h1>

            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px', lineHeight: 1.7, maxWidth: '800px',
            }}>
              {hasLiveModels
                ? `${models.length} ${geneName} ${typeStr} mouse model${models.length !== 1 ? 's' : ''} — in stock and ready to ship. Best pricing guaranteed from ${SITE_NAME}. Request a quote in 24 hours.`
                : `${models.length} ${geneName} ${typeStr} mouse model${models.length !== 1 ? 's' : ''} available from ${SITE_NAME}. Best pricing guaranteed. Contact us for availability and fast turnaround.`}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#008080', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                }}
              >
                Request a Quote <IconChevronRight size={16} color="#fff" />
              </Link>
              <Link
                href="/all-catalog-mouse-models"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                Search All Models
              </Link>
            </div>
          </div>
        </section>

        {/* Models Table */}
        <section style={{ background: '#fff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '1.6rem', fontWeight: 700,
              color: '#0a253c', marginBottom: '8px',
            }}>
              Available {geneName} Models
            </h2>
            <p style={{ color: '#666', fontSize: '.9rem', marginBottom: '24px' }}>
              All models include full quality control documentation and technical support.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ background: '#f7f7f7' }}>
                    {['Model Abbreviation', 'Model Type', 'Category', 'Availability', 'ITL Catalog #', ''].map((h) => (
                      <th key={h} style={{
                        padding: '12px 16px',
                        textAlign: h === '' ? 'center' : 'left',
                        fontWeight: 600, color: '#333',
                        borderBottom: '2px solid #e0e0e0',
                        whiteSpace: 'nowrap', fontSize: '.8rem',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, index) => (
                    <tr
                      key={model.id}
                      style={{ background: index % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}
                    >
                      <td style={{ padding: '14px 16px', color: '#333', fontFamily: 'monospace', fontSize: '.85rem', fontWeight: 600 }}>
                        {model.modelAbbrev}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {model.modelType ? (
                          <span style={{
                            display: 'inline-block', padding: '3px 10px',
                            background: '#134978', color: '#fff',
                            borderRadius: '4px', fontSize: '.78rem', fontWeight: 500,
                          }}>
                            {model.modelType}
                          </span>
                        ) : 'N/A'}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#666', fontSize: '.85rem', maxWidth: '200px' }}>
                        {model.category || 'N/A'}
                      </td>
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '.85rem', color: getAvailabilityColor(model.availability) }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: getAvailabilityColor(model.availability), flexShrink: 0 }} />
                          {model.availability || 'Inquire'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#134978', fontFamily: 'monospace', fontSize: '.82rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {model.catalogNumber}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <Link
                          href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}&catalog=${encodeURIComponent(model.catalogNumber)}`}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            background: '#008080', color: '#fff',
                            padding: '7px 14px', borderRadius: '4px',
                            fontSize: '.78rem', fontWeight: 600, textDecoration: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Inquire <IconChevronRight size={12} color="#fff" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sales / About section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700,
                color: '#0a253c', marginBottom: '16px',
              }}>
                Looking for a {geneName} mouse model?
              </h2>
              <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '16px', fontSize: '.95rem' }}>
                {hasLiveModels
                  ? `We have ${models.length} ${geneName} model${models.length !== 1 ? 's' : ''} in stock — including ${typeStr} types. In stock and ready to ship this week. All models come with full QC documentation, health certificates, and dedicated technical support.`
                  : `We have ${models.length} ${geneName} model${models.length !== 1 ? 's' : ''} available — including ${typeStr} types. Contact us today for current availability and our fastest turnaround options. All models come with full QC documentation and technical support.`}
              </p>
              <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '24px', fontSize: '.95rem' }}>
                Best pricing in the industry. Get a quote in 24 hours. Our team of PhD scientists is available to help you select the right model for your research.
              </p>
              <Link
                href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#008080', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                }}
              >
                Inquire Now — Fast Turnaround Guaranteed <IconChevronRight size={16} color="#fff" />
              </Link>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Models Available', value: String(models.length) },
                { label: 'Model Types', value: String(types.length || 1) },
                { label: 'Quote Turnaround', value: '24 hrs' },
                { label: 'QC Documentation', value: 'Included' },
              ].map((s) => (
                <div key={s.label} style={{
                  background: '#fff', border: '1px solid #e0e0e0',
                  borderRadius: '8px', padding: '16px 24px', textAlign: 'center',
                  minWidth: '160px',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#008080', marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '.8rem', color: '#666' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Genes */}
        {relatedGenes.length > 0 && (
          <section style={{ background: '#fff', padding: '50px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 700,
                color: '#0a253c', marginBottom: '20px',
              }}>
                Related Gene Targets
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {relatedGenes.map((gene) => (
                  <Link
                    key={gene}
                    href={`/all-catalog-mouse-models/gene/${encodeURIComponent(gene)}`}
                    style={{
                      padding: '6px 14px', background: '#f0f9f9',
                      border: '1px solid #008080', borderRadius: '4px',
                      color: '#008080', fontSize: '.85rem', fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    {gene}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ background: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem', fontWeight: 700,
              color: '#fff', marginBottom: '16px',
            }}>
              {hasLiveModels
                ? `${geneName} Models — Ready to Ship. Best Prices Guaranteed.`
                : `Need a ${geneName} Mouse Model? We Can Build It.`}
            </h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,0.9)', marginBottom: '28px', lineHeight: 1.7 }}>
              {hasLiveModels
                ? `Get a confirmed quote in 24 hours. All ${geneName} models ship with full QC documentation, health certificates, and lifetime technical support.`
                : `Our team can deliver a custom ${geneName} mouse model with fast turnaround. Competitive pricing, expert project management, and full QC documentation included.`}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#fff', color: '#008080', padding: '14px 28px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 700, textDecoration: 'none',
                }}
              >
                {hasLiveModels ? 'Order Now' : 'Get a Custom Quote'} <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link
                href="/request-quote"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', color: '#fff', padding: '14px 28px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.5)',
                }}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

      </main>

      <UXUIDCFooter />

      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'All Catalog Models', path: '/all-catalog-mouse-models' },
        { name: 'Gene Index', path: '/all-catalog-mouse-models/gene-index' },
        { name: geneName, path: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}` },
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                  { '@type': 'ListItem', position: 2, name: 'All Catalog Models', item: `${BASE_URL}/all-catalog-mouse-models/` },
                  { '@type': 'ListItem', position: 3, name: 'Gene Index', item: `${BASE_URL}/all-catalog-mouse-models/gene-index/` },
                  { '@type': 'ListItem', position: 4, name: geneName, item: canonical },
                ],
              },
              ...productSchemas,
            ],
          }),
        }}
      />
    </div>
  );
}
