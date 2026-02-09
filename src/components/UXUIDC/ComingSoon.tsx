/**
 * |UXUIDC| Coming Soon Page Component
 * @version 1.0.0
 * @description Reusable "coming soon" placeholder for pages awaiting content
 */

'use client';

import Link from 'next/link';
import { IconChevronRight, IconTarget, IconMessageCircle } from './Icons';

interface ComingSoonProps {
  title: string;
  description?: string;
  category?: string;
  relatedLinks?: Array<{ label: string; href: string }>;
}

export default function ComingSoon({
  title,
  description = 'This page is currently under development. Content will be available soon.',
  category,
  relatedLinks = [],
}: ComingSoonProps) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <main id="main-content" style={{ minHeight: '70vh', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          {/* Icon */}
          <div style={{ marginBottom: '32px' }}>
            <IconTarget size={64} color="#008080" />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          {/* Category Badge */}
          {category && (
            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: '#f0f9f9',
                color: '#008080',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {category}
            </div>
          )}

          {/* Description */}
          <p
            style={{
              fontSize: '1.1rem',
              color: '#666',
              lineHeight: 1.6,
              marginBottom: '40px',
            }}
          >
            {description}
          </p>

          {/* Related Links */}
          {relatedLinks.length > 0 && (
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e0e0e0' }}>
              <h2
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#0a253c',
                  marginBottom: '20px',
                }}
              >
                Related Resources
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'center',
                }}
              >
                {relatedLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#008080',
                      fontSize: '1rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#006666')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#008080')}
                  >
                    {link.label}
                    <IconChevronRight size={16} color="currentColor" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: '48px' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                background: '#008080',
                color: '#fff',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#006666';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#008080';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <IconMessageCircle size={18} color="#fff" />
              Contact Us for More Information
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
