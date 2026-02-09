/**
 * Conceptual Workflow Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 48-60
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/UXUIDC/gsap';

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
}

interface WorkflowData {
  title: string;
  subtitle: string;
  steps: WorkflowStep[];
  ctaHref: string;
}

export default function WorkflowSection({ data }: { data: WorkflowData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = sectionRef.current?.querySelectorAll('.workflow-step');
      if (steps) {
        gsap.fromTo(
          steps,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
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
          marginBottom: '15px',
        }}
      >
        {data.title}
      </h2>

      {/* Subtitle - MASTER TEXT */}
      <p
        style={{
          color: '#666',
          textAlign: 'center',
          fontFamily: 'var(--system-ui)',
          fontSize: '.9rem',
          fontWeight: 400,
          lineHeight: '1.4rem',
          marginBottom: '40px',
          maxWidth: '700px',
        }}
      >
        {data.subtitle}
      </p>

      {/* Workflow Steps */}
      <div className="relative" style={{ maxWidth: '1000px', width: '100%' }}>
        {/* Connection Line */}
        <div
          className="hidden lg:block absolute top-8 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, teal, #2384da)',
            zIndex: 0,
          }}
        />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
          {data.steps.map((step) => (
            <div
              key={step.number}
              className="workflow-step group cursor-pointer text-center"
              style={{ opacity: 0 }}
            >
              {/* Step Number */}
              <div
                className="mx-auto mb-3 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'teal',
                  color: 'white',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                {step.number}
              </div>

              {/* Step Title - MASTER TEXT */}
              <h3
                className="transition-colors duration-300 group-hover:text-teal-600"
                style={{
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '8px',
                }}
              >
                {step.title}
              </h3>

              {/* Step Description - MASTER TEXT */}
              <p
                style={{
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.8rem',
                  fontWeight: 400,
                  lineHeight: '1.2rem',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA removed per user request - no timeline button */}
    </section>
  );
}
