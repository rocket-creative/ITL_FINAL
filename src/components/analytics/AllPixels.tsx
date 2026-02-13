/**
 * All Tracking Pixels Combined
 * @version 1.2.0
 * @description Unified component that loads all tracking pixels
 * Includes: Google Analytics, Facebook, LinkedIn, Twitter, AdRoll, HubSpot
 * @note Temporarily disabled - causes removeChild DOM conflicts
 */

'use client';

// import GoogleAnalytics from './GoogleAnalytics';
// import FacebookPixel from './FacebookPixel';
// import LinkedInInsight from './LinkedInInsight';
// import TwitterPixel from './TwitterPixel';
// import AdRollPixel from './AdRollPixel';
// import HubSpotTracking from './HubSpotTracking';

export default function AllPixels() {
  // Tracking pixels temporarily disabled due to removeChild DOM conflicts
  // The inline scripts use s.parentNode.insertBefore which conflicts with React's DOM management
  // Return empty fragment to maintain consistent hydration
  return <></>;
  
  // Original code (causes removeChild errors):
  // return (
  //   <>
  //     <GoogleAnalytics />
  //     <FacebookPixel />
  //     <LinkedInInsight />
  //     <TwitterPixel />
  //     <AdRollPixel />
  //     <HubSpotTracking />
  //   </>
  // );
}
