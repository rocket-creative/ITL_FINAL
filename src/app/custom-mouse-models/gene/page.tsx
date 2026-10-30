import type { Metadata } from 'next';
import { CustomGeneIndex } from '@/components/custom-gene-pages/CustomGenePage';
import { customGeneIndexPath } from '@/content/custom-gene-pages/registry';
import { generateMetadata as buildMetadata } from '@/lib/seo/generateMetadata';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Gene model pages',
    description: 'Model generation pages for individual genes.',
    path: customGeneIndexPath(),
    catalogFirst: false,
  });
}

export default function GeneModelIndexPage() {
  return <CustomGeneIndex />;
}
