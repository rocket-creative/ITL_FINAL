/**
 * Tier 1 — gene × modification route orchestrator.
 * Catalog inventory wins; else build_inquiry from gene_type_page; else 404.
 */

import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getModelsByGene, getRelatedGenes } from '@/lib/catalog/serverCatalog';
import { modSlugToCanonical } from '@/lib/seo/slugs';
import { tier1GenerateStaticParams } from '@/data/seoKeywords';
import { getBuildInquiryPage } from '@/lib/gene-expansion/db';
import { buildGeneModRedirectPath } from '@/lib/gene-expansion/synonymRedirects';
import { filterCatalogForSlug, slugToCatalogDisplay } from '@/lib/gene-expansion/catalogTypeMap';
import type { CanonicalModSlug } from '@/lib/gene-expansion/db';
import { buildBuildInquiryMetadata } from '@/lib/gene-expansion/metadata';
import GeneModCatalogPage from '@/components/gene-expansion/GeneModCatalogPage';
import BuildInquiryGeneModPage from '@/components/gene-expansion/BuildInquiryGeneModPage';

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return tier1GenerateStaticParams();
}

const SITE_NAME = 'ingenious targeting laboratory';
const BASE_URL = 'https://www.genetargeting.com';

type Props = { params: Promise<{ geneName: string; modSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { geneName: rawG, modSlug: rawSlug } = await params;
  const geneName = decodeURIComponent(rawG);
  const redirectPath = buildGeneModRedirectPath(geneName, rawSlug);
  const modSlug = redirectPath ? redirectPath.split('/').slice(-2)[0] ?? rawSlug : rawSlug;

  const modCanon = modSlugToCanonical(modSlug) ?? slugToCatalogDisplay(modSlug);
  const rawModels = await getModelsByGene(geneName);

  if (modCanon && rawModels.length > 0) {
    const models = rawModels.filter((m) => m.modelType === modCanon);
    if (models.length >= 1) {
      const title = `${geneName} ${modCanon} mouse models | ${SITE_NAME}`;
      const description = `Browse ${geneName} ${modCanon.toLowerCase()} lines from ${SITE_NAME}. Catalog numbers, live availability, and quotes in about twenty four hours.`;
      const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/`;
      return {
        title,
        description,
        alternates: { canonical },
        robots: { index: true, follow: true },
        openGraph: { title, description, url: canonical, siteName: SITE_NAME, locale: 'en_US', type: 'website' },
        twitter: { card: 'summary_large_image', title, description },
      };
    }
  }

  const canonicalSlug = modSlug.toLowerCase();
  const ctx = await getBuildInquiryPage(geneName, canonicalSlug);
  if (ctx) {
    return buildBuildInquiryMetadata(ctx.gene, ctx.modelType, ctx.page.is_indexable);
  }

  return { title: `${geneName} models | ${SITE_NAME}`, robots: { index: false, follow: true } };
}

export default async function GeneModTierPage({ params }: Props) {
  const { geneName: rawG, modSlug: rawSlug } = await params;
  const geneName = decodeURIComponent(rawG);

  const redirectPath = buildGeneModRedirectPath(geneName, rawSlug);
  if (redirectPath) permanentRedirect(redirectPath);

  const modSlug = rawSlug.toLowerCase().trim();
  const rawModels = await getModelsByGene(geneName);

  const modCanon = modSlugToCanonical(modSlug) ?? slugToCatalogDisplay(modSlug);
  if (modCanon && rawModels.length > 0) {
    const models = rawModels.filter((m) => m.modelType === modCanon);
    if (models.length >= 1) {
      const relatedGenes = await getRelatedGenes(geneName, 8);
      return (
        <GeneModCatalogPage
          geneName={geneName}
          modSlug={modSlug}
          modCanon={modCanon}
          rawModels={rawModels}
          relatedGenes={relatedGenes}
        />
      );
    }
  }

  const catalogFiltered = filterCatalogForSlug(rawModels, modSlug as CanonicalModSlug);
  if (catalogFiltered.length >= 1 && modCanon) {
    const relatedGenes = await getRelatedGenes(geneName, 8);
    return (
      <GeneModCatalogPage
        geneName={geneName}
        modSlug={modSlug}
        modCanon={modCanon}
        rawModels={rawModels}
        relatedGenes={relatedGenes}
      />
    );
  }

  if (rawModels.length === 0) {
    const ctxOnly = await getBuildInquiryPage(geneName, modSlug);
    if (ctxOnly) return <BuildInquiryGeneModPage ctx={ctxOnly} modSlug={modSlug} />;
    notFound();
  }

  const ctx = await getBuildInquiryPage(geneName, modSlug);
  if (ctx) return <BuildInquiryGeneModPage ctx={ctx} modSlug={modSlug} />;

  notFound();
}
