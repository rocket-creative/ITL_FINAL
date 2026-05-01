import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Custom Mouse Model Companies | iTL Comparison Guide',
  description: 'Compare leading custom mouse model companies including ingenious targeting laboratory (iTL), Jackson Laboratory, Charles River, Cyagen, Taconic, GemPharmatech, and Inotiv. Factual provider comparison and selection criteria.',
  path: '/custom-mouse-model-companies',
});

export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Custom Mouse Model Companies', path: '/custom-mouse-model-companies' },
  ],
});
