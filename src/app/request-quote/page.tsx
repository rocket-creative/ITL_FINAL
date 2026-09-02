/**
 * Mouse Model Quote Request Page
 * Server wrapper: noindex + canonical on query param variants (gene, type, UTM, etc.)
 */

import type { Metadata } from 'next';
import { generateMetadata as buildPageMetadata } from '@/lib/seo';
import RequestQuoteClient from './RequestQuoteClient';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const hasQueryParams = Object.keys(params).length > 0;

  return buildPageMetadata({
    title: 'Mouse Model Quote Request',
    description:
      'Request a mouse model generation quote for knockout, knockin, humanized, or conditional models. Free consultation included.',
    path: '/request-quote',
    index: !hasQueryParams,
    follow: true,
  });
}

export default function RequestQuotePage() {
  return <RequestQuoteClient />;
}
