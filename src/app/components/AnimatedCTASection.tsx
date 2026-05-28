/**
 * Animated Final CTA Section - Matches Webflow Design
 * @version 3.1.0 - Equal weight catalog + custom dual path
 */

'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CatalogCustomCtaButtons from '@/components/UXUIDC/CatalogCustomCtaButtons';
import { CATALOG_FIRST_BRIDGE } from '@/data/commercialCtas';

export default function AnimatedCTASection() {
  const titleRef = useScrollAnimation<HTMLHeadingElement>(0.1);
  const textRef = useScrollAnimation<HTMLParagraphElement>(0.1);
  const buttonsRef = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section
      className="flex flex-col justify-start items-center"
      style={{
        backgroundColor: '#008080',
        padding: '50px 20px',
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
            marginBottom: '15px',
          }}
        >
          Catalog Models. Custom when your study needs more.
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
            maxWidth: '600px',
          }}
        >
          {CATALOG_FIRST_BRIDGE}
        </p>
        <div ref={buttonsRef} className="animate-initial animate-fade-in-up animate-delay-300">
          <CatalogCustomCtaButtons variant="banner" utmMedium="homepage-closing" slug="homepage" />
        </div>
      </div>
    </section>
  );
}
