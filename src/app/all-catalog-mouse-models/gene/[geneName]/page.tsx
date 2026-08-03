/**
 * Individual Gene Page — /all-catalog-mouse-models/gene/[geneName]
 * On-demand ISR: rendered on first request, cached at Vercel edge for 24h.
 * NO generateStaticParams — zero impact on build time.
 */

import type { Metadata } from 'next';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';
import GeneHubTrustBand from '@/components/gene-expansion/GeneHubTrustBand';
import GeneHubAiAnswerBlock from '@/components/gene-expansion/GeneHubAiAnswerBlock';
import GeneHubPiTaxonomyMatrix from '@/components/gene-expansion/GeneHubPiTaxonomyMatrix';

import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getModelsByGene, getRelatedGenes, indexableTier4ParamsForModels } from '@/lib/catalog/serverCatalog';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import { availabilityColor, availabilityLabel } from '@/lib/catalog/availability';
import { getGeneMatchedPublications } from '@/lib/catalog/geneMatchedPublications';
import { UXUIDCNavigation, UXUIDCFooter } from '@/components/UXUIDC';
import { IconChevronRight } from '@/components/UXUIDC/Icons';
import {
  getPriorityGeneByMouseSymbol,
  getMorphogenFamilyLabel,
  isPriorityGene,
} from '@/data/priorityGenes';

import {
  getTopCreDriversForTissue,
  getDisplayLabelForTissueKey,
} from '@/lib/search/creDrivers';
import { getCachedCatalogGeneNames } from '@/lib/search/catalogGeneCache';
import { parseQuery } from '@/lib/search/parseQuery';
import { buildSeoUrl } from '@/lib/seo/searchUrl';
import { getCuratedIntro } from '@/lib/seo/curatedIntros';
import {
  buildPriorityGeneTitle,
  buildPriorityGeneDescription,
  buildGeneHubAlternateNames,
} from '@/lib/seo/geneHubSerp';
import {
  buildCatalogGeneTitle,
  buildCatalogGeneDescription,
  getCatalogSerpOverride,
} from '@/lib/seo/catalogSerp';
import { buildTierGeneModFaqs } from '@/lib/seo/faqBuilders';
import { modCanonicalToSlug, modSlugToCanonical, resolveTissueOrDriverSlug } from '@/lib/seo/slugs';
import { buildCatalogProductSchema } from '@/lib/seo/productSchema';
import { getIndexableBuildInquiryLinksForGene, CANONICAL_MOD_SLUGS } from '@/lib/gene-expansion/db';
import { slugToCatalogDisplay } from '@/lib/gene-expansion/catalogTypeMap';
import { resolveCanonicalModSlug } from '@/lib/gene-expansion/synonymRedirects';

// On-demand ISR: pages render on first request, cache at edge for 24h.
// After 24h, next visitor triggers background re-render (stale-while-revalidate).
export const revalidate = 86400;
export const dynamicParams = true;
// DO NOT add generateStaticParams — build stays fast (362 pages, not 14,000+)

const BASE_URL  = 'https://www.genetargeting.com';
const SITE_NAME = 'ingenious targeting laboratory';

type Props = {
  params: Promise<{ geneName: string }>;
  searchParams: Promise<{ type?: string; tissue?: string; driver?: string }>;
};

// Strip any SMOC references from data fields before rendering
function stripSmoc(s: string | undefined | null): string {
  if (!s) return '';
  return s.replace(/smoc/gi, 'ITL').replace(/shanghai model organisms?( center)?/gi, 'ITL').trim();
}

function fixCatalogTypos(s: string): string {
  // Common vendor typos in abbreviation / type strings
  return s.replace(/\bFrox\b/gi, (m) => (m[0] === 'F' ? 'Flox' : 'flox'));
}

function cleanModel(m: ServerCatalogModel): ServerCatalogModel {
  return {
    ...m,
    modelAbbrev: fixCatalogTypos(stripSmoc(m.modelAbbrev)),
    modelType:   fixCatalogTypos(stripSmoc(m.modelType)),
    category:    stripSmoc(m.category),
    availability: stripSmoc(m.availability),
    catalogNumber: stripSmoc(m.catalogNumber),
  };
}

function sortModelsForType(models: ServerCatalogModel[], focusType?: string): ServerCatalogModel[] {
  const f = focusType?.trim();
  if (!f) return models;
  const fl = f.toLowerCase();
  const hit = models.filter((m) => (m.modelType || '').toLowerCase() === fl);
  const rest = models.filter((m) => (m.modelType || '').toLowerCase() !== fl);
  return [...hit, ...rest];
}

function buildGeneOgImage(geneName: string, modelCount: number, types: string[]): string {
  const typeBit = types.slice(0, 2).join(' · ') || 'Mouse models';
  const params = new URLSearchParams({
    line1: `${geneName} mouse models`,
    line2: typeBit,
    line3: modelCount > 0 ? `${modelCount} catalog line${modelCount === 1 ? '' : 's'}` : 'Custom generation',
  });
  return `${BASE_URL}/api/og?${params.toString()}`;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { geneName: rawParam } = await params;
  const geneName = decodeURIComponent(rawParam);
  const qs = await searchParams;
  const focusType = qs?.type?.trim();
  const tissueKey = qs?.tissue?.trim();
  const [rawModels, buildInquiryLinks] = await Promise.all([
    getModelsByGene(geneName),
    getIndexableBuildInquiryLinksForGene(geneName),
  ]);
  const models = rawModels.map(cleanModel);
  const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`;
  const override = !(focusType || tissueKey) ? getCatalogSerpOverride(geneName) : undefined;

  if (models.length === 0 && buildInquiryLinks.length === 0) {
    const title = override?.title ?? `${geneName} mouse models`;
    return { title, alternates: { canonical } };
  }

  const priority = getPriorityGeneByMouseSymbol(geneName);
  const types = [...new Set(models.map((m) => m.modelType))].filter(Boolean) as string[];
  const hasReady = models.some((m) => {
    const a = (m.availability || '').toLowerCase();
    return a.includes('live') || a.includes('available') || a.includes('ready');
  });
  const ogImage = buildGeneOgImage(geneName, models.length, types);
  const branded = (t: string) => `${t} | ${SITE_NAME}`;

  if (models.length === 0) {
    const title =
      override?.title ??
      (priority
        ? buildPriorityGeneTitle(geneName, priority.humanSymbol, 0)
        : `${geneName} mouse models`);
    const description =
      override?.description ??
      (priority
        ? buildPriorityGeneDescription(geneName, priority.humanSymbol, 0, [])
        : `Explore ${geneName} mouse model types available to build. ${buildInquiryLinks.length} modification types with scientific rationale and quote ready project intake.`);
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title: branded(title),
        description,
        url: canonical,
        siteName: SITE_NAME,
        locale: 'en_US',
        type: 'website',
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      },
      twitter: { card: 'summary_large_image', title: branded(title), description, images: [ogImage] },
    };
  }

  const usePriorityMeta = Boolean(priority) || isPriorityGene(geneName);

  let title =
    override?.title ??
    (usePriorityMeta && priority && !(focusType !== undefined && focusType.length > 0)
      ? buildPriorityGeneTitle(geneName, priority.humanSymbol, models.length)
      : buildCatalogGeneTitle(geneName, types, {
          focusType,
          humanSymbol: priority?.humanSymbol,
        }));

  let description =
    override?.description ??
    (usePriorityMeta && priority
      ? buildPriorityGeneDescription(geneName, priority.humanSymbol, models.length, types)
      : buildCatalogGeneDescription(geneName, models.length, types, {
          hasReady,
          humanSymbol: priority?.humanSymbol,
        }));

  if (focusType && !override && !(usePriorityMeta && priority)) {
    description = buildCatalogGeneDescription(geneName, models.length, [focusType], { hasReady });
  }
  if (tissueKey && !override && !(usePriorityMeta && priority)) {
    const tissueLabel = getDisplayLabelForTissueKey(tissueKey);
    description = `${description.slice(0, 120)} ${tissueLabel} specific options available.`.slice(0, 160);
  }

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: branded(title),
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title: branded(title), description, images: [ogImage] },
  };
}

export default async function GenePage({ params, searchParams }: Props) {
  const { geneName: rawParam } = await params;
  const geneName = decodeURIComponent(rawParam);
  const qs = await searchParams;

  if (qs?.type || qs?.tissue || qs?.driver) {
    const catalogGenes = await getCachedCatalogGeneNames();
    const catalogGeneSet = new Set(catalogGenes);
    const dec = (s?: string) =>
      s ? decodeURIComponent(String(s).replace(/\+/g, ' ')).trim() : '';
    const pieces = [geneName, dec(qs.type), dec(qs.tissue), dec(qs.driver)].filter(
      (x): x is string => Boolean(x && x.length > 0)
    );
    const parsed = parseQuery(pieces.join(' '), catalogGenes);
    const target = buildSeoUrl(parsed, catalogGeneSet);
    const hub = `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`;
    if (target !== hub) {
      permanentRedirect(target);
    }
  }

  const focusType = qs?.type?.trim();
  const tissueKey = qs?.tissue?.trim();
  const creDriverQuery = qs?.driver?.trim();

  const [rawModels, relatedGenes, buildInquiryLinks] = await Promise.all([
    getModelsByGene(geneName),
    getRelatedGenes(geneName),
    getIndexableBuildInquiryLinksForGene(geneName),
  ]);

  if (rawModels.length === 0 && buildInquiryLinks.length === 0) return notFound();

  const isBuildInquiryOnly = rawModels.length === 0 && buildInquiryLinks.length > 0;

  let models = rawModels.map(cleanModel);
  models = sortModelsForType(models, focusType);

  const hasLiveModels = models.some(m => {
    const a = (m.availability || '').toLowerCase();
    return a.includes('live') || a.includes('available') || a.includes('ready');
  });

  const types = [...new Set(models.map(m => m.modelType))].filter(Boolean);
  const typeStr = types.length > 0 ? types.slice(0, 3).join(', ') : 'genetically engineered';
  const canonical = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`;

  const priority = getPriorityGeneByMouseSymbol(geneName);
  const curatedIntro = getCuratedIntro(geneName);
  const genePubs = getGeneMatchedPublications(
    [geneName, priority?.humanSymbol, ...(priority?.aliases ?? [])].filter(Boolean) as string[],
  );

  const knownModSlugs = new Set<string>(CANONICAL_MOD_SLUGS);
  const catalogByModSlug: Record<string, number> = {};
  for (const m of models) {
    const t = (m.modelType || '').toLowerCase();
    let slug = '';
    if (t.includes('conditional')) slug = 'conditional-knockout';
    else if (t.includes('inducible')) slug = 'inducible-knockout';
    else if (t.includes('humanized')) slug = 'humanized';
    else if (t.includes('knockout') || t.includes('ko')) slug = 'knockout';
    else if (t.includes('point')) slug = 'point-mutation';
    else if (t.includes('tag')) slug = 'tag-knockin';
    else if (t.includes('reporter') || t.includes('gfp')) slug = 'reporter';
    else if (t.includes('knockin') || t.includes('knock-in')) slug = 'knockin';
    else if (t.includes('transgenic') || t.includes('overexpression')) slug = 'overexpression';
    else if (t.includes('cre')) slug = 'cre-driver';
    else {
      const fromCanon = resolveCanonicalModSlug(modCanonicalToSlug(m.modelType || ''));
      if (knownModSlugs.has(fromCanon)) slug = fromCanon;
    }
    if (slug && knownModSlugs.has(slug)) {
      catalogByModSlug[slug] = (catalogByModSlug[slug] || 0) + 1;
    }
  }
  const modTypesPresent = [...new Set(models.map((m) => m.modelType).filter(Boolean))] as string[];

  // Only emit modification links that resolve to a live (non-404) page. Catalog
  // type links are canonicalized (e.g. transgenic -> overexpression) and gated
  // to types whose slug maps back to a model type this gene actually has.
  const modLinks: Array<{ slug: string; label: string; href: string; catalog: boolean }> = [];
  {
    const seen = new Set<string>();
    for (const t of types) {
      const slug = resolveCanonicalModSlug(modCanonicalToSlug(t));
      const resolvedCanon = modSlugToCanonical(slug) ?? slugToCatalogDisplay(slug);
      if (resolvedCanon !== t || seen.has(slug)) continue;
      seen.add(slug);
      modLinks.push({
        slug,
        label: `${geneName} ${t}`,
        href: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${slug}/`,
        catalog: true,
      });
    }
    for (const link of buildInquiryLinks) {
      if (seen.has(link.slug)) continue;
      seen.add(link.slug);
      modLinks.push({
        slug: link.slug,
        label: `${geneName} ${link.displayName}`,
        href: link.href,
        catalog: false,
      });
    }
  }

  // Tier 4 (tissue/driver) links restricted to catalog-backed, indexable combos
  // for this gene — never the generic hardcoded tissue list, which 404s for
  // genes without matching catalog rows.
  const tissueLinks = indexableTier4ParamsForModels(geneName, models)
    .map((t) => {
      const resolved = resolveTissueOrDriverSlug(t.tissueOrDriverSlug);
      const modCanon = modSlugToCanonical(t.modSlug);
      if (!resolved || !modCanon) return null;
      const context =
        resolved.kind === 'tissue' ? getDisplayLabelForTissueKey(resolved.canonical) : resolved.canonical;
      return {
        key: `${t.modSlug}/${t.tissueOrDriverSlug}`,
        href: `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${t.modSlug}/${t.tissueOrDriverSlug}/`,
        label: `${context} ${geneName} ${modCanon.toLowerCase()}`,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const topDrivers = tissueKey ? [...getTopCreDriversForTissue(tissueKey, 3)] : [];
  const matchedFocusCount = focusType
    ? models.filter((m) => m.modelType === focusType).length
    : 0;

  const productSchemas = models.map((m) =>
    buildCatalogProductSchema(m, {
      name: m.modelAbbrev || `${geneName} ${m.modelType || ''} Mouse Model`.trim(),
      description: `${m.modelType || 'Genetically engineered'} mouse model for ${geneName}. ${m.category ? `Category: ${m.category}.` : ''} Availability: ${m.availability || 'On request'}.`,
    }),
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">

        {/* Hero */}
        <section className="page-hero px-5 pb-12 pt-14 md:pb-[60px] md:pt-20" style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,212,212,0.15)', border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px', padding: '6px 14px', marginBottom: '20px',
            }}>
              <span style={{ color: '#00d4d4', fontSize: '10px' }}>●</span>
              <span style={{ color: '#fff', fontSize: '.85rem', fontWeight: 500 }}>
                {isBuildInquiryOnly
                  ? `${buildInquiryLinks.length} Model Type${buildInquiryLinks.length !== 1 ? 's' : ''} Available to Build`
                  : `${models.length} Model${models.length !== 1 ? 's' : ''} Available`}
              </span>
            </div>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/all-catalog-mouse-models" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>All Catalog Models</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/all-catalog-mouse-models/gene-index" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Gene Index</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>{geneName}</li>
              </ol>
            </nav>

            {focusType && matchedFocusCount > 0 ? (
              <div
                role="status"
                style={{
                  background: 'rgba(0,128,128,0.22)',
                  border: '1px solid rgba(0,212,212,0.45)',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  color: '#e8fbff',
                  fontSize: '.95rem',
                  lineHeight: 1.6,
                }}
              >
                Showing {geneName} {focusType.toLowerCase()} catalog lines first — see every {geneName} allele below for this target.
              </div>
            ) : null}

            {focusType && matchedFocusCount === 0 ? (
              <div
                role="status"
                style={{
                  background: 'rgba(255,193,7,0.12)',
                  border: '1px solid rgba(255,193,7,0.45)',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  color: '#fff9e6',
                  fontSize: '.95rem',
                  lineHeight: 1.6,
                }}
              >
                No listed {geneName} {focusType.toLowerCase()} allele yet — browse other {geneName} strains then request a generated {focusType.toLowerCase()} build.
              </div>
            ) : null}

            {tissueKey && topDrivers.length > 0 ? (
              <div
                role="note"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: '.93rem',
                  lineHeight: 1.65,
                }}
              >
                Need a {getDisplayLabelForTissueKey(tissueKey)} specific {geneName} deletion? Frequently paired Cre drivers include{' '}
                {topDrivers.map((d) => d.driver).join(', ')}. Tell us your timeline and cohort size — we breed the cross for you.
              </div>
            ) : null}

            {creDriverQuery ? (
              <div
                role="note"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: '.93rem',
                  lineHeight: 1.65,
                }}
              >
                {creDriverQuery} crossed to {geneName} floxed animals — submit a cohort plan for genotyping, QC, and dispatch milestones.
              </div>
            ) : null}

            {/* Keyword rich H1: matches "Brca1 knockout mouse", "Tp53 conditional knockout mouse" searches */}
            <h1 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.65rem, 5vw, 2.8rem)',
              fontWeight: 700,
              color: '#fff', marginBottom: '16px', lineHeight: 1.2,
              overflowWrap: 'anywhere',
            }}>
              {isBuildInquiryOnly
                ? `${geneName} mouse models`
                : focusType
                  ? `${geneName} ${focusType} mouse models`
                  : `${geneName} ${typeStr} mouse model${models.length !== 1 ? 's' : ''}`}
            </h1>

            {/* Intro paragraph includes gene+type combos for long tail SEO */}
            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px', lineHeight: 1.7, maxWidth: '800px',
            }}>
              {isBuildInquiryOnly
                ? `No ${geneName} catalog inventory yet. Explore ${buildInquiryLinks.length} modification type${buildInquiryLinks.length !== 1 ? 's' : ''} you can build with ${SITE_NAME}, each with scientific rationale and a quote ready project intake.`
                : hasLiveModels
                  ? `Browse ${models.length} ${geneName} mouse model${models.length !== 1 ? 's' : ''} including ${typeStr.toLowerCase()} variants — in stock and ready to ship from ${SITE_NAME}. ${types.length > 1 ? `Available as ${types.map(t => `${geneName} ${t.toLowerCase()} mouse`).join(', ')}.` : ''} Request a quote within 24 hours.`
                  : `Browse ${models.length} ${geneName} mouse model${models.length !== 1 ? 's' : ''} including ${typeStr.toLowerCase()} variants from ${SITE_NAME}. ${types.length > 1 ? `Available as ${types.map(t => `${geneName} ${t.toLowerCase()} mouse`).join(', ')}.` : ''} Contact us for availability and fast turnaround.`}
            </p>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#008080] px-6 py-3 text-[.9rem] font-semibold text-white no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#134978] sm:w-auto"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#008080', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                }}
              >
                Order catalog model <IconChevronRight size={16} color="#fff" />
              </Link>
              <Link
                href="/all-catalog-mouse-models"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border-2 border-white/30 px-6 py-3 text-[.9rem] font-semibold text-white no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#134978] sm:w-auto"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                Search All Models
              </Link>
            </div>
          </div>
        </section>

        {priority ? (
          <div className="gene-hub-priority">
            <GeneHubTrustBand />

            {curatedIntro ? (
              <section
                className="border-b border-[#eee] bg-white px-5 py-10 md:py-12"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <div className="mx-auto max-w-[1000px]">
                  <h2 className="mb-4 text-xl font-bold leading-snug text-[#0a253c] md:text-[1.45rem]">
                    Why model {geneName}
                  </h2>
                  <p className="m-0 text-[.95rem] leading-[1.8] text-[#444]">{curatedIntro}</p>
                </div>
              </section>
            ) : null}

            <GeneHubAiAnswerBlock
              mouseSymbol={geneName}
              humanSymbol={priority.humanSymbol}
              catalogCount={models.length}
              modTypesPresent={modTypesPresent}
              aliases={priority.aliases}
              familyLabel={priority.family ? getMorphogenFamilyLabel(priority.family) : undefined}
            />

            <GeneHubPiTaxonomyMatrix
              mouseSymbol={geneName}
              humanSymbol={priority.humanSymbol}
              catalogByModSlug={catalogByModSlug}
            />
          </div>
        ) : null}

        {/* Top dual-path CTA */}
        <section
          className={`px-5 ${priority ? 'pt-8 pb-10' : 'py-10'}`}
          style={{ backgroundColor: '#f5f5f4' }}
        >
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="all-catalog-mouse-models" utmMedium="page-hero" flush />
          </div>
        </section>

        {/* Models inventory */}
        {models.length > 0 && (
        <section style={{ background: '#fff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '1.6rem', fontWeight: 700,
              color: '#0a253c', marginBottom: '8px',
            }}>
              Available {geneName} catalog models
            </h2>
            <p style={{ color: '#666', fontSize: '.9rem', marginBottom: '28px', lineHeight: 1.7 }}>
              {models.length} {geneName} line{models.length !== 1 ? 's' : ''} with QC documentation and technical support.
              {types.includes('Conditional Knockout') ? ` ${geneName} floxed mice use loxP flanked alleles for Cre dependent tissue specific knockout.` : ''}
              {types.includes('Humanized') ? ` ${geneName} humanized models carry the human gene sequence for translational research.` : ''}
            </p>

            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {models.map((model) => {
                const orderHref = `/order-catalog-models?model=${encodeURIComponent(model.modelAbbrev || geneName)}&catalog=${encodeURIComponent(model.catalogNumber)}`;
                return (
                  <li
                    key={model.id}
                    className="flex flex-col gap-4 rounded-md border border-[#e8e8e8] bg-[#fafafa] p-4 md:flex-row md:items-center md:justify-between md:gap-6 md:bg-white md:px-5 md:py-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="m-0 font-mono text-[.95rem] font-semibold text-[#0a253c]">
                          {model.modelAbbrev || geneName}
                        </p>
                        {model.modelType ? (
                          <span className="inline-flex max-w-full items-center rounded px-2.5 py-1 text-[.75rem] font-semibold leading-snug text-white bg-[#134978]">
                            {model.modelType}
                          </span>
                        ) : null}
                      </div>
                      {model.category ? (
                        <p className="mt-1.5 mb-0 text-[.82rem] leading-snug text-[#666] break-words">
                          {model.category}
                        </p>
                      ) : null}
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[.82rem]">
                        <span
                          className="inline-flex items-center gap-1.5 font-medium"
                          style={{ color: availabilityColor(model.availability) }}
                        >
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: availabilityColor(model.availability) }}
                            aria-hidden="true"
                          />
                          {availabilityLabel(model.availability)}
                        </span>
                        {model.catalogNumber ? (
                          <span className="font-mono font-semibold text-[#134978]">
                            {model.catalogNumber}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <Link
                      href={orderHref}
                      className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1 rounded-md bg-[#008080] px-5 py-2.5 text-[.85rem] font-semibold text-white no-underline hover:bg-[#006666] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008080] focus-visible:ring-offset-2 md:w-auto"
                    >
                      Order <IconChevronRight size={14} color="#fff" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        )}

        {priority && genePubs.length > 0 ? (
          <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0a253c',
                  marginBottom: '8px',
                }}
              >
                Selected publications from ingenious targeting laboratory
              </h2>
              <p style={{ color: '#666', fontSize: '.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
                Peer reviewed work involving {geneName}
                {priority.humanSymbol !== geneName ? ` (${priority.humanSymbol})` : ''} from ITL supported projects.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {genePubs.map((pub) => (
                  <li
                    key={`${pub.year}-${pub.title}`}
                    style={{
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      padding: '16px 20px',
                    }}
                  >
                    {pub.link ? (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#134978',
                          fontWeight: 600,
                          fontSize: '.95rem',
                          textDecoration: 'none',
                          lineHeight: 1.5,
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        {pub.title}
                      </a>
                    ) : (
                      <span
                        style={{
                          color: '#0a253c',
                          fontWeight: 600,
                          fontSize: '.95rem',
                          lineHeight: 1.5,
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        {pub.title}
                      </span>
                    )}
                    <span style={{ color: '#666', fontSize: '.85rem', lineHeight: 1.5 }}>
                      {pub.authors} ({pub.year})
                      {pub.journal ? `. ${pub.journal}` : ''}
                      {pub.volume ? ` ${pub.volume}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '24px', marginBottom: 0 }}>
                <Link
                  href="/publications/"
                  style={{
                    color: '#008080',
                    fontWeight: 600,
                    fontSize: '.9rem',
                    textDecoration: 'none',
                    borderBottom: '1px solid #008080',
                  }}
                >
                  View all ITL publications
                </Link>
              </p>
            </div>
          </section>
        ) : null}

        {/* Sales / About section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700,
                color: '#0a253c', marginBottom: '16px',
              }}>
                Looking for a {geneName} mouse model?
              </h2>
              <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '16px', fontSize: '.95rem' }}>
                {hasLiveModels
                  ? `We have ${models.length} ${geneName} model${models.length !== 1 ? 's' : ''} in stock — including ${typeStr} types. In stock and ready to ship this week. All models come with full QC documentation, health certificates, and dedicated technical support.`
                  : `We have ${models.length} ${geneName} model${models.length !== 1 ? 's' : ''} available — including ${typeStr} types. Contact us today for current availability and our fastest turnaround options. All models come with full QC documentation and technical support.`}
              </p>
              <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '24px', fontSize: '.95rem' }}>
                Best pricing in the industry. Get a quote in 24 hours. Our team of PhD scientists is available to help you select the right model for your research.
              </p>
              <Link
                href={`/order-catalog-models?gene=${encodeURIComponent(geneName)}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#008080', color: '#fff', padding: '12px 24px',
                  borderRadius: '6px', fontSize: '.9rem', fontWeight: 600, textDecoration: 'none',
                }}
              >
                Order catalog model <IconChevronRight size={16} color="#fff" />
              </Link>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Models Available', value: String(models.length) },
                { label: 'Model Types', value: String(types.length || 1) },
                { label: 'Quote Turnaround', value: '24 hrs' },
                { label: 'QC Documentation', value: 'Included' },
              ].map((s) => (
                <div key={s.label} style={{
                  background: '#fff', border: '1px solid #e0e0e0',
                  borderRadius: '8px', padding: '16px 24px', textAlign: 'center',
                  minWidth: '160px',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#008080', marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '.8rem', color: '#666' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Model Type Cross Links — connects gene pages to service pages for SEO */}
        {types.length > 0 && (
          <section style={{ background: '#fff', padding: '50px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 700,
                color: '#0a253c', marginBottom: '12px',
              }}>
                About {geneName} Mouse Model Types
              </h2>
              <p style={{ color: '#444', lineHeight: 1.8, fontSize: '.92rem', marginBottom: '20px' }}>
                {types.includes('Knockout') && `A ${geneName} knockout mouse has the ${geneName} gene permanently inactivated, enabling loss of function studies. `}
                {types.includes('Conditional Knockout') && `A ${geneName} conditional knockout (floxed) mouse carries loxP sites flanking a critical exon of ${geneName}, allowing Cre recombinase dependent deletion in specific tissues or at specific timepoints. `}
                {types.includes('Knockin') && `${geneName} knockin models carry a precisely inserted sequence at the ${geneName} locus, useful for reporter, tag, or humanization studies. `}
                {types.includes('Humanized') && `A ${geneName} humanized mouse replaces the mouse ${geneName} gene with the human ortholog for translational research and drug development. `}
                {types.includes('Transgenic') && `${geneName} transgenic models carry additional copies of the ${geneName} gene for overexpression studies. `}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {types.includes('Knockout') && (
                  <Link href="/knockout-mouse-models/" style={{ padding: '6px 14px', background: '#f0f4f8', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' }}>
                    Knockout Mouse Models
                  </Link>
                )}
                {types.includes('Conditional Knockout') && (
                  <Link href="/conditional-knockout-mouse-models/" style={{ padding: '6px 14px', background: '#f0f4f8', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' }}>
                    Conditional Knockout Mouse Models
                  </Link>
                )}
                {types.includes('Knockin') && (
                  <Link href="/knockin-mouse-models/" style={{ padding: '6px 14px', background: '#f0f4f8', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' }}>
                    Knockin Mouse Models
                  </Link>
                )}
                {types.includes('Humanized') && (
                  <Link href="/humanized-mouse-models/" style={{ padding: '6px 14px', background: '#f0f4f8', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' }}>
                    Humanized Mouse Models
                  </Link>
                )}
                {types.includes('Transgenic') && (
                  <Link href="/transgenic-mouse-service/" style={{ padding: '6px 14px', background: '#f0f4f8', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' }}>
                    Transgenic Mouse Models
                  </Link>
                )}
                <Link href="/custom-mouse-models/" style={{ padding: '6px 14px', background: '#f0f9f9', border: '1px solid #008080', borderRadius: '4px', color: '#008080', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' }}>
                  Mouse Model Generation Services
                </Link>
              </div>
            </div>
          </section>
        )}

        {modLinks.length > 0 && (
          <section style={{ background: '#f8f9fa', padding: '50px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 700,
                color: '#0a253c', marginBottom: '16px',
              }}>
                Modifications available
              </h2>
              <p style={{ color: '#444', fontSize: '.92rem', marginBottom: '16px', lineHeight: 1.7 }}>
                {types.length > 0
                  ? `Jump to catalog backed pages for ${geneName} organized by modification type. Each URL is indexable and matches common search patterns.`
                  : `Explore indexable ${geneName} modification pages organized by type. Each URL matches common search patterns and includes scientific rationale with quote ready intake.`}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {modLinks.map((link) => (
                  <Link
                    key={link.slug}
                    href={link.href}
                    style={{
                      padding: '8px 16px',
                      background: link.catalog ? '#fff' : '#f0f9f9',
                      border: `1px solid ${link.catalog ? '#008080' : '#134978'}`,
                      borderRadius: '4px',
                      color: link.catalog ? '#008080' : '#134978',
                      fontSize: '.85rem', fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {tissueLinks.length > 0 && (
          <section style={{ background: '#fff', padding: '50px 20px', borderBottom: '1px solid #eee' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 700,
                color: '#0a253c', marginBottom: '16px',
              }}>
                Tissue-specific options
              </h2>
              <p style={{ color: '#444', fontSize: '.92rem', marginBottom: '16px', lineHeight: 1.7 }}>
                Catalog backed tissue and driver restricted routes for {geneName}.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tissueLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    style={{
                      padding: '8px 16px', background: '#f0f9f9',
                      border: '1px solid #134978', borderRadius: '4px',
                      color: '#134978', fontSize: '.85rem', fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Genes */}
        {relatedGenes.length > 0 && (
          <section style={{ background: '#fff', padding: '50px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 700,
                color: '#0a253c', marginBottom: '20px',
              }}>
                Related Gene Targets
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {relatedGenes.map((gene) => (
                  <Link
                    key={gene}
                    href={`/all-catalog-mouse-models/gene/${encodeURIComponent(gene)}`}
                    style={{
                      padding: '6px 14px', background: '#f0f9f9',
                      border: '1px solid #008080', borderRadius: '4px',
                      color: '#008080', fontSize: '.85rem', fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    {gene}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{ backgroundColor: '#f5f5f4', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <CatalogCustomDualCta
              slug={geneName}
              utmMedium="gene-page-closing"
              flush
              catalogOverrides={{
                eyebrow: hasLiveModels ? 'Live colonies' : 'Catalog Models',
                headline: hasLiveModels
                  ? `${geneName} models ready to ship`
                  : `Need a ${geneName} mouse model?`,
                subline: hasLiveModels
                  ? `Get a confirmed quote in 24 hours. All ${geneName} models ship with full QC documentation, health certificates, and lifetime technical support.`
                  : `Our team can deliver a generated ${geneName} mouse model with fast turnaround. Competitive pricing, expert project management, and full QC documentation included.`,
                searchHref: hasLiveModels
                  ? `/order-catalog-models?gene=${encodeURIComponent(geneName)}`
                  : `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/`,
                searchLabel: hasLiveModels ? 'Order catalog model' : 'Browse Full Catalog',
                genes: [
                  {
                    symbol: geneName,
                    slug: encodeURIComponent(geneName),
                    blurb: hasLiveModels
                      ? 'Study ready strains in catalog'
                      : 'Search catalog by gene',
                  },
                ],
              }}
            />
          </div>
        </section>

      </main>

      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                  { '@type': 'ListItem', position: 2, name: 'All Catalog Models', item: `${BASE_URL}/all-catalog-mouse-models/` },
                  { '@type': 'ListItem', position: 3, name: 'Gene Index', item: `${BASE_URL}/all-catalog-mouse-models/gene-index/` },
                  { '@type': 'ListItem', position: 4, name: geneName, item: canonical },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: buildTierGeneModFaqs({
                  gene: geneName,
                  modLabel: types[0] || 'mouse model',
                }).map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              },
              ...(priority
                ? [
                    {
                      '@type': 'WebPage',
                      '@id': `${canonical}#webpage`,
                      name: `${geneName} (${priority.humanSymbol}) mouse models`,
                      url: canonical,
                      alternateName: buildGeneHubAlternateNames(),
                    },
                  ]
                : []),
              ...productSchemas,
            ],
          }),
        }}
      />
    </div>
  );
}
