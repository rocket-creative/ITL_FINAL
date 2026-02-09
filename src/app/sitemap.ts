/**
 * Sitemap Generator - Based on START-HERE.docx (130 pages total)
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.genetargeting.com';

  // All 130 pages from START-HERE document
  const allPages = [
    // Core Pages (8)
    '',
    '/about-itl',
    '/request-quote',
    '/why-choose-itl',
    '/pricing-overview',
    '/resources',
    '/contact',
    '/current-openings',

    // Custom Mouse Models (18)
    '/custom-mouse-models',
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

    // Therapeutic Areas (23)
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

    // Technology (15)
    '/technologies',
    '/cre-lox-system',
    '/loxp-site-design',
    '/cre-recombinase-mice',
    '/tissue-specific-cre-lines',
    '/flp-frt-system',
    '/inducible-gene-expression',
    '/tamoxifen-inducible-cre',
    '/critical-exon-selection',

    // Strain Backgrounds (6)
    '/mouse-strain-backgrounds',
    '/c57bl6-mouse-background',
    '/c57bl6j-vs-c57bl6n',
    '/balbc-mouse-background',
    '/backcrossing-services',
    '/strain-selection-guide',

    // Applications (10)
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

    // Services (10)
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

    // Catalog (7)
    '/catalog-mouse-models',
    '/all-catalog-mouse-models',
    '/humanized-immune-checkpoint-mice',
    '/reporter-mouse-catalog',
    '/single-checkpoint-mice',
    '/double-checkpoint-mice',
    '/disease-model-catalog',

    // Guides (8)
    '/knockout-strategy-guide',
    '/conditional-vs-conventional-guide',
    '/humanization-strategy-guide',
    '/reporter-selection-guide',
    '/cre-line-selection-guide',

    // Advanced Targeting (8)
    '/safe-harbor-locus',
    '/rosa26',
    '/rapid-rosa26-targeting',
    '/hprt-locus-targeting',
    '/h11-safe-harbor',
    '/fast-mice',
    '/bac-to-bac-large-scale-targeting',
    '/knockout-first-allele',

    // Tag Knockins (6)
    '/flag-tag-knockin',
    '/ha-tag-knockin',
    '/gfp-knockin-mice',
    '/tdtomato-knockin-mice',
    '/lacz-knockin-mice',
    '/conditional-knockin-mice',

    // Disease Subpages (12)
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

    // Rat Models (4)
    '/rat-models',
    '/knockout-rat-models',
    '/knockin-rat-models',
    '/transgenic-rat-models',

    // Legal
    '/privacy',
    '/terms',
    '/accessibility',
  ];

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('catalog') ? 0.9 : 0.8,
  }));
}
