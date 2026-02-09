'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Inducible Systems",
  title: "Inducible Gene Expression",
  intro: "Since 1998, ingenious targeting laboratory has incorporated inducible expression systems into hundreds of mouse models, enabling researchers to control gene activation or deletion with temporal precision through small molecule administration.",
  description: "Inducible gene expression systems provide the ability to turn genes on or off at any point in the animal's life. This temporal control separates developmental requirements from adult functions, enables study of acute gene loss, and models therapeutic intervention timing for drug development."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Why Inducible Control Matters
const inducibleBenefits = [
  {
    limitation: "Overcoming Embryonic Lethality",
    problem: "Essential genes deleted from conception often cause embryonic or perinatal death, preventing adult phenotype analysis.",
    solution: "Induce gene deletion in adults after development completes. Study adult function of developmentally essential genes."
  },
  {
    limitation: "Distinguishing Developmental vs Adult Function",
    problem: "Lifelong gene absence conflates developmental defects with adult requirements. Phenotype may reflect developmental abnormality rather than adult function.",
    solution: "Delete gene in fully developed adults. Observe acute consequences separate from developmental compensation."
  },
  {
    limitation: "Modeling Therapeutic Intervention",
    problem: "Therapeutics inhibit targets in adult patients, not from conception.",
    solution: "Induce deletion at disease relevant timepoints. Model drug effect timing and therapeutic window."
  }
];

// Tamoxifen System
const tamoxifenFeatures = [
  "Single administration creates permanent genetic change",
  "Wide variety of tissue specific CreERT2 lines available",
  "Well characterized and reliable",
  "Recombination occurs within days of tamoxifen administration"
];

// FAST Technology
const fastFeatures = [
  { mode: "Knockout First Mode", desc: "Initial allele functions as a null, with gene function rescued by crossing to tissue specific Cre lines" },
  { mode: "Inducible Expression Mode", desc: "Gene expression induced through tetracycline transactivator (tTA) lines for ectopic or tissue specific overexpression" },
  { mode: "Conditional Knockdown/Knockout Mode", desc: "Gene expression silenced using tetracycline trans silencer lines for tissue specific conditional knockdown" }
];

// Decision Framework Table
const decisionFramework = [
  { factor: "Effect permanence", tamoxifen: "Permanent", doxycycline: "Reversible" },
  { factor: "Target gene", tamoxifen: "Endogenous floxed allele", doxycycline: "Transgene expression" },
  { factor: "Typical use", tamoxifen: "Conditional knockout", doxycycline: "Transgene regulation" },
  { factor: "Drug concerns", tamoxifen: "Estrogenic effects", doxycycline: "Microbiome effects" },
  { factor: "Tissue specificity", tamoxifen: "Via Cre promoter", doxycycline: "Via tTA/rtTA promoter" },
  { factor: "Response time", tamoxifen: "3 to 5 days", doxycycline: "1 to 2 days" }
];

// Tissue Specific CreERT2 Lines
const creERT2Lines = [
  { line: "Albumin CreERT2", tissue: "Hepatocytes", applications: "Inducible liver knockout" },
  { line: "Adipoq CreERT2", tissue: "Adipocytes", applications: "Inducible fat knockout" },
  { line: "Myh6 CreERT2", tissue: "Cardiomyocytes", applications: "Inducible heart knockout" },
  { line: "Nestin CreERT2", tissue: "Neural progenitors", applications: "Inducible neural knockout" },
  { line: "LysM CreERT2", tissue: "Myeloid cells", applications: "Inducible macrophage knockout" }
];

// Testimonials
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const coetzeeTestimonial = getTestimonialById('coetzee-nyu')!;
const testimonials = [
  { quote: coetzeeTestimonial.quote, author: formatAuthorWithCredentials(coetzeeTestimonial), affiliation: coetzeeTestimonial.affiliation }
];

// Related Links
const inducibleSystems = [
  { title: "Tamoxifen Inducible Cre", href: "/tamoxifen-inducible-cre" }
];

const relatedModelTypes = [
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Floxed Mouse Models", href: "/floxed-mouse-models" }
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Cre Recombinase Mice", href: "/cre-recombinase-mice" },
  { title: "LoxP Site Design", href: "/loxp-site-design" }
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between tamoxifen inducible (CreER) and doxycycline inducible (Tet) systems?",
    answer: "Tamoxifen inducible Cre (CreER) enables permanent genetic changes (gene deletion via LoxP recombination) with temporal control. Doxycycline inducible (Tet) enables reversible transgene expression control. CreER provides permanent effects after induction; Tet provides reversible on/off control for expression studies."
  },
  {
    question: "When should I use tamoxifen inducible vs doxycycline inducible?",
    answer: "Use tamoxifen inducible for conditional gene knockout studies, lineage tracing, or when permanent changes are needed. Use doxycycline inducible for transgene expression control, reversible studies, or dose response experiments. Selection depends on whether you need permanent genetic modification or reversible expression control."
  },
  {
    question: "How do you combine tissue specific and temporal control?",
    answer: "Use tissue specific promoters to drive inducible systems (e.g., Albumin CreER for liver specific inducible knockout, or Albumin rtTA for liver specific doxycycline control). This provides both spatial control (tissue specific) and temporal control (drug inducible), enabling maximum experimental precision."
  },
  {
    question: "What are the dosing requirements for inducible systems?",
    answer: "Tamoxifen is typically administered via IP injection (75 to 100 mg/kg for 3 to 5 days), oral gavage (100 to 200 mg/kg), or diet (400 mg/kg chow). Doxycycline is administered in drinking water (1 to 2 mg/mL) or diet (200 to 2000 mg/kg). Dosing depends on efficiency requirements, duration, and route preference."
  }
];

export default function InducibleGeneExpressionPage() {
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
        <section
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <div
              className="hero-animate"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px'
              }}
            >
              <IconDNA size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>

            <h1
              className="hero-animate"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.8rem',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '20px'
              }}
            >
              {heroData.title}
            </h1>

            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
                marginBottom: '15px',
                maxWidth: '800px'
              }}
            >
              {heroData.intro}
            </p>

            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.6rem',
                marginBottom: '25px',
                maxWidth: '800px'
              }}
            >
              {heroData.description}
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  minWidth: '160px',
                  fontSize: '.85rem',
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
                  padding: '10px 20px',
                  minWidth: '160px',
                  border: '2px solid white',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>Talk to a Scientist</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ backgroundColor: '#0a253c', padding: '30px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700 }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.85rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Inducible Control Matters */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Why Inducible Control Matters
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {inducibleBenefits.map((benefit, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {benefit.limitation}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '10px' }}>
                    <strong>Constitutive Knockout Limitation:</strong> {benefit.problem}
                  </p>
                  <p style={{ color: '#008080', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    <strong>Inducible Solution:</strong> {benefit.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Major Inducible Systems */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Major Inducible Systems
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tamoxifen System */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Tamoxifen Inducible (CreERT2)
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                  The most widely used inducible system for conditional gene deletion. Cre recombinase fused to mutant estrogen receptor (ERT2) is sequestered in cytoplasm until tamoxifen binding releases Cre to enter nucleus.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                  {tamoxifenFeatures.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/tamoxifen-inducible-cre" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                  <span>Learn more</span>
                  <IconChevronRight size={14} color="#2384da" />
                </Link>
              </div>

              {/* FAST Technology */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  F.A.S.T.™ Technology
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                  Flexible Accelerated STOP Tetracycline Operator provides versatile inducible/reversible control enabling multiple expression modes from a single knockin allele:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                  {fastFeatures.map((feature, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                      <span style={{ color: '#0a253c', fontSize: '.85rem', fontWeight: 600 }}>{feature.mode}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{feature.desc}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/fast-mice" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                  <span>Learn more</span>
                  <IconChevronRight size={14} color="#2384da" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Framework Table */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Choosing an Inducible System
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Decision framework for selecting the appropriate inducible system:
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ backgroundColor: '#008080' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Factor</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Tamoxifen (CreERT2)</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Doxycycline (Tet)</th>
                  </tr>
                </thead>
                <tbody>
                  {decisionFramework.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px', color: '#0a253c', fontSize: '.85rem', fontWeight: 500 }}>{row.factor}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '.85rem' }}>{row.tamoxifen}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '.85rem' }}>{row.doxycycline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tissue Specific CreERT2 Lines */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Tissue Specific Inducible Cre Lines
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Combine tissue specificity with temporal control. Gene deleted only in specific tissue AND only after tamoxifen administration.
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Line</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Tissue</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {creERT2Lines.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '15px', color: 'white', fontSize: '.85rem', fontWeight: 500 }}>{row.line}</td>
                      <td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.tissue}</td>
                      <td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              What Researchers Say
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px'
                  }}>
                    <IconQuote size={20} color="#008080" />
                  </div>
                  <blockquote style={{
                    color: '#333',
                    fontSize: '.9rem',
                    lineHeight: '1.6rem',
                    fontStyle: 'italic',
                    marginBottom: '15px'
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem', marginBottom: '2px' }}>
                      — {testimonial.author}
                    </p>
                    <p style={{ color: '#666', fontSize: '.8rem' }}>
                      {testimonial.affiliation}
                    </p>
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
              Start Your Inducible Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants can help you select the optimal inducible system and design strategy for your research goals. From CreERT2 knockins to floxed allele optimization, we provide comprehensive technical expertise.
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* FAQ Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
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
              title="Inducible Gene Expression Insights"
              description="Master inducible expression systems, temporal control strategies, and advanced gene regulation techniques. Expert guidance delivered to your inbox biweekly."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Inducible System Options
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {inducibleSystems.map((link, index) => (
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
                  Related Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedModelTypes.map((link, index) => (
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
                  Related Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedTechnologies.map((link, index) => (
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
            "name": "Inducible Gene Expression Systems",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Inducible gene expression systems for temporal gene control. Tamoxifen, doxycycline, and F.A.S.T. technology for precise research applications since 1998.",
            "serviceType": "Inducible Gene Expression"
          })
        }}
      />
    </div>
  );
}
