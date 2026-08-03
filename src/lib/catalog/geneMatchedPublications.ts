/**
 * Match ITL publications to gene symbols by title/author text.
 */

import {
  publicationsByYear,
  type Publication,
} from '@/app/publications/publicationsData';

const MAX_MATCHES = 5;

/**
 * Return up to 5 ITL publications whose title or authors mention any of the given gene symbols
 * (case insensitive). Only searches the site publications list, never external sources.
 */
export function getGeneMatchedPublications(geneSymbols: string[]): Publication[] {
  const needles = geneSymbols
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.toLowerCase());

  if (needles.length === 0) return [];

  const matches: Publication[] = [];
  const years = Object.keys(publicationsByYear).sort(
    (a, b) => parseInt(b, 10) - parseInt(a, 10),
  );

  for (const year of years) {
    const pubs = publicationsByYear[year] ?? [];
    for (const pub of pubs) {
      const haystack = `${pub.title} ${pub.authors}`.toLowerCase();
      const hit = needles.some((n) => haystack.includes(n));
      if (!hit) continue;
      matches.push(pub);
      if (matches.length >= MAX_MATCHES) return matches;
    }
  }

  return matches;
}
