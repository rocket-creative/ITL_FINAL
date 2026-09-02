'use client';

import Link from 'next/link';

import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCDataTable from '@/components/UXUIDC/DataTable';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import { StandardPageCtaStack } from '@/components/UXUIDC';
import {
  IconUsers,
  IconCheckCircle,
  IconChevronRight,
  IconQuote,
} from '@/components/UXUIDC/Icons';
import { buildServiceSchema, buildFAQSchema } from '@/lib/seo/schemaBlocks';
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

// TODO(byline): named ITL PhD scientist with title and credential, linked to a bio page,
// plus a "Scientifically reviewed by" line with a review date. No author is published
// until Ops assigns one, so the page is attributed to the organization in schema.

const PAGE_PATH = '/mouse-cohort-development';

const heroData = {
  eyebrow: 'Breeding and Cohorts',
  title: 'Mouse Cohort Development Services',
  snippet:
    'Ingenious targeting laboratory generates study ready mouse cohorts to your specification: age matched within a defined window, with specified male/female representation, genotype verified, and delivered with littermate controls on a schedule set by your experiment. U.S. based facility, C57BL/6 backgrounds, PhD oversight at every stage.',
  body:
    'Since 1998 we have generated 2,800+ custom genetically engineered mouse models, serving 900+ laboratories. Cohort development is the step between having a line and running a study. It is where most timelines slip.',
};

const definitionParagraphs = [
  'Mouse cohort development is the planned breeding of a genetically engineered line to produce a defined number of animals meeting specified requirements for genotype, age, and sex. It encompasses breeding scheme design, breeding pair or trio setup and management, genotyping, weaning, age synchronization, and documentation for study use.',
  'Colony management keeps a line alive. Cohort development produces the animals your protocol calls for. Most research programs need both, and we scope them together.',
];

const breakdownModes = [
  {
    name: 'Staggered cohorts',
    description:
      'Animals are delivered in small groups over several weeks, leaving the study cohort with a wider age range than intended. In studies where age can influence the phenotype or experimental response, that variation introduces an additional biological variable and can complicate interpretation and experimental reproducibility.',
  },
  {
    name: 'Low genotype yield',
    description:
      'Complex genotypes can occur at low expected frequencies. For example, an intercross between double heterozygotes can produce a double-homozygous target genotype at an expected frequency of 1/16 when the two loci assort independently. When the required genotype is further constrained by sex, the number of study-eligible animals per litter can be small. Breeding plans based on total litter numbers rather than expected genotype yield can therefore fall short of the required cohort size.',
  },
  {
    name: 'Linkage',
    description:
      'When a floxed allele and a Cre driver are located on the same chromosome, they do not assort independently. If the desired allele combination requires recombination between the loci, its frequency depends on the recombination rate between them and can be substantially lower than the frequencies predicted for independently assorting loci. We check locus positions during breeding-scheme design, before pairs are established.',
  },
  {
    name: 'Genetic drift and colony quality',
    description:
      'Genetic drift can accumulate over generations in independently maintained breeding colonies and may introduce genetic variation that affects phenotype and reproducibility. Appropriate colony management, genetic background monitoring, and periodic refreshment of breeding stocks can help maintain genetic consistency across cohorts and over time.',
  },
];

const buildSteps = [
  {
    name: 'Step 1. Breeding scheme design',
    description:
      'A PhD scientist reviews your allele, target genotype, control genotype, and study start date. We map the most efficient breeding path, check for linkage, and calculate how many breeding pairs are required based on expected genotype yield.',
  },
  {
    name: 'Step 2. Parallel breeding pair setup',
    description:
      'Rather than breeding one pair and waiting, we establish multiple breeding pairs simultaneously and stagger breeding starts so litters are produced within a narrow, defined window. This approach helps generate a synchronized cohort with the required number of study-eligible animals.',
  },
  {
    name: 'Step 3. Genotyping and selection',
    description:
      'Pups are genotyped using a validated PCR assay at weaning. Animals matching the experimental genotype and littermate control genotype are selected and tracked. Assay development is available for new or complex alleles.',
  },
  {
    name: 'Step 4. Age synchronization and release',
    description:
      'Selected animals are held to your target age window, with male/female composition specified according to your protocol, and released as one cohort with genotype documentation and health certification.',
  },
];

// TODO(ops): confirm in writing (a) the tightest age window ITL will commit to, (b) the largest
// single cohort delivered to date, and (c) genotyping turnaround in business days. All three are
// unpublished today, so no number appears in this list. Add them here once Ops confirms.
const cohortSpecifications = [
  'Target genotype and littermate control genotype, both confirmed by PCR',
  'Age matched delivery within a window you define',
  'Male/female composition specified according to your protocol, including balanced or single-sex groups',
  'Defined C57BL/6 background, with BALB/c and 129 available on request',
  'Multi allele and compound genotypes, including conditional systems',
  'Genotyping records, breeding pedigree, and health certification with shipment',
  'Staged release for longitudinal studies that enroll in waves',
];

const crossYieldRows = [
  {
    cross: 'Het x Het',
    target: 'Homozygous',
    frequency: '25 percent',
    notes: 'Classic intercross, also yields 50 percent het',
  },
  {
    cross: 'Het x Homozygous',
    target: 'Homozygous',
    frequency: '50 percent',
    notes: 'Faster route when homozygotes are fertile',
  },
  {
    cross: 'Flox/+ Cre/+ × Flox/Flox Cre−/−',
    target: 'Flox/Flox Cre/+',
    frequency: '25 percent',
    notes: 'Littermate control Flox/Flox Cre−/− also at 25 percent',
  },
  {
    cross: 'Flox/+ Cre/+ x Flox/+ Cre/+',
    target: 'Flox/Flox Cre/+',
    frequency: '12.5 percent',
    notes: 'Unlinked loci only',
  },
  {
    cross: 'Any cross, linked loci',
    target: 'Target combination',
    frequency: 'Varies',
    notes:
      'Expected frequency depends on parental haplotypes and recombination rate; check locus positions first',
  },
];

const saidTestimonial = getTestimonialById('said-uci')!;

const testimonials = [
  {
    quote: saidTestimonial.quote,
    name: formatAuthorWithCredentials(saidTestimonial),
    affiliation: saidTestimonial.affiliation,
  },
];

const faqData = [
  {
    question: 'What is a study ready mouse cohort?',
    answer:
      'A study ready cohort is a group of mice confirmed at the required genotype, matched within a defined age window, balanced or selected by sex, accompanied by littermate controls, and delivered with genotype and health documentation so the animals can enter a protocol without further screening.',
  },
  {
    question: 'How many breeding pairs do I need for my cohort?',
    answer:
      'Pair count depends on target genotype frequency, litter size, and your delivery window. For a cross yielding the target at 25 percent, plan on roughly four weaned pups per usable animal, then halve again if you need a single sex. Our Breeding Scheme Architect gives a starting estimate and our scientists refine it against your allele.',
  },
  {
    question: 'How long does mouse cohort development take?',
    answer:
      'One generation runs about 10 to 12 weeks from pairing to weaned, genotyped pups. Single allele cohorts from an existing colony can be produced in one to two generations. Conditional knockout cohorts requiring a Cre cross and a homozygous flox may require multiple generations, with the total timeline determined by the starting genotypes, breeding scheme, and target study age.',
  },
  {
    question: 'Can you deliver age matched cohorts in waves?',
    answer:
      'Yes. Longitudinal and multi arm studies often enroll in blocks. We schedule pair rotation so each block lands inside its own age window rather than delivering one oversized group.',
  },
  {
    question: 'Do you provide littermate controls?',
    answer:
      'Yes. Controls are bred from the same crosses, housed in the same room, and released on the same schedule as the experimental animals.',
  },
  {
    question: 'What backgrounds do you work with?',
    answer:
      'C57BL/6 is our primary background. BALB/c and 129 are available on request. Backcrossing is available for lines arriving on a mixed background.',
  },
  {
    question: 'What happens if my line breeds poorly?',
    answer:
      'We review pair productivity after the first two litters and adjust the scheme. Options include increasing pair count, rotating males, and rederiving the line. Talk to us early if your line already has a known fertility problem.',
  },
];

const relatedServices = [
  { title: 'Mouse Genotyping Service', href: '/mouse-genotyping-service/' },
  { title: 'Backcrossing Services', href: '/backcrossing-services/' },
  { title: 'Cryopreservation Services', href: '/cryopreservation-services/' },
  { title: 'Rederivation Services', href: '/rederivation-services/' },
  {
    title: 'Conditional Knockout Cohort Breeding',
    href: '/conditional-knockout-cohort-breeding/',
  },
];

const relatedResources = [
  { title: 'Breeding Scheme Architect', href: '/breeding-scheme-architect/' },
  {
    title: 'In House vs Outsourced Mouse Breeding',
    href: '/in-house-vs-outsourced-mouse-breeding/',
  },
  { title: 'Publications featuring ITL models', href: '/publications/' },
  { title: 'Researcher testimonials', href: '/testimonials/' },
];

const serviceSchema = buildServiceSchema({
  name: 'Mouse Cohort Development Services',
  path: PAGE_PATH,
  serviceType: 'Mouse cohort development',
  alternateName: ['Experimental mouse cohort generation', 'Age matched mouse cohorts'],
  description:
    'Planned breeding of genetically engineered mouse lines to produce age matched, sex balanced, genotype verified experimental cohorts with littermate controls, delivered on a defined study timeline.',
  keywords:
    'mouse cohort development, age matched mouse cohorts, experimental cohort generation, genotype verified cohorts, sex balanced cohorts, littermate controls, preclinical mouse cohort scaling, synchronized cohort breeding',
  audienceType: 'Biomedical researchers, preclinical drug discovery teams, academic laboratories',
  offerCatalogName: 'Cohort development options',
  offerCatalog: [
    { name: 'Age matched cohort production' },
    { name: 'Multi allele and compound genotype cohorts' },
    { name: 'Littermate control production' },
    { name: 'Staged cohort release for longitudinal studies' },
  ],
});

const faqSchema = buildFAQSchema(PAGE_PATH, faqData);

const sectionHeadingStyle = {
  color: '#2384da',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '15px',
} as const;

const cardHeadingStyle = {
  color: '#0a253c',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.1rem',
  fontWeight: 600,
  marginBottom: '10px',
} as const;

const bodyStyle = {
  color: '#555',
  fontSize: '.95rem',
  lineHeight: '1.7rem',
} as const;

const inlineLinkClass =
  'inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0a253c]';

export default function MouseCohortDevelopmentPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero Section */}
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
              <IconUsers size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>
                {heroData.eyebrow}
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
                href="/cohort-consultation/?ref=cohort-dev-hero#request-form"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  minWidth: '160px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>Request a Cohort Plan</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/cohort-consultation/#schedule"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
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
                <span aria-hidden="true">→</span>
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
            <CatalogCustomDualCta
              headingLevel={2}
              slug="mouse-cohort-development"
              utmMedium="page-hero"
              flush
            />
          </div>
        </section>

        {/* What is mouse cohort development? */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              What is mouse cohort development?
            </h2>
            {definitionParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="animate-in"
                style={{ ...bodyStyle, marginBottom: '15px' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Where cohorts break down */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ ...sectionHeadingStyle, marginBottom: '30px' }}>
              Where cohorts break down
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {breakdownModes.map((mode, index) => (
                <div
                  key={index}
                  className="animate-in hover-card hover-card-teal group"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080',
                  }}
                >
                  <h3
                    className="card-title transition-colors duration-300 group-hover:text-teal-600"
                    style={cardHeadingStyle}
                  >
                    {mode.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {mode.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How we build a synchronized cohort */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ ...sectionHeadingStyle, marginBottom: '30px' }}>
              How we build a synchronized cohort
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buildSteps.map((step, index) => (
                <div
                  key={index}
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
                    {step.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cohort specifications we deliver */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ ...sectionHeadingStyle, marginBottom: '30px' }}>
              Cohort specifications we deliver
            </h2>
            <ul className="animate-in" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {cohortSpecifications.map((spec, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '14px',
                  }}
                >
                  <span style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true">
                    <IconCheckCircle size={18} color="#008080" />
                  </span>
                  <span style={bodyStyle}>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mid page CTA band */}
        <section style={{ backgroundColor: '#008080', padding: '48px 20px' }}>
          <div
            style={{
              maxWidth: '1000px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                margin: 0,
                maxWidth: '620px',
              }}
            >
              Send us your allele, target genotype, required n, and study start date, and a PhD
              scientist will return a breeding scheme and a schedule.
            </p>
            <Link
              href="/cohort-consultation/?ref=cohort-dev-mid#request-form"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              style={{
                backgroundColor: 'white',
                color: '#0a253c',
                padding: '12px 22px',
                fontSize: '.9rem',
                fontWeight: 600,
              }}
            >
              <span>Request a Cohort Plan</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Expected genotype yields */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Expected genotype yields
            </h2>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '25px' }}>
              These are expected Mendelian frequencies for unlinked loci. Actual yields vary with
              litter size, fertility, and, for linked loci, recombination frequency. We plan pair
              counts based on these expected frequencies and adjust the breeding strategy as needed
              based on early litter and genotype results.
            </p>

            <UXUIDCDataTable
              className="animate-in"
              caption="Expected genotype frequencies for unlinked loci. Actual yields vary with litter size, fertility, and linkage."
              columns={[
                { key: 'cross', header: 'Cross', rowHeader: true },
                { key: 'target', header: 'Target genotype' },
                { key: 'frequency', header: 'Expected frequency' },
                { key: 'notes', header: 'Notes' },
              ]}
              rows={crossYieldRows}
            />

            <p className="animate-in" style={{ ...bodyStyle, marginTop: '25px' }}>
              For C57BL/6 mice, gestation is approximately 19&ndash;21 days, weaning typically
              occurs at about 21 days, and breeding generally begins at approximately 6&ndash;8
              weeks of age, depending on strain, sex, and colony conditions. A single generation
              typically requires several weeks from mating through weaning and selection of
              breeders. A three-generation breeding scheme to generate a homozygous conditional
              genotype can require several months, with the total timeline shaped by the starting
              genotypes, breeding strategy, genotype yield, and target study age.
            </p>

            <p className="animate-in" style={{ marginTop: '20px' }}>
              <Link
                href="/breeding-scheme-architect/?ref=cohort-dev-yields"
                className={inlineLinkClass}
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600 }}
              >
                <span>Try the Breeding Scheme Architect</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
            </p>
          </div>
        </section>

        {/* Littermate controls */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Littermate controls
            </h2>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '15px' }}>
              A cohort without proper controls is an incomplete deliverable. For conditional
              knockout work we breed and hold the Cre negative floxed littermates alongside the
              experimental animals, from the same crosses, in the same room, on the same schedule.
              Controls sourced from a separate colony introduce differences in microbiome, handling,
              and background that show up in your data.
            </p>
            <p className="animate-in">
              <Link
                href="/conditional-knockout-cohort-breeding/"
                className={inlineLinkClass}
                style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>See how we breed conditional knockout cohorts</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
            </p>
          </div>
        </section>

        {/* Genotyping and documentation */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Genotyping and documentation
            </h2>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '15px' }}>
              Every animal released is genotype confirmed by PCR. For new alleles we design primers,
              optimize the assay, establish positive and negative controls, and document the
              protocol so your lab can run it after transfer.
            </p>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '15px' }}>
              Each cohort ships with a genotype report, a breeding record, and a health report.
            </p>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '15px' }}>
              The value of that oversight is documented in the peer reviewed literature: VanDenBerg
              KR, Oravecz-Wilson K, Krolikowski L, Hill V, Reddy P, Freeman ZT.{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9340497/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors duration-300 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0a253c]"
                style={{ color: '#2384da' }}
              >
                Impact of Automated Genotyping and Increased Breeding Oversight on Overall Mouse
                Breeding Colony Productivity
              </a>
              . Frontiers in Physiology, 2022. PMID 35923239.
            </p>
            <p className="animate-in">
              <Link
                href="/mouse-genotyping-service/"
                className={inlineLinkClass}
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn about our genotyping service</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
            </p>
          </div>
        </section>

        {/* Health status and transfer */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Health status and transfer
            </h2>
            {/* TODO(ops): confirm the facility's actual accreditation status (the colony management
                page currently hedges with "AAALAC accredited or equivalent standards") and confirm
                the quarantine duration for incoming lines. Until then no accreditation claim and no
                quarantine duration is published here. */}
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '15px' }}>
              All cohort breeding and holding takes place at our own facility in Holbrook, New York.
              Our facility operates under barrier conditions with HEPA filtered caging, autoclaved
              bedding and feed, controlled access, and routine sentinel testing for common murine
              pathogens. Incoming lines are quarantined and health tested before entering the main
              colony. Lines can arrive as live animals with health certification or as{' '}
              <Link
                href="/cryopreservation-services/"
                className="underline transition-colors duration-300 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0a253c]"
                style={{ color: '#2384da' }}
              >
                cryopreserved material
              </Link>
              .
            </p>
            <p className="animate-in">
              <Link
                href="/rederivation-services/"
                className={inlineLinkClass}
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn about rederivation for incoming lines</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
            </p>
          </div>
        </section>

        {/* Backgrounds and reproducibility */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Backgrounds and reproducibility
            </h2>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '15px' }}>
              Cohorts are generated on a defined C57BL/6 genetic background to support consistency
              across replicates, sites, and studies. For lines arriving on a mixed genetic
              background, backcrossing progressively increases the proportion of the recipient
              background, with theoretical expectations of approximately 97% by N5 and more than 99%
              by N10. At sufficient backcross generations, the resulting line can be considered
              congenic.
            </p>
            <p className="animate-in">
              <Link
                href="/backcrossing-services/"
                className={inlineLinkClass}
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn about backcrossing</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
            </p>
          </div>
        </section>

        {/* Plan your cohort before you commit */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Plan your cohort before you commit
            </h2>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '15px' }}>
              Our Breeding Scheme Architect calculates expected genotype frequencies and the number
              of generations required to obtain a target genotype for a single allele. The tool is
              available at no cost and without an account. Use the results to estimate breeding
              requirements, then send us the output for review against expected colony performance.
            </p>
            <p className="animate-in">
              <Link
                href="/breeding-scheme-architect/"
                className={inlineLinkClass}
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600 }}
              >
                <span>Try the Breeding Scheme Architect</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
            </p>
            <p className="animate-in" style={{ marginTop: '15px' }}>
              <Link
                href="/in-house-vs-outsourced-mouse-breeding/"
                className={inlineLinkClass}
                style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Compare in house and outsourced mouse breeding</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
            </p>
          </div>
        </section>

        {/* What researchers say */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeadingStyle, textAlign: 'center', marginBottom: '40px' }}
            >
              What researchers say
            </h2>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="animate-in"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '48px 56px',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                }}
              >
                <IconQuote
                  size={24}
                  color="#008080"
                  style={{ display: 'block', margin: '0 auto 15px' }}
                />
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
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p
                    style={{
                      color: '#333',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '.9rem',
                      fontWeight: 600,
                      marginBottom: '5px',
                    }}
                  >
                    &mdash; {testimonial.name}
                  </p>
                  <p
                    style={{
                      color: '#666',
                      fontFamily: 'Lato, sans-serif',
                      fontSize: '.8rem',
                      fontWeight: 400,
                    }}
                  >
                    {testimonial.affiliation}
                  </p>
                </div>
              </div>
            ))}

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
                className={inlineLinkClass}
                style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Read more testimonials</span>
                <IconChevronRight size={14} color="currentColor" />
              </Link>
              <Link
                href="/publications/"
                className={inlineLinkClass}
                style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>View all 800+ publications featuring ITL models</span>
                <IconChevronRight size={14} color="currentColor" />
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
              <UXUIDCAnimatedFAQ
                faqs={faqData}
                idPrefix="cohort-dev-faq"
                backgroundColor="#f8f9fa"
              />
            </div>
          </div>
        </section>

        {/* Start your cohort plan */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}
            >
              Start your cohort plan
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
              Send us your allele, your target genotype, your required n, and your study start date.
              A PhD scientist will return a breeding scheme and a schedule.
            </p>
            <Link
              href="/cohort-consultation/?ref=cohort-dev-foot#request-form"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              style={{
                backgroundColor: 'white',
                color: '#0a253c',
                padding: '12px 22px',
                fontSize: '.9rem',
                fontWeight: 600,
              }}
            >
              <span>Request a Cohort Plan</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Related Links */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '15px',
                  }}
                >
                  Related Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedServices.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className={inlineLinkClass}
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="currentColor" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in">
                <h3
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '15px',
                  }}
                >
                  Related Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedResources.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className={inlineLinkClass}
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="currentColor" />
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

      <StandardPageCtaStack
        slug="mouse-cohort-development"
        labSignalsTitle="Cohort and Breeding Insights"
      />
      <UXUIDCFooter />

      {/* Schema.org structured data, one node per script tag */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/mouse-model-services' },
          { name: 'Mouse Cohort Development', path: '/mouse-cohort-development' },
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
