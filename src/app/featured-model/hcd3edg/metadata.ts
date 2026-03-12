/**
 * SEO Metadata for hCD3EDG Triple Humanized CD3 Mouse Model
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'hCD3EDG Triple Humanized CD3 Mouse Model',
  description: 'hCD3EDG humanizes all three CD3 subunits (epsilon, delta, gamma) on C57BL/6 for bispecific T cell engager preclinical testing. Confirmed efficacy across four bispecific formats. Repository live.',
  path: '/featured-model/hcd3edg',
});

export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Catalog Models', path: '/catalog-mouse-models' },
    { name: 'Featured Model', path: '/featured-model' },
    { name: 'hCD3EDG', path: '/featured-model/hcd3edg' },
  ],
});
