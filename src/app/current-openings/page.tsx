'use client';

/**
 * Careers / Current Openings Page - ingenious targeting laboratory
 * Job board style page showing current opportunities
 */

import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconCheckCircle,
  BreedingSchemeArchitectCTA,
  LabSignalsSignup,
} from '@/components/UXUIDC';

// Brand colors
const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  lightTeal: '#00d4d4',
  white: '#ffffff',
  lightGray: '#f8fafc',
  text: '#333333',
};

export default function CurrentOpeningsPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '70px 20px 50px',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(0,128,128,0.3)',
              padding: '6px 14px',
              borderRadius: '20px',
              marginBottom: '16px',
            }}>
              <IconBriefcase size={14} color="#00d4d4" />
              <span style={{ color: '#00d4d4', fontSize: '.75rem', fontWeight: 500 }}>
                Careers
              </span>
            </div>
            
            <h1 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              fontWeight: 700,
              color: BRAND.white,
              marginBottom: '16px',
              lineHeight: 1.2
            }}>
              Join Our Team
            </h1>
            
            <p style={{
              fontSize: '1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Be part of a team that's advancing biomedical research through innovative mouse model technologies.
            </p>
          </div>
        </section>

        {/* Current Openings Section */}
        <section style={{
          background: BRAND.white,
          padding: '60px 20px',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: BRAND.navy,
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              Current Openings
            </h2>
            
            {/* No Openings Message */}
            <div style={{
              backgroundColor: BRAND.lightGray,
              borderRadius: '12px',
              padding: '48px 32px',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(0,128,128,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <IconBriefcase size={28} color={BRAND.teal} />
              </div>
              
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: BRAND.navy,
                marginBottom: '12px',
              }}>
                No Current Openings
              </h3>
              
              <p style={{
                fontSize: '.95rem',
                color: '#666',
                lineHeight: 1.6,
                maxWidth: '450px',
                margin: '0 auto 24px',
              }}>
                We don't have any positions available at this time. However, we're always interested in hearing from talented individuals.
              </p>
              
              <a
                href="mailto:inquiry@genetargeting.com?subject=Career Inquiry"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: BRAND.teal,
                  color: BRAND.white,
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <IconMail size={18} />
                Send Your Resume
              </a>
            </div>
          </div>
        </section>

        {/* Why Work Here Section */}
        <section style={{
          background: BRAND.lightGray,
          padding: '60px 20px',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: BRAND.navy,
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              Why Work at ingenious
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Cutting Edge Science',
                  description: 'Work with advanced gene targeting technologies and contribute to groundbreaking biomedical research.',
                },
                {
                  title: 'Collaborative Environment',
                  description: 'Join a team of dedicated scientists and professionals passionate about advancing research.',
                },
                {
                  title: 'Long Island Location',
                  description: 'Our facility in Ronkonkoma, NY offers easy access to NYC and Long Island communities.',
                },
                {
                  title: '26+ Years of Excellence',
                  description: 'Be part of a company with a proven track record and over 2,500 successful projects.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: BRAND.white,
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <IconCheckCircle size={20} color={BRAND.teal} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: BRAND.navy,
                        marginBottom: '8px',
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '.9rem',
                        color: '#666',
                        lineHeight: 1.5,
                        margin: 0,
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Location Section */}
        <section style={{
          background: BRAND.white,
          padding: '60px 20px',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}>
              <IconMapPin size={20} color={BRAND.teal} />
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: BRAND.navy,
              }}>
                Our Location
              </span>
            </div>
            
            <p style={{
              fontSize: '.95rem',
              color: '#666',
              lineHeight: 1.6,
            }}>
              ingenious targeting laboratory<br />
              761-80 Coates Avenue<br />
              Holbrook, NY 11741
            </p>
          </div>
        </section>

        {/* Lab Signals Newsletter */}
        <section style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Learn About Latest Research"
              description="Stay connected with the scientific community. Get research insights, technical guides, and breakthrough discoveries delivered to your inbox."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: BRAND.navy,
          padding: '50px 20px',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: BRAND.white,
              marginBottom: '16px',
            }}>
              Questions About Careers?
            </h2>
            <p style={{
              fontSize: '.95rem',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '24px',
              lineHeight: 1.6,
            }}>
              Contact us to learn more about working at ingenious targeting laboratory.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <a
                href="mailto:inquiry@genetargeting.com?subject=Career Inquiry"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: BRAND.teal,
                  color: BRAND.white,
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <IconMail size={18} />
                Contact Us
              </a>
              <Link
                href="/about-itl"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: BRAND.white,
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '.9rem',
                  fontWeight: 500,
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <UXUIDCFooter />
    </div>
  );
}
