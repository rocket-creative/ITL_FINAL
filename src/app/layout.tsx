import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AllPixels } from "@/components/analytics";
import { Analytics } from "@vercel/analytics/next";
import { CommercialCTATracker } from "@/components/UXUIDC";

// Only load Vercel Analytics on Vercel (avoids 404 and MIME errors on localhost)
const isVercel = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV);

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export const metadata: Metadata = {
  title: {
    default: "Custom Mouse Models & Knockout Mice | 2,800+ Custom Projects | ingenious targeting laboratory",
    template: "%s | ingenious targeting laboratory"
  },
  description: "Custom mouse models since 1998. 2,800+ custom projects, 800+ publications in Nature/Cell/Science. Knockout, knockin, humanized & transgenic. Free consultation.",
  keywords: undefined, // Explicitly not using keywords per instructions
  authors: [{ name: "ingenious targeting laboratory" }],
  creator: "ingenious targeting laboratory",
  publisher: "ingenious targeting laboratory",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.genetargeting.com",
    siteName: "ingenious targeting laboratory",
    title: "Custom Mouse Models & Knockout Mice | ingenious targeting laboratory",
    description: "Custom mouse models since 1998. 2,800+ custom projects, 800+ publications in Nature/Cell/Science. Knockout, knockin, humanized & transgenic. Free consultation.",
    images: [
      {
        url: "https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Models%20Since%201998&line2=2%2C800%2B%20Custom%20Projects%20%7C%20800%2B%20Publications&line3=Expert%20Gene%20Targeting%20Solutions",
        width: 1200,
        height: 630,
        alt: "Custom Mouse Models | ingenious targeting laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Mouse Models & Knockout Mice | ingenious targeting laboratory",
    description: "Custom mouse models since 1998. 2,800+ custom projects, 800+ publications in Nature/Cell/Science. Knockout, knockin & humanized mouse models. Free consultation.",
    images: ["https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Models%20Since%201998&line2=2%2C800%2B%20Custom%20Projects%20%7C%20800%2B%20Publications&line3=Expert%20Gene%20Targeting%20Solutions"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Resource hints for critical third-party origins */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://js.hsforms.net" />
        <link rel="dns-prefetch" href="https://js.hs-scripts.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.genetargeting.com/#organization',
                  name: 'ingenious targeting laboratory',
                  url: 'https://www.genetargeting.com',
                },
                {
                  '@type': 'WebSite',
                  name: 'ingenious targeting laboratory',
                  url: 'https://www.genetargeting.com',
                  publisher: { '@id': 'https://www.genetargeting.com/#organization' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://www.genetargeting.com/search?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
        {/* Google Tag Manager - container loader. Must initialize dataLayer before gtag.js
            so any early dataLayer.push calls are queued for the GTM container. */}
        {GTM_ID && (
          <Script
            id="gtm-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
        {/* Google tag (gtag.js) - single loader for GA4 + Google Ads */}
        {(GA_MEASUREMENT_ID || GOOGLE_ADS_ID) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-tag"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ''}
                  ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased">
        {/* GTM noscript fallback - required by GTM install spec */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* Additional Tracking Pixels: HubSpot, etc */}
        <AllPixels />
        {isVercel ? <Analytics /> : null}
        {/* Funnel attribution: tracks every commercial CTA click via gtag */}
        <CommercialCTATracker />

        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
