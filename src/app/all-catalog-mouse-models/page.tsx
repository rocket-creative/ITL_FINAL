/**
 * All Catalog Mouse Models Page
 * Server Component: passes ?q= from URL to client for pre-populated catalog search
 */

import AllCatalogContent from './AllCatalogContent';

export default async function AllCatalogMouseModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <AllCatalogContent initialQuery={q} />;
}
