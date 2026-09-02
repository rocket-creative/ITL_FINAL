'use client';

import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
/**
 * F.A.S.T. Technology Mice Page
 * Built from FINAL TEXT PAGES ALL content
 */

import { useRef } from 'react';

import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconChevronRight } from '@/components/UXUIDC/Icons';
import { StandardPageCtaStack } from '@/components/UXUIDC';
import { buildFAQSchema } from '@/lib/seo/schemaBlocks';

// Hero Data
const heroData = {
  badge: "Our Services",
  title: "F.A.S.T. Technology Mice",
  intro: "F.A.S.T.™ (Flexible Accelerated STOP Tetracycline Operator) technology provides versatile inducible and reversible gene expression control, enabling multiple experimental approaches from a single knockin allele. Ingenious targeting laboratory incorporated F.A.S.T.™ technology into mouse model generation for neuroscience, immunology, and metabolic disease research.",
  description: "The F.A.S.T.™ system achieves a spectrum of controllable expression levels, streamlining mouse model generation by enabling knockout first, inducible expression, and conditional knockdown modes from one targeted allele. This flexibility maximizes research value while minimizing project timelines and costs."
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
  { question: "What is F.A.S.T. technology and how does it work?", answer: "F.A.S.T. (Flexible Accelerated Speed Targeting) is a gene targeting technology that enables rapid generation of genetically engineered mouse models. The technology uses optimized targeting vectors and streamlined ES cell targeting workflows to reduce timelines while maintaining high-quality targeting and pre-germline characterization." },
  { question: "What types of models can be generated using F.A.S.T. technology?", answer: "F.A.S.T. technology can be used for knockout models, conditional knockout models, knockin models (point mutations, reporters, tags), and humanized models. The technology is compatible with standard allele architectures including knockout-first (tm1a) and derivative allele systems" }
];

// Related Links
const relatedLinks = [
  { title: "Inducible Gene Expression", href: "/inducible-gene-expression" },
  { title: "Tet On Tet Off Systems", href: "/tet-on-tet-off-systems" },
  { title: "Safe Harbor Locus", href: "/safe-harbor-locus" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Reporter Knockin", href: "/reporter-knockin" }
];

export default function FastMicePage() {
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
            <CatalogCustomDualCta slug="fast-mice" utmMedium="page-hero" flush />
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
          __html: JSON.stringify(buildFAQSchema('/fast-mice', faqData))
        }}
      />
      </main>
      
      <StandardPageCtaStack
        slug="fast-mice"
        labSignalsTitle="F.A.S.T. Technology Insights"
      />
      <UXUIDCFooter />
          
      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Mouse Model Generation', path: '/custom-mouse-models' },
          { name: 'FAST Mice', path: '/fast-mice' },
        ]}
      />
    </div>
  );
}
