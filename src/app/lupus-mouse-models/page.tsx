'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconShield } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "SLE Research Models",
  title: "Lupus Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported systemic lupus erythematosus research with custom knockout, knockin, and conditional mouse models. Our gene targeting expertise enables study of the genetic and immunological mechanisms driving lupus pathogenesis, autoantibody production, and organ damage.",
  description: "Whether you are investigating novel lupus susceptibility genes, testing therapeutic interventions, or studying specific aspects of lupus immunopathology, ingenious targeting laboratory provides models optimized for your SLE research goals."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Disease Mechanisms
const diseaseMechanisms = [
  {
    title: "Autoantibody Production",
    description: "Lupus is characterized by autoantibodies against nuclear antigens including dsDNA, histones, and ribonucleoproteins. Understanding the B cell and T cell dysregulation that enables autoantibody production is central to developing effective therapies."
  },
  {
    title: "Immune Complex Disease",
    description: "Autoantibodies form immune complexes that deposit in kidneys, skin, and other tissues, triggering complement activation and inflammatory damage. Models that recapitulate immune complex mediated pathology enable study of tissue injury mechanisms."
  },
  {
    title: "Lupus Nephritis",
    description: "Kidney involvement is a major cause of morbidity in lupus patients. Mouse models that develop glomerulonephritis enable study of renal immunopathology and testing of nephroprotective therapeutic strategies."
  }
];

// Custom Model Approaches
const customModelApproaches = [
  {
    title: "Susceptibility Gene Knockouts",
    description: "Knockout models enable study of genes implicated in lupus susceptibility through human genetic studies. Loss of function models can reveal how deficiency in specific genes contributes to breakdown of immune tolerance and development of autoimmunity.",
    targets: "Common targets include complement components, Fc receptors, B cell signaling molecules, and DNA sensing pathway components."
  },
  {
    title: "Conditional Knockouts for Cell Type Specificity",
    description: "Lupus involves multiple immune cell populations including B cells, T cells, dendritic cells, and macrophages. Conditional knockout approaches enable study of gene function in specific cell types to identify which populations are responsible for disease phenotypes.",
    targets: "Cell type specific Cre lines crossed with floxed alleles enable deletion in B cells (CD19 Cre), T cells (CD4 Cre, Lck Cre), dendritic cells (CD11c Cre), or myeloid cells (LysM Cre)."
  },
  {
    title: "Knockin Models",
    description: "Knockin approaches enable study of specific genetic variants associated with lupus in humans. Point mutation knockins reproduce human disease associated mutations in the mouse genome.",
    targets: "Reporter knockins enable tracking of specific cell populations or visualization of gene expression patterns relevant to lupus pathogenesis."
  },
  {
    title: "Humanized Models",
    description: "When therapeutic antibodies are specific for human targets, humanization of the target gene enables preclinical efficacy testing. This is particularly relevant for biologics targeting B cell surface molecules or cytokine receptors.",
    targets: ""
  }
];

// Strain Backgrounds
const strainBackgrounds = [
  {
    title: "Lupus Prone Backgrounds",
    description: "Some mouse strain backgrounds are inherently predisposed to autoimmunity. NZB, NZW, BXSB, and MRL strains carry genetic variants that promote lupus like disease. Introducing additional genetic modifications on these backgrounds can accelerate or modify disease phenotypes."
  },
  {
    title: "C57BL/6 Background",
    description: "C57BL/6 is resistant to spontaneous autoimmunity but provides a well characterized genetic background for studying effects of single gene modifications. Lupus phenotypes on C57BL/6 typically require multiple genetic hits or immune challenge."
  },
  {
    title: "Mixed Background Considerations",
    description: "Backcrossing onto defined genetic backgrounds ensures reproducible phenotypes and enables comparison across studies. ingenious targeting laboratory provides backcrossing services to establish your model on the optimal strain background."
  }
];

// Research Applications
const researchApplications = [
  {
    category: "Disease Mechanism Studies",
    description: "Custom models enable investigation of specific genes and pathways in lupus pathogenesis, from initial tolerance breakdown through autoantibody production to organ damage."
  },
  {
    category: "Therapeutic Target Validation",
    description: "Knockout and knockin models can validate potential therapeutic targets by demonstrating that target modulation affects disease phenotypes."
  },
  {
    category: "Drug Efficacy Testing",
    description: "Models that develop measurable lupus phenotypes such as autoantibodies, proteinuria, or renal pathology enable preclinical testing of therapeutic interventions."
  },
  {
    category: "Biomarker Discovery",
    description: "Reporter knockins and tissue specific models support identification of biomarkers for disease activity and treatment response."
  }
];

// Lupus Model Types
const lupusModelTypes = [
  { type: "NZB/W F1", description: "Combines NZB and NZW backgrounds, develops lupus nephritis" },
  { type: "MRL/lpr", description: "Fas deficient, accelerated autoimmunity and lymphoproliferation" },
  { type: "BXSB", description: "Y chromosome accelerated autoimmunity" },
  { type: "Gene Targeted", description: "Knockout or knockin of lupus susceptibility genes" },
  { type: "Conditional", description: "Tissue-specific deletion of genes involved in SLE" }
];

// Phenotyping Endpoints
const phenotypingEndpoints = [
  "Anti nuclear antibody (ANA) titers",
  "Anti dsDNA antibodies",
  "Proteinuria",
  "Glomerulonephritis histology",
  "Spleen and lymph node size",
  "Immune cell infiltration",
  "Cytokine profiling",
  "Survival"
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;

const testimonials = [
  { quote: mirmiraTestimonial.quote, name: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation },
];

// Related Links
const relatedDiseaseModels = [
  { title: "Autoimmune Disease Mice", href: "/autoimmune-disease-mice" },
  { title: "IBD Mouse Models", href: "/ibd-mouse-models" },
  { title: "Immunology Mouse Models", href: "/immunology-mouse-models" },
  { title: "Rheumatoid Arthritis Mice", href: "/rheumatoid-arthritis-mice" }
];

const relatedModelTypes = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

// FAQ Data
const faqData = [
  {
    question: "What types of lupus mouse models are available?",
    answer: "Lupus models include spontaneous models (NZB/W F1, MRL/lpr, BXSB), gene-targeted models (knockout or knockin of lupus susceptibility genes), and conditional models (tissue-specific deletion of genes involved in SLE pathogenesis). Selection depends on research question, timeline, and specific mechanisms of interest."
  },
  {
    question: "What genetic backgrounds are used for lupus models?",
    answer: "Lupus models are typically maintained on specific backgrounds that confer disease susceptibility. NZB/W F1 combines NZB and NZW backgrounds. MRL/lpr uses MRL background. C57BL/6 is often used as resistant background for comparison. Background choice significantly affects disease severity and phenotype."
  },
  {
    question: "Can conditional knockout approaches be used for lupus studies?",
    answer: "Yes. Conditional knockout enables tissue-specific study of genes involved in lupus without global effects. For example, B-cell-specific, T-cell-specific, or macrophage-specific deletion can distinguish cell-type contributions to disease. Inducible deletion enables temporal control for studying disease mechanisms at specific stages."
  },
  {
    question: "How do you phenotype lupus mouse models?",
    answer: "Lupus phenotyping includes anti-nuclear antibody (ANA) titers, anti-dsDNA antibodies, proteinuria, glomerulonephritis histology, spleen and lymph node size, immune cell infiltration, cytokine profiling, and survival. Disease typically develops over months, with female mice showing earlier and more severe disease in many models."
  }
];

export default function LupusMouseModelsPage() {
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
                  <IconShield size={16} color="white" />
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

        {/* Lupus Disease Mechanisms */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Lupus Disease Mechanisms
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Systemic lupus erythematosus is a chronic autoimmune disease characterized by loss of self tolerance, production of antinuclear autoantibodies, immune complex deposition, and multiorgan inflammation. Mouse models provide essential tools for understanding these complex pathogenic mechanisms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diseaseMechanisms.map((mechanism, index) => (
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
                    {mechanism.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.6rem' }}>
                    {mechanism.description}
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
              Custom Model Approaches for Lupus Research
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
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: approach.targets ? '12px' : '0' }}>
                    {approach.description}
                  </p>
                  {approach.targets && (
                    <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem', fontStyle: 'italic' }}>
                      {approach.targets}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strain Background Considerations */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Strain Background Considerations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strainBackgrounds.map((strain, index) => (
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
                    {strain.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem', lineHeight: '1.6rem' }}>
                    {strain.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ marginTop: '25px' }}>
              <Link
                href="/backcrossing-services"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: 'white', fontSize: '.85rem', fontWeight: 500 }}
              >
                <span>Learn about Backcrossing Services</span>
                <IconChevronRight size={14} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Model Types Table */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              Lupus Model Types
            </h2>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Model Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {lupusModelTypes.map((model, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{model.type}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{model.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Research Applications */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications in Lupus Research
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchApplications.map((app, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {app.category}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phenotyping Endpoints */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Phenotyping Lupus Models
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              Disease typically develops over months, with female mice showing earlier and more severe disease in many models. Key endpoints include:
            </p>

            <div className="animate-in grid grid-cols-2 md:grid-cols-4 gap-4">
              {phenotypingEndpoints.map((endpoint, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '15px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <IconCheckCircle size={16} color="#008080" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'white', fontSize: '.85rem' }}>{endpoint}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Lupus Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss custom mouse models for your lupus research? Our scientific team provides complimentary consultation to help you design the optimal model for your SLE research goals.
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
            <LabSignalsSignup title="Lupus Research Insights" />
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
            "name": "Lupus Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom mouse models for systemic lupus erythematosus research. Study autoantibody production, immune complex disease, and lupus nephritis. Since 1998.",
            "serviceType": "Lupus Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
