/**
 * Homepage - ingenious targeting laboratory
 * Built from MASTER TEXT: /page-text-md/homepage.md
 * All text displayed exactly as written - DO NOT MODIFY TEXT
 */

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ROOT_CATALOG_FIRST_META } from '@/lib/seo';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  BreedingSchemeArchitectCTA,
  LabSignalsSignup,
  CatalogCustomDualCta,
} from '@/components/UXUIDC';

// Critical above-fold components - loaded immediately
import HeroSection from './components/homepage/HeroSection';
import CoreServicesSection from './components/homepage/CoreServicesSection';
import OverviewSection from './components/homepage/OverviewSection';

// Below-fold components - lazy loaded with loading placeholders
// Note: ssr: true required in Next.js 16 Server Components (ssr: false not allowed)
const ModelLandscapeSection = dynamic(
  () => import('./components/homepage/ModelLandscapeSection'),
  { ssr: true, loading: () => <div className="min-h-[400px]" aria-hidden="true" /> }
);
const HighLevelApproachSection = dynamic(
  () => import('./components/homepage/HighLevelApproachSection'),
  { ssr: true, loading: () => <div className="min-h-[400px]" aria-hidden="true" /> }
);
const WorkflowSection = dynamic(
  () => import('./components/homepage/WorkflowSection'),
  { ssr: true, loading: () => <div className="min-h-[400px]" aria-hidden="true" /> }
);
const TrustedBySection = dynamic(
  () => import('./components/homepage/TrustedBySection'),
  { ssr: true, loading: () => <div className="min-h-[400px]" aria-hidden="true" /> }
);
const TestimonialsSection = dynamic(
  () => import('./components/homepage/TestimonialsSection'),
  { ssr: true, loading: () => <div className="min-h-[400px]" aria-hidden="true" /> }
);
const FAQSection = dynamic(
  () => import('./components/homepage/FAQSection'),
  { ssr: true, loading: () => <div className="min-h-[400px]" aria-hidden="true" /> }
);
// Video section removed per user request

// ============================================
// META - from homepage.md lines 1-6
// ============================================
export const metadata: Metadata = {
  title: `${ROOT_CATALOG_FIRST_META.title} | ingenious targeting laboratory`,
  description: ROOT_CATALOG_FIRST_META.description,
};

// ============================================
// MASTER TEXT DATA - from homepage.md
// DO NOT EDIT - This is approved content
// ============================================

// Hero Section - lines 8-13
const heroData = {
  headline: 'Mouse Model Generation Designed for Study Ready, Reproducible Research',
  description1: 'ingenious targeting laboratory (iTL) is a U.S. based mouse model generation company that has delivered 2,800+ genetically engineered mouse models since 1998, backed by a 100% germline transmission guarantee, in house U.S. scientific oversight at every QC stage, and specialization in complex multi allele and humanized models on defined C57BL/6 backgrounds.',
  description2: 'For more than two decades, researchers have partnered with our U.S. based scientific team for sequence informed allele design, rigorous QC oversight, and study ready germline transmitting mouse lines. iTL helps researchers determine the most appropriate approach for long term allele stability, clear genotype interpretation, and successful model creation.',
  cta1: { label: 'Browse Catalog Models', href: '/catalog-mouse-models' },
  cta2: { label: 'Request a Quote', href: '/request-quote' },
};

// Core Research Services - lines 14-27
const servicesData = [
  {
    title: 'Mouse Model Generation',
    description: 'We create genetically engineered mouse models aligned with your genetic, regulatory, and phenotype-driven research questions—supporting precise allele design and background control.',
    href: '/custom-mouse-models',
  },
  {
    title: 'Cohort Development',
    description: 'Study ready cohorts on C57BL/6 backgrounds with structured breeding to support statistical power and multi-site reproducibility.',
    href: '/colony-management-services',
  },
  {
    title: 'Catalog Library',
    description: 'Access our catalog of 14,774+ genome engineered mouse and rat models for study ready scientific discovery.',
    href: '/catalog-mouse-models',
  },
  {
    title: 'Preclinical Services',
    description: 'Non-GLP phenotype characterization, PK/PD, pharmacology, and exploratory in-vivo support for your generated or catalog animal models.',
    href: '/preclinical-services',
  },
];

// Overview Section - lines 28-36
const overviewData = {
  sectionTitle: 'Overview',
  whyChoose: {
    title: 'Why Researchers Choose ingenious targeting laboratory',
    content: 'For more than 25 years, ingenious targeting laboratory has supported biomedical research with animal models that provide stable allele designs, reproducible cohorts, C57BL/6 backgrounds, and U.S.-based QC oversight. Each project follows an evidence-based, results-driven approach to deliver animal models with reliable inheritance and long-term performance.',
  },
  whatWeProvide: {
    title: 'What We Provide',
    items: [
      'Mouse model generation including conventional knockouts, conditional knockouts, knock-ins (point mutation, cDNA, gene replacement), reporter alleles, Rosa26 and other targeted transgenics, and humanized models.',
      'Multi-generation cohort development and colony planning for study readiness.',
      'Animal model catalog access to 14,774+ lines for study ready biomedical research.',
      'Integrated non-GLP preclinical services for your generated or catalog model to support translational decisions.',
    ],
  },
};

// Modern Model-Generation Landscape - lines 37-38
const landscapeData = {
  title: 'Modern Model-Generation Landscape',
  content: "Across today's research environment, scientists utilize a wide array of genome-modification technologies, including programmable nucleases, rapid-editing strategies, exploratory one-cell–stage modifications, and other contemporary editing systems used throughout the field. These approaches and others are discussed with an emphasis on structured allele design, stable inheritance, and multi-generational reproducibility for long-term performance aligned with your specific study requirements.",
};

// High-Level Approach - lines 39-47
const approachData = {
  title: "ingenious targeting laboratory's High-Level Approach",
  features: [
    {
      title: 'Optimized Targeting Strategy',
      description: 'We evaluate all available genome engineering technologies to determine the best method for your specific research goals. Technology selection is based on allele complexity, stability requirements, and reproducibility standards.',
    },
    {
      title: 'U.S.-Based QC Oversight',
      description: 'Each stage of model generation—allele confirmation, germline transmission, colony establishment, and cohort expansion—is validated through U.S.-based QC. This comprehensive oversight ensures consistent quality and reliable results across all project phases.',
    },
    {
      title: 'Project Backgrounds',
      description: 'The C57BL/6 background ensures reproducibility across cohorts, replicates, and multi-site studies to eliminate confounding variables and support consistent phenotypic outcomes.',
    },
    {
      title: 'Structured Allele Design',
      description: 'Allele designs are chosen to support reliable and consistent performance across downstream assays. This includes constitutive knockout, conditional knockout, reporter gene insertion, knock-in (point mutation, cDNA), and humanization projects, all designed to maintain stable inheritance and interpretable outcomes across generations.',
    },
  ],
};

// Conceptual Workflow - lines 48-60
const workflowData = {
  title: 'Conceptual Workflow',
  subtitle: 'Our systematic approach ensures consistent results from project initiation through delivery of study ready cohorts:',
  ctaHref: '', // No CTA link - button removed per user request
  steps: [
    {
      number: 1,
      title: 'Project Consultation',
      description: 'Free scientific consultation to review experimental goals, recommend optimal targeting strategies, and provide pricing estimates.',
    },
    {
      number: 2,
      title: 'Allele Design',
      description: 'Allele design development based on your research requirements, including selection of appropriate targeting approach and cassette configuration.',
    },
    {
      number: 3,
      title: 'Targeting Materials',
      description: 'Design and synthesis of targeting materials, including sequence verification and quality control.',
    },
    {
      number: 4,
      title: 'Germline Transmission',
      description: 'Injection and breeding of F0s to achieve germline transmission.',
    },
    {
      number: 5,
      title: 'Cohort Development',
      description: 'Study ready cohort expansion with structured breeding for statistical power.',
    },
  ],
};

// Trusted by Researchers - lines 61-64
const trustedData = {
  title: 'Trusted by Researchers Worldwide',
  stats: 'Since 1998 · 2,800+ Models Generated · 800+ Peer Reviewed Publications · Nature · Science · Cell',
  content: 'ingenious targeting laboratory has generated mouse models for researchers at leading academic institutions, pharmaceutical companies, and biotechnology organizations worldwide. Our models have contributed to research published in the most prestigious scientific journals.',
  ctaHref: '/publications',
};

// Testimonials - using verified testimonials from master data
// Source: https://www.genetargeting.com/testimonials
import { FEATURED_TESTIMONIALS, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonialsData = {
  title: 'What Researchers Say',
  testimonials: FEATURED_TESTIMONIALS.map(t => ({
    quote: t.quote,
    name: formatAuthorWithCredentials(t),
    affiliation: t.affiliation,
  })),
  ctaHref: '/testimonials',
};

// FAQs - lines 80-86
const faqData = {
  title: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'What types of mouse models does ingenious targeting laboratory generate?',
      answer: 'ingenious targeting laboratory generates mouse models including conventional knockouts, conditional knockouts (floxed alleles), knockins (point mutations, cDNA, gene replacement, reporters), Rosa26 and other targeted transgenics, and humanized models.',
    },
    {
      question: 'What strain backgrounds are available for model generation?',
      answer: 'ingenious targeting laboratory primarily works with C57BL/6 background. Other strain backgrounds (BALB/c, 129) are available upon request.',
    },
    {
      question: 'How do I get started with a mouse model generation project?',
      answer: 'Contact ingenious targeting laboratory through our request quote form or schedule a consultation. Our scientific team provides complimentary consultation to discuss your research goals, targeting strategies, and develop a project proposal. We work with you throughout the project to ensure the model meets your research needs.',
    },
  ],
};

// ============================================
// PAGE COMPONENT
// ============================================
export default function HomePage() {
  return (
    <div className="page-wrapper" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* MASTER TEXT SECTIONS - in order from homepage.md */}
        
        {/* 1. Hero Section */}
        <HeroSection data={heroData} />

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="homepage" utmMedium="page-hero" flush />
          </div>
        </section>

        {/* 2. Core Research Services */}
        <CoreServicesSection data={servicesData} />

        {/* 3. Overview */}
        <OverviewSection data={overviewData} />

        {/* 4. Modern Model-Generation Landscape */}
        <ModelLandscapeSection data={landscapeData} />

        {/* 5. High-Level Approach */}
        <HighLevelApproachSection data={approachData} />

        {/* 6. Conceptual Workflow */}
        <WorkflowSection data={workflowData} />

        {/* 7. Trusted by Researchers Worldwide */}
        <TrustedBySection data={trustedData} />

        {/* 8. What Researchers Say (Testimonials) */}
        <TestimonialsSection data={testimonialsData} />

        {/* 9. Frequently Asked Questions */}
        <FAQSection data={faqData} />

        {/* P0 close → P1 BSA → P2 Lab Signals (nurture last) */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="homepage" utmMedium="page-closing" flush />
          </div>
        </section>

        <BreedingSchemeArchitectCTA variant="gradient" />

        <section style={{ backgroundColor: '#ffffff', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup
              variant="banner"
              title="Stay Ahead with Lab Signals"
              description="Subscribe for biweekly insights from our PhD scientists. Expert articles on mouse model design, gene targeting strategies, and research best practices."
            />
          </div>
        </section>
      </main>

      <UXUIDCFooter />

      <UXUIDCCookieConsent />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://www.genetargeting.com/#organization',
            name: 'ingenious targeting laboratory',
            alternateName: ['iTL', 'ingenious targeting lab'],
            url: 'https://www.genetargeting.com',
            logo: 'https://www.genetargeting.com/images/logo.png',
            description:
              'ingenious targeting laboratory (iTL) is a U.S. based mouse model generation company that has delivered 2,800+ genetically engineered mouse models since 1998, backed by a 100% germline transmission guarantee, in house U.S. scientific oversight at every QC stage, and specialization in complex multi allele and humanized models on defined C57BL/6 backgrounds.',
            slogan: 'Mouse model generation, U.S. scientific oversight, 100% germline transmission guarantee.',
            foundingDate: '1998',
            foundingLocation: 'Holbrook, NY, United States',
            numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 200 },
            award: [
              '100% germline transmission guarantee on every model generation project',
              '800+ peer reviewed publications citing iTL generated models',
            ],
            knowsAbout: [
              'Mouse model generation',
              'Knockout mouse models',
              'Conditional knockout mouse models',
              'Knockin mouse models',
              'Humanized mouse models',
              'Transgenic mouse models',
              'CRISPR/Cas9 genome editing',
              'gene targeting',
              'Cre/loxP system',
              'Flp/FRT recombination',
              'BAC transgenics',
              'Rosa26 safe harbor targeting',
              'C57BL/6 strain backgrounds',
              'Sequence informed allele design',
              'Germline transmission',
              'Colony management',
              'Cryopreservation',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '761-80 Coates Avenue',
              addressLocality: 'Holbrook',
              addressRegion: 'NY',
              postalCode: '11741',
              addressCountry: 'US',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-631-468-8530',
              contactType: 'customer service',
              email: 'inquiry@genetargeting.com',
              areaServed: 'Worldwide',
              availableLanguage: 'English',
            },
            sameAs: [
              'https://www.linkedin.com/company/ingenious-targeting-laboratory',
              'https://www.youtube.com/@ingeniouslab',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://www.genetargeting.com/#website',
            url: 'https://www.genetargeting.com',
            name: 'ingenious targeting laboratory',
            description:
              'U.S. based mouse model generation company. Knockout, knockin, humanized, and transgenic models since 1998 with a 100% germline transmission guarantee.',
            publisher: { '@id': 'https://www.genetargeting.com/#organization' },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://www.genetargeting.com/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </div>
  );
}
