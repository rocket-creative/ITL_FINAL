import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import StandardPageCtaStack from '@/components/UXUIDC/StandardPageCtaStack';
import type { CustomGenePageData } from '@/content/custom-gene-pages/types';
import {
  MODEL_OPTION_HREFS,
  catalogLookupForGene,
  customGeneHref,
  customGeneIndexPath,
  getCustomGenePage,
  listCustomGenePages,
  relatedTargetSymbols,
} from '@/content/custom-gene-pages/registry';

const shell: CSSProperties = { maxWidth: '1200px', margin: '0 auto' };
const column: CSSProperties = { maxWidth: '1000px', margin: '0 auto' };

const h2Style: CSSProperties = {
  color: '#2384da',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: 1.25,
  margin: '0 0 20px',
};

const bodyStyle: CSSProperties = {
  color: '#444',
  fontSize: '1rem',
  lineHeight: 1.75,
  margin: '0 0 16px',
};

const linkStyle: CSSProperties = {
  color: '#008080',
  fontWeight: 600,
  textDecoration: 'none',
};

const CUSTOM_QUOTE_LABEL = 'Request a Custom Model Quote';

function customQuoteHref(symbol?: string): string {
  if (!symbol) return '/request-quote/';
  return `/request-quote/?gene=${encodeURIComponent(symbol)}`;
}

const quoteButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '24px',
  minHeight: '48px',
  padding: '14px 22px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  backgroundColor: '#0a253c',
  color: '#ffffff',
};

function sectionStyle(background: string): CSSProperties {
  return { backgroundColor: background, padding: '60px 20px' };
}

/** H1 stem, so headings match the document when it differs from the mouse symbol. */
function pageStem(page: CustomGenePageData): string {
  const suffix = ' Mouse Models';
  return page.h1.endsWith(suffix) ? page.h1.slice(0, -suffix.length) : page.symbol;
}

function Hero({ title, crumbs }: { title: string; crumbs: { name: string; path: string }[] }) {
  return (
    <section
      className="page-hero"
      style={{
        background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
        padding: '80px 20px 60px',
      }}
    >
      <div style={{ ...column, position: 'relative' }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px 8px',
              fontSize: '.85rem',
            }}
          >
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={crumb.path} style={{ display: 'flex', gap: '8px' }}>
                  {index > 0 ? <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span> : null}
                  {last ? (
                    <span style={{ color: 'rgba(255,255,255,0.9)' }}>{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1
          style={{
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}

function PageFrame({
  children,
  crumbs,
}: {
  children: ReactNode;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <div style={shell}>
      <BreadcrumbSchema items={crumbs} />
      <UXUIDCNavigation />
      <main id="main-content">{children}</main>
      <UXUIDCFooter />
    </div>
  );
}

function doiHref(citation: string): string | null {
  const match = citation.match(/doi:(\S+)/i);
  if (!match?.[1]) return null;
  return `https://doi.org/${match[1]}`;
}

function FieldValue({ label, value }: { label: string; value: string }) {
  if (label === 'Mouse gene (MGI)' && /^MGI:\d+$/.test(value)) {
    return (
      <a href={`https://www.informatics.jax.org/marker/${value}`} style={linkStyle}>
        {value}
      </a>
    );
  }

  if (label === 'Human gene') {
    const pattern = /(HGNC:\d+|NCBI Gene \d+)/g;
    const nodes: ReactNode[] = [];
    let last = 0;
    let key = 0;
    for (const match of value.matchAll(pattern)) {
      const token = match[0];
      const index = match.index ?? 0;
      if (index > last) nodes.push(value.slice(last, index));
      const href = token.startsWith('HGNC:')
        ? `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${token}`
        : `https://www.ncbi.nlm.nih.gov/gene/${token.slice('NCBI Gene '.length)}`;
      nodes.push(
        <a key={key} href={href} style={linkStyle}>
          {token}
        </a>,
      );
      key += 1;
      last = index + token.length;
    }
    if (last < value.length) nodes.push(value.slice(last));
    return <>{nodes}</>;
  }

  return value;
}

export function CustomGeneIndex() {
  const pages = listCustomGenePages();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Mouse Model Generation', path: '/custom-mouse-models/' },
    { name: 'Gene model pages', path: `${customGeneIndexPath()}/` },
  ];

  return (
    <PageFrame crumbs={crumbs}>
      <Hero title="Gene model pages" crumbs={crumbs} />
      <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta
            slug="custom-mouse-models-gene"
            utmMedium="page-hero"
            flush
            quoteLabel={CUSTOM_QUOTE_LABEL}
            quoteHref={customQuoteHref()}
            quoteFirst
          />
        </div>
      </section>
      <section style={sectionStyle('#ffffff')}>
        <div style={column}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
            {pages.map((page) => (
              <li key={page.symbol}>
                <Link href={customGeneHref(page.symbol)} style={{ ...linkStyle, fontSize: '1.05rem' }}>
                  {page.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <StandardPageCtaStack
        slug="custom-mouse-models-gene"
        quoteLabel={CUSTOM_QUOTE_LABEL}
        quoteHref={customQuoteHref()}
        quoteFirst
      />
    </PageFrame>
  );
}

export default function CustomGenePage({ page }: { page: CustomGenePageData }) {
  const catalogOverrides = catalogLookupForGene(page);
  const quoteHref = customQuoteHref(page.symbol);
  const symbols = relatedTargetSymbols(page.relatedLine);
  const relatedPrefix = page.relatedLine.startsWith('Related gene targets: ')
    ? 'Related gene targets: '
    : page.relatedLine;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Mouse Model Generation', path: '/custom-mouse-models/' },
    { name: 'Gene model pages', path: `${customGeneIndexPath()}/` },
    { name: page.h1, path: customGeneHref(page.symbol) },
  ];

  return (
    <PageFrame crumbs={crumbs}>
      <Hero title={page.h1} crumbs={crumbs} />

      <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta
            slug={`custom-gene-${page.symbol}`}
            utmMedium="page-hero"
            geneSymbol={page.symbol}
            catalogOverrides={catalogOverrides}
            flush
            quoteLabel={CUSTOM_QUOTE_LABEL}
            quoteHref={quoteHref}
            quoteFirst
          />
        </div>
      </section>

      <section style={sectionStyle('#ffffff')}>
        <div style={column}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th scope="col" style={headCell}>Field</th>
                <th scope="col" style={headCell}>Value</th>
              </tr>
            </thead>
            <tbody>
              {page.fields.map((field) => (
                <tr key={field.label}>
                  <th scope="row" style={labelCell}>{field.label}</th>
                  <td style={valueCell}>
                    <FieldValue label={field.label} value={field.value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={sectionStyle('#f8f9fa')}>
        <div style={column}>
          <h2 style={h2Style}>{`Why Model ${pageStem(page)}`}</h2>
          {page.why.map((paragraph) => (
            <p key={paragraph} style={bodyStyle}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section style={sectionStyle('#ffffff')}>
        <div style={column}>
          <h2 style={h2Style}>Model Applications</h2>
          {page.applications.map((paragraph) => (
            <p key={paragraph} style={bodyStyle}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section style={sectionStyle('#f8f9fa')}>
        <div style={column}>
          <h2 style={h2Style}>{`Custom ${pageStem(page)} Model Options`}</h2>
          <p style={bodyStyle}>{page.optionsIntro}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
            {page.options.map((option) => {
              const href = MODEL_OPTION_HREFS[option];
              return (
                <li key={option}>
                  {href ? (
                    <Link href={href} style={linkStyle}>{option}</Link>
                  ) : (
                    option
                  )}
                </li>
              );
            })}
          </ul>
          <Link href={quoteHref} style={quoteButtonStyle}>
            {`Request a custom ${pageStem(page)} model quote`}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section style={sectionStyle('#ffffff')}>
        <div style={column}>
          <h2 style={h2Style}>Sources</h2>
          <ul style={{ paddingLeft: '1.2rem', margin: '0 0 24px' }}>
            {page.sources.map((citation) => {
              const href = doiHref(citation);
              return (
                <li key={citation} style={{ ...bodyStyle, marginBottom: '12px' }}>
                  {href ? (
                    <a href={href} style={{ ...linkStyle, fontWeight: 400 }}>{citation}</a>
                  ) : (
                    citation
                  )}
                </li>
              );
            })}
          </ul>
          <p style={bodyStyle}>{page.reviewed}</p>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>
            {symbols.length > 0 ? (
              <>
                {relatedPrefix}
                {symbols.map((symbol, index) => {
                  const linked = getCustomGenePage(symbol);
                  return (
                    <span key={symbol}>
                      {index > 0 ? ' · ' : null}
                      {linked ? (
                        <Link href={customGeneHref(symbol)} style={linkStyle}>{symbol}</Link>
                      ) : (
                        symbol
                      )}
                    </span>
                  );
                })}
              </>
            ) : (
              page.relatedLine
            )}
          </p>
        </div>
      </section>

      <StandardPageCtaStack
        slug={`custom-gene-${page.symbol}`}
        geneSymbol={page.symbol}
        catalogLookupOverrides={catalogOverrides}
        quoteLabel={CUSTOM_QUOTE_LABEL}
        quoteHref={quoteHref}
        quoteFirst
      />
    </PageFrame>
  );
}

const headCell: CSSProperties = {
  textAlign: 'left',
  color: '#0a253c',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '.95rem',
  fontWeight: 700,
  padding: '12px 16px',
  backgroundColor: '#f7f9fa',
  borderBottom: '1px solid #d8e3e6',
};

const labelCell: CSSProperties = {
  textAlign: 'left',
  color: '#0a253c',
  fontWeight: 600,
  width: '34%',
  padding: '14px 16px',
  borderBottom: '1px solid #e6e6e6',
  verticalAlign: 'top',
};

const valueCell: CSSProperties = {
  color: '#444',
  padding: '14px 16px',
  borderBottom: '1px solid #e6e6e6',
  verticalAlign: 'top',
};
