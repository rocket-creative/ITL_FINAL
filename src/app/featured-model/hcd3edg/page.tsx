'use client';

import Link from 'next/link';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import { IconChevronRight, IconCheckCircle, IconFlask, IconLayers, IconShield, IconDNA } from '@/components/UXUIDC/Icons';

const PDF_HREF = '/downloads/hcd3edg-ingenious.pdf';

const strainSpecs = [
  { param: 'Model Name', detail: 'hCD3EDG' },
  { param: 'Full Strain Name', detail: 'C57BL/6Smoc Cd3e^tm1(hCD3E) Cd3d^tm1(hCD3D) Cd3g^tm1(hCD3G) Smoc' },
  { param: 'Catalog Number', detail: 'NM-HU-220120' },
  { param: 'Genetic Background', detail: 'C57BL/6Smoc' },
  { param: 'Strain State', detail: 'Repository Live — ready to ship' },
  { param: 'Humanized Genes', detail: 'CD3E (epsilon), CD3D (delta), CD3G (gamma)' },
  { param: 'Zygosity', detail: 'Homozygous' },
  { param: 'Category', detail: 'Humanized Mouse Models' },
];

const immuneData = [
  { population: 'mCD45+ (total leukocytes)', wt: '~99%', ho: '~99%', status: 'Normal' },
  { population: 'mCD19+ (B cells)', wt: '~47 to 50%', ho: '~51%', status: 'Normal' },
  { population: 'mCD3/hCD3+ (T cells)', wt: 'Present (mCD3)', ho: 'Present (hCD3)', status: 'Humanized' },
  { population: 'mCD4/mCD8 ratio', wt: 'Normal', ho: 'Normal', status: 'Preserved' },
  { population: 'Tregs (FoxP3+)', wt: '~9.6%', ho: '~9.7%', status: 'Normal' },
  { population: 'NK/NKT cells', wt: '~5%', ho: '~5%', status: 'Normal' },
];

const efficacyFormats = [
  {
    title: 'Anti CD3 x EpCAM Bispecific Antibodies',
    content:
      'Homozygous hCD3EDG mice engrafted with MC38 hEpCAM syngeneic tumors demonstrated robust antitumor responses. OKT3 (anti human CD3 monoclonal antibody) achieved tumor growth inhibition (TGI) of approximately 80%, confirming that the humanized CD3 is accessible and functional. A CD3 x EpCAM bispecific antibody achieved TGI of approximately 83%, confirming functional T cell redirection to EpCAM expressing tumor cells.',
  },
  {
    title: 'Anti CD3 x Claudin18.2 Bispecific Antibodies',
    content:
      'In MC38 hCLDN18.2 tumor bearing hCD3EDG mice, anti CD3 x Claudin18.2 bispecific antibody demonstrated dose dependent efficacy: TGI of 63% at 0.3 mg/kg (p<0.05) and TGI of 83% at 1 mg/kg (p<0.01). This dose response relationship is critical for informing clinical starting dose and escalation strategy.',
  },
  {
    title: 'Anti CD3 x FOLR1 Bispecific Antibodies',
    content:
      'Head to head comparison studies with anti CD3 x FOLR1 bispecific antibodies at 0.5 and 5 mg/kg demonstrated dose dependent tumor control and confirmed that the model supports competitive benchmarking of novel constructs against reference molecules.',
  },
  {
    title: 'Checkpoint Inhibitor Combination',
    content:
      'Anti mPD 1 combination studies in MC38 syngeneic tumor bearing hCD3EDG mice demonstrated dose dependent efficacy: TGI of 42% at 5 mg/kg and TGI of 62% at 15 mg/kg, with corresponding dose dependent increases in mPD 1+ hCD3+ T cells, mPD 1+ mCD4+ T cells, and mPD 1+ mCD8+ T cells. This makes the hCD3EDG model uniquely positioned for evaluating bispecific plus checkpoint inhibitor combination regimens.',
  },
];

const cytokinePanel = [
  { cytokine: 'IL-2', category: 'Pro-inflammatory (CRS marker)', timepoints: 'Pre dose, 2h, 6h, 24h, 7d, 14d' },
  { cytokine: 'IL-6', category: 'Pro-inflammatory (CRS marker)', timepoints: 'Pre dose, 2h, 6h, 24h, 7d, 14d' },
  { cytokine: 'IFN-gamma', category: 'Pro-inflammatory (T cell activation)', timepoints: 'Pre dose, 2h, 6h, 24h, 7d, 14d' },
  { cytokine: 'TNF-alpha', category: 'Pro-inflammatory (innate/adaptive)', timepoints: 'Pre dose, 2h, 6h, 24h, 7d, 14d' },
  { cytokine: 'IL-10', category: 'Regulatory', timepoints: 'Pre dose, 2h, 6h, 24h, 7d, 14d' },
  { cytokine: 'IL-5', category: 'Th2', timepoints: 'Pre dose, 2h, 6h, 24h, 7d, 14d' },
];

const applications = [
  { application: 'Bispecific T cell engager efficacy', useCase: 'In vivo tumor growth inhibition with human CD3 targeting therapeutics' },
  { application: 'Bispecific format comparison', useCase: 'Head to head benchmarking of novel vs reference molecules' },
  { application: 'CRS risk assessment', useCase: 'Cytokine kinetics to inform clinical dose escalation design' },
  { application: 'Immune related adverse event profiling', useCase: 'irAE characterization in syngeneic immunocompetent setting' },
  { application: 'Checkpoint combination', useCase: 'Bispecific plus anti PD-1/PD-L1 combination regimens' },
  { application: 'Dose optimization', useCase: 'Dose response studies for therapeutic window determination' },
  { application: 'T cell pharmacodynamics', useCase: 'T cell activation, infiltration, and exhaustion analysis' },
];

const tumorModels = [
  { line: 'MC38 hEpCAM', antigen: 'EpCAM', area: 'GI and colorectal bispecifics' },
  { line: 'MC38 hCLDN18.2', antigen: 'Claudin 18.2', area: 'Gastric and pancreatic bispecifics' },
  { line: 'MC38 hEpCAM (FOLR1 context)', antigen: 'FOLR1', area: 'Ovarian and lung bispecifics' },
  { line: 'MC38 (parental)', antigen: 'None (syngeneic)', area: 'Checkpoint inhibitor studies' },
];

const audiences = [
  {
    title: 'Pharma and Biotech Companies',
    icon: IconFlask,
    content:
      'If your pipeline includes any bispecific T cell engager, T cell redirecting antibody, or CD3 targeting therapeutic, the hCD3EDG model supports IND enabling efficacy studies, dose optimization, safety pharmacology, and competitive benchmarking against reference molecules. Active therapeutic targets being tested with CD3 bispecifics include EpCAM, Claudin18.2, FOLR1, CD19, CD20, BCMA, GPRC5D, HER2, DLL3, PSMA, MUC16, and dozens more.',
  },
  {
    title: 'Contract Research Organizations',
    icon: IconShield,
    content:
      'Offer your pharma clients a differentiated preclinical service package with access to a triple humanized CD3 model characterized across multiple bispecific formats, tumor models, and combination regimens.',
  },
  {
    title: 'Academic Immuno-Oncology Laboratories',
    icon: IconDNA,
    content:
      'Investigate fundamental questions about T cell redirection, cytokine release mechanisms, immune related adverse events, and combination immunotherapy strategies in a translationally relevant syngeneic model.',
  },
];

const publications = [
  {
    text: 'Wang et al. "A CD3 humanized mouse model unmasked unique features of T cell responses to bispecific antibody treatment." Blood Advances, January 2024.',
    href: 'https://doi.org/10.1182/bloodadvances.2023010971',
  },
  {
    text: 'Eguren Santamaria et al. "MHC class I and II deficient humanized mice are suitable tools to test the long term antitumor efficacy of immune checkpoint inhibitors and T cell engagers." Journal for Immunotherapy of Cancer, September 2024.',
    href: 'https://doi.org/10.1136/jitc-2023-008516',
  },
  {
    text: 'Li et al. "YMN V115: a novel humanized BCMA/GPRC5D/CD3 trispecific antibody in relapsed/refractory multiple myeloma." Journal for Immunotherapy of Cancer, February 2026.',
    href: 'https://doi.org/10.1136/jitc-2025-013986',
  },
  {
    text: 'Zhu et al. "Translational findings support regimen selection for first in human study of ubamatamab (MUC16 x CD3 bispecific antibody) in patients with recurrent ovarian cancer." Clinical and Translational Science, December 2024.',
    href: 'https://doi.org/10.1111/cts.70082',
  },
];

const testimonials = [
  { quote: 'The quality of service was exceptional... highest possible standards.', name: 'Albert Basson', org: "King's College London" },
  { quote: '2 conditional knockout mouse lines... scientific consulting superb.', name: 'Hyekyung Plumley', org: 'National Institutes of Health' },
];

const faqData = [
  {
    question: 'Why humanize all three CD3 subunits instead of just CD3 epsilon?',
    answer:
      'CD3 epsilon forms obligate heterodimers with CD3 delta and CD3 gamma. Humanizing only epsilon produces hybrid mouse/human complexes that may not reproduce human binding kinetics or downstream signaling. Many therapeutic antibodies contact residues at the epsilon/delta or epsilon/gamma interface, requiring all three human chains for accurate target engagement. The hCD3EDG model provides greater than 93% co-expression of all three subunits.',
  },
  {
    question: 'What bispecific formats have been tested in this model?',
    answer:
      'The hCD3EDG model has confirmed efficacy data across anti CD3 x EpCAM (TGI approximately 83%), anti CD3 x Claudin18.2 (TGI 63 to 83%, dose dependent), anti CD3 x FOLR1 (dose dependent tumor control), and anti mPD-1 combination regimens (TGI up to 62%). Complete cytokine release panels are available for each study.',
  },
  {
    question: 'Can the hCD3EDG model assess CRS risk for IND submissions?',
    answer:
      'Yes. The model supports complete CRS profiling with IL-2, IL-6, IFN-gamma, TNF-alpha, IL-10, and IL-5 panels measured from pre dose through 14 days post administration in a syngeneic immunocompetent background. This eliminates the xenograft vs host disease confound present in PBMC reconstituted xenograft models and provides the temporal resolution required for clinical step-up dosing strategy design.',
  },
  {
    question: 'Is this model available for immediate use?',
    answer:
      'Yes. The hCD3EDG model is repository live on the C57BL/6Smoc background and ready to ship. Contact us for pricing, cohort availability, and custom study design support.',
  },
];

const relatedModels = [
  { label: 'Humanized Mouse Models', href: '/humanized-mouse-models' },
  { label: 'Conditional Knockout Mouse Models', href: '/conditional-knockout-mouse-models' },
  { label: 'Knockin Mouse Models', href: '/knockin-mouse-models' },
];

const therapeuticAreas = [
  { label: 'Oncology Mouse Models', href: '/oncology-mouse-models' },
  { label: 'Autoimmune Disease Models', href: '/autoimmune-disease-mouse-models' },
];

const TABLE_CELL: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '.875rem',
  color: '#555',
  borderBottom: '1px solid #e0e0e0',
  lineHeight: 1.5,
  verticalAlign: 'top',
};

const TABLE_HEADER: React.CSSProperties = {
  ...TABLE_CELL,
  background: '#0a253c',
  color: '#ffffff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export default function HCD3EDGPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'hCD3EDG Triple Humanized CD3 Mouse Model',
    description:
      'Triple humanized CD3 mouse model (epsilon, delta, gamma) on C57BL/6 for bispecific T cell engager preclinical evaluation',
    sku: 'NM-HU-220120',
    brand: {
      '@type': 'Organization',
      name: 'Ingenious Targeting Laboratory',
      url: 'https://genetargeting.com',
      foundingDate: '1998',
    },
    category: 'Humanized Mouse Models',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: 'https://www.genetargeting.com/quote-request-form/',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div style={{ background: '#0a253c', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', minHeight: '100vh' }}>
        <UXUIDCNavigation />

        <main>
          {/* Hero */}
          <section style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06,
            }}>
              <div style={{
                position: 'absolute',
                width: '700px',
                height: '700px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
                top: '-300px',
                right: '-200px',
              }} />
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              {/* Breadcrumb trail */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <Link href="/catalog-mouse-models" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', textDecoration: 'none' }}>Catalog Models</Link>
                <IconChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <Link href="/featured-model" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.8rem', textDecoration: 'none' }}>Featured Model</Link>
                <IconChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <span style={{ color: '#00d4d4', fontSize: '.8rem' }}>hCD3EDG</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,212,212,0.15)',
                border: '1px solid rgba(0,212,212,0.3)',
                borderRadius: '20px',
                padding: '6px 14px',
                marginBottom: '20px',
              }}>
                <IconLayers size={14} color="#00d4d4" />
                <span style={{ color: '#ffffff', fontSize: '.85rem', fontWeight: 500 }}>
                  Featured Model of the Month — March 2026
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h1 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '8px',
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                  }}>
                    hCD3EDG
                  </h1>
                  <p style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    color: '#00d4d4',
                    marginBottom: '20px',
                  }}>
                    Triple Humanized CD3 Mouse Model
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '24px',
                    lineHeight: 1.75,
                    maxWidth: '680px',
                  }}>
                    Replaces all three signaling subunits of the murine CD3 complex with their human
                    orthologs on a C57BL/6 background. The complete humanization of the TCR associated
                    CD3 signaling apparatus. Repository live and ready to ship.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={PDF_HREF}
                      download
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#00d4d4',
                        color: '#0a253c',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '.9rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      Download Data Sheet
                      <IconChevronRight size={16} color="#0a253c" />
                    </a>
                    <Link
                      href="/quote-request-form"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        color: '#ffffff',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: '2px solid rgba(255,255,255,0.35)',
                      }}
                    >
                      Request Consultation
                      <IconChevronRight size={16} color="#ffffff" />
                    </Link>
                  </div>
                </div>

                {/* Spec pills */}
                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '24px',
                  minWidth: '220px',
                }}>
                  {[
                    { label: 'Catalog', value: 'NM-HU-220120' },
                    { label: 'Background', value: 'C57BL/6Smoc' },
                    { label: 'Zygosity', value: 'Homozygous' },
                    { label: 'Status', value: 'Repository Live' },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#ffffff' }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Top CTA */}
          <section style={{
            background: '#008080',
            padding: '48px 20px',
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '12px',
              }}>
                Repository live. Ready to ship.
              </h2>
              <p style={{
                fontSize: '.95rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.75,
                maxWidth: '580px',
                margin: '0 auto 28px',
              }}>
                Contact the ITL scientific team for pricing, cohort availability, and custom study
                design support for your bispecific T cell engager program.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={PDF_HREF}
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ffffff',
                    color: '#008080',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Download Data Sheet
                  <IconChevronRight size={16} color="#008080" />
                </a>
                <Link
                  href="/quote-request-form"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '.9rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '2px solid rgba(255,255,255,0.5)',
                  }}
                >
                  Request Project Consultation
                  <IconChevronRight size={16} color="#ffffff" />
                </Link>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '24px',
              }}>
                Why the bispecific pipeline demands triple CD3 humanization
              </h2>
              <p className="animate-in" style={{ fontSize: '.95rem', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                Since 1998, Ingenious Targeting Laboratory has completed over 2,500 custom gene targeting
                projects contributing to 800+ peer reviewed publications. The bispecific T cell engager
                market reached USD 1.7 billion in 2025 and is projected to grow at 21.2% CAGR through
                2034. Ten bispecific TCEs are now clinically approved, and nearly half of all bispecifics
                in clinical development target human CD3.
              </p>
              <p className="animate-in" style={{ fontSize: '.95rem', color: '#444', lineHeight: 1.8, marginBottom: '32px' }}>
                Every one of those programs requires preclinical data demonstrating human CD3 target
                engagement in an immunocompetent mouse. The hCD3EDG model eliminates the translational
                gap created by single subunit humanized models by replacing CD3 epsilon, CD3 delta, and
                CD3 gamma simultaneously — the complete humanization of the TCR associated CD3 signaling
                apparatus.
              </p>

              <h3 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#0a253c',
                marginBottom: '16px',
              }}>
                The TCR/CD3 complex: why one subunit is not enough
              </h3>
              <p className="animate-in" style={{ fontSize: '.95rem', color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                CD3 epsilon does not exist in isolation. It forms obligate heterodimers with CD3 delta
                and CD3 gamma. When a therapeutic antibody contacts residues at the epsilon/delta or
                epsilon/gamma interface, a single subunit humanized mouse produces a hybrid mouse/human
                complex that may not accurately reproduce the binding kinetics, avidity, or downstream
                signaling observed when that antibody engages fully human CD3 in patients.
              </p>

              <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '32px' }}>
                {[
                  { title: 'Accurate human epitope presentation', desc: 'Including binding interfaces that span the epsilon/delta and epsilon/gamma heterodimer contacts.' },
                  { title: 'Physiologic ITAM-based signal transduction', desc: 'The 10 ITAM signaling architecture is preserved, enabling downstream T cell activation that mirrors the human response.' },
                  { title: 'Translatable cytokine release profiles', desc: 'In a syngeneic immunocompetent system — CRS data that directly informs clinical dose escalation strategy design.' },
                  { title: 'Preserved immune architecture', desc: 'Confirmed by flow cytometry with normal T cell development, lymphocyte subset distribution, and functional immune responses.' },
                ].map((item, i) => (
                  <div key={i} className="animate-in" style={{
                    background: '#f7f7f7',
                    borderRadius: '8px',
                    padding: '20px',
                    borderTop: '4px solid #008080',
                  }}>
                    <h4 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '.95rem',
                      fontWeight: 600,
                      color: '#333',
                      marginBottom: '8px',
                    }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '.85rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Strain Specs */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '32px',
                textAlign: 'center',
              }}>
                Strain specifications
              </h2>
              <div className="animate-in" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <tbody>
                    {strainSpecs.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f7f7f7' }}>
                        <td style={{ ...TABLE_CELL, fontWeight: 600, color: '#0a253c', width: '35%' }}>{row.param}</td>
                        <td style={{ ...TABLE_CELL }}>{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Immune Characterization */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '16px',
                textAlign: 'center',
              }}>
                Immune characterization
              </h2>
              <p className="animate-in" style={{ fontSize: '.95rem', color: '#666', textAlign: 'center', marginBottom: '32px', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 32px' }}>
                Flow cytometric analysis confirms that homozygous hCD3EDG mice maintain normal immune
                composition with functional human CD3 expressed on T cells. Greater than 93% co-expression
                of all three humanized subunits (CD3g+CD3e+CD3d+) was confirmed across multiple founders.
              </p>
              <div className="animate-in" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Population</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>WT C57BL/6</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>HO hCD3EDG</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {immuneData.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f7f7f7' }}>
                        <td style={{ ...TABLE_CELL, fontWeight: 500, color: '#333' }}>{row.population}</td>
                        <td style={{ ...TABLE_CELL }}>{row.wt}</td>
                        <td style={{ ...TABLE_CELL }}>{row.ho}</td>
                        <td style={{ ...TABLE_CELL }}>
                          <span style={{
                            background: row.status === 'Humanized' ? 'rgba(0,212,212,0.12)' : 'rgba(0,128,128,0.1)',
                            color: row.status === 'Humanized' ? '#007a7a' : '#006060',
                            border: `1px solid ${row.status === 'Humanized' ? 'rgba(0,212,212,0.3)' : 'rgba(0,128,128,0.25)'}`,
                            padding: '2px 10px',
                            borderRadius: '12px',
                            fontSize: '.75rem',
                            fontWeight: 600,
                          }}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Efficacy Data */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '16px',
                textAlign: 'center',
              }}>
                Efficacy data across four bispecific formats
              </h2>
              <p className="animate-in" style={{ fontSize: '.95rem', color: '#666', textAlign: 'center', marginBottom: '40px', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 40px' }}>
                The hCD3EDG model has been characterized with multiple bispecific formats targeting
                different tumor associated antigens in syngeneic tumor models, confirming functional
                human CD3 engagement in vivo.
              </p>
              <div style={{ display: 'grid', gap: '20px' }}>
                {efficacyFormats.map((format, i) => (
                  <div key={i} className="animate-in group transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '28px',
                    borderLeft: '4px solid #008080',
                  }}>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#0a253c',
                      marginBottom: '12px',
                    }}>
                      {format.title}
                    </h3>
                    <p style={{ fontSize: '.9rem', color: '#555', lineHeight: 1.75, margin: 0 }}>
                      {format.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CRS Section */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '16px',
                textAlign: 'center',
              }}>
                Cytokine release syndrome and safety assessment
              </h2>
              <p className="animate-in" style={{ fontSize: '.95rem', color: '#666', textAlign: 'center', lineHeight: 1.75, marginBottom: '16px', maxWidth: '760px', margin: '0 auto 16px' }}>
                Cytokine release syndrome remains the primary dose limiting toxicity for bispecific T cell
                engagers. Xenograft models reconstituted with human PBMCs cannot replicate CRS kinetics
                in an endogenous immune system. The hCD3EDG model eliminates these limitations.
              </p>
              <p className="animate-in" style={{ fontSize: '.9rem', color: '#666', textAlign: 'center', lineHeight: 1.7, marginBottom: '40px', maxWidth: '760px', margin: '0 auto 40px' }}>
                This temporal resolution from pre dose through 14 days post administration provides the
                kinetic data that regulatory submissions require for clinical step-up dosing design.
              </p>
              <div className="animate-in" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Cytokine</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Category</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Timepoints</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cytokinePanel.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f7f7f7' }}>
                        <td style={{ ...TABLE_CELL, fontWeight: 600, color: '#008080' }}>{row.cytokine}</td>
                        <td style={{ ...TABLE_CELL }}>{row.category}</td>
                        <td style={{ ...TABLE_CELL, fontFamily: 'var(--system-ui)', fontSize: '.8rem', color: '#666' }}>{row.timepoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Applications */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '40px',
                textAlign: 'center',
              }}>
                Applications
              </h2>
              <div className="animate-in" style={{ overflowX: 'auto', marginBottom: '40px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Application</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f7f7f7' }}>
                        <td style={{ ...TABLE_CELL, fontWeight: 600, color: '#0a253c', width: '40%' }}>{row.application}</td>
                        <td style={{ ...TABLE_CELL }}>{row.useCase}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#0a253c',
                marginBottom: '20px',
              }}>
                Confirmed syngeneic tumor models
              </h3>
              <div className="animate-in" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <thead>
                    <tr>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Tumor Line</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Human Antigen</th>
                      <th style={{ ...TABLE_HEADER, textAlign: 'left' }}>Therapeutic Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tumorModels.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f7f7f7' }}>
                        <td style={{ ...TABLE_CELL, fontWeight: 600, color: '#008080' }}>{row.line}</td>
                        <td style={{ ...TABLE_CELL }}>{row.antigen}</td>
                        <td style={{ ...TABLE_CELL }}>{row.area}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Who Should Use This Model */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '40px',
                textAlign: 'center',
              }}>
                Who should use this model
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {audiences.map((audience, i) => {
                  const Icon = audience.icon;
                  return (
                    <div key={i} className="animate-in group transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                      background: '#f7f7f7',
                      borderRadius: '8px',
                      padding: '28px',
                      borderTop: '4px solid #008080',
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(0,128,128,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                      }}>
                        <Icon size={22} color="#008080" />
                      </div>
                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '12px',
                      }}>
                        {audience.title}
                      </h3>
                      <p style={{ fontSize: '.875rem', color: '#666', lineHeight: 1.7, margin: 0 }}>
                        {audience.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Publications */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '12px',
                textAlign: 'center',
              }}>
                Selected publications using humanized CD3 models
              </h2>
              <p className="animate-in" style={{ fontSize: '.9rem', color: '#666', textAlign: 'center', marginBottom: '32px', lineHeight: 1.6 }}>
                Over 200 publications feature ITL humanized models.
              </p>
              <div style={{ display: 'grid', gap: '14px' }}>
                {publications.map((pub, i) => (
                  <a key={i} href={pub.href} target="_blank" rel="noopener noreferrer" className="animate-in group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block" style={{
                    background: '#ffffff',
                    borderRadius: '8px',
                    padding: '20px',
                    borderLeft: '4px solid #008080',
                    textDecoration: 'none',
                  }}>
                    <p style={{ fontSize: '.875rem', color: '#555', lineHeight: 1.7, margin: 0 }}>{pub.text} ↗</p>
                  </a>
                ))}
              </div>
              <div className="animate-in" style={{ textAlign: 'center', marginTop: '24px' }}>
                <Link href="/publications" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#008080',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  View all 200+ publications featuring ITL models
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '40px',
                textAlign: 'center',
              }}>
                What researchers say
              </h2>
              <div style={{ display: 'grid', gap: '24px' }}>
                {testimonials.map((t, i) => (
                  <blockquote key={i} className="animate-in" style={{
                    margin: 0,
                    background: '#f7f7f7',
                    borderRadius: '8px',
                    padding: '28px 32px',
                    borderLeft: '4px solid #00d4d4',
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      color: '#333',
                      lineHeight: 1.75,
                      fontStyle: 'italic',
                      marginBottom: '16px',
                    }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer style={{ fontSize: '.85rem', fontWeight: 600, color: '#0a253c' }}>
                      {t.name} <span style={{ fontWeight: 400, color: '#888' }}>— {t.org}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
              <div className="animate-in" style={{ textAlign: 'center', marginTop: '28px' }}>
                <Link href="/testimonials" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#008080',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                  Read more testimonials
                  <IconChevronRight size={16} color="#008080" />
                </Link>
              </div>
            </div>
          </section>

          {/* Related Models + Therapeutic Areas */}
          <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="animate-in">
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '16px',
                  }}>
                    Related humanized models
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {relatedModels.map((link) => (
                      <li key={link.href} style={{ marginBottom: '10px' }}>
                        <Link href={link.href} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#008080',
                          fontSize: '.9rem',
                          textDecoration: 'none',
                        }}>
                          <IconChevronRight size={14} color="#008080" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="animate-in">
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '16px',
                  }}>
                    Therapeutic area applications
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {therapeuticAreas.map((link) => (
                      <li key={link.href} style={{ marginBottom: '10px' }}>
                        <Link href={link.href} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#008080',
                          fontSize: '.9rem',
                          textDecoration: 'none',
                        }}>
                          <IconChevronRight size={14} color="#008080" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ background: '#ffffff', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '40px',
                textAlign: 'center',
              }}>
                Frequently asked questions
              </h2>
              <div className="animate-in">
                <UXUIDCAnimatedFAQ faqs={faqData} showViewAllLink={false} />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '60px 20px',
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
              }}>
                Repository live. Ready to ship.
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.75,
                marginBottom: '36px',
                maxWidth: '600px',
                margin: '0 auto 36px',
              }}>
                Contact the ITL scientific team for pricing, cohort availability, and custom study
                design support for your bispecific T cell engager program.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={PDF_HREF}
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#00d4d4',
                    color: '#0a253c',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    fontSize: '.95rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Download Data Sheet
                  <IconChevronRight size={16} color="#0a253c" />
                </a>
                <Link
                  href="/quote-request-form"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    color: '#ffffff',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    fontSize: '.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '2px solid rgba(255,255,255,0.35)',
                  }}
                >
                  Request Project Consultation
                  <IconChevronRight size={16} color="#ffffff" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <UXUIDCFooter />

        <BreadcrumbSchema
          items={[
            { name: 'Home', path: '/' },
            { name: 'Catalog Models', path: '/catalog-mouse-models' },
            { name: 'Featured Model', path: '/featured-model' },
            { name: 'hCD3EDG', path: '/featured-model/hcd3edg' },
          ]}
        />
      </div>
    </div>
  );
}
