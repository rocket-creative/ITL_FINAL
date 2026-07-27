'use client';

/**
 * |UXUIDC| Service Card - Matches Webflow Design Exactly
 * @version 4.0.0 - Removed GSAP, using CSS animations only
 * services-card styling with h3 blue, card-button med-blue
 */

import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel?: string;
}

export default function UXUIDCServiceCard({
  title,
  description,
  href,
  ctaLabel = 'Learn More',
}: ServiceCardProps) {
  return (
    <article 
      className="service-card flex flex-col cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        border: '.5px solid #e0e0e0',
        backgroundColor: 'white',
        padding: '20px 20px 10px'
      }}
    >
      {/* Blue Title - h3 styling */}
      <h3 
        className="transition-colors duration-300 group-hover:text-teal-600"
        style={{
          color: '#2384da',
          letterSpacing: '-1px',
          marginTop: '5px',
          marginBottom: '5px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.3rem',
          fontWeight: 400,
          lineHeight: 1
        }}
      >
        {title}
      </h3>

      {/* Description - p styling */}
      <p style={{
        color: '#666',
        marginTop: '5px',
        marginBottom: '15px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        fontSize: '.9rem',
        fontWeight: 200,
        lineHeight: '1.3rem'
      }}>
        {description}
      </p>

      {/* Button - card-button med-blue with animation */}
      <Link
        href={href}
        className="group/btn inline-flex items-center gap-2 text-white mt-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        style={{
          backgroundColor: '#134978',
          padding: '8px 20px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          fontWeight: 400,
          marginBottom: '10px'
        }}
      >
        <span>{ctaLabel.replace(' →', '').replace('→', '')}</span>
        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
      </Link>
    </article>
  );
}

// Service Card Grid wrapper with CSS animations
interface ServiceCardGridProps {
  children: React.ReactNode;
  title?: string;
}

export function UXUIDCServiceCardGrid({ children, title }: ServiceCardGridProps) {
  return (
    <section 
      className="bg-white"
      style={{ padding: '20px 0' }}
    >
      <div className="container">
        {title && (
          <h2 
            className="animate-initial animate-fade-in-up"
            style={{ 
              color: '#2384da',
              textAlign: 'center',
              letterSpacing: '-.05px',
              marginBottom: '-5px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1
            }}
          >
            {title}
          </h2>
        )}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '20px', padding: '20px' }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
