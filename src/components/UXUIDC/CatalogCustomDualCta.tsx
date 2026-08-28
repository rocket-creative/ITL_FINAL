/**
 * |UXUIDC| Sitewide dual-path CTA, equal catalog + generation columns.
 * Use everywhere a commercial CTA appears (closing sections, heroes, banners).
 */

import type { CSSProperties } from 'react';
import Link from 'next/link';
import {
  CATALOG_OR_CUSTOM_WIDGET_INTRO,
  COMMERCIAL_LINKS,
  CUSTOM_MODEL_PANEL,
  commercialUtmHref,
} from '@/data/commercialCtas';
import { getCatalogLookup, type CatalogLookup } from './catalogLookupMap';

export type { CatalogGene, CatalogLookup } from './catalogLookupMap';
export { getCatalogLookup, hasEducationalCatalogMap } from './catalogLookupMap';

export interface CatalogCustomDualCtaProps {
  /** Page slug for lookup data and UTM campaign */
  slug?: string;
  /** Override catalog column fields (e.g. page-specific closing copy) */
  catalogOverrides?: Partial<CatalogLookup>;
  utmMedium?: string;
  utmSource?: string;
  className?: string;
  /** Remove outer margin when nested inside a padded section */
  flush?: boolean;
  /**
   * Heading level for the widget title. Use 2 when the widget is the first
   * section after the page h1, otherwise it skips a level.
   */
  headingLevel?: 2 | 3;
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

function mergeLookup(slug: string, catalogOverrides?: Partial<CatalogLookup>): CatalogLookup {
  const base = getCatalogLookup(slug);
  if (!catalogOverrides) return base;
  return { ...base, ...catalogOverrides };
}

export default function CatalogCustomDualCta({
  slug = 'site',
  catalogOverrides,
  utmMedium = 'site-cta',
  utmSource = 'organic',
  className = '',
  flush = false,
  headingLevel = 3,
}: CatalogCustomDualCtaProps) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  // Panel titles sit one level under the widget title.
  const PanelHeading = `h${headingLevel + 1}` as 'h3' | 'h4';
  const lookup = mergeLookup(slug, catalogOverrides);
  const catalogSearchUrl = commercialUtmHref(lookup.searchHref, {
    source: utmSource,
    medium: utmMedium,
    campaign: `catalog-search-${slug}`,
  });
  const quoteUrl = commercialUtmHref(COMMERCIAL_LINKS.requestQuote, {
    source: utmSource,
    medium: utmMedium,
    campaign: `catalog-widget-generated-${slug}`,
  });

  return (
    <aside
      aria-label="Catalog or mouse model generation options"
      className={className}
      style={{
        margin: flush ? 0 : '2.5rem 0',
        padding: '24px',
        backgroundColor: '#f7f9fa',
        border: '1px solid #d8e3e6',
        borderRadius: '6px',
      }}
    >
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ ...panelEyebrow, color: '#0a253c' }}>{CATALOG_OR_CUSTOM_WIDGET_INTRO.eyebrow}</div>
        <Heading
          style={{
            ...panelTitle,
            fontSize: '1.35rem',
            marginBottom: '6px',
          }}
        >
          {CATALOG_OR_CUSTOM_WIDGET_INTRO.headline}
        </Heading>
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
          <PanelHeading style={panelTitle}>{lookup.headline}</PanelHeading>
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
                href={commercialUtmHref(`/all-catalog-mouse-models/gene/${gene.slug}/`, {
                  source: utmSource,
                  medium: utmMedium,
                  campaign: `catalog-gene-${slug}`,
                })}
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

        <section
          aria-label="Request a generated mouse model"
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
          <PanelHeading style={panelTitle}>{CUSTOM_MODEL_PANEL.headline}</PanelHeading>

          <ul
            style={{
              margin: '12px 0 16px 0',
              paddingLeft: '20px',
              listStyleType: 'disc',
              listStylePosition: 'outside',
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

          <p style={panelBody}>{CUSTOM_MODEL_PANEL.subline}</p>

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
            data-cta="catalog-widget-generated-services"
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
