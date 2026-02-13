/**
 * Modern Model-Generation Landscape Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 37-38
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface LandscapeData {
  title: string;
  content: string;
}

export default function ModelLandscapeSection({ data }: { data: LandscapeData }) {
  const contentRef = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section
      className="flex flex-col justify-start items-center"
      style={{ backgroundColor: '#0a253c', padding: '50px 20px' }}
    >
      <div ref={contentRef} className="animate-initial animate-fade-in-up text-center" style={{ maxWidth: '900px' }}>
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
