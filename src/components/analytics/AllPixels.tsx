/**
 * All Tracking Pixels Combined
 * @version 1.3.0
 * @description Unified component that loads all tracking pixels
 * Includes: Google Analytics, Facebook, LinkedIn, Twitter, AdRoll, HubSpot
 */

'use client';

import GoogleAnalytics from './GoogleAnalytics';
// import FacebookPixel from './FacebookPixel';
// import LinkedInInsight from './LinkedInInsight';
// import TwitterPixel from './TwitterPixel';
// import AdRollPixel from './AdRollPixel';
import HubSpotTracking from './HubSpotTracking';

export default function AllPixels() {
  return (
    <>
      <GoogleAnalytics />
      {/* FacebookPixel, LinkedInInsight, TwitterPixel, AdRollPixel disabled until IDs configured */}
      <HubSpotTracking />
    </>
  );
}
