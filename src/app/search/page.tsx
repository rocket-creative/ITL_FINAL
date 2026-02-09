'use client';

/**
 * Site Search Page
 * Built following RULES_2026 guidelines
 * Client-side search functionality
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  IconSearch,
  IconChevronRight,
  IconX,
} from '@/components/UXUIDC';

// Brand colors
const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  lightGray: '#f7f7f7',
  white: '#ffffff',
  text: '#333333',
};

// Site content index for search
const siteContent = [
  // Custom Mouse Models
  { title: 'Custom mouse models', description: 'Design and generate custom genetically modified mouse models tailored to your research needs.', url: '/custom-mouse-models', category: 'Services' },
  { title: 'Knockout mouse models', description: 'Create knockout mice with complete gene deletion for functional studies and phenotyping.', url: '/knockout-mouse-models', category: 'Services' },
  { title: 'Conditional knockout mouse models', description: 'Tissue specific and temporally controlled gene deletion using Cre lox technology.', url: '/conditional-knockout-mouse-models', category: 'Services' },
  { title: 'Conventional knockout mouse models', description: 'Whole body gene knockout mice for studying gene function across all tissues.', url: '/conventional-knockout-mouse-models', category: 'Services' },
  { title: 'Knockin mouse models', description: 'Insert specific sequences, tags, or mutations into the mouse genome with precision.', url: '/knockin-mouse-models', category: 'Services' },
  { title: 'Point mutation mice', description: 'Generate mice carrying specific point mutations to model human disease variants.', url: '/point-mutation-mice', category: 'Services' },
  { title: 'Reporter knockin', description: 'Express fluorescent proteins or enzymes under endogenous promoter control.', url: '/reporter-knockin', category: 'Services' },
  { title: 'Tag knockin mice', description: 'Add epitope tags to endogenous proteins for detection and purification.', url: '/tag-knockin-mice', category: 'Services' },
  { title: 'Humanized mouse models', description: 'Replace mouse genes with human sequences for translational research.', url: '/humanized-mouse-models', category: 'Services' },
  { title: 'Transgenic mouse service', description: 'Random integration of transgenes for overexpression studies.', url: '/transgenic-mouse-service', category: 'Services' },
  
  // Technology
  { title: 'Cre lox system', description: 'Site specific recombination for conditional gene modification in mice.', url: '/cre-lox-system', category: 'Technology' },
  { title: 'Flp FRT system', description: 'Alternative recombination system for complex genetic manipulations.', url: '/flp-frt-system', category: 'Technology' },
  
  // Therapeutic Areas
  { title: 'Oncology mouse models', description: 'Mouse models for cancer research and immuno oncology studies.', url: '/oncology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Immuno oncology mouse models', description: 'Models for studying immune responses to tumors and immunotherapy.', url: '/immuno-oncology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Neuroscience mouse models', description: 'Models for neurological disease research including Alzheimer and Parkinson.', url: '/neuroscience-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Alzheimers mouse models', description: 'Transgenic and knockin models for Alzheimer disease research.', url: '/alzheimers-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Cardiovascular mouse models', description: 'Models for heart disease and vascular research.', url: '/cardiovascular-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Immunology mouse models', description: 'Models for studying immune system function and autoimmune disease.', url: '/immunology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Metabolic disease mouse models', description: 'Models for diabetes, obesity, and metabolic syndrome research.', url: '/metabolic-disease-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Rare disease mouse models', description: 'Custom models for orphan and rare disease research.', url: '/rare-disease-mouse-models', category: 'Therapeutic Areas' },
  
  // Catalog
  { title: 'Catalog mouse models', description: 'Ready made mouse models available for immediate order.', url: '/catalog-mouse-models', category: 'Catalog' },
  { title: 'Humanized immune checkpoint mice', description: 'Pre made humanized PD1, PDL1, CTLA4, and other checkpoint models.', url: '/humanized-immune-checkpoint-mice', category: 'Catalog' },
  { title: 'PD1 humanized mice', description: 'Humanized PD1 mice for immuno oncology research.', url: '/pd1-humanized-mice', category: 'Catalog' },
  { title: 'PDL1 humanized mice', description: 'Humanized PDL1 mice for checkpoint inhibitor studies.', url: '/pdl1-humanized-mice', category: 'Catalog' },
  { title: 'CTLA4 humanized mice', description: 'Humanized CTLA4 mice for immunotherapy research.', url: '/ctla4-humanized-mice', category: 'Catalog' },
  { title: 'LAG3 humanized mice', description: 'Humanized LAG3 mice for next generation checkpoint studies.', url: '/lag3-humanized-mice', category: 'Catalog' },
  { title: 'TIM3 humanized mice', description: 'Humanized TIM3 mice for immune checkpoint research.', url: '/tim3-humanized-mice', category: 'Catalog' },
  { title: 'Single checkpoint mice', description: 'Single humanized immune checkpoint models including PD1, PDL1, CTLA4, LAG3, TIM3, and more.', url: '/single-checkpoint-mice', category: 'Catalog' },
  { title: 'Double checkpoint mice', description: 'Dual humanized checkpoint mice for combination therapy studies.', url: '/double-checkpoint-mice', category: 'Catalog' },
  
  // Support Services
  { title: 'Colony management services', description: 'Professional breeding and colony maintenance for your mouse lines.', url: '/colony-management-services', category: 'Support Services' },
  { title: 'Cryopreservation services', description: 'Preserve your valuable mouse lines through sperm or embryo freezing.', url: '/cryopreservation-services', category: 'Support Services' },
  { title: 'Rederivation services', description: 'Clean up mouse lines by rederivation into SPF facilities.', url: '/rederivation-services', category: 'Support Services' },
  { title: 'Speed expansion breeding', description: 'Rapid expansion of mouse cohorts for studies.', url: '/speed-expansion-breeding', category: 'Support Services' },
  { title: 'Mouse genotyping service', description: 'Fast and accurate genotyping for your mouse colonies.', url: '/mouse-genotyping-service', category: 'Support Services' },
  { title: 'Phenotyping services', description: 'Comprehensive phenotyping of your mouse models.', url: '/phenotyping-services', category: 'Support Services' },
  
  // Resources
  { title: 'Resources', description: 'Guides, protocols, and educational content for mouse model research.', url: '/resources', category: 'Resources' },
  { title: 'Mouse genetics glossary', description: 'Comprehensive glossary of mouse genetics terminology.', url: '/glossary', category: 'Resources' },
  { title: 'Conditional vs conventional guide', description: 'Guide to choosing between conditional and conventional knockouts.', url: '/conditional-vs-conventional-guide', category: 'Resources' },
  { title: 'Cre line selection guide', description: 'How to choose the right Cre driver line for your research.', url: '/cre-line-selection-guide', category: 'Resources' },
  
  // Company
  { title: 'About ingenious targeting laboratory', description: 'Learn about ingenious targeting laboratory and our 26+ years of experience.', url: '/about-itl', category: 'Company' },
  { title: 'Why choose ingenious targeting laboratory', description: 'Discover why researchers trust ingenious targeting laboratory for custom mouse model generation.', url: '/why-choose-itl', category: 'Company' },
  { title: 'Contact', description: 'Get in touch with our team for project inquiries.', url: '/contact', category: 'Company' },
  { title: 'Request a quote', description: 'Submit a project inquiry and receive a custom quote.', url: '/request-quote', category: 'Company' },
  { title: 'Pricing overview', description: 'Information about pricing for mouse model generation services.', url: '/pricing-overview', category: 'Company' },
];

export default function SearchPage() {
  const [query, setQuery] = useState(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });
  const [isFocused, setIsFocused] = useState(false);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    return siteContent.filter(item => {
      const searchText = `${item.title} ${item.description} ${item.category}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    });
  }, [query]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, typeof siteContent> = {};
    results.forEach(result => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [results]);

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ padding: '20px 24px', background: BRAND.lightGray }}>
          <ol style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            listStyle: 'none', 
            margin: 0, 
            padding: 0,
            fontSize: '14px',
            color: BRAND.text 
          }}>
            <li><Link href="/" style={{ color: BRAND.teal, textDecoration: 'none' }}>Home</Link></li>
            <li><IconChevronRight size={14} color={BRAND.text} /></li>
            <li aria-current="page" style={{ color: BRAND.navy, fontWeight: 600 }}>Search</li>
          </ol>
        </nav>

        {/* Search Section */}
        <section style={{ 
          padding: '80px 24px', 
          background: BRAND.navy,
          color: BRAND.white,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: 600, 
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              Search our site
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              opacity: 0.9,
              marginBottom: '32px'
            }}>
              Find mouse models, services, resources, and more
            </p>
            
            {/* Search Input */}
            <div style={{ 
              position: 'relative',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: BRAND.white,
                borderRadius: '50px',
                padding: '4px 4px 4px 20px',
                boxShadow: isFocused ? `0 0 0 3px ${BRAND.teal}40` : 'none',
                transition: 'box-shadow 0.2s'
              }}>
                <IconSearch size={20} color={BRAND.text} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search for knockout, humanized, oncology..."
                  aria-label="Search site"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '16px 12px',
                    fontSize: '1rem',
                    background: 'transparent',
                    color: BRAND.navy
                  }}
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    aria-label="Clear search"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: 'none',
                      background: BRAND.lightGray,
                      cursor: 'pointer',
                      marginRight: '4px'
                    }}
                  >
                    <IconX size={18} color={BRAND.text} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section style={{ padding: '60px 24px', background: BRAND.white, minHeight: '400px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {query.trim() === '' ? (
              <div style={{ textAlign: 'center', color: BRAND.text }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
                  Enter a search term to find pages on our site.
                </p>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '12px', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>Popular searches:</span>
                  {['knockout', 'humanized', 'oncology', 'Cre lox', 'catalog'].map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      style={{
                        background: BRAND.lightGray,
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        color: BRAND.navy,
                        cursor: 'pointer'
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div style={{ textAlign: 'center', color: BRAND.text }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
                  No results found for &quot;{query}&quot;
                </p>
                <p style={{ fontSize: '1rem', color: '#666' }}>
                  Try different keywords or{' '}
                  <Link href="/contact" style={{ color: BRAND.teal }}>contact us</Link>{' '}
                  for assistance.
                </p>
              </div>
            ) : (
              <>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#666', 
                  marginBottom: '32px',
                  textAlign: 'center'
                }}>
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
                </p>
                
                {Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} style={{ marginBottom: '40px' }}>
                    <h2 style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 600, 
                      color: BRAND.teal,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: `1px solid ${BRAND.lightGray}`
                    }}>
                      {category}
                    </h2>
                    {items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.url}
                        style={{
                          display: 'block',
                          padding: '20px',
                          marginBottom: '12px',
                          background: BRAND.lightGray,
                          borderRadius: '8px',
                          textDecoration: 'none',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <h3 style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          color: BRAND.navy,
                          marginBottom: '8px'
                        }}>
                          {item.title}
                        </h3>
                        <p style={{ 
                          fontSize: '0.95rem', 
                          color: BRAND.text,
                          margin: 0,
                          lineHeight: 1.5
                        }}>
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section style={{ padding: '60px 24px', background: BRAND.lightGray }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              color: BRAND.navy,
              marginBottom: '16px'
            }}>
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              color: BRAND.text,
              marginBottom: '24px'
            }}>
              Our team is here to help you find the right mouse model or service for your research.
            </p>
            <Link 
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: BRAND.teal,
                color: BRAND.white,
                padding: '14px 28px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Contact us
              <IconChevronRight size={18} color={BRAND.white} />
            </Link>
          </div>
        </section>
      </main>

      <UXUIDCFooter />
      <UXUIDCCookieConsent />
    </div>
  );
}
