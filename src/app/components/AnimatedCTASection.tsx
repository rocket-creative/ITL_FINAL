/**
 * Animated Final CTA Section — sitewide dual-path widget
 * @version 4.0.0
 */

'use client';

import CatalogCustomDualCta from '@/components/UXUIDC/CatalogCustomDualCta';

export default function AnimatedCTASection() {
  return (
    <section
      className="flex flex-col justify-start items-center px-5"
      style={{
        backgroundColor: '#f5f5f4',
        padding: '50px 20px',
      }}
    >
      <div className="w-full" style={{ maxWidth: '1100px' }}>
        <CatalogCustomDualCta slug="homepage" utmMedium="homepage-closing" flush />
      </div>
    </section>
  );
}
