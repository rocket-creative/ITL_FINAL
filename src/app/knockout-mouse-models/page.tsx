'use client';

/**
 * Knockout Mouse Models Page - ingenious targeting laboratory
 * Built from MASTER TEXT: /page-text-md/knockout-mouse-models.md
 * All text displayed EXACTLY as written - DO NOT MODIFY TEXT
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCAnimatedFAQ,
  UXUIDCAnimatedCounter,
  UXUIDCStartProjectCTA,
  UXUIDCGlossarySection,
  knockoutTerms,
  LegacyInfoLink,
  UXUIDCResourceLinks,
  conditionalKnockoutResources,
  breedingResources,
  LabSignalsSignup,
  getRelatedLabSignalsArticles,
  GlossaryTermLink,
  BreedingSchemeArchitectCTA,
  IconDNA,
  IconTarget,
  IconMicroscope,
  IconSettings,
  IconClock,
  IconArrowRight,
} from '@/components/UXUIDC';
import TestimonialsSection from '@/app/components/TestimonialsSection';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// MASTER TEXT DATA - from knockout-mouse-models.md
// ============================================

const heroData = {
  badge: 'Custom Mouse Models Since 1998',
  title: 'Knockout Mouse Models',
  intro: 'Since 1998, ingenious targeting laboratory has completed over 2,500 custom gene targeting projects for researchers at universities, pharmaceutical companies, and research institutions worldwide. Our knockout mouse models have supported research published in more than 800 peer reviewed articles, including in Science, Nature, and Cell.',
  description: 'Knockout mouse models enable loss of function studies by inactivating specific genes. Whether you need complete gene deletion throughout the organism or controlled inactivation in specific tissues at defined times, ingenious targeting laboratory designs and delivers knockout mice tailored to your experimental requirements. From conventional knockouts for straightforward gene deletion to sophisticated conditional systems using Cre lox and other recombinase technologies, the right knockout strategy is critical for your research success.',
};

const stats = [
  { number: '2,500+', label: 'Projects Completed' },
  { number: '800+', label: 'Publications' },
  { number: '25+', label: 'Years of Excellence' },
  { number: '100%', label: 'Custom Solutions' },
];

const approachesData = [
  {
    title: 'Conventional Knockout',
    description: 'Conventional knockout models provide global gene inactivation from the earliest stages of development. The target gene is disrupted throughout all tissues for the lifetime of the animal. This approach is appropriate when studying genes that are not essential for embryonic development and when whole organism effects are the primary research interest.',
    benefit: 'Conventional knockouts offer a straightforward path to loss of function phenotypes with shorter project timelines and lower complexity than conditional approaches.',
    href: '/conventional-knockout-mouse-models',
    Icon: IconTarget,
  },
  {
    title: 'Conditional Knockout',
    description: 'Conditional knockout models use the Cre lox system to control where and when gene inactivation occurs. LoxP sites flanking critical exons remain silent until the allele is exposed to Cre recombinase, at which point the target sequence is excised and gene function is lost.',
    benefit: 'This approach is essential when global knockout causes embryonic lethality, when tissue specific gene function is the research focus, or when temporal control over gene deletion is required. Conditional knockouts provide maximum experimental flexibility from a single allele design.',
    href: '/conditional-knockout-mouse-models',
    Icon: IconSettings,
  },
  {
    title: 'Tissue Specific Knockout',
    description: 'Tissue specific knockouts combine conditional (floxed) alleles with Cre driver lines that express Cre recombinase in defined cell populations. Gene inactivation is restricted to tissues where Cre is active, while gene function is preserved in all other cells.',
    benefit: 'Common applications include studying gene function in specific organs, investigating cell autonomous versus non cell autonomous effects, and avoiding confounding systemic phenotypes that can mask the biology of interest.',
    href: '/tissue-specific-knockout',
    Icon: IconMicroscope,
  },
  {
    title: 'Inducible Knockout',
    description: 'Inducible knockout models add temporal control to conditional systems. Tamoxifen inducible CreERT2 or doxycycline regulated systems allow researchers to trigger gene deletion at specific developmental stages or in adult animals.',
    benefit: 'This approach enables studies of gene function after normal development, investigation of acute versus chronic loss of function phenotypes, and modeling of disease onset in mature animals.',
    href: '/inducible-conditional-knockout',
    Icon: IconClock,
  },
];

const technicalData = {
  title: 'Technical Approach',
  subtitle: 'Allele Design',
  content: 'ingenious targeting laboratory designs knockout alleles based on your specific experimental requirements. Critical exons are selected for loss of function after deletion. For conditional alleles, LoxP sites are positioned to preserve normal gene expression in the absence of Cre while supporting null phenotypes after excision.',
};

const publicationsData = {
  title: 'Selected Publications',
  intro: 'Knockout models generated by ingenious targeting laboratory:',
  publications: [
    {
      authors: 'Salzbank J, Lacaille H, Gaby J, O\'Reilly JJ, Kissner M, Vacher CM, Penn AA.',
      year: '2025',
      title: 'Microglia alter sex-specific cerebellar myelination following placental hormone loss.',
      journal: 'Nat Commun.',
      volume: '16(1): 9846',
      link: 'https://pubmed.ncbi.nlm.nih.gov/40038759/',
    },
    {
      authors: 'Reinartz DM, Escamilla-Rivera V, Shao M, Tribble SL, Caulin C, Wilson JE.',
      year: '2025',
      title: 'Impact of absent in melanoma 2 on head and neck squamous cell carcinoma development.',
      journal: 'J Immunol.',
      volume: 'vkaf224',
      link: 'https://pubmed.ncbi.nlm.nih.gov/39999169/',
    },
    {
      authors: 'MacDowell Kaswan ZA, Hurtado M, Chen EY, Steelman AJ, McCusker RH.',
      year: '2025',
      title: 'Ido1 or Ido2 deficiency in myeloid-derived cells attenuates TMEV-induced ictogenesis.',
      journal: 'J Neuroimmunol.',
      volume: '408: 578707',
      link: 'https://pubmed.ncbi.nlm.nih.gov/39542015/',
    },
  ],
};

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { KNOCKOUT_TESTIMONIALS, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonialsData = KNOCKOUT_TESTIMONIALS.map(t => ({
  quote: t.quote,
  name: formatAuthorWithCredentials(t),
  affiliation: t.affiliation,
}));

const strategyData = {
  conventional: {
    title: 'When to Choose Conventional Knockout',
    content: 'Conventional knockout models are optimal when complete gene deletion throughout the organism is desired and tissue specific or temporal control is not required. These models are faster to generate, typically more cost effective, and provide definitive loss of function phenotypes.',
    ideal: 'Conventional knockouts are ideal for studying genes with non essential functions, genes where global deletion does not cause embryonic lethality, and research applications where tissue specific effects are not a concern.',
  },
  conditional: {
    title: 'When to Choose Conditional Knockout',
    content: 'Conditional knockout models using the Cre lox system provide spatial and temporal control over gene deletion. These models are essential when global gene deletion causes embryonic lethality, when tissue specific gene function needs to be studied, or when temporal control of gene inactivation is required.',
    ideal: 'Conditional knockouts enable researchers to study gene function in specific tissues at defined developmental stages or in response to experimental treatments, providing flexibility that conventional knockouts cannot offer.',
  },
  planning: {
    title: 'Project Planning Considerations',
    content: 'When planning a knockout project, consider your long term research goals. If multiple research applications are anticipated, a conditional knockout provides maximum flexibility. If the research question is focused and well defined, a conventional knockout may be more efficient.',
    outro: 'ingenious targeting laboratory\'s scientific consultants work with researchers to select the optimal knockout strategy based on research goals, timeline, and budget considerations.',
  },
};

const advancedData = {
  knockoutFirst: {
    title: 'Knockout First Allele System',
    content: 'The knockout first allele system provides maximum flexibility by generating a single targeting event that can produce multiple derivative alleles. This approach is cost effective when multiple research applications are anticipated from a single model.',
    benefit: 'Knockout first alleles can be converted to conditional knockouts, reporter knockins, or other configurations through breeding with appropriate recombinase lines, providing researchers with multiple options from a single initial investment.',
  },
  tissueSpecific: {
    title: 'Tissue Specific Knockout Considerations',
    content: 'When planning tissue specific knockouts, careful selection of Cre driver lines is essential. The Cre line must express in your target tissue but not in tissues where gene deletion would cause confounding effects or embryonic lethality.',
  },
};

// FAQ Data with Glossary Links
const getFaqData = () => [
  {
    question: 'What is the difference between a conventional knockout and a conditional knockout?',
    answer: (
      <>
        A <GlossaryTermLink term="conventional-knockout-mouse-models">conventional knockout</GlossaryTermLink> permanently eliminates gene function in all tissues from the earliest stages of development. A <GlossaryTermLink term="conditional-knockout-mouse-models">conditional knockout</GlossaryTermLink> uses the <GlossaryTermLink term="cre-lox-system">Cre-lox system</GlossaryTermLink> to control where and when gene deletion occurs. Conditional knockouts preserve normal gene function until exposed to Cre recombinase, allowing tissue-specific or temporally controlled gene inactivation.
      </>
    ),
  },
  {
    question: 'How do I know if my gene is essential and requires a conditional knockout approach?',
    answer: (
      <>
        If <GlossaryTermLink term="zygosity">homozygous</GlossaryTermLink> <GlossaryTermLink term="hypomorphic-null-allele">null</GlossaryTermLink> mutations of your target gene result in embryonic lethality in published studies, a conditional approach is required. If no published data exists, we recommend starting with a conditional allele design, which can function as a conventional knockout when crossed to germline Cre, while preserving the option for tissue-specific studies.
      </>
    ),
  },
  {
    question: 'What is a floxed allele?',
    answer: (
      <>
        A <GlossaryTermLink term="floxed-gene-loxp-site">floxed allele</GlossaryTermLink> contains <GlossaryTermLink term="floxed-gene-loxp-site">LoxP sites</GlossaryTermLink> flanking a critical exon of your target gene. The gene functions normally until exposed to Cre recombinase, which excises the DNA between LoxP sites. This deletion removes a critical exon(s) and eliminates gene function. Floxed alleles are the foundation of <GlossaryTermLink term="conditional-knockout-mouse-models">conditional knockout</GlossaryTermLink> strategies.
      </>
    ),
  },
  {
    question: 'How long does it take to generate a knockout mouse model?',
    answer: (
      <>
        Project timelines vary based on model type and complexity. Conditional knockout projects require additional time due to complexity in allele design and verification. All projects include strategy design, materials generation and confirmation, injection, and breeding of F0s to obtain <GlossaryTermLink term="germline-transmission">germline transmission</GlossaryTermLink> mice. Contact us for a detailed timeline estimate for your specific project.
      </>
    ),
  },
  {
    question: 'What deliverables will I receive at the end of a knockout project?',
    answer: (
      <>
        You will receive a minimum of 2 <GlossaryTermLink term="germline-transmission">germline transmission</GlossaryTermLink> F1 <GlossaryTermLink term="zygosity">heterozygous</GlossaryTermLink> mice, comprehensive project verification documentation, and <GlossaryTermLink term="genotyping-pcr-qpcr">genotyping</GlossaryTermLink> protocols.
      </>
    ),
  },
];

const comparisonTable = [
  { factor: 'Gene essentiality', conventional: 'Non essential genes', conditional: 'Essential or pleiotropic genes' },
  { factor: 'Research focus', conventional: 'Whole organism', conditional: 'Tissue specific' },
  { factor: 'Temporal control', conventional: 'None (constitutive)', conditional: 'Available with inducible Cre' },
  { factor: 'Allele flexibility', conventional: 'Single configuration', conditional: 'Multiple derivative alleles' },
];

const relatedServices = [
  { label: 'Conventional Knockout Mouse Models', href: '/conventional-knockout-mouse-models' },
  { label: 'Conditional Knockout Mouse Models', href: '/conditional-knockout-mouse-models' },
  { label: 'Tissue Specific Knockout', href: '/tissue-specific-knockout' },
  { label: 'Inducible Conditional Knockout', href: '/inducible-conditional-knockout' },
];

const relatedTech = [
  { label: 'Cre Lox System', href: '/cre-lox-system' },
];

const relatedResources = [
  { label: 'Knockout Strategy Guide', href: '/knockout-strategy-guide' },
  { label: 'Conditional vs Conventional Guide', href: '/conditional-vs-conventional-guide' },
  { label: 'Request a Quote', href: '/request-quote' },
  { label: 'FAQs', href: '/faqs' },
];

// Legacy content link
const legacyContentUrl = '/legacy/knockout-mouse-models';

export default function KnockoutMouseModelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

    // Section animations
    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* ========== HERO SECTION ========== */}
        <section
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div
              className="hero-animate"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px',
              }}
            >
              <IconDNA size={16} color="white" />
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
                marginBottom: '20px',
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
                maxWidth: '800px',
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
                maxWidth: '800px',
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
                  fontWeight: 500,
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
                  fontWeight: 500,
                }}
              >
                <span>Talk to a Scientist</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========== STATS BAR ========== */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCAnimatedCounter stats={stats} />
          </div>
        </section>

        {/* ========== KNOCKOUT APPROACHES ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              Knockout Approaches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {approachesData.map((approach, i) => (
                <div
                  key={i}
                  className="animate-in flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
                  style={{
                    backgroundColor: '#f7f7f7',
                    padding: '30px',
                    border: '.5px solid #e0e0e0',
                    borderTop: `4px solid ${i % 2 === 0 ? '#008080' : '#134978'}`,
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#0a253c',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <approach.Icon size={28} color="white" />
                  </div>
                  <h3
                    style={{
                      color: '#333',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginBottom: '12px',
                    }}
                  >
                    {approach.title}
                  </h3>
                  <p
                    style={{
                      color: '#666',
                      fontSize: '.9rem',
                      fontWeight: 400,
                      lineHeight: '1.6rem',
                      marginBottom: '12px',
                    }}
                  >
                    {approach.description}
                  </p>
                  <p
                    style={{
                      color: '#666',
                      fontSize: '.85rem',
                      fontWeight: 400,
                      lineHeight: '1.5rem',
                      flex: 1,
                    }}
                  >
                    {approach.benefit}
                  </p>
                  <Link
                    href={approach.href}
                    className="inline-flex items-center gap-2 mt-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{
                      backgroundColor: '#008080',
                      color: 'white',
                      padding: '10px 20px',
                      fontSize: '.85rem',
                      fontWeight: 500,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <span>Learn more</span>
                    <span>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CHOOSING STRATEGY ========== */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}
            >
              Choosing Between Knockout Strategies
            </h2>
            <p
              className="animate-in text-center"
              style={{
                color: '#666',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.6rem',
                marginBottom: '30px',
                maxWidth: '700px',
                margin: '0 auto 30px',
              }}
            >
              Not sure which approach is right for your research? Our knockout strategy guide walks through the decision
              framework, or schedule a consultation with our scientific team.
            </p>
            <div className="animate-in text-center">
              <Link
                href="/knockout-strategy-guide"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: '#134978',
                  color: 'white',
                  padding: '10px 20px',
                  minWidth: '160px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>View Strategy Guide</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========== TECHNICAL APPROACH ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              {technicalData.title}
            </h2>
            <h3
              className="animate-in"
              style={{
                color: '#333',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              {technicalData.subtitle}
            </h3>
            <p
              className="animate-in"
              style={{
                color: '#666',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
                maxWidth: '800px',
              }}
            >
              {technicalData.content}
            </p>
          </div>
        </section>

        {/* ========== PUBLICATIONS ========== */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}
            >
              {publicationsData.title}
            </h2>
            <p
              className="animate-in text-center"
              style={{
                color: '#666',
                fontSize: '.9rem',
                fontWeight: 400,
                marginBottom: '30px',
              }}
            >
              {publicationsData.intro}
            </p>
            <div className="space-y-4">
              {publicationsData.publications.map((pub, i) => (
                <div
                  key={i}
                  className="animate-in group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2384da',
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
            <div className="animate-in text-center mt-6">
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: '#134978',
                  color: 'white',
                  padding: '10px 20px',
                  minWidth: '160px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>View All Publications</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS ========== */}
        <TestimonialsSection testimonials={testimonialsData} variant="dark" />

        {/* ========== KNOCKOUT MODEL SELECTION ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              Knockout Model Selection Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  {strategyData.conventional.title}
                </h3>
                <p style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem', marginBottom: '12px' }}>
                  {strategyData.conventional.content}
                </p>
                <p style={{ color: '#666', fontSize: '.85rem', fontWeight: 400, lineHeight: '1.5rem' }}>
                  {strategyData.conventional.ideal}
                </p>
              </div>
              <div className="animate-in">
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  {strategyData.conditional.title}
                </h3>
                <p style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem', marginBottom: '12px' }}>
                  {strategyData.conditional.content}
                </p>
                <p style={{ color: '#666', fontSize: '.85rem', fontWeight: 400, lineHeight: '1.5rem' }}>
                  {strategyData.conditional.ideal}
                </p>
              </div>
            </div>
            <div className="animate-in mt-8" style={{ backgroundColor: '#f7f7f7', padding: '25px', border: '.5px solid #e0e0e0' }}>
              <h3
                style={{
                  color: '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                {strategyData.planning.title}
              </h3>
              <p style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem', marginBottom: '10px' }}>
                {strategyData.planning.content}
              </p>
              <p style={{ color: '#666', fontSize: '.85rem', fontWeight: 400, lineHeight: '1.5rem', fontStyle: 'italic' }}>
                {strategyData.planning.outro}
              </p>
            </div>
          </div>
        </section>

        {/* ========== COMPARISON TABLE ========== */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '30px',
              }}
            >
              Knockout Comparison
            </h2>
            <div className="animate-in overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '14px', textAlign: 'left', color: 'white', fontWeight: 600, fontSize: '.9rem' }}>
                      Factor
                    </th>
                    <th style={{ padding: '14px', textAlign: 'left', color: 'white', fontWeight: 600, fontSize: '.9rem' }}>
                      Conventional
                    </th>
                    <th style={{ padding: '14px', textAlign: 'left', color: 'white', fontWeight: 600, fontSize: '.9rem' }}>
                      Conditional
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                      <td style={{ padding: '14px', border: '1px solid #e0e0e0', fontWeight: 500, fontSize: '.9rem', color: '#333' }}>
                        {row.factor}
                      </td>
                      <td style={{ padding: '14px', border: '1px solid #e0e0e0', fontSize: '.9rem', color: '#666' }}>
                        {row.conventional}
                      </td>
                      <td style={{ padding: '14px', border: '1px solid #e0e0e0', fontSize: '.9rem', color: '#666' }}>
                        {row.conditional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========== ADVANCED STRATEGIES ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              Advanced Knockout Strategies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: '#f7f7f7',
                  padding: '30px',
                  border: '.5px solid #e0e0e0',
                  borderTop: '4px solid #008080',
                }}
              >
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  {advancedData.knockoutFirst.title}
                </h3>
                <p style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem', marginBottom: '12px' }}>
                  {advancedData.knockoutFirst.content}
                </p>
                <p style={{ color: '#666', fontSize: '.85rem', fontWeight: 400, lineHeight: '1.5rem' }}>
                  {advancedData.knockoutFirst.benefit}
                </p>
              </div>
              <div
                className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: '#f7f7f7',
                  padding: '30px',
                  border: '.5px solid #e0e0e0',
                  borderTop: '4px solid #134978',
                }}
              >
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  {advancedData.tissueSpecific.title}
                </h3>
                <p style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem' }}>
                  {advancedData.tissueSpecific.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== START YOUR PROJECT CTA ========== */}
        <UXUIDCStartProjectCTA
          title="Start Your Knockout Project"
          content="Our scientific consultants are ready to discuss your research requirements and determine the optimal knockout strategy for your experimental goals. Initial consultation is provided at no charge."
          buttons={[
            { label: 'Request a Quote', href: '/request-quote' },
            { label: 'Contact Us', href: '/contact' },
          ]}
        />

        {/* ========== GLOSSARY ========== */}
        <UXUIDCGlossarySection
          title="Key Terms"
          description="Understanding the terminology used in knockout mouse model generation helps you communicate effectively with our scientific team and interpret project documentation."
          terms={knockoutTerms}
        />

        {/* ========== DOWNLOADABLE RESOURCES ========== */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Knockout Resources & Tools"
              description="Download our free guides and use our interactive tools to plan your knockout project."
              resources={[...conditionalKnockoutResources, ...breedingResources]}
              variant="card"
            />
          </div>
        </section>

        {/* ========== BREEDING SCHEME ARCHITECT CTA ========== */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* ========== LAB SIGNALS NEWSLETTER ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Learn How Knockout Mice Are Made"
              description="Subscribe to Lab Signals for step-by-step guides, CRISPR vs ES cell targeting comparisons, and expert insights on knockout mouse generation."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/knockout-mouse-models')}
            />
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <UXUIDCAnimatedFAQ title="Frequently Asked Questions" faqs={getFaqData()} backgroundColor="white" />

        {/* ========== LEGACY CONTENT LINK ========== */}
        <section style={{ backgroundColor: '#e8f5f5', padding: '30px 20px', borderTop: '3px solid #008080' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <p style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 500, marginBottom: '5px' }}>
                Looking for detailed technical information?
              </p>
              <p style={{ color: '#666', fontSize: '.85rem' }}>
                View our comprehensive legacy documentation with in-depth specifications.
              </p>
            </div>
            <LegacyInfoLink href={legacyContentUrl} />
          </div>
        </section>

        {/* ========== RELATED LINKS ========== */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '15px',
                  }}
                >
                  All Knockout Services
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm transition-colors hover:text-teal-600"
                        style={{ color: '#666' }}
                      >
                        <IconArrowRight size={14} color="#008080" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '15px',
                  }}
                >
                  Related Technologies
                </h3>
                <ul className="space-y-2">
                  {relatedTech.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm transition-colors hover:text-teal-600"
                        style={{ color: '#666' }}
                      >
                        <IconArrowRight size={14} color="#008080" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '15px',
                  }}
                >
                  Related Resources
                </h3>
                <ul className="space-y-2">
                  {relatedResources.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm transition-colors hover:text-teal-600"
                        style={{ color: '#666' }}
                      >
                        <IconArrowRight size={14} color="#008080" />
                        {item.label}
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
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Knockout Mouse Models',
            provider: {
              '@type': 'Organization',
              name: 'ingenious targeting laboratory',
            },
            description: 'Custom knockout mouse models for loss of function studies. Conventional and conditional knockouts with guaranteed transmission.',
            serviceType: 'Custom Mouse Model Generation',
          }),
        }}
      />
    </div>
  );
}
