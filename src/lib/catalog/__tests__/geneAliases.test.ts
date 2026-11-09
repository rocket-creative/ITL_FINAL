import { describe, it, expect } from 'vitest';
import {
  CATALOG_GENE_ALIASES,
  canonicalGeneFor,
  catalogGeneNamesFor,
  hasCatalogAliases,
  isAliasedGeneName,
} from '../geneAliases';

describe('catalogGeneNamesFor', () => {
  it('returns the gene unchanged when it has no aliases', () => {
    // Trp53 has no humanized counterpart in the catalog. Ldlr is no longer a
    // valid example: the generated layer folds hLDLR into it.
    expect(catalogGeneNamesFor('Trp53')).toEqual(['Trp53']);
  });

  it('puts the canonical symbol first', () => {
    expect(catalogGeneNamesFor('Apoe')[0]).toBe('Apoe');
  });

  it('absorbs the humanized APOE isoform lines', () => {
    const names = catalogGeneNamesFor('Apoe');
    // HU 190013 / HU 190003 / HU 190002 — the lines that were invisible to
    // the Apoe hub while gene_name was matched with strict equality.
    expect(names).toContain('hAPOE2');
    expect(names).toContain('hAPOE3');
    expect(names).toContain('hAPOE4');
  });

  it('absorbs the crosses that are unroutable on their own', () => {
    const names = catalogGeneNamesFor('Apoe');
    expect(names).toContain('hAPOE4/hMAPT');
    expect(names).toContain('hAPOE4/hAppNL');
  });

  it('matches the truncated import and the corrected spelling', () => {
    const names = catalogGeneNamesFor('Apoe');
    expect(names).toContain('hAPOE4(E1');
    expect(names).toContain('hAPOE4(E1-E4)');
  });

  it('tolerates a case variant of the canonical symbol', () => {
    expect(catalogGeneNamesFor('apoe')).toEqual(catalogGeneNamesFor('Apoe'));
  });

  it('never repeats the canonical symbol', () => {
    const names = catalogGeneNamesFor('Apoe');
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('canonicalGeneFor', () => {
  it('maps an alias to its canonical gene', () => {
    expect(canonicalGeneFor('hAPOE4')).toBe('Apoe');
    expect(canonicalGeneFor('hAPOE4(E1')).toBe('Apoe');
    expect(canonicalGeneFor('hCD3EDG/Apoe')).toBe('Apoe');
  });

  it('is case insensitive', () => {
    expect(canonicalGeneFor('hapoe2')).toBe('Apoe');
  });

  it('returns undefined for an already canonical gene, so it never self-redirects', () => {
    expect(canonicalGeneFor('Apoe')).toBeUndefined();
    expect(canonicalGeneFor('apoe')).toBeUndefined();
  });

  it('returns undefined for an unrelated gene', () => {
    expect(canonicalGeneFor('Ldlr')).toBeUndefined();
  });
});

describe('alias map integrity', () => {
  it('no canonical gene is listed as its own alias', () => {
    for (const [canonical, aliases] of Object.entries(CATALOG_GENE_ALIASES)) {
      expect(aliases.map((a) => a.toLowerCase())).not.toContain(canonical.toLowerCase());
    }
  });

  it('no alias is itself a canonical gene', () => {
    const canonicals = new Set(Object.keys(CATALOG_GENE_ALIASES).map((g) => g.toLowerCase()));
    for (const aliases of Object.values(CATALOG_GENE_ALIASES)) {
      for (const alias of aliases) {
        expect(canonicals.has(alias.toLowerCase())).toBe(false);
      }
    }
  });

  it('every alias list is non-empty', () => {
    for (const aliases of Object.values(CATALOG_GENE_ALIASES)) {
      expect(aliases.length).toBeGreaterThan(0);
    }
  });

  it('helpers agree with each other', () => {
    expect(hasCatalogAliases('Apoe')).toBe(true);
    expect(hasCatalogAliases('Ldlr')).toBe(true); // hLDLR, via the generated layer
    expect(hasCatalogAliases('Trp53')).toBe(false);
    expect(isAliasedGeneName('hAPOE3')).toBe(true);
    expect(isAliasedGeneName('Apoe')).toBe(false);
  });
});

describe('generated alias layer', () => {
  it('folds humanized names onto a canonical gene', () => {
    expect(canonicalGeneFor('hVEGFA')).toBe('Vegfa');
    expect(canonicalGeneFor('hTREM2')).toBe('Trem2');
    expect(catalogGeneNamesFor('Vegfa')).toContain('hVEGFA');
  });

  it('omits names truncated at a delimiter', () => {
    // "hPD" is really hPD-1 / hPD-L1 (Pdcd1 and Cd274) cut at the hyphen, so
    // no single parent is correct; "h4" is h4-1BB (Tnfrsf9). Parenting either
    // by de-prefixing would file rows under a gene that does not exist.
    expect(canonicalGeneFor('hPD')).toBeUndefined();
    expect(canonicalGeneFor('h4')).toBeUndefined();
  });

  it('never redirects onto a gene with no catalog page', () => {
    // Every alias target must itself be a canonical gene we list.
    for (const [canonical, aliases] of Object.entries(CATALOG_GENE_ALIASES)) {
      expect(canonical.length).toBeGreaterThan(0);
      for (const alias of aliases) {
        expect(alias.toLowerCase()).not.toBe(canonical.toLowerCase());
      }
    }
  });

  it('keeps curated Apoe aliases through the merge', () => {
    const names = catalogGeneNamesFor('Apoe');
    for (const a of ['hAPOE2', 'hAPOE3', 'hAPOE4', 'hAPOE4(E1', 'hAPOE4/hMAPT']) {
      expect(names).toContain(a);
    }
  });

  it('resolves every alias to a canonical gene deterministically', () => {
    for (const [canonical, aliases] of Object.entries(CATALOG_GENE_ALIASES)) {
      for (const alias of aliases) {
        const resolved = canonicalGeneFor(alias);
        // A cross listed under two parents resolves to its first owner; every
        // other alias must resolve to the gene it is listed under.
        expect(resolved).toBeDefined();
        if (!alias.includes('/')) expect(resolved).toBe(canonical);
      }
    }
  });

  it('does not alias a canonical gene onto something else', () => {
    expect(canonicalGeneFor('Apoe')).toBeUndefined();
    expect(canonicalGeneFor('Vegfa')).toBeUndefined();
  });
});
