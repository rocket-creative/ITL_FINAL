/**
 * SEO Metadata for hIL4/hIL4R Dual Humanized IL4/IL4R Mouse Model
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'hIL4/hIL4R Dual Humanized IL4/IL4R Mouse',
  description:
    'The hIL4/hIL4R dual humanized mouse model supports IL4/IL13 signaling research and anti IL4/IL4R therapeutic development. Catalog HU 2000106. Repository live (ready to ship).',
  path: '/featured-model/hil4-hil4r',
});

export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Catalog Models', path: '/catalog-mouse-models' },
    { name: 'Featured Model', path: '/featured-model' },
    { name: 'hIL4/hIL4R', path: '/featured-model/hil4-hil4r' },
  ],
});
