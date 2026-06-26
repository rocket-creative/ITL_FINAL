/**
 * SEO Metadata for Resources
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Mouse Model Research Resources',
  description: 'Guides, FAQs, and educational content for planning mouse model experiments. Knockout strategies, Cre lines, and strain selection.',
  path: '/resources',
  catalogFirst: false,
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
  ],
});
