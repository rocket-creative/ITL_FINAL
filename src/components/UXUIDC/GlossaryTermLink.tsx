'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { glossaryTerms, getTermBySlug } from '@/data/glossaryTerms';

// Brand colors
const BRAND = {
  teal: '#008080',
  tealLight: '#00d4d4',
  white: '#ffffff',
  lightGray: '#f7f7f7',
  darkGray: '#333333',
  mediumGray: '#666666',
};

interface GlossaryTermLinkProps {
  /** The slug of the glossary term (e.g., "cre-lox-system") */
  term: string;
  /** Custom display text (defaults to the term name from glossary) */
  children?: React.ReactNode;
  /** Show tooltip on hover (default: true) */
  showTooltip?: boolean;
  /** Inline styling - no underline, just teal text (default: false) */
  inline?: boolean;
}

/**
 * GlossaryTermLink - A reusable component for linking to glossary terms
 * 
 * Usage:
 * <GlossaryTermLink term="cre-lox-system" />
 * <GlossaryTermLink term="cre-lox-system">Cre-lox recombination</GlossaryTermLink>
 * <GlossaryTermLink term="knockout-mouse-models" inline />
 */
export function GlossaryTermLink({ 
  term, 
  children, 
  showTooltip = true,
  inline = false 
}: GlossaryTermLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');
  const linkRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Get the term data
  const termData = getTermBySlug(term);

  // Determine tooltip position based on viewport
  // Using useLayoutEffect for synchronous DOM measurements before paint
  // This is a valid pattern: measuring DOM after render requires an effect
  useLayoutEffect(() => {
    if (!termData || !isHovered || !linkRef.current) return;
    
    const rect = linkRef.current.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    
    // If less than 200px above, show tooltip below
    const newPosition = (spaceAbove < 200 && spaceBelow > spaceAbove) ? 'bottom' : 'top';
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid: DOM measurement requires effect
    setTooltipPosition(newPosition);
  }, [isHovered, termData]);

  // If term not found, just render children as plain text
  if (!termData) {
    console.warn(`GlossaryTermLink: Term "${term}" not found in glossary`);
    return <span>{children || term}</span>;
  }

  const displayText = children || termData.term;

  return (
    <span 
      style={{ position: 'relative', display: 'inline' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        ref={linkRef}
        href={`/mouse-genetics-glossary/${termData.slug}`}
        style={{
          color: BRAND.teal,
          textDecoration: inline ? 'none' : 'underline',
          textDecorationStyle: 'dotted',
          textDecorationColor: 'rgba(0,128,128,0.4)',
          textUnderlineOffset: '2px',
          fontWeight: inline ? 'inherit' : 500,
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
      >
        {displayText}
      </Link>

      {/* Tooltip */}
      {showTooltip && isHovered && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            ...(tooltipPosition === 'top' 
              ? { bottom: '100%', marginBottom: '8px' }
              : { top: '100%', marginTop: '8px' }
            ),
            width: '300px',
            maxWidth: '90vw',
            background: BRAND.white,
            border: `1px solid ${BRAND.teal}`,
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
        >
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            ...(tooltipPosition === 'top' 
              ? { 
                  bottom: '-8px',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: `8px solid ${BRAND.teal}`
                }
              : { 
                  top: '-8px',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: `8px solid ${BRAND.teal}`
                }
            ),
            width: 0,
            height: 0
          }} />

          {/* Category Badge */}
          <div style={{
            fontSize: '.7rem',
            fontWeight: 600,
            color: BRAND.teal,
            background: 'rgba(0,128,128,0.1)',
            padding: '3px 8px',
            borderRadius: '10px',
            display: 'inline-block',
            marginBottom: '8px'
          }}>
            {termData.category}
          </div>

          {/* Term Title */}
          <h4 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '.95rem',
            fontWeight: 600,
            color: BRAND.darkGray,
            margin: '0 0 8px 0'
          }}>
            {termData.term}
          </h4>

          {/* Definition (truncated) */}
          <p style={{
            fontSize: '.8rem',
            color: BRAND.mediumGray,
            lineHeight: 1.5,
            margin: '0 0 10px 0',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {termData.definition}
          </p>

          {/* Read More Link */}
          <div style={{
            fontSize: '.75rem',
            color: BRAND.teal,
            fontWeight: 600
          }}>
            Click to learn more →
          </div>
        </div>
      )}
    </span>
  );
}

/**
 * GlossaryHighlight - Automatically finds and links glossary terms in text
 * Use sparingly - only for blocks of educational content
 * 
 * Usage:
 * <GlossaryHighlight text="The Cre-lox system enables conditional knockout..." />
 */
interface GlossaryHighlightProps {
  text: string;
  /** Maximum number of terms to highlight (default: 5) */
  maxHighlights?: number;
  /** Show tooltips on highlighted terms (default: true) */
  showTooltips?: boolean;
}

export function GlossaryHighlight({ 
  text, 
  maxHighlights = 5,
  showTooltips = true 
}: GlossaryHighlightProps) {
  // Sort terms by length (longest first) to avoid partial matches
  const sortedTerms = [...glossaryTerms].sort((a, b) => b.term.length - a.term.length);
  
  // Track which terms we've already highlighted
  const highlightedTerms = new Set<string>();
  const replacements: { original: string; slug: string; term: string }[] = [];

  // Find terms to highlight (limit to maxHighlights)
  for (const termData of sortedTerms) {
    if (highlightedTerms.size >= maxHighlights) break;
    
    // Create regex that matches the term (case-insensitive, whole word)
    const regex = new RegExp(`\\b${escapeRegex(termData.term)}\\b`, 'gi');
    
    if (regex.test(text) && !highlightedTerms.has(termData.slug)) {
      highlightedTerms.add(termData.slug);
      replacements.push({
        original: termData.term,
        slug: termData.slug,
        term: termData.term
      });
    }
  }

  // If no terms found, return plain text
  if (replacements.length === 0) {
    return <span>{text}</span>;
  }

  // Split text and create elements
  const elements: React.ReactNode[] = [];
  let remainingText = text;
  let key = 0;

  for (const replacement of replacements) {
    const regex = new RegExp(`\\b(${escapeRegex(replacement.original)})\\b`, 'i');
    const match = remainingText.match(regex);
    
    if (match && match.index !== undefined) {
      // Add text before the match
      if (match.index > 0) {
        elements.push(<span key={key++}>{remainingText.slice(0, match.index)}</span>);
      }
      
      // Add the glossary link
      elements.push(
        <GlossaryTermLink 
          key={key++} 
          term={replacement.slug}
          showTooltip={showTooltips}
        >
          {match[1]}
        </GlossaryTermLink>
      );
      
      remainingText = remainingText.slice(match.index + match[1].length);
    }
  }

  // Add any remaining text
  if (remainingText) {
    elements.push(<span key={key++}>{remainingText}</span>);
  }

  return <>{elements}</>;
}

// Helper function to escape special regex characters
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Export term lookup for use in other components
export { getTermBySlug, glossaryTerms };
