'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { UXUIDCGlossarySection, conditionalTerms } from '@/components/UXUIDC/GlossarySection';
import { LegacyInfoLink, UXUIDCResourceLinks, conditionalKnockoutResources, LabSignalsSignup, getRelatedLabSignalsArticles, BreedingSchemeArchitectCTA, GlossaryTermLink } from '@/components/UXUIDC';
import { IconDNA, IconSettings, IconClock, IconTarget, IconEye, IconQuote, IconChevronRight, IconAward, IconCheckCircle, IconLayers } from '@/components/UXUIDC/Icons';

// Legacy content link
const legacyContentUrl = '/legacy/conditional-knockout-mouse-models';

// Hero Data
const heroData = {
  badge: "Cre Lox Technology",
  title: "Conditional Knockout Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 mouse model projects, including conditional knockouts, for researchers at universities, pharmaceutical companies, and research institutions worldwide.",
  description: "Our conditional knockout mouse models have supported research published in more than 800 peer reviewed journals, including Science, Nature, and Cell.",
  secondaryText: "Conditional knockout mouse models enable controlled gene inactivation in specific tissues or at defined times. Unlike conventional knockouts where gene function is lost globally from the earliest developmental stages, conditional knockouts use the Cre lox system to restrict gene deletion to cells expressing Cre recombinase."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Advantages Data
const advantagesData = {
  title: "When to Use Conditional Knockout",
  description: "Floxed mouse models provide maximum experimental flexibility. A single conditional allele can generate tissue specific knockouts across dozens of organ systems simply by crossing to different Cre driver lines.",
  items: [
    {
      icon: IconDNA,
      title: "Essential Genes",
      description: "Many genes are essential for embryonic development. Global knockout of these genes results in embryonic lethality. Conditional knockout allows bypass of developmental requirements by restricting gene deletion to specific tissues or adult stages."
    },
    {
      icon: IconLayers,
      title: "Pleiotropic Genes",
      description: "Genes with functions in multiple organ systems can produce complex phenotypes when deleted globally. Tissue specific conditional knockout isolates gene function in individual tissues, clarifying which phenotypes are cell autonomous."
    },
    {
      icon: IconTarget,
      title: "Cell Type Specific Questions",
      description: "When the research question focuses on gene function in a specific cell type, conditional knockout provides direct answers without confounding effects from other tissues."
    }
  ]
};

// Cre Lox System Data
const creLoxData = {
  title: "How Conditional Knockout Works",
  subtitle: "The Cre Lox System",
  description: "Conditional knockout relies on the Cre lox recombination system. LoxP sites are 34 base pair DNA sequences recognized by Cre recombinase. When two LoxP sites flank a DNA segment in the same orientation, Cre recombinase excises the intervening sequence, leaving a single LoxP site.",
  mechanism: "In a conditional knockout allele, LoxP sites flank one or more critical exons of the target gene. The floxed allele functions normally in the absence of Cre. When crossed to a Cre driver line, cells expressing Cre recombinase excise the floxed exons, creating a null allele in those specific cells while gene function is preserved elsewhere."
};

// Tissue Specific Data
const tissueSpecificData = {
  title: "Tissue Specific Gene Deletion",
  description: "Tissue specificity is achieved through Cre driver lines that express Cre recombinase under tissue specific promoters. Hundreds of Cre driver lines are available, targeting virtually every organ system and cell type.",
  drivers: [
    { name: "Albumin Cre", target: "Hepatocyte specific deletion" },
    { name: "Nestin Cre", target: "Neural progenitor and CNS deletion" },
    { name: "LysM Cre", target: "Myeloid cell specific deletion (macrophages, granulocytes)" },
    { name: "CD4 Cre", target: "T cell specific deletion" },
    { name: "Myh6 Cre", target: "Cardiomyocyte specific deletion" },
    { name: "Villin Cre", target: "Intestinal epithelium specific deletion" }
  ]
};

// Inducible Data
const inducibleData = {
  title: "Inducible Gene Deletion",
  description: "Temporal control is achieved using inducible Cre systems. The most common approach uses CreERT2, a fusion of Cre recombinase with a modified estrogen receptor that is inactive until tamoxifen administration.",
  benefits: [
    "Trigger gene deletion at any developmental stage or in adult animals",
    "Study gene function after normal development is complete",
    "Investigate acute versus chronic phenotypes",
    "Model disease onset in mature animals"
  ]
};

// Allele Design Data
const alleleDesignData = {
  title: "Allele Design and Configuration",
  sections: [
    {
      icon: IconSettings,
      title: "Critical Exon Selection",
      description: "Successful conditional knockout requires careful selection of exons to flank with LoxP sites. The targeted exon or exons must be essential for gene function.",
      considerations: [
        "Exons present in all transcript variants",
        "Exons encoding essential functional domains",
        "Exon deletion that causes frameshift in downstream sequence",
        "Avoidance of alternative splicing that could bypass the deletion"
      ]
    },
    {
      icon: IconEye,
      title: "Conditional Knockout with Reporter",
      description: "Adding a reporter gene to your conditional knockout model enables visualization of when and where gene inactivation occurs, providing confirmation at the single cell level.",
      strategies: [
        "Inverted Reporter Strategy: Reporter placed in opposite orientation, activated when Cre inverts the region",
        "Post Exon Reporter: Reporter placed after the last exon, activated after Cre mediated deletion",
        "Dual Reporter Systems: One reporter expressed with the gene, a different reporter expressed after knockout"
      ]
    },
    {
      icon: IconLayers,
      title: "Derivative Allele System",
      description: "A standard stop cassette configuration enables generation of four derivative alleles from a single targeted mouse line:",
      alleles: [
        { name: "Knockout First", desc: "Original targeted allele with full cassette. Gene is disrupted by stop cassette insertion." },
        { name: "Conditional Ready", desc: "Flp excision removes the cassette while leaving LoxP sites flanking the critical exon." },
        { name: "Conditional Null", desc: "Cre excision removes the critical exon, creating the tissue specific null allele." }
      ]
    }
  ]
};

// TruView Data
const truViewData = {
  title: "TruView Conditional Knockout™",
  description: "ingenious targeting laboratory's proprietary TruView technology provides strong reporter expression after knockout and can be used with genes of almost any size.",
  benefits: [
    "Visualization of recombined cells regardless of target gene expression levels",
    "All from one target gene locus",
    "Demonstration of successful knockout",
    "Labeling of affected cells and tissues"
  ]
};

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Wang L, Noyer L, Jishage M, Wang YH, Tao AY, McDermott M, et al.",
    year: "2025",
    title: "CLNS1A regulates genome stability and cell cycle progression to control CD4 T cell function and autoimmunity.",
    journal: "Sci Immunol",
    volume: "10(108): eadq8860",
    link: "https://pubmed.ncbi.nlm.nih.gov/40540585/"
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

const plumleyTestimonial = getTestimonialById('plumley-warren')!;

const testimonials = [
  { quote: plumleyTestimonial.quote, name: formatAuthorWithCredentials(plumleyTestimonial), affiliation: plumleyTestimonial.affiliation },
];

// Related Links
const relatedModelTypes = [
  { title: "Conventional Knockout", href: "/conventional-knockout-mouse-models" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "Flp Frt System", href: "/flp-frt-system" }
];

const projectResources = [
  { title: "Knockout Strategy Guide", href: "/knockout-strategy-guide" },
  { title: "Conditional vs Conventional Guide", href: "/conditional-vs-conventional-guide" },
  { title: "Request a Quote", href: "/request-quote" },
  { title: "FAQs", href: "/faqs" }
];

// FAQ Data
const getFaqData = () => [
  {
    question: "What is the difference between a floxed mouse and a conditional knockout?",
    answer: (
      <>
        A <GlossaryTermLink term="floxed-gene-loxp-site">floxed mouse</GlossaryTermLink> carries <GlossaryTermLink term="floxed-gene-loxp-site">LoxP sites</GlossaryTermLink> flanking a critical exon but retains normal gene function. The gene is only inactivated when the floxed mouse is crossed to a <GlossaryTermLink term="cre-driver-line">Cre driver line</GlossaryTermLink>. The resulting offspring with both the floxed allele and Cre expression are the actual <GlossaryTermLink term="conditional-knockout-mouse-models">conditional knockouts</GlossaryTermLink>, where gene deletion occurs in Cre-expressing tissues.
      </>
    )
  },
  {
    question: "Can I use the same floxed mouse line with different Cre drivers?",
    answer: (
      <>
        Yes. This is a major advantage of conditional knockout models. A single floxed allele can be crossed to any <GlossaryTermLink term="cre-driver-line">Cre driver line</GlossaryTermLink> to achieve <GlossaryTermLink term="tissue-specific-knockout">tissue-specific knockout</GlossaryTermLink> in different organs. One floxed mouse project can support studies in liver (Albumin-Cre), brain (Nestin-Cre), immune cells (LysM-Cre), and many other tissues.
      </>
    )
  },
  {
    question: "How do I choose which exon to flox?",
    answer: (
      <>
        The critical exon must be essential for gene function. Ideal targets are exons present in all transcript variants, exons encoding functional domains, and exons whose deletion causes <GlossaryTermLink term="frameshift-mutation">frameshift</GlossaryTermLink> in downstream sequence. Our scientific team analyzes gene structure and transcript architecture to identify optimal targets for each project.
      </>
    )
  },
  {
    question: "How long does a conditional knockout project take?",
    answer: (
      <>
        Custom conditional knockout project timelines account for more complex allele designs and verification of LoxP site positioning in <GlossaryTermLink term="germline-transmission">germline transmission</GlossaryTermLink> mice. The investment provides greater experimental flexibility through <GlossaryTermLink term="tissue-specific-knockout">tissue-specific</GlossaryTermLink> and <GlossaryTermLink term="temporal-control">temporal control</GlossaryTermLink>. Contact us for current timeline estimates tailored to your project.
      </>
    )
  }
];

export default function ConditionalKnockoutMouseModelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero animations
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }
      
      // Scroll-triggered animations
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
          {/* Background Pattern */}
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

        {/* Key Benefits Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in text-center" style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
                {advantagesData.title}
              </h2>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', maxWidth: '700px', margin: '0 auto' }}>
                {advantagesData.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advantagesData.items.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '30px',
                      borderRadius: '8px',
                      borderTop: '4px solid #008080'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px'
                    }}>
                      <IconComponent size={24} color="#008080" />
                    </div>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
                {creLoxData.title}
              </h2>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                {creLoxData.subtitle}
              </h3>
            </div>
            
            <div className="animate-in">
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px', maxWidth: '800px' }}>
                {creLoxData.description}
              </p>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', maxWidth: '800px' }}>
                {creLoxData.mechanism}
              </p>
              <Link 
                href="/cre-lox-system"
                className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn more about Cre Lox System</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Tissue Specific Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px' }}>
                {tissueSpecificData.title}
              </h2>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', maxWidth: '800px' }}>
                {tissueSpecificData.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tissueSpecificData.drivers.map((driver, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2384da'
                  }}
                >
                  <h4 style={{ color: '#0a253c', fontWeight: 600, fontSize: '.95rem', marginBottom: '5px' }}>
                    {driver.name}
                  </h4>
                  <p style={{ color: '#666', fontSize: '.85rem' }}>
                    {driver.target}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="animate-in text-center" style={{ marginTop: '25px' }}>
              <Link 
                href="/tissue-specific-cre-lines"
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
                <span>View All Cre Driver Lines</span>
                <IconChevronRight size={16} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Inducible Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,128,128,0.1)',
                marginBottom: '15px'
              }}>
                <IconClock size={24} color="#008080" />
              </div>
              <h2 style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px' }}>
                {inducibleData.title}
              </h2>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px', maxWidth: '800px' }}>
                {inducibleData.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {inducibleData.benefits.map((benefit, index) => (
                  <li 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      marginBottom: '10px',
                      color: '#555',
                      fontSize: '.9rem'
                    }}
                  >
                    <IconCheckCircle size={18} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/inducible-conditional-knockout"
                className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn more about inducible systems</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Allele Design Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              {alleleDesignData.title}
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {alleleDesignData.sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <div 
                    key={index}
                    className="animate-in hover-card hover-card-teal group"
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '30px',
                      borderRadius: '8px',
                      borderLeft: '4px solid #008080'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                      <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,128,128,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={22} color="#008080" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', fontWeight: 600, marginBottom: '10px' }}>
                          {section.title}
                        </h3>
                        <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                          {section.description}
                        </p>
                        {section.considerations && (
                          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
                            {section.considerations.map((item, idx) => (
                              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '.85rem' }}>
                                <IconCheckCircle size={14} color="#008080" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.strategies && (
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {section.strategies.map((strategy, idx) => (
                              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#666', fontSize: '.85rem', marginBottom: '8px' }}>
                                <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                                <span>{strategy}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.alleles && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                            {section.alleles.map((allele, idx) => (
                              <div key={idx} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
                                <h4 style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>{allele.name}</h4>
                                <p style={{ color: '#666', fontSize: '.8rem', lineHeight: '1.4rem' }}>{allele.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="animate-in text-center" style={{ marginTop: '25px' }}>
              <Link 
                href="/cre-lox-system"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn more about Cre-LoxP Systems</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* TruView Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="animate-in">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '15px'
              }}>
                <IconAward size={16} color="white" />
                <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>Proprietary Technology</span>
              </div>
              <h2 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px' }}>
                {truViewData.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px', maxWidth: '800px' }}>
                {truViewData.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {truViewData.benefits.map((benefit, index) => (
                  <li 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '.9rem'
                    }}
                  >
                    <IconCheckCircle size={18} color="white" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              Conditional knockout models generated by ingenious targeting laboratory:
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
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
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
                  className="animate-in"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: testimonials.length === 1 ? '48px 56px' : '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    boxSizing: 'border-box',
                    textAlign: testimonials.length === 1 ? 'center' : 'left',
                  }}
                >
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px', ...(testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : {}) }} />
                  <p style={{
                    color: '#666',
                    fontFamily: 'Lato, sans-serif',
                    fontSize: testimonials.length === 1 ? '1.1rem' : '.9rem',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    marginBottom: '20px',
                    flex: testimonials.length > 1 ? 1 : undefined,
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
                    <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>
                      — {testimonial.name}
                    </p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem', fontWeight: 400 }}>
                      {testimonial.affiliation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="animate-in" style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link 
                href="/testimonials"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Read more testimonials</span>
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Conditional Knockout Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your research requirements and recommend the optimal conditional allele design for your experimental goals. Initial consultation is provided at no charge and includes exon analysis, configuration recommendations, and Cre driver line guidance.
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
                href="/request-quote"
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

        {/* Glossary Section */}
        <UXUIDCGlossarySection
          title="Key Terms"
          description="Understanding the terminology used in conditional knockout mouse model generation helps you communicate effectively with our scientific team and interpret project documentation."
          terms={conditionalTerms}
        />

        {/* Downloadable Resources Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Conditional Knockout Resources"
              description="Download our free guides and tools to help plan your conditional knockout project."
              resources={conditionalKnockoutResources}
              variant="card"
            />
          </div>
        </section>

        {/* Lab Signals Newsletter Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Get Expert Insights on Conditional Knockout"
              description="Subscribe to Lab Signals for biweekly articles on Cre-lox design, floxed allele optimization, and conditional knockout best practices from our PhD scientists."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/conditional-knockout-mouse-models')}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={getFaqData()} />
            </div>
          </div>
        </section>

        {/* Legacy Content Link */}
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

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Related Model Types */}
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedModelTypes.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link 
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.9rem' }}
                      >
                        <IconChevronRight size={14} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Related Technologies */}
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedTechnologies.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link 
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.9rem' }}
                      >
                        <IconChevronRight size={14} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Project Resources */}
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Project Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {projectResources.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link 
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.9rem' }}
                      >
                        <IconChevronRight size={14} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />
      </main>

      <UXUIDCFooter />
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Conditional Knockout Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom conditional knockout mouse models using Cre lox technology. Floxed alleles for tissue specific and inducible gene deletion. 2,500+ projects since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
