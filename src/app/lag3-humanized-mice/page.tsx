'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import { IconTarget, IconFlask, IconSettings, IconChevronRight, IconCheckCircle, IconShield, IconDNA } from '@/components/UXUIDC/Icons';
import CatalogSearch from '@/components/UXUIDC/CatalogSearch';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Hero Data
const heroData = {
  badge: "Catalog Models",
  title: "LAG3 Humanized Mouse Models",
  intro: "LAG3 humanized mice enable preclinical evaluation of anti human LAG3 therapeutic antibodies including relatlimab and novel candidates in immunocompetent mouse systems."
};

// LAG3 Biology Data
const lag3BiologyData = {
  title: "LAG3 in Cancer Immunotherapy",
  sections: [
    {
      title: "LAG3 Biology",
      intro: "LAG3 is an inhibitory receptor expressed on activated T cells:",
      points: [
        "Expressed on activated CD4+ and CD8+ T cells",
        "Also expressed on regulatory T cells, NK cells, and plasmacytoid dendritic cells",
        "Binds MHC class II molecules with higher affinity than CD4",
        "Negatively regulates T cell proliferation and function",
        "Contributes to T cell exhaustion in chronic antigen exposure"
      ],
      summary: "LAG3 functions as an immune checkpoint, limiting T cell responses and contributing to tumor immune evasion."
    },
    {
      title: "Clinical Anti LAG3 Antibodies",
      intro: "Multiple anti LAG3 antibodies are in clinical development:",
      points: [
        "Relatlimab (BMS 986016): FDA approved in combination with nivolumab for melanoma",
        "Ieramilimab (LAG525): Novartis anti LAG3 antibody in clinical trials",
        "MK 4280: Merck anti LAG3 antibody in development",
        "Multiple additional candidates in early to late stage trials"
      ],
      summary: "Clinical validation of LAG3 as an immunotherapy target drives demand for humanized preclinical models."
    },
    {
      title: "Species Specificity",
      intro: "Anti LAG3 therapeutic antibodies require humanized models:",
      points: [
        "Clinical antibodies engineered for human LAG3 binding",
        "Limited cross reactivity with mouse Lag3",
        "Humanized LAG3 provides the appropriate target for antibody evaluation",
        "Essential for testing clinical candidates in mouse tumor models"
      ]
    }
  ]
};

// Humanization Strategies Data
const strategiesData = {
  title: "LAG3 Humanization Strategies",
  strategies: [
    {
      title: "Extracellular Domain Humanization",
      description: "Replace mouse Lag3 extracellular domain with human LAG3 sequence:",
      features: [
        "Human extracellular domain provides antibody binding epitopes",
        "Mouse transmembrane and intracellular domains preserved",
        "Maintains signaling compatibility with mouse immune cells",
        "Optimal for therapeutic antibody testing"
      ],
      note: "ECD humanization is the preferred approach for most antibody evaluation applications."
    },
    {
      title: "Complete Gene Humanization",
      description: "Full replacement of mouse Lag3 with human LAG3:",
      features: [
        "Complete human LAG3 protein sequence",
        "Human specific signaling characteristics",
        "Study human LAG3 biology comprehensively",
        "Appropriate for mechanistic and signaling studies"
      ]
    }
  ]
};

// Design Considerations Data
const designConsiderationsData = {
  title: "Design Considerations",
  considerations: [
    {
      title: "Expression Pattern Preservation",
      description: "LAG3 humanization design must maintain appropriate expression:",
      points: [
        "Endogenous promoter preservation for physiological expression",
        "Expression on appropriate T cell subsets",
        "Inducible expression upon T cell activation",
        "Normal developmental regulation"
      ]
    },
    {
      title: "Functional Validation",
      description: "Humanized LAG3 must demonstrate functional activity:",
      points: [
        "Surface expression on activated T cells",
        "Binding to MHC class II molecules",
        "Inhibitory function in T cell assays",
        "Therapeutic antibody binding confirmation"
      ]
    }
  ]
};

// Applications Data
const applicationsData = {
  title: "Applications",
  applications: [
    {
      title: "Anti LAG3 Monotherapy Testing",
      description: "Primary application for LAG3 humanized mice:",
      points: [
        "Test relatlimab and other clinical anti LAG3 antibodies",
        "Evaluate novel anti LAG3 candidates",
        "Compare antibody characteristics and potency",
        "Assess anti tumor efficacy in syngeneic models"
      ]
    },
    {
      title: "Combination Immunotherapy",
      description: "LAG3 inhibition is most effective in combination:",
      points: [
        "LAG3 plus PD1 blockade (approved combination)",
        "LAG3 plus CTLA4 combinations",
        "LAG3 plus other emerging checkpoints",
        "Multi humanized models for clinical combinations"
      ]
    },
    {
      title: "Mechanism of Action Studies",
      description: "Understand LAG3 biology in tumor immunity:",
      points: [
        "T cell exhaustion and reinvigoration",
        "Treg modulation",
        "Tumor microenvironment analysis",
        "Biomarker identification"
      ]
    },
    {
      title: "Bispecific Antibody Testing",
      description: "LAG3 is a target for bispecific antibodies:",
      points: [
        "LAG3 x PD1 bispecific antibodies",
        "LAG3 x other target combinations",
        "Requires human LAG3 for binding evaluation"
      ]
    }
  ]
};

// Multi-Checkpoint Models Data
const multiCheckpointData = {
  title: "Multi Checkpoint Humanized Models",
  intro: "LAG3 humanization can be combined with other checkpoint humanizations for comprehensive combination therapy evaluation:",
  combinations: [
    { combination: "LAG3 + PD1", applications: "Relatlimab + nivolumab combination studies" },
    { combination: "LAG3 + PDL1", applications: "Alternative PD axis combinations" },
    { combination: "LAG3 + CTLA4", applications: "Dual checkpoint blockade" },
    { combination: "LAG3 + TIM3", applications: "Novel checkpoint combinations" },
    { combination: "LAG3 + TIGIT", applications: "Emerging combination strategies" },
    { combination: "LAG3 + PD1 + CTLA4", applications: "Triple checkpoint models" }
  ],
  summary: "Multi humanized models enable testing of clinical combination regimens using actual therapeutic antibodies."
};

// Model Design Data
const modelDesignData = {
  title: "Model Design Considerations",
  sections: [
    {
      title: "Strain Background",
      intro: "Choose strain background based on tumor model requirements:",
      points: [
        "C57BL/6: MC38, B16, LLC, E0771",
        "BALB/c: CT26, 4T1, EMT6"
      ]
    },
    {
      title: "Breeding Considerations",
      intro: "For multi checkpoint models:",
      points: [
        "Single humanization: Standard breeding",
        "Double humanization: Intercross of single humanized lines",
        "Triple or higher: Sequential breeding or multi allele targeting"
      ]
    },
    {
      title: "Phenotyping",
      intro: "Characterize LAG3 humanized mice:",
      points: [
        "Flow cytometry for LAG3 surface expression",
        "T cell activation assays",
        "Therapeutic antibody binding confirmation",
        "Functional checkpoint activity assessment"
      ]
    }
  ]
};

// ITL Approach Data
const itlApproachData = {
  title: "Our Approach to LAG3 Humanization",
  points: [
    "ES cell based gene targeting for precise humanization",
    "Custom design to meet specific research requirements",
    "Pre germline characterization confirms targeting before mouse generation",
    "Sequence verification ensures correct human LAG3 integration",
    "Available on C57BL/6 or BALB/c backgrounds",
    "Combination with other checkpoint humanizations"
  ],
  summary: "Our systematic approach ensures that LAG3 humanized mice express functional human LAG3 that engages therapeutic antibodies as intended."
};

// Publications Data
const publicationsData = {
  title: "Selected Publications",
  intro: "Humanized checkpoint models generated by ingenious targeting laboratory have supported immuno oncology research:",
  publications: [
    "Mlynarczyk C et al. 2023. BTG1 mutation yields supercompetitive B cells primed for malignant transformation. Science 379(6629): eabj0412.",
    "Chakrabarti S et al. 2024. Touch sensation requires the mechanically gated ion channel ELKIN1. Science 383(6686): 992 to 998.",
    "Clausen BE et al. 1999. Conditional gene targeting in macrophages and granulocytes using LysMcre mice. Transgenic Research 8(4): 265 to 277."
  ]
};

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const bassonTestimonial = getTestimonialById('basson-kings')!;

const testimonialsData = [
  { quote: bassonTestimonial.quote, author: formatAuthorWithCredentials(bassonTestimonial), affiliation: bassonTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "What is the advantage of LAG3 humanized mice over wildtype mice for anti-LAG3 antibody testing?",
    answer: "Clinical anti-LAG3 antibodies (relatlimab, ieramilimab) are engineered specifically for human LAG3 and have limited cross-reactivity with mouse Lag3. LAG3 humanized mice express human LAG3, enabling direct testing of these clinical candidates in syngeneic tumor models with an intact immune system."
  },
  {
    question: "Can LAG3 humanized mice be combined with PD1 humanization?",
    answer: "Yes. Dual LAG3+PD1 humanized mice can be generated to evaluate the relatlimab + nivolumab combination (FDA-approved for melanoma) or other LAG3 + PD1 antibody combinations. Triple humanization (LAG3+PD1+CTLA4) is also possible for comprehensive combination studies."
  },
  {
    question: "Which syngeneic tumor models work with LAG3 humanized mice?",
    answer: "LAG3 humanized mice on C57BL/6 background are compatible with MC38 (colon), B16 (melanoma), LLC (lung), and E0771 (breast) models. BALB/c background models support CT26, 4T1, and EMT6 tumors. Model selection depends on experimental requirements."
  },
  {
    question: "How do you validate LAG3 expression in humanized mice?",
    answer: "Validation includes flow cytometry for surface LAG3 expression on activated T cells, Western blot for protein expression, therapeutic antibody binding assays, and functional assessment of LAG3-mediated T cell inhibition. Pre-germline characterization confirms correct targeting before mouse generation."
  },
  {
    question: "What is the timeline for generating LAG3 humanized mice?",
    answer: "Custom LAG3 humanized mouse generation includes targeting construct design, ES cell targeting, chimera generation, and germline transmission. Pre-germline characterization enables early validation. Contact us for current timeline estimates based on your specific project requirements."
  }
];

// Related Links Data
const relatedLinksData = {
  checkpoints: [
    { href: "/pd1-humanized-mice", label: "PD1 Humanized Mice" },
    { href: "/pdl1-humanized-mice", label: "PDL1 Humanized Mice" },
    { href: "/ctla4-humanized-mice", label: "CTLA4 Humanized Mice" },
    { href: "/tim3-humanized-mice", label: "TIM3 Humanized Mice" },
    { href: "/tigit-humanized-mice", label: "TIGIT Humanized Mice" },
    { href: "/humanized-immune-checkpoint-mice", label: "All Checkpoint Models" }
  ],
  therapeuticAreas: [
    { href: "/immuno-oncology-mouse-models", label: "Immuno Oncology Models" },
    { href: "/oncology-mouse-models", label: "Oncology Mouse Models" },
    { href: "/therapeutic-areas", label: "Therapeutic Areas" }
  ],
  technologies: [
    { href: "/humanized-mouse-models", label: "Humanized Mouse Models" },
    { href: "/knockin-mouse-models", label: "Knockin Mouse Models" },
  ]
};

// CTA Data
const ctaData = {
  title: "Start Your LAG3 Humanization Project",
  description: "Our scientific consultants are ready to discuss your LAG3 humanization requirements and recommend the optimal strategy for your immuno oncology program. Initial consultation is provided at no charge and includes humanization approach recommendations, strain background guidance, and timeline estimates.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function LAG3HumanizedMicePage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Hero animations
      const heroElements = document.querySelectorAll('.hero-animate');
      heroElements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power2.out" }
        );
      });

      // Scroll-triggered animations
      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    };

    initGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "LAG3 Humanized Mouse Models",
            "description": "Custom LAG3 humanized mouse models for anti LAG3 antibody testing. Human LAG3 knockin for immuno oncology checkpoint research and combination therapy evaluation.",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory",
              "url": "https://www.genetargeting.com"
            },
            "serviceType": "Custom Mouse Model Generation",
            "areaServed": "Worldwide"
          })
        }}
      />
      <UXUIDCNavigation />
      <main ref={animatedElementsRef}>
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
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <CatalogSearch maxResults={15} showTitle={true} />
          </div>
        </section>

        {/* LAG3 Biology Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {lag3BiologyData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {lag3BiologyData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    {index === 0 ? <IconDNA size={24} color="#008080" /> : 
                     index === 1 ? <IconFlask size={24} color="#008080" /> : 
                     <IconTarget size={24} color="#008080" />}
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                    {section.intro}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px 0' }}>
                    {section.points.map((point, pIndex) => (
                      <li key={pIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {section.summary && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5 }}>
                      {section.summary}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Humanization Strategies Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {strategiesData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {strategiesData.strategies.map((strategy, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {strategy.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
                    {strategy.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {strategy.features.map((feature, fIndex) => (
                      <li key={fIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {strategy.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, marginTop: '16px', lineHeight: 1.5 }}>
                      {strategy.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Considerations Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {designConsiderationsData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {designConsiderationsData.considerations.map((consideration, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #00d4d4'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconSettings size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {consideration.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                    {consideration.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {consideration.points.map((point, pIndex) => (
                      <li key={pIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '6px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {applicationsData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {applicationsData.applications.map((app, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconFlask size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {app.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                    {app.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {app.points.map((point, pIndex) => (
                      <li key={pIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '6px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Multi-Checkpoint Models Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {multiCheckpointData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto 30px'
            }}>
              {multiCheckpointData.intro}
            </p>
            <div className="animate-in" style={{
              background: '#ffffff',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a253c' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Combination</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {multiCheckpointData.combinations.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.combination}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="animate-in" style={{
              fontSize: '.85rem',
              color: '#333',
              fontWeight: 500,
              textAlign: 'center',
              marginTop: '20px',
              lineHeight: 1.6
            }}>
              {multiCheckpointData.summary}
            </p>
          </div>
        </section>

        {/* Model Design Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {modelDesignData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {modelDesignData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                    {section.intro}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {section.points.map((point, pIndex) => (
                      <li key={pIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '6px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ITL Approach Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '40px',
              borderLeft: '4px solid #00d4d4'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(0,128,128,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconShield size={32} color="#008080" />
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#2384da',
                    marginBottom: '20px'
                  }}>
                    {itlApproachData.title}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    {itlApproachData.points.map((point, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.9rem',
                        color: '#666',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={16} color="#008080" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {point}
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '.9rem', color: '#333', fontWeight: 500, lineHeight: 1.6 }}>
                    {itlApproachData.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {publicationsData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.6
            }}>
              {publicationsData.intro}
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {publicationsData.publications.map((pub, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '20px',
                  borderLeft: '4px solid #008080'
                }}>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{pub}</p>
                </div>
              ))}
            </div>
            <div className="animate-in" style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link href="/publications" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#008080',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                View All Publications
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonialsData} variant="dark" />

        {/* CTA Section */}
        <section style={{ background: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              {ctaData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7
            }}>
              {ctaData.description}
            </p>
            <div className="animate-in" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={ctaData.primaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#008080',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                {ctaData.primaryButton.label}
                <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link href={ctaData.secondaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                {ctaData.secondaryButton.label}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Related Checkpoint Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.checkpoints.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Therapeutic Areas
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.therapeuticAreas.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.technologies.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
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
    </div>
  );
}
