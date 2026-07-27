/**
 * SEO Metadata for Preclinical Services
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Preclinical Mouse Study Services',
  description: 'Preclinical efficacy studies using generated and catalog mouse models. Drug screening, target validation, and pharmacology in disease models.',
  path: '/preclinical-services',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Preclinical Services', path: '/preclinical-services' },
  ],
});
