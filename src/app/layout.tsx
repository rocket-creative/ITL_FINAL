import type { Metadata } from "next";
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
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="canonical" href="https://www.genetargeting.com" />
        {/* Preload critical hero image */}
        <link
          rel="preload"
          href="/images/mouse-hero-blue.jpg"
          as="image"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased">
        {/* All Tracking Pixels: GA4, Facebook, LinkedIn, Twitter, AdRoll */}
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
