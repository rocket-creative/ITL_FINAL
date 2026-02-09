/**
 * SEO Metadata Generation Utility
 * Generates consistent Next.js Metadata objects for all pages
 * 
 * @example
 * ```ts
 * export const metadata = generateMetadata({
 *   title: 'Knockout Mouse Models',
 *   description: 'Custom knockout mouse models for research...',
 *   path: '/knockout-mouse-models',
 * });
 * ```
 */

import type { Metadata } from 'next';
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
  } = options;

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${BASE_URL}${normalizedPath}`;
  
  // Format title with site name
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
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
      description,
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
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(twitterImage && {
        images: [twitterImage],
      }),
    },
  };
}
