'use client';

/**
 * Mouse Strain Backgrounds Page - Comprehensive Guide
 * Rich content covering C57BL/6, BALB/c, and strain selection strategies
 * Built following RULES_2026 guidelines
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  UXUIDCAnimatedFAQ,
  UXUIDCAnimatedCounter,
  BreadcrumbSchema,
  UXUIDCStartProjectCTA,
  GlossaryTermLink,
  BreedingSchemeArchitectCTA,
  LabSignalsSignup,
  IconDNA,
  IconCheckCircle,
  IconChevronRight,
  IconTarget,
  IconAward,
} from '@/components/UXUIDC';

const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  blue: '#2384da',
  lightGray: '#f7f7f7',
  white: '#ffffff',
  text: '#333333',
};

// Hero Data
const heroData = {
  badge: "Strain Selection",
  title: "Mouse Strain Backgrounds",
  intro: "Since 1998, ingenious targeting laboratory has generated custom mouse models on multiple genetic backgrounds, with strain selection guided by experimental requirements and phenotype considerations.",
  description: "Understanding the characteristics of different inbred strains is essential for choosing the optimal background for your research. Genetic background profoundly influences phenotype penetrance, disease susceptibility, and therapeutic response."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// FAQ Data
const faqData = [
  {
    question: "What are the key differences between common mouse strain backgrounds?",
    answer: (
      <>
        <GlossaryTermLink term="c57bl6-mouse-background">C57BL/6</GlossaryTermLink> is standard for most research, shows Th1 immune bias, susceptible to diet induced obesity, and widely used for behavioral assays. BALB/c shows Th2 immune bias, more susceptible to some infections, relatively resistant to diet induced obesity. 129 strains are commonly used for ES cell derivation. FVB/N is good for transgenic generation due to large pronuclei.
      </>
    )
  },
  {
    question: "How do strain backgrounds affect model phenotypes?",
    answer: "Genetic background profoundly influences phenotypes. The same genetic modification can show different severity, penetrance, or even opposite effects on different backgrounds. Modifier genes on different backgrounds can mask or enhance phenotypes. Consistent background use within studies is critical for reproducibility and interpretation."
  },
  {
    question: "When should I use C57BL/6 vs BALB/c?",
    answer: "Use C57BL/6 for standard research applications, metabolic studies, behavioral assays, or when using C57BL/6N ES cells for targeting. Use BALB/c for Th2 biased immune responses, infectious disease models where BALB/c susceptibility is advantageous, or when matching existing BALB/c based research protocols."
  },
  {
    question: "Can I backcross my model to a different background?",
    answer: "Yes. We provide backcrossing services to transfer models to different backgrounds. Traditional backcrossing requires 10 generations (approximately 2.5 years) to achieve >99.9% background purity. Speed congenic approaches using marker assisted selection can reduce this to 5 to 7 generations (approximately 1 to 1.5 years)."
  },
  {
    question: "What is the difference between C57BL/6J and C57BL/6N substrains?",
    answer: "C57BL/6J carries a mutation in the Nnt gene affecting glucose metabolism and insulin secretion. C57BL/6N has intact Nnt and different metabolic characteristics. C57BL/6N ES cells (JM8 lines) are standard for gene targeting. Substrains also differ in some behavioral phenotypes and seizure susceptibility. Consistency within a study is critical."
  },
  {
    question: "Why is C57BL/6 the most commonly used strain background?",
    answer: "C57BL/6 is well characterized genetically, has extensive baseline phenotypic data, is compatible with most Cre driver lines, and has good breeding performance. The strain is suitable for immunological, metabolic, neurological, and oncology research, making it the standard choice for most studies."
  },
];

export default function MouseStrainBackgroundsPage() {
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
    <div>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '100px 20px 80px',
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
          
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div className="hero-animate" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '20px'
            }}>
              <IconDNA size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            
            <h1 className="hero-animate" style={{
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '3.5rem',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '25px',
              letterSpacing: '-1px',
            }}>
              {heroData.title}
            </h1>
            
            <p className="hero-animate" style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '1.2rem',
              lineHeight: '1.8',
              marginBottom: '20px',
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            
            <p className="hero-animate" style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1rem',
              lineHeight: '1.7',
              marginBottom: '35px',
              maxWidth: '800px'
            }}>
              {heroData.description}
            </p>
            
            <div className="hero-animate flex flex-wrap gap-4">
              <Link 
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: BRAND.navy,
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Request a Quote
                <IconChevronRight size={16} color={BRAND.navy} />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:bg-white hover:text-navy"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '14px 28px',
                  border: '2px solid white',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Talk to a Scientist
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ backgroundColor: BRAND.white, padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div style={{ color: BRAND.teal, fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', fontWeight: 700 }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: '#666', fontSize: '.9rem', marginTop: '8px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* C57BL/6 Overview */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{ marginBottom: '50px' }}>
              <h2 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}>
                C57BL/6: The Research Standard
              </h2>
              <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '15px' }}>
                The C57BL/6 mouse is the most widely used inbred strain for biomedical research and the reference strain for the mouse genome sequence. C57BL/6 backgrounds are preferred for most <GlossaryTermLink term="knockout-mouse-models">knockout</GlossaryTermLink>, <GlossaryTermLink term="knockin-mouse-models">knockin</GlossaryTermLink>, and <GlossaryTermLink term="conditional-knockout-mouse-models">conditional allele</GlossaryTermLink> projects due to extensive phenotypic characterization, broad research community adoption, and compatibility with the majority of Cre driver lines.
              </p>
              <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Understanding the differences between C57BL/6 substrains is essential for experimental design. The two major substrains, C57BL/6J and C57BL/6N, diverged decades ago and carry distinct genetic variants that affect metabolism, behavior, and other phenotypes.
              </p>
            </div>

            {/* Why C57BL/6 */}
            <div className="animate-in" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px',
              marginBottom: '50px',
            }}>
              {[
                {
                  icon: IconTarget,
                  title: 'Research Community Standard',
                  description: 'Most commonly used background for genetically engineered mouse models, providing extensive baseline phenotypic data for comparison and compatibility with published Cre driver lines.',
                },
                {
                  icon: IconDNA,
                  title: 'Cre Driver Compatibility',
                  description: 'The majority of tissue specific Cre driver lines are maintained on C57BL/6 backgrounds, enabling direct crosses without introducing mixed background effects.',
                },
                {
                  icon: IconAward,
                  title: 'Genome Reference',
                  description: 'C57BL/6 is the reference strain for the mouse genome sequence, ensuring accurate targeting design and comprehensive genetic characterization.',
                },
                {
                  icon: IconCheckCircle,
                  title: 'Breeding Performance',
                  description: 'Good maternal behavior, moderate litter sizes (5 to 7 pups), and compatibility with standard breeding protocols make C57BL/6 reliable for colony establishment.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: BRAND.white,
                    padding: '30px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div style={{ marginBottom: '15px' }}>
                    <item.icon size={36} color={BRAND.teal} />
                  </div>
                  <h3 style={{
                    color: BRAND.navy,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.6' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* C57BL/6J vs C57BL/6N Comparison */}
        <section style={{ backgroundColor: BRAND.white, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="animate-in" style={{ marginBottom: '40px', textAlign: 'center' }}>
              <h2 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}>
                C57BL/6 Substrain Comparison
              </h2>
              <p style={{ color: '#666', fontSize: '1.05rem', maxWidth: '800px', margin: '0 auto' }}>
                The two major substrains carry distinct genetic variants that affect metabolism, behavior, and other phenotypes. Selecting the appropriate substrain ensures your model aligns with published literature.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="animate-in" style={{ overflowX: 'auto', marginBottom: '40px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: BRAND.white, border: '1px solid #e0e0e0' }}>
                <thead>
                  <tr style={{ backgroundColor: BRAND.navy }}>
                    <th style={{ padding: '20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>
                      Characteristic
                    </th>
                    <th style={{ padding: '20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>
                      C57BL/6J (Jackson)
                    </th>
                    <th style={{ padding: '20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>
                      C57BL/6N (NIH)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Nnt Status', j: 'Mutant (deleted)', n: 'Wildtype (intact)' },
                    { feature: 'Insulin Secretion', j: 'Impaired', n: 'Normal' },
                    { feature: 'Diet Induced Obesity', j: 'More susceptible', n: 'Less susceptible' },
                    { feature: 'rd8 Retinal Mutation', j: 'Absent', n: 'Present in some colonies' },
                    { feature: 'IKMC Allele Compatibility', j: 'Requires backcrossing', n: 'Native background' },
                    { feature: 'Historical Literature', j: 'More extensive', n: 'Growing rapidly' },
                    { feature: 'Best For', j: 'Behavioral, oncology studies', n: 'Metabolic studies, ES cell targeting' },
                  ].map((row, index) => (
                    <tr key={index} style={{ 
                      borderBottom: '1px solid #e0e0e0',
                      backgroundColor: index % 2 === 0 ? BRAND.lightGray : BRAND.white 
                    }}>
                      <td style={{ padding: '18px 20px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: BRAND.navy, fontSize: '.95rem' }}>
                        {row.feature}
                      </td>
                      <td style={{ padding: '18px 20px', color: '#666', fontSize: '.95rem', lineHeight: '1.6' }}>
                        {row.j}
                      </td>
                      <td style={{ padding: '18px 20px', color: '#666', fontSize: '.95rem', lineHeight: '1.6' }}>
                        {row.n}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Key Considerations */}
            <div className="animate-in" style={{
              backgroundColor: BRAND.lightGray,
              padding: '30px',
              borderRadius: '8px',
              borderLeft: `4px solid ${BRAND.teal}`,
            }}>
              <h3 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '15px',
              }}>
                Choosing Between Substrains
              </h3>
              <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li><strong>Consider Nnt status</strong> when studying metabolic phenotypes, insulin secretion, or diabetes models</li>
                <li><strong>Consider rd8</strong> when studying retinal or visual phenotypes (verify colony status)</li>
                <li><strong>For IKMC alleles,</strong> C57BL/6N maintains pure background without backcrossing</li>
                <li><strong>For literature comparison,</strong> use the substrain matching your reference publications</li>
              </ul>
              <div style={{ marginTop: '20px' }}>
                <Link 
                  href="/c57bl6j-vs-c57bl6n"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: BRAND.teal,
                    fontWeight: 600,
                    fontSize: '.95rem',
                    textDecoration: 'none',
                  }}
                >
                  Read Full C57BL/6J vs C57BL/6N Comparison
                  <IconChevronRight size={16} color={BRAND.teal} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Applications by Research Area */}
        <section style={{ backgroundColor: BRAND.white, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              color: BRAND.navy,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.2rem',
              fontWeight: 700,
              marginBottom: '50px',
              textAlign: 'center',
            }}>
              Applications by Research Area
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
              {/* Metabolic Research */}
              <div className="animate-in" style={{
                backgroundColor: BRAND.lightGray,
                padding: '35px',
                borderRadius: '8px',
              }}>
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '15px',
                }}>
                  Metabolic Research
                </h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '15px' }}>
                  Strain background significantly impacts metabolic phenotypes:
                </p>
                <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li><strong>Diet induced obesity:</strong> C57BL/6J develops more pronounced obesity and glucose intolerance on high fat diet</li>
                  <li><strong>Insulin secretion studies:</strong> C57BL/6N preferred when studying beta cell function due to intact Nnt</li>
                  <li><strong>Diabetes models:</strong> Background choice affects baseline glucose homeostasis and disease susceptibility</li>
                </ul>
                <p style={{ color: '#666', fontSize: '.9rem', marginTop: '15px', fontStyle: 'italic' }}>
                  Document substrain in publications and consider Nnt genotype when interpreting metabolic data.
                </p>
                <Link 
                  href="/metabolic-disease-mouse-models"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '15px',
                    color: BRAND.teal,
                    fontWeight: 600,
                    fontSize: '.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Metabolic Disease Mouse Models
                  <IconChevronRight size={14} color={BRAND.teal} />
                </Link>
              </div>

              {/* Neuroscience Research */}
              <div className="animate-in" style={{
                backgroundColor: BRAND.lightGray,
                padding: '35px',
                borderRadius: '8px',
              }}>
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '15px',
                }}>
                  Neuroscience Research
                </h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '15px' }}>
                  Behavioral and neurological phenotypes vary between substrains:
                </p>
                <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li><strong>Anxiety related behavior:</strong> Substrains differ in open field and elevated plus maze responses</li>
                  <li><strong>Learning and memory:</strong> Subtle differences in some cognitive paradigms</li>
                  <li><strong>Retinal studies:</strong> Verify rd8 status in C57BL/6N when studying visual system</li>
                </ul>
                <Link 
                  href="/neuroscience-mouse-models"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '15px',
                    color: BRAND.teal,
                    fontWeight: 600,
                    fontSize: '.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Neuroscience Mouse Models
                  <IconChevronRight size={14} color={BRAND.teal} />
                </Link>
              </div>

              {/* Immunology Research */}
              <div className="animate-in" style={{
                backgroundColor: BRAND.lightGray,
                padding: '35px',
                borderRadius: '8px',
              }}>
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '15px',
                }}>
                  Immunology Research
                </h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '15px' }}>
                  C57BL/6 mice carry the H2b MHC haplotype and display Th1 biased immune responses:
                </p>
                <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li>Well characterized immune cell populations</li>
                  <li>Extensive reagent availability (antibodies, tetramers)</li>
                  <li>Compatible with most syngeneic tumor models</li>
                </ul>
                <Link 
                  href="/immunology-mouse-models"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '15px',
                    color: BRAND.teal,
                    fontWeight: 600,
                    fontSize: '.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Immunology Mouse Models
                  <IconChevronRight size={14} color={BRAND.teal} />
                </Link>
              </div>

              {/* Oncology Research */}
              <div className="animate-in" style={{
                backgroundColor: BRAND.lightGray,
                padding: '35px',
                borderRadius: '8px',
              }}>
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '15px',
                }}>
                  Oncology Research
                </h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '15px' }}>
                  C57BL/6 is compatible with common syngeneic tumor cell lines and provides immunocompetent background for immuno oncology studies:
                </p>
                <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                  <li>B16 melanoma, MC38 colon carcinoma, LLC lung carcinoma compatibility</li>
                  <li>Suitable for immune checkpoint studies</li>
                  <li>Well characterized tumor microenvironment responses</li>
                </ul>
                <Link 
                  href="/oncology-mouse-models"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '15px',
                    color: BRAND.teal,
                    fontWeight: 600,
                    fontSize: '.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Oncology Mouse Models
                  <IconChevronRight size={14} color={BRAND.teal} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BALB/c Section */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in">
              <h2 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                marginBottom: '25px',
              }}>
                BALB/c Mouse Background
              </h2>
              <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px' }}>
                BALB/c mice are particularly valuable for immunological studies, syngeneic tumor models, and research where the strain's unique characteristics provide experimental advantages. The albino (c) designation reflects the tyrosinase mutation that eliminates pigmentation.
              </p>
            </div>

            <div className="animate-in" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginTop: '40px',
            }}>
              <div style={{
                backgroundColor: BRAND.white,
                padding: '30px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}>
                <h3 style={{
                  color: BRAND.teal,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '15px',
                }}>
                  Immunological Characteristics
                </h3>
                <ul style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7', paddingLeft: '20px' }}>
                  <li><strong>Th2 biased immune response</strong> (IL4, IL5, IL13 production)</li>
                  <li>Excellent for allergic disease and asthma models</li>
                  <li>Strong antibody production (monoclonal antibody source)</li>
                  <li>Functional complement system</li>
                </ul>
              </div>

              <div style={{
                backgroundColor: BRAND.white,
                padding: '30px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}>
                <h3 style={{
                  color: BRAND.teal,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '15px',
                }}>
                  Research Applications
                </h3>
                <ul style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7', paddingLeft: '20px' }}>
                  <li><strong>Syngeneic tumor models:</strong> CT26, 4T1, RENCA, A20 compatibility</li>
                  <li><strong>Allergy and asthma:</strong> Ideal for allergic airway disease</li>
                  <li><strong>Infectious disease:</strong> Well characterized pathogen responses</li>
                  <li><strong>Autoimmune disease:</strong> Lupus, arthritis models</li>
                </ul>
              </div>

              <div style={{
                backgroundColor: BRAND.white,
                padding: '30px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}>
                <h3 style={{
                  color: BRAND.teal,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '15px',
                }}>
                  Physical Characteristics
                </h3>
                <ul style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7', paddingLeft: '20px' }}>
                  <li>Albino with pink eyes and white fur</li>
                  <li>Docile temperament, easy to handle</li>
                  <li>Litter sizes: 5 to 8 pups</li>
                  <li>Relatively low body fat compared to C57BL/6</li>
                </ul>
              </div>
            </div>

            <div className="animate-in" style={{ marginTop: '30px' }}>
              <Link 
                href="/balbc-mouse-background"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: BRAND.teal,
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  border: `2px solid ${BRAND.teal}`,
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                }}
              >
                Learn More About BALB/c Background
                <IconChevronRight size={16} color={BRAND.teal} />
              </Link>
            </div>
          </div>
        </section>

        {/* C57BL/6 vs BALB/c Quick Comparison */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              color: BRAND.navy,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.2rem',
              fontWeight: 700,
              marginBottom: '40px',
              textAlign: 'center',
            }}>
              C57BL/6 vs BALB/c: Key Differences
            </h2>

            <div className="animate-in" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
            }}
            className="md:grid-cols-2 grid-cols-1"
            >
              <div style={{
                backgroundColor: BRAND.white,
                padding: '35px',
                borderRadius: '8px',
                border: `2px solid ${BRAND.blue}`,
              }}>
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}>
                  C57BL/6
                </h3>
                <ul style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7', paddingLeft: '20px' }}>
                  <li><strong>Immune bias:</strong> Th1 (IFN-γ, TNF-α)</li>
                  <li><strong>Metabolic:</strong> Susceptible to diet induced obesity</li>
                  <li><strong>Behavior:</strong> Lower anxiety in standard tests</li>
                  <li><strong>Tumor models:</strong> B16, MC38, LLC</li>
                  <li><strong>Cre drivers:</strong> Extensive library available</li>
                  <li><strong>Use for:</strong> Standard research, metabolic studies, behavior</li>
                </ul>
              </div>

              <div style={{
                backgroundColor: BRAND.white,
                padding: '35px',
                borderRadius: '8px',
                border: `2px solid ${BRAND.teal}`,
              }}>
                <h3 style={{
                  color: BRAND.teal,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}>
                  BALB/c
                </h3>
                <ul style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7', paddingLeft: '20px' }}>
                  <li><strong>Immune bias:</strong> Th2 (IL-4, IL-5, IL-13)</li>
                  <li><strong>Metabolic:</strong> Resistant to diet induced obesity</li>
                  <li><strong>Behavior:</strong> Higher anxiety in standard tests</li>
                  <li><strong>Tumor models:</strong> CT26, 4T1, RENCA, A20</li>
                  <li><strong>Cre drivers:</strong> Limited compared to C57BL/6</li>
                  <li><strong>Use for:</strong> Immunology, allergy, infectious disease</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Considerations */}
        <section style={{ backgroundColor: BRAND.white, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              color: BRAND.navy,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.2rem',
              fontWeight: 700,
              marginBottom: '40px',
              textAlign: 'center',
            }}>
              Technical Considerations
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Backcrossing */}
              <div className="animate-in">
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}>
                  Backcrossing Requirements
                </h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
                  When targeted alleles are generated on 129 strain backgrounds, backcrossing to C57BL/6 is required to achieve congenic status:
                </p>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', maxWidth: '600px', borderCollapse: 'collapse', border: '1px solid #e0e0e0' }}>
                    <thead>
                      <tr style={{ backgroundColor: BRAND.navy }}>
                        <th style={{ padding: '15px 20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                          Generation
                        </th>
                        <th style={{ padding: '15px 20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                          Background Purity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { gen: 'N1', purity: '50%' },
                        { gen: 'N5', purity: '97%' },
                        { gen: 'N10', purity: '99.9%' },
                      ].map((row, index) => (
                        <tr key={index} style={{ 
                          borderBottom: '1px solid #e0e0e0',
                          backgroundColor: index % 2 === 0 ? BRAND.lightGray : BRAND.white 
                        }}>
                          <td style={{ padding: '15px 20px', fontWeight: 600, color: BRAND.navy }}>
                            {row.gen}
                          </td>
                          <td style={{ padding: '15px 20px', color: '#666' }}>
                            {row.purity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <p style={{ color: '#666', fontSize: '.95rem', marginTop: '20px', fontStyle: 'italic' }}>
                  Speed congenic approaches using marker assisted selection can achieve N10 equivalent purity in fewer generations.
                </p>
                <Link 
                  href="/backcrossing-services"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '15px',
                    color: BRAND.teal,
                    fontWeight: 600,
                    fontSize: '.95rem',
                    textDecoration: 'none',
                  }}
                >
                  Learn About Backcrossing Services
                  <IconChevronRight size={14} color={BRAND.teal} />
                </Link>
              </div>

              {/* Breeding Performance */}
              <div className="animate-in">
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}>
                  Breeding Performance
                </h3>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '15px' }}>
                  C57BL/6 mice have moderate breeding performance compared to outbred strains:
                </p>
                <div style={{
                  backgroundColor: BRAND.lightGray,
                  padding: '25px',
                  borderRadius: '8px',
                }}>
                  <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                    <li>Average litter size: 5 to 7 pups</li>
                    <li>Weaning age: 21 days</li>
                    <li>First litter typically at 10 to 12 weeks of age</li>
                    <li>Good maternal behavior</li>
                    <li>Compatible with SPF housing conditions</li>
                    <li>Moderate lifespan (approximately 24 to 30 months)</li>
                  </ul>
                </div>
                <p style={{ color: '#666', fontSize: '.95rem', marginTop: '15px' }}>
                  Plan breeding timelines accounting for these parameters when estimating cohort development schedules.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Strain Backgrounds */}
        <section style={{ backgroundColor: BRAND.white, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              color: BRAND.navy,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.2rem',
              fontWeight: 700,
              marginBottom: '40px',
              textAlign: 'center',
            }}>
              Other Strain Backgrounds
            </h2>

            <div className="animate-in" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px',
            }}>
              {[
                {
                  title: '129 Strains',
                  description: 'Commonly used for ES cell derivation due to excellent germline transmission. Multiple substrains exist (129S1, 129S4, 129Sv). Often backcrossed to C57BL/6 for pure background.',
                },
                {
                  title: 'FVB/N',
                  description: 'Excellent for transgenic generation via pronuclear injection due to large, visible pronuclei. Good breeding performance with large litters. Carries rd1 retinal degeneration allele.',
                },
                {
                  title: 'DBA/2',
                  description: 'Used for specific research applications including glaucoma models, hearing loss studies, and neuroscience research. Develops age related hearing loss and glaucoma susceptibility.',
                },
                {
                  title: 'NOD (Non Obese Diabetic)',
                  description: 'Spontaneously develops autoimmune diabetes. Used as background for autoimmune disease models and immunodeficient derivatives (NSG, NOG). Requires special husbandry.',
                },
              ].map((strain, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: BRAND.lightGray,
                    padding: '25px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <h3 style={{
                    color: BRAND.navy,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}>
                    {strain.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.6' }}>
                    {strain.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strain Selection Guide */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{
              backgroundColor: BRAND.white,
              padding: '50px',
              borderRadius: '8px',
              borderTop: `4px solid ${BRAND.teal}`,
            }}>
              <h2 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '25px',
              }}>
                How to Choose Your Strain Background
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{
                    color: BRAND.blue,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}>
                    1. Consider Your Research Application
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7' }}>
                    Match strain characteristics to your research question. Metabolic studies may benefit from specific substrain selection. Immunology research should consider Th1/Th2 bias.
                  </p>
                </div>

                <div>
                  <h4 style={{
                    color: BRAND.blue,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}>
                    2. Review Published Literature
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7' }}>
                    Use the same background as reference publications to enable direct comparison. This is especially important for novel phenotype characterization.
                  </p>
                </div>

                <div>
                  <h4 style={{
                    color: BRAND.blue,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}>
                    3. Verify Cre Driver Compatibility
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7' }}>
                    If generating conditional alleles, ensure your chosen Cre driver is available on compatible background or plan backcrossing strategy.
                  </p>
                </div>

                <div>
                  <h4 style={{
                    color: BRAND.blue,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}>
                    4. Consult with Our Scientific Team
                  </h4>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7' }}>
                    Our team provides expert guidance on strain selection at no additional cost. We help you navigate substrain differences, backcrossing requirements, and timeline considerations.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Link 
                  href="/strain-selection-guide"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: BRAND.teal,
                    color: BRAND.white,
                    padding: '14px 28px',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Complete Strain Selection Guide
                  <IconChevronRight size={16} color={BRAND.white} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Strain Pages */}
        <section style={{ backgroundColor: BRAND.white, padding: '70px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              color: BRAND.navy,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '40px',
              textAlign: 'center',
            }}>
              Explore Specific Strain Backgrounds
            </h2>

            <div className="animate-in" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
            }}>
              {[
                { title: 'C57BL/6 Background', href: '/c57bl6-mouse-background', description: 'The most widely used strain with extensive characterization' },
                { title: 'C57BL/6J vs C57BL/6N', href: '/c57bl6j-vs-c57bl6n', description: 'Detailed substrain comparison and selection guidance' },
                { title: 'BALB/c Background', href: '/balbc-mouse-background', description: 'Th2 biased strain ideal for immunology and allergy research' },
                { title: 'Backcrossing Services', href: '/backcrossing-services', description: 'Transfer your model to the optimal genetic background' },
                { title: 'Strain Selection Guide', href: '/strain-selection-guide', description: 'Comprehensive guide to choosing the right background' },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group"
                  style={{
                    backgroundColor: BRAND.lightGray,
                    padding: '25px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                    <IconChevronRight size={18} color={BRAND.teal} />
                    <h3 style={{
                      color: BRAND.teal,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}>
                      {link.title}
                    </h3>
                  </div>
                  <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5', paddingLeft: '28px' }}>
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '70px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              color: BRAND.blue,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '40px',
              textAlign: 'center',
            }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} backgroundColor={BRAND.lightGray} />
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Lab Signals */}
        <LabSignalsSignup 
          title="Stay Informed on Strain Background Research"
          description="Get updates on the latest strain background selection strategies, backcrossing protocols, and genetic considerations for your mouse models."
        />

        {/* Final CTA */}
        <UXUIDCStartProjectCTA 
          title="Expert Guidance on Strain Selection"
          content="Our scientific team provides complimentary consultation on strain background selection, substrain considerations, and backcrossing strategies for your custom mouse models."
        />
      </main>

      <UXUIDCFooter />
      <UXUIDCCookieConsent />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Mouse Strain Backgrounds', path: '/mouse-strain-backgrounds' },
        ]}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Mouse Strain Background Consultation',
            provider: {
              '@type': 'Organization',
              name: 'ingenious targeting laboratory',
            },
            description: 'Expert guidance on mouse strain background selection including C57BL/6, BALB/c, and other inbred strains. Backcrossing services and strain characterization.',
            serviceType: 'Genetic Consultation Services',
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: typeof faq.answer === 'string' ? faq.answer : faq.question,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
