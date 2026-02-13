/**
 * Animated Final CTA Section - Matches Webflow Design
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AnimatedCTASection() {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(0.1);
  const textRef = useScrollAnimation<HTMLParagraphElement>(0.1);
  const buttonsRef = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section 
      className="flex flex-col justify-start items-center"
      style={{ 
        backgroundColor: '#008080',
        padding: '50px 20px'
      }}
    >
      <div className="text-center">
        <h2 
          ref={titleRef}
          className="animate-initial animate-fade-in-up" 
          style={{ 
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
          ref={textRef}
          className="animate-initial animate-fade-in-up animate-delay-150" 
          style={{ 
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
        <div ref={buttonsRef} className="animate-initial animate-fade-in-up animate-delay-300 flex flex-row gap-5 justify-center">
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
