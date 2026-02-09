'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Eye Disease Research",
  title: "Ophthalmology Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported ophthalmology research with custom mouse models enabling mechanistic studies of retinal degeneration, glaucoma, macular degeneration, and other blinding conditions affecting millions worldwide.",
  description: "Ophthalmology mouse models provide essential platforms for investigating the molecular pathways underlying vision loss, testing gene therapy approaches for inherited retinal diseases, and developing neuroprotective strategies for glaucoma and other optic neuropathies."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Value of Ocular Disease Models
const ocularAdvantages = [
  { title: "Accessibility", description: "Direct visualization of disease progression through fundoscopy and OCT. Non invasive monitoring of structural and functional changes." },
  { title: "Compartmentalization", description: "Immune privilege and blood retinal barrier create defined microenvironment. Local delivery enables high drug concentrations with minimal systemic exposure." },
  { title: "Gene Therapy Success", description: "The eye has been a pioneering tissue for gene therapy, with approved treatments for inherited retinal diseases. Mouse models support preclinical development." },
  { title: "Translational Relevance", description: "Despite anatomical differences, mouse models have successfully predicted human responses to multiple therapeutic approaches." }
];

// Retinitis Pigmentosa Models
const retinitisModels = [
  { name: "Rhodopsin Mutations", description: "RHO is the most commonly mutated gene in autosomal dominant RP. Point mutation knockins model specific patient variants." },
  { name: "PDE6 Mutations", description: "rd1 and rd10 mice carry mutations in Pde6b and develop rapid photoreceptor degeneration. Widely used for therapy development." },
  { name: "RPGR and RP2", description: "X linked RP models for ciliopathy associated retinal degeneration." },
  { name: "Gene Therapy Models", description: "Humanized models enable testing of human specific gene therapy vectors." }
];

// LCA and Cone Dystrophy Models
const lcaModels = [
  { name: "RPE65 Models", description: "RPE65 knockout and knockin mice model LCA2, the first genetic eye disease treated with gene therapy." },
  { name: "CEP290, GUCY2D, CRB1", description: "Additional LCA genes with available mouse models." },
  { name: "Achromatopsia Models", description: "CNGA3 and CNGB3 mutations cause complete color blindness. Knockout and knockin models available." },
  { name: "Cone Rod Dystrophies", description: "Models for conditions where cones degenerate before or alongside rods." }
];

// Glaucoma IOP Models
const glaucomaIOPModels = [
  { name: "Microbead Occlusion", description: "Magnetic or polystyrene microbeads injected into anterior chamber obstruct aqueous outflow, elevating IOP." },
  { name: "Laser Photocoagulation", description: "Laser treatment of trabecular meshwork induces scarring and elevated IOP." },
  { name: "Genetic IOP Elevation", description: "Mutations affecting outflow pathways (myocilin, CYP1B1) can elevate IOP." }
];

// Normal Tension Glaucoma Models
const normalTensionModels = [
  { name: "GLAST Knockout", description: "Glutamate transporter deficiency causes RGC loss without elevated IOP." },
  { name: "DBA/2J", description: "Develops pigmentary glaucoma with RGC loss and optic nerve degeneration." },
  { name: "Optic Nerve Crush", description: "Mechanical injury induces RGC death and axon degeneration." },
  { name: "Ischemia Reperfusion", description: "Models acute ischemic injury to the optic nerve." }
];

// AMD Models
const dryAMDModels = [
  { name: "ABCA4 Knockout", description: "Accumulation of lipofuscin and A2E in RPE." },
  { name: "CFH Variants", description: "Complement factor H variants increase AMD risk. Knockin models enable pathway analysis." },
  { name: "Oxidative Stress Models", description: "Light damage, sodium iodate, and other oxidative insults model geographic atrophy." }
];

const wetAMDModels = [
  { name: "Laser Induced CNV", description: "Choroidal neovascularization induced by laser photocoagulation of Bruch membrane." },
  { name: "VEGF Overexpression", description: "Transgenic or viral VEGF expression drives neovascularization." },
  { name: "Genetic Predisposition", description: "Complement, lipid metabolism, and other pathway modifications affect CNV susceptibility." }
];

// Diabetic Retinopathy Models
const diabeticModels = [
  { name: "db/db Mice", description: "Leptin receptor deficient mice develop diabetes and retinal vascular changes." },
  { name: "Akita Mice", description: "Ins2 mutation causes insulin deficient diabetes with retinal pathology." },
  { name: "STZ Induced Diabetes", description: "Streptozotocin treatment destroys beta cells. Combined with genetic modifications for mechanistic studies." }
];

// Retina Specific Targeting
const retinaTargeting = [
  { cellType: "Photoreceptor Specific", cre: "Rhodopsin Cre (Rho Cre)", application: "Targets rods. Cone opsin Cre (Opn1mw Cre) targets cones." },
  { cellType: "RPE Specific", cre: "VMD2 Cre (Best1 Cre)", application: "Targets retinal pigment epithelium." },
  { cellType: "RGC Specific", cre: "Thy1 Cre", application: "Ganglion cell drivers for glaucoma studies." },
  { cellType: "Muller Glia", cre: "GFAP Cre or Rlbp1 Cre", application: "For Muller cell targeting." }
];

// Phenotyping Endpoints
const structuralAssessment = [
  { name: "Optical Coherence Tomography (OCT)", description: "In vivo imaging of retinal layers. Quantify photoreceptor, RGC, and other layer thickness." },
  { name: "Fundus Photography", description: "Document fundus appearance, vascular changes, and pathology." },
  { name: "Histology", description: "Detailed layer by layer analysis. Immunohistochemistry for cell type markers." }
];

const functionalAssessment = [
  { name: "Electroretinography (ERG)", description: "Electrical response to light stimulation. a wave (photoreceptors), b wave (bipolar cells), photopic negative response (RGCs)." },
  { name: "Visual Acuity", description: "Optokinetic tracking for behavioral measure of vision." },
  { name: "Pupillary Light Reflex", description: "Assess melanopsin positive RGC function." }
];

// Therapeutic Applications
const therapeuticApplications = [
  "AAV vector delivery for gene replacement or silencing",
  "Humanized models for testing human specific vectors",
  "Dose response studies for preclinical development",
  "RGC protection for glaucoma and optic neuropathies",
  "Photoreceptor survival for inherited retinal degenerations",
  "Anti-VEGF testing for wet AMD"
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Xia F et al.",
    year: "2025",
    title: "CXCR3 Deficiency Alleviates Retinal Ganglion Cell Loss by Regulating Neuron Astrocyte Communication in a Mouse Model of Glaucoma.",
    journal: "Investigative Ophthalmology & Visual Science",
    volume: "66(3): 27",
    link: "https://pubmed.ncbi.nlm.nih.gov/41247127/"
  },
  {
    authors: "Hoppe C et al.",
    year: "2025",
    title: "The alternative complement pathway drives neuroinflammation and neurodegeneration in mouse models of glaucoma and optic nerve injury.",
    journal: "Neurobiology of Disease",
    volume: "210: 106927",
    link: "https://pubmed.ncbi.nlm.nih.gov/41005572/"
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;

const testimonials = [
  { quote: dunaiefTestimonial.quote, name: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation },
];

// Related Links
const relatedDiseaseModels = [
  { title: "Retinal Disease Mice", href: "/retinal-disease-mice" },
  { title: "Glaucoma Mouse Models", href: "/glaucoma-mouse-models" },
  { title: "Macular Degeneration Mice", href: "/macular-degeneration-mice" }
];

const relatedModelTypes = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
];

const relatedApplications = [
  { title: "Gene Therapy Mouse Models", href: "/gene-therapy-mouse-models" },
  { title: "Rare Disease Mouse Models", href: "/rare-disease-mouse-models" }
];

// FAQ Data
const faqData = [
  {
    question: "What Cre drivers are used for retina-specific studies?",
    answer: "Common retina Cre drivers include Rhodopsin-Cre (Rho-Cre) for rod photoreceptors, Cone opsin-Cre (Opn1mw-Cre) for cones, VMD2-Cre (Best1-Cre) for retinal pigment epithelium, Thy1-Cre for retinal ganglion cells, and GFAP-Cre or Rlbp1-Cre for Muller glia. Selection depends on the cell type of interest."
  },
  {
    question: "How do you phenotype ocular mouse models?",
    answer: "Ocular phenotyping includes structural assessment (optical coherence tomography for in vivo retinal imaging, fundus photography, histology with layer-by-layer analysis), functional assessment (electroretinography for electrical responses, visual acuity testing, pupillary light reflex), and intraocular pressure measurement (tonometry for glaucoma studies)."
  },
  {
    question: "What background strain considerations are important for ophthalmology models?",
    answer: "C57BL/6 is standard but some substrains carry the rd8 mutation (Crb1rd8) causing mild retinal degeneration that must be excluded. Albino strains lack melanin, affecting light sensitivity. Background choice significantly affects retinal phenotype and must be carefully considered for ophthalmology research."
  },
  {
    question: "Can ophthalmology models be used for gene therapy testing?",
    answer: "Yes. Ophthalmology models are extensively used for testing AAV-mediated gene therapy approaches for inherited retinal diseases. Models enable evaluation of therapeutic transgene expression, rescue of visual function, safety assessment, and long-term persistence. Retina-specific targeting enables local delivery with systemic safety."
  },
  {
    question: "What is involved in generating an ophthalmology mouse model?",
    answer: "Custom model generation includes targeting construct design, ES cell targeting, chimera generation, and germline transmission. Conditional approaches for cell-type-specific studies follow similar workflows. Pre-germline characterization provides early validation of targeting before mouse generation. Contact us for current timeline estimates."
  }
];

export default function OphthalmologyMouseModelsPage() {
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

        {/* Value of Ocular Disease Models */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              The Value of Ocular Disease Models
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              The eye offers unique advantages for disease modeling and therapeutic development:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ocularAdvantages.map((item, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Retinal Degenerative Diseases */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Retinal Degenerative Diseases
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Retinitis Pigmentosa */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Retinitis Pigmentosa
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Inherited rod cone dystrophies affecting 1 in 4000 individuals:
                </p>
                <div className="space-y-3">
                  {retinitisModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* LCA and Cone Dystrophies */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Leber Congenital Amaurosis & Cone Dystrophies
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Severe early onset retinal dystrophies:
                </p>
                <div className="space-y-3">
                  {lcaModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Glaucoma */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Glaucoma
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', marginBottom: '30px' }}>
              Progressive optic neuropathy and leading cause of irreversible blindness:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* IOP Models */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Intraocular Pressure Models
                </h3>
                <div className="space-y-3">
                  {glaucomaIOPModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: 'white', fontSize: '.85rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.8rem', lineHeight: '1.4rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Normal Tension Models */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Normal Tension Glaucoma & Optic Nerve Injury
                </h3>
                <div className="space-y-3">
                  {normalTensionModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: 'white', fontSize: '.85rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.8rem', lineHeight: '1.4rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Age Related Macular Degeneration */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Age Related Macular Degeneration
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Leading cause of vision loss in elderly populations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dry AMD */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Dry AMD Models
                </h3>
                <div className="space-y-3">
                  {dryAMDModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wet AMD */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Wet AMD Models
                </h3>
                <div className="space-y-3">
                  {wetAMDModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diabetic Retinopathy */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Diabetic Retinopathy
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Microvascular complications of diabetes affecting the retina:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diabeticModels.map((model, index) => (
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
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {model.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                    {model.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Retina Specific Targeting */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Retina Specific Targeting
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '25px' }}>
              Cell type-specific Cre drivers for targeted gene manipulation:
            </p>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cell Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Application</th>
                  </tr>
                </thead>
                <tbody>
                  {retinaTargeting.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.cellType}</td>
                      <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 500 }}>{row.cre}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="animate-in" style={{ marginTop: '20px' }}>
              <Link
                href="/c57bl6-mouse-background"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
              >
                <span>Learn about C57BL/6 Background Considerations</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Phenotyping Ocular Models */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Phenotyping Ocular Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Structural Assessment */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Structural Assessment
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {structuralAssessment.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <IconCheckCircle size={16} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ color: 'white', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Functional Assessment */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Functional Assessment
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {functionalAssessment.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <IconCheckCircle size={16} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ color: 'white', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Therapeutic Applications */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              Therapeutic Applications
            </h2>

            <div className="animate-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {therapeuticApplications.map((app, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px 20px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <IconCheckCircle size={16} color="#008080" style={{ flexShrink: 0 }} />
                  <span style={{ color: '#333', fontSize: '.85rem' }}>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in Ophthalmology Research
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              According to PubMed, recent publications demonstrate the utility of genetically engineered mouse models in ophthalmology research:
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
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
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
              Start Your Ophthalmology Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss custom mouse models for your eye disease research? Our scientific team provides complimentary consultation to help you design the optimal model for your ophthalmology research goals.
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
                  Related Applications
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedApplications.map((link, index) => (
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
            "name": "Ophthalmology Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom ophthalmology mouse models for eye disease research. Study retinal degeneration, glaucoma, and vision disorders.",
            "serviceType": "Ophthalmology Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
