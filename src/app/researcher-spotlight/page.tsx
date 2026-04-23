import type { Metadata } from 'next';
import { getPublishedSpotlights } from '@/content/spotlights';
import SpotlightIndexCard from '@/components/UXUIDC/spotlight/SpotlightIndexCard';

const CANONICAL = 'https://www.genetargeting.com/researcher-spotlight/';

export const metadata: Metadata = {
  title: 'Researcher Spotlight | ingenious targeting laboratory',
  description:
    'Featured scientists whose published work used ITL custom mouse models. Each spotlight documents the research question, the model strategy, and what the work reveals.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    url: CANONICAL,
    siteName: 'ingenious targeting laboratory',
    title: 'Researcher Spotlight | ingenious targeting laboratory',
    description:
      'Featured scientists whose published work used ITL custom mouse models.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Researcher Spotlight | ingenious targeting laboratory',
    description:
      'Featured scientists whose published work used ITL custom mouse models.',
  },
};

export default function ResearcherSpotlightIndexPage() {
  const spotlights = getPublishedSpotlights();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Researcher Spotlight',
    description:
      'Featured scientists whose published work used ITL custom mouse models.',
    url: CANONICAL,
    isPartOf: {
      '@type': 'WebSite',
      name: 'ingenious targeting laboratory',
      url: 'https://www.genetargeting.com',
    },
    hasPart: spotlights.map((s) => ({
      '@type': 'Article',
      headline: s.title.replace(/<\/?em>/g, ''),
      url: `https://www.genetargeting.com/researcher-spotlight/${s.slug}`,
      datePublished: s.publishDate,
      author: {
        '@type': 'Person',
        name: s.piName,
        affiliation: s.institution,
      },
    })),
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
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <section className="spotlight-index-hero">
        <div className="spotlight-container">
          <div className="spotlight-index-hero-grid">
            <div>
              <div className="spotlight-hero-label">
                <span>Series</span>
                <span className="spotlight-thin-rule" aria-hidden="true" />
              </div>
              <h1>Researcher Spotlight</h1>
            </div>
            <p>
              Scientists whose published work used ITL custom mouse models. Each feature
              documents the research question, the model strategy, and what the work reveals.
            </p>
          </div>
        </div>
      </section>

      <section className="spotlight-index-list" aria-label="Featured spotlights">
        <div className="spotlight-container">
          {spotlights.map((spotlight) => (
            <SpotlightIndexCard key={spotlight.slug} spotlight={spotlight} />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
