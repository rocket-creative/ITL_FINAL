'use client';

/**
 * Knockin Mouse Models Page - ingenious targeting laboratory
 * Built from MASTER TEXT: /page-text-md/knockin-mouse-models.md
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
  knockinTerms,
  LabSignalsSignup,
  getRelatedLabSignalsArticles,
  GlossaryTermLink,
  BreedingSchemeArchitectCTA,
  IconDNA,
  IconTarget,
  IconSettings,
  IconEye,
  IconZap,
  IconQuote,
  IconArrowRight,
} from '@/components/UXUIDC';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// MASTER TEXT DATA - from knockin-mouse-models.md
// ============================================

const heroData = {
  badge: 'Precision Gene Modification Since 1998',
  title: 'Knockin Mouse Models',
  intro: 'Since 1998, ingenious targeting laboratory has completed over 2,500 custom gene targeting projects for researchers at universities, pharmaceutical companies, and research institutions worldwide. Our mouse models have supported research published in more than 800 peer reviewed articles, including in Science, Nature, and Cell.',
  description: 'Knockin mouse models enable precise genetic modifications at endogenous loci. Unlike knockout models that eliminate gene function, knockin models modify genes in specific ways: introducing point mutations that mimic human disease alleles, inserting reporter genes to visualize expression patterns, or adding epitope tags to track protein localization. Because modifications occur at the native locus, knockin alleles maintain endogenous regulatory control over expression timing, tissue distribution, and transcript processing.',
};

const stats = [
  { number: '2,500+', label: 'Projects Completed' },
  { number: '800+', label: 'Publications' },
  { number: '25+', label: 'Years of Excellence' },
  { number: '100%', label: 'Custom Solutions' },
];

const approachesData = [
  {
    title: 'Point Mutation Knockin',
    description: 'Point mutation knockin models introduce specific nucleotide changes into the endogenous gene. This approach is essential for modeling human disease alleles, studying structure function relationships, and creating drug resistant or drug sensitized variants for pharmacological studies.',
    benefit: 'Point mutations can be introduced as constitutive changes present from conception, or as conditional alleles that convert from wildtype to mutant sequence upon Cre mediated recombination.',
    href: '/point-mutation-mice',
    Icon: IconTarget,
  },
  {
    title: 'Reporter Knockin',
    description: 'Reporter knockin models insert visualization markers at endogenous loci. Common reporters include fluorescent proteins (GFP, tdTomato, mCherry), enzymatic reporters (LacZ, alkaline phosphatase), and bioluminescent reporters (luciferase). Reporter expression is driven by the endogenous promoter, providing accurate readout of native gene expression patterns.',
    benefit: 'Reporter knockins enable lineage tracing, cell sorting of expressing populations, and real time monitoring of gene expression in living animals.',
    href: '/reporter-knockin',
    Icon: IconEye,
  },
  {
    title: 'Tag Knockin',
    description: 'Tag knockin models add epitope tags to endogenous proteins for biochemical detection, purification, or localization studies. Common tags include FLAG, HA, V5, and Myc. Tags can be positioned at the N terminus, C terminus, or internal locations depending on protein structure and experimental requirements.',
    benefit: 'Because tagged proteins are expressed at physiological levels under native regulatory control, tag knockin models avoid overexpression artifacts common with transgenic approaches.',
    href: '/tag-knockin-mice',
    Icon: IconZap,
  },
  {
    title: 'cDNA Knockin',
    description: 'cDNA knockin models replace the endogenous coding sequence with an alternative cDNA. Applications include humanization (replacing mouse gene with human ortholog), isoform specific expression, and introduction of modified or optimized coding sequences.',
    benefit: 'cDNA knockins maintain endogenous regulatory elements while providing complete control over the expressed protein sequence.',
    href: '/cdna-knockin',
    Icon: IconDNA,
  },
  {
    title: 'Conditional Knockin',
    description: 'Conditional knockin models express modified alleles only after Cre mediated activation. A stop cassette flanked by LoxP sites prevents expression until Cre excision. This approach enables tissue specific or temporally controlled expression of mutant alleles, reporters, or other modifications.',
    benefit: 'Conditional knockins are particularly valuable for studying oncogenic mutations that would be lethal if expressed globally from conception.',
    href: '/conditional-knockin-mice',
    Icon: IconSettings,
  },
];

const technicalData = {
  title: 'Technical Approach',
  subtitle: 'Allele Design',
  content: 'Knockin allele design requires careful consideration of the modification site, surrounding sequence context, and potential effects on gene expression. Our scientific team analyzes:',
  points: [
    'Optimal insertion site for reporters and tags',
    'Codon context for point mutations',
    'Splice site preservation',
    'Regulatory element maintenance',
  ],
};

const whenToUseData = {
  title: 'When to Use Knockin Models',
  content: 'Knockin models provide the most physiologically relevant approach when native gene regulation is important for the experimental question.',
};

const publicationsData = {
  title: 'Selected Publications',
  intro: 'Knockin models generated by ingenious targeting laboratory:',
  publications: [
    {
      authors: 'Diamond EL, Emile JF, Fujino T, Haroche J, Maron MI, Lewis AM, et al.',
      year: '2025',
      title: 'RAF-independent MEK mutations drive refractory histiocytic neoplasms but respond to ERK inhibition.',
      journal: 'Cancer Cell.',
      volume: 'S1535-6108(25): 00406-4',
      link: 'https://pubmed.ncbi.nlm.nih.gov/40032711/',
    },
    {
      authors: 'Jiang Y, Sachdeva K, Goulbourne CN, Berg MJ, Peddy J, Stavrides PH, et al.',
      year: '2025',
      title: 'Increased neuronal expression of the early endosomal adaptor APPL1 leads to endosomal and synaptic dysfunction with cholinergic neurodegeneration.',
      journal: 'J Neurosci.',
      volume: '45(29): e2331242025',
      link: 'https://pubmed.ncbi.nlm.nih.gov/40032044/',
    },
    {
      authors: 'Mohassel P, Hearn H, Rooney J, Zou Y, Johnson K, Norato G, et al.',
      year: '2025',
      title: 'Collagen type VI regulates TGF-β bioavailability in skeletal muscle in mice.',
      journal: 'J Clin Invest.',
      volume: '135(9): e173354',
      link: 'https://pubmed.ncbi.nlm.nih.gov/40029857/',
    },
  ],
};

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const rothTestimonial = getTestimonialById('roth-upenn')!;

const testimonials = [
  { quote: rothTestimonial.quote, name: formatAuthorWithCredentials(rothTestimonial), affiliation: rothTestimonial.affiliation },
];

const comparisonTable = [
  { goal: 'Model human disease mutation', knockin: 'Point mutation knockin', alternative: 'Transgenic (but loses native regulation)' },
  { goal: 'Visualize gene expression', knockin: 'Reporter knockin', alternative: 'Transgenic reporter (but random integration)' },
  { goal: 'Track protein localization', knockin: 'Tag knockin', alternative: 'Antibody (but requires fixation)' },
  { goal: 'Express human protein', knockin: 'cDNA knockin / Humanization', alternative: 'Transgenic (but overexpression artifacts)' },
  { goal: 'Tissue specific mutant expression', knockin: 'Conditional knockin', alternative: 'Viral delivery (but variable efficiency)' },
];

const getFaqData = () => [
  {
    question: 'What is the difference between a knockin and a transgenic mouse?',
    answer: (
      <>
        A <GlossaryTermLink term="knockin-mouse-models">knockin mouse</GlossaryTermLink> has a precise modification at a specific genomic location, typically the endogenous gene locus. Expression is controlled by native regulatory elements. A transgenic mouse carries randomly integrated DNA that inserts at unpredictable locations, often in multiple copies via <GlossaryTermLink term="pronuclear-injection">pronuclear injection</GlossaryTermLink>. Knockins provide physiological expression levels through <GlossaryTermLink term="single-copy-integration">single-copy integration</GlossaryTermLink>; transgenics often overexpress.
      </>
    ),
  },
  {
    question: 'What reporter options are available for knockin models?',
    answer: (
      <>
        Common <GlossaryTermLink term="reporter-gene-reporter-allele">reporters</GlossaryTermLink> include fluorescent proteins (GFP, EGFP, tdTomato, mCherry), enzymatic reporters (LacZ/beta-galactosidase), and bioluminescent reporters (luciferase). <GlossaryTermLink term="reporter-readouts">Reporter selection</GlossaryTermLink> depends on your detection method, tissue of interest, and whether you need to combine with other fluorescent tools.
      </>
    ),
  },
  {
    question: 'How do I choose between N-terminal and C-terminal tag placement?',
    answer: 'Tag placement depends on protein structure and function. N-terminal tags can interfere with signal peptides or membrane targeting. C-terminal tags avoid signal sequence issues but may affect protein interactions at the terminus. Contact us to discuss tag positioning.',
  },
  {
    question: 'How long does it take to generate a knockin mouse model?',
    answer: (
      <>
        Knockin project timelines depend on complexity. <GlossaryTermLink term="point-mutation">Point mutations</GlossaryTermLink> and small tags are generally faster. Large insertions require more time. All projects include gene analysis, target design determination, material generation, injection, and breeding of F0s to obtain <GlossaryTermLink term="germline-transmission">germline transmission</GlossaryTermLink> mice. Contact us for current timeline estimates tailored to your project.
      </>
    ),
  },
];

const relatedServices = [
  { label: 'Point Mutation Mice', href: '/point-mutation-mice' },
  { label: 'Reporter Knockin', href: '/reporter-knockin' },
  { label: 'Tag Knockin Mice', href: '/tag-knockin-mice' },
  { label: 'cDNA Knockin', href: '/cdna-knockin' },
];

const relatedModels = [
  { label: 'Humanized Mouse Models', href: '/humanized-mouse-models' },
  { label: 'Knockout Mouse Models', href: '/knockout-mouse-models' },
  { label: 'Conditional Knockout Mouse Models', href: '/conditional-knockout-mouse-models' },
  { label: 'Transgenic Mouse Service', href: '/transgenic-mouse-service' },
];

const relatedResources = [
  { label: 'Request a Quote', href: '/request-quote' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Technologies', href: '/technologies' },
];

export default function KnockinMouseModelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

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

        {/* ========== KNOCKIN APPROACHES ========== */}
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
              Knockin Approaches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approachesData.map((approach, i) => (
                <div
                  key={i}
                  className="animate-in flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
                  style={{
                    backgroundColor: '#f7f7f7',
                    padding: '25px',
                    border: '.5px solid #e0e0e0',
                    borderTop: `4px solid ${i % 2 === 0 ? '#008080' : '#134978'}`,
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#0a253c',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <approach.Icon size={24} color="white" />
                  </div>
                  <h3
                    style={{
                      color: '#333',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '10px',
                    }}
                  >
                    {approach.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.85rem', fontWeight: 400, lineHeight: '1.5rem', marginBottom: '10px' }}>
                    {approach.description}
                  </p>
                  <p style={{ color: '#666', fontSize: '.8rem', fontWeight: 400, lineHeight: '1.4rem', flex: 1 }}>
                    {approach.benefit}
                  </p>
                  <Link
                    href={approach.href}
                    className="inline-flex items-center gap-2 mt-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{
                      backgroundColor: '#008080',
                      color: 'white',
                      padding: '8px 16px',
                      fontSize: '.8rem',
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

        {/* ========== TECHNICAL APPROACH ========== */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            <p className="animate-in" style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem', marginBottom: '15px', maxWidth: '800px' }}>
              {technicalData.content}
            </p>
            <ul className="animate-in space-y-2">
              {technicalData.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <IconArrowRight size={16} color="#008080" className="mt-1 flex-shrink-0" />
                  <span style={{ color: '#666', fontSize: '.9rem', fontWeight: 400 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ========== WHEN TO USE ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
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
              {whenToUseData.title}
            </h2>
            <p className="animate-in" style={{ color: '#666', fontSize: '1rem', fontWeight: 400, lineHeight: '1.7rem' }}>
              {whenToUseData.content}
            </p>
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
              Knockin vs Alternative Approaches
            </h2>
            <div className="animate-in overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '14px', textAlign: 'left', color: 'white', fontWeight: 600, fontSize: '.9rem' }}>
                      Research Goal
                    </th>
                    <th style={{ padding: '14px', textAlign: 'left', color: 'white', fontWeight: 600, fontSize: '.9rem' }}>
                      Knockin Approach
                    </th>
                    <th style={{ padding: '14px', textAlign: 'left', color: 'white', fontWeight: 600, fontSize: '.9rem' }}>
                      Alternative
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                      <td style={{ padding: '14px', border: '1px solid #e0e0e0', fontWeight: 500, fontSize: '.9rem', color: '#333' }}>
                        {row.goal}
                      </td>
                      <td style={{ padding: '14px', border: '1px solid #e0e0e0', fontSize: '.9rem', color: '#008080', fontWeight: 500 }}>
                        {row.knockin}
                      </td>
                      <td style={{ padding: '14px', border: '1px solid #e0e0e0', fontSize: '.85rem', color: '#666' }}>
                        {row.alternative}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========== PUBLICATIONS ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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
            <p className="animate-in text-center" style={{ color: '#666', fontSize: '.9rem', fontWeight: 400, marginBottom: '30px' }}>
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
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              What Researchers Say
            </h2>
            <div style={{
              display: testimonials.length === 1 ? 'block' : 'grid',
              gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined,
              gap: '24px',
            }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    padding: testimonials.length === 1 ? '48px 56px' : '30px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    boxSizing: 'border-box',
                    textAlign: testimonials.length === 1 ? 'center' : 'left',
                  }}
                >
                  <IconQuote size={28} color="#00d4d4" style={testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : undefined} />
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: testimonials.length === 1 ? '1.1rem' : '.95rem',
                      fontWeight: 400,
                      lineHeight: '1.6rem',
                      fontStyle: 'italic',
                      marginTop: '15px',
                      marginBottom: '15px',
                      flex: testimonials.length > 1 ? 1 : undefined,
                    }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
                    <p style={{ color: '#00d4d4', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>
                      — {testimonial.name}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.8rem', fontWeight: 400 }}>{testimonial.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6" style={{ textAlign: 'center' }}>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-teal-700"
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
                <span>View All Testimonials</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========== START YOUR PROJECT CTA ========== */}
        <UXUIDCStartProjectCTA
          title="Start Your Knockin Project"
          content="Our scientific consultants are ready to discuss your research requirements and recommend the optimal knockin strategy for your experimental goals. Initial consultation is provided at no charge and includes modification site analysis, allele design recommendations, and timeline estimates."
          buttons={[
            { label: 'Request a Quote', href: '/request-quote' },
            { label: 'Contact Us', href: '/contact' },
          ]}
        />

        {/* ========== BREEDING SCHEME ARCHITECT CTA ========== */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* ========== LAB SIGNALS NEWSLETTER ========== */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Master Knockin Mouse Design"
              description="Subscribe to Lab Signals for expert guides on knockin strategies, reporter selection, and point mutation design from our PhD scientists."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/knockin-mouse-models')}
            />
          </div>
        </section>

        {/* ========== GLOSSARY ========== */}
        <UXUIDCGlossarySection
          title="Key Terms"
          description="Understanding the terminology used in knockin mouse model generation helps you communicate effectively with our scientific team and interpret project documentation."
          terms={knockinTerms}
        />

        {/* ========== FAQ ========== */}
        <UXUIDCAnimatedFAQ title="Frequently Asked Questions" faqs={getFaqData()} backgroundColor="white" />

        {/* ========== RELATED LINKS ========== */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  All Knockin Services
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="flex items-center gap-2 text-sm transition-colors hover:text-teal-600" style={{ color: '#666' }}>
                        <IconArrowRight size={14} color="#008080" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Model Types
                </h3>
                <ul className="space-y-2">
                  {relatedModels.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="flex items-center gap-2 text-sm transition-colors hover:text-teal-600" style={{ color: '#666' }}>
                        <IconArrowRight size={14} color="#008080" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Resources
                </h3>
                <ul className="space-y-2">
                  {relatedResources.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="flex items-center gap-2 text-sm transition-colors hover:text-teal-600" style={{ color: '#666' }}>
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
            name: 'Knockin Mouse Models',
            provider: { '@type': 'Organization', name: 'ingenious targeting laboratory' },
            description: 'Custom knockin mouse models for gene modification. Point mutations, reporters, tags, and cDNA insertions for research applications.',
            serviceType: 'Custom Mouse Model Generation',
          }),
        }}
      />
    </div>
  );
}
