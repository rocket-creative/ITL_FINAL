'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import { IconDNA, IconChevronRight, IconLayers, IconSearch } from '@/components/UXUIDC/Icons';
import { 
  glossaryTerms, 
  glossaryCategories, 
  type GlossaryCategory,
  type GlossaryTerm 
} from '@/data/glossaryTerms';

// Hero Data
const heroData = {
  badge: "Glossary",
  title: "Mouse Genetics Glossary",
  intro: "A comprehensive reference of 60 technical terms used in mouse genetics and gene targeting.",
  description: "This glossary covers essential concepts across 7 key categories: core genetics, mouse model strategies, recombination systems, vectors and ES cells, validation and QC, immunology and humanization, and study design applications."
};

// CTA Data
const ctaData = {
  title: "Need Help Understanding Your Project?",
  description: "Our scientific consultants can explain technical concepts and help you understand the best approach for your research goals.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function GlossaryPage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | null>(null);

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

  // Filter terms based on search and category
  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group filtered terms by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "name": "Gene Targeting Glossary",
            "description": "Technical terminology reference for gene targeting and mouse genetics including knockout, knockin, conditional, and transgenic mouse model terms.",
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
              <IconLayers size={14} color="#00d4d4" />
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
              <Link href="/resources" style={{
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
                Back to Resources
              </Link>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Search Box */}
              <div style={{ position: 'relative', flex: '1', minWidth: 'min(100%, 300px)', maxWidth: '500px' }}>
                <IconSearch size={18} color="#666" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search terms or definitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 44px',
                    fontSize: '.9rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>
              
              {/* Category Filter */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '.85rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '20px',
                    background: selectedCategory === null ? '#008080' : '#ffffff',
                    color: selectedCategory === null ? '#ffffff' : '#666',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  All ({glossaryTerms.length})
                </button>
                {glossaryCategories.map(category => {
                  const count = glossaryTerms.filter(t => t.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '.85rem',
                        border: '1px solid #e0e0e0',
                        borderRadius: '20px',
                        background: selectedCategory === category ? '#008080' : '#ffffff',
                        color: selectedCategory === category ? '#ffffff' : '#666',
                        cursor: 'pointer',
                        fontWeight: 500
                      }}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Results count */}
            <div style={{ marginTop: '16px', fontSize: '.85rem', color: '#666' }}>
              Showing {filteredTerms.length} of {glossaryTerms.length} terms
            </div>
          </div>
        </section>

        {/* Alphabet Navigation */}
        <section style={{ background: '#f7f7f7', padding: '20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
                const hasTerms = groupedTerms[letter]?.length > 0;
                return (
                  <a
                    key={letter}
                    href={hasTerms ? `#letter-${letter}` : undefined}
                    style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '.85rem',
                      fontWeight: 600,
                      borderRadius: '4px',
                      background: hasTerms ? '#008080' : '#e0e0e0',
                      color: hasTerms ? '#ffffff' : '#999',
                      textDecoration: 'none',
                      cursor: hasTerms ? 'pointer' : 'default'
                    }}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Glossary Terms Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {sortedLetters.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <IconDNA size={48} color="#e0e0e0" />
                <p style={{ fontSize: '1rem', color: '#666', marginTop: '20px' }}>
                  No terms found matching your search criteria.
                </p>
              </div>
            ) : (
              sortedLetters.map(letter => (
                <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '48px', scrollMarginTop: '180px' }}>
                  <h2 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#008080',
                    marginBottom: '24px',
                    paddingBottom: '12px',
                    borderBottom: '3px solid #00d4d4'
                  }}>
                    {letter}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {groupedTerms[letter].map((item, index) => (
                      <Link 
                        key={index} 
                        href={`/mouse-genetics-glossary/${item.slug}`}
                        className="animate-in group transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
                        style={{
                          display: 'block',
                          background: '#f7f7f7',
                          borderRadius: '8px',
                          padding: '24px',
                          borderLeft: '4px solid #008080',
                          textDecoration: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
                          <h3 style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: '#333',
                            margin: 0
                          }}>
                            {item.term}
                          </h3>
                          <span style={{
                            fontSize: '.75rem',
                            fontWeight: 600,
                            color: '#008080',
                            background: 'rgba(0,128,128,0.1)',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            whiteSpace: 'nowrap'
                          }}>
                            {item.category}
                          </span>
                        </div>
                        <p style={{
                          fontSize: '.9rem',
                          color: '#666',
                          lineHeight: 1.7,
                          margin: 0
                        }}>
                          {item.definition}
                        </p>
                        <div style={{
                          marginTop: '12px',
                          fontSize: '.85rem',
                          color: '#008080',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          Learn more
                          <IconChevronRight size={14} color="#008080" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
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

        {/* Related Resources Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Related Resources
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { href: "/knockout-mouse-models", label: "Knockout Mouse Models" },
                { href: "/knockin-mouse-models", label: "Knockin Mouse Models" },
                { href: "/conditional-knockout-mouse-models", label: "Conditional Knockouts" },
                { href: "/humanized-mouse-models", label: "Humanized Models" },
                { href: "/cre-lox-system", label: "Cre-Lox System" },
                { href: "/resources", label: "All Resources" }
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
