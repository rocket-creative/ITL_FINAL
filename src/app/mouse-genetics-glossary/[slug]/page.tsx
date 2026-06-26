import { notFound } from 'next/navigation';
import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';

import Link from 'next/link';
import { Metadata } from 'next';
import { applyCatalogFirstMeta } from '@/lib/seo';
import { buildServiceOffer } from '@/lib/seo/productSchema';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCEducationalSalesBanner from '@/components/UXUIDC/EducationalSalesBanner';
import CatalogStickyRail from '@/components/UXUIDC/CatalogStickyRail';
import { getEducationalOffer } from '@/components/UXUIDC/EducationalSalesBanner';
import { getCatalogLookup } from '@/components/UXUIDC/catalogLookupMap';
import { IconChevronRight, IconDNA, IconLayers, IconArrowLeft } from '@/components/UXUIDC/Icons';
import { 
  getExtendedTerm, 
  getAllGlossarySlugs, 
  getRelatedTerms
} from '@/data/glossaryTermsExtended';
import { glossaryTerms } from '@/data/glossaryTerms';

// Per-slug commercial metadata overrides for the highest-impression
// glossary terms. Replaces the dictionary-style snippet with a commercial
// offer the searcher will actually click.
const COMMERCIAL_GLOSSARY_META: Record<string, { title: string; description: string }> = {
  'non-homologous-end-joining': {
    title: 'NHEJ DNA Repair Explained + Custom Knockout Mice | ITL',
    description:
      'Non-homologous end joining (NHEJ) explained for researchers. Custom knockout mice with a 100% germline guarantee. Quote in 24h.',
  },
  'open-reading-frame': {
    title: 'Open Reading Frame (ORF) + Custom Knockin Mouse Models | ITL',
    description:
      'ORF defined for genetics research. Need an ORF replacement or humanization knockin mouse? Quote in 24h. 800+ publications.',
  },
  'inducible-cre-ert2': {
    title: 'Inducible CreERT2 + Custom CreERT2 Mouse Service | ITL',
    description:
      'Inducible CreERT2 explained for tissue-specific knockouts. We build custom CreERT2 + floxed alleles. 2,800+ custom projects.',
  },
  'tamoxifen-inducible-cre': {
    title: 'Tamoxifen Inducible Cre + Custom CreERT2 Mice | ITL',
    description:
      'Tamoxifen-inducible Cre explained. We have shipped 2,800+ custom CreERT2 projects. Custom builds + ready catalog Cre lines. Quote in 24h.',
  },
  'c57bl6j-vs-c57bl6n': {
    title: 'C57BL/6J vs C57BL/6N + Custom Mice on Either Background | ITL',
    description:
      'C57BL/6J vs 6N: substrain differences. We build custom mice on the background you need. 14,774 catalog models. Quote in 24h.',
  },
  'point-mutation': {
    title: 'Point Mutation Definition + Custom Knockin Mouse Models | ITL',
    description:
      'Point mutation defined: substitution, missense, nonsense. Custom point mutation knockin mice. Quote in 24h.',
  },
  'allele-genotype-phenotype': {
    title: 'Allele, Genotype & Phenotype + Custom Mouse Design | ITL',
    description:
      'Allele, genotype, phenotype explained for mouse models. Our scientists design the right allele for your phenotype. Free consultation.',
  },
  'promoter-enhancer-regulatory-element': {
    title: 'Promoter & Enhancer Elements + Custom Knockin Mice | ITL',
    description:
      'Promoter vs enhancer regulatory elements. Custom knockin mice at endogenous regulatory loci. Quote in 24h.',
  },
  'flp-frt-system': {
    title: 'Flp-FRT System + Custom Conditional Mouse Models | ITL',
    description:
      'Flp-FRT recombination explained. Custom Flp/FRT and Cre/lox conditional mice. 800+ publications.',
  },
  'gain-of-function-vs-loss-of-function-mutation': {
    title: 'Gain vs Loss of Function Mutation + Custom Mice | ITL',
    description:
      'Gain-of-function vs loss-of-function mutations. Custom knockin and knockout mice for either model. Quote in 24h.',
  },
  'dominant-negative': {
    title: 'Dominant Negative Mutation + Custom Knockin Mice | ITL',
    description:
      'Dominant negative mutations explained. We build custom dominant-negative knockin mice. Quote in 24h.',
  },
  'rosa26': {
    title: 'Rosa26 Locus + Custom Rosa26 Knockin Mouse Service | ITL',
    description:
      'Rosa26 safe harbor locus explained. Custom Rosa26 knockin mice — reporters, cassettes, inducible —. Quote in 24h.',
  },
  'rosa26-locus': {
    title: 'Rosa26 Locus + Custom Rosa26 Knockin Mice | ITL',
    description:
      'Rosa26 locus explained. Custom Rosa26 knockin mice. Reporters, conditional cassettes, inducible expression.',
  },
  'safe-harbor-locus': {
    title: 'Safe Harbor Locus + Custom Knockin Mouse Service | ITL',
    description:
      'Safe harbor loci (Rosa26, others) explained. Custom safe-harbor knockin mice. 800+ publications.',
  },
  'tissue-specific-knockout': {
    title: 'Tissue-Specific Knockout + Custom Conditional Mice | ITL',
    description:
      'Tissue-specific knockout mice explained. Custom Cre/lox conditional knockouts. 2,800+ custom projects shipped.',
  },
  'humanized-mouse-models': {
    title: 'Humanized Mouse Models + Custom Humanization Service | ITL',
    description:
      'Humanized mouse models defined. Custom humanization (PD1, PDL1, CTLA4, drug targets) since 1998. 800+ publications. Quote in 24h.',
  },
  'cre-lox-system': {
    title: 'Cre/lox System + Custom Cre/lox Conditional Mice | ITL',
    description:
      'Cre/lox recombination explained. Custom Cre/lox conditional knockouts. 2,800+ custom projects, 800+ publications.',
  },
  'frameshift-mutation': {
    title: 'Frameshift Mutation + Custom Knockin Mouse Models | ITL',
    description:
      'Frameshift mutations explained with examples. Custom knockin mice for any disease variant. Quote in 24h.',
  },
  'missense-nonsense-mutation': {
    title: 'Missense vs Nonsense Mutation + Custom Knockin Mice | ITL',
    description:
      'Missense and nonsense mutations explained. Custom point mutation knockin mice. Quote in 24h. 800+ publications.',
  },
  'genotyping-pcr-qpcr': {
    title: 'Genotyping PCR/qPCR + Mouse Genotyping Service | ITL',
    description:
      'PCR and qPCR genotyping explained. Outsource your genotyping — we offer mouse genotyping service with rapid turnaround.',
  },
};

// Brand colors
const BRAND = {
  teal: '#008080',
  tealDark: '#0a253c',
  tealLight: '#00d4d4',
  white: '#ffffff',
  lightGray: '#f7f7f7',
  mediumGray: '#666666',
  darkGray: '#333333',
};

// Generate static params for all glossary terms
export async function generateStaticParams() {
  const slugs = getAllGlossarySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each term
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getExtendedTerm(slug);

  if (!term) {
    return {
      title: 'Term Not Found | Mouse Genetics Glossary',
      description: 'The requested glossary term could not be found.',
    };
  }

  const canonicalUrl = `https://www.genetargeting.com/mouse-genetics-glossary/${term.slug}/`;
  const commercial = COMMERCIAL_GLOSSARY_META[slug];
  const glossaryPath = `/mouse-genetics-glossary/${slug}`;
  const rawTitle = commercial?.title ?? term.metaTitle;
  const rawDescription = commercial?.description ?? term.metaDescription;
  const enhanced = applyCatalogFirstMeta(rawTitle, rawDescription, glossaryPath);
  const finalTitle = enhanced.title;
  const finalDescription = enhanced.description;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      type: 'article',
      siteName: 'ingenious targeting laboratory',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary',
      title: finalTitle,
      description: finalDescription,
    },
  };
}

// Get adjacent terms for navigation
function getAdjacentTerms(currentSlug: string) {
  const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
  const currentIndex = sortedTerms.findIndex(t => t.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? sortedTerms[currentIndex - 1] : null,
    next: currentIndex < sortedTerms.length - 1 ? sortedTerms[currentIndex + 1] : null,
  };
}

// Get terms in same category
function getCategoryTerms(category: string, currentSlug: string) {
  return glossaryTerms
    .filter(t => t.category === category && t.slug !== currentSlug)
    .slice(0, 5);
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getExtendedTerm(slug);

  if (!term) {
    notFound();
  }

  const { prev, next } = getAdjacentTerms(slug);
  const relatedTerms = getRelatedTerms(term.relatedTermSlugs);
  const categoryTerms = getCategoryTerms(term.category, slug);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            "name": term.term,
            "description": term.definition,
            "inDefinedTermSet": {
              "@type": "DefinedTermSet",
              "name": "Mouse Genetics Glossary",
              "url": "https://www.genetargeting.com/glossary"
            }
          })
        }}
      />
      
      {/* FAQ Schema if FAQs exist */}
      {term.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": term.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      )}

      {/* Article + Offer schema — surfaces our starting price in the SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Article', 'TechArticle'],
            headline: term.term,
            description:
              COMMERCIAL_GLOSSARY_META[slug]?.description || term.metaDescription,
            url: `https://www.genetargeting.com/mouse-genetics-glossary/${term.slug}/`,
            mainEntityOfPage: `https://www.genetargeting.com/mouse-genetics-glossary/${term.slug}/`,
            inLanguage: 'en-US',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            author: {
              '@type': 'Organization',
              '@id': 'https://www.genetargeting.com/#organization',
              name: 'ingenious targeting laboratory',
              url: 'https://www.genetargeting.com',
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://www.genetargeting.com/#organization',
              name: 'ingenious targeting laboratory',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.genetargeting.com/images/logo.png',
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: getEducationalOffer(slug).eyebrow,
            serviceType: 'Custom mouse model generation',
            provider: {
              '@type': 'Organization',
              '@id': 'https://www.genetargeting.com/#organization',
              name: 'ingenious targeting laboratory',
              url: 'https://www.genetargeting.com',
            },
            areaServed: 'Worldwide',
            offers: buildServiceOffer(
              `https://www.genetargeting.com${getEducationalOffer(slug).primaryCta.href.split('?')[0]}`,
            ),
          }),
        }}
      />

      <UXUIDCNavigation />
      
      <main>
        {/* Hero Section */}
        <section style={{
          background: `linear-gradient(135deg, ${BRAND.tealDark} 0%, #134978 100%)`,
          padding: '60px 20px 50px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05
          }}>
            <div style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${BRAND.tealLight} 0%, transparent 70%)`,
              top: '-150px',
              right: '-150px'
            }} />
          </div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '20px' }}>
              <Link 
                href="/glossary" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <IconArrowLeft size={14} color="rgba(255,255,255,0.8)" />
                Back to Glossary
              </Link>
            </div>

            {/* Category Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '16px'
            }}>
              <IconLayers size={14} color={BRAND.tealLight} />
              <span style={{ color: BRAND.tealLight, fontSize: '.85rem', fontWeight: 500 }}>
                {term.category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: BRAND.white,
              marginBottom: '20px',
              lineHeight: 1.2
            }}>
              {term.term}
            </h1>

            {/* Short Definition */}
            <p style={{
              fontSize: '1.1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {term.definition}
            </p>
          </div>
        </section>

        {/* Above-the-fold commercial offer — primary sales surface */}
        <UXUIDCEducationalSalesBanner slug={slug} />

        {/* Main Content Section */}
        <section style={{ background: BRAND.white, padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Introduction */}
            {term.introduction && term.introduction !== term.definition && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: BRAND.teal,
                  marginBottom: '16px'
                }}>
                  Overview
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: BRAND.mediumGray,
                  lineHeight: 1.8
                }}>
                  {term.introduction}
                </p>
              </div>
            )}

            {/* Content Sections */}
            {term.sections && term.sections.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                {term.sections.map((section, index) => (
                  <div key={index} style={{ marginBottom: '30px' }}>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: BRAND.darkGray,
                      marginBottom: '12px'
                    }}>
                      {section.title}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: BRAND.mediumGray,
                      lineHeight: 1.8
                    }}>
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* FAQs */}
            {term.faqs.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: BRAND.teal,
                  marginBottom: '20px'
                }}>
                  Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {term.faqs.map((faq, index) => (
                    <div 
                      key={index}
                      style={{
                        background: BRAND.lightGray,
                        borderRadius: '8px',
                        padding: '20px',
                        borderLeft: `4px solid ${BRAND.teal}`
                      }}
                    >
                      <h4 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: BRAND.darkGray,
                        marginBottom: '8px'
                      }}>
                        {faq.question}
                      </h4>
                      <p style={{
                        fontSize: '.95rem',
                        color: BRAND.mediumGray,
                        lineHeight: 1.7,
                        margin: 0
                      }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Services */}
            {term.relatedServices.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: BRAND.teal,
                  marginBottom: '20px'
                }}>
                  Related Services
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {term.relatedServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: BRAND.white,
                        border: `1px solid ${BRAND.teal}`,
                        borderRadius: '6px',
                        padding: '10px 18px',
                        fontSize: '.9rem',
                        color: BRAND.teal,
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {service.title}
                      <IconChevronRight size={14} color={BRAND.teal} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Terms Section */}
        {relatedTerms.length > 0 && (
          <section style={{ background: BRAND.lightGray, padding: '50px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: BRAND.teal,
                marginBottom: '24px'
              }}>
                Related Terms
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                {relatedTerms.map((relTerm) => (
                  <Link
                    key={relTerm.slug}
                    href={`/mouse-genetics-glossary/${relTerm.slug}`}
                    style={{
                      display: 'block',
                      background: BRAND.white,
                      borderRadius: '8px',
                      padding: '20px',
                      textDecoration: 'none',
                      borderLeft: `4px solid ${BRAND.teal}`,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: BRAND.darkGray,
                      marginBottom: '8px'
                    }}>
                      {relTerm.term}
                    </h3>
                    <p style={{
                      fontSize: '.85rem',
                      color: BRAND.mediumGray,
                      lineHeight: 1.6,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {relTerm.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More from Category */}
        {categoryTerms.length > 0 && (
          <section style={{ background: BRAND.white, padding: '50px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: BRAND.teal,
                marginBottom: '24px'
              }}>
                More in {term.category}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {categoryTerms.map((catTerm) => (
                  <Link
                    key={catTerm.slug}
                    href={`/mouse-genetics-glossary/${catTerm.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: BRAND.lightGray,
                      borderRadius: '20px',
                      padding: '8px 16px',
                      fontSize: '.85rem',
                      color: BRAND.darkGray,
                      fontWeight: 500,
                      textDecoration: 'none'
                    }}
                  >
                    {catTerm.term}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation Between Terms */}
        <section style={{ background: BRAND.lightGray, padding: '30px 20px', borderTop: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            {prev ? (
              <Link
                href={`/mouse-genetics-glossary/${prev.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: BRAND.teal,
                  textDecoration: 'none',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <IconArrowLeft size={16} color={BRAND.teal} />
                <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {prev.term}
                </span>
              </Link>
            ) : <div />}
            
            <Link
              href="/glossary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: BRAND.teal,
                color: BRAND.white,
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <IconDNA size={16} color={BRAND.white} />
              View All Terms
            </Link>
            
            {next ? (
              <Link
                href={`/mouse-genetics-glossary/${next.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: BRAND.teal,
                  textDecoration: 'none',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {next.term}
                </span>
                <IconChevronRight size={16} color={BRAND.teal} />
              </Link>
            ) : <div />}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ background: BRAND.teal, padding: '50px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: BRAND.white,
              marginBottom: '16px'
            }}>
              Need Help with Your Mouse Model Project?
            </h2>
            <p style={{
              fontSize: '.95rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
              lineHeight: 1.7
            }}>
              Our scientific consultants can help you understand the best approach for your research goals.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: BRAND.white,
                color: BRAND.teal,
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Request Custom Quote
                <IconChevronRight size={16} color={BRAND.teal} />
              </Link>
              <Link href="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: BRAND.white,
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <UXUIDCFooter />
      {/* Floating commercial nudge — desktop only */}
      <CatalogStickyRail slug={slug} href={getCatalogLookup(slug).searchHref} />
    </div>
  );
}
