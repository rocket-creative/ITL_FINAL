'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconSettings, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { UXUIDCResourceLinks, creResources, breedingResources, LabSignalsSignup, getRelatedLabSignalsArticles, BreedingSchemeArchitectCTA, GlossaryTermLink } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Conditional Gene Targeting",
  title: "Cre Lox System",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 knockout projects, including conditional, using the Cre lox system. Our Cre lox based models have supported research published in more than 800 peer reviewed journals including Science, Nature, and Cell, enabling tissue specific and temporally controlled gene manipulation across every organ system.",
  description: "The Cre lox system is the foundation of conditional gene targeting in mice. By flanking critical gene elements with LoxP sites, researchers create alleles that function normally until exposed to Cre recombinase. Crossing floxed mice to tissue specific or inducible Cre driver lines enables gene deletion in defined cell populations or at specific times, providing experimental control not possible with conventional knockouts."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Technology Benefits
const technologyBenefits = [
  "Study of essential genes that cause embryonic lethality when deleted globally",
  "Dissection of gene function in specific tissues without confounding systemic effects",
  "Temporal control over gene inactivation to model disease onset or acute loss of function"
];

// How Cre Lox Works
const creComponents = [
  {
    title: "Cre Recombinase",
    description: "A 38 kDa enzyme from bacteriophage P1 that catalyzes recombination between specific DNA sequences. Cre recognizes and binds to LoxP sites, bringing two sites together and catalyzing strand exchange to excise or invert the intervening DNA."
  },
  {
    title: "LoxP Sites",
    description: "34 base pair DNA sequences consisting of two 13 bp inverted repeats flanking an 8 bp asymmetric spacer. The spacer sequence determines directionality. When two LoxP sites are oriented in the same direction, Cre mediated recombination excises the intervening sequence, leaving a single LoxP site."
  }
];

// Recombination Outcomes
const recombinationOutcomes = [
  { orientation: "Same orientation (direct repeats)", outcome: "Excision of intervening sequence, leaving single LoxP site" },
  { orientation: "Opposite orientation (inverted repeats)", outcome: "Inversion of intervening sequence" },
  { orientation: "Different chromosomes or distant sites", outcome: "Translocation or large deletion (less efficient)" }
];

// Conditional Knockout Mechanism
const conditionalMechanism = [
  "LoxP sites flank one or more critical exons",
  "The floxed allele functions normally in the absence of Cre",
  "Gene expression, splicing, and protein function are preserved",
  "When Cre is expressed, the floxed exons are excised",
  "Excision creates a null allele in Cre expressing cells",
  "Cells without Cre retain normal gene function"
];

// LoxP Positioning
const loxpPositioning = [
  { name: "Intronic placement", desc: "LoxP sites are typically placed in introns to avoid disrupting gene expression before Cre exposure" },
  { name: "Critical exon selection", desc: "Flanked exons must be essential for gene function; their deletion should create a true null" },
  { name: "Splice site preservation", desc: "LoxP insertion should not disrupt normal splicing" },
  { name: "Regulatory element avoidance", desc: "Positioning should not interfere with enhancers or other regulatory sequences" }
];

// Exon Selection Criteria
const exonCriteria = [
  "Present in all known transcript variants",
  "Encode essential functional domains",
  "Deletion causes frameshift in downstream sequence (for single exon targeting)",
  "No alternative splicing that could bypass the deletion"
];

// Neural System Cre Drivers Table
const neuralCreDrivers = [
  { driver: "Nestin Cre", target: "Neural progenitors", applications: "Pan neural deletion" },
  { driver: "CamKII Cre", target: "Forebrain excitatory neurons", applications: "Learning, memory, behavior" },
  { driver: "DAT Cre", target: "Dopaminergic neurons", applications: "Parkinson disease models" },
  { driver: "GFAP Cre", target: "Astrocytes", applications: "Glial function" },
  { driver: "Olig2 Cre", target: "Oligodendrocytes", applications: "Myelination studies" }
];

// Immune System Cre Drivers Table
const immuneCreDrivers = [
  { driver: "CD4 Cre", target: "T cells", applications: "T cell development and function" },
  { driver: "CD19 Cre", target: "B cells", applications: "B cell biology" },
  { driver: "LysM Cre", target: "Macrophages, granulocytes", applications: "Innate immunity" },
  { driver: "CD11c Cre", target: "Dendritic cells", applications: "Antigen presentation" },
  { driver: "Foxp3 Cre", target: "Regulatory T cells", applications: "Immune tolerance" }
];

// Metabolic Cre Drivers Table
const metabolicCreDrivers = [
  { driver: "Albumin Cre", target: "Hepatocytes", applications: "Liver metabolism" },
  { driver: "Adiponectin Cre", target: "Adipocytes", applications: "Adipose biology" },
  { driver: "Insulin Cre", target: "Pancreatic beta cells", applications: "Insulin secretion" },
  { driver: "Villin Cre", target: "Intestinal epithelium", applications: "Gut function" },
  { driver: "MyoD Cre", target: "Skeletal muscle", applications: "Muscle metabolism" }
];

// Other System Cre Drivers Table
const otherCreDrivers = [
  { driver: "Myh6 Cre", target: "Cardiomyocytes", applications: "Cardiac function" },
  { driver: "Col2a1 Cre", target: "Chondrocytes", applications: "Cartilage development" },
  { driver: "Krt14 Cre", target: "Keratinocytes", applications: "Skin biology" },
  { driver: "Tie2 Cre", target: "Endothelial cells", applications: "Vascular biology" }
];

// Inducible Systems
const inducibleSystems = [
  {
    title: "Tamoxifen Inducible (CreERT2)",
    description: "CreERT2 is a fusion of Cre recombinase with a modified estrogen receptor ligand binding domain. The fusion protein is sequestered in the cytoplasm until tamoxifen administration, which triggers nuclear translocation and Cre activity.",
    features: [
      "Gene deletion triggered by tamoxifen injection",
      "Recombination occurs within days of treatment",
      "Enables adult onset gene deletion after normal development",
      "Allows study of acute versus chronic loss of function"
    ]
  },
  {
    title: "Doxycycline Inducible (Tet Systems)",
    description: "Tetracycline regulated systems use doxycycline to control Cre expression:",
    features: [
      "Tet On: Cre expressed in presence of doxycycline",
      "Tet Off: Cre expressed in absence of doxycycline",
      "Reversible control (unlike CreERT2 which causes permanent deletion)",
      "Useful when reversible gene regulation is needed"
    ]
  }
];

// Applications
const applicationsData = [
  {
    title: "Essential Genes",
    description: "Many genes cause embryonic lethality when deleted globally. Conditional knockout bypasses developmental requirements by restricting gene deletion to specific tissues or to adult stages after development is complete."
  },
  {
    title: "Pleiotropic Genes",
    description: "Genes with functions in multiple organ systems produce complex phenotypes when deleted globally. Tissue specific conditional knockout isolates gene function in individual tissues, clarifying cell autonomous versus secondary effects."
  },
  {
    title: "Cell Type Specific Questions",
    description: "When research focuses on gene function in a specific cell type, conditional knockout provides direct answers without confounding effects from other tissues."
  },
  {
    title: "Temporal Studies",
    description: "Inducible Cre systems enable study of gene function at specific times: during development, in young adults, or in aged animals. This temporal control is valuable for modeling disease onset and studying acute versus chronic phenotypes."
  }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Wang L, Noyer L, Jishage M, Wang YH, Tao AY, McDermott M, et al.",
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

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const coetzeeTestimonial = getTestimonialById('coetzee-nyu')!;

const testimonials = [
  { quote: coetzeeTestimonial.quote, name: formatAuthorWithCredentials(coetzeeTestimonial), affiliation: coetzeeTestimonial.affiliation },
];

// Related Links
const creLoxTechnologies = [
  { title: "LoxP Site Design", href: "/loxp-site-design" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "Tamoxifen Inducible Cre", href: "/tamoxifen-inducible-cre" },
  { title: "Cre Line Selection Guide", href: "/cre-line-selection-guide" }
];

const relatedRecombinaseSystems = [
  { title: "Flp FRT System", href: "/flp-frt-system" },
  { title: "Dre Rox System", href: "/dre-rox-system" },
];

const relatedModelTypes = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" },
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" }
];

// FAQ Data
const getFaqData = () => [
  {
    question: "What is the difference between LoxP and FRT sites?",
    answer: (
      <>
        <GlossaryTermLink term="floxed-gene-loxp-site">LoxP sites</GlossaryTermLink> are recognized by Cre recombinase; FRT sites are recognized by <GlossaryTermLink term="flp-frt-system">Flp recombinase</GlossaryTermLink>. Both are 34 base pair sequences that enable DNA <GlossaryTermLink term="inversion-vs-excision">excision</GlossaryTermLink> when two sites flank a DNA segment.
      </>
    )
  },
  {
    question: "How do I choose between tissue-specific and inducible Cre systems?",
    answer: (
      <>
        <GlossaryTermLink term="cre-driver-line">Tissue-specific Cre</GlossaryTermLink> provides spatial control (gene deleted in specific organs). <GlossaryTermLink term="inducible-cre-ert2">Inducible Cre (CreERT2)</GlossaryTermLink> provides <GlossaryTermLink term="temporal-control">temporal control</GlossaryTermLink> (gene deleted at specific times). Combining both (tissue-specific CreERT2) provides maximum control. Choose based on whether you need spatial control, temporal control, or both.
      </>
    )
  },
  {
    question: "What is a floxed allele?",
    answer: (
      <>
        A <GlossaryTermLink term="floxed-gene-loxp-site">floxed allele</GlossaryTermLink> has LoxP sites flanking a critical exon. The gene functions normally until exposed to Cre recombinase, which excises the DNA between LoxP sites and eliminates gene function. Floxed alleles are the foundation of <GlossaryTermLink term="conditional-knockout-mouse-models">conditional knockout</GlossaryTermLink> strategies.
      </>
    )
  },
  {
    question: "Can I use the same floxed mouse with different Cre drivers?",
    answer: (
      <>
        Yes. This is a major advantage of conditional systems. A single floxed allele can be crossed to any <GlossaryTermLink term="cre-driver-line">Cre driver line</GlossaryTermLink> to achieve <GlossaryTermLink term="tissue-specific-knockout">tissue-specific knockout</GlossaryTermLink> in different organs. One floxed mouse project can support studies across multiple tissues and research programs.
      </>
    )
  }
];

export default function CreLoxSystemPage() {
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

  const renderCreDriverTable = (title: string, drivers: { driver: string; target: string; applications: string }[]) => (
    <div className="animate-in" style={{ marginBottom: '30px' }}>
      <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
        {title}
      </h4>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#0a253c' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Population</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((row, index) => (
              <tr 
                key={index}
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                  borderBottom: '1px solid #e5e7eb'
                }}
              >
                <td style={{ padding: '10px 12px', color: '#0a253c', fontWeight: 500 }}>{row.driver}</td>
                <td style={{ padding: '10px 12px', color: '#555' }}>{row.target}</td>
                <td style={{ padding: '10px 12px', color: '#555' }}>{row.applications}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
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
              <IconSettings size={16} color="white" />
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

        {/* Technology Benefits */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Transforming Mouse Genetics
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              This technology has transformed mouse genetics by enabling:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {technologyBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080'
                  }}
                >
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Cre Lox Works */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              How Cre Lox Works
            </h2>
            
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              The Components
            </h3>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              The Cre lox system consists of two components that work together:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {creComponents.map((component, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #008080'
                  }}
                >
                  <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {component.title}
                  </h4>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {component.description}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Recombination Outcomes
            </h3>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
              The relative orientation of LoxP sites determines the recombination outcome:
            </p>
            
            <div className="animate-in" style={{ overflowX: 'auto', marginBottom: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>LoxP Orientation</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Recombination Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {recombinationOutcomes.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.orientation}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Conditional Knockout Mechanism */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Conditional Knockout Mechanism
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              In a conditional knockout (floxed) allele:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conditionalMechanism.map((step, index) => (
                <div 
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '15px 20px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    color: '#008080',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '.85rem',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '.9rem' }}>{step}</span>
                </div>
              ))}
            </div>
            
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', fontStyle: 'italic', marginTop: '25px' }}>
              This design enables gene inactivation restricted to specific cell types, tissues, or developmental stages based on the Cre driver used.
            </p>
          </div>
        </section>

        {/* LoxP Site Design */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              LoxP Site Design
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
                  Positioning Considerations
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Proper LoxP site placement is essential for conditional allele function:
                </p>
                {loxpPositioning.map((item, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '12px 15px',
                      borderRadius: '6px',
                      marginBottom: '10px',
                      borderLeft: '3px solid #008080'
                    }}
                  >
                    <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                    <span style={{ color: '#666', fontSize: '.85rem', marginLeft: '5px' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
              
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
                  Exon Selection Criteria
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  The exon or exons flanked by LoxP sites must meet specific criteria:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exonCriteria.map((criterion, index) => (
                    <li 
                      key={index}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}
                    >
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.9rem' }}>{criterion}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: '#008080', fontSize: '.85rem', fontStyle: 'italic', marginTop: '15px' }}>
                  ingenious targeting laboratory analyzes gene structure, transcript architecture, and protein domains to identify optimal exon targets for each project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cre Driver Lines */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Cre Driver Lines
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Tissue specificity is achieved through Cre driver lines that express Cre recombinase under tissue specific promoters. Hundreds of Cre driver lines are available, targeting virtually every organ system and cell type.
            </p>
            
            {renderCreDriverTable("Neural System", neuralCreDrivers)}
            {renderCreDriverTable("Immune System", immuneCreDrivers)}
            {renderCreDriverTable("Metabolic Tissues", metabolicCreDrivers)}
            {renderCreDriverTable("Other Systems", otherCreDrivers)}
            
            <div className="animate-in flex flex-wrap gap-4 mt-6">
              <Link 
                href="/tissue-specific-cre-lines"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>View All Cre Drivers</span>
                <IconChevronRight size={14} color="white" />
              </Link>
              <Link 
                href="/cre-line-selection-guide"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  border: '1px solid #008080'
                }}
              >
                <span>Cre Line Selection Guide</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Inducible Cre Systems */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Inducible Cre Systems
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inducibleSystems.map((system, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {system.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    {system.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {system.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#666', fontSize: '.85rem' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="animate-in" style={{ marginTop: '30px', backgroundColor: '#0a253c', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                Combining Tissue and Temporal Control
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                Tissue specific CreERT2 lines combine spatial and temporal control. For example, Albumin CreERT2 enables tamoxifen inducible deletion specifically in hepatocytes, allowing study of gene function in adult liver without developmental effects.
              </p>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicationsData.map((app, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #008080'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {app.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Cre lox models generated by ingenious targeting laboratory:
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
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '35px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <IconQuote size={32} color="#008080" style={{ marginBottom: '20px', opacity: 0.8 }} />
                  <p style={{
                    color: '#555',
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: '25px',
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <p style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '5px' }}>
                      — {testimonial.name}
                    </p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.9rem', fontWeight: 400 }}>
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
              Start Your Cre Lox Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your conditional knockout requirements and recommend optimal LoxP site positioning and Cre driver selection for your research goals. Initial consultation is provided at no charge.
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

        {/* Downloadable Resources Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Cre-Lox Resources"
              description="Download our free guides and tools for your Cre-lox project."
              resources={[...creResources, ...breedingResources]}
              variant="card"
            />
          </div>
        </section>

        {/* Lab Signals Newsletter Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Master the Cre-Lox System"
              description="Subscribe to Lab Signals for expert articles on Cre-lox design, floxed allele optimization, and conditional gene targeting strategies."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/cre-lox-system')}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={getFaqData()} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Cre Lox Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {creLoxTechnologies.map((link, index) => (
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
                  Related Recombinase Systems
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedRecombinaseSystems.map((link, index) => (
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
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />
      </main>

      <UXUIDCFooter />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Cre Lox System",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Cre lox system for conditional gene targeting in mice. LoxP site design, Cre recombinase drivers, and floxed allele generation. 2,500+ projects since 1998.",
            "serviceType": "Conditional Gene Targeting Technology"
          })
        }}
      />
    </div>
  );
}
