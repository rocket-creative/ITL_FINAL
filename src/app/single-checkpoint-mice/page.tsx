'use client';

import {
  UXUIDCNavigation,
  UXUIDCFooter,
  CatalogSearch,
} from '@/components/UXUIDC';
import Link from 'next/link';
import { IconChevronRight } from '@/components/UXUIDC/Icons';

export default function SingleCheckpointMicePage() {
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
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>Catalog Models</span>
            </div>
            <h1 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
            }}>
              Single Checkpoint Humanized Mice
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              Single immune checkpoint humanized mouse models express one human checkpoint protein, enabling preclinical testing of checkpoint inhibitor antibodies in immunocompetent mice.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/request-quote" style={{
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
                Request a Quote
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
            </div>
          </div>
        </section>

        {/* Catalog Search Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <CatalogSearch maxResults={15} showTitle={true} />
          </div>
        </section>

        {/* Top 5 Most Searched Models */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px 40px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '10px'
              }}>
                Most Searched Single Checkpoint Models
              </h2>
              <p style={{
                fontSize: '.9rem',
                color: '#666',
                lineHeight: 1.6
              }}>
                Popular humanized immune checkpoint models for immunotherapy research
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                { name: 'PD1 Humanized', gene: 'PDCD1', href: '/pd1-humanized-mice', description: 'Most requested for checkpoint inhibitor studies' },
                { name: 'PDL1 Humanized', gene: 'CD274', href: '/pdl1-humanized-mice', description: 'Essential for PDL1 antibody testing' },
                { name: 'CTLA4 Humanized', gene: 'CTLA4', href: '/ctla4-humanized-mice', description: 'Classic checkpoint blockade model' },
                { name: 'LAG3 Humanized', gene: 'CD223', href: '/lag3-humanized-mice', description: 'Emerging checkpoint target' },
                { name: 'TIM3 Humanized', gene: 'HAVCR2', href: '/tim3-humanized-mice', description: 'Next generation checkpoint' },
              ].map((model, index) => (
                <Link key={index} href={model.href} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  border: '2px solid #008080',
                  borderRadius: '8px',
                  padding: '20px',
                  fontSize: '.95rem',
                  fontWeight: 500,
                  color: '#333',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }} className="hover:shadow-lg hover:-translate-y-1">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#0a253c' }}>{model.name}</span>
                    <span style={{
                      backgroundColor: '#008080',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '.7rem',
                      fontWeight: 600
                    }}>{model.gene}</span>
                  </div>
                  <p style={{ fontSize: '.8rem', color: '#666', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                    {model.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                    <span style={{ fontSize: '.85rem', color: '#008080', fontWeight: 600 }}>Learn more</span>
                    <IconChevronRight size={14} color="#008080" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Available Single Checkpoint Models */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '10px'
              }}>
                All Single Checkpoint Models
              </h2>
              <p style={{
                fontSize: '.9rem',
                color: '#666',
                lineHeight: 1.6
              }}>
                Complete list of available humanized checkpoint models. Click any model to view details or <Link href="/order-catalog-models" style={{ color: '#008080', fontWeight: 600, textDecoration: 'underline' }}>request an order inquiry</Link>.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { name: 'PD1 Humanized', href: '/pd1-humanized-mice' },
                { name: 'PDL1 Humanized', href: '/pdl1-humanized-mice' },
                { name: 'CTLA4 Humanized', href: '/ctla4-humanized-mice' },
                { name: 'LAG3 Humanized', href: '/lag3-humanized-mice' },
                { name: 'TIM3 Humanized', href: '/tim3-humanized-mice' },
                { name: 'TIGIT Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'CD47 Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'VISTA Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'B7H3 Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'B7H4 Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'BTLA Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'GITR Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'OX40 Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'ICOS Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'CD27 Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'CD40 Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'HVEM Humanized', href: '/humanized-immune-checkpoint-mice' },
                { name: 'SIRPα Humanized', href: '/humanized-immune-checkpoint-mice' },
              ].map((model, index) => (
                <Link key={index} href={model.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#f7f7f7',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '14px 16px',
                  fontSize: '.9rem',
                  fontWeight: 500,
                  color: '#333',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }} className="hover:border-teal-600 hover:bg-white">
                  <span>{model.name}</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              ))}
            </div>
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <Link href="/order-catalog-models" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#008080',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }} className="hover:shadow-lg hover:-translate-y-1">
                Order Inquiry for Catalog Models
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
    </div>
  );
}
