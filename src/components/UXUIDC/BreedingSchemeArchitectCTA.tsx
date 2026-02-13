'use client';

/**
 * Breeding Scheme Architect CTA Component
 * @version 2.0.0 - Removed GSAP, using CSS animations only
 * Reusable CTA block with "New for 2026" badge
 */

import Link from 'next/link';
import { IconDNA, IconArrowRight } from './Icons';

interface BreedingSchemeArchitectCTAProps {
  variant?: 'dark' | 'light' | 'gradient';
}

export function BreedingSchemeArchitectCTA({ variant = 'gradient' }: BreedingSchemeArchitectCTAProps) {
  const bgStyles = {
    dark: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
    light: '#f7f7f7',
    gradient: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
  };

  const textColor = variant === 'light' ? '#0a253c' : '#ffffff';
  const subtextColor = variant === 'light' ? '#4a4a4a' : 'rgba(255,255,255,0.85)';

  return (
    <section
      className="animate-initial animate-fade-in-up py-8 sm:py-12 lg:py-16 px-5"
      style={{
        background: bgStyles[variant],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,212,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,128,128,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left: Content */}
          <div>
            {/* New for 2026 Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #ffb800 0%, #ff8c00 100%)',
                padding: '6px 14px',
                borderRadius: '20px',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(255,184,0,0.3)',
              }}
            >
              <span
                style={{
                  color: '#000',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                ✦ New for 2026
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl"
              style={{
                color: textColor,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '14px',
              }}
            >
              Breeding Scheme Architect
            </h2>

            <p
              style={{
                color: subtextColor,
                fontFamily: 'var(--system-ui)',
                fontSize: '.95rem',
                fontWeight: 400,
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              Plan complex multi-allele breeding strategies, calculate expected genotype ratios, 
              and estimate time to experimental cohorts—all before starting your project.
            </p>

            {/* Feature bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                'Visualize multi-generation breeding paths',
                'Calculate Mendelian ratios automatically',
                'Estimate timeline to study ready cohorts',
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: variant === 'light' ? '#008080' : 'rgba(0,212,212,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: variant === 'light' ? '#fff' : '#00d4d4', fontSize: '.7rem' }}>✓</span>
                  </div>
                  <span
                    style={{
                      color: subtextColor,
                      fontFamily: 'var(--system-ui)',
                      fontSize: '.85rem',
                      fontWeight: 400,
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
              <Link
                href="/breeding-scheme-architect"
                className="group inline-flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #ffb800 0%, #ff8c00 100%)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(255,184,0,0.3)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                <span>Try It Free</span>
                <IconArrowRight size={16} color="#ffffff" />
              </Link>
              <Link
                href="/schedule-meeting"
                className="inline-flex items-center gap-2"
                style={{
                  background: 'transparent',
                  color: textColor,
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  border: variant === 'light' ? '2px solid #0a253c' : '2px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>Get Expert Help</span>
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div
            style={{
              background: variant === 'light' ? 'white' : 'rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '28px',
              border: variant === 'light' ? '1px solid #e0e0e0' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Mini preview of the tool */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #008080 0%, #00a0a0 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconDNA size={22} color="#ffffff" />
              </div>
              <div>
                <p
                  style={{
                    color: textColor,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.9rem',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Free Research Tool
                </p>
                <p
                  style={{
                    color: subtextColor,
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.75rem',
                    margin: 0,
                  }}
                >
                  No account required
                </p>
              </div>
            </div>

            {/* Fake UI preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Allele 1', example: 'Gene-flox (conditional)' },
                { label: 'Allele 2', example: 'Cre-driver (tissue-specific)' },
                { label: 'Target', example: 'Homozygous knockout' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: variant === 'light' ? '#f7f7f7' : 'rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      color: variant === 'light' ? '#4a4a4a' : 'rgba(255,255,255,0.95)',
                      fontFamily: 'var(--system-ui)',
                      fontSize: '.8rem',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      color: variant === 'light' ? '#008080' : '#00d4d4',
                      fontFamily: 'var(--system-ui)',
                      fontSize: '.8rem',
                      fontWeight: 500,
                    }}
                  >
                    {item.example}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                background: variant === 'light' ? '#e8f5f5' : 'rgba(0,128,128,0.2)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: variant === 'light' ? '#008080' : '#00d4d4',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.85rem',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                → 3 generations to target genotype
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BreedingSchemeArchitectCTA;
