/**
 * Form Health API Route
 * @description Returns form monitoring data from localStorage
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'itl-admin-session';
const SKIP_AUTH = process.env.NEXT_PUBLIC_ADMIN_SKIP_AUTH === 'true';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

export async function GET() {
  try {
    if (!SKIP_AUTH && !(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return mock form health data
    // In production, this would aggregate from localStorage or a database
    return NextResponse.json({
    forms: [
      {
        formId: 'b854ed46-fed3-4b54-9d01-62173106ad8c',
        formName: 'Request Quote',
        page: '/request-quote',
        loadSuccessRate: 98.5,
        totalLoads: 247,
        failedLoads: 4,
        submissions: 23,
        fallbackActivations: 2,
        lastFailure: '2026-02-19T10:30:00Z',
        avgLoadTime: 1250,
      },
      {
        formId: 'efefc866-97ec-4500-a380-4cf28e733f54',
        formName: 'Contact Form',
        page: '/contact',
        loadSuccessRate: 99.2,
        totalLoads: 523,
        failedLoads: 4,
        submissions: 18,
        fallbackActivations: 1,
        lastFailure: '2026-02-18T14:22:00Z',
        avgLoadTime: 980,
      },
      {
        formId: 'c0c02dc8-960c-4d14-acff-eaa43b8c7b6a',
        formName: 'Schedule Meeting',
        page: '/schedule-meeting',
        loadSuccessRate: 97.8,
        totalLoads: 134,
        failedLoads: 3,
        submissions: 12,
        fallbackActivations: 2,
        lastFailure: '2026-02-19T09:15:00Z',
        avgLoadTime: 1420,
      },
      {
        formId: 'a422e900-2fd9-4bbb-95c0-fb9299852ecf',
        formName: 'Catalog Order',
        page: '/order-catalog-models',
        loadSuccessRate: 99.5,
        totalLoads: 89,
        failedLoads: 0,
        submissions: 8,
        fallbackActivations: 0,
        lastFailure: null,
        avgLoadTime: 1100,
      },
    ],
    summary: {
      totalForms: 4,
      overallSuccessRate: 98.8,
      totalSubmissions: 61,
      totalFallbackActivations: 5,
      formsWithIssues: 3,
    },
    alerts: [
      {
        severity: 'warning',
        message: 'Request Quote form had 2 fallback activations in the last 24 hours',
        timestamp: '2026-02-19T10:30:00Z',
      },
      {
        severity: 'info',
        message: 'All backup submissions are being delivered successfully',
        timestamp: '2026-02-19T08:00:00Z',
      },
    ],
    });
  } catch (e) {
    console.error('Form health API error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
