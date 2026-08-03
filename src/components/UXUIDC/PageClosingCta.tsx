/**
 * |UXUIDC| Standard page closing CTA, full dual-path widget.
 */

import CatalogCustomDualCta from './CatalogCustomDualCta';
import { withCatalogBridge } from '@/data/commercialCtas';

interface PageClosingCtaProps {
  title: string;
  description: string;
  slug?: string;
  className?: string;
}

export default function PageClosingCta({
  title,
  description,
  slug = 'site',
  className = '',
}: PageClosingCtaProps) {
  const body = withCatalogBridge(description);

  return (
    <section
      className={`py-12 sm:py-16 px-5 ${className}`}
      style={{ backgroundColor: '#f5f5f4' }}
      aria-label="Start your project"
    >
      <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
        <CatalogCustomDualCta
          slug={slug}
          utmMedium="page-closing"
          flush
          catalogOverrides={{
            headline: title,
            subline: body,
          }}
        />
      </div>
    </section>
  );
}
