'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { IconChevronRight } from '@/components/UXUIDC/Icons';
import { textMatchesQuery } from '@/lib/catalog/catalogQuery';

export type LiveHumanizedRow = {
  id: string;
  geneName: string;
  modelAbbrev: string;
  catalogNumber: string;
  category: string;
  geneHref: string | null;
};

const TH: CSSProperties = {
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 600,
  color: '#333',
  borderBottom: '2px solid #e0e0e0',
  fontSize: '.8rem',
};

const TD: CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid #f0f0f0',
  verticalAlign: 'top',
};

function orderHref(row: LiveHumanizedRow): string {
  const model = row.modelAbbrev || row.geneName;
  return `/order-catalog-models/?model=${encodeURIComponent(model)}&catalog=${encodeURIComponent(row.catalogNumber)}`;
}

function matches(row: LiveHumanizedRow, query: string): boolean {
  if (!query) return true;
  const haystack = `${row.modelAbbrev} ${row.catalogNumber} ${row.geneName} ${row.category}`;
  return textMatchesQuery(haystack, query);
}

export default function LiveHumanizedInventory({ rows }: { rows: LiveHumanizedRow[] }) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const visible = needle ? rows.filter((row) => matches(row, needle)) : rows;

  return (
    <div className="live-humanized-inventory">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          document.getElementById('live-humanized-results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }}
        style={{ marginBottom: '16px' }}
      >
        <label htmlFor="live-humanized-search" style={{ display: 'block', fontSize: '.85rem', fontWeight: 600, color: '#0a253c', marginBottom: '8px' }}>
          Search the live list
        </label>
        <div className="live-search-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', maxWidth: '720px' }}>
          <input
            id="live-humanized-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Model, catalog number, or gene"
            autoComplete="off"
            style={{
              flex: '1 1 240px',
              minWidth: 0,
              padding: '14px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor = '#008080';
              event.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,128,128,0.1)';
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor = '#e0e0e0';
              event.currentTarget.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            style={{
              padding: '14px 28px',
              background: '#008080',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Search
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          {needle ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                padding: '14px 18px',
                background: '#f0f0f0',
                color: '#555',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          ) : null}
        </div>
      </form>
      <p id="live-humanized-results" style={{ fontSize: '.85rem', color: '#666', margin: '0 0 16px' }}>
        Showing {visible.length.toLocaleString()} of {rows.length.toLocaleString()} live humanized models.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' }}>
          <caption style={{ captionSide: 'top', textAlign: 'left', padding: '0 0 10px', fontSize: '.95rem', fontWeight: 600, color: '#0a253c' }}>
            Humanized models with Live availability
          </caption>
          <thead>
            <tr style={{ background: '#f7f7f7' }}>
              <th style={TH}>Model</th>
              <th style={TH}>Catalog #</th>
              <th style={TH}>Gene</th>
              <th style={TH}>Category</th>
              <th style={TH}>Availability</th>
              <th style={{ ...TH, textAlign: 'center' }}>Order</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                <td data-label="Model" style={{ ...TD, color: '#0a253c', fontWeight: 600 }}>{row.modelAbbrev}</td>
                <td data-label="Catalog #" style={{ ...TD, color: '#134978', fontFamily: 'monospace', fontWeight: 600 }}>{row.catalogNumber}</td>
                <td data-label="Gene" style={TD}>
                  {row.geneHref ? (
                    <Link href={row.geneHref} style={{ color: '#008080', fontWeight: 600, textDecoration: 'none' }}>
                      {row.geneName}
                    </Link>
                  ) : (
                    row.geneName
                  )}
                </td>
                <td data-label="Category" style={{ ...TD, color: '#555', fontSize: '.82rem' }}>{row.category}</td>
                <td data-label="Availability" style={{ ...TD, color: '#2e7d32', fontWeight: 700, fontSize: '.78rem' }}>LIVE</td>
                <td data-label="Order" style={{ ...TD, textAlign: 'center' }}>
                  <Link
                    href={orderHref(row)}
                    aria-label={`Order ${row.modelAbbrev}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      background: '#008080',
                      color: '#fff',
                      minHeight: '44px',
                      padding: '10px 16px',
                      borderRadius: '4px',
                      fontSize: '.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Order <IconChevronRight size={12} color="#fff" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visible.length === 0 ? (
        <p style={{ marginTop: '16px', color: '#333' }}>
          No live humanized model matches that search. Try a catalog number such as HU 00015, or clear the search to see the full list.
        </p>
      ) : null}
    </div>
  );
}
