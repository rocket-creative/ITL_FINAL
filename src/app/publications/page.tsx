'use client';

/**
 * Publications Page - ingenious targeting laboratory
 * 
 * This page displays peer-reviewed publications featuring ITL mouse models.
 * 
 * TO UPDATE PUBLICATIONS:
 * Edit the publicationsData.ts file in this same folder.
 * Add new publications to the beginning of the appropriate year array.
 */

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconChevronRight, IconSearch, IconBookOpen, IconQuote, IconCheckCircle, IconFilter, IconDocument } from '@/components/UXUIDC/Icons';
import { publicationsByYear, getYears, getTotalPublicationCount, Publication } from './publicationsData';

// Hero Data
const heroData = {
  badge: "Publications",
  title: "Groundbreaking Publications in Genetic Research",
  intro: "ingenious targeting laboratory generated mouse models have contributed to more than 800 peer-reviewed publications across all major therapeutic areas.",
  description: "Our custom knockout, knockin, and humanized mouse models have supported groundbreaking research published in Nature, Cell, Science, and specialty journals worldwide."
};

// Stats Data
const statsData = [
  { value: 800, suffix: "+", label: "Publications" },
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "USA-Based Work" }
];

// Testimonial
// Verified testimonial from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const clarkeTestimonial = getTestimonialById('clarke-cambridge')!;
const testimonial = {
  quote: clarkeTestimonial.quote,
  author: formatAuthorWithCredentials(clarkeTestimonial),
  affiliation: clarkeTestimonial.affiliation
};

// CTA Data
const ctaData = {
  title: "Start Your Project",
  description: "Ready to discuss your research goals? Our scientific consultants provide complimentary project design consultations to help you plan the optimal mouse model strategy.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function PublicationsPage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set(['2025']));
  
  const years = useMemo(() => getYears(), []);
  const totalCount = useMemo(() => getTotalPublicationCount(), []);

  // Filter publications based on search and year
  const filteredPublications = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const result: { [year: string]: Publication[] } = {};
    
    const yearsToFilter = selectedYear === 'all' ? years : [selectedYear];
    
    yearsToFilter.forEach(year => {
      const pubs = publicationsByYear[year] || [];
      const filtered = searchQuery
        ? pubs.filter(pub =>
            pub.authors.toLowerCase().includes(lowerQuery) ||
            pub.title.toLowerCase().includes(lowerQuery) ||
            pub.journal.toLowerCase().includes(lowerQuery)
          )
        : pubs;
      
      if (filtered.length > 0) {
        result[year] = filtered;
      }
    });
    
    return result;
  }, [searchQuery, selectedYear, years]);

  const filteredCount = useMemo(() => {
    return Object.values(filteredPublications).reduce((total, pubs) => total + pubs.length, 0);
  }, [filteredPublications]);

  const toggleYear = (year: string) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedYears(new Set(years));
  };

  const collapseAll = () => {
    setExpandedYears(new Set());
  };

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const heroElements = document.querySelectorAll('.hero-animate');
      heroElements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power2.out" }
        );
      });

      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    };

    initGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Publications - ingenious targeting laboratory",
            "description": "Peer-reviewed publications featuring ingenious targeting laboratory mouse models. Over 800 publications in Nature, Cell, Science, and specialty journals.",
            "publisher": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory",
              "url": "https://www.genetargeting.com"
            }
          })
        }}
      />
      <UXUIDCNavigation />
      <main ref={animatedElementsRef}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05
          }}>
            <div style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
              top: '-200px',
              right: '-200px'
            }} />
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="hero-animate" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <IconBookOpen size={14} color="#00d4d4" />
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            <h1 className="hero-animate" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: 1.2
            }}>
              {heroData.title}
            </h1>
            <p className="hero-animate" style={{
              fontSize: '1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '16px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            <p className="hero-animate" style={{
              fontSize: '.9rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.description}
            </p>
            <div className="hero-animate" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#008080',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Request a Quote
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
              <Link href="/catalog-mouse-models" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                View Catalog Models
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {statsData.map((stat, index) => (
                <div key={index} className="animate-in" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#008080', marginBottom: '4px' }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '.85rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Banner */}
        <section style={{ background: '#f7f7f7', padding: '40px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              padding: '24px',
              background: '#ffffff',
              borderRadius: '12px',
              borderLeft: '4px solid #00d4d4'
            }}>
              <div style={{ flexShrink: 0 }}>
                <IconQuote size={32} color="#00d4d4" />
              </div>
              <div>
                <p style={{
                  fontSize: '.95rem',
                  color: '#333',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '12px'
                }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p style={{ fontSize: '.9rem', color: '#008080', fontWeight: 600, marginBottom: '2px' }}>
                  {testimonial.author}
                </p>
                <p style={{ fontSize: '.85rem', color: '#666' }}>
                  {testimonial.affiliation}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Search Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#f7f7f7',
                borderRadius: '8px',
                padding: '12px 16px',
                border: '1px solid #e0e0e0'
              }}>
                <IconSearch size={20} color="#666" />
                <input
                  type="text"
                  placeholder="Search publications by author, title, or journal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '.95rem',
                    color: '#333',
                    outline: 'none'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '.9rem'
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Year Filter and Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconFilter size={16} color="#666" />
                    <span style={{ fontSize: '.9rem', color: '#666' }}>Filter by year:</span>
                  </div>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: '1px solid #e0e0e0',
                      background: '#ffffff',
                      fontSize: '.9rem',
                      color: '#333',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={expandAll}
                    style={{
                      background: 'none',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '.85rem',
                      color: '#666',
                      cursor: 'pointer'
                    }}
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    style={{
                      background: 'none',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      fontSize: '.85rem',
                      color: '#666',
                      cursor: 'pointer'
                    }}
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <div style={{
                fontSize: '.9rem',
                color: '#666'
              }}>
                Showing <strong style={{ color: '#008080' }}>{filteredCount}</strong> of {totalCount} publications
                {searchQuery && ` matching "${searchQuery}"`}
              </div>
            </div>
          </div>
        </section>

        {/* Publications List */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {Object.keys(filteredPublications).length === 0 ? (
              <div className="animate-in" style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#ffffff',
                borderRadius: '12px'
              }}>
                <IconSearch size={48} color="#ccc" />
                <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '16px' }}>
                  No publications found matching your search.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedYear('all'); }}
                  style={{
                    marginTop: '16px',
                    background: '#008080',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    fontSize: '.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              Object.keys(filteredPublications)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map(year => (
                  <div key={year} className="animate-in" style={{ marginBottom: '24px' }}>
                    {/* Year Header */}
                    <button
                      onClick={() => toggleYear(year)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 24px',
                        background: '#008080',
                        border: 'none',
                        borderRadius: expandedYears.has(year) ? '12px 12px 0 0' : '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h2 style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '1.4rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0
                        }}>
                          {year} Publications
                        </h2>
                        <span style={{
                          background: 'rgba(255,255,255,0.2)',
                          color: '#ffffff',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '.85rem',
                          fontWeight: 500
                        }}>
                          {filteredPublications[year].length} publications
                        </span>
                      </div>
                      <IconChevronRight
                        size={24}
                        color="#ffffff"
                        style={{
                          transform: expandedYears.has(year) ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </button>

                    {/* Publications List */}
                    {expandedYears.has(year) && (
                      <div style={{
                        background: '#ffffff',
                        borderRadius: '0 0 12px 12px',
                        padding: '24px',
                        border: '1px solid #e0e0e0',
                        borderTop: 'none'
                      }}>
                        {filteredPublications[year].map((pub, index) => (
                          <div
                            key={index}
                            style={{
                              padding: '16px 0',
                              borderBottom: index < filteredPublications[year].length - 1 ? '1px solid #f0f0f0' : 'none'
                            }}
                          >
                            <p style={{
                              fontSize: '.85rem',
                              color: '#666',
                              marginBottom: '8px',
                              lineHeight: 1.6
                            }}>
                              {pub.authors}{' '}{pub.year}.
                            </p>
                            {pub.link ? (
                              <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'block',
                                  fontSize: '.95rem',
                                  color: '#008080',
                                  fontWeight: 500,
                                  marginBottom: '8px',
                                  lineHeight: 1.5,
                                  textDecoration: 'none'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                              >
                                {pub.title}
                              </a>
                            ) : (
                              <p style={{
                                fontSize: '.95rem',
                                color: '#333',
                                fontWeight: 500,
                                marginBottom: '8px',
                                lineHeight: 1.5
                              }}>
                                {pub.title}
                              </p>
                            )}
                            <p style={{
                              fontSize: '.85rem',
                              color: '#666',
                              fontStyle: 'italic'
                            }}>
                              <em>{pub.journal}</em>
                              {pub.volume && <span style={{ fontStyle: 'normal' }}>{' '}{pub.volume}</span>}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </section>

        {/* Info Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              <div style={{
                padding: '28px',
                background: '#f7f7f7',
                borderRadius: '12px',
                borderTop: '4px solid #008080'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(0,128,128,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <IconCheckCircle size={24} color="#008080" />
                </div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  High-Impact Journals
                </h3>
                <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6 }}>
                  Our models have been featured in Nature, Cell, Science, and hundreds of specialty journals across all therapeutic areas.
                </p>
              </div>

              <div style={{
                padding: '28px',
                background: '#f7f7f7',
                borderRadius: '12px',
                borderTop: '4px solid #00d4d4'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(0,212,212,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <IconDocument size={24} color="#00d4d4" />
                </div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Diverse Research Areas
                </h3>
                <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6 }}>
                  Publications span oncology, neuroscience, cardiology, immunology, metabolism, and rare disease research worldwide.
                </p>
              </div>

              <div style={{
                padding: '28px',
                background: '#f7f7f7',
                borderRadius: '12px',
                borderTop: '4px solid #134978'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(19,73,120,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <IconBookOpen size={24} color="#134978" />
                </div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Growing Archive
                </h3>
                <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6 }}>
                  New publications are added regularly as researchers continue to advance science using ingenious targeting laboratory generated mouse models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ background: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              {ctaData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7
            }}>
              {ctaData.description}
            </p>
            <div className="animate-in" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={ctaData.primaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#008080',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                {ctaData.primaryButton.label}
                <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link href={ctaData.secondaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                {ctaData.secondaryButton.label}
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '24px'
            }}>
              Quick Links
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { href: '/request-quote', label: 'Quote Request' },
                { href: '/contact', label: 'General Inquiries' },
                { href: '/catalog-mouse-models', label: 'Catalog Models' },
                { href: '/about-itl', label: 'About Ingenious' }
              ].map((link, index) => (
                <Link key={index} href={link.href} className="animate-in" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '12px 20px',
                  fontSize: '.9rem',
                  color: '#008080',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}>
                  <IconChevronRight size={14} color="#008080" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
    </div>
  );
}
