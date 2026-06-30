#!/usr/bin/env node
/**
 * Seed model_type with 11 canonical modifications — spec §2.1.
 */

const { getSupabase } = require('./utils');

const TYPES = [
  {
    slug: 'knockout',
    display_name: 'Knockout',
    parent_slug: null,
    synonyms: ['constitutive knockout', 'conventional knockout', 'global knockout', 'complete knockout'],
    gate_rule: 'all',
  },
  {
    slug: 'conditional-knockout',
    display_name: 'Conditional Knockout',
    parent_slug: null,
    synonyms: ['floxed', 'tissue specific knockout', 'cKO', 'conditional knockout'],
    gate_rule: 'all',
  },
  {
    slug: 'inducible-knockout',
    display_name: 'Inducible Knockout',
    parent_slug: 'conditional-knockout',
    synonyms: ['CreERT2', 'tamoxifen inducible', 'Tet On', 'Tet Off', 'doxycycline inducible'],
    gate_rule: 'all',
  },
  {
    slug: 'knockin',
    display_name: 'Knockin',
    parent_slug: null,
    synonyms: ['targeted insertion'],
    gate_rule: 'all',
  },
  {
    slug: 'point-mutation',
    display_name: 'Point Mutation Knockin',
    parent_slug: 'knockin',
    synonyms: ['single nucleotide variant', 'patient variant', 'point mutation'],
    gate_rule: 'variant',
  },
  {
    slug: 'cdna-knockin',
    display_name: 'cDNA Knockin',
    parent_slug: 'knockin',
    synonyms: ['coding sequence insertion', 'cDNA insertion'],
    gate_rule: 'all',
  },
  {
    slug: 'humanized',
    display_name: 'Humanized',
    parent_slug: null,
    synonyms: ['gene humanization', 'gene replacement', 'partial humanization'],
    gate_rule: 'ortholog',
  },
  {
    slug: 'reporter',
    display_name: 'Reporter',
    parent_slug: 'knockin',
    synonyms: ['fluorescent reporter', 'enzymatic reporter', 'GFP', 'YFP', 'RFP', 'mCherry', 'tdTomato', 'lacZ', 'luciferase'],
    gate_rule: 'all',
  },
  {
    slug: 'overexpression',
    display_name: 'Overexpression / Safe Harbor',
    parent_slug: null,
    synonyms: ['transgenic', 'Rosa26 payload', 'safe harbor insertion', 'targeted transgenic'],
    gate_rule: 'gain_of_function',
  },
  {
    slug: 'cre-driver',
    display_name: 'Cre Driver Line',
    parent_slug: null,
    synonyms: ['gene Cre', 'promoter driven Cre', 'Cre driver'],
    gate_rule: 'expression_restricted',
  },
  {
    slug: 'tag-knockin',
    display_name: 'Epitope Tag Knockin',
    parent_slug: 'knockin',
    synonyms: ['HA tag', 'FLAG tag', 'Myc tag', 'V5 tag', 'epitope tag'],
    gate_rule: 'all',
  },
];

async function main() {
  const supabase = getSupabase(true);

  // Pass 1: insert without parent_id
  for (const t of TYPES) {
    const { error } = await supabase.from('model_type').upsert(
      {
        slug: t.slug,
        display_name: t.display_name,
        parent_id: null,
        is_per_gene: true,
        synonyms: t.synonyms,
        gate_rule: t.gate_rule,
      },
      { onConflict: 'slug' },
    );
    if (error) throw error;
  }

  const { data: rows, error: fetchErr } = await supabase.from('model_type').select('id, slug');
  if (fetchErr) throw fetchErr;
  const idBySlug = Object.fromEntries((rows ?? []).map((r) => [r.slug, r.id]));

  // Pass 2: set parent_id
  for (const t of TYPES) {
    if (!t.parent_slug) continue;
    const { error } = await supabase
      .from('model_type')
      .update({ parent_id: idBySlug[t.parent_slug] })
      .eq('slug', t.slug);
    if (error) throw error;
  }

  console.log(`Seeded ${TYPES.length} model_type rows.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
