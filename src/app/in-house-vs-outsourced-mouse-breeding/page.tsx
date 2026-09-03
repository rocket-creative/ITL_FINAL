'use client';

import Link from 'next/link';

import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCDataTable from '@/components/UXUIDC/DataTable';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import { StandardPageCtaStack } from '@/components/UXUIDC';
import {
  IconBookOpen,
  IconCheckCircle,
  IconChevronRight,
  IconExternalLink,
  IconShield,
} from '@/components/UXUIDC/Icons';
import { buildArticleSchema, buildFAQSchema } from '@/lib/seo/schemaBlocks';

const PAGE_PATH = '/in-house-vs-outsourced-mouse-breeding';

// Hero
const heroData = {
  badge: 'Guide',
  title: 'In House Breeding vs Outsourced Colony Management',
  snippet:
    'Keep breeding in house when the colony is small, the genotype is simple, and your vivarium has spare capacity. Outsource when cage space is the constraint, when the scheme runs three or more generations, when a fixed study date is at risk, or when losing the line would cost more than a year of work.',
  description:
    'This guide compares the two models on cost, timing, genetic integrity, and risk. It includes a worksheet you can run against your own institutional rates.',
};

// Verified reference. Confirmed against NCBI: DOI 10.3389/fphys.2022.925784,
// PMID 35923239, PMCID PMC9340497.
const citation = {
  title:
    'Impact of Automated Genotyping and Increased Breeding Oversight on Overall Mouse Breeding Colony Productivity',
  authors:
    'VanDenBerg KR, Oravecz-Wilson K, Krolikowski L, Hill V, Reddy P, Freeman ZT',
  journal: 'Frontiers in Physiology',
  year: '2022',
  identifiers: 'DOI 10.3389/fphys.2022.925784 · PMID 35923239 · PMCID PMC9340497',
  url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9340497/',
};

// Comparison table. Cell text is deliberately self contained, with no pronouns
// that depend on the row above, because this block gets extracted by AI answer
// engines. Neither column is shaded, so no meaning rests on color alone.
const compareColumns = [
  { key: 'factor', header: 'Factor', rowHeader: true },
  { key: 'inHouse', header: 'In house breeding' },
  { key: 'outsourced', header: 'Outsourced colony management' },
];

const compareRows = [
  {
    factor: 'Cage space',
    inHouse:
      'Occupies your vivarium allocation, including non experimental animals',
    outsourced: 'Frees your allocation for active experiments',
  },
  {
    factor: 'Direct cost',
    inHouse:
      'Per diem on every cage plus technician hours plus genotyping reagents',
    outsourced: 'Service fee plus animals produced',
  },
  {
    factor: 'Cost visibility',
    inHouse: 'Spread across per diem, salary, and supply budgets',
    outsourced: 'Quoted per project, easier to attribute to a grant',
  },
  {
    factor: 'Cohort timing',
    inHouse:
      'Often a trickle across several weeks, limited by available racks',
    outsourced:
      'Synchronized block when parallel pairs can be set at once',
  },
  {
    factor: 'Cohort uniformity',
    inHouse: 'Wide age range unless spare capacity allows parallel pairs',
    outsourced: 'Age matched inside a defined window',
  },
  {
    factor: 'Genotyping',
    inHouse: 'Run between other tasks, turnaround varies',
    outsourced: 'Validated assays with controls, defined turnaround',
  },
  {
    factor: 'Complex schemes',
    inHouse:
      'Tracking multi allele pedigrees adds error risk across generations',
    outsourced: 'Dedicated pedigree tracking and scheme design',
  },
  {
    factor: 'Genetic integrity',
    inHouse:
      'Depends on local pair rotation and background verification practice',
    outsourced: 'Structured rotation and background verification',
  },
  {
    factor: 'Health status',
    inHouse: 'Tied to your facility status',
    outsourced:
      'Barrier facility, sentinel testing, health certification on shipment',
  },
  {
    factor: 'Responsiveness',
    inHouse: 'Same day access to animals',
    outsourced: 'Requires scheduling and shipping lead time',
  },
  {
    factor: 'Continuity',
    inHouse: 'Vulnerable to staff turnover, holidays, funding gaps',
    outsourced: 'Continuous, contracted',
  },
  {
    factor: 'Control',
    inHouse: 'Full and immediate',
    outsourced: 'Contracted, with monthly reporting',
  },
  {
    factor: 'Institutional friction',
    inHouse: 'None',
    outsourced:
      'Transfer approvals, health certification, shipping logistics',
  },
];

// Cost worksheet. Static table, not a calculator. The right hand column is
// intentionally empty; each empty cell carries a visually hidden label so the
// column is not announced as an unexplained blank.
const emptyFigureCell = (
  <span className="sr-only">Your figure, to be completed</span>
);

const costColumns = [
  { key: 'line', header: 'Cost line', rowHeader: true },
  { key: 'method', header: 'How to calculate' },
  { key: 'figure', header: 'Your figure' },
];

const costRows = [
  {
    line: 'Cage per diem, breeding cages',
    method: 'Institutional per diem x breeding cages x days',
    figure: emptyFigureCell,
  },
  {
    line: 'Cage per diem, holding cages',
    method:
      'Institutional per diem x cages holding non experimental animals x days',
    figure: emptyFigureCell,
  },
  {
    line: 'Technician hours',
    method:
      'Hours per week on pairing, weaning, sampling x loaded hourly rate x weeks',
    figure: emptyFigureCell,
  },
  {
    line: 'Genotyping',
    method:
      'Reagents plus instrument time plus hands on hours per animal x animals genotyped',
    figure: emptyFigureCell,
  },
  {
    line: 'Animals bred and not used',
    method:
      'Total weaned minus experimental animals minus littermate controls, costed at per diem to weaning',
    figure: emptyFigureCell,
  },
  {
    line: 'Cost of a missed study date',
    method: 'Grant period, staff time, or delayed publication',
    figure: emptyFigureCell,
  },
  {
    line: 'Cost of losing the line',
    method: 'Regeneration or repurchase plus elapsed time',
    figure: emptyFigureCell,
  },
];

const keepInHouse = [
  'The colony is small and the genotype is simple',
  'Your vivarium has spare cage capacity',
  'You need same day access to animals for opportunistic experiments',
  'Your institution restricts external animal transfers',
  'Trainees need colony management experience as part of their program',
];

const whenToOutsource = [
  'Cage space is your binding constraint',
  'The scheme runs three or more generations to the target genotype',
  'A fixed study start date or grant deadline is at risk',
  'You need a large synchronized cohort rather than a steady trickle',
  'Genotyping is being run between other tasks and results are slow',
  'The line is irreplaceable and has no cryopreserved backup',
  'Technician turnover has already interrupted breeding once',
];

// Related Resources. Every outbound link from the doc's Internal Linking Map.
const relatedServices = [
  { title: 'Mouse Breeding Services', href: '/mouse-breeding-services/' },
  { title: 'Mouse Cohort Development', href: '/mouse-cohort-development/' },
  {
    title: 'Conditional Knockout Cohort Breeding',
    href: '/conditional-knockout-cohort-breeding/',
  },
  { title: 'Cryopreservation Services', href: '/cryopreservation-services/' },
];

const relatedResources = [
  { title: 'Backcrossing Services', href: '/backcrossing-services/' },
  { title: 'Mouse Genotyping Service', href: '/mouse-genotyping-service/' },
  { title: 'Breeding Scheme Architect', href: '/breeding-scheme-architect/' },
  { title: 'Get a Breeding Quote', href: '/cohort-consultation/' },
];

// FAQ. Visible copy and FAQPage schema are generated from the same array so the
// markup and the structured data cannot drift apart.
const faqData = [
  {
    question: 'Should I outsource my mouse colony management?',
    answer:
      'Outsource when cage space is your binding constraint, when the breeding scheme runs three or more generations, when a fixed study date is at risk, or when the line is irreplaceable and has no backup. Keep breeding in house when the colony is small, the genotype is simple, and your vivarium has spare capacity.',
  },
  {
    question: 'Is outsourced mouse breeding cheaper than in house?',
    answer:
      'Not always, and unit price is the wrong comparison. In house cost includes per diem on every cage, technician hours, genotyping reagents, and the animals you breed and never use. Run those four lines against a service quote before deciding.',
  },
  {
    question: 'What is a trickle cohort?',
    answer:
      'A trickle cohort is a group of experimental animals born in small batches across several weeks, producing a wide age range within one study group. The age spread becomes an uncontrolled variable, most visibly in behavioral, metabolic, and oncology work.',
  },
  {
    question: 'Will outsourcing protect my line from loss?',
    answer:
      'Outsourcing can reduce the operational risks of maintaining a line in house, but it does not eliminate the possibility of loss. The strongest protection is to maintain a cryopreserved backup separately from the live colony, whether the line is maintained in house or through a commercial facility.',
  },
  {
    question: 'Can I outsource genotyping without outsourcing breeding?',
    answer:
      'Yes, and it is a common first step. Published work comparing in house practice against outsourced genotyping found higher cage and animal production in the outsourced groups.',
  },
  {
    question: 'How long does a full backcross to congenic take?',
    answer:
      'Ten generations at roughly 10 to 12 weeks each, so about two years of continuous breeding and cage space.',
  },
];

const articleSchema = buildArticleSchema({
  headline: 'In House Breeding vs Outsourced Colony Management',
  path: PAGE_PATH,
  description:
    'A comparison of in house vivarium breeding against outsourced colony management for genetically engineered mouse lines, covering cost, cohort timing, genetic integrity, and risk, with a cost worksheet.',
  datePublished: '2026-08-28',
  dateModified: '2026-08-28',
  // author intentionally omitted so the builder attributes the guide to the
  // organization. See TODO(byline) in the disclosure section below.
  keywords:
    'in house vs outsourced mouse breeding, mouse colony management cost, should I outsource mouse breeding, genetic drift mouse colony, trickle cohort, vivarium cage space',
  about: ['Mouse colony management', 'Laboratory animal breeding'],
  citation: { name: citation.title, url: citation.url },
});

const faqSchema = buildFAQSchema(PAGE_PATH, faqData);

const sectionHeadingStyle = {
  color: '#2384da',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '15px',
} as const;

const subHeadingStyle = {
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

const ctaButtonClass =
  'inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const ctaButtonStyle = {
  backgroundColor: '#008080',
  color: 'white',
  padding: '12px 24px',
  fontSize: '.9rem',
  fontWeight: 600,
  borderRadius: '4px',
} as const;

const inlineLinkClass =
  'underline transition-colors duration-300 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const inlineLinkStyle = { color: '#00686b', fontWeight: 500 } as const;

export default function InHouseVsOutsourcedMouseBreedingPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero. No CTA buttons here: the doc caps this guide at two in-body
            CTAs, after "How ingenious targeting laboratory fits" and at the
            page foot. */}
        <section
          className="page-hero"
          style={{
            background:
              'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
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

          <div
            style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}
          >
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
              <IconBookOpen size={16} color="white" />
              <span
                style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}
              >
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
                marginBottom: 0,
              }}
            >
              {heroData.description}
            </p>
          </div>
        </section>

        {/* Publisher disclosure. The doc requires stating plainly that this
            comparison is published by a vendor of one of the two models. */}
        <section
          style={{
            backgroundColor: '#f5f5f4',
            padding: '28px 20px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* TODO(byline): named ITL PhD scientist with credentials + bio link, and reviewer name + review date */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <span style={{ flexShrink: 0, marginTop: '2px' }}>
                <IconShield size={18} color="#00686b" />
              </span>
              <p
                style={{
                  color: '#444',
                  fontSize: '.85rem',
                  lineHeight: '1.6rem',
                  margin: 0,
                }}
              >
                <strong style={{ color: '#0a253c' }}>Publisher disclosure.</strong>{' '}
                This guide is published by ingenious targeting laboratory, a
                commercial provider of contract mouse breeding and colony
                management. We sell one of the two models compared on this page.
                We do not name or rank other providers here; the comparison is
                between the two operating models.
              </p>
            </div>
          </div>
        </section>

        {/* The two models */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              The two models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div
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
                  style={subHeadingStyle}
                >
                  In house breeding
                </h3>
                <p style={{ ...bodyStyle, fontSize: '.9rem' }}>
                  Your line lives in your institutional vivarium. Your staff set
                  pairs, wean, sample, and genotype. You pay per diem on every
                  cage, including cages holding animals that are not part of any
                  experiment. You control the animals directly and can change
                  plans the same day.
                </p>
              </div>

              <div
                className="animate-in hover-card hover-card-teal group"
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '25px',
                  borderRadius: '8px',
                  borderTop: '4px solid #2384da',
                }}
              >
                <h3
                  className="card-title transition-colors duration-300 group-hover:text-teal-600"
                  style={subHeadingStyle}
                >
                  Outsourced colony management
                </h3>
                <p style={{ ...bodyStyle, fontSize: '.9rem' }}>
                  A{' '}
                  <Link
                    href="/mouse-breeding-services/"
                    className={inlineLinkClass}
                    style={inlineLinkStyle}
                  >
                    contract facility
                  </Link>{' '}
                  holds the line, runs the crosses, genotypes the animals, and
                  ships cohorts when you need them. You pay for the service and
                  for the animals produced. You free the cage space and the
                  technician hours, and you take on a coordination and shipping
                  step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Comparison
            </h2>
            <div className="animate-in" style={{ marginTop: '25px' }}>
              <UXUIDCDataTable
                caption="Comparison of in house vivarium breeding against outsourced colony management for genetically engineered mouse lines."
                columns={compareColumns}
                rows={compareRows}
              />
            </div>
          </div>
        </section>

        {/* The cost question */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              The cost question
            </h2>
            <p className="animate-in" style={bodyStyle}>
              Cost comparisons can be misleading when they evaluate a service
              quote only against the marginal cost of an additional cage. The
              true cost of in-house cohort production also includes cage space at
              your institutional per diem, technician time,{' '}
              <Link
                href="/mouse-genotyping-service/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                genotyping
              </Link>{' '}
              reagents and instrument time, and the animals bred but ultimately
              not used in the study.
            </p>

            <h3 className="animate-in" style={{ ...subHeadingStyle, marginTop: '35px' }}>
              Run the worksheet
            </h3>
            <p className="animate-in" style={bodyStyle}>
              Fill in your own numbers. We do not publish per diem rates because
              they vary by institution and change annually. Ask your vivarium for
              current figures.
            </p>

            <div className="animate-in" style={{ marginTop: '25px' }}>
              <UXUIDCDataTable
                caption="Worksheet for comparing in house breeding cost against a contract breeding quote. Rates vary by institution, so use your own current figures."
                columns={costColumns}
                rows={costRows}
                note="The right hand column is intentionally blank. Print the worksheet or copy it into a spreadsheet and enter your own current institutional figures."
              />
            </div>

            <p className="animate-in" style={{ ...bodyStyle, marginTop: '25px' }}>
              The line that surprises most programs is the one about animals bred and not used. In a{' '}
              <Link
                href="/conditional-knockout-cohort-breeding/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                cross yielding the target genotype at 12.5 percent
              </Link>
              , seven of every eight weaned pups are not experimental animals.
              You paid per diem, genotyping, and technician time on all of them.
            </p>

            <h3 className="animate-in" style={{ ...subHeadingStyle, marginTop: '35px' }}>
              What the literature shows
            </h3>
            <p className="animate-in" style={bodyStyle}>
              One published three group comparison found that laboratories
              outsourcing genotyping produced more cages and more mice over time
              than laboratories using standard in house practice, and that groups
              also receiving breeding assistance from a dedicated animal care
              team saw a further increase in colony productivity. Cost per new
              animal ended comparable across all three groups by study end, which
              means the gain showed up as throughput rather than as a lower unit
              price.
            </p>

            {/* Inline citation with a working external link, per the E-E-A-T
                requirements. Reference verified against NCBI. */}
            <div
              className="animate-in"
              style={{
                marginTop: '25px',
                backgroundColor: '#f8f9fa',
                borderLeft: '4px solid #008080',
                borderRadius: '4px',
                padding: '20px 22px',
              }}
            >
              <p
                style={{
                  color: '#0a253c',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  margin: '0 0 8px',
                }}
              >
                Reference
              </p>
              <p
                style={{
                  color: '#444',
                  fontSize: '.85rem',
                  lineHeight: '1.6rem',
                  margin: 0,
                }}
              >
                {citation.authors}.{' '}
                <cite style={{ fontStyle: 'italic' }}>{citation.title}</cite>.{' '}
                {citation.journal}, {citation.year}. {citation.identifiers}.
              </p>
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 underline transition-colors duration-300 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ color: '#00686b', fontSize: '.85rem', fontWeight: 600 }}
              >
                <span>
                  Read the full study on PubMed Central (PMC9340497, opens in a
                  new tab)
                </span>
                <IconExternalLink size={14} color="#00686b" />
              </a>
            </div>
          </div>
        </section>

        {/* Cohort timing */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Cohort timing
            </h2>

            <h3 className="animate-in" style={{ ...subHeadingStyle, marginTop: '25px' }}>
              Trickle cohorts
            </h3>
            <p className="animate-in" style={bodyStyle}>
              In house colonies usually breed with the pairs they have. Pups
              arrive across several weeks, so the animals entering a study span a
              wide age range. That age spread becomes an uncontrolled variable in
              behavioral, metabolic, and oncology work.
            </p>

            <h3 className="animate-in" style={{ ...subHeadingStyle, marginTop: '30px' }}>
              Synchronized cohorts
            </h3>
            <p className="animate-in" style={bodyStyle}>
              A contract facility with spare rack capacity can set many pairs at
              once with staggered starts, so litters land inside a narrow window
              and the{' '}
              <Link
                href="/mouse-cohort-development/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                cohort ships as one block
              </Link>
              . The difference is capacity and scheduling, not technique. A well
              resourced in house vivarium can do the same thing if it has the
              racks free.
            </p>
          </div>
        </section>

        {/* Genetic integrity */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Genetic integrity
            </h2>

            <h3 className="animate-in" style={{ ...subHeadingStyle, marginTop: '25px' }}>
              Drift
            </h3>
            <p className="animate-in" style={bodyStyle}>
              Colonies maintained without structured pair rotation and background
              verification can accumulate genetic drift over generations. A
              drifted line may no longer fully match the phenotype reported in
              the original publication, and cohorts bred from it may not be
              directly comparable to earlier work.
            </p>

            <h3 className="animate-in" style={{ ...subHeadingStyle, marginTop: '30px' }}>
              Background purity
            </h3>
            <p className="animate-in" style={bodyStyle}>
              Lines arriving on a mixed background need{' '}
              <Link
                href="/backcrossing-services/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                backcrossing
              </Link>{' '}
              to reach a defined background. Recipient background reaches 97
              percent approximately at N5 and 99.9 percent, congenic, at N10.
              Each generation runs roughly 10 to 12 weeks, so a full backcross to
              congenic can be a two year commitment of cage space if run in
              house.
            </p>

            <h3 className="animate-in" style={{ ...subHeadingStyle, marginTop: '30px' }}>
              Linkage
            </h3>
            <p className="animate-in" style={bodyStyle}>
              When a floxed allele and a Cre driver sit on the same chromosome,
              independent assortment does not apply and the target genotype
              frequency depends on the recombination rate between the loci rather
              than the expected frequency for unlinked loci. Programs that
              discover this after setting pairs may lose a generation. Check
              locus positions during{' '}
              <Link
                href="/breeding-scheme-architect/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                scheme design
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Risk */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeadingStyle, color: 'white' }}
            >
              Risk
            </h2>
            <p
              className="animate-in"
              style={{ ...bodyStyle, color: 'rgba(255,255,255,0.9)' }}
            >
              A research colony has single points of failure. A pathogen event in
              the room, a freezer failure with no backup, a breeding collapse in
              an aging line, a technician departure, or a funding gap can all end
              the same way: the line is gone and regenerating it costs a year.
            </p>
            <p
              className="animate-in"
              style={{
                ...bodyStyle,
                color: 'rgba(255,255,255,0.9)',
                marginTop: '18px',
              }}
            >
              Outsourcing can reduce the operational challenges and resource
              demands of maintaining a colony in house. A commercial facility
              provides dedicated breeding capacity, animal care, and staffing,
              while a{' '}
              <Link
                href="/cryopreservation-services/"
                className="underline transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ color: '#8fd6d6', fontWeight: 500 }}
              >
                cryopreserved backup
              </Link>{' '}
              maintained separately from the live colony provides an additional
              safeguard against loss.
            </p>
          </div>
        </section>

        {/* Decision guide */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h2
                  style={{
                    ...sectionHeadingStyle,
                    fontSize: '1.6rem',
                    marginBottom: '18px',
                  }}
                >
                  When to keep breeding in house
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {keepInHouse.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '12px',
                      }}
                    >
                      <span style={{ flexShrink: 0, marginTop: '3px' }}>
                        <IconCheckCircle size={16} color="#2384da" />
                      </span>
                      <span style={{ ...bodyStyle, fontSize: '.9rem' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in">
                <h2
                  style={{
                    ...sectionHeadingStyle,
                    fontSize: '1.6rem',
                    marginBottom: '18px',
                  }}
                >
                  When to outsource
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {whenToOutsource.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '12px',
                      }}
                    >
                      <span style={{ flexShrink: 0, marginTop: '3px' }}>
                        <IconCheckCircle size={16} color="#008080" />
                      </span>
                      <span style={{ ...bodyStyle, fontSize: '.9rem' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* A middle path */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              A middle path
            </h2>
            <p className="animate-in" style={bodyStyle}>
              The two models are not exclusive. A common arrangement keeps a
              small working colony in house for ongoing studies and sends the{' '}
              <Link
                href="/mouse-cohort-development/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                scaled cohort production
              </Link>{' '}
              out. Another keeps breeding in house and outsources{' '}
              <Link
                href="/mouse-genotyping-service/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                genotyping alone
              </Link>
              , which is the change the published comparison above measured
              directly.
            </p>
          </div>
        </section>

        {/* How ITL fits, plus the first of two CTAs */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              How ingenious targeting laboratory fits
            </h2>
            <p className="animate-in" style={bodyStyle}>
              We run{' '}
              <Link
                href="/mouse-breeding-services/"
                className={inlineLinkClass}
                style={inlineLinkStyle}
              >
                contract breeding
              </Link>{' '}
              from a U.S. barrier facility in Holbrook, New York. Since 1998 we
              have generated 2,800+ custom genetically engineered models, serving
              900+ laboratories. A PhD scientist designs every scheme before
              pairs are set, and every animal released is genotype confirmed by
              PCR.
            </p>
            <p className="animate-in" style={{ ...bodyStyle, marginTop: '18px' }}>
              The initial consultation and scheme review cost nothing. If the
              answer is that you should keep the colony in house, we will tell
              you.
            </p>
            <div className="animate-in" style={{ marginTop: '28px' }}>
              <Link
                href="/cohort-consultation/?ref=compare-mid#request-form"
                className={ctaButtonClass}
                style={ctaButtonStyle}
              >
                <span>Get a Breeding Quote</span>
                <IconChevronRight size={16} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{ ...sectionHeadingStyle, textAlign: 'center', marginBottom: '30px' }}
            >
              Frequently asked questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} idPrefix="compare-breeding-faq" />
            </div>
          </div>
        </section>

        {/* Talk it through, plus the second of two CTAs */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={sectionHeadingStyle}>
              Talk it through
            </h2>
            <p className="animate-in" style={bodyStyle}>
              Send us the line, the target genotype, the number of animals, and
              your study date. A PhD scientist will review the scheme and tell
              you what it takes in either model.
            </p>
            <div className="animate-in" style={{ marginTop: '28px' }}>
              <Link
                href="/cohort-consultation/?ref=compare-foot#request-form"
                className={ctaButtonClass}
                style={ctaButtonStyle}
              >
                <span>Get a Breeding Quote</span>
                <IconChevronRight size={16} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section
          style={{
            backgroundColor: 'white',
            padding: '60px 20px',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h2
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '15px',
                  }}
                >
                  Related Services
                </h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedServices.map((link) => (
                    <li key={link.href} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
                <h2
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '15px',
                  }}
                >
                  Related Resources
                </h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedResources.map((link) => (
                    <li key={link.href} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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

      {/* Sitewide closing furniture. Breeding Scheme Architect CTA suppressed to
          hold the guide's light CTA density; the tool is still linked inline and
          in Related Resources. */}
      <StandardPageCtaStack
        slug="in-house-vs-outsourced-mouse-breeding"
        showBreedingScheme={false}
        showLabSignals={true}
        labSignalsTitle="Mouse Colony and Cohort Insights"
      />
      <UXUIDCFooter />

      {/* Schema.org structured data. Article, not Service: this page is
          editorial. */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Resources', path: '/resources' },
          {
            name: 'In House vs Outsourced Mouse Breeding',
            path: PAGE_PATH,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
