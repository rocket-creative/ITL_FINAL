/**
 * SEO Metadata for Glossary
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Glossary',
  description: 'Glossary from ingenious targeting laboratory. Custom mouse model engineering since 1998.',
  path: '/glossary',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary' },
  ],
});
