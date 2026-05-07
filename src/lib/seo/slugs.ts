/**
 * SEO path slugs — round-trip safe with search dictionaries and CRE_DRIVERS.
 */

import { CRE_DRIVERS } from '../search/creDrivers';
import { MODIFICATION_PATTERNS, TISSUE_CELL_SYNONYMS } from '../search/dictionaries';

/** Lowercase kebab-case for URL segments. */
export function toSlug(s: string): string {
  let t = s.normalize('NFKC');
  t = t.replace(/[\u03B1\u0391]/g, 'a'); // Greek alpha → a (αMHC-Cre → amhc-cre)
  t = t.replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g, '-');
  t = t.toLowerCase();
  t = t.replace(/[^a-z0-9]+/g, '-');
  t = t.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return t;
}

const _uniqueModTypes = [...new Set(MODIFICATION_PATTERNS.map((p) => p.canonicalModelType))];

export const MOD_CANONICAL_TO_SLUG: Record<string, string> = Object.fromEntries(
  _uniqueModTypes.map((mt) => [mt, toSlug(mt)])
);

const MOD_SLUG_TO_CANONICAL: Record<string, string> = Object.fromEntries(
  _uniqueModTypes.map((mt) => [toSlug(mt), mt])
);

export function modCanonicalToSlug(canonicalModelType: string): string {
  return MOD_CANONICAL_TO_SLUG[canonicalModelType] ?? toSlug(canonicalModelType);
}

export function modSlugToCanonical(slug: string): string | undefined {
  const key = slug.toLowerCase().trim();
  return MOD_SLUG_TO_CANONICAL[key];
}

/** Every canonical tissue key we surface on Tier 2 (union: synonyms values + CRE driver tissues). */
function allCanonicalTissueKeys(): string[] {
  const fromSyn = new Set(Object.values(TISSUE_CELL_SYNONYMS));
  for (const d of CRE_DRIVERS) fromSyn.add(d.tissue);
  return [...fromSyn].sort((a, b) => a.localeCompare(b));
}

/** marketing slug in paths e.g. liver → liver-specific */
export function tissueCanonicalToSlug(canonicalKey: string): string {
  const k = canonicalKey.toLowerCase();
  return `${k}-specific`;
}

/** slug segment e.g. liver-specific → liver */
export function tissueSlugToCanonical(slug: string): string | undefined {
  const s = slug.toLowerCase().trim();
  if (!s.endsWith('-specific')) return undefined;
  const base = s.slice(0, -'-specific'.length);
  if (!base) return undefined;
  const keys = allCanonicalTissueKeys();
  const hit = keys.find((k) => k.toLowerCase() === base);
  return hit;
}

/** All Tier 2 path slugs (e.g. liver-specific). */
export function allTissueLineSlugs(): string[] {
  return allCanonicalTissueKeys().map(tissueCanonicalToSlug);
}

const DRIVER_SLUG_TO_CANONICAL: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const d of CRE_DRIVERS) {
    m[toSlug(d.driver)] = d.driver;
    for (const a of d.aliases) {
      const sk = toSlug(a.replace(/\s+/g, '-'));
      if (!(sk in m)) m[sk] = d.driver;
    }
  }
  return m;
})();

export function driverCanonicalToSlug(driverName: string): string {
  return toSlug(driverName);
}

export function driverSlugToCanonical(slug: string): string | undefined {
  return DRIVER_SLUG_TO_CANONICAL[slug.toLowerCase().trim()];
}

/** Resolve Tier 4 third segment: tissue line slug wins over driver slug when both match (documented tie-break). */
export function resolveTissueOrDriverSlug(
  segment: string
): { kind: 'tissue'; canonical: string } | { kind: 'driver'; canonical: string } | undefined {
  const tissue = tissueSlugToCanonical(segment);
  if (tissue) return { kind: 'tissue', canonical: tissue };
  const driver = driverSlugToCanonical(segment);
  if (driver) return { kind: 'driver', canonical: driver };
  return undefined;
}
