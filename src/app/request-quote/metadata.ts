import type { Metadata } from 'next';
import { applyCatalogFirstMeta } from '@/lib/seo';

const base = applyCatalogFirstMeta(
  'Mouse Model Quote Request | Catalog Search + Custom Quote',
  'Request a custom mouse model quote for knockout, knockin, humanized, or conditional models. Free consultation included.',
  '/request-quote',
);

export const metadata: Metadata = {
  title: `${base.title} | ingenious targeting laboratory`,
  description: base.description,
  alternates: {
    canonical: 'https://www.genetargeting.com/request-quote',
  },
  openGraph: {
    title: `${base.title} | ingenious targeting laboratory`,
    description: base.description,
    type: 'website',
  },
};
