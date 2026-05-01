/**
 * Pricing Guide Page - ingenious targeting laboratory
 *
 * Gated route. The actual numbers live in PricingGuideClient and are only
 * served once the visitor has submitted a work email through
 * /api/unlock-pricing (which sets the itl_pricing_unlock cookie that
 * src/proxy.ts middleware verifies).
 *
 * Metadata is intentionally noindex/nofollow and contains no dollar amounts —
 * we never want the price table to appear in search snippets or OG previews.
 */

import type { Metadata } from 'next';
import PricingGuideClient from './PricingGuideClient';

export const metadata: Metadata = {
  title: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
  description:
    'Detailed pricing reference for custom mouse, rat, and rabbit models. Available after submitting your work email. Guaranteed germline-confirmed delivery with flexible funding options.',
  alternates: {
    canonical: 'https://www.genetargeting.com/pricing-guide',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
    description:
      'Detailed pricing reference for custom mouse, rat, and rabbit models. Available after submitting your work email.',
    url: 'https://www.genetargeting.com/pricing-guide',
    siteName: 'ingenious targeting laboratory',
    type: 'website',
    images: [
      {
        url: 'https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Model%20Pricing%20Guide&line2=Knockout%2C%20Knockin%20%26%20Humanized%20Models&line3=Add%20your%20work%20email%20to%20view',
        width: 1200,
        height: 630,
        alt: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
    description:
      'Detailed pricing reference for custom mouse, rat, and rabbit models. Available after submitting your work email.',
    images: [
      'https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Model%20Pricing%20Guide&line2=Knockout%2C%20Knockin%20%26%20Humanized%20Models&line3=Add%20your%20work%20email%20to%20view',
    ],
  },
};

export default function PricingGuidePage() {
  return <PricingGuideClient />;
}
