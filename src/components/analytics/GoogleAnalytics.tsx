/**
 * Google Analytics 4 + Google Ads Integration
 * @version 1.0.0
 * @created 2026
 * @description Comprehensive analytics tracking with consent mode
 * @features
 * - GA4 for user behavior tracking
 * - Google Ads conversion tracking
 * - Consent mode v2 (GDPR/CCPA compliant)
 * - Automatic page view tracking
 * - Time on page / engagement tracking
 * - Scroll depth tracking
 */

'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import {
  buildGoogleAdsSendTo,
  fireGoogleAdsConversion,
} from '@/lib/analytics/googleAdsConversion';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXXX';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent' | 'js' | 'set',
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Helper to safely call gtag
export function gtag(...args: Parameters<Window['gtag']>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

// ============================================
// Page View Tracking Component
// ============================================
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Track page view with full URL
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });

      // Also send to Google Ads for remarketing
      gtag('config', GOOGLE_ADS_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// ============================================
// Main Google Analytics Component
// ============================================
export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Tag (gtag.js) - loads both GA4 and Google Ads */}
      <Script
        id="google-analytics-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* Initialize gtag with consent mode */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Consent Mode v2 - Default to denied (GDPR compliant)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted'
            });

            // Check for existing consent
            (function() {
              try {
                var consent = localStorage.getItem('itl-cookie-consent');
                var prefs = JSON.parse(localStorage.getItem('itl-cookie-preferences') || '{}');
                
                if (consent === 'true') {
                  if (prefs.analytics) {
                    gtag('consent', 'update', {
                      'analytics_storage': 'granted'
                    });
                  }
                  if (prefs.marketing) {
                    gtag('consent', 'update', {
                      'ad_storage': 'granted',
                      'ad_user_data': 'granted',
                      'ad_personalization': 'granted'
                    });
                  }
                  if (prefs.functional) {
                    gtag('consent', 'update', {
                      'functionality_storage': 'granted',
                      'personalization_storage': 'granted'
                    });
                  }
                }
              } catch(e) {}
            })();

            // Configure GA4
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false, // We handle this manually for SPA
              debug_mode: ${process.env.NODE_ENV === 'development'},
              // Enhanced measurement settings
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              }
            });

            // Configure Google Ads
            gtag('config', '${GOOGLE_ADS_ID}', {
              send_page_view: false
            });
          `,
        }}
      />

      {/* Track page views on route changes */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>

      {/* Enhanced Engagement Tracking */}
      <Script
        id="engagement-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Track time on page
            (function() {
              var startTime = Date.now();
              var engaged = false;
              
              // Mark as engaged after 10 seconds
              setTimeout(function() {
                engaged = true;
                if (window.gtag) {
                  gtag('event', 'engaged_session', {
                    engagement_time_msec: 10000
                  });
                }
              }, 10000);

              // Track total time when leaving
              window.addEventListener('beforeunload', function() {
                var timeOnPage = Math.round((Date.now() - startTime) / 1000);
                if (window.gtag) {
                  gtag('event', 'page_time', {
                    time_on_page_seconds: timeOnPage,
                    page_path: window.location.pathname
                  });
                }
              });

              // Track scroll depth
              var scrollMarkers = [25, 50, 75, 90, 100];
              var reachedMarkers = {};
              
              window.addEventListener('scroll', function() {
                var scrollPercent = Math.round(
                  (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100
                );
                
                scrollMarkers.forEach(function(marker) {
                  if (scrollPercent >= marker && !reachedMarkers[marker]) {
                    reachedMarkers[marker] = true;
                    if (window.gtag) {
                      gtag('event', 'scroll_depth', {
                        percent_scrolled: marker,
                        page_path: window.location.pathname
                      });
                    }
                  }
                });
              });
            })();
          `,
        }}
      />
    </>
  );
}

// ============================================
// Export tracking functions for use in components
// ============================================

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
) {
  gtag('event', eventName, parameters);
}

/**
 * Track a form submission
 */
export function trackFormSubmission(
  formName: string,
  formData?: Record<string, unknown>
) {
  gtag('event', 'form_submission', {
    form_name: formName,
    ...formData,
  });

  // Google Ads conversion fires only when the label env var is a real label slug.
  // If the label is missing or misconfigured, the conversion is skipped rather
  // than emitting a broken send_to.
  fireGoogleAdsConversion(
    buildGoogleAdsSendTo(process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL),
    { value: 1, currency: 'USD' }
  );
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
  ctaName: string,
  ctaLocation: string,
  destinationUrl?: string
) {
  gtag('event', 'cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    destination_url: destinationUrl,
  });
}

/**
 * Track quote request (major conversion)
 */
export function trackQuoteRequest(
  modelType?: string,
  serviceType?: string
) {
  gtag('event', 'generate_lead', {
    currency: 'USD',
    value: 100,
    model_type: modelType,
    service_type: serviceType,
  });

  fireGoogleAdsConversion(
    buildGoogleAdsSendTo(process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL),
    { value: 100, currency: 'USD' }
  );
}

/**
 * Track contact form submission
 */
export function trackContactSubmission(
  inquiryType?: string
) {
  gtag('event', 'generate_lead', {
    method: 'contact_form',
    inquiry_type: inquiryType,
  });
  gtag('event', 'contact_submission', {
    inquiry_type: inquiryType,
  });

  fireGoogleAdsConversion(
    buildGoogleAdsSendTo(process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL)
  );
}

/**
 * Track resource downloads (PDFs, guides, etc)
 */
export function trackDownload(
  fileName: string,
  fileType: string
) {
  gtag('event', 'file_download', {
    file_name: fileName,
    file_extension: fileType,
  });
}

/**
 * Track internal link clicks for funnel analysis
 */
export function trackInternalNavigation(
  fromPage: string,
  toPage: string,
  linkText: string
) {
  gtag('event', 'internal_navigation', {
    from_page: fromPage,
    to_page: toPage,
    link_text: linkText,
  });
}

/**
 * Track search queries
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}
