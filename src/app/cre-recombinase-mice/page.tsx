'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Conditional Gene Control",
  title: "Cre Recombinase Mice",
  intro: "Since 1998, ingenious targeting laboratory has utilized Cre recombinase technology in over 1,500 conditional knockout and knockin projects, enabling researchers to achieve precise spatial and temporal control of gene expression in mouse models.",
  description: "Cre recombinase mice express the Cre enzyme in specific tissues or cell types, allowing targeted deletion or activation of floxed alleles. This technology transforms conditional alleles into functional knockouts or knockins only where Cre is expressed, preserving normal gene function elsewhere."
};

// Stats Data
const statsData = [
  { value: 1500, suffix: "+", label: "Conditional Projects" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Mechanism of Action
const mechanismSteps = [
  { step: "Recognition", description: "Cre recognizes the 34 base pair LoxP sequence, consisting of two 13 bp inverted repeats flanking an 8 bp asymmetric spacer region." },
  { step: "Recombination", description: "When two LoxP sites flank a DNA segment in the same orientation, Cre excises the intervening sequence as a circular DNA molecule, leaving a single LoxP site behind." },
  { step: "Irreversibility", description: "Excision is essentially irreversible in vivo because the excised circle is rapidly degraded and reintegration probability is extremely low." }
];

// Neuronal Cre Lines
const neuronalCreLines = [
  { driver: "Nestin Cre", expression: "Neural progenitors", applications: "Pan neuronal knockout from development" },
  { driver: "Syn1 Cre (Synapsin)", expression: "Mature neurons", applications: "Postnatal neuronal deletion" },
  { driver: "CamKII Cre", expression: "Forebrain excitatory neurons", applications: "Learning, memory, behavior studies" },
  { driver: "Emx1 Cre", expression: "Dorsal telencephalon", applications: "Cortical development" },
  { driver: "Pvalb Cre", expression: "Parvalbumin interneurons", applications: "Inhibitory circuit studies" }
];

// Immune Cell Cre Lines
const immuneCreLines = [
  { driver: "LysM Cre", expression: "Myeloid cells", applications: "Macrophage, neutrophil studies" },
  { driver: "CD19 Cre", expression: "B lymphocytes", applications: "B cell development, antibody responses" },
  { driver: "CD4 Cre", expression: "T lymphocytes", applications: "T cell function" },
  { driver: "Lck Cre", expression: "Early T cells", applications: "Thymocyte development" },
  { driver: "Foxp3 Cre", expression: "Regulatory T cells", applications: "Treg function and tolerance" }
];

// Metabolic Tissue Cre Lines
const metabolicCreLines = [
  { driver: "Albumin Cre", expression: "Hepatocytes", applications: "Liver metabolism" },
  { driver: "Adipoq Cre", expression: "Adipocytes", applications: "Fat metabolism, obesity" },
  { driver: "Ins1 Cre", expression: "Pancreatic beta cells", applications: "Diabetes, insulin secretion" },
  { driver: "Villin Cre", expression: "Intestinal epithelium", applications: "Gut metabolism, absorption" }
];

// Cardiovascular Cre Lines
const cardiovascularCreLines = [
  { driver: "Myh6 Cre (αMHC)", expression: "Cardiomyocytes", applications: "Heart function" },
  { driver: "SM22 Cre", expression: "Smooth muscle", applications: "Vascular biology" },
  { driver: "Cdh5 Cre (VE Cadherin)", expression: "Endothelial cells", applications: "Vascular development" },
  { driver: "Tie2 Cre", expression: "Endothelial and hematopoietic", applications: "Angiogenesis" }
];

// Cre Line Selection Considerations
const selectionConsiderations = [
  {
    title: "Expression Pattern Verification",
    items: [
      "Review published characterization and Cre Portal data",
      "Cross to Rosa26 reporter to visualize actual recombination",
      "Some Cre lines have broader expression than names suggest"
    ]
  },
  {
    title: "Timing Considerations",
    items: [
      "When does Cre expression begin?",
      "Early activity may cause embryonic phenotypes",
      "Cre marks cell lineage permanently"
    ]
  },
  {
    title: "Efficiency Factors",
    items: [
      "Not all Cre lines achieve 100% recombination",
      "Efficiency varies by target locus and Cre level",
      "Mosaicism may be acceptable or problematic"
    ]
  }
];

// Quality Considerations
const qualityConsiderations = [
  {
    issue: "Germline Recombination",
    problem: "Cre expression in germ cells causes global recombination transmitted to offspring, eliminating conditional control.",
    solutions: ["Maintain floxed allele through female if Cre is male germline active", "Use Cre lines validated for germline silence", "Always genotype for recombined allele in non Cre tissues"]
  },
  {
    issue: "Cre Toxicity",
    problem: "High Cre expression can cause cellular toxicity independent of target gene through DNA damage at pseudo LoxP sites.",
    solutions: ["Include Cre positive, flox negative controls", "Distinguish Cre toxicity from gene deletion phenotypes", "Monitor for growth abnormalities with chronic Cre"]
  }
];

// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Wang L, Noyer L, Jishage M, et al.",
    year: "2025",
    title: "CLNS1A regulates genome stability and cell cycle progression to control CD4 T cell function and autoimmunity.",
    journal: "Sci Immunol",
    volume: "10(108): eadq8860",
    link: "https://pubmed.ncbi.nlm.nih.gov/40540585/"
  },
  {
    authors: "Clausen BE et al.",
    year: "1999",
    title: "Conditional gene targeting in macrophages and granulocytes using LysMcre mice.",
    journal: "Transgenic Research",
    volume: "8(4): 265-277",
    link: "https://pubmed.ncbi.nlm.nih.gov/10621974/"
  }
];

// Testimonials
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;
const testimonials = [
  { quote: dunaiefTestimonial.quote, author: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation }
];

// Related Links
const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "LoxP Site Design", href: "/loxp-site-design" },
  { title: "Tamoxifen Inducible Cre", href: "/tamoxifen-inducible-cre" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" }
];

const relatedModelTypes = [
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Floxed Mouse Models", href: "/floxed-mouse-models" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" }
];

const selectionGuides = [
  { title: "Cre Line Selection Guide", href: "/cre-line-selection-guide" },
  { title: "Conditional vs Conventional Guide", href: "/conditional-vs-conventional-guide" }
];

// FAQ Data
const faqData = [
  {
    question: "How do I choose the right Cre driver line for my experiment?",
    answer: "Cre driver selection depends on target cell type, timing requirements, and expression specificity. Tissue specific Cre lines (Albumin Cre for hepatocytes, Nestin Cre for neural cells) provide spatial control. Inducible Cre (CreER) provides temporal control. Consider Cre expression timing, efficiency, and potential germline activity when selecting."
  },
  {
    question: "What is germline recombination and how do I avoid it?",
    answer: "Germline recombination occurs when Cre is active in germ cells, causing global recombination transmitted to offspring, eliminating conditional control. To avoid this, use Cre lines validated for germline silence, maintain floxed alleles through the non Cre expressing parent, and genotype for recombined alleles in non Cre tissues."
  },
  {
    question: "How efficient is Cre mediated recombination?",
    answer: "Cre recombination efficiency varies by target locus, Cre expression level, and LoxP site accessibility. Not all Cre lines achieve 100% recombination, and mosaicism (incomplete recombination) can occur. Always include Cre positive, flox negative controls to distinguish Cre toxicity from gene deletion phenotypes."
  },
  {
    question: "What should I consider about Cre toxicity?",
    answer: "High Cre expression can cause cellular toxicity independent of target gene deletion through DNA damage at pseudo LoxP sites. Include Cre positive, flox negative controls to distinguish Cre toxicity from gene deletion phenotypes. Some tissues show growth abnormalities with chronic high Cre expression."
  }
];

export default function CreRecombinaseMicePage() {
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

        {/* How Cre Works Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              How Cre Recombinase Works
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Cre recombinase is a 38 kDa enzyme derived from bacteriophage P1 that catalyzes site specific recombination between LoxP sequences without requiring cofactors or additional proteins.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mechanismSteps.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#008080', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontSize: '.9rem', fontWeight: 600 }}>{index + 1}</span>
                    </div>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600 }}>
                      {item.step}
                    </h3>
                  </div>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cre Driver Lines Tables */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Types of Cre Driver Lines
            </h2>

            {/* Neuronal Cre Lines */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Neuronal Cre Lines
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#008080' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Expression Pattern</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {neuronalCreLines.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.expression}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Immune Cell Cre Lines */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Immune Cell Cre Lines
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#2384da' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Expression Pattern</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {immuneCreLines.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.expression}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Metabolic Tissue Cre Lines */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Metabolic Tissue Cre Lines
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Expression Pattern</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metabolicCreLines.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.expression}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cardiovascular Cre Lines */}
            <div className="animate-in">
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Cardiovascular Cre Lines
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#008080' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Expression Pattern</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardiovascularCreLines.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.expression}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Selection Considerations Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Selecting the Right Cre Line
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectionConsiderations.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {item.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.items.map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Considerations Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Cre Line Quality Considerations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qualityConsiderations.map((item, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {item.issue}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    <strong>Problem:</strong> {item.problem}
                  </p>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem', fontWeight: 600 }}>Solutions:</span>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px' }}>
                      {item.solutions.map((solution, idx) => (
                        <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginBottom: '5px', paddingLeft: '15px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0 }}>•</span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications Featuring Cre Technology
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Research utilizing Cre recombinase mice generated by ingenious targeting laboratory:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {publicationsData.map((pub, index) => (
                <div
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2384da'
                  }}
                >
                  <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '8px' }}>
                    <span style={{ color: '#0a253c', fontWeight: 500 }}>{pub.authors}</span> ({pub.year}).
                  </p>
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        fontSize: '.95rem',
                        color: '#008080',
                        fontWeight: 600,
                        marginBottom: '8px',
                        lineHeight: '1.5',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      {pub.title} ↗
                    </a>
                  ) : (
                    <p style={{ fontSize: '.95rem', color: '#333', fontWeight: 600, marginBottom: '8px', lineHeight: '1.5' }}>
                      {pub.title}
                    </p>
                  )}
                  <p style={{ color: '#666', fontSize: '.85rem', fontStyle: 'italic' }}>
                    <em>{pub.journal}</em>
                    {pub.volume && <span style={{ fontStyle: 'normal' }}> {pub.volume}</span>}
                  </p>
                </div>
              ))}
            </div>

            <div className="animate-in text-center" style={{ marginTop: '25px' }}>
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: '#2384da',
                  color: 'white',
                  padding: '10px 25px',
                  borderRadius: '4px',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>View All Publications</span>
                <IconChevronRight size={16} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              What Researchers Say
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
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
              Start Your Cre Recombinase Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants can help you select the optimal Cre driver line or design custom Cre knockin models for your research goals. We also design optimal floxed alleles for Cre dependent conditional knockout.
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

        {/* FAQ Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  Selection Guides
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectionGuides.map((link, index) => (
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
            "name": "Cre Recombinase Mice",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Cre recombinase mouse models for conditional gene targeting. Tissue specific and inducible gene control systems since 1998.",
            "serviceType": "Cre Recombinase Mice"
          })
        }}
      />
    </div>
  );
}
