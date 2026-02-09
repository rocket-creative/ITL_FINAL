/**
 * SEO Type Definitions
 * Shared types for metadata and structured data generation
 */

/**
 * Base URL for the website
 */
export const BASE_URL = 'https://www.genetargeting.com';

/**
 * Site name constant
 */
export const SITE_NAME = 'ingenious targeting laboratory';

/**
 * Default site metadata
 */
export const DEFAULT_METADATA = {
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Options for generating page metadata
 */
export interface PageMetadataOptions {
  /** Page title (will be appended with site name) */
  title: string;
  /** Page description (150-160 characters recommended) */
  description: string;
  /** Canonical URL path (e.g., '/knockout-mouse-models') */
  path: string;
  /** Optional OpenGraph image URL */
  ogImage?: string;
  /** Optional Twitter card image URL */
  twitterImage?: string;
  /** Whether to index this page (default: true) */
  index?: boolean;
  /** Whether to follow links (default: true) */
  follow?: boolean;
}

/**
 * Breadcrumb item for structured data
 */
export interface BreadcrumbItem {
  /** Display name of the breadcrumb item */
  name: string;
  /** URL path (e.g., '/custom-mouse-models') */
  path: string;
}

/**
 * Options for generating breadcrumb schema
 */
export interface BreadcrumbOptions {
  /** Array of breadcrumb items in order */
  items: BreadcrumbItem[];
}
