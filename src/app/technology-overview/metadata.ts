/**
 * SEO Metadata for Technology Overview
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Gene Targeting Technology Overview',
  description: 'Overview of gene targeting technologies for mouse model generation. ES cell targeting, CRISPR, Cre lox, and knockin strategies explained.',
  path: '/technology-overview',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Technology Overview', path: '/technology-overview' },
  ],
});
