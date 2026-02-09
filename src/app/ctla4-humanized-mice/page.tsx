'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import { IconTarget, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import CatalogSearch from '@/components/UXUIDC/CatalogSearch';

// Hero Data
const heroData = {
  badge: "Catalog Models",
  title: "CTLA4 Humanized Mice",
  intro: "CTLA4 humanized mice express human cytotoxic T lymphocyte associated protein 4, enabling preclinical testing of anti CTLA4 antibodies including ipilimumab in immunocompetent mice."
};

// CTLA4 Biology Points
const ctla4Biology = [
  "CTLA4 is an inhibitory receptor expressed on activated T cells and constitutively on regulatory T cells",
  "CTLA4 competes with the costimulatory receptor CD28 for binding to B7 ligands (CD80 and CD86)",
  "CTLA4 engagement suppresses T cell activation",
  "Blocking CTLA4 with antibodies enhances T cell activation and antitumor immunity"
];

// Applications
const applications = [
  { 
    title: "Anti CTLA4 Antibody Development", 
    desc: "CTLA4 humanized mice enable preclinical efficacy testing of anti CTLA4 antibodies including ipilimumab biosimilars and novel antibodies with modified Fc regions."
  },
  { 
    title: "Combination Immunotherapy", 
    desc: "Double humanized mice expressing both human CTLA4 and human PD1 enable preclinical testing of combination checkpoint blockade strategies."
  },
  { 
    title: "Toxicity and Safety Studies", 
    desc: "CTLA4 humanized mice support safety assessment of anti CTLA4 antibodies. Immune related adverse events can be modeled and mitigation strategies evaluated."
  },
  { 
    title: "Mechanism of Action Studies", 
    desc: "Humanized mice enable study of antibody effects on T cell activation, regulatory T cell function, and tumor immune infiltration."
  }
];

// Humanization Strategies
const humanizationStrategies = [
  { 
    name: "Extracellular Domain Humanization", 
    desc: "Humanizes the extracellular domain where therapeutic antibodies bind, while retaining mouse transmembrane and intracellular domains. Maintains normal CTLA4 signaling while enabling human antibody binding."
  },
  { 
    name: "Complete Gene Replacement", 
    desc: "Complete replacement of mouse CTLA4 with human CTLA4 provides a fully humanized target but may affect T cell function if human CTLA4 interacts differently with mouse signaling partners."
  }
];

// Compatible Tumor Lines
const tumorLines = [
  { name: "MC38", type: "Colon carcinoma" },
  { name: "B16", type: "Melanoma" },
  { name: "E0771", type: "Breast carcinoma" },
  { name: "Lewis Lung", type: "Lung carcinoma" }
];

// Available Designs
const availableDesigns = [
  "Single immune checkpoint models: CTLA4 humanized mice as standalone models",
  "Double immune checkpoint models: CTLA4 humanized combined with PD1 humanized",
  "Triple and multi checkpoint models: CTLA4 combined with multiple checkpoint humanizations"
];

// Related Checkpoint Models
const checkpointModels = [
  { title: "PD1 Humanized Mice", href: "/pd1-humanized-mice" },
  { title: "PDL1 Humanized Mice", href: "/pdl1-humanized-mice" },
  { title: "LAG3 Humanized Mice", href: "/lag3-humanized-mice" },
  { title: "TIM3 Humanized Mice", href: "/tim3-humanized-mice" },
  { title: "Humanized Immune Checkpoint Mice", href: "/humanized-immune-checkpoint-mice" }
];

// Related Applications
const relatedApplications = [
  { title: "Immuno Oncology Mouse Models", href: "/immuno-oncology-mouse-models" },
  { title: "Oncology Mouse Models", href: "/oncology-mouse-models" },
  { title: "Syngeneic Tumor Models", href: "/syngeneic-tumor-models" },
  { title: "Double Checkpoint Mice", href: "/double-checkpoint-mice" }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const meansTestimonial = getTestimonialById('means-sanofi')!;

const testimonials = [
  { quote: meansTestimonial.quote, name: formatAuthorWithCredentials(meansTestimonial), affiliation: meansTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between full humanization and ECD only humanization for CTLA4?",
    answer: "Full humanization replaces the entire mouse CTLA4 gene with human CTLA4 sequence. ECD only humanization replaces only the extracellular domain while retaining mouse transmembrane and cytoplasmic domains. Full humanization is preferred for antibody testing, while ECD only may preserve some mouse signaling functions."
  },
  {
    question: "Can CTLA4 humanized mice be combined with other checkpoint humanizations?",
    answer: "Yes. CTLA4 humanization can be combined with PD1, PDL1, LAG3, TIM3, or other checkpoint humanizations to create double, triple, or multi checkpoint models. These models enable testing of combination checkpoint blockade therapies in immunocompetent animals with human targets."
  },
  {
    question: "Can CTLA4 humanized mice be used with syngeneic tumor models?",
    answer: "Yes. CTLA4 humanized mice can be combined with syngeneic tumor cell lines to create systems where both tumor and immune compartments express human targets. This enables evaluation of checkpoint blockade in immunocompetent animals with intact tumor immunity."
  },
  {
    question: "What tumor models are compatible with CTLA4 humanized mice?",
    answer: "CTLA4 humanized mice on C57BL/6 background are compatible with MC38 (colon carcinoma), B16 (melanoma), E0771 (breast carcinoma), and Lewis lung carcinoma. These syngeneic models enable evaluation of anti CTLA4 antibody efficacy in various tumor contexts."
  }
];

export default function CTLA4HumanizedMicePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }

      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    };

    loadGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            <h1 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
            }}>
              {heroData.title}
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#008080',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Request a Quote
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
            </div>
          </div>
        </section>

        {/* Catalog Search Section */}
        <section style={{ backgroundColor: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <CatalogSearch maxResults={15} showTitle={true} />
          </div>
        </section>

        {/* CTLA4 Biology Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              CTLA4 Biology and Therapeutic Relevance
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              Cytotoxic T lymphocyte associated protein 4 (CTLA4, CD152) is a critical immune checkpoint that regulates T cell activation. Blocking CTLA4 with antibodies such as ipilimumab enhances antitumor immunity and was the first checkpoint inhibitor approved for cancer treatment.
            </p>

            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                Key CTLA4 Biology
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {ctla4Biology.map((point, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.5rem' }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-in" style={{ backgroundColor: '#0a253c', padding: '25px 30px', borderRadius: '8px', marginTop: '25px' }}>
              <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>
                Species Specificity Challenge
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                Therapeutic anti CTLA4 antibodies are designed to bind human CTLA4 and typically do not cross react with mouse CTLA4. CTLA4 humanized mice solve this problem by expressing human CTLA4, enabling preclinical evaluation of human specific antibodies.
              </p>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((app, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{app.title}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.6rem' }}>{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Humanization Strategy Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              CTLA4 Humanization Strategy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {humanizationStrategies.map((strategy, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{strategy.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.6rem' }}>{strategy.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tumor Model Compatibility */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Tumor Model Compatibility
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              CTLA4 humanized mice are generated on the C57BL/6 background, providing compatibility with established syngeneic tumor models for checkpoint inhibitor efficacy studies.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tumorLines.map((tumor, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                  <h4 style={{ color: '#008080', fontSize: '1rem', fontWeight: 600, marginBottom: '5px' }}>{tumor.name}</h4>
                  <p style={{ color: '#555', fontSize: '.8rem' }}>{tumor.type}</p>
                </div>
              ))}
            </div>

            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', marginTop: '25px', borderLeft: '4px solid #2384da' }}>
              <h3 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>Available Designs</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {availableDesigns.map((design, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                    <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ color: '#555', fontSize: '.85rem' }}>{design}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: testimonials.length === 1 ? '48px 56px' : '30px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}>
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px', ...(testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : {}) }} />
                  <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: testimonials.length === 1 ? '1.1rem' : '.9rem', fontWeight: 400, lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px', flex: testimonials.length > 1 ? 1 : undefined }}>&ldquo;{testimonial.quote}&rdquo;</p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
                    <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonial.name}</p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem', fontWeight: 400 }}>{testimonial.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss humanized mice for your immunotherapy research? Our scientific team provides complimentary consultation to help you select the optimal checkpoint model design.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '12px 30px',
                  fontSize: '.9rem',
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
                  padding: '12px 30px',
                  border: '2px solid white',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <span>Free Consultation</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Checkpoint Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {checkpointModels.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Applications
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedApplications.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "CTLA4 Humanized Mice",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "CTLA4 humanized mouse models for anti CTLA4 antibody testing. Ipilimumab and checkpoint inhibitor preclinical evaluation in immunocompetent mice.",
            "serviceType": "CTLA4 Humanized Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
