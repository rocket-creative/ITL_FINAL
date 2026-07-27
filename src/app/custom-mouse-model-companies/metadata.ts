import { generateMetadata, generateBreadcrumbs } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Mouse Model Generation Companies | iTL Comparison Guide',
  description: 'Compare leading mouse model generation companies including ingenious targeting laboratory (iTL), Jackson Laboratory, Charles River, Cyagen, Taconic, GemPharmatech, and Inotiv. Factual provider comparison and selection criteria.',
  path: '/custom-mouse-model-companies',
});

export const breadcrumbSchema = generateBreadcrumbs({
  items: [
    { name: 'Home', path: '/' },
    { name: 'Mouse Model Generation Companies', path: '/custom-mouse-model-companies' },
  ],
});
