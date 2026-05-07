/**
 * Parser coverage for curated catalog + neuroscience style queries.
 */

import { describe, expect, it } from 'vitest';
import { parseQuery } from '../parseQuery';

const CG = [
  'Trp53',
  'Ptn',
  'Pten',
  'Pdcd1',
  'Brca1',
  'Apoe',
  'Tnf',
  'Htt',
  'Trem2',
  'Cd19',
  'Ins1',
  'Olig2',
  'Mtor',
  'Lag3',
  'Erbb2',
  'Foxp3',
  'Nestin',
] as const;

describe('parseQuery — core prompts', () => {
  it('p53 conditional knockout', () => {
    const q = parseQuery('p53 conditional knockout', [...CG]);
    expect(q.geneCandidates[0]).toBe('Trp53');
    expect(q.modificationTypes[0]).toBe('Conditional Knockout');
  });

  it('Cre-conditional (floxed) allele … pleiotrophin (Ptn)', () => {
    const q = parseQuery('Cre-conditional (floxed) allele to delete the gene pleiotrophin (Ptn)', [...CG]);
    expect(q.geneCandidates).toContain('Ptn');
    expect(q.modificationTypes[0]).toBe('Conditional Knockout');
  });

  it('PD-1 humanized mouse', () => {
    const q = parseQuery('PD-1 humanized mouse', [...CG]);
    expect(q.geneCandidates[0]).toBe('Pdcd1');
    expect(q.modificationTypes[0]).toBe('Humanized');
  });

  it('BRCA1 floxed', () => {
    const q = parseQuery('BRCA1 floxed', [...CG]);
    expect(q.geneCandidates[0]).toBe('Brca1');
    expect(q.modificationTypes).toContain('Conditional Knockout');
  });

  it('Apoe knockin point mutation', () => {
    const q = parseQuery('Apoe knockin point mutation', [...CG]);
    expect(q.geneCandidates).toContain('Apoe');
    expect(q.modificationTypes[0]).toBe('Knockin');
    expect(q.modifiers).toContain('point-mutation');
  });

  it('tamoxifen inducible Cre Tnf', () => {
    const q = parseQuery('tamoxifen inducible Cre Tnf', [...CG]);
    expect(q.geneCandidates).toContain('Tnf');
    expect(q.modificationTypes[0]).toBe('Conditional Knockout');
    expect(q.modifiers).toContain('inducible');
  });

  it('tdTomato reporter Rosa26', () => {
    const q = parseQuery('tdTomato reporter Rosa26', []);
    expect(q.geneCandidates.length).toBe(0);
    expect(q.modificationTypes[0]).toBe('Knockin');
    expect(q.modifiers).toContain('reporter');
  });

  it('htt huntingtin knockout mouse', () => {
    const q = parseQuery('htt huntingtin knockout mouse', [...CG]);
    expect(q.geneCandidates).toContain('Htt');
    expect(q.modificationTypes.includes('Knockout')).toBe(true);
  });
});

describe('parseQuery — Cre / tissue extension', () => {
  it('liver specific Cre mouse', () => {
    const q = parseQuery('liver specific Cre mouse', []);
    expect(q.tissueCellCandidates).toContain('liver');
    expect(q.modificationTypes[0]).toBe('Conditional Knockout');
  });

  it('hepatocyte specific knockout', () => {
    const q = parseQuery('hepatocyte specific knockout', []);
    expect(q.tissueCellCandidates).toContain('liver');
  });

  it('Albumin-Cre driver', () => {
    const q = parseQuery('Albumin-Cre', []);
    expect(q.creDriverCandidates.some((d) => d.includes('Albumin'))).toBe(true);
    expect(q.tissueCellCandidates).toContain('liver');
  });

  it('Pten Albumin Cre', () => {
    const q = parseQuery('Pten Albumin Cre', [...CG]);
    expect(q.geneCandidates[0]).toBe('Pten');
    expect(q.creDriverCandidates.some((d) => d.includes('Albumin'))).toBe(true);
  });

  it('CD4-Cre Pten', () => {
    const q = parseQuery('CD4-Cre Pten', [...CG]);
    expect(q.geneCandidates[0]).toBe('Pten');
    expect(q.creDriverCandidates.some((d) => d.includes('CD4'))).toBe(true);
    expect(q.tissueCellCandidates).toContain('t-cell');
  });

  it('B cell knockout CD19 Cre — Cd19 promoter not organism gene', () => {
    const q = parseQuery('B cell knockout CD19 Cre', [...CG]);
    expect(q.geneCandidates.includes('Cd19')).toBe(false);
    expect(q.creDriverCandidates.some((d) => d.includes('CD19'))).toBe(true);
  });

  it('microglia conditional Trem2', () => {
    const q = parseQuery('microglia conditional Trem2', [...CG]);
    expect(q.geneCandidates).toContain('Trem2');
    expect(q.tissueCellCandidates).toContain('microglia');
  });

  it('intestinal Villin Cre', () => {
    const q = parseQuery('intestinal Villin Cre', []);
    expect(q.tissueCellCandidates).toContain('intestine');
    expect(q.creDriverCandidates.some((d) => d.includes('Villin'))).toBe(true);
  });

  it('Treg Cre', () => {
    const q = parseQuery('Treg specific Foxp3 Cre', [...CG]);
    expect(q.tissueCellCandidates).toContain('treg');
    expect(q.creDriverCandidates.some((d) => d.includes('Foxp3'))).toBe(true);
  });

  it('Nestin-Cre Mtor', () => {
    const q = parseQuery('Nestin-Cre Mtor', [...CG]);
    expect(q.geneCandidates).toContain('Mtor');
    expect(q.creDriverCandidates.some((d) => d.includes('Nestin'))).toBe(true);
  });

  it('podocyte knockout', () => {
    const q = parseQuery('podocyte specific knockout', []);
    expect(q.tissueCellCandidates).toContain('kidney');
  });

  it('beta cell Ins1 Cre', () => {
    const q = parseQuery('beta cell specific Ins1 Cre', [...CG]);
    expect(q.creDriverCandidates.some((d) => d.includes('Ins1'))).toBe(true);
  });

  it('Olig2-Cre Pten', () => {
    const q = parseQuery('Olig2-Cre Pten', [...CG]);
    expect(q.geneCandidates[0]).toBe('Pten');
    expect(q.creDriverCandidates.some((d) => d.includes('Olig2'))).toBe(true);
  });

  it('tamoxifen inducible neuron Cre', () => {
    const q = parseQuery('tamoxifen inducible neuron specific Cre', []);
    expect(q.modifiers).toContain('inducible');
    expect(q.tissueCellCandidates).toContain('neuron');
  });
});
