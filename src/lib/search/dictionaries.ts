/** Gene alias (lowercase phrase or token) → canonical mouse gene symbol (catalog casing). */

import { PRIORITY_GENES } from '@/data/priorityGenes';

export interface ModificationPattern {
  readonly match: RegExp;
  readonly canonicalModelType: string;
  readonly fallbackPage: string;
  readonly modifiers: readonly string[];
}

function normalizeGeneAliasKey(alias: string): string {
  return alias.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Auto-built from priority gene registry (human symbol, aliases, mouse symbol). */
function buildPriorityGeneSynonyms(): Record<string, string> {
  const seed: Record<string, string> = {};
  for (const g of PRIORITY_GENES) {
    seed[g.humanSymbol.toLowerCase()] = g.mouseSymbol;
    for (const a of g.aliases) {
      seed[normalizeGeneAliasKey(a)] = g.mouseSymbol;
    }
    seed[g.mouseSymbol.toLowerCase()] = g.mouseSymbol;
  }
  return seed;
}

/**
 * Curated aliases (hyphenated tokens, common names, morphogen shorthand).
 * Merged after auto-build so these entries win on conflict.
 */
const GENE_SYNONYMS_MANUAL: Record<string, string> = {
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
  havcr2: 'Havcr2',
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
  braf: 'Braf',
  alk: 'Alk',
  vegfa: 'Vegfa',
  idh1: 'Idh1',
  idh2: 'Idh2',
  stk11: 'Stk11',
  lkb1: 'Stk11',
  kmt2a: 'Kmt2a',
  mll: 'Kmt2a',
  ntrk1: 'Ntrk1',
  mapt: 'Mapt',
  snca: 'Snca',
  prkn: 'Prkn',
  park2: 'Prkn',
  park7: 'Park7',
  dj1: 'Park7',
  'dj-1': 'Park7',
  mrc1: 'Mrc1',
  cd206: 'Mrc1',
  coq8a: 'Coq8a',
  ins: 'Ins',
  insr: 'Insr',
  ldlr: 'Ldlr',
  pcsk9: 'Pcsk9',
  stat3: 'Stat3',
  foxp3: 'Foxp3',
  cd4: 'Cd4',
  cd8a: 'Cd8a',
  cd8: 'Cd8a',
  cd19: 'Cd19',
  cd28: 'Cd28',
  cd20: 'Ms4a1',
  trem2: 'Trem2',
  /** Morphogen Tier A, human symbol → mouse catalog casing */
  shh: 'Shh',
  ihh: 'Ihh',
  dhh: 'Dhh',
  wnt1: 'Wnt1',
  wnt2: 'Wnt2',
  wnt2b: 'Wnt2b',
  wnt3a: 'Wnt3a',
  wnt4: 'Wnt4',
  wnt5a: 'Wnt5a',
  wnt6: 'Wnt6',
  wnt7a: 'Wnt7a',
  wnt7b: 'Wnt7b',
  wnt8a: 'Wnt8a',
  wnt9b: 'Wnt9b',
  wnt10b: 'Wnt10b',
  wnt11: 'Wnt11',
  wnt16: 'Wnt16',
  bmp1: 'Bmp1',
  bmp2: 'Bmp2',
  bmp4: 'Bmp4',
  bmp5: 'Bmp5',
  bmp6: 'Bmp6',
  bmp7: 'Bmp7',
  bmp8a: 'Bmp8a',
  bmp15: 'Bmp15',
  gdf1: 'Gdf1',
  gdf2: 'Gdf2',
  bmp9: 'Gdf2',
  gdf3: 'Gdf3',
  gdf5: 'Gdf5',
  gdf9: 'Gdf9',
  gdf11: 'Gdf11',
  gdf15: 'Gdf15',
  amh: 'Amh',
  tgfb1: 'Tgfb1',
  tgfb2: 'Tgfb2',
  tgfb3: 'Tgfb3',
  inha: 'Inha',
  inhba: 'Inhba',
  inhbb: 'Inhbb',
  nodal: 'Nodal',
  lefty1: 'Lefty1',
  lefty2: 'Lefty2',
  fgf1: 'Fgf1',
  fgf2: 'Fgf2',
  fgf3: 'Fgf3',
  fgf4: 'Fgf4',
  fgf5: 'Fgf5',
  fgf7: 'Fgf7',
  fgf8: 'Fgf8',
  fgf9: 'Fgf9',
  fgf10: 'Fgf10',
  fgf18: 'Fgf18',
  fgf19: 'Fgf19',
  fgf20: 'Fgf20',
  fgf21: 'Fgf21',
  fgf23: 'Fgf23',
  aldh1a1: 'Aldh1a1',
  aldh1a2: 'Aldh1a2',
  cyp26a1: 'Cyp26a1',
  cyp26b1: 'Cyp26b1',
  rara: 'Rara',
  dll1: 'Dll1',
  jag1: 'Jag1',
  nog: 'Nog',
  grem1: 'Grem1',
};

export const GENE_SYNONYMS_SEED: Record<string, string> = {
  ...buildPriorityGeneSynonyms(),
  ...GENE_SYNONYMS_MANUAL,
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
      /\b(point\s*mutation|point\s*mutant|missense|snp\s*knockin|patient\s*mutation)\b/i,
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
    match: /\b(tag\s*knockin|epitope\s*tag|flag\s*tag|ha\s*tag|myc\s*tag|v5\s*tag|3xflag)\b/i,
    canonicalModelType: 'Knockin',
    fallbackPage: '/tag-knockin-mice',
    modifiers: ['tag'],
  },
  {
    match:
      /\b(humanized|gene\s*replacement|domain[\s-]?humanized|partial[\s-]?humanized|full[\s-]?humanization|hu[\s-]?(pd1|pdl1|ctla4|lag3|tim3))\b/i,
    canonicalModelType: 'Humanized',
    fallbackPage: '/humanized-mouse-models',
    modifiers: ['humanized'],
  },
  {
    match:
      /\b(transgenic|bac\s*transgenic|random\s*integration|overexpression|\bhprt\b|\bh11\b|\bcol1a1\b)\b/i,
    canonicalModelType: 'Transgenic',
    fallbackPage: '/transgenic-mouse-service',
    modifiers: ['transgenic'],
  },
  {
    match: /\b(rosa26|safe[\s-]?harbor)\b/i,
    canonicalModelType: 'Knockin',
    fallbackPage: '/rosa26',
    modifiers: ['rosa26'],
  },
  {
    match:
      /\b(inducible|inducible[\s-]?cko|tamoxifen|cre[\s-]?ert2?|doxycycline|\btet\b|tet[\s-]?(on|off))\b/i,
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
