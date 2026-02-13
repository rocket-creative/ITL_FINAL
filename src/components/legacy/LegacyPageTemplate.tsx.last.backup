'use client';

/**
 * Legacy Page Template Component
 * 
 * This component renders legacy content with the new ITL design system.
 * Content is preserved verbatim from the legacy site.
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCStartProjectCTA,
} from '@/components/UXUIDC';

gsap.registerPlugin(ScrollTrigger);

interface LegacyPageTemplateProps {
  /** Page title */
  title: string;
  
  /** Page description/intro */
  description?: string;
  
  /** The legacy HTML content to render */
  content: string;
  
  /** Legacy URL for reference */
  legacyUrl?: string;
  
  /** Related pages to link to */
  relatedPages?: Array<{ label: string; href: string }>;
  
  /** Whether to show the "Request Quote" CTA */
  showCTA?: boolean;
}

export default function LegacyPageTemplate({
  title,
  description,
  content,
  legacyUrl,
  relatedPages = [],
  showCTA = true,
}: LegacyPageTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

    // Content animation
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('h2, h3, p, ul, ol, table, blockquote');
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        );
      });
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
              {title}
            </h1>
            {description && (
              <p
                className="hero-animate"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  lineHeight: '1.7rem',
                  maxWidth: '700px',
                }}
              >
                {description}
              </p>
            )}
            {legacyUrl && (
              <p
                className="hero-animate"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '.75rem',
                  marginTop: '20px',
                }}
              >
                Original: {legacyUrl}
              </p>
            )}
          </div>
        </section>

        {/* Main Content Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div
              ref={contentRef}
              className="legacy-content"
              dangerouslySetInnerHTML={{ __html: content }}
              style={{
                color: '#333',
                fontSize: '1rem',
                lineHeight: '1.8',
              }}
            />
          </div>
        </section>

        {/* Related Pages */}
        {relatedPages.length > 0 && (
          <section style={{ backgroundColor: '#f7f7f7', padding: '40px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h3
                style={{
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '15px',
                }}
              >
                Related Pages
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {relatedPages.map((page, i) => (
                  <li key={i}>
<Link
                                      href={page.href}
                                      className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                      style={{
                                        display: 'inline-block',
                                        padding: '8px 16px',
                                        backgroundColor: 'white',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        color: '#008080',
                                        fontSize: '.9rem',
                                        textDecoration: 'none',
                                      }}
                                    >
                                      {page.label}
                                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA */}
        {showCTA && (
          <UXUIDCStartProjectCTA
            title="Ready to Start Your Project?"
            content="Contact our scientific team to discuss your research requirements and get a customized quote for your project."
            buttons={[
              { label: 'Request a Quote', href: '/request-quote' },
              { label: 'Contact Us', href: '/contact' },
            ]}
          />
        )}
      </main>

      <UXUIDCFooter />

      {/* Styles for legacy content */}
      <style jsx global>{`
        .legacy-content h2 {
          color: #2384da;
          font-family: 'Poppins', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 40px 0 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .legacy-content h3 {
          color: #333;
          font-family: 'Poppins', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 30px 0 15px;
        }
        
        .legacy-content h4 {
          color: #444;
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 25px 0 12px;
        }
        
        .legacy-content p {
          color: #666;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          margin-bottom: 18px;
        }
        
        .legacy-content ul,
        .legacy-content ol {
          color: #666;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          margin-bottom: 20px;
          padding-left: 25px;
        }
        
        .legacy-content li {
          margin-bottom: 8px;
        }
        
        .legacy-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
          font-size: .95rem;
        }
        
        .legacy-content th {
          background-color: #0a253c;
          color: white;
          padding: 14px;
          text-align: left;
          font-weight: 600;
        }
        
        .legacy-content td {
          padding: 14px;
          border: 1px solid #e0e0e0;
          color: #666;
        }
        
        .legacy-content tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .legacy-content blockquote {
          border-left: 4px solid #008080;
          padding: 15px 25px;
          margin: 25px 0;
          background-color: #f9f9f9;
          font-style: italic;
          color: #555;
        }
        
        .legacy-content a {
          color: #008080;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .legacy-content a:hover {
          color: #006666;
          text-decoration: underline;
        }
        
        .legacy-content strong {
          color: #333;
          font-weight: 600;
        }
        
        .legacy-content img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 20px 0;
        }
        
        .legacy-content hr {
          border: none;
          border-top: 1px solid #e0e0e0;
          margin: 40px 0;
        }
      `}</style>
    </div>
  );
}
