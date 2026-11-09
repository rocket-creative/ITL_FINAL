import { describe, it, expect } from 'vitest';
import { computeIsIndexable, countDataSignals } from '../gates';
import type { GeneRow, ModelTypeRow } from '../db';
import { lintBuildInquiryCopy } from '../copyLint';
import { buildBuildInquiryMetadata, effectiveIndexable } from '../metadata';

const baseGene: GeneRow = {
  id: '1',
  symbol: 'Trp53',
  mgi_id: null,
  name: null,
  synonyms: [],
  human_ortholog_symbol: 'TP53',
  human_ortholog_hgnc: '11998',
  has_human_ortholog: true,
  impc_viability: 'lethal',
  impc_zygosity: null,
  expression_profile: { top_tissues: ['liver'] },
  expression_specificity: 'restricted',
  clinvar_pathogenic_count: 100,
  omim_ids: ['191170'],
  disease_associated: true,
  existing_allele_count: 5,
  existing_conditional_count: 2,
  existing_knockout_count: 1,
  updated_at: new Date().toISOString(),
};

const humanizedType: ModelTypeRow = {
  id: 'h',
  slug: 'humanized',
  display_name: 'Humanized',
  parent_id: null,
  is_per_gene: true,
  synonyms: [],
  gate_rule: 'ortholog',
};

describe('gene expansion gates', () => {
  it('counts data signals', () => {
    expect(countDataSignals(baseGene)).toBeGreaterThanOrEqual(2);
  });

  it('indexes humanized with ortholog and signals', () => {
    const r = computeIsIndexable(baseGene, humanizedType);
    expect(r.pass).toBe(true);
  });

  it('blocks humanized without ortholog', () => {
    const r = computeIsIndexable({ ...baseGene, has_human_ortholog: false, human_ortholog_symbol: null }, humanizedType);
    expect(r.pass).toBe(false);
  });
});

describe('copy lint', () => {
  it('passes compliant title', () => {
    const r = lintBuildInquiryCopy({
      title: 'Trp53 Knockout mouse | ingenious targeting laboratory',
      h1: 'Trp53 Knockout Mouse',
      headings: ['Scientific design'],
      bodyParagraphs: ['Since 1998, ingenious targeting laboratory has delivered 2,800+ projects.'],
    });
    expect(r.pass).toBe(true);
  });

  it('fails generated in h1', () => {
    const r = lintBuildInquiryCopy({
      title: 'Trp53 Knockout mouse | ingenious targeting laboratory',
      h1: 'Generated Trp53 Knockout Mouse',
      headings: [],
      bodyParagraphs: [],
    });
    expect(r.pass).toBe(false);
  });
});

/**
 * These exercise the REAL metadata call path rather than hand-built lint
 * input. The copy lint requires the full brand name in the title, but
 * buildBuildInquiryMetadata builds a deliberately bare title (the root layout
 * appends the brand). Linting that bare title failed the brand rule on every
 * build_inquiry page and silently forced noindex regardless of the database
 * flag. The older lint tests passed a pre-branded title by hand, so they
 * never caught it.
 */
describe('build_inquiry robots directive (real call path)', () => {
  it('honours dbIndexable=true for humanized', () => {
    expect(effectiveIndexable(baseGene, humanizedType, true)).toBe(true);
  });

  it('still respects dbIndexable=false', () => {
    expect(effectiveIndexable(baseGene, humanizedType, false)).toBe(false);
  });

  it('emits index,follow in the metadata object itself', () => {
    const meta = buildBuildInquiryMetadata(baseGene, humanizedType, true);
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('does not leak the brand into the bare title', () => {
    const meta = buildBuildInquiryMetadata(baseGene, humanizedType, true);
    expect(meta.title).toBe('Trp53 Humanized mouse');
  });
});
