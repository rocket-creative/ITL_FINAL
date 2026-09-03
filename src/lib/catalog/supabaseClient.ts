/**
 * Supabase client, catalog database
 * Server-side only (used in API routes and Server Components).
 * Never import this in 'use client' files.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createCatalogSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseKey) {
    // Non-fatal at module load; API routes return empty results when catalog is unavailable.
    console.warn('[catalog] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set.');
    return createClient('https://placeholder.supabase.co', 'placeholder-anon-key', {
      auth: { persistSession: false },
      global: { headers: { 'x-application-name': 'itl-catalog' } },
    });
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
    global: { headers: { 'x-application-name': 'itl-catalog' } },
  });
}

export const supabase = createCatalogSupabaseClient();

export interface CatalogRow {
  id: number;
  gene_name: string;
  model_abbreviation: string;
  model_type: string;
  category: string;
  availability: string;
  itl_catalog_number: string;
}

export interface CatalogStats {
  total_models: number;
  unique_genes: number;
  model_types: number;
  categories: number;
  live_models: number;
  sperm_cryo_models?: number;
  embryo_cryo_models?: number;
}
