/**
 * Overview Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 28-36
 */

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/UXUIDC/gsap';

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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

      // Cards animation
      const cards = sectionRef.current?.querySelectorAll('.overview-card');
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
      style={{ backgroundColor: '#f7f7f7', padding: '50px 20px' }}
    >
      {/* Section Title - MASTER TEXT */}
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
          lineHeight: 1,
          marginBottom: '30px',
        }}
      >
        {data.sectionTitle}
      </h2>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Image */}
        <div
          ref={imageRef}
          className="lg:row-span-2 flex justify-center items-center overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          style={{
            opacity: 0,
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
          className="overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            opacity: 0,
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
              color: '#666',
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
          className="overview-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          style={{
            opacity: 0,
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
                  color: '#666',
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
