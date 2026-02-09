'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconX } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Global Gene Deletion",
  title: "Conventional Knockout Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has generated over 2,500 custom mouse models, including conventional knockouts - providing researchers with definitive loss of function tools for understanding gene function across every major therapeutic area.",
  description: "Conventional knockout mice, also known as global or constitutive knockouts, carry complete gene inactivation in all tissues throughout development and adult life. These models establish the fundamental phenotypic consequences of gene loss and serve as the foundation for understanding target biology."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Key Characteristics
const keyCharacteristics = [
  {
    title: "Global Inactivation",
    description: "The target gene is disrupted in all tissues and cell types. This provides a comprehensive view of gene function across the entire organism."
  },
  {
    title: "Constitutive Expression",
    description: "Gene inactivation is present from fertilization onward. There is no temporal control over when the gene is deleted."
  },
  {
    title: "Definitive Null",
    description: "When properly designed, conventional knockouts produce complete loss of gene function with no residual protein expression."
  },
  {
    title: "Germline Transmission",
    description: "The null allele is transmitted through the germline, enabling breeding of stable knockout colonies."
  }
];

// Applications Data
const applicationsData = [
  {
    title: "Target Validation",
    description: "Conventional knockouts establish the phenotypic consequences of complete target inhibition. Before investing in therapeutic development, researchers can assess whether target loss produces the desired biological effect.",
    questions: [
      "What phenotypes result from complete gene loss?",
      "Is the gene essential for viability or fertility?",
      "Which organ systems are affected by gene deletion?",
      "Does gene loss produce the anticipated therapeutic benefit?"
    ]
  },
  {
    title: "Gene Function Studies",
    description: "Understanding normal gene function requires observing consequences of gene absence:",
    items: [
      { name: "Developmental Biology", desc: "Identify roles in embryonic development, organogenesis, and tissue differentiation" },
      { name: "Physiological Studies", desc: "Characterize contributions to normal organ function, metabolism, and homeostasis" },
      { name: "Behavioral Analysis", desc: "Assess roles in neurological function, learning, memory, and behavior" }
    ]
  },
  {
    title: "Disease Modeling",
    description: "Knockout of disease associated genes can model human genetic conditions:",
    items: [
      { name: "Loss of Function Diseases", desc: "Many genetic diseases result from gene loss or dysfunction. Knockout mice can model these conditions" },
      { name: "Tumor Suppressor Biology", desc: "Knockout of tumor suppressor genes enables cancer research, though conditional approaches are often preferred" },
      { name: "Therapeutic Rescue Studies", desc: "Knockout phenotypes provide endpoints for gene therapy or enzyme replacement studies" }
    ]
  }
];

// Allele Design Data
const alleleDesignData = [
  {
    title: "Critical Exon Deletion",
    description: "The most common approach deletes one or more critical exons from the target gene:",
    items: [
      { name: "Exon Selection Criteria", desc: "Target early coding exons that are present in all transcript variants. Select exons whose deletion shifts the reading frame" },
      { name: "Frame Shifting", desc: "Deletion should produce a frame shift that introduces premature stop codons. This triggers nonsense mediated decay" },
      { name: "Functional Domain Disruption", desc: "When possible, delete exons encoding critical functional domains to ensure loss of activity" }
    ]
  },
  {
    title: "Selection Cassette Insertion",
    description: "Gene trap approaches insert a selection cassette that disrupts transcription:",
    items: [
      { name: "Splice Acceptor Trapping", desc: "A splice acceptor captures transcription from the endogenous promoter, preventing downstream exon expression" },
      { name: "Polyadenylation Signal", desc: "A polyadenylation signal terminates transcription within the cassette" },
      { name: "LacZ Reporter", desc: "Many knockout first designs include a LacZ reporter that enables expression monitoring" }
    ]
  },
  {
    title: "Knockout First Strategy",
    description: "The knockout first strategy provides flexibility for researchers who may need both conventional and conditional options:",
    items: [
      { name: "Initial Knockout Function", desc: "The knockout-first design disrupts gene function through cassette insertion, functioning as a conventional knockout" },
      { name: "Conversion Options", desc: "Flp recombinase removes the cassette, enabling generation of conditional knockouts from the same targeted line" }
    ]
  }
];

// Considerations Data
const considerationsData = [
  {
    title: "Embryonic Lethality",
    description: "Many genes are essential for development. Complete gene loss may result in:",
    items: [
      { name: "Early Embryonic Lethality", desc: "Essential genes may cause pre implantation or early post implantation death" },
      { name: "Mid Gestation Lethality", desc: "Cardiovascular, placental, or other developmental defects may cause death during organogenesis" },
      { name: "Perinatal Lethality", desc: "Some knockouts survive to birth but die shortly after due to respiratory, cardiac, or metabolic defects" },
      { name: "Conditional Alternatives", desc: "For essential genes, conditional knockouts allow study of gene function in specific tissues or adult animals" }
    ],
    link: "/conditional-knockout-mouse-models"
  },
  {
    title: "Developmental Compensation",
    description: "Constitutive gene loss from fertilization may trigger compensatory mechanisms:",
    items: [
      { name: "Genetic Compensation", desc: "Upregulation of related genes may partially mask phenotypes that would appear with acute gene loss" },
      { name: "Developmental Adaptation", desc: "Alternative developmental pathways may bypass requirements for the deleted gene" },
      { name: "Inducible Alternatives", desc: "Tamoxifen inducible knockouts enable acute gene deletion in adults, avoiding developmental compensation" }
    ],
    link: "/inducible-conditional-knockout"
  },
  {
    title: "Background Strain Effects",
    description: "Phenotypes often depend on genetic background:",
    items: [
      { name: "Strain Modifiers", desc: "Modifier loci can enhance or suppress knockout phenotypes on different backgrounds" },
      { name: "C57BL/6 Standard", desc: "Most common background for knockout phenotyping due to extensive characterization" },
      { name: "Controlled Comparisons", desc: "Use littermate wild type controls from heterozygous crosses to ensure valid phenotype attribution" }
    ],
    link: "/c57bl6-mouse-background"
  }
];

// Comparison Table Data
const comparisonData = [
  { factor: "Gene essentiality", conventional: "May cause lethality", conditional: "Avoids developmental requirements" },
  { factor: "Tissue specificity", conventional: "All tissues affected", conditional: "Specific tissues targeted" },
  { factor: "Temporal control", conventional: "Gene absent from conception", conditional: "Gene deleted when desired" },
  { factor: "Compensation", conventional: "May occur during development", conditional: "Avoided with adult deletion" },
  { factor: "Complexity", conventional: "Simpler allele design", conditional: "Requires Cre breeding" },
  { factor: "Timeline", conventional: "Faster to study ready", conditional: "Additional breeding required" }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Reinartz DM, Escamilla-Rivera V, Shao M, Tribble SL, Caulin C, Wilson JE.",
    year: "2025",
    title: "Impact of absent in melanoma 2 on head and neck squamous cell carcinoma development.",
    journal: "J Immunol",
    volume: "vkaf224",
    link: "https://pubmed.ncbi.nlm.nih.gov/41042265/"
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

const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;

const testimonials = [
  { quote: dunaiefTestimonial.quote, name: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation },
];

// Related Links
const relatedModelTypes = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" }
];

const relatedGuides = [
  { title: "Conditional vs Conventional Guide", href: "/conditional-vs-conventional-guide" },
  { title: "Knockout Strategy Guide", href: "/knockout-strategy-guide" },
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" }
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between a conventional knockout and a conditional knockout?",
    answer: "A conventional knockout permanently eliminates gene function in all tissues. A conditional knockout uses the Cre-lox system to control when and where gene deletion occurs, allowing tissue-specific or temporally controlled inactivation while preserving gene function in other tissues."
  },
  {
    question: "Will my conventional knockout be embryonic lethal?",
    answer: "This depends on whether your target gene is essential for development. If previous studies indicate embryonic lethality, or if no knockout data exists for your gene, we recommend a conditional (floxed) allele design that can function as a conventional knockout when crossed to germline Cre, while preserving conditional options."
  },
  {
    question: "How is gene function eliminated in a conventional knockout?",
    answer: "Allele design ensures complete loss of function through critical exon deletion that causes frameshift and nonsense-mediated decay."
  },
  {
    question: "Can I convert a conventional knockout to a conditional knockout later?",
    answer: "If your conventional knockout was generated using a knockout-first allele design, then yes. Flp recombinase converts the knockout-first allele to a conditional-ready allele. If the knockout was generated by simple exon deletion, a new conditional targeting project would be required."
  },
  {
    question: "How long does it take to generate a conventional knockout mouse?",
    answer: "Conventional knockout projects include targeting design, microinjection, and breeding founders to germline transmission. Project timelines vary based on gene complexity and specific requirements. Contact us for a detailed timeline estimate for your project."
  }
];

export default function ConventionalKnockoutMouseModelsPage() {
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
                <IconX size={16} color="white" />
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

        {/* What Is Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              What Is a Conventional Knockout?
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '40px' }}>
              A conventional knockout mouse carries a null allele that inactivates the target gene in every cell of the body from the earliest stages of development. Unlike conditional knockouts, which allow tissue specific or temporal control of gene deletion, conventional knockouts provide complete and permanent gene inactivation.
            </p>
            
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '25px' }}>
              Key Characteristics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyCharacteristics.map((char, index) => (
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
                    {char.title}
                  </h4>
                  <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {char.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Applications of Conventional Knockouts
            </h2>
            
            {applicationsData.map((app, index) => (
              <div key={index} className="animate-in" style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  {app.title}
                </h3>
                <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                  {app.description}
                </p>
                
                {app.questions && (
                  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                    <p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '10px' }}>Key questions addressed:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {app.questions.map((q, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                          <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ color: '#555', fontSize: '.9rem' }}>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {app.items && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {app.items.map((item, idx) => (
                      <div 
                        key={idx}
                        style={{
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '8px',
                          borderTop: '3px solid #2384da'
                        }}
                      >
                        <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '8px' }}>
                          {item.name}
                        </h4>
                        <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Allele Design Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Allele Design for Conventional Knockouts
            </h2>
            
            {alleleDesignData.map((design, index) => (
              <div key={index} className="animate-in" style={{ marginBottom: '35px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '12px' }}>
                  {design.title}
                </h3>
                <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '15px' }}>
                  {design.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {design.items.map((item, idx) => (
                    <div 
                      key={idx}
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '6px',
                        borderLeft: '3px solid #008080'
                      }}
                    >
                      <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                      <span style={{ color: '#666', fontSize: '.85rem', marginLeft: '5px' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Considerations Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Considerations for Conventional Knockouts
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {considerationsData.map((consideration, index) => (
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
                  <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    {consideration.description}
                  </p>
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

        {/* Comparison Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Conventional vs Conditional Knockout
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', marginBottom: '30px' }}>
              Choosing between conventional and conditional approaches depends on research goals:
            </p>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Factor</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Conventional</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Conditional</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        borderBottom: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: 'white', fontWeight: 500 }}>{row.factor}</td>
                      <td style={{ padding: '12px 15px', color: 'rgba(255,255,255,0.9)' }}>{row.conventional}</td>
                      <td style={{ padding: '12px 15px', color: 'rgba(255,255,255,0.9)' }}>{row.conditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="animate-in mt-6">
              <Link 
                href="/conditional-vs-conventional-guide"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>View Complete Comparison Guide</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
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
              According to PubMed, Ingenious conventional knockout mouse models continue to provide essential insights across research areas:
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
                    textAlign: testimonials.length === 1 ? 'center' : 'left',
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
              Start Your Conventional Knockout Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your gene target and recommend the optimal allele design for your research goals. Initial consultation is provided at no charge.
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
              variant="banner"
              title="Knockout Technology Insights"
              description="Get expert insights on knockout technology, allele design strategies, and the latest advances in gene targeting delivered to your inbox. Written by PhD scientists for researchers."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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
                  Related Guides
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedGuides.map((link, index) => (
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
            "name": "Conventional Knockout Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Conventional knockout mouse models for global gene deletion studies. Complete gene inactivation throughout the organism.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
