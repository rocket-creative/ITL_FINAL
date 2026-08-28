/**
 * SEO Metadata for Phenotyping Services
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Mouse Phenotyping Services',
  description: 'Characterize mouse model phenotypes with behavioral, metabolic, and histological analysis. Validate gene function and disease relevance.',
  path: '/phenotyping-services',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Support Services', path: '/support-services' },
    { name: 'Phenotyping Services', path: '/phenotyping-services' },
  ],
});
