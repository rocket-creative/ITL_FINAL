'use client';

/**
 * Lab Signals Welcome Page Client Component
 * Sets cookie on mount and shows success message
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { IconCheckCircle, IconArrowRight, IconMail, IconFileText, IconBookOpen, BreadcrumbSchema } from '@/components/UXUIDC';

// Lab Signals colors
const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  mediumGray: '#888888',
  darkGray: '#444444',
  borderGray: '#d0d0d0',
};

const COOKIE_NAME = 'itl_labsignals_access';
const COOKIE_DAYS = 90;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export default function LabSignalsWelcomeClient() {
  useEffect(() => {
    // Set access cookie on mount
    setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
  }, []);

  return (
    <>
      <style jsx global>{`
        body, html {
          background-color: #ffffff !important;
          min-height: 100%;
          height: auto !important;
        }
      `}</style>
      <div style={{ backgroundColor: BRAND.white, minHeight: '100%' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          border: `1px solid ${BRAND.borderGray}`,
          borderTop: 'none',
        }}>
          
          {/* Success Hero */}
          <section style={{ 
            backgroundColor: BRAND.gold,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              minHeight: '400px',
            }}
            className="md:grid-cols-2">
              
              {/* Left Column - Content */}
              <div style={{
                padding: '60px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                zIndex: 2,
              }}
              className="md:text-left md:px-12">
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: BRAND.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
                className="md:mx-0">
                  <IconCheckCircle size={36} color={BRAND.gold} />
                </div>
                
                <h1 style={{
                  color: BRAND.black,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  marginBottom: '12px',
                  lineHeight: 1.2,
                }}>
                  Welcome to Lab Signals!
                </h1>
                
                <p style={{
                  color: 'rgba(0,0,0,0.8)',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  maxWidth: '600px',
                  margin: '0 auto 30px',
                }}
                className="md:mx-0">
                  You now have full access to all Lab Signals articles plus biweekly research insights 
                  delivered to your inbox.
                </p>

                {/* CTA Button - Shows on mobile, floats on desktop */}
                <Link
                  href="/lab-signals"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: BRAND.black,
                    color: BRAND.white,
                    padding: '14px 28px',
                    borderRadius: '6px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    margin: '0 auto',
                  }}
                  className="md:absolute md:bottom-12 md:right-12 md:z-10"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Browse All Articles
                  <IconArrowRight size={18} color={BRAND.white} />
                </Link>
              </div>

              {/* Right Column - Background Graphic (Desktop Only) */}
              <div style={{
                display: 'none',
                position: 'relative',
                backgroundImage: 'url(/images/lab-signals-graphic.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="md:block">
                {/* Gradient overlay for better button visibility */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,187,0,0.2) 0%, rgba(255,187,0,0.05) 100%)',
                }} />
              </div>
            </div>
          </section>

          {/* What's Next */}
          <section style={{ backgroundColor: BRAND.white, padding: '50px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{
                color: BRAND.black,
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                fontWeight: 700,
                marginBottom: '30px',
                textAlign: 'center',
              }}>
                What's Next?
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '20px',
              }}>
                {[
                  {
                    Icon: IconMail,
                    title: 'Check Your Inbox',
                    desc: 'Confirmation email on its way with your first newsletter'
                  },
                  {
                    Icon: IconFileText,
                    title: 'Explore Full Archive',
                    desc: 'Access all past articles and research insights'
                  },
                  {
                    Icon: IconBookOpen,
                    title: 'Save for Later',
                    desc: 'Bookmark articles to reference in your research'
                  }
                ].map((item, i) => (
                  <div key={i} style={{
                    backgroundColor: BRAND.lightGray,
                    padding: '24px',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: BRAND.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}>
                      <item.Icon size={24} color={BRAND.mediumGray} />
                    </div>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: BRAND.black,
                      marginBottom: '8px',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      color: BRAND.darkGray,
                      fontFamily: 'Lato, sans-serif',
                      fontSize: '.85rem',
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Back Link Section */}
          <section style={{ backgroundColor: BRAND.lightGray, padding: '40px 20px', textAlign: 'center' }}>
            <Link
              href="/"
              className="hover:bg-black hover:text-white transition-all duration-200"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: BRAND.white,
                color: BRAND.black,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                border: `2px solid ${BRAND.black}`,
              }}
            >
              ← Back to Ingenious
            </Link>
          </section>

        </div>

        <BreadcrumbSchema 
          items={[
            { name: 'Home', path: '/' },
            { name: 'Lab Signals', path: '/lab-signals' },
            { name: 'Welcome', path: '/lab-signals-welcome' },
          ]}
        />
      </div>
    </>
  );
}
