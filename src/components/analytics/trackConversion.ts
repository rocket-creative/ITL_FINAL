/**
 * Unified Conversion Tracking
 * @version 1.0.0
 * @description Track conversions across ALL platforms with a single call
 */

import { trackQuoteRequest, trackContactSubmission } from './GoogleAnalytics';
import { trackFBLead, trackFBContact } from './FacebookPixel';
import { trackLinkedInLead, trackLinkedInContact } from './LinkedInInsight';
import { trackTwitterLead, trackTwitterCompleteRegistration } from './TwitterPixel';
import { trackAdRollConversion } from './AdRollPixel';

interface ConversionData {
  value?: number;
  currency?: string;
  contentName?: string;
  contentCategory?: string;
  modelType?: string;
  serviceType?: string;
}

/**
 * Track a quote request across ALL platforms
 * Call this when a user submits a quote request form
 */
export function trackQuoteRequestAllPlatforms(data?: ConversionData) {
  const value = data?.value || 100;
  const currency = data?.currency || 'USD';

  // Google Analytics + Ads
  trackQuoteRequest(data?.modelType, data?.serviceType);

  // Facebook
  trackFBLead({
    content_name: data?.contentName || 'Quote Request',
    content_category: data?.contentCategory || data?.modelType || 'Mouse Model',
    value,
    currency,
  });

  // LinkedIn
  trackLinkedInLead();

  // Twitter
  trackTwitterLead({
    value,
    currency,
    content_name: data?.contentName || 'Quote Request',
  });

  // AdRoll
  trackAdRollConversion({
    conversion_value: value,
    currency,
  });

  console.log('[Analytics] Quote request tracked on all platforms');
}

/**
 * Track a contact form submission across ALL platforms
 */
export function trackContactAllPlatforms(data?: {
  inquiryType?: string;
}) {
  // Google Analytics + Ads
  trackContactSubmission(data?.inquiryType);

  // Facebook
  trackFBContact();

  // LinkedIn
  trackLinkedInContact();

  // Twitter
  trackTwitterCompleteRegistration();

  // AdRoll
  trackAdRollConversion({
    conversion_value: 50,
    currency: 'USD',
  });

  console.log('[Analytics] Contact form tracked on all platforms');
}

/**
 * Track a phone call click across ALL platforms
 */
export function trackPhoneCallAllPlatforms() {
  // Google Analytics
  import('./GoogleAnalytics').then(({ trackCTAClick }) => {
    trackCTAClick('phone_call', 'header', 'tel:');
  });

  // Facebook custom event
  import('./FacebookPixel').then(({ trackFBCustomEvent }) => {
    trackFBCustomEvent('PhoneCall');
  });

  // AdRoll
  trackAdRollConversion({
    conversion_value: 75,
    currency: 'USD',
  });

  console.log('[Analytics] Phone call tracked on all platforms');
}

/**
 * Track email click across ALL platforms
 */
export function trackEmailClickAllPlatforms() {
  // Google Analytics
  import('./GoogleAnalytics').then(({ trackCTAClick }) => {
    trackCTAClick('email_click', 'contact', 'mailto:');
  });

  // Facebook custom event
  import('./FacebookPixel').then(({ trackFBCustomEvent }) => {
    trackFBCustomEvent('EmailClick');
  });

  console.log('[Analytics] Email click tracked on all platforms');
}

/**
 * Identify user across platforms (after form submission with email)
 * Use carefully - only after user provides email and consents
 */
export function identifyUserAllPlatforms(email: string) {
  // AdRoll
  import('./AdRollPixel').then(({ identifyAdRollUser }) => {
    identifyAdRollUser(email);
  });

  console.log('[Analytics] User identified for personalization');
}
