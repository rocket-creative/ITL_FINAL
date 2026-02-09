/**
 * |UXUIDC| Feature Grid - Matches Webflow Design Exactly
 * @version 3.0.0
 * high-level container with overview-card styling
 */

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/UXUIDC/gsap';

interface Feature {
  title: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  features: Feature[];
  showImage?: boolean;
  imageSrc?: string;
}

export default function UXUIDCFeatureGrid({
  title,
  features,
  showImage = true,
  imageSrc = '/images/sm-3x4-mouse-lab.jpg',
}: FeatureGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // Features stagger animation
      if (featuresRef.current) {
        const featureItems = featuresRef.current.querySelectorAll('.feature-item');
        gsap.fromTo(
          featureItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="flex flex-col justify-start items-center"
      style={{ 
        backgroundColor: '#f7f7f7',
        padding: '20px 0'
      }}
    >
      {/* h2-blue title */}
      {title && (
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
          {title}
        </h2>
      )}
      
      {/* 3-column layout: 2 cols of cards + 1 col image spanning rows */}
      <div 
        ref={featuresRef}
        className="grid grid-cols-1 lg:grid-cols-3"
        style={{ gap: '20px', padding: '20px' }}
      >
        {/* First 2 features in first column */}
        {features.slice(0, 2).map((feature, index) => (
          <div 
            key={index} 
            className="feature-item overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ 
              opacity: 0,
              border: '.5px solid #e0e0e0',
              backgroundColor: 'white',
              padding: '20px'
            }}
          >
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
              {feature.title}
            </h3>
            <p style={{
              color: '#666',
              marginTop: '5px',
              marginBottom: '15px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 200,
              lineHeight: '1.3rem'
            }}>
              {feature.description}
            </p>
          </div>
        ))}

        {/* Image spanning 2 rows in last column */}
        {showImage && (
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
              src={imageSrc}
              alt="Laboratory mouse"
              width={400}
              height={533}
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Last 2 features */}
        {features.slice(2, 4).map((feature, index) => (
          <div 
            key={index + 2} 
            className="feature-item overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ 
              opacity: 0,
              border: '.5px solid #e0e0e0',
              backgroundColor: 'white',
              padding: '20px'
            }}
          >
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
              {feature.title}
            </h3>
            <p style={{
              color: '#666',
              marginTop: '5px',
              marginBottom: '15px',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 200,
              lineHeight: '1.3rem'
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
