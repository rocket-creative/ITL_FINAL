'use client';

import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
/**
 * Cystic Fibrosis Mice Page
 * Built from FINAL TEXT PAGES ALL content
 */

import { useRef } from 'react';

import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconChevronRight } from '@/components/UXUIDC/Icons';
import { BreadcrumbSchema, StandardPageCtaStack } from '@/components/UXUIDC';
import { buildFAQSchema } from '@/lib/seo/schemaBlocks';

// Hero Data
const heroData = {
  badge: "Our Services",
  title: "Cystic Fibrosis Mice",
  intro: "Since 1998, ingenious targeting laboratory has supported cystic fibrosis research with mouse model generation enabling mechanistic studies of CFTR function, patient mutation effects, and therapeutic interventions.",
  description: "Our cystic fibrosis models have contributed to research on ion channel biology, gene therapy, and CFTR modulator development. Cystic fibrosis mouse models provide essential platforms for investigating CFTR mutations, testing gene therapy approaches, and developing therapies for this life limiting genetic disease affecting thousands of patients worldwide."
};

// Stats Data
const statsData = [
  { value: 2800, suffix: "+", label: "Models Generated" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 900, suffix: "+", label: "Laboratories Served" }
];

// FAQ Data
const faqData = [
  { question: "What cystic fibrosis mouse models are available?", answer: "Common CF mouse models include CFTR knockout and point mutation knockins modeling specific CFTR mutations found in patients (e.g., F508del, G551D). Models can be combined with conditional approaches for tissue specific CFTR expression or deletion to study organ specific disease mechanisms." },
  { question: "How do cystic fibrosis mouse models differ from human disease?", answer: "CF mice show intestinal obstruction (meconium ileus) and some lung pathology but do not fully recapitulate human lung disease severity. Models enable study of CFTR function, ion transport, and organ specific mechanisms, providing insights that complement human studies and enable preclinical testing." },
  { question: "Can you create models with specific CFTR mutations?", answer: "Yes. We can generate point mutation knockin models carrying specific CFTR mutations found in patients (e.g., F508del, G551D, R117H). These models enable study of mutation-specific effects on CFTR folding, trafficking, and function, supporting development of mutation-specific therapeutics." }
];

// Related Links
const relatedLinks = [
  { title: "Rare Disease Mouse Models", href: "/rare-disease-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Gene Therapy Mouse Models", href: "/gene-therapy-mouse-models" },
  { title: "Therapeutic Areas", href: "/therapeutic-areas" },
];

export default function CysticFibrosisMicePage() {
  const heroRef = useRef<HTMLDivElement>(null);  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero" 
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div>
              <div 
                className="hero-animate"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  marginBottom: '20px'
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
                  marginBottom: '20px'
                }}
              >
                {heroData.title}
              </h1>
              
              <p 
                className="hero-animate"
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  lineHeight: '1.7rem',
                  marginBottom: '15px',
                  maxWidth: '800px'
                }}
              >
                {heroData.intro}
              </p>
              
              {heroData.description && (
                <p 
                  className="hero-animate"
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '.9rem',
                    fontWeight: 400,
                    lineHeight: '1.6rem',
                    marginBottom: '25px',
                    maxWidth: '800px'
                  }}
                >
                  {heroData.description}
                </p>
              )}
              
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
                    fontWeight: 500
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
                    fontWeight: 500
                  }}
                >
                  <span>Talk to a Scientist</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="cystic-fibrosis-mice" utmMedium="page-hero" flush />
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ backgroundColor: '#ffffff', padding: '30px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700 }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: '#666', fontSize: '.85rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqData.length > 0 && (
          <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
                Frequently asked questions
              </h2>
              <div className="animate-in">
                <UXUIDCAnimatedFAQ faqs={faqData} />
              </div>
            </div>
          </section>
        )}

        {/* Related Links Section */}
        {relatedLinks.length > 0 && (
          <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 600, marginBottom: '30px', textAlign: 'center' }}>
                Related resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="animate-in group p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <IconChevronRight size={14} color="#008080" />
                      <span style={{ color: '#0a253c', fontSize: '.9rem', fontWeight: 500 }}>{link.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQSchema('/cystic-fibrosis-mice', faqData))
        }}
      />
            <StandardPageCtaStack
        slug="cystic-fibrosis-mice"
        labSignalsTitle="Stay Updated on Cystic Fibrosis Research"
        labSignalsDescription="Get the latest insights on CFTR models, ion channel biology, and gene therapy developments."
      />

      </main>
      
      
      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Disease Models', path: '/therapeutic-areas' },
          { name: 'Cystic Fibrosis Mice', path: '/cystic-fibrosis-mice' },
        ]}
      />
    </div>
  );
}
