/**
 * SEO Metadata for In House vs Outsourced Mouse Breeding
 * Guide page, not a service page. Article schema lives in page.tsx.
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'In House vs Outsourced Mouse Breeding: How to Decide',
  description:
    'Compare in house vivarium breeding against outsourced colony management on cost, cage space, cohort timing, and genetic integrity. Includes a cost worksheet.',
  path: '/in-house-vs-outsourced-mouse-breeding',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    {
      name: 'In House vs Outsourced Mouse Breeding',
      path: '/in-house-vs-outsourced-mouse-breeding',
    },
  ],
});
