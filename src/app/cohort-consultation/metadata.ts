/**
 * SEO Metadata for the Mouse Breeding and Cohort Consultation page
 * Canonical URL, OpenGraph card, and BreadcrumbList source of truth
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Request a Mouse Breeding and Cohort Consultation',
  description:
    'Send your line, target genotype, animal count, and study date. A PhD scientist returns a breeding scheme and quote. No charge for the consultation.',
  path: '/cohort-consultation',
  ogImage:
    '/api/og?line1=Breeding%20and%20Cohort%20Consultation&line2=Cross%20Path%2C%20Yields%2C%20Pair%20Count%2C%20Quote&line3=No%20Charge%20%7C%20PhD%20Review',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Cohort Consultation', path: '/cohort-consultation' },
  ],
});
