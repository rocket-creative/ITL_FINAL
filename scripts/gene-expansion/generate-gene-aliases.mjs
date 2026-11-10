/**
 * Regenerates src/lib/catalog/generatedGeneAliases.ts from the live catalog.
 *
 * Why generated and not hand written: the catalog stores humanized lines under
 * their own gene_name ("hVEGFA"), so those rows are invisible on the canonical
 * gene hub ("/gene/Vegfa/"). The mapping is mechanical, but only under guards —
 * naive de-prefixing produces badly wrong parents:
 *
 *   hPD  -> "Pd"  WRONG. The rows are hPD-1 and hPD-L1 (Pdcd1 and Cd274),
 *                 truncated at the hyphen. Two genes collapsed into one name,
 *                 so no single parent is correct.
 *   h4   -> "4"   WRONG. The rows are h4-1BB (Tnfrsf9), truncated the same way.
 *   hHLA -> "HLA" WRONG. No mouse ortholog to parent it to.
 *
 * So an alias is emitted only when all of these hold:
 *   1. it looks like a humanized symbol (^h[A-Z0-9]) and carries no "/"
 *   2. dropping the leading "h" matches an existing catalog gene_name, so the
 *      301 target is a page that actually exists (237 candidates fail this and
 *      would have redirected into a 404). Necessary but NOT sufficient: the
 *      catalog really does contain genes named "4" and "Pd", so h4 and hPD
 *      clear this guard.
 *   3. some row's model_abbreviation equals the gene_name exactly. A complete
 *      name always has one (hTREM2 holds both hTREM2 and hTREM2-R47H), while a
 *      name truncated at a delimiter never does: every hPD row is hPD-1 or
 *      hPD-L1, every h4 row is h4-1BB. This is what separates a real gene with
 *      allele variants from a cut-off name, which a suffix check alone cannot
 *      do: both shapes have suffixed rows.
 *   4. the resolved parent is not the alias itself, so nothing self redirects
 *
 * Emitting an alias here means "these rows roll up to that gene", NOT "301
 * this URL away". geneAliases.ts withholds the redirect for any name ITL has
 * written a curated SERP override for, so those product pages keep their own
 * copy while still contributing inventory to the mouse gene hub.
 *
 * Names that fail a guard are left alone: they keep their own gene page rather
 * than being filed under a parent that may be wrong. Fixing those needs the
 * underlying gene_name data corrected, not a broader alias rule.
 *
 * Usage: node scripts/gene-expansion/generate-gene-aliases.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv() {
  // Mirrors how the app reads config, without pulling in Next's loader.
  for (const file of ['.env.local', '.env']) {
    try {
      for (const line of readFileSync(resolve(file), 'utf8').split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    } catch {
      /* optional */
    }
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);

/** Every catalog row's gene_name + model_abbreviation, paged past the 1000 cap. */
async function fetchRows() {
  const rows = [];
  const page = 1000;
  for (let from = 0; ; from += page) {
    const { data, error } = await supabase
      .from('catalog_models')
      .select('gene_name, model_abbreviation')
      .order('id')
      .range(from, from + page - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < page) break;
  }
  return rows;
}

const rows = await fetchRows();

// Catalog gene_names that have a page of their own (no "/" composite names).
const realGenes = new Map();
for (const r of rows) {
  const g = r.gene_name;
  if (!g || g.includes('/')) continue;
  if (!realGenes.has(g.toLowerCase())) realGenes.set(g.toLowerCase(), g);
}

const abbrevsByGene = new Map();
for (const r of rows) {
  if (!r.gene_name) continue;
  if (!abbrevsByGene.has(r.gene_name)) abbrevsByGene.set(r.gene_name, []);
  abbrevsByGene.get(r.gene_name).push(r.model_abbreviation ?? '');
}

const byCanon = new Map();
const rejected = { truncated: [], noTarget: [], selfRef: [] };

for (const alias of [...abbrevsByGene.keys()].sort()) {
  if (alias.includes('/')) continue;
  if (!/^h[A-Z0-9]/.test(alias)) continue;

  // Guard 3: a complete gene_name is carried by at least one row on its own.
  const complete = abbrevsByGene.get(alias).some((a) => a === alias);
  if (!complete) {
    rejected.truncated.push(alias);
    continue;
  }

  // Guard 2: the parent must be a gene that already has catalog rows.
  const canon = realGenes.get(alias.slice(1).toLowerCase());
  if (!canon) {
    rejected.noTarget.push(alias);
    continue;
  }

  // Guard 4: never redirect a name onto itself.
  if (canon === alias) {
    rejected.selfRef.push(alias);
    continue;
  }

  if (!byCanon.has(canon)) byCanon.set(canon, []);
  byCanon.get(canon).push(alias);
}

const canons = [...byCanon.keys()].sort((a, b) => a.localeCompare(b));
const aliasCount = canons.reduce((n, c) => n + byCanon.get(c).length, 0);

const body = canons
  .map((c) => {
    const list = byCanon
      .get(c)
      .sort((a, b) => a.localeCompare(b))
      .map((a) => JSON.stringify(a))
      .join(', ');
    return `  ${JSON.stringify(c)}: [${list}],`;
  })
  .join('\n');

const out = `/**
 * GENERATED FILE — do not edit by hand.
 * Run: node scripts/gene-expansion/generate-gene-aliases.mjs
 *
 * Humanized catalog gene_names folded onto the canonical gene whose page they
 * belong on. See the generator for the guards each entry had to pass; names
 * that failed one (truncated like hPD-1/h4-1BB, or with no existing parent
 * page) are deliberately absent and keep their own gene page.
 *
 * ${aliasCount} aliases over ${canons.length} canonical genes.
 */

export const GENERATED_GENE_ALIASES: Readonly<Record<string, readonly string[]>> = {
${body}
};
`;

const target = resolve('src/lib/catalog/generatedGeneAliases.ts');
writeFileSync(target, out);

console.log(`wrote ${target}`);
console.log(`  ${aliasCount} aliases over ${canons.length} canonical genes`);
console.log(`  skipped ${rejected.truncated.length} truncated (e.g. ${rejected.truncated.slice(0, 4).join(', ')})`);
console.log(`  skipped ${rejected.noTarget.length} with no existing parent page`);
console.log(`  skipped ${rejected.selfRef.length} self referential`);
