/**
 * |UXUIDC| Catalog Search Component
 * @version 1.1.0
 * Searches 10,000+ mouse models via /api/catalog (Google Sheets proxied server-side)
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface CatalogModel {
  id: string;
  geneName: string;
  modelType: string;
  background: string;
  description: string;
  category: string;
  availability: string;
  [key: string]: string;
}

interface CatalogSearchProps {
  compact?: boolean;
  maxResults?: number;
  showTitle?: boolean;
  className?: string;
}

export function CatalogSearch({ 
  compact = false, 
  maxResults = 20,
  showTitle = true,
  className = ''
}: CatalogSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [allModels, setAllModels] = useState<CatalogModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<CatalogModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch data from /api/catalog (proxied Google Sheets, no CORS)
  const fetchCatalogData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/catalog');
      const data = await res.json();

      if (!res.ok) {
        const msg = (data?.message || data?.error) ?? 'Catalog is temporarily unavailable.';
        throw new Error(msg);
      }

      if (!data.values || !Array.isArray(data.values) || data.values.length < 2) {
        throw new Error('No catalog data available.');
      }

      const headerRow = data.values[0] as string[];

      const models: CatalogModel[] = data.values
        .slice(1)
        .map((row: string[], index: number) => {
          const model: CatalogModel = {
            id: `model-${index}`,
            geneName: row[0] || '',
            modelType: row[1] || '',
            background: row[2] || '',
            description: row[3] || '',
            category: row[4] || '',
            availability: row[5] || '',
          };
          headerRow.forEach((h, i) => {
            if (i > 5 && row[i]) model[h.toLowerCase().replace(/\s+/g, '_')] = row[i];
          });
          return model;
        })
        .filter((m: CatalogModel) => m.geneName);

      setAllModels(models);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Catalog search is temporarily unavailable.';
      setError(message);
      console.error('Catalog fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchCatalogData();
  }, [fetchCatalogData]);

  // Filter models based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredModels([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const term = searchTerm.toLowerCase().trim();
    
    const results = allModels.filter(model => {
      return (
        model.geneName.toLowerCase().includes(term) ||
        model.modelType.toLowerCase().includes(term) ||
        model.background.toLowerCase().includes(term) ||
        model.description.toLowerCase().includes(term) ||
        model.category.toLowerCase().includes(term)
      );
    }).slice(0, maxResults);

    setFilteredModels(results);
  }, [searchTerm, allModels, maxResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search happens automatically via useEffect
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredModels([]);
    setHasSearched(false);
    searchInputRef.current?.focus();
  };

  return (
    <div className={`catalog-search ${className}`} style={{
      background: compact ? 'transparent' : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      borderRadius: compact ? '0' : '12px',
      padding: compact ? '0' : '32px',
      border: compact ? 'none' : '1px solid #e0e0e0',
    }}>
      {showTitle && !compact && (
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0a253c',
            marginBottom: '8px'
          }}>
            Search Our Catalog Models
          </h2>
          <p style={{ fontSize: '.9rem', color: '#666', margin: 0 }}>
            Explore 10,000+ genetically engineered mouse and rat models
          </p>
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: hasSearched ? '24px' : '0' }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          maxWidth: compact ? '100%' : '700px',
          margin: '0 auto',
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by gene name, model type, or keyword..."
              style={{
                width: '100%',
                padding: compact ? '12px 40px 12px 16px' : '16px 48px 16px 20px',
                fontSize: compact ? '.9rem' : '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#008080';
                e.target.style.boxShadow = '0 0 0 3px rgba(0,128,128,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
            {/* Search Icon */}
            <svg
              style={{
                position: 'absolute',
                right: compact ? '12px' : '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: compact ? '18px' : '22px',
                height: compact ? '18px' : '22px',
                color: '#999',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {!compact && (
            <button
              type="submit"
              style={{
                padding: '16px 32px',
                background: '#008080',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.3s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#006666';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#008080';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Search
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#666'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e0e0e0',
            borderTop: '3px solid #008080',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }} />
          <p style={{ margin: 0, fontSize: '.9rem' }}>Loading catalog data...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#f9f9f9',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          color: '#333',
          fontSize: '.9rem',
        }}>
          <p style={{ margin: '0 0 8px', fontWeight: 500 }}>Catalog search is temporarily unavailable</p>
          <p style={{ margin: 0, color: '#666', fontSize: '.85rem' }}>{error}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
            <button
              onClick={fetchCatalogData}
              style={{
                padding: '10px 20px',
                background: '#008080',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '.9rem',
                fontWeight: 600,
              }}
            >
              Try Again
            </button>
            <Link
              href="/all-catalog-mouse-models"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                background: '#f0f0f0',
                color: '#333',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Browse catalog
            </Link>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                background: 'transparent',
                color: '#008080',
                border: '1px solid #008080',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && !isLoading && !error && (
        <div>
          {/* Results Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <p style={{ margin: 0, fontSize: '.9rem', color: '#666' }}>
              {filteredModels.length === 0 ? (
                <span>No models found for &ldquo;{searchTerm}&rdquo;</span>
              ) : (
                <span>
                  Found <strong style={{ color: '#008080' }}>{filteredModels.length}</strong>
                  {filteredModels.length === maxResults ? '+' : ''} model{filteredModels.length !== 1 ? 's' : ''}
                  {' '}matching &ldquo;{searchTerm}&rdquo;
                </span>
              )}
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                style={{
                  padding: '6px 12px',
                  background: '#f0f0f0',
                  color: '#666',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Clear
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Results Table */}
          {filteredModels.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '.9rem',
              }}>
                <thead>
                  <tr style={{ background: '#f7f7f7' }}>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left', 
                      fontWeight: 600,
                      color: '#333',
                      borderBottom: '2px solid #e0e0e0',
                      whiteSpace: 'nowrap',
                    }}>
                      Gene Name
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left', 
                      fontWeight: 600,
                      color: '#333',
                      borderBottom: '2px solid #e0e0e0',
                      whiteSpace: 'nowrap',
                    }}>
                      Model Type
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left', 
                      fontWeight: 600,
                      color: '#333',
                      borderBottom: '2px solid #e0e0e0',
                      whiteSpace: 'nowrap',
                    }}>
                      Background
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left', 
                      fontWeight: 600,
                      color: '#333',
                      borderBottom: '2px solid #e0e0e0',
                    }}>
                      Description
                    </th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'center', 
                      fontWeight: 600,
                      color: '#333',
                      borderBottom: '2px solid #e0e0e0',
                      whiteSpace: 'nowrap',
                    }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.map((model, index) => (
                    <tr 
                      key={model.id}
                      style={{ 
                        background: index % 2 === 0 ? '#fff' : '#fafafa',
                        transition: 'background 0.2s',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#f0f9f9'}
                      onMouseOut={(e) => e.currentTarget.style.background = index % 2 === 0 ? '#fff' : '#fafafa'}
                    >
                      <td style={{ 
                        padding: '14px 16px', 
                        borderBottom: '1px solid #e0e0e0',
                        fontWeight: 600,
                        color: '#008080',
                      }}>
                        {model.geneName}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        borderBottom: '1px solid #e0e0e0',
                        color: '#333',
                      }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          background: getModelTypeColor(model.modelType),
                          color: '#fff',
                          borderRadius: '4px',
                          fontSize: '.8rem',
                          fontWeight: 500,
                        }}>
                          {model.modelType || 'N/A'}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        borderBottom: '1px solid #e0e0e0',
                        color: '#666',
                      }}>
                        {model.background || 'N/A'}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        borderBottom: '1px solid #e0e0e0',
                        color: '#666',
                        maxWidth: '300px',
                      }}>
                        {model.description ? (
                          model.description.length > 100 
                            ? `${model.description.substring(0, 100)}...` 
                            : model.description
                        ) : 'N/A'}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        borderBottom: '1px solid #e0e0e0',
                        textAlign: 'center',
                      }}>
                        <Link
                          href={`/request-quote?model=${encodeURIComponent(model.geneName)}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '8px 14px',
                            background: '#008080',
                            color: '#fff',
                            borderRadius: '4px',
                            fontSize: '.8rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'background 0.2s',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = '#006666'}
                          onMouseOut={(e) => e.currentTarget.style.background = '#008080'}
                        >
                          Inquire
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* No Results Message */}
          {filteredModels.length === 0 && searchTerm && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: '#f9f9f9',
              borderRadius: '8px',
            }}>
              <svg 
                width="48" 
                height="48" 
                fill="none" 
                stroke="#999" 
                viewBox="0 0 24 24"
                style={{ margin: '0 auto 16px' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ margin: '0 0 16px', color: '#666', fontSize: '.95rem' }}>
                No models found matching your search criteria.
              </p>
              <p style={{ margin: '0 0 20px', color: '#999', fontSize: '.85rem' }}>
                Try a different gene name or keyword, or contact us for custom model development.
              </p>
              <Link
                href="/custom-mouse-models"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#008080',
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Explore Custom Models
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}

          {/* More Results CTA */}
          {filteredModels.length === maxResults && (
            <div style={{
              textAlign: 'center',
              marginTop: '24px',
              padding: '20px',
              background: 'linear-gradient(135deg, #f0f9f9 0%, #e6f7f7 100%)',
              borderRadius: '8px',
              border: '1px dashed #008080',
            }}>
              <p style={{ margin: '0 0 12px', color: '#333', fontSize: '.9rem' }}>
                Showing first {maxResults} results. Need help finding a specific model?
              </p>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#008080',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Contact our team for assistance
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Initial State - Show stats when not searching */}
      {!hasSearched && !isLoading && !error && !compact && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginTop: '24px',
        }}>
          {[
            { label: 'Total Models', value: allModels.length > 0 ? `${allModels.length.toLocaleString()}+` : '10,000+' },
            { label: 'Model Types', value: allModels.length > 0 ? `${new Set(allModels.map(m => m.modelType).filter(Boolean)).size}+` : '6+' },
            { label: 'Backgrounds', value: allModels.length > 0 ? `${new Set(allModels.map(m => m.background).filter(Boolean)).size}+` : '5+' },
            { label: 'Disease Areas', value: allModels.length > 0 ? `${new Set(allModels.map(m => m.category).filter(Boolean)).size}+` : '20+' },
          ].map((stat, index) => (
            <div 
              key={index}
              style={{
                textAlign: 'center',
                padding: '16px',
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#008080',
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '.85rem', color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to get color based on model type
function getModelTypeColor(modelType: string): string {
  const type = modelType?.toLowerCase() || '';
  if (type.includes('knockout') || type.includes('ko')) return '#555';
  if (type.includes('knockin') || type.includes('ki')) return '#134978';
  if (type.includes('humanized')) return '#666';
  if (type.includes('conditional')) return '#777';
  if (type.includes('transgenic')) return '#444';
  if (type.includes('cre')) return '#008080';
  return '#008080';
}

export default CatalogSearch;
