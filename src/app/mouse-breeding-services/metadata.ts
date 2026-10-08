/**
 * SEO Metadata for Mouse Breeding Services
 * Hub page for the breeding cluster.
 *
 * catalogFirst is off, and the path is a revenue pillar, so the title and
 * description are not rewritten with catalog language.
 */

import { generateBreadcrumbs, generateMetadata } from '@/lib/seo';
import { BREEDING_DESCRIPTION } from './structuredData';

export const metadata = generateMetadata({
  title: 'Mouse Breeding Services | Contract Colony Breeding',
  description: BREEDING_DESCRIPTION,
  path: '/mouse-breeding-services',
  catalogFirst: false,
});

export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Mouse Breeding Services', path: '/mouse-breeding-services' },
  ],
});
