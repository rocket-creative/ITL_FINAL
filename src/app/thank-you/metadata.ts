/**
 * SEO Metadata for Thank You Page
 * Auto-generated for canonical URLs and structured data
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Thank You',
  description: 'Thank you for your inquiry. Our team will review your request and respond within one business day.',
  path: '/thank-you',
  catalogFirst: false,
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Thank You', path: '/thank-you' },
  ],
});
