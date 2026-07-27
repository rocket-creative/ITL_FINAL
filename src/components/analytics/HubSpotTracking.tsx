'use client';

/**
 * HubSpot Tracking Code
 * @version 1.1.0
 * @description HubSpot analytics and CRM integration
 * @features
 * - Page view tracking
 * - Form submission tracking
 * - Lead identification
 * - CRM integration
 * - Email tracking
 * @notes
 * - Uses lazyOnload strategy to prevent hydration conflicts
 * - Chat widget loads during browser idle time after hydration
 */

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '';

// Declare HubSpot on window
declare global {
  interface Window {
    _hsq: Array<[string, ...any[]]>;
    HubSpotConversations?: {
      widget: {
        load: () => void;
        open: () => void;
        close: () => void;
      };
    };
  }
}

// Helper to safely call HubSpot tracking
export function hsq(...args: [string, ...any[]]) {
  if (typeof window !== 'undefined') {
    window._hsq = window._hsq || [];
    window._hsq.push(args);
  }
}

// ============================================
// Page View Tracker
// ============================================
function HubSpotPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && HUBSPOT_PORTAL_ID) {
      // Track page view
      hsq('setPath', pathname);
      hsq('trackPageView');
    }
  }, [pathname, searchParams]);

  return null;
}

// ============================================
// Main HubSpot Tracking Component
// ============================================
export default function HubSpotTracking() {
  if (!HUBSPOT_PORTAL_ID) return null;

  return (
    <>
      <Script
        id="hubspot-tracking"
        strategy="lazyOnload"
        src={`//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      />
      
      <Suspense fallback={null}>
        <HubSpotPageViewTracker />
      </Suspense>
    </>
  );
}

// ============================================
// HubSpot Tracking Functions
// ============================================

/**
 * Identify a visitor with email (for lead tracking)
 */
export function identifyHubSpotUser(email: string, properties?: {
  firstname?: string;
  lastname?: string;
  company?: string;
  phone?: string;
  website?: string;
  [key: string]: any;
}) {
  hsq('identify', {
    email,
    ...properties,
  });
}

/**
 * Track generated event
 */
export function trackHubSpotEvent(eventName: string, properties?: Record<string, any>) {
  hsq('trackCustomBehavioralEvent', {
    name: eventName,
    properties,
  });
}

/**
 * Track quote request
 */
export function trackHubSpotQuoteRequest(data: {
  email?: string;
  modelType?: string;
  serviceType?: string;
  timeline?: string;
  value?: number;
}) {
  // Identify user if email provided
  if (data.email) {
    identifyHubSpotUser(data.email);
  }

  // Track event
  trackHubSpotEvent('pe_quote_request', {
    model_type: data.modelType,
    service_type: data.serviceType,
    timeline: data.timeline,
    value: data.value || 100,
  });
}

/**
 * Track contact form submission
 */
export function trackHubSpotContact(data: {
  email?: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
}) {
  // Identify user if email provided
  if (data.email) {
    const [firstname, ...lastname] = (data.name || '').split(' ');
    identifyHubSpotUser(data.email, {
      firstname,
      lastname: lastname.join(' '),
      company: data.company,
      phone: data.phone,
    });
  }

  // Track event
  trackHubSpotEvent('pe_contact_form', {
    message_length: data.message?.length || 0,
  });
}

/**
 * Track phone call click
 */
export function trackHubSpotPhoneCall() {
  trackHubSpotEvent('pe_phone_click', {});
}

/**
 * Track email click
 */
export function trackHubSpotEmailClick() {
  trackHubSpotEvent('pe_email_click', {});
}

/**
 * Track catalog download
 */
export function trackHubSpotCatalogDownload(catalogType: string) {
  trackHubSpotEvent('pe_catalog_download', {
    catalog_type: catalogType,
  });
}

/**
 * Track service page view (for lead scoring)
 */
export function trackHubSpotServiceView(serviceName: string) {
  trackHubSpotEvent('pe_service_view', {
    service_name: serviceName,
  });
}

/**
 * Open HubSpot chat widget
 */
export function openHubSpotChat() {
  if (typeof window !== 'undefined' && window.HubSpotConversations) {
    window.HubSpotConversations.widget.open();
  }
}

/**
 * Close HubSpot chat widget
 */
export function closeHubSpotChat() {
  if (typeof window !== 'undefined' && window.HubSpotConversations) {
    window.HubSpotConversations.widget.close();
  }
}
