import { CANONICAL_MOD_SLUGS } from '@/lib/gene-expansion/db';
import { BASE_URL } from '@/lib/seo/types';

export async function GET() {
  const now = new Date().toISOString();
  const sitemaps = CANONICAL_MOD_SLUGS.map(
    (slug) => `${BASE_URL}/sitemaps/gene-modifications/${slug}/sitemap.xml`,
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
