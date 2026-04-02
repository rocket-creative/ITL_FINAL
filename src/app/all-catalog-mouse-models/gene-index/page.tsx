/**
 * Gene Name Index — /all-catalog-mouse-models/gene-index
 * SEO cornerstone: every gene name rendered as plain HTML — fully crawlable.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGeneNames } from '@/lib/catalog/serverCatalog';
import { UXUIDCNavigation, UXUIDCFooter } from '@/components/UXUIDC';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import { IconChevronRight, IconLayers } from '@/components/UXUIDC/Icons';
import JumpNav from './JumpNav';

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

  const grouped: Record<string, string[]> = {};
  for (const gene of genes) {
    const letter = gene[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(gene);
  }
  const presentLetters = ALPHABET.filter((l) => !!grouped[l]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,212,212,0.15)', border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px', padding: '6px 14px', marginBottom: '20px',
            }}>
              <IconLayers size={14} color="#00d4d4" />
              <span style={{ color: '#fff', fontSize: '.85rem', fontWeight: 500 }}>
                {genes.length.toLocaleString()}+ Unique Gene Targets
              </span>
            </div>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/all-catalog-mouse-models" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>All Catalog Models</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>Gene Index</li>
              </ol>
            </nav>

            <h1 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', fontWeight: 700,
              color: '#fff', marginBottom: '20px', lineHeight: 1.2,
            }}>
              Mouse Model Gene Index
            </h1>
            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px', lineHeight: 1.7, maxWidth: '800px',
            }}>
              Browse all {genes.length.toLocaleString()} unique gene targets across our catalog of
              10,000+ genetically engineered mouse models. Click any gene to see every available model.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/all-catalog-mouse-models" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#008080', color: '#fff', padding: '12px 24px',
                borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
              }}>
                Search All Models <IconChevronRight size={16} color="#fff" />
              </Link>
              <Link href="/order-catalog-models" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: '#fff', padding: '12px 24px',
                borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                Request a Model
              </Link>
            </div>
          </div>
        </section>

        {/* ── Sticky alphabet jump nav (client component) ───────────────── */}
        <JumpNav presentLetters={presentLetters} />

        {/* ── Gene listings ─────────────────────────────────────────────── */}
        <section style={{ background: '#fff', padding: '40px 20px 80px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {genes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}>
                <p style={{ marginBottom: '16px' }}>Gene index is building — check back shortly or</p>
                <Link href="/all-catalog-mouse-models" style={{ color: '#008080', fontWeight: 600 }}>
                  search the catalog directly →
                </Link>
              </div>
            ) : (
              presentLetters.map((letter) => (
                <div
                  key={letter}
                  id={`letter-${letter}`}
                  style={{ marginBottom: '48px', scrollMarginTop: '130px' }}
                >
                  {/* Letter heading */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    marginBottom: '16px', paddingBottom: '10px',
                    borderBottom: '2px solid #008080',
                  }}>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem',
                      fontWeight: 700, color: '#0a253c', lineHeight: 1,
                    }}>
                      {letter}
                    </span>
                    <span style={{ fontSize: '.8rem', color: '#999', fontWeight: 500 }}>
                      {grouped[letter].length} {grouped[letter].length === 1 ? 'gene' : 'genes'}
                    </span>
                  </div>

                  {/* Gene grid */}
                  <ul style={{
                    listStyle: 'none', padding: 0, margin: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
                    gap: '2px 4px',
                  }}>
                    {grouped[letter].map((gene) => (
                      <li key={gene}>
                        <Link
                          href={`/all-catalog-mouse-models?q=${encodeURIComponent(gene)}`}
                          style={{
                            display: 'block',
                            padding: '5px 10px',
                            color: '#134978',
                            fontSize: '.875rem',
                            fontWeight: 500,
                            textDecoration: 'none',
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {gene}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}

            {/* Back to top */}
            <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #e0e0e0' }}>
              <a
                href="#main-content"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none' }}
              >
                ↑ Back to top
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section style={{ background: '#008080', padding: '50px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem', fontWeight: 700,
              color: '#fff', marginBottom: '16px',
            }}>
              Can&apos;t Find What You Need?
            </h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
              Our team can help you find the right model or create a custom solution tailored to your research.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/order-catalog-models" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#fff', color: '#008080', padding: '12px 24px',
                borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
              }}>
                Request a Catalog Model <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link href="/request-quote" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: '#fff', padding: '12px 24px',
                borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.5)',
              }}>
                Custom Model Quote
              </Link>
            </div>
          </div>
        </section>

      </main>

      <UXUIDCFooter />

      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'All Catalog Models', path: '/all-catalog-mouse-models' },
        { name: 'Gene Index', path: '/all-catalog-mouse-models/gene-index' },
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Mouse Model Gene Index',
            description: `Index of ${genes.length} gene targets available as mouse models at ingenious targeting laboratory.`,
            url: 'https://www.genetargeting.com/all-catalog-mouse-models/gene-index/',
            numberOfItems: genes.length,
          }),
        }}
      />
    </div>
  );
}
