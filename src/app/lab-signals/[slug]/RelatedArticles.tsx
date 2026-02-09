'use client';

import Link from 'next/link';

const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  mediumGray: '#888888',
  darkGray: '#444444',
};

interface RelatedArticle {
  slug: string;
  category: string;
  title: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  categoryName: string;
}

export default function RelatedArticles({ articles, categoryName }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section style={{ backgroundColor: BRAND.lightGray, padding: '50px 20px' }}>
      <div>
        <h3 style={{
          color: BRAND.black,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 600,
          marginBottom: '25px',
        }}>
          More in {categoryName}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '20px',
        }}>
          {articles.map((related) => (
            <Link
              key={related.slug}
              href={`/lab-signals/${related.slug}`}
              style={{
                display: 'block',
                backgroundColor: BRAND.white,
                padding: '20px',
                borderRadius: '8px',
                textDecoration: 'none',
                borderLeft: `4px solid ${BRAND.gold}`,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{
                display: 'inline-block',
                fontSize: '.65rem',
                fontWeight: 500,
                fontFamily: 'Poppins, sans-serif',
                color: BRAND.mediumGray,
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {related.category}
              </span>
              <h4 style={{
                color: BRAND.black,
                fontFamily: 'Lato, sans-serif',
                fontSize: '.95rem',
                fontWeight: 400,
                lineHeight: 1.5,
                marginBottom: '10px',
                letterSpacing: '0.01em',
              }}>
                {related.title}
              </h4>
              <span style={{ 
                color: BRAND.darkGray, 
                fontFamily: 'Poppins, sans-serif',
                fontSize: '.75rem', 
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}>
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
