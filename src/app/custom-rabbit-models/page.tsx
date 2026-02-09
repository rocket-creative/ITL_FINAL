'use client';

/**
 * Custom Rabbit Models Page - ingenious targeting laboratory
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
} from '@/components/UXUIDC';

gsap.registerPlugin(ScrollTrigger);

export default function CustomRabbitModelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

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
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>Custom Animal Models</span>
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
              Custom Rabbit Models
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
              ingenious targeting laboratory offers custom genetically modified rabbit model services for research applications requiring larger animal size, specific immunological characteristics, or physiological features not available in rodent models.
            </p>
            <div className="hero-animate flex flex-wrap gap-4 mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>Contact Us to Discuss</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Rabbit Model Applications
            </h2>
            <p
              style={{
                color: '#666',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.8rem',
                marginBottom: '20px',
              }}
            >
              Rabbits offer unique advantages for certain research applications compared to rodent models:
            </p>
            <ul
              style={{
                color: '#666',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.8rem',
                paddingLeft: '25px',
                marginBottom: '30px',
              }}
            >
              <li style={{ marginBottom: '10px' }}>Larger size for surgical procedures and sample collection</li>
              <li style={{ marginBottom: '10px' }}>Physiological similarities to humans in cardiovascular and lipid metabolism</li>
              <li style={{ marginBottom: '10px' }}>Established models for atherosclerosis and cardiovascular disease</li>
              <li style={{ marginBottom: '10px' }}>Ophthalmology research applications</li>
              <li style={{ marginBottom: '10px' }}>Immunology and antibody production studies</li>
            </ul>
            
            <div
              style={{
                backgroundColor: '#f7f7f7',
                padding: '25px',
                border: '.5px solid #e0e0e0',
                borderLeft: '4px solid #008080',
                marginBottom: '30px',
              }}
            >
              <h3
                style={{
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                Custom Project Consultation
              </h3>
              <p
                style={{
                  color: '#666',
                  fontSize: '.95rem',
                  fontWeight: 400,
                  lineHeight: '1.6rem',
                }}
              >
                Contact our scientific team to discuss your rabbit model requirements. We will evaluate your research goals and provide guidance on project feasibility, timeline, and approach.
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h3
              style={{
                color: '#333',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              Explore Other Model Types
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Custom Animal Models', href: '/custom-animal-models' },
                { label: 'Custom Mouse Models', href: '/custom-mouse-models' },
                { label: 'Rat Models', href: '/rat-models' },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
          title="Discuss Your Rabbit Model Project"
          content="Contact our scientific team to explore custom rabbit model options for your research."
          buttons={[
            { label: 'Contact Us', href: '/contact' },
            { label: 'Request a Quote', href: '/request-quote' },
          ]}
        />
      </main>

      <UXUIDCFooter />
    </div>
  );
}
