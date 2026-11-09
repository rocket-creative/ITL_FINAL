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
  // Bare title; root layout template appends the brand.
  const title = `${gene.symbol} ${modelType.display_name} mouse`;
  const description = `${gene.symbol} ${modelType.display_name.toLowerCase()} mice designed and delivered by ${BRAND}. Quote in 24 hours. Since 1998, 2,800+ projects and 800+ publications.`;
  const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(gene.symbol)}/${modelType.slug}/`;
  const brandedTitle = `${title} | ${BRAND}`;

  // Lint the BRANDED title. `title` is deliberately bare because the root
  // layout template appends " | ingenious targeting laboratory", but the lint
  // requires the full brand name to be present — so linting the bare title
  // failed that rule on every build_inquiry page and forced them all to
  // noindex regardless of gene_type_page.is_indexable.
  const lint = lintBuildInquiryCopy({
    title: brandedTitle,
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
      title: brandedTitle,
      description,
      url: canonical,
      siteName: BRAND,
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: brandedTitle, description },
  };
}

export function effectiveIndexable(
  gene: GeneRow,
  modelType: ModelTypeRow,
  dbIndexable: boolean,
): boolean {
  const copy = buildPageCopy(gene, modelType);
  // Must mirror buildBuildInquiryMetadata exactly, branded title included,
  // or this helper disagrees with the robots tag actually emitted.
  const brandedTitle = `${gene.symbol} ${modelType.display_name} mouse | ${BRAND}`;
  const lint = lintBuildInquiryCopy({
    title: brandedTitle,
    h1: copy.h1,
    headings: copy.headings,
    bodyParagraphs: copy.bodyParagraphs,
  });
  return !shouldForceNoindex(lint, dbIndexable);
}
