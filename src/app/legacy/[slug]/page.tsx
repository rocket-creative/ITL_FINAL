import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { UXUIDCNavigation, UXUIDCFooter } from '@/components/UXUIDC';
import Link from 'next/link';

// Simple frontmatter parser (no external dependencies)
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: fileContent };
  }
  
  const frontmatterStr = match[1];
  const content = match[2];
  
  // Parse YAML-like frontmatter
  const data: Record<string, string | string[]> = {};
  const lines = frontmatterStr.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Handle quoted strings
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Handle arrays (simple detection)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent.split(',').map(item => {
        let trimmed = item.trim();
        if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
            (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
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

// Get all legacy page slugs for static generation
export async function generateStaticParams() {
  const legacyDir = path.join(process.cwd(), 'src/content/legacy');
  
  try {
    const files = fs.readdirSync(legacyDir);
    return files
      .filter(file => file.endsWith('.md') && !file.startsWith('_') && file !== 'README.md')
      .map(file => ({
        slug: file.replace('.md', ''),
      }));
  } catch {
    return [];
  }
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const legacyDir = path.join(process.cwd(), 'src/content/legacy');
  const filePath = path.join(legacyDir, `${slug}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = parseFrontmatter(fileContent);
    
    return {
      title: `${data.title || slug} | Legacy Content | ingenious targeting laboratory`,
      description: `Archived content from genetargeting.com - ${data.title || slug}`,
    };
  } catch {
    return {
      title: 'Legacy Content | ingenious targeting laboratory',
    };
  }
}

// Inline formatting (bold, italic) for a line
function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Simple markdown to HTML converter — outputs valid block structure (no <p> wrapping block elements)
function markdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const blocks: string[] = [];
  let listItems: string[] = [];
  let blockquoteLines: string[] = [];

  function flushList(): void {
    if (listItems.length > 0) {
      blocks.push('<ul class="legacy-list">' + listItems.join('') + '</ul>');
      listItems = [];
    }
  }

  function flushBlockquote(): void {
    if (blockquoteLines.length > 0) {
      const content = formatInline(blockquoteLines.filter(Boolean).join(' '));
      blocks.push(`<blockquote class="legacy-quote">${content}</blockquote>`);
      blockquoteLines = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed === '') {
      flushList();
      flushBlockquote();
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushList();
      flushBlockquote();
      blocks.push('<h1 class="legacy-h1">' + formatInline(trimmed.slice(2)) + '</h1>');
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      flushBlockquote();
      blocks.push('<h2 class="legacy-h2">' + formatInline(trimmed.slice(3)) + '</h2>');
      continue;
    }
    if (trimmed.startsWith('### ')) {
      flushList();
      flushBlockquote();
      blocks.push('<h3 class="legacy-h3">' + formatInline(trimmed.slice(4)) + '</h3>');
      continue;
    }
    if (trimmed.startsWith('> ')) {
      flushList();
      blockquoteLines.push(trimmed.slice(2).trim());
      continue;
    }
    if (trimmed.startsWith('- ')) {
      flushBlockquote();
      listItems.push('<li>' + formatInline(trimmed.slice(2)) + '</li>');
      continue;
    }
    flushList();
    flushBlockquote();
    blocks.push('<p>' + formatInline(trimmed) + '</p>');
  }
  flushList();
  flushBlockquote();

  return blocks.join('\n');
}

export default async function LegacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const legacyDir = path.join(process.cwd(), 'src/content/legacy');
  const filePath = path.join(legacyDir, `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = parseFrontmatter(fileContent);
  const htmlContent = markdownToHtml(content);

  const linkFrom = Array.isArray(frontmatter.link_from) ? frontmatter.link_from : [];

  return (
    <div className="legacy-page-wrapper">
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Header Banner */}
        <section className="legacy-page-hero">
          <div className="legacy-page-hero-inner">
            <div className="legacy-page-badge">
              <span>Legacy Content from genetargeting.com</span>
            </div>
            <h1 className="legacy-page-title">{String(frontmatter.title || slug)}</h1>
            {frontmatter.legacy_url && (
              <p className="legacy-page-origin">
                Content preserved from legacy site • Originally at{' '}
                <a
                  href={String(frontmatter.legacy_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legacy-page-origin-link"
                >
                  {String(frontmatter.legacy_url)}
                </a>
              </p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="legacy-page-content-section">
          <div className="legacy-page-content-inner">
            <div
              className="legacy-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </section>

        {/* Back to New Page CTA */}
        {frontmatter.new_build_url && (
          <section className="legacy-page-cta-section">
            <div className="legacy-page-cta-inner">
              <p className="legacy-page-cta-text">
                View our updated page with the latest information:
              </p>
              <Link
                href={String(frontmatter.new_build_url)}
                className="legacy-page-cta-button"
              >
                <span>View Updated Page</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        )}

        {/* Related Legacy Pages */}
        {linkFrom.length > 0 && (
          <section className="legacy-page-related-section">
            <div className="legacy-page-related-inner">
              <h3 className="legacy-page-related-heading">Related Pages</h3>
              <div className="legacy-page-related-links">
                {linkFrom.map((link: string, i: number) => (
                  <Link key={i} href={link} className="legacy-page-related-link">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <UXUIDCFooter />
    </div>
  );
}
