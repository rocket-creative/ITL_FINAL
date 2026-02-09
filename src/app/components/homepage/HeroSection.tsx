/**
 * Hero Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 8-13
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

interface HeroData {
  headline: string;
  description1: string;
  description2: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
}

export default function HeroSection({ data }: { data: HeroData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.3);
      
      if (contentRef.current) {
        tl.fromTo(contentRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 }, '-=0.5');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/mouse-hero-glove.jpg)',
        backgroundPosition: '0 0',
        backgroundSize: 'auto',
        minHeight: '600px',
      }}
    >
      <div className="w-1/2 p-5">
        {/* H1 - MASTER TEXT */}
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
            marginBottom: '10px',
          }}
        >
          {data.headline}
        </h1>

        <div ref={contentRef}>
          {/* Description 1 - MASTER TEXT */}
          <p
            style={{
              opacity: 0,
              color: '#666',
              marginTop: '5px',
              marginBottom: '15px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 200,
              lineHeight: '1.3rem',
            }}
          >
            {data.description1}
          </p>

          {/* Description 2 - MASTER TEXT */}
          <p
            style={{
              opacity: 0,
              color: '#666',
              marginTop: '5px',
              marginBottom: '15px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 200,
              lineHeight: '1.3rem',
            }}
          >
            {data.description2}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-5" style={{ opacity: 0 }}>
            <Link
              href={data.cta1.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: 'teal',
                padding: '10px 40px',
                fontFamily: 'var(--system-ui)',
                fontWeight: 400,
              }}
            >
              <span>{data.cta1.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={data.cta2.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: '#134978',
                padding: '10px 40px',
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
