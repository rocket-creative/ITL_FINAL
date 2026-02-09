'use client';

/**
 * PublicationCard Component
 * 
 * Displays a publication entry with optional PubMed link.
 * Used across disease pages, technology pages, and the main publications page.
 * 
 * IMPORTANT: All publications listed should be verified as using ITL mouse models.
 * PubMed links should be verified before adding.
 */

import React from 'react';
import { IconExternalLink } from './Icons';

export interface PublicationData {
  authors: string;
  year: string | number;
  title: string;
  journal: string;
  volume?: string;
  link?: string; // PubMed or DOI link
  pmid?: string; // PubMed ID for easy lookup
}

interface PublicationCardProps {
  publication: PublicationData;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'compact';
}

export function PublicationCard({ 
  publication, 
  className = '', 
  style,
  variant = 'default' 
}: PublicationCardProps) {
  const { authors, year, title, journal, volume, link, pmid } = publication;
  
  // Construct PubMed link from PMID if link not provided but PMID is
  const pubmedLink = link || (pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : undefined);

  if (variant === 'compact') {
    return (
      <div 
        className={className}
        style={{
          padding: '16px 0',
          borderBottom: '1px solid #f0f0f0',
          ...style
        }}
      >
        <p style={{
          fontSize: '.85rem',
          color: '#666',
          marginBottom: '6px',
          lineHeight: 1.6
        }}>
          {authors} ({year}).
        </p>
        {pubmedLink ? (
          <a
            href={pubmedLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'flex-start',
              gap: '6px',
              fontSize: '.95rem',
              color: '#008080',
              fontWeight: 500,
              marginBottom: '6px',
              lineHeight: 1.5,
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {title}
            <IconExternalLink size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
          </a>
        ) : (
          <p style={{
            fontSize: '.95rem',
            color: '#333',
            fontWeight: 500,
            marginBottom: '6px',
            lineHeight: 1.5
          }}>
            {title}
          </p>
        )}
        <p style={{
          fontSize: '.85rem',
          color: '#666',
          fontStyle: 'italic'
        }}>
          <em>{journal}</em>
          {volume && <span style={{ fontStyle: 'normal' }}> {volume}</span>}
        </p>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`${className} hover-card-sm`}
      style={{
        backgroundColor: '#f8f9fa',
        padding: '20px 24px',
        borderRadius: '8px',
        borderLeft: '4px solid #2384da',
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      <p style={{ 
        color: '#555', 
        fontSize: '.85rem', 
        marginBottom: '8px',
        lineHeight: '1.6' 
      }}>
        <span style={{ color: '#0a253c', fontWeight: 500 }}>{authors}</span> ({year}).
      </p>
      {pubmedLink ? (
        <a
          href={pubmedLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            fontSize: '.95rem',
            color: '#008080',
            fontWeight: 600,
            marginBottom: '8px',
            lineHeight: '1.5',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          <span>{title}</span>
          <IconExternalLink size={14} color="#008080" style={{ flexShrink: 0, marginTop: '4px' }} />
        </a>
      ) : (
        <p style={{
          fontSize: '.95rem',
          color: '#333',
          fontWeight: 600,
          marginBottom: '8px',
          lineHeight: '1.5'
        }}>
          {title}
        </p>
      )}
      <p style={{ 
        color: '#666', 
        fontSize: '.85rem',
        fontStyle: 'italic'
      }}>
        <em>{journal}</em>
        {volume && <span style={{ fontStyle: 'normal' }}> {volume}</span>}
      </p>
    </div>
  );
}

/**
 * PublicationList Component
 * 
 * Renders a list of publications with a heading.
 */
interface PublicationListProps {
  title: string;
  subtitle?: string;
  publications: PublicationData[];
  showViewAllLink?: boolean;
  variant?: 'default' | 'compact';
  maxItems?: number;
}

export function PublicationList({
  title,
  subtitle,
  publications,
  showViewAllLink = true,
  variant = 'default',
  maxItems
}: PublicationListProps) {
  const displayPublications = maxItems ? publications.slice(0, maxItems) : publications;

  return (
    <div>
      <h2 style={{ 
        color: '#2384da', 
        fontFamily: 'Poppins, sans-serif', 
        fontSize: '1.8rem', 
        fontWeight: 700, 
        marginBottom: subtitle ? '10px' : '24px' 
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ 
          color: '#555', 
          fontSize: '.95rem', 
          marginBottom: '24px',
          lineHeight: '1.7'
        }}>
          {subtitle}
        </p>
      )}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: variant === 'compact' ? '0' : '16px' 
      }}>
        {displayPublications.map((pub, index) => (
          <PublicationCard
            key={index}
            publication={pub}
            variant={variant}
            className="animate-in"
          />
        ))}
      </div>

      {showViewAllLink && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href="/publications"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#2384da',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.3s ease'
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
  );
}

export default PublicationCard;
