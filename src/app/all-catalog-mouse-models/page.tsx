'use client';

import {
  UXUIDCNavigation,
  UXUIDCFooter,
  CatalogSearch,
} from '@/components/UXUIDC';
import Link from 'next/link';
import { IconChevronRight, IconLayers } from '@/components/UXUIDC/Icons';

export default function AllCatalogMouseModelsPage() {
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
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>10,000+ Models</span>
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
              Search our extensive catalog of over 10,000 genetically engineered mouse models including knockout, knockin, humanized, Cre driver, and reporter strains for biomedical research and drug development.
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

        {/* Catalog Search Section - Prominent */}
        <section style={{ background: '#ffffff', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <CatalogSearch maxResults={25} showTitle={true} />
          </div>
        </section>

        {/* Quick Links */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Browse by Category
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
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
                  background: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  fontSize: '.9rem',
                  fontWeight: 500,
                  color: '#333',
                  textDecoration: 'none',
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
    </div>
  );
}
