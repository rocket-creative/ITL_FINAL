/**
 * SEO URL builder from parsed queries.
 */

import { describe, expect, it } from 'vitest';
import { parseQuery } from '../../search/parseQuery';
import { buildSeoUrl } from '../searchUrl';

const CATALOG = new Set([
  'Trp53',
  'Pten',
  'Pdcd1',
  'Brca1',
  'Albumin',
  'Cd4',
]);

describe('buildSeoUrl', () => {
  it('catalog gene + mod → Tier 1', () => {
    const p = parseQuery('Trp53 conditional knockout', [...CATALOG]);
    expect(buildSeoUrl(p, CATALOG)).toBe(
      '/all-catalog-mouse-models/gene/Trp53/conditional-knockout/'
    );
  });

  it('catalog gene + mod + tissue → Tier 4 tissue slug', () => {
    const p = parseQuery('Pten conditional knockout liver', ['Pten', 'Trp53']);
    expect(buildSeoUrl(p, CATALOG)).toBe(
      '/all-catalog-mouse-models/gene/Pten/conditional-knockout/liver-specific/'
    );
  });

  it('tissue-only → Tier 2', () => {
    const p = parseQuery('liver', []);
    expect(buildSeoUrl(p, CATALOG)).toMatch(/^\/cre-lines\/liver-specific\/$/);
  });

  it('driver-only → Tier 3', () => {
    const p = parseQuery('albumin cre', ['Trp53']);
    expect(buildSeoUrl(p, CATALOG)).toBe('/cre-drivers/albumin-cre/');
  });

  it('non-catalog gene + mod → strategy page with gene param', () => {
    const p = parseQuery('Foo999 conditional knockout', ['Foo999', 'Trp53']);
    expect(buildSeoUrl(p, CATALOG)).toContain('gene=Foo999');
    expect(buildSeoUrl(p, CATALOG)).toContain('/conditional-knockout-mouse-models');
  });
});
