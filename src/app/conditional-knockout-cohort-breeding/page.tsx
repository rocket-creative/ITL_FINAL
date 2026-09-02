'use client';

import Link from 'next/link';

import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCDataTable from '@/components/UXUIDC/DataTable';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
import { StandardPageCtaStack } from '@/components/UXUIDC';
import {
  IconDNA,
  IconQuote,
  IconChevronRight,
  IconCheckCircle,
} from '@/components/UXUIDC/Icons';
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
import {
  buildServiceSchema,
  buildTechArticleSchema,
  buildFAQSchema,
} from '@/lib/seo/schemaBlocks';

const PAGE_PATH = '/conditional-knockout-cohort-breeding';
const PUBLISH_DATE = '2026-08-28';

// TODO(byline): named ITL PhD scientist + reviewer date. The E-E-A-T spec calls for a
// bylined author with a credential and bio link, plus a "Scientifically reviewed by" line.
// Schema attributes to the organization until Ops assigns a named scientist.

// TODO(ops): confirm whether ITL stocks common Cre driver lines or whether clients must
// supply them. This changes the Generation 1 copy materially, so no stocking claim is made.

// TODO(ops): supply preferred primary references for the maternal Cre effect and for
// germline Cre activity. Published without citations rather than with "studies show".

// TODO(ops): pull three to five real ITL publications involving conditional models from
// /publications/ for the credibility block. No citations invented here.

const heroData = {
  badge: 'Breeding and Cohorts',
  title: 'Conditional Knockout Cohort Breeding',
  intro:
    'A conditional knockout cohort requires a floxed allele, a Cre driver, and a cross path that produces homozygous floxed Cre-positive experimental animals alongside homozygous floxed Cre-negative littermate controls. More complex breeding schemes can require three generations or several months to produce a study-ready cohort.',
  description:
    'We design the scheme, check for linkage before pairing, run the crosses, genotype every animal, and deliver the experimental group and its controls together.',
};

const targetGenotypeGroups = [
  {
    label: 'Experimental',
    detail: 'homozygous floxed, Cre positive',
  },
  {
    label: 'Littermate control',
    detail: 'homozygous floxed, Cre negative',
  },
];

const crossPath = [
  {
    heading: 'Generation 1',
    body:
      'Cross a Cre driver line to the floxed line. Flox/+ crossed to Cre/+ produces compound heterozygotes carrying one floxed allele and the Cre transgene at an expected 50 percent.',
  },
  {
    heading: 'Generation 2',
    body:
      'Cross the compound heterozygote to a homozygous floxed animal. Flox/+ Cre/+ crossed to Flox/Flox produces the experimental genotype, Flox/Flox Cre/+, at an expected 25 percent, and the matched control genotype, Flox/Flox Cre negative, at an expected 25 percent. Half of the offspring are expected to be homozygous floxed.',
  },
  {
    heading: 'Generation 3',
    body:
      'Expand from confirmed Flox/Flox Cre/+ and Flox/Flox breeders to produce the cohort at scale, age matched to your study window.',
  },
];

const yieldColumns = [
  { key: 'cross', header: 'Cross', rowHeader: true },
  { key: 'experimental', header: 'Experimental yield, Flox/Flox Cre positive' },
  { key: 'control', header: 'Control yield, Flox/Flox Cre negative' },
  { key: 'notes', header: 'Notes' },
];

const yieldRows = [
  {
    cross: 'Flox/+ x Cre/+',
    experimental: '0 percent',
    control: '0 percent',
    notes: 'Generation 1 only, produces the compound heterozygote at 50 percent',
  },
  {
    cross: 'Flox/+ Cre/+ x Flox/Flox',
    experimental: '25 percent',
    control: '25 percent',
    notes: 'Recommended route, half of each litter usable',
  },
  {
    cross: 'Flox/+ Cre/+ x Flox/+ Cre/+',
    experimental: '12.5 percent',
    control: '12.5 percent',
    notes: 'Fewer lines to maintain, lower yield',
  },
  {
    cross: 'Flox/Flox Cre/+ x Flox/Flox',
    experimental: '50 percent',
    control: '50 percent',
    notes: 'Production cross once breeders are confirmed',
  },
  {
    cross: 'Any cross with linked loci',
    experimental: 'Frequency depends on parental haplotypes and recombination rate',
    control: 'Frequency depends on parental haplotypes and recombination rate',
    notes: 'Independent assortment does not apply',
  },
];

const breakingPoints = [
  {
    heading: '1. Linkage between the floxed allele and the Cre transgene',
    paragraphs: [
      'If the floxed locus and the Cre insertion site sit on the same chromosome, independent assortment does not apply. The expected frequency of the target genotype then depends on the parental haplotypes and recombination frequency. Programs that discover this after setting pairs lose a generation and sometimes a year.',
      'We check the chromosomal position of the Cre insertion against the floxed locus during scheme design. If they are linked, the scheme changes before any pair is set.',
    ],
  },
  {
    heading: '2. Cre transmitted through the wrong parent',
    paragraphs: [
      'Some Cre lines deposit maternal Cre protein or RNA in the oocyte, which can drive recombination in the early embryo regardless of the offspring genotype. The result can be unintended recombination in tissues or cells beyond the intended Cre expression pattern, and it may not be detected by a standard tail genotype.',
      'Where a driver has documented maternal effect, transmit Cre through the male. We set the scheme so the Cre carrying parent is the sire.',
    ],
  },
  {
    heading: '3. Germline recombination',
    paragraphs: [
      'Several tissue restricted Cre drivers show low level activity in the germline. Once recombination happens in a germ cell, the deleted allele is transmitted to the next generation as a constitutive null. That can alter the intended conditional genotype across generations.',
      'This is why breeding stock genotypes need a deleted allele assay, not only a flox assay. We include it.',
    ],
  },
  {
    heading: '4. Controls bred separately',
    paragraphs: [
      'Controls from a different colony, room, or shipment can differ in microbiome, handling, and background. Those differences can affect behavior, metabolism, and immune phenotypes. Controls should ideally come from the same crosses and the same room.',
    ],
  },
  {
    heading: '5. Assuming induction equals deletion',
    paragraphs: [
      'For tamoxifen inducible CreER systems, recombination efficiency varies by tissue, by dose, by age at induction, and between animals. Tamoxifen itself has biological effects, so appropriate vehicle-treated controls are important alongside genotype controls. Plan the cohort around the number of animals you will need after confirming the expected recombination efficiency.',
    ],
  },
];

const creDriverPoints = [
  'Expression pattern in your tissue of interest, confirmed by a reporter cross rather than assumed from the publication',
  'Off target expression in tissues that could confound the phenotype',
  'Constitutive versus inducible, and whether developmental deletion would be lethal or compensated',
  'Documented germline or maternal activity',
  'Chromosomal position relative to your floxed locus',
  'Availability, and whether the driver is a knockin at the endogenous locus or a random transgenic',
];

const genotypingAssays = [
  'Floxed allele assay distinguishing wild type, heterozygous, and homozygous floxed',
  'Cre assay confirming presence of the transgene',
  'Deleted allele assay detecting recombination that occurred where it should not have',
];

const bassonTestimonial = getTestimonialById('basson-kings')!;
const plumleyTestimonial = getTestimonialById('plumley-warren')!;

const testimonials = [
  {
    quote: bassonTestimonial.quote,
    name: formatAuthorWithCredentials(bassonTestimonial),
    affiliation: bassonTestimonial.affiliation,
  },
  {
    quote: plumleyTestimonial.quote,
    name: formatAuthorWithCredentials(plumleyTestimonial),
    affiliation: plumleyTestimonial.affiliation,
  },
];

const relatedServices = [
  { title: 'Mouse Breeding Services', href: '/mouse-breeding-services/' },
  { title: 'Mouse Cohort Development', href: '/mouse-cohort-development/' },
  { title: 'Mouse Genotyping Service', href: '/mouse-genotyping-service/' },
  { title: 'Cohort Consultation', href: '/cohort-consultation/' },
];

const relatedResources = [
  { title: 'Conditional Knockout Mouse Models', href: '/conditional-knockout-mouse-models/' },
  { title: 'Cre/loxP System Overview', href: '/cre-lox-system/' },
  { title: 'Flp/FRT System Overview', href: '/flp-frt-system/' },
  { title: 'Breeding Scheme Architect', href: '/breeding-scheme-architect/' },
];

const faqData = [
  {
    question: 'What genotype do I need for a conditional knockout experiment?',
    answer:
      'Homozygous floxed and Cre positive for the experimental group, homozygous floxed and Cre negative for the littermate control. Both groups carry the floxed allele so the comparison isolates gene deletion rather than the effect of the floxed allele.',
  },
  {
    question: 'How many generations does conditional knockout breeding take?',
    answer:
      'Two or more generations, depending on the starting genotypes and breeding scheme. Generation 1 crosses the Cre driver to the floxed line, generation 2 crosses the compound heterozygote to a homozygous floxed animal, and additional generations may be used to expand confirmed breeders to cohort scale. The total timeline varies with the breeding scheme and target study age.',
  },
  {
    question: 'What percentage of pups will have the experimental genotype?',
    answer:
      'Crossing Flox/+ Cre/+ to Flox/Flox yields the experimental genotype at an expected 25 percent and the matched control at an expected 25 percent. A double heterozygote intercross yields the experimental genotype at 12.5 percent. Both assume the floxed locus and the Cre insertion are unlinked.',
  },
  {
    question: 'What if my floxed allele and Cre driver are on the same chromosome?',
    answer:
      'Independent assortment no longer applies and the frequency of the target combination depends on the parental haplotypes and recombination frequency. Check the Cre insertion position against the floxed locus during scheme design and change the scheme before pairing.',
  },
  {
    question: 'Should Cre come from the mother or the father?',
    answer:
      'Transmit Cre through the male where the driver has documented maternal effect. Maternal Cre protein deposited in the oocyte can drive recombination in the early embryo independent of offspring genotype, producing deletion in unintended tissues that a tail genotype will not detect.',
  },
  {
    question: 'Do I need a deleted allele genotyping assay?',
    answer:
      'Yes for breeding stock. Some tissue restricted Cre drivers show low level germline activity, which can transmit a recombined allele to the next generation. A flox assay alone will not catch it.',
  },
  {
    question: 'What controls does a tamoxifen inducible study need?',
    answer:
      'Genotype controls, meaning homozygous floxed Cre negative littermates, plus vehicle treated controls, because tamoxifen has biological effects of its own. Recombination efficiency also varies by tissue, dose, age at induction, and animal, so confirm deletion before finalizing group sizes.',
  },
];

const serviceSchema = buildServiceSchema({
  name: 'Conditional Knockout Cohort Breeding',
  path: PAGE_PATH,
  serviceType: 'Conditional knockout breeding',
  alternateName: ['Flox Cre cross breeding', 'Conditional knockout cohort production'],
  description:
    'Breeding scheme design and cohort production for conditional knockout studies, including flox and Cre crosses, linkage checks, deleted allele genotyping, and matched littermate controls.',
  keywords:
    'conditional knockout breeding, flox Cre cross, conditional knockout cohort, littermate controls, Cre driver selection, floxed allele breeding scheme, Cre lox breeding strategy, tamoxifen inducible CreER',
  audienceType: 'Researcher',
});

const techArticleSchema = buildTechArticleSchema({
  headline: 'Conditional Knockout Cohort Breeding: Cross Paths, Yields, and Controls',
  path: PAGE_PATH,
  description:
    'How to plan a conditional knockout breeding scheme, including the three generation cross path, expected genotype frequencies, linkage between the floxed locus and the Cre insertion, maternal Cre effects, germline recombination, and control design.',
  datePublished: PUBLISH_DATE,
  dateModified: PUBLISH_DATE,
  dependencies:
    'Floxed allele, Cre driver line, PCR genotyping assays for flox, Cre, and deleted allele',
  about: ['Cre lox recombination', 'Conditional gene knockout', 'Mouse breeding scheme design'],
});

const faqSchema = buildFAQSchema(PAGE_PATH, faqData);

const sectionHeading = {
  color: '#2384da',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '15px',
} as const;

const cardHeading = {
  color: '#0a253c',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.1rem',
  fontWeight: 600,
  marginBottom: '10px',
} as const;

const bodyCopy = {
  color: '#555',
  fontSize: '.95rem',
  lineHeight: '1.7rem',
} as const;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600';

export default function ConditionalKnockoutCohortBreedingPage() {
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
              <IconDNA size={16} color="white" />
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
              }}
            >
              {heroData.description}
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <Link
                href="/cohort-consultation/?ref=ckob-hero#request-form"
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
                <span>Request a Breeding Scheme</span>
                <span aria-hidden="true">→</span>
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
              slug="conditional-knockout-cohort-breeding"
              utmMedium="page-hero"
              flush
            />
          </div>
        </section>

        {/* The target genotype */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeading}>
              The target genotype
            </h2>
            <p className="animate-in" style={{ ...bodyCopy, marginBottom: '25px' }}>
              For a standard conditional knockout study you need two groups from the same crosses:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '25px' }}>
              {targetGenotypeGroups.map((group) => (
                <div
                  key={group.label}
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
                    style={cardHeading}
                  >
                    {group.label}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {group.detail}
                  </p>
                </div>
              ))}
            </div>

            <p className="animate-in" style={bodyCopy}>
              Both carry the floxed allele. Only one carries the recombinase. That is what helps
              isolate the effect of gene deletion from the effect of the floxed allele itself.
            </p>
          </div>
        </section>

        {/* The cross path */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeading}>
              The cross path
            </h2>

            {/* Screen reader key for the genotype notation used from here on. */}
            <p className="sr-only">
              Genotype notation used below: Flox slash plus means one floxed allele and one wild
              type allele. Flox slash Flox means two floxed alleles, that is homozygous floxed. Cre
              slash plus means one copy of the Cre transgene. The letter x between two genotypes
              means crossed to.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: '25px' }}>
              {crossPath.map((generation) => (
                <div
                  key={generation.heading}
                  className="animate-in hover-card hover-card-teal group"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080',
                  }}
                >
                  <h3
                    className="card-title transition-colors duration-300 group-hover:text-teal-600"
                    style={cardHeading}
                  >
                    {generation.heading}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {generation.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="animate-in" style={bodyCopy}>
              Standard C57BL/6 reproductive parameters put gestation at 19 to 21 days, weaning at 21
              days, and breeding age at 6 to 8 weeks, so one generation runs about 10 to 12 weeks.
              Three generations plus growth to study age can span several months, depending on the
              starting genotypes and breeding scheme.
            </p>
          </div>
        </section>

        {/* Expected yields */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeading}>
              Expected yields
            </h2>

            <div className="animate-in" style={{ marginBottom: '25px' }}>
              <UXUIDCDataTable
                caption="Expected genotype frequencies for conditional knockout crosses, assuming the floxed locus and the Cre insertion are unlinked. Actual yields vary with litter size and fertility."
                columns={yieldColumns}
                rows={yieldRows}
              />
            </div>

            <p className="animate-in" style={bodyCopy}>
              The double heterozygote intercross looks efficient because it needs one fewer line,
              but it yields the experimental genotype at 12.5 percent rather than 25 percent. Halve
              again for a single sex requirement and you are holding a large number of animals to
              produce a small usable group. We recommend the Flox/+ Cre/+ crossed to Flox/Flox route
              whenever homozygous floxed breeders are available.
            </p>
          </div>
        </section>

        {/* Inline CTA band after the yields table */}
        <section style={{ backgroundColor: '#008080', padding: '40px 20px' }}>
          <div
            className="flex flex-wrap items-center justify-between gap-4"
            style={{ maxWidth: '1000px', margin: '0 auto' }}
          >
            <p
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                margin: 0,
              }}
            >
              Send us the floxed allele and the Cre driver, and we will return the cross path with
              expected yields.
            </p>
            <Link
              href="/cohort-consultation/?ref=ckob-yields#request-form"
              className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${focusRing}`}
              style={{
                backgroundColor: 'white',
                color: '#0a253c',
                padding: '10px 20px',
                fontSize: '.85rem',
                fontWeight: 600,
              }}
            >
              <span>Request a Breeding Scheme</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Five things that break conditional knockout breeding */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ ...sectionHeading, marginBottom: '30px' }}>
              Five things that break conditional knockout breeding
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {breakingPoints.map((point) => (
                <div
                  key={point.heading}
                  className="animate-in hover-card hover-card-teal group"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080',
                  }}
                >
                  <h3
                    className="card-title transition-colors duration-300 group-hover:text-teal-600"
                    style={cardHeading}
                  >
                    {point.heading}
                  </h3>
                  {point.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      style={{
                        color: '#555',
                        fontSize: '.9rem',
                        lineHeight: '1.6rem',
                        marginBottom: index === point.paragraphs.length - 1 ? 0 : '12px',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Choosing a Cre driver */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeading}>
              Choosing a Cre driver
            </h2>
            <p className="animate-in" style={{ ...bodyCopy, marginBottom: '20px' }}>
              Driver selection changes the biology of the experiment more than any other choice in
              the scheme. Points to settle before breeding:
            </p>

            <ul className="animate-in" style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
              {creDriverPoints.map((point) => (
                <li
                  key={point}
                  style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}
                >
                  <span aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                  </span>
                  <span style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <p className="animate-in" style={{ ...bodyCopy, marginBottom: '15px' }}>
              A reporter cross before the main scheme costs one generation and prevents a study
              built on a driver that does not do what the paper reported.
            </p>

            <Link
              href="/cre-lox-system/"
              className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
              style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
            >
              <span>See our Cre/loxP technology overview</span>
              <IconChevronRight size={14} color="#008080" />
            </Link>
          </div>
        </section>

        {/* Genotyping requirements */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeading}>
              Genotyping requirements
            </h2>
            <p className="animate-in" style={{ ...bodyCopy, marginBottom: '20px' }}>
              A conditional knockout colony typically requires three genotyping assays:
            </p>

            <ul className="animate-in" style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
              {genotypingAssays.map((assay) => (
                <li
                  key={assay}
                  style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}
                >
                  <span aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                  </span>
                  <span style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {assay}
                  </span>
                </li>
              ))}
            </ul>

            <p className="animate-in" style={{ ...bodyCopy, marginBottom: '15px' }}>
              We design and validate assays for new alleles, establish positive and negative
              controls, and document the protocol so your lab can run it after transfer.
            </p>

            <Link
              href="/mouse-genotyping-service/"
              className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
              style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
            >
              <span>See genotyping services</span>
              <IconChevronRight size={14} color="#008080" />
            </Link>
          </div>
        </section>

        {/* Plan your scheme */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeading}>
              Plan your scheme
            </h2>
            <p className="animate-in" style={{ ...bodyCopy, marginBottom: '20px' }}>
              The Breeding Scheme Architect calculates expected genotype ratios and generations to
              target for a single allele, at no cost and without an account. For two locus
              conditional schemes, send us the output and a scientist will extend it.
            </p>

            <Link
              href="/breeding-scheme-architect/?ref=ckob-cre"
              className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
              style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600 }}
            >
              <span>Try the Breeding Scheme Architect</span>
              <IconChevronRight size={14} color="#008080" />
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeading, textAlign: 'center', marginBottom: '40px' }}
            >
              What researchers say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="animate-in"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px' }} />
                  <p
                    style={{
                      color: '#555',
                      fontFamily: 'Lato, sans-serif',
                      fontSize: '.9rem',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      marginBottom: '20px',
                      flex: 1,
                    }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <p
                      style={{
                        color: '#333',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '.9rem',
                        fontWeight: 600,
                        marginBottom: '5px',
                      }}
                    >
                      — {testimonial.name}
                    </p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem' }}>
                      {testimonial.affiliation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
              <Link
                href="/testimonials/"
                className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Read more researcher testimonials</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <Link
                href="/publications/"
                className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>View all 800+ publications featuring ITL models</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeading, marginBottom: '30px', textAlign: 'center' }}
            >
              Frequently asked questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} idPrefix="ckob-faq" />
            </div>
          </div>
        </section>

        {/* Request a breeding scheme */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeading, color: 'white', marginBottom: '15px' }}
            >
              Request a breeding scheme
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
              Send us the floxed allele, the Cre driver, your target n, and your study date. A PhD
              scientist will return a cross path with expected yields, a pair count, and a schedule.
            </p>
            <Link
              href="/cohort-consultation/?ref=ckob-foot#request-form"
              className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${focusRing}`}
              style={{
                backgroundColor: 'white',
                color: '#0a253c',
                padding: '12px 24px',
                fontSize: '.9rem',
                fontWeight: 600,
              }}
            >
              <span>Request a Breeding Scheme</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Related links */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ ...sectionHeading, marginBottom: '30px' }}>
              Related services and resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ ...cardHeading, fontSize: '1rem', marginBottom: '15px' }}>
                  Related Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedServices.map((link) => (
                    <li key={link.href} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
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
                <h3 style={{ ...cardHeading, fontSize: '1rem', marginBottom: '15px' }}>
                  Related Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedResources.map((link) => (
                    <li key={link.href} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 ${focusRing}`}
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

      <StandardPageCtaStack
        slug="conditional-knockout-cohort-breeding"
        labSignalsTitle="Conditional Knockout Breeding Insights"
      />
      <UXUIDCFooter />

      {/* Schema.org structured data, one node per script */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/mouse-model-services' },
          { name: 'Conditional Knockout Cohort Breeding', path: PAGE_PATH },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
