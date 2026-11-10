/**
 * ScholarlyArticle citation nodes built from the publications list.
 *
 * WHY THIS EXISTS
 * ---------------
 * `publicationsData.ts` holds 713 real peer reviewed papers citing ITL
 * generated models, each with a journal, a year and (almost always) a PubMed
 * URL. Four page types already render matched papers as visible copy via
 * `getGeneMatchedPublications`, but none of them described those papers in
 * structured data, so the one genuinely differentiated asset on a gene page
 * was invisible to anything parsing the graph.
 *
 * WHAT THIS IS AND IS NOT WORTH
 * -----------------------------
 * This is not a ranking play and should not be sold as one. Google retired FAQ
 * rich results in May 2026 and HowTo in 2023, and a May 2026 study found
 * adding JSON-LD produced no measurable lift in AI Overview citations for
 * pages already surfacing there. Schema does not rank.
 *
 * What it does do is state a verifiable fact in a machine readable way: this
 * company's models appear in this named paper, in this journal, in this year,
 * at this PMID. Every value is traceable to a real article, so the claim is
 * checkable rather than asserted — which is the part that matters for an
 * audience of geneticists and for anything deciding whether to trust the page.
 *
 * Nothing here is generated or inferred. A publication with no `link` still
 * emits a node, but without a `url` or a PMID, because inventing an
 * identifier for a paper would be a fabricated citation.
 */

import type { Publication } from '@/app/publications/publicationsData';

/** PubMed numeric id, when the stored link is a PubMed URL. */
export function pubmedId(link: string | undefined): string | null {
  if (!link) return null;
  const m = link.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/i);
  return m ? m[1] : null;
}

/**
 * Split the stored author string into individual names.
 *
 * The stored format is the approved citation text, e.g.
 * "Wang Y, Noë A, Truong-Ong L, Hekimi S." — comma separated "Surname I"
 * entries with a trailing period. Splitting on the comma reproduces the
 * authors as written; it does not try to parse given names out of initials,
 * because that would be guessing at a real person's name.
 */
export function parseAuthors(authors: string): string[] {
  return authors
    .split(',')
    .map((a) => a.replace(/\.\s*$/, '').trim())
    .filter(Boolean);
}

/** Journal name without the trailing period the citation format carries. */
function journalName(journal: string): string {
  return journal.replace(/\.\s*$/, '').trim();
}

/**
 * One ScholarlyArticle node for a publication.
 *
 * `@id` is the PubMed URL when there is one, so the same paper cited from
 * several gene pages resolves to a single node rather than a new anonymous
 * one per page.
 */
export function scholarlyArticleNode(pub: Publication): Record<string, unknown> {
  const pmid = pubmedId(pub.link);
  const authors = parseAuthors(pub.authors);

  const node: Record<string, unknown> = {
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    datePublished: String(pub.year),
    isPartOf: { '@type': 'Periodical', name: journalName(pub.journal) },
  };

  if (pub.link) {
    node['@id'] = pub.link;
    node.url = pub.link;
  }

  if (authors.length > 0) {
    node.author = authors.map((name) => ({ '@type': 'Person', name }));
  }

  if (pmid) {
    node.identifier = { '@type': 'PropertyValue', propertyID: 'PMID', value: pmid };
  }

  return node;
}

/**
 * `citation` array for a page's primary node, or undefined when there are no
 * matched papers — an empty array asserts nothing and only adds bytes.
 */
export function citationNodes(pubs: Publication[]): Record<string, unknown>[] | undefined {
  if (pubs.length === 0) return undefined;
  return pubs.map(scholarlyArticleNode);
}

/**
 * NOT PROVIDED: a citation node for the full publications index.
 *
 * Measured before deciding: 713 entries, averaging a 104 character title, a
 * 105 character author string and 9.9 authors each, is roughly **499 KB** of
 * JSON-LD. Even trimmed to the 50 most recent it is ~35 KB. That is a large
 * payload on every visit, describing content already visible on the page, to
 * earn no rich result (there is none for ScholarlyArticle) and no evidenced
 * citation benefit — a May 2026 study found adding JSON-LD produced no
 * measurable AI citation lift for pages already surfacing.
 *
 * The gene pages are different and are where this module is used:
 * `getGeneMatchedPublications` caps at 5 matches, so the payload is a few KB
 * and the citation is contextually about that gene. Bounded and useful there,
 * unbounded and pointless here.
 *
 * If a future change needs the index described in the graph, reference the
 * papers by `@id` (their PubMed URLs) from a node that does not inline them.
 */
