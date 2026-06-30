import type { MetadataRoute } from 'next';
import { CANONICAL_MOD_SLUGS, getIndexableBuildInquiryUrlsByModSlug } from '@/lib/gene-expansion/db';

export async function generateSitemaps() {
  return CANONICAL_MOD_SLUGS.map((modSlug) => ({ id: modSlug }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const modSlug = await props.id;
  const pages = await getIndexableBuildInquiryUrlsByModSlug(modSlug);
  return pages.map((p) => ({
    url: p.url,
    lastModified: p.lastModified,
    changeFrequency: 'weekly',
    priority: 0.86,
  }));
}
