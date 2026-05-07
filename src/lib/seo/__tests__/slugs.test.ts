/**
 * Slug round-trips and Tier 4 resolver tie-break (tissue before driver).
 */

import { describe, expect, it } from 'vitest';
import {
  driverCanonicalToSlug,
  driverSlugToCanonical,
  modCanonicalToSlug,
  modSlugToCanonical,
  resolveTissueOrDriverSlug,
  tissueCanonicalToSlug,
  tissueSlugToCanonical,
  toSlug,
} from '../slugs';

describe('toSlug', () => {
  it('normalizes conditional knockout', () => {
    expect(toSlug('Conditional Knockout')).toBe('conditional-knockout');
  });

  it('maps Greek alpha in Myh6 style labels', () => {
    expect(toSlug('αMHC-Cre')).toBe('amhc-cre');
  });
});

describe('mod slugs', () => {
  it('round-trips Conditional Knockout', () => {
    expect(modCanonicalToSlug('Conditional Knockout')).toBe('conditional-knockout');
    expect(modSlugToCanonical('conditional-knockout')).toBe('Conditional Knockout');
  });

  it('round-trips Knockout', () => {
    expect(modSlugToCanonical(modCanonicalToSlug('Knockout'))).toBe('Knockout');
  });
});

describe('tissue line slugs', () => {
  it('liver-specific ↔ liver', () => {
    expect(tissueCanonicalToSlug('liver')).toBe('liver-specific');
    expect(tissueSlugToCanonical('liver-specific')).toBe('liver');
  });

  it('t-cell-specific ↔ t-cell', () => {
    expect(tissueSlugToCanonical('t-cell-specific')).toBe('t-cell');
    expect(tissueCanonicalToSlug('t-cell')).toBe('t-cell-specific');
  });
});

describe('driver slugs', () => {
  it('round-trips Albumin-Cre', () => {
    expect(driverCanonicalToSlug('Albumin-Cre')).toBe('albumin-cre');
    expect(driverSlugToCanonical('albumin-cre')).toBe('Albumin-Cre');
  });

  it('round-trips CD4-Cre', () => {
    expect(driverSlugToCanonical('cd4-cre')).toBe('CD4-Cre');
  });
});

describe('resolveTissueOrDriverSlug', () => {
  it('prefers tissue when segment is tissue line only', () => {
    const r = resolveTissueOrDriverSlug('liver-specific');
    expect(r).toEqual({ kind: 'tissue', canonical: 'liver' });
  });

  it('resolves driver when not a tissue slug', () => {
    const r = resolveTissueOrDriverSlug('albumin-cre');
    expect(r).toEqual({ kind: 'driver', canonical: 'Albumin-Cre' });
  });
});
