'use client';

/**
 * |UXUIDC| Start Project CTA Section
 * Dark blue background with simple styling - NO animations
 */

import Link from 'next/link';

interface CTAButton {
  label: string;
  href: string;
}

interface StartProjectCTAProps {
  title?: string;
  content?: string;
  buttons?: CTAButton[];
}

export default function UXUIDCStartProjectCTA({ 
  title = 'Ready to Start Your Project?',
  content = 'Our scientific team is ready to help design your custom mouse model. Get expert guidance from initial consultation through germline transmission.',
  buttons = [
    { label: 'Request Quote', href: '/request-quote' },
    { label: 'Schedule Consultation', href: '/contact' },
  ]
}: StartProjectCTAProps = {}) {
  return (
    <section
      className="flex flex-col justify-center items-center"
      style={{ backgroundColor: '#0a253c', padding: '70px 20px' }}
    >
      {/* Content */}
      <div className="text-center" style={{ maxWidth: '650px' }}>
        <h2
          style={{
            color: 'white',
            letterSpacing: '-.5px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
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
          {content}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {buttons.map((btn, i) => (
            <Link
              key={i}
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
