'use client';

import Link from 'next/link';

import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import { StandardPageCtaStack } from '@/components/UXUIDC';
import {
  IconMouse,
  IconClipboard,
  IconUsers,
  IconGitBranch,
  IconZap,
  IconDNA,
  IconCheckCircle,
  IconChevronRight,
  IconQuote,
  IconShield,
  IconBarChart,
} from '@/components/UXUIDC/Icons';
import { buildServiceSchema, buildFAQSchema } from '@/lib/seo/schemaBlocks';
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

// TODO(byline): named ITL PhD scientist + reviewer date. The build doc asks for a
// byline with credential and bio link plus a "Scientifically reviewed by" line;
// both are held until Ops assigns the scientist.

const PAGE_PATH = '/mouse-breeding-services';

const heroData = {
  badge: 'Breeding and Cohorts',
  title: 'Contract Mouse Breeding Services',
  snippet:
    'Ingenious targeting laboratory maintains your genetically engineered lines, executes breeding schemes, genotypes animals, and delivers study-ready cohorts from a U.S.-based barrier facility. Services include colony maintenance, cohort production, and complex multi-allelic breeding schemes.',
  body: 'We have served 900+ laboratories since 1998 and generated 2,800+ custom genetically engineered models. Lines we did not create are welcome. Send us your strain and we will run the colony.',
};

const serviceScopes = [
  {
    Icon: IconClipboard,
    name: 'Colony maintenance',
    body: 'For lines you need to maintain but are not actively studying. We maintain a defined number of breeding pairs, genotype offspring, track the breeding pedigree, and provide monthly reports. This keeps the line available for future studies without occupying your facility\u2019s cage space.',
    linkLabel: 'See mouse colony management in detail',
    linkHref: '/colony-management-services/',
  },
  {
    Icon: IconUsers,
    name: 'Cohort production',
    body: 'For a line you are about to study. We scale the colony to produce a defined number of animals at a defined genotype, age, and sex ratio, with littermate controls.',
    linkLabel: 'See cohort specifications',
    linkHref: '/mouse-cohort-development/',
  },
  {
    Icon: IconGitBranch,
    name: 'Complex and multi allele schemes',
    body: 'Conditional knockouts requiring a Cre cross, compound mutants carrying three or more alleles, reporter crosses for lineage tracing, and inducible systems. These schemes require careful tracking of genotypes and breeding pedigrees across multiple generations, making colony management more complex and increasing the risk of losing the desired genotype.',
    linkLabel: 'See conditional knockout breeding',
    linkHref: '/conditional-knockout-cohort-breeding/',
  },
  {
    Icon: IconZap,
    name: 'Rapid expansion',
    body: 'When a study date is fixed and the colony is too small. We run pairs in parallel with staggered starts rather than sequentially.',
    linkLabel: 'See speed expansion breeding',
    linkHref: '/speed-expansion-breeding/',
  },
  {
    Icon: IconDNA,
    name: 'Backcrossing to a defined background',
    body: 'Lines arriving on a mixed genetic background can be progressively backcrossed to increase the proportion of the recipient background, reaching a theoretical expectation of approximately 97% by N5 and 99.9% by N10. At sufficient backcross generations, the resulting line can be considered congenic.',
    linkLabel: 'See backcrossing to a defined background',
    linkHref: '/backcrossing-services/',
  },
];

const includedItems: { text: string; link?: { label: string; href: string } }[] = [
  { text: 'Breeding scheme design by a PhD scientist before any pair is set' },
  { text: 'Pair setup, rotation, and replacement as productivity declines' },
  {
    text: 'PCR genotyping of every animal, with assay development for new alleles',
    // TODO(ops): confirm genotyping turnaround in business days before stating one here.
    link: { label: 'See mouse genotyping service', href: '/mouse-genotyping-service/' },
  },
  { text: 'Weaning, sexing, and cage census' },
  { text: 'Health monitoring under barrier conditions with routine sentinel testing' },
  { text: 'Pedigree and breeding records you can audit' },
  { text: 'Monthly colony report covering census, genotype distribution, and production' },
  { text: 'Health certification with every shipment' },
  { text: 'A defined project manager as your single point of contact' },
];

// TODO(ops): confirm a typical quarantine duration in business days for the live
// animal transfer copy below. It is one of the first questions a vivarium director
// asks, and no duration is published until Ops confirms it.
// TODO(ops): confirm whether IVF or assisted reproduction is offered before adding
// it to rapid expansion or line rescue copy.
const transferOptions = [
  {
    name: 'Live animal transfer',
    body: 'Ship live animals with current health certification. All incoming lines enter quarantine and undergo health testing before joining the main colony. We coordinate shipping logistics with your institutional vivarium.',
  },
  {
    name: 'Cryopreserved transfer',
    body: 'Ship cryopreserved embryos or sperm instead of live animals. This avoids shipping stress and is often simpler for international transfers.',
    linkLabel: 'See cryopreservation services',
    linkHref: '/cryopreservation-services/',
  },
  {
    name: 'Rederivation on entry',
    body: 'If the line carries a health status problem, or if your institution requires it, rederivation cleans the line before it enters the barrier.',
    linkLabel: 'See rederivation services',
    linkHref: '/rederivation-services/',
  },
];

const outsourcingReasons = [
  'Cage space returns to active experiments instead of maintenance animals',
  'Per diem spend shifts from holding animals to producing them',
  'Technician time returns to experimental work',
  'Genotyping runs on validated assays with proper controls rather than between other tasks',
  'Breeding continues through staff turnover, holidays, and grant gaps',
];

// Verified citation, confirmed via NCBI E-utilities.
const productivityCitation = {
  title:
    'Impact of Automated Genotyping and Increased Breeding Oversight on Overall Mouse Breeding Colony Productivity',
  authors: 'VanDenBerg KR, Oravecz-Wilson K, Krolikowski L, Hill V, Reddy P, Freeman ZT',
  journal: 'Frontiers in Physiology, 2022',
  identifiers: 'DOI: 10.3389/fphys.2022.925784 \u00b7 PMID: 35923239 \u00b7 PMCID: PMC9340497',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9340497/',
};

// Verified testimonial from master data - https://www.genetargeting.com/testimonials
const plumleyTestimonial = getTestimonialById('plumley-warren')!;

const faqData = [
  {
    question: 'Can I outsource my mouse breeding to ingenious targeting laboratory?',
    answer:
      'Yes. We provide contract mouse breeding for genetically engineered lines, including colony maintenance, cohort production, complex multi allele schemes, and rapid expansion, from a U.S. barrier facility with in house PCR genotyping.',
  },
  {
    question: 'Do you breed lines you did not create?',
    answer:
      'Yes. Most contract breeding clients send us lines generated elsewhere or obtained from a repository. We review the allele and the genotyping assay on intake.',
  },
  {
    question: 'How do I transfer my mouse line to your facility?',
    answer:
      'Lines can be shipped as live animals with health certification or as cryopreserved embryos or sperm. All incoming animals are quarantined and health tested before entering the main colony. We coordinate logistics with your institutional vivarium.',
  },
  {
    question: 'Who owns the line and the data?',
    answer:
      'You do. We breed and maintain the colony under contract. Animals, pedigree, and genotype records belong to you and are returned or shipped on request.',
  },
  {
    question: 'What does contract mouse breeding cost?',
    answer:
      'Pricing depends on colony size, genotype complexity, genotyping volume, and whether you need maintenance only or scaled cohort production. We quote per project after a scheme review. There is no charge for the initial consultation.',
  },
  {
    question: 'Can you manage conditional knockout breeding with Cre drivers?',
    answer:
      'Yes. We design the cross path, check for linkage between the floxed allele and the Cre transgene, and produce experimental animals with matched littermate controls.',
  },
  {
    question: 'How is my colony reported?',
    answer:
      'Monthly, covering census by genotype and sex, litters born and weaned, genotype distribution against expected ratios, pair productivity, and projected availability against your target date.',
  },
  {
    question: 'What happens if my line stops breeding?',
    answer:
      'We review pair productivity continuously and flag decline early. Options include pair rotation, increasing pair count, and rederivation. Discuss known fertility problems with us during scoping so the scheme accounts for them.',
  },
];

const relatedBreedingServices = [
  { title: 'Mouse Cohort Development', href: '/mouse-cohort-development/' },
  { title: 'Colony Management Services', href: '/colony-management-services/' },
  { title: 'Conditional Knockout Cohort Breeding', href: '/conditional-knockout-cohort-breeding/' },
  { title: 'Speed Expansion Breeding', href: '/speed-expansion-breeding/' },
  { title: 'Backcrossing Services', href: '/backcrossing-services/' },
  { title: 'Rederivation Services', href: '/rederivation-services/' },
  { title: 'Cryopreservation Services', href: '/cryopreservation-services/' },
  { title: 'Mouse Genotyping Service', href: '/mouse-genotyping-service/' },
];

const relatedResources = [
  { title: 'In House vs Outsourced Mouse Breeding', href: '/in-house-vs-outsourced-mouse-breeding/' },
  { title: 'View all 800+ publications featuring ITL models', href: '/publications/' },
  { title: 'Read more researcher testimonials', href: '/testimonials/' },
  { title: 'Get a Breeding Quote', href: '/cohort-consultation/' },
];

const serviceSchema = buildServiceSchema({
  name: 'Contract Mouse Breeding Services',
  path: PAGE_PATH,
  serviceType: 'Contract mouse breeding',
  description:
    'Contract breeding of genetically engineered mouse lines from a U.S. barrier facility, including colony maintenance, cohort production, multi allele breeding schemes, PCR genotyping, health monitoring, and monthly colony reporting.',
  alternateName: [
    'Mouse breeding services',
    'Outsourced mouse colony management',
    'GEM colony management',
  ],
  keywords:
    'mouse breeding services, contract mouse breeding, outsource mouse breeding, mouse colony management, GEM colony management, mouse colony husbandry, genetically engineered mouse breeding, PCR genotyping service',
  audienceType: 'Academic laboratories, biotechnology companies, preclinical drug discovery teams',
  offerCatalogName: 'Contract breeding scopes',
  offerCatalog: [
    { name: 'Colony maintenance', path: '/colony-management-services/' },
    { name: 'Cohort production', path: '/mouse-cohort-development/' },
    { name: 'Speed expansion breeding', path: '/speed-expansion-breeding/' },
    { name: 'Backcrossing to defined background', path: '/backcrossing-services/' },
    { name: 'Rederivation', path: '/rederivation-services/' },
    { name: 'Cryopreservation', path: '/cryopreservation-services/' },
  ],
});

const faqSchema = buildFAQSchema(PAGE_PATH, faqData);

const sectionHeadingStyle = {
  color: '#2384da',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '20px',
} as const;

const bodyStyle = {
  color: '#555',
  fontSize: '.95rem',
  lineHeight: '1.7rem',
  marginBottom: '15px',
} as const;

const cardHeadingStyle = {
  color: '#0a253c',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.1rem',
  fontWeight: 600,
  marginBottom: '10px',
} as const;

const inlineLinkStyle = {
  color: '#008080',
  fontSize: '.85rem',
  fontWeight: 500,
} as const;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600';

export default function MouseBreedingServicesPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero */}
        <section
          className="page-hero"
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
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
              <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                <IconMouse size={16} color="white" />
              </span>
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>
                {heroData.badge}
              </span>
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
              }}
            >
              {heroData.snippet}
            </p>

            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.6rem',
                marginBottom: '25px',
              }}
            >
              {heroData.body}
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <Link
                href="/cohort-consultation/?ref=breeding-hero#request-form"
                className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${focusRing}`}
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  minWidth: '160px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>Get a Breeding Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/cohort-consultation/#schedule"
                className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${focusRing}`}
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
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section
          className="px-5"
          style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}
        >
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="mouse-breeding-services" utmMedium="page-hero" headingLevel={2} flush />
          </div>
        </section>

        {/* What contract mouse breeding covers */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              What contract mouse breeding covers
            </h2>
            <p className="animate-in" style={bodyStyle}>
              Contract breeding moves the daily work of a mouse colony out of your vivarium and into
              ours. That includes pair setup and rotation, weaning, ear or tail sampling, PCR
              genotyping, record keeping, health monitoring, cage census, and production of the
              animals your protocol needs.
            </p>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: 0 }}>
              You keep ownership of the line and the data. We handle the animals.
            </p>
          </div>
        </section>

        {/* Service scopes */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Service scopes
            </h2>

            <ul
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {serviceScopes.map((scope) => {
                const { Icon } = scope;
                return (
                  <li
                    key={scope.name}
                    className="animate-in hover-card hover-card-teal group"
                    style={{
                      backgroundColor: 'white',
                      padding: '25px',
                      borderRadius: '8px',
                      borderTop: '4px solid #008080',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{ display: 'inline-flex', marginBottom: '12px' }}
                    >
                      <Icon size={24} color="#008080" />
                    </span>
                    <h3
                      className="card-title transition-colors duration-300 group-hover:text-teal-600"
                      style={cardHeadingStyle}
                    >
                      {scope.name}
                    </h3>
                    <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                      {scope.body}
                    </p>
                    <Link
                      href={scope.linkHref}
                      className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-700 mt-3 ${focusRing}`}
                      style={inlineLinkStyle}
                    >
                      <span>{scope.linkLabel}</span>
                      <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                        <IconChevronRight size={14} color="#008080" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA band after service scopes */}
            <div
              className="animate-in"
              style={{
                marginTop: '30px',
                backgroundColor: '#0a253c',
                borderRadius: '8px',
                padding: '25px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '15px',
              }}
            >
              <p style={{ color: 'white', fontSize: '.95rem', lineHeight: '1.6rem', margin: 0 }}>
                Tell us the line, the genotype you need, how many animals, and when.
              </p>
              <Link
                href="/cohort-consultation/?ref=breeding-scopes#request-form"
                className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${focusRing}`}
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '10px 20px',
                  fontSize: '.85rem',
                  fontWeight: 600,
                }}
              >
                <span>Get a Breeding Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* What is included */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              What is included
            </h2>
            <ul
              className="animate-in grid grid-cols-1 md:grid-cols-2 gap-4"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {includedItems.map((item) => (
                <li
                  key={item.text}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
                >
                  <span
                    aria-hidden="true"
                    style={{ display: 'inline-flex', flexShrink: 0, marginTop: '2px' }}
                  >
                    <IconCheckCircle size={18} color="#008080" />
                  </span>
                  <span style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                    {item.text}
                    {item.link ? (
                      <>
                        {' '}
                        <Link
                          href={item.link.href}
                          className={`transition-colors duration-300 hover:text-teal-700 ${focusRing}`}
                          style={{ color: '#008080', fontWeight: 500 }}
                        >
                          {item.link.label}
                        </Link>
                        .
                      </>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Moving your line to our facility */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Moving your line to our facility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {transferOptions.map((option) => (
                <div
                  key={option.name}
                  className="animate-in hover-card hover-card-teal group"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #2384da',
                  }}
                >
                  <h3
                    className="card-title transition-colors duration-300 group-hover:text-teal-600"
                    style={cardHeadingStyle}
                  >
                    {option.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {option.body}
                  </p>
                  {option.linkHref && option.linkLabel ? (
                    <Link
                      href={option.linkHref}
                      className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-700 mt-3 ${focusRing}`}
                      style={inlineLinkStyle}
                    >
                      <span>{option.linkLabel}</span>
                      <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                        <IconChevronRight size={14} color="#008080" />
                      </span>
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protecting the line */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeadingStyle, color: 'white' }}
            >
              Protecting the line
            </h2>
            <p
              className="animate-in"
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: '.95rem',
                lineHeight: '1.7rem',
                marginBottom: '15px',
              }}
            >
              One failure can put years of research at risk. Freezer failure, a pathogen event,
              breeding collapse, or a staffing gap can compromise an entire research colony.
              Cryopreserving a backup of every actively managed line provides a secure resource
              outside the live colony when you need it most.
            </p>
            <p
              className="animate-in"
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: '.95rem',
                lineHeight: '1.7rem',
                marginBottom: '20px',
              }}
            >
              Ask us to quote maintenance and cryopreservation together. The backup costs a fraction
              of regenerating the line.
            </p>
            <Link
              href="/cohort-consultation/?ref=breeding-cryo#request-form"
              className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-white ${focusRing}`}
              style={{
                color: 'white',
                fontSize: '.95rem',
                fontWeight: 600,
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                <IconShield size={18} color="white" />
              </span>
              <span>Quote Maintenance and Cryo Together</span>
            </Link>
          </div>
        </section>

        {/* Reporting and oversight */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Reporting and oversight
            </h2>
            <p className="animate-in" style={bodyStyle}>
              You receive a monthly colony report: current census by genotype and sex, litters born
              and weaned, genotype distribution against expected ratios, pair productivity, and
              projected availability against your target date. When productivity drifts from plan we
              tell you before the deadline rather than after.
            </p>
            <p className="animate-in" style={bodyStyle}>
              A PhD scientist reviews every scheme. U.S. based scientific oversight applies at each
              stage.
            </p>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: 0 }}>
              Our barrier facility is located in Holbrook, New York.
            </p>
          </div>
        </section>

        {/* Why researchers outsource breeding */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Why researchers outsource breeding
            </h2>

            <ul
              className="animate-in grid grid-cols-1 md:grid-cols-2 gap-4"
              style={{ listStyle: 'none', padding: 0, margin: '0 0 25px' }}
            >
              {outsourcingReasons.map((reason) => (
                <li key={reason} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span
                    aria-hidden="true"
                    style={{ display: 'inline-flex', flexShrink: 0, marginTop: '2px' }}
                  >
                    <IconBarChart size={18} color="#2384da" />
                  </span>
                  <span style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                    {reason}
                  </span>
                </li>
              ))}
            </ul>

            <p className="animate-in" style={bodyStyle}>
              One published comparison found that laboratories outsourcing genotyping produced more
              cages and more mice over time than laboratories running standard in house practice,
              and that adding breeding support from a dedicated animal care team increased colony
              productivity further.
            </p>

            <p
              className="animate-in"
              style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.6rem', marginBottom: '15px' }}
            >
              {productivityCitation.authors}.{' '}
              <cite style={{ fontStyle: 'italic' }}>{productivityCitation.title}</cite>.{' '}
              {productivityCitation.journal}. {productivityCitation.identifiers}.{' '}
              <a
                href={productivityCitation.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 hover:text-teal-700 ${focusRing}`}
                style={{ color: '#008080', fontWeight: 500 }}
              >
                Read the study on PubMed Central (opens in a new tab)
              </a>
            </p>

            <Link
              href="/in-house-vs-outsourced-mouse-breeding/"
              className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-700 ${focusRing}`}
              style={{ ...inlineLinkStyle, fontSize: '.95rem' }}
            >
              <span>Compare in house and outsourced mouse breeding</span>
              <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                <IconChevronRight size={14} color="#008080" />
              </span>
            </Link>
          </div>
        </section>

        {/* What researchers say */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeadingStyle, textAlign: 'center', marginBottom: '40px' }}
            >
              What researchers say
            </h2>

            <blockquote
              className="animate-in"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '48px 56px',
                margin: 0,
                textAlign: 'center',
              }}
            >
              <span
                aria-hidden="true"
                style={{ display: 'block', margin: '0 auto 15px', width: '24px' }}
              >
                <IconQuote size={24} color="#008080" />
              </span>
              <p
                style={{
                  color: '#666',
                  fontFamily: 'Lato, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '20px',
                }}
              >
                &ldquo;{plumleyTestimonial.quote}&rdquo;
              </p>
              <footer>
                <p
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.9rem',
                    fontWeight: 600,
                    marginBottom: '5px',
                  }}
                >
                  &mdash; {formatAuthorWithCredentials(plumleyTestimonial)}
                </p>
                <p
                  style={{
                    color: '#666',
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '.8rem',
                    fontWeight: 400,
                  }}
                >
                  {plumleyTestimonial.affiliation}
                </p>
              </footer>
            </blockquote>

            <div
              className="animate-in"
              style={{
                marginTop: '25px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
              }}
            >
              <Link
                href="/testimonials/"
                className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-700 ${focusRing}`}
                style={inlineLinkStyle}
              >
                <span>Read more testimonials</span>
                <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                  <IconChevronRight size={14} color="#008080" />
                </span>
              </Link>
              <Link
                href="/publications/"
                className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-700 ${focusRing}`}
                style={inlineLinkStyle}
              >
                <span>View all 800+ publications featuring ITL models</span>
                <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                  <IconChevronRight size={14} color="#008080" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeadingStyle, textAlign: 'center', marginBottom: '30px' }}
            >
              Frequently asked questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} idPrefix="breeding-faq" />
            </div>
          </div>
        </section>

        {/* Related services */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Related services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ ...cardHeadingStyle, fontSize: '1rem', marginBottom: '15px' }}>
                  Breeding and colony services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedBreedingServices.map((link) => (
                    <li key={link.href} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                          <IconChevronRight size={12} color="#2384da" />
                        </span>
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in">
                <h3 style={{ ...cardHeadingStyle, fontSize: '1rem', marginBottom: '15px' }}>
                  Related resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedResources.map((link) => (
                    <li key={link.href} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                          <IconChevronRight size={12} color="#2384da" />
                        </span>
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Get a breeding quote */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ ...sectionHeadingStyle, color: 'white' }}>
              Get a Breeding Quote
            </h2>
            <p
              className="animate-in"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '.95rem',
                lineHeight: '1.7rem',
                marginBottom: '25px',
              }}
            >
              Tell us the line, the genotype you need, how many animals, and when. A PhD scientist
              will return a scheme and a quote.
            </p>
            <div className="animate-in flex flex-wrap gap-4">
              <Link
                href="/cohort-consultation/?ref=breeding-foot#request-form"
                className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${focusRing}`}
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '.9rem',
                  fontWeight: 600,
                }}
              >
                <span>Get a Breeding Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/cohort-consultation/#schedule"
                className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${focusRing}`}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '12px 24px',
                  border: '2px solid white',
                  fontSize: '.9rem',
                  fontWeight: 600,
                }}
              >
                <span>Talk to a Scientist</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <StandardPageCtaStack
        slug="mouse-breeding-services"
        labSignalsTitle="Breeding and Colony Management Insights"
      />
      <UXUIDCFooter />

      {/* Schema.org structured data */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/mouse-model-services' },
          { name: 'Contract Mouse Breeding Services', path: '/mouse-breeding-services' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
