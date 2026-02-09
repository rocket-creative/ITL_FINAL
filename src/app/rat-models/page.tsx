'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  LegacyInfoLink,
  UXUIDCResourceLinks,
  ratModelResources,
  BreedingSchemeArchitectCTA,
  LabSignalsSignup,
} from '@/components/UXUIDC';
import { IconDNA, IconTarget, IconChevronRight } from '@/components/UXUIDC/Icons';

// Legacy content link
const legacyContentUrl = '/legacy/rat-models';

const heroData = {
  badge: 'Custom Animal Models',
  title: 'Rat Models',
  intro: 'Get your custom rat model in less time & with more certainty.',
  description: 'Our process ensures faster germline transmission modifications. We offer custom rat models, including conventional knockouts, conditional knockouts, reporter knockins, and humanized cDNA knockins, tailored to your research needs.',
};

const modelTypes = [
  { title: 'Conventional Knockout', description: 'Standard gene deletion for loss-of-function studies' },
  { title: 'Knockout/Reporter Knockin', description: 'Gene deletion with integrated reporter for visualization' },
  { title: 'Cre-conditional Knockout', description: 'Tissue-specific or inducible gene deletion using Cre-lox' },
  { title: 'Point Mutation Knockin', description: 'Precise base pair changes for disease modeling' },
  { title: 'Reporter Gene Knockin', description: 'Fluorescent or enzymatic reporters for expression tracking' },
  { title: 'Humanized cDNA Knockin', description: 'Human gene sequences for translational research' },
];

const strains = [
  { name: 'Sprague Dawley', type: 'outbred' },
  { name: 'Long Evans', type: 'outbred' },
  { name: 'Wistar', type: 'outbred' },
  { name: 'Lewis', type: 'inbred' },
];

export default function RatModelsPage() {
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '10px 20px',
                  minWidth: '160px',
                  border: '2px solid white',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>Talk to a Scientist</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Model Types Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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
              Types of Rat Models Available
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modelTypes.map((model, i) => (
                <div
                  key={i}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderTop: '4px solid #008080',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <IconTarget size={22} color="#008080" />
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

        {/* Strains Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}
            >
              Available Rat Strains
            </h2>
            <p className="animate-in text-center" style={{ color: '#666', fontSize: '.95rem', marginBottom: '30px' }}>
              Gene targeting available in diverse rat strains
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {strains.map((strain, i) => (
                <div
                  key={i}
                  className="animate-in text-center"
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '1rem', marginBottom: '5px' }}>
                    {strain.name}
                  </h4>
                  <span style={{ color: '#008080', fontSize: '.8rem', fontStyle: 'italic' }}>
                    ({strain.type})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Rats Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Why Rat Models?
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '20px' }}>
              Rats have been used to model human disease for over a century within a broad range of science fields including neurobiology, cardiology, immunology and toxicology.
            </p>
            <p className="animate-in" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8rem' }}>
              Their size and physiological similarity to humans make them an ideal choice for many labs. For example, surgical manipulations can be performed on rats that are difficult or impossible with smaller rodents, and fewer animals are required to generate sufficient material for experiments.
            </p>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Rat Model Project
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your rat model requirements and determine the optimal strategy for your research goals.
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
        <LabSignalsSignup 
          title="Track Your Custom Rat Model Project"
          description="Get real-time updates on your knockout, knockin, or conditional rat model development including germline transmission and phenotype validation milestones."
        />

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
              title="Rat Model Resources"
              description="Download our free guides to learn more about custom rat model generation."
              resources={ratModelResources}
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
                { label: 'Custom Animal Models', href: '/custom-animal-models' },
                { label: 'Custom Rabbit Models', href: '/custom-rabbit-models' },
                { label: 'Transgenic Mouse Service', href: '/transgenic-mouse-service' },
                { label: 'Knockout Mouse Models', href: '/knockout-mouse-models' },
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
