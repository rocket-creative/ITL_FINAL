/**
 * Thank You Page
 * Displays after successful form submission
 * Hidden from search engines (noindex, nofollow)
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  IconCheckCircle,
  IconArrowRight,
} from '@/components/UXUIDC';
import { pushGenericThankYou } from '@/lib/analytics/gtmEvents';

export default function ThankYouPage() {
  useEffect(() => {
    pushGenericThankYou();
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', { method: 'thank_you_page' });
    }
  }, []);
  return (
    <>
      {/* SEO: Hidden from search engines */}
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Thank You | Ingenious Targeting Laboratory</title>
      </head>

      <UXUIDCNavigation />
      
      <main id="main-content" style={{
        backgroundColor: '#f9fafb',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Success Icon */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#008080',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <IconCheckCircle style={{ width: '48px', height: '48px', color: 'white' }} />
            </div>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            textAlign: 'center',
            color: '#1a1a1a',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            Thank You for Your Submission!
          </h1>

          {/* Main Message */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '2.5rem',
          }}>
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: '#2c2c2c',
              marginBottom: '1.5rem',
            }}>
              We're thrilled to connect with you. Your form has been successfully submitted, and we're already working on your request.
            </p>
            
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#4b5563',
              marginBottom: '0',
            }}>
              In the meantime, here are a few ways you can stay engaged and get the most out of our services:
            </p>
          </div>

          {/* Action Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            
            {/* Explore Resources */}
            <Link 
              href="/resources/"
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                border: '2px solid transparent',
              }}
              className="thank-you-card"
            >
              <div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  color: '#008080',
                  marginBottom: '0.5rem',
                }}>
                  Explore Our Latest Resources
                </h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#6b7280',
                  margin: 0,
                }}>
                  Visit our blog for the latest insights, tips, and trends in mouse model research
                </p>
              </div>
              <IconArrowRight style={{ width: '24px', height: '24px', color: '#008080', flexShrink: 0, marginLeft: '1rem' }} />
            </Link>

            {/* LabSignals */}
            <a 
              href="https://labsignals.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                border: '2px solid transparent',
              }}
              className="thank-you-card"
            >
              <div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  color: '#008080',
                  marginBottom: '0.5rem',
                }}>
                  Explore LabSignals
                </h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#6b7280',
                  margin: 0,
                }}>
                  Discover our advanced laboratory information management solutions
                </p>
              </div>
              <IconArrowRight style={{ width: '24px', height: '24px', color: '#008080', flexShrink: 0, marginLeft: '1rem' }} />
            </a>

            {/* Schedule Consultation */}
            <Link 
              href="/schedule-meeting/"
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                border: '2px solid transparent',
              }}
              className="thank-you-card"
            >
              <div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  color: '#008080',
                  marginBottom: '0.5rem',
                }}>
                  Schedule a Consultation
                </h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#6b7280',
                  margin: 0,
                }}>
                  Need immediate assistance? Schedule a free consultation with our experts
                </p>
              </div>
              <IconArrowRight style={{ width: '24px', height: '24px', color: '#008080', flexShrink: 0, marginLeft: '1rem' }} />
            </Link>

          </div>

          {/* Footer Message */}
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <p style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: '0.5rem',
            }}>
              Thank you for choosing Ingenious Targeting Laboratory
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              margin: 0,
            }}>
              We look forward to assisting you with your research needs!
            </p>
          </div>

          {/* Back to Home */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link 
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#008080',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              ← Return to Homepage
            </Link>
          </div>

        </div>
      </main>

      <UXUIDCFooter />

      <style jsx>{`
        .thank-you-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
          border-color: #008080 !important;
        }
      `}</style>
    </>
  );
}
