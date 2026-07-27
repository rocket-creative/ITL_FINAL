/**
 * SEO Metadata Generation Utility
 * Generates consistent Next.js Metadata objects for all pages
 * 
 * @example
 * ```ts
 * export const metadata = generateMetadata({
 *   title: 'Knockout Mouse Models',
 *   description: 'Generated knockout mouse models for research...',
 *   path: '/knockout-mouse-models',
 * });
 * ```
 */

import type { Metadata } from 'next';
import { applyCatalogFirstMeta } from './catalogFirstMeta';
import { BASE_URL, SITE_NAME, DEFAULT_METADATA, type PageMetadataOptions } from './types';

/**
 * Generates complete Next.js Metadata object for a page
 * 
 * @param options - Page metadata options
 * @returns Next.js Metadata object
 */
export function generateMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    ogImage,
    twitterImage,
    index = true,
    follow = true,
    catalogFirst = true,
  } = options;

  // Ensure path starts with / and ends with / (per next.config trailingSlash: true)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${BASE_URL}${normalizedPath}${normalizedPath !== '/' ? '/' : ''}`;

  const commercial = applyCatalogFirstMeta(title, description, normalizedPath, catalogFirst);
  
  // Format title with site name
  const fullTitle = `${commercial.title} | ${SITE_NAME}`;

  return {
    title: { absolute: fullTitle },
    description: commercial.description,
    alternates: {
      canonical: fullUrl,
    },
    ...DEFAULT_METADATA,
    robots: {
      index,
      follow,
    },
    openGraph: {
      title: fullTitle,
      description: commercial.description,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: commercial.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: commercial.description,
      ...(twitterImage && {
        images: [twitterImage],
      }),
    },
  };
}
