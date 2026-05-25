import type { Metadata } from 'next';
import { buildStandalonePageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStandalonePageMetadata({
  path: '/about-itl',
  title: 'About ingenious targeting laboratory | Catalog + Custom Since 1998',
  description:
    'iTL has delivered 2,800+ custom mouse models and maintains a 14,774+ model catalog. Learn about our mission, scientific team, and study ready lines.',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
