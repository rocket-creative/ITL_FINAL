'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconTarget, IconSettings, IconChevronRight, IconShield } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Humanized Gene Models",
  title: "Gene Replacement Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has generated gene replacement humanized models that substitute mouse genes with their human orthologs. This approach enables preclinical testing of human specific therapeutics and study of human disease mechanisms in physiologically relevant contexts.",
  description: "Gene replacement humanization maintains expression under endogenous regulatory control, preserving tissue specific and temporal expression patterns while providing human target sequences for drug development and mechanistic research."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// What Is Section Data
const whatIsData = {
  title: "What Is Gene Replacement Humanization",
  intro: "Gene replacement humanization substitutes a mouse gene with its human ortholog. Unlike simple cDNA insertion, comprehensive gene replacement can include the entire coding sequence, regulatory elements, and alternative splice variants to faithfully recapitulate human gene expression and function.",
  approaches: [
    {
      title: "Complete vs Partial Replacement",
      items: [
        {
          subtitle: "Complete Replacement",
          description: "Complete gene replacement substitutes the entire mouse gene including promoter, coding exons, introns, and regulatory elements with the corresponding human sequences. This approach is optimal when preserving human specific regulation is essential."
        },
        {
          subtitle: "Partial Replacement",
          description: "Partial replacement substitutes only the coding sequence while retaining mouse regulatory elements. This approach is often sufficient when the primary goal is expressing human protein for therapeutic target validation."
        }
      ]
    },
    {
      title: "cDNA vs Genomic Replacement",
      items: [
        {
          subtitle: "cDNA Replacement",
          description: "cDNA replacement inserts the human coding sequence without introns. This approach generates a single protein isoform and is appropriate when alternative splicing is not critical to your research question."
        },
        {
          subtitle: "Genomic Replacement",
          description: "Genomic replacement preserves intron-exon structure, enabling expression of alternatively spliced isoforms and maintaining potential intronic regulatory elements. This approach more faithfully recapitulates human gene function."
        }
      ]
    }
  ]
};

// Applications Data
const applicationsData = {
  title: "Applications of Gene Replacement Models",
  applications: [
    {
      title: "Therapeutic Antibody Development",
      description: "Many therapeutic antibodies show species specificity, binding human but not mouse orthologs. Gene replacement humanization of the target creates mice suitable for preclinical efficacy testing of human specific antibodies.",
      note: "Common applications include humanization of surface receptors, secreted proteins, and checkpoint molecules for antibody drug development programs."
    },
    {
      title: "Small Molecule Target Validation",
      description: "When small molecules show differential activity against human versus mouse targets, gene replacement models enable testing in a physiological context with the human target.",
      note: "This is particularly relevant for targets where the binding site differs between species or where metabolic pathways affect drug activity differently in humans and mice."
    },
    {
      title: "Disease Mechanism Studies",
      description: "Human disease causing mutations can be studied in the context of the complete human gene. This is especially valuable for diseases where mouse orthologs do not fully recapitulate human disease pathology."
    },
    {
      title: "Gene Therapy Development",
      description: "Gene therapy vectors designed for human sequences require humanized models for preclinical testing. Gene replacement creates the appropriate target for testing vector delivery, expression, and therapeutic effect."
    }
  ]
};

// Targeting Strategy Data
const targetingData = {
  title: "Gene Replacement Targeting Strategy",
  sections: [
    {
      title: "Allele Design Considerations",
      description: "Gene replacement allele design must account for sequence differences between mouse and human genes, including gene length, exon number, regulatory element locations, and protein domains.",
      note: "ingenious targeting laboratory's scientific team evaluates each project to determine replacement boundaries and targeting strategy based on your specific research goals."
    },
    {
      title: "Large Fragment Targeting",
      description: "When the human gene is larger than can be accommodated in standard targeting vectors, ingenious targeting laboratory uses bacterial artificial chromosome (BAC) based approaches or sequential targeting strategies to achieve complete replacement."
    }
  ]
};

// Common Applications Data
const commonApplicationsData = {
  title: "Common Gene Replacement Applications",
  applications: [
    {
      title: "Immune Checkpoint Humanization",
      description: "PD1, PDL1, CTLA4, LAG3, TIM3, and other checkpoint molecules are frequently humanized to enable testing of checkpoint inhibitor antibodies in immunocompetent mice.",
      href: "/humanized-immune-checkpoint-mice"
    },
    {
      title: "Receptor Humanization",
      description: "G-protein coupled receptors, cytokine receptors, growth factor receptors, and other therapeutic target receptors are humanized to enable drug development in relevant preclinical models."
    },
    {
      title: "Enzyme Humanization",
      description: "Metabolic enzymes, particularly those relevant to drug metabolism or inherited metabolic disease, are humanized to improve translation from preclinical to clinical findings."
    }
  ]
};

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { FEATURED_TESTIMONIALS, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonialsData = FEATURED_TESTIMONIALS.map(t => ({
  quote: t.quote,
  author: formatAuthorWithCredentials(t),
  affiliation: t.affiliation,
}));

// Publications Data
const publicationsData = {
  title: "Selected Publications",
  intro: "Humanized models from ingenious targeting laboratory.",
  publications: [
    "Jiang Y, Sachdeva K, Goulbourne CN, Berg MJ, Peddy J, Stavrides PH, Pensalfini A, Pawlik M, Malampati S, Whyte L, Basavarajappa BS, Shivakumar S, Bleiwas C, Smiley JF, Mathews PM, Nixon RA. 2025. Increased neuronal expression of the early endosomal adaptor APPL1 leads to endosomal and synaptic dysfunction with cholinergic neurodegeneration. J Neurosci 29(45): e2331242025.",
    "Nargis T, Muralidharan C, Enriquez JR, Wang JE, Kaylan K, Chakraborty A, Pratuangtham S, Figatner K, Nelson JB, May SC, Nadler JL, Boxer MB, Maloney, DJ, Tersey SA, Mirmira RG. 2024. 12-Lipoxygenase inhibition delays onset of autoimmune diabetes in human gene replacement mice. JCI Insight24(9): e185299",
    "Serrano J, Boyd J, Brown IS, Mason C, Smith KR, Karolyi K, Maurya SK, Meshram NN, Serna V, Link GM, Gardell SJ, Kyriazis GA. 2024. The TAS1R2 G-protein-coupled receptor is an ambient glucose sensor in skeletal muscle that regulates NAD homeostasis and mitochondrial capacity. Nat Commun 15(1): 4915."
  ]
};

// FAQ Data
const faqData = [
  {
    question: "When is gene replacement used instead of simple overexpression?",
    answer: "Gene replacement is used when you need to study human gene function in mouse context (for therapeutic testing), when you need endogenous regulation and expression patterns, or when overexpression would cause artifacts. Replacement maintains native gene regulation, expression levels, and chromosomal context, unlike random transgene integration."
  },
  {
    question: "Can gene replacement be combined with other modifications?",
    answer: "Yes. Gene replacement can be combined with conditional approaches, point mutations, or other genetic modifications. For example, humanized checkpoint models can be combined with conditional knockout of other genes, or humanized receptors can be combined with reporter knockins for expression tracking."
  }
];

// Related Links Data
const relatedLinksData = {
  modelTypes: [
    { href: "/humanized-mouse-models", label: "Humanized Mouse Models" },
    { href: "/humanized-immune-checkpoint-mice", label: "Humanized Immune Checkpoint Mice" },
    { href: "/pd1-humanized-mice", label: "PD1 Humanized Mice" },
    { href: "/pdl1-humanized-mice", label: "PDL1 Humanized Mice" },
    { href: "/cdna-knockin", label: "cDNA Knockin" }
  ],
  resources: [
    { href: "/target-validation-mouse-models", label: "Target Validation Mouse Models" },
    { href: "/antibody-therapeutics-mouse-models", label: "Antibody Therapeutics Mouse Models" }
  ]
};

// CTA Data
const ctaData = {
  title: "Start Your Project",
  description: "Gene replacement projects require careful strategy design. Our scientific team provides complimentary consultation to evaluate your humanization goals and discuss the optimal targeting approach.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function GeneReplacementPage() {
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
            "@type": "Service",
            "name": "Gene Replacement Mouse Models",
            "description": "Gene replacement humanization substitutes mouse genes with human orthologs for preclinical testing of human specific therapeutics. Custom models since 1998.",
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
              <IconDNA size={14} color="#00d4d4" />
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
              <Link href="/humanized-mouse-models" style={{
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
                All Humanized Models
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

        {/* What Is Gene Replacement Section */}
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
              {whatIsData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {whatIsData.intro}
            </p>
            <div style={{ display: 'grid', gap: '30px' }}>
              {whatIsData.approaches.map((approach, index) => (
                <div key={index} className="animate-in">
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '16px'
                  }}>
                    {approach.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {approach.items.map((item, itemIndex) => (
                      <div key={itemIndex} style={{
                        background: '#ffffff',
                        borderRadius: '8px',
                        padding: '20px',
                        borderLeft: '4px solid #008080'
                      }}>
                        <h4 style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#333',
                          marginBottom: '10px'
                        }}>
                          {item.subtitle}
                        </h4>
                        <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
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
                    {app.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: app.note ? '12px' : 0, lineHeight: 1.6 }}>
                    {app.description}
                  </p>
                  {app.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                      {app.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Targeting Strategy Section */}
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
              {targetingData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {targetingData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #00d4d4'
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
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: section.note ? '12px' : 0, lineHeight: 1.6 }}>
                    {section.description}
                  </p>
                  {section.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                      {section.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Applications Section */}
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
              {commonApplicationsData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {commonApplicationsData.applications.map((app, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
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
                    <IconShield size={24} color="#008080" />
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
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: app.href ? '16px' : 0, lineHeight: 1.6 }}>
                    {app.description}
                  </p>
                  {app.href && (
                    <Link href={app.href} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#008080',
                      fontSize: '.85rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}>
                      Learn More
                      <IconChevronRight size={14} color="#008080" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonialsData} variant="dark" />

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
              marginBottom: '30px'
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

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Gene Replacement Technology Insights"
              description="Learn about humanization strategies, gene replacement design principles, and therapeutic development applications. Expert insights from PhD scientists delivered biweekly."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  Related Model Types
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
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
    </div>
  );
}
