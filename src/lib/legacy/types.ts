/**
 * Legacy Page System Types
 * Used for managing content migrated from genetargeting.com legacy site
 */

export interface LegacyPageEntry {
  /** The original legacy URL (e.g., "https://www.genetargeting.com/knockout-mouse-models") */
  legacyUrl: string;
  
  /** Path to the legacy markdown file (e.g., "legacy/knockout-mouse-models.md") */
  legacyMd: string;
  
  /** The suggested new URL path (e.g., "/knockout-mouse-models/") */
  suggestedNewBuildUrl: string;
  
  /** How to handle the URL: reuse, redirect, retire, or keep_or_redirect */
  urlHandling: 'reuse' | 'redirect' | 'retire' | 'keep_or_redirect';
  
  /** Pages that should link to this legacy page */
  linkFromPages: string[];
  
  /** Additional notes about this page */
  notes: string;
}

export interface LegacyPageManifest {
  generated: string;
  sourceUrl: string;
  entries: LegacyPageEntry[];
}

export interface LegacyPageContent {
  /** Frontmatter metadata */
  meta: {
    legacyUrl: string;
    newBuildUrl: string;
    urlHandling: string;
    linkFrom: string[];
    extractedDate: string;
    title?: string;
  };
  
  /** The raw markdown content */
  content: string;
}

export interface LegacyRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}
