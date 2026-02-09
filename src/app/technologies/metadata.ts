/**
 * SEO Metadata for Technologies
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Technologies',
  description: 'Gene targeting technologies including Cre LoxP, Flp FRT, ES cell targeting, and CRISPR genome editing.',
  path: '/technologies',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Technologies', path: '/technologies' },
  ],
});
