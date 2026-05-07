/** Gene alias (lowercase phrase or token) → canonical mouse gene symbol (catalog casing). */

export interface ModificationPattern {
  readonly match: RegExp;
  readonly canonicalModelType: string;
  readonly fallbackPage: string;
  readonly modifiers: readonly string[];
}

export const GENE_SYNONYMS_SEED: Record<string, string> = {
  tp53: 'Trp53',
  p53: 'Trp53',
  pdcd1: 'Pdcd1',
  'pd-1': 'Pdcd1',
  pd1: 'Pdcd1',
  'pdcd-1': 'Pdcd1',
  cd274: 'Cd274',
  'pd-l1': 'Cd274',
  pdl1: 'Cd274',
  'b7-h1': 'Cd274',
  'pd-l2': 'Pdcd1lg2',
  pdl2: 'Pdcd1lg2',
  'ctla-4': 'Ctla4',
  ctla4: 'Ctla4',
  'lag-3': 'Lag3',
  lag3: 'Lag3',
  'tim-3': 'Havcr2',
  tim3: 'Havcr2',
  'havcr-2': 'Havcr2',
  tigit: 'Tigit',
  pleiotrophin: 'Ptn',
  huntingtin: 'Htt',
  htt: 'Htt',
  'superoxide dismutase 1': 'Sod1',
  sod1: 'Sod1',
  'sod-1': 'Sod1',
  'apolipoprotein e': 'Apoe',
  apoe: 'Apoe',
  'amyloid precursor protein': 'App',
  app: 'App',
  'presenilin 1': 'Psen1',
  ps1: 'Psen1',
  psen1: 'Psen1',
  'presenilin 2': 'Psen2',
  ps2: 'Psen2',
  psen2: 'Psen2',
  'brca-1': 'Brca1',
  brca1: 'Brca1',
  'brca-2': 'Brca2',
  brca2: 'Brca2',
  egfr: 'Egfr',
  her1: 'Egfr',
  her2: 'Erbb2',
  neu: 'Erbb2',
  'erbb-2': 'Erbb2',
  erbb2: 'Erbb2',
  kras: 'Kras',
  nras: 'Nras',
  hras: 'Hras',
  pten: 'Pten',
  myc: 'Myc',
  'c-myc': 'Myc',
  rb1: 'Rb1',
  retinoblastoma: 'Rb1',
  'tnf-alpha': 'Tnf',
  tnfa: 'Tnf',
  tnf: 'Tnf',
  'il-6': 'Il6',
  il6: 'Il6',
  'il-2': 'Il2',
  il2: 'Il2',
  'ifn-gamma': 'Ifng',
  ifng: 'Ifng',
  'nf-kb': 'Nfkb1',
  nfkb1: 'Nfkb1',
  nfkb: 'Nfkb1',
  mtor: 'Mtor',
  'mammalian target of rapamycin': 'Mtor',
  akt: 'Akt1',
  akt1: 'Akt1',
  pik3ca: 'Pik3ca',
  stat3: 'Stat3',
  foxp3: 'Foxp3',
  cd4: 'Cd4',
  cd8a: 'Cd8a',
  cd8: 'Cd8a',
  cd19: 'Cd19',
  cd28: 'Cd28',
  cd20: 'Ms4a1',
  trem2: 'Trem2',
};

export function mergeCatalogIntoGeneSynonyms(
  catalogGeneNames: readonly string[]
): Record<string, string> {
  const m: Record<string, string> = { ...GENE_SYNONYMS_SEED };
  for (const g of catalogGeneNames) {
    const t = g.trim();
    if (t) m[t.toLowerCase()] = t;
  }
  return m;
}

export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function resolveGene(
  rawToken: string,
  synonyms: Record<string, string>,
  catalogGenes: readonly string[]
): string | null {
  const tok = rawToken.replace(/^[^\w]*|[^\w\d-]*$/g, '').trim();
  if (!tok || tok.length < 2 || tok.toLowerCase() === 'cre') return null;

  const lower = tok.toLowerCase();
  if (synonyms[lower]) return synonyms[lower];

  const exact = catalogGenes.find((g) => g.toLowerCase() === lower);
  if (exact) return exact;

  if (lower.length < 3) return null;

  const pref = catalogGenes.filter((g) => g.toLowerCase().startsWith(lower));
  if (pref.length === 1) return pref[0]!;
  if (pref.length > 1) return pref.sort((a, b) => a.localeCompare(b))[0]!;
  return null;
}

export const MODIFICATION_PATTERNS: readonly ModificationPattern[] = [
  {
    match:
      /\b(conditional\s*knockout|cko|cre[\s-]?conditional|floxed|flox(?:ed)?\s*allele|loxp\s*flanked|conditional\s*ko|floxxed)\b/i,
    canonicalModelType: 'Conditional Knockout',
    fallbackPage: '/conditional-knockout-mouse-models',
    modifiers: ['cre', 'loxp', 'floxed'],
  },
  {
    match:
      /\b(point\s*mutation|missense|snp\s*knockin|patient\s*mutation)\b/i,
    canonicalModelType: 'Knockin',
    fallbackPage: '/point-mutation-mice',
    modifiers: ['point-mutation'],
  },
  {
    match: /\b(reporter|\bgfp\b|tdtomato|td-tomato|lacz\b|luciferase|cre[\s-]?reporter)\b/i,
    canonicalModelType: 'Knockin',
    fallbackPage: '/reporter-knockin',
    modifiers: ['reporter'],
  },
  {
    match: /\b(tag\s*knockin|epitope\s*tag|flag\s*tag|ha\s*tag|myc\s*tag|3xflag)\b/i,
    canonicalModelType: 'Knockin',
    fallbackPage: '/tag-knockin-mice',
    modifiers: ['tag'],
  },
  {
    match: /\b(humanized|gene\s*replacement|hu[\s-]?(pd1|pdl1|ctla4|lag3|tim3))\b/i,
    canonicalModelType: 'Humanized',
    fallbackPage: '/humanized-mouse-models',
    modifiers: ['humanized'],
  },
  {
    match: /\b(transgenic|bac\s*transgenic|random\s*integration|overexpression)\b/i,
    canonicalModelType: 'Transgenic',
    fallbackPage: '/transgenic-mouse-service',
    modifiers: ['transgenic'],
  },
  {
    match: /\b(rosa26|safe\s*harbor)\b/i,
    canonicalModelType: 'Knockin',
    fallbackPage: '/rosa26',
    modifiers: ['rosa26'],
  },
  {
    match: /\b(inducible|tamoxifen|cre[\s-]?ert2?|doxycycline|\btet\b|tet[\s-]?(on|off))\b/i,
    canonicalModelType: 'Conditional Knockout',
    fallbackPage: '/inducible-conditional-knockout',
    modifiers: ['inducible'],
  },
  {
    match:
      /\b(tissue[\s-]?specific|cell[\s-]?type[\s-]?specific|hepatocyte|neuron[\s-]?specific|t[\s-]?cell[\s-]?specific|b[\s-]?cell[\s-]?specific|liver\s*specific|cardiomyocyte|microglia|keratinocyte|podocyte\s*specific|intestinal\s*stem\s*cell|beta\s*cell\s*specific|hematopoietic\s*specific|endothelial\s*specific|oligodendrocyte|macrophage\s*specific|osteoblast\s*specific|adipocyte\s*specific|splenic|hepatic\b)\b/i,
    canonicalModelType: 'Conditional Knockout',
    fallbackPage: '/tissue-specific-knockout',
    modifiers: ['tissue-specific'],
  },
  {
    match:
      /\b(knockin|knock[\s-]?in\b|\bki\b)\b/i,
    canonicalModelType: 'Knockin',
    fallbackPage: '/knockin-mouse-models',
    modifiers: [],
  },
  {
    match:
      /\b(conventional\s*knockout|whole[\s-]?body\s*knockout|global\s*knockout|null\s*allele|complete\s*knockout|straight\s*knockout)\b/i,
    canonicalModelType: 'Knockout',
    fallbackPage: '/conventional-knockout-mouse-models',
    modifiers: [],
  },
  {
    match:
      /\b(immunodeficient|\bnsg\b|nod\s*scid|scid\s*mouse|immunosuppressed)\b/i,
    canonicalModelType: 'Immunodeficient',
    fallbackPage: '/immunology-mouse-models',
    modifiers: [],
  },
  {
    match: /\bxenograft\b/i,
    canonicalModelType: 'Xenograft-Applicable',
    fallbackPage: '/syngeneic-tumor-models',
    modifiers: ['xenograft'],
  },
  /** Catch-all knockout (after conditional / conventional phrases) */
  {
    match: /\bknock\s*outs?\b|\bknockout\b|\bk\d*o\b/i,
    canonicalModelType: 'Knockout',
    fallbackPage: '/conventional-knockout-mouse-models',
    modifiers: [],
  },
];

/** Regex lastIndex safe */
export function regexTestSafe(reSource: RegExp, s: string): boolean {
  return new RegExp(reSource.source, reSource.flags).test(s);
}

export function allMatchingModificationPatterns(
  cleaned: string
): readonly ModificationPattern[] {
  return MODIFICATION_PATTERNS.filter((p) => regexTestSafe(p.match, cleaned));
}

export function primaryModificationPattern(
  cleaned: string
): ModificationPattern | undefined {
  for (const p of MODIFICATION_PATTERNS) {
    if (regexTestSafe(p.match, cleaned)) return p;
  }
  return undefined;
}

export function fallbackPageForModelType(primaryType: string | undefined): string | undefined {
  if (!primaryType) return undefined;
  const hit = MODIFICATION_PATTERNS.find((p) => p.canonicalModelType === primaryType);
  return hit?.fallbackPage;
}

/** Canonical tissue keys used with CRE_DRIVERS and URL ?tissue= */
export const TISSUE_CELL_SYNONYMS: Record<string, string> = {
  liver: 'liver',
  hepatic: 'liver',
  hepatocyte: 'liver',
  hepatocytes: 'liver',
  'liver specific': 'liver',

  intestine: 'intestine',
  intestinal: 'intestine',
  gut: 'intestine',
  enterocyte: 'intestine',
  ileum: 'intestine',
  'intestinal stem cell': 'stem-cell',

  colon: 'colon',
  colonic: 'colon',

  pancreas: 'pancreas',
  pancreatic: 'pancreas',
  'beta cell': 'pancreas-beta',
  'beta cells': 'pancreas-beta',
  islet: 'pancreas-beta',
  islets: 'pancreas-beta',

  heart: 'heart',
  cardiac: 'heart',
  cardiomyocyte: 'heart',
  cardiomyocytes: 'heart',

  endothelial: 'endothelial',
  endothelium: 'endothelial',
  vascular: 'endothelial',

  lung: 'lung',
  pulmonary: 'lung',
  alveolar: 'lung',

  kidney: 'kidney',
  renal: 'kidney',
  podocyte: 'kidney',

  neuron: 'neuron',
  brain: 'neuron',
  cns: 'neuron',
  neurons: 'neuron',
  neural: 'neuron',

  microglia: 'microglia',
  microglial: 'microglia',

  astrocyte: 'astrocyte',
  astrocytes: 'astrocyte',

  oligodendrocyte: 'oligodendrocyte',
  oligodendrocytes: 'oligodendrocyte',

  't cell': 't-cell',
  't cells': 't-cell',
  't-cell': 't-cell',
  'tcell': 't-cell',
  't cell specific': 't-cell',

  'b cell': 'b-cell',
  'b cells': 'b-cell',
  'b-cell': 'b-cell',
  'b cell specific': 'b-cell',

  treg: 'treg',
  'regulatory t cell': 'treg',

  myeloid: 'myeloid',
  macrophage: 'myeloid',
  monocyte: 'myeloid',

  neutrophil: 'neutrophil',

  dendritic: 'dc',
  'dendritic cell': 'dc',
  dc: 'dc',

  'nk cell': 'nk-cell',

  hematopoietic: 'hematopoietic',
  blood: 'hematopoietic',

  skin: 'skin',
  epidermis: 'skin',
  keratinocyte: 'skin',
  keratinocytes: 'skin',

  adipocyte: 'adipocyte',
  adipocytes: 'adipocyte',

  mammary: 'mammary',
  breast: 'mammary',

  retina: 'retina',

  'hepatocyte specific': 'liver',
  'intestinal villin': 'intestine',
  'podocyte specific': 'kidney',
};

/** Normalize filler tokens stripped from naive site search matching */
export const FILLER_STOPWORDS = new Set([
  'the',
  'a',
  'an',
  'of',
  'for',
  'to',
  'with',
  'in',
  'on',
  'and',
  'or',
  'mouse',
  'mice',
  'model',
  'models',
  'allele',
  'alleles',
  'gene',
  'study',
  'studies',
  'knockout',
  'knockouts',
  'knock',
  'in',
  'line',
  'strain',
  'deletion',
  'delete',
  'deleted',
  'conditional',
  'conventional',
  'floxed',
  'humanized',
  'reporter',
  'tag',
  'tagged',
  'point',
  'mutation',
  'mutant',
  'transgenic',
  'inducible',
  'tissue',
  'specific',
  'lox',
  'loxp',
  'cre',
  'using',
  'into',
]);
