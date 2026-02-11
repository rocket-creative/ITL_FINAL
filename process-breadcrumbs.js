#!/usr/bin/env node

/**
 * Script to add BreadcrumbSchema to all remaining pages
 * This processes all page.tsx files that don't have BreadcrumbSchema yet
 */

const fs = require('fs');
const path = require('path');

// Pages that need BreadcrumbSchema added - organized by category
const pagesToProcess = {
  // Disease Models (therapeutic areas)
  diseaseModels: [
    { path: 'als-mouse-models', name: 'ALS Mouse Models' },
    { path: 'parkinsons-mouse-models', name: 'Parkinson Mouse Models' },
    { path: 'huntingtons-mouse-models', name: 'Huntington Mouse Models' },
    { path: 'autism-mouse-models', name: 'Autism Mouse Models' },
    { path: 'depression-anxiety-mouse-models', name: 'Depression Anxiety Mouse Models' },
    { path: 'epilepsy-mouse-models', name: 'Epilepsy Mouse Models' },
    { path: 'neuroscience-mouse-models', name: 'Neuroscience Mouse Models' },
    { path: 'oncology-mouse-models', name: 'Oncology Mouse Models' },
    { path: 'immuno-oncology-mouse-models', name: 'Immuno Oncology Mouse Models' },
    { path: 'syngeneic-tumor-models', name: 'Syngeneic Tumor Models' },
    { path: 'tumor-suppressor-knockout-mice', name: 'Tumor Suppressor Knockout Mice' },
    { path: 'cardiovascular-mouse-models', name: 'Cardiovascular Mouse Models' },
    { path: 'atherosclerosis-mouse-models', name: 'Atherosclerosis Mouse Models' },
    { path: 'cardiac-fibrosis-mice', name: 'Cardiac Fibrosis Mice' },
    { path: 'heart-failure-mouse-models', name: 'Heart Failure Mouse Models' },
    { path: 'hypertension-mouse-models', name: 'Hypertension Mouse Models' },
    { path: 'metabolic-disease-mouse-models', name: 'Metabolic Disease Mouse Models' },
    { path: 'type-1-diabetes-mice', name: 'Type 1 Diabetes Mice' },
    { path: 'type-2-diabetes-mice', name: 'Type 2 Diabetes Mice' },
    { path: 'obesity-mouse-models', name: 'Obesity Mouse Models' },
    { path: 'nash-mash-mouse-models', name: 'NASH MASH Mouse Models' },
    { path: 'immunology-mouse-models', name: 'Immunology Mouse Models' },
    { path: 'autoimmune-disease-mice', name: 'Autoimmune Disease Mice' },
    { path: 'inflammatory-disease-mice', name: 'Inflammatory Disease Mice' },
    { path: 'lupus-mouse-models', name: 'Lupus Mouse Models' },
    { path: 'rheumatoid-arthritis-mice', name: 'Rheumatoid Arthritis Mice' },
    { path: 'ibd-mouse-models', name: 'IBD Mouse Models' },
    { path: 'allergy-asthma-mouse-models', name: 'Allergy Asthma Mouse Models' },
    { path: 'rare-disease-mouse-models', name: 'Rare Disease Mouse Models' },
    { path: 'cystic-fibrosis-mice', name: 'Cystic Fibrosis Mice' },
    { path: 'muscular-dystrophy-mouse-models', name: 'Muscular Dystrophy Mouse Models' },
    { path: 'ophthalmology-mouse-models', name: 'Ophthalmology Mouse Models' },
  ],
  
  // Custom Mouse Model Services
  customMouseModels: [
    { path: 'conditional-knockin-mice', name: 'Conditional Knockin Mice' },
    { path: 'reporter-knockin', name: 'Reporter Knockin' },
    { path: 'gfp-knockin-mice', name: 'GFP Knockin Mice' },
    { path: 'tdtomato-knockin-mice', name: 'tdTomato Knockin Mice' },
    { path: 'lacz-knockin-mice', name: 'LacZ Knockin Mice' },
    { path: 'tag-knockin-mice', name: 'Tag Knockin Mice' },
    { path: 'flag-tag-knockin', name: 'FLAG Tag Knockin' },
    { path: 'ha-tag-knockin', name: 'HA Tag Knockin' },
    { path: 'point-mutation-mice', name: 'Point Mutation Mice' },
    { path: 'cdna-knockin', name: 'cDNA Knockin' },
    { path: 'humanized-mouse-models', name: 'Humanized Mouse Models' },
    { path: 'tim3-humanized-mice', name: 'TIM3 Humanized Mice' },
    { path: 'transgenic-mouse-service', name: 'Transgenic Mouse Service' },
    { path: 'cre-recombinase-mice', name: 'Cre Recombinase Mice' },
    { path: 'tissue-specific-cre-lines', name: 'Tissue Specific Cre Lines' },
    { path: 'inducible-gene-expression', name: 'Inducible Gene Expression' },
    { path: 'tamoxifen-inducible-cre', name: 'Tamoxifen Inducible Cre' },
    { path: 'inducible-conditional-knockout', name: 'Inducible Conditional Knockout' },
    { path: 'knockout-first-allele', name: 'Knockout First Allele' },
    { path: 'fast-mice', name: 'FAST Mice' },
  ],
  
  // Technologies & Strategy Guides
  technologies: [
    { path: 'technologies', name: 'Technologies' },
    { path: 'cre-lox-system', name: 'Cre Lox System' },
    { path: 'flp-frt-system', name: 'FLP FRT System' },
    { path: 'safe-harbor-locus', name: 'Safe Harbor Locus' },
    { path: 'rosa26', name: 'Rosa26' },
    { path: 'h11-safe-harbor', name: 'H11 Safe Harbor' },
    { path: 'hprt-locus-targeting', name: 'HPRT Locus Targeting' },
    { path: 'rapid-rosa26-targeting', name: 'Rapid Rosa26 Targeting' },
    { path: 'tissue-specific-knockout', name: 'Tissue Specific Knockout' },
    { path: 'lineage-tracing-mouse-models', name: 'Lineage Tracing Mouse Models' },
    { path: 'reporter-selection-guide', name: 'Reporter Selection Guide' },
    { path: 'knockout-strategy-guide', name: 'Knockout Strategy Guide' },
    { path: 'humanization-strategy-guide', name: 'Humanization Strategy Guide' },
    { path: 'loxp-site-design', name: 'LoxP Site Design' },
    { path: 'critical-exon-selection', name: 'Critical Exon Selection' },
  ],
  
  // Support Services
  supportServices: [
    { path: 'colony-management-services', name: 'Colony Management Services' },
    { path: 'cryopreservation-services', name: 'Cryopreservation Services' },
    { path: 'rederivation-services', name: 'Rederivation Services' },
    { path: 'backcrossing-services', name: 'Backcrossing Services' },
    { path: 'speed-expansion-breeding', name: 'Speed Expansion Breeding' },
    { path: 'mouse-genotyping-service', name: 'Mouse Genotyping Service' },
    { path: 'phenotyping-services', name: 'Phenotyping Services' },
    { path: 'preclinical-services', name: 'Preclinical Services' },
  ],
  
  // Research Applications
  researchApplications: [
    { path: 'research-applications', name: 'Research Applications' },
    { path: 'target-validation-mouse-models', name: 'Target Validation Mouse Models' },
    { path: 'efficacy-testing-mouse-models', name: 'Efficacy Testing Mouse Models' },
    { path: 'gene-therapy-mouse-models', name: 'Gene Therapy Mouse Models' },
    { path: 'cell-therapy-mouse-models', name: 'Cell Therapy Mouse Models' },
    { path: 'antibody-therapeutics-mouse-models', name: 'Antibody Therapeutics Mouse Models' },
    { path: 'gene-function-studies', name: 'Gene Function Studies' },
    { path: 'pathway-analysis-mice', name: 'Pathway Analysis Mice' },
    { path: 'biomarker-discovery-mice', name: 'Biomarker Discovery Mice' },
  ],
  
  // Rat Models
  ratModels: [
    { path: 'rat-models', name: 'Rat Models' },
    { path: 'knockout-rat-models', name: 'Knockout Rat Models' },
    { path: 'knockin-rat-models', name: 'Knockin Rat Models' },
    { path: 'transgenic-rat-models', name: 'Transgenic Rat Models' },
  ],
  
  // Backgrounds & Catalogs
  backgrounds: [
    { path: 'balbc-mouse-background', name: 'BALB/c Mouse Background' },
    { path: 'c57bl6j-vs-c57bl6n', name: 'C57BL/6J vs C57BL/6N' },
    { path: 'reporter-mouse-catalog', name: 'Reporter Mouse Catalog' },
    { path: 'disease-model-catalog', name: 'Disease Model Catalog' },
  ],
  
  // Other Pages
  other: [
    { path: 'support-services', name: 'Support Services' },
    { path: 'mouse-model-services', name: 'Mouse Model Services' },
    { path: 'glossary', name: 'Glossary' },
    { path: 'breeding-scheme-architect', name: 'Breeding Scheme Architect' },
    { path: 'start-your-project', name: 'Start Your Project' },
    { path: 'request-quote', name: 'Request Quote' },
  ],
};

// Determine breadcrumb path for each page
function getBreadcrumbItems(pagePath, pageName, category) {
  const items = [{ name: 'Home', path: '/' }];
  
  if (category === 'diseaseModels') {
    items.push({ name: 'Disease Models', path: '/therapeutic-areas' });
  } else if (category === 'customMouseModels') {
    items.push({ name: 'Custom Mouse Models', path: '/custom-mouse-models' });
  } else if (category === 'technologies') {
    items.push({ name: 'Technologies', path: '/technologies' });
  } else if (category === 'supportServices') {
    items.push({ name: 'Support Services', path: '/support-services' });
  } else if (category === 'researchApplications') {
    items.push({ name: 'Research Applications', path: '/research-applications' });
  } else if (category === 'ratModels') {
    items.push({ name: 'Rat Models', path: '/rat-models' });
  }
  
  items.push({ name: pageName, path: `/${pagePath}` });
  return items;
}

console.log('Pages to process by category:');
Object.entries(pagesToProcess).forEach(([category, pages]) => {
  console.log(`\n${category}: ${pages.length} pages`);
});

const totalPages = Object.values(pagesToProcess).reduce((acc, pages) => acc + pages.length, 0);
console.log(`\nTotal pages to process: ${totalPages}`);
