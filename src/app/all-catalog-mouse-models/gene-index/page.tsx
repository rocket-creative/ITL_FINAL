/**
 * Gene Name Index — /all-catalog-mouse-models/gene-index
 *
 * SEO cornerstone page.
 * Server-rendered HTML listing every unique gene name in the catalog,
 * each as a text link to /all-catalog-mouse-models?q=[gene].
 *
 * Why this matters:
 * Google indexes this page → reads every gene name in plain HTML →
 * follows the links → crawls ?q= pages → ranks genetargeting.com
 * when a PI searches "Flt4 mouse model".
 *
 * No JS required. No 14k individual pages. One page, fully crawlable.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGeneNames } from '@/lib/catalog/serverCatalog';

export const metadata: Metadata = {
  title: 'Mouse Model Gene Index — All Genes A–Z | ingenious targeting laboratory',
  description:
    'Complete alphabetical index of all gene names in our mouse model catalog. Search knockout, knockin, humanized, and Cre driver models by gene target.',
  alternates: {
    canonical: 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/',
  },
  openGraph: {
    title: 'Mouse Model Gene Index | ingenious targeting laboratory',
    description: 'Browse 5,000+ gene targets available as mouse models.',
    url: 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/',
    siteName: 'ingenious targeting laboratory',
    locale: 'en_US',
    type: 'website',
  },
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default async function GeneIndexPage() {
  const genes = await getAllGeneNames();

  // Group genes by first letter
  const grouped: Record<string, string[]> = {};
  for (const gene of genes) {
    const letter = gene[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(gene);
  }

  const presentLetters = new Set(Object.keys(grouped));

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <style>{`
        .gene-link {
          display: block;
          padding: 6px 10px;
          color: #134978;
          font-size: .9rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.15s, color 0.15s;
        }
        .gene-link:hover { background: #f0f9f9; color: #008080; }
      `}</style>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)', padding: '60px 20px 50px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '6px', fontSize: '.85rem', color: 'rgba(255,255,255,0.7)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link></li>
              <li aria-hidden>›</li>
              <li><Link href="/all-catalog-mouse-models" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>All Catalog Models</Link></li>
              <li aria-hidden>›</li>
              <li style={{ color: '#fff' }}>Gene Index</li>
            </ol>
          </nav>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Mouse Model Gene Index
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '700px', marginBottom: '24px' }}>
            Browse {genes.length.toLocaleString()} unique gene targets available in our catalog of
            10,000+ genetically engineered mouse models.
            Click any gene name to see all available models.
          </p>
          <Link
            href="/all-catalog-mouse-models"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#008080', color: '#fff', padding: '12px 24px', borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}
          >
            Search All Models
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Alphabet jump nav */}
      <section style={{ background: '#f7f7f7', borderBottom: '1px solid #e0e0e0', padding: '12px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
          <span style={{ fontSize: '.8rem', color: '#999', marginRight: '8px', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase' }}>Jump to:</span>
          {ALPHABET.map((letter) =>
            presentLetters.has(letter) ? (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{ display: 'inline-block', width: '28px', height: '28px', lineHeight: '28px', textAlign: 'center', borderRadius: '4px', background: '#008080', color: '#fff', fontSize: '.85rem', fontWeight: 600, textDecoration: 'none' }}
              >
                {letter}
              </a>
            ) : (
              <span key={letter} style={{ display: 'inline-block', width: '28px', height: '28px', lineHeight: '28px', textAlign: 'center', borderRadius: '4px', background: '#e8e8e8', color: '#bbb', fontSize: '.85rem' }}>
                {letter}
              </span>
            )
          )}
        </div>
      </section>

      {/* Gene listings */}
      <main id="main-content" style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {genes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
              <p>Gene index is loading. Please check back shortly or{' '}
                <Link href="/all-catalog-mouse-models" style={{ color: '#008080' }}>search the catalog directly</Link>.
              </p>
            </div>
          ) : (
            ALPHABET.filter((l) => presentLetters.has(l)).map((letter) => (
              <section key={letter} id={`letter-${letter}`} style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#0a253c',
                  borderBottom: '2px solid #008080',
                  paddingBottom: '8px',
                  marginBottom: '16px',
                }}>
                  {letter}
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: '6px 12px',
                }}>
                  {(grouped[letter] || []).map((gene) => (
                    <li key={gene}>
                      <Link
                        href={`/all-catalog-mouse-models?q=${encodeURIComponent(gene)}`}
                        className="gene-link"
                      >
                        {gene}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}

          {/* Back to top */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="#" style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500, textDecoration: 'none' }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </main>

      {/* JSON-LD: SiteLinksSearchBox + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.genetargeting.com/' },
                { '@type': 'ListItem', position: 2, name: 'All Catalog Models', item: 'https://www.genetargeting.com/all-catalog-mouse-models/' },
                { '@type': 'ListItem', position: 3, name: 'Gene Index', item: 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Mouse Model Gene Index',
              description: `Index of ${genes.length} gene targets available as mouse models at ingenious targeting laboratory.`,
              url: 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/',
              numberOfItems: genes.length,
            },
          ]),
        }}
      />
    </div>
  );
}
