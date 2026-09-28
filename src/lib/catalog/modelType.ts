/**
 * Catalog model-type labels used in search and table columns.
 * Full names stay in the database; the column shows the catalog-number abbreviation.
 */
const MODEL_TYPE_ABBREV: Record<string, string> = {
  Knockout: 'KO',
  'Conditional Knockout': 'CKO',
  Knockin: 'KI',
  Humanized: 'HU',
  Transgenic: 'TG',
  Immunodeficient: 'NSG',
  'Xenograft-Applicable': 'XA',
};

export function modelTypeAbbrev(modelType?: string | null): string {
  const raw = (modelType || '').trim();
  if (!raw) return '';
  return MODEL_TYPE_ABBREV[raw] ?? raw;
}
