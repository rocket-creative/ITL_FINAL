/**
 * What Researchers Say (Testimonials) Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 65-75
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  quote: string;
  name: string;
  affiliation: string;
}

interface TestimonialsData {
  title: string;
  testimonials: Testimonial[];
  ctaHref: string;
}

export default function TestimonialsSection({ data }: { data: TestimonialsData }) {
  // Create refs for testimonials
  const testimonialRefs = data.testimonials.map(() => useScrollAnimation<HTMLDivElement>(0.1));

  return (
    <section
      className="flex flex-col justify-start items-center"
      style={{ backgroundColor: '#f7f7f7', padding: '50px 20px' }}
    >
      {/* Section Title - MASTER TEXT */}
      <h2
        style={{
          color: '#2384da',
          textAlign: 'center',
          letterSpacing: '-.5px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '30px',
        }}
      >
        {data.title}
      </h2>

      {/* Testimonials Grid */}
      <div
        className="grid grid-cols-1 gap-6"
        style={{ maxWidth: '1200px', width: '100%' }}
      >
        {data.testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={testimonialRefs[index]}
            className={`animate-initial animate-fade-in-up animate-delay-${Math.min(100 + index * 150, 800)} group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col`}
            style={{
              backgroundColor: 'white',
              padding: '30px',
              border: '.5px solid #e0e0e0',
            }}
          >
            {/* Quote - MASTER TEXT */}
            <p
              style={{
                color: '#666',
                fontFamily: 'var(--system-ui)',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.4rem',
                fontStyle: 'italic',
                marginBottom: '20px',
                flex: 1,
              }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Attribution - pushed to bottom */}
            <div className="mt-auto">
              {/* Name - MASTER TEXT */}
              <p
                style={{
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  marginBottom: '5px',
                }}
              >
                — {testimonial.name}
              </p>

              {/* Affiliation - MASTER TEXT */}
              <p
                style={{
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.8rem',
                  fontWeight: 400,
                }}
              >
                {testimonial.affiliation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA - Dark Blue */}
      <Link
        href={data.ctaHref}
        className="group inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        style={{
          marginTop: '30px',
          backgroundColor: '#134978',
          color: 'white',
          padding: '10px 20px',
          fontFamily: 'var(--system-ui)',
          fontSize: '.9rem',
          fontWeight: 400,
        }}
      >
        <span>View All Testimonials</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </section>
  );
}
