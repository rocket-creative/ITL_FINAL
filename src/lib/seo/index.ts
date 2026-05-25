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
  BASE_URL,
  SITE_NAME,
  DEFAULT_METADATA,
  type PageMetadataOptions,
  type BreadcrumbItem,
  type BreadcrumbOptions,
} from './types';
