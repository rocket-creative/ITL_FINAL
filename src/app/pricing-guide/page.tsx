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
        url: 'https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Model%20Pricing%20Guide&line2=Knockout%2C%20Knockin%20%26%20Humanized%20Models&line3=Transparent%20Pricing%20from%20%2417%2C297',
        width: 1200,
        height: 630,
        alt: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Mouse Model Pricing Guide | ingenious targeting laboratory',
    description: 'View transparent pricing for custom mouse, rat, and rabbit models. From $17,297 for knockouts to advanced TruHumanization models.',
    images: ['https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Model%20Pricing%20Guide&line2=Knockout%2C%20Knockin%20%26%20Humanized%20Models&line3=Transparent%20Pricing%20from%20%2417%2C297'],
  },
};

export default function PricingGuidePage() {
  return <PricingGuideClient />;
}
