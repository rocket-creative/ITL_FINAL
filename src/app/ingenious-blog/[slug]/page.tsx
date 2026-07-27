import fs from 'fs';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';

import path from 'path';
import { applyCatalogFirstMeta } from '@/lib/seo';
import { buildServiceOffer } from '@/lib/seo/productSchema';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCStartProjectCTA,
  FAQPageSchema,
  UXUIDCEducationalSalesBanner,
  CatalogStickyRail,
  getEducationalOffer,
  getCatalogLookup,
} from '@/components/UXUIDC';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

// Simple frontmatter parser
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {} as Record<string, string>, content: fileContent };
  }

  const frontmatterStr = match[1];
  const content = match[2];

  const data: Record<string, string | string[]> = {};
  const lines = frontmatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent.split(',').map((item) => {
        let trimmed = item.trim();
        if (
          (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
          (trimmed.startsWith("'") && trimmed.endsWith("'"))
        ) {
          trimmed = trimmed.slice(1, -1);
        }
        return trimmed;
      });
    } else {
      data[key] = value;
    }
  }

  return { data, content };
}

// Convert markdown to HTML with proper structure
function markdownToHtml(markdown: string): string {
  // Clean up zero-width characters and normalize line endings
  let cleaned = markdown
    .replace(/\u200d/g, '') // Zero-width joiner
    .replace(/\u200b/g, '') // Zero-width space
    .replace(/\u200c/g, '') // Zero-width non-joiner
    .replace(/\ufeff/g, '') // BOM
    .replace(/‍/g, '')      // HTML entity zero-width joiner
    .replace(/\r\n/g, '\n')
    .trim();
  
  // Pre-process: Convert multi-line linked images to single line
  // Pattern: [\n![alt](img)\n](link) -> [![alt](img)](link)
  cleaned = cleaned.replace(/\[\s*\n\s*!\[([^\]]*)\]\(([^)]+)\)\s*\n\s*\]\(([^)]+)\)/g, '[![$1]($2)]($3)');
  
  // Pre-process: separate linked images followed by headers
  // Pattern: ](url)## Header -> ](url)\n\n## Header
  cleaned = cleaned.replace(/\]\(([^)]+)\)(#{1,6}\s)/g, ']($1)\n\n$2');
  
  // Split into blocks by double newlines
  const blocks = cleaned.split(/\n\n+/);
  const htmlBlocks: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Linked image: [![alt](img)](link)
    const linkedImageMatch = trimmed.match(/^\[\!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/);
    if (linkedImageMatch) {
      const alt = linkedImageMatch[1] || 'Article image';
      const src = linkedImageMatch[2];
      const href = linkedImageMatch[3];
      
      // Check if this is a CTA image - convert to text CTA instead
      if (src.includes('CTA') || src.includes('Get-a-Quote') || src.includes('Button-Post') || 
          src.includes('quote-request') || alt.toLowerCase().includes('cta') || 
          alt.toLowerCase().includes('quote') || alt.toLowerCase().includes('get a quote')) {
        // Determine CTA type from URL
        const isQuote = href.includes('quote') || href.includes('request');
        const isDownload = href.includes('white-paper') || href.includes('guide') || href.includes('chart');
        const ctaText = isQuote ? 'Request a Quote' : isDownload ? 'Download Resource' : 'Learn More';
        const buttonClass = isDownload ? 'blog-button blog-button-download' : 'blog-button';
        htmlBlocks.push(`<div class="blog-cta"><a href="${href}" class="${buttonClass}">${ctaText} →</a></div>`);
      } else {
        htmlBlocks.push(`<figure class="blog-figure"><a href="${href}" class="blog-image-link"><img src="${src}" alt="${alt}" class="blog-image" loading="lazy" /></a></figure>`);
      }
      continue;
    }

    // Standalone image: ![alt](url) - filter out placeholder/tracking images and CTA images
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const alt = imageMatch[1] || 'Article image';
      const src = imageMatch[2];
      // Skip tiny/icon images, tracking pixels, and CTA images
      if (src.includes('Downloadable-Icon') || src.includes('tracking') || src.includes('pixel') ||
          src.includes('CTA') || src.includes('Get-a-Quote') || src.includes('Button-Post') ||
          src.includes('quote-request')) {
        continue;
      }
      htmlBlocks.push(`<figure class="blog-figure"><img src="${src}" alt="${alt}" class="blog-image" loading="lazy" /></figure>`);
      continue;
    }

    // Headers - skip duplicate H1s if they match the title pattern
    if (trimmed.startsWith('#### ')) {
      htmlBlocks.push(`<h4 class="blog-h4">${processInline(trimmed.slice(5))}</h4>`);
    } else if (trimmed.startsWith('### ')) {
      htmlBlocks.push(`<h3 class="blog-h3">${processInline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      htmlBlocks.push(`<h2 class="blog-h2">${processInline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith('# ')) {
      // Skip redundant H1 headers that just repeat the title
      const h1Content = trimmed.slice(2).trim();
      if (!htmlBlocks.some(b => b.includes('blog-h1'))) {
        htmlBlocks.push(`<h1 class="blog-h1">${processInline(h1Content)}</h1>`);
      }
    }
    // Blockquotes
    else if (trimmed.startsWith('> ')) {
      const quoteContent = trimmed.split('\n').map(line => 
        line.startsWith('> ') ? line.slice(2) : line
      ).join(' ');
      htmlBlocks.push(`<blockquote class="blog-quote">${processInline(quoteContent)}</blockquote>`);
    }
    // Unordered lists
    else if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n')
        .filter(line => line.trim().startsWith('- '))
        .map(line => `<li>${processInline(line.trim().slice(2).trim())}</li>`)
        .join('');
      htmlBlocks.push(`<ul class="blog-list">${items}</ul>`);
    }
    // Horizontal rule
    else if (trimmed === '---') {
      htmlBlocks.push('<hr class="blog-hr" />');
    }
    // CTA-style standalone links
    else if (trimmed.startsWith('[') && trimmed.endsWith(')') && !trimmed.includes('\n')) {
      // Check if it's a linked image
      const linkedImgInline = trimmed.match(/^\[\s*!\[([^\]]*)\]\(([^)]+)\)\s*\]\(([^)]+)\)$/);
      if (linkedImgInline) {
        const alt = linkedImgInline[1] || 'Article image';
        const src = linkedImgInline[2];
        const href = linkedImgInline[3];
        
        // Check if this is a CTA image - convert to text CTA instead
        if (src.includes('CTA') || src.includes('Get-a-Quote') || src.includes('Button-Post') || 
            src.includes('quote-request') || alt.toLowerCase().includes('cta') || 
            alt.toLowerCase().includes('quote') || alt.toLowerCase().includes('get a quote')) {
          const isQuote = href.includes('quote') || href.includes('request');
          const isDownload = href.includes('white-paper') || href.includes('guide') || href.includes('chart');
          const ctaText = isQuote ? 'Request a Quote' : isDownload ? 'Download Resource' : 'Learn More';
          const buttonClass = isDownload ? 'blog-button blog-button-download' : 'blog-button';
          htmlBlocks.push(`<div class="blog-cta"><a href="${href}" class="${buttonClass}">${ctaText} →</a></div>`);
        } else {
          htmlBlocks.push(`<figure class="blog-figure"><a href="${href}" class="blog-image-link"><img src="${src}" alt="${alt}" class="blog-image" loading="lazy" /></a></figure>`);
        }
      } else {
        // Plain link - check if it's a CTA
        const linkMatch = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const text = linkMatch[1];
          const url = linkMatch[2];
          // Filter out ONLY newsletter subscribe links
          if (url.includes('subscribe-to-ingenious') || 
              text.toLowerCase() === 'subscribe to our newsletter' ||
              text.toLowerCase() === 'stay in the loop') {
            continue;
          }
          // Determine button style based on link type
          const isDownload = url.includes('quick-guide') || 
                            url.includes('white-paper') || 
                            url.includes('design-guide') ||
                            url.includes('chart') ||
                            url.includes('technology-guide') ||
                            text.toLowerCase().includes('get your copy') ||
                            text.toLowerCase().includes('download');
          const isMeeting = url.includes('schedule-meeting');
          const isBreedingPlanner = url.includes('breeding-planner');
          
          // Choose appropriate button class
          let buttonClass = 'blog-button';
          if (isDownload) buttonClass = 'blog-button blog-button-download';
          else if (isMeeting) buttonClass = 'blog-button blog-button-meeting';
          else if (isBreedingPlanner) buttonClass = 'blog-button blog-button-tool';
          
          htmlBlocks.push(`<div class="blog-cta"><a href="${url}" class="${buttonClass}" target="_blank" rel="noopener noreferrer">${text}</a></div>`);
        } else {
          // Treat as paragraph
          htmlBlocks.push(`<p>${processInline(trimmed)}</p>`);
        }
      }
    }
    // Regular paragraphs
    else {
      // Handle single line breaks within a paragraph
      const lines = trimmed.split('\n');
      const processedLines = lines.map(line => processInline(line.trim())).filter(l => l);
      if (processedLines.length > 0) {
        htmlBlocks.push(`<p>${processedLines.join('<br />')}</p>`);
      }
    }
  }

  return htmlBlocks.join('\n');
}

// Process inline markdown (bold, italic, links, images)
function processInline(text: string): string {
  if (!text) return '';
  
  return text
    // Clean up zero-width characters
    .replace(/[\u200d\u200b\u200c\ufeff]/g, '')
    // Linked images: [![alt](img)](link)
    .replace(/\[\!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, (_, alt, img, link) => {
      const altText = alt || 'Image';
      return `<a href="${link}" class="blog-image-link" target="_blank" rel="noopener noreferrer"><img src="${img}" alt="${altText}" class="blog-inline-image" loading="lazy" /></a>`;
    })
    // Standalone images: ![alt](url)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      // Skip download icons
      if (src.includes('Downloadable-Icon')) return '';
      const altText = alt || 'Image';
      return `<img src="${src}" alt="${altText}" class="blog-inline-image" loading="lazy" />`;
    })
    // Links: [text](url) - handle external vs internal
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
      // Skip subscribe links in inline context too
      if (url.includes('subscribe-to-ingenious')) return linkText;
      const isExternal = url.startsWith('http');
      const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}" class="blog-link"${targetAttr}>${linkText}</a>`;
    })
    // Bold: **text**
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic: *text*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Code: `text`
    .replace(/`([^`]+)`/g, '<code class="blog-code">$1</code>')
    // Footnote references: [[1]]
    .replace(/\[\[(\d+)\]\]/g, '<sup class="blog-footnote">$1</sup>');
}

// Get all blog slugs for static generation
export async function generateStaticParams() {
  try {
    const files = fs.readdirSync(BLOG_CONTENT_DIR);
    return files
      .filter((file) => file.endsWith('.md') && !file.startsWith('_') && file !== 'README.md')
      .map((file) => ({
        slug: file.replace('.md', ''),
      }));
  } catch {
    return [];
  }
}

// Per-slug commercial metadata overrides for the highest-impression blog
// posts. These rewrite the SERP snippet from a definitional/encyclopedic
// title to an offer-driven commercial title that matches buyer intent and
// surfaces our differentiators (price, publications, projects).
const COMMERCIAL_META: Record<string, { title: string; description: string }> = {
  'what-is-a-point-mutation': {
    title: 'Point Mutation: Types, Examples & Generated Knockin Mice | ITL',
    description:
      'Point mutation explained: substitution, missense, nonsense. Search catalog strains or request a generated knockin. 800+ publications. Quote in 24h.',
  },
  'types-of-point-mutations': {
    title: 'Types of Point Mutations + Generated Knockin Mouse Models | ITL',
    description:
      'Substitution, insertion, deletion mutations. Browse catalog disease variants or request a generated knockin. 26+ years experience. Quote in 24h.',
  },
  'point-mutation-diseases': {
    title: 'Point Mutation Diseases + Generated Disease-Variant Mice | ITL',
    description:
      'Point mutation diseases: sickle cell, cystic fibrosis, cancer. Browse catalog knockins or we build your variant. Quote in 24h.',
  },
  'difference-between-knock-in-and-knockout': {
    title: 'Knock-in vs Knockout Mice + Generated & Catalog Models | ITL',
    description:
      'Knock-in vs knockout explained. Search 14,774+ catalog models or order a generated build. 100% germline guarantee. 800+ publications.',
  },
  'conventional-vs-conditional-knockout': {
    title: 'Conventional vs Conditional Knockout + Generated Mice | ITL',
    description:
      'Conventional vs conditional knockout compared. Catalog floxed and Cre lines plus generated Cre/lox projects. 2,800+ models generated.',
  },
  'how-a-knockout-mouse-is-made': {
    title: 'How a Knockout Mouse Is Made + Generated Knockout Service | ITL',
    description:
      'How knockout mice are made. Many genes are already in our catalog. Generated knockouts when you need a new allele. Quote in 24h.',
  },
  'humanized-mice': {
    title: 'Humanized Mice: Services, Pricing & Model Generation | ITL',
    description:
      'Humanized mice: catalog checkpoint and reporter lines plus TruHumanization model generation services. Drug-target and immune models. Quote in 24h.',
  },
  'why-make-a-humanized-mouse': {
    title: 'Why Use Humanized Mice + Generated Humanization Services | ITL',
    description:
      'Why humanized mice matter. Browse catalog humanized strains or design a generated humanization. 800+ publications. Quote in 24h.',
  },
  'history-of-creating-genetically-humanized-mice': {
    title: 'Humanized Mice: History + Generated Humanization Service | ITL',
    description:
      'History of humanized mice. Today: broad catalog plus generated humanization since 1998. Immune checkpoint and drug-target. Quote in 24h.',
  },
  'what-is-a-transgene': {
    title: 'Transgene Explained + Generated Transgenic Mouse Service | ITL',
    description:
      'Transgene defined with examples. Catalog reporters and model generation BAC or targeted transgenics. 800+ publications. Quote in 24h.',
  },
  'transgenic-mice': {
    title: 'Transgenic Mice + Generated Transgenic Mouse Service | ITL',
    description:
      'Transgenic mice explained. Ready strains in catalog plus generated BAC, pronuclear, or targeted work. 800+ publications.',
  },
  'how-to-make-a-transgenic-mouse': {
    title: 'How to Make a Transgenic Mouse + Generated Service | ITL',
    description:
      'Transgenic mouse protocols explained. Compare DIY timelines to catalog strains or a full generated build. Quote in 24h.',
  },
  'rosa26-mice': {
    title: 'Rosa26 Mice + Generated Rosa26 Knockin Service | ITL',
    description:
      'Rosa26 safe harbor explained. Many Rosa26 alleles in catalog. Generated reporters and cassettes when you need them. Quote in 24h.',
  },
  'floxing': {
    title: 'Floxing Explained + Generated Floxed Allele Service | ITL',
    description:
      'Floxing for conditional knockouts. Search catalog floxed lines or request generated critical exon design. Germline guarantee.',
  },
  'floxed-cre-lox-flox': {
    title: 'Floxed, Cre, lox: Explained + Generated Floxed Mice | ITL',
    description:
      'Floxed alleles, Cre, loxP explained. Catalog Cre drivers and floxed strains plus model generation projects. Quote in 24h.',
  },
  'flox-sequence': {
    title: 'Flox Sequence Design + Generated Floxed Allele Service | ITL',
    description:
      'Flox sequence design tips. Browse conditional catalog alleles or partner with us on generated floxed mice. Quote in 24h.',
  },
  'conditional-mutation': {
    title: 'Conditional Mutation Explained + Generated Conditional Mice | ITL',
    description:
      'Conditional mutations explained. Catalog conditional lines and full generated knockout or knockin services. Quote in 24h.',
  },
  'cre-flox': {
    title: 'Cre/flox Conditional Knockout + Generated Service | ITL',
    description:
      'Cre/flox conditional knockout explained. Catalog Cre and floxed mice plus study-specific allele pairing. 800+ publications.',
  },
  'what-is-a-stem-cell-line': {
    title: 'Stem Cell Lines + Generated Mouse Targeting | ITL',
    description:
      'Stem cell lines for mouse targeting. Validated C57BL/6 ES platform for model generation mice. Browse catalog while you plan. Germline guarantee.',
  },
  'gene-knockout': {
    title: 'Gene Knockout: Methods + Generated Knockout Mice | ITL',
    description:
      'Gene knockout methods: homologous recombination and CRISPR. Search catalog knockouts first, then request a study-specific allele. Quote in 24h.',
  },
  'crispr-knockout': {
    title: 'CRISPR Knockout + Generated CRISPR Knockout Mice | ITL',
    description:
      'CRISPR knockout overview. Off-the-shelf catalog strains or generated CRISPR projects with germline guarantee.',
  },
};

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);
  const commercial = COMMERCIAL_META[slug];

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = parseFrontmatter(fileContent);

    const baseTitle = String(data.title || slug.replace(/-/g, ' '));
    const baseDescription = data.description && String(data.description) !== 'undefined'
      ? String(data.description)
      : `${baseTitle} explained for researchers comparing catalog strains and mouse model generation.`;

    const blogPath = `/ingenious-blog/${slug}`;
    const rawTitle = commercial?.title ?? baseTitle;
    const rawDescription = commercial?.description ?? baseDescription;
    const enhanced = applyCatalogFirstMeta(rawTitle, rawDescription, blogPath);
    const finalTitle = commercial?.title
      ? enhanced.title
      : `${enhanced.title} | ingenious targeting laboratory`;
    const finalDescription = enhanced.description;
    const canonicalUrl = `https://www.genetargeting.com/ingenious-blog/${slug}/`;

    return {
      title: finalTitle,
      description: finalDescription,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: finalTitle,
        description: finalDescription,
        url: canonicalUrl,
        siteName: 'ingenious targeting laboratory',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: finalTitle,
        description: finalDescription,
      },
    };
  } catch {
    const blogPath = `/ingenious-blog/${slug}`;
    const enhanced = applyCatalogFirstMeta(
      commercial?.title ?? 'Mouse Model Generation Insights | Catalog + Generation | ITL',
      commercial?.description ??
        'Mouse model insights from ingenious targeting laboratory. Browse 14,774+ catalog strains or generated knockout, knockin, and humanized mice.',
      blogPath,
    );
    return {
      title: enhanced.title,
      description: enhanced.description,
    };
  }
}

export default async function IngeniousBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);

  // Check if content file exists
  const contentExists = fs.existsSync(filePath);

  let frontmatter: Record<string, string | string[]> = {};
  let htmlContent = '';

  if (contentExists) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = parseFrontmatter(fileContent);
    frontmatter = parsed.data;
    htmlContent = markdownToHtml(parsed.content);
  }

  // Format the title from slug if not in frontmatter
  const title =
    String(frontmatter.title) ||
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const category = String(frontmatter.category) || 'General';
  const rawLegacyUrl = frontmatter.legacy_url;
  const legacyUrl =
    rawLegacyUrl && String(rawLegacyUrl) !== 'undefined'
      ? String(rawLegacyUrl)
      : `https://www.genetargeting.com/ingenious-blog/${slug}`;

  const catalogLookup = getCatalogLookup(slug);
  const catalogRelatedHref = `${catalogLookup.searchHref}${
    catalogLookup.searchHref.includes('?') ? '&' : '?'
  }utm_source=organic&utm_medium=blog&utm_campaign=related-resources-${encodeURIComponent(slug)}`;

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Technical Guide': '#008080',
      Educational: '#2384da',
      'Selection Guide': '#6b46c1',
      Protocol: '#d97706',
      'Research Spotlight': '#059669',
      'Company News': '#666666',
      'Industry Insights': '#7c3aed',
    };
    return colors[cat] || '#666';
  };

  const pointMutationFaqs =
    slug === 'what-is-a-point-mutation'
      ? [
          {
            question: 'How do I get a generated point mutation mouse model?',
            answer:
              'ingenious targeting laboratory generates point mutation knockin mice at endogenous loci. Request a quote to discuss your project requirements, timeline, and pricing.',
          },
          {
            question: 'What types of point mutations can be modeled?',
            answer:
              'We model missense, nonsense, regulatory, and disease-associated variants. Contact us to discuss your specific mutation and allele design.',
          },
        ]
      : slug === 'types-of-point-mutations'
        ? [
            {
              question: 'Can you model substitution, deletion, or insertion mutations?',
              answer:
                'Yes. ingenious targeting laboratory generates point mutation knockin mice for all mutation types. Request a quote to discuss your specific variant and allele design.',
            },
            {
              question: 'How do I choose which point mutation type to model?',
              answer:
                'Our scientific consultants help evaluate your gene of interest and recommend the optimal mutation strategy. Contact us for a free consultation.',
            },
          ]
        : slug === 'point-mutation-diseases'
          ? [
              {
                question: 'Can you model disease-associated point mutations in mice?',
                answer:
                  'Yes. ingenious targeting laboratory generates point mutation knockin mice for sickle cell, cystic fibrosis, cancer, and other disease variants. Request a quote to discuss your project.',
              },
              {
                question: 'How do mouse models help study point mutation diseases?',
                answer:
                  'Point mutation knockin mice express the variant protein at endogenous loci under physiological regulation. This enables precise study of disease mechanisms and therapeutic development. Contact us for a consultation.',
              },
            ]
          : [];

  // Article + Offer JSON-LD. Surfaces our starting price in the SERP so
  // commercial-intent searchers see we sell something, not just educate.
  const offer = getEducationalOffer(slug);
  const canonicalUrl = `https://www.genetargeting.com/ingenious-blog/${slug}/`;
  const dateModified =
    String(frontmatter.dateModified || frontmatter.updated || '') ||
    new Date().toISOString().split('T')[0];
  const datePublished = String(frontmatter.date || dateModified) || dateModified;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'TechArticle'],
    headline: title,
    description: COMMERCIAL_META[slug]?.description || frontmatter.description || title,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: 'en-US',
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      '@id': 'https://www.genetargeting.com/#organization',
      name: 'ingenious targeting laboratory',
      url: 'https://www.genetargeting.com',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.genetargeting.com/#organization',
      name: 'ingenious targeting laboratory',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.genetargeting.com/images/logo.png',
      },
    },
  };
  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: offer.eyebrow,
    serviceType: 'Mouse model generation',
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.genetargeting.com/#organization',
      name: 'ingenious targeting laboratory',
      url: 'https://www.genetargeting.com',
    },
    areaServed: 'Worldwide',
    offers: buildServiceOffer(
      `https://www.genetargeting.com${offer.primaryCta.href.split('?')[0]}`,
      offer.eyebrow,
    ),
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      {pointMutationFaqs.length > 0 && <FAQPageSchema faqs={pointMutationFaqs} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />

      <main id="main-content">
        {/* Header */}
        <section className="page-hero"
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 100%)',
            padding: '70px 20px 50px',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category */}
            <div style={{ marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '.7rem',
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor: getCategoryColor(category),
                  padding: '4px 12px',
                  borderRadius: '12px',
                }}
              >
                {category}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '15px',
              }}
            >
              {title}
            </h1>

          </div>
        </section>

        {/* Above-the-fold commercial offer — the page's primary sales surface */}
        <UXUIDCEducationalSalesBanner slug={slug} />

        {/* Content */}
        <section style={{ backgroundColor: 'white', padding: '50px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Blog Content Styles */}
            <style>{`
              .blog-content {
                font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 1.05rem;
                line-height: 1.9;
                color: #333;
              }
              .blog-content h1.blog-h1 {
                font-family: 'Poppins', sans-serif;
                font-size: 1.85rem;
                font-weight: 700;
                color: #0a253c;
                margin: 2.5rem 0 1rem;
                line-height: 1.3;
              }
              .blog-content h2.blog-h2 {
                font-family: 'Poppins', sans-serif;
                font-size: 1.5rem;
                font-weight: 700;
                color: #0a253c;
                margin: 2.5rem 0 1rem;
                line-height: 1.3;
              }
              .blog-content h3.blog-h3 {
                font-family: 'Poppins', sans-serif;
                font-size: 1.25rem;
                font-weight: 600;
                color: #0a253c;
                margin: 2rem 0 0.75rem;
                line-height: 1.4;
              }
              .blog-content h4.blog-h4 {
                font-family: 'Poppins', sans-serif;
                font-size: 1.1rem;
                font-weight: 600;
                color: #0a253c;
                margin: 1.75rem 0 0.5rem;
                line-height: 1.4;
              }
              .blog-content p {
                margin: 0 0 1.5rem;
                color: #444;
              }
              .blog-content .blog-link {
                color: #008080;
                text-decoration: underline;
                text-decoration-color: rgba(0,128,128,0.3);
                text-underline-offset: 3px;
                transition: color 0.2s ease;
              }
              .blog-content .blog-link:hover {
                color: #006666;
                text-decoration-color: #006666;
              }
              .blog-content .blog-list {
                margin: 1rem 0 1.5rem 1.5rem;
                padding: 0;
              }
              .blog-content .blog-list li {
                margin-bottom: 0.6rem;
                line-height: 1.7;
                color: #444;
              }
              .blog-content .blog-list li::marker {
                color: #008080;
              }
              .blog-content .blog-quote {
                margin: 1.5rem 0;
                padding: 1rem 1.5rem;
                border-left: 4px solid #008080;
                background: #f7f9fa;
                color: #555;
                font-style: italic;
                border-radius: 0 6px 6px 0;
              }
              .blog-content .blog-figure {
                margin: 2rem 0;
                text-align: center;
              }
              .blog-content .blog-image {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
              }
              .blog-content .blog-inline-image {
                max-width: 100%;
                height: auto;
                margin: 1rem 0;
                border-radius: 6px;
              }
              .blog-content .blog-hr {
                border: none;
                border-top: 1px solid #e0e0e0;
                margin: 2rem 0;
              }
              .blog-content .blog-cta {
                margin: 2rem 0;
                padding: 1.25rem;
                background: linear-gradient(135deg, #f8fafa 0%, #f0f5f5 100%);
                border-radius: 8px;
                border: 1px solid #e0e8e8;
                text-align: center;
              }
              .blog-content .blog-button {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #008080;
                color: white;
                padding: 12px 24px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(0,128,128,0.2);
              }
              .blog-content .blog-button:hover {
                background: #006666;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,128,128,0.25);
              }
              .blog-content .blog-button-download::before {
                content: '↓';
                font-weight: bold;
              }
              .blog-content .blog-button-meeting::before {
                content: '📅';
              }
              .blog-content .blog-button-tool {
                background: #2384da;
              }
              .blog-content .blog-button-tool:hover {
                background: #1a6bb8;
              }
              .blog-content .blog-button-tool::before {
                content: '🔧';
              }
              .blog-content .blog-code {
                background: #f4f4f4;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 0.9em;
                color: #555555;
              }
              .blog-content strong {
                font-weight: 600;
                color: #222;
              }
              .blog-content .blog-image-link {
                display: block;
                text-decoration: none;
                transition: transform 0.2s ease;
              }
              .blog-content .blog-image-link:hover {
                transform: scale(1.01);
              }
              .blog-content .blog-footnote {
                font-size: 0.75em;
                color: #008080;
                cursor: pointer;
              }
              .blog-content .blog-footnote:hover {
                color: #006666;
                text-decoration: underline;
              }
            `}</style>
            {contentExists ? (
              <>
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </>
            ) : (
              <div
                style={{
                  backgroundColor: '#fff8e6',
                  border: '1px solid #ffd666',
                  borderRadius: '8px',
                  padding: '30px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    color: '#996600',
                    fontSize: '1rem',
                    marginBottom: '15px',
                  }}
                >
                  Content for this archived blog post is being migrated.
                </p>
                <p style={{ color: '#666', fontSize: '.9rem', marginBottom: '20px' }}>
                  In the meantime, you can view the original post on our legacy site:
                </p>
                <a
                  href={legacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#008080',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '.9rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    borderRadius: '4px',
                  }}
                >
                  View on Legacy Site →
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Back to Blog */}
        <section
          style={{ backgroundColor: '#f7f7f7', padding: '30px 20px', borderTop: '1px solid #e0e0e0' }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link
              href="/ingenious-blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#222222',
                fontSize: '.9rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <span>←</span>
              <span>Back to Blog Archive</span>
            </Link>
          </div>
        </section>

        {/* Related Resources */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '40px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3
              style={{
                color: '#333',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '15px',
              }}
            >
              Explore More Resources
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                ...(contentExists
                  ? [
                      { label: 'Browse 14,774+ Catalog Models', href: catalogRelatedHref },
                      { label: 'Request a Quote', href: '/request-quote' },
                    ]
                  : [
                      { label: 'Browse 14,774+ Catalog Models', href: '/all-catalog-mouse-models/' },
                      { label: 'Request a Quote', href: '/request-quote' },
                    ]),
                ...(slug === 'what-is-a-point-mutation'
                  ? [
                      { label: 'Point Mutation Mice', href: '/point-mutation-mice' },
                      { label: 'Types of Point Mutations', href: '/ingenious-blog/types-of-point-mutations/' },
                      { label: 'Point Mutation Diseases', href: '/ingenious-blog/point-mutation-diseases/' },
                    ]
                  : slug === 'types-of-point-mutations'
                    ? [
                        { label: 'Point Mutation Mice', href: '/point-mutation-mice' },
                        { label: 'What Is a Point Mutation', href: '/ingenious-blog/what-is-a-point-mutation/' },
                        { label: 'Point Mutation Diseases', href: '/ingenious-blog/point-mutation-diseases/' },
                      ]
                    : slug === 'point-mutation-diseases'
                      ? [
                          { label: 'Point Mutation Mice', href: '/point-mutation-mice' },
                          { label: 'What Is a Point Mutation', href: '/ingenious-blog/what-is-a-point-mutation/' },
                          { label: 'Types of Point Mutations', href: '/ingenious-blog/types-of-point-mutations/' },
                        ]
                      : []),
                { label: 'Lab Signals', href: '/lab-signals' },
                { label: 'Resources', href: '/resources' },
                { label: 'Technologies', href: '/technologies' },
                { label: 'Publications', href: '/publications' },
              ].map((link, idx) => (
                <Link
                  key={`${link.href}-${idx}`}
                  href={link.href}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f7f7f7',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    color: '#008080',
                    fontSize: '.85rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <UXUIDCStartProjectCTA
          slug={slug}
          title={
            slug === 'what-is-a-point-mutation'
              ? 'Ready to Model a Point Mutation?'
              : slug === 'types-of-point-mutations'
                ? 'Ready to Model Your Mutation Type?'
                : slug === 'point-mutation-diseases'
                  ? 'Ready to Model a Disease Variant?'
                  : 'Ready to Start Your Project?'
          }
          content={
            slug === 'what-is-a-point-mutation' ||
            slug === 'types-of-point-mutations' ||
            slug === 'point-mutation-diseases'
              ? 'Search catalog point mutation strains from live colonies, or meet with us about a generated knockin at your exact locus.'
              : 'Browse thousands of catalog strains or partner with us on a generated knockout, knockin, or humanized model for your study.'
          }
        />
      </main>

      <UXUIDCFooter />
      {/* Floating commercial nudge — desktop only */}
      <CatalogStickyRail slug={slug} href={getCatalogLookup(slug).searchHref} />
    </div>
  );
}
