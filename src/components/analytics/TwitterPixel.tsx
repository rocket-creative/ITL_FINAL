/**
 * Twitter/X Pixel Integration
 * @version 1.0.0
 * @description X (Twitter) Pixel for ads tracking and conversions
 * @features
 * - Page view tracking
 * - Conversion events
 * - Custom audiences
 */

'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const TWITTER_PIXEL_ID = process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID || '';

// Declare twq on window
declare global {
  interface Window {
    twq: (
      command: string,
      eventOrId?: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

// Helper to safely call twq
export function twq(
  command: string,
  eventOrId?: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.twq) {
    if (eventOrId) {
      window.twq(command, eventOrId, params);
    } else {
      window.twq(command);
    }
  }
}

// ============================================
// Page View Tracker
// ============================================
function TwitterPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && TWITTER_PIXEL_ID) {
      twq('track', 'PageView');
    }
  }, [pathname]);

  return null;
}

// ============================================
// Main Twitter Pixel Component
// ============================================
export default function TwitterPixel() {
  if (!TWITTER_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="twitter-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Check consent before loading
            (function() {
              try {
                var consent = localStorage.getItem('itl-cookie-consent');
                var prefs = JSON.parse(localStorage.getItem('itl-cookie-preferences') || '{}');
                
                if (consent !== 'true' || !prefs.marketing) {
                  return; // Don't load Twitter pixel without consent
                }
              } catch(e) {
                return;
              }
              
              !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
              },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
              a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
              
              twq('config', '${TWITTER_PIXEL_ID}');
              twq('track', 'PageView');
            })();
          `,
        }}
      />
      
      <TwitterPageViewTracker />
    </>
  );
}

// ============================================
// Twitter/X Event Tracking Functions
// ============================================

/**
 * Track a lead/signup
 */
export function trackTwitterLead(data?: {
  value?: number;
  currency?: string;
  content_name?: string;
}) {
  twq('track', 'Lead', {
    value: data?.value,
    currency: data?.currency || 'USD',
    content_name: data?.content_name,
  });
}

/**
 * Track form submission
 */
export function trackTwitterCompleteRegistration(data?: {
  value?: number;
  currency?: string;
}) {
  twq('track', 'CompleteRegistration', {
    value: data?.value,
    currency: data?.currency || 'USD',
  });
}

/**
 * Track content view
 */
export function trackTwitterViewContent(contentName: string) {
  twq('track', 'ViewContent', {
    content_name: contentName,
  });
}

/**
 * Track search
 */
export function trackTwitterSearch(searchString: string) {
  twq('track', 'Search', {
    search_string: searchString,
  });
}

/**
 * Track custom event
 */
export function trackTwitterCustom(
  eventName: string,
  params?: Record<string, unknown>
) {
  twq('track', eventName, params);
}
