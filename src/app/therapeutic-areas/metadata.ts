/**
 * SEO Metadata for Therapeutic Areas
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Mouse Models by Therapeutic Area',
  description: 'Mouse model generation for oncology, neuroscience, immunology, cardiovascular, and metabolic disease research. Disease specific expertise.',
  path: '/therapeutic-areas',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Therapeutic Areas', path: '/therapeutic-areas' },
  ],
});
