import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPublishedSpotlights,
  getSpotlightBySlug,
} from '@/content/spotlights';
import {
  SpotlightHero,
  SpotlightCitation,
  SpotlightBody,
  SpotlightModelSection,
  SpotlightResearcherCard,
  SpotlightFooterCTA,
} from '@/components/UXUIDC/spotlight';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';

export async function generateStaticParams() {
  return getPublishedSpotlights().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const spotlight = getSpotlightBySlug(slug);

  if (!spotlight || spotlight.status !== 'published') {
    return {
      title: 'Spotlight Not Found',
      description: 'The requested researcher spotlight could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.genetargeting.com/researcher-spotlight/${spotlight.slug}/`;
  const description = spotlight.metaDescription;

  return {
    title: spotlight.metaTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      siteName: 'ingenious targeting laboratory',
      title: spotlight.metaTitle,
      description,
      publishedTime: spotlight.publishDate,
      authors: [spotlight.piName],
    },
    twitter: {
      card: 'summary_large_image',
      title: spotlight.metaTitle,
      description,
    },
  };
}

export default async function SpotlightPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const spotlight = getSpotlightBySlug(slug);

  if (!spotlight || spotlight.status !== 'published') {
    notFound();
  }

  const canonical = `https://www.genetargeting.com/researcher-spotlight/${spotlight.slug}/`;
  const cleanTitle = spotlight.title.replace(/<\/?em>/g, '');
  const cleanCitation = spotlight.paperCitation.replace(/<\/?em>/g, '');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cleanTitle,
    description: spotlight.metaDescription,
    author: {
      '@type': 'Person',
      name: spotlight.piName,
      affiliation: {
        '@type': 'Organization',
        name: spotlight.institution,
        url: spotlight.institutionLink,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'ingenious targeting laboratory',
      url: 'https://www.genetargeting.com',
    },
    datePublished: spotlight.publishDate,
    dateModified: spotlight.publishDate,
    mainEntityOfPage: canonical,
    url: canonical,
    citation: cleanCitation,
    isPartOf: {
      '@type': 'CreativeWorkSeries',
      name: 'Researcher Spotlight',
      url: 'https://www.genetargeting.com/researcher-spotlight/',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.genetargeting.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Researcher Spotlight',
        item: 'https://www.genetargeting.com/researcher-spotlight/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${spotlight.piLastName} Spotlight`,
        item: canonical,
      },
    ],
  };

  return (
    <article>
      <SpotlightHero spotlight={spotlight} />

      {/* Top dual-path CTA */}
      <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta slug="researcher-spotlight" utmMedium="page-hero" flush />
        </div>
      </section>

      <SpotlightCitation spotlight={spotlight} />
      <SpotlightBody spotlight={spotlight} />
      <SpotlightModelSection spotlight={spotlight} />
      <SpotlightResearcherCard spotlight={spotlight} />
      <SpotlightFooterCTA modelType={spotlight.modelType} />

      {/* Bottom dual-path CTA */}
      <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta slug="researcher-spotlight" utmMedium="page-closing" flush />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </article>
  );
}
