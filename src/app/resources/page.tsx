'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { LabSignalsSignup, BreedingSchemeArchitectCTA } from '@/components/UXUIDC';
import { IconChevronRight, IconCheckCircle, IconLayers, IconImage, IconDocument, IconDownload, IconBarChart, IconBookOpen, IconFileText, IconSparkle, IconGitBranch } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Hero Data
const heroData = {
  badge: "Resources",
  title: "Mouse Model Resources",
  intro: "ingenious targeting laboratory provides comprehensive resources to help researchers design, implement, and optimize custom mouse model projects.",
  description: "From selection guides that clarify strategic decisions to technical resources and FAQs answering common questions, these resources draw on our experience from more than 2,500 projects completed since 1998."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Featured Tool Data (New for 2026)
const featuredToolData = {
  badge: "New for 2026",
  title: "Breeding Scheme Architect",
  description: "Plan complex multi allele breeding schemes with our free interactive tool. Visualize generation by generation crosses, calculate expected genotype ratios, and estimate time to experimental cohorts for knockout, knockin, Cre lox, and humanized mouse models.",
  features: [
    "Multi allele breeding path visualization",
    "Punnett square calculations for up to 6 alleles",
    "Timeline and resource estimates",
    "AI powered breeding optimization",
    "Export schemes as PDF"
  ],
  href: "/breeding-scheme-architect"
};

// Strategy Guides Data
const strategyGuidesData = {
  title: "Strategy Guides",
  description: "Making the right design decisions early in your project maximizes research value and minimizes timeline. These guides help you navigate key strategic choices:",
  guides: [
    {
      href: "/knockout-strategy-guide",
      title: "Knockout Strategy Guide",
      description: "Compare global knockout, conditional knockout, and knockout first approaches. Understand when each strategy provides optimal research outcomes and how to match your approach to specific research questions."
    },
    {
      href: "/conditional-vs-conventional-guide",
      title: "Conditional vs Conventional Guide",
      description: "Detailed comparison of conditional and conventional knockout strategies including timeline considerations, cost factors, and flexibility for future research applications."
    },
    {
      href: "/humanization-strategy-guide",
      title: "Humanization Strategy Guide",
      description: "Navigate decisions about gene replacement, receptor humanization, and immune checkpoint humanization. Understand technical considerations and research application implications."
    },
    {
      href: "/reporter-selection-guide",
      title: "Reporter Selection Guide",
      description: "Compare fluorescent proteins, enzymatic reporters, and bioluminescent systems. Match reporter characteristics to your imaging modality and research requirements."
    },
    {
      href: "/cre-line-selection-guide",
      title: "Cre Line Selection Guide",
      description: "Identify appropriate Cre driver lines for tissue specific gene deletion. Understand recombination efficiency, specificity considerations, and available resources."
    }
  ]
};

// Planning Guides Data
const planningGuidesData: {
  title: string;
  guides: Array<{
    href: string;
    title: string;
    description: string;
  }>;
} = {
  title: "Planning Guides",
  guides: [
    // Planning guides to be added in future
  ]
};


// Technical Resources Data
const technicalResourcesData = {
  title: "Technical Resources",
  categories: [
    {
      title: "Technology Documentation",
      description: "Detailed technical information about ingenious targeting laboratory's gene targeting approaches:",
      links: [
        { href: "/cre-lox-system", label: "Cre-Lox System" },
        { href: "/safe-harbor-locus", label: "Safe Harbor Locus" }
      ]
    },
    {
      title: "Strain Background Information",
      links: [
        { href: "/c57bl6-mouse-background", label: "C57BL/6 Mouse Background" },
        { href: "/strain-selection-guide", label: "Strain Selection Guide" },
        { href: "/backcrossing-services", label: "Backcrossing Services" }
      ]
    }
  ]
};

// Publications Data
const publicationsData = {
  title: "Publications",
  description: "ingenious targeting laboratory generated mouse models have contributed to more than 800 peer reviewed publications across all major therapeutic areas and journals including Nature, Cell, Science, and specialty publications.",
  features: [
    "Searchable archive by therapeutic area",
    "Publications organized by model type",
    "Recent high impact publications",
    "Full citation information"
  ],
  href: "/publications"
};

// Video Library Data
const videoLibraryData = {
  title: "Video Library",
  description: "Educational videos covering gene targeting concepts, project workflows, and technical approaches:",
  videos: [
    "Understanding Conditional Knockouts",
    "Project Planning Webinar Series"
  ],
  href: "/video-library"
};

// Glossary Data
const glossaryData = {
  title: "Glossary",
  description: "Technical terminology reference for gene targeting and mouse genetics:",
  items: [
    "Allele nomenclature conventions",
    "Recombinase system terminology",
    "ES cell and mouse genetics terms",
    "Project phase definitions"
  ],
  href: "/glossary"
};

// Downloadable Resources Data (HubSpot Gated Content)
const downloadableResourcesData = {
  title: "Downloadable Resources",
  description: "All the information you need about our animal models in one place. For your convenience, ingenious has created software, quick guides, and charts with information on the different types of animal models we offer.",
  categories: [
    {
      title: "Charts",
      icon: "chart",
      resources: [
        { title: "Conditional Knockout Comparison Chart", href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/2019%20Images/Conditional%20Knockout%20Comparison%20Chart.jpg" },
        { title: "Humanization Comparison Chart", href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/2021%20Images/Humanization%20Comparison%20Chart-1.jpg" },
        { title: "Point Mutation Comparison Chart", href: "https://go.genetargeting.com/point-mutation-chart" }
      ]
    },
    {
      title: "Guides",
      icon: "guide",
      resources: [
        { title: "Enhance With A Reporter Quick Guide", href: "https://go.genetargeting.com/reporter-quick-guide-0" },
        { title: "Cre-lox Design Guide", href: "https://go.genetargeting.com/crelox-design-guide" },
        { title: "Conditional Knockout (cKO) Quick Guide", href: "https://go.genetargeting.com/conditional-ko-quick-guide" },
        { title: "Conditional + Reversible Mouse Model Guide", href: "https://go.genetargeting.com/conditional-reversible-guide" },
        { title: "ingenious Pricing Guide", href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/Pricing%20Guide%202024.pdf" },
        { title: "Rapid-Rosa26™ Quick Guide", href: "https://go.genetargeting.com/rapid-rosa26-quick-guide" },
        { title: "Rat Model Quick Guide", href: "https://go.genetargeting.com/rat-model-technology-guide" }
      ]
    },
    {
      title: "White Papers",
      icon: "whitepaper",
      resources: [
        { title: "Humanization White Paper", href: "https://go.genetargeting.com/humanization-white-paper" },
        { title: "Rats For Tissue-Specific Gene Knockout White Paper", href: "https://go.genetargeting.com/rat-tissue-specific-white-paper" }
      ]
    },
    {
      title: "Other Resources",
      icon: "other",
      resources: [
        { title: "Cre Mouse Repositories (Find Cre-Expressing Mice)", href: "https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/2020%20Images/Cre%20Mouse%20Repositories.pdf" },
        { title: "Mouse Breeding Planner", href: "/breeding-scheme-architect", isInternal: true }
      ]
    }
  ]
};

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { RESOURCES_TESTIMONIALS, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonialsData = RESOURCES_TESTIMONIALS.map(t => ({
  quote: t.quote,
  author: formatAuthorWithCredentials(t),
  affiliation: t.affiliation,
}));

// Related Services Data
const relatedServicesData = [
  { href: "/colony-management-services", label: "Colony Management Services" },
  { href: "/cryopreservation-services", label: "Cryopreservation Services" },
  { href: "/mouse-genotyping-service", label: "Mouse Genotyping Service" },
  { href: "/phenotyping-services", label: "Phenotyping Services" }
];

// FAQ Data
const faqData = [
  {
    question: "What resources does ingenious targeting laboratory provide for mouse model projects?",
    answer: "We provide comprehensive resources including selection guides (knockout strategy, conditional vs conventional, humanization strategy, reporter selection, Cre line selection), planning guides (model generation timeline, budgeting guide), technical resources, and FAQs addressing common project questions."
  },
  {
    question: "How do I choose the right knockout or knockin strategy?",
    answer: "Use the knockout or knockin strategy guide to compare global knockout, conditional knockout, and knockout-first approaches. Selection depends on whether the gene is essential (conditional avoids lethality), whether tissue-specific studies are needed (conditional enables spatial control), and whether temporal control is required (inducible conditional). Our scientific consultants provide complimentary consultation to help select optimal strategies."
  },
  {
    question: "How do I access our technical resources?",
    answer: "Technical resources including selection guides, planning guides, and FAQs are available in the resources section. Our scientific consultants also provide complimentary project design consultations to help plan optimal mouse model strategies. Contact us through the request quote form or schedule a consultation."
  }
];

// CTA Data
const ctaData = {
  title: "Start Your Project",
  description: "Ready to discuss your research goals? Our scientific consultants provide complimentary project design consultations to help you plan the optimal mouse model strategy.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function ResourcesPage() {
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
            "@type": "CollectionPage",
            "name": "Mouse Model Resources",
            "description": "Mouse model selection guides, case studies, FAQs, and technical resources. Expert guidance for knockout, knockin, and humanized model projects since 1998.",
            "publisher": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory",
              "url": "https://www.genetargeting.com"
            }
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
              <Link
                href="/resources"
                style={{
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
                View All Resources
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

        {/* Featured Tool Section - New for 2026 */}
        <section style={{ 
          background: 'linear-gradient(135deg, #008080 0%, #00a0a0 100%)', 
          padding: '60px 20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,212,0.15) 0%, transparent 70%)'
          }} />
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="animate-in" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                border: '1px solid rgba(255,215,0,0.5)',
                borderRadius: '20px',
                padding: '8px 16px',
                marginBottom: '20px',
                boxShadow: '0 4px 15px rgba(255,215,0,0.3)'
              }}>
                <IconSparkle size={16} color="#000000" />
                <span style={{ 
                  color: '#000000', 
                  fontSize: '.9rem', 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {featuredToolData.badge}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px'
              }}>
                {featuredToolData.title}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '700px',
                marginBottom: '30px',
                lineHeight: 1.7
              }}>
                {featuredToolData.description}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
                maxWidth: '800px',
                width: '100%',
                marginBottom: '30px'
              }}>
                {featuredToolData.features.map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}>
                    <IconCheckCircle size={18} color="#00d4d4" />
                    <span style={{ fontSize: '.9rem', color: '#ffffff', fontWeight: 500 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <Link href={featuredToolData.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#ffffff',
                color: '#008080',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}>
                <IconGitBranch size={20} color="#008080" />
                Launch Breeding Scheme Architect
                <IconChevronRight size={18} color="#008080" />
              </Link>
              <p style={{
                fontSize: '.85rem',
                color: 'rgba(255,255,255,0.7)',
                marginTop: '16px'
              }}>
                Free to use • No account required
              </p>
            </div>
          </div>
        </section>

        {/* Downloadable Resources Section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,128,128,0.1)',
                border: '1px solid rgba(0,128,128,0.2)',
                borderRadius: '20px',
                padding: '6px 14px',
                marginBottom: '16px'
              }}>
                <IconDownload size={14} color="#008080" />
                <span style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>Gated Resources</span>
              </div>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '16px'
              }}>
                {downloadableResourcesData.title}
              </h2>
              <p style={{
                fontSize: '.95rem',
                color: '#666',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.7
              }}>
                {downloadableResourcesData.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {downloadableResourcesData.categories.map((category, index) => {
                const getCategoryIcon = (iconType: string) => {
                  switch (iconType) {
                    case 'chart': return <IconBarChart size={24} color="#008080" />;
                    case 'guide': return <IconBookOpen size={24} color="#008080" />;
                    case 'whitepaper': return <IconFileText size={24} color="#008080" />;
                    default: return <IconDocument size={24} color="#008080" />;
                  }
                };

                return (
                  <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                    background: '#f7f7f7',
                    borderRadius: '12px',
                    padding: '28px',
                    borderTop: '4px solid #008080'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(0,128,128,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getCategoryIcon(category.icon)}
                      </div>
                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#333'
                      }}>
                        {category.title}
                      </h3>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {category.resources.map((resource, idx) => {
                        const isInternal = 'isInternal' in resource && resource.isInternal;
                        const isBreedingPlanner = resource.href === '/breeding-scheme-architect';
                        const linkStyles = {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 14px',
                          background: '#ffffff',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          border: '1px solid #e0e0e0'
                        };
                        
                        if (isInternal) {
                          return (
                            <li key={idx} style={{ marginBottom: '12px' }}>
                              <Link
                                href={resource.href}
                                style={linkStyles}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.borderColor = '#008080';
                                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,128,128,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = '#e0e0e0';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                {isBreedingPlanner ? (
                                  <IconGitBranch size={16} color="#008080" />
                                ) : (
                                  <IconBookOpen size={16} color="#008080" />
                                )}
                                <span style={{
                                  flex: 1,
                                  fontSize: '.9rem',
                                  color: '#333',
                                  fontWeight: 500
                                }}>
                                  {resource.title}
                                </span>
                                {isBreedingPlanner && (
                                  <span style={{
                                    fontSize: '.7rem',
                                    background: '#008080',
                                    color: '#ffffff',
                                    padding: '3px 8px',
                                    borderRadius: '10px',
                                    fontWeight: 600
                                  }}>
                                    NEW
                                  </span>
                                )}
                                <IconChevronRight size={14} color="#008080" />
                              </Link>
                            </li>
                          );
                        }
                        
                        return (
                          <li key={idx} style={{ marginBottom: '12px' }}>
                            <a
                              href={resource.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={linkStyles}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#008080';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,128,128,0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e0e0e0';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              <IconDownload size={16} color="#008080" />
                              <span style={{
                                flex: 1,
                                fontSize: '.9rem',
                                color: '#333',
                                fontWeight: 500
                              }}>
                                {resource.title}
                              </span>
                              <IconChevronRight size={14} color="#008080" />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="animate-in" style={{
              textAlign: 'center',
              marginTop: '40px',
              padding: '24px',
              background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
              borderRadius: '12px'
            }}>
              <p style={{
                fontSize: '.95rem',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '16px'
              }}>
                Need help choosing the right resource for your project?
              </p>
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
                Request a Consultation
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
            </div>
          </div>
        </section>

        {/* Selection Guides Section */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Selection Guides
            </h2>

            {/* Strategy Guides */}
            <h3 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '12px',
              marginTop: '40px'
            }}>
              {strategyGuidesData.title}
            </h3>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              marginBottom: '24px',
              lineHeight: 1.6
            }}>
              {strategyGuidesData.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {strategyGuidesData.guides.map((guide, index) => (
                <Link key={index} href={guide.href} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  display: 'block',
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080',
                  textDecoration: 'none'
                }}>
                  <h4 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    {guide.title}
                  </h4>
                  <p style={{
                    fontSize: '.85rem',
                    color: '#666',
                    lineHeight: 1.6,
                    marginBottom: '12px'
                  }}>
                    {guide.description}
                  </p>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    color: '#008080'
                  }}>
                    Read Guide
                    <IconChevronRight size={14} color="#008080" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Planning Guides */}
            {planningGuidesData.guides.length > 0 && (
              <>
                <h3 className="animate-in" style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  {planningGuidesData.title}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {planningGuidesData.guides.map((guide, index) => (
                    <Link key={index} href={guide.href} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                      display: 'block',
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '24px',
                      borderTop: '4px solid #134978',
                      textDecoration: 'none'
                    }}>
                      <h4 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '10px'
                      }}>
                        {guide.title}
                      </h4>
                      <p style={{
                        fontSize: '.85rem',
                        color: '#666',
                        lineHeight: 1.6,
                        marginBottom: '12px'
                      }}>
                        {guide.description}
                      </p>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '.85rem',
                        fontWeight: 600,
                        color: '#134978'
                      }}>
                        Read Guide
                        <IconChevronRight size={14} color="#134978" />
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Technical Resources Section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {technicalResourcesData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {technicalResourcesData.categories.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '28px',
                  borderTop: '4px solid #008080'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {category.title}
                  </h3>
                  {category.description && (
                    <p style={{
                      fontSize: '.9rem',
                      color: '#666',
                      marginBottom: '16px'
                    }}>
                      {category.description}
                    </p>
                  )}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {category.links.map((link, idx) => (
                      <li key={idx} style={{ marginBottom: '10px' }}>
                        <Link href={link.href} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '.9rem',
                          color: '#008080',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}>
                          <IconChevronRight size={14} color="#008080" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  {publicationsData.title}
                </h2>
                <p style={{
                  fontSize: '.95rem',
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'center',
                  marginBottom: '24px',
                  lineHeight: 1.7
                }}>
                  {publicationsData.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '500px', margin: '0 auto 24px' }}>
                  {publicationsData.features.map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '.9rem',
                      color: 'rgba(255,255,255,0.9)'
                    }}>
                      <IconCheckCircle size={16} color="#00d4d4" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Link href={publicationsData.href} style={{
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
                    Browse Publications
                    <IconChevronRight size={16} color="#ffffff" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonialsData} variant="dark" />

        {/* Video Library & Glossary Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {/* Video Library */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '28px',
                borderTop: '4px solid #00d4d4'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(0,212,212,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <IconImage size={24} color="#00d4d4" />
                </div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '12px'
                }}>
                  {videoLibraryData.title}
                </h3>
                <p style={{
                  fontSize: '.9rem',
                  color: '#666',
                  marginBottom: '14px'
                }}>
                  {videoLibraryData.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                  {videoLibraryData.videos.map((video, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '.85rem',
                      color: '#666',
                      marginBottom: '8px'
                    }}>
                      <IconCheckCircle size={14} color="#00d4d4" />
                      <span>{video}</span>
                    </li>
                  ))}
                </ul>
                <Link href={videoLibraryData.href} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  color: '#008080',
                  textDecoration: 'none'
                }}>
                  View Video Library
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>

              {/* Glossary */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '28px',
                borderTop: '4px solid #134978'
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
                  <IconLayers size={24} color="#134978" />
                </div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '12px'
                }}>
                  {glossaryData.title}
                </h3>
                <p style={{
                  fontSize: '.9rem',
                  color: '#666',
                  marginBottom: '14px'
                }}>
                  {glossaryData.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                  {glossaryData.items.map((item, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '.85rem',
                      color: '#666',
                      marginBottom: '8px'
                    }}>
                      <IconCheckCircle size={14} color="#134978" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={glossaryData.href} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  color: '#134978',
                  textDecoration: 'none'
                }}>
                  View Glossary
                  <IconChevronRight size={14} color="#134978" />
                </Link>
              </div>
            </div>
          </div>
        </section>

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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Lab Signals Newsletter CTA */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Expert Research Insights Delivered"
              description="Subscribe to Lab Signals for biweekly articles on mouse model design, gene targeting best practices, and research insights from our PhD scientists."
            />
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

        {/* Related Services Section */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Related Services
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {relatedServicesData.map((service, index) => (
                <Link key={index} href={service.href} className="animate-in" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  padding: '12px 20px',
                  fontSize: '.9rem',
                  color: '#008080',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}>
                  <IconChevronRight size={14} color="#008080" />
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
    </div>
  );
}
