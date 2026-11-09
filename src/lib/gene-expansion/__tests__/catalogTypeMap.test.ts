import { describe, expect, it } from 'vitest';
import {
  catalogModelsForSlug,
  filterCatalogForSlug,
  slugDisplayLabel,
  slugToCatalogDisplay,
} from '../catalogTypeMap';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';

function model(partial: Partial<ServerCatalogModel>): ServerCatalogModel {
  return {
    geneName: 'Apoe',
    modelAbbrev: 'Test',
    modelType: 'Knockin',
    category: '',
    availability: 'Live',
    catalogNumber: 'KI 000001',
    description: '',
    ...partial,
  } as ServerCatalogModel;
}

// Real shapes from catalog_models: the category column uses "CKO",
// "Fluorescent Model", "Cre/Dre Toolbox" and "Point Mutation" — not the
// marker names ("gfp", "lacz") the match rules originally guessed at.
const apoeFlox = model({
  modelAbbrev: 'Apoe-Flox',
  modelType: 'Conditional Knockout',
  category: 'CKO, Disease Model',
  catalogNumber: 'CKO 220617',
});
const fluorescentKi = model({ category: 'Fluorescent Model' });
const pointMutationKi = model({ category: 'Point Mutation' });
const creDriverKi = model({ category: 'Cre/Dre Toolbox' });
const plainKi = model({ category: 'Other' });

describe('inducible-knockout must not borrow conditional stock', () => {
  it('matches no conditional knockout without an inducible category', () => {
    // The only Apoe conditional line is a plain floxed allele. Serving it at
    // /inducible-knockout/ advertised a floxed line as inducible inventory.
    expect(filterCatalogForSlug([apoeFlox], 'inducible-knockout')).toHaveLength(0);
  });

  it('still matches a genuinely inducible line', () => {
    const creert = model({
      modelType: 'Conditional Knockout',
      category: 'CKO, CreERT2 inducible',
    });
    expect(filterCatalogForSlug([creert], 'inducible-knockout')).toHaveLength(1);
  });

  it('leaves the conditional page itself intact', () => {
    expect(filterCatalogForSlug([apoeFlox], 'conditional-knockout')).toHaveLength(1);
  });
});

describe('knockin sub-types address disjoint rows', () => {
  const all = [fluorescentKi, pointMutationKi, creDriverKi, plainKi];

  it('reporter matches the catalog’s "Fluorescent Model" wording', () => {
    // Before this, reporter's rule listed gfp/yfp/lacz and so matched nothing,
    // while the route fell back to "every Knockin".
    expect(filterCatalogForSlug(all, 'reporter')).toEqual([fluorescentKi]);
  });

  it('knockin excludes rows owned by a sub-type', () => {
    const got = filterCatalogForSlug(all, 'knockin');
    expect(got).not.toContain(fluorescentKi);
    expect(got).not.toContain(pointMutationKi);
    expect(got).toContain(plainKi);
  });

  it('point-mutation keeps only point mutation rows', () => {
    expect(filterCatalogForSlug(all, 'point-mutation')).toEqual([pointMutationKi]);
  });

  it('no two knockin slugs return the same set', () => {
    const slugs = ['knockin', 'reporter', 'point-mutation', 'tag-knockin', 'cdna-knockin'] as const;
    const fingerprints = slugs.map((s) =>
      filterCatalogForSlug(all, s)
        .map((m) => m.category)
        .sort()
        .join('|'),
    );
    // Previously all five were identical, which put the same page and the same
    // H1 on five indexable URLs for every gene with a knockin.
    const nonEmpty = fingerprints.filter((f) => f.length > 0);
    expect(new Set(nonEmpty).size).toBe(nonEmpty.length);
  });
});

describe('catalogModelsForSlug', () => {
  it('uses the slug rule when one exists', () => {
    expect(catalogModelsForSlug([apoeFlox], 'inducible-knockout', 'Conditional Knockout')).toHaveLength(0);
  });

  it('falls back to exact model type for slugs with no rule', () => {
    const tg = model({ modelType: 'Transgenic', category: '' });
    expect(catalogModelsForSlug([tg], 'transgenic', 'Transgenic')).toHaveLength(1);
  });

  it('returns nothing when there is neither a rule nor a model type', () => {
    expect(catalogModelsForSlug([plainKi], 'not-a-slug', null)).toHaveLength(0);
  });
});

describe('slugDisplayLabel', () => {
  it('distinguishes slugs that share one catalog model type', () => {
    // All four match "Knockin" rows, so the match type cannot be the label.
    for (const slug of ['knockin', 'reporter', 'point-mutation', 'tag-knockin']) {
      expect(slugToCatalogDisplay(slug)).toBe('Knockin');
    }
    expect(slugDisplayLabel('reporter', 'Knockin')).toBe('Reporter');
    expect(slugDisplayLabel('point-mutation', 'Knockin')).toBe('Point Mutation Knockin');
    expect(slugDisplayLabel('tag-knockin', 'Knockin')).toBe('Epitope Tag Knockin');
    expect(slugDisplayLabel('knockin', 'Knockin')).toBe('Knockin');
  });

  it('names inducible knockout as itself, not as conditional', () => {
    expect(slugToCatalogDisplay('inducible-knockout')).toBe('Conditional Knockout');
    expect(slugDisplayLabel('inducible-knockout', 'Conditional Knockout')).toBe('Inducible Knockout');
  });

  it('falls back for an unknown slug', () => {
    expect(slugDisplayLabel('mystery', 'Knockout')).toBe('Knockout');
  });
});
