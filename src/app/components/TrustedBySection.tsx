/**
 * Trusted by Researchers Worldwide Section - from homepage.md
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

export default function TrustedBySection() {
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
      style={{
        backgroundColor: '#f7f7f7',
        padding: '50px 20px',
      }}
    >
      <div ref={contentRef} className="text-center" style={{ maxWidth: '800px' }}>
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
          Trusted by Researchers Worldwide
        </h2>
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
          Since 1998 · 2,500+ Projects Completed · 800+ Peer Reviewed Publications · Nature · Science · Cell
        </p>
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
          ingenious targeting laboratory has generated custom mouse models for researchers at leading academic institutions, pharmaceutical companies, and biotechnology organizations worldwide. Our models have contributed to research published in the most prestigious scientific journals.
        </p>
        <Link
          href="/publications"
          className="animate-trust group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          style={{
            opacity: 0,
            backgroundColor: '#2384da',
            color: 'white',
            padding: '12px 24px',
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
