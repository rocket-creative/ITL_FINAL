'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconTarget, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Immune System Models",
  title: "Autoimmune Mouse Model",
  intro: "Since 1998, ingenious targeting laboratory has supported autoimmune disease research with custom mouse models enabling mechanistic studies of immune tolerance breakdown, autoreactive lymphocyte development, and therapeutic interventions targeting aberrant immune responses.",
  description: "Autoimmune disease mouse models provide essential platforms for investigating the molecular pathways underlying loss of self tolerance, testing hypotheses about genetic susceptibility, and developing therapies for conditions including lupus, rheumatoid arthritis, multiple sclerosis, and type 1 diabetes."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Disease Categories
const diseaseCategories = [
  { name: "Systemic Autoimmunity", desc: "Diseases affecting multiple organ systems, including systemic lupus erythematosus (SLE), rheumatoid arthritis, and Sjogren syndrome." },
  { name: "Organ Specific Autoimmunity", desc: "Diseases targeting specific tissues, including type 1 diabetes (pancreas), multiple sclerosis (nervous system), and autoimmune thyroiditis." },
  { name: "Inflammatory Bowel Disease", desc: "Immune mediated intestinal inflammation including Crohn disease and ulcerative colitis." }
];

// Spontaneous Models
const spontaneousModels = [
  { name: "MRL/lpr", desc: "Mice homozygous for the lpr mutation in Fas develop severe lupus with lymphadenopathy, autoantibodies, and glomerulonephritis." },
  { name: "NZB/W F1", desc: "Hybrid offspring of NZB and NZW strains develop lupus like disease with anti DNA antibodies and nephritis. Female predominance mirrors human SLE." },
  { name: "NOD (Non Obese Diabetic)", desc: "Spontaneous development of autoimmune diabetes with insulitis and beta cell destruction. Widely used for T1D research." },
  { name: "K/BxN", desc: "T cell receptor transgenic model developing severe inflammatory arthritis. Serum transfer induces arthritis in naive recipients." }
];

// Key Pathways
const keyPathways = [
  { pathway: "Interferon Signaling", genes: ["IFNAR Knockout: Interferon alpha/beta receptor knockout protects from lupus", "STING Pathway: Links DNA sensing to type I interferon production", "IRF Family: Controls interferon gene expression"] },
  { pathway: "B Cell Tolerance", genes: ["BCR Signaling: Modulation affects autoreactive B cell fate", "BAFF/APRIL: B cell survival factors influence persistence", "TLR Signaling: Intrinsic TLR7 and TLR9 promote activation"] },
  { pathway: "T Cell Tolerance", genes: ["Central Tolerance: Aire controls tissue restricted antigen expression", "Peripheral Tolerance: Regulatory T cells maintain tolerance", "Th17 Cells: IL17 producing T helper cells drive inflammation"] }
];

// Conditional Cre Drivers
const creDrivers = [
  { name: "T Cell Specific", driver: "CD4 Cre or Lck Cre", desc: "Reveals T cell intrinsic requirements for tolerance" },
  { name: "B Cell Specific", driver: "CD19 Cre or Mb1 Cre", desc: "Targets B lymphocytes for autoantibody studies" },
  { name: "Dendritic Cell Specific", driver: "CD11c Cre", desc: "Examines antigen presenting cell contributions" },
  { name: "Tissue Specific", driver: "Organ specific Cre", desc: "Target organ specific gene deletion for organ specific autoimmunity" }
];

// Phenotyping Methods
const phenotypingMethods = [
  { category: "Serological Assessment", tests: ["Autoantibodies: ELISA for anti nuclear, anti dsDNA, rheumatoid factor", "Immunoglobulin levels: Total IgG, IgM, IgA quantification", "Inflammatory markers: Cytokines, chemokines, complement"] },
  { category: "Organ Assessment", tests: ["Kidney: Proteinuria, BUN, creatinine for lupus nephritis", "Joints: Clinical scoring, histology for synovitis and erosion", "CNS: Clinical scoring for EAE, demyelination histology"] },
  { category: "Immune Cell Analysis", tests: ["Flow cytometry: Lymphocyte populations, activation markers, Tregs", "Tissue infiltration: Immunohistochemistry for immune cells", "Functional assays: Proliferation, cytokine production"] }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Tan L et al.",
    year: "2024",
    title: "FoxO1 Deficiency in Monocytic Myeloid Derived Suppressor Cells Exacerbates B Cell Dysfunction in Systemic Lupus Erythematosus.",
    journal: "Arthritis & Rheumatology",
    volume: "76(12): 1834-1846",
    link: "https://pubmed.ncbi.nlm.nih.gov/39492682/"
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
const relatedDiseaseModels = [
  { title: "Immunology Mouse Models", href: "/immunology-mouse-models" },
  { title: "Lupus Mouse Models", href: "/lupus-mouse-models" },
  { title: "IBD Mouse Models", href: "/ibd-mouse-models" }
];

const relatedModelTypes = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" }
];

// FAQ Data
const faqData = [
  {
    question: "What strain backgrounds are best for autoimmune disease models?",
    answer: "C57BL/6 is relatively resistant to many autoimmune conditions and is well characterized for immune studies. BALB/c has different immune response profiles (Th2 biased). Autoimmune prone backgrounds like MRL, NZB/W, and NOD carry multiple susceptibility alleles and may be appropriate for specific disease models."
  },
  {
    question: "Can conditional knockouts be used for autoimmune research?",
    answer: "Yes. Conditional knockouts are valuable for autoimmune research to achieve cell type specific deletion (e.g., T cell, B cell, or myeloid specific) and to avoid developmental effects. Tamoxifen inducible deletion in adults prevents developmental compensation and better models therapeutic intervention."
  },
  {
    question: "What are the key immune pathways targeted in autoimmune models?",
    answer: "Important pathways include interferon signaling (IFNAR, STING, IRF family), B cell tolerance (BCR signaling, BAFF/APRIL, TLR signaling), T cell tolerance (central and peripheral tolerance, regulatory T cells, Th17 cells), and myeloid cell contributions (neutrophils, macrophages, dendritic cells)."
  },
  {
    question: "What phenotyping assays are used for autoimmune models?",
    answer: "Standard assessments include autoantibody titers (ELISA, immunofluorescence), immune cell analysis (flow cytometry for T cells, B cells, myeloid cells), histopathology (organ specific inflammation and damage), cytokine profiling, and functional assays (T cell proliferation, B cell activation)."
  }
];

export default function AutoimmuneDiseaseMicePage() {
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

        {/* Disease Categories Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Categories of Autoimmune Disease
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Autoimmune diseases arise when the immune system fails to distinguish self from non self, leading to attack on the body&apos;s own tissues. Mouse models enable controlled study of specific genetic contributions to immune tolerance and autoreactivity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diseaseCategories.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{category.name}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{category.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spontaneous Models Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Spontaneous Autoimmune Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spontaneousModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{model.name}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Pathways Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Key Pathways in Autoimmunity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {keyPathways.map((item, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{item.pathway}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.genes.map((gene, idx) => (
                      <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        {gene}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditional Approaches Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Conditional Approaches
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Tissue or cell type specific gene deletion enables dissection of contributions from different immune cell populations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creDrivers.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <IconCheckCircle size={20} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>{item.name}</h4>
                    <p style={{ color: '#008080', fontSize: '.8rem', marginBottom: '5px' }}>{item.driver}</p>
                    <p style={{ color: '#555', fontSize: '.85rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-in mt-6">
              <Link href="/conditional-knockout-mouse-models" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                <span>Learn about Conditional Knockout Models</span>
                <IconChevronRight size={14} color="#2384da" />
              </Link>
            </div>
          </div>
        </section>

        {/* Phenotyping Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Phenotyping Autoimmune Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phenotypingMethods.map((method, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{method.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {method.tests.map((test, idx) => (
                      <li key={idx} style={{ color: '#555', fontSize: '.85rem', marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#008080' }}>•</span>
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
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in Autoimmune Research
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Recent publications demonstrate the utility of genetically engineered mouse models in autoimmune disease research:
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
              Start Your Autoimmune Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your autoimmune research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge.
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
            <LabSignalsSignup title="Autoimmune Disease Research Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            "name": "Autoimmune Disease Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom autoimmune disease mouse models for immune system research. Study lupus, rheumatoid arthritis, and other autoimmune conditions.",
            "serviceType": "Autoimmune Disease Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
