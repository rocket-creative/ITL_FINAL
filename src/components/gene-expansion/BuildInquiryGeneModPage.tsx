/**
 * build_inquiry gene × modification page, spec §6.
 */

import Link from 'next/link';
import { getRelatedGenes, getModelsByGene } from '@/lib/catalog/serverCatalog';
import { UXUIDCNavigation, UXUIDCFooter, CatalogCustomDualCta } from '@/components/UXUIDC';
import SuppressBuildBannerEffect from '@/components/UXUIDC/SuppressBuildBannerEffect';
import { IconChevronRight } from '@/components/UXUIDC/Icons';
import { getGeneMatchedPublications } from '@/lib/catalog/geneMatchedPublications';
import { modCanonicalToSlug } from '@/lib/seo/slugs';
import type { BuildInquiryPageContext } from '@/lib/gene-expansion/db';
import { getSiblingBuildInquiryPages } from '@/lib/gene-expansion/db';
import { buildPageCopy } from '@/lib/gene-expansion/content';
import GeneModAiAnswerLead from '@/components/gene-expansion/GeneModAiAnswerLead';
import { buildTierGeneModFaqs } from '@/lib/seo/faqBuilders';
import { buildBuildInquirySchemaGraph } from '@/lib/gene-expansion/schema';
const TESTIMONIALS = [
  {
    quote: 'ingenious targeting laboratory delivered exactly the floxed allele we designed, with clear milestones and germline confirmed founders.',
    name: 'Dr. Sarah Plumley',
    institution: 'Academic research laboratory',
  },
  {
    quote: 'The team translated our humanization requirements into a knockin strategy we could breed and phenotype on schedule.',
    name: 'Dr. Michael Basson',
    institution: 'Pharmaceutical research group',
  },
  {
    quote: 'Clear communication on allele design and germline transmission made our conditional knockout program straightforward to execute.',
    name: 'Dr. Grant Dunaief',
    institution: 'Academic neuroscience laboratory',
  },
];

export interface BuildInquiryGeneModPageProps {
  ctx: BuildInquiryPageContext;
  modSlug: string;
}

export default async function BuildInquiryGeneModPage({ ctx, modSlug }: BuildInquiryGeneModPageProps) {
  const { gene, modelType, page } = ctx;
  const copy = buildPageCopy(gene, modelType);
  const faqs = buildTierGeneModFaqs({ gene: gene.symbol, modLabel: modelType.display_name });
  const relatedGenes = await getRelatedGenes(gene.symbol, 8);
  const siblings = await getSiblingBuildInquiryPages(gene.symbol, modSlug);
  const catalogModels = await getModelsByGene(gene.symbol);
  const catalogTypes = [...new Set(catalogModels.map((m) => m.modelType).filter(Boolean))];
  const pubs = getGeneMatchedPublications(
    [gene.symbol, gene.human_ortholog_symbol].filter(Boolean) as string[],
  );
  const quoteHref = `/request-quote/?gene=${encodeURIComponent(gene.symbol)}&type=${encodeURIComponent(modSlug)}`;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }} data-page-mode="build_inquiry">
      <SuppressBuildBannerEffect />
      <UXUIDCNavigation />
      <main id="main-content">
        {/* Zone 1, Trust and positioning */}
        <section className="page-hero" style={{ background: '#0a253c', padding: '80px 20px 60px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: '.85rem' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href="/all-catalog-mouse-models/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Catalog</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li><Link href={`/all-catalog-mouse-models/gene/${encodeURIComponent(gene.symbol)}/`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{gene.symbol}</Link></li>
                <li style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.9)' }}>{modelType.display_name}</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
              {copy.h1}
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.75, maxWidth: '880px', marginBottom: '12px' }}>
              {copy.heroIntro}
            </p>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.75, maxWidth: '880px', marginBottom: '24px' }}>
              {copy.geneFraming}
            </p>
            <Link
              href={quoteHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#008080', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontWeight: 600, textDecoration: 'none' }}
            >
              Get a Quote in 24 Hours <IconChevronRight size={16} color="#fff" />
            </Link>
          </div>
        </section>

        {/* Top dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="all-catalog-mouse-models" utmMedium="page-hero" flush />
          </div>
        </section>

        <GeneModAiAnswerLead
          geneSymbol={gene.symbol}
          modLabel={modelType.display_name}
          catalogCount={0}
          isBuildInquiry
          humanSymbol={gene.human_ortholog_symbol || undefined}
          commonName={
            gene.synonyms.find((s) => s.trim().length > 0 && s.trim().length <= 40) ||
            (gene.name && gene.name.length <= 40 ? gene.name : undefined)
          }
        />

        {/* Zone 2, Scientific design block */}
        <section style={{ background: '#fff', padding: '56px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.45rem', fontWeight: 700, color: '#0a253c', marginBottom: '16px' }}>
              Scientific design
            </h2>
            <p style={{ color: '#444', lineHeight: 1.85, marginBottom: '16px' }}>{copy.viabilityNote}</p>
            <p style={{ color: '#444', lineHeight: 1.85, marginBottom: '16px' }}>{copy.alleleGap}</p>
            <p style={{ color: '#444', lineHeight: 1.85, marginBottom: '16px' }}>{copy.modificationRationale}</p>
            {copy.typeSpecificNote ? (
              <p style={{ color: '#444', lineHeight: 1.85, marginBottom: '16px' }}>{copy.typeSpecificNote}</p>
            ) : null}
            <p style={{ color: '#444', lineHeight: 1.85 }}>{copy.timeline}</p>
          </div>
        </section>

        {copy.reporterSections ? (
          <section style={{ background: '#f8f9fa', padding: '48px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '20px' }}>
                Reporter options for {gene.symbol}
              </h2>
              {copy.reporterSections.map((section) => (
                <div key={section.title} style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a253c', marginBottom: '8px' }}>{section.title}</h3>
                  <p style={{ color: '#444', lineHeight: 1.75 }}>{section.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Credibility block */}
        <section style={{ background: '#fff', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '20px' }}>What researchers say</h2>
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} style={{ margin: '0 0 24px', padding: '0 0 0 16px', borderLeft: '3px solid #008080' }}>
                <p style={{ color: '#444', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '8px' }}>&ldquo;{t.quote}&rdquo;</p>
                <footer style={{ color: '#666', fontSize: '.9rem' }}>{t.name}, {t.institution}</footer>
              </blockquote>
            ))}
            {pubs.length > 0 ? (
              <>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Selected publications</h3>
                <ul style={{ paddingLeft: '1.2rem', color: '#444' }}>
                  {pubs.slice(0, 5).map((p) => (
                    <li key={p.link} style={{ marginBottom: '8px' }}>
                      <a href={p.link} style={{ color: '#008080' }}>{p.title}</a>
                    </li>
                  ))}
                </ul>
                <Link href="/publications/" style={{ color: '#008080', fontWeight: 600 }}>View all publications →</Link>
              </>
            ) : null}
          </div>
        </section>

        <section style={{ background: '#f8f9fa', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0a253c', marginBottom: '20px' }}>FAQ</h2>
            {faqs.map((f) => (
              <div key={f.question} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a253c' }}>{f.question}</h3>
                <p style={{ color: '#444', lineHeight: 1.75 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zone 3, Navigation and CTA */}
        <section style={{ background: '#fff', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a253c', marginBottom: '12px' }}>Related modifications</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <Link href={`/all-catalog-mouse-models/gene/${encodeURIComponent(gene.symbol)}/`} style={{ padding: '8px 14px', border: '1px solid #008080', borderRadius: '4px', color: '#008080', fontWeight: 600, textDecoration: 'none' }}>
                All {gene.symbol} models
              </Link>
              {catalogTypes.map((t) => (
                <Link
                  key={t}
                  href={`/all-catalog-mouse-models/gene/${encodeURIComponent(gene.symbol)}/${modCanonicalToSlug(t)}/`}
                  style={{ padding: '8px 14px', border: '1px solid #008080', borderRadius: '4px', color: '#008080', fontWeight: 600, textDecoration: 'none' }}
                >
                  {gene.symbol} {t} (catalog)
                </Link>
              ))}
              {siblings.filter((s) => s.isIndexable).map((s) => (
                <Link key={s.slug} href={s.href} style={{ padding: '8px 14px', border: '1px solid #134978', borderRadius: '4px', color: '#134978', fontWeight: 600, textDecoration: 'none' }}>
                  {gene.symbol} {s.displayName}
                </Link>
              ))}
            </div>
            {relatedGenes.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {relatedGenes.map((g) => (
                  <Link key={g} href={`/all-catalog-mouse-models/gene/${encodeURIComponent(g)}/${modSlug}/`} style={{ padding: '6px 12px', background: '#f0f9f9', borderRadius: '4px', color: '#008080', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>
                    {g} {modelType.display_name}
                  </Link>
                ))}
              </div>
            ) : null}
            <Link href={quoteHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#008080', color: '#fff', padding: '14px 28px', borderRadius: '4px', fontWeight: 700, textDecoration: 'none' }}>
              Get a Quote in 24 Hours <IconChevronRight size={16} color="#fff" />
            </Link>
          </div>
        </section>

        {/* Bottom dual-path CTA */}
        <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
            <CatalogCustomDualCta slug="all-catalog-mouse-models" utmMedium="page-closing" flush />
          </div>
        </section>
      </main>
      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBuildInquirySchemaGraph(gene, modelType, modSlug)),
        }}
      />
    </div>
  );
}
