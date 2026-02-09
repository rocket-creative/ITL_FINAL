'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Cancer Research",
  title: "Tumor Suppressor Knockout Mice",
  intro: "Since 1998, ingenious targeting laboratory has generated tumor suppressor knockout models for cancer researchers worldwide. Disruption of tumor suppressor genes is fundamental to understanding cancer initiation, progression, and therapeutic response.",
  description: "Our gene targeting expertise spans p53, Rb, PTEN, APC, BRCA1/2, and other tumor suppressor genes across all cancer types. Whether you need constitutive knockouts for germline tumor predisposition studies or conditional models for tissue specific tumorigenesis, ingenious targeting laboratory provides the scientific consultation and technical execution to deliver models optimized for your oncology research."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Tumor Suppressor Categories
const suppressorCategories = [
  {
    name: "Gatekeeper Genes",
    description: "Gatekeeper genes directly regulate cell proliferation or death. Loss of gatekeepers such as Rb or p53 immediately promotes cellular transformation."
  },
  {
    name: "Caretaker Genes",
    description: "Caretaker genes maintain genomic integrity through DNA repair or chromosome segregation. Loss of caretakers such as BRCA1 or MLH1 leads to accumulation of mutations and genomic instability."
  },
  {
    name: "Landscaper Genes",
    description: "Landscaper genes affect the tissue microenvironment and influence tumor development indirectly through effects on stroma or immune cells."
  }
];

// Common Tumor Suppressor Targets
const tumorSuppressorTargets = [
  {
    name: "p53 (Trp53)",
    description: "p53 is mutated or deleted in the majority of human cancers. Constitutive p53 knockout mice develop tumors spontaneously, while conditional p53 knockouts enable tissue specific tumor studies without early mortality.",
    detail: "p53 conditional alleles crossed with tissue specific Cre lines enable study of p53 loss in specific organs such as lung, breast, colon, or hematopoietic system."
  },
  {
    name: "Rb (Rb1)",
    description: "The retinoblastoma protein controls G1/S cell cycle transition. Rb knockout mice develop pituitary and thyroid tumors, while conditional Rb deletion enables study of tissue specific effects.",
    detail: ""
  },
  {
    name: "PTEN",
    description: "PTEN is a phosphatase that negatively regulates the PI3K/AKT pathway. PTEN loss occurs commonly in prostate, breast, and brain cancers. Conditional PTEN knockouts develop tissue specific tumors with high penetrance.",
    detail: ""
  },
  {
    name: "APC",
    description: "APC mutations drive colorectal cancer through constitutive Wnt signaling activation. APC conditional knockouts enable study of intestinal adenoma development and progression to carcinoma.",
    detail: ""
  },
  {
    name: "BRCA1 and BRCA2",
    description: "BRCA genes maintain genomic stability through homologous recombination DNA repair. Conditional BRCA knockouts in mammary or ovarian epithelium enable study of hereditary breast and ovarian cancer.",
    detail: ""
  }
];

// Strategy Considerations
const strategyConsiderations = [
  {
    name: "Constitutive vs Conditional Knockout",
    description: "Constitutive tumor suppressor knockouts often cause embryonic lethality or early death from tumors, limiting their utility for studying adult cancer. Conditional knockouts enable tumor suppressor deletion in specific tissues at defined times.",
    link: "/conditional-knockout-mouse-models"
  },
  {
    name: "Tissue Specific Deletion",
    description: "Crossing conditional (floxed) tumor suppressor alleles with tissue specific Cre lines enables gene deletion in the tissue of interest. This approach generates tumors in clinically relevant organs without affecting other tissues.",
    creDrivers: "Common Cre drivers for cancer models include MMTV Cre (mammary), Villin Cre (intestine), Albumin Cre (liver), K14 Cre (skin), and GFAP Cre (brain)."
  },
  {
    name: "Inducible Deletion",
    description: "Tamoxifen inducible Cre lines enable temporal control over tumor suppressor deletion. This approach models sporadic tumor development and enables study of tumor suppressor loss in adult tissues.",
    link: "/inducible-conditional-knockout"
  }
];

// Multi Gene Models
const multiGeneModels = [
  {
    name: "Compound Knockouts",
    description: "Cancer typically requires loss of multiple tumor suppressors. Compound conditional knockouts enable simultaneous deletion of multiple genes to study cooperating mutations.",
    examples: "Common combinations include p53/PTEN double knockouts, p53/Rb double knockouts, and APC/p53 combinations."
  },
  {
    name: "Tumor Suppressor Plus Oncogene",
    description: "Combining tumor suppressor knockout with oncogene activation generates aggressive tumor models. Conditional Kras activation combined with p53 deletion is widely used for lung and pancreatic cancer models.",
    examples: ""
  }
];

// Applications
const applications = [
  {
    name: "Tumor Biology Studies",
    description: "Tumor suppressor knockouts enable study of cancer initiation, progression, and metastasis in physiologically relevant contexts."
  },
  {
    name: "Drug Development",
    description: "Genetically defined tumor models enable preclinical testing of targeted therapies and evaluation of synthetic lethal approaches."
  },
  {
    name: "Biomarker Discovery",
    description: "Models with defined genetic lesions support identification of biomarkers associated with tumor suppressor loss."
  },
  {
    name: "Immunotherapy Studies",
    description: "Tumor suppressor knockout models on immunocompetent backgrounds enable study of tumor immune interactions and testing of immunotherapies."
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const maxsonTestimonial = getTestimonialById('maxson-ohsu')!;

const testimonials = [
  { quote: maxsonTestimonial.quote, name: formatAuthorWithCredentials(maxsonTestimonial), affiliation: maxsonTestimonial.affiliation },
];

// Related Links
const relatedOncology = [
  { title: "Oncology Mouse Models", href: "/oncology-mouse-models" },
  { title: "Immuno Oncology Mouse Models", href: "/immuno-oncology-mouse-models" }
];

const relatedModels = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Conventional Knockout Mouse Models", href: "/conventional-knockout-mouse-models" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" }
];

// FAQ Data
const faqData = [
  {
    question: "What tumor suppressor genes are commonly targeted for cancer research?",
    answer: "Common tumor suppressor targets include p53 (Trp53), Rb (Rb1), PTEN, APC, BRCA1/2, and other tumor suppressors across all cancer types. Selection depends on cancer type, research question, and whether you're studying tumor initiation, progression, or therapeutic response."
  },
  {
    question: "Should I use conventional or conditional knockout for tumor suppressors?",
    answer: "Conventional tumor suppressor knockouts often cause embryonic lethality or early death from tumors, limiting utility for adult cancer studies. Conditional knockouts enable tissue-specific or temporal tumor suppressor deletion, allowing study of adult-onset tumorigenesis without developmental lethality."
  },
  {
    question: "What Cre drivers are used for tissue-specific tumor suppressor studies?",
    answer: "Common Cre drivers for tumor suppressor studies include tissue-specific promoters (e.g., Albumin-Cre for liver, Villin-Cre for intestine, Keratin14-Cre for skin) and inducible Cre (CreER) for temporal control. Selection depends on whether you're studying organ-specific tumorigenesis or need temporal control over tumor development."
  },
  {
    question: "How do you validate tumor suppressor knockout phenotypes?",
    answer: "Tumor suppressor knockout validation includes tumor incidence and latency analysis, histological assessment (tumor type, grade, stage), molecular markers (pathway activation, proliferation markers), and survival analysis. Models are validated before delivery to ensure appropriate tumor phenotypes."
  }
];

export default function TumorSuppressorKnockoutMicePage() {
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

        {/* Tumor Suppressor Biology */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Tumor Suppressor Biology
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Tumor suppressor genes normally function to restrict cell proliferation, promote apoptosis, maintain genomic stability, or repair DNA damage. Loss of tumor suppressor function through mutation or deletion enables uncontrolled cell growth and is a hallmark of cancer development.
            </p>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Categories of Tumor Suppressors
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suppressorCategories.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {category.name}
                  </h4>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Tumor Suppressor Targets */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Common Tumor Suppressor Targets
            </h2>

            <div className="space-y-6">
              {tumorSuppressorTargets.map((target, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>
                    {target.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: target.detail ? '10px' : '0' }}>
                    {target.description}
                  </p>
                  {target.detail && (
                    <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem', fontStyle: 'italic' }}>
                      {target.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Knockout Strategy Considerations */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Knockout Strategy Considerations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strategyConsiderations.map((strategy, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {strategy.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '10px' }}>
                    {strategy.description}
                  </p>
                  {strategy.creDrivers && (
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                      {strategy.creDrivers}
                    </p>
                  )}
                  {strategy.link && (
                    <Link
                      href={strategy.link}
                      className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                      style={{ color: 'white', fontSize: '.85rem', fontWeight: 500 }}
                    >
                      <span>Learn more</span>
                      <IconChevronRight size={14} color="white" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Multi Gene Cancer Models */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Multi Gene Cancer Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {multiGeneModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {model.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: model.examples ? '10px' : '0' }}>
                    {model.description}
                  </p>
                  {model.examples && (
                    <p style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>
                      {model.examples}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {applications.map((app, index) => (
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
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {app.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>What Researchers Say</h2>
            <div className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '48px 56px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '25px' }}>&ldquo;{testimonials[0].quote}&rdquo;</p>
              <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonials[0].name}</p>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.85rem', fontWeight: 400 }}>{testimonials[0].affiliation}</p>
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
              Ready to discuss tumor suppressor knockout models for your cancer research? Our scientific team provides complimentary consultation to help you design the optimal targeting strategy.
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
        <LabSignalsSignup 
          title="Monitor Your Tumor Suppressor Knockout Project"
          description="Receive updates on your p53, PTEN, or other tumor suppressor knockout model development, including genotype validation and tumor phenotype characterization."
        />

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Oncology Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedOncology.map((link, index) => (
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
            "name": "Tumor Suppressor Knockout Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom tumor suppressor knockout mouse models for cancer research. p53, Rb, PTEN, APC, and other tumor suppressor gene targeting since 1998.",
            "serviceType": "Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
