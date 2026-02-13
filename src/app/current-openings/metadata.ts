/**
 * SEO Metadata for Current Openings
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Careers at iTL',
  description: 'Join the iTL team. Career opportunities in mouse genetics, molecular biology, animal care, and laboratory operations.',
  path: '/current-openings',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Current Openings', path: '/current-openings' },
  ],
});
