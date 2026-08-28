/**
 * SEO Metadata for Contract Mouse Breeding Services
 * Hub page for the breeding cluster.
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Contract Mouse Breeding Services',
  description:
    'Outsource your mouse breeding to a U.S. barrier facility. Colony maintenance, cohort production, genotyping, and monthly reporting. Serving 900+ labs since 1998.',
  path: '/mouse-breeding-services',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Contract Mouse Breeding Services', path: '/mouse-breeding-services' },
  ],
});
