/**
 * Animated Overview Section - Matches Webflow Design Exactly
 * science-overview container with overview-card styling
 */

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/UXUIDC/gsap';

export default function AnimatedOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content animation - animate all cards
      if (sectionRef.current) {
        const allCards = sectionRef.current.querySelectorAll('.overview-card');
        gsap.fromTo(
          allCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
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
      className="flex flex-col items-center"
      style={{ 
        backgroundColor: '#f7f7f7',
        padding: '20px 0'
      }}
    >
      {/* Section Title - h2-blue */}
      <h2 
        ref={titleRef}
        style={{ 
          opacity: 0,
          color: '#2384da',
          textAlign: 'center',
          letterSpacing: '-.5px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1
        }}
      >
        Overview
      </h2>

      {/* 2-column layout with image spanning 2 rows */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ gap: '20px', padding: '20px' }}
      >
        {/* Image Cell - spans 2 rows */}
        <div 
          ref={imageRef}
          className="lg:row-span-2 overview-card-image flex justify-center items-center overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          style={{ 
            opacity: 0,
            border: '.5px solid #e0e0e0',
            backgroundColor: 'white',
            padding: '20px'
          }}
        >
          <Image
            src="/images/sm-3x4-mouse.jpg"
            alt="Laboratory mouse"
            width={400}
            height={533}
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Card 1 - Why Researchers Choose */}
        <div 
          ref={contentRef}
          className="overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            border: '.5px solid #e0e0e0',
            backgroundColor: 'white',
            padding: '20px'
          }}
        >
          <h3 className="animate-item transition-colors duration-300 group-hover:text-teal-600" style={{ 
            color: '#2384da',
            letterSpacing: '-1px',
            marginTop: '5px',
            marginBottom: '5px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.3rem',
            fontWeight: 400,
            lineHeight: 1
          }}>
            Why Researchers Choose ingenious targeting laboratory
          </h3>
          <p className="animate-item" style={{ 
            color: '#666',
            marginTop: '5px',
            marginBottom: '15px',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
            fontWeight: 400,
            lineHeight: '1.3rem'
          }}>
            For more than 30 years, ingenious targeting laboratory has supported biomedical research with animal models that provide stable allele designs, reproducible cohorts, C57BL/6 backgrounds, and U.S.-based QC oversight. Each project follows an evidence-based, results-driven approach to deliver animal models with reliable inheritance and long-term performance.
          </p>
        </div>

        {/* Card 2 - What We Provide */}
        <div 
          className="overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            border: '.5px solid #e0e0e0',
            backgroundColor: 'white',
            padding: '20px'
          }}
        >
          <h3 className="animate-item transition-colors duration-300 group-hover:text-teal-600" style={{ 
            color: '#2384da',
            letterSpacing: '-1px',
            marginTop: '5px',
            marginBottom: '5px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.3rem',
            fontWeight: 400,
            lineHeight: 1
          }}>
            What We Provide
          </h3>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li className="animate-item" style={{ 
              color: '#666',
              marginBottom: '10px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.3rem'
            }}>
              Custom mouse models including conventional knockouts, conditional knockouts, knock-ins (point mutation, cDNA, gene replacement), reporter alleles, Rosa26 and other targeted transgenics, and humanized models.
            </li>
            <li className="animate-item" style={{ 
              color: '#666',
              marginBottom: '10px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.3rem'
            }}>
              Multi-generation cohort development and colony planning for study readiness.
            </li>
            <li className="animate-item" style={{ 
              color: '#666',
              marginBottom: '10px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.3rem'
            }}>
              Animal model catalog access to 10,000+ lines for study-ready biomedical research.
            </li>
            <li className="animate-item" style={{ 
              color: '#666',
              marginBottom: '10px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.3rem'
            }}>
              Integrated non-GLP preclinical services for your custom or catalog model to support translational decisions.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
