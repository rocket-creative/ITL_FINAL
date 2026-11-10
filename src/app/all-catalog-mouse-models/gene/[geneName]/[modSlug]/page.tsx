/**
 * Tier 1 — gene × modification route orchestrator.
 * Catalog inventory wins; else build_inquiry from gene_type_page; else 404.
 */

import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import {
  getModelsByGene,
  getRelatedGenesWithModelType,
  indexableTier4ParamsForModels,
} from '@/lib/catalog/serverCatalog';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import { canonicalGeneFor } from '@/lib/catalog/geneAliases';
import { modSlugToCanonical, resolveTissueOrDriverSlug } from '@/lib/seo/slugs';
import { getDisplayLabelForTissueKey } from '@/lib/search/creDrivers';
import { tier1GenerateStaticParams } from '@/data/seoKeywords';
import { getBuildInquiryPage } from '@/lib/gene-expansion/db';
import { buildGeneModRedirectPath } from '@/lib/gene-expansion/synonymRedirects';
import {
  catalogModelsForSlug,
  slugDisplayLabel,
  slugToCatalogDisplay,
} from '@/lib/gene-expansion/catalogTypeMap';
import { buildBuildInquiryMetadata } from '@/lib/gene-expansion/metadata';
import {
  buildCatalogModTitle,
  buildCatalogModDescription,
  getCatalogSerpOverride,
} from '@/lib/seo/catalogSerp';
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

/** Catalog-backed Tier 4 links for this gene × mod (each guaranteed to 200). */
function buildTier4Links(
  geneName: string,
  rawModels: ServerCatalogModel[],
  modCanon: string,
): { href: string; label: string }[] {
  return indexableTier4ParamsForModels(geneName, rawModels)
    .filter((t) => modSlugToCanonical(t.modSlug) === modCanon)
    .map((t) => {
      const resolved = resolveTissueOrDriverSlug(t.tissueOrDriverSlug);
      const context = resolved
        ? resolved.kind === 'tissue'
          ? getDisplayLabelForTissueKey(resolved.canonical)
          : resolved.canonical
        : '';
      return {
        href: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${t.modSlug}/${t.tissueOrDriverSlug}/`,
        label: context ? `${geneName} ${modCanon.toLowerCase()}, ${context}` : `${geneName} ${modCanon.toLowerCase()}`,
      };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { geneName: rawG, modSlug: rawSlug } = await params;
  const geneName = decodeURIComponent(rawG);
  const redirectPath = buildGeneModRedirectPath(geneName, rawSlug);
  const modSlug = redirectPath ? redirectPath.split('/').slice(-2)[0] ?? rawSlug : rawSlug;

  const modCanon = modSlugToCanonical(modSlug) ?? slugToCatalogDisplay(modSlug);
  const rawModels = await getModelsByGene(geneName);

  const modLabel = slugDisplayLabel(modSlug, modCanon ?? '');
  if (modCanon && rawModels.length > 0) {
    const models = catalogModelsForSlug(rawModels, modSlug, modCanon);
    if (models.length >= 1) {
      // CATALOG_SERP_OVERRIDES are hand-written GENE HUB titles, so one may
      // only stand in for this page's title when it actually describes this
      // modification. Testing the page's own label instead put "Trem2 knockout
      // mouse models" on /gene/Trem2/humanized/; nine humanized URLs were
      // titled after a different modification, eight of them pages that only
      // exist since humanized rows started rolling up to their canonical gene.
      const hubOverride = getCatalogSerpOverride(geneName);
      const overrideFitsThisMod =
        /humanized/i.test(modLabel) && /humanized/i.test(hubOverride?.title ?? '');
      const title = overrideFitsThisMod
        ? (hubOverride?.title as string)
        : buildCatalogModTitle(geneName, modLabel);
      const description =
        overrideFitsThisMod && hubOverride?.description
          ? hubOverride.description
          : buildCatalogModDescription(geneName, modLabel, models.length);
      const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${modSlug}/`;
      const branded = `${title} | ${SITE_NAME}`;
      const ogParams = new URLSearchParams({
        line1: title,
        line2: modLabel,
        line3: `${models.length} catalog line${models.length === 1 ? '' : 's'}`,
      });
      const ogImage = `${BASE_URL}/api/og?${ogParams.toString()}`;
      return {
        title,
        description,
        alternates: { canonical },
        robots: { index: true, follow: true },
        openGraph: {
          title: branded,
          description,
          url: canonical,
          siteName: SITE_NAME,
          locale: 'en_US',
          type: 'website',
          images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: 'summary_large_image', title: branded, description, images: [ogImage] },
      };
    }
  }

  const canonicalSlug = modSlug.toLowerCase();
  const ctx = await getBuildInquiryPage(geneName, canonicalSlug);
  if (ctx) {
    return buildBuildInquiryMetadata(ctx.gene, ctx.modelType, ctx.page.is_indexable);
  }

  return { title: `${geneName} models`, robots: { index: false, follow: true } };
}

export default async function GeneModTierPage({ params }: Props) {
  const { geneName: rawG, modSlug: rawSlug } = await params;
  const geneName = decodeURIComponent(rawG);

  // Aliased gene names consolidate onto the canonical gene, preserving the
  // modification segment: /gene/hAPOE4/humanized/ -> /gene/Apoe/humanized/.
  const aliasTarget = canonicalGeneFor(geneName);
  if (aliasTarget) {
    permanentRedirect(
      `/all-catalog-mouse-models/gene/${encodeURIComponent(aliasTarget)}/${rawSlug.toLowerCase().trim()}/`,
    );
  }

  const redirectPath = buildGeneModRedirectPath(geneName, rawSlug);
  if (redirectPath) permanentRedirect(redirectPath);

  const modSlug = rawSlug.toLowerCase().trim();
  const rawModels = await getModelsByGene(geneName);

  const modCanon = modSlugToCanonical(modSlug) ?? slugToCatalogDisplay(modSlug);

  // One rule-aware check, not a broad match followed by a narrow one. The
  // broad match (modelType === modCanon) used to win first, so slugs that
  // share a catalog model_type each rendered the whole model_type: the
  // reporter, point-mutation, tag-knockin and cdna-knockin URLs all served
  // the Knockin page, and inducible-knockout served the Conditional Knockout
  // page, presenting floxed lines as inducible stock. Slugs with no genuine
  // inventory now fall through to build_inquiry instead.
  if (modCanon && rawModels.length > 0) {
    const models = catalogModelsForSlug(rawModels, modSlug, modCanon);
    if (models.length >= 1) {
      const relatedGenes = await getRelatedGenesWithModelType(geneName, modCanon, 8);
      return (
        <GeneModCatalogPage
          geneName={geneName}
          modSlug={modSlug}
          modCanon={modCanon}
          modDisplay={slugDisplayLabel(modSlug, modCanon)}
          rawModels={rawModels}
          relatedGenes={relatedGenes}
          tier4Links={buildTier4Links(geneName, rawModels, modCanon)}
        />
      );
    }
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
