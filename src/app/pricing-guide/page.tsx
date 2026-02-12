/**
 * Pricing Guide Page - ingenious targeting laboratory
 * Displays detailed pricing for custom mouse, rat, and rabbit models
 */

import type { Metadata } from 'next';
import PricingGuideClient from './PricingGuideClient';

export const metadata: Metadata = {
  title: 'Custom Mouse Model Pricing Guide | Knockout, Knockin & Humanized Models | ingenious targeting laboratory',
  description: 'View transparent pricing for custom mouse, rat, and rabbit models. From $17,297 for knockouts to advanced TruHumanization models. Guaranteed germline-confirmed delivery with flexible funding options.',
  alternates: {
    canonical: 'https://www.genetargeting.com/pricing-guide',
  },
  openGraph: {
    title: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
    description: 'View transparent pricing for custom mouse, rat, and rabbit models. From $17,297 for knockouts to advanced TruHumanization models.',
    url: 'https://www.genetargeting.com/pricing-guide',
    siteName: 'ingenious targeting laboratory',
    type: 'website',
    images: [
      {
        url: 'https://www.genetargeting.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ingenious targeting laboratory - Custom Mouse Model Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
    description: 'View transparent pricing for custom mouse, rat, and rabbit models. From $17,297 for knockouts to advanced TruHumanization models.',
    images: ['https://www.genetargeting.com/images/og-image.png'],
  },
};

export default function PricingGuidePage() {
  return <PricingGuideClient />;
}
