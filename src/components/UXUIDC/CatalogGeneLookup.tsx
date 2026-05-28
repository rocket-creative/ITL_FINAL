/**
 * |UXUIDC| Catalog Gene Lookup
 *
 * Mid-article widget with equal catalog + custom paths (50/50 columns).
 *  - Left: ready-to-ship catalog search, hero genes, catalog CTA
 *  - Right: custom model services, bullets, quote + services CTAs
 *
 * Per-slug data lives below as the single source of truth. Slugs match
 * both blog and glossary surfaces.
 */

import type { CSSProperties } from 'react';
import Link from 'next/link';
import {
  CATALOG_OR_CUSTOM_WIDGET_INTRO,
  COMMERCIAL_LINKS,
  CUSTOM_MODEL_PANEL,
  commercialUtmHref,
} from '@/data/commercialCtas';

export interface CatalogGene {
  /** Gene symbol shown to user (case as published, e.g. "Trp53") */
  symbol: string;
  /** URL gene segment (matches catalog gene page route param) */
  slug: string;
  /** Short why-this-gene blurb (1 line) */
  blurb: string;
}

export interface CatalogLookup {
  /** Eyebrow over the widget */
  eyebrow: string;
  /** Headline */
  headline: string;
  /** Subline */
  subline: string;
  /** Pre-filled search href (catalog search) */
  searchHref: string;
  /** Search button label */
  searchLabel: string;
  /** Hero genes for this topic (3 ideal) */
  genes: CatalogGene[];
}

const DEFAULT_LOOKUP: CatalogLookup = {
  eyebrow: 'Ready to ship',
  headline: 'Search 14,774 strains. Many ship from live colonies.',
  subline:
    'Browse by gene, model type, or therapeutic area. Live colonies available for many top requested knockouts, knockins, and humanized lines.',
  searchHref: '/all-catalog-mouse-models/',
  searchLabel: 'Browse Full Catalog',
  genes: [
    { symbol: 'Trp53', slug: 'Trp53', blurb: 'Tumor suppressor — knockout & knockin' },
    { symbol: 'Brca1', slug: 'Brca1', blurb: 'Breast cancer model — multiple alleles' },
    { symbol: 'Rosa26', slug: 'Gt(ROSA)26Sor', blurb: 'Safe harbor for reporters & cassettes' },
  ],
};

const LOOKUP_MAP: Record<string, CatalogLookup> = {
  // POINT MUTATION cluster
  'what-is-a-point-mutation': {
    eyebrow: 'Catalog Models',
    headline: 'Point mutation knockins. Check live colonies before you plan a build.',
    subline:
      'Hundreds of disease variant knockin models are in stock. Search by gene or browse popular hits. Need a unique variant? We design custom knockins.',
    searchHref: '/all-catalog-mouse-models/?q=point+mutation',
    searchLabel: 'Search Point Mutation Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Tumor suppressor variants — multiple knockin alleles' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H — disease variant' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Conditional & point mutation alleles' },
    ],
  },
  'types-of-point-mutations': {
    eyebrow: 'Already in our catalog?',
    headline: 'See ready-to-ship point mutation knockin models.',
    subline:
      'Substitution, insertion, and deletion variants in stock. Search by your gene of interest.',
    searchHref: '/all-catalog-mouse-models/?q=point+mutation',
    searchLabel: 'Search Point Mutation Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Multiple substitution & deletion alleles' },
      { symbol: 'Lig1', slug: 'Lig1', blurb: 'DNA repair — knockin variants' },
      { symbol: 'Pdk3', slug: 'Pdk3', blurb: 'Conditional & point mutation' },
    ],
  },
  'point-mutation-diseases': {
    eyebrow: 'Already in our catalog?',
    headline: 'Disease-variant knockin mice — already built.',
    subline:
      'Cancer, metabolic, immune, and rare disease variants in the catalog. Live colonies available.',
    searchHref: '/all-catalog-mouse-models/?q=disease',
    searchLabel: 'Browse Disease Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Cancer — tumor suppressor variants' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized — metabolic disease' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized — complement disorders' },
    ],
  },
  'point-mutation': {
    eyebrow: 'Already in our catalog?',
    headline: 'See ready-to-ship point mutation knockin models.',
    subline:
      'Substitution, insertion, and deletion variants in stock. Search by your gene.',
    searchHref: '/all-catalog-mouse-models/?q=point+mutation',
    searchLabel: 'Search Point Mutation Models',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Multiple substitution & deletion alleles' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Lig1', slug: 'Lig1', blurb: 'DNA repair — knockin variants' },
    ],
  },

  // KNOCKOUT / KNOCKIN
  'difference-between-knock-in-and-knockout': {
    eyebrow: 'Already in our catalog?',
    headline: 'Knockout & knockin mice — ready to ship.',
    subline:
      '14,774 catalog models. Many ship from live colonies in weeks, not months.',
    searchHref: '/all-catalog-mouse-models/',
    searchLabel: 'Search the Full Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Knockout & knockin — multiple alleles' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'Knockout — innate immunity' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'Knockout — neuroscience & immunology' },
    ],
  },
  'conventional-vs-conditional-knockout': {
    eyebrow: 'Already in our catalog?',
    headline: 'Conventional or conditional knockout — many already built.',
    subline:
      'Search live colonies of knockouts and floxed/conditional alleles by gene.',
    searchHref: '/all-catalog-mouse-models/?q=knockout',
    searchLabel: 'Browse Knockout Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Conventional & conditional knockout' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Conditional knockout — floxed allele' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout — multiple lines' },
    ],
  },
  'how-a-knockout-mouse-is-made': {
    eyebrow: 'Already in our catalog?',
    headline: 'Knockout already built? Save months.',
    subline:
      '14,774 catalog models. Live colonies for many top-requested knockouts.',
    searchHref: '/all-catalog-mouse-models/?q=knockout',
    searchLabel: 'Browse Knockout Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Tumor suppressor — multiple alleles' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'Innate immunity knockout' },
      { symbol: 'Neu1', slug: 'Neu1', blurb: 'Neuraminidase knockout' },
    ],
  },

  // CRE / CreERT2 / TAMOXIFEN
  'tamoxifen-inducible-cre': {
    eyebrow: 'Already in our catalog?',
    headline: 'CreERT2 driver lines — ready to ship.',
    subline:
      'Tissue-specific tamoxifen-inducible Cre lines and floxed alleles. Live colonies available.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre Driver Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-CreERT2 ubiquitous driver' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Tissue-specific Cre line' },
      { symbol: 'Ywhaq', slug: 'Ywhaq', blurb: 'Floxed allele — pair with CreERT2' },
    ],
  },
  'inducible-cre-ert2': {
    eyebrow: 'Already in our catalog?',
    headline: 'Looking for a CreERT2 line? Many already built.',
    subline:
      'Tissue-specific tamoxifen-inducible Cre and floxed alleles. Search live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre Driver Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-CreERT2 ubiquitous driver' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Tissue-specific Cre line' },
      { symbol: 'Lamtor5', slug: 'Lamtor5', blurb: 'Conditional — pair with Cre' },
    ],
  },
  'cre-recombinase': {
    eyebrow: 'Already in our catalog?',
    headline: 'Cre driver lines — ready to ship.',
    subline:
      'Tissue-specific Cre, CreERT2, and conditional lines. Search live colonies by gene or tissue.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre Driver Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-Cre ubiquitous driver' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Tissue-specific Cre line' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — pair with any Cre' },
    ],
  },
  'cre-lox-system': {
    eyebrow: 'Already in our catalog?',
    headline: 'Cre/lox conditional models — ready to ship.',
    subline:
      'Floxed alleles + tissue-specific Cre lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre/lox Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-Cre ubiquitous driver' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — pair with any Cre' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout — floxed allele' },
    ],
  },
  'cre-flox': {
    eyebrow: 'Already in our catalog?',
    headline: 'Cre/lox conditional models — ready to ship.',
    subline:
      'Floxed alleles + tissue-specific Cre lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=cre',
    searchLabel: 'Browse Cre/lox Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26-Cre ubiquitous driver' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — pair with any Cre' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout — floxed allele' },
    ],
  },
  'floxing': {
    eyebrow: 'Already in our catalog?',
    headline: 'Floxed alleles — many already built.',
    subline:
      'Search the catalog for floxed mice ready to ship from live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=floxed',
    searchLabel: 'Browse Floxed Catalog',
    genes: [
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Floxed — multiple alleles' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Floxed — conditional knockout' },
      { symbol: 'Pdk3', slug: 'Pdk3', blurb: 'Floxed — multiple alleles' },
    ],
  },

  // GLOSSARY: high-impression terms
  'non-homologous-end-joining': {
    eyebrow: 'Already in our catalog?',
    headline: 'CRISPR knockouts — many already built.',
    subline:
      '14,774 ready models. Search by gene to skip the build entirely.',
    searchHref: '/all-catalog-mouse-models/?q=knockout',
    searchLabel: 'Browse Knockout Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'CRISPR knockout — multiple alleles' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'Innate immunity knockout' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'Neuroscience & immunology knockout' },
    ],
  },
  'open-reading-frame': {
    eyebrow: 'Already in our catalog?',
    headline: 'ORF knockin & humanization — already in stock.',
    subline:
      'Knockin and humanized models in live colonies. Search by gene to ship faster.',
    searchHref: '/all-catalog-mouse-models/?q=knockin',
    searchLabel: 'Browse Knockin Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor knockin' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
    ],
  },
  'c57bl6j-vs-c57bl6n': {
    eyebrow: 'Already in our catalog?',
    headline: 'Catalog models on C57BL/6J and C57BL/6N.',
    subline:
      'Search by gene; pick the strain background you need.',
    searchHref: '/all-catalog-mouse-models/?q=C57BL%2F6',
    searchLabel: 'Browse Catalog by Strain',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'On C57BL/6 backgrounds' },
    ],
  },
  'c57bl6-mouse-background': {
    eyebrow: 'Already in our catalog?',
    headline: 'Catalog models on C57BL/6J and C57BL/6N.',
    subline:
      'Search by gene; pick the strain background you need.',
    searchHref: '/all-catalog-mouse-models/?q=C57BL%2F6',
    searchLabel: 'Browse Catalog by Strain',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Tlr5', slug: 'Tlr5', blurb: 'On C57BL/6 backgrounds' },
      { symbol: 'Mog', slug: 'Mog', blurb: 'On C57BL/6 backgrounds' },
    ],
  },
  'allele-genotype-phenotype': {
    eyebrow: 'Already in our catalog?',
    headline: '14,774 mouse models with known alleles.',
    subline:
      'Skip allele design — search live colonies by gene.',
    searchHref: '/all-catalog-mouse-models/',
    searchLabel: 'Search the Full Catalog',
    genes: [
      { symbol: 'Trp53', slug: 'Trp53', blurb: 'Multiple alleles & phenotypes' },
      { symbol: 'Hdac3', slug: 'Hdac3', blurb: 'Conditional & full knockout' },
      { symbol: 'Ets2', slug: 'Ets2', blurb: 'Conditional knockout' },
    ],
  },

  // HUMANIZED
  'humanized-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Humanized mouse models — ready to ship.',
    subline:
      'Drug-target and immune checkpoint humanized lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=humanized',
    searchLabel: 'Browse Humanized Catalog',
    genes: [
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'why-make-a-humanized-mouse': {
    eyebrow: 'Already in our catalog?',
    headline: 'Humanized mouse models — ready to ship.',
    subline:
      'Drug-target and immune checkpoint humanized lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=humanized',
    searchLabel: 'Browse Humanized Catalog',
    genes: [
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'history-of-creating-genetically-humanized-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Humanized mouse models — ready to ship.',
    subline:
      'Drug-target and immune checkpoint humanized lines in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=humanized',
    searchLabel: 'Browse Humanized Catalog',
    genes: [
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized SCAP — metabolic' },
      { symbol: 'hCFH', slug: 'hCFH', blurb: 'Humanized complement factor H' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },

  // TRANSGENE / TRANSGENIC
  'what-is-a-transgene': {
    eyebrow: 'Already in our catalog?',
    headline: 'Transgenic and knockin mice — many already built.',
    subline:
      'Skip transgenesis — search live colonies of catalog models by gene.',
    searchHref: '/all-catalog-mouse-models/?q=transgenic',
    searchLabel: 'Browse Transgenic Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor transgene' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized transgene' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'transgenic-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Transgenic mice — already built.',
    subline:
      'Skip transgenesis — search live colonies of catalog models by gene.',
    searchHref: '/all-catalog-mouse-models/?q=transgenic',
    searchLabel: 'Browse Transgenic Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized transgene' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },
  'how-to-make-a-transgenic-mouse': {
    eyebrow: 'Already in our catalog?',
    headline: 'Transgenic mice — already built. Skip the protocol.',
    subline:
      '14,774 catalog models with live colonies. Search by gene.',
    searchHref: '/all-catalog-mouse-models/?q=transgenic',
    searchLabel: 'Browse Transgenic Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor' },
      { symbol: 'hSCAP', slug: 'hSCAP', blurb: 'Humanized transgene' },
      { symbol: 'Jchain', slug: 'Jchain', blurb: 'Humanized — immunology' },
    ],
  },

  // ROSA26
  'rosa26': {
    eyebrow: 'Already in our catalog?',
    headline: 'Rosa26 knockin lines — ready to ship.',
    subline:
      'Reporter, conditional cassette, and inducible Rosa26 knockins in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=rosa26',
    searchLabel: 'Browse Rosa26 Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor — many alleles' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Cre driver — pair with Rosa26 reporter' },
      { symbol: 'Pgm3', slug: 'Pgm3', blurb: 'Conditional knockin' },
    ],
  },
  'rosa26-mice': {
    eyebrow: 'Already in our catalog?',
    headline: 'Rosa26 knockin lines — ready to ship.',
    subline:
      'Reporter, conditional cassette, and inducible Rosa26 knockins in live colonies.',
    searchHref: '/all-catalog-mouse-models/?q=rosa26',
    searchLabel: 'Browse Rosa26 Catalog',
    genes: [
      { symbol: 'Gt(ROSA)26Sor', slug: 'Gt(ROSA)26Sor', blurb: 'Rosa26 safe harbor — many alleles' },
      { symbol: 'Hoxa11', slug: 'Hoxa11', blurb: 'Cre driver — pair with Rosa26 reporter' },
      { symbol: 'Pgm3', slug: 'Pgm3', blurb: 'Conditional knockin' },
    ],
  },
};

export function getCatalogLookup(slug: string): CatalogLookup {
  return LOOKUP_MAP[slug] ?? DEFAULT_LOOKUP;
}

/** Slugs with topic-specific catalog lookup (not the site-wide default). */
export function hasEducationalCatalogMap(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(LOOKUP_MAP, slug);
}

interface Props {
  slug: string;
}

const panelEyebrow: CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '1.4px',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

const panelTitle: CSSProperties = {
  color: '#0a253c',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.15rem',
  fontWeight: 700,
  lineHeight: 1.3,
  margin: '0 0 8px 0',
};

const panelBody: CSSProperties = {
  color: '#444',
  fontFamily: 'Lato, -apple-system, sans-serif',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  margin: '0 0 16px 0',
};

const panelBtn: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '100%',
  padding: '12px 20px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.88rem',
  letterSpacing: '0.3px',
  boxSizing: 'border-box',
};

export default function CatalogGeneLookup({ slug }: Props) {
  const lookup = getCatalogLookup(slug);
  const catalogSearchUrl = `${lookup.searchHref}${lookup.searchHref.includes('?') ? '&' : '?'}utm_source=organic&utm_medium=educational&utm_campaign=catalog-search-${slug}`;
  const quoteUrl = commercialUtmHref(COMMERCIAL_LINKS.requestQuote, {
    source: 'organic',
    medium: 'educational',
    campaign: `catalog-widget-custom-${slug}`,
  });

  return (
    <aside
      aria-label="Catalog or custom mouse model options"
      style={{
        margin: '2.5rem 0',
        padding: '24px',
        backgroundColor: '#f7f9fa',
        border: '1px solid #d8e3e6',
        borderRadius: '6px',
      }}
    >
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ ...panelEyebrow, color: '#0a253c' }}>{CATALOG_OR_CUSTOM_WIDGET_INTRO.eyebrow}</div>
        <h3
          style={{
            ...panelTitle,
            fontSize: '1.35rem',
            marginBottom: '6px',
          }}
        >
          {CATALOG_OR_CUSTOM_WIDGET_INTRO.headline}
        </h3>
        <p style={{ ...panelBody, marginBottom: 0, maxWidth: '640px', margin: '0 auto' }}>
          {CATALOG_OR_CUSTOM_WIDGET_INTRO.subline}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          alignItems: 'stretch',
        }}
      >
        {/* Catalog path — equal column */}
        <section
          aria-label="Browse catalog models"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #d8e3e6',
            borderLeft: '4px solid #008080',
            borderRadius: '6px',
          }}
        >
          <div style={{ ...panelEyebrow, color: '#008080' }}>{lookup.eyebrow}</div>
          <h4 style={panelTitle}>{lookup.headline}</h4>
          <p style={panelBody}>{lookup.subline}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '8px',
              marginBottom: '16px',
              flex: 1,
            }}
          >
            {lookup.genes.map((gene) => (
              <Link
                key={gene.slug}
                href={`/all-catalog-mouse-models/gene/${gene.slug}/?utm_source=organic&utm_medium=educational&utm_campaign=catalog-gene-${slug}`}
                data-cta="catalog-gene-chip"
                data-cta-slug={slug}
                data-cta-gene={gene.symbol}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  padding: '12px 14px',
                  backgroundColor: '#f7f9fa',
                  border: '1px solid #d8e3e6',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    fontStyle: 'italic',
                  }}
                >
                  {gene.symbol}
                </span>
                <span style={{ color: '#555', fontSize: '0.78rem', lineHeight: 1.4 }}>{gene.blurb}</span>
              </Link>
            ))}
          </div>

          <Link
            href={catalogSearchUrl}
            data-cta="catalog-search"
            data-cta-slug={slug}
            style={{
              ...panelBtn,
              backgroundColor: '#008080',
              color: '#ffffff',
              marginTop: 'auto',
            }}
          >
            {lookup.searchLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        {/* Custom path — equal column */}
        <section
          aria-label="Request a custom mouse model"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #d8e3e6',
            borderLeft: '4px solid #0a253c',
            borderRadius: '6px',
          }}
        >
          <div style={{ ...panelEyebrow, color: '#0a253c' }}>{CUSTOM_MODEL_PANEL.eyebrow}</div>
          <h4 style={panelTitle}>{CUSTOM_MODEL_PANEL.headline}</h4>
          <p style={panelBody}>{CUSTOM_MODEL_PANEL.subline}</p>

          <ul
            style={{
              margin: '0 0 16px 0',
              paddingLeft: '18px',
              color: '#444',
              fontFamily: 'Lato, -apple-system, sans-serif',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              flex: 1,
            }}
          >
            {CUSTOM_MODEL_PANEL.bullets.map((item) => (
              <li key={item} style={{ marginBottom: '6px' }}>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href={quoteUrl}
            data-cta="catalog-widget-request-quote"
            data-cta-slug={slug}
            style={{
              ...panelBtn,
              backgroundColor: '#0a253c',
              color: '#ffffff',
              marginBottom: '10px',
            }}
          >
            {CUSTOM_MODEL_PANEL.quoteLabel}
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href={COMMERCIAL_LINKS.customHub}
            data-cta="catalog-widget-custom-services"
            data-cta-slug={slug}
            style={{
              ...panelBtn,
              backgroundColor: 'transparent',
              color: '#0a253c',
              border: '2px solid #0a253c',
            }}
          >
            {CUSTOM_MODEL_PANEL.servicesLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </aside>
  );
}
