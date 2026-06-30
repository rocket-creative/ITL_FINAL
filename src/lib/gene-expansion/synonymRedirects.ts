/**
 * Synonym slug → canonical modification slug (301 redirects).
 */

export const GLOBAL_SYNONYM_TO_CANONICAL: Record<string, string> = {
  'constitutive-knockout': 'knockout',
  'conventional-knockout': 'knockout',
  'global-knockout': 'knockout',
  'complete-knockout': 'knockout',
  floxed: 'conditional-knockout',
  cko: 'conditional-knockout',
  transgenic: 'overexpression',
  rosa26: 'overexpression',
  'safe-harbor': 'overexpression',
  gfp: 'reporter',
  yfp: 'reporter',
  rfp: 'reporter',
  mcherry: 'reporter',
  tdtomato: 'reporter',
  lacz: 'reporter',
  luciferase: 'reporter',
  'cre-ert2': 'inducible-knockout',
  'tamoxifen-inducible': 'inducible-knockout',
  'point-mutantion': 'point-mutation',
};

export function resolveCanonicalModSlug(slug: string): string {
  const key = slug.toLowerCase().trim();
  return GLOBAL_SYNONYM_TO_CANONICAL[key] ?? key;
}

export function isSynonymSlug(slug: string): boolean {
  const key = slug.toLowerCase().trim();
  return key in GLOBAL_SYNONYM_TO_CANONICAL && GLOBAL_SYNONYM_TO_CANONICAL[key] !== key;
}

export function buildGeneModRedirectPath(geneName: string, fromSlug: string): string | null {
  const canonical = resolveCanonicalModSlug(fromSlug);
  if (canonical === fromSlug.toLowerCase().trim()) return null;
  return `/all-catalog-mouse-models/gene/${encodeURIComponent(geneName)}/${canonical}/`;
}

export const REPORTER_FLUOROPHORES = [
  { slug: 'gfp', name: 'GFP', label: 'Green fluorescent protein' },
  { slug: 'yfp', name: 'YFP', label: 'Yellow fluorescent protein' },
  { slug: 'rfp', name: 'RFP', label: 'Red fluorescent protein' },
  { slug: 'mcherry', name: 'mCherry', label: 'Monomeric Cherry fluorescent protein' },
  { slug: 'tdtomato', name: 'tdTomato', label: 'Tandem dimer Tomato' },
  { slug: 'lacz', name: 'lacZ', label: 'Beta galactosidase reporter' },
  { slug: 'luciferase', name: 'Luciferase', label: 'Bioluminescent reporter' },
] as const;
