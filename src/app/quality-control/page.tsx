/**
 * Quality Control Page
 * Authority page detailing QC processes, germline verification, and characterization protocols
 */

export { metadata } from './metadata';

import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  BreadcrumbSchema,
  UXUIDCStartProjectCTA,
  CatalogCustomDualCta,
  IconCheckCircle,
  IconDNA,
  IconTarget,
} from '@/components/UXUIDC';

const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  blue: '#2384da',
  lightGray: '#f7f7f7',
  white: '#ffffff',
};

export default function QualityControlPage() {
  return (
    <div>
      <UXUIDCNavigation />

      <section className="page-hero" style={{ backgroundColor: BRAND.navy, padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            color: BRAND.white,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2.8rem',
            fontWeight: 700,
            marginBottom: '20px',
          }}>
            Quality Control & Characterization
          </h1>
          <p style={{ color: '#b0c4d4', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            Rigorous quality control protocols ensuring stable germline transmission, verified allele structure, and reproducible phenotypes
          </p>
        </div>
      </section>

      {/* Top dual-path CTA */}
      <section className="px-5" style={{ backgroundColor: '#f5f5f4', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1100px' }}>
          <CatalogCustomDualCta slug="quality-control" utmMedium="page-hero" flush />
        </div>
      </section>

      <section style={{ backgroundColor: BRAND.white, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: BRAND.navy, fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
            Quality Control Workflow
          </h2>
          
          {[
            {
              icon: IconDNA,
              title: 'Targeting Vector Validation',
              description: 'Complete sequence verification of all vector components including 5\' and 3\' homology arms (minimum 3-5kb each), selection cassettes, LoxP sites, and intervening sequences. Restriction digest mapping confirms expected fragment patterns. All vectors undergo Sanger sequencing across critical regions before gene targeting.',
            },
            {
              icon: IconTarget,
              title: 'Clone Screening & Verification',
              description: 'Southern blot analysis confirms correct integration at target locus with proper 5\' and 3\' junctions. PCR screening identifies positive clones, followed by long-range PCR across entire targeted region. Karyotype analysis ensures normal chromosome number and structure. Only clones passing all QC criteria advance to blastocyst injection.',
            },
            {
              icon: IconCheckCircle,
              title: 'Founder Characterization',
              description: 'Chimeric founders undergo germline transmission testing through breeding to wild type partners. F1 offspring genotyped by PCR and confirmed by Southern blot where applicable. Expression analysis (RT-PCR, Western blot) verifies expected mRNA and protein changes. Multi-generation breeding confirms stable germline transmission without mosaicism.',
            },
          ].map((item, index) => (
            <div key={index} style={{ backgroundColor: BRAND.lightGray, padding: '40px', marginBottom: '30px', borderRadius: '4px', borderLeft: `4px solid ${BRAND.teal}` }}>
              <div style={{ marginBottom: '20px' }}>
                <item.icon size={40} color={BRAND.teal} />
              </div>
              <h3 style={{ color: BRAND.navy, fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 600, marginBottom: '15px' }}>
                {item.title}
              </h3>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: BRAND.lightGray, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: BRAND.navy, fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
            Deliverables & Documentation
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              'Complete targeting strategy documentation',
              'Targeting vector sequence files and maps',
              'Southern blot images and analysis',
              'PCR genotyping protocols and primer sequences',
              'Breeding records and genealogy',
              'Germline transmission verification data',
              'Expression analysis (when applicable)',
              'Recommended breeding schemes',
              'Health certificates and pathogen testing',
              'Lifetime technical support access',
            ].map((item, index) => (
              <div key={index} style={{ backgroundColor: BRAND.white, padding: '20px', borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <IconCheckCircle size={20} color={BRAND.teal} />
                <span style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.5' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UXUIDCStartProjectCTA />
      <UXUIDCFooter />
      <UXUIDCCookieConsent />

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Quality Control', path: '/quality-control' }]} />
    </div>
  );
}
