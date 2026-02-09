/**
 * Legacy Page Utilities
 * Utilities for working with legacy page content
 */

import fs from 'fs';
import path from 'path';
import { LegacyPageContent, LegacyRedirect } from './types';

const LEGACY_CONTENT_DIR = path.join(process.cwd(), 'src/content/legacy');

/**
 * Parse frontmatter from a markdown file
 */
function parseFrontmatter(content: string): { meta: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { meta: {}, content };
  }
  
  const frontmatterText = match[1];
  const bodyContent = content.slice(match[0].length);
  
  const meta: Record<string, unknown> = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: string | string[] = line.slice(colonIndex + 1).trim();
      
      // Handle quoted strings
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays
      if (value.startsWith('[')) {
        try {
          value = JSON.parse(value);
        } catch {
          // Keep as string if parsing fails
        }
      }
      
      meta[key] = value;
    }
  });
  
  return { meta, content: bodyContent };
}

/**
 * Get a legacy page by its slug
 */
export async function getLegacyPage(slug: string): Promise<LegacyPageContent | null> {
  try {
    const filePath = path.join(LEGACY_CONTENT_DIR, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { meta, content } = parseFrontmatter(fileContent);
    
    return {
      meta: {
        legacyUrl: (meta.legacy_url as string) || '',
        newBuildUrl: (meta.new_build_url as string) || '',
        urlHandling: (meta.url_handling as string) || 'reuse',
        linkFrom: (meta.link_from as string[]) || [],
        extractedDate: (meta.extracted_date as string) || '',
        title: (meta.title as string) || undefined,
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading legacy page ${slug}:`, error);
    return null;
  }
}

/**
 * List all available legacy pages
 */
export async function listLegacyPages(): Promise<string[]> {
  try {
    if (!fs.existsSync(LEGACY_CONTENT_DIR)) {
      return [];
    }
    
    const files = fs.readdirSync(LEGACY_CONTENT_DIR);
    return files
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Error listing legacy pages:', error);
    return [];
  }
}

/**
 * Generate the redirect configuration for Next.js
 * This reads from a pre-generated redirects.json file
 */
export function getLegacyRedirects(): LegacyRedirect[] {
  try {
    const redirectsPath = path.join(process.cwd(), 'src/lib/legacy/redirects.json');
    
    if (!fs.existsSync(redirectsPath)) {
      console.warn('Legacy redirects.json not found');
      return [];
    }
    
    const redirectsContent = fs.readFileSync(redirectsPath, 'utf-8');
    return JSON.parse(redirectsContent);
  } catch (error) {
    console.error('Error reading legacy redirects:', error);
    return [];
  }
}
