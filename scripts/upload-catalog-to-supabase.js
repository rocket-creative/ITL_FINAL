/**
 * Upload ITL Catalog to Supabase
 *
 * Clears the catalog_models table and bulk-inserts all 14,774 rows.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... \
 *   node scripts/upload-catalog-to-supabase.js
 *
 *   OR: add both vars to .env.local and run:
 *   node -r dotenv/config scripts/upload-catalog-to-supabase.js
 *
 * NOTE: Supabase anon key can INSERT if RLS allows it.
 * If you get a permission error, use your SERVICE_ROLE_KEY instead of ANON_KEY.
 */

// Load .env.local automatically if present
try {
  require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
} catch { /* dotenv optional */ }

const fs   = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const CSV_PATH = path.join(__dirname, 'data', 'itl-catalog-ready.csv');
const BATCH    = 500;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function parseCSVLine(line) {
  const fields = []; let current = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (inQ && line[i+1] === '"') { current += '"'; i++; } else inQ = !inQ; }
    else if (ch === ',' && !inQ) { fields.push(current); current = ''; }
    else current += ch;
  }
  fields.push(current);
  return fields;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error('\nERROR: Missing Supabase credentials.\nSet NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY).\n');
    process.exit(1);
  }
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`\nERROR: CSV not found. Run first:\n  node scripts/transform-smoc-catalog.js\n`);
    process.exit(1);
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Parse CSV
  const lines = fs.readFileSync(CSV_PATH, 'utf8').split('\n').filter(l => l.trim());
  const header = parseCSVLine(lines[0]);
  console.log(`\nColumns: ${header.join(' | ')}`);

  const rows = lines.slice(1).map(line => {
    const f = parseCSVLine(line);
    return {
      gene_name:           f[0] || '',
      model_abbreviation:  f[1] || '',
      model_type:          f[2] || '',
      category:            f[3] || '',
      availability:        f[4] || '',
      itl_catalog_number:  f[5] || '',
    };
  }).filter(r => r.gene_name || r.model_abbreviation);

  console.log(`\nRows to insert: ${rows.length}`);

  // Step 1: Clear existing data
  console.log('\nClearing existing catalog_models data...');
  const { error: delErr } = await supabase.from('catalog_models').delete().neq('id', 0);
  if (delErr) {
    console.error('Delete error:', delErr.message);
    console.error('Tip: Use SUPABASE_SERVICE_ROLE_KEY if anon key lacks DELETE permission.');
    process.exit(1);
  }
  console.log('  Cleared.');

  // Step 2: Batch insert
  const chunks = [];
  for (let i = 0; i < rows.length; i += BATCH) chunks.push(rows.slice(i, i + BATCH));
  console.log(`\nInserting ${rows.length} rows in ${chunks.length} batches of ${BATCH}...`);

  let inserted = 0;
  for (let i = 0; i < chunks.length; i++) {
    const { error } = await supabase.from('catalog_models').insert(chunks[i]);
    if (error) {
      console.error(`\nInsert error at batch ${i + 1}:`, error.message);
      process.exit(1);
    }
    inserted += chunks[i].length;
    process.stdout.write(`\r  Batch ${i+1}/${chunks.length} — ${inserted} rows inserted`);
    if (i < chunks.length - 1) await sleep(150);
  }

  console.log('\n\nUpload complete!');
  console.log('─────────────────────────────────────');
  console.log(`Rows inserted: ${inserted}`);
  console.log(`Project URL:   ${url}`);
  console.log('\nDeploy to Vercel to see the live catalog.');
}

main().catch(e => { console.error('\nFATAL:', e.message); process.exit(1); });
