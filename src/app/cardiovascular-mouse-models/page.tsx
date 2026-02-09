'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconSettings, IconQuote, IconChevronRight, IconCheckCircle, IconHeart } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Heart & Vascular Research",
  title: "Cardiovascular Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported cardiovascular research with custom mouse models enabling mechanistic studies of atherosclerosis, heart failure, hypertension, and other cardiovascular diseases that represent leading causes of morbidity and mortality worldwide.",
  description: "Cardiovascular mouse models provide essential platforms for investigating the molecular mechanisms underlying vascular disease, testing hypotheses about lipid metabolism and inflammation, and developing therapies targeting cardiovascular risk factors and disease pathways."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Challenge Data - Species Considerations
const speciesConsiderationsData = [
  {
    title: "Lipid Metabolism",
    description: "Mice carry most cholesterol in HDL rather than LDL, making them naturally resistant to atherosclerosis. Genetic modifications disrupting ApoE or LDLR function are typically required to create hypercholesterolemia and vascular disease."
  },
  {
    title: "Heart Rate and Size",
    description: "Mouse hearts beat approximately 600 times per minute compared to 60 to 100 in humans. Cardiac remodeling processes may differ due to these physiological differences."
  },
  {
    title: "Coronary Anatomy",
    description: "Mouse coronary arteries are small and follow different branching patterns than human coronaries. Spontaneous coronary atherosclerosis is rare even in hyperlipidemic models."
  }
];

// Model System Approaches
const modelSystemApproaches = [
  {
    title: "Atherosclerosis Studies",
    description: "Hyperlipidemic backgrounds (ApoE knockout, LDLR knockout) combined with dietary or genetic modifications targeting specific pathways."
  },
  {
    title: "Heart Failure Studies",
    description: "Surgical interventions (TAC, MI), genetic cardiomyopathy models, or aging combined with metabolic stress."
  },
  {
    title: "Hypertension Studies",
    description: "Angiotensin system modifications, renal models, or genetic approaches targeting blood pressure regulatory pathways."
  }
];

// Atherosclerosis Models Data
const atherosclerosisModels = [
  {
    name: "ApoE Knockout",
    description: "The most widely used atherosclerosis model. ApoE deficiency causes severe hypercholesterolemia and spontaneous atherosclerosis that accelerates on Western diet. Lesions develop in the aortic root, brachiocephalic artery, and other large vessels."
  },
  {
    name: "LDLR Knockout",
    description: "LDL receptor deficiency requires Western diet to develop significant hypercholesterolemia and atherosclerosis. This model more closely resembles human familial hypercholesterolemia and is sensitive to dietary intervention."
  },
  {
    name: "ApoE/LDLR Double Knockout",
    description: "Combined deficiency produces more severe hyperlipidemia and accelerated atherosclerosis. Useful when aggressive lesion development is required."
  },
  {
    name: "Conditional Atherosclerosis Models",
    description: "Tissue specific or inducible deletion of atherosclerosis modifying genes on hyperlipidemic backgrounds enables dissection of cell type specific contributions to disease.",
    link: "/conditional-knockout-mouse-models"
  }
];

// Heart Failure Models Data
const heartFailureModels = [
  {
    name: "Sarcomeric Protein Mutations",
    description: "Knockin mice expressing mutations in MYH7, MYBPC3, TNNT2, and other sarcomeric genes model hypertrophic and dilated cardiomyopathies. These models enable study of mutation specific disease mechanisms and therapeutic testing."
  },
  {
    name: "Signaling Pathway Modifications",
    description: "Knockout or overexpression of genes in calcium handling, beta adrenergic signaling, or metabolic pathways produce cardiac phenotypes ranging from hypertrophy to heart failure."
  },
  {
    name: "Conditional Cardiac Models",
    description: "Cardiomyocyte specific Cre drivers (alphaMHC Cre, cTNT Cre) enable cardiac specific gene manipulation without systemic effects."
  }
];

// Hypertension Models Data
const hypertensionModels = [
  {
    name: "Renin Angiotensin System",
    description: "Knockout or overexpression of angiotensinogen, renin, ACE, or angiotensin receptors enables study of this central blood pressure regulatory system."
  },
  {
    name: "Renal Sodium Handling",
    description: "Modifications to ENaC, WNK kinases, and other renal sodium transporters affect blood pressure through volume regulation."
  },
  {
    name: "Vascular Tone Regulators",
    description: "eNOS knockout and other vascular modifying genes affect peripheral resistance and blood pressure."
  }
];

// Lipid Metabolism Models Data
const lipidMetabolismModels = [
  {
    name: "Lipoprotein Metabolism",
    description: "Knockout or humanization of apolipoproteins, lipoprotein receptors, and lipid transfer proteins enables study of cholesterol and triglyceride metabolism."
  },
  {
    name: "Hepatic Lipid Handling",
    description: "Liver specific knockouts of genes involved in lipid synthesis, storage, and export reveal hepatic contributions to systemic lipid levels."
  },
  {
    name: "Reverse Cholesterol Transport",
    description: "ABCA1, ABCG1, SR-BI, and other genes involved in HDL metabolism and cholesterol efflux influence atherosclerosis susceptibility."
  }
];

// Background Strain Data
const backgroundStrains = [
  { name: "C57BL/6", description: "Susceptible to atherosclerosis and diet induced metabolic dysfunction. The most common background for cardiovascular studies. However, C57BL/6J carries the Nnt mutation affecting glucose metabolism." },
  { name: "BALB/c", description: "Relatively resistant to atherosclerosis compared to C57BL/6. May be useful for studies requiring less aggressive disease progression." },
  { name: "DBA/2", description: "Distinct cardiac phenotypes and response to cardiac stress compared to C57BL/6. Consider for specific cardiac physiology studies." },
  { name: "129", description: "ES cell donor strains carry varying degrees of 129 background that can influence cardiovascular phenotypes. Backcrossing to pure backgrounds eliminates these effects." }
];

// Clinical Relevance Strategies
const clinicalStrategies = [
  { name: "Dietary Intervention", description: "Western diet (high fat, high cholesterol) accelerates atherosclerosis and metabolic dysfunction. Diet composition significantly affects phenotype severity." },
  { name: "Aging", description: "Many cardiovascular phenotypes require aging for full development. Plan studies with appropriate timelines for aged cohorts." },
  { name: "Combined Risk Factors", description: "Combining genetic modifications (e.g., hyperlipidemia plus hypertension) can produce more severe or clinically relevant phenotypes." },
  { name: "Sex as a Variable", description: "Cardiovascular disease incidence and mechanisms differ between sexes. Include both male and female cohorts and analyze sex specific effects." }
];

// Tissue Specific Cre Drivers
const tissueCreDrivers = [
  { driver: "alphaMHC Cre / cTNT Cre", target: "Cardiomyocytes", applications: "Heart specific studies" },
  { driver: "Tie2 Cre / VE Cadherin Cre / Cdh5 CreERT2", target: "Vascular Endothelium", applications: "Endothelial cells throughout vasculature" },
  { driver: "SM22 Cre / SMA Cre", target: "Vascular Smooth Muscle", applications: "Vessel wall biology" },
  { driver: "LysM Cre", target: "Myeloid Cells", applications: "Atherosclerosis and cardiac inflammation" },
  { driver: "Albumin Cre", target: "Hepatocytes", applications: "Liver lipoprotein metabolism" }
];

// Phenotyping - Atherosclerosis
const atherosclerosisPhenotyping = [
  { assay: "Lesion Quantification", description: "En face Oil Red O staining of aorta for total lesion area. Serial sectioning of aortic root for lesion size and composition." },
  { assay: "Lesion Composition", description: "Immunohistochemistry for macrophages (MOMA2, CD68), smooth muscle cells (SMA), collagen (Masson trichrome), and lipid content." },
  { assay: "Plasma Lipids", description: "Total cholesterol, triglycerides, HDL, and LDL quantification. Lipoprotein profiling by FPLC." },
  { assay: "Inflammatory Markers", description: "Circulating cytokines, chemokines, and inflammatory cell populations by flow cytometry." }
];

// Phenotyping - Cardiac Function
const cardiacPhenotyping = [
  { assay: "Echocardiography", description: "Non invasive assessment of ejection fraction, fractional shortening, wall thickness, and chamber dimensions." },
  { assay: "Hemodynamic Measurements", description: "Invasive pressure volume loop analysis for detailed assessment of systolic and diastolic function." },
  { assay: "ECG", description: "Rhythm assessment, conduction intervals, and arrhythmia detection." },
  { assay: "Exercise Testing", description: "Treadmill or voluntary running wheel assessment of exercise capacity and cardiac reserve." }
];

// Phenotyping - Vascular Function
const vascularPhenotyping = [
  { assay: "Wire Myography", description: "Isolated vessel ring preparations for assessment of vasoconstriction and endothelium dependent or independent relaxation." },
  { assay: "Blood Pressure", description: "Tail cuff plethysmography or telemetry for blood pressure measurement." },
  { assay: "Vascular Imaging", description: "Ultrasound assessment of vessel wall thickness and blood flow." }
];

// Complex Model Designs
const complexModelDesigns = [
  { name: "Conditional Deletion on Hyperlipidemic Background", description: "Floxed alleles crossed to ApoE or LDLR knockout backgrounds enable atherosclerosis studies with cell type specific gene deletion." },
  { name: "Inducible Cardiac Models", description: "Tamoxifen inducible cardiomyocyte Cre (alphaMHC CreERT2) enables temporal control of cardiac gene deletion, avoiding developmental effects." },
  { name: "Reporter Integration", description: "Fluorescent reporters in cardiomyocytes, endothelial cells, or smooth muscle enable lineage tracing and cell population identification." },
  { name: "Humanized Targets", description: "Human gene expression enables testing of therapeutic antibodies or compounds designed for human targets." }
];

// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Chen H et al.",
    year: "2025",
    title: "Novel Mouse Model of Coronary Atherosclerosis With Myocardial Infarction: Insights Into Human CAD.",
    journal: "Circulation Research",
    volume: "136(7): 679-692",
    link: "https://pubmed.ncbi.nlm.nih.gov/40485474/"
  },
  {
    authors: "Xiao Y et al.",
    year: "2025",
    title: "The innate immune receptor NLRX1 is a novel required modulator for mPTP opening: implications for cardioprotection.",
    journal: "Basic Research in Cardiology",
    volume: "120(4): 617-634",
    link: "https://pubmed.ncbi.nlm.nih.gov/40536683/"
  },
  {
    authors: "Meng Z et al.",
    year: "2024",
    title: "Adipose transplantation improves metabolism and atherosclerosis but not perivascular adipose tissue abnormality or vascular dysfunction in lipodystrophic Seipin null mice.",
    journal: "American Journal of Physiology Cell Physiology",
    volume: "326(5): C1356-C1368",
    link: "https://pubmed.ncbi.nlm.nih.gov/38525541/"
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const rateriTestimonial = getTestimonialById('rateri-kentucky')!;

const testimonials = [
  { quote: rateriTestimonial.quote, name: formatAuthorWithCredentials(rateriTestimonial), affiliation: rateriTestimonial.affiliation },
];

// Related Links
const relatedDiseaseLinks = [
  { title: "Metabolic Disease Mouse Models", href: "/metabolic-disease-mouse-models" },
  { title: "Diabetes Mouse Models", href: "/diabetes-mouse-models" },
  { title: "Obesity Mouse Models", href: "/obesity-mouse-models" },
  { title: "Rare Disease Mouse Models", href: "/rare-disease-mouse-models" }
];

const relatedModelTypes = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "C57BL/6 Mouse Background", href: "/c57bl6-mouse-background" }
];

// FAQ Data
const faqData = [
  {
    question: "What Cre drivers are used for cardiovascular research?",
    answer: "Common cardiovascular Cre drivers include Myh6-Cre (cardiomyocytes), Tie2-Cre (endothelial cells), SM22-Cre (smooth muscle cells), and alphaMHC-CreERT2 (inducible cardiomyocyte). Selection depends on whether you're studying cardiac, vascular, or combined cardiovascular phenotypes."
  },
  {
    question: "Can I study atherosclerosis with genetically engineered models?",
    answer: "Yes. Atherosclerosis models typically combine conditional gene modifications with hyperlipidemic backgrounds (ApoE knockout or LDLR knockout). For example, macrophage-specific knockouts on ApoE-/- background enable study of how specific genes affect plaque formation and inflammation."
  },
  {
    question: "What cardiovascular phenotyping assays are available?",
    answer: "Standard assays include echocardiography (cardiac function), blood pressure measurement (tail cuff or telemetry), exercise testing (treadmill), and vascular function (wire myography). More specialized assays include cardiac MRI, pressure-volume loops, and isolated heart perfusion."
  },
  {
    question: "How do I model heart failure in mice?",
    answer: "Heart failure models can involve cardiomyocyte-specific knockouts of contractile proteins, inducible cardiac gene deletion in adults, or pressure overload (TAC surgery). Conditional systems enable temporal control to avoid developmental defects while studying adult cardiac function."
  },
  {
    question: "What is the advantage of inducible cardiac models?",
    answer: "Tamoxifen-inducible Cre systems (e.g., alphaMHC-CreERT2) enable gene deletion in adult cardiomyocytes after normal development is complete. This avoids developmental compensation and allows study of acute gene loss effects on adult cardiac function, better modeling acquired heart disease."
  }
];

export default function CardiovascularMouseModelsPage() {
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
              <IconHeart size={16} color="white" />
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

        {/* Challenge Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              The Challenge of Cardiovascular Disease Modeling
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '40px' }}>
              Cardiovascular diseases encompass a diverse range of conditions affecting the heart and blood vessels. Mouse models must capture relevant aspects of human disease while accounting for important species differences in cardiovascular physiology and lipid metabolism.
            </p>
            
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Species Considerations
            </h3>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '25px' }}>
              Mice differ from humans in several cardiovascular relevant ways:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {speciesConsiderationsData.map((item, index) => (
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
                  <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px', marginTop: '40px' }}>
              Choosing the Right Model System
            </h3>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '25px' }}>
              Different cardiovascular questions require different modeling approaches:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modelSystemApproaches.map((item, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    borderLeft: '4px solid #2384da'
                  }}
                >
                  <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '.95rem', fontWeight: 600, marginBottom: '8px' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Model Types Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Model Types for Cardiovascular Research
            </h2>
            
            {/* Atherosclerosis Models */}
            <div className="animate-in hover-card hover-card-teal group" style={{ marginBottom: '40px', padding: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Atherosclerosis Models
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Atherosclerosis modeling requires hyperlipidemic backgrounds that develop vascular lesions:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {atherosclerosisModels.map((model, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      borderTop: '3px solid #008080'
                    }}
                  >
                    <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.95rem', marginBottom: '8px' }}>
                      {model.name}
                    </h4>
                    <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                      {model.description}
                    </p>
                    {model.link && (
                      <Link 
                        href={model.link}
                        className="inline-flex items-center gap-1 transition-colors duration-300 mt-2"
                        style={{ color: '#2384da', fontSize: '.8rem', fontWeight: 500 }}
                      >
                        <span>Learn more</span>
                        <IconChevronRight size={12} color="#2384da" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Heart Failure Models */}
            <div className="animate-in hover-card hover-card-teal group" style={{ marginBottom: '40px', padding: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Heart Failure and Cardiomyopathy Models
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Genetic models complement surgical approaches for heart failure research:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {heartFailureModels.map((model, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      borderTop: '3px solid #2384da'
                    }}
                  >
                    <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.95rem', marginBottom: '8px' }}>
                      {model.name}
                    </h4>
                    <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hypertension Models */}
            <div className="animate-in hover-card hover-card-teal group" style={{ marginBottom: '40px', padding: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Hypertension Models
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Blood pressure regulation involves multiple organ systems:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hypertensionModels.map((model, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      borderLeft: '4px solid #008080'
                    }}
                  >
                    <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.95rem', marginBottom: '8px' }}>
                      {model.name}
                    </h4>
                    <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lipid Metabolism Models */}
            <div className="animate-in">
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Lipid Metabolism Models
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Understanding lipid handling is central to cardiovascular disease:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lipidMetabolismModels.map((model, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '8px',
                      borderLeft: '4px solid #2384da'
                    }}
                  >
                    <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.95rem', marginBottom: '8px' }}>
                      {model.name}
                    </h4>
                    <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Model Design Considerations */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Model Design Considerations
            </h2>
            
            {/* Background Strain Selection */}
            <div className="animate-in hover-card hover-card-teal group" style={{ marginBottom: '40px', padding: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Background Strain Selection
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Cardiovascular phenotypes are strongly influenced by genetic background:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {backgroundStrains.map((strain, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '20px',
                      borderRadius: '8px'
                    }}
                  >
                    <h4 style={{ color: '#008080', fontWeight: 600, fontSize: '.95rem', marginBottom: '8px' }}>
                      {strain.name}
                    </h4>
                    <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                      {strain.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/c57bl6-mouse-background"
                  className="inline-flex items-center gap-2 transition-colors duration-300"
                  style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
                >
                  <span>Learn about C57BL/6 Background</span>
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              </div>
            </div>

            {/* Clinical Relevance */}
            <div className="animate-in hover-card hover-card-teal group" style={{ marginBottom: '40px', padding: '20px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Achieving Clinically Relevant Phenotypes
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Several strategies enhance translational relevance:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clinicalStrategies.map((strategy, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      backgroundColor: 'white',
                      padding: '15px',
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <IconCheckCircle size={18} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '5px' }}>
                        {strategy.name}
                      </h4>
                      <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                        {strategy.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tissue Specific Approaches */}
            <div className="animate-in">
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Tissue Specific Approaches
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Cardiovascular diseases involve multiple cell types and tissues:
              </p>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tissueCreDrivers.map((row, index) => (
                      <tr 
                        key={index}
                        style={{ 
                          backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                          borderBottom: '1px solid #e5e7eb'
                        }}
                      >
                        <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.target}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/tissue-specific-knockout"
                  className="inline-flex items-center gap-2 transition-colors duration-300"
                  style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
                >
                  <span>Learn about Tissue Specific Knockouts</span>
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Phenotyping Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Phenotyping Cardiovascular Models
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Atherosclerosis Assessment */}
              <div className="animate-in">
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Atherosclerosis Assessment
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {atherosclerosisPhenotyping.map((item, index) => (
                    <li 
                      key={index}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}
                    >
                      <h4 style={{ color: 'white', fontWeight: 600, fontSize: '.85rem', marginBottom: '5px' }}>
                        {item.assay}
                      </h4>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.8rem', lineHeight: '1.4rem' }}>
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cardiac Function */}
              <div className="animate-in">
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Cardiac Function Assessment
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cardiacPhenotyping.map((item, index) => (
                    <li 
                      key={index}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}
                    >
                      <h4 style={{ color: 'white', fontWeight: 600, fontSize: '.85rem', marginBottom: '5px' }}>
                        {item.assay}
                      </h4>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.8rem', lineHeight: '1.4rem' }}>
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vascular Function */}
              <div className="animate-in">
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Vascular Function Assessment
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {vascularPhenotyping.map((item, index) => (
                    <li 
                      key={index}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}
                    >
                      <h4 style={{ color: 'white', fontWeight: 600, fontSize: '.85rem', marginBottom: '5px' }}>
                        {item.assay}
                      </h4>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.8rem', lineHeight: '1.4rem' }}>
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Complex Model Design Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Complex Cardiovascular Model Design
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Many cardiovascular studies require sophisticated genetic systems:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complexModelDesigns.map((design, index) => (
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
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconSettings size={20} color="#008080" />
                    </div>
                    <div>
                      <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>
                        {design.name}
                      </h3>
                      <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                        {design.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in Cardiovascular Research
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              According to PubMed, recent publications demonstrate the utility of genetically engineered mouse models in cardiovascular research:
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
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: testimonials.length === 1 ? '48px 56px' : '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    boxSizing: 'border-box',
                    textAlign: testimonials.length === 1 ? 'center' : 'left'
                  }}
                >
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px', ...(testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : {}) }} />
                  <p style={{
                    color: '#666',
                    fontFamily: 'Lato, sans-serif',
                    fontSize: testimonials.length === 1 ? '1.1rem' : '.9rem',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    marginBottom: '20px',
                    flex: testimonials.length > 1 ? 1 : undefined,
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
                    <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>
                      — {testimonial.name}
                    </p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem', fontWeight: 400 }}>
                      {testimonial.affiliation}
                    </p>
                  </div>
                </div>
              ))}
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
              Start Your Cardiovascular Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your cardiovascular research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge and includes target analysis, strain background recommendations, and timeline estimates.
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
        <section style={{ padding: '60px 20px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <BreedingSchemeArchitectCTA variant="gradient" />
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

        {/* Lab Signals Newsletter CTA */}
        <section style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Cardiovascular Research Insights"
              description="Subscribe to Lab Signals for expert insights on cardiovascular mouse models, heart disease research, and vascular biology from our PhD scientists."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Disease Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedDiseaseLinks.map((link, index) => (
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
            "name": "Cardiovascular Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom cardiovascular mouse models for heart disease research. Study cardiac function, vascular disease, and cardiovascular therapeutics.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
