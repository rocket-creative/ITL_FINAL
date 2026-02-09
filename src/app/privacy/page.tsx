/**
 * Privacy Policy Page
 * Built following RULES_2026 guidelines
 * Comprehensive privacy policy for genetargeting.com
 */

import { Metadata } from 'next';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  IconChevronRight,
  IconShield,
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
  title: 'Privacy Policy | ingenious targeting laboratory',
  description: 'Privacy policy for ingenious targeting laboratory. Learn how we collect, use, and protect your personal information when you use our website and services.',
  alternates: {
    canonical: 'https://www.ingenious.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | ingenious targeting laboratory',
    description: 'Learn how we collect, use, and protect your personal information.',
    url: 'https://www.ingenious.com/privacy',
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
      name: 'Privacy Policy',
      item: 'https://www.genetargeting.com/privacy',
    },
  ],
};

// WebPage schema
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  description: 'Privacy policy for ingenious targeting laboratory website and services.',
  url: 'https://www.genetargeting.com/privacy',
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

export default function PrivacyPage() {
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
              <li aria-current="page" style={{ color: BRAND.navy, fontWeight: 600 }}>Privacy Policy</li>
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
              <IconShield size={56} color={BRAND.white} style={{ marginBottom: '24px' }} />
              <h1 style={{ 
                fontSize: 'clamp(2rem, 5vw, 3rem)', 
                fontWeight: 600, 
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                Privacy policy
              </h1>
              <p style={{ 
                fontSize: '1.2rem', 
                opacity: 0.9,
                lineHeight: 1.6
              }}>
                Your privacy is important to us. This policy explains how ingenious targeting 
                laboratory collects, uses, and protects your personal information.
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
                  ingenious targeting laboratory (&quot;iTL,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website 
                  genetargeting.com (the &quot;Site&quot;). This Privacy Policy describes our policies and 
                  procedures regarding the collection, use, and disclosure of your information 
                  when you use our Site and services.
                </p>
              </div>

              {/* Information We Collect */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>Information we collect</h2>
                
                <h3 style={subheadingStyle}>Information you provide</h3>
                <p style={paragraphStyle}>
                  When you contact us, request a quote, or use our services, we may collect:
                </p>
                <ul style={listStyle}>
                  <li>Name and title</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Institution or company name</li>
                  <li>Project details and research requirements</li>
                  <li>Billing and shipping information</li>
                </ul>

                <h3 style={subheadingStyle}>Information collected automatically</h3>
                <p style={paragraphStyle}>
                  When you visit our Site, we may automatically collect certain information, including:
                </p>
                <ul style={listStyle}>
                  <li>IP address and approximate location</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website or source</li>
                  <li>Device type and operating system</li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>How we use your information</h2>
                <p style={paragraphStyle}>
                  We use the information we collect to:
                </p>
                <ul style={listStyle}>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Process and fulfill your orders and project requests</li>
                  <li>Send project updates and important notifications</li>
                  <li>Improve our website and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Cookies and Tracking */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>Cookies and tracking technologies</h2>
                <p style={paragraphStyle}>
                  We use cookies and similar tracking technologies to collect and track information 
                  about your activity on our Site. You can control cookie settings through your 
                  browser preferences.
                </p>
                
                <h3 style={subheadingStyle}>Types of cookies we use</h3>
                <ul style={listStyle}>
                  <li><strong>Necessary cookies:</strong> Essential for the website to function properly</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors use our Site (requires consent)</li>
                  <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements (requires consent)</li>
                </ul>

                <p style={paragraphStyle}>
                  We honor Global Privacy Control (GPC) signals. If your browser sends a GPC signal, 
                  we treat this as an opt out of the sale or sharing of your personal information.
                </p>
              </div>

              {/* Data Sharing */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>How we share your information</h2>
                <p style={paragraphStyle}>
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul style={listStyle}>
                  <li><strong>Service providers:</strong> Third parties that help us operate our business (hosting, payment processing, shipping)</li>
                  <li><strong>Research partners:</strong> When necessary to fulfill your project requirements</li>
                  <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </div>

              {/* Data Security */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>Data security</h2>
                <p style={paragraphStyle}>
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or 
                  destruction. However, no method of transmission over the Internet or electronic 
                  storage is completely secure.
                </p>
              </div>

              {/* Data Retention */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>Data retention</h2>
                <p style={paragraphStyle}>
                  We retain your personal information for as long as necessary to fulfill the 
                  purposes for which it was collected, including to satisfy legal, accounting, 
                  or reporting requirements. Project records may be retained for extended periods 
                  to support ongoing research needs.
                </p>
              </div>

              {/* Your Rights */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>Your rights and choices</h2>
                <p style={paragraphStyle}>
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul style={listStyle}>
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request that we correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request that we delete your personal information</li>
                  <li><strong>Opt out:</strong> Opt out of marketing communications at any time</li>
                  <li><strong>Data portability:</strong> Request a portable copy of your data</li>
                </ul>
                <p style={paragraphStyle}>
                  To exercise these rights, please contact us using the information below.
                </p>
              </div>

              {/* California Residents */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>California residents</h2>
                <p style={paragraphStyle}>
                  If you are a California resident, the California Consumer Privacy Act (CCPA) 
                  provides you with additional rights regarding your personal information. 
                  You have the right to request disclosure of information we have collected 
                  and the right to request deletion of your personal information, subject 
                  to certain exceptions.
                </p>
              </div>

              {/* International Users */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>International users</h2>
                <p style={paragraphStyle}>
                  If you are accessing our Site from outside the United States, please be aware 
                  that your information may be transferred to, stored, and processed in the 
                  United States where our servers are located.
                </p>
              </div>

              {/* Children's Privacy */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>Children&apos;s privacy</h2>
                <p style={paragraphStyle}>
                  Our Site is not intended for children under 16 years of age. We do not knowingly 
                  collect personal information from children under 16. If you are a parent or 
                  guardian and believe your child has provided us with personal information, 
                  please contact us.
                </p>
              </div>

              {/* Changes to Policy */}
              <div style={sectionStyle}>
                <h2 style={headingStyle}>Changes to this policy</h2>
                <p style={paragraphStyle}>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the 
                  &quot;Effective date&quot; at the top of this policy.
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
                  If you have questions about this Privacy Policy or wish to exercise your 
                  privacy rights, please contact us:
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
                This policy was last updated on January 15, 2026.
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
