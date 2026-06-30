/**
 * JSON-LD schema for build_inquiry pages — spec §7.
 */

import type { GeneRow, ModelTypeRow } from './db';
import { buildPageCopy } from './content';
import { buildTierGeneModFaqs } from '@/lib/seo/faqBuilders';

const BASE_URL = 'https://www.genetargeting.com';
const BRAND = 'ingenious targeting laboratory';

export function buildBuildInquirySchemaGraph(
  gene: GeneRow,
  modelType: ModelTypeRow,
  modSlug: string,
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
        name: `${gene.symbol} ${modelType.display_name} Mouse Model`,
        description: copy.geneFraming,
        alternateName: alternateNames,
        provider: {
          '@type': 'Organization',
          name: BRAND,
          url: BASE_URL,
        },
        url: pageUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
}
