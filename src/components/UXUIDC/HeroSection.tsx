/**
 * |UXUIDC| Hero Section - Matches Webflow Design Exactly
 * @version 4.0.0 - Removed GSAP, using CSS animations only
 * Full background image, H1 grey, buttons teal + med-blue
 */

'use client';

import Link from 'next/link';

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
  return (
    <section 
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
          className="animate-initial animate-fade-in-up animate-delay-300"
          style={{ 
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
          <div className="animate-initial animate-fade-in-up animate-delay-400">
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
        <div className="flex flex-row gap-5">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-initial animate-fade-in-up animate-delay-500"
              style={{ 
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
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-initial animate-fade-in-up animate-delay-600"
              style={{ 
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
