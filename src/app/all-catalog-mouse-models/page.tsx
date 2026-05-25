/**
 * All Catalog Mouse Models Page
 *
 * Server Component:
 * - generateMetadata produces gene-specific <title> and <meta description>
 *   when ?q= is present, so Google indexes e.g. "Flt4 Mouse Models | ITL"
 * - Pre-fetches matching models server-side and passes as preloadedModels
 *   so the initial HTML contains real results (not just a JS spinner)
 */

import type { Metadata } from 'next';
import AllCatalogContent from './AllCatalogContent';
import { serverSearch } from '@/lib/catalog/serverCatalog';
import type { CatalogModel } from '@/components/UXUIDC/CatalogSearch';

const BASE_URL  = 'https://www.genetargeting.com';
const SITE_NAME = 'ingenious targeting laboratory';

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query  = q?.trim();

  if (query) {
    const title       = `${query} Mouse Models | ${SITE_NAME}`;
    const description = `Find ${query} genetically engineered mouse models from our catalog of 14,774+ knockout, knockin, humanized, and Cre driver strains. Request a model or get a quote.`;
    const canonical   = `${BASE_URL}/all-catalog-mouse-models/?q=${encodeURIComponent(query)}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph:  { title, description, url: canonical, siteName: SITE_NAME, locale: 'en_US', type: 'website' },
      twitter:    { card: 'summary_large_image', title, description },
    };
  }

  // Default metadata — targets buyer-intent queries: "lab mice for sale",
  // "knock out mice model market", "knock in mice", "transgenic mouse models".
  const title       = `Lab Mice for Sale | 14,774 Ready Knockout, Knockin & Humanized Mouse Models | ${SITE_NAME}`;
  const description = '14,774 genetically engineered mouse models ready to ship — knockout, knockin, humanized, Cre driver, transgenic & reporter strains. Live colonies. Request a custom quote when the library does not list your allele.';
  const canonical   = `${BASE_URL}/all-catalog-mouse-models/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph:  { title, description, url: canonical, siteName: SITE_NAME, locale: 'en_US', type: 'website' },
    twitter:    { card: 'summary_large_image', title, description },
  };
}

export default async function AllCatalogMouseModelsPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query  = q?.trim();

  // Pre-fetch matching models server-side when ?q= is present
  // This puts real results in the initial HTML for Google to index
  let preloadedModels: CatalogModel[] = [];
  if (query) {
    try {
      preloadedModels = (await serverSearch(query, 25)) as CatalogModel[];
    } catch {
      // Non-fatal — client-side search still works
    }
  }

  return <AllCatalogContent initialQuery={query} preloadedModels={preloadedModels} />;
}
