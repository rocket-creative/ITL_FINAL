/**
 * Single source of truth for pretty SEO paths from parsed search intent.
 */

import type { ParsedQuery } from '../search/parseQuery';
import { fallbackPageForModelType, primaryModificationPattern } from '../search/dictionaries';
import {
  driverCanonicalToSlug,
  modCanonicalToSlug,
  tissueCanonicalToSlug,
} from './slugs';

export function buildSeoUrl(
  parsed: ParsedQuery,
  catalogGeneSet: ReadonlySet<string>
): string {
  const gene0 = parsed.geneCandidates[0];
  const mod0 = parsed.modificationTypes[0];
  const tissue0 = parsed.tissueCellCandidates[0];
  const driver0 = parsed.creDriverCandidates[0];

  const inCat = Boolean(gene0 && catalogGeneSet.has(gene0));

  if (inCat && mod0 && tissue0) {
    const modSlug = modCanonicalToSlug(mod0);
    const tslug = tissueCanonicalToSlug(tissue0);
    return `/all-catalog-mouse-models/gene/${encodeURIComponent(gene0!)}/${modSlug}/${tslug}/`;
  }
  if (inCat && mod0 && driver0) {
    const modSlug = modCanonicalToSlug(mod0);
    const dslug = driverCanonicalToSlug(driver0);
    return `/all-catalog-mouse-models/gene/${encodeURIComponent(gene0!)}/${modSlug}/${dslug}/`;
  }
  if (inCat && mod0) {
    const modSlug = modCanonicalToSlug(mod0);
    return `/all-catalog-mouse-models/gene/${encodeURIComponent(gene0!)}/${modSlug}/`;
  }

  if (!gene0 && driver0) {
    return `/cre-drivers/${driverCanonicalToSlug(driver0)}/`;
  }

  if (!gene0 && tissue0) {
    return `/cre-lines/${tissueCanonicalToSlug(tissue0)}/`;
  }

  if (mod0 && (!gene0 || !inCat)) {
    const pat = primaryModificationPattern(parsed.cleaned);
    const page =
      (pat?.canonicalModelType === mod0 ? pat?.fallbackPage : undefined) ??
      fallbackPageForModelType(mod0) ??
      pat?.fallbackPage ??
      '/conditional-knockout-mouse-models';
    const g = gene0 ?? '';
    if (g) return `${page}?gene=${encodeURIComponent(g)}`;
    return page;
  }

  if (gene0) {
    return `/all-catalog-mouse-models/gene/${encodeURIComponent(gene0)}/`;
  }

  if (tissue0) {
    return `/cre-lines/${tissueCanonicalToSlug(tissue0)}/`;
  }
  if (driver0) {
    return `/cre-drivers/${driverCanonicalToSlug(driver0)}/`;
  }

  return '/search/';
}
