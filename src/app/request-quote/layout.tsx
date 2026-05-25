import type { Metadata } from 'next';
import { applyCatalogFirstMeta } from '@/lib/seo';

const base = applyCatalogFirstMeta(
  'Request a Project Quote | Catalog Search + Custom Quote',
  'Request a custom mouse model quote. Include project details for knockout, knockin, humanized, or conditional models. Free consultation included.',
  '/request-quote',
);

export const metadata: Metadata = {
  title: `${base.title} | ingenious targeting laboratory`,
  description: base.description,
  keywords: 'mouse model quote request, catalog mouse models, custom mouse model pricing, project quote, gene targeting quote',
};

export default function RequestQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
