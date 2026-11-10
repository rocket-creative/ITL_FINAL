import { describe, expect, it } from 'vitest';
import {
  citationNodes,
  doiFromLink,
  isPatent,
  parseAuthors,
  pmcId,
  pubmedId,
  scholarlyArticleNode,
} from '../citationSchema';
import type { Publication } from '@/app/publications/publicationsData';

// Real records, copied from publicationsData.ts rather than invented, so the
// parsing is tested against the stored citation format as it actually is.
const sod1: Publication = {
  authors: 'Wang Y, Noë A, Truong-Ong L, Hekimi S.',
  year: 2026,
  title:
    'Clarifying the molecular mechanisms underlying the lethal in vitro cellular effects and mild organismal phenotype of SOD1 loss',
  journal: 'Sci Rep.',
  volume: 'Online ahead of print',
  link: 'https://pubmed.ncbi.nlm.nih.gov/42374077/',
};

const noLink: Publication = {
  authors: 'Smith A, Jones B.',
  year: 2019,
  title: 'A paper with no stored link',
  journal: 'J Example',
  volume: '1(1): 1-10',
};

describe('pubmedId', () => {
  it('extracts the numeric id from a modern PubMed URL', () => {
    expect(pubmedId(sod1.link)).toBe('42374077');
  });

  it('extracts the id from the LEGACY PubMed URL form too', () => {
    // 453 of 713 records use this older host and path. Matching only the
    // modern form left two thirds of the citations with no identifier.
    expect(pubmedId('https://www.ncbi.nlm.nih.gov/pubmed/32160286')).toBe('32160286');
  });

  it('returns null for a missing or non-PubMed link', () => {
    expect(pubmedId(undefined)).toBeNull();
    expect(pubmedId('https://example.com/article')).toBeNull();
  });
});

describe('pmcId', () => {
  it('extracts a PMC id', () => {
    expect(pmcId('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10555862/')).toBe('PMC10555862');
  });

  it('returns null when there is no PMC id', () => {
    expect(pmcId(sod1.link)).toBeNull();
  });
});

describe('doiFromLink', () => {
  it('pulls the DOI out of a bioRxiv preprint URL', () => {
    // These 24 records have no PMID or PMCID; the DOI in the path is the only
    // identifier they carry.
    expect(doiFromLink('https://www.biorxiv.org/content/10.1101/2023.11.22.568286v1.article-info')).toBe(
      '10.1101/2023.11.22.568286',
    );
  });

  it('returns null when no DOI is embedded', () => {
    expect(doiFromLink('https://www.nature.com/articles/s44298-024-00048-y#citeas')).toBeNull();
  });
});

describe('isPatent', () => {
  it('recognises the three patent hosts in the data', () => {
    expect(isPatent('https://patents.google.com/patent/US1234567B2/en')).toBe(true);
    expect(isPatent('https://www.freepatentsonline.com/1234567.html')).toBe(true);
    expect(isPatent('https://patentimages.storage.googleapis.com/x.pdf')).toBe(true);
  });

  it('does not treat a paper as a patent', () => {
    expect(isPatent(sod1.link)).toBe(false);
  });
});

describe('parseAuthors', () => {
  it('splits the approved citation format into names', () => {
    expect(parseAuthors(sod1.authors)).toEqual([
      'Wang Y',
      'Noë A',
      'Truong-Ong L',
      'Hekimi S',
    ]);
  });

  it('drops the trailing period without mangling initials', () => {
    // "Hekimi S." must become "Hekimi S", not "Hekimi".
    expect(parseAuthors('Hekimi S.')).toEqual(['Hekimi S']);
  });

  it('survives an empty author string', () => {
    expect(parseAuthors('')).toEqual([]);
  });
});

describe('scholarlyArticleNode', () => {
  it('describes a real paper with its PMID and journal', () => {
    const node = scholarlyArticleNode(sod1);
    expect(node['@type']).toBe('ScholarlyArticle');
    expect(node.headline).toBe(sod1.title);
    expect(node.datePublished).toBe('2026');
    // Journal keeps its abbreviation but loses the citation-format period.
    expect(node.isPartOf).toEqual({ '@type': 'Periodical', name: 'Sci Rep' });
    expect(node.identifier).toEqual({
      '@type': 'PropertyValue',
      propertyID: 'PMID',
      value: '42374077',
    });
  });

  it('uses the PubMed URL as @id so one paper is one node across pages', () => {
    // The same paper cited from /gene/Sod1/ and /gene/Sod1/knockout/ must
    // resolve to a single node, not two anonymous ones.
    expect(scholarlyArticleNode(sod1)['@id']).toBe(sod1.link);
    expect(scholarlyArticleNode(sod1).url).toBe(sod1.link);
  });

  it('never invents an identifier for a paper with no link', () => {
    // A fabricated citation identifier would be worse than none at all.
    const node = scholarlyArticleNode(noLink);
    expect(node['@id']).toBeUndefined();
    expect(node.url).toBeUndefined();
    expect(node.identifier).toBeUndefined();
    // The verifiable parts are still stated.
    expect(node.headline).toBe(noLink.title);
    expect(node.datePublished).toBe('2019');
  });
});

describe('citationNodes', () => {
  it('returns undefined rather than an empty array when nothing matched', () => {
    // An empty `citation: []` asserts nothing and only adds bytes to a page
    // that already ships a large graph.
    expect(citationNodes([])).toBeUndefined();
  });

  it('maps every matched paper', () => {
    const nodes = citationNodes([sod1, noLink]);
    expect(nodes).toHaveLength(2);
    expect(nodes?.[0].headline).toBe(sod1.title);
  });

  it('excludes patents, which are not scholarly articles', () => {
    // 13 records are patents. They are real and stay in the visible list, but
    // typing one as a ScholarlyArticle asserts something false, and `citation`
    // on a service page reads as peer-reviewed validation.
    const patent: Publication = {
      authors: 'Inventor A.',
      year: 2020,
      title: 'Method for generating a mouse',
      journal: 'US Patent',
      volume: 'US1234567B2',
      link: 'https://patents.google.com/patent/US1234567B2/en',
    };
    expect(citationNodes([patent])).toBeUndefined();
    expect(citationNodes([sod1, patent])).toHaveLength(1);
  });
});
