/**
 * Animated Final CTA Section - Matches Webflow Design
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

export default function AnimatedCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-cta');
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
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
        backgroundColor: '#008080',
        padding: '50px 20px'
      }}
    >
      <div ref={contentRef} className="text-center">
        <h2 
          className="animate-cta" 
          style={{ 
            opacity: 0,
            color: 'white',
            letterSpacing: '-.5px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: '15px'
          }}
        >
          Start Your Project
        </h2>
        <p 
          className="animate-cta" 
          style={{ 
            opacity: 0,
            color: 'white',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
            fontWeight: 400,
            lineHeight: '1.4rem',
            marginBottom: '25px',
            maxWidth: '600px'
          }}
        >
          Our scientific consultants are ready to discuss your research requirements and recommend the optimal approach for your project. Initial consultation is provided at no charge and includes allele design recommendations, timeline estimates, and project pricing.
        </p>
        {/* Button wrapper - horizontal flex with gap */}
        <div className="animate-cta flex flex-row gap-5 justify-center" style={{ opacity: 0 }}>
          {/* Outlined white button */}
          <Link
            href="/request-quote"
            className="cta-outline-btn group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span>Request a Quote</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          {/* Outlined white button */}
          <Link
            href="/contact"
            className="cta-outline-btn group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span>Schedule Consultation</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
