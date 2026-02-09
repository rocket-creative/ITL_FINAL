/**
 * SEO Metadata for Search
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Search',
  description: 'Search from ingenious targeting laboratory. Custom mouse model engineering since 1998.',
  path: '/search',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
  ],
});
