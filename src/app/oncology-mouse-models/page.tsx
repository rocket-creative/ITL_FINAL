'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconTarget, IconFlask, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { LabSignalsSignup, getRelatedLabSignalsArticles, BreedingSchemeArchitectCTA } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Cancer Research",
  title: "Oncology Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported oncology researchers with custom mouse models contributing to peer reviewed publications in Cancer Cell, Cancer Research, Nature Medicine, and leading oncology journals worldwide.",
  description: "Our oncology mouse models have advanced understanding of tumor biology, cancer genetics, and therapeutic response across solid tumors and hematological malignancies."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Intro Data
const introData = {
  text: "Oncology mouse models enable researchers to investigate the genetic drivers of cancer, study tumor microenvironment interactions, and evaluate therapeutic approaches in immunocompetent systems. From conditional tumor suppressor knockouts that initiate tissue specific tumors to oncogene knockins expressing driver mutations at physiological levels, the right model design is critical for understanding cancer biology and developing effective treatments.",
  highlight: "Genetically engineered mouse models (GEMMs) provide advantages over transplantation models by recapitulating tumor initiation, progression, and microenvironment interactions in their native context."
};

// Tumor Suppressor Data
const tumorSuppressorData = {
  title: "Tumor Suppressor Models",
  sections: [
    {
      title: "Conditional Tumor Suppressor Knockouts",
      description: "Conditional deletion of tumor suppressors enables controlled tumor initiation in specific tissues:",
      note: "Conditional approaches prevent embryonic lethality and enable tissue specific tumor initiation that models human cancer development."
    },
    {
      title: "Combinatorial Tumor Models",
      description: "Cancer often requires multiple genetic hits. Combining tumor suppressor deletions accelerates tumor development and better models human cancer genetics:",
      combinations: [
        { genes: "Trp53 + Rb1", cancer: "Small cell lung cancer, osteosarcoma" },
        { genes: "Trp53 + Pten", cancer: "Prostate cancer, breast cancer" },
        { genes: "Apc + Trp53", cancer: "Aggressive colorectal cancer" },
        { genes: "Kras + Trp53", cancer: "Pancreatic, lung cancer" }
      ]
    }
  ]
};

// Tumor Suppressor Table
const tumorSuppressorTable = [
  { gene: "Trp53", function: "Cell cycle, apoptosis", tumors: "Multiple tumor types", creDrivers: "Tissue dependent" },
  { gene: "Rb1", function: "Cell cycle", tumors: "Retinoblastoma, SCLC", creDrivers: "Tissue dependent" },
  { gene: "Pten", function: "PI3K pathway", tumors: "Prostate, breast, brain", creDrivers: "Probasin, MMTV, Nestin" },
  { gene: "Apc", function: "Wnt pathway", tumors: "Colorectal, intestinal", creDrivers: "Villin, CDX2" },
  { gene: "Brca1/2", function: "DNA repair", tumors: "Breast, ovarian", creDrivers: "MMTV, K14" },
  { gene: "Nf1", function: "Ras pathway", tumors: "Neurofibroma, MPNST", creDrivers: "Tissue dependent" },
  { gene: "Nf2", function: "Hippo pathway", tumors: "Mesothelioma, schwannoma", creDrivers: "Tissue dependent" },
  { gene: "Smad4", function: "TGFβ pathway", tumors: "Pancreatic, colorectal", creDrivers: "Pdx1, Villin" }
];

// Oncogene Table
const oncogeneTable = [
  { gene: "Kras", mutation: "G12D, G12V, G12C", cancers: "Lung, pancreatic, colorectal", strategy: "LSL Cre dependent" },
  { gene: "Braf", mutation: "V600E", cancers: "Melanoma, thyroid, colorectal", strategy: "LSL Cre dependent" },
  { gene: "Egfr", mutation: "L858R, exon 19 del", cancers: "Lung adenocarcinoma", strategy: "Conditional expression" },
  { gene: "Pik3ca", mutation: "H1047R, E545K", cancers: "Breast, colorectal", strategy: "Conditional expression" },
  { gene: "Myc", mutation: "Overexpression", cancers: "Lymphoma, multiple types", strategy: "Tet regulatable" },
  { gene: "Her2/Neu", mutation: "Activated", cancers: "Breast cancer", strategy: "MMTV driven" }
];

// Cancer Type Data
const cancerTypeData = [
  {
    title: "Lung Cancer",
    subtitle: "Models for NSCLC and SCLC",
    models: [
      { name: "Kras LSL G12D", description: "Lung adenocarcinoma with SPC Cre or Ad Cre" },
      { name: "Kras G12D + Trp53", description: "Aggressive lung adenocarcinoma" },
      { name: "EGFR mutant knockin", description: "TKI sensitive and resistant models" },
      { name: "Trp53 + Rb1", description: "Small cell lung cancer" }
    ]
  },
  {
    title: "Breast Cancer",
    subtitle: "Models for different breast cancer subtypes",
    models: [
      { name: "MMTV PyMT", description: "Luminal breast cancer model" },
      { name: "Brca1/2 conditional knockout", description: "BRCA mutant breast cancer" },
      { name: "Her2 overexpression", description: "HER2 positive breast cancer" },
      { name: "Trp53 + Pten", description: "Triple negative breast cancer model" }
    ]
  },
  {
    title: "Pancreatic Cancer",
    subtitle: "Models for pancreatic ductal adenocarcinoma",
    models: [
      { name: "KPC (Kras G12D + Trp53)", description: "Standard PDAC model with Pdx1 Cre" },
      { name: "Kras G12D alone", description: "PanIN progression model" },
      { name: "Smad4 conditional knockout", description: "TGFβ pathway in PDAC" }
    ]
  },
  {
    title: "Colorectal Cancer",
    subtitle: "Models for intestinal and colorectal cancer",
    models: [
      { name: "Apc Min", description: "Germline Apc mutation, intestinal adenomas" },
      { name: "Apc conditional knockout", description: "Controlled adenoma initiation" },
      { name: "Apc + Kras + Trp53", description: "Invasive colorectal cancer" }
    ]
  },
  {
    title: "Hematological Malignancies",
    subtitle: "Models for leukemia and lymphoma",
    models: [
      { name: "MLL fusion knockins", description: "Mixed lineage leukemia" },
      { name: "BCR ABL knockin", description: "CML model" },
      { name: "Myc overexpression", description: "Lymphoma models" },
      { name: "Conditional knockouts", description: "CD19 Cre, Vav Cre for hematopoietic lineages" }
    ]
  }
];

// Immuno-Oncology Data
const immunoOncologyData = {
  title: "Immuno Oncology Applications",
  sections: [
    {
      title: "Syngeneic Compatibility",
      description: "GEMMs on defined strain backgrounds enable immunotherapy studies:",
      points: [
        "Tumors arise in immunocompetent hosts",
        "Native tumor microenvironment development",
        "Checkpoint inhibitor efficacy studies",
        "Combination immunotherapy evaluation"
      ]
    },
    {
      title: "Checkpoint Humanization",
      description: "Humanized checkpoint models enable testing of clinical antibodies:",
      points: [
        "Combine humanized checkpoints with genetic tumor models",
        "Test anti PD1, anti PDL1, anti CTLA4 in autochthonous tumors",
        "Evaluate combination approaches"
      ]
    }
  ]
};

// Research Applications Data
const researchApplicationsData = [
  {
    title: "Tumor Biology",
    items: ["Tumor initiation and progression", "Metastasis mechanisms", "Tumor microenvironment interactions", "Cancer stem cell biology"]
  },
  {
    title: "Target Validation",
    items: ["Genetic validation of therapeutic targets", "Resistance mechanism identification", "Synthetic lethality studies", "Biomarker discovery"]
  },
  {
    title: "Therapeutic Development",
    items: ["Targeted therapy efficacy", "Immunotherapy response", "Combination therapy optimization", "Drug resistance modeling"]
  }
];

// Technical Considerations Data
const technicalData = [
  {
    icon: IconTarget,
    title: "Cre Driver Selection",
    description: "Tissue specific Cre drivers determine tumor location:",
    points: ["Match Cre driver to desired tumor site", "Consider timing of Cre expression", "Evaluate penetrance and specificity", "Inducible Cre enables controlled tumor initiation"]
  },
  {
    icon: IconDNA,
    title: "Strain Background",
    description: "Strain background affects tumor biology and immunotherapy response:",
    strains: [
      { name: "C57BL/6", desc: "Th1 biased, compatible with MC38, B16" },
      { name: "BALB/c", desc: "Th2 biased, compatible with CT26, 4T1" },
      { name: "FVB", desc: "Common for transgenic tumor models" },
      { name: "Mixed backgrounds", desc: "May be required for certain combinations" }
    ]
  }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Mlynarczyk C et al.",
    year: "2023",
    title: "BTG1 mutation yields supercompetitive B cells primed for malignant transformation.",
    journal: "Science",
    volume: "379(6629): eabj0412",
    link: "https://pubmed.ncbi.nlm.nih.gov/36656933/"
  },
  {
    authors: "Chakrabarti S et al.",
    year: "2024",
    title: "Touch sensation requires the mechanically gated ion channel ELKIN1.",
    journal: "Science",
    volume: "383(6686): 992-998",
    link: "https://pubmed.ncbi.nlm.nih.gov/38422143/"
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

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const maxsonTestimonial = getTestimonialById('maxson-ohsu')!;

const testimonials = [
  { quote: maxsonTestimonial.quote, name: formatAuthorWithCredentials(maxsonTestimonial), affiliation: maxsonTestimonial.affiliation },
];

// Related Links
const cancerTypeLinks = [
  { title: "Lung Cancer Mouse Models", href: "/lung-cancer-mouse-models" },
  { title: "Breast Cancer Mouse Models", href: "/breast-cancer-mouse-models" },
  { title: "Pancreatic Cancer Mouse Models", href: "/pancreatic-cancer-mouse-models" },
  { title: "Colorectal Cancer Mouse Models", href: "/colorectal-cancer-mouse-models" }
];

const relatedOncologyLinks = [
  { title: "Immuno Oncology Mouse Models", href: "/immuno-oncology-mouse-models" },
  { title: "Tumor Suppressor Knockout Mice", href: "/tumor-suppressor-knockout-mice" },
  { title: "Syngeneic Tumor Models", href: "/syngeneic-tumor-models" }
];

const relatedModelTypes = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

const projectResources = [
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "FAQs", href: "/faqs" }
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between a tumor suppressor knockout and an oncogene knockin?",
    answer: "A tumor suppressor knockout eliminates a gene that normally prevents tumor formation (e.g., p53, PTEN). An oncogene knockin introduces an activating mutation that promotes tumor development (e.g., KRAS G12D, BRAF V600E). Both approaches model different aspects of cancer biology and can be combined in the same mouse."
  },
  {
    question: "Can I use conditional alleles for cancer modeling?",
    answer: "Yes. Conditional alleles are essential for many cancer models because tumor suppressor genes often cause embryonic lethality when deleted globally. Tissue-specific conditional knockout using Cre drivers enables tumor formation in specific organs while avoiding developmental defects."
  },
  {
    question: "What Cre drivers are commonly used for oncology models?",
    answer: "Common Cre drivers include tissue-specific promoters (e.g., Albumin-Cre for liver, Kras-Cre for pancreas, MMTV-Cre for mammary gland) and inducible Cre systems (e.g., CreERT2 with tamoxifen) for temporal control of tumor initiation. Selection depends on your target tissue and experimental design."
  },
  {
    question: "How do I choose between syngeneic tumor models and genetically engineered mouse models (GEMM)?",
    answer: "Syngeneic models involve injecting tumor cell lines into immunocompetent mice and are faster for immunotherapy studies. GEMMs develop tumors spontaneously from defined genetic alterations and better recapitulate tumor evolution and microenvironment. GEMMs require longer timelines but provide more physiologically relevant models."
  },
  {
    question: "What strain background should I use for oncology models?",
    answer: "C57BL/6 is most common for immuno-oncology studies and is compatible with MC38 and B16 syngeneic tumors. BALB/c is used for CT26 and 4T1 tumors. Strain selection affects immune response and tumor growth characteristics, so choose based on your experimental requirements."
  }
];

export default function OncologyMouseModelsPage() {
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
              <IconFlask size={16} color="white" />
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
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
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

        {/* Introduction Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="animate-in" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '20px' }}>
              {introData.text}
            </p>
            <p className="animate-in" style={{ color: '#008080', fontSize: '1rem', lineHeight: '1.8rem', fontWeight: 500 }}>
              {introData.highlight}
            </p>
          </div>
        </section>

        {/* Tumor Suppressor Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              {tumorSuppressorData.title}
            </h2>
            
            {tumorSuppressorData.sections.map((section, index) => (
              <div key={index} className="animate-in" style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  {section.title}
                </h3>
                <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '15px' }}>
                  {section.description}
                </p>
                {section.note && (
                  <p style={{ color: '#008080', fontSize: '.9rem', fontStyle: 'italic' }}>
                    {section.note}
                  </p>
                )}
                {section.combinations && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {section.combinations.map((combo, idx) => (
                      <div key={idx} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', borderLeft: '3px solid #008080' }}>
                        <span style={{ color: '#0a253c', fontWeight: 600 }}>{combo.genes}:</span>
                        <span style={{ color: '#666', marginLeft: '8px' }}>{combo.cancer}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link 
              href="/conditional-knockout-mouse-models"
              className="inline-flex items-center gap-2 transition-colors duration-300"
              style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
            >
              <span>Learn more about conditional knockouts</span>
              <IconChevronRight size={16} color="#008080" />
            </Link>
          </div>
        </section>

        {/* Tumor Suppressor Table */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 600, marginBottom: '25px' }}>
              Common Tumor Suppressor Targets
            </h3>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Gene</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Function</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Tumor Types</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Common Cre Drivers</th>
                  </tr>
                </thead>
                <tbody>
                  {tumorSuppressorTable.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.gene}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.function}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.tumors}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.creDrivers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Oncogene Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Oncogene Models
            </h2>
            
            <div className="animate-in" style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Conditional Oncogene Knockins
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Knockin of activated oncogenes at endogenous loci provides physiological expression.
              </p>
              
              <h4 style={{ color: '#0a253c', fontWeight: 600, marginBottom: '10px' }}>LSL (Lox Stop Lox) System</h4>
              <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>The LSL system enables conditional oncogene activation:</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {["Oncogene preceded by LoxP flanked transcriptional stop cassette", "Gene silent until Cre removes stop cassette", "Enables tissue specific and temporal oncogene activation", "Widely used for Kras, Braf, and other oncogene models"].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#666', fontSize: '.9rem' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Gene</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Mutation</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cancer Types</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Activation Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {oncogeneTable.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.gene}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.mutation}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.cancers}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Cancer Type Specific Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              Cancer Type Specific Models
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cancerTypeData.map((cancer, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '5px' }}>
                    {cancer.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.85rem', marginBottom: '15px' }}>
                    {cancer.subtitle}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cancer.models.map((model, idx) => (
                      <li key={idx} style={{ marginBottom: '10px' }}>
                        <span style={{ color: '#008080', fontWeight: 500, fontSize: '.85rem' }}>{model.name}:</span>
                        <span style={{ color: '#666', fontSize: '.85rem', marginLeft: '5px' }}>{model.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Immuno-Oncology Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              {immunoOncologyData.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {immunoOncologyData.sections.map((section, index) => (
                <div key={index} className="animate-in">
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                    {section.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    {section.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {section.points.map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '.9rem' }}>
                        <IconCheckCircle size={16} color="white" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="animate-in text-center" style={{ marginTop: '30px' }}>
              <Link 
                href="/immuno-oncology-mouse-models"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '12px 30px',
                  borderRadius: '4px',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <span>Explore Immuno-Oncology Models</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Research Applications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              Research Applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchApplicationsData.map((app, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {app.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {app.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#666', fontSize: '.9rem' }}>
                        <IconCheckCircle size={14} color="#008080" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Considerations Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              Technical Considerations
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {technicalData.map((item, index) => {
                const IconComponent = item.icon;
                return (
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
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,128,128,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={24} color="#008080" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', fontWeight: 600, marginBottom: '10px' }}>
                          {item.title}
                        </h3>
                        <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                          {item.description}
                        </p>
                        {item.points && (
                          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                            {item.points.map((point, idx) => (
                              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '.85rem' }}>
                                <IconCheckCircle size={14} color="#008080" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.strains && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            {item.strains.map((strain, idx) => (
                              <div key={idx} style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '6px' }}>
                                <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem' }}>{strain.name}:</span>
                                <span style={{ color: '#666', fontSize: '.85rem', marginLeft: '5px' }}>{strain.desc}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="animate-in flex flex-wrap gap-4 mt-6">
              <Link 
                href="/tissue-specific-cre-lines"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>View Cre Driver Lines</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link 
                href="/c57bl6-mouse-background"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn about Strain Backgrounds</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Oncology models generated by ingenious targeting laboratory:
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
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div
              className="animate-in"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <p style={{
                color: '#666',
                fontFamily: 'Lato, sans-serif',
                fontSize: '1.05rem',
                fontWeight: 400,
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '25px',
              }}>
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>
                — {testimonials[0].name}
              </p>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.85rem', fontWeight: 400 }}>
                {testimonials[0].affiliation}
              </p>
            </div>
            <div className="animate-in" style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Read more testimonials</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Oncology Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your oncology research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge and includes gene analysis, Cre driver recommendations, and timeline estimates.
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
                href="/request-quote"
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

        {/* Lab Signals Newsletter Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Breakthroughs in Cancer Research"
              description="Subscribe to Lab Signals for the latest on immunotherapy innovations, tumor model design, and oncology research insights from our PhD scientists."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/oncology-mouse-models')}
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
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Cancer Type Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cancerTypeLinks.map((link, index) => (
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
                  Related Oncology Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedOncologyLinks.map((link, index) => (
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
                  Project Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {projectResources.map((link, index) => (
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
            "name": "Oncology Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom oncology mouse models for cancer research. Tumor suppressor knockouts, oncogene knockins, and genetically engineered cancer models. Since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
