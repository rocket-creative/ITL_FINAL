/**
 * Hero Section - displays MASTER TEXT exactly
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 * Source: homepage.md lines 8-13
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
    >
      <Image
        src="/images/mouse-hero-glove.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={75}
      />
      <div className="relative z-10 w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
        {/* H1 - MASTER TEXT */}
        <h1
          ref={h1Ref}
          className="animate-initial animate-fade-in-up animate-delay-300 text-3xl sm:text-4xl lg:text-5xl"
          style={{
            color: '#4a4a4a',
            letterSpacing: '-3px',
            fontFamily: 'Poppins, sans-serif',
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
              fontWeight: 400,
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
              fontWeight: 400,
              lineHeight: '1.3rem',
            }}
          >
            {data.description2}
          </p>

          {/* CTA Buttons */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row gap-3 sm:gap-5 animate-initial animate-fade-in-up animate-delay-500">
            <Link
              href={data.cta1.href}
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-6 sm:px-10"
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
              className="group inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-6 sm:px-10"
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
