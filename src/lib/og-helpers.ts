/**
 * OG Image Helper Functions
 * Use these to add OG images to your page metadata
 */

import { getOGImageConfig, getOGImageURL } from '@/data/ogImageConfig';
import type { Metadata } from 'next';

/**
 * Generate OG metadata for a given page path
 * 
 * @example
 * export const metadata = generateOGMetadata('/', {
 *   title: 'Mouse Model Generation | iTL',
 *   description: 'Expert gene targeting since 1998...'
 * });
 */
export function generateOGMetadata(
  path: string,
  pageMetadata: {
    title: string;
    description: string;
    canonical?: string;
  },
  baseUrl: string = 'https://www.genetargeting.com'
): Metadata {
  const config = getOGImageConfig(path);
  const ogImageUrl = getOGImageURL(path, baseUrl);
  const canonicalUrl = pageMetadata.canonical || `${baseUrl}${path}`;
  
  // Generate OG title from config or page title
  const ogTitle = config 
    ? `${config.line1} | ingenious targeting laboratory`
    : pageMetadata.title;
  
  // Generate OG description from config or page description
  const ogDescription = config
    ? `${config.line2} - ${config.line3}`
    : pageMetadata.description;

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: 'ingenious targeting laboratory',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
  };
}

/**
 * Get just the OG image URL for a page
 * Useful if you're manually creating metadata
 */
export function getPageOGImage(path: string, baseUrl: string = 'https://www.genetargeting.com'): string {
  return getOGImageURL(path, baseUrl);
}
