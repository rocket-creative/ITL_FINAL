/**
 * |UXUIDC| Workflow Section - Matches Webflow Design
 * @version 3.1.0
 * Interactive workflow steps with animations
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/UXUIDC/gsap';

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
}

interface WorkflowSectionProps {
  title?: string;
  subtitle?: string;
  steps: WorkflowStep[];
}

export default function UXUIDCWorkflowSection({
  title = 'Conceptual Workflow',
  subtitle,
  steps,
}: WorkflowSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Steps stagger animation
      if (stepsRef.current) {
        const stepItems = stepsRef.current.querySelectorAll('.workflow-step');
        gsap.fromTo(
          stepItems,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Number pulse animation
        const numbers = stepsRef.current.querySelectorAll('.step-number');
        gsap.fromTo(
          numbers,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 75%',
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
      className="flex flex-col justify-start items-center"
      style={{ 
        backgroundColor: 'white',
        padding: '40px 20px'
      }}
    >
      {/* Header - h2-blue */}
      <div ref={titleRef} className="text-center mb-10" style={{ opacity: 0 }}>
        <h2 style={{
          color: '#2384da',
          textAlign: 'center',
          letterSpacing: '-.5px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1
        }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{
            color: '#666',
            marginTop: '15px',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
            fontWeight: 200,
            lineHeight: '1.3rem',
            maxWidth: '600px'
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Workflow Steps */}
      <div className="w-full max-w-6xl" style={{ padding: '20px' }}>
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div 
            ref={lineRef}
            className="hidden lg:block absolute top-8 left-0 right-0 h-1 origin-left" 
            style={{ 
              marginLeft: '10%', 
              marginRight: '10%', 
              transform: 'scaleX(0)',
              background: 'linear-gradient(90deg, teal, #2384da)'
            }} 
          />

          <div ref={stepsRef} className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className="workflow-step relative text-center cursor-pointer group" 
                style={{ opacity: 0 }}
              >
                {/* Step Number - Interactive */}
                <div 
                  className="step-number w-16 h-16 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-5 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ 
                    backgroundColor: 'teal',
                    boxShadow: '0 4px 15px rgba(0, 128, 128, 0.3)'
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <h3 
                  className="transition-colors duration-300 group-hover:text-teal-600"
                  style={{
                    color: '#2384da',
                    letterSpacing: '-1px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    marginBottom: '8px'
                  }}
                >
                  {step.title}
                </h3>
                <p 
                  className="transition-colors duration-300"
                  style={{
                    color: '#666',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.85rem',
                    fontWeight: 200,
                    lineHeight: '1.4rem'
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
