/**
 * Sitemap Generator - Dynamic sitemap including all indexable pages
 * Includes static pages, blog, glossary, Lab Signals, and legacy content
 */

import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllBlogSlugs } from '@/lib/blog/blogUtils';
import { glossaryTerms } from '@/data/glossaryTerms';
import { getAllArticleSlugs } from '@/data/newsletterArticles';
import { BASE_URL } from '@/lib/seo/types';
import { getAllGeneNames } from '@/lib/catalog/serverCatalog';

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

function url(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${normalized}${normalized ? '/' : ''}`;
}

function getLegacySlugs(): string[] {
  try {
    const legacyDir = path.join(process.cwd(), 'src/content/legacy');
    const files = fs.readdirSync(legacyDir);
    return files
      .filter((file) => file.endsWith('.md') && !file.startsWith('_') && file !== 'README.md')
      .map((file) => file.replace('.md', ''));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: SitemapEntry[] = [];

  // Static pages from START-HERE (with additional pages)
  const staticPages = [
    '',
    '/about-itl',
    '/request-quote',
    '/why-choose-itl',
    '/resources',
    '/contact',
    '/current-openings',
    '/faq',
    '/scientific-leadership',
    '/quality-control',
    '/conditional-knockout-vs-conventional-knockout',
    '/mouse-strain-backgrounds',
    '/testimonials',
    '/schedule-meeting',
    '/video-library',
    '/technology-overview',
    '/post-project-services',
    '/start-your-project',
    '/custom-mouse-models',
    '/custom-mouse-model-companies',
    '/knockout-mouse-models',
    '/conditional-knockout-mouse-models',
    '/conventional-knockout-mouse-models',
    '/tissue-specific-knockout',
    '/inducible-conditional-knockout',
    '/knockin-mouse-models',
    '/point-mutation-mice',
    '/reporter-knockin',
    '/tag-knockin-mice',
    '/humanized-mouse-models',
    '/pd1-humanized-mice',
    '/pdl1-humanized-mice',
    '/ctla4-humanized-mice',
    '/lag3-humanized-mice',
    '/tim3-humanized-mice',
    '/gene-replacement',
    '/transgenic-mouse-service',
    '/therapeutic-areas',
    '/oncology-mouse-models',
    '/immuno-oncology-mouse-models',
    '/syngeneic-tumor-models',
    '/tumor-suppressor-knockout-mice',
    '/neuroscience-mouse-models',
    '/alzheimers-mouse-models',
    '/parkinsons-mouse-models',
    '/als-mouse-models',
    '/metabolic-disease-mouse-models',
    '/diabetes-mouse-models',
    '/obesity-mouse-models',
    '/nash-mash-mouse-models',
    '/immunology-mouse-models',
    '/autoimmune-disease-mice',
    '/ibd-mouse-models',
    '/lupus-mouse-models',
    '/cardiovascular-mouse-models',
    '/atherosclerosis-mouse-models',
    '/heart-failure-mouse-models',
    '/rare-disease-mouse-models',
    '/muscular-dystrophy-mouse-models',
    '/ophthalmology-mouse-models',
    '/technologies',
    '/cre-lox-system',
    '/loxp-site-design',
    '/cre-recombinase-mice',
    '/tissue-specific-cre-lines',
    '/flp-frt-system',
    '/inducible-gene-expression',
    '/tamoxifen-inducible-cre',
    '/critical-exon-selection',
    '/c57bl6-mouse-background',
    '/c57bl6j-vs-c57bl6n',
    '/balbc-mouse-background',
    '/backcrossing-services',
    '/research-applications',
    '/target-validation-mouse-models',
    '/efficacy-testing-mouse-models',
    '/gene-therapy-mouse-models',
    '/antibody-therapeutics-mouse-models',
    '/cell-therapy-mouse-models',
    '/lineage-tracing-mouse-models',
    '/gene-function-studies',
    '/pathway-analysis-mice',
    '/biomarker-discovery-mice',
    '/mouse-model-services',
    '/custom-projects',
    '/support-services',
    '/colony-management-services',
    '/cryopreservation-services',
    '/rederivation-services',
    '/speed-expansion-breeding',
    '/preclinical-services',
    '/phenotyping-services',
    '/mouse-genotyping-service',
    '/catalog-mouse-models',
    '/all-catalog-mouse-models',
    '/humanized-immune-checkpoint-mice',
    '/reporter-mouse-catalog',
    '/single-checkpoint-mice',
    '/double-checkpoint-mice',
    '/disease-model-catalog',
    '/order-catalog-models',
    '/knockout-strategy-guide',
    '/conditional-vs-conventional-guide',
    '/humanization-strategy-guide',
    '/reporter-selection-guide',
    '/cre-line-selection-guide',
    '/safe-harbor-locus',
    '/rosa26',
    '/rapid-rosa26-targeting',
    '/hprt-locus-targeting',
    '/h11-safe-harbor',
    '/fast-mice',
    '/bac-to-bac-large-scale-targeting',
    '/knockout-first-allele',
    '/inducible-rosa26',
    '/flag-tag-knockin',
    '/ha-tag-knockin',
    '/gfp-knockin-mice',
    '/tdtomato-knockin-mice',
    '/lacz-knockin-mice',
    '/conditional-knockin-mice',
    '/type-1-diabetes-mice',
    '/type-2-diabetes-mice',
    '/huntingtons-mouse-models',
    '/epilepsy-mouse-models',
    '/autism-mouse-models',
    '/depression-anxiety-mouse-models',
    '/allergy-asthma-mouse-models',
    '/rheumatoid-arthritis-mice',
    '/inflammatory-disease-mice',
    '/hypertension-mouse-models',
    '/cardiac-fibrosis-mice',
    '/cystic-fibrosis-mice',
    '/rat-models',
    '/knockout-rat-models',
    '/knockin-rat-models',
    '/transgenic-rat-models',
    '/custom-rabbit-models',
    '/custom-animal-models',
    '/cdna-knockin',
    '/ingenious-blog',
    '/lab-signals',
    '/search',
    '/privacy',
    '/terms',
    '/accessibility',
  ];

  // Pages that drive revenue directly. Bumped to priority 1.0 to push
  // Google to crawl them more often and weight them ahead of educational
  // long-tail. These match the GSC commercial-intent queries we are
  // trying to capture (humanized services/price, transgenic, knockin,
  // catalog gene queries, etc.).
  const REVENUE_PILLARS = new Set([
    '/all-catalog-mouse-models',
    '/order-catalog-models',
    '/humanized-mouse-models',
    '/humanized-mouse-services',
    '/point-mutation-mice',
    '/knockout-mouse-models',
    '/knockin-mouse-models',
    '/conditional-knockout-mouse-models',
    '/conventional-knockout-mouse-models',
    '/tamoxifen-inducible-cre',
    '/transgenic-mouse-service',
    '/mouse-genotyping-service',
    '/custom-mouse-models',
    '/cre-recombinase-mice',
    '/cre-lox-system',
    '/pricing-guide',
    '/custom-mouse-model-pricing',
    '/request-quote',
    '/start-your-project',
  ]);

  // Comparison/pillar pages that should rank highly for AI and search
  const highPriorityPaths = new Set(['/custom-mouse-model-companies']);

  for (const route of staticPages) {
    const pathStr = route || '/';
    const isHighPriorityPillar = highPriorityPaths.has(route);
    const isRevenuePillar = REVENUE_PILLARS.has(route);
    let priority = 0.8;
    if (route === '') priority = 1;
    else if (isRevenuePillar) priority = 1.0;
    else if (isHighPriorityPillar) priority = 0.9;
    else if (route.includes('catalog') || route.includes('request-quote')) priority = 0.9;
    entries.push({
      url: url(pathStr === '/' ? '' : route),
      lastModified: new Date(),
      changeFrequency:
        route === '' || isRevenuePillar
          ? 'weekly'
          : route.includes('catalog') || isHighPriorityPillar
            ? 'weekly'
            : 'monthly',
      priority,
    });
  }

  // Always include the new revenue pillars even if not listed above
  for (const route of REVENUE_PILLARS) {
    if (!staticPages.includes(route)) {
      entries.push({
        url: url(route),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
      });
    }
  }

  // Blog posts — keep at 0.7. Top-traffic posts now act as funnels into
  // the catalog (priority 1.0) and revenue pillars, not as terminal pages.
  const blogSlugs = getAllBlogSlugs();
  for (const slug of blogSlugs) {
    entries.push({
      url: url(`/ingenious-blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Glossary terms — same rationale as blog
  for (const term of glossaryTerms) {
    entries.push({
      url: url(`/mouse-genetics-glossary/${term.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Lab Signals — newsletter content, dropped to 0.4. Not aligned with
  // revenue lever; should not compete with commercial pages for crawl budget.
  const labSignalsSlugs = getAllArticleSlugs();
  for (const slug of labSignalsSlugs) {
    entries.push({
      url: url(`/lab-signals/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    });
  }

  // Legacy pages — dropped to 0.3. These are archival; do not compete
  // with revenue pillars for Google crawl budget.
  const legacySlugs = getLegacySlugs();
  for (const slug of legacySlugs) {
    entries.push({
      url: url(`/legacy/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  }

  // Gene pages — bumped to 0.9. These are the off-the-shelf catalog
  // surface. Each one is a Product page eligible for Merchant Listings
  // rich results and a direct purchase path.
  const geneNames = await getAllGeneNames();
  for (const gene of geneNames) {
    entries.push({
      url: url(`/all-catalog-mouse-models/gene/${encodeURIComponent(gene)}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  return entries;
}
