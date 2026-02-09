'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { UXUIDCGlossarySection, humanizationTerms } from '@/components/UXUIDC/GlossarySection';
import { LegacyInfoLink, UXUIDCResourceLinks, humanizationResources, LabSignalsSignup, getRelatedLabSignalsArticles, GlossaryTermLink, BreedingSchemeArchitectCTA } from '@/components/UXUIDC';
import { IconDNA, IconTarget, IconGlobe, IconShield, IconSettings, IconFlask, IconChevronRight, IconCheckCircle, IconAward, IconLayers, IconUsers, IconZap } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Legacy content link
const legacyContentUrl = '/legacy/humanized-mouse-models';

// Hero Data
const heroData = {
  badge: "Human Gene Knockin",
  title: "Humanized Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has generated hundreds of humanized mouse models for researchers and pharmaceutical companies worldwide. Our humanized models have supported therapeutic development programs across immuno-oncology, metabolic disease, neuroscience, and other areas, with results published in peer reviewed journals.",
  description: "Humanized mouse models express human proteins or protein domains in place of their mouse counterparts. This humanization enables testing of human specific therapeutics, study of human specific biology, and improved translation from preclinical models to clinical outcomes."
};

// Stats Data
const statsData = [
  { value: 100, suffix: "s", label: "Humanized Models" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Why Humanize Data
const whyHumanizeData = {
  title: "Why Humanize Mouse Genes",
  sections: [
    {
      icon: IconTarget,
      title: "Species Specific Therapeutics",
      description: "Many therapeutic antibodies and biologics are designed specifically for human targets:",
      points: [
        "Therapeutic antibodies may not cross react with mouse orthologs",
        "Human specific epitopes require human sequence for binding",
        "Biologics may have species specific receptor interactions",
        "Humanized models enable efficacy testing of clinical candidates"
      ]
    },
    {
      icon: IconGlobe,
      title: "Translational Relevance",
      description: "Humanized models improve translation to clinical outcomes:",
      points: [
        "Study human specific protein functions",
        "Model human specific disease mechanisms",
        "Evaluate pharmacokinetics with human target engagement",
        "Develop and validate human specific biomarkers"
      ]
    },
    {
      icon: IconShield,
      title: "Regulatory Considerations",
      description: "Humanized models support regulatory submissions:",
      points: [
        "Demonstrate on target efficacy with human target",
        "Evaluate safety in context of human target biology",
        "Support mechanism of action characterization",
        "Enable pharmacodynamic biomarker development"
      ]
    }
  ]
};

// Humanization Strategies Data
const strategiesData = {
  title: "Humanization Strategies",
  strategies: [
    {
      icon: IconDNA,
      title: "Complete Gene Replacement",
      description: "The entire mouse gene is replaced with the human ortholog:",
      points: [
        "Human coding sequence under mouse regulatory control",
        "Preserves mouse expression pattern and level",
        "Enables study of all human specific protein features",
        "Most comprehensive humanization approach"
      ],
      note: "Complete replacement is appropriate when the entire protein sequence differs functionally between species or when studying human specific splice variants."
    },
    {
      icon: IconLayers,
      title: "Extracellular Domain Humanization",
      description: "Human extracellular domain replaces mouse sequence while retaining mouse intracellular domain:",
      points: [
        "Human epitopes for antibody binding",
        "Mouse signaling domains for normal downstream function",
        "Commonly used for immune checkpoint humanization",
        "Maintains compatibility with mouse immune system"
      ],
      note: "This approach is ideal for therapeutic antibody testing where the antibody targets extracellular epitopes."
    },
    {
      icon: IconTarget,
      title: "Specific Domain or Epitope Humanization",
      description: "Only the specific region recognized by the therapeutic is humanized:",
      points: [
        "Minimal sequence change",
        "Preserves most mouse protein function",
        "Targeted to specific antibody epitope",
        "May require epitope mapping data"
      ]
    },
    {
      icon: IconSettings,
      title: "Humanized Regulatory Elements",
      description: "Human promoter or enhancer sequences replace mouse regulatory regions:",
      points: [
        "Study human specific gene regulation",
        "Model human expression patterns",
        "Investigate human specific enhancer variants"
      ]
    }
  ]
};

// TruHumanization Data
const truHumanizationData = {
  title: "TruHumanization™ Technology",
  description: "ingenious targeting laboratory's proprietary TruHumanization™ technology optimizes humanization strategies for maximum therapeutic relevance and physiological compatibility with complete gene replacement.",
  note: "Quality Assurance: All TruHumanization™ projects include pre-germline analysis to verify correct human sequence integration before mouse generation."
};

// Applications Data
const applicationsData = {
  title: "Applications by Therapeutic Area",
  areas: [
    {
      icon: IconFlask,
      title: "Immuno Oncology",
      description: "Humanized immune checkpoint models are essential for cancer immunotherapy development:",
      highlight: "Dual humanized models (e.g., PD1 + CTLA4) enable combination immunotherapy evaluation.",
      link: "/immuno-oncology-mouse-models"
    },
    {
      icon: IconZap,
      title: "Metabolic Disease",
      description: "Humanized metabolic targets support therapeutic development:",
      points: [
        "Humanized receptors for peptide therapeutic testing (GLP1R, GCGR)",
        "Humanized enzymes for small molecule drug development",
        "Humanized lipoproteins for cardiovascular studies",
        "Humanized transporters for pharmacokinetic evaluation"
      ],
      link: "/metabolic-disease-mouse-models"
    },
    {
      icon: IconUsers,
      title: "Neuroscience",
      description: "Humanized CNS targets enable neurotherapeutic development:",
      points: [
        "Humanized amyloid precursor protein (APP) for Alzheimer studies",
        "Humanized tau (MAPT) for tauopathy research",
        "Humanized receptors for antibody or biologic testing",
        "Humanized ion channels for species specific pharmacology"
      ],
      link: "/alzheimers-mouse-models"
    },
    {
      icon: IconShield,
      title: "Infectious Disease",
      description: "Humanized receptors enable infection and therapeutic studies:",
      points: [
        "Humanized viral entry receptors",
        "Humanized immune components for vaccine studies",
        "Humanized targets for antiviral therapeutic testing"
      ]
    }
  ]
};

// Strain Background Data
const strainData = {
  title: "Strain Background",
  description: "Choose strain background based on experimental requirements:",
  strains: [
    { name: "C57BL/6", description: "Most common, compatible with syngeneic tumor models (MC38, B16)" },
    { name: "BALB/c", description: "Alternative background, compatible with CT26, 4T1 tumors" },
    { name: "Immunodeficient backgrounds", description: "For human immune cell engraftment studies" }
  ]
};

// Combining Humanizations Data
const combiningData = {
  title: "Combining Multiple Humanizations",
  description: "Complex models may require multiple humanized genes:",
  examples: [
    "Dual checkpoint humanization (PD1 + CTLA4, PD1 + LAG3)",
    "Receptor ligand pairs (CD47 + SIRPα)",
    "Pathway components (multiple targets in same pathway)"
  ],
  note: "Breeding strategies or sequential targeting can combine multiple humanized alleles."
};

// Checkpoint Table Data
const checkpointTableData = [
  { target: "PD1 (PDCD1)", approach: "Extracellular domain", applications: "Anti PD1 antibody efficacy" },
  { target: "PDL1 (CD274)", approach: "Extracellular domain", applications: "Anti PDL1 antibody efficacy" },
  { target: "CTLA4", approach: "Extracellular domain", applications: "Anti CTLA4 antibody efficacy" },
  { target: "LAG3", approach: "Extracellular domain", applications: "LAG3 inhibitor evaluation" },
  { target: "TIM3", approach: "Extracellular domain", applications: "TIM3 pathway studies" },
  { target: "TIGIT", approach: "Extracellular domain", applications: "TIGIT inhibitor development" },
  { target: "CD47", approach: "Extracellular domain", applications: "Anti CD47 antibody efficacy" },
  { target: "SIRPα", approach: "Extracellular domain", applications: "CD47 SIRPα axis studies" }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { HUMANIZED_TESTIMONIALS, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonialsData = HUMANIZED_TESTIMONIALS.map(t => ({
  quote: t.quote,
  author: formatAuthorWithCredentials(t),
  affiliation: t.affiliation,
}));

// Related Links
const checkpointModels = [
  { title: "PD1 Humanized Mice", href: "/pd1-humanized-mice" },
  { title: "PDL1 Humanized Mice", href: "/pdl1-humanized-mice" },
  { title: "CTLA4 Humanized Mice", href: "/ctla4-humanized-mice" },
  { title: "LAG3 Humanized Mice", href: "/lag3-humanized-mice" },
  { title: "Humanized Immune Checkpoint Mice", href: "/humanized-immune-checkpoint-mice" }
];

const relatedModelTypes = [
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" }
];

const therapeuticAreas = [
  { title: "Immuno Oncology Mouse Models", href: "/immuno-oncology-mouse-models" },
  { title: "Oncology Mouse Models", href: "/oncology-mouse-models" },
  { title: "Metabolic Disease Mouse Models", href: "/metabolic-disease-mouse-models" },
  { title: "Alzheimers Mouse Models", href: "/alzheimers-mouse-models" }
];

const projectResources = [
  { title: "FAQs", href: "/faqs" }
];

// FAQ Data
const getFaqData = () => [
  {
    question: "Why do I need a humanized mouse model for drug development?",
    answer: (
      <>
        Many therapeutic antibodies and biologics are designed to target human proteins and do not cross-react with mouse orthologs. <GlossaryTermLink term="humanized-mouse-models">Humanized mice</GlossaryTermLink> express human target proteins, enabling efficacy testing of human-specific therapeutics in an immunocompetent mouse with a functional immune system.
      </>
    )
  },
  {
    question: "What is the difference between full gene replacement and extracellular domain humanization?",
    answer: (
      <>
        Full gene replacement substitutes the entire mouse gene with human sequence, including regulatory elements. Extracellular domain humanization replaces only the portion of the protein that therapeutic antibodies recognize, while preserving mouse intracellular domains for proper signaling. ECD humanization is often sufficient for antibody testing and may be faster to generate using <GlossaryTermLink term="knockin-mouse-models">knockin strategies</GlossaryTermLink>.
      </>
    )
  },
  {
    question: "Can I combine multiple humanized genes in one mouse?",
    answer: (
      <>
        Yes. <GlossaryTermLink term="single-vs-double-humanized-targets">Dual or triple humanized mice</GlossaryTermLink> are commonly used for combination therapy studies. For example, PD1/CTLA4 double humanized mice enable testing of dual checkpoint blockade. Multiple humanizations can be combined through <GlossaryTermLink term="breeding-scheme">breeding</GlossaryTermLink> or sequential targeting.
      </>
    )
  },
  {
    question: "Which humanized immune checkpoint models are available?",
    answer: (
      <>
        ingenious targeting laboratory offers <GlossaryTermLink term="humanized-immune-checkpoint">humanized immune checkpoint models</GlossaryTermLink> for PD1, PDL1, CTLA4, LAG3, and TIM3, and others, as well as combinations. These models express human checkpoint proteins recognized by clinical antibodies while maintaining functional mouse immune systems for syngeneic tumor studies.
      </>
    )
  }
];

export default function HumanizedMouseModelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero animations
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }
      
      // Scroll-triggered animations
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
          {/* Background Pattern */}
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
              <IconGlobe size={16} color="white" />
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

        {/* Why Humanize Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              {whyHumanizeData.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyHumanizeData.sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <div 
                    key={index}
                    className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '30px',
                      borderRadius: '8px',
                      borderTop: '4px solid #008080'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}>
                      <IconComponent size={24} color="#008080" />
                    </div>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                      {section.title}
                    </h3>
                    <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                      {section.description}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {section.points.map((point, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#666', fontSize: '.85rem', marginBottom: '8px' }}>
                          <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Humanization Strategies Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              {strategiesData.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategiesData.strategies.map((strategy, index) => {
                const IconComponent = strategy.icon;
                return (
                  <div 
                    key={index}
                    className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      backgroundColor: 'white',
                      padding: '30px',
                      borderRadius: '8px',
                      borderLeft: '4px solid #2384da'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(35,132,218,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={22} color="#2384da" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                          {strategy.title}
                        </h3>
                        <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '12px' }}>
                          {strategy.description}
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {strategy.points.map((point, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '.85rem', marginBottom: '6px' }}>
                              <IconCheckCircle size={14} color="#008080" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        {strategy.note && (
                          <p style={{ color: '#008080', fontSize: '.85rem', fontStyle: 'italic', marginTop: '12px' }}>
                            {strategy.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TruHumanization Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="animate-in">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px'
              }}>
                <IconAward size={16} color="white" />
                <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>Proprietary Technology</span>
              </div>
              <h2 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
                {truHumanizationData.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                {truHumanizationData.description}
              </p>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                padding: '15px 25px', 
                borderRadius: '8px',
                display: 'inline-block'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '.9rem', fontWeight: 500 }}>
                  {truHumanizationData.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              {applicationsData.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicationsData.areas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <div 
                    key={index}
                    className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '30px',
                      borderRadius: '8px',
                      borderTop: '4px solid #008080'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}>
                      <IconComponent size={24} color="#008080" />
                    </div>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                      {area.title}
                    </h3>
                    <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '12px' }}>
                      {area.description}
                    </p>
                    {area.highlight && (
                      <p style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500, marginBottom: '12px' }}>
                        {area.highlight}
                      </p>
                    )}
                    {area.points && (
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {area.points.map((point, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#666', fontSize: '.85rem', marginBottom: '6px' }}>
                            <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {area.link && (
                      <Link 
                        href={area.link}
                        className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                        style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
                      >
                        <span>Learn more</span>
                        <IconChevronRight size={14} color="#2384da" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Strain and Combining Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Strain Background */}
              <div className="animate-in">
                <h3 style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>
                  {strainData.title}
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                  {strainData.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {strainData.strains.map((strain, index) => (
                    <div 
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '6px',
                        borderLeft: '3px solid #008080'
                      }}
                    >
                      <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '5px' }}>
                        {strain.name}
                      </h4>
                      <p style={{ color: '#666', fontSize: '.85rem' }}>
                        {strain.description}
                      </p>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/c57bl6-mouse-background"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                  style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
                >
                  <span>Learn more about strain backgrounds</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>

              {/* Combining Humanizations */}
              <div className="animate-in">
                <h3 style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>
                  {combiningData.title}
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                  {combiningData.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {combiningData.examples.map((example, index) => (
                    <li 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '12px',
                        color: '#555',
                        fontSize: '.9rem'
                      }}
                    >
                      <IconCheckCircle size={18} color="#008080" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: '#008080', fontSize: '.85rem', fontStyle: 'italic', marginTop: '15px' }}>
                  {combiningData.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Checkpoint Table Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Humanized Checkpoint Models
            </h2>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Humanization Approach</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {checkpointTableData.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.target}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.approach}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonialsData} variant="light" />

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Humanization Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your humanization requirements and recommend the optimal strategy for your therapeutic program. Initial consultation is provided at no charge and includes humanization approach recommendations, allele design options, and timeline estimates.
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

        {/* Glossary Section */}
        <UXUIDCGlossarySection
          title="Key Terms"
          description="Understanding the terminology used in humanized mouse model generation helps you communicate effectively with our scientific team and interpret project documentation."
          terms={humanizationTerms}
        />

        {/* Downloadable Resources Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Humanization Resources"
              description="Download our free guides to help plan your humanized mouse model project."
              resources={humanizationResources}
              variant="card"
            />
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Lab Signals Newsletter Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Stay Updated on Humanized Model Research"
              description="Subscribe to Lab Signals for biweekly insights on humanized mouse models, immuno-oncology applications, and translational research from our PhD scientists."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/humanized-mouse-models')}
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
              <UXUIDCAnimatedFAQ faqs={getFaqData()} />
            </div>
          </div>
        </section>

        {/* Legacy Content Link */}
        <section style={{ backgroundColor: '#e8f5f5', padding: '30px 20px', borderTop: '3px solid #008080' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <p style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 500, marginBottom: '5px' }}>
                Looking for detailed technical information?
              </p>
              <p style={{ color: '#666', fontSize: '.85rem' }}>
                View our comprehensive legacy documentation with in-depth specifications.
              </p>
            </div>
            <LegacyInfoLink href={legacyContentUrl} />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Checkpoint Models */}
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Humanized Checkpoint Models
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
              
              {/* Related Model Types */}
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
              
              {/* Therapeutic Areas */}
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Therapeutic Areas
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {therapeuticAreas.map((link, index) => (
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
              
              {/* Project Resources */}
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
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Humanized Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom humanized mouse models expressing human genes. Immune checkpoint humanization, drug target humanization, and complete gene replacement. Since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
