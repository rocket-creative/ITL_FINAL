/**
 * Metadata builders for build_inquiry pages.
 */

import type { Metadata } from 'next';
import type { GeneRow, ModelTypeRow } from './db';
import { lintBuildInquiryCopy, shouldForceNoindex } from './copyLint';
import { buildPageCopy } from './content';

const BASE_URL = 'https://www.genetargeting.com';
const BRAND = 'ingenious targeting laboratory';

export function buildBuildInquiryMetadata(
  gene: GeneRow,
  modelType: ModelTypeRow,
  dbIndexable: boolean,
): Metadata {
  const copy = buildPageCopy(gene, modelType);
  const title = `${gene.symbol} ${modelType.display_name} mouse | ${BRAND}`;
  const description = `${gene.symbol} ${modelType.display_name.toLowerCase()} mice designed and delivered by ${BRAND}. Quote in 24 hours. Since 1998, 2,800+ projects and 800+ publications.`;
  const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(gene.symbol)}/${modelType.slug}/`;

  const lint = lintBuildInquiryCopy({
    title,
    h1: copy.h1,
    headings: copy.headings,
    bodyParagraphs: copy.bodyParagraphs,
  });

  const indexable = !shouldForceNoindex(lint, dbIndexable);

  return {
    title,
    description,
    alternates: { canonical },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND,
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function effectiveIndexable(
  gene: GeneRow,
  modelType: ModelTypeRow,
  dbIndexable: boolean,
): boolean {
  const copy = buildPageCopy(gene, modelType);
  const title = `${gene.symbol} ${modelType.display_name} mouse | ${BRAND}`;
  const lint = lintBuildInquiryCopy({
    title,
    h1: copy.h1,
    headings: copy.headings,
    bodyParagraphs: copy.bodyParagraphs,
  });
  return !shouldForceNoindex(lint, dbIndexable);
}
