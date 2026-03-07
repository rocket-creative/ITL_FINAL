/**
 * Overview Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 28-36
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 */

'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface OverviewData {
  sectionTitle: string;
  whyChoose: {
    title: string;
    content: string;
  };
  whatWeProvide: {
    title: string;
    items: string[];
  };
}

export default function OverviewSection({ data }: { data: OverviewData }) {
  const titleRef = useScrollAnimation<HTMLDivElement>(0.1);
  const imageRef = useScrollAnimation<HTMLDivElement>(0.1);
  const card1Ref = useScrollAnimation<HTMLDivElement>(0.1);
  const card2Ref = useScrollAnimation<HTMLDivElement>(0.1);

  return (
    <section
      className="flex flex-col items-center"
      style={{ backgroundColor: '#f7f7f7', padding: '50px 20px' }}
    >
      {/* Section Title - MASTER TEXT */}
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
          lineHeight: 1,
          marginBottom: '30px',
        }}
      >
        {data.sectionTitle}
      </h2>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Image */}
        <div
          ref={imageRef}
          className="animate-initial animate-fade-in-up animate-delay-150 lg:row-span-2 flex justify-center items-center overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          style={{
            border: '.5px solid #e0e0e0',
            backgroundColor: 'white',
            padding: '20px',
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

        {/* Card 1: Why Researchers Choose - MASTER TEXT */}
        <div
          ref={card1Ref}
          className="animate-initial animate-fade-in-up animate-delay-300 overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            border: '.5px solid #e0e0e0',
            backgroundColor: 'white',
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
            {data.whyChoose.title}
          </h3>
          <p
            style={{
              color: '#4a4a4a',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.3rem',
            }}
          >
            {data.whyChoose.content}
          </p>
        </div>

        {/* Card 2: What We Provide - MASTER TEXT */}
        <div
          ref={card2Ref}
          className="animate-initial animate-fade-in-up animate-delay-450 overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            border: '.5px solid #e0e0e0',
            backgroundColor: 'white',
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
            {data.whatWeProvide.title}
          </h3>
          <ul style={{ paddingLeft: '20px', margin: 0, listStyleType: 'disc' }}>
            {data.whatWeProvide.items.map((item, index) => (
              <li
                key={index}
                style={{
                  color: '#4a4a4a',
                  marginBottom: '10px',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 400,
                  lineHeight: '1.3rem',
                  display: 'list-item',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
