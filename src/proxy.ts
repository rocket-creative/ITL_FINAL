import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PRICING_UNLOCK_COOKIE, verifyUnlockCookie } from '@/lib/auth/pricingUnlock';

/**
 * Proxy to handle legacy URL cleanup + pricing-guide gate:
 * 1. Strip ?sktbuilder=… (old page builder URLs)
 * 2. Strip ?mode=… (old WordPress view params)
 * 3. Strip ?amp=… (legacy AMP query URLs)
 * 4. Redirect paths ending in /amp to the non-AMP URL
 * 5. Gate /pricing-guide/ behind the itl_pricing_unlock cookie
 */
export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (searchParams.has('sktbuilder')) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('sktbuilder');
    return NextResponse.redirect(url, 301);
  }

  if (searchParams.has('mode')) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('mode');
    return NextResponse.redirect(url, 301);
  }

  if (searchParams.has('amp')) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('amp');
    return NextResponse.redirect(url, 301);
  }

  if (pathname.endsWith('/amp') || pathname.endsWith('/amp/')) {
    const cleanPath = pathname.replace(/\/amp\/?$/, '/');
    const url = request.nextUrl.clone();
    url.pathname = cleanPath || '/';
    url.search = '';
    return NextResponse.redirect(url, 301);
  }

  // Gate the pricing guide. Verifying inside an async middleware works in
  // the Edge runtime because pricingUnlock uses Web Crypto only. Bots and
  // first-time visitors are bounced to /start-your-project/ where they can
  // submit a work email and receive the signed cookie.
  if (pathname === '/pricing-guide' || pathname.startsWith('/pricing-guide/')) {
    const cookie = request.cookies.get(PRICING_UNLOCK_COOKIE)?.value;
    const ok = await verifyUnlockCookie(cookie);
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = '/start-your-project/';
      url.searchParams.set('next', '/pricing-guide/');
      return NextResponse.redirect(url, 302);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|robots.txt|sitemap).*)',
  ],
};
