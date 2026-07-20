'use client';

/**
 * Lab Signals Page - Newsletter Hub
 * @version 2.0.0 - Removed GSAP, using CSS animations only
 * NO nav, NO footer (except gold CTA)
 * Colors: gold #fb0, black, grey, white only
 * Same fonts/animations as Ingenious site
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FlodeskForm,
  IconFileText,
  IconArrowRight,
  IconTarget,
  IconFlask,
  IconMail,
  BreadcrumbSchema,
  CatalogCustomDualCta,
} from '@/components/UXUIDC';
import { 
  getPublishedArticles,
  getAllCategories,
} from '@/data/newsletterArticles';

// Lab Signals colors - gold, black, grey, white only
const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  mediumGray: '#888888',
  darkGray: '#444444',
  borderGray: '#d0d0d0',
};

// RSS Icon (flat grey)
const RSSIcon = ({ color = BRAND.mediumGray }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
    <circle cx="6.18" cy="17.82" r="2.18"/>
    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
  </svg>
);

export default function LabSignalsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getAllCategories();

  // Filter articles
  const filteredArticles = getPublishedArticles().filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <style jsx global>{`
        body, html {
          background-color: #ffffff !important;
          min-height: 100%;
          height: auto !important;
        }
        /* Lab Signals hero - mobile first; desktop (md: 810px): content panel ~55% width, right-justified */
        @media (min-width: 810px) {
          .lab-signals-hero {
            flex-direction: row !important;
            margin: 0 !important;
            min-height: 520px !important;
            padding: 80px 40px !important;
          }
          .lab-signals-hero-spacer {
            display: block !important;
            flex: 1 1 0% !important;
            min-width: 0 !important;
          }
          .lab-signals-hero-content {
            width: 55% !important;
            max-width: 500px !important;
            height: auto !important;
            align-self: flex-end !important;
            flex-shrink: 0 !important;
            padding: 40px 36px 40px 48px !important;
            text-align: right !important;
            border-radius: 10px !important;
            background-color: rgba(255,255,255,0.4) !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06) !important;
            border: 1px solid rgba(255,255,255,0.5) !important;
            backdrop-filter: blur(12px) !important;
          }
          .lab-signals-hero-badge {
            margin-left: auto !important;
            margin-right: 0 !important;
          }
          .lab-signals-hero-buttons {
            justify-content: flex-end !important;
          }
        }
        @media (max-width: 809px) {
          .lab-signals-hero {
            min-height: auto !important;
            padding: 0 !important;
            flex-direction: column !important;
            background-size: cover !important;
            background-position: center !important;
          }
          .lab-signals-hero-spacer {
            display: none !important;
          }
          .lab-signals-hero-content {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 1.5rem 1.25rem 2rem !important;
            text-align: center !important;
            border-radius: 0 !important;
            background-color: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            backdrop-filter: none !important;
          }
          .lab-signals-hero-content h1 {
            font-size: clamp(1.625rem, 4.8vw, 2.25rem) !important;
            line-height: 1.15 !important;
          }
          .lab-signals-hero-badge {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .lab-signals-hero-buttons {
            justify-content: center !important;
          }
          .lab-signals-video-section {
            min-height: 280px !important;
          }
        }
        @media (min-width: 810px) {
          .lab-signals-video-section {
            min-height: 400px !important;
          }
        }
      `}</style>
      <div style={{ backgroundColor: BRAND.white, minHeight: '100%' }}>
        {/* Page wrapper - 1200px max for all sections with thin border */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        border: `1px solid ${BRAND.borderGray}`,
        borderTop: 'none',
      }}>
        
        {/* Hero Section - Header Image with Content Below on Mobile */}
        <section>
          {/* Back to Ingenious - top bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            padding: '12px 16px',
            backgroundColor: BRAND.white,
          }}>
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
                padding: '14px 20px',
                borderRadius: '6px',
                border: `2px solid ${BRAND.black}`,
              }}
            >
              ← Back to Ingenious
            </Link>
          </div>

          {/* Hero - Full Width Background Image with Right-Justified Content */}
          <div 
            className="lab-signals-hero"
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              minHeight: '480px',
              margin: 0,
              padding: '48px 24px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
              backgroundImage: 'url(/images/lab-signals-header.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#f8f8f8',
            }}
          >
            {/* Spacer - pushes content to right on desktop */}
            <div 
              className="lab-signals-hero-spacer" 
              aria-hidden 
              style={{ display: 'none' }}
            />
            
            {/* Right Content Panel - constrained width, NOT full height (inline styles to avoid overrides) */}
            <div 
              className="lab-signals-hero-content"
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '28px 20px',
                backgroundColor: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(12px)',
                textAlign: 'center',
                borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              <div className="animate-initial animate-fade-in-up lab-signals-hero-badge inline-flex items-center gap-2 mx-auto mb-4"
                style={{
                  backgroundColor: BRAND.gold,
                  padding: '8px 18px',
                  borderRadius: '24px',
                  width: 'fit-content',
                  letterSpacing: '0.08em',
                  boxShadow: '0 2px 8px rgba(251,187,0,0.25)',
                }}>
                <IconMail size={14} color={BRAND.black} />
                <span style={{ 
                  color: BRAND.black, 
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.7rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}>
                  Biweekly Newsletter
                </span>
              </div>

              <h1 className="animate-initial animate-fade-in-up" style={{
                color: BRAND.black,
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.9rem, 4vw, 2.9rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '10px',
                letterSpacing: '-0.02em',
              }}>
                Lab Signals
              </h1>

              <h2 className="animate-initial animate-fade-in-up" style={{
                color: BRAND.darkGray,
                fontFamily: 'Lato, sans-serif',
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                fontWeight: 400,
                lineHeight: 1.5,
                marginBottom: '28px',
                letterSpacing: '0.01em',
              }}>
                Your Biweekly Source for Life Science Research Insights
              </h2>

              {/* Subscribe Buttons - visible in content panel */}
              <div className="animate-initial animate-fade-in-up lab-signals-hero-buttons flex gap-3 flex-wrap justify-center">
                <a
                  href="#signup"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: BRAND.gold,
                    color: BRAND.black,
                    padding: '16px 28px',
                    borderRadius: '8px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.9rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(251,187,0,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Subscribe Free
                </a>
                <a
                  href="/api/rss/lab-signals"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    backgroundColor: BRAND.white,
                    color: BRAND.black,
                    padding: '16px 22px',
                    borderRadius: '8px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.9rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    border: `1px solid ${BRAND.borderGray}`,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND.lightGray;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = BRAND.mediumGray;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND.white;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = BRAND.borderGray;
                  }}
                >
                  <RSSIcon color={BRAND.black} /> RSS
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section style={{ backgroundColor: BRAND.white, padding: '40px 20px 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <CatalogCustomDualCta slug="lab-signals" utmMedium="page-hero" flush />
          </div>
        </section>

        {/* Section: Synopsis - Get Excited */}
        <section style={{ backgroundColor: BRAND.white, padding: '50px 20px' }}>
          <div className="animate-initial animate-fade-in-up" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              color: BRAND.gold,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
              fontWeight: 700,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>
              Free Genome Editing Resource for Researchers
            </h2>
            <p style={{
              color: BRAND.darkGray,
              fontFamily: 'Lato, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              marginBottom: '25px',
            }}>
              As part of Ingenious Targeting Laboratory's ongoing commitment to supporting the scientific community, we're excited to offer our new Genome Editing resource  —  Lab Signals.
            </p>
            <p style={{
              color: BRAND.darkGray,
              fontFamily: 'Lato, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              marginBottom: '25px',
            }}>
              We believe that sharing knowledge freely strengthens our collective innovation and accelerates breakthroughs in genome editing and mouse model research.
            </p>
            <p style={{
              color: BRAND.darkGray,
              fontFamily: 'Lato, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              marginBottom: '25px',
            }}>
              Each issue includes valuable trends, expert analyses, and novel applications designed to benefit your research directly.
            </p>
            <p style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.2rem',
              fontWeight: 600,
              lineHeight: 1.8,
            }}>
              Join our community today—there's no cost, just great science!
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '20px',
              marginTop: '35px',
            }}>
              {[
                { number: '1,200+', label: 'Active Subscribers' },
                { number: '20+', label: 'Expert Articles' },
                { number: '6', label: 'Research Areas' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    color: BRAND.gold,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    marginBottom: '5px',
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    color: BRAND.mediumGray,
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '.9rem',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Video - Full width and height */}
        <section className="lab-signals-video-section" style={{ 
          backgroundColor: BRAND.lightGray, 
          padding: 0, 
          width: '100%',
          position: 'relative',
          aspectRatio: '16/9',
          minHeight: '280px',
        }}>
          <video
            className="animate-initial animate-fade-in-up"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            controls
            preload="metadata"
            poster="/images/lab-signals-header.png"
          >
            <source src="/videos/lab-signals-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        {/* Section: Signup */}
        <section id="signup" style={{ backgroundColor: BRAND.white, padding: '35px 20px 40px' }}>
          <div className="animate-initial animate-fade-in-up" style={{ maxWidth: '550px', margin: '0 auto' }}>
            <FlodeskForm />
          </div>
        </section>

        {/* Section: Why Researchers Like You Stay Connected */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="animate-initial animate-fade-in-up" style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '35px',
              textAlign: 'center',
            }}>
              Why Researchers Like You Stay Connected
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 text-left">
              <div className="animate-initial animate-fade-in-up">
                <p style={{
                  color: BRAND.darkGray,
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: '8px',
                }}>
                  <span style={{ fontWeight: 700, color: BRAND.black }}>•Expert Analysis</span> — Written by PhD-level scientists, grounded in real-world research
                </p>
              </div>
              
              <div className="animate-initial animate-fade-in-up">
                <p style={{
                  color: BRAND.darkGray,
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: '8px',
                }}>
                  <span style={{ fontWeight: 700, color: BRAND.black }}>•Actionable Insights</span> — Apply trends and innovations directly to your projects
                </p>
              </div>
              
              <div className="animate-initial animate-fade-in-up">
                <p style={{
                  color: BRAND.darkGray,
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: '8px',
                }}>
                  <span style={{ fontWeight: 700, color: BRAND.black }}>•Exclusive Access</span> — Get the latest issue + our full archive of past articles instantly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Featured Articles */}
        <section style={{ backgroundColor: BRAND.white, padding: '60px 20px' }}>
          <div>
          <div className="animate-initial animate-fade-in-up" style={{ 
            textAlign: 'center',
            marginBottom: '40px' 
          }}>
            <h2 style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '15px',
              letterSpacing: '-0.01em',
            }}>
              We Read the Most Important...
            </h2>
            <h3 style={{
              color: BRAND.darkGray,
              fontFamily: 'Lato, sans-serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 400,
              lineHeight: 1.5,
            }}>
              Recent Biomedical Articles That Used Mouse Models and This Is What We Learned:
            </h3>
          </div>

          {/* Search Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: '30px' 
          }}>
            <input
              type="search"
              placeholder="Search articles..."
              aria-label="Search articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30"
              style={{
                padding: '12px 16px',
                fontFamily: 'Lato, sans-serif',
                fontSize: '.95rem',
                border: `1px solid ${BRAND.borderGray}`,
                borderRadius: '6px',
                width: '100%',
                maxWidth: '400px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = BRAND.mediumGray}
              onBlur={(e) => e.currentTarget.style.borderColor = BRAND.borderGray}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '12px 20px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.8rem',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === category ? BRAND.black : BRAND.lightGray,
                  color: selectedCategory === category ? BRAND.white : BRAND.darkGray,
                  transition: 'all 0.2s ease',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '30px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}>
            {filteredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/lab-signals/${article.slug}`}
                className="animate-initial animate-fade-in-up"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: BRAND.white,
                  border: `2px solid ${BRAND.borderGray}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderColor = BRAND.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = BRAND.borderGray;
                }}
              >
                <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    color: BRAND.mediumGray,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                  }}>
                    Article {index + 1}
                  </div>
                  
                  <h3 style={{
                    color: BRAND.black,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    marginBottom: '12px',
                  }}>
                    {article.title}
                  </h3>
                  
                  <p style={{
                    color: BRAND.darkGray,
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '.9rem',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    flex: 1,
                  }}>
                    {article.description}
                  </p>
                  
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: BRAND.gold,
                    color: BRAND.black,
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Read More!
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <p style={{ color: BRAND.darkGray, fontFamily: 'Lato, sans-serif' }}>No articles found.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                style={{
                  marginTop: '12px',
                  padding: '14px 24px',
                  backgroundColor: BRAND.black,
                  color: BRAND.white,
                  fontFamily: 'Poppins, sans-serif',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Clear Filters
              </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom dual-path CTA */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '40px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <CatalogCustomDualCta slug="lab-signals" utmMedium="page-closing" flush />
          </div>
        </section>

        {/* Section: Final CTA - Gold */}
        <section style={{ backgroundColor: BRAND.gold, padding: '40px 20px' }}>
          <div className="animate-initial animate-fade-in-up" style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '6px' }}>
              <IconMail size={32} color={BRAND.black} style={{ flexShrink: 0 }} />
              <h2 style={{
                color: BRAND.black,
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                margin: 0,
              }}>
                Join Lab Signals Today
              </h2>
            </div>
            <p style={{ 
              color: 'rgba(0,0,0,0.7)', 
              fontFamily: 'Lato, sans-serif',
              fontSize: '.9rem', 
              marginBottom: '18px',
              lineHeight: 1.5,
            }}>
              Join thousands of researchers receiving biweekly insights.
            </p>
            <FlodeskForm />
            
            {/* Back to Ingenious Button */}
            <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid rgba(0,0,0,0.15)' }}>
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
                  padding: '14px 24px',
                  borderRadius: '6px',
                  border: `2px solid ${BRAND.black}`,
                }}
              >
                ← Back to Ingenious
              </Link>
            </div>
          </div>
        </section>

      </div>

        {/* Breadcrumb Schema */}
        <BreadcrumbSchema 
          items={[
            { name: 'Home', path: '/' },
            { name: 'Lab Signals', path: '/lab-signals' },
          ]}
        />
      </div>
    </>
  );
}
