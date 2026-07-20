'use client';

import { useState } from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
import { IconChevronRight, IconFlask, IconCheckCircle, IconLayers } from '@/components/UXUIDC/Icons';

type FeaturedModelEntry = {
  month: string;
  name: string;
  fullName: string;
  catalogNumber: string;
  background: string;
  availability: string;
  category: string;
  teaser: string;
  specs: string[];
  href: string;
  pdfHref?: string;
};

const featuredModels: FeaturedModelEntry[] = [
  {
    month: 'June 2026',
    name: 'hIL4/hIL4R',
    fullName: 'Dual Humanized IL4/IL4R Mouse',
    catalogNumber: 'HU 2000106',
    background: 'C57BL/6',
    availability: 'Repository live (ready to ship)',
    category: 'Humanized Mouse Models',
    teaser:
      'The hIL4/hIL4R dual humanized mouse model is a critical tool for studying IL-4 signaling pathways and developing targeted therapeutics for allergic diseases and asthma.',
    specs: [
      'Model name: hIL4/hIL4R',
      'Catalog number: HU 2000106',
      'Strain state: Repository live (ready to ship)',
      'Humanized genes: IL4, IL4R',
    ],
    href: '/featured-model/hil4-hil4r',
    pdfHref: '/downloads/hil4-hil4r-ingenious.pdf',
  },
];

const pastModels: FeaturedModelEntry[] = [
  {
    month: 'March 2026',
    name: 'hCD3EDG',
    fullName: 'Triple Humanized CD3 Mouse',
    catalogNumber: 'HU 220120',
    background: 'C57BL/6',
    availability: 'Repository live (ready to ship)',
    category: 'Humanized Mouse Models',
    teaser:
      'The hCD3EDG triple humanized CD3 model is one of the most in-demand tools for bispecific T cell engager (TCE) development.',
    specs: [
      'Model name: hCD3EDG',
      'Catalog number: HU 220120',
      'Strain state: Repository live (ready to ship)',
      'Humanized genes: CD3E (epsilon), CD3D (delta), CD3G (gamma)',
    ],
    href: '/featured-model/hcd3edg',
    pdfHref: '/downloads/hcd3edg-ingenious.pdf',
  },
];

export default function FeaturedModelPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModels = featuredModels.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.teaser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Mouse of the Month',
    description:
      'Monthly spotlight on humanized catalog mouse models from ingenious targeting laboratory',
    url: 'https://www.genetargeting.com/featured-model/',
    numberOfItems: featuredModels.length + pastModels.length,
    itemListElement: [...featuredModels, ...pastModels].map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${m.name} ${m.fullName}`,
      url: `https://www.genetargeting.com${m.href}/`,
    })),
  };

  return (
    <div style={{ background: '#0a253c', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', minHeight: '100vh' }}>
        <UXUIDCNavigation />

        <main>
          {/* Hero */}
          <section className="page-hero" style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06,
            }}>
              <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
                top: '-200px',
                right: '-200px',
              }} />
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,212,212,0.15)',
                border: '1px solid rgba(0,212,212,0.3)',
                borderRadius: '20px',
                padding: '6px 14px',
                marginBottom: '20px',
              }}>
                <IconLayers size={14} color="#00d4d4" />
                <span style={{ color: '#ffffff', fontSize: '.85rem', fontWeight: 500 }}>
                  Catalog Models
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.8rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}>
                Featured Mouse of the Month
              </h1>

              <p style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.7,
                maxWidth: '760px',
              }}>
                Each month, ingenious targeting laboratory spotlights one humanized catalog mouse model
                generated for an active area of therapeutic research. Our catalog offers single, double,
                and triple humanized mouse models that deliver immediate insights for your latest
                experiments. Contact us today to get started on your project.
              </p>
            </div>
          </section>

          {/* Top dual-path CTA */}
          <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
            <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
              <CatalogCustomDualCta slug="featured-model" utmMedium="page-hero" flush />
            </div>
          </section>

          {/* Search */}
          <section style={{
            background: '#ffffff',
            padding: '32px 20px',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#f7f7f7',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '12px 16px',
                maxWidth: '560px',
              }}>
                <IconFlask size={18} color="#008080" />
                <input
                  type="text"
                  placeholder="Search featured models by name, target, or month..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '.9rem',
                    color: '#333',
                    fontFamily: 'var(--system-ui)',
                  }}
                />
              </div>
            </div>
          </section>

          {/* Current Featured Model */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '36px',
              }}>
                <div style={{
                  width: '4px',
                  height: '28px',
                  background: '#00d4d4',
                  borderRadius: '2px',
                }} />
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#0a253c',
                  margin: 0,
                }}>
                  Current Feature
                </h2>
              </div>

              {filteredModels.length === 0 ? (
                <p style={{ color: '#666', fontSize: '.9rem', textAlign: 'center', padding: '40px 0' }}>
                  No models match your search. Try a different term.
                </p>
              ) : (
                filteredModels.map((model) => (
                  <div
                    key={model.catalogNumber}
                    className="group transition-all duration-300 hover:shadow-xl"
                    style={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '32px',
                    }}
                  >
                    {/* Card header bar */}
                    <div style={{
                      background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
                      padding: '20px 32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{
                          background: 'rgba(0,212,212,0.2)',
                          border: '1px solid rgba(0,212,212,0.4)',
                          color: '#00d4d4',
                          fontSize: '.75rem',
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}>
                          {model.month}
                        </span>
                        <span style={{
                          background: 'rgba(0,128,128,0.3)',
                          border: '1px solid rgba(0,128,128,0.5)',
                          color: '#00d4d4',
                          fontSize: '.75rem',
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}>
                          {model.availability}
                        </span>
                      </div>
                      <span style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '.8rem',
                        fontFamily: 'var(--system-ui)',
                      }}>
                        {model.catalogNumber}
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{
                      padding: '36px 32px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '40px',
                      alignItems: 'start',
                    }}>
                      <div>
                        <p style={{
                          fontSize: '.75rem',
                          fontWeight: 600,
                          color: '#008080',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '6px',
                        }}>
                          {model.category}
                        </p>
                        <h3 style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '2rem',
                          fontWeight: 700,
                          color: '#0a253c',
                          marginBottom: '6px',
                          lineHeight: 1.2,
                        }}>
                          {model.name}
                        </h3>
                        <p style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '1.1rem',
                          fontWeight: 400,
                          color: '#2384da',
                          marginBottom: '20px',
                        }}>
                          {model.fullName}
                        </p>
                        <p style={{
                          fontSize: '.95rem',
                          color: '#444',
                          lineHeight: 1.75,
                          marginBottom: '24px',
                          maxWidth: '620px',
                        }}>
                          {model.teaser}
                        </p>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {model.specs.map((spec, i) => (
                            <li key={i} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              fontSize: '.875rem',
                              color: '#555',
                              lineHeight: 1.5,
                            }}>
                              <IconCheckCircle size={15} color="#008080" style={{ flexShrink: 0, marginTop: '2px' }} />
                              {spec}
                            </li>
                          ))}
                        </ul>

                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <Link
                            href={model.href}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#008080',
                              color: '#ffffff',
                              padding: '12px 24px',
                              borderRadius: '6px',
                              fontSize: '.9rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                            }}
                          >
                            View Full Profile
                            <IconChevronRight size={16} color="#ffffff" />
                          </Link>
                          {model.pdfHref ? (
                            <a
                              href={model.pdfHref}
                              download
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'transparent',
                                color: '#0a253c',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                fontSize: '.9rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                border: '2px solid #0a253c',
                              }}
                            >
                              Download Data Sheet
                              <IconChevronRight size={16} color="#0a253c" />
                            </a>
                          ) : null}
                        </div>
                      </div>

                      {/* Typographic accent */}
                      <div style={{
                        display: 'none',
                      }} className="md:block">
                        <div style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '5rem',
                          fontWeight: 800,
                          color: 'rgba(0,212,212,0.12)',
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                          userSelect: 'none',
                          whiteSpace: 'nowrap',
                        }}>
                          {model.name}
                        </div>
                        <div style={{
                          fontSize: '.75rem',
                          fontWeight: 600,
                          color: '#e0e0e0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginTop: '6px',
                          textAlign: 'right',
                        }}>
                          {model.background}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Past Models Placeholder */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '32px',
              }}>
                <div style={{
                  width: '4px',
                  height: '28px',
                  background: '#e0e0e0',
                  borderRadius: '2px',
                }} />
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#333',
                  margin: 0,
                }}>
                  Past Featured Models
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {pastModels.map((model) => (
                  <div
                    key={model.catalogNumber}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      padding: '28px 32px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '24px',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span style={{
                          background: 'rgba(0,128,128,0.08)',
                          color: '#008080',
                          fontSize: '.75rem',
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}>
                          {model.month}
                        </span>
                        <span style={{ color: '#888', fontSize: '.8rem' }}>{model.catalogNumber}</span>
                      </div>
                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: '#0a253c',
                        marginBottom: '4px',
                      }}>
                        {model.name}
                      </h3>
                      <p style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '.95rem',
                        color: '#2384da',
                        marginBottom: '10px',
                      }}>
                        {model.fullName}
                      </p>
                      <p style={{ fontSize: '.875rem', color: '#666', lineHeight: 1.6, margin: 0, maxWidth: '620px' }}>
                        {model.teaser}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <Link
                        href={model.href}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#008080',
                          color: '#ffffff',
                          padding: '10px 18px',
                          borderRadius: '6px',
                          fontSize: '.85rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        View Profile
                        <IconChevronRight size={14} color="#ffffff" />
                      </Link>
                      {model.pdfHref ? (
                        <a
                          href={model.pdfHref}
                          download
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'transparent',
                            color: '#0a253c',
                            padding: '10px 18px',
                            borderRadius: '6px',
                            fontSize: '.85rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            border: '2px solid #0a253c',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Data Sheet
                          <IconChevronRight size={14} color="#0a253c" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related catalog links */}
          <section style={{ background: 'white', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                Explore the Full Catalog
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'All Catalog Models', href: '/all-catalog-mouse-models', desc: 'Search 14,774+ ready-to-ship strains' },
                  { label: 'Humanized Mouse Models', href: '/humanized-mouse-models', desc: 'Human gene knockin models for therapeutic testing' },
                  { label: 'Catalog Overview', href: '/catalog-mouse-models', desc: 'Checkpoint, Cre driver, and reporter strains' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      display: 'block',
                      background: '#f7f7f7',
                      borderRadius: '8px',
                      padding: '24px',
                      borderTop: '4px solid #008080',
                      textDecoration: 'none',
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#333',
                      marginBottom: '8px',
                    }}>
                      {item.label}
                    </h3>
                    <p style={{ fontSize: '.85rem', color: '#666', marginBottom: '12px', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#008080',
                      fontSize: '.85rem',
                      fontWeight: 600,
                    }}>
                      Explore
                      <IconChevronRight size={14} color="#008080" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom dual-path CTA */}
          <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
              <CatalogCustomDualCta slug="featured-model" utmMedium="page-closing" flush />
            </div>
          </section>

        </main>

        <UXUIDCFooter />

        <BreadcrumbSchema
          items={[
            { name: 'Home', path: '/' },
            { name: 'Catalog Models', path: '/catalog-mouse-models' },
            { name: 'Featured Mouse of the Month', path: '/featured-model' },
          ]}
        />
      </div>
    </div>
  );
}
