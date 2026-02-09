/**
 * Blog Utilities for Legacy Ingenious Blog
 * 
 * Functions for reading and processing archived blog posts
 */

import fs from 'fs';
import path from 'path';
import { BlogPost, BlogPostMeta, BlogFrontmatter, BlogCategory } from './types';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');

/**
 * Parse frontmatter from markdown file content
 */
function parseFrontmatter(fileContent: string): { data: BlogFrontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return {
      data: { title: 'Untitled', legacy_url: '' },
      content: fileContent,
    };
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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Handle arrays
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

  return {
    data: data as unknown as BlogFrontmatter,
    content,
  };
}

/**
 * Validate and normalize category
 */
function normalizeCategory(category?: string): BlogCategory {
  const validCategories: BlogCategory[] = [
    'Technical Guide',
    'Educational',
    'Industry Insights',
    'Company News',
    'Research Spotlight',
    'Selection Guide',
    'Protocol',
    'General',
  ];

  if (category && validCategories.includes(category as BlogCategory)) {
    return category as BlogCategory;
  }

  return 'General';
}

/**
 * Get all blog post slugs
 */
export function getAllBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOG_CONTENT_DIR);
    return files
      .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
      .map((file) => file.replace('.md', ''));
  } catch {
    return [];
  }
}

/**
 * Get all blog posts metadata (for index page)
 */
export function getAllBlogPostsMeta(): BlogPostMeta[] {
  const slugs = getAllBlogSlugs();

  const posts: BlogPostMeta[] = [];
  
  for (const slug of slugs) {
    const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = parseFrontmatter(fileContent);

      posts.push({
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date,
        category: normalizeCategory(data.category),
        description: data.description,
        legacy_url: data.legacy_url || `https://www.genetargeting.com/ingenious-blog/${slug}`,
      });
    } catch {
      // Skip files that can't be read
    }
  }

  return posts
    .sort((a, b) => {
      // Sort by date descending, then by title
      if (a.date && b.date) {
        return b.date.localeCompare(a.date);
      }
      if (a.date) return -1;
      if (b.date) return 1;
      return a.title.localeCompare(b.title);
    });
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date,
      category: normalizeCategory(data.category),
      description: data.description,
      legacy_url: data.legacy_url || `https://www.genetargeting.com/ingenious-blog/${slug}`,
      content,
      tags: Array.isArray(data.tags) ? data.tags : undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Get blog posts grouped by category
 */
export function getBlogPostsByCategory(): Record<BlogCategory, BlogPostMeta[]> {
  const posts = getAllBlogPostsMeta();
  const grouped: Record<BlogCategory, BlogPostMeta[]> = {
    'Technical Guide': [],
    Educational: [],
    'Industry Insights': [],
    'Company News': [],
    'Research Spotlight': [],
    'Selection Guide': [],
    Protocol: [],
    General: [],
  };

  for (const post of posts) {
    grouped[post.category].push(post);
  }

  return grouped;
}

/**
 * Check if blog content directory exists
 */
export function blogContentExists(): boolean {
  return fs.existsSync(BLOG_CONTENT_DIR);
}
