'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconImage, IconChevronRight, IconCheckCircle, IconHeart } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Cardiac Disease Research",
  title: "Heart Failure Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported cardiovascular research with custom knockout, knockin, and conditional mouse models for heart failure studies. Our gene targeting expertise enables investigation of the molecular mechanisms driving cardiomyopathy, cardiac remodeling, and contractile dysfunction.",
  description: "Whether you are studying inherited cardiomyopathies, modeling pressure or volume overload induced heart failure, or validating therapeutic targets, ingenious targeting laboratory provides models optimized for your cardiac research goals."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Pathophysiology Data
const pathophysiologyData = [
  {
    title: "Dilated Cardiomyopathy",
    description: "Dilated cardiomyopathy is characterized by ventricular dilation and systolic dysfunction. Genetic forms result from mutations in sarcomeric proteins, cytoskeletal components, or ion channels. Mouse models carrying human disease associated mutations enable study of disease mechanisms and therapeutic testing."
  },
  {
    title: "Hypertrophic Cardiomyopathy",
    description: "Hypertrophic cardiomyopathy features abnormal cardiac hypertrophy, often caused by sarcomeric gene mutations. Mouse models enable study of hypertrophic signaling pathways and diastolic dysfunction."
  },
  {
    title: "Cardiac Remodeling",
    description: "Pathological cardiac remodeling in response to hemodynamic stress involves cardiomyocyte hypertrophy, fibrosis, and changes in gene expression. Understanding the signaling pathways driving maladaptive remodeling is essential for developing therapies that prevent heart failure progression."
  }
];

// Custom Model Approaches
const customModelApproaches = [
  {
    title: "Sarcomeric Protein Mutations",
    description: "Point mutation knockin models enable study of disease causing mutations in sarcomeric genes including MYH7, MYBPC3, TNNT2, and TNNI3. These models reproduce human cardiomyopathy phenotypes and enable mechanistic studies.",
    link: { text: "Learn about Point Mutation Mice", href: "/point-mutation-mice" }
  },
  {
    title: "Signaling Pathway Modulation",
    description: "Knockout and conditional knockout models enable study of signaling pathways involved in cardiac hypertrophy, fibrosis, and failure. Common targets include kinases, transcription factors, and metabolic regulators.",
    link: null
  },
  {
    title: "Cardiac Specific Knockouts",
    description: "Cardiac specific gene deletion using alpha myosin heavy chain Cre (αMHC Cre) or myosin light chain Cre (MLC Cre) enables study of gene function specifically in cardiomyocytes without affecting other tissues. This approach is essential when systemic knockout causes embryonic lethality or when cardiac specific phenotypes need to be distinguished from systemic effects.",
    link: null
  },
  {
    title: "Inducible Cardiac Knockouts",
    description: "Tamoxifen inducible cardiac Cre lines such as αMHC MerCreMer enable adult onset gene deletion. This approach avoids developmental effects and enables study of gene function in the adult heart.",
    link: { text: "Learn about Inducible Knockouts", href: "/inducible-conditional-knockout" }
  }
];

// Ion Channel Models
const ionChannelModels = [
  {
    title: "Arrhythmia Models",
    description: "Mutations in cardiac ion channels cause inherited arrhythmia syndromes including long QT syndrome, Brugada syndrome, and catecholaminergic polymorphic ventricular tachycardia. Mouse models enable study of arrhythmia mechanisms and testing of antiarrhythmic therapies."
  },
  {
    title: "Calcium Handling Defects",
    description: "Alterations in calcium cycling proteins including SERCA2a, phospholamban, and ryanodine receptor contribute to heart failure progression. Models modifying these genes enable study of calcium handling in cardiac dysfunction."
  }
];

// Fibrosis Models
const fibrosisModels = [
  {
    title: "Fibroblast Specific Modifications",
    description: "Cardiac fibrosis involves activation of fibroblasts and excessive extracellular matrix deposition. Fibroblast specific Cre lines enable study of gene function specifically in the fibroblast population."
  },
  {
    title: "TGF Beta Pathway Models",
    description: "The TGF beta pathway plays central roles in cardiac fibrosis. Models modifying TGF beta ligands, receptors, or downstream signaling components enable study of profibrotic mechanisms."
  }
];

// Research Applications
const researchApplications = [
  {
    title: "Disease Mechanism Studies",
    description: "Custom models enable investigation of specific genes and pathways in heart failure pathogenesis, from initial insult through remodeling to overt failure."
  },
  {
    title: "Therapeutic Target Validation",
    description: "Knockout and knockin models validate potential therapeutic targets by demonstrating that target modulation affects disease phenotypes."
  },
  {
    title: "Drug Efficacy Testing",
    description: "Models that develop measurable cardiac phenotypes enable preclinical testing of therapeutic interventions. Endpoints can include echocardiographic function, survival, histological changes, and molecular markers."
  },
  {
    title: "Gene Therapy Development",
    description: "Mouse models provide platforms for testing cardiac gene therapy approaches, including AAV mediated gene delivery and gene editing strategies."
  }
];

// Cre Drivers
const creDrivers = [
  { driver: "Myh6-Cre", target: "Cardiomyocytes", application: "Standard cardiac-specific deletion" },
  { driver: "Tcf21-MerCreMer", target: "Cardiac fibroblasts", application: "Inducible fibroblast targeting" },
  { driver: "Postn-Cre", target: "Activated fibroblasts", application: "Fibrosis mechanism studies" },
  { driver: "αMHC-CreERT2", target: "Cardiomyocytes", application: "Inducible adult-onset deletion" }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const rateriTestimonial = getTestimonialById('rateri-kentucky')!;

const testimonials = [
  { quote: rateriTestimonial.quote, name: formatAuthorWithCredentials(rateriTestimonial), affiliation: rateriTestimonial.affiliation },
];

// Related Links
const relatedDiseaseModels = [
  { title: "Cardiovascular Mouse Models", href: "/cardiovascular-mouse-models" },
  { title: "Atherosclerosis Mouse Models", href: "/atherosclerosis-mouse-models" },
  { title: "Hypertension Mouse Models", href: "/hypertension-mouse-models" },
  { title: "Cardiac Fibrosis Mice", href: "/cardiac-fibrosis-mice" }
];

const relatedModelTypes = [
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" }
];

// FAQ Data
const faqData = [
  {
    question: "What Cre drivers are used for heart failure studies?",
    answer: "Common cardiac Cre drivers include Myh6-Cre (cardiomyocytes), Tcf21-MerCreMer (cardiac fibroblasts, inducible), Postn-Cre (activated fibroblasts), and alphaMHC-CreERT2 (inducible cardiomyocyte). Selection depends on whether you're studying cardiomyocyte function, fibroblast activation, or combined cardiac remodeling mechanisms."
  },
  {
    question: "How do you model heart failure in mice?",
    answer: "Heart failure can be modeled through pressure overload (transverse aortic constriction), myocardial infarction (coronary ligation), genetic modifications affecting cardiac contractility or metabolism, or point mutations modeling human cardiomyopathy variants. Conditional approaches enable tissue-specific study of genes involved in heart failure without developmental lethality."
  },
  {
    question: "Can you create inducible heart failure models?",
    answer: "Yes. Tamoxifen-inducible Cre (CreER) enables temporal control of gene deletion in cardiomyocytes or fibroblasts, allowing study of adult-onset heart failure mechanisms without developmental effects. This is particularly useful for genes with essential developmental functions that would cause embryonic lethality if deleted constitutively."
  },
  {
    question: "How do you validate cardiac function in heart failure models?",
    answer: "Cardiac function validation includes echocardiography (ejection fraction, fractional shortening, wall motion), hemodynamic assessment (pressure-volume loops), histological analysis (cardiomyocyte size, fibrosis), and molecular markers (BNP, ANP, beta-MHC). Models are validated before delivery to ensure proper cardiac phenotypes."
  }
];

export default function HeartFailureMouseModelsPage() {
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
                  <IconHeart size={16} color="white" />
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

        {/* Heart Failure Pathophysiology */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Heart Failure Pathophysiology
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Heart failure represents the final common pathway for multiple cardiac diseases, characterized by impaired contractile function and inadequate cardiac output. Mouse models enable study of the genetic, molecular, and cellular mechanisms underlying cardiac dysfunction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pathophysiologyData.map((item, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.6rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Model Approaches */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Custom Model Approaches
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customModelApproaches.map((approach, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {approach.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: approach.link ? '15px' : '0' }}>
                    {approach.description}
                  </p>
                  {approach.link && (
                    <Link
                      href={approach.link.href}
                      className="inline-flex items-center gap-2 transition-colors duration-300"
                      style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                    >
                      <span>{approach.link.text}</span>
                      <IconChevronRight size={14} color="#008080" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ion Channel and Calcium Handling Models */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Ion Channel and Calcium Handling Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ionChannelModels.map((model, index) => (
                <div
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '25px',
                    borderRadius: '8px'
                  }}
                >
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {model.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {model.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cardiac Fibrosis Models */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Cardiac Fibrosis Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fibrosisModels.map((model, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {model.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {model.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cre Drivers Table */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              Common Cardiac Cre Drivers
            </h2>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Cell Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Application</th>
                  </tr>
                </thead>
                <tbody>
                  {creDrivers.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 500 }}>{row.driver}</td>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.target}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Research Applications */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications in Heart Failure Research
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchApplications.map((app, index) => (
                <div
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '25px',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '15px'
                  }}
                >
                  <IconCheckCircle size={20} color="#008080" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>
                      {app.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                      {app.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ marginTop: '25px' }}>
              <Link
                href="/gene-therapy-mouse-models"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: 'white', fontSize: '.85rem', fontWeight: 500 }}
              >
                <span>Learn about Gene Therapy Models</span>
                <IconChevronRight size={14} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>What Researchers Say</h2>
            <div className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
              <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '25px' }}>&ldquo;{testimonials[0].quote}&rdquo;</p>
              <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonials[0].name}</p>
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
              Start Your Heart Failure Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss custom mouse models for your heart failure research? Our scientific team provides complimentary consultation to help you design the optimal model for your cardiac research goals.
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
              title="Stay Updated on Cardiovascular Research Models"
              description="Get the latest insights on heart failure models, cardiomyopathy research, and cardiac therapeutics."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Disease Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedDiseaseModels.map((link, index) => (
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
            "name": "Heart Failure Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom mouse models for heart failure research. Study cardiomyopathy, cardiac remodeling, and contractile dysfunction. Gene targeting since 1998.",
            "serviceType": "Heart Failure Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
