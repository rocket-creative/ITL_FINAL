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
export const PAGE_PUBLICATION_PMIDS: Record<string, string[]> = {
  '/transgenic-mouse-service': ['39345644', '38851747', '36750759'],
  '/alzheimers-mouse-models': ['34400844', '38422143'],
  '/conditional-knockout-mouse-models': ['40540585'],
  '/neuroscience-mouse-models': ['34400844', '38422143'],
  '/als-mouse-models': ['41044342'],
  '/diabetes-mouse-models': ['41153082', '39531315'],
  '/conventional-knockout-mouse-models': ['41042265'],
  '/parkinsons-mouse-models': ['40471880'],
  '/oncology-mouse-models': ['36656933', '41042265'],
  '/immuno-oncology-mouse-models': ['36656933', '41042265'],
  '/autoimmune-disease-mice': ['39492682'],
  '/immunology-mouse-models': ['41197821', '41371935'],
  '/reporter-knockin': ['40540585'],
  '/cre-lox-system': ['40540585'],
  '/cre-recombinase-mice': ['40540585'],
  '/rare-disease-mouse-models': ['38422143', '34400844'],
  '/critical-exon-selection': ['40540585'],
  '/lag3-humanized-mice': ['36656933', '41042265'],
  '/pd1-humanized-mice': ['36656933', '41042265'],
  '/pdl1-humanized-mice': ['36656933', '41042265'],
  '/bac-to-bac-large-scale-targeting': ['39345644', '38851747', '36750759'],
  '/custom-mouse-models': ['40540585', '39345644', '39531315'],
  '/tim3-humanized-mice': ['36656933', '41042265'],
  '/inducible-conditional-knockout': ['40199321', '40540585', '41203610'],
  '/tissue-specific-knockout': ['41203610', '40540585', '40367942'],
  '/c57bl6-mouse-background': ['41203610', '40587812'],
  '/gene-replacement': ['39345644', '39531315', '38851747'],
  '/metabolic-disease-mouse-models': ['41153082', '40983272', '34400844'],
  '/atherosclerosis-mouse-models': ['40485474', '38525541'],
  '/cardiovascular-mouse-models': ['40485474', '40536683', '38525541'],
  '/nash-mash-mouse-models': ['41338474', '40784490'],
  '/point-mutation-mice': ['39929805', '40309777', '39223375'],
  '/tag-knockin-mice': ['36810733', '35910348', '34212132'],
  '/ophthalmology-mouse-models': ['41247127', '41005572'],
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
