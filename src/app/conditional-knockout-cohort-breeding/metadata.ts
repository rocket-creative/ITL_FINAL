/**
 * SEO Metadata for Conditional Knockout Cohort Breeding
 * Canonical URL + BreadcrumbList structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Conditional Knockout Cohort Breeding | Flox Cre Crosses',
  description:
    'Breeding schemes for conditional knockout cohorts: flox and Cre crosses, expected yields, linkage checks, and matched littermate controls. PhD designed, U.S. based.',
  path: '/conditional-knockout-cohort-breeding',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    {
      name: 'Conditional Knockout Cohort Breeding',
      path: '/conditional-knockout-cohort-breeding',
    },
  ],
});
