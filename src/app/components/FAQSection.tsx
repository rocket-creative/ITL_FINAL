/**
 * Frequently Asked Questions Section - from homepage.md
 * - Removed GSAP, using CSS animations only
 */

'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="flex flex-col justify-start items-center"
      style={{
        backgroundColor: '#f7f7f7',
        padding: '50px 20px',
      }}
    >
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
        Frequently Asked Questions
      </h2>

      <div style={{ maxWidth: '800px', width: '100%' }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`animate-initial animate-fade-in-up animate-delay-${Math.min(100 + index * 100, 800)}`}
            style={{
              backgroundColor: 'white',
              marginBottom: '10px',
              border: '.5px solid #e0e0e0',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center transition-colors duration-300 hover:bg-gray-50"
              style={{
                padding: '20px',
                cursor: 'pointer',
              }}
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
