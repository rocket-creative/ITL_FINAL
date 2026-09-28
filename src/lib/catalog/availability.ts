/**
 * Shared catalog availability helpers.
 *
 * Pure functions usable in both server and client components.
 * Display text is kept as the literal SMOC value (e.g. "live", "Developing"),
 * except founder-only statuses which are relabelled so they are not shown as
 * fully available; these helpers only classify, colour, and label it.
 */

/** SMOC "Developing" models are not yet produced (not orderable as live/cryo). */
export function isDeveloping(a?: string | null): boolean {
  return /develop/i.test(a || '');
}

/**
 * Founder-generation only ("F0 live" / "F1 live"): animals exist but the line is
 * still being established, so it is not a stockable, ready-to-ship colony.
 * Cryo statuses like "F0 embryo cryopreservation" are intentionally excluded
 * (they do not contain "live").
 */
export function isFounderOnly(a?: string | null): boolean {
  const v = (a || '').toLowerCase();
  return v.includes('live') && /\bf[01]\b/.test(v);
}

/** Live = available now. Established "live" only, founder-only is excluded. */
export function isLive(a?: string | null): boolean {
  return (a || '').toLowerCase().includes('live') && !isFounderOnly(a);
}

/**
 * Status colour:
 *   founder-only (F0/F1 live) -> amber (in production, not yet available)
 *   live (established)        -> green
 *   sperm/embryo/cryo         -> orange
 *   developing                -> slate (pending, not yet available)
 *   other                     -> gray
 */
export function availabilityColor(a?: string | null): string {
  const v = (a || '').toLowerCase();
  if (isDeveloping(v)) return '#546e7a';
  if (isFounderOnly(v)) return '#b45309';
  if (v.includes('live')) return '#2e7d32';
  if (v.includes('sperm') || v.includes('embryo') || v.includes('cryo')) return '#e65100';
  return '#555';
}

/**
 * Display label for the availability cell. Founder-only statuses are relabelled
 * so they are not presented as fully available; empty values fall back to
 * "Inquire"; everything else shows the literal SMOC value.
 */
export function availabilityLabel(a?: string | null): string {
  if (isFounderOnly(a)) return 'In production \u2014 inquire';
  const v = (a || '').trim();
  return v || 'Inquire';
}

/** Canonical stock forms, in hero display order. Unknown statuses follow these. */
export const STOCK_FORM_ORDER = ['LIVE', 'SPERM', 'EMBRYO', 'DEVELOPING', 'IN PRODUCTION'] as const;

export type KnownStockForm = (typeof STOCK_FORM_ORDER)[number];

function isKnownStockForm(form: string): form is KnownStockForm {
  return (STOCK_FORM_ORDER as readonly string[]).includes(form);
}

/**
 * Tokens for one availability string.
 * Embryo or other cryo is EMBRYO only (not a second cryo label).
 * Sperm cryo is SPERM only. A string can still yield more than one token
 * when it names distinct forms (live and sperm, for example).
 */
export function stockFormsFromAvailability(a?: string | null): string[] {
  const raw = (a || '').trim();
  if (!raw) return [];

  const forms: string[] = [];
  const v = raw.toLowerCase();

  if (isLive(raw)) forms.push('LIVE');
  if (v.includes('sperm')) forms.push('SPERM');
  // Embryo, or cryo that is not sperm, is EMBRYO only — not a second cryo label.
  if (v.includes('embryo') || (v.includes('cryo') && !v.includes('sperm'))) {
    forms.push('EMBRYO');
  }
  if (isDeveloping(raw)) forms.push('DEVELOPING');
  if (isFounderOnly(raw)) forms.push('IN PRODUCTION');

  if (forms.length === 0) forms.push(raw.toUpperCase());
  return forms;
}

/** Unique forms across the models on a page, in display order. */
export function stockFormsFor(availabilities: readonly (string | null | undefined)[]): string[] {
  const seen = new Set<string>();
  for (const availability of availabilities) {
    for (const form of stockFormsFromAvailability(availability)) seen.add(form);
  }

  const known = STOCK_FORM_ORDER.filter((form) => seen.has(form));
  const rest = [...seen].filter((form) => !isKnownStockForm(form)).sort();
  return [...known, ...rest];
}
