/**
 * /live-humanized-mice
 * Every catalog model with model type Humanized and availability Live.
 * Founder-only F0/F1 lines are excluded. HTML is the indexable list.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { getLiveHumanizedModels, isUrlSafeGeneName } from '@/lib/catalog/serverCatalog';
import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import { buildStandalonePageMetadata } from '@/lib/seo';
import { BASE_URL } from '@/lib/seo/types';
import { UXUIDCNavigation, UXUIDCFooter, CatalogCustomDualCta, BreadcrumbSchema, FAQPageSchema, UXUIDCAnimatedFAQ } from '@/components/UXUIDC';
import { IconLayers } from '@/components/UXUIDC/Icons';
import LiveHumanizedInventory from './LiveHumanizedInventory';

export const revalidate = 86400;

const PATH = '/live-humanized-mice';
const PAGE_URL = `${BASE_URL}${PATH}/`;

function geneHref(geneName: string): string | null {
  const gene = geneName.trim();
  if (!isUrlSafeGeneName(gene)) return null;
  return `/all-catalog-mouse-models/gene/${encodeURIComponent(gene)}/`;
}

function absolute(path: string): string {
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function faqsFor(count: number) {
  const listed = count.toLocaleString();
  return [
    {
      question: 'How many live humanized mouse models are available?',
      answer: `ingenious targeting laboratory has ${listed} humanized mouse models with Live availability. Live means an established colony that ships as live animals. This page lists every one of them from the catalog database.`,
    },
    {
      question: 'What does Live availability mean for a humanized mouse?',
      answer:
        'Live means an established colony, ready to ship as live animals. Sperm cryopreservation, embryo cryopreservation, and In Development are not on this page. F0 Live and F1 Live are founder animals still being established, so they are excluded.',
    },
    {
      question: 'How do I order a live humanized mouse?',
      answer:
        'Each row has an ingenious targeting laboratory catalog number and an Order link. The order form opens with that model and catalog number filled in. A quote is returned within 24 hours.',
    },
    {
      question: 'Can you generate a humanized mouse that is not on this list?',
      answer:
        'Yes. This list is only the humanized lines that already have a live colony. Any other humanized allele is a custom model generation project, with a 100% germline transmission guarantee.',
    },
  ];
}

function orderPath(model: ServerCatalogModel): string {
  const name = model.modelAbbrev || model.geneName;
  return `/order-catalog-models/?model=${encodeURIComponent(name)}&catalog=${encodeURIComponent(model.catalogNumber)}`;
}

function collectionSchema(models: ServerCatalogModel[], countLabel: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': PAGE_URL,
        url: PAGE_URL,
        name: `${countLabel} live humanized mice ready to ship`,
        headline: `${countLabel} live humanized mice ready to ship`,
        description: `${countLabel} humanized mouse models with Live availability, ready to ship from established colonies at ingenious targeting laboratory.`,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}/#website`, name: 'ingenious targeting laboratory', url: `${BASE_URL}/` },
        about: { '@type': 'Thing', name: 'Humanized mouse models' },
        mainEntity: { '@id': `${PAGE_URL}#models` },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#live-humanized-answer'],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${PAGE_URL}#models`,
        name: `${countLabel} live humanized mice ready to ship`,
        numberOfItems: models.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: models.map((model, index) => {
          const href = geneHref(model.geneName);
          return {
            '@type': 'ListItem',
            position: index + 1,
            name: `${model.modelAbbrev} (${model.catalogNumber})`,
            url: absolute(href ?? orderPath(model)),
          };
        }),
      },
    ],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const models = await getLiveHumanizedModels();
  const countLabel = models.length.toLocaleString();
  return buildStandalonePageMetadata({
    path: PATH,
    title: `${countLabel} Live Humanized Mice Ready to Ship`,
    description: `${countLabel} humanized mouse models with Live availability, ready to ship from established colonies. Search by catalog number, model, or gene.`,
  });
}

export default async function LiveHumanizedMicePage() {
  const models = await getLiveHumanizedModels();
  const countLabel = models.length.toLocaleString();
  const faqs = faqsFor(models.length);
  const rows = models.map((model) => ({
    id: model.id,
    geneName: model.geneName,
    modelAbbrev: model.modelAbbrev,
    catalogNumber: model.catalogNumber,
    category: model.category,
    geneHref: geneHref(model.geneName),
  }));

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Catalog Models', path: '/catalog-mouse-models' },
          { name: 'Live Humanized Mice', path: PATH },
        ]}
      />
      <FAQPageSchema faqs={faqs} path={PATH} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema(models, countLabel)) }}
      />

      <main id="main-content">
        <section className="page-hero">
          <div className="page-hero-inner">
            <div className="page-hero-badge">
              <IconLayers size={14} color="#00d4d4" />
              <span style={{ color: '#fff', fontSize: '.8rem', fontWeight: 500 }}>
                {countLabel} live · model type Humanized
              </span>
            </div>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.45)' }}>›</li>
                <li><Link href="/catalog-mouse-models/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Catalog Models</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.45)' }}>›</li>
                <li style={{ color: '#fff' }}>Live Humanized Mice</li>
              </ol>
            </nav>
            <h1 className="page-hero-title">
              {countLabel} Live Humanized Mice Ready to Ship
            </h1>
            <p id="live-humanized-answer" className="page-hero-intro">
              ingenious targeting laboratory has {countLabel} humanized mouse models with Live availability. Live means an established colony that ships as live animals. This page lists every one of them from the catalog database.
            </p>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '40px 20px' }} className="min-[810px]:!py-[60px]" aria-labelledby="live-inventory-heading">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="live-inventory-heading" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.35rem, 3.5vw, 2rem)', fontWeight: 700, color: '#2384da', margin: '0 0 12px', lineHeight: 1.25 }}>
              Which humanized mice are live and ready to ship?
            </h2>
            <p style={{ color: '#666', fontSize: '.9rem', lineHeight: '1.6rem', maxWidth: '760px', marginTop: 0 }}>
              Model type is Humanized. Availability is Live. Sperm, embryo, developing, and founder-only lines are not included. Each gene name links to that gene&apos;s catalog page.
            </p>
            <LiveHumanizedInventory rows={rows} />
          </div>
        </section>

        <section id="live-humanized-faq" style={{ backgroundColor: '#f7f7f7', padding: '40px 20px' }} className="min-[810px]:!py-[60px]" aria-labelledby="live-faq-heading">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="live-faq-heading" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.35rem, 3.5vw, 2rem)', fontWeight: 700, marginBottom: '30px', textAlign: 'center', lineHeight: 1.25 }}>
              Frequently Asked Questions
            </h2>
            <UXUIDCAnimatedFAQ faqs={faqs} idPrefix="live-humanized-faq" />
            <p style={{ marginTop: '28px', marginBottom: 0, textAlign: 'center' }}>
              <Link href="/humanized-mouse-models/" style={{ color: '#008080', fontWeight: 600 }}>
                Humanized mouse model generation
              </Link>
              {' · '}
              <Link href="/humanized-immune-checkpoint-mice/" style={{ color: '#008080', fontWeight: 600 }}>
                Immune checkpoint humanized mice
              </Link>
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: '#f5f5f4', padding: '40px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <CatalogCustomDualCta slug="live-humanized-mice" utmMedium="after-inventory" flush headingLevel={2} />
          </div>
        </section>
      </main>
      <UXUIDCFooter />
    </div>
  );
}
