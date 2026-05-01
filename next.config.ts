import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import legacyRedirects from "./src/lib/legacy/redirects.json";

/** Pin Turbopack root when multiple lockfiles exist (avoids wrong workspace inference). */
const turbopackRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Security Headers Configuration
 * Per RULES_2026/rules/security.mdc and security-hardening.mdc
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google.com https://*.gstatic.com https://*.google-analytics.com https://*.doubleclick.net https://*.facebook.net https://*.hubspot.com https://*.hubspotusercontent.com https://*.hs-scripts.com https://*.hsforms.net https://*.hsforms.com https://*.hs-analytics.net https://*.hscollectedforms.net https://*.hs-banner.com https://*.usemessages.com https://*.hsappstatic.net https://*.recaptcha.net https://*.flodesk.com https://assets.flodesk.com https://link.flodesk.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.hubspot.com https://*.hsappstatic.net https://*.flodesk.com https://assets.flodesk.com https://link.flodesk.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com https://*.hubspot.com https://*.hsappstatic.net https://assets.flodesk.com https://*.flodesk.com",
      "connect-src 'self' https://*.google-analytics.com https://*.google.com https://*.doubleclick.net https://*.hubspot.com https://*.hubspotusercontent.com https://*.hsforms.com https://*.hsforms.net https://*.hs-analytics.net https://*.hscollectedforms.net https://*.usemessages.com https://*.hsappstatic.net https://*.flodesk.com https://assets.flodesk.com https://link.flodesk.com https://api.flodesk.com",
      "frame-src https://*.googletagmanager.com https://*.hubspot.com https://*.hsforms.net https://*.hsforms.com https://*.google.com https://*.recaptcha.net https://*.flodesk.com https://link.flodesk.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://api.hsforms.com https://forms.hsforms.com https://api.flodesk.com https://*.flodesk.com",
      "upgrade-insecure-requests",
    ].join('; '),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  
  // Enforce trailing slashes on all URLs (SEO best practice)
  trailingSlash: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['@headlessui/react'],
  },

  // Next.js 16: Turbopack — explicit root so dev/build resolve this app, not a parent lockfile
  turbopack: {
    root: turbopackRoot,
  },

  // Security headers for all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // ISR catalog pages — public caching aligned with revalidate = 86400
      // Googlebot treats Cache-Control: public as cacheable; stale-while-revalidate
      // allows Vercel CDN to serve stale content while re-generating in background.
      {
        source: '/all-catalog-mouse-models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      // Cache static assets
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Legacy URL redirects from genetargeting.com + commercial alias capture.
  // CreERT2 alias capture consolidates fragmented searches onto the
  // canonical /tamoxifen-inducible-cre/ service page (the page that
  // converts) without breaking the existing glossary URLs that already
  // rank.
  async redirects() {
    const aliasRedirects = [
      // CreERT2 cluster — funnel typed-URL variants to the service page
      { source: '/cre-ert2-system', destination: '/tamoxifen-inducible-cre/', permanent: true },
      { source: '/cre-ert2', destination: '/tamoxifen-inducible-cre/', permanent: true },
      { source: '/creert2', destination: '/tamoxifen-inducible-cre/', permanent: true },
      { source: '/cre-ert2-mice', destination: '/tamoxifen-inducible-cre/', permanent: true },
      { source: '/inducible-cre', destination: '/tamoxifen-inducible-cre/', permanent: true },
      { source: '/tamoxifen-cre', destination: '/tamoxifen-inducible-cre/', permanent: true },
      // Humanized service alias capture — exact-match keyword from GSC
      { source: '/humanized-mice-services', destination: '/humanized-mouse-services/', permanent: true },
      { source: '/humanized-mice-price', destination: '/humanized-mouse-services/#pricing', permanent: true },
      { source: '/humanized-mouse-price', destination: '/humanized-mouse-services/#pricing', permanent: true },
      // Pricing intent capture
      { source: '/mouse-model-pricing', destination: '/custom-mouse-model-pricing/', permanent: true },
      { source: '/knockout-mouse-pricing', destination: '/custom-mouse-model-pricing/', permanent: true },
      { source: '/transgenic-mouse-pricing', destination: '/custom-mouse-model-pricing/', permanent: true },
    ];
    return [
      ...legacyRedirects.map((redirect) => ({
        source: redirect.source,
        destination: redirect.destination,
        permanent: redirect.permanent,
      })),
      ...aliasRedirects,
    ];
  },

  // Webpack optimizations (only applies when using --webpack flag)
  // Turbopack has built-in optimizations, but webpack config is kept for compatibility
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // React vendor chunk
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 20,
            },
            // Other vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
