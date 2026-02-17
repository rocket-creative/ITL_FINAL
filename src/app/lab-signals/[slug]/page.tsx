import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { FlodeskForm } from '@/components/UXUIDC';
import { 
  getArticleBySlug, 
  getArticleBySlugIncludingStaged,
  getAllArticleSlugs,
  getPublishedArticles 
} from '@/data/newsletterArticles';
import LabSignalsArticleClient from './LabSignalsArticleClient';
import RelatedArticles from './RelatedArticles';
import ServiceLink from './ServiceLink';

// Lab Signals colors - gold, black, grey, white only
const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  mediumGray: '#888888',
  darkGray: '#444444',
};

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each article
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Lab Signals',
      description: 'The requested article could not be found.',
    };
  }

  const ogImageUrl = `https://www.genetargeting.com/api/og?line1=${encodeURIComponent(article.title.slice(0, 60))}&line2=Lab%20Signals%20by%20iTL&line3=${encodeURIComponent(article.category)}`;

  return {
    title: `${article.title} | Lab Signals`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      siteName: 'Lab Signals',
      url: `https://www.genetargeting.com/lab-signals/${article.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
    },
    alternates: {
      types: {
        'application/rss+xml': '/api/rss/lab-signals',
      },
    },
  };
}

// Get related articles (published only)
function getRelatedArticles(currentSlug: string, category: string) {
  return getPublishedArticles()
    .filter(a => a.slug !== currentSlug)
    .filter(a => a.category === category)
    .slice(0, 3)
    .map(a => ({ slug: a.slug, category: a.category, title: a.title }));
}

function isPreviewValid(preview: string | string[] | undefined): boolean {
  const token = Array.isArray(preview) ? preview[0] : preview;
  return token === 'itl-team-preview';
}

export default async function LabSignalsArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const isPreview = isPreviewValid(preview);

  const article = isPreview
    ? getArticleBySlugIncludingStaged(slug)
    : getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, article.category);
  const articleUrl = `https://www.genetargeting.com/lab-signals/${article.slug}`;

  return (
    <div style={{ backgroundColor: BRAND.white }}>
      {/* Page wrapper - 1200px max */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Article Header */}
        <section style={{ backgroundColor: BRAND.lightGray, padding: '30px 20px 40px' }}>
          {/* Back Link */}
          <Link
            href="/lab-signals"
            style={{
              color: BRAND.darkGray,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.85rem',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '25px',
            }}
          >
            ← Back to Lab Signals
          </Link>

          {/* Category */}
          <div style={{ marginBottom: '15px' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '.7rem',
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              color: BRAND.black,
              backgroundColor: BRAND.gold,
              padding: '6px 16px',
              borderRadius: '15px',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
            }}>
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            color: BRAND.black,
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '15px',
            maxWidth: '900px',
          }}>
            {article.title}
          </h1>

          {article.subtitle && (
            <p style={{
              color: BRAND.mediumGray,
              fontFamily: 'Lato, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.5,
            }}>
              {article.subtitle}
            </p>
          )}
        </section>

        {/* Article Content */}
        <LabSignalsArticleClient 
          article={article}
          articleUrl={articleUrl}
          isPreview={isPreview}
        />

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} categoryName={article.category} />

        {/* Related Service */}
        {article.relatedPage && <ServiceLink href={article.relatedPage} />}

        {/* Newsletter CTA */}
        <section style={{ backgroundColor: BRAND.gold, padding: '55px 20px' }}>
          <div style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{
              color: BRAND.black,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              fontWeight: 700,
              marginBottom: '10px',
            }}>
              Get More Research Insights
            </h3>
            <p style={{ 
              color: 'rgba(0,0,0,0.7)', 
              fontFamily: 'Lato, sans-serif',
              fontSize: '.9rem', 
              marginBottom: '25px',
              lineHeight: 1.6,
            }}>
              Subscribe for biweekly updates on mouse model research.
            </p>
            <FlodeskForm />
            
            {/* Back to Ingenious Button */}
            <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid rgba(0,0,0,0.15)' }}>
              <Link
                href="/"
                className="hover:bg-black hover:text-white transition-all duration-200"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: BRAND.white,
                  color: BRAND.black,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: `2px solid ${BRAND.black}`,
                }}
              >
                ← Back to Ingenious
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
