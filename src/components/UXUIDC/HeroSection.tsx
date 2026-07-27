'use client';

/**
 * |UXUIDC| Hero Section - mobile-first; delegates to PageHero patterns on small screens.
 * @version 5.0.0
 */

import Link from 'next/link';
import Image from 'next/image';

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
    <section className="relative overflow-hidden bg-white lg:min-h-[600px]">
      <Image
        src="/images/mouse-hero-glove.jpg"
        alt=""
        fill
        priority
        sizes="(max-width: 1023px) 0px, 50vw"
        className="hidden lg:block object-cover object-[65%_center]"
        quality={75}
      />

      <div
        className="hidden lg:block absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.35) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Mobile */}
      <div className="lg:hidden px-5 pt-5 pb-6">
        <h1
          className="text-[1.65rem] sm:text-3xl tracking-tight"
          style={{
            color: '#0a253c',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: 1.1,
            margin: '0 0 12px',
          }}
        >
          {headline}
        </h1>

        {description ? (
          <p
            style={{
              color: '#4a4a4a',
              margin: '0 0 15px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              lineHeight: '1.45rem',
            }}
          >
            {description}
          </p>
        ) : null}

        {subDescription ? (
          <p
            className="hidden sm:block"
            style={{
              color: '#4a4a4a',
              margin: '0 0 15px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              lineHeight: '1.45rem',
            }}
          >
            {subDescription}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 mt-2">
          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center justify-center gap-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg px-6 py-3 text-sm"
              style={{ backgroundColor: 'teal', fontFamily: 'var(--system-ui)' }}
            >
              <span>{primaryCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="group inline-flex items-center justify-center gap-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg px-6 py-3 text-sm"
              style={{ backgroundColor: '#134978', fontFamily: 'var(--system-ui)' }}
            >
              <span>{secondaryCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="lg:hidden relative h-44 sm:h-52 w-full">
        <Image
          src="/images/mouse-hero-glove.jpg"
          alt="Research scientist holding a laboratory mouse"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_35%]"
          quality={75}
        />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block relative z-10 w-1/2 p-8">
        <h1
          className="text-4xl xl:text-5xl tracking-tight"
          style={{
            color: '#666',
            letterSpacing: '-2px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: 1,
            margin: '0 0 10px',
          }}
        >
          {headline}
        </h1>

        {(description || subDescription) && (
          <div>
            {description ? (
              <p
                style={{
                  color: '#666',
                  margin: '5px 0 15px',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  lineHeight: '1.3rem',
                }}
              >
                {description}
              </p>
            ) : null}
            {subDescription ? (
              <p
                style={{
                  color: '#666',
                  margin: '5px 0 15px',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  lineHeight: '1.3rem',
                }}
              >
                {subDescription}
              </p>
            ) : null}
          </div>
        )}

        <div className="flex flex-row gap-5">
          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-10"
              style={{
                backgroundColor: 'teal',
                padding: '10px 24px',
                fontFamily: 'var(--system-ui)',
              }}
            >
              <span>{primaryCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-10"
              style={{
                backgroundColor: '#134978',
                padding: '10px 24px',
                fontFamily: 'var(--system-ui)',
              }}
            >
              <span>{secondaryCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
