/**
 * Facebook/Meta Pixel Integration
 * @version 1.0.0
 * @description Meta Pixel for Facebook & Instagram ads tracking
 * @features
 * - Page view tracking
 * - Conversion events (Lead, Contact, etc.)
 * - Custom audiences for retargeting
 * - Consent mode integration
 */

'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// Declare fbq on window
declare global {
  interface Window {
    fbq: (
      command: string,
      eventOrId: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq: typeof Window.prototype.fbq;
  }
}

// Helper to safely call fbq
export function fbq(
  command: string,
  eventOrId: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(command, eventOrId, params);
  }
}

// ============================================
// Page View Tracker
// ============================================
function FacebookPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && FB_PIXEL_ID) {
      fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

// ============================================
// Main Facebook Pixel Component
// ============================================
export default function FacebookPixel() {
  if (!FB_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            // Check consent before initializing
            (function() {
              try {
                var consent = localStorage.getItem('itl-cookie-consent');
                var prefs = JSON.parse(localStorage.getItem('itl-cookie-preferences') || '{}');
                
                if (consent === 'true' && prefs.marketing) {
                  fbq('init', '${FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                } else {
                  // Initialize with limited data use
                  fbq('init', '${FB_PIXEL_ID}');
                  fbq('dataProcessingOptions', ['LDU'], 0, 0);
                }
              } catch(e) {
                fbq('init', '${FB_PIXEL_ID}');
                fbq('dataProcessingOptions', ['LDU'], 0, 0);
              }
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
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      
      <Suspense fallback={null}>
        <FacebookPageViewTracker />
      </Suspense>
    </>
  );
}

// ============================================
// Facebook Event Tracking Functions
// ============================================

/**
 * Track a lead (quote request, contact form)
 */
export function trackFBLead(data?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}) {
  fbq('track', 'Lead', {
    content_name: data?.content_name || 'Quote Request',
    content_category: data?.content_category || 'Mouse Model',
    value: data?.value || 100,
    currency: data?.currency || 'USD',
  });
}

/**
 * Track contact form submission
 */
export function trackFBContact() {
  fbq('track', 'Contact');
}

/**
 * Track content view (specific service/model page)
 */
export function trackFBViewContent(data: {
  content_name: string;
  content_category?: string;
  content_type?: string;
}) {
  fbq('track', 'ViewContent', {
    content_name: data.content_name,
    content_category: data.content_category || 'Service',
    content_type: data.content_type || 'product',
  });
}

/**
 * Track search
 */
export function trackFBSearch(searchString: string) {
  fbq('track', 'Search', { search_string: searchString });
}

/**
 * Track custom event
 */
export function trackFBCustomEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  fbq('trackCustom', eventName, params);
}

/**
 * Update consent status
 */
export function updateFBConsent(granted: boolean) {
  if (granted) {
    fbq('consent', 'grant');
  } else {
    fbq('consent', 'revoke');
  }
}
