'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconShield, IconLayers } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Cell Type Specific",
  title: "Tissue Specific Knockout",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 mouse models, including conditional knockouts that enable tissue specific gene deletion. Our tissue specific knockout models have supported research published in over 800 peer reviewed publications, including articles in Science, Nature, and Cell.",
  description: "Tissue specific knockout restricts gene deletion to defined cell types or organs while preserving gene function elsewhere in the organism. By crossing a floxed (conditional) allele to a tissue specific Cre driver line, gene deletion occurs only in cells where Cre recombinase is expressed."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Two Component System
const twoComponentSystem = [
  {
    name: "Floxed (Conditional) Allele",
    description: "The target gene contains LoxP sites flanking critical exons. The floxed allele functions normally in the absence of Cre recombinase."
  },
  {
    name: "Cre Driver Line",
    description: "A transgenic or knockin line expressing Cre recombinase under a tissue specific promoter. Cre is expressed only in defined cell types."
  }
];

// Deletion Pattern Determination
const deletionPatterns = [
  { factor: "Promoter activity", description: "Which cells express the Cre transgene" },
  { factor: "Developmental timing", description: "When Cre expression begins" },
  { factor: "Expression level", description: "Efficiency of recombination" },
  { factor: "Mosaicism", description: "Whether all target cells undergo deletion" }
];

// Nervous System Cre Drivers
const nervousSystemCre = [
  { driver: "Nestin Cre", target: "Neural progenitors", timing: "E10.5", applications: "Pan neural deletion" },
  { driver: "Synapsin Cre", target: "Neurons", timing: "Postnatal", applications: "Mature neuron function" },
  { driver: "CamKII Cre", target: "Forebrain excitatory neurons", timing: "Postnatal", applications: "Learning, memory, behavior" },
  { driver: "DAT Cre", target: "Dopaminergic neurons", timing: "E15", applications: "Parkinson models" },
  { driver: "GFAP Cre", target: "Astrocytes", timing: "E14.5", applications: "Glial function" }
];

// Immune System Cre Drivers
const immuneSystemCre = [
  { driver: "CD4 Cre", target: "T cells (CD4+ and CD8+)", timing: "DP thymocyte", applications: "T cell development, function" },
  { driver: "LysM Cre", target: "Macrophages, granulocytes", timing: "Myeloid progenitor", applications: "Innate immunity" },
  { driver: "CD19 Cre", target: "B cells", timing: "Pro B cell", applications: "B cell development, function" },
  { driver: "CD11c Cre", target: "Dendritic cells", timing: "DC progenitor", applications: "Antigen presentation" },
  { driver: "Foxp3 Cre", target: "Regulatory T cells", timing: "Treg commitment", applications: "Immune tolerance" }
];

// Metabolic Cre Drivers
const metabolicCre = [
  { driver: "Albumin Cre", target: "Hepatocytes", timing: "E14.5", applications: "Liver metabolism" },
  { driver: "Adiponectin Cre", target: "Adipocytes", timing: "Adipogenesis", applications: "Adipose biology" },
  { driver: "Insulin Cre", target: "Beta cells", timing: "E11.5", applications: "Insulin secretion" },
  { driver: "MCK Cre", target: "Skeletal muscle", timing: "Postnatal", applications: "Muscle metabolism" },
  { driver: "Villin Cre", target: "Intestinal epithelium", timing: "E12.5", applications: "Gut function" }
];

// Cardiovascular Cre Drivers
const cardiovascularCre = [
  { driver: "Myh6 (αMHC) Cre", target: "Cardiomyocytes", timing: "E9", applications: "Cardiac function" },
  { driver: "Tie2 Cre", target: "Endothelial cells", timing: "E7.5", applications: "Vascular biology" },
  { driver: "SM22α Cre", target: "Smooth muscle", timing: "E9.5", applications: "Vascular smooth muscle" }
];

// Selection Criteria
const selectionCriteria = [
  { criteria: "Specificity", description: "Does Cre expression match your target population?" },
  { criteria: "Efficiency", description: "What percentage of target cells undergo recombination?" },
  { criteria: "Timing", description: "When does deletion occur relative to your experimental question?" },
  { criteria: "Ectopic expression", description: "Does the Cre driver have off-target expression?" },
  { criteria: "Cre toxicity", description: "High Cre levels can cause cellular effects independent of target gene deletion" }
];

// Common Pitfalls
const commonPitfalls = [
  { pitfall: "Germline recombination", description: "Some Cre drivers cause deletion in germline, converting conditional to global knockout" },
  { pitfall: "Leaky expression", description: "Low level Cre in non-target tissues" },
  { pitfall: "Mosaic deletion", description: "Incomplete recombination in target population" },
  { pitfall: "Developmental vs adult expression", description: "Embryonic Cre deletes during development; may not reflect adult gene function" }
];

// Applications
const applications = [
  {
    name: "Essential Genes",
    description: "Tissue specific knockout enables study of genes that cause embryonic lethality when deleted globally. By restricting deletion to non-essential tissues or adult stages, researchers can study gene function without developmental lethality."
  },
  {
    name: "Cell Autonomous Function",
    description: "Tissue specific deletion distinguishes cell autonomous from non cell autonomous gene function. Does the phenotype arise from gene loss in the target tissue, or from secondary effects elsewhere?"
  },
  {
    name: "Target Validation",
    description: "Tissue specific knockout reveals where target inhibition would have therapeutic effects and where it might cause toxicity, supporting drug development decisions."
  }
];

// Publications
const publications = [
  {
    authors: "Salzbank J, Lacaille H, Gaby J, O'Reilly JJ, Kissner M, Vacher CM, Penn AA",
    year: "2025",
    title: "Microglia alter sex-specific cerebellar myelination following placental hormone loss.",
    journal: "Nat Commun. 16(1): 9846"
  },
  {
    authors: "Wang L, Noyer L, Jishage M, Wang YH, Tao AY, McDermott M, Gando I, Sidhu I, Hu K, Zhong L, Sun K, Drmic D, Kaufmann U, Feske S",
    year: "2025",
    title: "CLNS1A regulates genome stability and cell cycle progression to control CD4 T cell function and autoimmunity.",
    journal: "Sci Immunol 108(10): eadq8860"
  },
  {
    authors: "Milanick W, Li J, Thomas CI, Al-Yaari M, Guerrero-Given D, Kamasawa N, Young SM Jr",
    year: "2025",
    title: "Presynaptic α2δs specify synaptic gain, not synaptogenesis, in the mammalian brain.",
    journal: "Neuron 12(113): p1886-1897.E9"
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const plumleyTestimonial = getTestimonialById('plumley-warren')!;

const testimonials = [
  { quote: plumleyTestimonial.quote, name: formatAuthorWithCredentials(plumleyTestimonial), affiliation: plumleyTestimonial.affiliation },
];

// Related Links
const relatedModelTypes = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" },
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" }
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Cre Line Selection Guide", href: "/cre-line-selection-guide" }
];

// FAQ Data
const faqData = [
  {
    question: "How do tissue-specific knockouts work?",
    answer: "Tissue-specific knockouts combine floxed alleles (LoxP sites flanking critical exons) with Cre driver lines that express Cre recombinase in specific cell types or tissues. When the floxed mouse is crossed to a tissue-specific Cre driver, gene deletion occurs only in Cre-expressing tissues while gene function is preserved elsewhere. This enables study of tissue-autonomous gene function."
  },
  {
    question: "What Cre drivers are commonly used for tissue-specific knockouts?",
    answer: "Common Cre drivers include Albumin-Cre (hepatocytes), Nestin-Cre (neural progenitors), LysM-Cre (myeloid cells), CD4-Cre (T cells), Adiponectin-Cre (adipocytes), Myh6-Cre (cardiomyocytes), and many others. Selection depends on your target tissue and research question. Reporter crosses verify expected tissue distribution before experimental use."
  },
  {
    question: "Can I use the same floxed mouse with different Cre drivers?",
    answer: "Yes. This is a major advantage of conditional knockout systems. A single floxed allele can be crossed to any Cre driver line to achieve tissue-specific knockout in different organs. One floxed mouse project can support studies across multiple tissues (liver, brain, immune cells, etc) simply by crossing to different Cre drivers."
  },
  {
    question: "What controls are needed for tissue-specific knockout experiments?",
    answer: "Required controls include: floxed mice without Cre (flox/flox; +/+) as baseline controls, Cre-only controls (+/+; Cre/+) to assess Cre effects, and tissue-specific knockout experimental animals (flox/flox; Cre/+). Comparing these groups ensures that phenotypes result from gene deletion in the target tissue rather than Cre expression or background effects."
  },
  {
    question: "How do I verify tissue-specific deletion has occurred?",
    answer: "Genomic PCR using primers flanking the LoxP sites reveals deletion: wildtype and floxed alleles produce larger bands; recombined (deleted) allele produces a smaller band. Reporter crosses (Rosa26-tdTomato) visualize recombination pattern and confirm deletion in expected tissues. Functional assays (Western blot, immunohistochemistry) confirm loss of protein in target tissue."
  }
];

export default function TissueSpecificKnockoutPage() {
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
                  <IconLayers size={16} color="white" />
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

        {/* How It Works */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              How Tissue Specific Knockout Works
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              This approach enables study of genes that cause embryonic lethality when deleted globally, isolation of cell autonomous gene functions, and dissection of tissue specific phenotypes without confounding systemic effects. A single floxed allele can be crossed to dozens of different Cre driver lines, enabling tissue specific deletion across virtually every organ system from one initial mouse line.
            </p>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              The Two Component System
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {twoComponentSystem.map((component, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {component.name}
                  </h4>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {component.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px' }}>
              <h4 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                Deletion Pattern Determination
              </h4>
              <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                The tissue specificity of gene deletion is determined entirely by the Cre driver:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deletionPatterns.map((pattern, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <IconCheckCircle size={18} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.9rem' }}>{pattern.factor}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{pattern.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cre Driver Lines by Organ System */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Cre Driver Lines by Organ System
            </h2>

            {/* Nervous System */}
            <div className="animate-in" style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Nervous System
              </h3>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Population</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Timing</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nervousSystemCre.map((cre, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 600 }}>{cre.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.target}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.timing}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/neuroscience-mouse-models" className="inline-flex items-center gap-2 mt-3" style={{ color: '#2384da', fontSize: '.85rem' }}>
                <span>Neuroscience Mouse Models</span>
                <IconChevronRight size={14} color="#2384da" />
              </Link>
            </div>

            {/* Immune System */}
            <div className="animate-in" style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Immune System
              </h3>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Population</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Timing</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {immuneSystemCre.map((cre, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 600 }}>{cre.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.target}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.timing}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/immunology-mouse-models" className="inline-flex items-center gap-2 mt-3" style={{ color: '#2384da', fontSize: '.85rem' }}>
                <span>Immunology Mouse Models</span>
                <IconChevronRight size={14} color="#2384da" />
              </Link>
            </div>

            {/* Metabolic Tissues */}
            <div className="animate-in" style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Metabolic Tissues
              </h3>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Population</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Timing</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metabolicCre.map((cre, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 600 }}>{cre.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.target}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.timing}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cardiovascular */}
            <div className="animate-in">
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Cardiovascular System
              </h3>
              <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Population</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Timing</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardiovascularCre.map((cre, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 600 }}>{cre.driver}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.target}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.timing}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{cre.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/cardiovascular-mouse-models" className="inline-flex items-center gap-2 mt-3" style={{ color: '#2384da', fontSize: '.85rem' }}>
                <span>Cardiovascular Mouse Models</span>
                <IconChevronRight size={14} color="#2384da" />
              </Link>
            </div>
          </div>
        </section>

        {/* Choosing the Right Cre Driver */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Choosing the Right Cre Driver
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Selection Criteria */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Key Selection Criteria
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectionCriteria.map((item, index) => (
                    <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <IconCheckCircle size={18} color="white" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <span style={{ color: 'white', fontWeight: 600, fontSize: '.9rem' }}>{item.criteria}:</span>
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Pitfalls */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Common Pitfalls to Avoid
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {commonPitfalls.map((item, index) => (
                    <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <IconShield size={18} color="white" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <span style={{ color: 'white', fontWeight: 600, fontSize: '.9rem' }}>{item.pitfall}:</span>
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="animate-in text-center mt-6">
              <Link
                href="/cre-line-selection-guide"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '10px 25px',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>View Cre Line Selection Guide</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {applications.map((app, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
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
                    <IconTarget size={24} color="white" />
                  </div>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {app.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Publications */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Selected Publications
            </h2>

            <div className="space-y-4">
              {publications.map((pub, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '5px' }}>
                    {pub.authors} {pub.year}. {pub.title}
                  </p>
                  <p style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>
                    {pub.journal}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/publications" className="inline-flex items-center gap-2 mt-6" style={{ color: 'white', fontSize: '.85rem' }}>
              <span>View All Publications</span>
              <IconChevronRight size={14} color="white" />
            </Link>
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
              Start Your Tissue Specific Knockout Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your research requirements and the optimal floxed allele design for your experimental goals. Initial consultation is provided at no charge.
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
        <BreedingSchemeArchitectCTA variant="gradient" />

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
            <LabSignalsSignup 
              variant="banner"
              title="Tissue Specific Knockout Insights"
              description="Explore Cre driver selection strategies, tissue-specific targeting approaches, and conditional knockout best practices. Expert analysis delivered biweekly."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            "name": "Tissue Specific Knockout Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom tissue specific knockout mouse models. Cell type specific gene deletion using Cre lox technology. Comprehensive Cre driver guidance since 1998.",
            "serviceType": "Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
