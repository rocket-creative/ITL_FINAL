/**
 * Hero Section - displays MASTER TEXT exactly
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 * Source: homepage.md lines 8-13
 */

'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface HeroData {
  headline: string;
  description1: string;
  description2: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
}

export default function HeroSection({ data }: { data: HeroData }) {
  const h1Ref = useScrollAnimation<HTMLHeadingElement>(0.1);
  const p1Ref = useScrollAnimation<HTMLParagraphElement>(0.1);
  const p2Ref = useScrollAnimation<HTMLParagraphElement>(0.1);
  const ctasRef = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section
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
          ref={h1Ref}
          className="animate-initial animate-fade-in-up animate-delay-300"
          style={{
            color: '#4a4a4a',
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

        <div>
          {/* Description 1 - MASTER TEXT */}
          <p
            ref={p1Ref}
            className="animate-initial animate-fade-in-up animate-delay-400"
            style={{
              color: '#4a4a4a',
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
            ref={p2Ref}
            className="animate-initial animate-fade-in-up animate-delay-450"
            style={{
              color: '#4a4a4a',
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
          <div ref={ctasRef} className="flex flex-row gap-5 animate-initial animate-fade-in-up animate-delay-500">
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
