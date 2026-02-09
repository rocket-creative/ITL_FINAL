'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconTarget, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Amyloid & Tau Pathology Models",
  title: "Alzheimer Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported Alzheimer disease researchers with custom mouse models contributing to peer reviewed publications in Nature Neuroscience, Neuron, Journal of Neuroscience, and leading neurology journals worldwide. Our Alzheimer disease mouse models have advanced understanding of amyloid pathology, tau biology, and the complex mechanisms underlying neurodegeneration.",
  description: "Alzheimer disease mouse models enable researchers to investigate the molecular and cellular mechanisms driving disease pathogenesis, from amyloid plaque formation and tau hyperphosphorylation to neuroinflammation and synaptic dysfunction."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Amyloid Cascade Features
const amyloidFeatures = [
  { name: "APP mutations", desc: "Familial AD mutations (Swedish, London, Indiana) increase Aβ production or shift the Aβ42/40 ratio" },
  { name: "Presenilin mutations", desc: "PSEN1 and PSEN2 mutations affect gamma secretase processing of APP" },
  { name: "Combination models", desc: "Multiple mutations accelerate pathology for faster experimental readouts" }
];

// Tau Pathology Features
const tauFeatures = [
  { name: "MAPT mutations", desc: "Frontotemporal dementia associated mutations (P301L, P301S) promote tau aggregation" },
  { name: "Humanized tau", desc: "Complete replacement of mouse tau with human MAPT" },
  { name: "Tau knockin", desc: "Human tau mutations expressed from the endogenous locus at physiological levels" }
];

// APP Knockin Advantages
const appKnockinAdvantages = [
  "No overexpression artifacts",
  "Physiological APP expression levels",
  "Normal tissue distribution and processing",
  "Humanized Aβ sequence for translational relevance"
];

// Transgenic Models
const transgenicModels = [
  { name: "Tg2576", desc: "Swedish APP mutation, moderate plaque pathology" },
  { name: "5xFAD", desc: "Five familial AD mutations, aggressive amyloid pathology" },
  { name: "APP/PS1", desc: "Combined APP and PSEN1 mutations" },
  { name: "3xTg AD", desc: "Triple transgenic with APP, PSEN1, and tau mutations" }
];

// Tau Models Table
const tauModelsTable = [
  { model: "PS19", features: "P301S tau, aggressive tangle pathology", applications: "Tau spreading, neurodegeneration" },
  { model: "rTg4510", features: "Regulatable P301L tau expression", applications: "Temporal control, tau clearance studies" },
  { model: "Tau knockin", features: "Human MAPT from endogenous locus", applications: "Physiological tau biology" },
  { model: "MAPT humanized", features: "Complete human tau gene replacement", applications: "Human specific tau biology" }
];

// Knockin vs Transgenic Comparison
const comparisonTable = [
  { factor: "Expression level", knockin: "Physiological", transgenic: "Supraphysiological" },
  { factor: "Pathology onset", knockin: "Gradual", transgenic: "Rapid" },
  { factor: "Overexpression artifacts", knockin: "None", transgenic: "Possible" },
  { factor: "Copy number", knockin: "Single", transgenic: "Variable" },
  { factor: "Regulatory control", knockin: "Endogenous", transgenic: "Promoter dependent" }
];

// Conditional Approaches
const conditionalApproaches = [
  { name: "Inducible APP/tau expression", desc: "Trigger pathology onset in adult animals" },
  { name: "Cell type specific expression", desc: "Restrict pathogenic proteins to neurons or glia" },
  { name: "Adult onset models", desc: "Bypass developmental effects to model late onset disease" }
];

// Research Applications - Mechanisms
const mechanismApplications = [
  "Amyloid processing and aggregation",
  "Tau phosphorylation and spreading",
  "Microglial activation and neuroinflammation",
  "Synaptic dysfunction and neurodegeneration",
  "Blood brain barrier disruption",
  "Gut microbiota brain axis interactions"
];

// Therapeutic Testing Applications
const therapeuticApplications = [
  "Anti amyloid therapeutics (antibodies, secretase inhibitors)",
  "Tau targeting approaches (aggregation inhibitors, immunotherapy)",
  "Neuroprotective strategies",
  "Combination therapies"
];

// Pathological Endpoints
const pathologicalEndpoints = [
  "Amyloid plaque quantification (immunohistochemistry, Congo red, Thioflavin S)",
  "Tau phosphorylation and tangle formation",
  "Microglial and astrocyte activation",
  "Synaptic protein levels",
  "Neuronal loss"
];

// Behavioral Endpoints
const behavioralEndpoints = [
  "Spatial learning and memory (Morris water maze, Barnes maze)",
  "Recognition memory (novel object recognition)",
  "Working memory (Y maze, T maze)",
  "Fear conditioning",
  "Nest building and activities of daily living"
];

// Publications Data - All verified as using ITL-generated mouse models
// PubMed links verified January 2026
const publicationsData = [
  {
    authors: "Vacher CM et al.",
    year: "2021",
    title: "Placental endocrine function shapes cerebellar development and social behavior.",
    journal: "Nature Neuroscience",
    volume: "24(10): 1392-1401",
    link: "https://pubmed.ncbi.nlm.nih.gov/34400844/"
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

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const plumleyTestimonial = getTestimonialById('plumley-warren')!;

const testimonials = [
  { quote: plumleyTestimonial.quote, name: formatAuthorWithCredentials(plumleyTestimonial), affiliation: plumleyTestimonial.affiliation },
];

// Related Links
const neurodegenerativeModels = [
  { title: "Parkinson's Mouse Models", href: "/parkinsons-mouse-models" },
  { title: "ALS Mouse Models", href: "/als-mouse-models" },
  { title: "Huntington's Mouse Models", href: "/huntingtons-mouse-models" },
  { title: "Neuroscience Mouse Models", href: "/neuroscience-mouse-models" }
];

const relatedModelTypes = [
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

const relatedTechnologies = [
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" }
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between knockin and transgenic Alzheimer models?",
    answer: "Knockin models introduce mutations at the endogenous gene locus under native regulatory control, providing physiological expression levels but slower pathology onset. Transgenic models use random integration with promoters, providing faster pathology but may include overexpression artifacts. Knockin models are more physiologically relevant; transgenic models offer faster readouts. Contact us to discuss the best approach for your study timeline."
  },
  {
    question: "Which AD mutations can be modeled in mice?",
    answer: "Common familial AD mutations include APP mutations (Swedish, London, etc.), PSEN1 mutations (multiple variants), and PSEN2 mutations. Tau mutations (FTDP-17) model tauopathies. Point mutation knockins can introduce any specific human mutation at physiological levels for disease modeling."
  },
  {
    question: "What strain background is best for AD models?",
    answer: "C57BL/6 is most commonly used for AD models because it has extensive behavioral baseline data, good learning performance, and enables consistent comparison with published literature. C57BL/6 also provides well-characterized immune responses, which is important given the role of neuroinflammation in AD."
  },
  {
    question: "How long does it take to see AD pathology in mouse models?",
    answer: "Knockin models with APP or PSEN mutations develop amyloid pathology gradually over time. Tau pathology timing varies depending on the specific mutation. Transgenic models often show faster pathology but may include overexpression artifacts. Pathology timing varies by model and should be considered when planning studies. Contact us to discuss model selection for your research timeline."
  }
];

export default function AlzheimersMouseModelsPage() {
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

        {/* Modeling AD Pathology */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Modeling Alzheimer Disease Pathology
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Amyloid Cascade */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  The Amyloid Cascade
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                  Amyloid pathology remains central to Alzheimer disease modeling. Accumulation of amyloid beta (Aβ) peptides, derived from amyloid precursor protein (APP), drives plaque formation and downstream neurotoxicity.
                </p>
                <div className="space-y-3">
                  {amyloidFeatures.map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <div>
                        <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{feature.name}:</span>
                        <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{feature.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tau Pathology */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  Tau Pathology
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                  Tau hyperphosphorylation and neurofibrillary tangle formation correlate closely with cognitive decline in AD. Tau models enable study of this critical pathological feature.
                </p>
                <div className="space-y-3">
                  {tauFeatures.map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <div>
                        <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{feature.name}:</span>
                        <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{feature.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Combined Models */}
            <div className="animate-in" style={{ backgroundColor: '#0a253c', padding: '25px 30px', borderRadius: '8px', marginTop: '30px' }}>
              <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                Combined Amyloid and Tau Models
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                The interaction between amyloid and tau pathology is a key focus of AD research. Models combining both pathways enable study of:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 15px', borderRadius: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>Amyloid driven tau spreading</span>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 15px', borderRadius: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>Synergistic effects on neurodegeneration</span>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px 15px', borderRadius: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>Therapeutic interventions targeting both pathways</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Types for AD Research */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Model Types for Alzheimer Research
            </h2>

            {/* APP Knockin Models */}
            <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080', marginBottom: '25px' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                APP Knockin Models
              </h3>
              <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                APP knockin models express familial AD mutations from the endogenous App locus, providing physiological expression levels and normal regulatory control. APP knockin models develop amyloid pathology progressively, better modeling the age dependent nature of AD compared to high expressing transgenic approaches.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {appKnockinAdvantages.map((advantage, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#555', fontSize: '.85rem' }}>{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transgenic Models */}
            <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #2384da', marginBottom: '25px' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Transgenic Overexpression Models
              </h3>
              <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                Transgenic models expressing mutant APP, PSEN1, or tau under strong promoters develop pathology rapidly. Overexpression models provide faster pathology development but may include artifacts from supraphysiological protein levels.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transgenicModels.map((model, index) => (
                  <div key={index} style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
                    <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{model.name}:</span>
                    <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{model.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditional Approaches */}
            <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Conditional Approaches
              </h3>
              <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                Conditional models enable temporal and spatial control over AD gene expression:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conditionalApproaches.map((approach, index) => (
                  <div key={index} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px', borderTop: '3px solid #008080' }}>
                    <h4 style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '8px' }}>{approach.name}</h4>
                    <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{approach.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <Link href="/conditional-knockout-mouse-models" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>
                  <span>Conditional Knockout Models</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
                <Link href="/inducible-conditional-knockout" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>
                  <span>Inducible Systems</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tau Models Table */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              Tau Models
            </h2>

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
                  {tauModelsTable.map((row, index) => (
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

        {/* Comparison Table Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Knockin vs Transgenic Approaches
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              Knockin models provide more physiologically relevant disease modeling but require longer timelines for pathology development. Transgenic models offer faster readouts but may include artifacts from overexpression.
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Factor</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Knockin</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Transgenic</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.factor}</td>
                      <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 500 }}>{row.knockin}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.transgenic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Research Applications */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Research Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Understanding Disease Mechanisms
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Genetically engineered mouse models have been essential for understanding AD pathophysiology:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {mechanismApplications.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Therapeutic Testing
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  AD mouse models provide platforms for preclinical efficacy testing:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {therapeuticApplications.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <IconCheckCircle size={14} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Phenotypic Assessments */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Phenotypic Assessments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Pathological Endpoints
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {pathologicalEndpoints.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Behavioral Endpoints
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {behavioralEndpoints.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <IconCheckCircle size={14} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in Alzheimer Disease
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Models generated by ingenious targeting laboratory have supported Alzheimer disease research:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {publicationsData.map((pub, index) => (
                <div
                  key={index}
                  className="animate-in hover-card-sm"
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
        <section style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '8px', padding: testimonials.length === 1 ? '48px 56px' : '30px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}>
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
              Start Your Alzheimer Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your Alzheimer disease research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge and includes target analysis, model strategy recommendations, and timeline estimates.
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
        <section style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <BreedingSchemeArchitectCTA variant="gradient" />
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

        {/* Lab Signals Newsletter CTA */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Neuroscience Model Insights"
              description="Subscribe to Lab Signals for expert guidance on Alzheimer models, tau pathology, and neurodegenerative disease research from our PhD scientists."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Neurodegenerative Disease Models
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
            "name": "Alzheimer Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom Alzheimer disease mouse models for AD research. APP knockin, tau models, and amyloid pathology. Expert model design since 1998.",
            "serviceType": "Alzheimer Disease Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
