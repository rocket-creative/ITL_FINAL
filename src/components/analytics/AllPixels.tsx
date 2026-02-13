/**
 * All Tracking Pixels Combined
 * @version 1.5.0
 * @description Unified component that loads additional tracking pixels
 * Note: Google Analytics is loaded directly in layout.tsx for Google verification
 * Includes: HubSpot, AdRoll (others available when configured)
 */

'use client';

// Google Analytics moved to layout.tsx with beforeInteractive for Google verification
// import GoogleAnalytics from './GoogleAnalytics';
// import FacebookPixel from './FacebookPixel';
// import LinkedInInsight from './LinkedInInsight';
// import TwitterPixel from './TwitterPixel';
import AdRollPixel from './AdRollPixel';
import HubSpotTracking from './HubSpotTracking';

export default function AllPixels() {
  return (
    <>
      {/* Google Analytics loaded in layout.tsx for verification compatibility */}
      {/* FacebookPixel, LinkedInInsight, TwitterPixel disabled until IDs configured */}
      <HubSpotTracking />
      <AdRollPixel />
    </>
  );
}
