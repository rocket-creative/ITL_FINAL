/**
 * Catalog numbers are stored as "PREFIX DIGITS" (for example "CKO 254074").
 * Searches also arrive as "CKO-254074" and "CKO254074". Those are the same
 * number; rewrite only when the whole query is a catalog number so gene and
 * phrase searches stay untouched.
 *
 * Prefixes are the ones on catalog_models.itl_catalog_number. Longer prefixes
 * are listed first so "CKO00001" stays CKO and does not collapse to KO.
 */

const DASHES = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g;

/** Stored letter prefixes, longest compact form first. */
const CATALOG_PREFIXES = ['GM NVG', 'DM KI', 'CKO', 'NSG', 'HU', 'KI', 'KO', 'SM', 'TG', 'XA'] as const;

export function catalogNumberCanonical(raw: string): string | null {
  const compact = raw
    .normalize('NFKC')
    .replace(DASHES, '')
    .replace(/[\s\-_.]+/g, '')
    .toUpperCase();

  for (const prefix of CATALOG_PREFIXES) {
    const prefixCompact = prefix.replace(/\s+/g, '');
    if (!compact.startsWith(prefixCompact)) continue;
    const digits = compact.slice(prefixCompact.length);
    if (!/^\d{3,}$/.test(digits)) continue;
    return `${prefix} ${digits}`;
  }

  return null;
}

export function normalizeCatalogQuery(raw: string): string {
  return catalogNumberCanonical(raw) ?? raw.trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Substring match, plus catalog-number separator variants. */
export function textMatchesQuery(haystack: string, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;

  const canonical = catalogNumberCanonical(query);
  if (canonical) {
    const parts = canonical.split(/\s+/).map(escapeRegExp);
    const pattern = parts.join('[\\s\\-_.]*');
    return new RegExp(`(^|[^A-Za-z])${pattern}([^0-9]|$)`, 'i').test(haystack);
  }

  return haystack.toLowerCase().includes(needle);
}
