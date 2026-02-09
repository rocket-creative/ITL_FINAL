'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconChevronRight, IconCheckCircle, IconShield } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Hero Data
const heroData = {
  badge: "Selection Guide",
  title: "Cre Line Selection Guide",
  intro: "Choosing the right Cre driver line is critical for successful conditional knockout experiments. The wrong Cre can lead to unexpected phenotypes, embryonic lethality, or failure to delete in your tissue of interest.",
  description: "This guide covers key selection criteria, major Cre line categories, and resources to help you identify the optimal driver for your conditional knockout project."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Key Selection Criteria Data
const selectionCriteriaData = [
  {
    title: "Tissue Specificity",
    description: "Does the Cre driver express exclusively in your tissue of interest? Consider both the promoter used and actual expression data from published characterization studies.",
    points: [
      "Review published expression patterns and recombination maps",
      "Consider both intended and unintended expression sites",
      "Account for embryonic vs adult expression differences",
      "Verify specificity in your strain background"
    ]
  },
  {
    title: "Expression Timing",
    description: "When does Cre expression begin? Early embryonic expression may cause deletion before your tissue of interest differentiates, while late expression may miss critical developmental windows.",
    points: [
      "Match Cre expression timing to your experimental needs",
      "Consider developmental stage of target tissue",
      "Use inducible Cre for precise temporal control",
      "Account for Cre expression onset vs full activity"
    ]
  },
  {
    title: "Recombination Efficiency",
    description: "How completely does the Cre driver recombine floxed alleles in target tissues? Variable efficiency can create mosaic deletion patterns that complicate phenotype interpretation.",
    points: [
      "Review published recombination efficiency data",
      "Consider using reporter alleles to assess efficiency",
      "Higher efficiency is generally preferred",
      "Account for variation between individual animals"
    ]
  },
  {
    title: "Background Recombination",
    description: "Does the Cre show any activity outside the intended tissue? Even low level leaky expression can confound results if your gene is essential in other tissues.",
    points: [
      "Check for germline recombination (especially with female Cre carriers)",
      "Review reports of unexpected tissue recombination",
      "Consider Cre toxicity in expressing tissues",
      "Assess mosaicism in target and non target tissues"
    ]
  }
];

// Major Cre Line Categories Data
const creLineCategoriesData = [
  {
    title: "Ubiquitous Cre Lines",
    description: "Express Cre in all tissues, useful for generating global knockouts from conditional alleles.",
    examples: ["CMV Cre (early embryonic, all tissues)", "EIIa Cre (early embryonic)", "Actin Cre (broadly expressed)", "Sox2 Cre (epiblast, germline)"]
  },
  {
    title: "Tissue Specific Cre Lines",
    description: "Express Cre in defined tissue types based on endogenous promoter specificity.",
    examples: ["Albumin Cre (hepatocytes)", "Nestin Cre (neural progenitors)", "LysM Cre (myeloid cells)", "CD4 Cre (T lymphocytes)", "Villin Cre (intestinal epithelium)"]
  },
  {
    title: "Cell Type Specific Cre Lines",
    description: "Express Cre in specific cell populations within tissues.",
    examples: ["CamKII Cre (forebrain neurons)", "Adipoq Cre (mature adipocytes)", "Myh6 Cre (cardiomyocytes)", "Pdx1 Cre (pancreatic cells)", "Col2a1 Cre (chondrocytes)"]
  },
  {
    title: "Developmental Stage Cre Lines",
    description: "Express Cre at specific developmental timepoints.",
    examples: ["Shh Cre (sonic hedgehog expressing cells)", "Wnt1 Cre (neural crest)", "Pax3 Cre (dermomyotome)", "Tie2 Cre (endothelial/hematopoietic)"]
  }
];

// Inducible Cre Systems Data
const inducibleCreData = {
  title: "Inducible Cre Systems",
  intro: "Inducible Cre lines provide temporal control over gene deletion, enabling deletion in adult animals or at specific developmental timepoints.",
  systems: [
    {
      name: "CreERT2 (Tamoxifen Inducible)",
      description: "Cre fused to modified estrogen receptor. Inactive until tamoxifen administration. Most widely used inducible system.",
      advantages: ["Tight temporal control", "Wide variety of tissue specific versions available", "Reversible (deletion is permanent, but Cre activity requires continued tamoxifen)"],
      considerations: ["Tamoxifen has estrogenic effects", "Efficiency varies with dose and timing", "Some leakiness possible without induction"]
    },
    {
      name: "Tet Inducible Cre",
      description: "Cre expression controlled by doxycycline. Can be either Tet On (dox activates) or Tet Off (dox represses).",
      advantages: ["Reversible control of Cre expression", "Dose dependent expression levels", "No estrogen related effects"],
      considerations: ["Requires two transgenes (tTA/rtTA and TetO Cre)", "Background activity varies by line", "Doxycycline has some biological effects"]
    }
  ]
};

// Selection Workflow Data
const selectionWorkflowData = {
  title: "Cre Line Selection Workflow",
  steps: [
    {
      step: "Step 1: Define Your Requirements",
      description: "Specify the tissue(s), cell type(s), and timing for gene deletion based on your experimental questions."
    },
    {
      step: "Step 2: Search Available Cre Lines",
      description: "Use resources like the Jackson Laboratory Cre Portal, MGI, or IMSR to identify candidate lines expressing in your tissue of interest."
    },
    {
      step: "Step 3: Review Published Characterization",
      description: "For each candidate, review published data on expression pattern, recombination efficiency, and any reported issues."
    },
    {
      step: "Step 4: Evaluate Specificity and Timing",
      description: "Assess whether expression pattern matches your needs. Consider both intended and unintended expression."
    },
    {
      step: "Step 5: Check Availability and Background",
      description: "Verify the line is available, and consider whether strain background is compatible with your floxed allele."
    },
    {
      step: "Step 6: Plan Validation Experiments",
      description: "Plan to validate Cre expression and recombination in your specific cross using reporter alleles or PCR based methods."
    }
  ]
};

// Common Selection Mistakes Data
const commonMistakesData = [
  {
    mistake: "Relying solely on promoter name",
    solution: "Always check actual expression data. Transgenic Cre lines often have expression patterns that differ from the endogenous gene due to position effects."
  },
  {
    mistake: "Ignoring germline recombination",
    solution: "Some Cre lines show germline activity, especially in females. Always breed Cre through males for the first generation and genotype for recombination."
  },
  {
    mistake: "Not considering developmental expression",
    solution: "A Cre that is specific in adults may have broader expression during development. If your gene is essential during development, this can cause unexpected lethality."
  },
  {
    mistake: "Overlooking Cre toxicity",
    solution: "High Cre expression can be toxic independent of target gene deletion. Always include Cre only controls in your experiments."
  },
  {
    mistake: "Assuming complete deletion",
    solution: "Most Cre lines do not achieve 100% recombination. Plan for mosaic deletion and consider using reporter alleles to assess efficiency."
  }
];

// Resources Data
const resourcesData = [
  {
    title: "Jackson Laboratory Cre Portal",
    description: "Comprehensive database of Cre driver lines with expression data and availability information."
  },
  {
    title: "Mouse Genome Informatics (MGI)",
    description: "Searchable database of recombinase alleles with links to expression data and publications."
  },
  {
    title: "International Mouse Strain Resource (IMSR)",
    description: "Global database of mouse strains including Cre lines, with source information."
  },
  {
    title: "Published Literature",
    description: "Original characterization papers often contain the most detailed expression and recombination data."
  }
];

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { CRE_LOX_TESTIMONIALS, SINGLE_DUNAIEF, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonialsData = [
  ...CRE_LOX_TESTIMONIALS.map(t => ({
    quote: t.quote,
    author: formatAuthorWithCredentials(t),
    affiliation: t.affiliation,
  })),
  {
    quote: SINGLE_DUNAIEF.quote,
    author: formatAuthorWithCredentials(SINGLE_DUNAIEF),
    affiliation: SINGLE_DUNAIEF.affiliation,
  }
];

// Related Links Data
const relatedLinksData = {
  resources: [
    { href: "/conditional-vs-conventional-guide", label: "Conditional vs Conventional Guide" },
    { href: "/knockout-strategy-guide", label: "Knockout Strategy Guide" },
  ],
  guides: [
    { href: "/cre-lox-system", label: "Cre Lox System" },
    { href: "/tissue-specific-cre-lines", label: "Tissue Specific Cre Lines" }
  ],
  catalog: [
    { href: "/catalog-mouse-models", label: "Catalog Mouse Models" },
    { href: "/conditional-knockout-mouse-models", label: "Conditional Knockout Mouse Models" },
    { href: "/inducible-conditional-knockout", label: "Inducible Conditional Knockout" }
  ]
};

// FAQ Data
const faqData = [
  {
    question: "How do I choose the right Cre driver for my conditional knockout?",
    answer: "Start by defining your tissue, cell type, and timing requirements. Search databases like Jackson Laboratory Cre Portal or MGI for candidate lines. Review published characterization data for expression pattern, recombination efficiency, and any reported issues. Verify availability and strain background compatibility. Plan validation experiments using reporter alleles."
  },
  {
    question: "What is the difference between constitutive and inducible Cre lines?",
    answer: "Constitutive Cre lines express continuously based on their promoter, causing recombination as soon as the promoter is active (often during development). Inducible Cre lines (CreERT2, Tet-inducible) require an external inducer (tamoxifen, doxycycline) to activate recombination, allowing temporal control over when deletion occurs."
  },
  {
    question: "Why is germline recombination a concern with some Cre lines?",
    answer: "Some Cre lines show activity in the germline, which can cause recombination in all offspring tissues regardless of the Cre's intended tissue specificity. This effectively converts your conditional allele to a conventional knockout. To avoid this, breed Cre through males for the first generation and genotype for unexpected recombination."
  }
];

// CTA Data
const ctaData = {
  title: "Need Help Selecting a Cre Line?",
  description: "Our scientific consultants can help you identify the optimal Cre driver for your conditional knockout project. We can also assist with breeding strategies and validation approaches.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function CreLineSelectionGuidePage() {
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
            "name": "Cre Line Selection Guide",
            "description": "Expert guidance for selecting Cre driver lines for conditional knockout experiments. Covers tissue specificity, timing, efficiency, and common selection mistakes.",
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
              <IconTarget size={14} color="#00d4d4" />
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
              <Link href="/conditional-knockout-mouse-models" style={{
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
                Conditional Knockout Models
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

        {/* Key Selection Criteria Section */}
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
              Key Selection Criteria
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {selectionCriteriaData.map((criterion, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '28px',
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
                    <IconTarget size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {criterion.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                    {criterion.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {criterion.points.map((point, idx) => (
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
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Major Cre Line Categories Section */}
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
              Major Cre Line Categories
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {creLineCategoriesData.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #134978'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    {category.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, marginBottom: '14px' }}>
                    {category.description}
                  </p>
                  <div style={{ fontSize: '.85rem', color: '#008080', fontWeight: 500 }}>
                    Examples: {category.examples.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inducible Cre Systems Section */}
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
              {inducibleCreData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}>
              {inducibleCreData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {inducibleCreData.systems.map((system, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '28px',
                  borderTop: '4px solid #00d4d4'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {system.name}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                    {system.description}
                  </p>
                  <h4 style={{ fontSize: '.9rem', fontWeight: 600, color: '#333', marginBottom: '10px' }}>Advantages</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                    {system.advantages.map((adv, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '6px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                  <h4 style={{ fontSize: '.9rem', fontWeight: 600, color: '#333', marginBottom: '10px' }}>Considerations</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {system.considerations.map((con, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '6px',
                        lineHeight: 1.5
                      }}>
                        <IconShield size={14} color="#999" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selection Workflow Section */}
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
              {selectionWorkflowData.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectionWorkflowData.steps.map((step, index) => (
                <div key={index} className="animate-in" style={{
                  display: 'flex',
                  gap: '20px',
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '20px 24px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#008080',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '.9rem'
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#333',
                      marginBottom: '6px'
                    }}>
                      {step.step}
                    </h3>
                    <p style={{ fontSize: '.85rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Selection Mistakes Section */}
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
              Common Selection Mistakes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {commonMistakesData.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #e74c3c'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    Mistake: {item.mistake}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    <strong style={{ color: '#008080' }}>Solution:</strong> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
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
              Resources for Finding Cre Lines
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {resourcesData.map((resource, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #134978'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    {resource.title}
                  </h3>
                  <p style={{ fontSize: '.85rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {resource.description}
                  </p>
                </div>
              ))}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  Related Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.resources.map((link, index) => (
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
                  Model Catalog
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.catalog.map((link, index) => (
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
