/**
 * High-Level Approach Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 39-47
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FeatureItem {
  title: string;
  description: string;
}

interface ApproachData {
  title: string;
  features: FeatureItem[];
}

export default function HighLevelApproachSection({ data }: { data: ApproachData }) {
  // Create refs for animated elements
  const card1Ref = useScrollAnimation<HTMLDivElement>(0.1);
  const card2Ref = useScrollAnimation<HTMLDivElement>(0.1);
  const card3Ref = useScrollAnimation<HTMLDivElement>(0.1);
  const card4Ref = useScrollAnimation<HTMLDivElement>(0.1);
  const imageRef = useScrollAnimation<HTMLDivElement>(0.1);
  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];

  return (
    <section
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
              ref={cardRefs[index]}
              className={`animate-initial animate-fade-in-up animate-delay-${100 + index * 100} group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1`}
              style={{
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
              ref={cardRefs[index + 2]}
              className={`animate-initial animate-fade-in-up animate-delay-${300 + index * 100} group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex-1`}
              style={{
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
          ref={imageRef}
          className="animate-initial animate-fade-in-up animate-delay-500 flex justify-center items-center overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full"
          style={{
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
