/**
 * Unified Conversion Tracking
 * @version 1.1.0
 * @description Track conversions across ALL platforms with a single call
 * Includes: Google, Facebook, LinkedIn, Twitter, AdRoll, HubSpot
 */

import { trackQuoteRequest, trackContactSubmission } from './GoogleAnalytics';
import { trackFBLead, trackFBContact } from './FacebookPixel';
import { trackLinkedInLead, trackLinkedInContact } from './LinkedInInsight';
import { trackTwitterLead, trackTwitterCompleteRegistration } from './TwitterPixel';
import { trackAdRollConversion } from './AdRollPixel';
import { trackHubSpotQuoteRequest, trackHubSpotContact, trackHubSpotPhoneCall, trackHubSpotEmailClick, identifyHubSpotUser } from './HubSpotTracking';

interface ConversionData {
  value?: number;
  currency?: string;
  contentName?: string;
  contentCategory?: string;
  modelType?: string;
  serviceType?: string;
  email?: string;
  timeline?: string;
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

  // HubSpot
  trackHubSpotQuoteRequest({
    email: data?.email,
    modelType: data?.modelType,
    serviceType: data?.serviceType,
    timeline: data?.timeline,
    value,
  });

  console.log('[Analytics] Quote request tracked on all platforms (incl. HubSpot)');
}

/**
 * Track a contact form submission across ALL platforms
 */
export function trackContactAllPlatforms(data?: {
  inquiryType?: string;
  email?: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
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

  // HubSpot
  trackHubSpotContact({
    email: data?.email,
    name: data?.name,
    company: data?.company,
    phone: data?.phone,
    message: data?.message,
  });

  console.log('[Analytics] Contact form tracked on all platforms (incl. HubSpot)');
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

  // HubSpot
  trackHubSpotPhoneCall();

  console.log('[Analytics] Phone call tracked on all platforms (incl. HubSpot)');
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

  // HubSpot
  trackHubSpotEmailClick();

  console.log('[Analytics] Email click tracked on all platforms (incl. HubSpot)');
}

/**
 * Identify user across platforms (after form submission with email)
 * Use carefully - only after user provides email and consents
 */
export function identifyUserAllPlatforms(email: string, properties?: {
  firstname?: string;
  lastname?: string;
  company?: string;
  phone?: string;
}) {
  // AdRoll
  import('./AdRollPixel').then(({ identifyAdRollUser }) => {
    identifyAdRollUser(email);
  });

  // HubSpot - Most important for B2B lead tracking
  identifyHubSpotUser(email, properties);

  console.log('[Analytics] User identified for personalization (incl. HubSpot CRM)');
}
