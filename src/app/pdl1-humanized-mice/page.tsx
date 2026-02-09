'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import { IconTarget, IconFlask, IconSettings, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';
import CatalogSearch from '@/components/UXUIDC/CatalogSearch';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Hero Data
const heroData = {
  badge: "Catalog Models",
  title: "PDL1 Humanized Mouse Models",
  intro: "PDL1 humanized mice enable preclinical testing of anti human PDL1 therapeutic antibodies including atezolizumab, durvalumab, and avelumab in immunocompetent mouse systems."
};

// Why Humanize PDL1 Data
const whyHumanizeData = {
  title: "Why Humanize PDL1",
  sections: [
    {
      title: "Species Specificity of Therapeutic Antibodies",
      intro: "Anti PDL1 therapeutic antibodies are engineered specifically for human PDL1:",
      points: [
        "Antibody epitopes designed against human CD274 sequence",
        "Limited cross reactivity with mouse PDL1",
        "Cannot evaluate efficacy in wildtype mice",
        "Humanized models enable testing of clinical candidates"
      ],
      summary: "PDL1 humanization provides the human target necessary for evaluating anti PDL1 therapeutics."
    },
    {
      title: "PDL1 Expression Biology",
      intro: "PDL1 is expressed on multiple cell types relevant to tumor immunity:",
      points: [
        "Tumor cells: Direct expression for immune evasion",
        "Dendritic cells: Regulation of T cell priming",
        "Macrophages: Tumor associated macrophage function",
        "Other immune cells: Broad immune regulation"
      ],
      summary: "Humanized PDL1 in all expressing cell types enables comprehensive evaluation of anti PDL1 effects across the tumor microenvironment."
    },
    {
      title: "Translational Relevance",
      intro: "Humanized models improve translation to clinical outcomes:",
      points: [
        "Test the actual clinical candidate",
        "Evaluate on target effects with human protein engagement",
        "Assess PDL1 expression and blocking in tumor tissue",
        "Support biomarker development with human specific reagents"
      ]
    }
  ]
};

// Humanization Strategies Data
const strategiesData = {
  title: "Humanization Strategies",
  strategies: [
    {
      title: "Extracellular Domain Humanization",
      description: "Replace the mouse PDL1 extracellular domain with human sequence:",
      features: [
        "Human extracellular domain provides antibody binding epitopes",
        "Mouse transmembrane and intracellular domains preserved",
        "Normal downstream signaling maintained",
        "Compatibility with mouse immune system"
      ],
      note: "Extracellular domain humanization is optimal for therapeutic antibody testing where antibody binding to the surface exposed protein is the primary consideration."
    },
    {
      title: "Complete Gene Humanization",
      description: "Full replacement of mouse Cd274 with human CD274:",
      features: [
        "Complete human PDL1 protein sequence",
        "Human specific expression characteristics",
        "Study human PDL1 biology comprehensively",
        "Appropriate for mechanistic studies beyond antibody testing"
      ]
    },
    {
      title: "Considerations for PDL1 Humanization",
      description: "PDL1 humanization has specific considerations:",
      features: [
        "PDL1 expressed on host immune cells and tumor cells",
        "Syngeneic tumors continue to express mouse PDL1",
        "For complete humanization of tumor PDL1, consider human PDL1 expressing tumor cell lines",
        "Host humanization sufficient for many applications"
      ]
    }
  ]
};

// Applications Data
const applicationsData = {
  title: "Applications",
  applications: [
    {
      title: "Anti PDL1 Antibody Efficacy Testing",
      description: "Primary application for PDL1 humanized mice:",
      points: [
        "Test atezolizumab, durvalumab, avelumab, and other clinical antibodies",
        "Evaluate novel anti PDL1 candidates",
        "Compare antibody characteristics and potency",
        "Assess ADCC and other Fc effector contributions"
      ]
    },
    {
      title: "Combination Immunotherapy",
      description: "PDL1 humanized mice support combination studies:",
      points: [
        "Anti PDL1 plus chemotherapy",
        "Anti PDL1 plus targeted therapy",
        "Anti PDL1 plus radiation",
        "Anti PDL1 plus anti PD1 (dual humanized models for mechanistic studies)"
      ]
    },
    {
      title: "Tumor Model Compatibility",
      description: "PDL1 humanized mice on C57BL/6 background work with common syngeneic models. Note that syngeneic tumors express mouse PDL1. Host PDL1 humanization enables testing of antibody effects on host immune and stromal cell PDL1, which is often the predominant effect in checkpoint blockade."
    },
    {
      title: "PDL1 as Biomarker",
      description: "Humanized models support PDL1 biomarker studies:",
      points: [
        "Test clinical grade anti human PDL1 diagnostic antibodies",
        "Evaluate PDL1 expression scoring in humanized tissues",
        "Develop companion diagnostic approaches",
        "Correlate PDL1 expression with response"
      ]
    }
  ]
};

// Tumor Model Compatibility Table
const tumorModelData = [
  { model: "MC38", type: "Colon carcinoma", expression: "Moderate to high" },
  { model: "B16", type: "Melanoma", expression: "Variable" },
  { model: "LLC", type: "Lung carcinoma", expression: "Variable" },
  { model: "E0771", type: "Breast carcinoma", expression: "Moderate" }
];

// PDL1 vs PD1 Comparison Table
const comparisonData = [
  { factor: "Target", pdl1: "Ligand on tumor/APC", pd1: "Receptor on T cells" },
  { factor: "Expression", pdl1: "Tumor, DC, macrophages", pd1: "Activated T cells" },
  { factor: "Antibody targets", pdl1: "Atezolizumab, durvalumab", pd1: "Pembrolizumab, nivolumab" },
  { factor: "Mechanism", pdl1: "Block ligand", pd1: "Block receptor" }
];

// Combination Models Table
const combinationData = [
  { combination: "PDL1 + PD1", applications: "Complete PD1/PDL1 axis humanization" },
  { combination: "PDL1 + CTLA4", applications: "Dual checkpoint combinations" },
  { combination: "PDL1 + LAG3", applications: "Novel combination strategies" },
  { combination: "PDL1 + TIGIT", applications: "Emerging checkpoint combinations" }
];

// Dual Checkpoint Data
const dualCheckpointData = {
  title: "PDL1 vs PD1 Humanization",
  dualTitle: "Dual PD1/PDL1 Humanization",
  dualDescription: "For comprehensive PD1/PDL1 axis studies, both targets can be humanized:",
  dualPoints: [
    "Complete humanization of checkpoint axis",
    "Test PD1 and PDL1 antibodies in same model",
    "Mechanistic studies of pathway biology",
    "Combination PD1 + PDL1 blocking approaches"
  ],
  links: [
    { href: "/pd1-humanized-mice", label: "PD1 Humanized Mice" },
    { href: "/ctla4-humanized-mice", label: "CTLA4 Humanized Mice" }
  ],
  multiCheckpoint: "Multi humanized models enable comprehensive evaluation of combination checkpoint blockade using clinical antibodies."
};

// Technical Considerations Data
const technicalData: {
  title: string;
  sections: Array<{ title: string; intro: string; points: string[]; summary?: string }>;
} = {
  title: "Technical Considerations",
  sections: [
    {
      title: "Strain Background",
      intro: "Choose strain background based on experimental requirements:",
      points: [
        "C57BL/6: Compatible with MC38, B16, LLC, E0771",
        "BALB/c: Compatible with CT26, 4T1, EMT6"
      ]
    },
    {
      title: "Functional Validation",
      intro: "Validate humanized PDL1 function in your experimental system:",
      points: [
        "Confirm human PDL1 surface expression",
        "Verify therapeutic antibody binding",
        "Test functional checkpoint blockade",
        "Assess PDL1 expression on relevant cell types"
      ]
    }
  ]
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
    question: "What is the difference between full humanization and ECD-only humanization for PDL1?",
    answer: "Full humanization replaces the entire mouse PDL1 gene with human PDL1 sequence. ECD-only humanization replaces only the extracellular domain while retaining mouse transmembrane and cytoplasmic domains. Full humanization is preferred for antibody testing; ECD-only may preserve some mouse signaling functions."
  },
  {
    question: "Can PDL1 humanized mice be combined with other checkpoint humanizations?",
    answer: "Yes. PDL1 humanization can be combined with PD1, CTLA4, LAG3, TIM3, or other checkpoint humanizations to create double, triple, or multi-checkpoint models. PD1+PDL1 dual humanization enables comprehensive study of the checkpoint axis."
  },
  {
    question: "How do you validate human PDL1 expression in humanized models?",
    answer: "Pre-germline characterization includes Southern blot analysis to confirm correct targeting and sequence verification to ensure human sequence fidelity. Post-germline validation includes flow cytometry for surface expression on tumor cells, dendritic cells, and macrophages, Western blot for protein expression, and functional confirmation through binding of anti-PDL1 antibodies (atezolizumab, durvalumab)."
  },
  {
    question: "What is involved in generating PDL1 humanized mice?",
    answer: "Custom humanized model generation includes targeting construct design, ES cell targeting, chimera generation, and germline transmission. Pre-germline characterization enables early validation of targeting and human sequence confirmation before mouse generation. Contact us for current timeline estimates."
  },
  {
    question: "How do PDL1 humanized models work with syngeneic tumors?",
    answer: "PDL1 humanized mice on C57BL/6 background work with syngeneic tumor models (MC38, B16, LLC, E0771). Note that syngeneic tumors express mouse PDL1, but host PDL1 humanization enables testing of antibody effects on host immune and stromal cell PDL1, which is often the predominant effect in checkpoint blockade."
  }
];

// Related Links Data
const relatedLinksData = {
  checkpoints: [
    { href: "/pd1-humanized-mice", label: "PD1 Humanized Mice" },
    { href: "/ctla4-humanized-mice", label: "CTLA4 Humanized Mice" },
    { href: "/lag3-humanized-mice", label: "LAG3 Humanized Mice" },
    { href: "/tim3-humanized-mice", label: "TIM3 Humanized Mice" },
    { href: "/tigit-humanized-mice", label: "TIGIT Humanized Mice" },
    { href: "/humanized-immune-checkpoint-mice", label: "All Checkpoint Models" }
  ],
  modelTypes: [
    { href: "/humanized-mouse-models", label: "Humanized Mouse Models" },
    { href: "/knockin-mouse-models", label: "Knockin Mouse Models" },
    { href: "/immuno-oncology-mouse-models", label: "Immuno Oncology Models" },
    { href: "/oncology-mouse-models", label: "Oncology Mouse Models" }
  ],
  resources: [
    { href: "/c57bl6-mouse-background", label: "C57BL/6 Mouse Background" },
    { href: "/request-quote", label: "Request a Quote" },
    { href: "/faqs", label: "FAQs" }
  ]
};

// CTA Data
const ctaData = {
  title: "Start Your PDL1 Humanization Project",
  description: "Our scientific consultants are ready to discuss your PDL1 humanization requirements and recommend the optimal strategy for your immuno oncology program. Initial consultation is provided at no charge and includes humanization approach recommendations, strain background guidance, and timeline estimates.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function PDL1HumanizedMicePage() {
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
            "name": "PDL1 Humanized Mouse Models",
            "description": "Custom PDL1 humanized mouse models for anti PDL1 antibody testing. Human CD274 knockin for immuno oncology and checkpoint research.",
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

        {/* Why Humanize PDL1 Section */}
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
              {whyHumanizeData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {whyHumanizeData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
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
                  {section.points && (
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
                          <IconCheckCircle size={16} color="#008080" style={{ flexShrink: 0, marginTop: '2px' }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
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
            <div style={{ display: 'grid', gap: '24px' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {strategy.features.map((feature, fIndex) => (
                      <div key={fIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={16} color="#008080" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {feature}
                      </div>
                    ))}
                  </div>
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

        {/* Applications Section */}
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
              {applicationsData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {applicationsData.applications.map((app, index) => (
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
                  {app.points && (
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tumor Model Compatibility Table Section */}
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
              Tumor Model Compatibility
            </h2>
            <div className="animate-in" style={{
              background: '#f7f7f7',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a253c' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Tumor Model</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Tumor Type</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>PDL1 Expression</th>
                  </tr>
                </thead>
                <tbody>
                  {tumorModelData.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.model}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.type}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.expression}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PDL1 vs PD1 Comparison Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              {dualCheckpointData.title}
            </h2>
            <div className="animate-in" style={{
              background: '#ffffff',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '30px'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a253c' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Factor</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>PDL1 Humanization</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>PD1 Humanization</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.factor}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.pdl1}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.pd1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h3 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {dualCheckpointData.dualTitle}
            </h3>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 20px',
              lineHeight: 1.7
            }}>
              {dualCheckpointData.dualDescription}
            </p>
            <div className="animate-in" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}>
              {dualCheckpointData.dualPoints.map((point, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '.85rem',
                  color: '#666'
                }}>
                  <IconCheckCircle size={14} color="#008080" />
                  {point}
                </div>
              ))}
            </div>
            <div className="animate-in" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '30px'
            }}>
              {dualCheckpointData.links.map((link, index) => (
                <Link key={index} href={link.href} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  color: '#008080',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.2s ease'
                }}>
                  <IconDNA size={18} color="#008080" />
                  {link.label}
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              ))}
            </div>

            <h3 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Combination Models
            </h3>
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
                  {combinationData.map((row, index) => (
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
              color: '#666',
              textAlign: 'center',
              marginTop: '20px',
              lineHeight: 1.6
            }}>
              {dualCheckpointData.multiCheckpoint}
            </p>
          </div>
        </section>

        {/* Technical Considerations Section */}
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
              {technicalData.title}
            </h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {technicalData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #00d4d4'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconSettings size={24} color="#008080" />
                    </div>
                    <div style={{ flex: 1 }}>
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
                            marginBottom: '6px',
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
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
                  background: '#ffffff',
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
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
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
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
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
                  Other Humanized Checkpoint Models
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
                  Related Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.modelTypes.map((link, index) => (
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
                  Project Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.resources.map((link, index) => (
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
