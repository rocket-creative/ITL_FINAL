import { describe, expect, it } from 'vitest';
import { hasRealHumanOrtholog } from '../content';
import type { GeneRow } from '../db';

function gene(partial: Partial<GeneRow>): GeneRow {
  return {
    id: 'x',
    symbol: 'Trp53',
    mgi_id: null,
    name: null,
    synonyms: [],
    human_ortholog_symbol: null,
    human_ortholog_hgnc: null,
    has_human_ortholog: false,
    impc_viability: null,
    impc_zygosity: null,
    expression_profile: null,
    expression_specificity: null,
    clinvar_pathogenic_count: 0,
    omim_ids: [],
    disease_associated: false,
    existing_allele_count: 0,
    existing_conditional_count: 0,
    existing_knockout_count: 0,
    ...partial,
  } as GeneRow;
}

describe('hasRealHumanOrtholog', () => {
  it('rejects a value that is just the mouse symbol uppercased', () => {
    // These are the real catalog rows that rendered "Human ortholog R26" and
    // "Human ortholog PD" on live humanized pages.
    expect(hasRealHumanOrtholog(gene({ symbol: 'R26', human_ortholog_symbol: 'R26' }))).toBe(false);
    expect(hasRealHumanOrtholog(gene({ symbol: 'Pd', human_ortholog_symbol: 'PD' }))).toBe(false);
    expect(hasRealHumanOrtholog(gene({ symbol: 'Trem2', human_ortholog_symbol: 'TREM2' }))).toBe(false);
  });

  it('accepts a genuinely different human symbol', () => {
    expect(hasRealHumanOrtholog(gene({ symbol: 'Trp53', human_ortholog_symbol: 'TP53' }))).toBe(true);
  });

  it('rejects empty or missing values', () => {
    expect(hasRealHumanOrtholog(gene({ human_ortholog_symbol: null }))).toBe(false);
    expect(hasRealHumanOrtholog(gene({ human_ortholog_symbol: '  ' }))).toBe(false);
  });
});
