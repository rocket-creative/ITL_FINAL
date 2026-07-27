'use client';

/**
 * Scientific Leadership Page
 * Authority page showcasing team expertise, credentials, and scientific oversight
 * Built following RULES_2026 guidelines
 */

import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  BreadcrumbSchema,
  UXUIDCStartProjectCTA,
  IconAward,
  IconTarget,
  IconCheckCircle,
} from '@/components/UXUIDC';

const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  blue: '#2384da',
  lightGray: '#f7f7f7',
  white: '#ffffff',
  text: '#333333',
};

export default function ScientificLeadershipPage() {
  return (
    <div>
      <UXUIDCNavigation />

      {/* Hero Section */}
      <section style={{ backgroundColor: BRAND.navy, padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            color: BRAND.white,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2.8rem',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '20px',
            letterSpacing: '-.5px',
          }}>
            Scientific Leadership
          </h1>
          <p style={{
            color: '#b0c4d4',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            Over 26 years of pioneering mouse genetics expertise, guiding thousands of researchers from project design through publication
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ backgroundColor: BRAND.white, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <IconTarget size={40} color={BRAND.teal} />
              </div>
              <h2 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}>
                Our Mission
              </h2>
              <p style={{
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}>
                Since 1998, ingenious targeting laboratory has maintained unwavering commitment to scientific rigor, experimental reproducibility, and researcher success. Every mouse model we generate undergoes comprehensive quality control to ensure stable germline transmission and phenotypic consistency.
              </p>
            </div>

            <div>
              <div style={{ marginBottom: '20px' }}>
                <IconAward size={40} color={BRAND.teal} />
              </div>
              <h2 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}>
                Scientific Excellence
              </h2>
              <p style={{
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}>
                Our team combines decades of mouse genetics experience with continuous innovation. We have contributed to over 800 peer-reviewed publications across Nature, Science, Cell, and leading disease-specific journals, advancing understanding of human disease mechanisms and therapeutic interventions.
              </p>
            </div>

            <div>
              <div style={{ marginBottom: '20px' }}>
                <IconCheckCircle size={40} color={BRAND.teal} />
              </div>
              <h2 style={{
                color: BRAND.navy,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}>
                Quality Commitment
              </h2>
              <p style={{
                color: '#666',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}>
                Every project receives dedicated scientific oversight from design through delivery. Our quality control protocols ensure: verified germline transmission, confirmed allele structure, complete molecular characterization, and detailed breeding recommendations for reproducible cohort generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section style={{ backgroundColor: BRAND.lightGray, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            color: BRAND.navy,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Core Scientific Competencies
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
          }}>
            {[
              {
                title: 'Gene Targeting',
                description: 'Homologous recombination expertise spanning conventional knockouts, conditional alleles, point mutations, and complex humanization strategies. Over 2,800 successful custom targeting events since 1998.',
              },
              {
                title: 'Allele Design Strategy',
                description: 'Critical exon selection, LoxP site placement optimization, selection cassette design, and germline stability prediction. Every design reviewed for experimental utility and phenotypic impact.',
              },
              {
                title: 'Cre-lox Technology',
                description: 'Comprehensive understanding of tissue-specific Cre drivers, inducible systems, and conditional deletion strategies. Expert guidance on Cre line selection and breeding scheme optimization.',
              },
              {
                title: 'Germline Characterization',
                description: 'Southern blot confirmation, PCR genotyping design, expression analysis, and multi-generation breeding verification. All founders guaranteed for stable germline transmission.',
              },
              {
                title: 'Background Genetics',
                description: 'Strain selection consultation, backcrossing strategy design, speed congenic implementation, and phenotype-background interaction analysis. Expertise across C57BL/6, 129, BALB/c, and other backgrounds.',
              },
              {
                title: 'Experimental Design',
                description: 'Research application consultation, phenotyping strategy development, control selection guidance, and statistical power analysis. Partnership approach to ensure model utility for specific research questions.',
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: BRAND.white,
                  padding: '30px',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                }}
              >
                <h3 style={{
                  color: BRAND.blue,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '15px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '.95rem',
                  lineHeight: '1.6',
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section style={{ backgroundColor: BRAND.white, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            color: BRAND.navy,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Scientific Recognition
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
          }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 700,
                color: BRAND.teal,
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '10px',
              }}>
                800+
              </div>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Peer-Reviewed Publications
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 700,
                color: BRAND.teal,
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '10px',
              }}>
                2,800+
              </div>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Custom Mouse Models Generated
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 700,
                color: BRAND.teal,
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '10px',
              }}>
                26+
              </div>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Years of Excellence
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 700,
                color: BRAND.teal,
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '10px',
              }}>
                SBIR
              </div>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                NIH Award Recipient
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: BRAND.lightGray,
            padding: '40px',
            borderRadius: '4px',
            borderLeft: `4px solid ${BRAND.teal}`,
          }}>
            <h3 style={{
              color: BRAND.navy,
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.3rem',
              fontWeight: 600,
              marginBottom: '15px',
            }}>
              Research Impact
            </h3>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}>
              Our mouse models have enabled breakthrough discoveries across diverse therapeutic areas:
            </p>
            <ul style={{
              color: '#666',
              fontSize: '1rem',
              lineHeight: '1.8',
              paddingLeft: '20px',
            }}>
              <li>Oncology: tumor suppressor mechanisms, immune checkpoint function, cancer metabolism</li>
              <li>Neuroscience: Alzheimer's pathology, Parkinson's models, synaptic plasticity</li>
              <li>Immunology: autoimmune disease mechanisms, cytokine signaling, T cell development</li>
              <li>Metabolism: diabetes progression, obesity pathways, lipid metabolism</li>
              <li>Cardiovascular: heart failure models, atherosclerosis, cardiac fibrosis</li>
              <li>Rare Disease: genetic disorder modeling, gene therapy validation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Scientific Oversight */}
      <section style={{ backgroundColor: BRAND.lightGray, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            color: BRAND.navy,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Scientific Oversight Process
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                step: '1',
                title: 'Project Design Review',
                description: 'Initial consultation to understand research goals, phenotype expectations, and experimental timeline. Allele design strategy review ensuring optimal exon selection, LoxP placement, and control strategies.',
              },
              {
                step: '2',
                title: 'Targeting Vector Validation',
                description: 'Sequence verification of all vector components including homology arms, selection cassettes, and recombination sites. Confirmation of proper reading frame and domain preservation for conditional alleles.',
              },
              {
                step: '3',
                title: 'Clone Screening',
                description: 'Southern blot confirmation of correct integration, PCR verification of allele structure, and karyotype analysis ensuring chromosomal stability. Only properly targeted clones advance to injection.',
              },
              {
                step: '4',
                title: 'Founder Analysis',
                description: 'Germline transmission verification through breeding analysis, genotyping confirmation across multiple generations, and expression analysis where applicable. Delivery only after confirmed stable germline.',
              },
              {
                step: '5',
                title: 'Post-Delivery Support',
                description: 'Ongoing consultation for breeding questions, genotyping troubleshooting, phenotype optimization, and experimental design. Lifetime technical support for all delivered models.',
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  backgroundColor: BRAND.white,
                  padding: '30px',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  gap: '20px',
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: '50px',
                  height: '50px',
                  backgroundColor: BRAND.teal,
                  color: BRAND.white,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{
                    color: BRAND.navy,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#666',
                    fontSize: '.95rem',
                    lineHeight: '1.6',
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <UXUIDCStartProjectCTA />

      <UXUIDCFooter />
      <UXUIDCCookieConsent />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Scientific Leadership', path: '/scientific-leadership' },
        ]}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ingenious targeting laboratory',
            url: 'https://www.genetargeting.com',
            foundingDate: '1998',
            description: 'Custom mouse model generation with over 26 years of expertise in gene targeting, conditional alleles, and gene targeting technology.',
            areaServed: 'Worldwide',
          }),
        }}
      />
    </div>
  );
}
