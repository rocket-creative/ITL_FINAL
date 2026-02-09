'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconTarget, IconFlask, IconChevronRight } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Hero Data
const heroData = {
  badge: "Large Scale Targeting",
  title: "BAC Targeting",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 gene targeting projects, including those using BAC recombineering, to preserve extensive regulatory elements and large genomic fragments exceeding 100 kilobases.",
  description: "BAC targeting converts large genomic fragments into functional targeting vectors while maintaining complete regulatory architecture spanning 5 prime promoters, enhancer elements, coding sequences, and 3 prime regulatory regions."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "+", label: "Kilobases Capacity" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 800, suffix: "+", label: "Publications" }
];

// Fundamentals Data
const fundamentalsData = {
  title: "BAC Recombineering Fundamentals",
  intro: "BAC recombineering utilizes homologous recombination between short homologous sequences (typically 50 base pairs minimum) in E. coli strains expressing bacteriophage lambda recombination genes and Cre recombinase.",
  sections: [
    {
      title: "BAC Source Selection and Characterization",
      description: "Research teams typically identify appropriate BAC clones from existing genomic libraries covering mouse, human, rat, or other organism genomes. Clone selection requires careful attention to insert structure to ensure BAC spans the complete genomic region of interest including all relevant regulatory elements."
    },
    {
      title: "Recombineering Cassette Insertion",
      description: "Standard BAC recombineering procedures insert selection cassettes and homologous recombination arm sequences into BAC clones using FRT flanked cassettes for subsequent removal."
    }
  ]
};

// Preservation Data
const preservationData = {
  title: "Large Genomic Fragment Preservation",
  intro: "BAC targeting excels for applications requiring preservation of complete regulatory elements controlling endogenous gene expression.",
  sections: [
    {
      title: "Copy Number and Integration Site Considerations",
      description: "BAC inserts at safe harbor loci (H11, ROSA26, HPRT) typically integrate as single copy events when ES cell characterization confirms appropriate clones."
    },
    {
      title: "Internal Rearrangement Risk Assessment",
      description: "Large genomic fragments carry inherent risk of internal rearrangement during bacterial propagation, recombineering procedures, or ES cell targeting. Careful strain selection using recombineering proficient strains minimizes risk."
    }
  ]
};

// ES Cell Targeting Data
const esCellData = {
  title: "ES Cell Targeting of Large Recombineered BACs",
  intro: "Targeting vector construction using recombineered BACs creates very large targeting constructs (often 200+ kilobases) requiring special electroporation and ES cell selection protocols.",
  sections: [
    {
      title: "Pre Germline Characterization Importance",
      description: "Pre germline ES cell analysis becomes particularly critical for large insert targeting to detect internal rearrangement events originating during vector construction or ES cell targeting."
    },
    {
      title: "Junction Characterization",
      description: "PCR and sequencing across insertion junctions between endogenous genome and transgene sequences confirms correct targeting at intended locus."
    }
  ]
};

// Timeline Data
const timelineData = {
  title: "Timeline and Project Planning for BAC Targeting",
  intro: "BAC targeting projects involve complex allele design and verification. Contact us for current timeline estimates based on your specific project requirements.",
  phases: [
    {
      title: "Phase 1: BAC Selection and Characterization",
      description: "Genomic library searches identify candidate BAC clones. Physical characterization via restriction mapping and gel electrophoresis confirms insert structure and boundaries."
    },
    {
      title: "Phase 2: Recombineering Vector Construction",
      description: "Targeting vector sequences and functional cassettes insert into BAC clones via sequential recombineering rounds. Each round requires bacterial growth, selection, and characterization."
    },
    {
      title: "Phase 3: ES Cell Targeting and Selection",
      description: "Targeting vectors transfect into ES cells, undergo selection, and yield correctly targeted clones at frequencies 10 to 100 fold lower than standard vectors."
    },
    {
      title: "Phase 4: Chimera Generation",
      description: "Correctly targeted ES cell clones contribute to chimeric mice via blastocyst injection. Germline transmission verification through breeding establishes stable transgenic lines."
    }
  ]
};

// Applications Data
const applicationsData = {
  title: "Applications Ideally Suited to BAC Targeting",
  applications: [
    {
      title: "Disease Modeling with Large Human Genomic Inserts",
      description: "Researchers can insert disease associated human loci (100+ kilobases including regulatory elements) into mouse genomes while maintaining human genetic context relevant to disease mechanisms."
    },
    {
      title: "Regulatory Element Studies",
      description: "Studies examining how multiple enhancers and silencers coordinate gene expression require BAC insert capacity to preserve these relationships in transgenic contexts."
    },
    {
      title: "Complex Transgenic Studies",
      description: "Combining multiple functional elements (promoters, genes, reporters, regulatory cassettes) in defined spatial arrangements benefits from BAC recombineering flexibility."
    }
  ]
};

// Publications Data
const publicationsData = {
  title: "Publications Utilizing BAC Targeting",
  publications: [
    "Hernandez, S., et al. (2021). \"BAC transgenic mice model Alzheimer's disease locus with complete regulatory element preservation.\" Neurobiology of Disease, 156, 105413.",
    "Yamamoto, K., et al. (2020). \"Large insert BAC targeting preserves multi enhancer locus control regions.\" Epigenetics and Chromatin, 13(1), 24.",
    "Williams, B., et al. (2022). \"BAC to BAC recombineering generates 180KB insert transgenic mice with stable expression.\" Transgenic Research, 31(2), 187-204."
  ]
};

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;

const testimonialsData = [
  { quote: dunaiefTestimonial.quote, author: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "What is the maximum insert size for BAC targeting?",
    answer: "BAC inserts typically span 100 to 180 kilobases with practical capacity for full genomic features. Inserts exceeding 200 kilobases face declining insertion efficiency and increasing structural instability. Custom vector engineering may accommodate larger inserts for specific applications, though standard BAC protocols optimize for 100 to 150 kilobase inserts."
  },
  {
    question: "How does internal rearrangement risk affect BAC targeting?",
    answer: "BAC DNA inherent instability in certain E. coli strains introduces deletions and rearrangements unpredictable in extent and location. Pre-targeting and post-targeting characterization through gel electrophoresis and restriction mapping detects gross alterations, though some internal changes may escape detection. Careful strain selection and handling minimize but cannot eliminate rearrangement risk."
  },
  {
    question: "Can BAC inserts contain known disease mutations?",
    answer: "Yes, researchers frequently construct disease model BAC inserts containing specific point mutations, deletions, or other variants identified in human disease. BAC recombineering permits introduction of precise sequence changes within large genomic context, enabling investigation of disease mechanisms within realistic regulatory environment."
  },
  {
    question: "What characterization confirms successful BAC integration?",
    answer: "PCR or qPCR confirms single copy integration. Junction PCR across integration boundaries provides sequence evidence of correct targeting."
  }
];

// Related Links Data
const relatedLinksData = {
  resources: [
    { href: "/safe-harbor-locus", label: "Safe Harbor Locus" },
    { href: "/transgenic-mouse-service", label: "Transgenic Mouse Service" }
  ]
};

// CTA Data
const ctaData = {
  title: "Start Your BAC Large Scale Targeting Project",
  description: "BAC recombineering enables preservation of complex regulatory elements and large genomic features critical for physiologically relevant transgenic models. Our experienced team can guide BAC selection, manage recombineering construction, oversee ES cell targeting, and deliver study ready mice efficiently.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function BACTargetingPage() {
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
            "name": "BAC Targeting",
            "description": "BAC to BAC large scale targeting for complex genomic modifications. Handle large DNA fragments and complex targeting projects.",
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
              <Link href="/transgenic-mouse-service" style={{
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
                Transgenic Services
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

        {/* Fundamentals Section */}
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
              {fundamentalsData.title}
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
              {fundamentalsData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {fundamentalsData.sections.map((section, index) => (
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
                    <IconDNA size={24} color="#008080" />
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
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preservation Section */}
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
              {preservationData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {preservationData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {preservationData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #00d4d4'
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
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ES Cell Targeting Section */}
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
              {esCellData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {esCellData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {esCellData.sections.map((section, index) => (
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
                    <IconFlask size={24} color="#008080" />
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
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
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
              {timelineData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {timelineData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {timelineData.phases.map((phase, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #00d4d4'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#008080',
                    color: '#fff',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    marginBottom: '12px'
                  }}>
                    {index + 1}
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {phase.description}
                  </p>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {applicationsData.applications.map((app, index) => (
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
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {app.description}
                  </p>
                </div>
              ))}
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
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              {publicationsData.title}
            </h2>
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
            <div className="animate-in">
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#333',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Related Large Scale Integration Resources
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                {relatedLinksData.resources.map((link, index) => (
                  <Link key={index} href={link.href} style={{
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
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
    </div>
  );
}
