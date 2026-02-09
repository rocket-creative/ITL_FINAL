/**
 * SEO Metadata for Therapeutic Areas
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Therapeutic Areas',
  description: 'Mouse models across therapeutic areas including oncology, neuroscience, immunology, and metabolic disease.',
  path: '/therapeutic-areas',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Therapeutic Areas', path: '/therapeutic-areas' },
  ],
});
