/**
 * useAnalytics Hook
 * @version 1.0.0
 * @description React hook for easy analytics tracking in components
 */

'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackEvent,
  trackFormSubmission,
  trackCTAClick,
  trackQuoteRequest,
  trackContactSubmission,
  trackDownload,
  trackInternalNavigation,
  trackSearch,
} from './GoogleAnalytics';

export interface AnalyticsHook {
  // General event tracking
  trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
  
  // Form tracking
  trackFormSubmission: (formName: string, formData?: Record<string, unknown>) => void;
  
  // CTA tracking
  trackCTAClick: (ctaName: string, destinationUrl?: string) => void;
  
  // Conversion tracking
  trackQuoteRequest: (modelType?: string, serviceType?: string) => void;
  trackContactSubmission: (inquiryType?: string) => void;
  
  // Content tracking
  trackDownload: (fileName: string, fileType: string) => void;
  trackSearch: (searchTerm: string, resultsCount?: number) => void;
  
  // Navigation tracking
  trackNavigation: (toPage: string, linkText: string) => void;
}

/**
 * Hook for tracking analytics events in components
 * Automatically captures the current page for context
 */
export function useAnalytics(): AnalyticsHook {
  const pathname = usePathname();

  const handleCTAClick = useCallback(
    (ctaName: string, destinationUrl?: string) => {
      trackCTAClick(ctaName, pathname || 'unknown', destinationUrl);
    },
    [pathname]
  );

  const handleNavigation = useCallback(
    (toPage: string, linkText: string) => {
      trackInternalNavigation(pathname || 'unknown', toPage, linkText);
    },
    [pathname]
  );

  return {
    trackEvent,
    trackFormSubmission,
    trackCTAClick: handleCTAClick,
    trackQuoteRequest,
    trackContactSubmission,
    trackDownload,
    trackSearch,
    trackNavigation: handleNavigation,
  };
}

export default useAnalytics;
