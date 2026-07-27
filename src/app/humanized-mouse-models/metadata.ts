/**
 * SEO Metadata for Humanized Mouse Models / Services
 * Targets buyer-intent queries: "humanized mouse services",
 * "humanized mice price", "humanized mouse model".
 */

import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Humanized Mouse Services & Pricing | Model Generation Humanized Mice',
  description:
    'Humanized mouse services since 1998. Drug-target & immune checkpoint humanization (PD1/PDL1/CTLA4/LAG3/TIM3). Pricing & 24h quote. 800+ publications.',
  path: '/humanized-mouse-models',
});

// BreadcrumbList structured data
export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Model Generation', path: '/custom-mouse-models' },
    { name: 'Humanized Mouse Models', path: '/humanized-mouse-models' },
  ],
});
