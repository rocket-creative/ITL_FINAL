/**
 * Shared utilities for gene expansion scripts.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const rawLine of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = val;
  }
}

function getSupabase(requireServiceRole = true) {
  loadEnvLocal();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    (requireServiceRole ? null : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !key) {
    const hint = process.env.CI
      ? 'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as GitHub Actions repository secrets.'
      : 'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.';
    console.error(`Missing Supabase credentials. ${hint}`);
    process.exit(1);
  }

  return createClient(url, key, { auth: { persistSession: false } });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const PAGE_SIZE = 1000;

/**
 * Paginate PostgREST queries (default 1000-row cap otherwise).
 */
async function fetchAllRows(supabase, table, select = '*', orderBy = null) {
  const rows = [];
  let from = 0;

  while (true) {
    let query = supabase.from(table).select(select).range(from, from + PAGE_SIZE - 1);
    if (orderBy) query = query.order(orderBy);
    const { data, error } = await query;
    if (error) throw error;
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
    await sleep(20);
  }

  return rows;
}

async function fetchAllGenes(supabase, select = '*') {
  return fetchAllRows(supabase, 'gene', select, 'symbol');
}

async function fetchAllModelTypes(supabase) {
  return fetchAllRows(supabase, 'model_type', '*', 'slug');
}

async function fetchAllGeneTypePages(supabase, select = '*', filters = {}) {
  const rows = [];
  let from = 0;

  while (true) {
    let query = supabase.from('gene_type_page').select(select).range(from, from + PAGE_SIZE - 1);
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
    const { data, error } = await query;
    if (error) throw error;
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
    await sleep(20);
  }

  return rows;
}

const CACHE_DIR = path.join(__dirname, '.cache');

function readCache(name) {
  const p = path.join(CACHE_DIR, name);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function writeCache(name, data) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, name), JSON.stringify(data, null, 0));
}

function normalizeModelType(raw) {
  if (!raw) return '';
  return raw.replace(/point mutantion/gi, 'point mutation').trim();
}

function normalizeCategory(raw) {
  if (!raw) return '';
  return raw.replace(/point mutantion/gi, 'point mutation').trim();
}

const BASE_URL = 'https://www.genetargeting.com';

function buildCanonicalUrl(geneSymbol, modSlug) {
  return `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(geneSymbol)}/${modSlug}/`;
}

module.exports = {
  loadEnvLocal,
  getSupabase,
  sleep,
  readCache,
  writeCache,
  normalizeModelType,
  normalizeCategory,
  buildCanonicalUrl,
  CACHE_DIR,
  BASE_URL,
  PAGE_SIZE,
  fetchAllRows,
  fetchAllGenes,
  fetchAllModelTypes,
  fetchAllGeneTypePages,
};
