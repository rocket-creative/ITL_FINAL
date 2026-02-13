'use client';

/**
 * |UXUIDC| Animated FAQ Accordion Component
 * @version 3.0.0 - Using Intersection Observer for scroll animations
 * Consistent animated dropdown FAQ across the site
 */

import { useRef, useState } from 'react';
import Link from 'next/link';
import { IconChevronDown, IconChevronRight } from './Icons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

interface AnimatedFAQProps {
  title?: string;
  faqs: FAQ[];
  backgroundColor?: string;
  showViewAllLink?: boolean;
}

export function UXUIDCAnimatedFAQ({ 
  title, 
  faqs, 
  backgroundColor = 'white',
  showViewAllLink = true
}: AnimatedFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Create refs for animated elements
  const titleRef = useScrollAnimation<HTMLDivElement>(0.1);
  const faqRefs = faqs.map(() => useScrollAnimation<HTMLDivElement>(0.1));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="flex flex-col justify-start items-center"
      style={{ backgroundColor, padding: title ? '60px 20px' : '0' }}
    >
      {title && (
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
          {title}
        </h2>
      )}

      <div style={{ maxWidth: '800px', width: '100%' }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            ref={faqRefs[index]}
            className={`hover-card-sm animate-initial animate-fade-in-up animate-delay-${Math.min(index * 100 + 100, 800)}`}
            style={{
              backgroundColor: backgroundColor === 'white' ? '#f7f7f7' : 'white',
              marginBottom: '10px',
              border: '.5px solid #e0e0e0',
              overflow: 'hidden',
            }}
          >
            {/* Question Button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center transition-colors duration-300 hover:bg-opacity-80"
              style={{ 
                padding: '20px', 
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
              aria-expanded={openIndex === index}
            >
              <span
                style={{
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  paddingRight: '20px',
                }}
              >
                {faq.question}
              </span>
              <span
                className="transition-transform duration-300 flex-shrink-0"
                style={{
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <IconChevronDown size={20} color="#008080" />
              </span>
            </button>

            {/* Answer Content - CSS transition instead of GSAP */}
            <div
              style={{
                maxHeight: openIndex === index ? '1000px' : '0',
                opacity: openIndex === index ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
              }}
            >
              <p
                style={{
                  padding: '0 20px 20px',
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.9rem',
                  fontWeight: 400,
                  lineHeight: '1.5rem',
                }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All FAQs Link */}
      {showViewAllLink && (
        <div style={{ maxWidth: '800px', width: '100%', marginTop: '30px', textAlign: 'center' }}>
          <Link 
            href="/faq"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#008080',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              padding: '12px 24px',
              border: '2px solid #008080',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#008080';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#008080';
            }}
          >
            All FAQs
            <IconChevronRight size={16} color="currentColor" />
          </Link>
        </div>
      )}
    </section>
  );
}

export default UXUIDCAnimatedFAQ;
