'use client';

/**
 * Conceptual Workflow Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 48-60
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  // Create refs for animated elements
  const stepRefs = [
    useScrollAnimation<HTMLDivElement>(0.1),
    useScrollAnimation<HTMLDivElement>(0.1),
    useScrollAnimation<HTMLDivElement>(0.1),
    useScrollAnimation<HTMLDivElement>(0.1),
    useScrollAnimation<HTMLDivElement>(0.1)
  ];

  return (
    <section
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
          {data.steps.map((step, index) => (
            <div
              key={step.number}
              ref={stepRefs[index]}
              className={`animate-initial animate-fade-in-up animate-delay-${Math.min(100 + index * 100, 800)} group cursor-pointer text-center`}
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
