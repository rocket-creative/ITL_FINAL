import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';

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

const PDF_HREF = '/downloads/hcd3edg-ingenious.pdf';

/** Copy and image order match FINAL DRAFT_ hCD3EDG_Model_of_Month_with_images_KC version.docx (Fig.1 → image5 … Fig.7 → image7). */
const STRAIN_ROWS: { parameter: string; detail: string }[] = [
  { parameter: 'Model name', detail: 'hCD3EDG' },
  {
    parameter: 'Full strain name',
    detail: 'C57BL/6 Cd3etm1(hCD3E) Cd3dtm1(hCD3D) Cd3gtm1(hCD3G)',
  },
  { parameter: 'Catalog number', detail: 'HU 220120' },
  { parameter: 'Strain state', detail: 'Repository live (ready to ship)' },
  {
    parameter: 'Humanized genes',
    detail: 'CD3E (epsilon), CD3D (delta), CD3G (gamma)',
  },
  { parameter: 'Zygosity', detail: 'Homozygous' },
];

const WHY_BULLETS: string[] = [
  'Accurate human epitope presentation, including interfaces at ε/δ and ε/γ',
  'Physiologic ITAM-based signal transduction through a properly assembled CD3 complex',
  'Translatable cytokine release profiles in an immunocompetent, syngeneic system',
  'Preserved immune architecture, including normal T cell development and subset distribution',
];

const VALIDATION_FIGURES: {
  caption: string;
  body?: string;
  src: string;
  alt: string;
}[] = [
  {
    caption:
      'Fig.1 Detection of human CD3E,CD3D,CD3G on T cell surface in HO hCD3EDG mice.',
    src: '/model-of-month-images/image5.png',
    alt: 'Fig.1 Detection of human CD3E,CD3D,CD3G on T cell surface in HO hCD3EDG mice.',
  },
  {
    caption:
      'Fig.2 Lymphocyte Lineage Characterization in Blood in Homozygous hCD3EDG Mice.',
    src: '/model-of-month-images/image3.png',
    alt: 'Fig.2 Lymphocyte Lineage Characterization in Blood in Homozygous hCD3EDG Mice.',
  },
  {
    caption:
      'Fig.3 In vivo AICD and irAE Assessment of Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.',
    body: 'Homozygous hCD3EDG mice were engrafted with MC38-hEpCAM to evaluate the AICD and irAE of OKT3 and anti-CD3×EpCAM bispecific antibody in vivo.',
    src: '/model-of-month-images/image2.png',
    alt: 'Fig.3 In vivo AICD and irAE Assessment of Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.',
  },
  {
    caption:
      'Fig.4 In Vivo Response with Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.',
    body: 'Homozygous hCD3EDG mice were engrafted with MC38-hCLDN18.2 to evaluate the in vivo efficacy of anti-CD3×Claudin18.2 bispecific antibody.',
    src: '/model-of-month-images/image4.png',
    alt: 'Fig.4 In Vivo Response with Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.',
  },
  {
    caption:
      'Fig.5 In vivo AICD and irAE Assessment of CD3 Bispecific Antibody in homozygous hCD3EDG Mice.',
    body: 'The anti-tumor response of anti-mPD-1 was evaluated in homozygous hCD3EDG mice bearing MC38 syngeneic tumor model.',
    src: '/model-of-month-images/image1.png',
    alt: 'Fig.5 In vivo AICD and irAE Assessment of CD3 Bispecific Antibody in homozygous hCD3EDG Mice.',
  },
  {
    caption:
      'Fig.6 In vivo AICD and irAE Assessment of CD3 Bispecific Antibody with Homozgyous hCD3EDG Mice.',
    body: 'Homozygous hCD3EDG mice were engrafted with MC38-hEpCAM to evaluate the AICD and irAE of anti-CD3×EpCAM bispecific antibody at low and high dose levels in vivo.',
    src: '/model-of-month-images/image6.png',
    alt: 'Fig.6 In vivo AICD and irAE Assessment of CD3 Bispecific Antibody with Homozgyous hCD3EDG Mice.',
  },
  {
    caption: 'Fig.7 In Vivo Response with Bispecific T Cell Engager Antibodies.',
    src: '/model-of-month-images/image7.png',
    alt: 'Fig.7 In Vivo Response with Bispecific T Cell Engager Antibodies.',
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

function AboutItlParagraph() {
  const before =
    'Ingenious targeting laboratory maintains a catalog of over 14,774 mouse models, including humanized strains, Cre driver lines for conditional expression, and reporter mice for cell tracking and imaging. These quality-controlled models on defined genetic backgrounds ship as breeding pairs or cohorts with complete genotyping protocols and health documentation. Researchers gain immediate access to mouse strains without custom generation timelines, accelerating experiments across immunology, oncology, neurology, and metabolic disease applications. If you are interested in our hCD3EDG mouse model, please ';
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

export default function HCD3EDGPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'hCD3EDG Triple Humanized CD3 Mouse',
    description:
      'The hCD3EDG triple humanized CD3 model is one of the most in-demand tools for bispecific T cell engager (TCE) development. Catalog HU 220120. Repository live (ready to ship).',
    sku: 'HU 220120',
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
      url: 'https://www.genetargeting.com/request-quote/',
      price: '0',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '0',
        priceCurrency: 'USD',
        description: 'Contact for pricing',
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
                  hCD3EDG
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
                hCD3EDG
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
                Triple Humanized CD3 Mouse
              </p>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.92)',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                  maxWidth: '720px',
                }}
              >
                The hCD3EDG triple humanized CD3 model is one of the most
                in-demand tools for bispecific T cell engager (TCE) development.
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
                The hCD3EDG strain replaces all three signaling subunits of the
                murine CD3 complex (CD3 epsilon, CD3 delta, and CD3 gamma) with
                their human orthologs on a C57BL/6 background. This is a full CD3
                complex humanization, not a single-chain knock-in, custom-built
                for preclinical evaluation of human CD3-directed
                immunotherapies.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
              </div>
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

          {/* Why triple */}
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
                Why Triple CD3 Humanization?
              </h2>
              <p
                style={{
                  fontSize: '.95rem',
                  color: '#444',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                }}
              >
                The TCR requires the CD3 complex for signal transduction,
                comprising CD3ε/δ, CD3ε/γ, and CD3ζ/ζ dimers that together
                provide 10 ITAMs to drive downstream activation. CD3ε is the
                primary target for most TCEs, but it functions as an obligate
                heterodimer with CD3δ and CD3γ. Humanizing only CD3ε can produce
                hybrid mouse-human complexes that do not fully reproduce human
                binding and signaling.
              </p>
              <p
                style={{
                  fontSize: '.95rem',
                  color: '#444',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                }}
              >
                By humanizing CD3E, CD3D, and CD3G simultaneously, hCD3EDG
                provides:
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
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
                      color: '#444',
                      lineHeight: 1.75,
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Validation data */}
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
                  <figure key={fig.src} style={{ margin: 0 }}>
                    <figcaption
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#0a253c',
                        marginBottom: fig.body ? '12px' : '14px',
                        lineHeight: 1.45,
                      }}
                    >
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
                        priority={i === 0}
                      />
                    </div>
                  </figure>
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
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
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
              </div>
            </div>
          </section>
        </main>

        <UXUIDCFooter />

        <BreadcrumbSchema
          items={[
            { name: 'Home', path: '/' },
            { name: 'Catalog Models', path: '/catalog-mouse-models' },
            { name: 'Featured Model', path: '/featured-model' },
            { name: 'hCD3EDG', path: '/featured-model/hcd3edg' },
          ]}
        />
      </div>
    </div>
  );
}
