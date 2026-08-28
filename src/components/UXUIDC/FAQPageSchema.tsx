/**
 * FAQPage Schema Component
 * Generates JSON-LD FAQPage schema for rich snippets in search results
 * Use on any page with FAQ sections to enable FAQ rich results
 */

import { isValidElement } from 'react';
import { absoluteUrl } from '@/lib/seo/schemaBlocks';

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
  /** Overrides the text extracted from `answer`. */
  plainAnswer?: string;
}

/** Tags whose boundaries are word breaks in the rendered output. */
const BLOCK_TAGS = new Set([
  'p',
  'div',
  'li',
  'ul',
  'ol',
  'br',
  'h2',
  'h3',
  'h4',
  'table',
  'tr',
  'td',
  'th',
]);

/**
 * Flattens a React tree to the text a reader sees. Answers on several pages are
 * JSX because they contain glossary links; schema needs the prose, not
 * "[object Object]".
 */
function nodeToText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');

  if (isValidElement(node)) {
    const { children } = node.props as { children?: React.ReactNode };
    const inner = nodeToText(children);
    return typeof node.type === 'string' && BLOCK_TAGS.has(node.type)
      ? ` ${inner} `
      : inner;
  }

  return '';
}

interface FAQPageSchemaProps {
  faqs: FAQ[];
  /**
   * Page path, e.g. '/colony-management-services'. Supply it so the node gets
   * a stable `@id` that other nodes can reference.
   */
  path?: string;
}

export default function FAQPageSchema({ faqs, path }: FAQPageSchemaProps) {
  const answerText = (faq: FAQ): string => {
    const raw = faq.plainAnswer ?? nodeToText(faq.answer);
    return raw.replace(/\s+/g, ' ').trim();
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(path ? { '@id': `${absoluteUrl(path)}#faq` } : {}),
    mainEntity: faqs
      .map((faq) => ({ question: faq.question, text: answerText(faq) }))
      // A question with no extractable answer is invalid structured data.
      .filter((faq) => faq.text.length > 0)
      .map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.text,
        },
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
