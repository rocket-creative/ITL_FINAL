/**
 * Organization identity, single source of truth
 *
 * Every JSON-LD block that names, addresses, or phones the company must read
 * from this module. Before it existed the Organization node was copy-pasted
 * into the root layout, homepage, about page, and contact page, and the copies
 * had drifted apart, most visibly on the telephone number.
 *
 * @see scripts/audit-schema.mjs which validates emitted JSON-LD against NAP
 */

import { BASE_URL, SITE_NAME } from './types';

/** Canonical node identifier. Reference this instead of re-declaring the org. */
export const ORG_ID = `${BASE_URL}/#organization`;

/** Canonical WebSite node identifier. */
export const WEBSITE_ID = `${BASE_URL}/#website`;

/**
 * Name, address, phone. These values must match what renders in the footer,
 * on /contact/, and on the legal pages.
 */
export const NAP = {
  name: SITE_NAME,
  legalName: 'ingenious targeting laboratory',
  url: `${BASE_URL}/`,
  telephone: '+1-631-468-8534',
  telephoneDisplay: '(631) 468-8534',
  telephoneHref: 'tel:+16314688534',
  email: 'inquiry@genetargeting.com',
  foundingDate: '1998',
  foundingLocation: 'Holbrook, NY, United States',
  address: {
    streetAddress: '761-80 Coates Avenue',
    addressLocality: 'Holbrook',
    addressRegion: 'NY',
    postalCode: '11741',
    addressCountry: 'US',
  },
} as const;

/** PostalAddress node built from NAP. */
export const postalAddressNode = {
  '@type': 'PostalAddress',
  streetAddress: NAP.address.streetAddress,
  addressLocality: NAP.address.addressLocality,
  addressRegion: NAP.address.addressRegion,
  postalCode: NAP.address.postalCode,
  addressCountry: NAP.address.addressCountry,
} as const;

/**
 * Lightweight reference to the Organization node.
 *
 * Use this for `provider`, `publisher`, and `seller` so the full definition is
 * declared once per page at most. Google resolves the `@id` against the node
 * emitted by the root layout.
 */
export const organizationRef = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: NAP.name,
  url: NAP.url,
} as const;

/**
 * Provider reference with full contact detail, for service pages where the
 * build spec calls for address and telephone inline.
 */
export const organizationProviderNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: NAP.name,
  url: NAP.url,
  telephone: NAP.telephone,
  email: NAP.email,
  foundingDate: NAP.foundingDate,
  address: postalAddressNode,
} as const;

/** Primary customer service contact point. */
export const contactPointNode = {
  '@type': 'ContactPoint',
  telephone: NAP.telephone,
  contactType: 'customer service',
  email: NAP.email,
  areaServed: 'Worldwide',
  availableLanguage: 'English',
} as const;

const KNOWS_ABOUT = [
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
  'Mouse cohort development',
  'Contract mouse breeding',
  'Colony management',
  'Cryopreservation',
];

const SAME_AS = [
  'https://www.linkedin.com/company/ingenious-targeting-laboratory',
  'https://www.youtube.com/@ingeniouslab',
];

/**
 * Full Organization node. Emit at most once per page.
 *
 * The root layout emits this sitewide, so individual pages should normally use
 * `organizationRef` or `organizationProviderNode` instead.
 */
export const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: NAP.name,
  alternateName: ['iTL', 'ingenious targeting lab'],
  url: NAP.url,
  logo: `${BASE_URL}/images/logo.png`,
  description:
    'Ingenious targeting laboratory (iTL) is a U.S. based mouse model generation company that has delivered 2,800+ genetically engineered mouse models since 1998, backed by a 100% germline transmission guarantee, in house U.S. scientific oversight at every QC stage, and specialization in complex multi allele and humanized models on defined C57BL/6 backgrounds.',
  slogan:
    'Mouse model generation, U.S. scientific oversight, 100% germline transmission guarantee.',
  foundingDate: NAP.foundingDate,
  foundingLocation: NAP.foundingLocation,
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 200 },
  award: [
    '100% germline transmission guarantee on every model generation project',
    '800+ peer reviewed publications citing iTL generated models',
  ],
  knowsAbout: KNOWS_ABOUT,
  address: postalAddressNode,
  contactPoint: contactPointNode,
  sameAs: SAME_AS,
} as const;

/** WebSite node with sitewide SearchAction. */
export const webSiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: NAP.url,
  name: NAP.name,
  description:
    'U.S. based mouse model generation company. Knockout, knockin, humanized, and transgenic models since 1998 with a 100% germline transmission guarantee.',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      // Trailing slash before the query, since next.config sets trailingSlash: true
      // and /search?q= would otherwise 308-redirect.
      urlTemplate: `${BASE_URL}/search/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const;
