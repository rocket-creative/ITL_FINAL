import { unstable_cache } from 'next/cache';
import { getAllGeneNames } from '@/lib/catalog/serverCatalog';

/**
 * Cached 24h — matches on demand gene page ISR window; avoids repeated Supabase pagination.
 */
export const getCachedCatalogGeneNames = unstable_cache(
  async () => getAllGeneNames(),
  ['catalog-gene-names-search-v1'],
  { revalidate: 86400 }
);
