'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Reliable Analysis",
  title: "Mouse Genotyping Services",
  intro: "Since 1998, ingenious targeting laboratory has provided comprehensive genotyping services supporting thousands of mouse model projects. Our genotyping capabilities ensure accurate breeding decisions and experimental design throughout your research program.",
  description: "Reliable genotyping is essential for maintaining mouse colonies, verifying genetic modifications, and ensuring experimental reproducibility. ingenious targeting laboratory offers multiple genotyping methods tailored to your specific allele design and verification requirements."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Genotyping Methods
const genotypingMethods = [
  {
    name: "PCR Based Genotyping",
    description: "PCR genotyping provides rapid, cost effective verification of targeted alleles.",
    features: [
      "Allele Specific PCR: Detects presence of targeted allele",
      "Wild Type PCR: Confirms absence of wild type allele",
      "Heterozygous/Homozygous Discrimination: Distinguishes genotype",
      "Multiplex PCR: Simultaneous detection of multiple alleles"
    ],
    note: "PCR genotyping is ideal for routine colony maintenance and rapid screening of large numbers of animals."
  },
  {
    name: "Southern Blot Analysis",
    description: "Southern blot provides definitive verification of complex allele structures.",
    features: [
      "Correct Integration: Confirms targeting at intended locus",
      "Single Copy Verification: Ensures no random insertions",
      "Allele Structure: Verifies complete allele architecture",
      "Pre Germline Characterization: ES cell clone verification"
    ],
    note: ""
  },
  {
    name: "Quantitative PCR (qPCR)",
    description: "qPCR enables copy number determination and expression analysis.",
    features: [
      "Copy Number Analysis: Determines transgene copy number",
      "Expression Level Quantification: Measures gene expression",
      "Relative Quantification: Compares expression between samples",
      "High Throughput Screening: Rapid analysis of multiple samples"
    ],
    note: ""
  },
  {
    name: "Sequencing Based Genotyping",
    description: "Sequencing provides nucleotide level verification.",
    features: [
      "Point Mutation Verification: Confirms specific nucleotide changes",
      "Small Insertion/Deletion Detection: Identifies small indels",
      "Fusion Junction Verification: Confirms correct fusion sequences",
      "Complete Allele Sequencing: Full sequence verification"
    ],
    note: "Sequencing is essential for verifying point mutations and small genetic modifications."
  }
];

// Genotyping Applications
const colonyMaintenance = [
  { name: "Breeding Pair Selection", description: "Verify genotypes before mating" },
  { name: "Offspring Screening", description: "Identify desired genotypes" },
  { name: "Colony Purity", description: "Maintain genetic background integrity" },
  { name: "Allele Transmission", description: "Track allele inheritance" }
];

const experimentalDesign = [
  { name: "Genotype Verification", description: "Confirm experimental groups" },
  { name: "Control Selection", description: "Identify appropriate controls" },
  { name: "Cohort Assembly", description: "Assemble study cohorts with correct genotypes" },
  { name: "Phenotype Correlation", description: "Link phenotypes to genotypes" }
];

const qualityAssurance = [
  { name: "Allele Integrity", description: "Verify allele structure over generations" },
  { name: "Contamination Detection", description: "Identify genetic contamination" },
  { name: "Background Verification", description: "Confirm genetic background" },
  { name: "Archival Verification", description: "Verify archived samples" }
];

// Service Workflow
const sampleSubmission = [
  { type: "Tail Biopsies", description: "Standard tail snip samples" },
  { type: "Ear Punches", description: "Alternative tissue samples" },
  { type: "Blood Samples", description: "For specific applications" },
  { type: "ES Cell Samples", description: "For pre germline characterization" }
];

const analysisReporting = [
  { item: "Clear Genotype Calls", description: "Heterozygous, homozygous, or wild type" },
  { item: "Quality Metrics", description: "Confidence scores for results" },
  { item: "Gel Images", description: "Visual confirmation when applicable" },
  { item: "Interpretation Guidance", description: "Help with result interpretation" }
];

// Custom Genotyping Development
const assayDesign = [
  { name: "Novel Alleles", description: "New targeting projects" },
  { name: "Complex Alleles", description: "Multi component alleles" },
  { name: "Optimized Protocols", description: "Improved efficiency or specificity" },
  { name: "Multiplex Assays", description: "Simultaneous detection of multiple alleles" }
];

const protocolOptimization = [
  { name: "High Throughput", description: "Rapid screening of large colonies" },
  { name: "Cost Effectiveness", description: "Reduced reagent costs" },
  { name: "Reliability", description: "Improved accuracy and reproducibility" },
  { name: "Specificity", description: "Reduced false positive rates" }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const francoTestimonial = getTestimonialById('franco-colorado')!;

const testimonials = [
  { quote: francoTestimonial.quote, name: formatAuthorWithCredentials(francoTestimonial), affiliation: francoTestimonial.affiliation },
];

// Related Links
const relatedServices = [
  { title: "Colony Management Services", href: "/colony-management-services" },
  { title: "Mouse Model Services", href: "/mouse-model-services" },
  { title: "Cryopreservation Services", href: "/cryopreservation-services" },
  { title: "Phenotyping Services", href: "/phenotyping-services" }
];

const relatedResources = [
  { title: "FAQs", href: "/faqs" }
];

// FAQ Data
const faqData = [
  {
    question: "What genotyping methods does ingenious targeting laboratory use?",
    answer: "ingenious targeting laboratory uses multiple genotyping methods including PCR-based genotyping (standard for routine colony screening), Southern blot analysis (for complex alleles or validation), and sequencing (for point mutations or sequence verification). Method selection depends on allele complexity, throughput needs, and validation requirements."
  },
  {
    question: "Can ingenious targeting laboratory develop custom genotyping assays for new alleles?",
    answer: "Yes. ingenious targeting laboratory can design custom genotyping assays for novel alleles, complex multi-component alleles, optimized protocols for improved efficiency or specificity, and multiplex assays for simultaneous detection of multiple alleles. Custom assay development includes protocol optimization and validation."
  },
  {
    question: "What information is provided with genotyping results?",
    answer: "Genotyping results include clear genotype calls (heterozygous, homozygous, or wild-type), quality metrics with confidence scores, gel images for visual confirmation when applicable, and interpretation guidance to help with result interpretation. Results are provided in formats suitable for colony management records."
  },
  {
    question: "Do you provide high-throughput genotyping for large colonies?",
    answer: "Yes. ingenious targeting laboratory provides high-throughput genotyping services optimized for rapid screening of large colonies. Optimized protocols reduce reagent costs while maintaining reliability and specificity. We work with you to determine the most efficient approach for your colony size and genotyping frequency needs."
  }
];

export default function MouseGenotypingServicePage() {
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

        {/* Genotyping Methods */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Genotyping Methods
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {genotypingMethods.map((method, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: `4px solid ${index % 2 === 0 ? '#008080' : '#2384da'}` }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {method.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    {method.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: method.note ? '15px' : 0 }}>
                    {method.features.map((feature, fIndex) => (
                      <li key={fIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {method.note && (
                    <p style={{ color: '#666', fontSize: '.85rem', fontStyle: 'italic' }}>{method.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Genotyping Applications */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Genotyping Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Colony Maintenance */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Colony Maintenance
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Routine genotyping ensures correct colony composition:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {colonyMaintenance.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experimental Design */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Experimental Design
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Genotyping supports experimental planning:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {experimentalDesign.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quality Assurance */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Quality Assurance
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Genotyping provides quality control:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {qualityAssurance.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Workflow */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Service Workflow
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sample Submission */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Sample Submission
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Samples can be submitted in multiple formats:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {sampleSubmission.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '.9rem' }}>
                        <strong>{item.type}:</strong> {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Analysis and Reporting */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Analysis and Reporting
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Genotyping results are provided with:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysisReporting.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '.9rem' }}>
                        <strong>{item.item}:</strong> {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Genotyping Development */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Custom Genotyping Development
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Assay Design */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Assay Design
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  ingenious targeting laboratory can design custom genotyping assays for:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {assayDesign.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protocol Optimization */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Protocol Optimization
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  We optimize genotyping protocols for:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {protocolOptimization.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
              Request Genotyping Services
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our team can help you determine the optimal genotyping approach for your mouse model. Contact us to discuss your genotyping requirements.
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
            <LabSignalsSignup title="Genotyping Service Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedServices.map((link, index) => (
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
            "name": "Mouse Genotyping Services",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Comprehensive mouse genotyping services including PCR, Southern blot, and sequencing analysis. Reliable genotyping for breeding decisions since 1998.",
            "serviceType": "Genotyping Services"
          })
        }}
      />
    </div>
  );
}
