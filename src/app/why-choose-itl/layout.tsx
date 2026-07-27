import type { Metadata } from 'next';
import { buildStandalonePageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStandalonePageMetadata({
  path: '/why-choose-itl',
  title: 'Why Choose ingenious targeting laboratory | Catalog + Generation',
  description:
    'Why researchers choose iTL. Browse 14,774+ catalog models or request generated knockout, knockin, and humanized lines. 2,800+ models generated and 800+ publications since 1998.',
});

export default function WhyChooseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
