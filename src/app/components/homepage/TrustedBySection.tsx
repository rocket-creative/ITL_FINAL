'use client';

/**
 * Trusted by Researchers Worldwide Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 61-64
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TrustedData {
  title: string;
  stats: string;
  content: string;
  ctaHref: string;
}

export default function TrustedBySection({ data }: { data: TrustedData }) {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(0.1);
  const statsRef = useScrollAnimation<HTMLParagraphElement>(0.1);
  const contentRef = useScrollAnimation<HTMLParagraphElement>(0.1);
  const ctaWrapperRef = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section
      className="flex flex-col justify-start items-center"
      style={{ backgroundColor: 'white', padding: '50px 20px' }}
    >
      <div className="text-center" style={{ maxWidth: '800px' }}>
        {/* Section Title - MASTER TEXT */}
        <h2
          ref={titleRef}
          className="animate-initial animate-fade-in-up"
          style={{
            color: '#2384da',
            letterSpacing: '-.5px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          {data.title}
        </h2>

        {/* Stats Line - MASTER TEXT */}
        <p
          ref={statsRef}
          className="animate-initial animate-fade-in-up animate-delay-150"
          style={{
            color: '#666',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: '1.5',
            marginBottom: '20px',
          }}
        >
          {data.stats}
        </p>

        {/* Content - MASTER TEXT */}
        <p
          ref={contentRef}
          className="animate-initial animate-fade-in-up animate-delay-300"
          style={{
            color: '#666',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
            fontWeight: 400,
            lineHeight: '1.4rem',
            marginBottom: '25px',
          }}
        >
          {data.content}
        </p>

        {/* CTA - Dark Blue */}
        <div ref={ctaWrapperRef} className="animate-initial animate-fade-in-up animate-delay-450">
          <Link
            href={data.ctaHref}
            className="group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              backgroundColor: '#134978',
              color: 'white',
              padding: '10px 20px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
            }}
          >
            <span>View Publications</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
