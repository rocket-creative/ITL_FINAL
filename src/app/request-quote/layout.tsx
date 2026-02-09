import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Project Quote | Custom Mouse Model Pricing | ingenious targeting laboratory',
  description: 'Request a custom mouse model quote. Include project details for knockout, knockin, humanized, or conditional models. Free consultation included.',
  keywords: 'mouse model quote request, custom mouse model pricing, project quote, gene targeting quote',
};

export default function RequestQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
