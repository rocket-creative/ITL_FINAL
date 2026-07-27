'use client';

/**
 * What Researchers Say - Testimonials Section
 * Supports both light and dark background variants
 * Cards are always solid white with dark text for maximum legibility
 * - Removed GSAP, using CSS animations only
 */

import Link from 'next/link';

interface Testimonial {
  quote: string;
  name?: string;
  author?: string; // Support both 'name' and 'author' field names
  affiliation: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  variant?: 'light' | 'dark';
  showCta?: boolean;
}

export default function TestimonialsSection({ 
  testimonials, 
  variant = 'light',
  showCta = true 
}: TestimonialsSectionProps) {
  const isDark = variant === 'dark';

  // Styles based on variant
  const sectionStyle = isDark 
    ? { background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)', padding: '60px 20px' }
    : { backgroundColor: '#f7f7f7', padding: '60px 20px' };

  const titleStyle = isDark
    ? { color: '#ffffff' }
    : { color: '#2384da' };

  // Cards are always solid white with dark text for maximum legibility
  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
  };

  // Quote text is always dark grey for readability
  const quoteStyle = { color: '#666' };

  // Name is always dark for readability
  const nameStyle = { color: '#333' };

  // Affiliation is always dark grey for readability
  const affiliationStyle = { color: '#666' };

  const buttonStyle = isDark
    ? { backgroundColor: '#00d4d4', color: '#0a253c' }
    : { backgroundColor: '#134978', color: '#ffffff' };

  return (
    <section
      style={{
        ...sectionStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2
        className="animate-initial animate-fade-in-up"
        style={{
          ...titleStyle,
          textAlign: 'center',
          letterSpacing: '-.5px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '40px',
        }}
      >
        What Researchers Say
      </h2>

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px',
        }}
      >
        {testimonials.slice(0, 6).map((testimonial, index) => (
          <div
            key={index}
            className={`animate-initial animate-fade-in-up animate-delay-${Math.min(150 + index * 150, 800)}`}
            style={{
              ...cardStyle,
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <p
              style={{
                ...quoteStyle,
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 400,
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '20px',
                flex: 1,
              }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div style={{ marginTop: 'auto' }}>
              <p
                style={{
                  ...nameStyle,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  marginBottom: '5px',
                }}
              >
                — {testimonial.name || testimonial.author}
              </p>
              <p
                style={{
                  ...affiliationStyle,
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '.85rem',
                  fontWeight: 400,
                }}
              >
                {testimonial.affiliation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showCta && (
        <Link
          href="/testimonials"
          className="animate-initial animate-fade-in-up animate-delay-300"
          style={{
            ...buttonStyle,
            marginTop: '30px',
            padding: '12px 24px',
            fontFamily: 'Lato, sans-serif',
            fontSize: '.9rem',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
          }}
        >
          <span>View All Testimonials</span>
          <span>→</span>
        </Link>
      )}
    </section>
  );
}
