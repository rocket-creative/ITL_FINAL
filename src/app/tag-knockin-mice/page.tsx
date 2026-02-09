'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconQuote, IconChevronRight, IconFlask } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Protein Detection & Purification",
  title: "Tag Knockin Mice",
  intro: "Since 1998, ingenious targeting laboratory has generated epitope tag knockin models that enable detection, purification, and study of endogenous proteins. Tag knockin mice express epitope tagged proteins from the endogenous locus, providing physiological expression levels without requiring gene-specific antibodies.",
  description: "Whether you need FLAG, HA, V5, Myc, or other epitope tags, ingenious targeting laboratory designs and generates tag knockin alleles optimized for your specific protein detection and purification goals."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Why Use Tag Knockin Data
const whyTagKnockinData = [
  {
    title: "Overcoming Antibody Limitations",
    description: "High quality antibodies are not available for every protein of interest. Even when antibodies exist, they may not work in all applications such as immunoprecipitation, ChIP, or live cell imaging. Tag knockin models provide standardized detection reagents that work reliably across multiple applications."
  },
  {
    title: "Physiological Expression Levels",
    description: "Unlike overexpression approaches, tag knockin preserves endogenous regulatory control. The tagged protein is expressed at normal levels from the native promoter, avoiding artifacts associated with ectopic or overexpressed constructs."
  },
  {
    title: "Consistent Detection Across Conditions",
    description: "Epitope tag antibodies work identically regardless of the tagged protein's identity. This enables standardized protocols for detection and purification that work reliably across different target proteins."
  }
];

// Common Epitope Tags Data
const epitopeTagsData = [
  {
    title: "FLAG Tag",
    sequence: "DYKDDDDK",
    description: "The FLAG tag is an 8 amino acid peptide with excellent antibody availability and low immunogenicity. FLAG tagged proteins can be detected by immunoblotting, immunofluorescence, and flow cytometry, and purified by anti FLAG affinity chromatography.",
    note: "Multiple FLAG copies (3xFLAG) increase detection sensitivity for low abundance proteins.",
    link: "/flag-tag-knockin"
  },
  {
    title: "HA Tag",
    sequence: "YPYDVPDYA",
    description: "The HA tag derives from influenza hemagglutinin and provides robust detection with widely available antibodies. HA is particularly useful for immunofluorescence and immunoprecipitation applications.",
    link: "/ha-tag-knockin"
  },
  {
    title: "V5 Tag",
    sequence: "GKPIPNPLLGLDST",
    description: "The V5 tag from simian virus 5 provides sensitive detection with minimal cross reactivity. V5 is often used when multiple tagged proteins need to be distinguished in the same experiment."
  },
  {
    title: "Myc Tag",
    sequence: "EQKLISEEDL",
    description: "The Myc tag from c-Myc provides excellent immunoprecipitation performance and works well for protein interaction studies."
  },
  {
    title: "His Tag",
    sequence: "HHHHHH (6xHis)",
    description: "Polyhistidine tags enable affinity purification using nickel or cobalt resins. His tags are particularly useful when large scale protein purification from tissue is required."
  }
];

// Tag Placement Considerations
const tagPlacementData = [
  {
    title: "N Terminal Tagging",
    description: "N terminal tags are positioned immediately after the start codon. This placement is appropriate when the protein's C terminus is functionally important or when the N terminus is accessible for antibody binding.",
    note: "N terminal tagging may interfere with signal peptide cleavage for secreted proteins or with N terminal modifications."
  },
  {
    title: "C Terminal Tagging",
    description: "C terminal tags are positioned immediately before the stop codon. This placement is appropriate when the protein's N terminus is functionally important or when the C terminus is accessible.",
    note: "C terminal tagging may interfere with C terminal processing or with GPI anchor addition for membrane proteins."
  },
  {
    title: "Internal Tagging",
    description: "For proteins where both termini are functionally important, internal tag placement in a flexible loop region may preserve protein function while enabling detection."
  },
  {
    title: "Linker Sequences",
    description: "Flexible linker sequences between the tag and the protein can improve accessibility for antibody binding and reduce steric interference with protein function."
  }
];

// Applications Data
const applicationsData = [
  {
    title: "Protein Detection and Localization",
    description: "Tag knockin enables detection of endogenous proteins in tissues and cells using anti-tag antibodies. This is particularly valuable when gene-specific antibodies are unavailable or unreliable."
  },
  {
    title: "Protein Purification",
    description: "Affinity purification using anti-tag resins enables isolation of endogenous protein complexes for mass spectrometry analysis, enzymatic studies, or structural biology."
  },
  {
    title: "Chromatin Immunoprecipitation",
    description: "ChIP with anti-tag antibodies enables mapping of transcription factor binding sites when ChIP grade antibodies for the protein of interest are unavailable."
  },
  {
    title: "Protein Interaction Studies",
    description: "Immunoprecipitation of tagged proteins followed by mass spectrometry identifies interacting partners under physiological conditions."
  },
  {
    title: "Live Imaging",
    description: "Fluorescent protein tags enable live imaging of protein dynamics. GFP, mCherry, tdTomato, and other fluorescent tags can be knocked in to enable real time visualization.",
    link: "/gfp-knockin-mice"
  }
];

// Design Considerations
const designConsiderationsData = [
  {
    title: "Allele Architecture",
    description: "Tag knockin alleles are designed to insert the epitope tag sequence in frame with the target protein coding sequence."
  },
  {
    title: "Validation Strategy",
    description: "Tagged protein expression is validated by immunoblotting and immunofluorescence using anti-tag antibodies. Comparison with untagged littermates confirms specificity of detection."
  }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Tebbe L, Mwoyosvi ML, Crane R, Makia MS, Kakakhel M, Cosgrove D, Al-Ubaidi MR, Naash MI.",
    year: "2023",
    title: "The usherin mutation c.2299delG leads to its mislocalization and disrupts interactions with whirlin and VLGR1.",
    journal: "Nat Commun",
    volume: "14(1): 972",
    link: "https://pubmed.ncbi.nlm.nih.gov/36810733/"
  },
  {
    authors: "Rumney RMH, Róg J, Chira N, Kao AP, Al-Khalidi R, Górecki DC.",
    year: "2022",
    title: "P2X7 Purinoceptor Affects Ectopic Calcification of Dystrophic Muscles.",
    journal: "Front Pharmacol",
    volume: "13: 935804",
    link: "https://pubmed.ncbi.nlm.nih.gov/35910348/"
  },
  {
    authors: "Samant SA, Pillai VB, Gupta MP.",
    year: "2021",
    title: "Skeletal muscle-specific over-expression of the nuclear sirtuin SIRT6 blocks cancer-associated cachexia by regulating multiple targets.",
    journal: "JCSM Rapid Commun",
    volume: "4(1): 40-56",
    link: "https://pubmed.ncbi.nlm.nih.gov/34212132/"
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
const specificTagModels = [
  { title: "FLAG Tag Knockin", href: "/flag-tag-knockin" },
  { title: "HA Tag Knockin", href: "/ha-tag-knockin" },
  { title: "GFP Knockin Mice", href: "/gfp-knockin-mice" },
  { title: "tdTomato Knockin Mice", href: "/tdtomato-knockin-mice" },
  { title: "LacZ Knockin Mice", href: "/lacz-knockin-mice" }
];

const relatedModelTypes = [
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Reporter Knockin", href: "/reporter-knockin" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "cDNA Knockin", href: "/cdna-knockin" }
];

// FAQ Data
const faqData = [
  {
    question: "What epitope tags are available for knockin models?",
    answer: "Common tags include FLAG, HA (hemagglutinin), V5, Myc, and His tags. Tag selection depends on antibody availability, compatibility with your experimental systems, and whether the tag needs to be cleavable. FLAG and HA are most commonly used due to excellent antibody quality and commercial availability."
  },
  {
    question: "How do I choose between N-terminal and C-terminal tag placement?",
    answer: "Tag placement depends on protein structure and function. N-terminal tags can interfere with signal peptides or membrane targeting sequences. C-terminal tags avoid signal sequence issues but may affect protein-protein interactions at the terminus. Our scientific team discusses your target protein structure and tag positioning."
  },
  {
    question: "Can tagged proteins be used for live imaging?",
    answer: "Yes, but standard epitope tags (FLAG, HA, V5) require fixation and antibodies for detection. For live imaging, fluorescent protein tags (GFP, mCherry, tdTomato) are used instead. These can be knocked in similarly to epitope tags and enable real time visualization of protein localization and dynamics in living cells and tissues."
  },
  {
    question: "What is the advantage of tag knockin over using gene-specific antibodies?",
    answer: "Tag knockins provide consistent, reliable detection without requiring high-quality gene-specific antibodies, which may not exist or may have poor specificity. Tag antibodies are well-characterized and work across many applications (Western blot, immunoprecipitation, immunofluorescence). Tagged proteins are expressed at physiological levels under native regulation, avoiding overexpression artifacts."
  }
];

export default function TagKnockinMicePage() {
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

        {/* Why Use Tag Knockin Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Why Use Tag Knockin Models
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {whyTagKnockinData.map((item, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', fontWeight: 600, marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Epitope Tags Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Common Epitope Tags
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {epitopeTagsData.map((tag, index) => (
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>
                      {tag.title}
                    </h3>
                    <span style={{ 
                      backgroundColor: '#e0f2f1', 
                      color: '#008080', 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '.75rem',
                      fontFamily: 'monospace'
                    }}>
                      {tag.sequence}
                    </span>
                  </div>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '10px' }}>
                    {tag.description}
                  </p>
                  {tag.note && (
                    <p style={{ color: '#008080', fontSize: '.85rem', fontStyle: 'italic', marginBottom: '10px' }}>
                      {tag.note}
                    </p>
                  )}
                  {tag.link && (
                    <Link 
                      href={tag.link}
                      className="inline-flex items-center gap-2 transition-colors duration-300"
                      style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
                    >
                      <span>Learn more</span>
                      <IconChevronRight size={14} color="#2384da" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tag Placement Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Tag Placement Considerations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tagPlacementData.map((placement, index) => (
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
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {placement.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {placement.description}
                  </p>
                  {placement.note && (
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.85rem', fontStyle: 'italic', marginTop: '10px' }}>
                      {placement.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Applications of Tag Knockin Models
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
                    borderTop: '4px solid #2384da'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconFlask size={18} color="#008080" />
                    </div>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', fontWeight: 600 }}>
                      {app.title}
                    </h3>
                  </div>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {app.description}
                  </p>
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

        {/* Design Considerations Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Tag Knockin Design Considerations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {designConsiderationsData.map((item, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {item.description}
                  </p>
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
              Tag knockin models from ingenious targeting laboratory have enabled protein studies published in leading journals:
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
            <div style={{
              display: testimonials.length === 1 ? 'block' : 'grid',
              gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined,
              gap: '24px',
            }}>
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
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss a tag knockin model for your protein of interest? Our scientific team provides complimentary consultation to help you design the optimal targeting strategy.
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
              title="Tag Knockin Technology Insights"
              description="Learn about epitope tagging strategies, protein detection methods, and practical applications for tag knockin models. Expert guidance from our PhD scientists."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Specific Tag Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {specificTagModels.map((link, index) => (
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
            "name": "Tag Knockin Mice",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Epitope tag knockin mouse models with FLAG, HA, V5, and other tags. Track endogenous proteins without gene-specific antibodies. Custom models since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
