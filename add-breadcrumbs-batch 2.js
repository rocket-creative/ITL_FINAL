#!/usr/bin/env node

/**
 * Batch add BreadcrumbSchema to remaining pages
 * This script processes all pages that don't have BreadcrumbSchema yet
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Category mapping for breadcrumb hierarchy
const CATEGORY_MAP = {
  // Disease Models - all under /therapeutic-areas
  'alzheimers-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Alzheimer Mouse Models' },
  'als-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'ALS Mouse Models' },
  'parkinsons-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Parkinson Mouse Models' },
  'huntingtons-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Huntington Mouse Models' },
  'autism-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Autism Mouse Models' },
  'depression-anxiety-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Depression Anxiety Mouse Models' },
  'epilepsy-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Epilepsy Mouse Models' },
  'diabetes-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Diabetes Mouse Models' },
  'type-1-diabetes-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Type 1 Diabetes Mice' },
  'type-2-diabetes-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Type 2 Diabetes Mice' },
  'obesity-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Obesity Mouse Models' },
  'nash-mash-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'NASH MASH Mouse Models' },
  'metabolic-disease-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Metabolic Disease Mouse Models' },
  'cardiovascular-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Cardiovascular Mouse Models' },
  'atherosclerosis-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Atherosclerosis Mouse Models' },
  'cardiac-fibrosis-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Cardiac Fibrosis Mice' },
  'heart-failure-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Heart Failure Mouse Models' },
  'hypertension-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Hypertension Mouse Models' },
  'oncology-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Oncology Mouse Models' },
  'immuno-oncology-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Immuno Oncology Mouse Models' },
  'syngeneic-tumor-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Syngeneic Tumor Models' },
  'tumor-suppressor-knockout-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Tumor Suppressor Knockout Mice' },
  'immunology-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Immunology Mouse Models' },
  'autoimmune-disease-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Autoimmune Disease Mice' },
  'inflammatory-disease-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Inflammatory Disease Mice' },
  'lupus-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Lupus Mouse Models' },
  'rheumatoid-arthritis-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Rheumatoid Arthritis Mice' },
  'ibd-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'IBD Mouse Models' },
  'allergy-asthma-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Allergy Asthma Mouse Models' },
  'rare-disease-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Rare Disease Mouse Models' },
  'cystic-fibrosis-mice': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Cystic Fibrosis Mice' },
  'muscular-dystrophy-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Muscular Dystrophy Mouse Models' },
  'ophthalmology-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Ophthalmology Mouse Models' },
  'neuroscience-mouse-models': { parent: 'Disease Models', parentPath: '/therapeutic-areas', name: 'Neuroscience Mouse Models' },
  
  // Custom Mouse Models service pages
  'knockout-mouse-models': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Knockout Mouse Models' },
  'conventional-knockout-mouse-models': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Conventional Knockout Mouse Models' },
  'conditional-knockout-mouse-models': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Conditional Knockout Mouse Models' },
  'conditional-knockin-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Conditional Knockin Mice' },
  'reporter-knockin': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Reporter Knockin' },
  'gfp-knockin-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'GFP Knockin Mice' },
  'tdtomato-knockin-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'tdTomato Knockin Mice' },
  'lacz-knockin-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'LacZ Knockin Mice' },
  'tag-knockin-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Tag Knockin Mice' },
  'flag-tag-knockin': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'FLAG Tag Knockin' },
  'ha-tag-knockin': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'HA Tag Knockin' },
  'point-mutation-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Point Mutation Mice' },
  'cdna-knockin': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'cDNA Knockin' },
  'humanized-mouse-models': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Humanized Mouse Models' },
  'tim3-humanized-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'TIM3 Humanized Mice' },
  'ctla4-humanized-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'CTLA4 Humanized Mice' },
  'pd1-humanized-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'PD1 Humanized Mice' },
  'pdl1-humanized-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'PDL1 Humanized Mice' },
  'lag3-humanized-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'LAG3 Humanized Mice' },
  'tigit-humanized-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'TIGIT Humanized Mice' },
  'transgenic-mouse-service': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Transgenic Mouse Service' },
  'cre-recombinase-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Cre Recombinase Mice' },
  'tissue-specific-cre-lines': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Tissue Specific Cre Lines' },
  'inducible-gene-expression': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Inducible Gene Expression' },
  'tamoxifen-inducible-cre': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Tamoxifen Inducible Cre' },
  'inducible-conditional-knockout': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Inducible Conditional Knockout' },
  'knockout-first-allele': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'Knockout First Allele' },
  'fast-mice': { parent: 'Custom Mouse Models', parentPath: '/custom-mouse-models', name: 'FAST Mice' },
  
  // Technologies
  'cre-lox-system': { parent: 'Technologies', parentPath: '/technologies', name: 'Cre Lox System' },
  'flp-frt-system': { parent: 'Technologies', parentPath: '/technologies', name: 'FLP FRT System' },
  'safe-harbor-locus': { parent: 'Technologies', parentPath: '/technologies', name: 'Safe Harbor Locus' },
  'rosa26': { parent: 'Technologies', parentPath: '/technologies', name: 'Rosa26' },
  'h11-safe-harbor': { parent: 'Technologies', parentPath: '/technologies', name: 'H11 Safe Harbor' },
  'hprt-locus-targeting': { parent: 'Technologies', parentPath: '/technologies', name: 'HPRT Locus Targeting' },
  'rapid-rosa26-targeting': { parent: 'Technologies', parentPath: '/technologies', name: 'Rapid Rosa26 Targeting' },
  'tissue-specific-knockout': { parent: 'Technologies', parentPath: '/technologies', name: 'Tissue Specific Knockout' },
  'lineage-tracing-mouse-models': { parent: 'Technologies', parentPath: '/technologies', name: 'Lineage Tracing Mouse Models' },
  
  // Strategy Guides
  'reporter-selection-guide': { parent: 'Resources', parentPath: '/resources', name: 'Reporter Selection Guide' },
  'knockout-strategy-guide': { parent: 'Resources', parentPath: '/resources', name: 'Knockout Strategy Guide' },
  'humanization-strategy-guide': { parent: 'Resources', parentPath: '/resources', name: 'Humanization Strategy Guide' },
  'loxp-site-design': { parent: 'Resources', parentPath: '/resources', name: 'LoxP Site Design' },
  'critical-exon-selection': { parent: 'Resources', parentPath: '/resources', name: 'Critical Exon Selection' },
  'cre-line-selection-guide': { parent: 'Resources', parentPath: '/resources', name: 'Cre Line Selection Guide' },
  'conditional-vs-conventional-guide': { parent: 'Resources', parentPath: '/resources', name: 'Conditional vs Conventional Guide' },
  
  // Support Services
  'colony-management-services': { parent: 'Support Services', parentPath: '/support-services', name: 'Colony Management Services' },
  'cryopreservation-services': { parent: 'Support Services', parentPath: '/support-services', name: 'Cryopreservation Services' },
  'rederivation-services': { parent: 'Support Services', parentPath: '/support-services', name: 'Rederivation Services' },
  'backcrossing-services': { parent: 'Support Services', parentPath: '/support-services', name: 'Backcrossing Services' },
  'speed-expansion-breeding': { parent: 'Support Services', parentPath: '/support-services', name: 'Speed Expansion Breeding' },
  'mouse-genotyping-service': { parent: 'Support Services', parentPath: '/support-services', name: 'Mouse Genotyping Service' },
  'phenotyping-services': { parent: 'Support Services', parentPath: '/support-services', name: 'Phenotyping Services' },
  'preclinical-services': { parent: 'Support Services', parentPath: '/support-services', name: 'Preclinical Services' },
  
  // Research Applications
  'target-validation-mouse-models': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Target Validation Mouse Models' },
  'efficacy-testing-mouse-models': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Efficacy Testing Mouse Models' },
  'gene-therapy-mouse-models': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Gene Therapy Mouse Models' },
  'cell-therapy-mouse-models': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Cell Therapy Mouse Models' },
  'antibody-therapeutics-mouse-models': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Antibody Therapeutics Mouse Models' },
  'gene-function-studies': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Gene Function Studies' },
  'pathway-analysis-mice': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Pathway Analysis Mice' },
  'biomarker-discovery-mice': { parent: 'Research Applications', parentPath: '/research-applications', name: 'Biomarker Discovery Mice' },
  
  // Rat Models
  'knockout-rat-models': { parent: 'Rat Models', parentPath: '/rat-models', name: 'Knockout Rat Models' },
  'knockin-rat-models': { parent: 'Rat Models', parentPath: '/rat-models', name: 'Knockin Rat Models' },
  'transgenic-rat-models': { parent: 'Rat Models', parentPath: '/rat-models', name: 'Transgenic Rat Models' },
  
  // Backgrounds & Strain Info
  'balbc-mouse-background': { parent: 'Mouse Strain Backgrounds', parentPath: '/mouse-strain-backgrounds', name: 'BALB/c Mouse Background' },
  'c57bl6-mouse-background': { parent: 'Mouse Strain Backgrounds', parentPath: '/mouse-strain-backgrounds', name: 'C57BL/6 Mouse Background' },
  'c57bl6j-vs-c57bl6n': { parent: 'Mouse Strain Backgrounds', parentPath: '/mouse-strain-backgrounds', name: 'C57BL/6J vs C57BL/6N' },
  
  // Catalog pages
  'reporter-mouse-catalog': { parent: 'Resources', parentPath: '/resources', name: 'Reporter Mouse Catalog' },
  'disease-model-catalog': { parent: 'Resources', parentPath: '/resources', name: 'Disease Model Catalog' },
  'catalog-mouse-models': { parent: 'Resources', parentPath: '/resources', name: 'Catalog Mouse Models' },
  'all-catalog-mouse-models': { parent: 'Resources', parentPath: '/resources', name: 'All Catalog Mouse Models' },
};

// Pages that need simple Home → Page breadcrumb (no parent category)
const SIMPLE_PAGES = {
  'therapeutic-areas': 'Therapeutic Areas',
  'technologies': 'Technologies',
  'support-services': 'Support Services',
  'research-applications': 'Research Applications',
  'rat-models': 'Rat Models',
  'custom-mouse-models': 'Custom Mouse Models',
  'glossary': 'Glossary',
  'breeding-scheme-architect': 'Breeding Scheme Architect',
  'start-your-project': 'Start Your Project',
  'request-quote': 'Request Quote',
  'contact': 'Contact',
  'mouse-model-services': 'Mouse Model Services',
  'custom-animal-models': 'Custom Animal Models',
  'custom-rabbit-models': 'Custom Rabbit Models',
  'custom-projects': 'Custom Projects',
  'current-openings': 'Current Openings',
  'publications': 'Publications',
  'testimonials': 'Testimonials',
  'video-library': 'Video Library',
};

function getBreadcrumbItems(pagePath) {
  const pathSegments = pagePath.split('/').filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1];
  
  if (CATEGORY_MAP[pageName]) {
    const { parent, parentPath, name } = CATEGORY_MAP[pageName];
    return [
      { name: 'Home', path: '/' },
      { name: parent, path: parentPath },
      { name, path: `/${pageName}` }
    ];
  }
  
  if (SIMPLE_PAGES[pageName]) {
    return [
      { name: 'Home', path: '/' },
      { name: SIMPLE_PAGES[pageName], path: `/${pageName}` }
    ];
  }
  
  // Default: just Home → Page
  const displayName = pageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return [
    { name: 'Home', path: '/' },
    { name: displayName, path: `/${pageName}` }
  ];
}

console.log('Getting list of pages without BreadcrumbSchema...');

// Get all page.tsx files
const allPages = execSync('find src/app -name "page.tsx" -type f', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean)
  .sort();

// Get pages that already have BreadcrumbSchema
const pagesWithBreadcrumb = execSync('find src/app -name "page.tsx" -type f -exec grep -l "<BreadcrumbSchema" {} \\;', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean)
  .sort();

// Get pages that need BreadcrumbSchema
const pagesNeedingBreadcrumb = allPages.filter(page => !pagesWithBreadcrumb.includes(page));

console.log(`Total pages: ${allPages.length}`);
console.log(`Pages with BreadcrumbSchema: ${pagesWithBreadcrumb.length}`);
console.log(`Pages needing BreadcrumbSchema: ${pagesNeedingBreadcrumb.length}\n`);

// Skip admin pages
const pagesToProcess = pagesNeedingBreadcrumb.filter(page => !page.includes('/admin/'));

console.log(`Pages to process (excluding admin): ${pagesToProcess.length}\n`);

console.log('Pages to process:');
pagesToProcess.forEach((page, index) => {
  const pageName = page.split('/').filter(Boolean).pop().replace('/page.tsx', '');
  console.log(`${index + 1}. ${pageName}`);
});

console.log('\nRun with --execute flag to actually process the files');
