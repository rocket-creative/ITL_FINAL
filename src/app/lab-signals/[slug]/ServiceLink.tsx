'use client';

import Link from 'next/link';

const BRAND = {
  black: '#000000',
  white: '#ffffff',
  darkGray: '#444444',
};

interface ServiceLinkProps {
  href: string;
}

export default function ServiceLink({ href }: ServiceLinkProps) {
  return (
    <section style={{ backgroundColor: BRAND.white, padding: '45px 20px' }}>
      <div style={{ maxWidth: '600px', textAlign: 'center', margin: '0 auto' }}>
        <h3 style={{
          color: BRAND.black,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 600,
          marginBottom: '10px',
        }}>
          Interested in This Research Area?
        </h3>
        <p style={{ 
          color: BRAND.darkGray, 
          fontFamily: 'Lato, sans-serif',
          fontSize: '.9rem', 
          marginBottom: '18px',
          lineHeight: 1.6,
        }}>
          Learn more about our mouse model services.
        </p>
        <Link
          href={href}
          style={{
            display: 'inline-block',
            backgroundColor: BRAND.black,
            color: BRAND.white,
            fontFamily: 'Poppins, sans-serif',
            padding: '12px 28px',
            fontSize: '.9rem',
            fontWeight: 500,
            textDecoration: 'none',
            borderRadius: '6px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Explore Services →
        </Link>
      </div>
    </section>
  );
}
