/**
 * |UXUIDC| Educational Sales Banner
 *
 * Above-the-fold commercial offer placed at the top of high-impression
 * educational pages (blog posts + glossary terms). Replaces the prior
 * "you are reading an archived blog" framing with an offer + dual CTA:
 *  - Primary: request a custom quote
 *  - Secondary: browse matching off-the-shelf catalog models
 *
 * Content is page-specific. The map below is the single source of truth
 * for which slug gets which offer copy and CTA targets.
 */

import Link from 'next/link';

export interface EducationalSalesOffer {
  /** Eyebrow label, all caps */
  eyebrow: string;
  /** Headline. Short, offer-driven. */
  headline: string;
  /** Subline. One sentence with proof + price. */
  subline: string;
  /** Primary (custom quote) CTA */
  primaryCta: { label: string; href: string };
  /** Secondary (catalog) CTA */
  secondaryCta: { label: string; href: string };
}

/**
 * Default offer used when a slug has no custom mapping.
 * Generic but still commercial.
 */
const DEFAULT_OFFER: EducationalSalesOffer = {
  eyebrow: 'Custom Mouse Models',
  headline: 'We turn this concept into your model.',
  subline:
    'Custom knockout, knockin, and humanized mice. 800+ peer-reviewed publications. Quote in 24 hours.',
  primaryCta: { label: 'Request a Quote', href: '/request-quote' },
  secondaryCta: { label: 'Browse 14,774 Catalog Models', href: '/all-catalog-mouse-models/' },
};

/**
 * Per-slug offers. Slugs are matched without surface (blog vs glossary)
 * because the same topic appears across both. If a slug appears in both
 * the blog and glossary, both will use the same offer.
 */
const OFFER_MAP: Record<string, EducationalSalesOffer> = {
  // POINT MUTATION cluster — biggest top-of-funnel asset on the site
  'what-is-a-point-mutation': {
    eyebrow: 'Point Mutation Knockin Mice',
    headline: 'Need a point mutation knockin mouse?',
    subline:
      'Custom point mutation models at endogenous loci. ES cell or CRISPR. 800+ publications. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=point-mutation-banner' },
    secondaryCta: { label: 'Browse Point Mutation Catalog Models', href: '/all-catalog-mouse-models/?q=point+mutation' },
  },
  'types-of-point-mutations': {
    eyebrow: 'Point Mutation Knockin Mice',
    headline: 'Modeling a missense, nonsense, or substitution variant?',
    subline:
      'We build custom point mutation knockin mice for any substitution, deletion, or insertion. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=types-point-mutations-banner' },
    secondaryCta: { label: 'See Point Mutation Models in Catalog', href: '/all-catalog-mouse-models/?q=point+mutation' },
  },
  'point-mutation-diseases': {
    eyebrow: 'Disease Variant Knockin Mice',
    headline: 'Model a disease-associated point mutation in mice.',
    subline:
      'Custom knockin mice for sickle cell, cystic fibrosis, cancer, and other disease variants. Quote in 24 hours. 800+ publications.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=point-mutation-diseases-banner' },
    secondaryCta: { label: 'Browse Disease Model Catalog', href: '/all-catalog-mouse-models/' },
  },
  'point-mutation': {
    eyebrow: 'Point Mutation Mouse Models',
    headline: 'Need a point mutation knockin mouse?',
    subline:
      'Custom point mutation models at endogenous loci. ES cell or CRISPR. 800+ publications. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=glossary&utm_campaign=point-mutation-banner' },
    secondaryCta: { label: 'Browse Point Mutation Catalog Models', href: '/all-catalog-mouse-models/?q=point+mutation' },
  },

  // KNOCKOUT / KNOCKIN cluster
  'difference-between-knock-in-and-knockout': {
    eyebrow: 'Knockout & Knockin Mice',
    headline: 'Knockout or knockin — we build either, often faster off the shelf.',
    subline:
      'Custom builds. 14,774 ready-to-ship catalog models. 26+ years experience. Quote in 24 hours.',
    primaryCta: { label: 'Get a Custom Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=knockin-vs-knockout-banner' },
    secondaryCta: { label: 'Search 14,774 Ready Models', href: '/all-catalog-mouse-models/' },
  },
  'conventional-vs-conditional-knockout': {
    eyebrow: 'Conditional & Conventional Knockouts',
    headline: 'Conditional or constitutive knockout — we build both.',
    subline:
      'Custom Cre/lox conditional or full knockout. Tissue-specific, inducible, or global. 2,500+ projects shipped.',
    primaryCta: { label: 'Get a Custom Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=conventional-vs-conditional-banner' },
    secondaryCta: { label: 'Browse Knockout Catalog', href: '/all-catalog-mouse-models/?q=knockout' },
  },
  'how-a-knockout-mouse-is-made': {
    eyebrow: 'Custom Knockout Mice',
    headline: 'Need a knockout mouse built for your project?',
    subline:
      'Custom knockout mice. ES cell or CRISPR. 100% germline transmission guarantee. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=how-knockout-made-banner' },
    secondaryCta: { label: 'Browse Knockout Catalog', href: '/all-catalog-mouse-models/?q=knockout' },
  },

  // CRE / CreERT2 / TAMOXIFEN cluster — ~20K imp/month
  'tamoxifen-inducible-cre': {
    eyebrow: 'Tamoxifen Inducible CreERT2',
    headline: "We've shipped 2,500+ CreERT2 projects.",
    subline:
      'Custom tissue-specific CreERT2 lines and inducible knockouts. Bypass embryonic lethality. 800+ publications. Quote in 24 hours.',
    primaryCta: { label: 'Start Your CreERT2 Project', href: '/request-quote?utm_source=organic&utm_medium=service&utm_campaign=tamoxifen-cre-banner' },
    secondaryCta: { label: 'Browse Cre Driver Lines', href: '/all-catalog-mouse-models/?q=cre' },
  },
  'inducible-cre-ert2': {
    eyebrow: 'Inducible CreERT2 Mice',
    headline: 'Need an inducible knockout? We build CreERT2 lines.',
    subline:
      'Custom CreERT2 + floxed allele projects. Tissue-specific or ubiquitous. 2,500+ projects shipped.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=glossary&utm_campaign=inducible-cre-ert2-banner' },
    secondaryCta: { label: 'Browse Cre Driver Catalog', href: '/all-catalog-mouse-models/?q=cre' },
  },
  'cre-recombinase': {
    eyebrow: 'Cre Recombinase Mice',
    headline: 'Custom Cre driver lines and floxed alleles.',
    subline:
      'Tissue-specific Cre, CreERT2, and conditional knockouts. Quote in 24 hours. 2,500+ projects shipped.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=cre-recombinase-banner' },
    secondaryCta: { label: 'Browse Cre Driver Catalog', href: '/all-catalog-mouse-models/?q=cre' },
  },
  'cre-lox-system': {
    eyebrow: 'Cre/lox Conditional Knockouts',
    headline: 'Building a conditional knockout? Start with our Cre/lox expertise.',
    subline:
      'Custom floxed alleles + tissue-specific Cre lines. 2,500+ projects, 800+ publications.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=cre-lox-banner' },
    secondaryCta: { label: 'Browse Cre/lox Catalog', href: '/all-catalog-mouse-models/?q=cre' },
  },
  'cre-flox': {
    eyebrow: 'Cre/lox Conditional Knockouts',
    headline: 'Building a conditional knockout? Start with our Cre/lox expertise.',
    subline:
      'Custom floxed alleles + tissue-specific Cre lines. 2,500+ projects, 800+ publications.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=cre-flox-banner' },
    secondaryCta: { label: 'Browse Cre/lox Catalog', href: '/all-catalog-mouse-models/?q=cre' },
  },

  // GLOSSARY high-impression terms
  'non-homologous-end-joining': {
    eyebrow: 'CRISPR Knockout Mice',
    headline: 'NHEJ-driven knockouts — we build them every day.',
    subline:
      'Custom CRISPR knockout mice. 100% germline transmission guarantee. 2,500+ projects shipped.',
    primaryCta: { label: 'Request a Knockout Quote', href: '/request-quote?utm_source=organic&utm_medium=glossary&utm_campaign=nhej-banner' },
    secondaryCta: { label: 'Browse Knockout Catalog', href: '/all-catalog-mouse-models/?q=knockout' },
  },
  'open-reading-frame': {
    eyebrow: 'Knockin & ORF Replacement Mice',
    headline: 'Replacing or modifying an ORF in mice?',
    subline:
      'Custom ORF replacement, humanization, and reporter knockin. ES cell or CRISPR.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=glossary&utm_campaign=orf-banner' },
    secondaryCta: { label: 'Browse Knockin Catalog', href: '/all-catalog-mouse-models/?q=knockin' },
  },
  'c57bl6j-vs-c57bl6n': {
    eyebrow: 'C57BL/6J & C57BL/6N Backgrounds',
    headline: 'We build on C57BL/6J and C57BL/6N — your choice.',
    subline:
      'Custom mouse models on the background you need. 14,774 ready catalog models on multiple strains. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=glossary&utm_campaign=c57bl6-banner' },
    secondaryCta: { label: 'Browse Catalog by Strain', href: '/all-catalog-mouse-models/?q=C57BL%2F6' },
  },
  'allele-genotype-phenotype': {
    eyebrow: 'Custom Mouse Models',
    headline: 'Designing the right allele for your phenotype?',
    subline:
      'Our scientists help design floxed, knockin, knockout, and humanized alleles. Quote in 24 hours. Free consultation.',
    primaryCta: { label: 'Free Consultation', href: '/contact?utm_source=organic&utm_medium=glossary&utm_campaign=allele-banner' },
    secondaryCta: { label: 'Browse 14,774 Catalog Models', href: '/all-catalog-mouse-models/' },
  },
  'promoter-enhancer-regulatory-element': {
    eyebrow: 'Regulatory Element Knockin Mice',
    headline: 'Modeling a regulatory or promoter variant?',
    subline:
      'Custom knockin mice at endogenous regulatory loci. Reporter integration available.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=glossary&utm_campaign=promoter-enhancer-banner' },
    secondaryCta: { label: 'Browse Reporter & Knockin Catalog', href: '/all-catalog-mouse-models/?q=reporter' },
  },

  // HUMANIZED cluster
  'humanized-mice': {
    eyebrow: 'Humanized Mouse Services',
    headline: 'Need a humanized mouse for drug development?',
    subline:
      'Custom humanized mice — drug-target humanization, immune checkpoint humanization (PD1, PDL1, CTLA4, LAG3, TIM3). 800+ publications. Quote in 24 hours.',
    primaryCta: { label: 'Get a Humanized Mouse Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=humanized-mice-banner' },
    secondaryCta: { label: 'See Humanized Models', href: '/humanized-mouse-models/' },
  },
  'why-make-a-humanized-mouse': {
    eyebrow: 'Humanized Mouse Services',
    headline: 'Already decided you need humanized mice? Get pricing.',
    subline:
      'Custom humanized mice for preclinical drug development. 800+ publications in Nature, Cell, Science. Quote in 24 hours.',
    primaryCta: { label: 'Get Humanized Mouse Pricing', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=why-humanized-banner' },
    secondaryCta: { label: 'See Humanized Mouse Services', href: '/humanized-mouse-models/' },
  },
  'history-of-creating-genetically-humanized-mice': {
    eyebrow: 'Humanized Mouse Services',
    headline: "We've built humanized mice since 1998.",
    subline:
      '800+ publications. Drug-target and immune checkpoint humanization. Custom. Quote in 24 hours.',
    primaryCta: { label: 'Get a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=humanized-history-banner' },
    secondaryCta: { label: 'See Humanized Mouse Services', href: '/humanized-mouse-models/' },
  },

  // TRANSGENE / TRANSGENIC cluster
  'what-is-a-transgene': {
    eyebrow: 'Transgenic Mouse Service',
    headline: 'Need a transgenic mouse built?',
    subline:
      'Custom transgenic mice — BAC, random insertion, or targeted transgenesis. Quote in 24 hours. 800+ publications.',
    primaryCta: { label: 'Get a Transgenic Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=transgene-banner' },
    secondaryCta: { label: 'See Transgenic Mouse Service', href: '/transgenic-mouse-service/' },
  },
  'transgenic-mice': {
    eyebrow: 'Transgenic Mouse Service',
    headline: 'Custom transgenic mice — BAC, random, or targeted.',
    subline:
      '800+ publications. ES cell, CRISPR, and pronuclear injection. Quote in 24 hours.',
    primaryCta: { label: 'Get a Transgenic Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=transgenic-mice-banner' },
    secondaryCta: { label: 'See Transgenic Mouse Service', href: '/transgenic-mouse-service/' },
  },
  'how-to-make-a-transgenic-mouse': {
    eyebrow: 'Transgenic Mouse Service',
    headline: 'Skip the protocol — we build transgenic mice for you.',
    subline:
      'Pronuclear injection, BAC transgenics, and targeted transgenesis. Quote in 24 hours. 100% germline guarantee.',
    primaryCta: { label: 'Get a Transgenic Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=how-to-transgenic-banner' },
    secondaryCta: { label: 'See Transgenic Mouse Service', href: '/transgenic-mouse-service/' },
  },

  // ROSA26
  'rosa26': {
    eyebrow: 'Rosa26 Targeted Knockin',
    headline: 'Targeting Rosa26? We do it all the time.',
    subline:
      'Custom Rosa26 knockin mice — reporters, conditional cassettes, inducible expression. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=rosa26-banner' },
    secondaryCta: { label: 'Browse Rosa26 Catalog', href: '/all-catalog-mouse-models/?q=rosa26' },
  },
  'rosa26-mice': {
    eyebrow: 'Rosa26 Targeted Knockin',
    headline: 'Targeting Rosa26? We do it all the time.',
    subline:
      'Custom Rosa26 knockin mice — reporters, conditional cassettes, inducible expression. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=rosa26-mice-banner' },
    secondaryCta: { label: 'Browse Rosa26 Catalog', href: '/all-catalog-mouse-models/?q=rosa26' },
  },

  // FLOXED / CONDITIONAL
  'floxing': {
    eyebrow: 'Floxed Allele Generation',
    headline: 'Need a floxed allele for your conditional knockout?',
    subline:
      'Custom floxed mice. Critical exon selection included. 2,500+ projects shipped.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=floxing-banner' },
    secondaryCta: { label: 'Browse Floxed Catalog', href: '/all-catalog-mouse-models/?q=floxed' },
  },
  'floxed-cre-lox-flox': {
    eyebrow: 'Floxed Allele Generation',
    headline: 'Need a floxed allele for your conditional knockout?',
    subline:
      'Custom floxed mice. Critical exon selection included. 2,500+ projects shipped.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=floxed-cre-lox-banner' },
    secondaryCta: { label: 'Browse Floxed Catalog', href: '/all-catalog-mouse-models/?q=floxed' },
  },
  'flox-sequence': {
    eyebrow: 'Floxed Allele Generation',
    headline: 'Designing a flox sequence? Hand it to our scientists.',
    subline:
      'Custom floxed alleles with critical exon selection. Quote in 24 hours. 100% germline guarantee.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=flox-sequence-banner' },
    secondaryCta: { label: 'Browse Floxed Catalog', href: '/all-catalog-mouse-models/?q=floxed' },
  },
  'conditional-mutation': {
    eyebrow: 'Conditional Knockouts',
    headline: 'Conditional mutation modeling — done right.',
    subline:
      'Custom conditional knockout and knockin mice. Tissue-specific or inducible. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=conditional-mutation-banner' },
    secondaryCta: { label: 'Browse Conditional Catalog', href: '/all-catalog-mouse-models/?q=conditional' },
  },

  // STEM CELL / OTHER
  'what-is-a-stem-cell-line': {
    eyebrow: 'ES Cell Targeting',
    headline: 'Our ES cell platform builds your custom mouse.',
    subline:
      'Validated C57BL/6 ES cells. 100% germline transmission guarantee. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=blog&utm_campaign=stem-cell-banner' },
    secondaryCta: { label: 'See Custom Mouse Services', href: '/custom-mouse-models/' },
  },

  // GLOSSARY: tamoxifen-inducible-cre, c57bl6-mouse-background, allele-genotype-phenotype
  // covered above and below by slug overlap
  'c57bl6-mouse-background': {
    eyebrow: 'C57BL/6 Mouse Background',
    headline: 'Custom mice on C57BL/6J or C57BL/6N — your choice.',
    subline:
      'We build on the background you need. 14,774 ready catalog models. Quote in 24 hours.',
    primaryCta: { label: 'Request a Quote', href: '/request-quote?utm_source=organic&utm_medium=glossary&utm_campaign=c57bl6-bg-banner' },
    secondaryCta: { label: 'Browse Catalog by Strain', href: '/all-catalog-mouse-models/?q=C57BL%2F6' },
  },
};

/**
 * Returns the offer for a given educational page slug, or the default.
 */
export function getEducationalOffer(slug: string): EducationalSalesOffer {
  return OFFER_MAP[slug] ?? DEFAULT_OFFER;
}

interface Props {
  /** Page slug (without surface prefix). Used to look up the offer copy. */
  slug: string;
}

export default function UXUIDCEducationalSalesBanner({ slug }: Props) {
  const offer = getEducationalOffer(slug);

  return (
    <section
      aria-label="Custom mouse model offer"
      style={{
        background: 'linear-gradient(135deg, #0a253c 0%, #008080 100%)',
        padding: '28px 20px',
        borderBottom: '3px solid #00d4d4',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: '#00d4d4',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '20px',
              height: '2px',
              backgroundColor: '#00d4d4',
            }}
          />
          {offer.eyebrow}
        </div>
        <h2
          style={{
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          {offer.headline}
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'Lato, -apple-system, sans-serif',
            fontSize: '1rem',
            lineHeight: 1.55,
            margin: 0,
            maxWidth: '780px',
          }}
        >
          {offer.subline}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '6px',
          }}
        >
          <Link
            href={offer.primaryCta.href}
            data-cta="commercial-banner-primary"
            data-cta-slug={slug}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              color: '#0a253c',
              padding: '13px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.3px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
            }}
          >
            {offer.primaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={offer.secondaryCta.href}
            data-cta="commercial-banner-secondary"
            data-cta-slug={slug}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              padding: '12px 22px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.3px',
              border: '2px solid rgba(255,255,255,0.55)',
            }}
          >
            {offer.secondaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '18px',
            marginTop: '4px',
            color: 'rgba(255,255,255,0.78)',
            fontSize: '0.78rem',
            fontWeight: 500,
          }}
        >
          <span>26+ years building mouse models</span>
          <span aria-hidden="true">•</span>
          <span>2,500+ projects delivered</span>
          <span aria-hidden="true">•</span>
          <span>100% germline guarantee</span>
        </div>
      </div>
    </section>
  );
}
