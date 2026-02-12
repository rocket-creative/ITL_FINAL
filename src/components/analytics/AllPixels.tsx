/**
 * All Tracking Pixels Combined
 * @version 1.1.0
 * @description Unified component that loads all tracking pixels
 * Includes: Google Analytics, Facebook, LinkedIn, Twitter, AdRoll, HubSpot
 */

'use client';

import GoogleAnalytics from './GoogleAnalytics';
import FacebookPixel from './FacebookPixel';
import LinkedInInsight from './LinkedInInsight';
import TwitterPixel from './TwitterPixel';
import AdRollPixel from './AdRollPixel';
import HubSpotTracking from './HubSpotTracking';

export default function AllPixels() {
  return (
    <>
      {/* Google Analytics 4 + Google Ads */}
      <GoogleAnalytics />
      
      {/* Facebook/Meta Pixel */}
      <FacebookPixel />
      
      {/* LinkedIn Insight Tag */}
      <LinkedInInsight />
      
      {/* Twitter/X Pixel */}
      <TwitterPixel />
      
      {/* AdRoll Retargeting */}
      <AdRollPixel />
      
      {/* HubSpot Analytics + CRM */}
      <HubSpotTracking />
    </>
  );
}
