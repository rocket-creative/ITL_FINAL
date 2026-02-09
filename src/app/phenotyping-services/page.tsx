'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconFlask, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Model Characterization",
  title: "Mouse Phenotyping Services",
  intro: "ingenious targeting laboratory provides comprehensive phenotyping services to characterize your custom mouse models across multiple biological parameters. Phenotyping reveals the functional consequences of genetic modifications and informs experimental design for downstream studies.",
  description: "From basic clinical observations through specialized disease specific endpoints, our phenotyping capabilities help you understand your model's biology and validate its utility for your research program."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Basic Phenotyping Items
const basicPhenotyping = [
  {
    name: "Body Weight and Growth",
    description: "Longitudinal body weight monitoring tracks growth curves and identifies developmental abnormalities or metabolic phenotypes. Weight data enables comparison with wild type littermates and detection of genotype dependent effects."
  },
  {
    name: "Survival Analysis",
    description: "Survival tracking identifies premature mortality and enables Kaplan Meier analysis of lifespan effects. This is essential for models with potential lethality."
  },
  {
    name: "Clinical Observations",
    description: "Regular clinical observation identifies behavioral changes, neurological signs, gait abnormalities, and other visible phenotypes. Standardized scoring systems enable quantitative tracking."
  },
  {
    name: "Gross Anatomy",
    description: "Necropsy with organ weight measurement identifies organomegaly, atrophy, or structural abnormalities. Gross pathology guides selection of tissues for histological analysis."
  }
];

// Serum Chemistry Items
const serumChemistry = [
  { panel: "Metabolic panel", tests: "Glucose, cholesterol, triglycerides, free fatty acids" },
  { panel: "Liver function", tests: "ALT, AST, alkaline phosphatase, bilirubin, albumin" },
  { panel: "Kidney function", tests: "BUN, creatinine" },
  { panel: "Electrolytes", tests: "Sodium, potassium, chloride, calcium, phosphorus" }
];

// Special Stains
const specialStains = [
  { stain: "Fibrosis", method: "Masson's trichrome, Sirius red" },
  { stain: "Lipid", method: "Oil Red O (frozen sections)" },
  { stain: "Glycogen", method: "PAS staining" },
  { stain: "Mucins", method: "Alcian blue" }
];

// Histopathology Services
const histopathologyServices = [
  {
    name: "Tissue Collection",
    description: "Standardized tissue collection protocols ensure optimal preservation for histological analysis. Collection can be customized based on expected phenotype."
  },
  {
    name: "Routine Histology",
    description: "Hematoxylin and eosin (H&E) staining provides overview of tissue architecture and pathology. Standard panels include major organs; custom panels focus on tissues of interest."
  },
  {
    name: "Immunohistochemistry",
    description: "Immunohistochemical staining detects specific proteins in tissue sections, enabling assessment of cell populations, pathway activation, and protein localization."
  },
  {
    name: "Pathology Interpretation",
    description: "Board certified veterinary pathologists provide expert interpretation of histological findings with standardized scoring and detailed reports."
  }
];

// Metabolic Phenotyping
const metabolicPhenotyping = [
  { test: "Glucose tolerance testing (GTT)", description: "Measures glucose clearance after glucose challenge" },
  { test: "Insulin tolerance testing (ITT)", description: "Assesses insulin sensitivity" },
  { test: "Body composition", description: "DEXA or MRI based measurement of fat and lean mass" },
  { test: "Metabolic cages", description: "Indirect calorimetry for energy expenditure, food intake, and activity" }
];

// Cardiovascular Phenotyping
const cardiovascularPhenotyping = [
  { test: "Echocardiography", description: "Non invasive assessment of cardiac function, including ejection fraction, wall thickness, and chamber dimensions" },
  { test: "Blood pressure", description: "Tail cuff or telemetry based blood pressure monitoring" },
  { test: "ECG", description: "Electrocardiographic assessment of cardiac rhythm" }
];

// Behavioral Phenotyping
const behavioralPhenotyping = [
  { test: "Open field", description: "General activity and anxiety like behavior" },
  { test: "Elevated plus maze", description: "Anxiety assessment" },
  { test: "Rotarod", description: "Motor coordination and balance" },
  { test: "Morris water maze", description: "Spatial learning and memory" },
  { test: "Fear conditioning", description: "Associative learning" }
];

// Immune Phenotyping
const immunePhenotyping = [
  { test: "Flow cytometry", description: "Multi parameter analysis of immune cell populations in blood, spleen, lymph nodes, and tissues" },
  { test: "Cytokine profiling", description: "Serum or tissue cytokine levels" }
];

// Study Design Elements
const studyDesignElements = [
  {
    name: "Cohort Planning",
    description: "We work with you to determine appropriate cohort sizes, age at analysis, and sex considerations based on your expected phenotype and statistical requirements."
  },
  {
    name: "Control Selection",
    description: "Appropriate controls (wild type littermates, heterozygotes, or Cre only controls) are essential for phenotype interpretation. We help design control groups for your study."
  },
  {
    name: "Data Delivery",
    description: "Phenotyping reports include complete methodology, raw data, statistical analysis, and interpretation. Data packages are formatted to support publications and regulatory submissions."
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const saidTestimonial = getTestimonialById('said-uci')!;

const testimonials = [
  { quote: saidTestimonial.quote, name: formatAuthorWithCredentials(saidTestimonial), affiliation: saidTestimonial.affiliation },
];

// Related Links
const relatedServices = [
  { title: "Preclinical Services", href: "/preclinical-services" },
  { title: "Colony Management Services", href: "/colony-management-services" },
  { title: "Mouse Model Services", href: "/mouse-model-services" }
];

const relatedModels = [
  { title: "Custom Mouse Models", href: "/custom-mouse-models" },
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
];

// FAQ Data
const faqData = [
  {
    question: "What types of phenotyping services does ingenious targeting laboratory provide?",
    answer: "We provide comprehensive phenotyping services including metabolic phenotyping (glucose tolerance, insulin tolerance, body composition, metabolic cages), cardiovascular phenotyping (echocardiography, blood pressure, ECG), behavioral phenotyping (open field, elevated plus maze, rotarod, Morris water maze, fear conditioning), and immune phenotyping (flow cytometry, cytokine profiling)."
  },
  {
    question: "How do you design a phenotyping study?",
    answer: "Phenotyping study design includes determining appropriate cohort sizes based on expected phenotype and statistical requirements, selecting age at analysis (considering developmental timing and disease progression), sex considerations (males vs females, or both), appropriate controls (wild-type littermates, vehicle-treated controls), and timeline planning for longitudinal studies."
  },
  {
    question: "What is included in phenotyping service deliverables?",
    answer: "Phenotyping service deliverables include comprehensive data reports with quantitative results, statistical analysis comparing experimental groups to controls, histological images and analysis when applicable, functional assessment results (behavioral, metabolic, cardiovascular), and interpretation guidance for understanding results in context of your research question."
  },
  {
    question: "Can phenotyping be performed on existing mouse models?",
    answer: "Yes. We can perform phenotyping on models you already have, models generated by ingenious targeting laboratory, or models obtained from other sources. We work with you to design appropriate phenotyping strategies based on your model type, research question, and expected phenotypes."
  }
];

export default function PhenotypingServicesPage() {
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
                  <IconFlask size={16} color="white" />
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

        {/* Basic Phenotyping */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Basic Phenotyping
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Basic phenotyping establishes foundational characterization of your mouse model and identifies overt phenotypes affecting health, development, or survival.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {basicPhenotyping.map((item, index) => (
                <div key={index} className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinical Chemistry and Hematology */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Clinical Chemistry and Hematology
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Serum Chemistry */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Serum Chemistry
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Clinical chemistry panels assess metabolic, hepatic, and renal function:
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <tbody>
                    {serumChemistry.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '10px', color: '#008080', fontWeight: 600, width: '35%' }}>{item.panel}</td>
                        <td style={{ padding: '10px', color: '#555' }}>{item.tests}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Hematology & Specialized Assays */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Hematology
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '20px' }}>
                  Complete blood count (CBC) with differential identifies hematopoietic phenotypes affecting red cells, white cells, and platelets. Reticulocyte counts assess erythropoietic activity.
                </p>

                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Specialized Assays
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem' }}>
                  Cytokine panels, hormone levels, and other specialized biomarker assays are available based on your model&apos;s expected phenotype.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Histopathology */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Histopathology
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {histopathologyServices.map((service, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Special Stains Table */}
            <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                Special Stains
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                Special histochemical stains highlight specific tissue components:
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specialStains.map((stain, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                        <td style={{ padding: '12px 15px', color: 'white', fontWeight: 500 }}>{stain.stain}</td>
                        <td style={{ padding: '12px 15px', color: 'rgba(255,255,255,0.9)' }}>{stain.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Disease Specific Phenotyping */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Disease Specific Phenotyping
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Metabolic Phenotyping */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Metabolic Phenotyping
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {metabolicPhenotyping.map((item, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.9rem' }}>{item.test}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/nash-mash-mouse-models"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                  style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Metabolic Disease Models</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>

              {/* Cardiovascular Phenotyping */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Cardiovascular Phenotyping
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {cardiovascularPhenotyping.map((item, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.9rem' }}>{item.test}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/cardiovascular-mouse-models"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                  style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Cardiovascular Models</span>
                  <IconChevronRight size={14} color="#2384da" />
                </Link>
              </div>

              {/* Behavioral Phenotyping */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Behavioral Phenotyping
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {behavioralPhenotyping.map((item, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.9rem' }}>{item.test}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/neuroscience-mouse-models"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                  style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Neuroscience Models</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>

              {/* Immune Phenotyping */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Immune Phenotyping
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {immunePhenotyping.map((item, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.9rem' }}>{item.test}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/immunology-mouse-models"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                  style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Immunology Models</span>
                  <IconChevronRight size={14} color="#2384da" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Phenotyping Study Design */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Phenotyping Study Design
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studyDesignElements.map((element, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,128,128,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px'
                  }}>
                    <IconCheckCircle size={24} color="#008080" />
                  </div>
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {element.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {element.description}
                  </p>
                </div>
              ))}
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
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss phenotyping for your mouse model? Our scientific team provides complimentary consultation to design an appropriate phenotyping strategy.
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
            <LabSignalsSignup title="Phenotyping Service Insights" />
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
                  Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedModels.map((link, index) => (
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
            "name": "Mouse Phenotyping Services",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Comprehensive mouse phenotyping services including histopathology, clinical chemistry, behavioral testing, and disease specific phenotyping. Since 1998.",
            "serviceType": "Phenotyping Services"
          })
        }}
      />
    </div>
  );
}
