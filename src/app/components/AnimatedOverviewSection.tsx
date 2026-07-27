'use client';

/**
 * Animated Overview Section - Matches Webflow Design Exactly
 * science-overview container with overview-card styling
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AnimatedOverviewSection() {
  const titleRef = useScrollAnimation<HTMLDivElement>(0.1);
  const imageRef = useScrollAnimation<HTMLDivElement>(0.1);
  const card1Ref = useScrollAnimation<HTMLDivElement>(0.1);
  const card2Ref = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section 
      className="flex flex-col items-center"
      style={{ 
        backgroundColor: '#f7f7f7',
        padding: '20px 0'
      }}
    >
      {/* Section Title - h2-blue */}
      <h2 
        ref={titleRef}
        className="animate-initial animate-fade-in-up"
        style={{ 
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
          className="animate-initial animate-fade-in-up animate-delay-150 lg:row-span-2 overview-card-image flex justify-center items-center overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          style={{ 
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
          ref={card1Ref}
          className="animate-initial animate-fade-in-up animate-delay-300 overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
          ref={card2Ref}
          className="animate-initial animate-fade-in-up animate-delay-450 overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
              Mouse model generation including conventional knockouts, conditional knockouts, knock-ins (point mutation, cDNA, gene replacement), reporter alleles, Rosa26 and other targeted transgenics, and humanized models.
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
              Animal model catalog access to 14,774+ lines for study ready biomedical research.
            </li>
            <li className="animate-item" style={{ 
              color: '#666',
              marginBottom: '10px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.3rem'
            }}>
              Integrated non-GLP preclinical services for your model generation or catalog model to support translational decisions.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
