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
  badge: "Metabolic Disease Models",
  title: "Diabetes Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported diabetes researchers with custom mouse models contributing to peer reviewed publications in Diabetes, Cell Metabolism, Diabetologia, and leading metabolism journals worldwide.",
  description: "Diabetes mouse models enable researchers to investigate the molecular mechanisms underlying glucose homeostasis, insulin secretion, and insulin action. From beta cell specific knockouts that isolate islet function to tissue specific deletions in liver, muscle, and adipose tissue that dissect peripheral insulin resistance."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Type 1 Diabetes Features
const t1dFeatures = [
  "NOD background models: Spontaneous autoimmune diabetes with genetic modifications",
  "Immune gene knockouts: Deletions affecting T cell, B cell, or innate immune function",
  "Beta cell specific deletions: Study genes essential for cell survival under immune attack",
  "Antigen presentation models: Modifications affecting MHC or antigen processing"
];

// Type 2 Diabetes Approaches
const t2dApproaches = [
  "Liver specific knockouts: Study hepatic glucose production and insulin sensitivity",
  "Adipose specific knockouts: Investigate adipokine signaling and lipid storage",
  "Muscle specific knockouts: Analyze glucose uptake and insulin signaling",
  "Beta cell specific knockouts: Study insulin secretion and beta cell compensation"
];

// Cre Drivers Table
const creDrivers = [
  { driver: "Albumin Cre", tissue: "Hepatocytes", function: "Gluconeogenesis, lipid metabolism" },
  { driver: "Adiponectin Cre", tissue: "Adipocytes", function: "Lipid storage, adipokine secretion" },
  { driver: "Insulin Cre / Pdx1 Cre", tissue: "Beta cells", function: "Insulin secretion, beta cell mass" },
  { driver: "MCK Cre / MyoD Cre", tissue: "Skeletal muscle", function: "Glucose uptake, insulin sensitivity" },
  { driver: "Nestin Cre", tissue: "Hypothalamus", function: "Central metabolic regulation" },
  { driver: "Villin Cre", tissue: "Intestinal epithelium", function: "Incretin signaling, nutrient absorption" }
];

// Strain Backgrounds
const strainBackgrounds = [
  { strain: "C57BL/6J", characteristics: "Nnt mutation impairs insulin secretion; susceptible to diet induced obesity", considerations: "Document Nnt status; consider for obesity studies" },
  { strain: "C57BL/6N", characteristics: "Intact Nnt; more robust insulin secretion", considerations: "Preferred for beta cell function studies" },
  { strain: "NOD", characteristics: "Spontaneous autoimmune diabetes", considerations: "Required background for T1D studies" },
  { strain: "BALB/c", characteristics: "Relatively resistant to diet induced obesity", considerations: "Less commonly used for metabolic studies" }
];

// Phenotyping Methods
const phenotypingMethods = [
  { category: "Glucose Homeostasis", tests: ["Fasting and fed blood glucose", "Glucose tolerance testing (GTT)", "Insulin tolerance testing (ITT)", "Hyperinsulinemic euglycemic clamp"] },
  { category: "Insulin & Beta Cell", tests: ["Fasting and stimulated insulin levels", "HOMA IR and HOMA B calculations", "Islet isolation and perifusion", "Beta cell mass quantification"] },
  { category: "Body Composition", tests: ["Body weight and food intake", "Body composition (MRI, DEXA)", "Indirect calorimetry", "Activity monitoring"] }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Turner MB et al.",
    year: "2025",
    title: "Adipocyte specific deletion of the mineralocorticoid receptor improves glucose homeostasis and associates with FGF21 adiponectin signalling in obese male mice.",
    journal: "Diabetes, Obesity and Metabolism",
    volume: "27(5): 2341-2355",
    link: "https://pubmed.ncbi.nlm.nih.gov/41153082/"
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

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;

const testimonials = [
  { quote: mirmiraTestimonial.quote, name: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation },
];

// Related Links
const diabetesModelTypes = [
  { title: "Type 1 Diabetes Mice", href: "/type-1-diabetes-mice" },
  { title: "Type 2 Diabetes Mice", href: "/type-2-diabetes-mice" },
  { title: "Obesity Mouse Models", href: "/obesity-mouse-models" },
  { title: "NASH MASH Mouse Models", href: "/nash-mash-mouse-models" },
  { title: "Metabolic Disease Mouse Models", href: "/metabolic-disease-mouse-models" }
];

const relatedModelTypes = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

const relatedTechnologies = [
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" }
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between type 1 and type 2 diabetes mouse models?",
    answer: "Type 1 diabetes models involve beta cell destruction or dysfunction (e.g., beta cell specific knockouts, autoimmune models). Type 2 diabetes models involve insulin resistance and metabolic dysfunction (e.g., insulin signaling knockouts, obesity models). Both can be generated using conditional knockout approaches."
  },
  {
    question: "Which metabolic tissues should I target for diabetes research?",
    answer: "Common targets include beta cells (Insulin Cre), liver (Albumin Cre), muscle (MCK Cre), adipose tissue (Adiponectin Cre), and hypothalamus (Nestin Cre). Tissue selection depends on whether you're studying insulin secretion, insulin action, or central metabolic control."
  },
  {
    question: "What phenotyping assays are typically performed on diabetes models?",
    answer: "Standard assays include glucose tolerance testing (GTT), insulin tolerance testing (ITT), fasting glucose and insulin, body composition analysis, and indirect calorimetry. More advanced studies include hyperinsulinemic euglycemic clamps and islet perifusion studies."
  },
  {
    question: "Can I combine multiple metabolic gene modifications in one model?",
    answer: "Yes. Multiple alleles can be combined through breeding to study gene interactions in metabolic pathways. For example, combining beta cell knockouts with insulin signaling knockouts enables study of how insulin secretion and action interact to control glucose homeostasis."
  },
  {
    question: "How long does it take to see metabolic phenotypes in diabetes models?",
    answer: "Phenotype timing depends on the gene and model type. Some models show glucose intolerance within weeks of gene deletion (inducible systems). Others require months of aging or high fat diet challenge. Beta cell specific knockouts may develop diabetes more rapidly than insulin resistance models."
  }
];

export default function DiabetesMouseModelsPage() {
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
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.7rem',
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

        {/* Type 1 and Type 2 Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Type 1 */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h2 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>
                  Type 1 Diabetes Models
                </h2>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                  Type 1 diabetes results from autoimmune destruction of pancreatic beta cells. Mouse models address both the immune and beta cell components of disease.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {t1dFeatures.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Type 2 */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h2 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px' }}>
                  Type 2 Diabetes Models
                </h2>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                  Type 2 diabetes involves both peripheral insulin resistance and eventual beta cell failure. Mouse models address these interconnected pathologies.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {t2dApproaches.map((approach, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{approach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cre Drivers Table */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Tissue Specific Approaches
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              Conditional knockouts enable dissection of gene function in specific metabolic tissues. A single floxed allele can be crossed to multiple Cre drivers to study gene function across metabolic tissues.
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Tissue</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Metabolic Function</th>
                  </tr>
                </thead>
                <tbody>
                  {creDrivers.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 500 }}>{row.driver}</td>
                      <td style={{ padding: '12px 15px', color: '#0a253c' }}>{row.tissue}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="animate-in mt-6">
              <Link href="/tissue-specific-cre-lines" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                <span>Explore Tissue Specific Cre Lines</span>
                <IconChevronRight size={14} color="#2384da" />
              </Link>
            </div>
          </div>
        </section>

        {/* Strain Backgrounds */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Strain Background Considerations
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              Strain background significantly impacts metabolic phenotypes. The Nnt mutation in C57BL/6J should be considered when studying beta cell function or insulin secretion.
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#008080' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Strain</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Characteristics</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Considerations</th>
                  </tr>
                </thead>
                <tbody>
                  {strainBackgrounds.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.strain}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.characteristics}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.considerations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Phenotyping Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Metabolic Phenotyping
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phenotypingMethods.map((method, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{method.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {method.tests.map((test, idx) => (
                      <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in Diabetes Research
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Models generated by ingenious targeting laboratory have supported diabetes research:
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Diabetes Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your diabetes research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge and includes target analysis, tissue specific Cre recommendations, and timeline estimates.
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
              title="Stay Current on Diabetes Research"
              description="Subscribe to Lab Signals for the latest metabolic disease model updates and research insights."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Diabetes Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {diabetesModelTypes.map((link, index) => (
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
            "name": "Diabetes Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom diabetes mouse models for type 1 and type 2 diabetes research. Beta cell knockouts, insulin signaling models, and metabolic phenotyping.",
            "serviceType": "Diabetes Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
