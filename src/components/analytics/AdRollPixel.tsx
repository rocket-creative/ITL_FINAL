/**
 * AdRoll Retargeting Pixel Integration
 * @version 1.0.0
 * @description AdRoll for cross-platform retargeting campaigns
 * @features
 * - Cross-platform retargeting (web, social, email)
 * - Dynamic product ads
 * - Conversion tracking
 * - Audience segmentation
 */

'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const ADROLL_ADV_ID = process.env.NEXT_PUBLIC_ADROLL_ADV_ID || '';
const ADROLL_PIX_ID = process.env.NEXT_PUBLIC_ADROLL_PIX_ID || '';

// Declare adroll on window
declare global {
  interface Window {
    adroll_adv_id: string;
    adroll_pix_id: string;
    adroll_version: string;
    adroll_current_page: string;
    adroll_custom_data: Record<string, unknown>;
    __adroll_loaded: boolean;
    __adroll: {
      record_user: (data: Record<string, unknown>) => void;
    };
  }
}

// ============================================
// Page Tracker
// ============================================
function AdRollPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && ADROLL_ADV_ID && typeof window !== 'undefined') {
      // Update current page for AdRoll
      window.adroll_current_page = pathname;
      
      // Categorize pages for better targeting
      let pageType = 'other';
      if (pathname === '/') {
        pageType = 'homepage';
      } else if (pathname.includes('request-quote')) {
        pageType = 'conversion';
      } else if (pathname.includes('contact')) {
        pageType = 'contact';
      } else if (pathname.includes('knockout') || pathname.includes('knockin') || pathname.includes('humanized')) {
        pageType = 'product';
      } else if (pathname.includes('services')) {
        pageType = 'services';
      }
      
      window.adroll_custom_data = {
        page_type: pageType,
        page_path: pathname,
      };
    }
  }, [pathname]);

  return null;
}

// ============================================
// Main AdRoll Pixel Component
// ============================================
export default function AdRollPixel() {
  if (!ADROLL_ADV_ID || !ADROLL_PIX_ID) return null;

  return (
    <>
      <Script
        id="adroll-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Check consent before loading
            (function() {
              try {
                var consent = localStorage.getItem('itl-cookie-consent');
                var prefs = JSON.parse(localStorage.getItem('itl-cookie-preferences') || '{}');
                
                if (consent !== 'true' || !prefs.marketing) {
                  return; // Don't load AdRoll without consent
                }
              } catch(e) {
                return;
              }
              
              adroll_adv_id = "${ADROLL_ADV_ID}";
              adroll_pix_id = "${ADROLL_PIX_ID}";
              adroll_version = "2.0";
              
              (function(w, d, e, o, a) {
                w.__adroll_loaded = true;
                w.adroll = w.adroll || [];
                w.adroll.f = ['setProperties', 'identify', 'track'];
                var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id + "/roundtrip.js";
                for (a = 0; a < w.adroll.f.length; a++) {
                  w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                    return function() {
                      w.adroll.push([n, arguments])
                    }
                  })(w.adroll.f[a])
                }
                e = d.createElement('script');
                o = d.getElementsByTagName('script')[0];
                e.async = 1;
                e.src = roundtripUrl;
                o.parentNode.insertBefore(e, o);
              })(window, document);
            })();
          `,
        }}
      />
      
      <AdRollPageTracker />
    </>
  );
}

// ============================================
// AdRoll Tracking Functions
// ============================================

/**
 * Track a conversion/lead
 */
export function trackAdRollConversion(data?: {
  conversion_value?: number;
  currency?: string;
  order_id?: string;
}) {
  if (typeof window !== 'undefined' && window.__adroll_loaded) {
    try {
      const img = document.createElement('img');
      img.setAttribute('width', '1');
      img.setAttribute('height', '1');
      img.setAttribute('style', 'border:0');
      img.setAttribute('alt', '');
      
      const params = new URLSearchParams({
        adroll_conversion_value: String(data?.conversion_value || 100),
        adroll_currency: data?.currency || 'USD',
        ...(data?.order_id && { order_id: data.order_id }),
      });
      
      img.src = `https://d.adroll.com/ipixel/${ADROLL_ADV_ID}/${ADROLL_PIX_ID}?${params}`;
      document.body.appendChild(img);
    } catch (e) {
      console.error('AdRoll conversion tracking error:', e);
    }
  }
}

/**
 * Identify a user (for personalization)
 */
export function identifyAdRollUser(email: string) {
  if (typeof window !== 'undefined' && (window as unknown as { adroll?: { identify?: (data: Record<string, string>) => void } }).adroll?.identify) {
    (window as unknown as { adroll: { identify: (data: Record<string, string>) => void } }).adroll.identify({ email });
  }
}

/**
 * Track custom segment
 */
export function trackAdRollSegment(segmentName: string) {
  if (typeof window !== 'undefined') {
    window.adroll_custom_data = {
      ...window.adroll_custom_data,
      segment: segmentName,
    };
  }
}
