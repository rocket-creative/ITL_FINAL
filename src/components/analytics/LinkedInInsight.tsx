/**
 * LinkedIn Insight Tag Integration
 * @version 1.0.0
 * @description LinkedIn tracking for B2B audience insights and ads
 * @features
 * - Page view tracking
 * - Conversion tracking
 * - Audience building for retargeting
 * - B2B demographic insights
 */

'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || '';

// Declare lintrk on window
declare global {
  interface Window {
    lintrk: (command: string, data?: Record<string, unknown>) => void;
    _linkedin_data_partner_ids: string[];
  }
}

// Helper to safely call lintrk
export function lintrk(command: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk(command, data);
  }
}

// ============================================
// Page View Tracker
// ============================================
function LinkedInPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && LINKEDIN_PARTNER_ID) {
      // LinkedIn auto-tracks page views, but we can trigger manually if needed
      lintrk('track');
    }
  }, [pathname]);

  return null;
}

// ============================================
// Main LinkedIn Insight Tag Component
// ============================================
export default function LinkedInInsight() {
  if (!LINKEDIN_PARTNER_ID) return null;

  return (
    <>
      <Script
        id="linkedin-insight"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Check consent before loading
            (function() {
              try {
                var consent = localStorage.getItem('itl-cookie-consent');
                var prefs = JSON.parse(localStorage.getItem('itl-cookie-preferences') || '{}');
                
                if (consent !== 'true' || !prefs.marketing) {
                  return; // Don't load LinkedIn tag without consent
                }
              } catch(e) {
                return;
              }
              
              _linkedin_data_partner_ids = _linkedin_data_partner_ids || [];
              _linkedin_data_partner_ids.push('${LINKEDIN_PARTNER_ID}');
              
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            })();
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Tracking pixel requires img tag */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
        />
      </noscript>
      
      <LinkedInPageViewTracker />
    </>
  );
}

// ============================================
// LinkedIn Conversion Tracking Functions
// ============================================

/**
 * Track a conversion event
 * You'll need to create conversion IDs in LinkedIn Campaign Manager
 */
export function trackLinkedInConversion(conversionId: string) {
  lintrk('track', { conversion_id: conversionId });
}

/**
 * Track lead generation
 */
export function trackLinkedInLead() {
  // Use your LinkedIn conversion ID for leads
  const leadConversionId = process.env.NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID;
  if (leadConversionId) {
    lintrk('track', { conversion_id: leadConversionId });
  }
}

/**
 * Track contact form submission
 */
export function trackLinkedInContact() {
  const contactConversionId = process.env.NEXT_PUBLIC_LINKEDIN_CONTACT_CONVERSION_ID;
  if (contactConversionId) {
    lintrk('track', { conversion_id: contactConversionId });
  }
}
