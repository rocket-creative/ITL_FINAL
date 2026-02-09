'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconLayers } from '@/components/UXUIDC/Icons';
import { UXUIDCResourceLinks, reporterResources, BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Gene Expression Analysis",
  title: "Reporter Knockin Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has generated hundreds of reporter knockin mouse models for researchers studying gene expression, cell lineage, and protein localization. Our mouse models have supported research published in more than 800 peer reviewed articles, including in Science, Nature, and Cell.",
  description: "Reporter knockin mice express reporter genes under the control of endogenous promoters, providing accurate readouts of when, where, and at what level genes are expressed. Unlike transgenic reporters that may not fully recapitulate endogenous expression patterns, knockin reporters are inserted at the native locus and are subject to all normal regulatory controls."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Reporter Types Data
const reporterTypesData = [
  {
    title: "LacZ (Beta Galactosidase)",
    description: "LacZ encodes bacterial beta galactosidase, which converts X gal substrate to an insoluble blue precipitate:",
    features: [
      { name: "Histological detection", desc: "Blue staining in fixed tissues" },
      { name: "High sensitivity", desc: "Enzymatic amplification provides strong signal" },
      { name: "Cellular resolution", desc: "Precise localization of expressing cells" },
      { name: "Whole mount staining", desc: "Visualize expression patterns in intact embryos or organs" },
      { name: "Compatible with sectioning", desc: "Detailed analysis in tissue sections" }
    ],
    note: "LacZ remains the most widely used reporter for detailed expression pattern analysis in fixed tissues."
  },
  {
    title: "Fluorescent Proteins",
    description: "Fluorescent protein reporters enable live imaging and flow cytometry:",
    features: [
      { name: "Live cell and tissue imaging", desc: "Real time visualization" },
      { name: "Flow cytometry and cell sorting (FACS)", desc: "Isolate specific populations" },
      { name: "Lineage tracing with Cre inducible reporters", desc: "Track cell fate" },
      { name: "Multicolor imaging with spectrally distinct reporters", desc: "Simultaneous visualization" }
    ]
  },
  {
    title: "Luciferase",
    description: "Luciferase reporters produce light through enzymatic reaction with luciferin substrate:",
    features: [
      { name: "In vivo imaging", desc: "Non invasive detection in living animals" },
      { name: "Longitudinal studies", desc: "Monitor expression changes over time in same animal" },
      { name: "High sensitivity", desc: "Detects low level expression" },
      { name: "Quantitative", desc: "Light output proportional to expression level" }
    ],
    note: "Luciferase is ideal for tracking gene expression dynamics in living animals without sacrifice."
  }
];

// Fluorescent Protein Table
const fluorescentProteinTable = [
  { reporter: "EGFP", color: "Green", excitation: "488/507 nm", applications: "General purpose, live imaging" },
  { reporter: "tdTomato", color: "Red", excitation: "554/581 nm", applications: "Bright, photostable, lineage tracing" },
  { reporter: "mCherry", color: "Red", excitation: "587/610 nm", applications: "Live imaging, FRET" },
  { reporter: "YFP", color: "Yellow", excitation: "514/527 nm", applications: "Multicolor imaging" },
  { reporter: "CFP", color: "Cyan", excitation: "433/475 nm", applications: "FRET donor" },
  { reporter: "mScarlet", color: "Red", excitation: "569/594 nm", applications: "Bright, monomeric" }
];

// Reporter Comparison Table
const reporterComparisonTable = [
  { factor: "Live imaging", lacZ: "No", fluorescent: "Yes", luciferase: "Yes" },
  { factor: "Cellular resolution", lacZ: "Yes", fluorescent: "Yes", luciferase: "Limited" },
  { factor: "Tissue sections", lacZ: "Yes", fluorescent: "Yes", luciferase: "No" },
  { factor: "Flow cytometry", lacZ: "No", fluorescent: "Yes", luciferase: "No" },
  { factor: "In vivo imaging", lacZ: "No", fluorescent: "Limited depth", luciferase: "Yes" },
  { factor: "Quantification", lacZ: "Semi", fluorescent: "Yes", luciferase: "Yes" },
  { factor: "Substrate required", lacZ: "Yes (X gal)", fluorescent: "No", luciferase: "Yes (luciferin)" }
];

// Knockin Design Types
const knockinDesignTypes = [
  {
    title: "Replacement (Knockout Reporter)",
    points: [
      "Reporter replaces the target gene coding sequence",
      "Reports expression pattern of disrupted gene",
      "Creates null allele (gene is inactivated)",
      "Useful when knockout phenotype is not lethal",
      "Common in knockout-first allele design"
    ]
  },
  {
    title: "Fusion Reporter",
    points: [
      "Reporter fused to endogenous protein",
      "Protein function typically preserved",
      "Reports protein localization, not just expression",
      "Enables tracking of protein dynamics",
      "Requires careful design to avoid disrupting protein function"
    ]
  },
  {
    title: "IRES Reporter",
    points: [
      "Reporter expressed from bicistronic mRNA via internal ribosome entry site",
      "Endogenous gene expression preserved",
      "Reporter expressed from same transcript",
      "Lower reporter expression than fusion or replacement",
      "Does not report protein localization"
    ]
  },
  {
    title: "2A Peptide Reporter",
    points: [
      "Reporter separated from endogenous protein by self cleaving 2A peptide",
      "Near stoichiometric expression of reporter and target protein",
      "Both proteins released as separate polypeptides",
      "Higher reporter expression than IRES",
      "Small peptide tag remains on proteins"
    ]
  }
];

// Applications Data
const applicationsData = [
  {
    title: "Gene Expression Analysis",
    description: "Reporter knockins reveal endogenous gene expression patterns:",
    items: [
      "Developmental expression timing",
      "Tissue and cell type distribution",
      "Expression level changes in disease or treatment",
      "Validation of transcriptomic data at cellular level"
    ]
  },
  {
    title: "Lineage Tracing",
    description: "Cre reporter systems enable permanent marking of cell lineages:",
    items: [
      "Cross Cre knockin to Rosa26 reporter (Rosa26 tdTomato, Rosa26 Confetti)",
      "All descendants of Cre expressing cells permanently labeled",
      "Track cell fate during development or regeneration",
      "Identify progeny of stem or progenitor populations"
    ],
    link: "/cre-lox-system"
  },
  {
    title: "Cell Sorting and Isolation",
    description: "Fluorescent reporters enable isolation of specific cell populations:",
    items: [
      "FACS isolation of reporter positive cells",
      "Single cell analysis of defined populations",
      "Primary cell culture from sorted populations",
      "Enrichment for transplantation studies"
    ]
  },
  {
    title: "In Vivo Imaging",
    description: "Luciferase and fluorescent reporters enable non invasive imaging:",
    items: [
      "Track gene expression changes longitudinally",
      "Monitor tumor growth or metastasis",
      "Assess therapeutic responses in real time",
      "Reduce animal numbers through repeated measures"
    ]
  }
];

// Technical Considerations
const technicalConsiderations = [
  {
    title: "Reporter Selection Factors",
    items: [
      { name: "Detection method", desc: "Histology, live imaging, or flow cytometry" },
      { name: "Tissue of interest", desc: "Autofluorescence and depth considerations" },
      { name: "Experimental timeline", desc: "Fixed endpoints vs longitudinal studies" },
      { name: "Combination with other tools", desc: "Spectral compatibility for multicolor experiments" }
    ]
  },
  {
    title: "Strain Background",
    description: "Reporter visibility can vary with strain background:",
    items: [
      { name: "Pigmented strains (C57BL/6)", desc: "May have higher autofluorescence" },
      { name: "Albino strains", desc: "Advantageous for some in vivo imaging" },
      { name: "Tissue specific autofluorescence", desc: "Consider for fluorescent reporters" }
    ],
    link: "/c57bl6-mouse-background"
  }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Tsvilovskyy V, Ottenheijm R, Kriebs U, Schütz A, et al.",
    year: "2024",
    title: "OCaR1 endows exocytic vesicles with autoregulatory competence by preventing uncontrolled Ca2+ release, exocytosis, and pancreatic tissue damage.",
    journal: "J Clin Invest",
    volume: "134(7): e169428",
    link: "https://pubmed.ncbi.nlm.nih.gov/38557489/"
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

const bosmansTestimonial = getTestimonialById('bosmans-ghent')!;

const testimonials = [
  { quote: bosmansTestimonial.quote, name: formatAuthorWithCredentials(bosmansTestimonial), affiliation: bosmansTestimonial.affiliation },
];

// Related Links
const relatedModelTypes = [
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" }
];

const relatedApplications = [
  { title: "Lineage Tracing Mouse Models", href: "/lineage-tracing-mouse-models" },
  { title: "In Vivo Imaging Mice", href: "/in-vivo-imaging-mice" },
  { title: "Cell Sorting Reporter Mice", href: "/cell-sorting-reporter-mice" }
];

// FAQ Data
const faqData = [
  {
    question: "What reporter options are available for knockin models?",
    answer: "Common reporters include fluorescent proteins (GFP, EGFP, tdTomato, mCherry), enzymatic reporters (LacZ/beta-galactosidase), and bioluminescent reporters (luciferase). Reporter selection depends on your detection method, tissue of interest, whether you need live imaging, and whether you need to combine with other fluorescent tools."
  },
  {
    question: "How do I choose between N-terminal and C-terminal reporter placement?",
    answer: "Placement depends on protein structure and function. N-terminal reporters can interfere with signal peptides or membrane targeting. C-terminal reporters avoid signal sequence issues but may affect protein interactions at the terminus. Internal placement using 2A peptide sequences is also possible for some applications."
  },
  {
    question: "Can reporter knockins be combined with conditional systems?",
    answer: "Yes. Reporters can be incorporated into conditional knockout alleles or used with Cre-dependent expression systems. Cre-dependent reporters enable visualization of when and where recombination occurs."
  },
  {
    question: "What is the difference between knockin and transgenic reporters?",
    answer: "Knockin reporters express from the endogenous gene locus under native regulatory control, providing physiological expression levels and accurate tissue distribution. Transgenic reporters use random integration and promoter-driven expression, which may not accurately reflect endogenous expression patterns. Knockins are preferred for accurate expression analysis."
  }
];

export default function ReporterKnockinPage() {
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
              <IconLayers size={16} color="white" />
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

        {/* Reporter Types Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Reporter Types
            </h2>
            
            {reporterTypesData.map((reporter, index) => (
              <div key={index} className="animate-in" style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  {reporter.title}
                </h3>
                <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                  {reporter.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reporter.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '6px',
                        borderLeft: '3px solid #008080'
                      }}
                    >
                      <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{feature.name}:</span>
                      <span style={{ color: '#666', fontSize: '.9rem', marginLeft: '5px' }}>{feature.desc}</span>
                    </div>
                  ))}
                </div>
                
                {reporter.note && (
                  <p style={{ color: '#008080', fontSize: '.9rem', fontStyle: 'italic', marginTop: '15px' }}>
                    {reporter.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Fluorescent Protein Table Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Fluorescent Protein Options
            </h2>
            
            <div className="animate-in" style={{ overflowX: 'auto', marginBottom: '50px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Reporter</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Color</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Excitation/Emission</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {fluorescentProteinTable.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.reporter}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.color}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.excitation}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Reporter Comparison
            </h3>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Factor</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>LacZ</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Fluorescent Protein</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Luciferase</th>
                  </tr>
                </thead>
                <tbody>
                  {reporterComparisonTable.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.factor}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.lacZ}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.fluorescent}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.luciferase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Reporter Knockin Designs Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Reporter Knockin Designs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knockinDesignTypes.map((design, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '25px',
                    borderRadius: '8px',
                    borderLeft: '4px solid white'
                  }}
                >
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {design.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {design.points.map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                        <IconCheckCircle size={14} color="white" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
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
                    borderTop: '4px solid #008080'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {app.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                    {app.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {app.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#666', fontSize: '.85rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {app.link && (
                    <Link 
                      href={app.link}
                      className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                      style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                    >
                      <span>Learn more</span>
                      <IconChevronRight size={14} color="#008080" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Considerations Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Technical Considerations
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {technicalConsiderations.map((consideration, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #008080'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', fontWeight: 600, marginBottom: '10px' }}>
                    {consideration.title}
                  </h3>
                  {consideration.description && (
                    <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                      {consideration.description}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {consideration.items.map((item, idx) => (
                      <div key={idx} style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '6px' }}>
                        <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                        <span style={{ color: '#666', fontSize: '.85rem', marginLeft: '5px' }}>{item.desc}</span>
                      </div>
                    ))}
                  </div>
                  {consideration.link && (
                    <Link 
                      href={consideration.link}
                      className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                      style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
                    >
                      <span>Learn more</span>
                      <IconChevronRight size={16} color="#008080" />
                    </Link>
                  )}
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
              Reporter knockin models generated by ingenious targeting laboratory:
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {publicationsData.map((pub, index) => (
                <div
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
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
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '30px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px' }} />
                  <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.9rem', fontWeight: 400, lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px', flex: 1 }}>&ldquo;{testimonial.quote}&rdquo;</p>
                  <div style={{ marginTop: 'auto' }}>
                    <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonial.name}</p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem', fontWeight: 400 }}>{testimonial.affiliation}</p>
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
              Start Your Reporter Knockin Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your reporter requirements and optimal design for your research goals. Initial consultation is provided at no charge and includes reporter selection, allele design options, timeline, and price estimate.
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

        {/* Downloadable Resources Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Reporter Resources"
              description="Download our free guide to enhance your model with reporter functionality."
              resources={reporterResources}
              variant="card"
            />
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

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Reporter Technology Insights"
              description="Discover the latest in reporter gene technology, expression analysis strategies, and innovative applications for knockin reporters. Expert guidance delivered biweekly."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Applications
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedApplications.map((link, index) => (
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
            "name": "Reporter Knockin Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom reporter knockin mouse models for gene expression analysis. LacZ, fluorescent protein, and luciferase reporters at endogenous loci. Since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
