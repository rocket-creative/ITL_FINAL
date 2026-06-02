/**
 * Shared catalog availability helpers.
 *
 * Pure functions usable in both server and client components.
 * Display text is kept as the literal SMOC value (e.g. "live", "Developing");
 * these helpers only classify and colour it.
 */

/** SMOC "Developing" models are not yet produced (not orderable as live/cryo). */
export function isDeveloping(a?: string | null): boolean {
  return /develop/i.test(a || '');
}

/** Live = available now (matches "live", "F0 live", "F1 live"). */
export function isLive(a?: string | null): boolean {
  return (a || '').toLowerCase().includes('live');
}

/**
 * Status colour:
 *   live              -> green
 *   sperm/embryo/cryo -> orange
 *   developing        -> slate (pending, not yet available)
 *   other             -> gray
 */
export function availabilityColor(a?: string | null): string {
  const v = (a || '').toLowerCase();
  if (isDeveloping(v)) return '#546e7a';
  if (v.includes('live')) return '#2e7d32';
  if (v.includes('sperm') || v.includes('embryo') || v.includes('cryo')) return '#e65100';
  return '#555';
}
