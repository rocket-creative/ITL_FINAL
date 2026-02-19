/**
 * Admin Authentication API
 * @description Simple password-based auth for admin dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Admin password - set in environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'itl-admin-2026';

// Session token name
const SESSION_COOKIE = 'itl-admin-session';

// Simple token generation (in production, use a proper JWT library)
function generateToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random().toString(36).slice(2)}`).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const token = generateToken();
      const cookieStore = await cookies();
      
      // Set session cookie (expires in 24 hours)
      cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}

// Check if authenticated
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  
  if (session?.value) {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
