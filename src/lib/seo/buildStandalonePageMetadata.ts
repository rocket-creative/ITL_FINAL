/**
 * Build Metadata for pages that do not use generateMetadata().
 */
import type { Metadata } from 'next';
import { applyCatalogFirstMeta } from './catalogFirstMeta';
import { BASE_URL, SITE_NAME } from './types';

export function buildStandalonePageMetadata(options: {
  path: string;
  title: string;
  description: string;
  catalogFirst?: boolean;
  index?: boolean;
  follow?: boolean;
}): Metadata {
  const {
    path,
    title,
    description,
    catalogFirst = true,
    index = true,
    follow = true,
  } = options;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${BASE_URL}${normalizedPath}${normalizedPath !== '/' ? '/' : ''}`;
  const commercial = applyCatalogFirstMeta(title, description, normalizedPath, catalogFirst);
  // Bare title only. Root layout template appends the brand once.
  const pageTitle = commercial.title.replace(/\s*\|\s*(ITL|iTL|ingenious targeting laboratory)\s*$/i, '').trim();
  const brandedTitle = `${pageTitle} | ${SITE_NAME}`;

  return {
    title: pageTitle,
    description: commercial.description,
    alternates: { canonical: fullUrl },
    robots: { index, follow },
    openGraph: {
      title: brandedTitle,
      description: commercial.description,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: commercial.description,
    },
  };
}
