'use client';

/**
 * Pricing Guide Client Component - ingenious targeting laboratory
 * Displays detailed pricing for model generation mouse, rat, and rabbit models
 */

import { useEffect, useRef } from 'react';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  IconArrowLeft,
  IconCheckCircle,
  CatalogCustomDualCta,
} from '@/components/UXUIDC';


// Pricing Data
const pricingTiers = [
  {
    category: 'Mouse Model Generation: Guaranteed Germline-Confirmed Mice',
    subtitle: 'Starting prices in C57BL/6 background',
    items: [
      {
        title: 'Knockouts and Point Mutations',
        price: '$17,297',
        description: null,
      },
      {
        title: 'Conditional Knockouts',
        price: '$22,298',
        description: 'Control where and when your gene of interest is inactivated. Add a reporter to label affected cells.',
      },
      {
        title: 'Rosa26 Transgenic Knockins',
        price: '$21,299',
        description: 'Knock in an overexpression or conditional overexpression construct.',
      },
      {
        title: 'Targeted Knockins',
        price: '$22,298',
        description: 'Make a new tissue-specific Cre or reporter line, or express a cDNA in place of another gene.',
      },
    ],
  },
  {
    category: 'Complex mouse models - an ingenious specialty',
    subtitle: null,
    items: [
      {
        title: 'TruView Conditional Knockout™ - Only from ingenious',
        price: '$30,297',
        description: 'Target large regions for conditional deletion. Strong GFP expression labels cells where knockout occurs independent of native promoter.',
      },
      {
        title: 'Conditional Point Mutation',
        price: '$33,297',
        description: 'Target gene initially expresses wild-type sequence which switches to mutant sequence when Cre is expressed. Hybrid (129x C57BL/6)',
      },
      {
        title: 'TruHumanization™ - Only from ingenious',
        price: '$39,999',
        description: 'Replace part of the genome - up to 200kb - with human sequence. Study the promoter and splicing of human genes. Hybrid (129x C57BL/6)',
      },
    ],
  },
  {
    category: 'Animal Models',
    subtitle: null,
    items: [
      {
        title: 'Generated Rat Models',
        price: '$32,500',
        description: 'Conventional KO, Point Mutation KI, cDNA/Cassette KI.',
      },
      {
        title: 'Rabbit Model Generation',
        price: '$150,000',
        description: 'Conventional KO, Point Mutation KI, Small Tag KI.',
      },
    ],
  },
];

// Why Choose Us
const whyChooseItems = [
  'Guaranteed Delivery: Germline-confirmed mice',
  'Advanced Capabilities: Large knockouts and knockins, conditional knockins, large-region replacements',
  'Trusted by over 900 laboratories worldwide',
  'Published in hundreds of journal articles',
  'Over 25 years of production in the USA',
];

export default function PricingGuideClient() {
  const heroRef = useRef<HTMLDivElement>(null);


  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Back Link */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Link
              href="/start-your-project"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#008080',
                fontSize: '.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#006666')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#008080')}
            >
              <IconArrowLeft size={16} color="#008080" />
              BACK TO START YOUR PROJECT PAGE
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="page-hero"
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '60px 20px',
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
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
            <h1
              className="hero-animate"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '15px',
              }}
            >
              Generated Mouse, Rat & Rabbit Model Pricing
            </h1>
            <p
              className="hero-animate"
              style={{
                color: '#ffffff',
                fontSize: '1.3rem',
                fontWeight: 600,
                lineHeight: 1.4,
                marginBottom: '20px',
              }}
            >
              A Better Model Is Within Reach.
            </p>
            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.7,
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              ingenious targeting laboratory (ingenious) specializes in creating advanced genetically engineered animal models for academic and commercial researchers worldwide. Trusted by <strong>over 900 laboratories</strong> and published in <strong>hundreds of journal articles</strong>, we deliver high-quality, germline confirmed models built to your specifications - <strong>guaranteed</strong>. Lock in today with transparent pricing that you can count on for your budget and timeline.
            </p>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="pricing-guide" utmMedium="page-hero" flush />
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ backgroundColor: '#134978', padding: '30px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p
              style={{
                color: 'white',
                fontSize: '1rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              <em>We offer a full range of services from simple knockouts to complex TruHumanization™ models.</em>{' '}
              <strong>Contact us for transparent pricing now and accelerate your research with guaranteed delivery!</strong>
            </p>
          </div>
        </section>

        {/* Pricing Tables */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {pricingTiers.map((tier, tierIndex) => (
              <div
                key={tierIndex}
                className="animate-in"
                style={{
                  marginBottom: tierIndex < pricingTiers.length - 1 ? '50px' : '0',
                }}
              >
                <h2
                  style={{
                    color: '#2384da',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    textAlign: 'center',
                  }}
                >
                  {tier.category}
                </h2>
                {tier.subtitle && (
                  <p
                    style={{
                      color: '#666',
                      fontSize: '.95rem',
                      textAlign: 'center',
                      marginBottom: '30px',
                      fontStyle: 'italic',
                    }}
                  >
                    {tier.subtitle}
                  </p>
                )}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: '20px',
                    marginTop: tier.subtitle ? '0' : '30px',
                  }}
                >
                  {tier.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      style={{
                        backgroundColor: '#f7f7f7',
                        padding: '28px',
                        borderRadius: '8px',
                        borderTop: '4px solid #008080',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <h3
                        style={{
                          color: '#333',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          marginBottom: '12px',
                          minHeight: '50px',
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.description && (
                        <p
                          style={{
                            color: '#666',
                            fontSize: '.9rem',
                            lineHeight: 1.6,
                            marginBottom: '16px',
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                      <div
                        style={{
                          fontSize: '2rem',
                          fontWeight: 700,
                          color: '#008080',
                          marginTop: 'auto',
                        }}
                      >
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Funding Banner */}
        <section style={{ backgroundColor: '#008080', padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p
              style={{
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                lineHeight: 1.7,
                marginBottom: '15px',
              }}
            >
              Is uncertain NIH funding holding you back from starting a much needed mouse model project? We have ways for you to start your project now and pay later.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                color: '#008080',
                padding: '12px 28px',
                borderRadius: '6px',
                fontSize: '.95rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contact us to find out how!
            </Link>
          </div>
        </section>

        {/* Why Choose Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '30px',
                textAlign: 'center',
              }}
            >
              Why Choose ingenious targeting laboratory?
            </h2>

            <ul
              className="animate-in"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gap: '16px',
              }}
            >
              {whyChooseItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                  }}
                >
                  <IconCheckCircle size={20} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2
              className="animate-in"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}
            >
              Ready to Start Your Project?
            </h2>
            <p
              className="animate-in"
              style={{
                color: 'rgba(255,255,255,0.95)',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '30px',
              }}
            >
              Request a quote today and speak with one of our scientists about your project goals.
            </p>

            <div
              className="animate-in"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/request-quote"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '2px solid white',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom dual-path CTA */}
      <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta slug="pricing-guide" utmMedium="page-closing" flush />
        </div>
      </section>

      <UXUIDCFooter />

      {/* Schema.org Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Start Your Project', path: '/start-your-project' },
          { name: 'Pricing Guide', path: '/pricing-guide' },
        ]}
      />
    </div>
  );
}
