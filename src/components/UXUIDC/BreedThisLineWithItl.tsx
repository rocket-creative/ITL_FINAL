/**
 * Inbound link to the mouse breeding services hub.
 * The visible anchor is the exact phrase "mouse breeding services".
 */

import Link from 'next/link';

const BREEDING_HREF = '/mouse-breeding-services/';

export default function BreedThisLineWithItl({ lineName }: { lineName?: string }) {
  const subject = lineName ? `the ${lineName} line` : 'your line';

  return (
    <section
      aria-labelledby="breed-this-line-heading"
      style={{
        backgroundColor: '#f7fbfb',
        padding: '48px 20px',
        borderTop: '1px solid #e4f0f0',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          id="breed-this-line-heading"
          style={{
            color: '#0a253c',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.45rem',
            fontWeight: 700,
            margin: '0 0 12px',
          }}
        >
          Breed this line with ITL
        </h2>
        <p
          style={{
            color: '#444',
            fontSize: '.95rem',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Send {subject} to a U.S. barrier facility for colony maintenance, cohort production, and
          complex breeding schemes through{' '}
          <Link
            href={BREEDING_HREF}
            style={{ color: '#008080', fontWeight: 600, textDecoration: 'underline' }}
          >
            mouse breeding services
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
