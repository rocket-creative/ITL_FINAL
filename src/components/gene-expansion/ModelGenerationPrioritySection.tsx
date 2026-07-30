'use client';

import { useCallback, useId, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Link from 'next/link';
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

const GENE_PREVIEW_LIMIT = 12;


const H2_BASE: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 700,
  color: '#2384da',
  textAlign: 'center',
  marginBottom: '16px',
  lineHeight: 1.25,
};

const INTRO_PARAGRAPH: CSSProperties = {
  fontSize: '.9rem',
  color: '#666',
  textAlign: 'center',
  lineHeight: 1.7,
  maxWidth: '800px',
  margin: '0 auto 32px',
};

const FOCUS_RING =
  'outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #008080;';

function geneHubHref(mouseSymbol: string): string {
  return `/all-catalog-mouse-models/gene/${encodeURIComponent(mouseSymbol)}/`;
}

function quoteHref(mouseSymbol: string): string {
  return `/request-quote/?gene=${encodeURIComponent(mouseSymbol)}`;
}

function typeQuoteHref(slug: string): string {
  return `/request-quote/?type=${encodeURIComponent(slug)}`;
}

function childQuoteHref(child: PiTaxonomyChild): string {
  if (child.canonicalModSlug) {
    return typeQuoteHref(child.canonicalModSlug);
  }
  return `/request-quote/?type=${encodeURIComponent(child.id)}`;
}

function childAboutHref(child: PiTaxonomyChild): string | null {
  if (!child.siteHref) return null;
  return child.siteHref.endsWith('/') ? child.siteHref : `${child.siteHref}/`;
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

function ModTypesTable() {
  return (
    <div
      style={{
        marginBottom: '28px',
        overflow: 'hidden',
        borderRadius: '6px',
        border: '1px solid #e8e8e8',
      }}
    >
      <div
        className="model-gen-mod-head"
        style={{
          display: 'none',
          gridTemplateColumns: '1fr auto',
          gap: '16px',
          padding: '12px 16px',
          background: '#f7f7f7',
          borderBottom: '1px solid #e0e0e0',
          fontSize: '.8rem',
          fontWeight: 600,
          color: '#0a253c',
        }}
      >
        <span>Model type</span>
        <span style={{ width: '12.75rem', textAlign: 'center' }}>Availability</span>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {GENERATION_MOD_TYPES.map((row, index) => (
          <li
            key={row.slug}
            style={{
              background: index % 2 === 0 ? '#fff' : '#fafafa',
              borderBottom: index === GENERATION_MOD_TYPES.length - 1 ? 'none' : '1px solid #f0f0f0',
            }}
          >
            <div
              className="model-gen-mod-row"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '14px 16px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: '#333',
                  fontSize: '.9rem',
                  lineHeight: 1.35,
                }}
              >
                {row.label}
              </p>
              <div className="model-gen-mod-cta" style={{ width: '100%' }}>
                <Link
                  href={typeQuoteHref(row.slug)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '44px',
                    padding: '0 16px',
                    borderRadius: '6px',
                    background: '#0a253c',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '.82rem',
                    textDecoration: 'none',
                    lineHeight: 1,
                    boxSizing: 'border-box',
                  }}
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <style>{`
        @media (min-width: 640px) {
          .model-gen-mod-head { display: grid !important; }
          .model-gen-mod-row {
            display: grid !important;
            grid-template-columns: 1fr auto !important;
            align-items: center !important;
            gap: 16px !important;
          }
          .model-gen-mod-cta { width: 12.75rem !important; }
        }
      `}</style>
    </div>
  );
}

function GeneChip({ gene }: { gene: PriorityGene }) {
  return (
    <span
      className="model-gen-gene-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '8px 12px',
        maxWidth: '100%',
        boxSizing: 'border-box',
        minHeight: '44px',
        border: '1px solid #d0e8e8',
        borderRadius: '6px',
        background: '#fff',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '.82rem',
        lineHeight: 1.4,
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto 40px',
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
        aria-label={`Request a quote for ${gene.mouseSymbol}`}
        style={{
          color: '#fff',
          background: '#008080',
          fontSize: '.78rem',
          fontWeight: 600,
          textDecoration: 'none',
          padding: '6px 12px',
          minHeight: '44px',
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '6px',
        }}
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
  const tabPanelId = useId();

  const cohortGenes = orderGenesForCohort(getPriorityGenesByCohort(cohort), cohort);
  const visibleGenes = showAll ? cohortGenes : cohortGenes.slice(0, GENE_PREVIEW_LIMIT);
  const hasMore = cohortGenes.length > GENE_PREVIEW_LIMIT;

  const searchResults =
    search.trim().length >= 1
      ? PRIORITY_GENES.filter((g) => matchesSearch(g, search)).slice(0, 24)
      : [];

  const selectCohort = useCallback((next: GeneCohort) => {
    setCohort(next);
    setShowAll(false);
  }, []);

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + direction + COHORTS.length) % COHORTS.length;
      selectCohort(COHORTS[nextIndex]);
      const tabList = event.currentTarget.parentElement;
      const nextTab = tabList?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex];
      nextTab?.focus();
    },
    [selectCohort],
  );

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        .model-gen-h2 { font-size: 1.35rem; }
        @media (min-width: 768px) {
          .model-gen-h2 { font-size: 2rem; }
        }
        .model-gen-section { padding: 40px 16px; }
        @media (min-width: 768px) {
          .model-gen-section { padding: 60px 20px; }
        }
        .model-gen-cohort-scroller {
          display: flex;
          flex-wrap: nowrap;
          gap: 8px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x proximity;
          padding-bottom: 4px;
          margin-bottom: 20px;
        }
        .model-gen-cohort-scroller::-webkit-scrollbar { height: 4px; }
        .model-gen-cohort-tab { scroll-snap-align: start; flex: 0 0 auto; }
        @media (min-width: 768px) {
          .model-gen-cohort-scroller { flex-wrap: wrap; overflow: visible; }
        }
        .model-gen-primary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 44px;
          background: #008080;
          color: #fff;
          padding: 12px 22px;
          font-size: .9rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 6px;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .model-gen-primary-cta { width: auto; }
        }
        .model-gen-search-input:focus-visible { ${FOCUS_RING} }
        .model-gen-cohort-tab:focus-visible { ${FOCUS_RING} }
        .model-gen-show-all-btn:focus-visible { ${FOCUS_RING} }
      `}</style>

      {/* AI Answer Block */}
      <section
        aria-labelledby="model-gen-ai-answer-heading"
        className="model-gen-section" style={{ background: '#fff', borderBottom: '1px solid #eee' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p
            style={{
              display: 'block',
              fontSize: '.75rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#008080',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            AI Answer
          </p>
          <h2 id="model-gen-ai-answer-heading" className="model-gen-h2" style={H2_BASE}>
            Mouse model generation for high priority research genes
          </h2>
          <p style={{ ...INTRO_PARAGRAPH, fontSize: '.95rem', marginBottom: '28px' }}>
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
              textAlign: 'center',
            }}
          >
            Model modification types
          </h3>
          <ModTypesTable />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link href="/request-quote/" className="model-gen-primary-cta">
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
        className="model-gen-section" style={{ background: '#f5f5f4' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 id="model-gen-pi-taxonomy-heading" className="model-gen-h2" style={H2_BASE}>
            PI taxonomy for model generation
          </h2>
          <p style={INTRO_PARAGRAPH}>
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
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                  gap: '14px',
                }}
              >
                {group.children.map((child) => {
                  const quoteHref = childQuoteHref(child);
                  const aboutHref = childAboutHref(child);
                  return (
                    <div
                      key={child.id}
                      style={{
                        padding: '16px 18px',
                        background: '#fff',
                        border: '1px solid #e8e8e8',
                        borderRadius: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        minHeight: '100%',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '.9rem',
                          fontWeight: 600,
                          color: '#0a253c',
                          lineHeight: 1.4,
                        }}
                      >
                        {child.label}
                      </p>
                      {child.quoteNote ? (
                        <p
                          style={{
                            margin: 0,
                            fontSize: '.75rem',
                            color: '#666',
                            lineHeight: 1.5,
                          }}
                        >
                          {child.quoteNote}
                        </p>
                      ) : null}
                      <div
                        style={{
                          marginTop: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          paddingTop: '4px',
                        }}
                      >
                        <Link
                          href={quoteHref}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            minHeight: '44px',
                            padding: '10px 16px',
                            borderRadius: '6px',
                            background: '#0a253c',
                            color: '#fff',
                            fontSize: '.82rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxSizing: 'border-box',
                            textAlign: 'center',
                          }}
                        >
                          Request a quote
                        </Link>
                        {aboutHref ? (
                          <Link
                            href={aboutHref}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '36px',
                              fontSize: '.78rem',
                              fontWeight: 600,
                              color: '#134978',
                              textDecoration: 'none',
                              textAlign: 'center',
                            }}
                          >
                            About this service
                          </Link>
                        ) : null}
                      </div>
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
        className="model-gen-section" style={{ background: '#fff', borderBottom: '1px solid #eee' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 id="model-gen-cohort-heading" className="model-gen-h2" style={H2_BASE}>
            Browse by research cohort
          </h2>
          <p style={INTRO_PARAGRAPH}>
            Open a gene hub for catalog paths, or request a quote for that mouse symbol.
          </p>

          <div
            role="tablist"
            aria-label="Research cohorts"
            className="model-gen-cohort-scroller"
          >
            {COHORTS.map((c, index) => {
              const selected = c === cohort;
              const tabId = `model-gen-cohort-tab-${c}`;
              return (
                <button
                  key={c}
                  id={tabId}
                  type="button"
                  role="tab"
                  className="model-gen-cohort-tab"
                  aria-selected={selected}
                  aria-controls={tabPanelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectCohort(c)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.8rem',
                    fontWeight: 600,
                    padding: '10px 14px',
                    minHeight: '44px',
                    border: selected ? '1px solid #008080' : '1px solid #d0d0d0',
                    background: selected ? '#008080' : '#fff',
                    color: selected ? '#fff' : '#0a253c',
                    cursor: 'pointer',
                    borderRadius: '6px',
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
              textAlign: 'center',
            }}
          >
            {cohortGenes.length} genes in {getCohortLabel(cohort)}
          </p>

          <div
            id={tabPanelId}
            role="tabpanel"
            aria-labelledby={`model-gen-cohort-tab-${cohort}`}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
            }}
          >
            {visibleGenes.map((gene) => (
              <GeneChip key={`${gene.cohort}-${gene.humanSymbol}`} gene={gene} />
            ))}
          </div>

          {hasMore ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                type="button"
                className="model-gen-show-all-btn"
                onClick={() => setShowAll((v) => !v)}
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.85rem',
                  fontWeight: 600,
                  color: '#008080',
                  background: 'transparent',
                  border: '1px solid #008080',
                  padding: '10px 18px',
                  minHeight: '44px',
                  width: '100%',
                  maxWidth: '420px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                }}
              >
                {showAll ? 'Show fewer' : `Show all ${cohortGenes.length} genes`}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Search box */}
      <section
        aria-labelledby="model-gen-search-heading"
        className="model-gen-section" style={{ background: '#f0f9f9' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 id="model-gen-search-heading" className="model-gen-h2" style={H2_BASE}>
            Search priority genes
          </h2>
          <p style={{ ...INTRO_PARAGRAPH, marginBottom: '20px' }}>
            Filter by human symbol, mouse symbol, or alias
          </p>
          <label htmlFor="model-gen-gene-search" className="sr-only">
            Search priority genes by symbol or alias
          </label>
          <input
            id="model-gen-gene-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Trp53, EGFR, PD1"
            autoComplete="off"
            className="model-gen-search-input"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '420px',
              margin: '0 auto',
              padding: '12px 14px',
              minHeight: '44px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.9rem',
              border: '1px solid #c0d8d8',
              borderRadius: '6px',
              background: '#fff',
              color: '#0a253c',
            }}
          />
          {search.trim() ? (
            <ul
              style={{
                listStyle: 'none',
                margin: '16px auto 0',
                padding: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                maxWidth: '1000px',
              }}
              aria-label="Gene search results"
            >
              {searchResults.length === 0 ? (
                <li style={{ fontSize: '.88rem', color: '#666', width: '100%', textAlign: 'center' }}>
                  No matching priority genes.
                </li>
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
