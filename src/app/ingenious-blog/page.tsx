import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCStartProjectCTA,
} from '@/components/UXUIDC';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Ingenious Blog Archive | Legacy Articles | ITL',
  description:
    'Browse our archive of technical articles, educational guides, and research insights from the original ingenious targeting laboratory blog.',
};

interface BlogPostMeta {
  slug: string;
  title: string;
  category: string;
  date?: string;
}

// Parse frontmatter from markdown file
function parseFrontmatter(content: string): Record<string, string> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const data: Record<string, string> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return data;
}

// Get all blog posts metadata
function getAllBlogPosts(): BlogPostMeta[] {
  const blogDir = path.join(process.cwd(), 'src/content/blog');

  try {
    const files = fs.readdirSync(blogDir);

    return files
      .filter((file) => file.endsWith('.md') && !file.startsWith('_') && file !== 'README.md')
      .map((file) => {
        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = parseFrontmatter(content);

        return {
          slug: file.replace('.md', ''),
          title: data.title || file.replace('.md', '').replace(/-/g, ' '),
          category: data.category || 'General',
          date: data.date,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch {
    return [];
  }
}

export default function IngeniousBlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #134978 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <span style={{ fontSize: '14px' }}>📁</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.8rem', fontWeight: 500 }}>
                Archived Content
              </span>
            </div>
            <h1
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.8rem',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Ingenious Blog Archive
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1.1rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
                maxWidth: '700px',
              }}
            >
              Browse our archive of {blogPosts.length} technical articles, educational guides, and
              research insights from the original ingenious targeting laboratory blog.
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '.85rem',
                fontWeight: 400,
                marginTop: '15px',
              }}
            >
              Note: This content has been preserved from our legacy site. Some information may be
              outdated.
            </p>
          </div>
        </section>

        {/* Client-side interactive filtering */}
        <BlogIndexClient blogPosts={blogPosts} />

        {/* Current Resources Link */}
        <section style={{ backgroundColor: '#f0f9f9', padding: '40px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h3
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Looking for Current Resources?
            </h3>
            <p style={{ color: '#666', fontSize: '.95rem', marginBottom: '20px' }}>
              Visit our updated Lab Signals page for the latest technical guides and research
              insights.
            </p>
            <Link
              href="/lab-signals"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#008080',
                color: 'white',
                padding: '12px 24px',
                fontSize: '.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              Visit Lab Signals →
            </Link>
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
