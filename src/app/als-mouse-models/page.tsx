'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Motor Neuron Disease Models",
  title: "ALS Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported amyotrophic lateral sclerosis research with custom mouse models enabling mechanistic studies of motor neuron degeneration, evaluation of neuroprotective strategies, and preclinical testing of disease modifying therapeutics.",
  description: "ALS mouse models provide essential platforms for investigating the molecular pathways underlying motor neuron death, testing hypotheses about protein aggregation and RNA metabolism, and developing therapies targeting SOD1, TDP43, FUS, C9orf72, and other genetically validated targets."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Major ALS Genes
const alsGenes = [
  { 
    name: "SOD1 (Superoxide Dismutase 1)", 
    desc: "The first ALS gene identified, with over 180 known mutations. SOD1 mutations cause disease through toxic gain of function rather than loss of enzyme activity. The G93A mutation is the most commonly studied in mouse models."
  },
  { 
    name: "TARDBP (TDP43)", 
    desc: "TDP43 pathology is present in approximately 97% of ALS cases, making it a central player in disease pathogenesis. Mutations cause both familial ALS and frontotemporal dementia."
  },
  { 
    name: "FUS (Fused in Sarcoma)", 
    desc: "Like TDP43, FUS is an RNA binding protein whose mutations cause ALS and FTD. FUS mutations lead to cytoplasmic aggregation and nuclear depletion."
  },
  { 
    name: "C9orf72", 
    desc: "Hexanucleotide repeat expansion in C9orf72 is the most common genetic cause of both ALS and FTD. Disease mechanisms include loss of C9orf72 function, toxic RNA foci, and dipeptide repeat protein toxicity."
  }
];

// Additional ALS Genes
const additionalGenes = [
  "OPTN, TBK1, SQSTM1: Autophagy pathway genes",
  "VCP: Protein quality control",
  "PFN1: Cytoskeleton dynamics",
  "UBQLN2: Protein degradation",
  "CHCHD10: Mitochondrial function"
];

// SOD1 Models
const sod1Models = [
  { model: "SOD1 G93A Transgenic", features: "High copy number, aggressive disease", applications: "Paralysis onset ~90 days, therapeutic testing" },
  { model: "SOD1 G85R", features: "Alternative mutation, slower progression", applications: "Longer therapeutic window studies" },
  { model: "SOD1 Knockin", features: "Physiological expression levels", applications: "Avoids overexpression artifacts" },
  { model: "SOD1 Knockout", features: "Null allele", applications: "Age dependent motor neuron loss studies" }
];

// TDP43 Models
const tdp43Models = [
  { model: "TDP43 A315T Knockin", features: "Patient derived mutation, endogenous control", applications: "Disease modeling without overexpression" },
  { model: "TDP43 Q331K Knockin", features: "Age dependent motor phenotypes", applications: "Progressive TDP43 pathology" },
  { model: "Conditional TDP43", features: "Cre dependent expression or deletion", applications: "Cell type specific studies" },
  { model: "TDP43 Knockout", features: "Conditional in motor neurons", applications: "Progressive motor phenotypes" }
];

// Cell Type Specific Approaches
const cellTypeApproaches = [
  { name: "Motor Neuron Specific", cre: "ChAT Cre or VAChT Cre", desc: "Reveals cell autonomous disease mechanisms" },
  { name: "Astrocyte Specific", cre: "GFAP Cre or Aldh1l1 Cre", desc: "Demonstrates non cell autonomous toxicity" },
  { name: "Microglial Specific", cre: "CX3CR1 Cre", desc: "Studies microglial contribution to disease progression" },
  { name: "Oligodendrocyte Specific", cre: "Mog Cre or CNP Cre", desc: "Investigates oligodendrocyte dysfunction" }
];

// Motor Function Tests
const motorTests = [
  { test: "Rotarod", description: "Motor coordination and balance. Decline in latency to fall correlates with disease progression." },
  { test: "Grip Strength", description: "Forelimb and hindlimb grip strength measurement provides quantitative muscle function assessment." },
  { test: "Gait Analysis", description: "Stride length, cadence, and stance time reveal motor deficits before paralysis onset." },
  { test: "Hanging Wire", description: "Neuromuscular function assessment. Time to fall from inverted grid." }
];

// Neuropathology Endpoints
const neuropathologyEndpoints = [
  "Motor neuron counts: Stereological quantification of ChAT positive neurons in spinal cord ventral horn",
  "Neuromuscular junction analysis: Innervation status of neuromuscular junctions in hindlimb muscles",
  "Protein aggregation: Immunohistochemistry for mislocalized TDP43, SOD1 aggregates, or dipeptide repeat proteins",
  "Gliosis: Astrocyte (GFAP) and microglial (Iba1) activation in spinal cord"
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Ionescu A et al.",
    year: "2025",
    title: "Muscle derived miR-126 regulates TDP-43 axonal local synthesis and NMJ integrity in ALS models.",
    journal: "Nature Neuroscience",
    volume: "28(4): 821-833",
    link: "https://pubmed.ncbi.nlm.nih.gov/41044342/"
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

const plumleyTestimonial = getTestimonialById('plumley-warren')!;

const testimonials = [
  { quote: plumleyTestimonial.quote, name: formatAuthorWithCredentials(plumleyTestimonial), affiliation: plumleyTestimonial.affiliation },
];

// Related Links
const neurodegenerativeModels = [
  { title: "Neuroscience Mouse Models", href: "/neuroscience-mouse-models" },
  { title: "Parkinson's Mouse Models", href: "/parkinsons-mouse-models" },
  { title: "Alzheimer's Mouse Models", href: "/alzheimers-mouse-models" },
  { title: "Huntington's Mouse Models", href: "/huntingtons-mouse-models" }
];

const relatedModelTypes = [
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" }
];

const relatedApplications = [
  { title: "Gene Therapy Mouse Models", href: "/gene-therapy-mouse-models" },
  { title: "Target Validation Models", href: "/target-validation-mouse-models" }
];

// FAQ Data
const faqData = [
  {
    question: "What types of ALS mutations can be modeled in mice?",
    answer: "Common ALS mutations include SOD1 mutations (A4V, G93A, G37R, etc.), TDP43 mutations (A315T, M337V, Q331K, etc.), FUS mutations, and C9orf72 repeat expansions. Point mutation knockins can introduce any specific human mutation for disease modeling at physiological levels."
  },
  {
    question: "What motor function tests are used to assess ALS models?",
    answer: "Standard motor assessments include rotarod (motor coordination), grip strength (forelimb and hindlimb), gait analysis (stride length, cadence), and hanging wire test (neuromuscular function). Survival is typically the primary endpoint, defined by inability to right within 30 seconds or more than 20% body weight loss."
  },
  {
    question: "Can conditional systems be used for ALS models?",
    answer: "Yes. Conditional expression of ALS mutations (e.g., Cre dependent TDP43 or FUS mutations) enables spatial and temporal control, allowing study of motor neuron specific effects or adult onset disease. This can avoid developmental defects and better model sporadic ALS versus familial ALS."
  },
  {
    question: "What is the typical disease progression timeline in ALS mouse models?",
    answer: "Disease progression varies by mutation and model. SOD1 G93A transgenic mice show symptom onset around 90 to 100 days with rapid progression. TDP43 models may show slower progression. Knockin models at physiological expression levels typically show slower, more gradual progression than transgenic models."
  },
  {
    question: "What strain background should I use for ALS models?",
    answer: "C57BL/6 is most commonly used for ALS models due to extensive characterization and behavioral baseline data. Strain background can significantly affect disease progression and survival, so maintaining consistent backgrounds is important for reproducible experiments and comparison with published data."
  }
];

export default function ALSMouseModelsPage() {
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

          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div className="grid grid-cols-1 gap-12 items-center">
              <div>
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
                  <IconTarget size={16} color="white" />
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
                    marginBottom: '15px'
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
                    marginBottom: '25px'
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

        {/* Genetic Basis Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Genetic Basis of ALS
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Amyotrophic lateral sclerosis is characterized by progressive degeneration of upper and lower motor neurons, leading to muscle weakness, paralysis, and death typically within 3 to 5 years of diagnosis. While most cases are sporadic, approximately 10% are familial with identifiable genetic causes.
            </p>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Major ALS Genes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alsGenes.map((gene, index) => (
                <div key={index} className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h4 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{gene.name}</h4>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.6rem' }}>{gene.desc}</p>
                </div>
              ))}
            </div>

            {/* Additional Genes */}
            <div className="animate-in" style={{ backgroundColor: '#0a253c', padding: '25px 30px', borderRadius: '8px', marginTop: '30px' }}>
              <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                Additional ALS Genes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {additionalGenes.map((gene, index) => (
                  <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 15px', borderRadius: '6px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{gene}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SOD1 Models Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              SOD1 Models
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              SOD1 transgenic mice remain the most widely used ALS models, enabling therapeutic testing and mechanistic studies of motor neuron degeneration.
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Model Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Features</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {sod1Models.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.model}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.features}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TDP43 Models Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              TDP43 Models
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              TDP43 models address the most common ALS pathology, with TDP43 mislocalization from nucleus to cytoplasm being a pathological hallmark.
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#008080' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Model Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Features</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {tdp43Models.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.model}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.features}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Cell Type Specific Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Cell Type Specific Approaches
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              ALS involves both motor neurons and surrounding glia. Cell type specific gene manipulation reveals distinct contributions to disease.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cellTypeApproaches.map((approach, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>{approach.name}</h3>
                  <p style={{ color: '#008080', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '4px', fontSize: '.8rem', display: 'inline-block', marginBottom: '10px' }}>{approach.cre}</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{approach.desc}</p>
                </div>
              ))}
            </div>

            <div className="animate-in flex gap-4 mt-6">
              <Link href="/conditional-knockout-mouse-models" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: 'white', fontSize: '.85rem', fontWeight: 500, textDecoration: 'underline' }}>
                <span>Conditional Knockout Models</span>
                <IconChevronRight size={14} color="white" />
              </Link>
              <Link href="/tissue-specific-cre-lines" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: 'white', fontSize: '.85rem', fontWeight: 500, textDecoration: 'underline' }}>
                <span>Tissue Specific Cre Lines</span>
                <IconChevronRight size={14} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Motor Function Assessment */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Phenotyping ALS Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Motor Function Assessment
                </h3>
                <div className="space-y-4">
                  {motorTests.map((test, idx) => (
                    <div key={idx} style={{ borderBottom: idx < motorTests.length - 1 ? '1px solid #e5e7eb' : 'none', paddingBottom: '12px' }}>
                      <h4 style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>{test.test}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{test.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Neuropathology Endpoints
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {neuropathologyEndpoints.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                      <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in ALS Research
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Recent publications demonstrate the utility of genetically engineered mouse models in ALS research:
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your ALS Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your ALS research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge and includes target analysis, model strategy recommendations, and timeline estimates.
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
              title="Stay Current on ALS Research"
              description="Subscribe to Lab Signals for the latest motor neuron disease model updates and research insights."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Disease Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {neurodegenerativeModels.map((link, index) => (
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
                  Related Applications
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
            "name": "ALS Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom ALS mouse models for amyotrophic lateral sclerosis research. SOD1, TDP43, FUS, and C9orf72 models for motor neuron disease studies.",
            "serviceType": "ALS Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
