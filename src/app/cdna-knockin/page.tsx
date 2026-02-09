'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Complementary DNA Insertion",
  title: "cDNA Knockin Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has generated hundreds of cDNA knockin mouse models, providing researchers with tools for gene replacement, expression modification, and functional studies where insertion of complete coding sequences is required.",
  description: "cDNA knockin models enable expression of modified gene products, replacement with orthologs or variants, and insertion of complete coding sequences at endogenous loci for physiologically regulated expression."
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
    title: "Complete Coding Sequence",
    description: "The entire protein coding region is inserted as a contiguous sequence without introns."
  },
  {
    title: "Endogenous Regulation",
    description: "When knocked into the native locus, the cDNA is expressed under control of the endogenous promoter and regulatory elements."
  },
  {
    title: "Defined Isoform",
    description: "The inserted cDNA specifies a single isoform, eliminating alternative splicing complexity."
  },
  {
    title: "Fusion Capability",
    description: "Tags, reporters, or additional sequences can be fused to the cDNA."
  }
];

// Applications Data
const applicationsData = [
  {
    title: "Humanization",
    description: "Replace mouse genes with human orthologs:",
    items: [
      { name: "Therapeutic Target Humanization", desc: "Human protein expression enables testing of human specific therapeutics such as antibodies" },
      { name: "Disease Modeling", desc: "Human genes containing pathogenic mutations model human genetic diseases" },
      { name: "Pharmacokinetic Studies", desc: "Human metabolic enzymes enable human relevant drug metabolism studies" },
      { name: "Immunogenicity Considerations", desc: "Human proteins avoid immune responses that might occur against mouse proteins in humanized immune system models" }
    ],
    link: "/humanized-mouse-models"
  },
  {
    title: "Isoform Specific Expression",
    description: "Study specific transcript variants:",
    items: [
      { name: "Alternative Splicing", desc: "Different splice isoforms can be expressed from separate knockin alleles to study isoform specific functions" },
      { name: "Dominant Isoform Studies", desc: "Express the predominant isoform without interference from minor variants" },
      { name: "Tissue Specific Variants", desc: "Some genes produce tissue specific isoforms; cDNA knockin ensures expression of the desired form" }
    ]
  },
  {
    title: "Reporter Fusions",
    description: "Create functional reporter alleles:",
    items: [
      { name: "Fluorescent Protein Fusions", desc: "C terminal or N terminal fusion of GFP, mCherry, or other fluorescent proteins enables protein localization and expression monitoring" },
      { name: "Epitope Tags", desc: "FLAG, HA, V5, or other tags enable biochemical detection and purification" },
      { name: "Enzymatic Tags", desc: "Luciferase, beta galactosidase, or other reporters for functional studies" }
    ]
  },
  {
    title: "Conditional Expression",
    description: "Combine cDNA knockin with conditional systems:",
    items: [
      { name: "Cre Dependent Expression", desc: "LoxP-stop-LoxP cassette upstream of cDNA blocks expression until Cre activation" },
      { name: "Replacement Strategies", desc: "Express cDNA conditionally to replace knockout of endogenous gene" }
    ]
  }
];

// Design Considerations
const designConsiderations = [
  {
    title: "Insertion Site Selection",
    items: [
      { name: "ATG Replacement", desc: "Insert cDNA at the translational start site, replacing the first exon. Allows native transcriptional initiation." },
      { name: "First Exon Replacement", desc: "Replace entire first coding exon with cDNA cassette." },
      { name: "Stop Codon Insertion", desc: "For C terminal fusions, insert at the native stop codon position." }
    ]
  },
  {
    title: "Regulatory Elements",
    items: [
      { name: "Kozak Sequence", desc: "Include appropriate Kozak consensus for efficient translation initiation." },
      { name: "Polyadenylation", desc: "Include polyadenylation signal if the knockin cassette does not read through to endogenous 3' UTR." },
      { name: "Splice Signals", desc: "If inserting into an intron, include splice acceptor or other elements as needed." }
    ]
  }
];

// Comparison Table Data
const comparisonTableData = [
  { feature: "Insert size", cdna: "Compact (coding only)", genomic: "Large (includes introns)" },
  { feature: "Splicing", cdna: "Single isoform", genomic: "Retains alternative splicing" },
  { feature: "Expression level", cdna: "May differ from native", genomic: "More physiological" },
  { feature: "Technical complexity", cdna: "Simpler design", genomic: "More complex" },
  { feature: "Intron functions", cdna: "Lost", genomic: "Retained" },
  { feature: "Common use", cdna: "Humanization, fusions", genomic: "Precise variants" }
];

// When to Choose
const chooseCDNA = [
  "Gene has complex splicing not required for study",
  "Human cDNA replacement is the goal",
  "Adding fusion proteins or tags",
  "Simpler construct design preferred",
  "Insert size constraints"
];

const chooseGenomic = [
  "Alternative splicing is important",
  "Intronic regulatory elements are critical",
  "Most physiological expression is essential",
  "Point mutation knockin (genomic is simpler)"
];

// Expression Considerations
const expressionConsiderations = [
  {
    title: "Potential for Altered Expression",
    items: [
      { name: "Intron Removal Effects", desc: "Introns can affect transcription, mRNA stability, and nuclear export. cDNA may show different expression levels than genomic constructs." },
      { name: "Regulatory Element Loss", desc: "Intronic enhancers or other regulatory elements are lost in cDNA knockins." },
      { name: "mRNA Stability", desc: "3' UTR sequences affect mRNA half life. Design should consider whether to include native or synthetic 3' UTR." }
    ]
  },
  {
    title: "Mitigation Strategies",
    items: [
      { name: "Expression Validation", desc: "Verify protein expression levels in knockin animals match expectations." },
      { name: "Functional Testing", desc: "Confirm knockin allele is functional through phenotypic analysis." },
      { name: "Heterozygous Analysis", desc: "Compare heterozygotes to assess whether one knockin allele provides sufficient expression." }
    ]
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const arenzanaTestimonial = getTestimonialById('arenzana-pasteur')!;

const testimonials = [
  { quote: arenzanaTestimonial.quote, name: formatAuthorWithCredentials(arenzanaTestimonial), affiliation: arenzanaTestimonial.affiliation },
];

// Related Links
const relatedModelTypes = [
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Reporter Knockin", href: "/reporter-knockin" }
];

const relatedTechnologies = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "ROSA26", href: "/rosa26" }
];

const relatedResources = [
  { title: "Knockout Strategy Guide", href: "/knockout-strategy-guide" }
];

// FAQ Data
const faqData = [
  {
    question: "When should I choose cDNA knockin over genomic knockin?",
    answer: "Choose cDNA knockin when you need to replace the coding sequence with an alternative (human gene, modified sequence, or isoform). cDNA knockins bypass introns and alternative splicing. Choose genomic knockin (with introns) when alternative splicing is important, intronic regulatory elements are critical, or for point mutations where genomic targeting is simpler."
  },
  {
    question: "Can cDNA knockins express at physiological levels?",
    answer: "Yes. cDNA knockins at the endogenous locus maintain native promoter and regulatory elements, providing physiological expression levels. This is an advantage over transgenic approaches which often overexpress. Expression levels depend on promoter strength and regulatory context, which are preserved in knockin approaches."
  },
  {
    question: "What is conditional cDNA knockin and when is it used?",
    answer: "Conditional cDNA knockin uses a LoxP-flanked stop cassette that prevents expression until Cre recombination. This enables tissue-specific or temporally controlled expression of cDNA sequences. It's valuable when cDNA expression would be lethal if expressed globally from conception, such as oncogenic mutations or toxic proteins."
  },
  {
    question: "What size cDNA can be knocked in?",
    answer: "Typical cDNA knockins range from <1 kb to 5-6 kb. Large cDNAs (>6 kb) may require specialized approaches or BAC-based targeting. Our scientific team evaluates cDNA size and complexity during project consultation to recommend optimal strategies."
  }
];

export default function CDNAKnockinPage() {
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

        {/* What Is cDNA Knockin Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              What Is a cDNA Knockin?
            </h2>
            
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              A cDNA knockin inserts a complementary DNA sequence (coding sequence without introns) at a specific genomic locus, typically the endogenous gene location, placing the cDNA under endogenous regulatory control.
            </p>
            
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
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
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
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
              Applications of cDNA Knockin
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
                        backgroundColor: 'white',
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
                
                {app.link && (
                  <Link 
                    href={app.link}
                    className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                    style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
                  >
                    <span>Learn more about humanized mouse models</span>
                    <IconChevronRight size={16} color="#008080" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Design Considerations Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Design Considerations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {designConsiderations.map((section, index) => (
                <div key={index} className="animate-in">
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.items.map((item, idx) => (
                      <div 
                        key={idx}
                        style={{
                          backgroundColor: '#f8f9fa',
                          padding: '15px',
                          borderRadius: '6px',
                          borderLeft: '3px solid #2384da'
                        }}
                      >
                        <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '5px' }}>
                          {item.name}
                        </h4>
                        <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              cDNA Knockin vs Genomic Knockin
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', marginBottom: '30px' }}>
              Compare approaches for gene replacement:
            </p>
            
            <div className="animate-in" style={{ overflowX: 'auto', marginBottom: '40px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Feature</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>cDNA Knockin</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Genomic Knockin</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTableData.map((row, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <td style={{ padding: '12px 15px', color: 'white', fontWeight: 500 }}>{row.feature}</td>
                      <td style={{ padding: '12px 15px', color: 'rgba(255,255,255,0.9)' }}>{row.cdna}</td>
                      <td style={{ padding: '12px 15px', color: 'rgba(255,255,255,0.9)' }}>{row.genomic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  When to Choose cDNA Knockin
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {chooseCDNA.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <IconCheckCircle size={14} color="white" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  When to Choose Genomic Knockin
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {chooseGenomic.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <IconCheckCircle size={14} color="white" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Expression Considerations Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              Expression Considerations
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {expressionConsiderations.map((section, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', fontWeight: 600, marginBottom: '20px' }}>
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.items.map((item, idx) => (
                      <div key={idx} style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px' }}>
                        <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem', marginBottom: '8px' }}>
                          {item.name}
                        </h4>
                        <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '25px' }}>&ldquo;{testimonials[0].quote}&rdquo;</p>
              <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonials[0].name}</p>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.85rem', fontWeight: 400 }}>{testimonials[0].affiliation}</p>
            </div>
            <div className="animate-in" style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link href="/testimonials" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}>
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
              Start Your cDNA Knockin Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your cDNA knockin requirements and optimal allele design for your research goals. Initial consultation is provided at no charge and includes design strategy, cDNA source options, timeline and price estimate.
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

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="cDNA Knockin Technology Insights"
              description="Discover cDNA insertion strategies, expression optimization techniques, and advanced applications for knockin models. Expert analysis from our PhD scientists."
            />
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
                  Related Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedResources.map((link, index) => (
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
            "name": "cDNA Knockin Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom cDNA knockin mouse models for gene expression studies. Insert complementary DNA sequences into specific genomic loci. Since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
