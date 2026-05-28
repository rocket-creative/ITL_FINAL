'use client';

/**
 * |UXUIDC| Start Project CTA — sitewide dual-path widget.
 */

import CatalogCustomDualCta from './CatalogCustomDualCta';
import { startProjectDefaults, withCatalogBridge } from '@/data/commercialCtas';

interface StartProjectCTAProps {
  title?: string;
  content?: string;
  slug?: string;
}

export default function UXUIDCStartProjectCTA({
  title = startProjectDefaults.title,
  content = startProjectDefaults.content,
  slug = 'start-project',
}: StartProjectCTAProps = {}) {
  const body = withCatalogBridge(content);

  return (
    <section
      className="flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 px-5"
      style={{ backgroundColor: '#f5f5f4' }}
    >
      <div className="w-full mx-auto" style={{ maxWidth: '1100px' }}>
        <CatalogCustomDualCta
          slug={slug}
          utmMedium="start-project-cta"
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
