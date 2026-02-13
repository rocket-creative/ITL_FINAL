/**
 * SEO Metadata for Lab Signals
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Lab Signals Blog',
  description: 'Technical articles on mouse model design, gene targeting strategies, and research applications. Tips from iTL scientists.',
  path: '/lab-signals',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Lab Signals', path: '/lab-signals' },
  ],
});
