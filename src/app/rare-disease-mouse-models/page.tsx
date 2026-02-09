'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Rare Disease Research",
  title: "Rare Disease Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported rare disease researchers with custom mouse models for studying disease mechanisms and developing therapeutics. Our rare disease models have contributed to research on lysosomal storage disorders, metabolic diseases, neurodegenerative conditions, and hundreds of other genetic diseases, with results published in peer reviewed journals and supporting therapeutic development for underserved patient populations.",
  description: "With over 7,000 rare diseases affecting an estimated 300 million people worldwide, mouse models provide essential platforms for developing therapies for conditions that have historically lacked treatment options."
};

// Stats Data
const statsData = [
  { value: 7000, suffix: "+", label: "Known Rare Diseases" },
  { value: 300, suffix: "M", label: "Patients Worldwide" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Patient Mutation Knockins
const patientMutations = [
  { type: "Point mutations", desc: "Single nucleotide changes causing missense, nonsense, or splice site alterations" },
  { type: "Small insertions/deletions", desc: "Frameshift or in frame modifications" },
  { type: "Repeat expansions", desc: "Trinucleotide or other repeat disorders" },
  { type: "Regulatory mutations", desc: "Changes affecting gene expression" }
];

// Gene Knockout Models
const knockoutModels = [
  { type: "Null alleles", desc: "Complete absence of gene product" },
  { type: "Conditional knockouts", desc: "Enable tissue specific or temporal gene deletion" },
  { type: "Hypomorphic alleles", desc: "Reduced but not absent gene function" }
];

// Lysosomal Storage Disorders
const lysosomalDisorders = [
  { disease: "Gaucher disease", gene: "GBA1", mutations: "Point mutations, null", applications: "ERT, SRT, gene therapy" },
  { disease: "Fabry disease", gene: "GLA", mutations: "Point mutations, deletions", applications: "ERT, chaperone therapy" },
  { disease: "Pompe disease", gene: "GAA", mutations: "Point mutations, splice", applications: "ERT, gene therapy" },
  { disease: "MPS I (Hurler)", gene: "IDUA", mutations: "Point mutations, null", applications: "ERT, gene therapy" },
  { disease: "MPS II (Hunter)", gene: "IDS", mutations: "Point mutations, deletions", applications: "ERT, gene therapy" },
  { disease: "Niemann Pick C", gene: "NPC1/NPC2", mutations: "Point mutations", applications: "Small molecule, gene therapy" }
];

// Neuromuscular Diseases
const neuromuscularDiseases = [
  { disease: "Duchenne MD", gene: "DMD", mutations: "Deletions, point mutations", applications: "Exon skipping, gene therapy" },
  { disease: "Spinal muscular atrophy", gene: "SMN1/SMN2", mutations: "Deletions, point mutations", applications: "ASO, gene therapy" },
  { disease: "ALS (familial)", gene: "SOD1, C9orf72", mutations: "Point mutations, repeats", applications: "Small molecule, ASO" },
  { disease: "Charcot Marie Tooth", gene: "PMP22, MFN2", mutations: "Duplications, point mutations", applications: "Gene therapy" }
];

// Neurological Rare Diseases
const neurologicalDiseases = [
  { disease: "Huntington disease", gene: "HTT", mutations: "CAG repeat expansion", applications: "ASO, gene silencing" },
  { disease: "Friedreich ataxia", gene: "FXN", mutations: "GAA repeat expansion", applications: "Gene therapy" },
  { disease: "Rett syndrome", gene: "MECP2", mutations: "Point mutations, deletions", applications: "Gene therapy" },
  { disease: "Angelman syndrome", gene: "UBE3A", mutations: "Deletions, point mutations", applications: "ASO, gene therapy" }
];

// Therapeutic Applications
const therapeuticApplications = [
  {
    title: "Gene Therapy Testing",
    items: ["AAV mediated gene replacement efficacy", "Dose response and biodistribution studies", "Long term expression durability", "Safety and immunogenicity assessment"]
  },
  {
    title: "Antisense Oligonucleotide Development",
    items: ["Humanized target sequences for human specific ASOs", "Splice modulation efficacy testing", "Gene knockdown approaches", "Pharmacokinetic and pharmacodynamic studies"]
  },
  {
    title: "Enzyme Replacement Therapy",
    items: ["Efficacy of recombinant enzyme administration", "Tissue distribution and uptake", "Substrate reduction assessment", "Dosing regimen optimization"]
  },
  {
    title: "Small Molecule Development",
    items: ["Pharmacological chaperone efficacy", "Substrate reduction therapy", "Read through compounds for nonsense mutations", "Enzyme activators or stabilizers"]
  }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Chakrabarti S et al.",
    year: "2024",
    title: "Touch sensation requires the mechanically gated ion channel ELKIN1.",
    journal: "Science",
    volume: "383(6686): 992-998",
    link: "https://pubmed.ncbi.nlm.nih.gov/38422143/"
  },
  {
    authors: "Vacher CM et al.",
    year: "2021",
    title: "Placental endocrine function shapes cerebellar development and social behavior.",
    journal: "Nature Neuroscience",
    volume: "24(10): 1392-1401",
    link: "https://pubmed.ncbi.nlm.nih.gov/34400844/"
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

// Testimonials
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;

const testimonials = [
  { quote: dunaiefTestimonial.quote, author: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation },
];

// Related Links
const diseaseCategories = [
  { title: "Lysosomal Storage Disorder Mice", href: "/lysosomal-storage-disorder-mice" },
  { title: "Neuromuscular Disease Mice", href: "/neuromuscular-disease-mice" },
  { title: "Metabolic Disorder Mice", href: "/metabolic-disorder-mice" },
  { title: "Neurological Disease Mice", href: "/neurological-disease-mice" }
];

const relatedModelTypes = [
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" }
];

const therapeuticLinks = [
  { title: "Gene Therapy Mouse Models", href: "/gene-therapy-mouse-models" },
  { title: "Target Validation Mouse Models", href: "/target-validation-mouse-models" },
  { title: "Efficacy Testing Mouse Models", href: "/efficacy-testing-mouse-models" }
];

// FAQ Data
const faqData = [
  {
    question: "What types of rare disease models can be generated?",
    answer: "Rare disease models include point mutation knockins modeling specific patient variants, knockout models for loss of function diseases, conditional models for tissue specific studies, and humanized models for testing human specific therapeutics. Selection depends on disease mechanism, mutation type, and therapeutic strategy."
  },
  {
    question: "How do you model specific patient mutations in rare diseases?",
    answer: "Patient mutations are modeled through point mutation knockin, where the exact patient variant is introduced into the mouse gene. Pre germline characterization includes sequence verification to confirm exact mutation incorporation, ensuring mice carry precisely the intended disease allele before mouse generation."
  },
  {
    question: "Can rare disease models be used for gene therapy testing?",
    answer: "Yes. Rare disease models are extensively used for testing gene therapy approaches including AAV mediated gene replacement, antisense oligonucleotide development, enzyme replacement therapy evaluation, and small molecule therapeutic development. Models enable evaluation of therapeutic efficacy, safety, and long term persistence."
  },
  {
    question: "How do rare disease model phenotypes compare to human disease?",
    answer: "Mouse phenotypes may differ from human disease presentation in severity, age of onset, or specific symptoms. However, models capture core disease mechanisms and enable therapeutic testing. Phenotype validation includes comparison to human disease characteristics and assessment of therapeutic response."
  }
];

export default function RareDiseaseMouseModelsPage() {
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

        {/* Modeling Approaches Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Modeling Rare Genetic Diseases
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Patient Mutation Knockins
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                  The most translationally relevant rare disease models express the exact mutations found in patients:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {patientMutations.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}><strong>{item.type}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/point-mutation-mice" className="inline-flex items-center gap-2 mt-4 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                  <span>Learn more</span>
                  <IconChevronRight size={14} color="#2384da" />
                </Link>
              </div>

              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Gene Knockout Models
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                  Complete loss of function models represent severe disease alleles:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {knockoutModels.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}><strong>{item.type}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/knockout-mouse-models" className="inline-flex items-center gap-2 mt-4 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                  <span>Learn more</span>
                  <IconChevronRight size={14} color="#2384da" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Disease Categories Tables */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Rare Disease Categories
            </h2>

            {/* Lysosomal Storage Disorders */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Lysosomal Storage Disorders
              </h3>
              <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>Deficiencies in lysosomal enzymes cause accumulation of substrates:</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#008080' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Disease</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Gene</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Mutation Types</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Model Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lysosomalDisorders.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 15px', color: '#0a253c', fontSize: '.85rem', fontWeight: 500 }}>{row.disease}</td>
                        <td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontFamily: 'monospace' }}>{row.gene}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.mutations}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Neuromuscular Diseases */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Neuromuscular Diseases
              </h3>
              <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>Genetic defects affecting muscle or neuromuscular junction:</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#2384da' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Disease</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Gene</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Mutation Types</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Model Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {neuromuscularDiseases.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 15px', color: '#0a253c', fontSize: '.85rem', fontWeight: 500 }}>{row.disease}</td>
                        <td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontFamily: 'monospace' }}>{row.gene}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.mutations}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Neurological Rare Diseases */}
            <div className="animate-in">
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Neurological Rare Diseases
              </h3>
              <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>Genetic conditions affecting the nervous system:</p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Disease</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Gene</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Mutation Types</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Model Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {neurologicalDiseases.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 15px', color: '#0a253c', fontSize: '.85rem', fontWeight: 500 }}>{row.disease}</td>
                        <td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontFamily: 'monospace' }}>{row.gene}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.mutations}</td>
                        <td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Therapeutic Applications Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications in Therapeutic Development
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {therapeuticApplications.map((app, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{app.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {app.items.map((item, idx) => (
                      <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
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
              Rare disease models generated by ingenious targeting laboratory:
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
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              What Researchers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px'
                  }}>
                    <IconQuote size={20} color="#008080" />
                  </div>
                  <blockquote style={{
                    color: '#333',
                    fontSize: '.9rem',
                    lineHeight: '1.6rem',
                    fontStyle: 'italic',
                    marginBottom: '15px'
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem', marginBottom: '2px' }}>
                      — {testimonial.author}
                    </p>
                    <p style={{ color: '#666', fontSize: '.8rem' }}>
                      {testimonial.affiliation}
                    </p>
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
              Start Your Rare Disease Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your rare disease research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge and includes mutation analysis, model strategy recommendations, and timeline estimates. We have experience working with patient foundations and academic collaborations.
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
        <BreedingSchemeArchitectCTA />

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
            <LabSignalsSignup title="Rare Disease Research Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Disease Categories
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {diseaseCategories.map((link, index) => (
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
                  Therapeutic Applications
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {therapeuticLinks.map((link, index) => (
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
            "name": "Rare Disease Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom rare disease mouse models for orphan disease research. Patient mutation knockins, gene therapy testing, and therapeutic development support since 1998.",
            "serviceType": "Rare Disease Mouse Models"
          })
        }}
      />
    </div>
  );
}
