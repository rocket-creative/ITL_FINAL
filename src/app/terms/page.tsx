/**
 * Terms of Service Page
 * Built following RULES_2026 guidelines
 * Comprehensive terms and conditions for genetargeting.com
 */

import { Metadata } from 'next';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  IconChevronRight,
  IconScale,
} from '@/components/UXUIDC';

// Brand colors
const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  lightGray: '#f7f7f7',
  white: '#ffffff',
  text: '#333333',
};

export const metadata: Metadata = {
  title: 'Terms of Service | ingenious targeting laboratory',
  description: 'Terms and conditions for using the ingenious targeting laboratory website and services. Read about acceptable use, intellectual property, and service agreements.',
  alternates: {
    canonical: 'https://www.genetargeting.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | ingenious targeting laboratory',
    description: 'Terms and conditions for using our website and services.',
    url: 'https://www.genetargeting.com/terms',
    siteName: 'ingenious targeting laboratory',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Breadcrumb schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.genetargeting.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Terms of Service',
      item: 'https://www.genetargeting.com/terms',
    },
  ],
};

// WebPage schema
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service',
  description: 'Terms and conditions for using ingenious targeting laboratory website and services.',
  url: 'https://www.genetargeting.com/terms',
  publisher: {
    '@type': 'Organization',
    name: 'ingenious targeting laboratory',
    url: 'https://www.genetargeting.com',
  },
  dateModified: '2026-01-15',
};

const sectionStyle = {
  marginBottom: '48px',
};

const headingStyle = {
  fontSize: '1.5rem',
  fontWeight: 600,
  color: BRAND.navy,
  marginBottom: '16px',
  marginTop: '32px',
};

const subheadingStyle = {
  fontSize: '1.2rem',
  fontWeight: 600,
  color: BRAND.navy,
  marginBottom: '12px',
  marginTop: '24px',
};

const paragraphStyle = {
  fontSize: '1rem',
  lineHeight: 1.8,
  color: BRAND.text,
  marginBottom: '16px',
};

const listStyle = {
  fontSize: '1rem',
  lineHeight: 2,
  color: BRAND.text,
  paddingLeft: '24px',
  marginBottom: '16px',
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <UXUIDCNavigation />
        
        <main id="main-content">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ padding: '20px 24px', background: BRAND.lightGray }}>
            <ol style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              listStyle: 'none', 
              margin: 0, 
              padding: 0,
              fontSize: '14px',
              color: BRAND.text 
            }}>
              <li><Link href="/" style={{ color: BRAND.teal, textDecoration: 'none' }}>Home</Link></li>
              <li><IconChevronRight size={14} color={BRAND.text} /></li>
              <li aria-current="page" style={{ color: BRAND.navy, fontWeight: 600 }}>Terms of Service</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <section style={{ 
            padding: '80px 24px', 
            background: BRAND.navy,
            color: BRAND.white,
            textAlign: 'center'
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <IconScale size={56} color={BRAND.white} style={{ marginBottom: '24px' }} />
              <h1 style={{ 
                fontSize: 'clamp(2rem, 5vw, 3rem)', 
                fontWeight: 600, 
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                Terms of service
              </h1>
              <p style={{ 
                fontSize: '1.2rem', 
                opacity: 0.9,
                lineHeight: 1.6
              }}>
                Please read these terms carefully before using our website or services.
              </p>
              <p style={{ 
                fontSize: '0.95rem', 
                opacity: 0.7,
                marginTop: '24px'
              }}>
                Effective date: January 15, 2026
              </p>
            </div>
          </section>

          {/* Content Section */}
          <section style={{ padding: '80px 24px', background: BRAND.white }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              
              {/* Introduction */}
              <div style={sectionStyle}>
                <p style={paragraphStyle}>
                  Welcome to genetargeting.com. These Terms of Service (&quot;Terms&quot;) govern your access 
                  to and use of the website and services provided by ingenious targeting laboratory 
                  (&quot;iTL,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our website, you agree to 
                  be bound by these Terms.
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>1. Acceptance of terms</h2>
                <p style={paragraphStyle}>
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provisions of this agreement. If you do not agree to these Terms, you should 
                  not use our website or services.
                </p>
                <p style={paragraphStyle}>
                  We reserve the right to update or modify these Terms at any time without prior 
                  notice. Your continued use of the website following any changes constitutes 
                  acceptance of those changes.
                </p>
              </div>

              {/* Services Description */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>2. Description of services</h2>
                <p style={paragraphStyle}>
                  ingenious targeting laboratory provides custom gene targeting services for the 
                  generation of genetically modified mouse models. Our services include but are 
                  not limited to:
                </p>
                <ul style={listStyle}>
                  <li>Custom knockout and knockin mouse model design and generation</li>
                  <li>Conditional and inducible mouse model development</li>
                  <li>Humanized mouse model engineering</li>
                  <li>Colony management and breeding services</li>
                  <li>Cryopreservation and rederivation services</li>
                  <li>Scientific consultation and project planning</li>
                </ul>
              </div>

              {/* Service Agreements */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>3. Service agreements</h2>
                <p style={paragraphStyle}>
                  All project services are governed by separate service agreements that will be 
                  provided upon project initiation. These service agreements detail specific terms 
                  including project scope, timelines, deliverables, pricing, payment terms, and 
                  intellectual property provisions.
                </p>
                <p style={paragraphStyle}>
                  In the event of any conflict between these Terms and a specific service agreement, 
                  the service agreement shall prevail.
                </p>
              </div>

              {/* Use of Website */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>4. Use of website</h2>
                <p style={paragraphStyle}>
                  You agree to use this website only for lawful purposes and in accordance with 
                  these Terms. You agree not to:
                </p>
                <ul style={listStyle}>
                  <li>Use the website in any way that violates applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to any part of the website or its systems</li>
                  <li>Use automated systems or software to extract data from the website</li>
                  <li>Transmit any viruses, malware, or other harmful code</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>5. Intellectual property</h2>
                
                <h3 style={subheadingStyle}>Website content</h3>
                <p style={paragraphStyle}>
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of ingenious targeting laboratory or its content suppliers and is 
                  protected by United States and international copyright laws.
                </p>

                <h3 style={subheadingStyle}>Project intellectual property</h3>
                <p style={paragraphStyle}>
                  Intellectual property rights related to custom projects are governed by the 
                  specific service agreement for each project. Generally, clients retain ownership 
                  of project designs and resulting mouse models, while iTL retains rights to its 
                  proprietary technologies and methods.
                </p>
              </div>

              {/* Confidentiality */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>6. Confidentiality</h2>
                <p style={paragraphStyle}>
                  We understand the importance of confidentiality in research. Project information, 
                  designs, and results shared with us are treated as confidential. Specific 
                  confidentiality terms are detailed in project service agreements.
                </p>
                <p style={paragraphStyle}>
                  We will not disclose your project information to third parties except as required 
                  to provide our services, as required by law, or with your written consent.
                </p>
              </div>

              {/* Warranties and Disclaimers */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>7. Warranties and disclaimers</h2>
                
                <h3 style={subheadingStyle}>Website disclaimer</h3>
                <p style={paragraphStyle}>
                  The information on this website is provided &quot;as is&quot; without warranties of any 
                  kind, either express or implied. We do not warrant that the website will be 
                  uninterrupted, secure, or error free.
                </p>

                <h3 style={subheadingStyle}>Service warranties</h3>
                <p style={paragraphStyle}>
                  Specific warranties related to project services are detailed in project service 
                  agreements. Due to the nature of biological research, outcomes cannot be 
                  guaranteed. We commit to using our best scientific efforts and established 
                  methods in all project work.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>8. Limitation of liability</h2>
                <p style={paragraphStyle}>
                  To the fullest extent permitted by applicable law, ingenious targeting laboratory 
                  shall not be liable for any indirect, incidental, special, consequential, or 
                  punitive damages arising out of or related to your use of our website or services.
                </p>
                <p style={paragraphStyle}>
                  Our total liability for any claim arising out of or relating to these Terms or 
                  our services shall not exceed the amount paid by you for the specific services 
                  giving rise to the claim.
                </p>
              </div>

              {/* Indemnification */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>9. Indemnification</h2>
                <p style={paragraphStyle}>
                  You agree to indemnify and hold harmless ingenious targeting laboratory, its 
                  officers, directors, employees, and agents from any claims, damages, losses, 
                  or expenses (including reasonable attorneys&apos; fees) arising out of your use of 
                  the website, your violation of these Terms, or your violation of any rights of 
                  another party.
                </p>
              </div>

              {/* Governing Law */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>10. Governing law</h2>
                <p style={paragraphStyle}>
                  These Terms shall be governed by and construed in accordance with the laws of 
                  the State of New York, without regard to its conflict of law provisions. Any 
                  legal action or proceeding arising under these Terms shall be brought exclusively 
                  in the federal or state courts located in Suffolk County, New York.
                </p>
              </div>

              {/* Severability */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>11. Severability</h2>
                <p style={paragraphStyle}>
                  If any provision of these Terms is found to be unenforceable or invalid, that 
                  provision shall be limited or eliminated to the minimum extent necessary so 
                  that these Terms shall otherwise remain in full force and effect.
                </p>
              </div>

              {/* Contact Information */}
              <div style={{ 
                background: BRAND.lightGray, 
                padding: '32px', 
                borderRadius: '8px',
                marginTop: '48px'
              }}>
                <h2 style={{ ...headingStyle, marginTop: 0 }}>Contact us</h2>
                <p style={paragraphStyle}>
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <p style={{ ...paragraphStyle, marginBottom: 0 }}>
                  <strong>ingenious targeting laboratory</strong><br />
                  761-80 Coates Avenue<br />
                  Holbrook, NY 11741<br /><br />
                  Email: <a href="mailto:inquiry@genetargeting.com" style={{ color: BRAND.teal }}>inquiry@genetargeting.com</a><br />
                  Phone: <a href="tel:+16314688534" style={{ color: BRAND.teal }}>(631) 468-8534</a>
                </p>
              </div>

            </div>
          </section>

          {/* Last Updated */}
          <section style={{ padding: '40px 24px', background: BRAND.lightGray }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: BRAND.text, margin: 0 }}>
                These terms were last updated on January 15, 2026.
              </p>
            </div>
          </section>
        </main>

        <UXUIDCFooter />
        <UXUIDCCookieConsent />
      </div>
    </>
  );
}
