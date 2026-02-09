/**
 * High-Level Approach Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 39-47
 */

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/UXUIDC/gsap';

interface FeatureItem {
  title: string;
  description: string;
}

interface ApproachData {
  title: string;
  features: FeatureItem[];
}

export default function HighLevelApproachSection({ data }: { data: ApproachData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.approach-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
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
        {data.title}
      </h2>

      {/* Grid: 2 cards | 2 cards | Image (spans 2 rows) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Column 1: First two cards stacked */}
        <div className="flex flex-col gap-5">
          {data.features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              className="approach-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1"
              style={{
                opacity: 0,
                border: '.5px solid #e0e0e0',
                backgroundColor: '#f7f7f7',
                padding: '20px',
              }}
            >
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
                {feature.title}
              </h3>
              <p
                style={{
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 400,
                  lineHeight: '1.3rem',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Column 2: Last two cards stacked */}
        <div className="flex flex-col gap-5">
          {data.features.slice(2, 4).map((feature, index) => (
            <div
              key={index + 2}
              className="approach-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1"
              style={{
                opacity: 0,
                border: '.5px solid #e0e0e0',
                backgroundColor: '#f7f7f7',
                padding: '20px',
              }}
            >
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
                {feature.title}
              </h3>
              <p
                style={{
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 400,
                  lineHeight: '1.3rem',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Column 3: Image (size of 2 cards) */}
        <div
          className="approach-card flex justify-center items-center overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full"
          style={{
            opacity: 0,
            border: '.5px solid #e0e0e0',
            backgroundColor: 'white',
            padding: '20px',
          }}
        >
          <Image
            src="/images/sm-3x4-mouse-lab.jpg"
            alt="Laboratory research"
            width={400}
            height={600}
            className="object-cover transition-transform duration-500 hover:scale-105 w-full h-full"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
