/**
 * SEO Metadata for Featured Mouse of the Month
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Featured Mouse of the Month',
  description:
    'Each month ingenious targeting laboratory spotlights one humanized catalog mouse model for active therapeutic research. Single, double, and triple humanized models. Contact us to start your project.',
  path: '/featured-model',
});

export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Catalog Models', path: '/catalog-mouse-models' },
    { name: 'Featured Mouse of the Month', path: '/featured-model' },
  ],
});
