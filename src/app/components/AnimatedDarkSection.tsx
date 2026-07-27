'use client';

/**
 * Animated Dark Section (Modern Model-Generation Landscape)
 * Matches Webflow design - why-contain dark blue bg
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AnimatedDarkSection() {
  const contentRef = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section 
      className="flex flex-col justify-start items-center"
      style={{ 
        backgroundColor: '#0a253c',
        padding: '20px'
      }}
    >
      <div 
        ref={contentRef}
        className="animate-initial animate-fade-in-up text-center"
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
