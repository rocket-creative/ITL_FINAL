'use client';

/**
 * Conditional vs Conventional Knockout Comparison Page
 * AI Search Optimization - Comparison content for "X vs Y" queries
 */

import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  BreadcrumbSchema,
  UXUIDCStartProjectCTA,
  GlossaryTermLink,
} from '@/components/UXUIDC';

const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  blue: '#2384da',
  lightGray: '#f7f7f7',
  white: '#ffffff',
};

export default function ConditionalVsConventionalPage() {
  return (
    <div>
      <UXUIDCNavigation />

      <section style={{ backgroundColor: BRAND.navy, padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontSize: '2.8rem', fontWeight: 700, marginBottom: '20px' }}>
            Conditional vs Conventional Knockout
          </h1>
          <p style={{ color: '#b0c4d4', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            Choose the right knockout strategy for your research. Complete comparison of conditional and conventional knockout approaches.
          </p>
        </div>
      </section>

      {/* Quick Decision Guide */}
      <section style={{ backgroundColor: BRAND.lightGray, padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: BRAND.white, padding: '40px', borderRadius: '4px', borderLeft: `4px solid ${BRAND.teal}` }}>
          <h2 style={{ color: BRAND.navy, fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>
            Quick Decision Guide
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <h3 style={{ color: BRAND.teal, fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Choose Conditional If:
              </h3>
              <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Conventional knockout is embryonic lethal</li>
                <li>You need tissue-specific deletion</li>
                <li>You want temporal control over deletion</li>
                <li>Gene has pleiotropic effects</li>
                <li>You need to study adult-onset phenotypes</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: BRAND.blue, fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                Choose Conventional If:
              </h3>
              <ul style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>You want global, constitutive knockout</li>
                <li>Faster timeline is critical (9-12 vs 12-15 months)</li>
                <li>Lower cost is priority</li>
                <li>Developmental effects are part of research question</li>
                <li>Gene knockout is viable and fertile</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ backgroundColor: BRAND.white, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ color: BRAND.navy, fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
            Side by Side Comparison
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: BRAND.white }}>
              <thead>
                <tr style={{ backgroundColor: BRAND.navy }}>
                  <th style={{ padding: '20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>Conditional Knockout</th>
                  <th style={{ padding: '20px', textAlign: 'left', color: BRAND.white, fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>Conventional Knockout</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Timeline', conditional: '12-15 months', conventional: '9-12 months' },
                  { feature: 'Cost', conditional: 'Higher (custom quote)', conventional: 'Lower (custom quote)' },
                  { feature: 'Deletion Pattern', conditional: 'Tissue-specific or inducible', conventional: 'Global, all cells' },
                  { feature: 'Temporal Control', conditional: 'Yes (with inducible Cre)', conventional: 'No, constitutive from zygote' },
                  { feature: 'Embryonic Lethality', conditional: 'Bypassed by tissue-specific deletion', conventional: 'Potential barrier to obtaining adults' },
                  { feature: 'Breeding Complexity', conditional: 'Requires Cre driver cross', conventional: 'Simple heterozygote breeding' },
                  { feature: 'Flexibility', conditional: 'One floxed line + multiple Cre drivers', conventional: 'Single purpose' },
                  { feature: 'Allele Structure', conditional: 'LoxP sites flank critical exon', conventional: 'Critical exon deleted/disrupted' },
                  { feature: 'Best For', conditional: 'Essential genes, cell-type questions', conventional: 'Viable knockouts, global effects' },
                ].map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? BRAND.lightGray : BRAND.white }}>
                    <td style={{ padding: '20px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: BRAND.navy }}>{row.feature}</td>
                    <td style={{ padding: '20px', color: '#666', fontSize: '.95rem' }}>{row.conditional}</td>
                    <td style={{ padding: '20px', color: '#666', fontSize: '.95rem' }}>{row.conventional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to Use Each */}
      <section style={{ backgroundColor: BRAND.lightGray, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: BRAND.navy, fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
            Use Case Scenarios
          </h2>
          
          <div style={{ display: 'grid', gap: '30px' }}>
            <div style={{ backgroundColor: BRAND.white, padding: '30px', borderRadius: '4px', borderLeft: `4px solid ${BRAND.teal}` }}>
              <h3 style={{ color: BRAND.teal, fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Scenario 1: Essential Developmental Gene
              </h3>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Research Question:</strong> What is the role of Gene X in adult heart function?
              </p>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Problem:</strong> Conventional knockout of Gene X causes embryonic lethality at E10.5 due to heart development defects.
              </p>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                <strong>Solution:</strong> <GlossaryTermLink term="conditional-knockout-mouse-models">Conditional knockout</GlossaryTermLink> with cardiac-specific Cre (αMHC-Cre) allows bypass of embryonic lethality, deletion occurs only in adult cardiomyocytes, enabling study of Gene X in mature heart function.
              </p>
            </div>

            <div style={{ backgroundColor: BRAND.white, padding: '30px', borderRadius: '4px', borderLeft: `4px solid ${BRAND.blue}` }}>
              <h3 style={{ color: BRAND.blue, fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Scenario 2: Tumor Suppressor Gene
              </h3>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Research Question:</strong> How does loss of tumor suppressor Gene Y promote cancer development?
              </p>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Approach:</strong> Conventional knockout is viable but mice develop tumors in multiple organs starting at 3 months, complicating analysis.
              </p>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                <strong>Better Solution:</strong> <GlossaryTermLink term="conventional-knockout-mouse-models">Conventional knockout</GlossaryTermLink> if studying systemic tumor suppressor loss, OR conditional knockout with tissue-specific Cre if investigating organ-specific tumor suppressor function.
              </p>
            </div>

            <div style={{ backgroundColor: BRAND.white, padding: '30px', borderRadius: '4px', borderLeft: `4px solid ${BRAND.teal}` }}>
              <h3 style={{ color: BRAND.teal, fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Scenario 3: Neuronal Signaling Gene
              </h3>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Research Question:</strong> Does Gene Z in hippocampal neurons regulate memory formation?
              </p>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Complication:</strong> Gene Z is also expressed in cerebellum affecting motor coordination. Conventional knockout shows both memory and motor deficits.
              </p>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                <strong>Solution:</strong> Conditional knockout with CaMKII-Cre (hippocampus-specific) isolates memory phenotype from motor confounds, definitively answering whether hippocampal Gene Z is required for memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <UXUIDCStartProjectCTA />
      <UXUIDCFooter />
      <UXUIDCCookieConsent />

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Conditional vs Conventional Knockout', path: '/conditional-knockout-vs-conventional-knockout' }]} />
      
      {/* HowTo Schema for AI Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Choose Between Conditional and Conventional Knockout',
            description: 'Guide to selecting the right knockout strategy for mouse model generation',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Assess Gene Viability',
                text: 'Determine if conventional knockout is viable or causes embryonic lethality',
              },
              {
                '@type': 'HowToStep',
                name: 'Define Research Question',
                text: 'Identify if you need tissue-specific or temporal control over gene deletion',
              },
              {
                '@type': 'HowToStep',
                name: 'Evaluate Timeline and Budget',
                text: 'Compare 9-12 month conventional vs 12-15 month conditional timeline and associated costs',
              },
              {
                '@type': 'HowToStep',
                name: 'Select Appropriate Strategy',
                text: 'Choose conditional for essential genes or cell-type questions, conventional for global effects',
              },
            ],
          }),
        }}
      />
    </div>
  );
}
