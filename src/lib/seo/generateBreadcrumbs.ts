/**
 * Breadcrumb Schema Generation Utility
 * Generates Schema.org BreadcrumbList structured data
 * 
 * @example
 * ```ts
 * export const breadcrumbSchema = generateBreadcrumbs({
 *   items: [
 *     { name: 'Home', path: '/' },
 *     { name: 'Custom Models', path: '/custom-mouse-models' },
 *     { name: 'Knockout Mouse Models', path: '/knockout-mouse-models' },
 *   ],
 * });
 * ```
 */

import { BASE_URL, type BreadcrumbOptions } from './types';

/**
 * BreadcrumbList schema type
 */
export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generates Schema.org BreadcrumbList structured data
 * 
 * @param options - Breadcrumb options
 * @returns BreadcrumbList schema object
 */
export function generateBreadcrumbs(options: BreadcrumbOptions): BreadcrumbSchema {
  const { items } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      // Ensure path starts with /
      const normalizedPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
      const fullUrl = `${BASE_URL}${normalizedPath}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
}
