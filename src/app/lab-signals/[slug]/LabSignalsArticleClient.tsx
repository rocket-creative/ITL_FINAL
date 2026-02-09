'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NewsletterGate, SocialShare } from '@/components/UXUIDC';
import type { NewsletterArticle } from '@/data/newsletterArticles';
import fixArticleLinks from '@/utils/fixArticleLinks';

gsap.registerPlugin(ScrollTrigger);

// Lab Signals colors
const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  mediumGray: '#888888',
  darkGray: '#333333',
  textGray: '#444444',
};

interface LabSignalsArticleClientProps {
  article: NewsletterArticle;
  articleUrl: string;
}

export default function LabSignalsArticleClient({
  article,
  articleUrl,
}: LabSignalsArticleClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const createPreview = () => {
    const textContent = article.body
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 500);
    return <p style={{ color: BRAND.textGray, fontFamily: 'Lato, sans-serif', lineHeight: 1.9, fontSize: '1.1rem' }}>{textContent}...</p>;
  };

  return (
    <section ref={contentRef} style={{ backgroundColor: BRAND.white, padding: '50px 20px 60px' }}>
      {/* Social Share */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '35px',
        paddingBottom: '20px',
        borderBottom: `1px solid ${BRAND.lightGray}`,
      }}>
        <SocialShare
          url={articleUrl}
          title={article.title}
          description={article.description}
        />
      </div>

      {/* Gated Content */}
      <NewsletterGate
        articleTitle={article.title}
        previewContent={createPreview()}
      >
        <article
          className="lab-signals-article"
          dangerouslySetInnerHTML={{ __html: fixArticleLinks(article.body) }}
        />

        <div style={{
          marginTop: '50px',
          paddingTop: '30px',
          borderTop: `1px solid ${BRAND.lightGray}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
        }}>
          <span style={{
            fontSize: '.7rem',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            color: BRAND.black,
            backgroundColor: BRAND.gold,
            padding: '5px 14px',
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
          }}>
            {article.category}
          </span>
          <SocialShare
            url={articleUrl}
            title={article.title}
            description={article.description}
            showRss={false}
          />
        </div>
      </NewsletterGate>

      {/* Article Typography Styles */}
      <style jsx global>{`
        .lab-signals-article {
          font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1.05rem;
          line-height: 2;
          color: ${BRAND.textGray};
          max-width: 100%;
          letter-spacing: 0.01em;
          word-spacing: 0.05em;
        }
        
        /* Headings */
        .lab-signals-article h1,
        .lab-signals-article h2,
        .lab-signals-article h3,
        .lab-signals-article h4,
        .lab-signals-article h5,
        .lab-signals-article h6 {
          font-family: 'Poppins', sans-serif;
          color: ${BRAND.black};
          line-height: 1.4;
          margin-top: 2.5em;
          margin-bottom: 1em;
          letter-spacing: -0.01em;
        }
        .lab-signals-article h1 { 
          font-size: 1.9rem; 
          font-weight: 700; 
        }
        .lab-signals-article h2 { 
          font-size: 1.5rem; 
          font-weight: 600;
          padding-bottom: 0.5em;
          border-bottom: 2px solid ${BRAND.gold};
        }
        .lab-signals-article h3 { 
          font-size: 1.3rem; 
          font-weight: 600; 
        }
        .lab-signals-article h4 { 
          font-size: 1.15rem; 
          font-weight: 600; 
        }
        .lab-signals-article h5 { 
          font-size: 1rem; 
          font-weight: 600; 
        }
        
        /* Paragraphs */
        .lab-signals-article p {
          margin-bottom: 1.6em;
          color: ${BRAND.textGray};
        }
        
        /* Lists */
        .lab-signals-article ul,
        .lab-signals-article ol {
          margin-bottom: 1.6em;
          padding-left: 1.8em;
          color: ${BRAND.textGray};
        }
        .lab-signals-article li { 
          margin-bottom: 0.7em;
          line-height: 1.9;
        }
        .lab-signals-article li::marker {
          color: ${BRAND.gold};
        }
        
        /* Links */
        .lab-signals-article a {
          color: #0066cc;
          text-decoration: underline;
          text-decoration-color: rgba(0, 102, 204, 0.3);
          text-underline-offset: 3px;
          transition: all 0.2s ease;
        }
        .lab-signals-article a:hover { 
          color: #004499;
          text-decoration-color: #004499;
        }
        
        /* Bold/Strong */
        .lab-signals-article strong,
        .lab-signals-article b {
          font-weight: 600;
          color: ${BRAND.black};
        }
        
        /* Italics */
        .lab-signals-article em,
        .lab-signals-article i {
          font-style: italic;
        }
        
        /* Blockquotes */
        .lab-signals-article blockquote {
          border-left: 4px solid ${BRAND.gold};
          padding: 1em 1.5em;
          margin: 2em 0;
          background-color: ${BRAND.lightGray};
          border-radius: 0 8px 8px 0;
          color: ${BRAND.darkGray};
          font-style: italic;
        }
        .lab-signals-article blockquote p {
          margin-bottom: 0;
        }
        
        /* Superscript (citations) */
        .lab-signals-article sup {
          font-size: 0.75em;
          vertical-align: super;
          color: #0066cc;
        }
        
        /* Images */
        .lab-signals-article img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2em 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        /* Tables */
        .lab-signals-article table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
          font-size: 0.95rem;
        }
        .lab-signals-article th,
        .lab-signals-article td {
          border: 1px solid #ddd;
          padding: 14px 16px;
          text-align: left;
        }
        .lab-signals-article th {
          background-color: ${BRAND.lightGray};
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          color: ${BRAND.black};
        }
        .lab-signals-article tr:nth-child(even) {
          background-color: #fafafa;
        }
        
        /* Horizontal rules */
        .lab-signals-article hr {
          border: none;
          border-top: 2px solid ${BRAND.lightGray};
          margin: 3em 0;
        }
        
        /* Code */
        .lab-signals-article code {
          background-color: ${BRAND.lightGray};
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 0.9em;
        }
        .lab-signals-article pre {
          background-color: #1a1a1a;
          color: #e8e8e8;
          padding: 1.5em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2em 0;
        }
        .lab-signals-article pre code {
          background: none;
          padding: 0;
        }
        
        /* First paragraph after heading - no extra margin */
        .lab-signals-article h1 + p,
        .lab-signals-article h2 + p,
        .lab-signals-article h3 + p,
        .lab-signals-article h4 + p {
          margin-top: 0;
        }
        
        /* Citation markers - styled superscripts for references */
        .lab-signals-article .citation-marker {
          font-size: 0.7em;
          color: ${BRAND.mediumGray};
          vertical-align: super;
          font-weight: 600;
          background: ${BRAND.lightGray};
          padding: 1px 4px;
          border-radius: 3px;
          margin: 0 1px;
          cursor: default;
        }
        
        /* Legacy reference class */
        .lab-signals-article .reference {
          font-size: 0.7em;
          color: ${BRAND.mediumGray};
          vertical-align: super;
          font-weight: 600;
          background: ${BRAND.lightGray};
          padding: 1px 4px;
          border-radius: 3px;
          margin: 0 1px;
        }
        
        /* Article series links */
        .lab-signals-article .article-series-link {
          color: #0066cc;
          text-decoration: underline;
          text-decoration-color: rgba(0, 102, 204, 0.3);
          text-underline-offset: 3px;
          font-weight: 500;
        }
        .lab-signals-article .article-series-link:hover {
          color: #004499;
          text-decoration-color: #004499;
        }
      `}</style>
    </section>
  );
}
