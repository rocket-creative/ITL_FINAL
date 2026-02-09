'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import LabSignalsSignup, { getRelatedLabSignalsArticles } from '@/components/UXUIDC/LabSignalsSignup';
import { IconDNA, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { UXUIDCResourceLinks, pointMutationResources, BreedingSchemeArchitectCTA } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Disease Variant Modeling",
  title: "Point Mutation Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has generated hundreds of point mutation mouse models for researchers studying disease mechanisms, protein function, and therapeutic development. Our mouse models have supported research published in more than 800 peer reviewed articles, including in Science, Nature, and Cell.",
  description: "Point mutation mice carry specific nucleotide changes at endogenous genomic loci, expressing variant proteins under normal regulatory control. Unlike overexpression systems, point mutation knockin models maintain physiological expression levels and tissue distribution."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Applications Data
const applicationsData = [
  {
    title: "Disease Variant Modeling",
    description: "Human genetic studies identify disease associated variants, but understanding how these variants cause disease requires functional models:",
    items: [
      { name: "GWAS variants", desc: "Model SNPs identified in genome wide association studies" },
      { name: "Mendelian disease mutations", desc: "Reproduce mutations causing inherited disorders" },
      { name: "Cancer driver mutations", desc: "Express oncogenic point mutations at endogenous loci" },
      { name: "Pharmacogenomic variants", desc: "Model variants affecting drug response" }
    ],
    note: "Point mutation knockin provides definitive evidence linking specific variants to phenotypic outcomes."
  },
  {
    title: "Protein Function Studies",
    description: "Point mutations enable precise dissection of protein function:",
    items: [
      { name: "Catalytic site mutations", desc: "Abolish enzymatic activity while preserving protein expression" },
      { name: "Phosphorylation site mutations", desc: "Block or mimic phosphorylation to study signaling" },
      { name: "Binding site mutations", desc: "Disrupt specific protein-protein or protein-ligand interactions" },
      { name: "Domain function", desc: "Identify essential residues within functional domains" }
    ]
  },
  {
    title: "Drug Target Modeling",
    description: "Point mutation models support therapeutic development:",
    items: [
      { name: "Resistance mutations", desc: "Model drug resistance variants for next generation compound development" },
      { name: "Humanized binding sites", desc: "Enable testing of human specific therapeutics" },
      { name: "Gain of function variants", desc: "Model activating mutations as therapeutic targets" }
    ]
  }
];

// Mutation Types Data
const mutationTypesData = [
  {
    title: "Missense Mutations",
    description: "Single nucleotide changes that alter the encoded amino acid:",
    points: [
      "Most common type of disease associated coding variant",
      "May affect protein folding, stability, or function",
      "Phenotypic severity varies from silent to lethal"
    ]
  },
  {
    title: "Nonsense Mutations",
    description: "Single nucleotide changes that create premature stop codons:",
    points: [
      "Typically result in truncated, non functional proteins",
      "May trigger nonsense mediated decay",
      "Model loss of function alleles"
    ]
  },
  {
    title: "Silent Mutations",
    description: "Nucleotide changes that do not alter the encoded amino acid:",
    points: [
      "Create restriction sites for genotyping",
      "Serve as linked markers for allele tracking",
      "Control for targeting procedure effects"
    ]
  },
  {
    title: "Regulatory Mutations",
    description: "Changes in non coding regulatory sequences:",
    points: [
      "Promoter or enhancer variants affecting expression level",
      "Splice site variants affecting transcript processing",
      "UTR variants affecting mRNA stability or translation"
    ]
  }
];

// Phosphorylation Table
const phosphorylationTable = [
  { mutation: "Serine to Alanine (S→A)", effect: "Blocks phosphorylation", application: "Loss of phospho regulation" },
  { mutation: "Threonine to Alanine (T→A)", effect: "Blocks phosphorylation", application: "Loss of phospho regulation" },
  { mutation: "Tyrosine to Phenylalanine (Y→F)", effect: "Blocks phosphorylation", application: "Loss of phospho regulation" },
  { mutation: "Serine to Aspartate (S→D)", effect: "Mimics phosphorylation", application: "Constitutive activation" },
  { mutation: "Serine to Glutamate (S→E)", effect: "Mimics phosphorylation", application: "Constitutive activation" }
];

// Common Disease Mutations Table
const diseaseMutationsTable = [
  { gene: "APP", mutation: "Swedish (K670N/M671L)", disease: "Alzheimer disease", application: "Amyloid pathology" },
  { gene: "KRAS", mutation: "G12D, G12V, G12C", disease: "Cancer", application: "Oncogenic signaling" },
  { gene: "BRAF", mutation: "V600E", disease: "Melanoma", application: "Targeted therapy studies" },
  { gene: "SOD1", mutation: "G93A", disease: "ALS", application: "Motor neuron disease" },
  { gene: "CFTR", mutation: "F508del", disease: "Cystic fibrosis", application: "Protein folding" }
];

// Allele Design Options
const alleleDesignOptions = [
  { name: "Simple knockin", desc: "Point mutation only" },
  { name: "Conditional point mutation", desc: "LoxP flanked wildtype exon enables Cre mediated conversion to mutant" },
  { name: "Inducible point mutation", desc: "Combine with inducible Cre for temporal control" },
  { name: "Dual reporter", desc: "Fluorescent markers distinguish wildtype from mutant expressing cells" }
];

// Experimental Considerations
const experimentalConsiderations = [
  {
    title: "Homozygous vs Heterozygous Analysis",
    description: "Consider the genetics of your disease or question:",
    items: [
      { name: "Dominant mutations", desc: "Heterozygotes may show phenotype; homozygotes may be more severe or lethal" },
      { name: "Recessive mutations", desc: "Homozygotes required for phenotype" },
      { name: "Haploinsufficiency", desc: "Heterozygotes show partial phenotype" },
      { name: "Gain of function", desc: "One copy may suffice for full effect" }
    ]
  },
  {
    title: "Strain Background",
    description: "Strain background can modify point mutation phenotypes:",
    items: [
      { name: "C57BL/6", desc: "Generate for consistency with most published literature" },
      { name: "Disease backgrounds", desc: "Consider strain specific modifiers for disease relevant backgrounds" },
      { name: "Consistency", desc: "Maintain consistent background for comparisons" }
    ],
    link: "/c57bl6-mouse-background"
  },
  {
    title: "Controls",
    description: "Appropriate controls for point mutation studies:",
    items: [
      { name: "Wildtype littermates", desc: "Same genetic background without mutation" },
      { name: "Heterozygous carriers", desc: "Intermediate genotype for dosage studies" },
      { name: "Parallel knockouts", desc: "Compare point mutation to complete loss of function" }
    ]
  }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Navarro HI, Daly AE, Rodriguez B, Wu S, Ngo KA, Fraser A, et al.",
    year: "2025",
    title: "NF-κB RelB suppresses the inflammatory gene expression programs of dendritic cells by competing with RelA for binding to target gene promoters.",
    journal: "Cell Discov",
    volume: "11(1): 13",
    link: "https://pubmed.ncbi.nlm.nih.gov/39929805/"
  },
  {
    authors: "Mohassel P, Hearn H, Rooney J, Zou Y, Johnson K, Norato G, et al.",
    year: "2025",
    title: "Collagen type VI regulates TGF-β bioavailability in skeletal muscle in mice.",
    journal: "J Clin Invest",
    volume: "135(9): e173354",
    link: "https://pubmed.ncbi.nlm.nih.gov/40309777/"
  },
  {
    authors: "Hockemeyer K, Sakellaropoulos T, Chen X, Ivashkiv O, et al.",
    year: "2024",
    title: "The stress response regulator HSF1 modulates natural killer cell anti-tumour immunity.",
    journal: "Nat Cell Biol",
    volume: "26(10): 1734-1744",
    link: "https://pubmed.ncbi.nlm.nih.gov/39223375/"
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const rothTestimonial = getTestimonialById('roth-upenn')!;

const testimonials = [
  { quote: rothTestimonial.quote, name: formatAuthorWithCredentials(rothTestimonial), affiliation: rothTestimonial.affiliation },
];

// Related Links
const relatedModelTypes = [
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Reporter Knockin", href: "/reporter-knockin" }
];

const diseaseApplications = [
  { title: "Alzheimer's Mouse Models", href: "/alzheimers-mouse-models" },
  { title: "Oncology Mouse Models", href: "/oncology-mouse-models" },
  { title: "Rare Disease Mouse Models", href: "/rare-disease-mouse-models" },
  { title: "Neuroscience Mouse Models", href: "/neuroscience-mouse-models" }
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
];

// FAQ Data
const faqData = [
  {
    question: "Can point mutations be introduced without disrupting normal gene expression?",
    answer: "Yes. Point mutation knockins change specific nucleotides while preserving all other gene sequences."
  },
  {
    question: "What types of point mutations can be modeled?",
    answer: "Any single or multiple nucleotide change can be modeled, including disease-associated variants, catalytic site mutations (kinase dead, protease dead), phosphorylation site mutations, and regulatory element mutations. Point mutations enable precise study of how specific amino acid changes affect protein function and disease phenotypes."
  },
  {
    question: "Can point mutations be made conditional?",
    answer: "Yes. Point mutations can be designed as conditional alleles using LoxP-flanked wildtype exons. Cre-mediated recombination converts wildtype to mutant sequence, enabling temporal or tissue-specific control over mutation expression. This is valuable for modeling mutations that would be lethal if expressed globally from conception."
  },
  {
    question: "What is the difference between homozygous and heterozygous point mutation models?",
    answer: "Heterozygous models are used for dominant mutations or haploinsufficiency studies. Homozygous models are required for recessive mutations. Some mutations show dose-dependent effects where heterozygotes show partial phenotypes and homozygotes show more severe or lethal phenotypes. Genetic analysis determines whether heterozygotes or homozygotes are appropriate."
  }
];

export default function PointMutationMicePage() {
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
              <IconDNA size={16} color="white" />
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

        {/* Applications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Applications of Point Mutation Models
            </h2>
            
            {applicationsData.map((app, index) => (
              <div key={index} className="animate-in" style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  {app.title}
                </h3>
                <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                  {app.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.items.map((item, idx) => (
                    <div 
                      key={idx}
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '6px',
                        borderLeft: '3px solid #008080'
                      }}
                    >
                      <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                      <span style={{ color: '#666', fontSize: '.9rem', marginLeft: '5px' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
                
                {app.note && (
                  <p style={{ color: '#008080', fontSize: '.9rem', fontStyle: 'italic', marginTop: '15px' }}>
                    {app.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Types of Point Mutations */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Types of Point Mutations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mutationTypesData.map((type, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {type.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                    {type.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {type.points.map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#666', fontSize: '.85rem' }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phosphorylation Table Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Common Point Mutation Applications
            </h2>
            
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Phosphorylation Site Mutations
            </h3>
            
            <div className="animate-in" style={{ overflowX: 'auto', marginBottom: '40px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Mutation Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Effect</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Application</th>
                  </tr>
                </thead>
                <tbody>
                  {phosphorylationTable.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.mutation}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.effect}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Common Disease Mutations
            </h3>
            
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Gene</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Mutation</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Disease</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Application</th>
                  </tr>
                </thead>
                <tbody>
                  {diseaseMutationsTable.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderBottom: '1px solid #e5e7eb'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.gene}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.mutation}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.disease}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Technical Approach Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Technical Approach
            </h2>
            
            <h3 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
              Allele Design Options
            </h3>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', marginBottom: '25px' }}>
              Point mutation alleles can be designed with varying complexity:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alleleDesignOptions.map((option, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '20px',
                    borderRadius: '8px',
                    borderLeft: '4px solid white'
                  }}
                >
                  <h4 style={{ color: 'white', fontWeight: 600, fontSize: '.95rem', marginBottom: '8px' }}>
                    {option.name}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>
                    {option.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experimental Considerations Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Experimental Considerations
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {experimentalConsiderations.map((consideration, index) => (
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

        {/* Publications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Point mutation models generated by ingenious targeting laboratory:
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
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '25px' }}>&ldquo;{testimonials[0].quote}&rdquo;</p>
              <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonials[0].name}</p>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.85rem', fontWeight: 400 }}>{testimonials[0].affiliation}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Point Mutation Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your point mutation requirements and optimal allele design for your research goals. Initial consultation is provided at no charge and includes mutation strategy, allele design options, timeline and price estimate.
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
              title="Point Mutation Resources"
              description="Download our free comparison chart to help plan your point mutation project."
              resources={pointMutationResources}
              variant="card"
            />
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Lab Signals Newsletter CTA */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Point Mutation Design Expertise"
              description="Subscribe to Lab Signals for expert insights on disease variant modeling, allele design strategies, and point mutation mouse generation."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/point-mutation-mice')}
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
                  Disease Model Applications
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {diseaseApplications.map((link, index) => (
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
            "name": "Point Mutation Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom point mutation mouse models for disease variant modeling. Precise SNP knockin at endogenous loci with pre germline verification. Since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
