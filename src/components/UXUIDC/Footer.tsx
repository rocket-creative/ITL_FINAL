'use client';

/**
 * |UXUIDC| Footer - Dark grey background with white text
 * @version 2.4.0
 * Fixed padding/margin, all text white
 * Fixed hydration mismatch using useSyncExternalStore for currentYear
 */

import { useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Hook to safely get current year without hydration mismatch
 * Uses useSyncExternalStore to avoid setState-in-effect ESLint error
 */
function useCurrentYear() {
  const subscribe = useCallback(() => {
    // Year doesn't change during a session, but we need a subscribe function
    return () => {};
  }, []);

  const getSnapshot = useCallback(() => {
    return new Date().getFullYear();
  }, []);

  const getServerSnapshot = useCallback(() => {
    return 2026; // Server-side fallback
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const footerSections = [
  {
    title: 'Model Generation',
    links: [
      { label: 'Knockout Models', href: '/knockout-mouse-models' },
      { label: 'Conditional Knockout', href: '/conditional-knockout-mouse-models' },
      { label: 'Knockin Models', href: '/knockin-mouse-models' },
      { label: 'Humanized Models', href: '/humanized-mouse-models' },
      { label: 'Transgenic Service', href: '/transgenic-mouse-service' },
      { label: 'Point Mutation Mice', href: '/point-mutation-mice' },
      { label: 'Rat Models', href: '/rat-models' },
      { label: 'Catalog Models', href: '/all-catalog-mouse-models' },
      { label: 'Order Catalog Models', href: '/order-catalog-models' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Colony Management', href: '/colony-management-services' },
      { label: 'Cryopreservation', href: '/cryopreservation-services' },
      { label: 'Genotyping', href: '/mouse-genotyping-service' },
      { label: 'Preclinical Services', href: '/preclinical-services' },
      { label: 'Phenotyping Services', href: '/phenotyping-services' },
      { label: 'Speed Expansion', href: '/speed-expansion-breeding' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { label: 'Technology Overview', href: '/technology-overview' },
      { label: 'Cre-Lox System', href: '/cre-lox-system' },
      { label: 'Flp-Frt System', href: '/flp-frt-system' },
      { label: 'Rosa26 Targeting', href: '/rosa26' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    title: 'Disease Areas',
    links: [
      { label: 'Oncology', href: '/oncology-mouse-models' },
      { label: 'Neuroscience', href: '/neuroscience-mouse-models' },
      { label: 'Cardiovascular', href: '/cardiovascular-mouse-models' },
      { label: 'Immunology', href: '/immunology-mouse-models' },
      { label: 'Metabolic Disease', href: '/metabolic-disease-mouse-models' },
      { label: 'Rare Disease', href: '/rare-disease-mouse-models' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Lab Signals Newsletter', href: '/lab-signals' },
      { label: 'Ingenious Blog', href: '/ingenious-blog' },
      { label: 'Researcher Spotlight', href: '/researcher-spotlight' },
      { label: 'Publications', href: '/publications' },
      { label: 'Breeding Scheme Architect', href: '/breeding-scheme-architect' },
      { label: 'Video Library', href: '/video-library' },
      { label: 'All Resources', href: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-itl' },
      { label: 'Why Choose Us', href: '/why-choose-itl' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Current Openings', href: '/current-openings' },
      { label: 'Request Quote', href: '/request-quote' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function UXUIDCFooter() {
  // Use useSyncExternalStore to get current year safely
  // Avoids hydration mismatch and setState-in-effect ESLint error
  const currentYear = useCurrentYear();

  return (
    <footer 
      role="contentinfo"
      style={{ 
        backgroundColor: '#666',
        color: 'white',
        padding: '40px 20px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-8">
          {/* Logo & Contact */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="ingenious targeting laboratory"
                width={150}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            <div style={{ fontSize: '.9rem', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 5px 0' }}>761-80 Coates Avenue</p>
              <p style={{ margin: '0 0 10px 0' }}>Holbrook, NY 11741</p>
              <p style={{ margin: '0 0 5px 0' }}>
                <a href="tel:+16314688534" style={{ textDecoration: 'none' }} className="hover:underline">(631) 468-8534</a>
              </p>
              <p style={{ margin: 0 }}>
                <a href="/contact" style={{ textDecoration: 'none' }} className="hover:underline">inquiry@genetargeting.com</a>
              </p>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 style={{ 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '.9rem', 
                marginBottom: '12px',
                marginTop: 0
              }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.href} style={{ marginBottom: '8px' }}>
                    <Link 
                      href={link.href} 
                      style={{ color: 'white', textDecoration: 'none', fontSize: '.85rem' }}
                      className="hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '20px', fontSize: '.85rem' }}>
            <Link href="/privacy" style={{ color: 'white', textDecoration: 'none' }} className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'white', textDecoration: 'none' }} className="hover:underline">Terms of Service</Link>
            <Link href="/accessibility" style={{ color: 'white', textDecoration: 'none' }} className="hover:underline">Accessibility</Link>
          </div>
          <p style={{ margin: 0, fontSize: '.85rem', color: 'white' }}>
            © {currentYear} ingenious targeting laboratory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default UXUIDCFooter;
