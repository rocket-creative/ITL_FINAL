/**
 * SEO Metadata for Mouse Cohort Development
 * Canonical URL, OpenGraph card, and BreadcrumbList source of truth
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Mouse Cohort Development | Age Matched Study Ready Groups',
  description:
    'Age matched, sex balanced, genotype verified mouse cohorts delivered on your study timeline. U.S. facility, C57BL/6 backgrounds, 2,800+ models since 1998.',
  path: '/mouse-cohort-development',
  ogImage:
    '/api/og?line1=Mouse%20Cohort%20Development&line2=Age%20Matched%20Study%20Ready%20Groups&line3=2%2C800%2B%20Projects%20%7C%20800%2B%20Publications',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/mouse-model-services' },
    { name: 'Mouse Cohort Development', path: '/mouse-cohort-development' },
  ],
});
