/**
 * Admin Authentication API
 * @description Username + password auth for admin dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'itl-admin-2026';

const SESSION_COOKIE = 'itl-admin-session';

function generateToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random().toString(36).slice(2)}`).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = typeof body?.username === 'string' ? body.username : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateToken();
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch (e) {
    return NextResponse.json(
      { error: 'Invalid request. Send JSON with username and password.' },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Auth DELETE error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Check if authenticated
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    if (session?.value) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (e) {
    console.error('Auth GET error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
