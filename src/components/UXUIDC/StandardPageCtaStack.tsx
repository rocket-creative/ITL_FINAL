/**
 * |UXUIDC| Standard page-closing CTA stack
 *
 * Enforces placement priority:
 *   P0 CatalogCustomDualCta (page-closing)
 *   → P1 BreedingSchemeArchitectCTA (optional)
 *   → P2 LabSignalsSignup (optional, always last)
 */

import CatalogCustomDualCta from './CatalogCustomDualCta';
import BreedingSchemeArchitectCTA from './BreedingSchemeArchitectCTA';
import LabSignalsSignup from './LabSignalsSignup';
import { withCatalogBridge } from '@/data/commercialCtas';

export interface StandardPageCtaStackProps {
  slug: string;
  /** Override dual-CTA catalog headline at close */
  closingTitle?: string;
  /** Override dual-CTA catalog subline at close */
  closingDescription?: string;
  showBreedingScheme?: boolean;
  breedingSchemeVariant?: 'dark' | 'light' | 'gradient';
  showLabSignals?: boolean;
  labSignalsTitle?: string;
  labSignalsDescription?: string;
  labSignalsShowArticles?: boolean;
  labSignalsRelatedArticles?: {
    title: string;
    slug: string;
    category?: string;
  }[];
  className?: string;
}

export default function StandardPageCtaStack({
  slug,
  closingTitle,
  closingDescription,
  showBreedingScheme = true,
  breedingSchemeVariant = 'gradient',
  showLabSignals = true,
  labSignalsTitle,
  labSignalsDescription,
  labSignalsShowArticles = false,
  labSignalsRelatedArticles = [],
  className = '',
}: StandardPageCtaStackProps) {
  const catalogOverrides =
    closingTitle || closingDescription
      ? {
          ...(closingTitle ? { headline: closingTitle } : {}),
          ...(closingDescription
            ? { subline: withCatalogBridge(closingDescription) }
            : {}),
        }
      : undefined;

  return (
    <div className={className}>
      {/* P0 — primary commercial close */}
      <section
        className="px-5"
        style={{ backgroundColor: '#f5f5f4', paddingTop: '3rem', paddingBottom: '3rem' }}
        aria-label="Start your project"
      >
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta
            slug={slug}
            utmMedium="page-closing"
            flush
            catalogOverrides={catalogOverrides}
          />
        </div>
      </section>

      {/* P1 — tool CTA after commercial close */}
      {showBreedingScheme ? (
        <BreedingSchemeArchitectCTA variant={breedingSchemeVariant} />
      ) : null}

      {/* P2 — Lab Signals last among content CTAs */}
      {showLabSignals ? (
        <section style={{ backgroundColor: '#ffffff', padding: '48px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup
              variant="banner"
              title={labSignalsTitle}
              description={labSignalsDescription}
              showArticles={labSignalsShowArticles}
              relatedArticles={labSignalsRelatedArticles}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
