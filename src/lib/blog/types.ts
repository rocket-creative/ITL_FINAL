/**
 * Blog Types for Legacy Ingenious Blog
 * 
 * Type definitions for archived blog posts from genetargeting.com
 */

export interface BlogPost {
  /** URL-friendly identifier */
  slug: string;
  
  /** Post title */
  title: string;
  
  /** Publication date (YYYY-MM-DD format) */
  date?: string;
  
  /** Post category for grouping */
  category: BlogCategory;
  
  /** Brief description/excerpt */
  description?: string;
  
  /** Original legacy URL */
  legacy_url: string;
  
  /** Markdown content body */
  content: string;
  
  /** Related topic tags */
  tags?: string[];
}

export type BlogCategory =
  | 'Technical Guide'
  | 'Educational'
  | 'Industry Insights'
  | 'Company News'
  | 'Research Spotlight'
  | 'Selection Guide'
  | 'Protocol'
  | 'General';

export interface BlogPostMeta {
  /** URL-friendly identifier */
  slug: string;
  
  /** Post title */
  title: string;
  
  /** Publication date */
  date?: string;
  
  /** Post category */
  category: BlogCategory;
  
  /** Brief description/excerpt */
  description?: string;
  
  /** Original legacy URL */
  legacy_url: string;
}

export interface BlogFrontmatter {
  title: string;
  date?: string;
  category?: string;
  description?: string;
  legacy_url: string;
  tags?: string[];
}
