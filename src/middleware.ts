import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle legacy URL cleanup:
 * 1. Strip ?sktbuilder=… (old page builder URLs)
 * 2. Strip ?mode=… (old WordPress view params)
 * 3. Strip ?amp=… (legacy AMP query URLs)
 * 4. Redirect paths ending in /amp to the non-AMP URL
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Strip sktbuilder query param — these are old page builder URLs
  if (searchParams.has('sktbuilder')) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('sktbuilder');
    return NextResponse.redirect(url, 301);
  }

  // 2. Strip ?mode=grid (old WordPress view param)
  if (searchParams.has('mode')) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('mode');
    return NextResponse.redirect(url, 301);
  }

  // 3. Strip ?amp or ?amp=1 (legacy AMP query URLs; GSC crawled-not-indexed)
  if (searchParams.has('amp')) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('amp');
    return NextResponse.redirect(url, 301);
  }

  // 4. Generic /amp suffix redirect (catch any remaining AMP pages)
  if (pathname.endsWith('/amp') || pathname.endsWith('/amp/')) {
    const cleanPath = pathname.replace(/\/amp\/?$/, '/');
    const url = request.nextUrl.clone();
    url.pathname = cleanPath || '/';
    url.search = '';
    return NextResponse.redirect(url, 301);
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
