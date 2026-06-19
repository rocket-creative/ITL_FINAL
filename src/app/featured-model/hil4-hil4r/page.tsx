import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';

const IMG = '/model-of-month-images/hil4-hil4r';
const PDF_HREF = '/downloads/hil4-hil4r-ingenious.pdf';

/** Inline icons so this page stays a Server Component (avoids client Icons + hydration issues). */
function ChevronRight({
  size = 16,
  color = '#ffffff',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function LayersIcon({
  size = 14,
  color = '#00d4d4',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

const STRAIN_ROWS: { parameter: string; detail: string }[] = [
  { parameter: 'Model name', detail: 'hIL4/hIL4R' },
  { parameter: 'Genetic background', detail: 'C57BL/6' },
  { parameter: 'Catalog number', detail: 'HU 2000106' },
  { parameter: 'Strain state', detail: 'Repository live (ready to ship)' },
  { parameter: 'Humanized genes', detail: 'IL4, IL4R' },
  { parameter: 'Zygosity', detail: 'Homozygous' },
  {
    parameter: 'Research application',
    detail: 'Immunotherapy, cancer research, drug screening',
  },
];

const WHY_BULLETS: string[] = [
  'Human IL4 ligand binding to human IL4R receptor',
  'Authentic type I receptor complex formation',
  'Proper downstream signaling through humanized pathway',
  'Normal mouse immune system architecture',
];

type FigureItem = {
  caption: string;
  body?: string;
  src: string;
  alt: string;
  maxWidth?: string;
};

const VALIDATION_FIGURES: FigureItem[] = [
  {
    caption: 'Fig.1 Analysis of hIL4 expression in serum by ELISA.',
    body: 'The homozygous KI mice express hIL4 in serum after treatment with concanavalin.',
    src: `${IMG}/validation-fig-01-hil4-elisa.png`,
    alt: 'Fig.1 Analysis of hIL4 expression in serum by ELISA.',
    maxWidth: '400px',
  },
  {
    caption: 'Fig.2 Analysis of hIL4R expression in the spleen by FACS.',
    body: 'The homozygous KI mice express hIL4R in the spleen, and the WT mice only express mIL4R.',
    src: `${IMG}/validation-fig-02-hil4r-facs.png`,
    alt: 'Fig.2 Analysis of hIL4R expression in the spleen by FACS.',
  },
  {
    caption:
      'Fig.3 Body weight and ratios of spleen, MLN and lung to body weight of WT mice and hIL4/hIL4R knockin mice. (n=5-6, female, 8-10-week-old, Mean±SEM).',
    body: 'Abbr. HO, homozygous; WT, wild type; MLN, mesenteric lymph nodes.',
    src: `${IMG}/validation-fig-03-body-weight-ratios.png`,
    alt: 'Fig.3 Body weight and ratios of spleen, MLN and lung to body weight of WT mice and hIL4/hIL4R knockin mice.',
  },
  {
    caption:
      'Fig.4 Detection of myeloid (A) and lymphocyte (B) in the blood of hIL4/hIL4R knockin mice by FACS (n=3 in all groups, 8-10-week-old).',
    body: 'Abbr. WT, wild type; HO, homozygous.',
    src: `${IMG}/validation-fig-04-blood-facs.png`,
    alt: 'Fig.4 Detection of myeloid (A) and lymphocyte (B) in the blood of hIL4/hIL4R knockin mice by FACS.',
  },
  {
    caption:
      'Fig.5 Detection of myeloid (A) and lymphocyte (B) in the spleen of hIL4/hIL4R knockin mice by FACS (n=3 in all groups, 8-10-week-old).',
    body: 'Abbr. WT, wild type; HO, homozygous.',
    src: `${IMG}/validation-fig-05-spleen-facs.png`,
    alt: 'Fig.5 Detection of myeloid (A) and lymphocyte (B) in the spleen of hIL4/hIL4R knockin mice by FACS.',
  },
  {
    caption:
      'Fig.6 Pathological analysis of hIL4/hIL4R knockin mice by H&E staining.',
    body: 'There were no obvious pathological changes in these tissues (n=3, 8-10 weeks old, 100x magnification).',
    src: `${IMG}/validation-fig-06-he-staining.png`,
    alt: 'Fig.6 Pathological analysis of hIL4/hIL4R knockin mice by H&E staining of spleen, small intestine, thymus, and mesenteric lymph nodes.',
  },
  {
    caption:
      'Table 1. Blood routine test results of Hom hIL4/hIL4R mice (Data are presented as mean and ± SEM).',
    src: `${IMG}/validation-table-01-blood-routine.png`,
    alt: 'Table 1. Blood routine test results of Hom hIL4/hIL4R mice.',
  },
  {
    caption:
      'Table 2. Biochemistry examinations results of Hom hIL4/hIL4R mice (Data are presented as mean and ± SEM).',
    src: `${IMG}/validation-table-02-biochemistry.png`,
    alt: 'Table 2. Biochemistry examinations results of Hom hIL4/hIL4R mice.',
  },
];

const CASE1_FIGURES: FigureItem[] = [
  {
    caption: 'Study timeline',
    src: `${IMG}/case1-timeline.png`,
    alt: 'Case 1 DNFB induced atopic dermatitis study timeline.',
  },
  {
    caption:
      'Case 1 — Fig.1 Body weight of DNFB-induced Atopic dermatitis Model hIL4/hIL4R mice treated with dupilumab. (*P<0.05)',
    src: `${IMG}/case1-fig-01-body-weight.png`,
    alt: 'Case 1 Fig.1 Body weight of DNFB-induced Atopic dermatitis Model hIL4/hIL4R mice treated with dupilumab.',
    maxWidth: '480px',
  },
  {
    caption:
      'Case 1 — Fig.2 Dupilumab ameliorate overall atopic dermatitis activity in DNFB-induced AD model. (*P<0.05, **P<0.01, ***P<0.001)',
    src: `${IMG}/case1-fig-02-ad-activity.png`,
    alt: 'Case 1 Fig.2 Dupilumab ameliorate overall atopic dermatitis activity in DNFB-induced AD model.',
  },
  {
    caption:
      'Case 1 — Fig.3 Dupilumab treatment significantly reduced IgE levels in serum and scratching times. (A) day10 serum IgE (B) day16 serum IgE (C) scratch times on Day 12 (D) scratch times on Day 14. (*P<0.05, **P<0.01, ***P<0.001).',
    src: `${IMG}/case1-fig-03-ige-scratching.png`,
    alt: 'Case 1 Fig.3 Dupilumab treatment significantly reduced IgE levels in serum and scratching times.',
  },
  {
    caption:
      'Case 1 — Fig.4 Dupilumab significantly mitigates inflammatory cell infiltration in lesioned skin on day 14. (A) dorsal image on day14; (B) Representative pathology images; (C) Inflammatory cell infiltration score; (D) neutrophils score; (E) eosinophils score; (F) epidermis thickness; (G) dermis thickness (*P<0.05, **P<0.01, ***P<0.001).',
    src: `${IMG}/case1-fig-04-inflammation.png`,
    alt: 'Case 1 Fig.4 Dupilumab significantly mitigates inflammatory cell infiltration in lesioned skin on day 14.',
  },
];

const CASE2_FIGURES: FigureItem[] = [
  {
    caption:
      'Case 2 — Fig.1 OXA induced AD model in hIL4/hIL4R mice. (A) body weight (B) body weight change. (n=6, Data are presented as Mean and ± SEM)',
    src: `${IMG}/case2-fig-01-body-weight.png`,
    alt: 'Case 2 Fig.1 OXA induced AD model in hIL4/hIL4R mice.',
  },
  {
    caption:
      'Case 2 — Fig.2 OXA induced AD model in hIL4/hIL4R mice. (A) gross observation on Day 21; (B) ear thickness (C) clinical score of skin.',
    src: `${IMG}/case2-fig-02-gross-ear-score.png`,
    alt: 'Case 2 Fig.2 OXA induced AD model in hIL4/hIL4R mice.',
  },
  {
    caption:
      'Case 2 — Fig.3 OXA induced AD model in hIL4/hIL4R mice. (A) serum IgE (B) spleen weight.',
    src: `${IMG}/case2-fig-03-ige-spleen.png`,
    alt: 'Case 2 Fig.3 OXA induced AD model in hIL4/hIL4R mice.',
  },
  {
    caption:
      'Case 2 — Fig.4 OXA induced AD model in hIL4/hIL4R mice. (A) Pathology photos (B) Pathology score.',
    src: `${IMG}/case2-fig-04-pathology.png`,
    alt: 'Case 2 Fig.4 OXA induced AD model in hIL4/hIL4R mice.',
  },
];

const CASE3_FIGURES: FigureItem[] = [
  {
    caption: 'Study timeline',
    src: `${IMG}/case3-timeline.png`,
    alt: 'Case 3 HDM induced asthma study timeline.',
  },
  {
    caption:
      'Case 3 — Fig.1 Body weight of HDM induced hIL4/hIL4R mice asthma model treated with dupilumab. (n=6, Data are presented as Mean and ± SEM)',
    src: `${IMG}/case3-fig-01-body-weight.png`,
    alt: 'Case 3 Fig.1 Body weight of HDM induced hIL4/hIL4R mice asthma model treated with dupilumab.',
    maxWidth: '480px',
  },
  {
    caption:
      'Case 3 — Fig.2 Dupilumab ameliorate overall asthma activity in HDM induced Asthma Model. (A) Inflammatory cell number in BALF. (B) Eosinophils cell number in Bronchoalveolar Lavage Fluid (BALF). (C) Eosinophils percentage in inflammatory cell. (D) Serum total IgE concentration. (**P<0.01, ***P<0.001)',
    src: `${IMG}/case3-fig-02-asthma-activity.png`,
    alt: 'Case 3 Fig.2 Dupilumab ameliorate overall asthma activity in HDM induced Asthma Model.',
  },
  {
    caption:
      'Case 3 — Fig.3 HDM induced hIL4/hIL4R mice asthma model. (A) hIL-4 mRNA expression level. (B) mIL-8 mRNA expression level. (C) mIL-13 mRNA expression level. (D) mIL-6 mRNA expression level. (E) mIL-17a mRNA expression level. (*P<0.05, **P<0.01, ***P<0.001)',
    src: `${IMG}/case3-fig-03-mrna.png`,
    alt: 'Case 3 Fig.3 HDM induced hIL4/hIL4R mice asthma model mRNA expression.',
  },
  {
    caption:
      'Case 3 — Fig.4 Dupilumab significantly mitigates the asthma symptoms in lung. (A) Representative images of H&E staining. (B) Pathology score results. Magnification, ×5. (*P<0.05, **P<0.01, ***P<0.001)',
    src: `${IMG}/case3-fig-04-he-staining.png`,
    alt: 'Case 3 Fig.4 Dupilumab significantly mitigates the asthma symptoms in lung.',
  },
  {
    caption:
      'Case 3 — Fig.5 HDM induced hIL4/hIL4R mice asthma model. (A) Representative images of PAS staining. (B) mucus score. Magnification, ×10. (*P<0.05, ***P<0.001)',
    src: `${IMG}/case3-fig-05-pas-staining.png`,
    alt: 'Case 3 Fig.5 HDM induced hIL4/hIL4R mice asthma model PAS staining.',
  },
];

const TABLE_CELL: CSSProperties = {
  padding: '12px 16px',
  fontSize: '.875rem',
  color: '#555',
  borderBottom: '1px solid #e0e0e0',
  lineHeight: 1.5,
  verticalAlign: 'top',
};

const TABLE_HEADER: CSSProperties = {
  ...TABLE_CELL,
  background: '#0a253c',
  color: '#ffffff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const FIGURE_CAPTION: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#0a253c',
  marginBottom: '14px',
  lineHeight: 1.45,
};

const CASE_HEADING: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#0a253c',
  margin: '48px 0 24px',
  lineHeight: 1.35,
};

function AboutItlParagraph() {
  const before =
    'Ingenious targeting laboratory maintains a catalog of over 14,774 mouse models, including humanized strains, Cre driver lines for conditional expression, and reporter mice for cell tracking and imaging. These quality-controlled models on defined genetic backgrounds ship as breeding pairs or cohorts with complete genotyping protocols and health documentation. Researchers gain immediate access to mouse strains without custom generation timelines, accelerating experiments across immunology, oncology, neurology, and metabolic disease applications. If you are interested in our hIL4/hIL4R mouse model, please ';
  const mid = '. Or, please search our ';
  const after = ' for your gene of interest.';

  return (
    <p style={{ fontSize: '.95rem', color: '#444', lineHeight: 1.8, margin: 0 }}>
      {before}
      <Link
        href="/order-catalog-models/"
        style={{ color: '#008080', fontWeight: 600, textDecoration: 'underline' }}
      >
        contact us
      </Link>
      {mid}
      <Link
        href="/catalog-mouse-models/"
        style={{ color: '#008080', fontWeight: 600, textDecoration: 'underline' }}
      >
        catalog
      </Link>
      {after}
    </p>
  );
}

function FigureBlock({
  fig,
  priority = false,
}: {
  fig: FigureItem;
  priority?: boolean;
}) {
  return (
    <figure style={{ margin: 0 }}>
      <figcaption style={{ ...FIGURE_CAPTION, marginBottom: fig.body ? '12px' : '14px' }}>
        {fig.caption}
      </figcaption>
      {fig.body ? (
        <p
          style={{
            fontSize: '.9rem',
            color: '#555',
            lineHeight: 1.75,
            margin: '0 0 16px 0',
          }}
        >
          {fig.body}
        </p>
      ) : null}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: fig.maxWidth,
          margin: fig.maxWidth ? '0 auto' : undefined,
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid #e8e8e8',
          background: '#fafafa',
        }}
      >
        <Image
          src={fig.src}
          alt={fig.alt}
          width={1200}
          height={800}
          sizes="(max-width: 960px) 100vw, 920px"
          className="w-full h-auto"
          style={{
            width: '100%',
            height: 'auto',
            verticalAlign: 'middle',
          }}
          priority={priority}
        />
      </div>
    </figure>
  );
}

function CtaButtons({ variant = 'hero' }: { variant?: 'hero' | 'closing' }) {
  const isHero = variant === 'hero';
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: isHero ? 'flex-start' : 'center',
      }}
    >
      <a
        href={PDF_HREF}
        download
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#00d4d4',
          color: '#0a253c',
          padding: '12px 22px',
          borderRadius: '4px',
          fontSize: '.9rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Download data sheet
        <ChevronRight size={16} color="#0a253c" />
      </a>
      {isHero ? (
        <Link
          href="/order-catalog-models/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            color: '#ffffff',
            padding: '12px 22px',
            borderRadius: '4px',
            fontSize: '.9rem',
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.35)',
          }}
        >
          Contact us
          <ChevronRight size={16} color="#ffffff" />
        </Link>
      ) : (
        <Link
          href="/catalog-mouse-models/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            color: '#ffffff',
            padding: '12px 22px',
            borderRadius: '4px',
            fontSize: '.9rem',
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid rgba(255,255,255,0.35)',
          }}
        >
          Search catalog
          <ChevronRight size={16} color="#ffffff" />
        </Link>
      )}
    </div>
  );
}

export default function HIL4HIL4RPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'hIL4/hIL4R Dual Humanized IL4/IL4R Mouse',
    description:
      'The hIL4/hIL4R dual humanized mouse model is a critical tool for studying IL-4 signaling pathways and developing targeted therapeutics for allergic diseases and asthma. Catalog HU 2000106. Repository live (ready to ship).',
    sku: 'HU 2000106',
    brand: {
      '@type': 'Organization',
      name: 'Ingenious Targeting Laboratory',
      url: 'https://genetargeting.com',
      foundingDate: '1998',
    },
    category: 'Humanized Mouse Models',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: 'https://www.genetargeting.com/order-catalog-models/',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        valueAddedTaxIncluded: false,
        description: 'Custom quote on request. Submit a brief and receive pricing within 24 hours.',
      },
    },
  };

  return (
    <div style={{ background: '#0a253c', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'white',
          minHeight: '100vh',
        }}
      >
        <UXUIDCNavigation />

        <main>
          {/* Hero */}
          <section
            style={{
              background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
              padding: '72px 20px 56px',
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
                opacity: 0.06,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '700px',
                  height: '700px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
                  top: '-300px',
                  right: '-200px',
                }}
              />
            </div>

            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  href="/catalog-mouse-models/"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '.8rem',
                    textDecoration: 'none',
                  }}
                >
                  Catalog Models
                </Link>
                <ChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <Link
                  href="/featured-model/"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '.8rem',
                    textDecoration: 'none',
                  }}
                >
                  Featured Model
                </Link>
                <ChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <span style={{ color: '#00d4d4', fontSize: '.8rem' }}>
                  hIL4/hIL4R
                </span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(0,212,212,0.15)',
                  border: '1px solid rgba(0,212,212,0.3)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  marginBottom: '16px',
                }}
              >
                <LayersIcon size={14} color="#00d4d4" />
                <span
                  style={{
                    color: '#ffffff',
                    fontSize: '.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}
                >
                  FEATURED MODEL OF THE MONTH
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(2.25rem, 5vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '4px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                hIL4/hIL4R
              </h1>
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 400,
                  color: '#00d4d4',
                  marginBottom: '28px',
                }}
              >
                Dual Humanized IL4/IL4R Mouse
              </p>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.92)',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                  maxWidth: '720px',
                }}
              >
                The hIL4/hIL4R dual humanized mouse model is a critical tool for
                studying IL-4 signaling pathways and developing targeted
                therapeutics for allergic diseases and asthma.
              </p>

              <CtaButtons variant="hero" />
            </div>
          </section>

          {/* Strain snapshot */}
          <section style={{ background: '#ffffff', padding: '56px 20px' }}>
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#0a253c',
                  marginBottom: '24px',
                }}
              >
                Strain Snapshot
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    background: '#ffffff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_HEADER, width: '32%' }}>
                        Parameter
                      </th>
                      <th style={TABLE_HEADER}>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STRAIN_ROWS.map((row, i) => (
                      <tr
                        key={row.parameter}
                        style={{ background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}
                      >
                        <td
                          style={{
                            ...TABLE_CELL,
                            fontWeight: 600,
                            color: '#0a253c',
                          }}
                        >
                          {row.parameter}
                        </td>
                        <td style={TABLE_CELL}>{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Why dual */}
          <section style={{ background: '#f7f7f7', padding: '56px 20px' }}>
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#0a253c',
                  marginBottom: '20px',
                }}
              >
                Why Dual IL4/IL4R Humanization?
              </h2>
              <p
                style={{
                  fontSize: '.95rem',
                  color: '#444',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                }}
              >
                IL4 signaling through the type I receptor complex (IL4 + IL4Rα +
                γc) drives Th2 immune responses. Human therapeutics targeting IL4
                or IL4R require both human ligand and receptor for proper binding
                and signaling.
              </p>
              <p
                style={{
                  fontSize: '.95rem',
                  color: '#444',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                }}
              >
                The hIL4/hIL4R model humanizes both IL4 and IL4R to provide:
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  listStyleType: 'disc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {WHY_BULLETS.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontSize: '.95rem',
                      color: '#00d4d4',
                      lineHeight: 1.75,
                    }}
                  >
                    <span style={{ color: '#444' }}>{b}</span>
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontSize: '.95rem',
                  color: '#444',
                  lineHeight: 1.8,
                  marginTop: '20px',
                  marginBottom: 0,
                }}
              >
                This dual humanization enables testing of anti IL4/IL4R
                therapeutics with their native human targets in a fully
                immunocompetent model.
              </p>
            </div>
          </section>

          {/* Validation data + case studies */}
          <section style={{ background: '#ffffff', padding: '56px 20px 72px' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#0a253c',
                  marginBottom: '36px',
                }}
              >
                Validation Data
              </h2>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
              >
                {VALIDATION_FIGURES.map((fig, i) => (
                  <FigureBlock key={fig.src} fig={fig} priority={i === 0} />
                ))}
              </div>

              <h3 style={CASE_HEADING}>
                Case 1: In vivo efficacy of anti human IL4RA mAb in the
                DNFB induced Atopic dermatitis Model based on hIL4/hIL4R Mice
              </h3>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
              >
                {CASE1_FIGURES.map((fig) => (
                  <FigureBlock key={fig.src} fig={fig} />
                ))}
              </div>

              <h3 style={CASE_HEADING}>
                Case 2: In vivo efficacy of anti human IL4RA mAb in the OXA
                induced Atopic dermatitis Model based on hIL4/hIL4R Mice
              </h3>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
              >
                {CASE2_FIGURES.map((fig) => (
                  <FigureBlock key={fig.src} fig={fig} />
                ))}
              </div>

              <h3 style={CASE_HEADING}>
                Case 3: In vivo efficacy of anti human IL4RA mAb in the HDM
                induced Asthma Model based on hIL4/hIL4R Mice
              </h3>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
              >
                {CASE3_FIGURES.map((fig) => (
                  <FigureBlock key={fig.src} fig={fig} />
                ))}
              </div>
            </div>
          </section>

          {/* About ITL */}
          <section style={{ background: '#f7f7f7', padding: '56px 20px 72px' }}>
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#0a253c',
                  marginBottom: '20px',
                }}
              >
                About ingenious targeting laboratory
              </h2>
              <AboutItlParagraph />
            </div>
          </section>

          {/* Closing strip */}
          <section
            style={{
              background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
              padding: '48px 20px',
            }}
          >
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <CtaButtons variant="closing" />
            </div>
          </section>
        </main>

        <UXUIDCFooter />

        <BreadcrumbSchema
          items={[
            { name: 'Home', path: '/' },
            { name: 'Catalog Models', path: '/catalog-mouse-models' },
            { name: 'Featured Model', path: '/featured-model' },
            { name: 'hIL4/hIL4R', path: '/featured-model/hil4-hil4r' },
          ]}
        />
      </div>
    </div>
  );
}
