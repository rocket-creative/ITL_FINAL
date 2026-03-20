import type { Metadata } from "next";
import Link from "next/link";
import { UXUIDCNavigation, UXUIDCFooter } from "@/components/UXUIDC";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested is not available. Explore our services, blog, or contact the team at ingenious targeting laboratory.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="mx-auto min-h-screen max-w-5xl bg-white shadow-sm">
        <UXUIDCNavigation />
        <main
          id="main-content"
          className="px-6 py-16 md:px-10 md:py-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Error 404
          </p>
          <h1 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            This page could not be found
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-stone-600">
            The URL may be outdated or mistyped. Use the navigation above or try
            one of the links below.
          </p>
          <ul className="mt-10 flex flex-col gap-3 text-sm font-medium text-teal-700 md:flex-row md:flex-wrap md:gap-8">
            <li>
              <Link href="/" className="underline-offset-4 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/mouse-model-services/"
                className="underline-offset-4 hover:underline"
              >
                Mouse model services
              </Link>
            </li>
            <li>
              <Link
                href="/ingenious-blog/"
                className="underline-offset-4 hover:underline"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact/"
                className="underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/request-quote/"
                className="underline-offset-4 hover:underline"
              >
                Request a quote
              </Link>
            </li>
          </ul>
        </main>
        <UXUIDCFooter />
      </div>
    </div>
  );
}
