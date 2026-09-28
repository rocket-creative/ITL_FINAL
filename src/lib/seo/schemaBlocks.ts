/**
 * JSON-LD block builders
 *
 * Emits Schema.org nodes with a stable `@id`, trailing-slash URLs matching
 * `trailingSlash: true` in next.config.ts, and `provider`/`publisher` resolved
 * against the canonical Organization node.
 *
 * Pages emit one `<script type="application/ld+json">` per node, matching the
 * existing service-page convention rather than wrapping everything in @graph.
 */

import { BASE_URL } from './types';
import { ORG_ID, organizationProviderNode, organizationRef } from './organization';

/** Normalizes a path to an absolute URL with a trailing slash. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `${BASE_URL}/`;
  const [pathname, hash = ''] = normalized.split('#');
  const withSlash = `${pathname.replace(/\/$/, '')}/`;
  return `${BASE_URL}${withSlash}${hash ? `#${hash}` : ''}`;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OfferCatalogItem {
  name: string;
  /** Optional path to the page describing this offer */
  path?: string;
}

export interface ServiceSchemaOptions {
  name: string;
  /** Page path, e.g. '/mouse-cohort-development' */
  path: string;
  serviceType: string;
  description: string;
  alternateName?: string[];
  keywords?: string;
  audienceType?: string;
  areaServedCountry?: string;
  offerCatalogName?: string;
  offerCatalog?: OfferCatalogItem[];
}

export function buildServiceSchema(options: ServiceSchemaOptions) {
  const {
    name,
    path,
    serviceType,
    description,
    alternateName,
    keywords,
    audienceType,
    areaServedCountry = 'United States',
    offerCatalogName,
    offerCatalog,
  } = options;

  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    ...(alternateName ? { alternateName } : {}),
    provider: organizationProviderNode,
    areaServed: { '@type': 'Country', name: areaServedCountry },
    ...(audienceType
      ? { audience: { '@type': 'Audience', audienceType } }
      : {}),
    ...(keywords ? { keywords } : {}),
    ...(offerCatalog && offerCatalog.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: offerCatalogName ?? `${name} options`,
            itemListElement: offerCatalog.map((offer) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: offer.name,
                ...(offer.path ? { url: absoluteUrl(offer.path) } : {}),
              },
            })),
          },
        }
      : {}),
    url,
  };
}

export function buildFAQSchema(path: string, faqs: FaqItem[]) {
  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export interface ArticleAuthor {
  name: string;
  jobTitle?: string;
  /** Path to a bio page */
  path?: string;
}

export interface ArticleSchemaOptions {
  headline: string;
  path: string;
  description: string;
  datePublished: string;
  dateModified: string;
  /**
   * Named author. Omit to attribute the piece to the organization, which is
   * correct until a bylined scientist is assigned.
   */
  author?: ArticleAuthor;
  keywords?: string;
  about?: string[];
  citation?: { name: string; url: string };
}

function resolveAuthor(author?: ArticleAuthor) {
  if (!author) return organizationRef;
  return {
    '@type': 'Person',
    name: author.name,
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.path ? { url: absoluteUrl(author.path) } : {}),
  };
}

export function buildArticleSchema(options: ArticleSchemaOptions) {
  const {
    headline,
    path,
    description,
    datePublished,
    dateModified,
    author,
    keywords,
    about,
    citation,
  } = options;

  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline,
    description,
    author: resolveAuthor(author),
    publisher: { '@type': 'Organization', '@id': ORG_ID },
    datePublished,
    dateModified,
    ...(about
      ? { about: about.map((name) => ({ '@type': 'Thing', name })) }
      : {}),
    ...(keywords ? { keywords } : {}),
    ...(citation
      ? {
          citation: {
            '@type': 'CreativeWork',
            name: citation.name,
            url: citation.url,
          },
        }
      : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export interface TechArticleSchemaOptions extends ArticleSchemaOptions {
  proficiencyLevel?: string;
  dependencies?: string;
}

export function buildTechArticleSchema(options: TechArticleSchemaOptions) {
  const { proficiencyLevel = 'Expert', dependencies, ...rest } = options;
  const url = absoluteUrl(rest.path);

  return {
    ...buildArticleSchema(rest),
    '@type': 'TechArticle',
    '@id': `${url}#techarticle`,
    proficiencyLevel,
    ...(dependencies ? { dependencies } : {}),
  };
}

export interface ContactPointSpec {
  contactType: string;
  name?: string;
  telephone?: string;
  email?: string;
  areaServed?: string;
}

export interface ContactPageSchemaOptions {
  name: string;
  path: string;
  description: string;
  contactPoints: ContactPointSpec[];
}

export function buildContactPageSchema(options: ContactPageSchemaOptions) {
  const { name, path, description, contactPoints } = options;
  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contactpage`,
    name,
    description,
    url,
    mainEntity: {
      ...organizationProviderNode,
      contactPoint: contactPoints.map((point) => ({
        '@type': 'ContactPoint',
        contactType: point.contactType,
        ...(point.name ? { name: point.name } : {}),
        ...(point.telephone ? { telephone: point.telephone } : {}),
        ...(point.email ? { email: point.email } : {}),
        ...(point.areaServed ? { areaServed: point.areaServed } : {}),
        availableLanguage: 'English',
      })),
    },
  };
}
