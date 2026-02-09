import { NextResponse } from 'next/server';
import { newsletterArticles } from '@/data/newsletterArticles';

const SITE_URL = 'https://www.genetargeting.com';
const FEED_TITLE = 'Lab Signals - ingenious targeting laboratory';
const FEED_DESCRIPTION = 'Your Biweekly Source for Life Science Research Insights. Expert analysis, technical guides, and industry insights on mouse model development and biomedical research.';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateRssFeed(): string {
  const buildDate = new Date().toUTCString();
  
  const items = newsletterArticles.map((article) => {
    const link = `${SITE_URL}/lab-signals/${article.slug}`;
    const description = stripHtml(article.description || article.body.slice(0, 500));
    
    return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(article.category)}</category>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/lab-signals</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/rss/lab-signals" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/itl-logo.png</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${SITE_URL}/lab-signals</link>
    </image>
    <copyright>© ${new Date().getFullYear()} ingenious targeting laboratory. All rights reserved.</copyright>
    <managingEditor>inquiry@genetargeting.com (ingenious targeting laboratory Scientific Team)</managingEditor>
    <webMaster>inquiry@genetargeting.com (ingenious targeting laboratory Web Team)</webMaster>
    <ttl>1440</ttl>
    ${items}
  </channel>
</rss>`;
}

export async function GET() {
  const feed = generateRssFeed();

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
