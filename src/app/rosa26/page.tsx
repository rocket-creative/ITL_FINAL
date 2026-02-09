'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  LegacyInfoLink,
  UXUIDCResourceLinks,
  rosa26Resources,
  BreedingSchemeArchitectCTA,
  LabSignalsSignup,
} from '@/components/UXUIDC';
import { IconDNA, IconSettings, IconCheckCircle, IconChevronRight } from '@/components/UXUIDC/Icons';

// Legacy content link
const legacyContentUrl = '/legacy/rosa26';

const heroData = {
  badge: 'Safe Harbor Targeting',
  title: 'Rosa26 Locus Targeting',
  intro: 'Targeted transgenic mice using the Rosa26 locus.',
  description: 'Rapid-Rosa26™ Targeting technology is ingenious\' solution for custom targeted transgenic models with shorter production timelines and reduced cost, without compromising performance and quality.',
};

const benefits = [
  'Predictable targeting',
  'Increased accuracy',
  'Shorter model generation timelines',
  'Overall lower production costs',
  'Stable gene expression without perturbing endogenous genes',
];

const modelTypes = [
  { title: 'Constitutive Expression', description: 'Continuous expression from Rosa26 or CAG promoter' },
  { title: 'Tissue-Specific Expression', description: 'Expression controlled by tissue-specific Cre lines' },
  { title: 'Conditional Expression', description: 'Inducible expression with Cre or other systems' },
];

export default function Rosa26Page() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }

      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    };

    loadGSAP();
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
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
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
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
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
              {heroData.title}
            </h1>

            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1.1rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
                marginBottom: '15px',
                maxWidth: '800px',
              }}
            >
              {heroData.intro}
            </p>

            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.6rem',
                marginBottom: '25px',
                maxWidth: '800px',
              }}
            >
              {heroData.description}
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  minWidth: '160px',
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

        {/* Benefits Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '30px',
              }}
            >
              Why Target the Rosa26 Locus?
            </h2>

            <ul className="animate-in" style={{ listStyle: 'none', padding: 0 }}>
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '15px',
                    color: '#555',
                    fontSize: '1rem',
                  }}
                >
                  <IconCheckCircle size={20} color="#008080" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Model Types Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              Rosa26 Mouse Model Types
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modelTypes.map((model, i) => (
                <div
                  key={i}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderTop: '4px solid #008080',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <IconSettings size={24} color="#008080" />
                  </div>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {model.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.5rem' }}>
                    {model.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Rosa26 */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              What is the Rosa26 Locus?
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '20px' }}>
              Rosa26 refers to a specific site on mouse chromosome 6. It was identified in a screen designed to find places in the genome where the insertion of foreign DNA would not have unpredictable results.
            </p>
            <p className="animate-in" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8rem' }}>
              The Rosa26 locus is a genomic safe harbor—a targeted insertion site for foreign DNA that does not impact the growth, development or fertility of the resulting transgenic mice. This makes it ideal for integrating transgenes for stable expression.
            </p>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Rosa26 Project
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your targeted transgenic requirements and determine the optimal strategy for your research goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '12px 30px',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <span>Request a Quote</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              title="Stay Current on Safe Harbor Targeting"
              description="Subscribe to Lab Signals for the latest Rosa26 targeting updates and transgenic model insights."
            />
          </div>
        </section>

        {/* Legacy Content Link */}
        <section style={{ backgroundColor: '#e8f5f5', padding: '30px 20px', borderTop: '3px solid #008080' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <p style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 500, marginBottom: '5px' }}>
                Looking for detailed technical information?
              </p>
              <p style={{ color: '#666', fontSize: '.85rem' }}>
                View our comprehensive legacy documentation with in-depth specifications.
              </p>
            </div>
            <LegacyInfoLink href={legacyContentUrl} />
          </div>
        </section>

        {/* Downloadable Resources Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Rosa26 Resources"
              description="Download our free Rapid-Rosa26™ Quick Guide to learn more about our accelerated targeting technology."
              resources={rosa26Resources}
              variant="card"
            />
          </div>
        </section>

        {/* Related Links */}
        <section style={{ backgroundColor: 'white', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>
              Related Services
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Safe Harbor Locus', href: '/safe-harbor-locus' },
                { label: 'Rapid-Rosa26™ Targeting', href: '/rapid-rosa26-targeting' },
                { label: 'Knockin Mouse Models', href: '/knockin-mouse-models' },
                { label: 'Transgenic Mouse Service', href: '/transgenic-mouse-service' },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                  style={{ color: '#2384da', fontSize: '.9rem' }}
                >
                  <IconChevronRight size={14} color="#2384da" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />
    </div>
  );
}
