/**
 * Core Research Services Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 14-27
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

interface ServiceItem {
  title: string;
  description: string;
  href: string;
}

export default function CoreServicesSection({ data }: { data: ServiceItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
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
      className="flex flex-col items-center"
      style={{ backgroundColor: 'white', padding: '50px 20px' }}
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
        Core Research Services
      </h2>

      {/* 4-column grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        style={{ maxWidth: '1200px', width: '100%' }}
      >
        {data.map((service, index) => (
          <article
            key={index}
            className="service-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
            style={{
              opacity: 0,
              backgroundColor: '#f7f7f7',
              border: '.5px solid #e0e0e0',
              padding: '20px',
            }}
          >
            {/* Service Title - MASTER TEXT */}
            <h3
              className="transition-colors duration-300 group-hover:text-teal-600"
              style={{
                color: '#2384da',
                letterSpacing: '-1px',
                marginBottom: '10px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {service.title}
            </h3>

            {/* Service Description - MASTER TEXT */}
            <p
              style={{
                color: '#666',
                marginBottom: '15px',
                fontFamily: 'var(--system-ui)',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.3rem',
              }}
            >
              {service.description}
            </p>

            {/* CTA Link - auto margin to bottom */}
            <Link
              href={service.href}
              className="group/btn inline-flex items-center gap-2 text-white transition-all duration-300 hover:-translate-y-0.5 mt-auto"
              style={{
                backgroundColor: 'teal',
                padding: '10px 20px',
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                fontWeight: 400,
              }}
            >
              <span>Learn More</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
