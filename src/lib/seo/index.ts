/**
 * SEO Utilities
 * Central export for all SEO-related utilities
 */

export {
  generateMetadata,
} from './generateMetadata';

export {
  applyCatalogFirstMeta,
  applyCatalogFirstDescription,
  enhanceTitleForCatalogFirst,
  ROOT_CATALOG_FIRST_META,
  CATALOG_MODEL_COUNT,
} from './catalogFirstMeta';

export { buildStandalonePageMetadata } from './buildStandalonePageMetadata';

export {
  generateBreadcrumbs,
  type BreadcrumbSchema,
} from './generateBreadcrumbs';

export {
  ORG_ID,
  WEBSITE_ID,
  NAP,
  postalAddressNode,
  contactPointNode,
  organizationRef,
  organizationProviderNode,
  organizationNode,
  webSiteNode,
} from './organization';

export {
  absoluteUrl,
  buildServiceSchema,
  buildFAQSchema,
  buildArticleSchema,
  buildTechArticleSchema,
  buildContactPageSchema,
  type FaqItem,
  type OfferCatalogItem,
  type ServiceSchemaOptions,
  type ArticleAuthor,
  type ArticleSchemaOptions,
  type TechArticleSchemaOptions,
  type ContactPointSpec,
  type ContactPageSchemaOptions,
} from './schemaBlocks';

export {
  BASE_URL,
  SITE_NAME,
  DEFAULT_METADATA,
  type PageMetadataOptions,
  type BreadcrumbItem,
  type BreadcrumbOptions,
} from './types';
