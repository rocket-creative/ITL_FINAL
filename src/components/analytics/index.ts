/**
 * Analytics Module Exports
 * Includes: Google Analytics, Facebook, LinkedIn, Twitter, AdRoll
 */

// ============================================
// All Pixels (use this in layout)
// ============================================
export { default as AllPixels } from './AllPixels';

// ============================================
// Individual Pixel Components
// ============================================
export { default as GoogleAnalytics } from './GoogleAnalytics';
export { default as FacebookPixel } from './FacebookPixel';
export { default as LinkedInInsight } from './LinkedInInsight';
export { default as TwitterPixel } from './TwitterPixel';
export { default as AdRollPixel } from './AdRollPixel';

// ============================================
// Google Analytics Functions
// ============================================
export {
  gtag,
  trackEvent,
  trackFormSubmission,
  trackCTAClick,
  trackQuoteRequest,
  trackContactSubmission,
  trackDownload,
  trackInternalNavigation,
  trackSearch,
} from './GoogleAnalytics';

// ============================================
// Facebook Pixel Functions
// ============================================
export {
  fbq,
  trackFBLead,
  trackFBContact,
  trackFBViewContent,
  trackFBSearch,
  trackFBCustomEvent,
  updateFBConsent,
} from './FacebookPixel';

// ============================================
// LinkedIn Functions
// ============================================
export {
  lintrk,
  trackLinkedInConversion,
  trackLinkedInLead,
  trackLinkedInContact,
} from './LinkedInInsight';

// ============================================
// Twitter/X Functions
// ============================================
export {
  twq,
  trackTwitterLead,
  trackTwitterCompleteRegistration,
  trackTwitterViewContent,
  trackTwitterSearch,
  trackTwitterCustom,
} from './TwitterPixel';

// ============================================
// AdRoll Functions
// ============================================
export {
  trackAdRollConversion,
  identifyAdRollUser,
  trackAdRollSegment,
} from './AdRollPixel';

// ============================================
// Unified Conversion Tracking (tracks ALL platforms)
// ============================================
export {
  trackQuoteRequestAllPlatforms,
  trackContactAllPlatforms,
  trackPhoneCallAllPlatforms,
  trackEmailClickAllPlatforms,
  identifyUserAllPlatforms,
} from './trackConversion';

// ============================================
// React Hook
// ============================================
export { useAnalytics } from './useAnalytics';
export type { AnalyticsHook } from './useAnalytics';

// ============================================
// Pre-built Tracked Components
// ============================================
export {
  TrackedCTAButton,
  TrackedLink,
  TrackedPhone,
  TrackedEmail,
  TrackedForm,
  handleQuoteFormSubmit,
  handleContactFormSubmit,
} from './TrackedComponents';
