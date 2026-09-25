/**
 * SEO Metadata for Mouse Breeding Services
 * Hub page for the breeding cluster.
 *
 * catalogFirst is off so the title helper does not replace the second
 * segment with "Catalog + Generation". The description still gets the
 * catalog-first prefix.
 */

import { applyCatalogFirstDescription, generateBreadcrumbs, generateMetadata } from '@/lib/seo';

const DESCRIPTION =
  'Outsource your mouse breeding to a U.S. barrier facility. Colony maintenance, cohort production, genotyping, and monthly reporting. Serving 900+ labs since 1998.';

export const metadata = generateMetadata({
  title: 'Mouse Breeding Services | Contract Colony Breeding',
  description: applyCatalogFirstDescription(DESCRIPTION, '/mouse-breeding-services'),
  path: '/mouse-breeding-services',
  catalogFirst: false,
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Mouse Breeding Services', path: '/mouse-breeding-services' },
  ],
});
