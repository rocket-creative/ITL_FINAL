/**
 * Publication Rendering Utilities
 * 
 * Reusable publication rendering that supports PubMed links.
 * Use this in pages that display publications.
 * 
 * USAGE:
 * import { renderPublications } from '@/utils/publicationRenderer';
 * 
 * In your component:
 * {renderPublications(publicationsData)}
 */

import React from 'react';

export interface PagePublication {
  authors: string;
  year: string | number;
  title: string;
  journal: string;
  volume?: string;
  link?: string;  // PubMed URL
}

/**
 * Renders a list of publications with proper formatting and PubMed links
 */
export function renderPublications(publications: PagePublication[]) {
  return publications.map((pub, index) => (
    <div
      key={index}
      className="animate-in"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '25px',
        borderRadius: '8px',
        borderLeft: '4px solid #2384da'
      }}
    >
      <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '8px' }}>
        <span style={{ color: '#0a253c', fontWeight: 500 }}>{pub.authors}</span> ({pub.year}).
      </p>
      {pub.link ? (
        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            fontSize: '.95rem',
            color: '#008080',
            fontWeight: 600,
            marginBottom: '8px',
            lineHeight: '1.5',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          {pub.title} ↗
        </a>
      ) : (
        <p style={{ fontSize: '.95rem', color: '#333', fontWeight: 600, marginBottom: '8px', lineHeight: '1.5' }}>
          {pub.title}
        </p>
      )}
      <p style={{ color: '#666', fontSize: '.85rem', fontStyle: 'italic' }}>
        <em>{pub.journal}</em>
        {pub.volume && <span style={{ fontStyle: 'normal' }}> {pub.volume}</span>}
      </p>
    </div>
  ));
}

/**
 * Publication section wrapper
 */
export function PublicationSection({ 
  title,
  subtitle,
  publications,
  showViewAll = true
}: {
  title: string;
  subtitle: string;
  publications: PagePublication[];
  showViewAll?: boolean;
}) {
  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 className="animate-in" style={{ 
          color: '#2384da', 
          fontFamily: 'Poppins, sans-serif', 
          fontSize: '2rem', 
          fontWeight: 700, 
          marginBottom: '10px' 
        }}>
          {title}
        </h2>
        <p className="animate-in" style={{ 
          color: '#555', 
          fontSize: '.95rem', 
          marginBottom: '30px' 
        }}>
          {subtitle}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {renderPublications(publications)}
        </div>

        {showViewAll && (
          <div className="animate-in text-center" style={{ marginTop: '25px' }}>
            <a
              href="/publications"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                backgroundColor: '#2384da',
                color: 'white',
                padding: '10px 25px',
                borderRadius: '4px',
                fontSize: '.85rem',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              <span>View All Publications</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
