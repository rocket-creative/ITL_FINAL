#!/usr/bin/env node
/**
 * Automated Breadcrumb Schema Addition Script
 * Adds BreadcrumbSchema to all pages that don't have it
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Category mappings for breadcrumb paths
const CATEGORY_MAP = {
  // Disease Models
  'alzheimers-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'diabetes-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'parkinsons-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'als-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'autism-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'huntingtons-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'depression-anxiety-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'epilepsy-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'neuroscience-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'oncology-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'cardiovascular-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'heart-failure-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'atherosclerosis-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'cardiac-fibrosis-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'hypertension-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'immunology-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'autoimmune-disease-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'lupus-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'ibd-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'inflammatory-disease-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'rheumatoid-arthritis-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'allergy-asthma-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'metabolic-disease-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'obesity-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'nash-mash-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'type-1-diabetes-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'type-2-diabetes-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'rare-disease-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'ophthalmology-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'cystic-fibrosis-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'muscular-dystrophy-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  'tumor-suppressor-knockout-mice': ['Therapeutic Areas', '/therapeutic-areas'],
  'immuno-oncology-mouse-models': ['Therapeutic Areas', '/therapeutic-areas'],
  
  // Custom Mouse Models
  'knockout-mouse-models': ['Custom Mouse Models', '/custom-mouse-models'],
  'conditional-knockout-mouse-models': ['Custom Mouse Models', '/custom-mouse-models'],
  'conventional-knockout-mouse-models': ['Custom Mouse Models', '/custom-mouse-models'],
  'tissue-specific-knockout': ['Custom Mouse Models', '/custom-mouse-models'],
  'inducible-conditional-knockout': ['Custom Mouse Models', '/custom-mouse-models'],
  'knockin-mouse-models': ['Custom Mouse Models', '/custom-mouse-models'],
  'conditional-knockin-mice': ['Custom Mouse Models', '/custom-mouse-models'],
  'cdna-knockin': ['Custom Mouse Models', '/custom-mouse-models'],
  'point-mutation-mice': ['Custom Mouse Models', '/custom-mouse-models'],
  'reporter-knockin': ['Custom Mouse Models', '/custom-mouse-models'],
  'gfp-knockin-mice': ['Custom Mouse Models', '/custom-mouse-models'],
  'lacz-knockin-mice': ['Custom Mouse Models', '/custom-mouse-models'],
  'tdtomato-knockin-mice': ['Custom Mouse Models', '/custom-mouse-models'],
  'tag-knockin-mice': ['Custom Mouse Models', '/custom-mouse-models'],
  'flag-tag-knockin': ['Custom Mouse Models', '/custom-mouse-models'],
  'ha-tag-knockin': ['Custom Mouse Models', '/custom-mouse-models'],
  'humanized-mouse-models': ['Custom Mouse Models', '/custom-mouse-models'],
  'transgenic-mouse-service': ['Custom Mouse Models', '/custom-mouse-models'],
  'gene-replacement': ['Custom Mouse Models', '/custom-mouse-models'],
  
  // Technology Pages
  'cre-lox-system': ['Technology', '/technologies'],
  'flp-frt-system': ['Technology', '/technologies'],
  'rosa26': ['Technology', '/technologies'],
  'h11-safe-harbor': ['Technology', '/technologies'],
  'hprt-locus-targeting': ['Technology', '/technologies'],
  'safe-harbor-locus': ['Technology', '/technologies'],
  'inducible-gene-expression': ['Technology', '/technologies'],
  'bac-to-bac-large-scale-targeting': ['Technology', '/technologies'],
  'rapid-rosa26-targeting': ['Technology', '/technologies'],
  'fast-mice': ['Technology', '/technologies'],
  'tissue-specific-cre-lines': ['Technology', '/technologies'],
  'cre-recombinase-mice': ['Technology', '/technologies'],
  'tamoxifen-inducible-cre': ['Technology', '/technologies'],
  'loxp-site-design': ['Technology', '/technologies'],
  'critical-exon-selection': ['Technology', '/technologies'],
  
  // Strain Backgrounds
  'c57bl6-mouse-background': ['Strain Backgrounds', '/mouse-strain-backgrounds'],
  'balbc-mouse-background': ['Strain Backgrounds', '/mouse-strain-backgrounds'],
  'c57bl6j-vs-c57bl6n': ['Strain Backgrounds', '/mouse-strain-backgrounds'],
  
  // Rat Models
  'rat-models': ['Custom Models', '/custom-mouse-models'],
  'knockout-rat-models': ['Rat Models', '/rat-models'],
  'knockin-rat-models': ['Rat Models', '/rat-models'],
  'transgenic-rat-models': ['Rat Models', '/rat-models'],
  
  // Services
  'backcrossing-services': ['Support Services', '/support-services'],
  'speed-expansion-breeding': ['Support Services', '/support-services'],
  'colony-management-services': ['Support Services', '/support-services'],
  'cryopreservation-services': ['Support Services', '/support-services'],
  'rederivation-services': ['Support Services', '/support-services'],
  'mouse-genotyping-service': ['Support Services', '/support-services'],
  'phenotyping-services': ['Support Services', '/support-services'],
  'preclinical-services': ['Support Services', '/support-services'],
  
  // Applications
  'target-validation-mouse-models': ['Research Applications', '/research-applications'],
  'efficacy-testing-mouse-models': ['Research Applications', '/research-applications'],
  'gene-therapy-mouse-models': ['Research Applications', '/research-applications'],
  'antibody-therapeutics-mouse-models': ['Research Applications', '/research-applications'],
  'cell-therapy-mouse-models': ['Research Applications', '/research-applications'],
  'lineage-tracing-mouse-models': ['Research Applications', '/research-applications'],
  'gene-function-studies': ['Research Applications', '/research-applications'],
  'pathway-analysis-mice': ['Research Applications', '/research-applications'],
  'biomarker-discovery-mice': ['Research Applications', '/research-applications'],
  
  // Catalog Models
  'pd1-humanized-mice': ['Catalog Models', '/catalog-mouse-models'],
  'pdl1-humanized-mice': ['Catalog Models', '/catalog-mouse-models'],
  'ctla4-humanized-mice': ['Catalog Models', '/catalog-mouse-models'],
  'lag3-humanized-mice': ['Catalog Models', '/catalog-mouse-models'],
  'tim3-humanized-mice': ['Catalog Models', '/catalog-mouse-models'],
  'double-checkpoint-mice': ['Catalog Models', '/catalog-mouse-models'],
  'humanized-immune-checkpoint-mice': ['Catalog Models', '/catalog-mouse-models'],
  'syngeneic-tumor-models': ['Catalog Models', '/catalog-mouse-models'],
};

function formatPageName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/Mouse Models?/gi, 'Mouse Models')
    .replace(/Pdl1/gi, 'PD-L1')
    .replace(/Pd1/gi, 'PD-1')
    .replace(/Ctla4/gi, 'CTLA-4')
    .replace(/Lag3/gi, 'LAG-3')
    .replace(/Tim3/gi, 'TIM-3')
    .replace(/C57bl6/gi, 'C57BL/6')
    .replace(/Balbc/gi, 'BALB/c')
    .replace(/Rosa26/gi, 'ROSA26')
    .replace(/H11/gi, 'H11')
    .replace(/Hprt/gi, 'HPRT')
    .replace(/Itl/gi, 'iTL')
    .replace(/Gfp/gi, 'GFP')
    .replace(/Lacz/gi, 'LacZ')
    .replace(/Tdtomato/gi, 'tdTomato')
    .replace(/Ha Tag/gi, 'HA-tag')
    .replace(/Flag Tag/gi, 'FLAG-tag')
    .replace(/Cre Lox/gi, 'Cre-Lox')
    .replace(/Flp Frt/gi, 'Flp-FRT')
    .replace(/Als/gi, 'ALS')
    .replace(/Ibd/gi, 'IBD')
    .replace(/Nash Mash/gi, 'NASH/MASH');
}

function getBreadcrumbItems(pagePath) {
  const items = [{ name: 'Home', path: '/' }];
  
  const slug = path.basename(path.dirname(pagePath));
  
  // Skip homepage
  if (slug === 'app') {
    return items;
  }
  
  // Add category if mapped
  if (CATEGORY_MAP[slug]) {
    items.push({
      name: CATEGORY_MAP[slug][0],
      path: CATEGORY_MAP[slug][1],
    });
  }
  
  // Add current page
  items.push({
    name: formatPageName(slug),
    path: `/${slug}`,
  });
  
  return items;
}

function addBreadcrumbToPage(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has BreadcrumbSchema
  if (content.includes('<BreadcrumbSchema') || content.includes('BreadcrumbSchema')) {
    return false;
  }
  
  // Skip dynamic routes for now
  if (filePath.includes('[slug]')) {
    return false;
  }
  
  const items = getBreadcrumbItems(filePath);
  
  // Check if BreadcrumbSchema is imported
  if (!content.includes("import.*BreadcrumbSchema")) {
    // Add to imports
    const importMatch = content.match(/from ['"]@\/components\/UXUIDC['"]/);
    if (importMatch) {
      const importLine = content.substring(0, importMatch.index + importMatch[0].length);
      if (!importLine.includes('BreadcrumbSchema')) {
        content = content.replace(
          /} from ['"]@\/components\/UXUIDC['"]/,
          ',\n  BreadcrumbSchema,\n} from \'@/components/UXUIDC\''
        );
      }
    }
  }
  
  // Generate breadcrumb JSX
  const breadcrumbJSX = `
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema 
        items={${JSON.stringify(items, null, 10).replace(/"([^"]+)":/g, '$1:')}}
      />`;
  
  // Find insertion point (before closing div, main, or fragment)
  const insertionPoints = [
    /<\/div>\s*\);\s*}\s*$/,
    /<\/main>\s*<UXUIDCFooter/,
    /<UXUIDCFooter\s*\/>/,
  ];
  
  let inserted = false;
  for (const pattern of insertionPoints) {
    if (pattern.test(content)) {
      content = content.replace(pattern, (match) => `${breadcrumbJSX}\n${match}`);
      inserted = true;
      break;
    }
  }
  
  if (inserted) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

// Main execution
function main() {
  const appDir = path.join(__dirname, '../src/app');
  const pageFiles = execSync(`find ${appDir} -name "page.tsx" -type f`, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
  
  console.log(`Found ${pageFiles.length} page files`);
  
  let processed = 0;
  let skipped = 0;
  
  for (const file of pageFiles) {
    const added = addBreadcrumbToPage(file);
    if (added) {
      processed++;
      console.log(`✓ Added breadcrumb to: ${path.relative(appDir, file)}`);
    } else {
      skipped++;
    }
  }
  
  console.log(`\n✅ Complete!`);
  console.log(`Processed: ${processed}`);
  console.log(`Skipped: ${skipped} (already had breadcrumbs or dynamic routes)`);
}

main();
