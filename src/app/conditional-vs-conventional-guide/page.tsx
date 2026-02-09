'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconTarget, IconSettings, IconChevronRight, IconCheckCircle, IconShield, IconLayers } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Hero Data
const heroData = {
  badge: "Comparison Guide",
  title: "Conditional vs Conventional Knockout",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 custom gene targeting projects, helping researchers select the optimal knockout approach for their specific research goals.",
  description: "Both conditional and conventional knockouts create loss of function alleles, but they differ fundamentally in how and when gene inactivation occurs. This guide provides a direct comparison to help you choose the right approach for your project."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Comparison Table Data
const comparisonData = [
  { feature: "Gene deletion", conventional: "Global, all tissues", conditional: "Controlled by Cre expression" },
  { feature: "Timing of deletion", conventional: "From conception", conditional: "When Cre is active" },
  { feature: "Tissue specificity", conventional: "None (ubiquitous)", conditional: "Determined by Cre driver" },
  { feature: "Temporal control", conventional: "None", conditional: "Available with inducible Cre" },
  { feature: "Allele complexity", conventional: "Simple", conditional: "More complex (LoxP sites)" },
  { feature: "Breeding requirements", conventional: "Standard", conditional: "Requires Cre driver cross" },
  { feature: "Future flexibility", conventional: "Limited", conditional: "Extensive" },
  { feature: "Essential genes", conventional: "Often lethal", conditional: "Viable with tissue restriction" }
];

// Conventional Knockout Data
const conventionalData = {
  title: "Conventional Knockout",
  howItWorks: "Conventional knockout permanently inactivates a gene throughout the entire organism from the earliest stages of development. The targeted allele is non functional in every cell, providing complete loss of function.",
  bestApplications: [
    "Genes that are not essential for embryonic development",
    "Studies focused on whole organism phenotypes",
    "Initial characterization of gene function",
    "Genes with tissue restricted expression",
    "Projects requiring faster timelines or lower budgets"
  ],
  advantages: [
    "Simpler allele design",
    "Shorter project timeline",
    "Lower project cost",
    "No Cre driver breeding required",
    "Complete gene inactivation guaranteed"
  ],
  limitations: [
    "Embryonic lethality if gene is developmentally essential",
    "Cannot study tissue specific gene functions",
    "Systemic effects may mask primary phenotypes",
    "No temporal control",
    "Developmental compensation may obscure adult functions"
  ]
};

// Conditional Knockout Data
const conditionalData = {
  title: "Conditional Knockout",
  howItWorks: "Conditional knockout uses the Cre lox system to control gene inactivation. LoxP sites flank critical exons, creating a \"floxed\" allele that functions normally until exposed to Cre recombinase. Gene deletion occurs only in cells where Cre is expressed.",
  bestApplications: [
    "Genes essential for embryonic development",
    "Studies of tissue specific gene function",
    "Genes with pleiotropic functions across multiple organs",
    "Research requiring temporal control over gene deletion",
    "Projects anticipating multiple tissue specific studies"
  ],
  advantages: [
    "Bypasses embryonic lethality",
    "Enables tissue specific gene deletion",
    "Single allele works with hundreds of Cre drivers",
    "Temporal control with inducible Cre (CreERT2)",
    "Maximum experimental flexibility",
    "Can generate both null and conditional alleles (derivative system)"
  ],
  considerations: [
    "Longer project timeline",
    "Higher initial investment",
    "Requires Cre driver line for experiments",
    "Additional breeding generation to introduce Cre",
    "Must verify Cre specificity and efficiency"
  ]
};

// Decision Scenarios Data
const decisionScenariosData = [
  {
    title: "Scenario 1: Unknown Gene Function",
    question: "I want to understand what this gene does. Which approach should I use?",
    recommendation: "Check if global knockout is viable (review IMPC data, literature). If viable, conventional knockout provides straightforward initial characterization. If lethal or unknown, conditional knockout with derivative allele system provides both options."
  },
  {
    title: "Scenario 2: Essential Gene",
    question: "Global knockout of my gene is embryonic lethal. How can I study it?",
    recommendation: "Conditional knockout is required. Choose tissue specific Cre drivers relevant to your research question, or use inducible Cre to delete gene in adult animals after development is complete."
  },
  {
    title: "Scenario 3: Tissue Specific Question",
    question: "I want to know what this gene does specifically in the liver.",
    recommendation: "Conditional knockout with Albumin Cre provides hepatocyte specific deletion. This isolates liver specific gene function without confounding effects from other tissues."
  },
  {
    title: "Scenario 4: Drug Target Validation",
    question: "I want to model what happens when we inhibit this target therapeutically.",
    recommendation: "Inducible conditional knockout (CreERT2) best models acute target inhibition in adult animals, similar to drug treatment. Conventional knockout reflects lifelong absence, not drug inhibition."
  },
  {
    title: "Scenario 5: Budget Constraints",
    question: "Budget is limited. Should I choose conventional to save money?",
    recommendation: "Only if conventional knockout is scientifically appropriate. Choosing a cheaper approach that doesn't answer your question wastes more resources than investing in the right model upfront."
  }
];

// Derivative Allele Data
const derivativeAlleleData = {
  title: "The Derivative Allele Solution",
  intro: "The derivative allele system eliminates the need to choose between conventional and conditional. A single targeting project generates:",
  alleles: [
    "Knockout first allele (functions as null, potentially with LacZ reporter)",
    "Conditional ready (Flp excision creates floxed allele)",
    "Conditional null (Cre excision of targeted exon)"
  ],
  benefits: [
    "Immediate access to null phenotype",
    "Conditional capability when needed",
    "Reporter for expression analysis",
    "Maximum flexibility from one investment"
  ]
};

// Quick Decision Guide Data
const quickDecisionData = {
  conventional: {
    title: "Choose Conventional Knockout if:",
    points: [
      "Gene is confirmed non essential for development",
      "Global phenotype is your primary interest",
      "Timeline and budget are significant constraints",
      "You don't anticipate needing tissue specific studies"
    ]
  },
  conditional: {
    title: "Choose Conditional Knockout if:",
    points: [
      "Gene is essential or potentially essential for development",
      "Tissue specific gene function is your question",
      "You need temporal control over gene deletion",
      "You anticipate multiple tissue specific studies",
      "You want maximum flexibility for future research"
    ]
  },
  derivative: {
    title: "Choose Derivative Allele Approach if:",
    points: [
      "You're uncertain about developmental essentiality",
      "You want both conventional and conditional options",
      "You value reporter expression for gene analysis",
      "You want to maximize return on investment"
    ]
  }
};

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const harhajTestimonial = getTestimonialById('harhaj-pennstate')!;

const testimonialsData = [
  { quote: harhajTestimonial.quote, author: formatAuthorWithCredentials(harhajTestimonial), affiliation: harhajTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "What is the main difference between conventional and conditional knockouts?",
    answer: "Conventional knockouts permanently eliminate gene function in all tissues from fertilization. Conditional knockouts use the Cre-lox system to control when and where gene deletion occurs, allowing tissue-specific or temporally controlled inactivation while preserving gene function in other tissues. Conditional knockouts are essential when global deletion causes embryonic lethality."
  },
  {
    question: "Can I convert a conventional knockout to a conditional knockout later?",
    answer: "If the knockout was generated using a knockout-first allele design, yes. Flp recombinase converts to a conditional-ready allele. If the knockout was generated by simple exon deletion without a stop cassette system, a new conditional targeting project would be required."
  },
  {
    question: "When should I choose conditional knockout over conventional?",
    answer: "Choose conditional knockout if: the gene causes embryonic lethality, you need tissue-specific deletion, you want temporal control over gene deletion, you anticipate studying gene function in multiple tissues, or you want to model acute target inhibition similar to drug treatment. If the gene is non-essential and you want global deletion, conventional knockout may be sufficient."
  }
];

// Related Links Data
const relatedLinksData = {
  guides: [
    { href: "/knockout-strategy-guide", label: "Knockout Strategy Guide" },
    { href: "/mouse-model-budgeting-guide", label: "Mouse Model Budgeting Guide" },
    { href: "/cre-line-selection-guide", label: "Cre Line Selection Guide" }
  ],
  modelTypes: [
    { href: "/conventional-knockout-mouse-models", label: "Conventional Knockout Mouse Models" },
    { href: "/conditional-knockout-mouse-models", label: "Conditional Knockout Mouse Models" },
    { href: "/tissue-specific-knockout", label: "Tissue Specific Knockout" },
    { href: "/inducible-conditional-knockout", label: "Inducible Conditional Knockout" }
  ],
  technologies: [
    { href: "/cre-lox-system", label: "Cre Lox System" },
    { href: "/tissue-specific-cre-lines", label: "Tissue Specific Cre Lines" }
  ]
};

// CTA Data
const ctaData = {
  title: "Get Personalized Guidance",
  description: "Not sure which approach fits your research? Our scientific consultants can review your specific gene and experimental goals to recommend the optimal strategy. Initial consultation is provided at no charge.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function ConditionalVsConventionalGuidePage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const heroElements = document.querySelectorAll('.hero-animate');
      heroElements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power2.out" }
        );
      });

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
            "@type": "Article",
            "name": "Conditional vs Conventional Knockout Comparison Guide",
            "description": "Compare conditional and conventional knockout strategies. Side by side analysis of timeline, cost, flexibility, and applications. Expert guidance since 1998.",
            "publisher": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory",
              "url": "https://www.genetargeting.com"
            },
            "articleSection": "Research Guides"
          })
        }}
      />
      <UXUIDCNavigation />
      <main ref={animatedElementsRef}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05
          }}>
            <div style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
              top: '-200px',
              right: '-200px'
            }} />
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="hero-animate" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <IconLayers size={14} color="#00d4d4" />
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            <h1 className="hero-animate" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: 1.2
            }}>
              {heroData.title}
            </h1>
            <p className="hero-animate" style={{
              fontSize: '1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '16px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            <p className="hero-animate" style={{
              fontSize: '.9rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.description}
            </p>
            <div className="hero-animate" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
              <Link href="/knockout-strategy-guide" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                Knockout Strategy Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {statsData.map((stat, index) => (
                <div key={index} className="animate-in" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#008080', marginBottom: '4px' }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '.85rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
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
              Side by Side Comparison
            </h2>
            <div className="animate-in" style={{
              background: '#ffffff',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #e0e0e0'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a253c' }}>
                    <th style={{ padding: '16px', color: '#fff', fontWeight: 600, textAlign: 'left', fontSize: '.9rem' }}>Feature</th>
                    <th style={{ padding: '16px', color: '#fff', fontWeight: 600, textAlign: 'left', fontSize: '.9rem' }}>Conventional Knockout</th>
                    <th style={{ padding: '16px', color: '#fff', fontWeight: 600, textAlign: 'left', fontSize: '.9rem' }}>Conditional Knockout</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e0e0e0', background: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                      <td style={{ padding: '14px 16px', color: '#333', fontWeight: 500, fontSize: '.85rem' }}>{row.feature}</td>
                      <td style={{ padding: '14px 16px', color: '#666', fontSize: '.85rem' }}>{row.conventional}</td>
                      <td style={{ padding: '14px 16px', color: '#666', fontSize: '.85rem' }}>{row.conditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Conventional vs Conditional Details Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
              {/* Conventional Knockout */}
              <div className="animate-in">
                <div style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '28px',
                  borderTop: '4px solid #134978',
                  height: '100%'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(19,73,120,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconTarget size={24} color="#134978" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {conventionalData.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, marginBottom: '20px' }}>
                    {conventionalData.howItWorks}
                  </p>
                  
                  <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#333', marginBottom: '12px' }}>Best Applications</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                    {conventionalData.bestApplications.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#134978" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#333', marginBottom: '12px' }}>Advantages</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                    {conventionalData.advantages.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#333', marginBottom: '12px' }}>Limitations</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {conventionalData.limitations.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconShield size={14} color="#999" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '20px' }}>
                    <Link href="/conventional-knockout-mouse-models" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#134978',
                      fontSize: '.9rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}>
                      Learn More
                      <IconChevronRight size={14} color="#134978" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Conditional Knockout */}
              <div className="animate-in">
                <div style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '28px',
                  borderTop: '4px solid #008080',
                  height: '100%'
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
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {conditionalData.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, marginBottom: '20px' }}>
                    {conditionalData.howItWorks}
                  </p>
                  
                  <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#333', marginBottom: '12px' }}>Best Applications</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                    {conditionalData.bestApplications.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#333', marginBottom: '12px' }}>Advantages</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                    {conditionalData.advantages.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#333', marginBottom: '12px' }}>Considerations</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {conditionalData.considerations.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconShield size={14} color="#999" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '20px' }}>
                    <Link href="/conditional-knockout-mouse-models" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#008080',
                      fontSize: '.9rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}>
                      Learn More
                      <IconChevronRight size={14} color="#008080" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Scenarios Section */}
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
              Decision Scenarios
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {decisionScenariosData.map((scenario, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #00d4d4'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    {scenario.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#008080', fontWeight: 500, marginBottom: '10px', fontStyle: 'italic' }}>
                    &ldquo;{scenario.question}&rdquo;
                  </p>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    <strong style={{ color: '#333' }}>Recommendation:</strong> {scenario.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Derivative Allele Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{
              background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
              borderRadius: '12px',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,212,212,0.1) 0%, transparent 70%)'
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(0,212,212,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <IconDNA size={28} color="#00d4d4" />
                </div>
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '16px'
                }}>
                  {derivativeAlleleData.title}
                </h2>
                <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: '24px' }}>
                  {derivativeAlleleData.intro}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                  <div>
                    <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#00d4d4', marginBottom: '12px' }}>Allele Types Generated</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {derivativeAlleleData.alleles.map((item, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '.9rem',
                          color: 'rgba(255,255,255,0.85)',
                          marginBottom: '10px',
                          lineHeight: 1.5
                        }}>
                          <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '.95rem', fontWeight: 600, color: '#00d4d4', marginBottom: '12px' }}>Benefits</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {derivativeAlleleData.benefits.map((item, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '.9rem',
                          color: 'rgba(255,255,255,0.85)',
                          marginBottom: '10px',
                          lineHeight: 1.5
                        }}>
                          <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <Link
                    href="/cre-lox-system"
                    style={{
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
                    Learn More About Conditional Systems
                    <IconChevronRight size={16} color="#ffffff" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Decision Guide Section */}
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
              Quick Decision Guide
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                borderTop: '4px solid #134978'
              }}>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  {quickDecisionData.conventional.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {quickDecisionData.conventional.points.map((point, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '.85rem',
                      color: '#666',
                      marginBottom: '10px',
                      lineHeight: 1.5
                    }}>
                      <IconCheckCircle size={14} color="#134978" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                borderTop: '4px solid #008080'
              }}>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  {quickDecisionData.conditional.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {quickDecisionData.conditional.points.map((point, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '.85rem',
                      color: '#666',
                      marginBottom: '10px',
                      lineHeight: 1.5
                    }}>
                      <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                borderTop: '4px solid #00d4d4'
              }}>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  {quickDecisionData.derivative.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {quickDecisionData.derivative.points.map((point, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '.85rem',
                      color: '#666',
                      marginBottom: '10px',
                      lineHeight: 1.5
                    }}>
                      <IconCheckCircle size={14} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  Related Guides
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.guides.map((link, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
                  marginBottom: '20px'
                }}>
                  Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.modelTypes.map((link, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
                  marginBottom: '20px'
                }}>
                  Related Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.technologies.map((link, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
