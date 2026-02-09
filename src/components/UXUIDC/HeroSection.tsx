/**
 * |UXUIDC| Hero Section - Matches Webflow Design Exactly
 * @version 3.0.0
 * Full background image, H1 grey, buttons teal + med-blue
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

interface HeroSectionProps {
  headline: string;
  description?: string;
  subDescription?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function UXUIDCHeroSection({
  headline,
  description,
  subDescription,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation
      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.3
      );

      // Description animation
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.5'
        );
      }

      // CTA buttons animation
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/mouse-hero-blue.jpg)',
        backgroundPosition: '0 0',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '600px'
      }}
    >
      {/* Content - 50% width, left side */}
      <div className="w-1/2 p-5">
        <h1 
          ref={headlineRef}
          style={{ 
            opacity: 0, 
            color: '#666',
            letterSpacing: '-3px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '3rem',
            fontWeight: 400,
            lineHeight: 1,
            marginTop: 0,
            marginBottom: '10px'
          }}
        >
          {headline}
        </h1>
        
        {(description || subDescription) && (
          <div ref={descriptionRef} style={{ opacity: 0 }}>
            {description && (
              <p 
                style={{ 
                  color: '#666',
                  marginTop: '5px',
                  marginBottom: '15px',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                  fontSize: '.9rem',
                  fontWeight: 200,
                  lineHeight: '1.3rem'
                }}
              >
                {description}
              </p>
            )}
            {subDescription && (
              <p 
                style={{ 
                  color: '#666',
                  marginTop: '5px',
                  marginBottom: '15px',
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                  fontSize: '.9rem',
                  fontWeight: 200,
                  lineHeight: '1.3rem'
                }}
              >
                {subDescription}
              </p>
            )}
          </div>
        )}
        
        {/* CTA Buttons wrapper - horizontal flex with gap */}
        <div ref={ctaRef} className="flex flex-row gap-5">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                opacity: 0, 
                backgroundColor: 'teal',
                padding: '10px 40px',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                fontWeight: 400,
                marginTop: 'auto',
                marginBottom: '10px',
                boxShadow: '0 4px 15px rgba(0, 128, 128, 0.3)'
              }}
            >
              <span>{primaryCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ 
                opacity: 0,
                backgroundColor: '#134978',
                padding: '10px 40px',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                fontWeight: 400,
                marginTop: 'auto',
                marginBottom: '10px',
                boxShadow: '0 4px 15px rgba(19, 73, 120, 0.3)'
              }}
            >
              <span>{secondaryCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
