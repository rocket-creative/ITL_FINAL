'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import { IconChevronRight, IconLayers } from '@/components/UXUIDC/Icons';

const PDF_HREF = '/downloads/hcd3edg-ingenious.pdf';

/** Matches hCD3EDG strain overview notation (superscripts per source specification). */
function StrainNameExact() {
  return (
    <>
      C57BL/6Smoc-Cd3e<sup>tm1(hCD3E)</sup> Cd3d<sup>tm1(hCD3D)</sup> Cd3g<sup>tm1(hCD3G)Smoc</sup>
    </>
  );
}

const strainSpecs: { param: string; detail: ReactNode }[] = [
  { param: 'Strain Name', detail: <StrainNameExact /> },
  { param: 'Cat. NO.', detail: 'NM-HU-220120' },
  { param: 'Strain State', detail: 'Repository Live' },
  {
    param: 'Model Description',
    detail:
      'The endogenous mouse Cd3e/Cd3d/Cd3g genes were replaced by human CD3E/CD3D/CD3G gene.',
  },
  { param: 'Category', detail: 'Humanized Mouse Models' },
];

/** Strain overview and validation figure copy and image URLs from hCD3EDG strain specification source. */
const validationFigures: {
  title: ReactNode;
  alt: string;
  description: string | null;
  src: string;
}[] = [
  {
    title: 'Fig.1 Detection of human CD3E,CD3D,CD3G on T cell surface in HO hCD3EDG mice.',
    alt: 'Fig.1 Detection of human CD3E,CD3D,CD3G on T cell surface in HO hCD3EDG mice.',
    description: null,
    src: '/images/featured-model/hcd3edg/5350e87a147634e64aed40d32a1c9e76.png',
  },
  {
    title: 'Fig.2 Lymphocyte Lineage Characterization in Blood in Homozygous hCD3EDG Mice.',
    alt: 'Fig.2 Lymphocyte Lineage Characterization in Blood in Homozygous hCD3EDG Mice.',
    description: null,
    src: '/images/featured-model/hcd3edg/64f4cc5bb93d9460257009e48e7c3276.png',
  },
  {
    title: (
      <>
        Fig.3 <em>In vivo</em> AICD and irAE Assessment of Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.
      </>
    ),
    alt: 'Fig.3 In vivo AICD and irAE Assessment of Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.',
    description:
      'Homozygous hCD3EDG mice were engrafted with MC38-hEpCAM to evaluate the AICD and irAE of OKT3 and anti-CD3×EpCAM bispecific antibody in vivo.',
    src: '/images/featured-model/hcd3edg/c8e638d50e497ec7a1fb4632556efce0.png',
  },
  {
    title: (
      <>
        Fig.4 <em>In Vivo</em> Response with Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.
      </>
    ),
    alt: 'Fig.4 In Vivo Response with Bispecific T Cell Engager Antibodies in Homozygous hCD3EDG Mice.',
    description:
      'Homozygous hCD3EDG mice were engrafted with MC38-hCLDN18.2 to evaluate the in vivo efficacy of anti-CD3×Claudin18.2 bispecific antibody.',
    src: '/images/featured-model/hcd3edg/9fd73c7088f17c4343bbd45f1c49f79e.png',
  },
  {
    title: (
      <>
        Fig.5 <em>In vivo</em> AICD and irAE Assessment of CD3 Bispecific Antibody in Homozygous hCD3EDG Mice.
      </>
    ),
    alt: 'Fig.5 In vivo AICD and irAE Assessment of CD3 Bispecific Antibody in Homozygous hCD3EDG Mice.',
    description:
      'The anti-tumor response of anti-mPD-1 was evaluated in homozygous hCD3EDG mice bearing MC38 syngeneic tumor model.',
    src: '/images/featured-model/hcd3edg/b385b0ed132af378c4eb3e3139ff7b26.png',
  },
  {
    title: (
      <>
        Fig.6 <em>In vivo</em> AICD and irAE Assessment of CD3 Bispecific Antibody with Homozygous hCD3EDG Mice.
      </>
    ),
    alt: 'Fig.6 In vivo AICD and irAE Assessment of CD3 Bispecific Antibody with Homozygous hCD3EDG Mice.',
    description:
      'Homozygous hCD3EDG mice were engrafted with MC38-hEpCAM to evaluate the AICD and irAE of anti-CD3×EpCAM bispecific antibody at low and high dose levels in vivo.',
    src: '/images/featured-model/hcd3edg/8507fca2dadb41346107193e047dffb4.png',
  },
  {
    title: (
      <>
        Fig.7 <em>In Vivo</em> Response with Bispecific T Cell Engager Antibodies.
      </>
    ),
    alt: 'Fig.7 In Vivo Response with Bispecific T Cell Engager Antibodies.',
    description: null,
    src: '/images/featured-model/hcd3edg/3c989dee7a88f6cfc1c140ea31d86f6c.png',
  },
];

const SMOC_PUBLICATION_CITATION =
  'Literature published using this strain should indicate: hCD3EDG mice (Cat. NO. NM-HU-220120) were purchased from Shanghai Model Organisms Center, Inc..';

const testimonials = [
  { quote: 'The quality of service was exceptional... highest possible standards.', name: 'Albert Basson', org: "King's College London" },
  { quote: '2 conditional knockout mouse lines... scientific consulting superb.', name: 'Hyekyung Plumley', org: 'National Institutes of Health' },
];

const faqData = [
  {
    question: 'What does the hCD3EDG model consist of?',
    answer:
      'The endogenous mouse Cd3e/Cd3d/Cd3g genes were replaced by human CD3E/CD3D/CD3G gene.',
  },
  {
    question: 'How should I cite this strain in a publication?',
    answer: SMOC_PUBLICATION_CITATION,
  },
  {
    question: 'Where are validation figures and the full data sheet?',
    answer:
      'Validation data for this strain are shown on this page under Validation data (Fig.1 through Fig.7). Download the data sheet PDF for the complete product package.',
  },
  {
    question: 'How do I request hCD3EDG mice or study support?',
    answer:
      'Strain state is Repository Live. Contact Ingenious Targeting Laboratory for pricing, cohort availability, and study design support.',
  },
];

const relatedModels = [
  { label: 'Humanized Mouse Models', href: '/humanized-mouse-models' },
  { label: 'Conditional Knockout Mouse Models', href: '/conditional-knockout-mouse-models' },
  { label: 'Knockin Mouse Models', href: '/knockin-mouse-models' },
];

const therapeuticAreas = [
  { label: 'Oncology Mouse Models', href: '/oncology-mouse-models' },
  { label: 'Autoimmune Disease Models', href: '/autoimmune-disease-mouse-models' },
];

const TABLE_CELL: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '.875rem',
  color: '#555',
  borderBottom: '1px solid #e0e0e0',
  lineHeight: 1.5,
  verticalAlign: 'top',
};

const TABLE_HEADER: React.CSSProperties = {
  ...TABLE_CELL,
  background: '#0a253c',
  color: '#ffffff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export default function HCD3EDGPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'hCD3EDG Triple Humanized CD3 Mouse Model',
    description:
      'The endogenous mouse Cd3e/Cd3d/Cd3g genes were replaced by human CD3E/CD3D/CD3G gene. Catalog NM-HU-220120. Strain state Repository Live.',
    sku: 'NM-HU-220120',
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
      url: 'https://www.genetargeting.com/quote-request-form/',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div style={{ background: '#0a253c', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', minHeight: '100vh' }}>
        <UXUIDCNavigation />

        <main>
          {/* Hero */}
          <section style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06,
            }}>
              <div style={{
                position: 'absolute',
                width: '700px',
                height: '700px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
                top: '-300px',
                right: '-200px',
              }} />
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              {/* Breadcrumb trail */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <Link href="/catalog-mouse-models" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', textDecoration: 'none' }}>Catalog Models</Link>
                <IconChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <Link href="/featured-model" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', textDecoration: 'none' }}>Featured Model</Link>
                <IconChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <span style={{ color: '#00d4d4', fontSize: '.8rem' }}>hCD3EDG</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,212,212,0.15)',
                border: '1px solid rgba(0,212,212,0.3)',
                borderRadius: '20px',
                padding: '6px 14px',
                marginBottom: '20px',
              }}>
                <IconLayers size={14} color="#00d4d4" />
                <span style={{ color: '#ffffff', fontSize: '.85rem', fontWeight: 500 }}>
                  Featured Model of the Month — March 2026
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h1 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '8px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                  }}>
                    hCD3EDG
                  </h1>
                  <p style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    color: '#00d4d4',
                    marginBottom: '20px',
                  }}>
                    Triple Humanized CD3 Mouse Model
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '24px',
                    lineHeight: 1.75,
                    maxWidth: '680px',
                  }}>
                    The endogenous mouse Cd3e/Cd3d/Cd3g genes were replaced by human CD3E/CD3D/CD3G
                    gene. Strain state Repository Live. Contact Ingenious Targeting Laboratory for
                    catalog availability and study support.
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
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '.9rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      Download Data Sheet
                      <IconChevronRight size={16} color="#0a253c" />
                    </a>
                    <Link
                      href="/quote-request-form"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: '2px solid rgba(255,255,255,0.35)',
                      }}
                    >
                      Request Consultation
                      <IconChevronRight size={16} color="#ffffff" />
                    </Link>
                  </div>
                </div>

                {/* Spec pills */}
                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '24px',
                  minWidth: '220px',
                }}>
                  {[
                    { label: 'Catalog', value: 'NM-HU-220120' },
                    { label: 'Background', value: 'C57BL/6Smoc' },
                    { label: 'Status', value: 'Repository Live' },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#ffffff' }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Top CTA */}
          <section style={{
            background: '#008080',
            padding: '48px 20px',
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '12px',
              }}>
                Repository live. Ready to ship.
              </h2>
              <p style={{
                fontSize: '.95rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.75,
                maxWidth: '580px',
                margin: '0 auto 28px',
              }}>
                Contact the ITL scientific team for pricing, cohort availability, and study design
                support.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={PDF_HREF}
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ffffff',
                    color: '#008080',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Download Data Sheet
                  <IconChevronRight size={16} color="#008080" />
                </a>
                <Link
                  href="/quote-request-form"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '2px solid rgba(255,255,255,0.5)',
                  }}
                >
                  Request Project Consultation
                  <IconChevronRight size={16} color="#ffffff" />
                </Link>
              </div>
            </div>
          </section>

          {/* Model description (product page wording) */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '24px',
              }}>
                Model description
              </h2>
              <p className="animate-in" style={{ fontSize: '.95rem', color: '#444', lineHeight: 1.8, marginBottom: '24px' }}>
                The endogenous mouse Cd3e/Cd3d/Cd3g genes were replaced by human CD3E/CD3D/CD3G gene.
              </p>
              <p className="animate-in" style={{ fontSize: '.9rem', color: '#555', lineHeight: 1.75, marginBottom: 0, fontStyle: 'italic' }}>
                {SMOC_PUBLICATION_CITATION}
              </p>
            </div>
          </section>

          {/* Strain Specs */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                Strain specifications
              </h2>
              <div className="animate-in" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <tbody>
                    {strainSpecs.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f7f7f7' }}>
                        <td style={{ ...TABLE_CELL, fontWeight: 600, color: '#0a253c', width: '35%' }}>{row.param}</td>
                        <td style={{ ...TABLE_CELL }}>{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Validation data (figures from strain specification) */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '12px',
                textAlign: 'center',
              }}>
                Validation data
              </h2>
              <p className="animate-in" style={{
                fontSize: '.85rem',
                color: '#888',
                textAlign: 'center',
                marginBottom: '40px',
                lineHeight: 1.6,
              }}>
                Figure titles and captions match the strain documentation for NM-HU-220120.{' '}
                <a
                  href="https://en.modelorg.com/portal/article/index/id/213117/post_type/3.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#008080', fontWeight: 600 }}
                >
                  Reference catalog listing
                </a>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {validationFigures.map((fig, i) => (
                  <figure
                    key={`${i}-${fig.src}`}
                    className="animate-in"
                    style={{ margin: 0, padding: 0 }}
                  >
                    <figcaption style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#0a253c',
                      marginBottom: fig.description ? '12px' : '16px',
                      lineHeight: 1.45,
                    }}>
                      {fig.title}
                    </figcaption>
                    {fig.description ? (
                      <p style={{
                        fontSize: '.9rem',
                        color: '#555',
                        lineHeight: 1.75,
                        marginBottom: '16px',
                        marginTop: 0,
                      }}>
                        {fig.description}
                      </p>
                    ) : null}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #e8e8e8',
                      background: '#fafafa',
                    }}>
                      <Image
                        src={fig.src}
                        alt={fig.alt}
                        width={1200}
                        height={800}
                        sizes="(max-width: 1000px) 100vw, 960px"
                        className="w-full h-auto"
                        style={{ width: '100%', height: 'auto', verticalAlign: 'middle' }}
                        priority={i === 0}
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '40px',
                textAlign: 'center',
              }}>
                What researchers say
              </h2>
              <div style={{ display: 'grid', gap: '24px' }}>
                {testimonials.map((t, i) => (
                  <blockquote key={i} className="animate-in" style={{
                    margin: 0,
                    background: '#f7f7f7',
                    borderRadius: '8px',
                    padding: '28px 32px',
                    borderLeft: '4px solid #00d4d4',
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      color: '#333',
                      lineHeight: 1.75,
                      fontStyle: 'italic',
                      marginBottom: '16px',
                    }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer style={{ fontSize: '.85rem', fontWeight: 600, color: '#0a253c' }}>
                      {t.name} <span style={{ fontWeight: 400, color: '#888' }}>— {t.org}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
              <div className="animate-in" style={{ textAlign: 'center', marginTop: '28px' }}>
                <Link href="/testimonials" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#008080',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  Read more testimonials
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              </div>
            </div>
          </section>

          {/* Related Models + Therapeutic Areas */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="animate-in">
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '16px',
                  }}>
                    Related humanized models
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {relatedModels.map((link) => (
                      <li key={link.href} style={{ marginBottom: '10px' }}>
                        <Link href={link.href} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#008080',
                          fontSize: '.9rem',
                          textDecoration: 'none',
                        }}>
                          <IconChevronRight size={14} color="#008080" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="animate-in">
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '16px',
                  }}>
                    Therapeutic area applications
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {therapeuticAreas.map((link) => (
                      <li key={link.href} style={{ marginBottom: '10px' }}>
                        <Link href={link.href} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#008080',
                          fontSize: '.9rem',
                          textDecoration: 'none',
                        }}>
                          <IconChevronRight size={14} color="#008080" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '40px',
                textAlign: 'center',
              }}>
                Frequently asked questions
              </h2>
              <div className="animate-in">
                <UXUIDCAnimatedFAQ faqs={faqData} showViewAllLink={false} />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '60px 20px',
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
              }}>
                Repository live. Ready to ship.
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.75,
                marginBottom: '36px',
                maxWidth: '600px',
                margin: '0 auto 36px',
              }}>
                Contact the ITL scientific team for pricing, cohort availability, and study design
                support.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={PDF_HREF}
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#00d4d4',
                    color: '#0a253c',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    fontSize: '.95rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Download Data Sheet
                  <IconChevronRight size={16} color="#0a253c" />
                </a>
                <Link
                  href="/quote-request-form"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    color: '#ffffff',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    fontSize: '.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '2px solid rgba(255,255,255,0.35)',
                  }}
                >
                  Request Project Consultation
                  <IconChevronRight size={16} color="#ffffff" />
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
