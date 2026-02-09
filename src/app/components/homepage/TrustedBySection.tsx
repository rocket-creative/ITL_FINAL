/**
 * Trusted by Researchers Worldwide Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 61-64
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

interface TrustedData {
  title: string;
  stats: string;
  content: string;
  ctaHref: string;
}

export default function TrustedBySection({ data }: { data: TrustedData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-trust');
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-start items-center"
      style={{ backgroundColor: 'white', padding: '50px 20px' }}
    >
      <div ref={contentRef} className="text-center" style={{ maxWidth: '800px' }}>
        {/* Section Title - MASTER TEXT */}
        <h2
          className="animate-trust"
          style={{
            opacity: 0,
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
          className="animate-trust"
          style={{
            opacity: 0,
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
          className="animate-trust"
          style={{
            opacity: 0,
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
        <Link
          href={data.ctaHref}
          className="animate-trust group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          style={{
            opacity: 0,
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
    </section>
  );
}
