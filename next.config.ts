import type { NextConfig } from "next";
import legacyRedirects from "./src/lib/legacy/redirects.json";

/**
 * Security Headers Configuration
 * Per RULES_2026/rules/security.mdc and security-hardening.mdc
 */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google.com https://*.gstatic.com https://*.google-analytics.com https://*.doubleclick.net https://*.facebook.net https://*.hubspot.com https://*.hubspotusercontent.com https://*.hs-scripts.com https://*.hsforms.net https://*.hsforms.com https://*.hs-analytics.net https://*.hscollectedforms.net https://*.hs-banner.com https://*.usemessages.com https://*.hsappstatic.net https://*.recaptcha.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.hubspot.com https://*.hsappstatic.net",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com https://*.hubspot.com https://*.hsappstatic.net",
      "connect-src 'self' https://*.google-analytics.com https://*.google.com https://*.doubleclick.net https://*.hubspot.com https://*.hubspotusercontent.com https://*.hsforms.com https://*.hsforms.net https://*.hs-analytics.net https://*.hscollectedforms.net https://*.usemessages.com https://*.hsappstatic.net",
      "frame-src https://*.googletagmanager.com https://*.hubspot.com https://*.hsforms.net https://*.hsforms.com https://*.google.com https://*.recaptcha.net",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://api.hsforms.com https://forms.hsforms.com",
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
    optimizePackageImports: ['gsap', '@headlessui/react'],
  },

  // Next.js 16: Turbopack config (empty to silence warning)
  turbopack: {},

  // Security headers for all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
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

  // Legacy URL redirects from genetargeting.com
  async redirects() {
    return legacyRedirects.map((redirect) => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: redirect.permanent,
    }));
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
            // GSAP vendor chunk
            gsap: {
              name: 'gsap',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](gsap)[\\/]/,
              priority: 30,
            },
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
