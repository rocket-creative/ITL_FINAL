'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import { IconImage } from './Icons';

// Memoized placeholder content component - extracted outside to prevent recreation on every render
interface PlaceholderContentProps {
  variant: 'hero' | 'section' | 'inline';
  iconColor: string;
  textColor: string;
  title: string;
}

const PlaceholderContent = memo(function PlaceholderContent({
  variant,
  iconColor,
  textColor,
  title,
}: PlaceholderContentProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <IconImage size={variant === 'hero' ? 60 : 50} color={iconColor} />
      <span
        style={{
          color: textColor,
          fontSize: '.8rem',
          marginTop: '10px',
          textAlign: 'center',
          padding: '0 15px',
        }}
      >
        {title}
      </span>
    </div>
  );
});

export interface DiagramPlaceholderProps {
  /** Unique figure ID for tracking (e.g., "fig-cre-lox-001") */
  figureId: string;
  /** Aspect ratio: "4:3" for landscape, "1:1" for square */
  aspectRatio?: '4:3' | '1:1' | '3:4';
  /** Short title shown in placeholder */
  title: string;
  /** Figure caption displayed below (e.g., "Fig. 1: Shows the Cre-lox recombination mechanism") */
  caption: string;
  /** Visual style variant */
  variant?: 'hero' | 'section' | 'inline';
  /** Alt text for accessibility (also used for AI generation prompt context) */
  altText?: string;
}

/**
 * ScientificDiagramPlaceholder Component
 * 
 * Displays scientific diagrams from /images/diagrams/ directory.
 * Each diagram is tracked in SCIENTIFIC-DIAGRAMS-TRACKER.md.
 * 
 * SEO Benefits:
 * - Semantic figure/figcaption HTML for better indexing
 * - Descriptive alt text for accessibility and image search
 * - Structured content improves page quality signals
 * - Optimized Next.js Image component for performance
 */
export function ScientificDiagramPlaceholder({
  figureId,
  aspectRatio = '4:3',
  title,
  caption,
  variant = 'section',
  altText,
}: DiagramPlaceholderProps) {
  const [imageError, setImageError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    triggerButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', onEscape);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox]);

  const aspectRatioValue = {
    '4:3': '4/3',
    '1:1': '1/1',
    '3:4': '3/4',
  }[aspectRatio];

  // Use -v2 suffix to force CDN cache invalidation
  const imagePath = `/images/diagrams/${figureId}-v2.png`;
  const lightboxImagePath = `/images/diagrams/${figureId}-v2.png`;
  
  const variantStyles = {
    hero: {
      border: '2px dashed rgba(255,255,255,0.4)',
      backgroundColor: 'rgba(255,255,255,0.05)',
      iconColor: 'rgba(255,255,255,0.4)',
      textColor: 'rgba(255,255,255,0.5)',
      captionColor: 'rgba(255,255,255,0.7)',
    },
    section: {
      border: '2px dashed #ccc',
      backgroundColor: '#fafafa',
      iconColor: '#ccc',
      textColor: '#999',
      captionColor: '#666',
    },
    inline: {
      border: '2px dashed #e0e0e0',
      backgroundColor: 'white',
      iconColor: '#d0d0d0',
      textColor: '#aaa',
      captionColor: '#666',
    },
  }[variant];

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) closeLightbox();
    },
    [closeLightbox]
  );

  const handleLightboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusables = e.currentTarget.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    []
  );

  const lightboxNode =
    typeof document !== 'undefined' &&
    lightboxOpen &&
    !imageError &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged diagram. Click outside the image or press Escape to close."
        tabIndex={-1}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-6 outline-none"
        onClick={handleBackdropClick}
        onKeyDown={handleLightboxKeyDown}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closeLightbox}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-[#333] transition hover:bg-white focus:outline focus:ring-2 focus:ring-[var(--blue)] focus:ring-offset-2 focus:ring-offset-transparent md:right-4 md:top-4"
          aria-label="Close enlarged view"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div
          className="relative max-h-[90vh] w-full max-w-5xl cursor-default bg-white rounded-lg p-4"
          onClick={closeLightbox}
          role="presentation"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxImagePath}
            alt={altText || title}
            className="max-h-[90vh] w-auto max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
      </div>,
      document.body
    );

  return (
    <figure
      data-figure-id={figureId}
      style={{ margin: 0 }}
      aria-label={altText || title}
    >
      <button
        ref={triggerButtonRef}
        type="button"
        onClick={() => !imageError && setLightboxOpen(true)}
        className="group block w-full cursor-pointer rounded-lg border-none text-left outline-offset-2 focus:outline focus:ring-2 focus:ring-[var(--blue)]"
        aria-label={`View full size: ${altText || title}`}
      >
        <div
          style={{
            border: variantStyles.border,
            borderRadius: '8px',
            aspectRatio: aspectRatioValue,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF', // Always white background for diagrams
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s ease',
          }}
          className="group-hover:border-[var(--blue)] group-focus:border-[var(--blue)]"
        >
          {!imageError ? (
            <Image
              src={imagePath}
              alt={altText || title}
              fill
              style={{
                objectFit: 'contain',
                padding: variant === 'hero' ? '10px' : '8px',
              }}
              sizes={variant === 'hero' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
              onError={() => setImageError(true)}
              priority={variant === 'hero'}
            />
          ) : (
            <PlaceholderContent
              variant={variant}
              iconColor={variantStyles.iconColor}
              textColor={variantStyles.textColor}
              title={title}
            />
          )}
          {!imageError && (
            <span
              className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs font-normal text-white opacity-0 transition group-hover:opacity-100 group-focus:opacity-100 md:bottom-3 md:right-3 max-md:opacity-100"
              aria-hidden
            >
              View full size
            </span>
          )}
        </div>
      </button>
      {lightboxNode}
      <figcaption
        style={{
          color: variantStyles.captionColor,
          fontSize: '.8rem',
          fontStyle: 'italic',
          marginTop: '8px',
          textAlign: 'center',
          lineHeight: '1.4',
        }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

export default ScientificDiagramPlaceholder;
