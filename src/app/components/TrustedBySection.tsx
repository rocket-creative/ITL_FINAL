'use client';

/**
 * Trusted by Researchers Worldwide Section - from homepage.md
 * @version 2.0.0 - Removed GSAP, using CSS animations only
 */

import Link from 'next/link';

export default function TrustedBySection() {
  return (
    <section
      className="flex flex-col justify-start items-center"
      style={{
        backgroundColor: '#f7f7f7',
        padding: '50px 20px',
      }}
    >
      <div className="text-center" style={{ maxWidth: '800px' }}>
        <h2
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
          Trusted by Researchers Worldwide
        </h2>
        <p
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
          Since 1998 · 2,800+ Models Generated Completed · 800+ Peer Reviewed Publications · Nature · Science · Cell
        </p>
        <p
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
          ingenious targeting laboratory has mouse model generation for researchers at leading academic institutions, pharmaceutical companies, and biotechnology organizations worldwide. Our models have contributed to research published in the most prestigious scientific journals.
        </p>
        <Link
          href="/publications"
          className="group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-initial animate-fade-in-up animate-delay-450"
          style={{
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
