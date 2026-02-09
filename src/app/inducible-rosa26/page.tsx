'use client';

/**
 * Inducible Rosa26 Page - ingenious targeting laboratory
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCStartProjectCTA,
  IconDNA,
  IconArrowRight,
  BreedingSchemeArchitectCTA,
  LabSignalsSignup,
} from '@/components/UXUIDC';

gsap.registerPlugin(ScrollTrigger);

export default function InducibleRosa26Page() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero Section */}
        <section
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div
              className="hero-animate"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px',
              }}
            >
              <IconDNA size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>Knockin Technology</span>
            </div>
            <h1
              className="hero-animate"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.8rem',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Inducible Rosa26 Targeting
            </h1>
            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
                maxWidth: '800px',
              }}
            >
              Combine the advantages of Rosa26 safe harbor targeting with inducible expression systems. Inducible Rosa26 knockins enable temporal control over transgene expression using doxycycline-regulated or tamoxifen-inducible systems.
            </p>
            <div className="hero-animate flex flex-wrap gap-4 mt-6">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>Request a Quote</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Inducible Expression Systems
            </h2>
            <p
              className="animate-in"
              style={{
                color: '#666',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.8rem',
                marginBottom: '25px',
              }}
            >
              Inducible Rosa26 targeting combines the predictable expression of the Rosa26 locus with temporal control systems. This approach enables researchers to activate transgene expression at specific developmental stages or in adult animals, avoiding potential developmental effects and enabling acute versus chronic expression studies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: '#f7f7f7',
                  padding: '25px',
                  border: '.5px solid #e0e0e0',
                  borderTop: '4px solid #008080',
                }}
              >
                <h3 style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                  Doxycycline-Inducible
                </h3>
                <p style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem' }}>
                  Tet-On and Tet-Off systems provide reversible control over transgene expression through doxycycline administration in drinking water or food.
                </p>
              </div>
              <div
                className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: '#f7f7f7',
                  padding: '25px',
                  border: '.5px solid #e0e0e0',
                  borderTop: '4px solid #134978',
                }}
              >
                <h3 style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                  Cre-Dependent Expression
                </h3>
                <p style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem' }}>
                  LSL (lox-STOP-lox) cassettes enable Cre-dependent activation, allowing tissue-specific or temporally controlled expression when combined with Cre driver lines.
                </p>
              </div>
            </div>

            <h2
              className="animate-in"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Applications
            </h2>
            <ul
              className="animate-in"
              style={{
                color: '#666',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.8rem',
                paddingLeft: '25px',
                marginBottom: '30px',
              }}
            >
              <li style={{ marginBottom: '10px' }}>Studying gene function in adult animals without developmental effects</li>
              <li style={{ marginBottom: '10px' }}>Comparing acute versus chronic expression phenotypes</li>
              <li style={{ marginBottom: '10px' }}>Disease modeling with controlled onset</li>
              <li style={{ marginBottom: '10px' }}>Reversible expression studies</li>
              <li style={{ marginBottom: '10px' }}>Dose-dependent expression analysis</li>
            </ul>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* Related Links */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h3
              className="animate-in text-center"
              style={{
                color: '#333',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              Related Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Rosa26 Locus', href: '/rosa26' },
                { label: 'Safe Harbor Targeting', href: '/safe-harbor-locus' },
                { label: 'Knockin Mouse Models', href: '/knockin-mouse-models' },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="animate-in transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    backgroundColor: 'white',
                    padding: '10px 20px',
                    border: '1px solid #e0e0e0',
                    color: '#008080',
                    fontSize: '.9rem',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {item.label}
                  <IconArrowRight size={14} color="#008080" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <UXUIDCStartProjectCTA
          title="Start Your Inducible Rosa26 Project"
          content="Our scientific consultants can help design the optimal inducible expression system for your research goals."
          buttons={[
            { label: 'Request a Quote', href: '/request-quote' },
            { label: 'Contact Us', href: '/contact' },
          ]}
        />

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              title="Stay Updated on Rosa26 and Inducible Expression Technologies"
              description="Get the latest insights on safe harbor targeting, temporal control systems, and advanced gene targeting strategies."
            />
          </div>
        </section>
      </main>

      <UXUIDCFooter />
    </div>
  );
}
