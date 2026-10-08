import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CatalogReadyToShipBanner from '@/components/catalog/CatalogReadyToShipBanner';
import { availabilityLabel } from '@/lib/catalog/availability';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Catalog hero preview',
  robots: { index: false, follow: false },
};

const PREVIEW_GENES = ['Trp53', 'Apc', 'Egfr', 'Cd274'] as const;

type CatalogModel = {
  id?: string | number;
  geneName: string;
  modelAbbrev?: string;
  modelType?: string;
  availability?: string;
  catalogNumber?: string;
};

async function loadGene(gene: string): Promise<CatalogModel[]> {
  const res = await fetch(
    `https://www.genetargeting.com/api/catalog/?q=${encodeURIComponent(gene)}&limit=100`,
    { cache: 'no-store' },
  );
  if (!res.ok) return [];
  const data = (await res.json()) as { models?: CatalogModel[] };
  return (data.models ?? []).filter((model) => model.geneName === gene);
}

type Props = { searchParams: Promise<{ gene?: string }> };

export default async function CatalogHeroPreviewPage({ searchParams }: Props) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { gene: requested } = await searchParams;
  const gene = PREVIEW_GENES.includes(requested as (typeof PREVIEW_GENES)[number])
    ? (requested as string)
    : 'Trp53';
  const models = await loadGene(gene);

  return (
    <main>
      <section
        className="page-hero px-5 pb-12 pt-14 md:pb-[60px] md:pt-20"
        style={{ background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '.85rem', marginBottom: '18px' }}>
            Local preview. Forms come from the live catalog availability for this gene.
          </p>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
            {PREVIEW_GENES.map((name) => (
              <Link
                key={name}
                href={`/dev/catalog-hero/?gene=${encodeURIComponent(name)}`}
                style={{
                  color: name === gene ? '#0a253c' : '#fff',
                  background: name === gene ? '#00d4d4' : 'transparent',
                  border: '1px solid rgba(0,212,212,0.7)',
                  borderRadius: '999px',
                  padding: '6px 12px',
                  fontWeight: 700,
                  fontSize: '.85rem',
                  textDecoration: 'none',
                }}
              >
                {name}
              </Link>
            ))}
          </nav>
          {models.length > 0 ? (
            <CatalogReadyToShipBanner availabilities={models.map((model) => model.availability)} />
          ) : null}
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.65rem, 5vw, 2.8rem)',
              fontWeight: 700,
              color: '#fff',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {gene} mouse models
          </h1>
        </div>
      </section>
      <section style={{ background: '#fff', padding: '40px 20px 64px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#0a253c', fontSize: '1.3rem', marginTop: 0 }}>
            Availability rows used for this hero
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {models.map((model, index) => (
              <li
                key={`${model.catalogNumber ?? model.id ?? index}`}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px 16px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <span style={{ fontWeight: 700, color: '#0a253c' }}>{model.modelAbbrev || gene}</span>
                <span style={{ color: '#134978' }}>{model.modelType}</span>
                <span style={{ color: '#555' }}>{availabilityLabel(model.availability)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
