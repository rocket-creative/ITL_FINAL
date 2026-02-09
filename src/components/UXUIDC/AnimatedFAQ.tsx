'use client';

/**
 * |UXUIDC| Animated FAQ Accordion Component
 * Consistent animated dropdown FAQ across the site
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconChevronDown } from './Icons';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

interface AnimatedFAQProps {
  title?: string;
  faqs: FAQ[];
  backgroundColor?: string;
}

export function UXUIDCAnimatedFAQ({ 
  title, 
  faqs, 
  backgroundColor = 'white' 
}: AnimatedFAQProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            stagger: 0.1,
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
    const answerEl = answerRefs.current[index];
    
    if (openIndex === index) {
      // Close current
      if (answerEl) {
        gsap.to(answerEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
      setOpenIndex(null);
    } else {
      // Close previous if open
      if (openIndex !== null && answerRefs.current[openIndex]) {
        gsap.to(answerRefs.current[openIndex], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
      
      // Open new
      if (answerEl) {
        gsap.set(answerEl, { height: 'auto', opacity: 1 });
        const height = answerEl.offsetHeight;
        gsap.fromTo(
          answerEl,
          { height: 0, opacity: 0 },
          { height, opacity: 1, duration: 0.3, ease: 'power2.inOut' }
        );
      }
      setOpenIndex(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-start items-center"
      style={{ backgroundColor, padding: title ? '60px 20px' : '0' }}
    >
      {title && (
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
          {title}
        </h2>
      )}

      <div style={{ maxWidth: '800px', width: '100%' }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item hover-card-sm"
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

            {/* Answer Content */}
            <div
              ref={el => { answerRefs.current[index] = el; }}
              style={{
                height: 0,
                opacity: 0,
                overflow: 'hidden',
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
    </section>
  );
}

export default UXUIDCAnimatedFAQ;
