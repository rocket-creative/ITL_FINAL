/**
 * Gene Name Index — /all-catalog-mouse-models/gene-index
 * SEO cornerstone: every gene name rendered as plain HTML — fully crawlable.
 *
 * When ?letter=X is present: renders only that letter's models (no bounce, no anchor scroll).
 * When no param: renders full A–Z index as before.
 */

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllModels } from '@/lib/catalog/serverCatalog';
import { UXUIDCNavigation, UXUIDCFooter } from '@/components/UXUIDC';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import { IconChevronRight, IconLayers } from '@/components/UXUIDC/Icons';
import JumpNav from './JumpNav';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';

export const metadata: Metadata = {
  title: 'Mouse Model Gene Index — All Genes A–Z | ingenious targeting laboratory',
  description:
    'Complete alphabetical index of all gene names in our mouse model catalog. Search knockout, knockin, humanized, and Cre driver models by gene target.',
  alternates: {
    canonical: 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/',
  },
  openGraph: {
    title: 'Mouse Model Gene Index | ingenious targeting laboratory',
    description: 'Browse 5,000+ gene targets available as mouse models.',
    url: 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/',
    siteName: 'ingenious targeting laboratory',
    locale: 'en_US',
    type: 'website',
  },
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface Props {
  searchParams: Promise<{ letter?: string }>;
}

export default async function GeneIndexPage({ searchParams }: Props) {
  const { letter } = await searchParams;
  const filterLetter = letter?.toUpperCase().charAt(0) ?? null;

  const allModels = await getAllModels();

  // Group models by first letter of gene name
  const grouped: Record<string, ServerCatalogModel[]> = {};
  for (const model of allModels) {
    const firstLetter = model.geneName[0]?.toUpperCase();
    if (!firstLetter) continue;
    if (!grouped[firstLetter]) grouped[firstLetter] = [];
    grouped[firstLetter].push(model);
  }

  const uniqueGeneCount = new Set(allModels.map((m) => m.geneName)).size;
  const presentLetters = ALPHABET.filter((l) => !!grouped[l]);

  // When ?letter= is set, show only that letter's models
  const lettersToShow = filterLetter && grouped[filterLetter]
    ? [filterLetter]
    : presentLetters;

  const isFiltered = !!filterLetter;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
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
              <IconLayers size={14} color="#00d4d4" />
              <span style={{ color: '#fff', fontSize: '.85rem', fontWeight: 500 }}>
                {uniqueGeneCount.toLocaleString()}+ Unique Gene Targets
              </span>
            </div>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/all-catalog-mouse-models" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>All Catalog Models</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                {isFiltered ? (
                  <>
                    <li><Link href="/all-catalog-mouse-models/gene-index" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Gene Index</Link></li>
                    <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                    <li style={{ color: 'rgba(255,255,255,0.9)' }}>Letter {filterLetter}</li>
                  </>
                ) : (
                  <li style={{ color: 'rgba(255,255,255,0.9)' }}>Gene Index</li>
                )}
              </ol>
            </nav>

            <h1 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', fontWeight: 700,
              color: '#fff', marginBottom: '20px', lineHeight: 1.2,
            }}>
              {isFiltered
                ? `Mouse Models — Gene Names Starting with "${filterLetter}"`
                : 'Mouse Model Gene Index'}
            </h1>
            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px', lineHeight: 1.7, maxWidth: '800px',
            }}>
              {isFiltered
                ? `Showing ${grouped[filterLetter!]?.length ?? 0} models with gene names starting with "${filterLetter}". Each row includes the ITL catalog number for precise identification.`
                : `Browse all ${uniqueGeneCount.toLocaleString()} unique gene targets across our catalog of ${allModels.length.toLocaleString()}+ genetically engineered mouse models. Click any gene to see every available model.`}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/all-catalog-mouse-models" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#008080', color: '#fff', padding: '12px 24px',
                borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
              }}>
                Search All Models <IconChevronRight size={16} color="#fff" />
              </Link>
              {isFiltered && (
                <Link href="/all-catalog-mouse-models/gene-index" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}>
                  View Full A–Z Index
                </Link>
              )}
              {!isFiltered && (
                <Link href="/order-catalog-models" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}>
                  Request a Model
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ── Sticky alphabet jump nav (full index only) ─────────────────── */}
        {!isFiltered && <JumpNav presentLetters={presentLetters} />}

        {/* ── Letter filter strip (filtered view) ───────────────────────── */}
        {isFiltered && (
          <div style={{
            background: '#f7f7f7',
            borderBottom: '1px solid #e0e0e0',
            padding: '12px 20px',
          }}>
            <div style={{
              maxWidth: '1000px', margin: '0 auto',
              display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center',
            }}>
              <span style={{
                fontSize: '.72rem', color: '#999', fontWeight: 700,
                letterSpacing: '.08em', textTransform: 'uppercase',
                marginRight: '8px', whiteSpace: 'nowrap',
              }}>
                Browse by letter:
              </span>
              {ALPHABET.map((l) => {
                const hasModels = !!grouped[l];
                const isActive = l === filterLetter;
                return hasModels ? (
                  <Link
                    key={l}
                    href={`/all-catalog-mouse-models/gene-index?letter=${l}`}
                    style={{
                      width: '30px', height: '30px', borderRadius: '4px',
                      background: isActive ? '#006666' : '#008080',
                      color: '#fff', fontSize: '.8rem', fontWeight: 700,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      textDecoration: 'none', flexShrink: 0,
                      transform: isActive ? 'scale(1.15)' : undefined,
                    }}
                    aria-label={`View gene names starting with ${l}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {l}
                  </Link>
                ) : (
                  <span
                    key={l}
                    style={{
                      width: '30px', height: '30px', borderRadius: '4px',
                      background: '#eee', color: '#bbb', fontSize: '.8rem', fontWeight: 700,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {l}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Model listings ─────────────────────────────────────────────── */}
        <section style={{ background: '#fff', padding: '40px 20px 80px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {allModels.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}>
                <p style={{ marginBottom: '16px' }}>Gene index is building — check back shortly or</p>
                <Link href="/all-catalog-mouse-models" style={{ color: '#008080', fontWeight: 600 }}>
                  search the catalog directly →
                </Link>
              </div>
            ) : lettersToShow.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}>
                <p style={{ marginBottom: '16px' }}>No models found for letter &ldquo;{filterLetter}&rdquo;.</p>
                <Link href="/all-catalog-mouse-models/gene-index" style={{ color: '#008080', fontWeight: 600 }}>
                  View full A–Z index →
                </Link>
              </div>
            ) : (
              lettersToShow.map((letter) => (
                <div
                  key={letter}
                  id={`letter-${letter}`}
                  style={{ marginBottom: '48px', scrollMarginTop: '130px' }}
                >
                  {/* Letter heading */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    marginBottom: '16px', paddingBottom: '10px',
                    borderBottom: '2px solid #008080',
                  }}>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem',
                      fontWeight: 700, color: '#0a253c', lineHeight: 1,
                    }}>
                      {letter}
                    </span>
                    <span style={{ fontSize: '.8rem', color: '#999', fontWeight: 500 }}>
                      {grouped[letter].length} {grouped[letter].length === 1 ? 'model' : 'models'}
                    </span>
                    {!isFiltered && (
                      <a
                        href="#main-content"
                        style={{
                          marginLeft: 'auto',
                          fontSize: '.72rem', fontWeight: 600, color: '#008080',
                          textDecoration: 'none', letterSpacing: '.06em',
                          textTransform: 'uppercase', whiteSpace: 'nowrap', opacity: 0.7,
                        }}
                      >
                        ↑ Top
                      </a>
                    )}
                  </div>

                  {/* Model table with catalog numbers */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
                      <thead>
                        <tr style={{ background: '#f7f7f7' }}>
                          {['Gene Name', 'Model Abbreviation', 'Model Type', 'Availability', 'ITL Catalog #', ''].map((h) => (
                            <th
                              key={h}
                              style={{
                                padding: '10px 14px',
                                textAlign: h === '' ? 'center' : 'left',
                                fontWeight: 600, color: '#333',
                                borderBottom: '2px solid #e0e0e0',
                                whiteSpace: 'nowrap', fontSize: '.8rem',
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {grouped[letter].map((model) => (
                          <tr
                            key={model.id}
                            style={{ borderBottom: '1px solid #f0f0f0' }}
                          >
                            <td style={{ padding: '10px 14px', color: '#0a253c', fontWeight: 600 }}>
                              <Link
                                href={`/all-catalog-mouse-models/gene/${encodeURIComponent(model.geneName)}`}
                                style={{ color: '#008080', textDecoration: 'none', fontWeight: 600 }}
                              >
                                {model.geneName}
                              </Link>
                            </td>
                            <td style={{ padding: '10px 14px', color: '#444' }}>
                              {model.modelAbbrev}
                            </td>
                            <td style={{ padding: '10px 14px', color: '#666', fontSize: '.82rem' }}>
                              {model.modelType}
                            </td>
                            <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                              {model.availability ? (
                                <span style={{
                                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                                  fontSize: '.78rem',
                                  color: (() => {
                                    const a = model.availability.toLowerCase();
                                    if (a.includes('live')) return '#2e7d32';
                                    if (a.includes('sperm') || a.includes('embryo') || a.includes('cryo')) return '#e65100';
                                    return '#555';
                                  })(),
                                }}>
                                  <span style={{
                                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                                    background: (() => {
                                      const a = model.availability.toLowerCase();
                                      if (a.includes('live')) return '#2e7d32';
                                      if (a.includes('sperm') || a.includes('embryo') || a.includes('cryo')) return '#e65100';
                                      return '#555';
                                    })(),
                                  }} />
                                  {model.availability}
                                </span>
                              ) : '—'}
                            </td>
                            <td style={{
                              padding: '10px 14px', color: '#134978',
                              fontFamily: 'monospace', fontSize: '.82rem',
                              whiteSpace: 'nowrap', fontWeight: 600,
                            }}>
                              {model.catalogNumber}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                              <Link
                                href={`/order-catalog-models?gene=${encodeURIComponent(model.geneName)}&catalog=${encodeURIComponent(model.catalogNumber)}`}
                                style={{
                                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                                  background: '#008080', color: '#fff',
                                  padding: '5px 12px', borderRadius: '4px',
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
              ))
            )}

            {/* Back to top / back to index */}
            <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #e0e0e0' }}>
              {isFiltered ? (
                <Link href="/all-catalog-mouse-models/gene-index" style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  ← View full A–Z gene index
                </Link>
              ) : (
                <a href="#main-content" style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  ↑ Back to top
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section style={{ background: '#008080', padding: '50px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem', fontWeight: 700,
              color: '#fff', marginBottom: '16px',
            }}>
              Can&apos;t Find What You Need?
            </h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
              Our team can help you find the right model or create a custom solution tailored to your research.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/order-catalog-models" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#fff', color: '#008080', padding: '12px 24px',
                borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
              }}>
                Request a Catalog Model <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link href="/request-quote" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: '#fff', padding: '12px 24px',
                borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.5)',
              }}>
                Custom Model Quote
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
        ...(isFiltered ? [{ name: `Letter ${filterLetter}`, path: `/all-catalog-mouse-models/gene-index?letter=${filterLetter}` }] : []),
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: isFiltered
              ? `Mouse Model Gene Index — Letter ${filterLetter}`
              : 'Mouse Model Gene Index',
            description: `Index of ${uniqueGeneCount} gene targets available as mouse models at ingenious targeting laboratory.`,
            url: isFiltered
              ? `https://www.genetargeting.com/all-catalog-mouse-models/gene-index/?letter=${filterLetter}`
              : 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/',
            numberOfItems: isFiltered ? (grouped[filterLetter!]?.length ?? 0) : allModels.length,
          }),
        }}
      />
    </div>
  );
}
