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

/** Live = available now. Established "live" only — founder-only is excluded. */
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
