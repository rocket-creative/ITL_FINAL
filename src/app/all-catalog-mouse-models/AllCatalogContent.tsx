'use client';

/**
 * All Catalog Mouse Models - Client Content
 * Receives initialQuery from Server Component (URL ?q= param)
 */

import {
  UXUIDCNavigation,
  UXUIDCFooter,
  CatalogSearch,
} from '@/components/UXUIDC';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import Link from 'next/link';
import { IconChevronRight, IconLayers } from '@/components/UXUIDC/Icons';
import type { CatalogModel } from '@/components/UXUIDC/CatalogSearch';

interface AllCatalogContentProps {
  initialQuery?: string;
  preloadedModels?: CatalogModel[];
}

export default function AllCatalogContent({ initialQuery, preloadedModels = [] }: AllCatalogContentProps) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <main id="main-content">
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <IconLayers size={14} color="#00d4d4" />
              <span style={{ color: '#ffffff', fontSize: '.85rem', fontWeight: 500 }}>14,774+ Models</span>
            </div>
            <h1 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
            }}>
              All Catalog Mouse Models
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              Search our extensive catalog of over 14,774 genetically engineered mouse models including knockout, knockin, humanized, Cre driver, and reporter strains for biomedical research and drug development.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/order-catalog-models" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#008080',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Request Catalog Model
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                Custom Model Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by Gene Letter — shown above search so it's immediately visible */}
        <section style={{ background: '#f7f7f7', padding: '32px 20px 28px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0a253c',
                margin: 0,
              }}>
                Browse by Gene Name
              </h2>
              <Link href="/all-catalog-mouse-models/gene-index" style={{
                fontSize: '.8rem',
                color: '#008080',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '.04em',
              }}>
                View full index →
              </Link>
            </div>

            {/* A–Z letter tiles — each links to a filtered single-letter view */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                <Link
                  key={letter}
                  href={`/all-catalog-mouse-models/gene-index?letter=${letter}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#008080',
                    color: '#ffffff',
                    borderRadius: '6px',
                    fontSize: '.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    flexShrink: 0,
                  }}
                  aria-label={`Browse genes starting with ${letter}`}
                >
                  {letter}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Catalog Search Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <CatalogSearch maxResults={25} showTitle={true} initialQuery={initialQuery} preloadedModels={preloadedModels} />
          </div>
        </section>

        {/* Browse by Category */}
        <section style={{ background: '#ffffff', padding: '40px 20px 60px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '24px',
            }}>
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { href: '/humanized-immune-checkpoint-mice', label: 'Humanized Checkpoint Mice' },
                { href: '/disease-model-catalog', label: 'Disease Model Catalog' },
                { href: '/double-checkpoint-mice', label: 'Double Checkpoint Mice' },
                { href: '/pd1-humanized-mice', label: 'PD1 Humanized Mice' },
                { href: '/pdl1-humanized-mice', label: 'PDL1 Humanized Mice' },
                { href: '/lag3-humanized-mice', label: 'LAG3 Humanized Mice' },
              ].map((link, index) => (
                <Link key={index} href={link.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#f7f7f7',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  fontSize: '.9rem',
                  fontWeight: 500,
                  color: '#0a253c',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, background 0.15s',
                }}>
                  <span>{link.label}</span>
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ background: '#008080', padding: '50px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              Can&apos;t Find What You Need?
            </h2>
            <p style={{
              fontSize: '.95rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
            }}>
              Our team can help you find the right model or create a custom solution tailored to your research.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/order-catalog-models" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#008080',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Request a Catalog Model
                <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.5)'
              }}>
                Custom Model Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
          
      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Resources', path: '/resources' },
          { name: 'All Catalog Mouse Models', path: '/all-catalog-mouse-models' },
        ]}
      />
    </div>
  );
}
