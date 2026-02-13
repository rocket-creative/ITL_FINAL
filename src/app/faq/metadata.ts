/**
 * SEO Metadata for FAQ
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'FAQ | Mouse Model Questions',
  description: 'Answers to common questions about custom mouse models, gene targeting, timelines, costs, and model selection. Get the info you need.',
  path: '/faq',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQ', path: '/faq' },
  ],
});
