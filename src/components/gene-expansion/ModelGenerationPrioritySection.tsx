'use client';

import { useState } from 'react';
import Link from 'next/link';
import GeneHubTrustBand from '@/components/gene-expansion/GeneHubTrustBand';
import {
  PRIORITY_GENES,
  getPriorityGenesByCohort,
  getCohortLabel,
  PI_TAXONOMY_GROUPS,
  type GeneCohort,
  type PriorityGene,
  type PiTaxonomyChild,
} from '@/data/priorityGenes';

const COHORTS: GeneCohort[] = [
  'signaling',
  'immune',
  'cancer',
  'neuroscience',
  'metabolism',
  'morphogen',
];

const FEATURED_MOUSE_BY_COHORT: Partial<Record<GeneCohort, string[]>> = {
  signaling: ['Trp53', 'Egfr', 'Kras', 'Pten', 'Myc'],
  immune: ['Pdcd1', 'Cd274', 'Ctla4', 'Tnf', 'Il6'],
  cancer: ['Trp53', 'Kras', 'Brca1', 'Brca2', 'Pten'],
  neuroscience: ['Apoe', 'App', 'Mapt', 'Snca', 'Pink1'],
  metabolism: ['Insr', 'Lep', 'Lepr', 'Pparg', 'Ldlr'],
  morphogen: ['Shh', 'Wnt3a', 'Bmp4', 'Fgf8', 'Nog'],
};

const GENERATION_MOD_TYPES: Array<{ label: string; slug: string }> = [
  { label: 'Knockout', slug: 'knockout' },
  { label: 'Conditional knockout', slug: 'conditional-knockout' },
  { label: 'Knockin', slug: 'knockin' },
  { label: 'Humanized', slug: 'humanized' },
  { label: 'Transgenic / overexpression', slug: 'overexpression' },
];

const GENE_PREVIEW_LIMIT = 40;

function geneHubHref(mouseSymbol: string): string {
  return `/all-catalog-mouse-models/gene/${encodeURIComponent(mouseSymbol)}/`;
}

function quoteHref(mouseSymbol: string): string {
  return `/request-quote/?gene=${encodeURIComponent(mouseSymbol)}`;
}

function typeQuoteHref(slug: string): string {
  return `/request-quote/?type=${encodeURIComponent(slug)}`;
}

function childHref(child: PiTaxonomyChild): string | null {
  if (child.canonicalModSlug) {
    return typeQuoteHref(child.canonicalModSlug);
  }
  if (child.siteHref) {
    return child.siteHref.endsWith('/') ? child.siteHref : `${child.siteHref}/`;
  }
  return '/request-quote/';
}

function orderGenesForCohort(genes: PriorityGene[], cohort: GeneCohort): PriorityGene[] {
  const featured = FEATURED_MOUSE_BY_COHORT[cohort] ?? [];
  const featuredSet = new Set(featured.map((s) => s.toLowerCase()));
  const featuredGenes: PriorityGene[] = [];
  for (const symbol of featured) {
    const match = genes.find((g) => g.mouseSymbol.toLowerCase() === symbol.toLowerCase());
    if (match) featuredGenes.push(match);
  }
  const rest = genes
    .filter((g) => !featuredSet.has(g.mouseSymbol.toLowerCase()))
    .toSorted((a, b) => a.mouseSymbol.localeCompare(b.mouseSymbol));
  return [...featuredGenes, ...rest];
}

function matchesSearch(gene: PriorityGene, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  if (gene.humanSymbol.toLowerCase().includes(q)) return true;
  if (gene.mouseSymbol.toLowerCase().includes(q)) return true;
  return gene.aliases.some((alias) => alias.toLowerCase().includes(q));
}

function GeneChip({ gene }: { gene: PriorityGene }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        padding: '6px 10px',
        border: '1px solid #d0e8e8',
        background: '#fff',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '.82rem',
        lineHeight: 1.4,
      }}
    >
      <Link
        href={geneHubHref(gene.mouseSymbol)}
        style={{ color: '#0a253c', fontWeight: 600, textDecoration: 'none' }}
      >
        {gene.humanSymbol}
        <span style={{ color: '#666', fontWeight: 400 }}> / {gene.mouseSymbol}</span>
      </Link>
      <Link
        href={quoteHref(gene.mouseSymbol)}
        style={{ color: '#008080', fontSize: '.75rem', fontWeight: 600, textDecoration: 'none' }}
      >
        Quote
      </Link>
    </span>
  );
}

export default function ModelGenerationPrioritySection() {
  const [cohort, setCohort] = useState<GeneCohort>('signaling');
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState('');

  const cohortGenes = orderGenesForCohort(getPriorityGenesByCohort(cohort), cohort);
  const visibleGenes = showAll ? cohortGenes : cohortGenes.slice(0, GENE_PREVIEW_LIMIT);
  const hasMore = cohortGenes.length > GENE_PREVIEW_LIMIT;

  const searchResults =
    search.trim().length >= 1
      ? PRIORITY_GENES.filter((g) => matchesSearch(g, search)).slice(0, 24)
      : [];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <GeneHubTrustBand />

      {/* AI Answer Block */}
      <section
        aria-labelledby="model-gen-ai-answer-heading"
        style={{ background: '#fff', padding: '56px 20px', borderBottom: '1px solid #eee' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p
            style={{
              display: 'inline-block',
              fontSize: '.75rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#008080',
              marginBottom: '10px',
            }}
          >
            AI Answer
          </p>
          <h2
            id="model-gen-ai-answer-heading"
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '16px',
              lineHeight: 1.3,
            }}
          >
            Mouse model generation for high priority research genes
          </h2>
          <p style={{ color: '#333', fontSize: '.95rem', lineHeight: 1.75, marginBottom: '28px' }}>
            ingenious targeting laboratory designs knockout, conditional knockout, knockin,
            humanized, and transgenic models for 700+ priority genes across signaling, immune,
            cancer, neuroscience, metabolism, and morphogen pathways. Quote in 24 hours. 100%
            germline transmission guarantee.
          </p>

          <h3
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '12px',
            }}
          >
            Modification types available to generate
          </h3>
          <div style={{ overflowX: 'auto', marginBottom: '28px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '.9rem',
                minWidth: '480px',
              }}
            >
              <thead>
                <tr style={{ background: '#f7f7f7' }}>
                  <th
                    scope="col"
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#0a253c',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Model type
                  </th>
                  <th
                    scope="col"
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: '#0a253c',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Availability
                  </th>
                </tr>
              </thead>
              <tbody>
                {GENERATION_MOD_TYPES.map((row, index) => (
                  <tr
                    key={row.slug}
                    style={{
                      background: index % 2 === 0 ? '#fff' : '#fafafa',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <td style={{ padding: '12px 16px', color: '#333', fontWeight: 500 }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Link
                        href={typeQuoteHref(row.slug)}
                        style={{ color: '#008080', fontWeight: 600, textDecoration: 'none' }}
                      >
                        Available to generate
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Link
              href="/request-quote/"
              style={{
                display: 'inline-block',
                background: '#008080',
                color: '#fff',
                padding: '12px 22px',
                fontSize: '.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Request a Quote
            </Link>
            <Link
              href="/all-catalog-mouse-models/gene-index"
              style={{
                color: '#0a253c',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px solid #0a253c',
              }}
            >
              Browse gene index
            </Link>
          </div>
        </div>
      </section>

      {/* PI taxonomy for generation */}
      <section
        aria-labelledby="model-gen-pi-taxonomy-heading"
        style={{ background: '#f5f5f4', padding: '56px 20px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            id="model-gen-pi-taxonomy-heading"
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '8px',
            }}
          >
            PI taxonomy for model generation
          </h2>
          <p style={{ color: '#555', fontSize: '.92rem', lineHeight: 1.7, marginBottom: '32px' }}>
            Associate your project with the full PI search taxonomy, from knockout through
            backgrounds.
          </p>

          {PI_TAXONOMY_GROUPS.map((group) => (
            <div key={group.id} style={{ marginBottom: '36px' }}>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#0a253c',
                  marginBottom: '14px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #008080',
                }}
              >
                {group.label}
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px 14px',
                }}
              >
                {group.children.map((child) => {
                  const href = childHref(child);
                  return (
                    <div
                      key={child.id}
                      style={{
                        flex: '1 1 220px',
                        maxWidth: '320px',
                        padding: '12px 14px',
                        background: '#fff',
                        border: '1px solid #e8e8e8',
                      }}
                    >
                      <p
                        style={{
                          margin: '0 0 8px',
                          fontSize: '.88rem',
                          fontWeight: 600,
                          color: '#0a253c',
                          lineHeight: 1.4,
                        }}
                      >
                        {child.label}
                      </p>
                      {href ? (
                        <Link
                          href={href}
                          style={{
                            color: '#008080',
                            fontSize: '.82rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            borderBottom: '1px solid #008080',
                          }}
                        >
                          {child.canonicalModSlug || !child.siteHref ? 'Generate' : 'Open hub'}
                        </Link>
                      ) : null}
                      {child.quoteNote ? (
                        <p
                          style={{
                            margin: '8px 0 0',
                            fontSize: '.75rem',
                            color: '#666',
                            lineHeight: 1.5,
                          }}
                        >
                          {child.quoteNote}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by research cohort */}
      <section
        aria-labelledby="model-gen-cohort-heading"
        style={{ background: '#fff', padding: '56px 20px', borderBottom: '1px solid #eee' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            id="model-gen-cohort-heading"
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '8px',
            }}
          >
            Browse by research cohort
          </h2>
          <p style={{ color: '#555', fontSize: '.92rem', lineHeight: 1.7, marginBottom: '24px' }}>
            Open a gene hub for catalog and generate CTAs, or start a quote for that mouse symbol.
          </p>

          <div
            role="tablist"
            aria-label="Research cohorts"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}
          >
            {COHORTS.map((c) => {
              const selected = c === cohort;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setCohort(c);
                    setShowAll(false);
                  }}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.8rem',
                    fontWeight: 600,
                    padding: '8px 14px',
                    border: selected ? '1px solid #008080' : '1px solid #d0d0d0',
                    background: selected ? '#008080' : '#fff',
                    color: selected ? '#fff' : '#0a253c',
                    cursor: 'pointer',
                  }}
                >
                  {getCohortLabel(c)}
                </button>
              );
            })}
          </div>

          <p
            style={{
              fontSize: '.85rem',
              color: '#666',
              marginBottom: '16px',
            }}
          >
            {cohortGenes.length} genes in {getCohortLabel(cohort)}
          </p>

          <div
            role="tabpanel"
            aria-label={getCohortLabel(cohort)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
          >
            {visibleGenes.map((gene) => (
              <GeneChip key={`${gene.cohort}-${gene.humanSymbol}`} gene={gene} />
            ))}
          </div>

          {hasMore ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              style={{
                marginTop: '20px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '.85rem',
                fontWeight: 600,
                color: '#008080',
                background: 'transparent',
                border: '1px solid #008080',
                padding: '10px 18px',
                cursor: 'pointer',
              }}
            >
              {showAll ? 'Show fewer' : `Show all ${cohortGenes.length} genes`}
            </button>
          ) : null}
        </div>
      </section>

      {/* Search box */}
      <section
        aria-labelledby="model-gen-search-heading"
        style={{ background: '#f0f9f9', padding: '48px 20px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            id="model-gen-search-heading"
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '12px',
            }}
          >
            Search priority genes
          </h2>
          <label
            htmlFor="model-gen-gene-search"
            style={{
              display: 'block',
              fontSize: '.85rem',
              color: '#555',
              marginBottom: '8px',
            }}
          >
            Filter by human symbol, mouse symbol, or alias
          </label>
          <input
            id="model-gen-gene-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Trp53, EGFR, PD1"
            autoComplete="off"
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '12px 14px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.9rem',
              border: '1px solid #c0d8d8',
              background: '#fff',
              color: '#0a253c',
              outline: 'none',
            }}
          />
          {search.trim() ? (
            <ul
              style={{
                listStyle: 'none',
                margin: '16px 0 0',
                padding: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
              aria-label="Gene search results"
            >
              {searchResults.length === 0 ? (
                <li style={{ fontSize: '.88rem', color: '#666' }}>No matching priority genes.</li>
              ) : (
                searchResults.map((gene) => (
                  <li key={`search-${gene.humanSymbol}`}>
                    <GeneChip gene={gene} />
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </div>
      </section>
    </div>
  );
}
