/**
 * Tracking Pixels Status API
 * @description Returns configuration status of all tracking pixels
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'itl-admin-session';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check which pixels are configured via environment variables
  const pixels = {
    googleAnalytics: {
      name: 'Google Analytics 4',
      configured: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && 
                  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX',
      id: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'Not configured',
      icon: 'google',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    googleAds: {
      name: 'Google Ads',
      configured: !!process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && 
                  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID !== 'AW-XXXXXXXXXX',
      id: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'Not configured',
      icon: 'google',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    facebook: {
      name: 'Meta (Facebook)',
      configured: !!process.env.NEXT_PUBLIC_FB_PIXEL_ID,
      id: process.env.NEXT_PUBLIC_FB_PIXEL_ID 
        ? `${process.env.NEXT_PUBLIC_FB_PIXEL_ID.slice(0, 4)}...` 
        : 'Not configured',
      icon: 'facebook',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    linkedin: {
      name: 'LinkedIn',
      configured: !!process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
      id: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || 'Not configured',
      icon: 'linkedin',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    twitter: {
      name: 'Twitter/X',
      configured: !!process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID,
      id: process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID || 'Not configured',
      icon: 'twitter',
      color: 'text-gray-800',
      bgColor: 'bg-gray-50',
    },
    adroll: {
      name: 'AdRoll',
      configured: !!process.env.NEXT_PUBLIC_ADROLL_ADV_ID && 
                  !!process.env.NEXT_PUBLIC_ADROLL_PIX_ID,
      id: process.env.NEXT_PUBLIC_ADROLL_ADV_ID 
        ? `${process.env.NEXT_PUBLIC_ADROLL_ADV_ID.slice(0, 8)}...` 
        : 'Not configured',
      icon: 'adroll',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  };

  const configuredCount = Object.values(pixels).filter(p => p.configured).length;
  const totalCount = Object.values(pixels).length;

  return NextResponse.json({
    pixels,
    summary: {
      configured: configuredCount,
      total: totalCount,
      percentage: Math.round((configuredCount / totalCount) * 100),
    },
  });
}
