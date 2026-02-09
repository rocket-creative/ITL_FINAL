/**
 * Modern Model-Generation Landscape Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 37-38
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/UXUIDC/gsap';

interface LandscapeData {
  title: string;
  content: string;
}

export default function ModelLandscapeSection({ data }: { data: LandscapeData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      style={{ backgroundColor: '#0a253c', padding: '50px 20px' }}
    >
      <div ref={contentRef} className="text-center" style={{ opacity: 0, maxWidth: '900px' }}>
        {/* Section Title - MASTER TEXT */}
        <h2
          style={{
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1,
            marginBottom: '20px',
          }}
        >
          {data.title}
        </h2>

        {/* Content - MASTER TEXT */}
        <p
          style={{
            color: 'white',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
            fontWeight: 200,
            lineHeight: '1.4rem',
          }}
        >
          {data.content}
        </p>
      </div>
    </section>
  );
}
