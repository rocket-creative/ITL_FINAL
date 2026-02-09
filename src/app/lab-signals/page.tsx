'use client';

/**
 * Lab Signals Page - Newsletter Hub
 * NO nav, NO footer (except gold CTA)
 * Colors: gold #fb0, black, grey, white only
 * Same fonts/animations as Ingenious site
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FlodeskForm,
  IconFileText,
  IconArrowRight,
  IconTarget,
  IconFlask,
  IconMail,
} from '@/components/UXUIDC';
import { 
  newsletterArticles, 
  getAllCategories,
} from '@/data/newsletterArticles';

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getAllCategories();

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

    // Scroll animations for sections
    const sections = document.querySelectorAll('.section-animate');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Card animations
    const cards = document.querySelectorAll('.card-animate');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Filter articles
  const filteredArticles = newsletterArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: BRAND.white }}>
      {/* Page wrapper - 1200px max for all sections with thin border */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        border: `1px solid ${BRAND.borderGray}`,
        borderTop: 'none',
      }}>
        
        {/* Hero Section - Header Image with Overlay Content */}
        <section ref={heroRef} style={{ position: 'relative' }}>
        {/* Back to Ingenious - floating top right */}
        <Link
          href="/"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            color: BRAND.black,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '.85rem',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Back to Ingenious →
        </Link>

        {/* Header Image */}
        <Image
          src="/images/lab-signals-header.png"
          alt="Lab Signals"
          width={1200}
          height={500}
          style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block',
          }}
          priority
        />

        {/* Floating Content - Right Justified with Glass Box */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '40px',
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '480px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <div className="hero-animate" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: BRAND.gold,
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '16px',
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
            <h1 className="hero-animate" style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '12px',
            }}>
              Lab Signals
            </h1>
            <p className="hero-animate" style={{
              color: BRAND.black,
              fontFamily: 'Lato, sans-serif',
              fontSize: 'clamp(.9rem, 2vw, 1.05rem)',
              lineHeight: 1.5,
              marginBottom: '24px',
            }}>
              Your Biweekly Source for Life Science Research Insights
            </p>
            <div className="hero-animate" style={{ 
              display: 'flex', 
              gap: '10px', 
              flexWrap: 'wrap',
              width: '100%',
            }}>
              <a
                href="#signup"
                style={{
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
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  flex: '1 1 auto',
                  minWidth: '140px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,187,0,0.4)';
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
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  color: BRAND.black,
                  padding: '12px 20px',
                  borderRadius: '6px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s ease',
                  flex: '0 1 auto',
                  minWidth: '100px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                }}
              >
                <RSSIcon color={BRAND.black} /> RSS
              </a>
            </div>
          </div>
        </div>
      </section>

        {/* Section: Video */}
        <section style={{ backgroundColor: BRAND.white, padding: '40px 20px', borderRadius: '0' }}>
          <div className="section-animate" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              src="https://mediazilla.com/xxexlvtJRB"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              title="Lab Signals Video"
            />
          </div>
        </div>
        </section>

        {/* Section: Signup */}
        <section id="signup" style={{ backgroundColor: BRAND.lightGray, padding: '35px 20px 40px' }}>
          <div className="section-animate" style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
              fontWeight: 700,
              marginBottom: '6px',
            }}>
              Sign Up for Free Access
            </h2>
            <p style={{ 
              color: BRAND.darkGray, 
              fontFamily: 'Lato, sans-serif',
              fontSize: '.9rem', 
              marginBottom: '18px',
              lineHeight: 1.5,
            }}>
              Get biweekly research insights delivered to your inbox
            </p>
            <FlodeskForm />
          </div>
        </section>

        {/* Section: Why Subscribe */}
        <section style={{ backgroundColor: BRAND.white, padding: '40px 20px', borderRadius: '0' }}>
          <div>
            <h2 className="section-animate" style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
              fontWeight: 700,
              marginBottom: '25px',
              textAlign: 'center',
            }}>
              Why Researchers Stay Connected
            </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}>
            {[
              { icon: IconFileText, title: "Expert Analysis", desc: "Written by PhD-level scientists with practical application." },
              { icon: IconTarget, title: "Actionable Insights", desc: "Apply trends directly to your research projects." },
              { icon: IconFlask, title: "Full Archive Access", desc: "Instant access to all past articles upon signup." }
            ].map((item, i) => (
              <div 
                key={i} 
                className="card-animate"
                style={{
                  textAlign: 'center',
                  padding: '30px 20px',
                  backgroundColor: BRAND.lightGray,
                  borderRadius: '8px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: BRAND.lightGray,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                }}>
                  <item.icon size={26} color={BRAND.mediumGray} />
                </div>
                <h3 style={{ 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '1rem', 
                  fontWeight: 600, 
                  color: BRAND.black, 
                  marginBottom: '8px' 
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  color: BRAND.darkGray, 
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '.9rem', 
                  lineHeight: 1.6 
                }}>
                  {item.desc}
                </p>
              </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: All Articles */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '60px 20px' }}>
          <div>
          <div className="section-animate" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '25px' 
          }}>
            <div>
              <h2 style={{
                color: BRAND.black,
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.3rem, 3vw, 1.5rem)',
                fontWeight: 700,
                marginBottom: '5px',
              }}>
                All Articles ({newsletterArticles.length})
              </h2>
              {filteredArticles.length !== newsletterArticles.length && (
                <p style={{ color: BRAND.mediumGray, fontFamily: 'Lato, sans-serif', fontSize: '.85rem' }}>
                  Showing {filteredArticles.length} articles
                </p>
              )}
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px 14px',
                fontFamily: 'Lato, sans-serif',
                fontSize: '.9rem',
                border: `1px solid ${BRAND.borderGray}`,
                borderRadius: '6px',
                width: '240px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = BRAND.mediumGray}
              onBlur={(e) => e.currentTarget.style.borderColor = BRAND.borderGray}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '30px' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}>
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/lab-signals/${article.slug}`}
                className="card-animate"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: BRAND.white,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  backgroundColor: BRAND.gold,
                  padding: '12px 16px',
                }}>
                  <span style={{
                    color: BRAND.black,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {article.category}
                  </span>
                </div>
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    color: BRAND.black,
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '.95rem',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    marginBottom: '12px',
                    flex: 1,
                    letterSpacing: '0.01em',
                  }}>
                    {article.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ 
                      color: BRAND.darkGray, 
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '.75rem', 
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                    }}>
                      Read Article
                    </span>
                    <IconArrowRight size={12} color={BRAND.mediumGray} />
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
                  padding: '10px 20px',
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

        {/* Section: Final CTA - Gold */}
        <section style={{ backgroundColor: BRAND.gold, padding: '40px 20px' }}>
          <div className="section-animate" style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>
            <IconMail size={32} color={BRAND.black} />
            <h2 style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
              fontWeight: 700,
              margin: '12px 0 6px',
            }}>
              Join Lab Signals Today
            </h2>
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
          </div>
        </section>

      </div>
    </div>
  );
}
