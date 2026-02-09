/**
 * Analytics API Route
 * @description Fetches analytics data from Google Analytics 4 Data API
 * 
 * SETUP REQUIRED:
 * 1. Install: npm install @google-analytics/data
 * 2. Create a service account in Google Cloud Console
 * 3. Download the JSON key file
 * 4. Add the service account email as a viewer in GA4
 * 5. Set environment variables (see below)
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Session cookie name (must match auth route)
const SESSION_COOKIE = 'itl-admin-session';

// Check if user is authenticated
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

// Environment variables needed for real GA4 API:
// GOOGLE_APPLICATION_CREDENTIALS - Path to service account JSON
// GA4_PROPERTY_ID - Your GA4 property ID (e.g., "123456789")

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const USE_MOCK_DATA = !GA4_PROPERTY_ID || process.env.USE_MOCK_ANALYTICS === 'true';

export async function GET(request: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const days = parseInt(searchParams.get('days') || '7', 10);

  try {
    if (USE_MOCK_DATA) {
      // Return mock data for development/demo
      return NextResponse.json(getMockData(days));
    }

    // Real GA4 API implementation
    const data = await fetchGA4Data(days);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

/**
 * Fetch real data from GA4 API
 * Requires: npm install @google-analytics/data
 * 
 * NOTE: This function is currently disabled during build because the 
 * @google-analytics/data package is not installed. When you're ready
 * to use real GA4 data:
 * 1. Run: npm install @google-analytics/data
 * 2. Set up service account credentials
 * 3. Uncomment the implementation below
 */
async function fetchGA4Data(days: number) {
  // GA4 API package not installed - return mock data
  // To enable real GA4 data, install the package and implement the API calls
  console.log('GA4 API not configured, returning mock data for', days, 'days');
  return getMockData(days);
  
  /* 
  // UNCOMMENT THIS BLOCK AFTER INSTALLING @google-analytics/data
  
  const { BetaAnalyticsDataClient } = await import('@google-analytics/data');
  const analyticsDataClient = new BetaAnalyticsDataClient();
  const propertyId = GA4_PROPERTY_ID;

  const endDate = 'today';
  const startDate = days === 0 ? 'today' : `${days}daysAgo`;

  const [overviewResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
      { name: 'engagementRate' },
    ],
  });

  // ... rest of GA4 implementation
  */
}

/**
 * Format seconds into mm:ss
 * Note: Currently unused but kept for future GA4 API implementation
 */
function _formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Mock data for development/demo
 */
function getMockData(days: number) {
  // Scale mock data based on date range
  const multiplier = days === 0 ? 0.1 : days === 1 ? 0.15 : days / 7;
  
  return {
    overview: {
      totalUsers: Math.round(1247 * multiplier),
      newUsers: Math.round(892 * multiplier),
      sessions: Math.round(1834 * multiplier),
      pageViews: Math.round(5621 * multiplier),
      avgSessionDuration: '2:34',
      bounceRate: '42.3%',
      engagementRate: '67.8%',
    },
    realtime: {
      activeUsers: Math.floor(Math.random() * 15) + 3,
    },
    topPages: [
      { page: '/', views: Math.round(1823 * multiplier), avgTime: '1:45' },
      { page: '/knockout-mouse-models', views: Math.round(645 * multiplier), avgTime: '3:12' },
      { page: '/request-quote', views: Math.round(423 * multiplier), avgTime: '4:28' },
      { page: '/humanized-mouse-models', views: Math.round(389 * multiplier), avgTime: '2:56' },
      { page: '/custom-mouse-models', views: Math.round(312 * multiplier), avgTime: '2:34' },
      { page: '/knockin-mouse-models', views: Math.round(287 * multiplier), avgTime: '3:01' },
      { page: '/therapeutic-areas', views: Math.round(234 * multiplier), avgTime: '2:18' },
      { page: '/about-itl', views: Math.round(198 * multiplier), avgTime: '1:52' },
      { page: '/immuno-oncology-mouse-models', views: Math.round(176 * multiplier), avgTime: '3:45' },
      { page: '/pricing-overview', views: Math.round(154 * multiplier), avgTime: '2:21' },
    ],
    trafficSources: [
      { source: 'google', users: Math.round(623 * multiplier), percentage: 50 },
      { source: 'direct', users: Math.round(312 * multiplier), percentage: 25 },
      { source: 'google_ads', users: Math.round(187 * multiplier), percentage: 15 },
      { source: 'linkedin', users: Math.round(75 * multiplier), percentage: 6 },
      { source: 'bing', users: Math.round(50 * multiplier), percentage: 4 },
    ],
    conversions: {
      quoteRequests: Math.round(23 * multiplier),
      contactForms: Math.round(18 * multiplier),
      totalLeads: Math.round(41 * multiplier),
      conversionRate: '3.29%',
    },
    googleAds: {
      clicks: Math.round(187 * multiplier),
      impressions: Math.round(12450 * multiplier),
      cost: `$${(847 * multiplier).toFixed(2)}`,
      conversions: Math.round(12 * multiplier),
      cpc: '$4.53',
      conversionRate: '6.4%',
    },
    recentEvents: [
      { event: 'page_view', count: Math.round(5621 * multiplier), lastOccurred: '2 min ago' },
      { event: 'scroll_depth', count: Math.round(3245 * multiplier), lastOccurred: '3 min ago' },
      { event: 'cta_click', count: Math.round(534 * multiplier), lastOccurred: '5 min ago' },
      { event: 'form_start', count: Math.round(123 * multiplier), lastOccurred: '12 min ago' },
      { event: 'generate_lead', count: Math.round(23 * multiplier), lastOccurred: '1 hour ago' },
      { event: 'contact_submission', count: Math.round(18 * multiplier), lastOccurred: '2 hours ago' },
      { event: 'file_download', count: Math.round(45 * multiplier), lastOccurred: '3 hours ago' },
      { event: 'engaged_session', count: Math.round(892 * multiplier), lastOccurred: '5 min ago' },
    ],
  };
}
