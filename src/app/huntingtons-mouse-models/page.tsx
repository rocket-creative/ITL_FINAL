'use client';

/**
 * Huntington Mouse Models Page
 * Built from FINAL TEXT PAGES ALL content
 */

import { useRef } from 'react';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';

import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup, BreadcrumbSchema } from '@/components/UXUIDC';
import { IconDNA, IconChevronRight } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Our Services",
  title: "Huntington Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported Huntington disease research with mouse model generation enabling mechanistic studies of polyglutamine toxicity, CAG repeat instability, and therapeutic strategies targeting mutant huntingtin. Huntington mouse models provide essential platforms for investigating the molecular pathways underlying striatal neurodegeneration, testing hypotheses about protein aggregation and transcriptional dysregulation, and developing therapies including huntingtin lowering approaches and modifiers of somatic repeat expansion.",
  description: ""
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
  { question: "What types of Huntington's disease mouse models are available?", answer: "HD models include fragment models (N171-82Q, R6/2 expressing truncated HTT with expanded CAG repeats), full-length knockin models (replacing mouse Htt with human HTT containing expanded CAG), and conditional models (inducible HTT expression). Selection depends on research question, timeline needs, and phenotype severity requirements." },
  { question: "How do CAG repeat length and age affect HD model phenotypes?", answer: "Longer CAG repeats cause earlier and more severe phenotypes. Fragment models with high CAG repeat numbers show rapid progression. Full-length knockin models show slower progression more closely resembling human disease. Age at phenotype onset depends on repeat length and model type. Contact us to discuss the best model for your study timeline." },
  { question: "Can HD models be used for therapeutic testing?", answer: "Yes. HD models enable testing of huntingtin-lowering therapies (ASOs, RNAi, zinc finger repressors), somatic instability modifiers (MSH3 reduction), aggregate clearance strategies, and gene therapy approaches. Models show measurable behavioral, neuropathological, and molecular endpoints for therapeutic evaluation." },
  { question: "What behavioral tests are used to phenotype HD models?", answer: "Core behavioral tests include rotarod (motor coordination), balance beam (fine motor control), grip strength (forelimb/hindlimb strength), gait analysis (stride length, coordination), open field (activity patterns), and clasping behavior (limb clasping when suspended). Multiple complementary tests strengthen phenotypic characterization. (/request-quote)" }
];

// Related Links
const relatedLinks = [
  { title: "Neuroscience Mouse Models", href: "/neuroscience-mouse-models" },
  { title: "Alzheimers Mouse Models", href: "/alzheimers-mouse-models" },
  { title: "Parkinsons Mouse Models", href: "/parkinsons-mouse-models" },
  { title: "Als Mouse Models", href: "/als-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
];

export default function HuntingtonsMouseModelsPage() {
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
          
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
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
            
            </div>
        </section>
        <section style={{ backgroundColor: '#f5f5f4', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <CatalogCustomDualCta slug="huntingtons-mouse-models" utmMedium="page-hero" flush />
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

        {/* Testimonial Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '40px'}}
            >
              Trusted for Huntington's Research
            </h2>
            <div
              className="animate-in"
              style={{
                backgroundColor: '#f8f9fa',
                padding: '40px',
                borderLeft: '4px solid #008080',
                borderRadius: '4px'}}
            >
              <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8rem', fontStyle: 'italic', marginBottom: '25px' }}>
                &ldquo;ingenious has developed multiple Huntington's mouse models tailored for the CHDI Foundation that faithfully recapitulate HD progression for advanced preclinical testing and therapeutic evaluation&rdquo;
              </p>
              <p style={{ color: '#0a253c', fontWeight: 600, fontSize: '1rem', marginBottom: '5px' }}>
                — Richard Chen, PhD
              </p>
              <p style={{ color: '#666', fontSize: '.9rem' }}>
                CHDI Foundation
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start your project today
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your research requirements and recommend the optimal approach for your program. Initial consultation is provided at no charge.
            </p>
            <CatalogCustomDualCta slug="huntingtons-mouse-models" utmMedium="page-closing" flush />
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* FAQ Section */}
        {faqData.length > 0 && (
          <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup title="Huntington's Disease Research Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        {relatedLinks.length > 0 && (
          <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.genetargeting.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Huntingtons Mouse Models",
                "item": "https://www.genetargeting.com/huntingtons-mouse-models"
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      </main>
      
      <UXUIDCFooter />
      
      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Disease Models', path: '/therapeutic-areas' },
          { name: 'Huntington Mouse Models', path: '/huntingtons-mouse-models' },
        ]}
      />
    </div>
  );
}
