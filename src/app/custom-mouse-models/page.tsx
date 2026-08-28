'use client';

import { useEffect, useRef } from 'react';
import PageClosingCta from '@/components/UXUIDC/PageClosingCta';

import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';

import { makeFooterCta } from '@/data/commercialCtas';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { LabSignalsSignup, BreedingSchemeArchitectCTA, getRelatedLabSignalsArticles } from '@/components/UXUIDC';
import { IconDNA, IconTarget, IconFlask, IconChevronRight, IconShield, IconLayers } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import ModelGenerationPrioritySection from '@/components/gene-expansion/ModelGenerationPrioritySection';

// Hero Data
const heroData = {
  badge: "Mouse Model Generation Services",
  title: "Mouse Model Generation",
  intro: "ingenious targeting laboratory is a U.S. based mouse model generation company that has delivered 2,800+ genetically engineered mouse models since 1998, backed by a 100% germline transmission guarantee, in house U.S. scientific oversight at every QC stage, and specialization in complex multi allele and humanized models on defined C57BL/6 backgrounds.",
  description: "Whether you need complete gene deletion, precise sequence insertion, human gene replacement, or targeted transgenic models, ingenious provides the PhD level scientific consultation and U.S. based technical execution to deliver models optimized for your specific research goals."
};

// Stats Data
const statsData = [
  { value: 2800, suffix: "+", label: "Custom Models Generated" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Germline Transmission Guarantee" }
];

// Knockout Models Data
const knockoutData = {
  title: "Knockout Mouse Models",
  intro: "Knockout mice carry targeted deletions that eliminate gene function, enabling loss of function studies across every therapeutic area. ingenious targeting laboratory offers multiple knockout strategies for your experimental requirements.",
  models: [
    {
      title: "Conventional Knockout",
      description: "Conventional knockout models carry constitutive null alleles that eliminate gene function in all tissues from the earliest developmental stages. These models provide straightforward interpretation of genes that are not required for embryonic viability.",
      href: "/conventional-knockout-mouse-models"
    },
    {
      title: "Conditional Knockout",
      description: "Conditional knockout models use the Cre lox system to enable tissue specific or temporally controlled gene deletion. The floxed allele design preserves normal gene function until Cre recombinase excises a critical region, providing experimental control over when and where knockout occurs.",
      href: "/conditional-knockout-mouse-models"
    },
    {
      title: "Tissue Specific Knockout",
      description: "By crossing floxed alleles with tissue specific Cre driver lines, researchers can study gene function in specific cell populations while maintaining normal function elsewhere. This approach is essential when conventional knockout causes embryonic lethality or systemic effects that obscure tissue specific phenotypes.",
      href: "/tissue-specific-knockout"
    },
    {
      title: "Inducible Knockout",
      description: "Inducible systems such as tamoxifen activated CreERT2 allow temporal control over gene deletion. This enables study of gene function in adult animals and avoids developmental compensation that can mask phenotypes in constitutive models.",
      href: "/inducible-conditional-knockout"
    },
    {
      title: "Knockout First / Convertible Allele",
      description: "Knockout first designs (tm1a / IKMC style) deliver a convertible pathway from a reporter tagged null allele to a conditional floxed allele, supporting flexible study designs from a single targeting event.",
      href: "/request-quote/?type=knockout"
    },
    {
      title: "Compound / Double Knockout",
      description: "Multi allele and compound knockout projects combine two or more targeted loci for pathway redundancy, synthetic lethality, and complex disease modeling on defined backgrounds.",
      href: "/request-quote/"
    },
    {
      title: "Large Scale BAC Deletion",
      description: "BAC scale deletion and large fragment targeting remove extended genomic regions when conventional exon deletion is not sufficient for your research question.",
      href: "/bac-to-bac-large-scale-targeting"
    }
  ]
};

// Knockin Models Data
const knockinData = {
  title: "Knockin Mouse Models",
  intro: "Knockin mice carry precise sequence insertions at defined genomic locations. Unlike random transgenesis, knockin targeting ensures predictable expression levels and eliminates position effects.",
  models: [
    {
      title: "Point Mutation Knockin",
      description: "Point mutation models introduce specific nucleotide changes to study disease associated variants, alter protein function, or modify regulatory elements.",
      href: "/point-mutation-mice"
    },
    {
      title: "Reporter Knockin",
      description: "Reporter knockin models express fluorescent proteins, enzymatic markers, or other reporters under control of endogenous regulatory elements. This enables visualization of gene expression patterns, lineage tracing, and cell isolation based on marker expression.",
      href: "/reporter-knockin"
    },
    {
      title: "Tag Knockin",
      description: "Tag knockin models add epitope tags such as FLAG, HA, or V5 to endogenous proteins. These tags enable protein detection, purification, and interaction studies without requiring gene specific antibodies.",
      href: "/tag-knockin-mice"
    },
    {
      title: "cDNA Knockin",
      description: "cDNA knockin replaces a gene with a coding sequence, often to express modified proteins, isoform variants, or humanized sequences. The targeted approach ensures expression under endogenous regulatory control.",
      href: "/cdna-knockin"
    },
    {
      title: "Conditional Knockin",
      description: "Conditional knockin designs such as Rosa26 LSL enable inducible or tissue restricted expression of inserted sequences while preserving baseline physiology until recombination.",
      href: "/request-quote/?type=knockin"
    },
    {
      title: "Gene Replacement Knockin",
      description: "Gene replacement knockin substitutes mouse coding sequence with a human or engineered ortholog at the endogenous locus for preclinical target fidelity.",
      href: "/gene-replacement"
    }
  ]
};

// Humanized Models Data
const humanizedData = {
  title: "Humanized Mouse Models",
  intro: "Humanized mice carry human gene sequences in place of mouse orthologs, enabling preclinical testing of human specific therapeutics and study of human disease mechanisms.",
  models: [
    {
      title: "Gene Replacement Humanization",
      description: "Complete gene replacement substitutes the entire mouse gene with its human ortholog, including regulatory elements that control expression. This approach preserves physiological expression patterns while providing human target sequences.",
      href: "/gene-replacement"
    },
    {
      title: "Immune Checkpoint Humanization",
      description: "Humanized immune checkpoint models express human PD1, PDL1, CTLA4, LAG3, TIM3, or other checkpoint proteins. These models enable testing of checkpoint inhibitor antibodies in immunocompetent mice with functional immune systems.",
      href: "/humanized-immune-checkpoint-mice"
    },
    {
      title: "Receptor and Target Humanization",
      description: "Therapeutic antibodies often show species specificity that prevents testing in standard mouse models. Humanizing the target receptor or protein enables preclinical efficacy studies in physiologically relevant contexts.",
      href: "/humanized-mouse-models"
    },
    {
      title: "BAC Transgenesis",
      description: "Bacterial artificial chromosome (BAC) targeting enables integration of large genomic segments including complete genes with native regulatory elements. This approach is valuable when physiological expression patterns are essential.",
      href: "/transgenic-mouse-service"
    },
    {
      title: "Partial / Domain Humanization",
      description: "Partial or domain humanization replaces selected exons or functional domains when full gene replacement is unnecessary, reducing project scope while preserving key human epitopes or binding sites.",
      href: "/request-quote/?type=humanized"
    },
    {
      title: "Double / Multi Humanized",
      description: "Double and multi humanized projects combine two or more humanized loci for combination IO, receptor pairs, or multi target therapeutic programs on a single defined background.",
      href: "/request-quote/?type=humanized"
    }
  ]
};

// Transgenic and Cre driver coverage (PI taxonomy)
const transgenicCreData = {
  title: "Targeted Transgenic and Cre Driver Models",
  intro: "Safe harbor transgenesis, overexpression alleles, BAC models, and Cre driver lines comprise our advanced portfolio of genetic strategies for model generation beyond targeted knockout and knockin.",
  models: [
    {
      title: "Safe Harbor Rosa26 / H11",
      description: "Targeted insertion at Rosa26, H11, and related safe harbor loci for predictable expression without disrupting essential genes.",
      href: "/rosa26"
    },
    {
      title: "Cre Recombinase Drivers",
      description: "Constitutive and inducible Cre driver lines for tissue specific or temporal control of floxed alleles across conditional knockout and knockin programs.",
      href: "/cre-recombinase-mice"
    },
    {
      title: "Custom Transgenic Quote",
      description: "Request a quote for BAC transgenic, overexpression, or dual recombinase breeding schemes tailored to your allele plan.",
      href: "/request-quote/?type=overexpression"
    }
  ]
};

// ITL Approach Data
const itlApproachData = {
  title: "The ingenious targeting laboratory Approach",
  sections: [
    {
      title: "Scientific Consultation",
      description: "Every mouse model generation project begins with scientific consultation. Our team reviews your research goals, evaluates targeting strategy options, and recommends the approach most likely to deliver the experimental capabilities you need.",
      icon: "flask"
    },
    {
      title: "Comprehensive Documentation",
      description: "Every project includes detailed documentation of targeting design, germline transmission records, and genotyping protocols. This documentation supports ongoing research and future breeding programs.",
      icon: "layers"
    }
  ]
};

// Testimonials Data - 3 cards like homepage
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const hussainTestimonial = getTestimonialById('hussain-michigan')!;

const testimonialsData = [
  { quote: hussainTestimonial.quote, author: formatAuthorWithCredentials(hussainTestimonial), affiliation: hussainTestimonial.affiliation },
];

import { getPublicationsForPage } from '@/data/pagePublications';
import { buildFAQSchema } from '@/lib/seo/schemaBlocks';
const publicationsData = getPublicationsForPage('/custom-mouse-models');

// FAQ Data
const faqData = [
  {
    question: "What strain backgrounds are available for model generation?",
    answer: "ingenious targeting laboratory offers C57BL/6, BALB/c, and HYBRID 129 x C57BL/6 strains. C57BL/6 is most commonly requested for its well-characterized genetics and suitability for immunological studies. Strain selection depends on your research requirements and downstream breeding plans."
  },
  {
    question: "What is included in a complete mouse model generation project?",
    answer: "Projects include scientific consultation, targeting design, injection, founder generation, breeding to germline transmission, genotyping protocols, and delivery of F1 heterozygous mice."
  },
  {
    question: "Can ingenious targeting laboratory help if I already have a targeting vector or other reagents?",
    answer: "Yes. Partial service options are available for researchers with existing reagents. Services include gene targeting only, microinjection only, or germline transmission breeding. Contact us to discuss your specific requirements and receive a project quote."
  },
  {
    question: "What does the 100% germline transmission guarantee mean?",
    answer: "ingenious targeting laboratory guarantees that every mouse model generation project achieves germline transmission. If a project does not transmit through the germline, the researcher is not charged for it. The guarantee applies to all generated models."
  }
];

// Related Links Data
const relatedLinksData = {
  modelTypes: [
    { href: "/knockout-mouse-models", label: "Knockout Mouse Models" },
    { href: "/knockin-mouse-models", label: "Knockin Mouse Models" },
    { href: "/humanized-mouse-models", label: "Humanized Mouse Models" },
    { href: "/transgenic-mouse-service", label: "Targeted Transgenic Mouse Service" },
    { href: "/conditional-knockout-mouse-models", label: "Conditional Knockout Models" }
  ],
  selectionGuides: [
    { href: "/knockout-strategy-guide", label: "Knockout Strategy Guide" },
    { href: "/conditional-vs-conventional-guide", label: "Conditional vs Conventional Guide" },
    { href: "/mouse-cohort-development/", label: "Mouse Cohort Development" },
    { href: "/mouse-breeding-services/", label: "Contract Mouse Breeding Services" },
    { href: "/request-quote", label: "Request a Quote" },
    { href: "/pricing-guide", label: "Pricing Overview" }
  ]
};

// CTA Data
const ctaData = makeFooterCta(
  'Catalog Models. Generate when ready.',
  'Ready to discuss your mouse model generation requirements? Our scientific team provides complimentary project consultation to help you design the optimal model for your research.',
);

export default function CustomMouseModelsPage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.genetargeting.com/custom-mouse-models/#service",
            "name": "Mouse Model Generation",
            "description": "ingenious targeting laboratory is a U.S. based mouse model generation company that has delivered 2,800+ genetically engineered mouse models since 1998, backed by a 100% germline transmission guarantee, in house U.S. scientific oversight at every QC stage, and specialization in complex multi allele and humanized models on defined C57BL/6 backgrounds.",
            "provider": {
              "@type": "Organization",
              "@id": "https://www.genetargeting.com/#organization",
              "name": "ingenious targeting laboratory",
              "alternateName": "iTL",
              "url": "https://www.genetargeting.com",
              "description": "U.S. based mouse model generation company since 1998 with a 100% germline transmission guarantee."
            },
            "serviceType": "Mouse Model Generation",
            "areaServed": "Worldwide",
            "audience": {
              "@type": "Audience",
              "audienceType": "Biomedical researchers, academic laboratories, pharmaceutical and biotech companies"
            },
            "serviceOutput": [
              "Conventional knockout mouse models",
              "Conditional knockout mouse models (Cre/loxP)",
              "Knockin mouse models (point mutation, reporter, tag, cDNA)",
              "Humanized mouse models (immune checkpoint, gene replacement)",
              "Transgenic mouse models (BAC, targeted)",
              "F1 heterozygous mice with germline transmission confirmation",
              "Targeting design documentation and genotyping protocols"
            ],
            "award": "100% germline transmission guarantee",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Mouse Model Generation Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conventional knockout mouse model generation" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conditional knockout mouse model generation" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Knockin mouse model generation" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Humanized mouse model generation" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transgenic mouse model generation" } }
              ]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFAQSchema('/custom-mouse-models', faqData))
        }}
      />
      <UXUIDCNavigation />
      <main ref={animatedElementsRef}>
        {/* Hero Section */}
        <section className="page-hero" style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05
          }}>
            <div style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
              top: '-200px',
              right: '-200px'
            }} />
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="hero-animate" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <IconDNA size={14} color="#00d4d4" />
              <span style={{ color: '#ffffff', fontSize: '.85rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            <h1 className="hero-animate" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: 1.2
            }}>
              {heroData.title}
            </h1>
            <p className="hero-animate" style={{
              fontSize: '1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '16px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            <p className="hero-animate" style={{
              fontSize: '.9rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.description}
            </p>
            <div className="hero-animate" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/catalog-mouse-models" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#008080',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s ease'
              }}>
                Browse Catalog Models
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'border-color 0.2s ease'
              }}>
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="generated-mouse-models" utmMedium="page-hero" flush />
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="animate-in" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#008080', marginBottom: '4px' }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '.85rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust band omitted: stats section above already covers germline guarantee and experience */}
        <ModelGenerationPrioritySection />

        {/* Knockout Models Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {knockoutData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {knockoutData.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knockoutData.models.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconTarget size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {model.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
                    {model.description}
                  </p>
                  <Link href={model.href} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#008080',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}>
                    Learn More
                    <IconChevronRight size={14} color="#008080" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Knockin Models Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {knockinData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {knockinData.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {knockinData.models.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconDNA size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {model.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
                    {model.description}
                  </p>
                  <Link href={model.href} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#008080',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}>
                    Learn More
                    <IconChevronRight size={14} color="#008080" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Humanized Models Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {humanizedData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {humanizedData.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {humanizedData.models.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #00d4d4'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconShield size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {model.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
                    {model.description}
                  </p>
                  <Link href={model.href} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#008080',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}>
                    Learn More
                    <IconChevronRight size={14} color="#008080" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transgenic and Cre Driver Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {transgenicCreData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {transgenicCreData.intro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transgenicCreData.models.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconFlask size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {model.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
                    {model.description}
                  </p>
                  <Link href={model.href} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#008080',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}>
                    Learn More
                    <IconChevronRight size={14} color="#008080" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ITL Approach Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {itlApproachData.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {itlApproachData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    {section.icon === 'flask' ? <IconFlask size={24} color="#008080" /> : <IconLayers size={24} color="#008080" />}
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6 }}>
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              lineHeight: 1.7,
              marginTop: '24px',
              maxWidth: '800px'
            }}>
              After germline transmission is confirmed and your F1 heterozygous mice are delivered, ingenious can scale those founders into a study ready cohort through <Link href="/mouse-cohort-development/" style={{ color: '#008080', fontWeight: 600, textDecoration: 'none' }}>mouse cohort development</Link>, or continue running the colony for you with <Link href="/mouse-breeding-services/" style={{ color: '#008080', fontWeight: 600, textDecoration: 'none' }}>contract mouse breeding services</Link>.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonialsData} variant="light" />

        {/* Publications Section - 3 cards grid */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Selected Publications
            </h2>
            <p style={{
              fontSize: '.9rem',
              color: '#666',
              marginBottom: '30px',
              lineHeight: 1.7,
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 30px'
            }}>
              Mouse model generation from ingenious targeting laboratory have contributed to over 800 peer reviewed publications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publicationsData.map((pub, index) => (
                <div key={index} style={{
                  background: '#f7f7f7',
                  padding: '24px',
                  borderTop: '4px solid #008080'
                }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '.7rem',
                    fontWeight: 600,
                    color: '#008080',
                    backgroundColor: 'rgba(0,128,128,0.1)',
                    padding: '4px 10px',
                    borderRadius: '10px',
                    marginBottom: '12px'
                  }}>
                    {pub.journal} · {pub.year}
                  </span>
                  {pub.link ? (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: '.9rem',
                      color: '#333',
                      lineHeight: 1.5,
                      fontWeight: 500,
                      textDecoration: 'none',
                      display: 'block'
                    }}>
                      {pub.title} ↗
                    </a>
                  ) : (
                    <p style={{
                      fontSize: '.9rem',
                      color: '#333',
                      lineHeight: 1.5,
                      fontWeight: 500
                    }}>
                      {pub.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link href="/publications" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#134978',
                color: 'white',
                padding: '10px 20px',
                fontSize: '.9rem',
                fontWeight: 400,
                textDecoration: 'none'
              }}>
                View All Publications
                <IconChevronRight size={16} color="white" />
              </Link>
            </div>
          </div>
        </section>

        <PageClosingCta title={ctaData.title} description={ctaData.description} slug="generated-mouse-models" />

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Lab Signals Newsletter CTA */}
        <section style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Mouse Model Generation Insights"
              description="Subscribe to Lab Signals for biweekly guides on mouse model design, targeting strategies, and research best practices from our PhD scientists."
              showArticles={true}
              relatedArticles={getRelatedLabSignalsArticles('/custom-mouse-models')}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  Explore Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.modelTypes.map((link, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  Selection Guides
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.selectionGuides.map((link, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
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
          
      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Mouse Model Generation', path: '/custom-mouse-models' },
        ]}
      />
    </div>
  );
}
