'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconFlask, IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconShield, IconLayers } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Drug Development Support",
  title: "Preclinical Mouse Model Services",
  intro: "Since 1998, ingenious targeting laboratory has provided comprehensive preclinical support extending from custom model generation through in vivo studies and phenotyping. Our integrated approach enables seamless progression from model design to actionable preclinical data, eliminating handoffs between multiple service providers.",
  description: "Whether you need standalone preclinical studies or end to end support from model conception through data delivery, ingenious targeting laboratory offers the scientific expertise and operational infrastructure to advance your drug development program."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// In Vivo Efficacy Studies
const studyDesignFeatures = [
  "Appropriate endpoints based on therapeutic hypothesis",
  "Statistically powered group sizes",
  "Optimized dosing regimens",
  "Regulatory aligned analysis plans"
];

const oncologyStudyFeatures = [
  "Syngeneic tumor models",
  "Xenograft models",
  "Genetically engineered tumor models",
  "Tumor volume and survival endpoints",
  "Correlative biomarker analysis"
];

// Phenotyping Services
const basicPhenotyping = [
  { name: "Body Weight Monitoring", description: "Tracks growth curves and identifies developmental abnormalities" },
  { name: "Survival Analysis", description: "Enables Kaplan Meier analysis of lifespan effects" },
  { name: "Gross Anatomy", description: "Necropsy with organ weight measurement" },
  { name: "Clinical Observations", description: "Behavioral changes and neurological signs" }
];

const clinicalChemistryHematology = [
  "Metabolic, hepatic, renal, and hematopoietic function",
  "Standard panels customized based on research focus",
  "Blood based insight into model physiology"
];

const specializedPhenotyping = [
  { name: "Metabolic", description: "Glucose tolerance testing for metabolic models" },
  { name: "Cardiovascular", description: "Echocardiography for cardiac models" },
  { name: "Behavioral", description: "Behavioral testing for neuroscience models" },
  { name: "Immune", description: "Immune phenotyping for immunology models" }
];

// Pharmacology Studies
const pharmacologyStudies = [
  {
    name: "PK Studies",
    description: "Pharmacokinetic studies determine drug absorption, distribution, metabolism, and excretion. Time course sampling enables characterization of exposure profiles."
  },
  {
    name: "PD Studies",
    description: "Pharmacodynamic studies correlate drug exposure with biological effect. Target engagement, biomarker modulation, and downstream pathway effects demonstrate mechanism of action."
  },
  {
    name: "PK/PD Modeling",
    description: "Integration of pharmacokinetic and pharmacodynamic data enables modeling of exposure response relationships to guide dose selection."
  }
];

// Integrated Preclinical Programs
const integratedPrograms = [
  {
    name: "Model to Data",
    description: "ingenious targeting laboratory's integrated capabilities enable seamless progression from custom model generation through breeding, cohort development, and preclinical studies. This eliminates the complexity and delays associated with transferring animals between service providers."
  },
  {
    name: "Study Coordination",
    description: "Our project management team coordinates all aspects of preclinical programs, from initial model design through data delivery. Regular updates keep you informed of progress and enable adaptive study design."
  },
  {
    name: "Data Delivery",
    description: "Preclinical study reports include complete methodology, raw data, statistical analysis, and interpretation. Data packages are formatted to support regulatory submissions and publication."
  }
];

// Quality and Compliance
const qualityCompliance = [
  {
    name: "AAALAC Accreditation",
    description: "ingenious targeting laboratory operates AAALAC accredited facilities meeting the highest standards for animal care and welfare."
  },
  {
    name: "Regulatory Alignment",
    description: "Study designs and documentation are prepared with regulatory requirements in mind, supporting IND enabling studies and other regulatory submissions."
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaieTestimonial = getTestimonialById('dunaief-upenn')!;

const testimonials = [
  { quote: dunaieTestimonial.quote, name: formatAuthorWithCredentials(dunaieTestimonial), affiliation: dunaieTestimonial.affiliation },
];

// Related Links
const relatedServices = [
  { title: "Mouse Model Services", href: "/mouse-model-services" },
  { title: "Colony Management Services", href: "/colony-management-services" },
  { title: "Phenotyping Services", href: "/phenotyping-services" },
  { title: "Cryopreservation Services", href: "/cryopreservation-services" }
];

const relatedModels = [
  { title: "Custom Mouse Models", href: "/custom-mouse-models" },
  { title: "Target Validation Mouse Models", href: "/target-validation-mouse-models" },
  { title: "Therapeutic Areas", href: "/therapeutic-areas" }
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between GLP and non-GLP preclinical services?",
    answer: "GLP (Good Laboratory Practice) studies follow strict regulatory guidelines for documentation, quality control, and data integrity required for FDA submissions. Non-GLP studies provide exploratory data for research decisions and are more flexible in design and documentation. Most early-stage studies are non-GLP."
  },
  {
    question: "What types of preclinical studies can be conducted?",
    answer: "Services include efficacy testing (therapeutic response), PK/PD studies (pharmacokinetics and pharmacodynamics), safety/toxicology assessments, biomarker discovery, and combination therapy studies. Studies are customized based on your therapeutic program and regulatory requirements."
  },
  {
    question: "Can you conduct studies using my existing mouse models?",
    answer: "Yes. We can work with models you've already generated or models generated by ingenious targeting laboratory. Studies can be designed using your established colonies or we can manage colony expansion and breeding as part of the service package."
  },
  {
    question: "What documentation is provided with preclinical studies?",
    answer: "All studies include comprehensive reports with methods, results, statistical analysis, and interpretation. Data tables, figures, and raw data files are provided. For regulatory studies, documentation meets GLP standards. Study reports can support IND submissions and regulatory filings."
  }
];

export default function PreclinicalServicesPage() {
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

        {/* In Vivo Efficacy Studies */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              In Vivo Efficacy Studies
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Efficacy studies evaluate therapeutic candidates in disease relevant mouse models. ingenious targeting laboratory designs and executes studies using your custom models or established disease models appropriate for your therapeutic target.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Study Design */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Study Design
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Rigorous study design is essential for generating reliable preclinical data. Our team works with you to define:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {studyDesignFeatures.map((feature, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Oncology Studies */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Oncology Studies
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Tumor efficacy studies evaluate antitumor activity using:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {oncologyStudyFeatures.map((feature, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/oncology-mouse-models"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                  style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Oncology Models</span>
                  <IconChevronRight size={14} color="#2384da" />
                </Link>
              </div>
            </div>

            {/* Disease Model Studies */}
            <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', marginTop: '20px', borderTop: '4px solid #008080' }}>
              <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                Disease Model Studies
              </h3>
              <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                Therapeutic areas including neuroscience, metabolic disease, immunology, and cardiovascular research benefit from disease specific efficacy models. We design studies with endpoints relevant to your disease area and therapeutic approach.
              </p>
            </div>
          </div>
        </section>

        {/* Phenotyping Services */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Phenotyping Services
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Phenotyping characterizes your mouse model across multiple parameters to understand the biological consequences of genetic modification. Comprehensive phenotyping informs experimental design and identifies unexpected phenotypes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Phenotyping */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Basic Phenotyping
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Foundational characterization identifies overt phenotypes and overall health impacts:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {basicPhenotyping.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Chemistry */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Clinical Chemistry and Hematology
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Blood based analysis provides insight into:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {clinicalChemistryHematology.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                  Histopathology
                </h4>
                <p style={{ color: '#555', fontSize: '.85rem' }}>
                  Tissue collection and histological analysis reveals structural changes at the cellular level. Board certified pathologists provide expert interpretation of findings.
                </p>
              </div>
            </div>

            {/* Specialized Phenotyping */}
            <div className="animate-in grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {specializedPhenotyping.map((item, index) => (
                <div key={index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#0a253c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <IconTarget size={24} color="white" />
                  </div>
                  <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '5px' }}>{item.name}</h4>
                  <p style={{ color: '#666', fontSize: '.8rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pharmacology Studies */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Pharmacology Studies
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Pharmacology studies evaluate drug pharmacokinetics, pharmacodynamics, and target engagement in your mouse models.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pharmacologyStudies.map((study, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {study.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {study.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrated Preclinical Programs */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Integrated Preclinical Programs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {integratedPrograms.map((program, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: `4px solid ${index % 2 === 0 ? '#008080' : '#2384da'}` }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#0a253c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px'
                  }}>
                    <IconLayers size={24} color="white" />
                  </div>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {program.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality and Compliance */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Quality and Compliance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qualityCompliance.map((item, index) => (
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
                    <IconShield size={24} color="#008080" />
                  </div>
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

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

        {/* CTA Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss preclinical services for your program? Our scientific team provides complimentary consultation to help you design an integrated approach from model generation through preclinical data.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
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
            <LabSignalsSignup title="Preclinical Services Insights" />
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
            "name": "Preclinical Mouse Model Services",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Preclinical mouse model services for drug development including efficacy testing, phenotyping, and pharmacology studies. Since 1998.",
            "serviceType": "Preclinical Services"
          })
        }}
      />
    </div>
  );
}
