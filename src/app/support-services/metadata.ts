/**
 * SEO Metadata for Support Services
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Mouse Model Support Services',
  description: 'Colony management, breeding, genotyping, cryopreservation, and rederivation services. Full support for your mouse model research.',
  path: '/support-services',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Support Services', path: '/support-services' },
  ],
});
