/**
 * Frequently Asked Questions Section - displays MASTER TEXT exactly
 * Source: homepage.md lines 80-86
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/UXUIDC/gsap';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  faqs: FAQ[];
}

export default function FAQSection({ data }: { data: FAQData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-start items-center"
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

      {/* FAQ Items */}
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {data.faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            style={{
              opacity: 0,
              backgroundColor: '#f7f7f7',
              marginBottom: '10px',
              border: '.5px solid #e0e0e0',
              overflow: 'hidden',
            }}
          >
            {/* Question - MASTER TEXT */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center transition-colors duration-300 hover:bg-gray-100"
              style={{ padding: '20px', cursor: 'pointer' }}
            >
              <span
                style={{
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                {faq.question}
              </span>
              <span
                className="transition-transform duration-300"
                style={{
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: 'teal',
                  fontSize: '1.2rem',
                }}
              >
                ▼
              </span>
            </button>

            {/* Answer - MASTER TEXT */}
            <div
              className="transition-all duration-300 overflow-hidden"
              style={{
                maxHeight: openIndex === index ? '500px' : '0',
                opacity: openIndex === index ? 1 : 0,
              }}
            >
              <p
                style={{
                  padding: '0 20px 20px',
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 400,
                  lineHeight: '1.4rem',
                }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
