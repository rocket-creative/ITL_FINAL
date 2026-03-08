'use client';

/**
 * Site Search Page
 * Unified search: catalog models + site pages via /api/search
 */

import { useState, useMemo, useEffect } from 'react';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  IconSearch,
  IconChevronRight,
  IconX,
} from '@/components/UXUIDC';
import { searchSiteIndex, type SiteIndexEntry } from '@/lib/search/siteIndex';

// Brand colors
const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  lightGray: '#f7f7f7',
  white: '#ffffff',
  text: '#333333',
};

interface CatalogResult {
  id: string;
  title: string;
  url: string;
  subtitle?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });
  const [isFocused, setIsFocused] = useState(false);
  const [catalogResults, setCatalogResults] = useState<CatalogResult[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);

  // Fetch catalog results from API when query changes
  useEffect(() => {
    if (!query.trim()) {
      setCatalogResults([]);
      return;
    }
    setIsLoadingCatalog(true);
    fetch(`/api/search?q=${encodeURIComponent(query.trim())}&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        if (data.catalog && Array.isArray(data.catalog)) {
          setCatalogResults(data.catalog);
        } else {
          setCatalogResults([]);
        }
      })
      .catch(() => setCatalogResults([]))
      .finally(() => setIsLoadingCatalog(false));
  }, [query]);

  // Site results from shared index (client-side filter)
  const siteResults = useMemo(() => {
    if (!query.trim()) return [];
    return searchSiteIndex(query, 50);
  }, [query]);

  // Group site results by category
  const groupedSiteResults = useMemo(() => {
    const groups: Record<string, SiteIndexEntry[]> = {};
    siteResults.forEach((result) => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [siteResults]);

  const hasCatalog = catalogResults.length > 0;
  const hasSite = siteResults.length > 0;
  const totalCount = catalogResults.length + siteResults.length;

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
                  Enter a search term to find catalog models and pages on our site.
                </p>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '12px', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>Popular searches:</span>
                  {['knockout', 'humanized', 'oncology', 'Cre lox', 'catalog', 'Pdcd1'].map(term => (
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
            ) : !hasCatalog && !hasSite && !isLoadingCatalog ? (
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
                  {isLoadingCatalog ? (
                    'Searching catalog...'
                  ) : (
                    <>Found {totalCount} result{totalCount !== 1 ? 's' : ''} for &quot;{query}&quot;</>
                  )}
                </p>

                {/* Catalog Models section */}
                {hasCatalog && (
                  <div style={{ marginBottom: '40px' }}>
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
                      Catalog Models
                    </h2>
                    {catalogResults.map((item) => (
                      <Link
                        key={item.id}
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
                        {item.subtitle && (
                          <p style={{ 
                            fontSize: '0.9rem', 
                            color: '#666',
                            margin: 0,
                            lineHeight: 1.5
                          }}>
                            {item.subtitle}
                          </p>
                        )}
                        <span style={{ fontSize: '0.85rem', color: BRAND.teal, fontWeight: 600 }}>
                          Request quote →
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Site pages by category */}
                {Object.entries(groupedSiteResults).map(([category, items]) => (
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
                        key={`${item.url}-${index}`}
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
            
      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Search', path: '/search' },
        ]}
      />
      <UXUIDCCookieConsent />
    </div>
  );
}
