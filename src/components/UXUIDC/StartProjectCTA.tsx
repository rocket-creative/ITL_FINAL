'use client';

/**
 * |UXUIDC| Start Project CTA Section
 * Catalog first → custom when ready dual path.
 */

import Link from 'next/link';
import {
  CtaButton,
  startProjectDefaults,
  withCatalogBridge,
} from '@/data/commercialCtas';

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

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          {buttons.map((btn, i) => (
            <Link
              key={`${btn.href}-${btn.label}`}
              href={btn.href}
              className="group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: i === 0 ? '#008080' : 'transparent',
                color: 'white',
                padding: '12px 24px',
                border: i === 0 ? 'none' : '2px solid rgba(255,255,255,0.4)',
                fontFamily: 'var(--system-ui)',
                fontSize: '.9rem',
                fontWeight: 500,
                borderRadius: '4px',
              }}
            >
              <span>{btn.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
