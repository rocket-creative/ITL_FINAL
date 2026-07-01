/**
 * Hero Section - displays MASTER TEXT exactly
 * @version 4.0.0 - Mobile-first layout with readable content panel
 * Source: homepage.md lines 8-13
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroData {
  headline: string;
  description1: string;
  description2: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
}

const bodyStyle = {
  color: '#4a4a4a',
  marginTop: '5px',
  marginBottom: '15px',
  fontFamily: 'var(--system-ui)',
  fontSize: '.9rem',
  fontWeight: 400,
  lineHeight: '1.45rem',
} as const;

const h1Style = {
  color: '#0a253c',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  lineHeight: 1.1,
  marginTop: 0,
  marginBottom: '12px',
} as const;

function useHeroReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.querySelectorAll('.animate-initial').forEach((el) => {
      el.classList.remove('animate-initial');
    });
  }, []);

  return sectionRef;
}

export default function HeroSection({ data }: { data: HeroData }) {
  const sectionRef = useHeroReveal();

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white lg:min-h-[600px]">
      {/* Desktop background image */}
      <Image
        src="/images/mouse-hero-glove.jpg"
        alt=""
        fill
        priority
        sizes="(max-width: 1023px) 0px, 50vw"
        className="hidden lg:block object-cover object-[65%_center]"
        quality={75}
      />

      {/* Desktop gradient for text legibility */}
      <div
        className="hidden lg:block absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.35) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Mobile: readable content panel */}
      <div className="lg:hidden px-5 pt-5 pb-6">
        <h1
          className="animate-fade-in-up text-[1.65rem] sm:text-3xl tracking-tight"
          style={h1Style}
        >
          {data.headline}
        </h1>

        <p className="animate-fade-in-up animate-delay-100" style={bodyStyle}>
          {data.description1}
        </p>

        <p className="animate-fade-in-up animate-delay-150 hidden sm:block" style={bodyStyle}>
          {data.description2}
        </p>

        <div className="flex flex-col gap-3 mt-2 animate-fade-in-up animate-delay-200">
          <Link
            href={data.cta1.href}
            className="group inline-flex items-center justify-center gap-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg px-6 py-3 text-sm"
            style={{ backgroundColor: 'teal', fontFamily: 'var(--system-ui)', fontWeight: 400 }}
          >
            <span>{data.cta1.label}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href={data.cta2.href}
            className="group inline-flex items-center justify-center gap-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg px-6 py-3 text-sm"
            style={{ backgroundColor: '#134978', fontFamily: 'var(--system-ui)', fontWeight: 400 }}
          >
            <span>{data.cta2.label}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Mobile: hero image band */}
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

      {/* Desktop content overlay */}
      <div className="hidden lg:block relative z-10 w-1/2 p-8">
        <h1
          className="animate-fade-in-up animate-delay-300 text-4xl xl:text-5xl tracking-tight"
          style={{ ...h1Style, letterSpacing: '-2px' }}
        >
          {data.headline}
        </h1>

        <div>
          <p className="animate-fade-in-up animate-delay-400" style={bodyStyle}>
            {data.description1}
          </p>

          <p className="animate-fade-in-up animate-delay-450" style={bodyStyle}>
            {data.description2}
          </p>

          <div className="flex flex-row gap-5 animate-fade-in-up animate-delay-500">
            <Link
              href={data.cta1.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-10"
              style={{
                backgroundColor: 'teal',
                padding: '10px 24px',
                fontFamily: 'var(--system-ui)',
                fontWeight: 400,
              }}
            >
              <span>{data.cta1.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={data.cta2.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-10"
              style={{
                backgroundColor: '#134978',
                padding: '10px 24px',
                fontFamily: 'var(--system-ui)',
                fontWeight: 400,
              }}
            >
              <span>{data.cta2.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
