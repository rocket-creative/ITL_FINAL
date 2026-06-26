/**
 * Merge legacy redirects with GSC 404 redirect map.
 * Primary (redirects.json) wins on source conflicts; 404-only entries are appended.
 * Truncated GSC artifact paths are skipped.
 */

export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

const TRUNCATED_SOURCE_PATTERNS = [
  /\/what-is-a-stem-$/,
  /for-accele$/,
  /for-custo$/,
  /trurat-mode$/,
];

function isTruncatedArtifact(source: string): boolean {
  return TRUNCATED_SOURCE_PATTERNS.some((re) => re.test(source));
}

export function mergeRedirectRules(
  primary: RedirectRule[],
  supplemental: RedirectRule[],
): RedirectRule[] {
  const bySource = new Map<string, RedirectRule>();

  for (const rule of primary) {
    if (rule.source && rule.destination) {
      bySource.set(rule.source, rule);
    }
  }

  for (const rule of supplemental) {
    if (!rule.source || !rule.destination) continue;
    if (isTruncatedArtifact(rule.source)) continue;
    if (!bySource.has(rule.source)) {
      bySource.set(rule.source, rule);
    }
  }

  return Array.from(bySource.values());
}
