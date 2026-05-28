/**
 * |UXUIDC| Standard page closing CTA — catalog + custom equal weight.
 */

import CatalogCustomCtaButtons from './CatalogCustomCtaButtons';
import { withCatalogBridge } from '@/data/commercialCtas';

interface PageClosingCtaProps {
  title: string;
  description: string;
  slug?: string;
  className?: string;
}

export default function PageClosingCta({
  title,
  description,
  slug,
  className = '',
}: PageClosingCtaProps) {
  const body = withCatalogBridge(description);

  return (
    <section
      className={`flex flex-col justify-center items-center py-12 sm:py-16 px-5 ${className}`}
      style={{ backgroundColor: '#0a253c' }}
      aria-label="Start your project"
    >
      <div className="text-center" style={{ maxWidth: '700px' }}>
        <h2
          className="text-2xl sm:text-3xl"
          style={{
            color: 'white',
            letterSpacing: '-.5px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '15px',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'var(--system-ui)',
            fontSize: '.95rem',
            fontWeight: 400,
            lineHeight: '1.7rem',
            marginBottom: '28px',
          }}
        >
          {body}
        </p>
        <CatalogCustomCtaButtons variant="dark" utmMedium="page-closing" slug={slug} />
      </div>
    </section>
  );
}
