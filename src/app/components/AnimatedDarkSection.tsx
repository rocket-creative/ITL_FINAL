/**
 * Animated Dark Section (Modern Model-Generation Landscape)
 * Matches Webflow design - why-contain dark blue bg
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/UXUIDC/gsap';

export default function AnimatedDarkSection() {
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
      style={{ 
        backgroundColor: '#0a253c',
        padding: '20px'
      }}
    >
      <div 
        ref={contentRef}
        className="text-center"
        style={{ opacity: 0 }}
      >
        {/* h2-white */}
        <h2 style={{
          color: 'white',
          marginTop: '20px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '2rem',
          fontWeight: 600,
          lineHeight: 1
        }}>
          Modern Model-Generation Landscape
        </h2>
        {/* para-white */}
        <p style={{
          color: 'white',
          width: '75%',
          margin: '0 auto 40px',
          fontFamily: 'var(--system-ui)',
          fontSize: '.9rem',
          fontWeight: 200,
          lineHeight: '1.3rem'
        }}>
          Across today&apos;s research environment, scientists utilize a wide array of genome-modification technologies, including programmable nucleases, rapid-editing strategies, exploratory one-cell–stage modifications, and other contemporary editing systems used throughout the field. These approaches and others are discussed with an emphasis on structured allele design, stable inheritance, and multi-generational reproducibility for long-term performance aligned with your specific study requirements.
        </p>
      </div>
    </section>
  );
}
