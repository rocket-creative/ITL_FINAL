import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';
import { UXUIDCNavigation, UXUIDCFooter, UXUIDCStartProjectCTA } from '@/components/UXUIDC';

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

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = parseFrontmatter(fileContent);

    const title = String(data.title || slug.replace(/-/g, ' '));

    return {
      title: `${title} | Ingenious Blog Archive | ITL`,
      description:
        String(data.description) ||
        `Archived blog post from ingenious targeting laboratory: ${title}`,
    };
  } catch {
    return {
      title: 'Blog Post | Ingenious Blog Archive | ITL',
      description: 'Archived blog post from ingenious targeting laboratory',
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
  const legacyUrl =
    String(frontmatter.legacy_url) || `https://www.genetargeting.com/ingenious-blog/${slug}`;

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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Header */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 100%)',
            padding: '70px 20px 50px',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Archive Notice - Light Grey */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '6px 14px',
                borderRadius: '15px',
                marginBottom: '15px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <span style={{ fontSize: '14px' }}>📁</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.75rem', fontWeight: 500 }}>
                Archived Blog Post
              </span>
            </div>

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
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
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
                { label: 'Lab Signals', href: '/lab-signals' },
                { label: 'Resources', href: '/resources' },
                { label: 'Technologies', href: '/technologies' },
                { label: 'Publications', href: '/publications' },
              ].map((link) => (
                <Link
                  key={link.href}
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
          title="Ready to Start Your Project?"
          content="Our scientific consultants are available to discuss your research requirements and help design the optimal mouse model for your experimental goals."
          buttons={[
            { label: 'Request a Quote', href: '/request-quote' },
            { label: 'Contact Us', href: '/contact' },
          ]}
        />
      </main>

      <UXUIDCFooter />
    </div>
  );
}
