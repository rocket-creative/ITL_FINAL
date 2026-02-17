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
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Mouse Models | ingenious targeting laboratory",
    description: "Custom mouse models since 1998. 2,500+ projects, 800+ publications.",
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
