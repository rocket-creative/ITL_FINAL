/**
 * |UXUIDC| Feature Grid - Matches Webflow Design Exactly
 * @version 4.0.0 - Removed GSAP, using CSS animations only
 * high-level container with overview-card styling
 */

'use client';

import Image from 'next/image';

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
  return (
    <section 
      className="flex flex-col justify-start items-center"
      style={{ 
        backgroundColor: '#f7f7f7',
        padding: '20px 0'
      }}
    >
      {/* h2-blue title */}
      {title && (
        <h2 
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
          {title}
        </h2>
      )}
      
      {/* 3-column layout: 2 cols of cards + 1 col image spanning rows */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-3"
        style={{ gap: '20px', padding: '20px' }}
      >
        {/* First 2 features in first column */}
        {features.slice(0, 2).map((feature, index) => (
          <div 
            key={index} 
            className={`overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-initial animate-fade-in-up animate-delay-${(index + 1) * 100}`}
            style={{ 
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
            className="lg:row-span-2 overview-card-image flex justify-center items-center overflow-hidden transition-shadow duration-300 hover:shadow-lg animate-initial animate-fade-in animate-delay-300"
            style={{ 
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
            className={`overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-initial animate-fade-in-up animate-delay-${(index + 3) * 100}`}
            style={{ 
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
