/** High-intent service URLs that should not receive catalog-first title rewrites. */
export const REVENUE_PILLAR_PATHS = [
  '/all-catalog-mouse-models',
  '/order-catalog-models',
  '/humanized-mouse-models',
  '/humanized-mouse-services',
  '/point-mutation-mice',
  '/knockout-mouse-models',
  '/knockin-mouse-models',
  '/conditional-knockout-mouse-models',
  '/conventional-knockout-mouse-models',
  '/tamoxifen-inducible-cre',
  '/transgenic-mouse-service',
  '/mouse-genotyping-service',
  '/custom-mouse-models',
  '/cre-recombinase-mice',
  '/cre-lox-system',
  '/custom-mouse-model-pricing',
  '/request-quote',
  '/start-your-project',
  '/crispr-cas9-mouse-models',
  '/cdna-knockin',
  '/conditional-knockin-mice',
  '/resources',
] as const;

export function isRevenuePillarPath(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return REVENUE_PILLAR_PATHS.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}
