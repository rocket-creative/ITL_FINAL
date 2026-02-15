/**
 * Page Publications - Centralized mapping of page paths to publications
 *
 * Single source of truth: All publications must exist in publicationsData.ts
 * (https://www.genetargeting.com/publications/). This file maps which
 * publications appear on each page to prevent drift and ensure relevance.
 *
 * TO UPDATE: Add/remove PMIDs in PAGE_PUBLICATION_PMIDS. Use getPublicationsForPage()
 * to fetch full publication objects from the main list.
 */

import { publicationsByYear, type Publication } from '@/app/publications/publicationsData';

// Build PMID -> Publication lookup from main list
const allPublications = Object.values(publicationsByYear).flat();
const publicationByPmid = new Map<string, Publication>();
allPublications.forEach((pub) => {
  if (pub.link) {
    const pmid = pub.link.match(/\/(\d+)\/?$/)?.[1];
    if (pmid) publicationByPmid.set(pmid, pub);
  }
});

/**
 * Page path -> PMIDs (PubMed IDs). Order matters for display.
 * Only include publications from the main list that are relevant to the page.
 */
/**
 * All PMIDs must exist in publicationsData.ts (genetargeting.com/publications).
 * Replace any missing PMID with the most relevant publication from the main list.
 */
export const PAGE_PUBLICATION_PMIDS: Record<string, string[]> = {
  '/transgenic-mouse-service': ['39345644', '38851747'],
  '/alzheimers-mouse-models': ['34400844', '38422143'],
  '/conditional-knockout-mouse-models': ['40540585'],
  '/neuroscience-mouse-models': ['34400844', '38422143'],
  '/als-mouse-models': ['35379876'],
  '/diabetes-mouse-models': ['39531315', '39640567'],
  '/conventional-knockout-mouse-models': ['41042265'],
  '/parkinsons-mouse-models': ['38422143', '34400844'],
  '/oncology-mouse-models': ['41042265', '39223375'],
  '/immuno-oncology-mouse-models': ['41042265', '39223375'],
  '/autoimmune-disease-mice': ['40540585'],
  '/immunology-mouse-models': ['40540585', '40812430'],
  '/reporter-knockin': ['40540585'],
  '/cre-lox-system': ['40540585'],
  '/cre-recombinase-mice': ['40540585'],
  '/rare-disease-mouse-models': ['38422143', '34400844'],
  '/critical-exon-selection': ['40540585'],
  '/lag3-humanized-mice': ['41042265', '39223375'],
  '/pd1-humanized-mice': ['41042265', '39868106'],
  '/pdl1-humanized-mice': ['41042265', '39223375'],
  '/bac-to-bac-large-scale-targeting': ['39345644', '38851747'],
  '/custom-mouse-models': ['40540585', '39345644', '39531315'],
  '/tim3-humanized-mice': ['41042265', '39223375'],
  '/inducible-conditional-knockout': ['40199321', '40540585', '41203610'],
  '/tissue-specific-knockout': ['41203610', '40540585', '40367942'],
  '/c57bl6-mouse-background': ['41203610', '40587812'],
  '/gene-replacement': ['39345644', '39531315', '38851747'],
  '/metabolic-disease-mouse-models': ['39531315', '39640567', '34400844'],
  '/atherosclerosis-mouse-models': ['39953276', '38507492'],
  '/cardiovascular-mouse-models': ['39953276', '38507492'],
  '/nash-mash-mouse-models': ['38992061', '38713615'],
  '/point-mutation-mice': ['39929805', '40309777', '39223375'],
  '/tag-knockin-mice': ['34212132', '35158029', '35196497'],
  '/ophthalmology-mouse-models': ['41220299', '38705389'],
  '/knockin-mouse-models': ['41135521', '39345644', '40309777'],
  '/knockout-mouse-models': ['41203610', '41042265', '40540585'],
};

/**
 * Get publications for a page by path. Returns full Publication objects
 * from the main list in the order defined for that page.
 */
export function getPublicationsForPage(path: string): Publication[] {
  const pmids = PAGE_PUBLICATION_PMIDS[path];
  if (!pmids) return [];
  return pmids
    .map((pmid) => publicationByPmid.get(pmid))
    .filter((p): p is Publication => p !== undefined);
}

/**
 * Format a publication as a citation string (for plain-text display).
 */
export function formatPublicationCitation(pub: Publication): string {
  return `${pub.authors} ${pub.year}. ${pub.title} ${pub.journal} ${pub.volume}`;
}

/**
 * Get publications as { text, link } for pages that render plain-text citations.
 */
export function getPublicationsForPageAsCitations(
  path: string
): { text: string; link: string }[] {
  return getPublicationsForPage(path).map((pub) => ({
    text: formatPublicationCitation(pub),
    link: pub.link || '',
  }));
}
