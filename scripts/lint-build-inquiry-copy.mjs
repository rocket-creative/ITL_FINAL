#!/usr/bin/env node
/**
 * Copy lint CLI — validates build_inquiry copy rules on all indexable pages.
 */

import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const require = createRequire(import.meta.url);
const { lintBuildInquiryCopy } = require('./gene-expansion/copyLint.js');
const { fetchAllGeneTypePages } = require('./gene-expansion/utils.js');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local');
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

loadEnvLocal();

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.log('No Supabase credentials — running static lint samples only.');
    const samples = [
      {
        title: 'Trp53 Knockout mouse | ingenious targeting laboratory',
        h1: 'Trp53 Knockout Mouse',
        headings: ['Scientific design'],
        bodyParagraphs: [],
        expectFail: false,
      },
      {
        title: 'Bad Custom Model | ITL',
        h1: 'Custom Trp53 Model',
        headings: [],
        bodyParagraphs: [],
        expectFail: true,
      },
    ];
    let failures = 0;
    for (const s of samples) {
      const { pass, errors } = lintBuildInquiryCopy(s);
      if (s.expectFail && !pass) {
        console.log('Expected failure:', errors.join('; '));
      } else if (!pass) {
        failures++;
        console.error('FAIL', s.title, errors);
      }
    }
    process.exit(failures > 0 ? 1 : 0);
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const pages = await fetchAllGeneTypePages(supabase, 'gene_id, model_type_id', {
    is_indexable: true,
  });

  if (!pages.length) {
    console.log('No indexable pages to lint yet — pass.');
    process.exit(0);
  }

  const { data: genes } = await supabase.from('gene').select('id, symbol');
  const { data: modelTypes } = await supabase.from('model_type').select('id, display_name');
  const geneById = new Map((genes ?? []).map((g) => [g.id, g.symbol]));
  const modById = new Map((modelTypes ?? []).map((m) => [m.id, m.display_name]));

  let failures = 0;
  for (const p of pages) {
    const symbol = geneById.get(p.gene_id);
    const displayName = modById.get(p.model_type_id);
    if (!symbol || !displayName) continue;

    const title = `${symbol} ${displayName} mouse | ingenious targeting laboratory`;
    const h1 = `${symbol} ${displayName} Mouse`;
    const { pass, errors } = lintBuildInquiryCopy({
      title,
      h1,
      headings: ['Scientific design', 'Why this approach'],
      bodyParagraphs: [],
    });
    if (!pass) {
      failures++;
      if (failures <= 10) {
        console.error(`FAIL ${symbol}/${displayName}:`, errors.join('; '));
      }
    }
  }

  if (failures) {
    console.error(`${failures} lint failures across ${pages.length} indexable pages`);
    process.exit(1);
  }
  console.log(`Lint passed on ${pages.length} indexable pages.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
