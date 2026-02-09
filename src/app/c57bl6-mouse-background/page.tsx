'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconFlask, IconSettings, IconChevronRight, IconCheckCircle, IconShield } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Strain Background",
  title: "C57BL/6 Mouse Background",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 custom gene targeting projects, with the majority generated on C57BL/6 genetic backgrounds. Our experience across thousands of projects provides deep understanding of how strain background affects phenotypic outcomes, breeding performance, and experimental reproducibility.",
  description: "The C57BL/6 mouse is the most widely used inbred strain for biomedical research and the reference strain for the mouse genome sequence. C57BL/6 backgrounds are preferred for most knockout, knockin, and conditional allele projects due to extensive phenotypic characterization, broad research community adoption, and compatibility with the majority of Cre driver lines."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Substrain Data
const substrainData = {
  title: "C57BL/6 Substrain Differences",
  intro: "Understanding the differences between C57BL/6 substrains is essential for experimental design. The two major substrains, C57BL/6J and C57BL/6N, diverged decades ago and carry distinct genetic variants that affect metabolism, behavior, and other phenotypes.",
  substrains: [
    {
      title: "C57BL/6J (Jackson Substrain)",
      description: "C57BL/6J is the original Jackson Laboratory substrain and the reference for the mouse genome sequence. Key characteristics include:",
      features: [
        "Nnt mutation: Spontaneous deletion in nicotinamide nucleotide transhydrogenase affects mitochondrial redox balance and insulin secretion",
        "Metabolic phenotype: Impaired glucose stimulated insulin secretion; more susceptible to diet induced glucose intolerance",
        "Behavioral phenotype: Lower anxiety in some paradigms compared to C57BL/6N",
        "Historical prevalence: Most widely used substrain historically; extensive phenotypic literature"
      ],
      note: "The Nnt mutation in C57BL/6J should be considered when studying metabolic phenotypes, particularly those involving pancreatic beta cell function or oxidative stress."
    },
    {
      title: "C57BL/6N (NIH Substrain)",
      description: "C57BL/6N originated from the NIH colony and is the substrain used by the International Knockout Mouse Consortium (IKMC). Key characteristics include:",
      features: [
        "Intact Nnt: Functional nicotinamide nucleotide transhydrogenase; normal mitochondrial function",
        "Metabolic phenotype: More robust glucose stimulated insulin secretion compared to C57BL/6J",
        "Crb1 mutation: Retinal degeneration allele (rd8) present in some C57BL/6N colonies; causes retinal lesions",
        "IKMC compatibility: ES cells and knockout alleles from EUCOMM/KOMP are on C57BL/6N background"
      ],
      note: "C57BL/6N is often preferred for metabolic studies due to intact Nnt, but researchers should verify rd8 status when studying retinal or visual phenotypes."
    }
  ]
};

// Comparison Table Data
const comparisonData = [
  { factor: "Nnt status", c57bl6j: "Mutant (deleted)", c57bl6n: "Wildtype (intact)" },
  { factor: "Insulin secretion", c57bl6j: "Impaired", c57bl6n: "Normal" },
  { factor: "Diet induced obesity", c57bl6j: "More susceptible", c57bl6n: "Less susceptible" },
  { factor: "rd8 retinal mutation", c57bl6j: "Absent", c57bl6n: "Present in some colonies" },
  { factor: "IKMC allele compatibility", c57bl6j: "Requires backcrossing", c57bl6n: "Native background" },
  { factor: "Historical literature", c57bl6j: "More extensive", c57bl6n: "Growing rapidly" }
];

// Backcross Table Data
const backcrossData = [
  { generation: "N1", purity: "50%" },
  { generation: "N5", purity: "97%" },
  { generation: "N10", purity: "99.9%" }
];

// Why C57BL/6 Data
const whyC57BL6Data = {
  title: "Why C57BL/6 for Gene Targeting",
  sections: [
    {
      title: "Research Community Standard",
      description: "C57BL/6 is the most commonly used background for genetically engineered mouse models. This widespread adoption provides:",
      points: [
        "Extensive baseline phenotypic data for comparison",
        "Compatibility with published Cre driver lines",
        "Straightforward literature comparison across laboratories",
        "Well characterized responses to common experimental paradigms"
      ]
    },
    {
      title: "Cre Driver Compatibility",
      description: "The majority of tissue specific Cre driver lines are maintained on C57BL/6 backgrounds. Generating conditional alleles on C57BL/6 enables direct crosses to Cre drivers without introducing mixed background effects.",
      link: { href: "/tissue-specific-knockout", label: "Tissue Specific Cre Lines" }
    }
  ]
};

// Applications Data
const applicationsData = {
  title: "Applications by Research Area",
  applications: [
    {
      title: "Metabolic Research",
      intro: "Strain background significantly impacts metabolic phenotypes:",
      points: [
        "Diet induced obesity: C57BL/6J develops more pronounced obesity and glucose intolerance on high fat diet",
        "Insulin secretion studies: C57BL/6N preferred when studying beta cell function due to intact Nnt",
        "Diabetes models: Background choice affects baseline glucose homeostasis and disease susceptibility"
      ],
      note: "Document substrain in publications and consider Nnt genotype when interpreting metabolic data."
    },
    {
      title: "Neuroscience Research",
      intro: "Behavioral and neurological phenotypes vary between substrains:",
      points: [
        "Anxiety related behavior: Substrains differ in open field and elevated plus maze responses",
        "Learning and memory: Subtle differences in some cognitive paradigms",
        "Retinal studies: Verify rd8 status in C57BL/6N when studying visual system"
      ]
    },
    {
      title: "Immunology Research",
      intro: "C57BL/6 mice carry the H2b MHC haplotype and display Th1 biased immune responses:",
      points: [
        "Well characterized immune cell populations",
        "Extensive reagent availability (antibodies, tetramers)",
        "Compatible with most syngeneic tumor models"
      ]
    },
    {
      title: "Oncology Research",
      intro: "C57BL/6 is compatible with common syngeneic tumor cell lines and provides immunocompetent background for immuno oncology studies:",
      points: [
        "B16 melanoma, MC38 colon carcinoma, LLC lung carcinoma compatibility",
        "Suitable for immune checkpoint studies",
        "Well characterized tumor microenvironment responses"
      ]
    }
  ]
};

// Technical Considerations Data
const technicalData = {
  title: "Technical Considerations",
  sections: [
    {
      title: "Backcrossing Requirements",
      description: "When targeted alleles are generated on 129 strain backgrounds, backcrossing to C57BL/6 is required to achieve congenic status. Speed congenic approaches using marker assisted selection can achieve N10 equivalent purity in fewer generations.",
      link: { href: "/support-services", label: "Backcrossing Services" }
    },
    {
      title: "Breeding Performance",
      intro: "C57BL/6 mice have moderate breeding performance compared to outbred strains:",
      points: [
        "Average litter size: 5 to 7 pups",
        "Weaning age: 21 days",
        "First litter typically at 10 to 12 weeks of age",
        "Good maternal behavior"
      ],
      note: "Plan breeding timelines accounting for these parameters when estimating cohort development schedules."
    },
    {
      title: "Health and Husbandry",
      intro: "C57BL/6 mice are generally robust with good health profiles:",
      points: [
        "Compatible with SPF housing conditions",
        "Moderate lifespan (approximately 24 to 30 months)",
        "Low incidence of spontaneous tumors at typical experimental ages",
        "Susceptible to age related hearing loss (Ahl locus)"
      ]
    }
  ]
};

// Publications Data
const publicationsData = {
  title: "Selected Publications",
  intro: "Models on C57BL/6 background generated by ingenious targeting laboratory:",
  publications: [
    "Salzbank J, Lacaille H, Gaby J, O'Reilly JJ, Kissner M, Vacher CM, Penn AA. 2025. Microglia alter sex-specific cerebellar myelination following placental hormone loss. Nat Commun. 16(1): 9846",
    "Zhou W, Zhang J, Chowdhury NU, Norlander AE, Toki S, Abney M, Rusznak M, Gibson-Corley KN, Cook DP, Newcomb DC, Peebles RS Jr. 2025. PGI2 signaling metabolically reprograms CD4 Th2 cells and represses allergic airway inflammation. J Immunol 9(214): 2270-2280"
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

// FAQ Data
const faqData = [
  {
    question: "What is the difference between C57BL/6J and C57BL/6N?",
    answer: "C57BL/6J has a mutation in the Nnt (nicotinamide nucleotide transhydrogenase) gene that affects insulin secretion and diabetes susceptibility. C57BL/6N has intact Nnt and different metabolic characteristics. For metabolic studies, choose 6J if you want diabetes susceptibility or 6N if you want intact insulin secretion. For most other applications, either substrain works well."
  },
  {
    question: "Why is C57BL/6 the most commonly used strain background?",
    answer: "C57BL/6 is well-characterized genetically, has extensive baseline phenotypic data, is compatible with most Cre driver lines, and has good breeding performance. The strain is suitable for immunological, metabolic, neurological, and oncology research, making it the standard choice for most studies."
  },
  {
    question: "Do I need to backcross if I use C57BL/6 ES cells?",
    answer: "No. Using C57BL/6N ES cells eliminates backcrossing requirements and provides pure inbred background directly from germline transmission. Models generated on 129 strains require backcrossing to C57BL/6 to achieve congenic status (10 generations or 5-7 with speed congenic)."
  },
  {
    question: "What Cre driver lines are available on C57BL/6?",
    answer: "Most common Cre driver lines are available on C57BL/6, including tissue-specific drivers (Albumin-Cre, Nestin-Cre, LysM-Cre, CD4-Cre, etc.) and inducible systems (CreERT2). This extensive Cre driver availability is a major advantage of choosing C57BL/6 background."
  },
  {
    question: "Can I switch my model to a different strain background later?",
    answer: "Yes, but it requires systematic backcrossing. Traditional backcrossing requires 10 generations (approximately 2.5 years) to achieve >99.9% background purity. Speed congenic approaches using marker-assisted selection can reduce this to 5-7 generations (approximately 1-1.5 years). It's best to select the appropriate background from the start."
  }
];

// Related Links Data
const relatedLinksData = {
  strainResources: [
    { href: "/balbc-mouse-background", label: "BALB/c Mouse Background" },
    { href: "/support-services", label: "Backcrossing Services" }
  ],
  modelTypes: [
    { href: "/knockout-mouse-models", label: "Knockout Mouse Models" },
    { href: "/conditional-knockout-mouse-models", label: "Conditional Knockout Models" },
    { href: "/knockin-mouse-models", label: "Knockin Mouse Models" },
    { href: "/humanized-mouse-models", label: "Humanized Mouse Models" }
  ],
  technologies: [
    { href: "/tissue-specific-knockout", label: "Tissue Specific Cre Lines" }
  ]
};

// CTA Data
const ctaData = {
  title: "Start Your Project on C57BL/6 Background",
  description: "Our scientific consultants are ready to discuss strain background selection for your research program. Initial consultation is provided at no charge and includes substrain recommendations, Nnt and rd8 considerations, and timeline estimates for your specific project.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function C57BL6MouseBackgroundPage() {
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
            "@type": "Article",
            "name": "C57BL/6 Mouse Background",
            "description": "C57BL/6 mouse strain background for gene targeting. Compare C57BL/6J and C57BL/6N substrains. Expert guidance on strain selection since 1998.",
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
                textDecoration: 'none',
                transition: 'background 0.2s ease'
              }}>
                Request a Quote
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
              <Link href="/knockout-mouse-models" style={{
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
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'border-color 0.2s ease'
              }}>
                Explore Model Types
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

        {/* Substrain Section */}
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
              {substrainData.title}
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
              {substrainData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {substrainData.substrains.map((substrain, index) => (
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
                    {substrain.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
                    {substrain.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                    {substrain.features.map((feature, fIndex) => (
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
                  {substrain.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5, background: 'rgba(0,128,128,0.05)', padding: '12px', borderRadius: '6px' }}>
                      {substrain.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
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
              Choosing Between Substrains
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.6
            }}>
              Consider the Nnt status when studying metabolic phenotypes. Consider rd8 when studying retinal or visual phenotypes. For projects using IKMC alleles, C57BL/6N maintains pure background without backcrossing.
            </p>
            <div className="animate-in" style={{
              background: '#f7f7f7',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a253c' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Factor</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>C57BL/6J</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>C57BL/6N</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.factor}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.c57bl6j}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.c57bl6n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why C57BL/6 Section */}
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
              {whyC57BL6Data.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {whyC57BL6Data.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
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
                    <IconShield size={24} color="#008080" />
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
                    {section.description}
                  </p>
                  {section.points && (
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
                  )}
                  {section.link && (
                    <Link href={section.link.href} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#008080',
                      fontSize: '.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      marginTop: '12px'
                    }}>
                      {section.link.label}
                      <IconChevronRight size={14} color="#008080" />
                    </Link>
                  )}
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
                    {app.intro}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px 0' }}>
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
                  {app.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5 }}>
                      {app.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Considerations Section */}
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
              {technicalData.title}
            </h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {technicalData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
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
                      {section.description && (
                        <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                          {section.description}
                        </p>
                      )}
                      {section.intro && (
                        <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                          {section.intro}
                        </p>
                      )}
                      {section.points && (
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
                      )}
                      {section.note && (
                        <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5 }}>
                          {section.note}
                        </p>
                      )}
                      {section.link && (
                        <Link href={section.link.href} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#008080',
                          fontSize: '.85rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          marginTop: '8px'
                        }}>
                          {section.link.label}
                          <IconChevronRight size={14} color="#008080" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Backcross Table */}
            <div className="animate-in" style={{ marginTop: '30px' }}>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#333',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Backcrossing Generations
              </h3>
              <div style={{
                background: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#0a253c' }}>
                      <th style={{ padding: '12px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Generation</th>
                      <th style={{ padding: '12px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Approximate Background Purity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backcrossData.map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '12px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.generation}</td>
                        <td style={{ padding: '12px 20px', fontSize: '.9rem', color: '#666' }}>{row.purity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

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

        {/* Lab Signals Signup */}
        <LabSignalsSignup 
          title="Track Your C57BL/6 Model Progress"
          description="Stay informed with real-time updates on your strain background selection, substrain considerations, and backcrossing milestones throughout your project."
        />

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
                  Strain Background Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.strainResources.map((link, index) => (
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
                  Related Technologies
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
