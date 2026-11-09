/**
 * Catalog gene-name aliasing.
 *
 * WHY THIS EXISTS
 * ---------------
 * `catalog_models.gene_name` is vendor-supplied and is NOT a clean gene symbol.
 * The same biological gene appears under several raw values:
 *
 *   Apoe              -> the mouse-allele lines (Apoe-KO(2), Apoe-Flox, crosses)
 *   hAPOE2 / hAPOE3   -> the humanized isoform lines (HU 190013 / HU 190003)
 *   hAPOE4            -> HU 190002 and HU 261708 (hAPOE4-Flox-hAPOE2)
 *   hAPOE4(E1         -> truncated import of "hAPOE4(E1-E4)" (HU 260690)
 *   hAPOE4/hMAPT      -> hAPOE4 x hMAPT-P301S cross (XA 240812)
 *   hAPOE4/hAppNL     -> hAPOE4 x hAppNL-G-F cross (XA 250109)
 *
 * `getModelsByGene` matched `gene_name` with strict equality, so the Apoe gene
 * hub listed only the rows literally named "Apoe" and every humanized APOE
 * line was invisible to it. Rows containing "/" are additionally rejected by
 * `isUrlSafeGeneName`, so those crosses had no gene page at all.
 *
 * SCOPE AND SAFETY
 * ----------------
 * Two layers, curated first:
 *
 *   CURATED   (below) genes checked by hand, including values a mechanical
 *             rule must not touch: truncated names and "/" crosses.
 *   GENERATED (generatedGeneAliases.ts) the mechanical cases, emitted only
 *             when the de-prefixed name matches a gene that already has a
 *             catalog page and the name shows no sign of truncation.
 *
 * Naive de-prefixing is NOT safe and the generator rejects these on purpose:
 * "hPD" is hPD-1/hPD-L1 truncated at the hyphen (two genes, Pdcd1 and Cd274,
 * so no single parent is right), "h4" is h4-1BB (Tnfrsf9), and 237 other
 * candidates name a parent with no catalog page, which would have turned a
 * working page into a 301 into a 404.
 *
 * Curated entries win on conflict, so hand review is never overwritten by a
 * regenerated file.
 *
 * A cross such as "hAPOE4/hMAPT" legitimately belongs to more than one gene.
 * Listing it under several canonical genes is intended: the cross should
 * appear on each parent gene's hub, the way strain repositories list crosses.
 * `canonicalGeneFor` therefore resolves to the FIRST canonical owner, which is
 * the redirect target, while `catalogGeneNamesFor` may legitimately overlap
 * between genes.
 */

import { GENERATED_GENE_ALIASES } from './generatedGeneAliases';

/**
 * Hand-checked aliases. Canonical gene symbol -> additional raw
 * `catalog_models.gene_name` values that belong to that gene. The canonical
 * symbol itself is implicit and must not be repeated here.
 */
export const CURATED_GENE_ALIASES: Readonly<Record<string, readonly string[]>> = {
  Apoe: [
    'hAPOE2',
    'hAPOE3',
    'hAPOE4',
    // Truncated import of "hAPOE4(E1-E4)" (HU 260690). The stored value is
    // "hAPOE4(E1"; the full spelling is listed too so the page keeps working
    // if the source row is later corrected.
    'hAPOE4(E1',
    'hAPOE4(E1-E4)',
    // Crosses. Unroutable on their own because of the "/" in the raw value.
    'hAPOE4/hMAPT',
    'hAPOE4/hAppNL',
    'hCD3EDG/Apoe',
  ],
};

/**
 * Curated merged over generated. Curated wins so a regenerated file can never
 * drop a hand-reviewed decision; a gene present in both keeps its curated
 * aliases plus any generated ones not already listed.
 */
export const CATALOG_GENE_ALIASES: Readonly<Record<string, readonly string[]>> = (() => {
  const merged: Record<string, string[]> = {};
  for (const [canonical, aliases] of Object.entries(GENERATED_GENE_ALIASES)) {
    merged[canonical] = [...aliases];
  }
  for (const [canonical, curated] of Object.entries(CURATED_GENE_ALIASES)) {
    const seen = new Set<string>();
    merged[canonical] = [...curated, ...(merged[canonical] ?? [])].filter((alias) => {
      const key = alias.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  return merged;
})();

/** Reverse index: raw gene_name (lowercased) -> canonical symbol. */
const REVERSE_ALIASES: ReadonlyMap<string, string> = (() => {
  const m = new Map<string, string>();
  for (const [canonical, aliases] of Object.entries(CATALOG_GENE_ALIASES)) {
    for (const alias of aliases) {
      const key = alias.toLowerCase();
      // First canonical owner wins, so redirect targets stay deterministic
      // even when a cross is listed under two parent genes.
      if (!m.has(key)) m.set(key, canonical);
    }
  }
  return m;
})();

/** Lowercased set of every canonical symbol that has aliases. */
const CANONICAL_KEYS: ReadonlySet<string> = new Set(
  Object.keys(CATALOG_GENE_ALIASES).map((g) => g.toLowerCase()),
);

/**
 * Every raw `gene_name` value to query for a gene page, canonical first.
 * Returns `[geneName]` unchanged when the gene has no aliases, so callers can
 * use this unconditionally.
 */
export function catalogGeneNamesFor(geneName: string): string[] {
  const direct = CATALOG_GENE_ALIASES[geneName];
  if (direct) return [geneName, ...direct];

  // Tolerate a case-variant canonical (e.g. "apoe" before case correction).
  const lower = geneName.toLowerCase();
  if (CANONICAL_KEYS.has(lower)) {
    for (const [canonical, aliases] of Object.entries(CATALOG_GENE_ALIASES)) {
      if (canonical.toLowerCase() === lower) return [canonical, ...aliases];
    }
  }
  return [geneName];
}

/**
 * The canonical gene a raw/aliased `gene_name` should resolve to, or
 * `undefined` when the value is already canonical or simply unknown.
 * Used to 301 alias URLs onto the canonical hub.
 */
export function canonicalGeneFor(geneName: string): string | undefined {
  const lower = geneName.toLowerCase();
  if (CANONICAL_KEYS.has(lower)) return undefined; // already canonical
  return REVERSE_ALIASES.get(lower);
}

/** True when this raw gene_name is absorbed by some canonical gene. */
export function isAliasedGeneName(geneName: string): boolean {
  return canonicalGeneFor(geneName) !== undefined;
}

/** True when this gene absorbs other raw gene_name values. */
export function hasCatalogAliases(geneName: string): boolean {
  return catalogGeneNamesFor(geneName).length > 1;
}
