/**
 * SEO Metadata for Resources
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Resources',
  description: 'Research resources including guides, FAQs, and educational content for mouse model development.',
  path: '/resources',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
  ],
});
