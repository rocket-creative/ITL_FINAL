'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconShield } from '@/components/UXUIDC/Icons';
import { GlossaryTermLink, BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Checkpoint Humanization & Tumor Immunity",
  title: "Immuno-Oncology Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported immuno-oncology researchers with custom mouse models contributing to peer reviewed publications in Cancer Research, Nature Medicine, Immunity, and leading oncology journals worldwide.",
  description: "Immuno oncology mouse models enable researchers to investigate the complex interactions between tumors and the immune system, from T cell exhaustion and checkpoint regulation to tumor microenvironment dynamics. Humanized immune checkpoint models express human versions of PD1, PDL1, CTLA4, and other targets, allowing direct testing of clinical antibody candidates in immunocompetent mice."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Checkpoint Targets Table
const checkpointTargets = [
  { target: "PD1 (PDCD1)", function: "T cell inhibitory receptor", applications: "Anti PD1 antibody efficacy" },
  { target: "PDL1 (CD274)", function: "PD1 ligand on tumor/immune cells", applications: "Anti PDL1 antibody efficacy" },
  { target: "CTLA4", function: "T cell inhibitory receptor", applications: "Anti CTLA4 efficacy, combinations" },
  { target: "LAG3", function: "T cell exhaustion marker", applications: "LAG3 inhibitor evaluation" },
  { target: "TIM3 (HAVCR2)", function: "T cell exhaustion marker", applications: "TIM3 pathway studies" },
  { target: "TIGIT", function: "NK and T cell inhibitory receptor", applications: "TIGIT inhibitor development" },
  { target: "GITR", function: "Costimulatory receptor", applications: "Agonist antibody evaluation" },
  { target: "OX40", function: "Costimulatory receptor", applications: "Agonist antibody evaluation" },
  { target: "4-1BB (CD137)", function: "Costimulatory receptor", applications: "Agonist antibody evaluation" }
];

// Syngeneic Tumor Lines
const syngeneicTumorLines = [
  { cellLine: "MC38", tumorType: "Colon carcinoma", background: "C57BL/6", applications: "Checkpoint inhibitor efficacy" },
  { cellLine: "CT26", tumorType: "Colon carcinoma", background: "BALB/c", applications: "Immunotherapy combinations" },
  { cellLine: "B16", tumorType: "Melanoma", background: "C57BL/6", applications: "Immunotherapy, checkpoint studies" },
  { cellLine: "LLC", tumorType: "Lung carcinoma", background: "C57BL/6", applications: "Metastasis, immunotherapy" },
  { cellLine: "4T1", tumorType: "Breast carcinoma", background: "BALB/c", applications: "Metastatic disease, immunotherapy" },
  { cellLine: "EMT6", tumorType: "Breast carcinoma", background: "BALB/c", applications: "Immunotherapy response" }
];

// Why Humanize Benefits
const humanizeBenefits = [
  "Direct testing of clinical antibody candidates",
  "Evaluation of antibody effector functions",
  "Combination therapy optimization",
  "Biomarker development and validation",
  "Pharmacokinetic and pharmacodynamic studies"
];

// Humanization Options
const humanizationOptions = [
  { name: "Single humanization", desc: "One checkpoint target humanized for monotherapy studies" },
  { name: "Dual humanization", desc: "Two checkpoints humanized (e.g., PD1 + CTLA4) for combination studies" },
  { name: "Multi target", desc: "Three or more checkpoints for complex combination evaluation" }
];

// Tumor Suppressor Knockouts
const tumorSuppressors = [
  { name: "p53 conditional knockout", desc: "Spontaneous tumor development in specific tissues" },
  { name: "PTEN conditional knockout", desc: "PI3K pathway activation, various tumor types" },
  { name: "APC conditional knockout", desc: "Intestinal tumor models" },
  { name: "Rb conditional knockout", desc: "Cell cycle dysregulation" }
];

// Oncogene Activation
const oncogeneActivation = [
  { name: "KRAS G12D knockin", desc: "Lung and pancreatic tumor models" },
  { name: "BRAF V600E knockin", desc: "Melanoma and other tumor types" },
  { name: "MYC overexpression", desc: "Various tumor types" },
  { name: "Fusion oncogenes", desc: "Chromosomal translocation models" }
];

// Model Types
const modelTypes = [
  {
    title: "Humanized Knockin Models",
    description: "Humanized checkpoint knockins replace mouse genes with human orthologs at the endogenous locus:",
    items: ["Physiological expression levels", "Normal tissue distribution", "Endogenous regulatory control", "Maintained immune system function"],
    link: "/humanized-mouse-models"
  },
  {
    title: "Conditional Knockout Models",
    description: "Conditional knockouts enable tissue specific or temporal gene manipulation:",
    items: ["Immune cell specific deletions (T cell, B cell, myeloid)", "Tumor cell specific deletions", "Inducible knockouts modeling therapeutic intervention", "Target validation through genetic ablation"],
    link: "/conditional-knockout-mouse-models"
  },
  {
    title: "Reporter Models",
    description: "Reporter knockins enable visualization and tracking of immune cells:",
    items: ["Fluorescent reporters for immune cell tracking", "Luciferase reporters for in vivo imaging", "Lineage tracing of tumor infiltrating lymphocytes", "Real time monitoring of immune activation"],
    link: "/reporter-knockin"
  }
];

// Research Applications
const researchApplications = [
  {
    category: "Therapeutic Antibody Development",
    items: ["Anti checkpoint antibody efficacy testing", "Agonist antibody evaluation", "Antibody effector function studies", "Combination therapy optimization", "Dose response and scheduling studies"]
  },
  {
    category: "Mechanism of Action Studies",
    items: ["T cell exhaustion and reinvigoration", "Tumor microenvironment dynamics", "Resistance mechanism identification", "Biomarker discovery and validation"]
  },
  {
    category: "Combination Immunotherapy",
    items: ["Checkpoint combinations (PD1 + CTLA4)", "Checkpoint plus chemotherapy", "Checkpoint plus targeted therapy", "Checkpoint plus radiation"]
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
    authors: "Clausen BE et al.",
    year: "1999",
    title: "Conditional gene targeting in macrophages and granulocytes using LysMcre mice.",
    journal: "Transgenic Research",
    volume: "8(4): 265-277",
    link: "https://pubmed.ncbi.nlm.nih.gov/10621974/"
  },
  {
    authors: "Chakrabarti S et al.",
    year: "2024",
    title: "Touch sensation requires the mechanically gated ion channel ELKIN1.",
    journal: "Science",
    volume: "383(6686): 992-998",
    link: "https://pubmed.ncbi.nlm.nih.gov/38422143/"
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const maxsonTestimonial = getTestimonialById('maxson-ohsu')!;

const testimonials = [
  { quote: maxsonTestimonial.quote, name: formatAuthorWithCredentials(maxsonTestimonial), affiliation: maxsonTestimonial.affiliation },
];

// Related Links
const checkpointModels = [
  { title: "PD1 Humanized Mice", href: "/pd1-humanized-mice" },
  { title: "PDL1 Humanized Mice", href: "/pdl1-humanized-mice" },
  { title: "CTLA4 Humanized Mice", href: "/ctla4-humanized-mice" },
  { title: "LAG3 Humanized Mice", href: "/lag3-humanized-mice" }
];

const relatedOncologyModels = [
  { title: "Oncology Mouse Models", href: "/oncology-mouse-models" },
  { title: "Tumor Suppressor Knockout Mice", href: "/tumor-suppressor-knockout-mice" },
  { title: "Syngeneic Tumor Models", href: "/syngeneic-tumor-models" }
];

const relatedModelTypes = [
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
];

// FAQ Data
const getFaqData = () => [
  {
    question: "Why do I need humanized checkpoint models for immunotherapy testing?",
    answer: (
      <>
        Most checkpoint inhibitor antibodies target human proteins and do not cross-react with mouse orthologs. <GlossaryTermLink term="humanized-immune-checkpoint">Humanized checkpoint models</GlossaryTermLink> express human PD1, PDL1, CTLA4, or other targets, enabling efficacy testing of clinical antibodies in immunocompetent mice with functional immune systems. This is essential for preclinical immunotherapy development.
      </>
    )
  },
  {
    question: "What is the difference between single and dual checkpoint humanization?",
    answer: (
      <>
        <GlossaryTermLink term="single-vs-double-humanized-targets">Single checkpoint models</GlossaryTermLink> (e.g., PD1 humanized) enable testing of monotherapy antibodies. <GlossaryTermLink term="single-vs-double-humanized-targets">Dual checkpoint models</GlossaryTermLink> (e.g., PD1/CTLA4 humanized) enable testing of combination immunotherapy, which is increasingly important in clinical practice. Dual humanization requires combining multiple humanized alleles through <GlossaryTermLink term="breeding-scheme">breeding</GlossaryTermLink>.
      </>
    )
  },
  {
    question: "Can I use humanized checkpoint models with syngeneic tumors?",
    answer: "Yes. Humanized checkpoint models on C57BL/6 or BALB/c backgrounds are compatible with syngeneic tumor lines (MC38, B16, CT26, 4T1). This enables testing of checkpoint inhibitors in immunocompetent mice with functional immune systems, providing more physiologically relevant data than immunodeficient models."
  },
  {
    question: "How do genetically engineered mouse models (GEMMs) compare to syngeneic tumor models for immuno-oncology?",
    answer: (
      <>
        GEMMs develop tumors spontaneously from defined genetic alterations and better recapitulate tumor evolution and microenvironment. Syngeneic models involve injecting established tumor cell lines and are faster for screening studies. Both approaches have value: GEMMs for mechanism studies and <GlossaryTermLink term="translational-relevance-disease-modeling">disease modeling</GlossaryTermLink>, syngeneic models for rapid immunotherapy screening.
      </>
    )
  },
  {
    question: "What strain background should I use for immuno-oncology studies?",
    answer: (
      <>
        C57BL/6 is most common for Th1-biased immune responses and compatibility with MC38 and B16 syngeneic tumors. BALB/c is preferred for Th2-biased responses and CT26/4T1 tumors. Strain selection affects immune <GlossaryTermLink term="allele-genotype-phenotype">phenotype</GlossaryTermLink> and tumor growth, so choose based on your experimental requirements and syngeneic tumor compatibility.
      </>
    )
  }
];

export default function ImmunoOncologyMouseModelsPage() {
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
              <IconShield size={16} color="white" />
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

        {/* Why Humanize Checkpoints */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Humanized Immune Checkpoint Models
            </h2>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
              Why Humanize Checkpoints
            </h3>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              Many therapeutic antibodies targeting immune checkpoints are designed specifically for human proteins and show limited or no cross reactivity with mouse orthologs. Humanized checkpoint models express human versions of these targets, enabling:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {humanizeBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px 20px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <IconCheckCircle size={18} color="#008080" style={{ flexShrink: 0 }} />
                  <span style={{ color: '#555', fontSize: '.9rem' }}>{benefit}</span>
                </div>
              ))}
            </div>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
              Single vs Dual Humanization
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {humanizationOptions.map((option, index) => (
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
                  <h4 style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '8px' }}>
                    {option.name}
                  </h4>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                    {option.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Checkpoint Targets Table */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              Available Checkpoint Targets
            </h2>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Function</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Therapeutic Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {checkpointTargets.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.target}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.function}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Genetic Tumor Models */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Genetic Tumor Models
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Tumor Suppressor Knockouts
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', marginBottom: '20px' }}>
                  Conditional knockout of tumor suppressors enables controlled tumor development in immunocompetent hosts:
                </p>
                <div className="space-y-3">
                  {tumorSuppressors.map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '12px 15px',
                        borderRadius: '6px'
                      }}
                    >
                      <span style={{ color: 'white', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="animate-in">
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Oncogene Activation Models
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', marginBottom: '20px' }}>
                  Conditional expression of activated oncogenes enables controlled tumor initiation:
                </p>
                <div className="space-y-3">
                  {oncogeneActivation.map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '12px 15px',
                        borderRadius: '6px'
                      }}
                    >
                      <span style={{ color: 'white', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="animate-in" style={{ marginTop: '30px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                Combining Genetic Models with Checkpoint Humanization
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                Genetic tumor models can be combined with humanized checkpoint alleles to create sophisticated platforms for immunotherapy evaluation: autochthonous tumors in checkpoint humanized hosts, spontaneous tumor development with human checkpoint targets, and physiologically relevant tumor microenvironment.
              </p>
            </div>
          </div>
        </section>

        {/* Syngeneic Tumor Models Table */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Syngeneic Tumor Models
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              Syngeneic tumor cells transplanted into checkpoint humanized mice enable rapid evaluation of clinical antibody candidates:
            </p>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cell Line</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Tumor Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Background</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Common Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {syngeneicTumorLines.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.cellLine}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.tumorType}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.background}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Model Types for IO */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Model Types for Immuno-Oncology
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modelTypes.map((model, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {model.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    {model.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                    {model.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#666', fontSize: '.85rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={model.link}
                    className="inline-flex items-center gap-2 transition-colors duration-300"
                    style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                  >
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#008080" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Applications */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Research Applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchApplications.map((app, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {app.category}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {app.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#555', fontSize: '.85rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
              Models generated by ingenious targeting laboratory have supported immuno oncology research:
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
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: testimonials.length === 1 ? '48px 56px' : '30px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}>
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px', ...(testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : {}) }} />
                  <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: testimonials.length === 1 ? '1.1rem' : '.9rem', fontWeight: 400, lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px', flex: testimonials.length > 1 ? 1 : undefined }}>&ldquo;{testimonial.quote}&rdquo;</p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
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
              Start Your Immuno-Oncology Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your immuno oncology research requirements and recommend the optimal model design for your therapeutic program. Initial consultation is provided at no charge and includes target analysis, checkpoint humanization strategy, and timeline estimates.
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
        <BreedingSchemeArchitectCTA />

        {/* FAQ Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={getFaqData()} />
            </div>
          </div>
        </section>

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup title="Immuno-Oncology Research Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Immune Checkpoint Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {checkpointModels.map((link, index) => (
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
                  {relatedOncologyModels.map((link, index) => (
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
      </main>
      
      <UXUIDCFooter />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Immuno-Oncology Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom immuno-oncology mouse models for cancer immunotherapy research. Humanized PD1, PDL1, CTLA4, and checkpoint combination models.",
            "serviceType": "Immuno-Oncology Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
