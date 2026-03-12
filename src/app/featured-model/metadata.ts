/**
 * SEO Metadata for Featured Model of the Month
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Featured Model of the Month',
  description: 'Each month Ingenious Targeting Laboratory spotlights one ready-to-ship catalog mouse model. March 2026: hCD3EDG triple humanized CD3 mouse for bispecific T cell engager research.',
  path: '/featured-model',
});

export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Catalog Models', path: '/catalog-mouse-models' },
    { name: 'Featured Model of the Month', path: '/featured-model' },
  ],
});
