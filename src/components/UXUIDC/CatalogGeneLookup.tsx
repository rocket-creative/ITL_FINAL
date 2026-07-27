/**
 * |UXUIDC| Mid-article catalog + generation widget (educational pages).
 * Thin wrapper around sitewide CatalogCustomDualCta.
 */

import CatalogCustomDualCta from './CatalogCustomDualCta';

export type { CatalogGene, CatalogLookup } from './catalogLookupMap';
export { getCatalogLookup, hasEducationalCatalogMap } from './catalogLookupMap';

interface Props {
  slug: string;
}

export default function CatalogGeneLookup({ slug }: Props) {
  return <CatalogCustomDualCta slug={slug} utmMedium="educational" />;
}
