/**
 * JSON-LD schema for build_inquiry pages, spec §7.
 */

import type { GeneRow, ModelTypeRow } from './db';
import { buildPageCopy } from './content';
import { buildTierGeneModFaqs } from '@/lib/seo/faqBuilders';
import { citationNodes } from '@/lib/seo/citationSchema';
import { organizationRef } from '@/lib/seo/organization';
import type { Publication } from '@/app/publications/publicationsData';

const BASE_URL = 'https://www.genetargeting.com';

export function buildBuildInquirySchemaGraph(
  gene: GeneRow,
  modelType: ModelTypeRow,
  modSlug: string,
  /**
   * Papers already rendered on this page by `getGeneMatchedPublications`.
   * Optional so existing callers keep working; when present, the Service node
   * cites them. Schema may only describe visible content, so never pass papers
   * the page does not display.
   */
  pubs: Publication[] = [],
) {
  const copy = buildPageCopy(gene, modelType);
  const faqs = buildTierGeneModFaqs({ gene: gene.symbol, modLabel: modelType.display_name });
  const pageUrl = `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(gene.symbol)}/${modSlug}/`;

  const alternateNames = [
    modelType.display_name,
    ...(modelType.synonyms ?? []),
    `${gene.symbol} ${modelType.display_name} Mouse Model`,
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Catalog', item: `${BASE_URL}/all-catalog-mouse-models/` },
          {
            '@type': 'ListItem',
            position: 3,
            name: gene.symbol,
            item: `${BASE_URL}/all-catalog-mouse-models/gene/${encodeURIComponent(gene.symbol)}/`,
          },
          { '@type': 'ListItem', position: 4, name: modelType.display_name, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        // Stable node id: without one, every page minted an anonymous Service
        // and the graph had no way to tell two references to the same offering
        // apart. The root layout emits the full Organization, so `provider`
        // points at it by @id rather than re-declaring name and url here —
        // 112 pages were each asserting their own Organization node.
        '@id': `${pageUrl}#service`,
        name: `${gene.symbol} ${modelType.display_name} Mouse Model`,
        description: copy.geneFraming,
        alternateName: alternateNames,
        provider: organizationRef,
        url: pageUrl,
        ...(citationNodes(pubs) ? { citation: citationNodes(pubs) } : {}),
      },
      {
        // Kept, but do not count this as a search feature. Google limited FAQ
        // rich results to government and health sites in August 2023 and
        // stopped showing them entirely on 7 May 2026, so this node earns no
        // SERP display. It stays because the questions are real visible copy
        // and the markup still states them plainly for anything parsing the
        // page; it is not a reason to add more FAQ blocks.
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
}
