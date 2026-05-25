import type { Metadata } from 'next';
import { buildStandalonePageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStandalonePageMetadata({
  path: '/why-choose-itl',
  title: 'Why Choose ingenious targeting laboratory | Catalog + Custom',
  description:
    'Why researchers choose iTL. Browse 14,774+ catalog models or request custom knockout, knockin, and humanized lines. 2,800+ custom projects and 800+ publications since 1998.',
});

export default function WhyChooseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
