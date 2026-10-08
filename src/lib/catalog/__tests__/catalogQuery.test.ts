import { describe, expect, it } from 'vitest';
import { normalizeCatalogQuery, textMatchesQuery } from '../catalogQuery';

describe('normalizeCatalogQuery', () => {
  it('rewrites a hyphenated catalog number to the stored prefix-space form', () => {
    expect(normalizeCatalogQuery('CKO-254074')).toBe('CKO 254074');
  });

  it('keeps the spaced form', () => {
    expect(normalizeCatalogQuery('CKO 254074')).toBe('CKO 254074');
  });

  it('splits a compact catalog number', () => {
    expect(normalizeCatalogQuery('CKO254074')).toBe('CKO 254074');
  });

  it('rewrites every stored prefix with no spaces', () => {
    expect(normalizeCatalogQuery('CKO254074')).toBe('CKO 254074');
    expect(normalizeCatalogQuery('HU00014')).toBe('HU 00014');
    expect(normalizeCatalogQuery('KI253470')).toBe('KI 253470');
    expect(normalizeCatalogQuery('KO00001')).toBe('KO 00001');
    expect(normalizeCatalogQuery('NSG001')).toBe('NSG 001');
    expect(normalizeCatalogQuery('SM001')).toBe('SM 001');
    expect(normalizeCatalogQuery('TG00001')).toBe('TG 00001');
    expect(normalizeCatalogQuery('XA234815')).toBe('XA 234815');
    expect(normalizeCatalogQuery('DMKI234840')).toBe('DM KI 234840');
    expect(normalizeCatalogQuery('GMNVG210001')).toBe('GM NVG 210001');
  });

  it('does not let KO swallow CKO', () => {
    expect(normalizeCatalogQuery('CKO00001')).toBe('CKO 00001');
    expect(textMatchesQuery('Rest CKO 00001', 'KO00001')).toBe(false);
    expect(textMatchesQuery('Abtb1 KO 00001', 'KO00001')).toBe(true);
  });

  it('keeps a bare digit run', () => {
    expect(normalizeCatalogQuery('254074')).toBe('254074');
  });

  it('treats unicode dashes as hyphens', () => {
    expect(normalizeCatalogQuery('KI‐253470')).toBe('KI 253470');
  });

  it('leaves gene and phrase queries unchanged', () => {
    expect(normalizeCatalogQuery('PD-1')).toBe('PD-1');
    expect(normalizeCatalogQuery('Flt4 conditional knockout')).toBe('Flt4 conditional knockout');
    expect(normalizeCatalogQuery('Cre-lox')).toBe('Cre-lox');
  });
});

describe('textMatchesQuery', () => {
  const haystack = 'Scap CKO 254074 Conditional Knockout';

  it('matches hyphen, space, and compact catalog numbers against the stored value', () => {
    expect(textMatchesQuery(haystack, 'CKO-254074')).toBe(true);
    expect(textMatchesQuery(haystack, 'CKO 254074')).toBe(true);
    expect(textMatchesQuery(haystack, 'cko254074')).toBe(true);
    expect(textMatchesQuery(haystack, '254074')).toBe(true);
    expect(textMatchesQuery('M NSG 001', 'NSG001')).toBe(true);
    expect(textMatchesQuery('Stra8 DM KI 234840', 'DMKI234840')).toBe(true);
  });

  it('still matches ordinary substrings and rejects unrelated queries', () => {
    expect(textMatchesQuery(haystack, 'scap')).toBe(true);
    expect(textMatchesQuery(haystack, 'brca1')).toBe(false);
  });
});
