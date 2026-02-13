/**
 * SEO Metadata for Publications
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Scientific Publications',
  description: 'Scientific publications featuring iTL mouse models. Over 800 peer reviewed papers across neuroscience, oncology, immunology, and more.',
  path: '/publications',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Publications', path: '/publications' },
  ],
});
