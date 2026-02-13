/**
 * SEO Metadata for Disease Model Catalog
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Disease Mouse Model Catalog',
  description: 'Ready made disease models for cancer, metabolic, autoimmune, and neurological research. Validated phenotypes with faster delivery.',
  path: '/disease-model-catalog',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog-mouse-models' },
    { name: 'Disease Model Catalog', path: '/disease-model-catalog' },
  ],
});
