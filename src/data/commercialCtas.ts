/**
 * Catalog first → generate when ready commercial CTAs.
 * Shared across hub pages, StartProjectCTA, and footer CTA sections.
 *
 * CTA priority (sitewide). Place higher priorities first; Lab Signals last.
 *
 * Canonical page stack:
 *   1. Near ATF, CatalogCustomDualCta (utmMedium="page-hero")
 *   2. Content / proof
 *   3. Close, CatalogCustomDualCta / StartProjectCTA / PageClosingCta (P0)
 *   4. BreedingSchemeArchitectCTA (P1)
 *   5. LabSignalsSignup (P2, always last content CTA)
 */

/** Ranked CTA families for placement and visual hierarchy. */
export const CTA_PRIORITY = {
  /** Catalog browse + model generation quote, above the fold and again at page close */
  P0_COMMERCIAL: 0,
  /** Global nav / BuildAwarenessBanner quote nudge */
  P0_GLOBAL: 0,
  /** Breeding Scheme Architect tool promo, only after P0 close */
  P1_TOOL: 1,
  /** Lab Signals newsletter nurture, always last among content CTAs */
  P2_NURTURE: 2,
  /** Contact, order catalog, schedule meeting, footer / utility */
  P3_UTILITY: 3,
} as const;

export const COMMERCIAL_LINKS = {
  catalogHub: '/catalog-mouse-models',
  catalogAll: '/all-catalog-mouse-models',
  requestQuote: '/request-quote',
  customHub: '/custom-mouse-models',
  contact: '/contact',
  scheduleMeeting: '/schedule-meeting',
  publications: '/publications',
  orderCatalog: '/order-catalog-models',
} as const;

export interface CtaButton {
  label: string;
  href: string;
}

export interface FooterCtaData {
  title: string;
  description: string;
  primaryButton: CtaButton;
  secondaryButton: CtaButton;
}

export const CATALOG_FIRST_BRIDGE =
  'Most projects begin with an established catalog mouse model. When your program needs conditional, mutation, or humanization beyond the library, our team designs and delivers the study-specific allele your study requires.';

export const CUSTOM_MODEL_BRIDGE =
  'Do not see your allele? The same scientific team builds generated knockouts, knockins, and humanized mice with guaranteed germline transmission.';

/** Equal model generation panel copy for catalog lookup widget (pairs with per-topic catalog side). */
export const CUSTOM_MODEL_PANEL = {
  eyebrow: 'Model generation',
  headline: 'Need a knockout, knockin, or humanized line?',
  subline:
    'The same U.S. scientific team designs and delivers your allele when it is not on the shelf. 100% germline transmission guarantee.',
  bullets: [
    'Conventional and conditional knockouts',
    'Point mutation and humanized knockins',
    '2,800+ models generated since 1998',
  ],
  quoteLabel: 'Request a Quote',
  servicesLabel: 'Explore model generation services',
} as const;

export const CATALOG_OR_CUSTOM_WIDGET_INTRO = {
  eyebrow: 'Mouse Models',
  headline: 'Two paths. One scientific team.',
  subline:
    'Search 14,774+ study ready strains, or commission the exact knockout, knockin, or humanized model your program requires.',
} as const;

/** Equal weight dual path: catalog + model generation quote (sitewide standard). */
export const EQUAL_WEIGHT_BUTTONS: CtaButton[] = [
  { label: 'Browse 14,774+ Catalog Models', href: COMMERCIAL_LINKS.catalogAll },
  { label: 'Request a Quote', href: COMMERCIAL_LINKS.requestQuote },
];

export const CATALOG_CUSTOM_BUTTONS: CtaButton[] = EQUAL_WEIGHT_BUTTONS;

export const CATALOG_ALL_CUSTOM_BUTTONS: CtaButton[] = EQUAL_WEIGHT_BUTTONS;

export const startProjectDefaults = {
  title: 'Catalog Models. Generation when your study needs more.',
  content: CATALOG_FIRST_BRIDGE,
  buttons: EQUAL_WEIGHT_BUTTONS,
};

export const heroCtaPair = {
  catalog: EQUAL_WEIGHT_BUTTONS[0],
  custom: EQUAL_WEIGHT_BUTTONS[1],
};

/** Build UTM query string for commercial CTAs. */
export function commercialUtmHref(
  baseHref: string,
  params: { source?: string; medium?: string; campaign?: string },
): string {
  const search = new URLSearchParams();
  if (params.source) search.set('utm_source', params.source);
  if (params.medium) search.set('utm_medium', params.medium);
  if (params.campaign) search.set('utm_campaign', params.campaign);
  const qs = search.toString();
  if (!qs) return baseHref;
  const sep = baseHref.includes('?') ? '&' : '?';
  return `${baseHref}${sep}${qs}`;
}

/** Append catalog bridge when page-specific copy does not mention the catalog. */
export function withCatalogBridge(content: string): string {
  if (/catalog/i.test(content)) {
    return content;
  }
  return `${content} Browse 14,774+ catalog models for a faster start, or request a generated line when your program needs a specific allele configuration.`;
}

export const footerCta: Record<'default' | 'catalog' | 'publications' | 'diseaseCatalog', FooterCtaData> = {
  default: {
    title: 'Catalog Models. Generate when ready.',
    description: CATALOG_FIRST_BRIDGE,
    primaryButton: EQUAL_WEIGHT_BUTTONS[0],
    secondaryButton: EQUAL_WEIGHT_BUTTONS[1],
  },
  catalog: {
    title: 'Find your line in the catalog',
    description:
      'Explore 14,774+ study ready mouse and rat models. Need conditional, mutation, or humanization beyond the library? Request a quote and our scientific team will scope the exact line for your program.',
    primaryButton: EQUAL_WEIGHT_BUTTONS[0],
    secondaryButton: EQUAL_WEIGHT_BUTTONS[1],
  },
  publications: {
    title: 'Partner with iTL',
    description:
      'ingenious targeting laboratory provided the mouse model. Scientific findings are the work of the authors. Most programs start in the catalog. When your study outgrows off the shelf, request a generated line.',
    primaryButton: EQUAL_WEIGHT_BUTTONS[0],
    secondaryButton: EQUAL_WEIGHT_BUTTONS[1],
  },
  diseaseCatalog: {
    title: 'Browse disease model catalog',
    description:
      'Review study ready disease model lines in the catalog. When the exact allele or combination is not listed, request a quote for the line your program requires.',
    primaryButton: EQUAL_WEIGHT_BUTTONS[0],
    secondaryButton: EQUAL_WEIGHT_BUTTONS[1],
  },
};

/** Page specific footer CTA with catalog first buttons and optional catalog bridge in copy. */
export function makeFooterCta(
  title: string,
  description: string,
  variant: keyof typeof footerCta = 'default',
): FooterCtaData {
  const base = footerCta[variant];
  return {
    title,
    description: withCatalogBridge(description),
    primaryButton: base.primaryButton,
    secondaryButton: base.secondaryButton,
  };
}
