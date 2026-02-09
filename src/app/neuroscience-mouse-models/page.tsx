'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconTarget, IconSettings, IconChevronRight, IconCheckCircle, IconBrain } from '@/components/UXUIDC/Icons';
import { GlossaryTermLink, BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Brain & Behavior Research",
  title: "Neuroscience Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported neuroscience researchers with custom mouse models contributing to peer reviewed publications in Nature Neuroscience, Neuron, Cell, Journal of Neuroscience, and leading neuroscience journals worldwide.",
  description: "Our neuroscience mouse models have advanced understanding of neural development, synaptic function, behavior, and neurological disease."
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
  text: "Neuroscience mouse models enable researchers to investigate the molecular and cellular mechanisms underlying brain function and dysfunction. From cell type specific knockouts that dissect neural circuit function to disease mutation knockins that model neurological conditions, the right model design is critical for understanding the nervous system and developing treatments for neurological disorders.",
  highlight: "Conditional approaches are particularly important in neuroscience, where the same gene often has distinct functions in different neuronal populations, glial cells, and developmental stages. ingenious targeting laboratory designs and generates custom neuroscience models tailored to your specific research questions."
};

// Neuronal Cre Drivers Table
const neuronalCreDrivers = [
  { driver: "Nestin Cre", target: "Neural progenitors", timing: "E10.5", applications: "Pan neural knockout" },
  { driver: "Synapsin Cre", target: "Mature neurons", timing: "Postnatal", applications: "Post mitotic neuron function" },
  { driver: "CamKIIα Cre", target: "Forebrain excitatory neurons", timing: "P14+", applications: "Learning, memory, cognition" },
  { driver: "Emx1 Cre", target: "Cortical excitatory neurons", timing: "E10.5", applications: "Cortical development, function" },
  { driver: "DAT Cre", target: "Dopaminergic neurons", timing: "E15", applications: "Reward, movement, Parkinson" },
  { driver: "Chat Cre", target: "Cholinergic neurons", timing: "E12.5", applications: "Motor function, cognition" },
  { driver: "Pvalb Cre", target: "Parvalbumin interneurons", timing: "Postnatal", applications: "Inhibitory circuits, oscillations" },
  { driver: "Sst Cre", target: "Somatostatin interneurons", timing: "Postnatal", applications: "Cortical inhibition" },
  { driver: "Vgat Cre", target: "GABAergic neurons", timing: "E12.5", applications: "All inhibitory neurons" },
  { driver: "Vglut2 Cre", target: "Glutamatergic neurons", timing: "E11.5", applications: "Excitatory transmission" }
];

// Glial Cre Drivers Table
const glialCreDrivers = [
  { driver: "GFAP Cre", target: "Astrocytes", timing: "E14.5", applications: "Glial function, gliosis" },
  { driver: "Aldh1l1 Cre", target: "Astrocytes", timing: "Postnatal", applications: "More specific astrocyte targeting" },
  { driver: "Olig2 Cre", target: "Oligodendrocyte lineage", timing: "E12.5", applications: "Myelination" },
  { driver: "PLP Cre", target: "Mature oligodendrocytes", timing: "Postnatal", applications: "Myelin maintenance" },
  { driver: "CX3CR1 Cre", target: "Microglia", timing: "Embryonic", applications: "Neuroinflammation" }
];

// Inducible Neural Cre Lines
const inducibleCreLines = [
  { name: "CamKIIα CreERT2", description: "Inducible deletion in forebrain excitatory neurons" },
  { name: "Nestin CreERT2", description: "Inducible deletion in neural progenitors" },
  { name: "GFAP CreERT2", description: "Inducible deletion in astrocytes" },
  { name: "PLP CreERT2", description: "Inducible deletion in oligodendrocytes" }
];

// Neurodegenerative Disease Data
const neurodegenerativeData = [
  {
    title: "Alzheimer Disease",
    description: "Models addressing amyloid and tau pathology:",
    models: [
      "APP knockin models expressing familial AD mutations",
      "Tau knockin and humanization models",
      "Presenilin knockout and knockin models",
      "Microglial gene modifications for neuroinflammation studies"
    ],
    link: "/alzheimers-mouse-models"
  },
  {
    title: "Parkinson Disease",
    description: "Models for dopaminergic neuron biology and alpha synuclein pathology:",
    models: [
      "Alpha synuclein knockin and overexpression models",
      "LRRK2 mutation knockins",
      "PINK1, Parkin, DJ1 knockouts for mitochondrial dysfunction",
      "DAT Cre mediated conditional knockouts in dopaminergic neurons"
    ],
    link: "/parkinsons-mouse-models"
  },
  {
    title: "ALS and Motor Neuron Disease",
    description: "Models for motor neuron degeneration:",
    models: [
      "SOD1 mutation knockins (G93A, G85R)",
      "TDP43 and FUS mutation models",
      "C9orf72 repeat expansion models"
    ],
    link: "/als-mouse-models"
  },
  {
    title: "Huntington Disease",
    description: "Models for polyglutamine expansion pathology:",
    models: [
      "HTT knockin models with expanded CAG repeats",
      "Conditional HTT knockouts",
      "Striatal specific models using D1R or D2R Cre drivers"
    ],
    link: "/huntingtons-mouse-models"
  }
];

// Research Applications Data
const researchApplicationsData = [
  {
    title: "Neural Circuit Dissection",
    description: "Cell type specific knockouts enable circuit level analysis:",
    points: [
      "Identify which neurons require specific genes for circuit function",
      "Distinguish cell autonomous from circuit level effects",
      "Map gene function to specific neural populations",
      "Combine with optogenetics and chemogenetics"
    ]
  },
  {
    title: "Synaptic Function",
    description: "Models for studying synaptic transmission and plasticity:",
    points: [
      "Receptor knockout and knockin models",
      "Synaptic vesicle and release machinery modifications",
      "Postsynaptic density protein studies",
      "Synaptic plasticity gene modifications"
    ]
  },
  {
    title: "Behavioral Studies",
    description: "Models supporting behavioral neuroscience:",
    points: [
      "Learning and memory (hippocampal, cortical)",
      "Anxiety and depression (limbic circuits)",
      "Motor function (basal ganglia, cerebellum)",
      "Social behavior (prefrontal, amygdala)",
      "Reward and addiction (VTA, nucleus accumbens)"
    ]
  },
  {
    title: "Developmental Neuroscience",
    description: "Models for neural development studies:",
    points: [
      "Neural progenitor gene function",
      "Neuronal migration and differentiation",
      "Axon guidance and synaptogenesis",
      "Critical period plasticity"
    ]
  }
];

// Model Types Data
const modelTypesData = [
  {
    title: "Conditional Knockout",
    description: "Essential for neuroscience due to:",
    points: [
      "Many neural genes cause embryonic lethality when deleted globally",
      "Cell type specificity reveals circuit level gene function",
      "Temporal control distinguishes developmental from adult roles",
      "Brain region specificity possible with appropriate Cre drivers"
    ],
    link: "/conditional-knockout-mouse-models"
  },
  {
    title: "Point Mutation Knockin",
    description: "Model disease associated variants at physiological levels:",
    points: [
      "Familial disease mutations (AD, PD, HD)",
      "GWAS identified risk variants",
      "Phosphorylation site mutations for signaling studies"
    ],
    link: "/point-mutation-mice"
  },
  {
    title: "Reporter Knockin",
    description: "Visualize gene expression and cell populations:",
    points: [
      "Cell type markers for identification and sorting",
      "Activity reporters for functional imaging",
      "Lineage tracing of neural progenitors"
    ],
    link: "/reporter-knockin"
  }
];

// Technical Considerations Data
const technicalData = [
  {
    icon: IconDNA,
    title: "Strain Background",
    description: "Strain background affects neural and behavioral phenotypes:",
    strains: [
      { name: "C57BL/6", desc: "Most common, good learning performance, some anxiety" },
      { name: "129 strains", desc: "Variable behavioral phenotypes, less commonly used" },
      { name: "BALB/c", desc: "Distinct behavioral profile, higher anxiety" },
      { name: "FVB", desc: "Good for transgenics but retinal degeneration (rd1)" }
    ],
    note: "C57BL/6 is generally preferred for neuroscience to enable comparison with published literature and behavioral databases."
  },
  {
    icon: IconTarget,
    title: "Behavioral Phenotyping Considerations",
    points: ["Age matching for behavioral cohorts", "Sex as biological variable", "Circadian timing of testing", "Environmental standardization", "Appropriate statistical power"]
  }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
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
const neurodegenerativeLinks = [
  { title: "Alzheimer Mouse Models", href: "/alzheimers-mouse-models" },
  { title: "Parkinson Mouse Models", href: "/parkinsons-mouse-models" },
  { title: "ALS Mouse Models", href: "/als-mouse-models" },
  { title: "Huntington Mouse Models", href: "/huntingtons-mouse-models" }
];

const relatedModelTypes = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Reporter Knockin", href: "/reporter-knockin" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" }
];

const relatedTechnologies = [
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" }
];

const projectResources = [
  { title: "FAQs", href: "/faqs" }
];

// FAQ Data
const getFaqData = () => [
  {
    question: "Why are conditional knockouts essential for neuroscience research?",
    answer: (
      <>
        Many neural genes are essential for embryonic development and cause lethality when deleted globally. <GlossaryTermLink term="conditional-knockout-mouse-models">Conditional knockouts</GlossaryTermLink> allow gene deletion in specific cell types (neurons, astrocytes, microglia) or brain regions, enabling study of gene function in adult animals without developmental defects.
      </>
    )
  },
  {
    question: "What Cre driver lines are available for neuroscience research?",
    answer: (
      <>
        Common neural <GlossaryTermLink term="cre-driver-line">Cre drivers</GlossaryTermLink> include Nestin-Cre (neural progenitors), Synapsin-Cre (neurons), GFAP-Cre (astrocytes), and CX3CR1-Cre (microglia). <GlossaryTermLink term="inducible-cre-ert2">Inducible CreERT2 systems</GlossaryTermLink> enable <GlossaryTermLink term="temporal-control">temporal control</GlossaryTermLink>. Cre driver selection depends on your target cell type and research question.
      </>
    )
  },
  {
    question: "Can I model neurodegenerative diseases with mouse models?",
    answer: (
      <>
        Yes. <GlossaryTermLink term="point-mutation">Point mutation</GlossaryTermLink> <GlossaryTermLink term="knockin-mouse-models">knockins</GlossaryTermLink> can introduce human disease mutations (e.g., APP, tau, α-synuclein mutations for AD, PD). <GlossaryTermLink term="conditional-knockout-mouse-models">Conditional systems</GlossaryTermLink> enable <GlossaryTermLink term="tissue-specific-knockout">tissue-specific</GlossaryTermLink> expression of disease proteins. <GlossaryTermLink term="reporter-gene-reporter-allele">Reporter knockins</GlossaryTermLink> enable visualization of disease protein aggregation and spread.
      </>
    )
  },
  {
    question: "What strain background is best for behavioral neuroscience studies?",
    answer: "C57BL/6 is most commonly used for behavioral studies due to good learning performance, extensive characterization, and compatibility with published behavioral databases. BALB/c and 129 strains have distinct behavioral profiles that may be appropriate for specific research questions."
  },
  {
    question: "How do I ensure reproducible behavioral phenotypes?",
    answer: (
      <>
        Standardize age, sex, circadian timing, and environmental conditions. Use littermate controls from <GlossaryTermLink term="zygosity">heterozygous</GlossaryTermLink> crosses. Ensure adequate statistical power. Consider that genetic background modifiers can affect behavioral outcomes, so maintaining defined backgrounds through <GlossaryTermLink term="colony-management-backcrossing">backcrossing</GlossaryTermLink> is important.
      </>
    )
  }
];

export default function NeuroscienceMouseModelsPage() {
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
              <IconBrain size={16} color="white" />
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

        {/* Cell Type Specific Approaches Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Cell Type Specific Approaches
            </h2>
            
            {/* Neuronal Cre Drivers */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Neuronal Cre Drivers
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Conditional knockouts enable gene deletion in specific neuronal populations:
              </p>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Population</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Timing</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {neuronalCreDrivers.map((row, index) => (
                      <tr 
                        key={index}
                        style={{ 
                          backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                          borderBottom: '1px solid #e5e7eb'
                        }}
                      >
                        <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.target}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.timing}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Glial Cre Drivers */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Glial Cre Drivers
              </h3>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Population</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Timing</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {glialCreDrivers.map((row, index) => (
                      <tr 
                        key={index}
                        style={{ 
                          backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                          borderBottom: '1px solid #e5e7eb'
                        }}
                      >
                        <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.target}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.timing}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inducible Neural Cre Lines */}
            <div className="animate-in">
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Inducible Neural Cre Lines
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Tamoxifen inducible Cre (CreERT2) enables temporal control over gene deletion in the nervous system:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inducibleCreLines.map((line, index) => (
                  <div 
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: '15px',
                      borderRadius: '6px',
                      borderLeft: '3px solid #008080'
                    }}
                  >
                    <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{line.name}:</span>
                    <span style={{ color: '#666', fontSize: '.9rem', marginLeft: '8px' }}>{line.description}</span>
                  </div>
                ))}
              </div>
              
              <p style={{ color: '#008080', fontSize: '.9rem', fontStyle: 'italic', marginTop: '15px' }}>
                Inducible systems enable adult onset gene deletion, bypassing developmental requirements and modeling acute loss of function.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Link 
                  href="/tissue-specific-cre-lines"
                  className="inline-flex items-center gap-2 transition-colors duration-300"
                  style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
                >
                  <span>View Cre Driver Lines</span>
                  <IconChevronRight size={16} color="#008080" />
                </Link>
                <Link 
                  href="/inducible-conditional-knockout"
                  className="inline-flex items-center gap-2 transition-colors duration-300"
                  style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
                >
                  <span>Learn about Inducible Systems</span>
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Neurodegenerative Disease Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              Neurodegenerative Disease Models
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {neurodegenerativeData.map((disease, index) => (
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
                    {disease.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.9rem', marginBottom: '15px' }}>
                    {disease.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                    {disease.models.map((model, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', color: '#555', fontSize: '.85rem' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{model}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={disease.link}
                    className="inline-flex items-center gap-2 transition-colors duration-300"
                    style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
                  >
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#2384da" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Applications Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              Research Applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchApplicationsData.map((app, index) => (
                <div 
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '25px',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {app.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                    {app.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {app.points.map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>
                        <IconCheckCircle size={14} color="white" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Model Types Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              Model Types for Neuroscience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modelTypesData.map((model, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #2384da'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {model.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.9rem', marginBottom: '15px' }}>
                    {model.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                    {model.points.map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', color: '#555', fontSize: '.85rem' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={model.link}
                    className="inline-flex items-center gap-2 transition-colors duration-300"
                    style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
                  >
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#2384da" />
                  </Link>
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
                      backgroundColor: '#f8f9fa',
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
                        {item.description && (
                          <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                            {item.description}
                          </p>
                        )}
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
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                              {item.strains.map((strain, idx) => (
                                <div key={idx} style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px' }}>
                                  <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem' }}>{strain.name}:</span>
                                  <span style={{ color: '#666', fontSize: '.85rem', marginLeft: '5px' }}>{strain.desc}</span>
                                </div>
                              ))}
                            </div>
                            {item.note && (
                              <p style={{ color: '#008080', fontSize: '.85rem', fontStyle: 'italic', marginTop: '15px' }}>
                                {item.note}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="animate-in mt-6">
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
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Neuroscience models generated by ingenious targeting laboratory:
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

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
              Start Your Neuroscience Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your neuroscience research requirements and recommend the optimal model design and Cre driver selection for your program. Initial consultation is provided at no charge.
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
            <LabSignalsSignup title="Neuroscience Mouse Model Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Neurodegenerative Disease Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {neurodegenerativeLinks.map((link, index) => (
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
            "name": "Neuroscience Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom neuroscience mouse models for brain and behavior research. Neuronal knockouts, circuit dissection, and neurodegenerative disease models. Since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
