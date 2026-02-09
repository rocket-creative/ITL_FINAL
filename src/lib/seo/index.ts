/**
 * SEO Utilities
 * Central export for all SEO-related utilities
 */

export {
  generateMetadata,
} from './generateMetadata';

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
