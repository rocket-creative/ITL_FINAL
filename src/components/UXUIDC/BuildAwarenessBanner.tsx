'use client';

/**
 * Sitewide build awareness banner — spec §6b.
 * Mobile-first: stacks on phone, row layout from md (iPad) up.
 */

import { useState, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useBannerVisibility } from './BannerVisibilityContext';

const STORAGE_KEY = 'build-awareness-dismissed';

function useDismissed() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  }, []);

  const getSnapshot = useCallback(() => sessionStorage.getItem(STORAGE_KEY) === 'true', []);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function BuildAwarenessBanner() {
  const { suppressBanner } = useBannerVisibility();
  const isDismissedFromStorage = useDismissed();
  const [localDismissed, setLocalDismissed] = useState(false);
  const isDismissed = isDismissedFromStorage || localDismissed;

  if (suppressBanner) return null;
  if (isDismissed) return null;

  const handleDismiss = () => {
    setLocalDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <div
      className="w-full max-w-[1200px] mx-auto bg-white border-b border-[#e0e0e0]"
      role="region"
      aria-label="Build capability"
    >
      <div className="container relative py-3 md:py-4">
        {/* Dismiss — top corner on phone; inline on iPad+ */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-5 md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-[#666] hover:text-[#0a253c] hover:bg-[#f7f7f7] rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6 lg:gap-8 pr-10 md:pr-0">
          <div className="min-w-0 text-left md:flex-1 md:pr-4">
            <p
              className="m-0 text-sm md:text-[0.9375rem] font-semibold leading-snug"
              style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif' }}
            >
              We build the exact model your study needs.
            </p>
            <p
              className="m-0 mt-1 text-xs md:text-sm leading-relaxed"
              style={{ color: '#666', fontFamily: 'system-ui, sans-serif' }}
            >
              Designed and delivered by ingenious targeting laboratory. Quote in 24 hours.
            </p>
          </div>

          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 w-full md:w-auto">
            <Link
              href="/request-quote/"
              className="group flex flex-1 md:flex-none items-center justify-center gap-1.5 min-h-[44px] bg-[#008080] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-sm hover:opacity-90 no-underline whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
            >
              Get a Quote
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
            <button
              type="button"
              onClick={handleDismiss}
              className="hidden md:flex items-center justify-center min-h-[44px] min-w-[44px] text-[#666] hover:text-[#0a253c] hover:bg-[#f7f7f7] rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Dismiss banner"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
