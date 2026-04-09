/**
 * SEO Metadata for hCD3EDG Triple Humanized CD3 Mouse Model
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'hCD3EDG Triple Humanized CD3 Mouse',
  description:
    'The hCD3EDG triple humanized CD3 model is one of the most in-demand tools for bispecific T cell engager (TCE) development. Catalog HU 220120. Repository live (ready to ship).',
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
