/**
 * |UXUIDC| Service Card - Matches Webflow Design Exactly
 * @version 3.0.0
 * services-card styling with h3 blue, card-button med-blue
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

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

// Service Card Grid wrapper with scroll animations
interface ServiceCardGridProps {
  children: React.ReactNode;
  title?: string;
}

export function UXUIDCServiceCardGrid({ children, title }: ServiceCardGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-white"
      style={{ padding: '20px 0' }}
    >
      <div className="container">
        {title && (
          <h2 
            ref={titleRef}
            style={{ 
              opacity: 0,
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
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '20px', padding: '20px' }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
