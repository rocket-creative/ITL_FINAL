/**
 * Admin Analytics Dashboard
 * @description Main dashboard showing website analytics and metrics
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Types for pixel status
interface PixelInfo {
  name: string;
  configured: boolean;
  id: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface PixelsData {
  pixels: Record<string, PixelInfo>;
  summary: {
    configured: number;
    total: number;
    percentage: number;
  };
}

// Types for analytics data
interface AnalyticsData {
  overview: {
    totalUsers: number;
    newUsers: number;
    sessions: number;
    pageViews: number;
    avgSessionDuration: string;
    bounceRate: string;
    engagementRate: string;
  };
  realtime: {
    activeUsers: number;
  };
  topPages: Array<{
    page: string;
    views: number;
    avgTime: string;
  }>;
  trafficSources: Array<{
    source: string;
    users: number;
    percentage: number;
  }>;
  conversions: {
    quoteRequests: number;
    contactForms: number;
    totalLeads: number;
    conversionRate: string;
  };
  googleAds: {
    clicks: number;
    impressions: number;
    cost: string;
    conversions: number;
    cpc: string;
    conversionRate: string;
  };
  recentEvents: Array<{
    event: string;
    count: number;
    lastOccurred: string;
  }>;
}

interface DateRange {
  label: string;
  days: number;
}

const dateRanges: DateRange[] = [
  { label: 'Today', days: 0 },
  { label: 'Yesterday', days: 1 },
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [pixelsData, setPixelsData] = useState<PixelsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState(7);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  // Fetch analytics data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [analyticsRes, pixelsRes] = await Promise.all([
        fetch(`/api/admin/analytics?days=${dateRange}`),
        fetch('/api/admin/pixels'),
      ]);
      
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setData(analyticsData);
      } else {
        setError('Failed to fetch analytics data');
      }
      
      if (pixelsRes.ok) {
        const pixels = await pixelsRes.json();
        setPixelsData(pixels);
      }
    } catch {
      setError('Error loading analytics');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      // Refresh data every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchData]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#002B5C] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#002B5C] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-[#002B5C]">ITL Analytics</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Date Range Selector */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(Number(e.target.value))}
                className="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#002B5C] outline-none"
              >
                {dateRanges.map((range) => (
                  <option key={range.days} value={range.days}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Refresh Button */}
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Refresh data"
              >
                <svg className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : null}

        {/* Active Users Banner */}
        <div className="bg-gradient-to-r from-[#002B5C] to-[#004080] text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Active Users Now</p>
              <p className="text-4xl font-bold mt-1">
                {loading ? '...' : data?.realtime.activeUsers ?? 0}
              </p>
              <p className="text-sm opacity-80 mt-2">Users on your site right now</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Live</span>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <StatCard
            label="Total Users"
            value={data?.overview.totalUsers ?? 0}
            loading={loading}
          />
          <StatCard
            label="New Users"
            value={data?.overview.newUsers ?? 0}
            loading={loading}
          />
          <StatCard
            label="Sessions"
            value={data?.overview.sessions ?? 0}
            loading={loading}
          />
          <StatCard
            label="Page Views"
            value={data?.overview.pageViews ?? 0}
            loading={loading}
          />
          <StatCard
            label="Avg. Duration"
            value={data?.overview.avgSessionDuration ?? '0:00'}
            loading={loading}
            isText
          />
          <StatCard
            label="Bounce Rate"
            value={data?.overview.bounceRate ?? '0%'}
            loading={loading}
            isText
          />
          <StatCard
            label="Engagement"
            value={data?.overview.engagementRate ?? '0%'}
            loading={loading}
            isText
          />
        </div>

        {/* Conversions & Google Ads */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Conversions */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-[#002B5C] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Conversions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Quote Requests</p>
                <p className="text-2xl font-bold text-green-600">
                  {loading ? '...' : data?.conversions.quoteRequests ?? 0}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Contact Forms</p>
                <p className="text-2xl font-bold text-blue-600">
                  {loading ? '...' : data?.conversions.contactForms ?? 0}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-purple-600">
                  {loading ? '...' : data?.conversions.totalLeads ?? 0}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {loading ? '...' : data?.conversions.conversionRate ?? '0%'}
                </p>
              </div>
            </div>
          </div>

          {/* Google Ads */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-[#002B5C] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Google Ads Performance
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Clicks</p>
                <p className="text-xl font-bold text-[#002B5C]">
                  {loading ? '...' : data?.googleAds.clicks ?? 0}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Impressions</p>
                <p className="text-xl font-bold text-[#002B5C]">
                  {loading ? '...' : data?.googleAds.impressions ?? 0}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Conversions</p>
                <p className="text-xl font-bold text-green-600">
                  {loading ? '...' : data?.googleAds.conversions ?? 0}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Cost</p>
                <p className="text-xl font-bold text-[#002B5C]">
                  {loading ? '...' : data?.googleAds.cost ?? '$0'}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">CPC</p>
                <p className="text-xl font-bold text-[#002B5C]">
                  {loading ? '...' : data?.googleAds.cpc ?? '$0'}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Conv. Rate</p>
                <p className="text-xl font-bold text-green-600">
                  {loading ? '...' : data?.googleAds.conversionRate ?? '0%'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Pages & Traffic Sources */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-[#002B5C] mb-4">Top Pages</h2>
            <div className="space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded" />
                  ))}
                </div>
              ) : data?.topPages?.length ? (
                data.topPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#002B5C] truncate">
                        {page.page}
                      </p>
                      <p className="text-xs text-gray-500">Avg. time: {page.avgTime}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-bold text-[#002B5C]">{page.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No data available</p>
              )}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-[#002B5C] mb-4">Traffic Sources</h2>
            <div className="space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded" />
                  ))}
                </div>
              ) : data?.trafficSources?.length ? (
                data.trafficSources.map((source, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-[#002B5C]">{source.source}</p>
                      <p className="text-sm font-bold">{source.users.toLocaleString()} users</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#F97316] h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{source.percentage}% of traffic</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="font-semibold text-[#002B5C] mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Event</th>
                  <th className="pb-3 pr-4">Count</th>
                  <th className="pb-3">Last Occurred</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : data?.recentEvents?.length ? (
                  data.recentEvents.map((event, i) => (
                    <tr key={i}>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {event.event}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-medium">{event.count.toLocaleString()}</td>
                      <td className="py-3 text-gray-500 text-sm">{event.lastOccurred}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      No events recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tracking Pixels Status */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#002B5C] flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Tracking Pixels
            </h2>
            {pixelsData && (
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                pixelsData.summary.percentage === 100 
                  ? 'bg-green-100 text-green-700' 
                  : pixelsData.summary.percentage > 50 
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}>
                {pixelsData.summary.configured}/{pixelsData.summary.total} Configured
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {pixelsData?.pixels && Object.entries(pixelsData.pixels).map(([key, pixel]) => (
              <div 
                key={key}
                className={`p-3 rounded-lg border ${pixel.configured ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${pixel.configured ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-xs font-medium text-gray-700">{pixel.name}</span>
                </div>
                <p className={`text-xs ${pixel.configured ? 'text-green-600' : 'text-gray-400'}`}>
                  {pixel.configured ? 'Active' : 'Not configured'}
                </p>
              </div>
            ))}
          </div>
          
          {pixelsData && pixelsData.summary.configured < pixelsData.summary.total && (
            <p className="mt-4 text-sm text-gray-500">
              💡 Configure missing pixels in your <code className="bg-gray-100 px-1 rounded">.env.local</code> file. 
              See <code className="bg-gray-100 px-1 rounded">TRACKING-PIXELS-SETUP.md</code> for instructions.
            </p>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <h3 className="font-semibold text-[#002B5C] mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Google Analytics
            </a>
            <a
              href="https://ads.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition text-sm"
            >
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Google Ads
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition text-sm"
            >
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Console
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition text-sm"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Website
            </a>
            <a
              href="https://business.facebook.com/events_manager"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition text-sm"
            >
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Meta Events
            </a>
            <a
              href="https://www.linkedin.com/campaignmanager"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition text-sm"
            >
              <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn Ads
            </a>
            <a
              href="https://app.adroll.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-md transition text-sm"
            >
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              AdRoll
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 text-center text-sm text-gray-500">
        <p>ITL Analytics Dashboard • Data refreshes every 30 seconds</p>
      </footer>
    </div>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  loading,
  isText = false,
}: {
  label: string;
  value: number | string;
  loading: boolean;
  isText?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-[#002B5C]">
        {loading ? '...' : isText ? value : Number(value).toLocaleString()}
      </p>
    </div>
  );
}
