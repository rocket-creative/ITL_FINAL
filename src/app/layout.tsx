import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AllPixels } from "@/components/analytics";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
// Google Ads Conversion ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';

export const metadata: Metadata = {
  title: {
    default: "Custom Mouse Models | Knockout, Knockin & Humanized Mice | ingenious targeting laboratory",
    template: "%s | ingenious targeting laboratory"
  },
  description: "Custom mouse models since 1998. 2,500+ projects, 800+ publications. Knockout, knockin, humanized and transgenic models for research.",
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
    title: "Custom Mouse Models | ingenious targeting laboratory",
    description: "Custom mouse models since 1998. 2,500+ projects, 800+ publications. Knockout, knockin, humanized and transgenic models for research.",
    images: [
      {
        url: "https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Models%20Since%201998&line2=2%2C500%2B%20Projects%20%7C%20800%2B%20Publications&line3=Expert%20Gene%20Targeting%20Solutions",
        width: 1200,
        height: 630,
        alt: "Custom Mouse Models | ingenious targeting laboratory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Mouse Models | ingenious targeting laboratory",
    description: "Custom mouse models since 1998. 2,500+ projects, 800+ publications.",
    images: ["https://www.genetargeting.com/api/og?line1=Custom%20Mouse%20Models%20Since%201998&line2=2%2C500%2B%20Projects%20%7C%20800%2B%20Publications&line3=Expert%20Gene%20Targeting%20Solutions"],
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
        {/* Google tag (gtag.js) - single loader for GA4 + Google Ads */}
        {(GA_MEASUREMENT_ID || GOOGLE_ADS_ID) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || GOOGLE_ADS_ID}`}
              strategy="beforeInteractive"
            />
            <Script
              id="google-tag"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ''}
                  ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}

                  // Google Ads conversion reporting function for onclick tracking
                  // Usage: onclick="return gtag_report_conversion('https://destination-url')"
                  window.gtag_report_conversion = function(url) {
                    var callback = function() {
                      if (typeof(url) !== 'undefined') {
                        window.location = url;
                      }
                    };
                    gtag('event', 'conversion', {
                      'send_to': '${GOOGLE_ADS_ID}/fS_cCPqFqu0aEMOV4MQ_',
                      'event_callback': callback
                    });
                    return false;
                  };
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased">
        {/* Additional Tracking Pixels: HubSpot, etc */}
        <AllPixels />
        
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
