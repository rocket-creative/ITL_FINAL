/**
 * Catalog first → custom when ready commercial CTAs.
 * Shared across hub pages, StartProjectCTA, and footer CTA sections.
 */

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
  'Most projects begin with an established catalog mouse model. When your program needs conditional, mutation, or humanization beyond the library, our team designs and delivers the exact custom line your study requires.';

export const CATALOG_CUSTOM_BUTTONS: CtaButton[] = [
  { label: 'Browse Catalog Models', href: COMMERCIAL_LINKS.catalogHub },
  { label: 'Request a Custom Quote', href: COMMERCIAL_LINKS.requestQuote },
];

export const CATALOG_ALL_CUSTOM_BUTTONS: CtaButton[] = [
  { label: 'Browse 14,774+ Models', href: COMMERCIAL_LINKS.catalogAll },
  { label: 'Request a Custom Quote', href: COMMERCIAL_LINKS.requestQuote },
];

export const startProjectDefaults = {
  title: 'Catalog first. Custom when your study needs more.',
  content: CATALOG_FIRST_BRIDGE,
  buttons: CATALOG_CUSTOM_BUTTONS,
};

export const heroCtaPair = {
  catalog: CATALOG_CUSTOM_BUTTONS[0],
  custom: CATALOG_CUSTOM_BUTTONS[1],
};

/** Append catalog bridge when page-specific copy does not mention the catalog. */
export function withCatalogBridge(content: string): string {
  if (/catalog/i.test(content)) {
    return content;
  }
  return `${content} Browse 14,774+ catalog models for a faster start, or request a custom line when your program needs a specific allele configuration.`;
}

export const footerCta: Record<'default' | 'catalog' | 'publications' | 'diseaseCatalog', FooterCtaData> = {
  default: {
    title: 'Catalog first. Custom when ready.',
    description: CATALOG_FIRST_BRIDGE,
    primaryButton: CATALOG_CUSTOM_BUTTONS[0],
    secondaryButton: CATALOG_CUSTOM_BUTTONS[1],
  },
  catalog: {
    title: 'Find your line in the catalog',
    description:
      'Explore 14,774+ study ready mouse and rat models. Need conditional, mutation, or humanization beyond the library? Request a custom quote and our scientific team will scope the exact line for your program.',
    primaryButton: CATALOG_ALL_CUSTOM_BUTTONS[0],
    secondaryButton: CATALOG_ALL_CUSTOM_BUTTONS[1],
  },
  publications: {
    title: 'Partner with iTL',
    description:
      'ingenious targeting laboratory provided the mouse model. Scientific findings are the work of the authors. Most programs start in the catalog. When your study outgrows off the shelf, request a custom line.',
    primaryButton: CATALOG_CUSTOM_BUTTONS[0],
    secondaryButton: CATALOG_CUSTOM_BUTTONS[1],
  },
  diseaseCatalog: {
    title: 'Browse disease model catalog',
    description:
      'Review study ready disease model lines in the catalog. When the exact allele or combination is not listed, request a custom quote for the line your program requires.',
    primaryButton: { label: 'Browse Catalog Models', href: COMMERCIAL_LINKS.catalogAll },
    secondaryButton: CATALOG_CUSTOM_BUTTONS[1],
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
