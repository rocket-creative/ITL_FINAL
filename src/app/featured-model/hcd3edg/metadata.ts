/**
 * SEO Metadata for hCD3EDG Triple Humanized CD3 Mouse Model
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'hCD3EDG Triple Humanized CD3 Mouse Model',
  description:
    'hCD3EDG: the endogenous mouse Cd3e/Cd3d/Cd3g genes were replaced by human CD3E/CD3D/CD3G gene. Catalog NM-HU-220120. Strain state Repository Live.',
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
