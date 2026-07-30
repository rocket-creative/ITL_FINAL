'use client';

/**
 * |UXUIDC| Catalog Search Component — Supabase Edition
 * @version 3.0.0
 *
 * Server-side search: each query hits /api/catalog?q=... (Supabase).
 * No more loading 14k rows client-side. Fast, SEO-friendly, scalable.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { availabilityColor, availabilityLabel, isDeveloping, isLive } from '@/lib/catalog/availability';

export interface CatalogModel {
  id: string;
  geneName: string;
  modelAbbrev: string;
  modelType: string;
  category: string;
  availability: string;
  catalogNumber: string;
  [key: string]: string;
}

interface CatalogStats {
  total_models: number;
  unique_genes: number;
  model_types: number;
  categories: number;
  live_models: number;
  sperm_cryo_models?: number;
  embryo_cryo_models?: number;
}

interface CatalogSearchProps {
  compact?: boolean;
  maxResults?: number;
  showTitle?: boolean;
  className?: string;
  initialQuery?: string;
  preloadedModels?: CatalogModel[];
}

/** Stable default — inline `= []` allocates a new array every render and loops the search effect. */
const EMPTY_MODELS: CatalogModel[] = [];

export function CatalogSearch({
  compact = false,
  maxResults = 25,
  showTitle = true,
  className = '',
  initialQuery,
  preloadedModels = EMPTY_MODELS,
}: CatalogSearchProps) {
  const [searchTerm, setSearchTerm]         = useState(initialQuery ?? '');
  const [results, setResults]               = useState<CatalogModel[]>(
    preloadedModels.length > 0 && initialQuery ? preloadedModels : EMPTY_MODELS
  );
  const [stats, setStats]                   = useState<CatalogStats | null>(null);
  const [isSearching, setIsSearching]       = useState(false);
  const [hasSearched, setHasSearched]       = useState(preloadedModels.length > 0 && !!initialQuery);
  const [error, setError]                   = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'live' | 'sperm' | 'embryo' | 'developing'>('all');
  const searchInputRef                      = useRef<HTMLInputElement>(null);
  const debounceRef                         = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredResults = results.filter((m) => {
    if (availabilityFilter === 'all')        return true;
    if (availabilityFilter === 'developing') return isDeveloping(m.availability);
    if (availabilityFilter === 'live')       return isLive(m.availability);
    if (availabilityFilter === 'sperm')      return (m.availability || '').toLowerCase().includes('sperm');
    if (availabilityFilter === 'embryo')     return (m.availability || '').toLowerCase().includes('embryo');
    return true;
  });

  // Load stats on mount (replaces the old full-catalog load)
  useEffect(() => {
    fetch('/api/catalog?stats=true')
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => null);
  }, []);

  // Sync initialQuery on navigation
  useEffect(() => {
    if (initialQuery !== undefined) setSearchTerm(initialQuery);
  }, [initialQuery]);

  const runSearch = useCallback(async (term: string) => {
    const q = term.trim();
    if (!q) {
      setResults((prev) => (prev.length === 0 ? prev : EMPTY_MODELS));
      setHasSearched((prev) => (prev ? false : prev));
      setError((prev) => (prev == null ? prev : null));
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setError(null);
    setAvailabilityFilter('all');

    try {
      const res  = await fetch(`/api/catalog?q=${encodeURIComponent(q)}&limit=${maxResults}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || data?.error || 'Search failed.');
      setResults(data.models ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search temporarily unavailable.');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [maxResults]);

  // Debounced search on keystroke
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchTerm.trim()) {
      setResults((prev) => (prev.length === 0 ? prev : EMPTY_MODELS));
      setHasSearched((prev) => (prev ? false : prev));
      return;
    }

    // Show preloaded results immediately while debouncing
    if (preloadedModels.length > 0 && searchTerm === initialQuery) {
      setResults(preloadedModels);
      setHasSearched(true);
    }

    debounceRef.current = setTimeout(() => runSearch(searchTerm), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchTerm, runSearch, preloadedModels, initialQuery]);

  const handleSearch  = (e: React.FormEvent) => { e.preventDefault(); runSearch(searchTerm); };
  const clearSearch   = () => {
    setSearchTerm('');
    setResults(EMPTY_MODELS);
    setHasSearched(false);
    setError(null);
    searchInputRef.current?.focus();
  };

  return (
    <div
      className={`catalog-search ${className}`}
      style={{
        background:   compact ? 'transparent' : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        borderRadius: compact ? '0' : '12px',
        padding:      compact ? '0' : '32px',
        border:       compact ? 'none' : '1px solid #e0e0e0',
      }}
    >
      {showTitle && !compact && (
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#0a253c', marginBottom: '8px' }}>
            Search Our Catalog Models
          </h2>
          <p style={{ fontSize: '.9rem', color: '#666', margin: 0 }}>
            Explore {stats ? `${stats.total_models.toLocaleString()}+` : '14,774+'} genetically engineered mouse and rat models
          </p>
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: hasSearched ? '24px' : '0' }}>
        <div style={{ display: 'flex', gap: '12px', maxWidth: compact ? '100%' : '700px', margin: '0 auto' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              ref={searchInputRef}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by gene name, model type, or catalog number..."
              autoComplete="off"
              style={{
                width: '100%',
                padding: compact ? '12px 40px 12px 16px' : '16px 48px 16px 20px',
                fontSize: compact ? '.9rem' : '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#008080'; e.target.style.boxShadow = '0 0 0 3px rgba(0,128,128,0.1)'; }}
              onBlur={(e)  => { e.target.style.borderColor = '#e0e0e0'; e.target.style.boxShadow = 'none'; }}
            />
            {isSearching ? (
              <div style={{ position: 'absolute', right: compact ? '12px' : '16px', top: '50%', transform: 'translateY(-50%)', width: compact ? '18px' : '20px', height: compact ? '18px' : '20px', border: '2px solid #e0e0e0', borderTop: '2px solid #008080', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            ) : (
              <svg style={{ position: 'absolute', right: compact ? '12px' : '16px', top: '50%', transform: 'translateY(-50%)', width: compact ? '18px' : '22px', height: compact ? '18px' : '22px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
          {!compact && (
            <button type="submit" style={{ padding: '16px 32px', background: '#008080', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s, transform 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#006666'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e)  => { e.currentTarget.style.background = '#008080'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Search
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>
        <style jsx>{`@keyframes spin { 0%{transform:translateY(-50%) rotate(0deg)} 100%{transform:translateY(-50%) rotate(360deg)} }`}</style>
      </form>

      {/* Error */}
      {error && (
        <div style={{ marginTop: '16px', padding: '16px', background: '#fff8f8', border: '1px solid #fdd', borderRadius: '8px', color: '#c00', fontSize: '.9rem' }}>
          {error}{' '}
          <button onClick={() => runSearch(searchTerm)} style={{ background: 'none', border: 'none', color: '#008080', cursor: 'pointer', fontWeight: 600, fontSize: '.9rem' }}>
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {hasSearched && !error && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' }}>
            <p style={{ margin: 0, fontSize: '.9rem', color: '#666' }}>
              {isSearching ? (
                <span>Searching&hellip;</span>
              ) : results.length === 0 ? (
                <span>No models found for &ldquo;{searchTerm}&rdquo;</span>
              ) : (
                <span>
                  Found <strong style={{ color: '#008080' }}>{results.length}</strong>
                  {results.length === maxResults ? '+' : ''} model{results.length !== 1 ? 's' : ''} matching &ldquo;{searchTerm}&rdquo;
                </span>
              )}
            </p>
            {searchTerm && (
              <button onClick={clearSearch} style={{ padding: '6px 12px', background: '#f0f0f0', color: '#666', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Clear
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Availability filter chips */}
          {results.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {(
                [
                  { key: 'all',        label: 'All',            color: '#008080' },
                  { key: 'live',       label: 'Live',           color: '#2e7d32' },
                  { key: 'sperm',      label: 'Sperm Cryo',     color: '#e65100' },
                  { key: 'embryo',     label: 'Embryo Cryo',    color: '#e65100' },
                  { key: 'developing', label: 'Developing',     color: '#546e7a' },
                ] as const
              ).map(({ key, label, color }) => {
                const isActive = availabilityFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setAvailabilityFilter(key)}
                    style={{
                      padding: '5px 14px',
                      fontSize: '.8rem',
                      fontWeight: 600,
                      letterSpacing: '.04em',
                      textTransform: 'uppercase',
                      border: `2px solid ${color}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: isActive ? color : 'transparent',
                      color: isActive ? '#fff' : color,
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              {availabilityFilter !== 'all' && (
                <span style={{ alignSelf: 'center', fontSize: '.8rem', color: '#999' }}>
                  {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}

          {filteredResults.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem', tableLayout: 'auto', minWidth: '750px' }}>
                <thead>
                  <tr style={{ background: '#f7f7f7' }}>
                    {['Gene Name', 'Model Abbreviation', 'Model Type', 'Category', 'Availability', 'ITL Catalog #', ''].map((h) => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: h === '' ? 'center' : 'left', fontWeight: 600, color: '#333', borderBottom: '2px solid #e0e0e0', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((model, index) => (
                    <tr key={model.id}
                      style={{ background: index % 2 === 0 ? '#fff' : '#fafafa', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#f0f9f9'}
                      onMouseOut={(e)  => e.currentTarget.style.background = index % 2 === 0 ? '#fff' : '#fafafa'}
                    >
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, color: '#008080', whiteSpace: 'nowrap' }}>
                        {model.geneName}
                      </td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', color: '#333', fontFamily: 'monospace', fontSize: '.85rem' }}>
                        {model.modelAbbrev}
                      </td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0' }}>
                        <span style={{ display: 'inline-block', padding: '4px 10px', background: getModelTypeColor(model.modelType), color: '#fff', borderRadius: '4px', fontSize: '.8rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {model.modelType || 'N/A'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', color: '#666', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={model.category || ''}>
                        {model.category || 'N/A'}
                      </td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', minWidth: '120px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '6px', fontSize: '.85rem', color: availabilityColor(model.availability) }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: availabilityColor(model.availability), flexShrink: 0, marginTop: '4px' }} />
                          <span>{availabilityLabel(model.availability)}</span>
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', color: '#555', fontSize: '.85rem', fontFamily: 'monospace', whiteSpace: 'nowrap', minWidth: '100px' }}>
                        {model.catalogNumber}
                      </td>
                      <td style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', textAlign: 'center' }}>
                        <Link
                          href={`/order-catalog-models?model=${encodeURIComponent(model.modelAbbrev || model.geneName)}&catalog=${encodeURIComponent(model.catalogNumber)}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '8px 14px', background: '#008080', color: '#fff', borderRadius: '4px', fontSize: '.8rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
                          onMouseOver={(e) => e.currentTarget.style.background = '#006666'}
                          onMouseOut={(e)  => e.currentTarget.style.background = '#008080'}
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

          {filteredResults.length === 0 && results.length > 0 && !isSearching && (
            <div style={{ textAlign: 'center', padding: '32px 20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#666', fontSize: '.95rem' }}>No results match the selected availability filter.</p>
            </div>
          )}

          {results.length === 0 && !isSearching && searchTerm && (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f9f9f9', borderRadius: '8px' }}>
              <p style={{ margin: '0 0 16px', color: '#666', fontSize: '.95rem' }}>No models found matching your search criteria.</p>
              <p style={{ margin: '0 0 20px', color: '#999', fontSize: '.85rem' }}>Try a different gene name or keyword, or request a generated knockout, knockin, or humanized line.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                <Link href="/all-catalog-mouse-models" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#008080', color: '#fff', borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  Browse 14,774+ Catalog Models
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/request-quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#0a253c', color: '#fff', borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  Request a Quote
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {results.length === maxResults && (
            <div style={{ textAlign: 'center', marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, #f0f9f9 0%, #e6f7f7 100%)', borderRadius: '8px', border: '1px dashed #008080' }}>
              <p style={{ margin: '0 0 12px', color: '#333', fontSize: '.9rem' }}>
                Showing first {maxResults} results. Need help finding a specific model?
              </p>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#008080', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}>
                Contact our team
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Initial stats (no search yet) */}
      {!hasSearched && !compact && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" style={{ gap: '12px', marginTop: '24px' }}>
          {[
            { label: 'Total Models',  value: stats ? `${stats.total_models.toLocaleString()}+`         : '14,774+', color: '#008080' },
            { label: 'Unique Genes',  value: stats ? `${stats.unique_genes.toLocaleString()}+`          : '5,000+',  color: '#008080' },
            { label: 'Live Models',   value: stats ? `${stats.live_models.toLocaleString()}+`           : '2,400+',  color: '#2e7d32' },
            { label: 'Sperm Cryo',    value: stats?.sperm_cryo_models  != null ? `${stats.sperm_cryo_models.toLocaleString()}+`  : '7,700+',  color: '#e65100' },
            { label: 'Embryo Cryo',   value: stats?.embryo_cryo_models != null ? `${stats.embryo_cryo_models.toLocaleString()}+` : '3,100+',  color: '#e65100' },
            { label: 'Model Types',   value: stats ? `${stats.model_types}+`                            : '6+',      color: '#008080' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '14px 10px', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: s.color, marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '.8rem', color: '#666' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getModelTypeColor(t: string): string {
  const v = (t || '').toLowerCase();
  if (v.includes('conditional')) return '#134978';
  if (v.includes('knockout'))    return '#555';
  if (v.includes('knockin'))     return '#134978';
  if (v.includes('humanized'))   return '#2a6496';
  if (v.includes('transgenic'))  return '#444';
  if (v.includes('immunodeficient')) return '#8b0000';
  return '#008080';
}

export default CatalogSearch;
