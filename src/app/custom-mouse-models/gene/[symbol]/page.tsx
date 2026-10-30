import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import CustomGenePage from '@/components/custom-gene-pages/CustomGenePage';
import {
  customGeneHref,
  customGenePath,
  firstSentence,
  getCustomGenePage,
  getCustomGenePageIgnoreCase,
  listCustomGenePages,
} from '@/content/custom-gene-pages/registry';
import { generateMetadata as buildMetadata } from '@/lib/seo/generateMetadata';

type Props = {
  params: Promise<{ symbol: string }>;
};

export function generateStaticParams() {
  return listCustomGenePages().map((page) => ({ symbol: page.symbol }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const decoded = decodeURIComponent(symbol);
  const page = getCustomGenePage(decoded) ?? getCustomGenePageIgnoreCase(decoded);
  if (!page) return {};
  const description = firstSentence(page.why[0] ?? page.h1);
  const meta = buildMetadata({
    title: page.h1,
    description,
    path: customGenePath(page.symbol),
    catalogFirst: false,
  });
  return {
    ...meta,
    description,
    openGraph: meta.openGraph ? { ...meta.openGraph, description } : undefined,
    twitter: meta.twitter ? { ...meta.twitter, description } : undefined,
  };
}

export default async function CustomGeneModelPage({ params }: Props) {
  const { symbol: raw } = await params;
  const symbol = decodeURIComponent(raw);
  const page = getCustomGenePage(symbol);
  if (page) return <CustomGenePage page={page} />;

  const canonical = getCustomGenePageIgnoreCase(symbol);
  if (canonical) permanentRedirect(customGeneHref(canonical.symbol));
  notFound();
}
