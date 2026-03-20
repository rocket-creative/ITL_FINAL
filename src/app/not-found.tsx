import type { Metadata } from "next";
import Link from "next/link";
import { ThankYouPageShell, IconChevronRight } from "@/components/UXUIDC";

const HERO_GRADIENT =
  "linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)";
const HERO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const quickLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Mouse model services", href: "/mouse-model-services/" },
  { label: "Blog", href: "/ingenious-blog/" },
  { label: "Contact", href: "/contact/" },
  { label: "Request a quote", href: "/request-quote/" },
];

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested is not available. Explore our services, blog, or contact the team at ingenious targeting laboratory.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <ThankYouPageShell>
      <main id="main-content">
        <section
          style={{
            background: HERO_GRADIENT,
            padding: "64px 20px 56px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.1,
              backgroundImage: HERO_PATTERN,
            }}
            aria-hidden
          />
          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: ".75rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Error 404
            </p>
            <h1
              style={{
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              This page could not be found
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "1rem",
                lineHeight: 1.65,
                maxWidth: "560px",
                margin: 0,
              }}
            >
              The URL may be outdated or mistyped. Use the navigation above or try one of the links
              below.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: "#f8f9fa", padding: "48px 20px 56px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2
              style={{
                color: "#0a253c",
                fontFamily: "Poppins, sans-serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Popular destinations
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-2 border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-[#008080] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                >
                  <IconChevronRight size={14} color="#008080" />
                  <span style={{ color: "#0a253c", fontSize: ".9rem", fontWeight: 500 }}>
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ThankYouPageShell>
  );
}
