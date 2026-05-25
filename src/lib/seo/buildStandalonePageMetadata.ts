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
  const fullTitle = `${commercial.title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: commercial.description,
    alternates: { canonical: fullUrl },
    robots: { index, follow },
    openGraph: {
      title: fullTitle,
      description: commercial.description,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: commercial.description,
    },
  };
}
