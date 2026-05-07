/**
 * Decompose user search into gene, modification, tissue, and Cre driver intent.
 * Always pass `catalogGenes` from `getCachedCatalogGeneNames()` in production.
 */

import {
  FILLER_STOPWORDS,
  mergeCatalogIntoGeneSynonyms,
  primaryModificationPattern,
  allMatchingModificationPatterns,
  regexTestSafe,
  resolveGene,
  escapeRegExp,
  TISSUE_CELL_SYNONYMS,
} from './dictionaries';
import { resolveCreDriversInText } from './creDrivers';

export interface ParsedQuery {
  raw: string;
  cleaned: string;
  geneCandidates: string[];
  modificationTypes: string[];
  modifiers: string[];
  tissueCellCandidates: string[];
  creDriverCandidates: string[];
  stopwords: string[];
}

const UNKNOWN_CRE_RE = /([A-Za-z][A-Za-z0-9.-]*?)[-\s]+(Cre(?:ERT2|ER|iCre|MerCreMer)?)\b/gi;

const BAD_CRE_PREFIXES = new Set([
  '',
  'cre',
  'lox',
  'loxp',
  'tamoxifen',
  'specific',
  'conditional',
  'inducible',
  'mouse',
  'mice',
  'the',
  'and',
]);

function canonDriverName(prefix: string, suffix: string): string {
  const sufRaw = suffix || 'Cre';
  const sufLc = sufRaw.toLowerCase();
  const cap = sufLc.charAt(0).toUpperCase() + sufLc.slice(1);
  return `${prefix}-${cap}`;
}

/** Genes appearing as Cre driver promoter names (Cd4‑Cre) are not organism target genes here. */
function stemsCoOptedByCreDrivers(
  driverNames: readonly string[],
  synonyms: Record<string, string>,
  catalogGenes: readonly string[]
): Set<string> {
  const drop = new Set<string>();
  for (const dn of driverNames) {
    const trimmed = dn.replace(/\s+/g, '').split(/-Cre/i)[0];
    const stemLc = trimmed?.trim().toLowerCase() ?? '';
    if (!stemLc || stemLc.includes('rosa')) continue;
    const g = resolveGene(stemLc, synonyms, catalogGenes);
    if (g) drop.add(g);
  }
  return drop;
}

function normalizeRaw(raw: string): string {
  let s = raw.normalize('NFKC');
  s = s.replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g, '-');
  s = s.replace(/α/gi, 'alpha');
  s = s.replace(/\(([^)]*)\)/g, ' $1 ');
  s = s.replace(/[,;/]+/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function cleanedFromNormalized(s: string): string {
  return s.toLowerCase();
}

const TISSUE_SCAN = Object.entries(TISSUE_CELL_SYNONYMS)
  .map(([phrase, canon]) => ({
    canon,
    escaped: escapeRegExp(phrase.toLowerCase()).replace(/\s+/g, '\\s+'),
  }))
  .sort((a, b) => b.escaped.length - a.escaped.length);

function tissueHits(cleanedLc: string): string[] {
  const out: string[] = [];
  for (const row of TISSUE_SCAN) {
    const re = new RegExp(`(^|[^a-z0-9])(${row.escaped})([^a-z0-9]|$)`, 'i');
    if (re.test(cleanedLc)) out.push(row.canon);
  }
  return [...new Set(out)];
}

function splitTokens(cleanedLc: string): string[] {
  return cleanedLc.split(/[\s/]+/).filter(Boolean);
}

function collectStopwordTokens(tokens: string[]): string[] {
  return tokens.filter((t) => FILLER_STOPWORDS.has(t.replace(/[^a-z0-9-]/g, '')));
}

function scanSynonymPhrasesForGenes(
  cleanedLc: string,
  synonyms: Record<string, string>
): string[] {
  const ranked: string[] = [];
  const keys = Object.keys(synonyms).filter((k) => k.includes(' ')).sort((a, b) => b.length - a.length);
  for (const phrase of keys) {
    const escaped = escapeRegExp(phrase).replace(/\s+/g, '\\s+');
    if (new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i').test(cleanedLc)) {
      const g = synonyms[phrase];
      if (g) ranked.push(g);
    }
  }
  return ranked;
}

function unknownCreFragments(norm: string, knownCanon: readonly string[]): string[] {
  const out: string[] = [];
  const re = new RegExp(UNKNOWN_CRE_RE.source, UNKNOWN_CRE_RE.flags.replace('g', '') + 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(norm)) !== null) {
    let prefix = m[1]?.trim() ?? '';
    const sfx = (m[2] ?? '').trim();
    prefix = prefix.replace(/\.$/, '').trim();
    if (prefix.length < 1 || BAD_CRE_PREFIXES.has(prefix.toLowerCase())) continue;

    const built = canonDriverName(prefix, sfx.length ? sfx : 'Cre');

    const kn = knownCanon.map((x) => x.replace(/\s+/g, '').toLowerCase());
    const bk = built.replace(/\s+/g, '').toLowerCase();
    if (!kn.some((x) => x === bk || x.startsWith(bk) || bk.startsWith(x))) {
      out.push(built);
    }
  }
  return out;
}

/** Public entry */
export function parseQuery(raw: string, catalogGenes: readonly string[] = []): ParsedQuery {
  const norm = normalizeRaw(raw);
  const cleaned = cleanedFromNormalized(norm);
  const synonyms = mergeCatalogIntoGeneSynonyms(catalogGenes);

  const patternMatches = allMatchingModificationPatterns(cleaned);
  const primaryPat = primaryModificationPattern(cleaned);

  const modifierSet = new Set<string>();
  for (const pm of patternMatches) {
    for (const mod of pm.modifiers) modifierSet.add(mod);
  }

  const creHits = resolveCreDriversInText(cleaned);
  const creNamesList: string[] = creHits.map((c) => c.driver);

  creNamesList.push(...unknownCreFragments(norm, creNamesList));

  const creDriverCandidates = [...new Set(creNamesList)];
  const tissueFromDrivers = [...new Set(creHits.map((c) => c.tissue))];

  const tissueFromText = tissueHits(cleaned);
  let tissueCellCandidates = [...new Set([...tissueFromText, ...tissueFromDrivers])];

  const modificationTypesAccum: string[] = [];
  if (primaryPat) modificationTypesAccum.push(primaryPat.canonicalModelType);

  const hasCreToken = /\bcre\b/i.test(cleaned);

  if (
    modificationTypesAccum.length === 0 &&
    tissueCellCandidates.length > 0 &&
    (hasCreToken || creDriverCandidates.length > 0)
  ) {
    modificationTypesAccum.push('Conditional Knockout');
    modifierSet.add('tissue-context');
  }

  const genesFromPhrases = scanSynonymPhrasesForGenes(cleaned, synonyms);
  const tokens = splitTokens(cleaned);
  const stopwordsFound = collectStopwordTokens(tokens);

  const geneSet = new Map<string, number>();
  let rank = 0;
  const pushGene = (g: string | null) => {
    if (!g) return;
    if (!geneSet.has(g)) geneSet.set(g, rank++);
  };

  for (const g of genesFromPhrases) pushGene(g);

  for (const tok of tokens) {
    const t = tok.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '').toLowerCase();
    if (!t || FILLER_STOPWORDS.has(t)) continue;
    pushGene(resolveGene(t, synonyms, catalogGenes));
  }

  const coOptedStems = stemsCoOptedByCreDrivers(creDriverCandidates, synonyms, catalogGenes);
  let geneCandidates = [...geneSet.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([g]) => g)
    .filter((g) => !coOptedStems.has(g));

  const floxCreContext = /\b(flox|loxp|cko|conditional|cre\b)/i.test(cleaned);
  const knockoutPrimary = modificationTypesAccum[0] === 'Knockout';

  const shouldUpgradeKnockoutToConditional =
    knockoutPrimary &&
    (creDriverCandidates.length > 0 ||
      (tissueCellCandidates.length > 0 && hasCreToken) ||
      floxCreContext);

  if (shouldUpgradeKnockoutToConditional && !regexTestSafe(/\bconventional\s*knockout\b/i, cleaned)) {
    const withoutKO = modificationTypesAccum.filter((x) => x !== 'Knockout');
    modificationTypesAccum.length = 0;
    modificationTypesAccum.push('Conditional Knockout', ...withoutKO.filter((x) => x !== 'Conditional Knockout'));
  }

  let modificationTypes =
    [...new Set(modificationTypesAccum)].length > 0
      ? [...new Set(modificationTypesAccum)]
      : patternMatches
          .map((p) => p.canonicalModelType)
          .filter((v, i, a) => a.indexOf(v) === i);

  /** Inducible wording → tag + optional page boost (caller) */
  if (regexTestSafe(/\b(inducible|tamoxifen|doxycycline|tet\b|creert2)\b/i, cleaned)) {
    modifierSet.add('inducible');
  }

  return {
    raw,
    cleaned,
    geneCandidates,
    modificationTypes,
    modifiers: [...modifierSet],
    tissueCellCandidates,
    creDriverCandidates,
    stopwords: stopwordsFound,
  };
}
