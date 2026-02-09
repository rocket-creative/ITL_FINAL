/**
 * SEO Metadata for Publications
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Publications',
  description: 'Publications from ingenious targeting laboratory. Custom mouse model engineering since 1998.',
  path: '/publications',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Publications', path: '/publications' },
  ],
});
