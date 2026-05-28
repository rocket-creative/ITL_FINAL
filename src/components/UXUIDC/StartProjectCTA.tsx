'use client';

/**
 * |UXUIDC| Start Project CTA Section
 * Catalog first → custom when ready dual path (equal weight buttons).
 */

import {
  startProjectDefaults,
  withCatalogBridge,
  type CtaButton,
} from '@/data/commercialCtas';
import CatalogCustomCtaButtons from './CatalogCustomCtaButtons';

interface StartProjectCTAProps {
  title?: string;
  content?: string;
  buttons?: CtaButton[];
}

export default function UXUIDCStartProjectCTA({
  title = startProjectDefaults.title,
  content = startProjectDefaults.content,
  buttons = startProjectDefaults.buttons,
}: StartProjectCTAProps = {}) {
  const body = withCatalogBridge(content);

  return (
    <section
      className="flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 px-5"
      style={{ backgroundColor: '#0a253c' }}
    >
      <div className="text-center" style={{ maxWidth: '650px' }}>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl"
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
            fontSize: '.9rem',
            fontWeight: 400,
            lineHeight: '1.6rem',
            marginBottom: '25px',
          }}
        >
          {body}
        </p>

        <CatalogCustomCtaButtons variant="dark" buttons={buttons} utmMedium="start-project-cta" />
      </div>
    </section>
  );
}
