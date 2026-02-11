/**
 * Accessibility Statement Page
 * Built following RULES_2026 guidelines
 * WCAG 2.1 AA commitment statement
 */

import { Metadata } from 'next';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  IconChevronRight,
  IconAccessibility,
  IconEye,
  IconKeyboard,
  IconMessageCircle,
  IconCheckCircle,
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
  title: 'Accessibility Statement | ingenious targeting laboratory',
  description: 'Our commitment to digital accessibility. Learn about WCAG 2.1 AA compliance, assistive technology support, and how to request accommodations at iTL.',
  alternates: {
    canonical: 'https://www.genetargeting.com/accessibility',
  },
  openGraph: {
    title: 'Accessibility Statement | ingenious targeting laboratory',
    description: 'Our commitment to digital accessibility and WCAG 2.1 AA compliance.',
    url: 'https://www.genetargeting.com/accessibility',
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
      name: 'Accessibility',
      item: 'https://www.genetargeting.com/accessibility',
    },
  ],
};

// WebPage schema
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Accessibility Statement',
  description: 'Accessibility commitment and WCAG 2.1 AA compliance information for ingenious targeting laboratory.',
  url: 'https://www.genetargeting.com/accessibility',
  publisher: {
    '@type': 'Organization',
    name: 'ingenious targeting laboratory',
    url: 'https://www.genetargeting.com',
  },
  dateModified: '2026-01-15',
};

const accessibilityFeatures = [
  {
    title: 'Keyboard navigation',
    description: 'All interactive elements are accessible via keyboard. Use Tab to navigate, Enter to activate, and Escape to close dialogs.',
    Icon: IconKeyboard,
  },
  {
    title: 'Screen reader support',
    description: 'Our site is optimized for screen readers including JAWS, NVDA, and VoiceOver with proper ARIA labels and semantic HTML.',
    Icon: IconEye,
  },
  {
    title: 'Visual accessibility',
    description: 'Text maintains WCAG AA contrast ratios. Our design avoids reliance on color alone to convey information.',
    Icon: IconAccessibility,
  },
  {
    title: 'Clear content structure',
    description: 'Logical heading hierarchy, descriptive link text, and organized layouts help all users navigate our content.',
    Icon: IconCheckCircle,
  },
];

export default function AccessibilityPage() {
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
              <li aria-current="page" style={{ color: BRAND.navy, fontWeight: 600 }}>Accessibility</li>
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
              <h1 style={{ 
                fontSize: 'clamp(2rem, 5vw, 3rem)', 
                fontWeight: 600, 
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                Accessibility statement
              </h1>
              <p style={{ 
                fontSize: '1.2rem', 
                opacity: 0.9,
                lineHeight: 1.6
              }}>
                ingenious targeting laboratory is committed to ensuring digital accessibility 
                for people with disabilities. We continually improve the user experience for 
                everyone and apply relevant accessibility standards.
              </p>
            </div>
          </section>

          {/* Commitment Section */}
          <section style={{ padding: '80px 24px', background: BRAND.white }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 600, 
                color: BRAND.navy, 
                marginBottom: '24px' 
              }}>
                Our commitment
              </h2>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8, 
                color: BRAND.text,
                marginBottom: '20px'
              }}>
                We believe that the web should be accessible to everyone. Our team works to ensure 
                that researchers, scientists, and all visitors can access the information and 
                services they need, regardless of ability or the assistive technology they use.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8, 
                color: BRAND.text 
              }}>
                This website strives to conform to the Web Content Accessibility Guidelines (WCAG) 
                2.1 Level AA standards. These guidelines explain how to make web content more 
                accessible to people with a wide range of disabilities.
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section style={{ padding: '80px 24px', background: BRAND.lightGray }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 600, 
                color: BRAND.navy, 
                marginBottom: '48px',
                textAlign: 'center'
              }}>
                Accessibility features
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', 
                gap: '32px' 
              }}>
                {accessibilityFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    style={{ 
                      background: BRAND.white, 
                      padding: '32px', 
                      borderRadius: '8px',
                      borderLeft: `4px solid ${BRAND.teal}`
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      marginBottom: '16px' 
                    }}>
                      <feature.Icon size={24} color={BRAND.teal} />
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 600, 
                        color: BRAND.navy,
                        margin: 0
                      }}>
                        {feature.title}
                      </h3>
                    </div>
                    <p style={{ 
                      fontSize: '1rem', 
                      lineHeight: 1.6, 
                      color: BRAND.text,
                      margin: 0
                    }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Standards Section */}
          <section style={{ padding: '80px 24px', background: BRAND.white }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 600, 
                color: BRAND.navy, 
                marginBottom: '24px' 
              }}>
                Conformance status
              </h2>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8, 
                color: BRAND.text,
                marginBottom: '24px'
              }}>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for 
                designers and developers to improve accessibility for people with disabilities. 
                It defines three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8, 
                color: BRAND.text,
                marginBottom: '24px'
              }}>
                This website is partially conformant with WCAG 2.1 Level AA. Partially 
                conformant means that some parts of the content do not fully conform to 
                the accessibility standard. We are actively working to achieve full conformance.
              </p>
              
              <h3 style={{ 
                fontSize: '1.4rem', 
                fontWeight: 600, 
                color: BRAND.navy, 
                marginTop: '40px',
                marginBottom: '16px' 
              }}>
                Technologies we rely on
              </h3>
              <ul style={{ 
                fontSize: '1.1rem', 
                lineHeight: 2, 
                color: BRAND.text,
                paddingLeft: '24px'
              }}>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>WAI-ARIA</li>
              </ul>
            </div>
          </section>

          {/* Feedback Section */}
          <section style={{ padding: '80px 24px', background: BRAND.teal, color: BRAND.white }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <IconMessageCircle size={48} color={BRAND.white} style={{ marginBottom: '24px' }} />
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 600, 
                marginBottom: '24px' 
              }}>
                Feedback and contact information
              </h2>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8,
                marginBottom: '24px',
                opacity: 0.95
              }}>
                We welcome your feedback on the accessibility of this website. If you 
                encounter accessibility barriers or have suggestions for improvement, 
                please contact us.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8,
                marginBottom: '32px',
                opacity: 0.95
              }}>
                Email: <a href="mailto:inquiry@genetargeting.com" style={{ color: BRAND.white, fontWeight: 600 }}>inquiry@genetargeting.com</a><br />
                Phone: <a href="tel:+16314688534" style={{ color: BRAND.white, fontWeight: 600 }}>(631) 468-8534</a>
              </p>
              <p style={{ 
                fontSize: '1rem', 
                opacity: 0.8
              }}>
                We try to respond to accessibility feedback within 5 business days.
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <section style={{ padding: '40px 24px', background: BRAND.lightGray }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: BRAND.text, margin: 0 }}>
                This statement was last updated on January 15, 2026.
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
