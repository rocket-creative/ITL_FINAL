/**
 * |UXUIDC| Per-slug catalog lookup data for dual-path CTAs.
 */

export interface CatalogGene {
  /** Gene symbol shown to user (case as published, e.g. "Trp53") */
  symbol: string;
  /** URL gene segment (matches catalog gene page route param) */
  slug: string;
  /** Short why-this-gene blurb (1 line) */
  blurb: string;
}

export interface CatalogLookup {
  /** Eyebrow over the widget */
  eyebrow: string;
  /** Headline */
  headline: string;
  /** Subline */
  subline: string;
  /** Pre-filled search href (catalog search) */
  searchHref: string;
  /** Search button label */
  searchLabel: string;
  /** Hero genes for this topic (3 ideal) */
  genes: CatalogGene[];
}

const DEFAULT_LOOKUP: CatalogLookup = {
  eyebrow: 'Ready to ship',
  headline: 'Search 14,774 strains. Many ship from live colonies.',
  subline:
    'Browse by gene, model type, or therapeutic area. Live colonies available for many top requested knockouts, knockins, and humanized lines.',
  searchHref: '/all-catalog-mouse-models/',
  searchLabel: 'Browse Full Catalog',
  genes: [
    { symbol: 'Trp53', slug: 'Trp53', blurb: 'Tumor suppressor — knockout & knockin' },
    { symbol: 'Brca1', slug: 'Brca1', blurb: 'Breast cancer model — multiple alleles' },
    { symbol: 'Rosa26', slug: 'Gt(ROSA)26Sor', blurb: 'Safe harbor for reporters & cassettes' },
  ],
};

const LOOKUP_MAP: Record<string, CatalogLookup> = {
  // POINT MUTATION cluster
  'what-is-a-point-mutation': {
    eyebrow: 'Catalog Models',
    headline: 'Point mutation knockins. Check live colonies before you plan a build.',
    subline:
      'Hundreds of disease variant knockin models are in stock. Search by gene or browse popular hits. Need a unique variant? We design custom knockins.',
    searchHref: '/all-catalog-mouse-models/?q=point+mutation',
    searchLabel: 'Search Point Mutation Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Tumor suppressor variants — multiple knockin alleles' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H — disease variant' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Conditional & point mutation alleles' },
    ],
  },
  'types-of-point-mutations': {
    eyebrow: 'Already in our catalog?',
    headline: 'See ready-to-ship point mutation knockin models.',
    subline:
      'Substitution, insertion, and deletion variants in stock. Search by your gene of interest.',
    searchHref: '/all-catalog-mouse-models/?q=point+mutation',
    searchLabel: 'Search Point Mutation Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Multiple substitution & deletion alleles' },
      { symbol: 'Lig1', slug: 'Lig1', blurb: 'DNA repair — knockin variants' },
      { symbol: 'Pdk3', slug: 'Pdk3', blurb: 'Conditional & point mutation' },
    ],
  },
  'point-mutation-diseases': {
    eyebrow: 'Already in our catalog?',
    headline: 'Disease-variant knockin mice — already built.',
    subline:
      'Cancer, metabolic, immune, and rare disease variants in the catalog. Live colonies available.',
    searchHref: '/all-catalog-mouse-models/?q=disease',
    searchLabel: 'Browse Disease Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Cancer — tumor suppressor variants' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized — metabolic disease' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized — complement disorders' },
    ],
  },
  'point-mutation': {
    eyebrow: 'Already in our catalog?',
    headline: 'See ready-to-ship point mutation knockin models.',
    subline:
      'Substitution, insertion, and deletion variants in stock. Search by your gene.',
    searchHref: '/all-catalog-mouse-models/?q=point+mutation',
    searchLabel: 'Search Point Mutation Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Multiple substitution & deletion alleles' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Lig1', slug: 'Lig1', blurb: 'DNA repair — knockin variants' },
    ],
  },

  // KNOCKOUT / KNOCKIN
  'difference-between-knock-in-and-knockout': {
    eyebrow: 'Already in our catalog?',
    headline: 'Knockout & knockin mice — ready to ship.',
    subline:
      '14,774 catalog models. Many ship from live colonies in weeks, not months.',
    searchHref: '/all-catalog-mouse-models/',
    searchLabel: 'Search the Full Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Knockout & knockin — multiple alleles' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'Knockout — innate immunity' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'Knockout — neuroscience & immunology' },
    ],
  },
  'conventional-vs-conditional-knockout': {
    eyebrow: 'Already in our catalog?',
    headline: 'Conventional or conditional knockout — many already built.',
    subline:
      'Search live colonies of knockouts and floxed/conditional alleles by gene.',
    searchHref: '/all-catalog-mouse-models/?q=knockout',
    searchLabel: 'Browse Knockout Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Conventional & conditional knockout' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Conditional knockout — floxed allele' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout — multiple lines' },
    ],
  },
  'how-a-knockout-mouse-is-made': {
    eyebrow: 'Already in our catalog?',
    headline: 'Knockout already built? Save months.',
    subline:
      '14,774 catalog models. Live colonies for many top-requested knockouts.',
    searchHref: '/all-catalog-mouse-models/?q=knockout',
    searchLabel: 'Browse Knockout Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Tumor suppressor — multiple alleles' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'Innate immunity knockout' },
      { symbol: 'Neu1', slug: 'Neu1', blurb: 'Neuraminidase knockout' },
    ],
  },

  // CRE / CreERT2 / TAMOXIFEN
  'tamoxifen-inducible-cre': {
    eyebrow: 'Already in our catalog?',
    headline: 'CreERT2 driver lines — ready to ship.',
    subline:
      'Tissue-specific tamoxifen-inducible Cre lines and floxed alleles. Live colonies available.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre Driver Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-CreERT2 ubiquitous driver' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Tissue-specific Cre line' },
      { symbol: 'Ywhaq', slug: 'Ywhaq', blurb: 'Floxed allele — pair with CreERT2' },
    ],
  },
  'inducible-cre-ert2': {
    eyebrow: 'Already in our catalog?',
    headline: 'Looking for a CreERT2 line? Many already built.',
    subline:
      'Tissue-specific tamoxifen-inducible Cre and floxed alleles. Search live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre Driver Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-CreERT2 ubiquitous driver' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Tissue-specific Cre line' },
      { symbol: 'Lamtor5', slug: 'Lamtor5', blurb: 'Conditional — pair with Cre' },
    ],
  },
  'cre-recombinase': {
    eyebrow: 'Already in our catalog?',
    headline: 'Cre driver lines — ready to ship.',
    subline:
      'Tissue-specific Cre, CreERT2, and conditional lines. Search live colonies by gene or tissue.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre Driver Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-Cre ubiquitous driver' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Tissue-specific Cre line' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — pair with any Cre' },
    ],
  },
  'cre-lox-system': {
    eyebrow: 'Already in our catalog?',
    headline: 'Cre/lox conditional models — ready to ship.',
    subline:
      'Floxed alleles + tissue-specific Cre lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre/lox Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-Cre ubiquitous driver' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — pair with any Cre' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout — floxed allele' },
    ],
  },
  'cre-flox': {
    eyebrow: 'Already in our catalog?',
    headline: 'Cre/lox conditional models — ready to ship.',
    subline:
      'Floxed alleles + tissue-specific Cre lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre/lox Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-Cre ubiquitous driver' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — pair with any Cre' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout — floxed allele' },
    ],
  },
  'floxing': {
    eyebrow: 'Already in our catalog?',
    headline: 'Floxed alleles — many already built.',
    subline:
      'Search the catalog for floxed mice ready to ship from live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=floxed',
    searchLabel: 'Browse Floxed Catalog',
    genes: [
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — multiple alleles' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Floxed — conditional knockout' },
      { symbol: 'Pdk3', slug: 'Pdk3', blurb: 'Floxed — multiple alleles' },
    ],
  },

  // GLOSSARY: high-impression terms
  'non-homologous-end-joining': {
    eyebrow: 'Already in our catalog?',
    headline: 'CRISPR knockouts — many already built.',
    subline:
      '14,774 ready models. Search by gene to skip the build entirely.',
    searchHref: '/all-catalog-mouse-models/?q=knockout',
    searchLabel: 'Browse Knockout Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'CRISPR knockout — multiple alleles' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'Innate immunity knockout' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'Neuroscience & immunology knockout' },
    ],
  },
  'open-reading-frame': {
    eyebrow: 'Already in our catalog?',
    headline: 'ORF knockin & humanization — already in stock.',
    subline:
      'Knockin and humanized models in live colonies. Search by gene to ship faster.',
    searchHref: '/all-catalog-mouse-models/?q=knockin',
    searchLabel: 'Browse Knockin Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor knockin' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
    ],
  },
  'c57bl6j-vs-c57bl6n': {
    eyebrow: 'Already in our catalog?',
    headline: 'Catalog models on C57BL/6J and C57BL/6N.',
    subline:
      'Search by gene; pick the strain background you need.',
    searchHref: '/all-catalog-mouse-models/?q=C57BL%2F6',
    searchLabel: 'Browse Catalog by Strain',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'On C57BL/6 backgrounds' },
    ],
  },
  'c57bl6-mouse-background': {
    eyebrow: 'Already in our catalog?',
    headline: 'Catalog models on C57BL/6J and C57BL/6N.',
    subline:
      'Search by gene; pick the strain background you need.',
    searchHref: '/all-catalog-mouse-models/?q=C57BL%2F6',
    searchLabel: 'Browse Catalog by Strain',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'On C57BL/6 backgrounds' },
    ],
  },
  'allele-genotype-phenotype': {
    eyebrow: 'Already in our catalog?',
    headline: '14,774 mouse models with known alleles.',
    subline:
      'Skip allele design — search live colonies by gene.',
    searchHref: '/all-catalog-mouse-models/',
    searchLabel: 'Search the Full Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Multiple alleles & phenotypes' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Conditional & full knockout' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout' },
    ],
  },

  // HUMANIZED
  'humanized-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Humanized mouse models — ready to ship.',
    subline:
      'Drug-target and immune checkpoint humanized lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=humanized',
    searchLabel: 'Browse Humanized Catalog',
    genes: [
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'why-make-a-humanized-mouse': {
    eyebrow: 'Already in our catalog?',
    headline: 'Humanized mouse models — ready to ship.',
    subline:
      'Drug-target and immune checkpoint humanized lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=humanized',
    searchLabel: 'Browse Humanized Catalog',
    genes: [
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'history-of-creating-genetically-humanized-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Humanized mouse models — ready to ship.',
    subline:
      'Drug-target and immune checkpoint humanized lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=humanized',
    searchLabel: 'Browse Humanized Catalog',
    genes: [
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },

  // TRANSGENE / TRANSGENIC
  'what-is-a-transgene': {
    eyebrow: 'Already in our catalog?',
    headline: 'Transgenic and knockin mice — many already built.',
    subline:
      'Skip transgenesis — search live colonies of catalog models by gene.',
    searchHref: '/all-catalog-mouse-models/?q=transgenic',
    searchLabel: 'Browse Transgenic Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor transgene' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized transgene' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'transgenic-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Transgenic mice — already built.',
    subline:
      'Skip transgenesis — search live colonies of catalog models by gene.',
    searchHref: '/all-catalog-mouse-models/?q=transgenic',
    searchLabel: 'Browse Transgenic Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized transgene' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'how-to-make-a-transgenic-mouse': {
    eyebrow: 'Already in our catalog?',
    headline: 'Transgenic mice — already built. Skip the protocol.',
    subline:
      '14,774 catalog models with live colonies. Search by gene.',
    searchHref: '/all-catalog-mouse-models/?q=transgenic',
    searchLabel: 'Browse Transgenic Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized transgene' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },

  // ROSA26
  'rosa26': {
    eyebrow: 'Already in our catalog?',
    headline: 'Rosa26 knockin lines — ready to ship.',
    subline:
      'Reporter, conditional cassette, and inducible Rosa26 knockins in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=rosa26',
    searchLabel: 'Browse Rosa26 Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor — many alleles' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Cre driver — pair with Rosa26 reporter' },
      { symbol: 'Pgm3', slug: 'Pgm3', blurb: 'Conditional knockin' },
    ],
  },
  'rosa26-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Rosa26 knockin lines — ready to ship.',
    subline:
      'Reporter, conditional cassette, and inducible Rosa26 knockins in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=rosa26',
    searchLabel: 'Browse Rosa26 Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor — many alleles' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Cre driver — pair with Rosa26 reporter' },
      { symbol: 'Pgm3', slug: 'Pgm3', blurb: 'Conditional knockin' },
    ],
  },
};

export function getCatalogLookup(slug: string): CatalogLookup {
  return LOOKUP_MAP[slug] ?? DEFAULT_LOOKUP;
}

/** Slugs with topic-specific catalog lookup (not the site-wide default). */
export function hasEducationalCatalogMap(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(LOOKUP_MAP, slug);
}

