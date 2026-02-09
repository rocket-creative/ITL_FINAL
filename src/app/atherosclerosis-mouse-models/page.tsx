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
  badge: "Cardiovascular Disease Models",
  title: "Atherosclerosis Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported cardiovascular research with custom atherosclerosis mouse models enabling mechanistic studies of plaque development, lipid metabolism, and therapeutic interventions targeting the leading cause of death worldwide.",
  description: "Atherosclerosis mouse models provide essential platforms for investigating the molecular pathways underlying plaque initiation and progression, testing hypotheses about inflammation and lipid handling, and developing therapies for coronary artery disease and stroke prevention."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Disease Progression Stages
const diseaseStages = [
  { stage: "Fatty Streak Formation", desc: "Early lesions with lipid laden macrophages (foam cells) in the intima." },
  { stage: "Plaque Development", desc: "Progressive accumulation of lipids, inflammatory cells, and smooth muscle cells. Formation of fibrous cap." },
  { stage: "Advanced Lesions", desc: "Necrotic core development, calcification, and potential for plaque rupture and thrombosis." }
];

// Key Pathogenic Mechanisms
const pathogenicMechanisms = [
  { name: "Lipid Accumulation", desc: "Elevated LDL cholesterol enters arterial wall and undergoes oxidation." },
  { name: "Inflammation", desc: "Monocyte recruitment, macrophage activation, and inflammatory cytokine production." },
  { name: "Foam Cell Formation", desc: "Macrophages take up modified lipids, becoming foam cells." },
  { name: "Smooth Muscle Proliferation", desc: "Vascular smooth muscle cells migrate and proliferate, forming fibrous cap." }
];

// ApoE Knockout Features
const apoEFeatures = [
  "Marked hypercholesterolemia (~400 mg/dL on chow, higher on Western diet)",
  "Elevated VLDL and IDL",
  "Fatty streaks visible by 10 weeks on chow",
  "Advanced plaques with Western diet"
];

// LDLR Knockout Features
const ldlrFeatures = [
  "Elevated LDL cholesterol on high fat/high cholesterol diet",
  "More similar to human lipid profile than ApoE knockout",
  "Minimal lesions on chow diet",
  "Robust atherosclerosis on Western diet"
];

// Cre Drivers for Atherosclerosis
const creDrivers = [
  { category: "Vascular Endothelium", drivers: ["Cdh5 Cre (VE Cadherin Cre): Endothelial cell specific deletion", "Tie2 Cre: Endothelial and hematopoietic lineages"] },
  { category: "Macrophages", drivers: ["LysM Cre: Myeloid cell targeting for foam cell studies", "CX3CR1 Cre: Monocyte/macrophage specific"] },
  { category: "Smooth Muscle", drivers: ["SM22 Cre (Tagln Cre): Smooth muscle cell specific deletion", "Myh11 Cre: Alternative smooth muscle driver"] },
  { category: "Hepatocytes", drivers: ["Albumin Cre: Liver specific for lipid metabolism genes"] }
];

// Phenotyping Methods
const phenotypingMethods = [
  { category: "Lipid Analysis", tests: ["Plasma lipids: Total cholesterol, triglycerides, HDL, LDL", "Lipoprotein fractionation: FPLC or ultracentrifugation", "Lipid staining: Oil Red O or Sudan IV"] },
  { category: "Lesion Quantification", tests: ["En face aorta: Sudan IV stained aorta for total lesion area", "Aortic root sections: Serial sections at aortic valve level", "Brachiocephalic artery: Cross sections for advanced lesions"] },
  { category: "Lesion Characterization", tests: ["Histology: H&E, trichrome for fibrosis, von Kossa for calcification", "Immunohistochemistry: Macrophage markers, smooth muscle actin", "Lesion composition: Necrotic core, fibrous cap thickness"] }
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Chen H et al.",
    year: "2025",
    title: "Novel Mouse Model of Coronary Atherosclerosis With Myocardial Infarction: Insights Into Human CAD.",
    journal: "Circulation Research",
    volume: "136(7): 679-692",
    link: "https://pubmed.ncbi.nlm.nih.gov/40485474/"
  },
  {
    authors: "Meng Z et al.",
    year: "2024",
    title: "Adipose transplantation improves metabolism and atherosclerosis but not perivascular adipose tissue abnormality or vascular dysfunction in lipodystrophic Seipin null mice.",
    journal: "American Journal of Physiology Cell Physiology",
    volume: "326(5): C1356-C1368",
    link: "https://pubmed.ncbi.nlm.nih.gov/38525541/"
  }
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
  { title: "Heart Failure Mouse Models", href: "/heart-failure-mouse-models" },
  { title: "Metabolic Disease Mouse Models", href: "/metabolic-disease-mouse-models" }
];

const relatedModelTypes = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
];

const relatedTechnologies = [
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "C57BL/6 Mouse Background", href: "/c57bl6-mouse-background" }
];

// FAQ Data
const faqData = [
  {
    question: "What genetic backgrounds are used for atherosclerosis models?",
    answer: "Atherosclerosis models typically combine conditional gene modifications with hyperlipidemic backgrounds. ApoE knockout develops lesions on normal diet. LDLR knockout requires high fat diet. Both are commonly used on C57BL/6 background, which is highly susceptible to diet induced atherosclerosis."
  },
  {
    question: "What Cre drivers are used for cell type specific atherosclerosis studies?",
    answer: "Common Cre drivers include LysM Cre (macrophages/foam cells), Tie2 Cre or Cdh5 Cre (endothelial cells), SM22 Cre (smooth muscle cells), and Albumin Cre (hepatocytes for lipid metabolism). Selection depends on whether you're studying plaque formation, inflammation, vascular remodeling, or lipid metabolism."
  },
  {
    question: "How long do atherosclerosis studies take?",
    answer: "Lesion development depends on genetic background and diet. ApoE knockout on normal diet shows lesions in 12 to 16 weeks. LDLR knockout on high fat diet requires 12 to 16 weeks. Western diet accelerates disease. More advanced lesions and plaque instability studies require longer timelines (20 to 30 weeks)."
  },
  {
    question: "Can you combine multiple gene modifications for atherosclerosis research?",
    answer: "Yes. ingenious targeting laboratory can combine conditional gene modifications with hyperlipidemic backgrounds and additional genetic modifications. For example, macrophage specific knockout on ApoE null background enables study of how specific genes affect plaque formation and inflammation in atherogenic context."
  }
];

export default function AtherosclerosisMouseModelsPage() {
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

        {/* Understanding Atherosclerosis */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Understanding Atherosclerosis
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Atherosclerosis is a chronic inflammatory disease of the arterial wall characterized by lipid accumulation, immune cell infiltration, and plaque formation. Mouse models enable controlled study of disease mechanisms.
            </p>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Disease Progression
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {diseaseStages.map((stage, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h4 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{stage.stage}</h4>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{stage.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Key Pathogenic Mechanisms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pathogenicMechanisms.map((mechanism, index) => (
                <div key={index} className="animate-in" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <IconCheckCircle size={20} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{mechanism.name}:</span>
                    <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{mechanism.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Model Types */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Atherosclerosis Model Types
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ApoE Knockout */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  ApoE Knockout Model
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                  The most widely used atherosclerosis model. Apolipoprotein E mediates hepatic clearance of lipoprotein remnants. Loss causes accumulation of atherogenic lipoproteins.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {apoEFeatures.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* LDLR Knockout */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  LDLR Knockout Model
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                  Alternative lipoprotein metabolism model. LDL receptor clears LDL cholesterol from circulation. Loss causes LDL accumulation similar to human familial hypercholesterolemia.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {ldlrFeatures.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <IconCheckCircle size={14} color="#2384da" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#555', fontSize: '.85rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Conditional Approaches */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Conditional Approaches
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Cell type specific gene manipulation enables dissection of contributions from different vascular and immune cell populations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creDrivers.map((group, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>{group.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {group.drivers.map((driver, idx) => (
                      <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>
                        {driver}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="animate-in mt-6">
              <Link href="/conditional-knockout-mouse-models" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: 'white', fontSize: '.85rem', fontWeight: 500, textDecoration: 'underline' }}>
                <span>Learn about Conditional Knockout Models</span>
                <IconChevronRight size={14} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Phenotyping */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Phenotyping Atherosclerosis Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phenotypingMethods.map((method, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
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
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in Atherosclerosis Research
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Recent publications demonstrate the utility of genetically engineered mouse models in cardiovascular research:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {publicationsData.map((pub, index) => (
                <div
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
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
              Start Your Atherosclerosis Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your cardiovascular research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge.
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
              title="Stay Current on Atherosclerosis Research"
              description="Subscribe to Lab Signals for the latest cardiovascular disease model updates and research insights."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
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
            "name": "Atherosclerosis Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom atherosclerosis mouse models for cardiovascular research. Study plaque formation, lipid metabolism, and vascular disease mechanisms.",
            "serviceType": "Atherosclerosis Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
