/**
 * Sitewide build awareness banner — spec §6b.
 * Sits above the 1200px page column; matches nav typography and spacing.
 */

'use client';

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
      style={{ maxWidth: '1200px', margin: '0 auto' }}
      className="bg-white border-b border-[#e0e0e0]"
      role="region"
      aria-label="Build capability"
    >
      <div className="container flex flex-row items-center justify-between gap-2 sm:gap-8 py-2.5 sm:py-4">
        <div className="flex-1 min-w-0 text-left pr-1 sm:pr-4">
          <p
            className="m-0 text-xs sm:text-[0.9375rem] font-semibold leading-snug"
            style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif' }}
          >
            We build the exact model your study needs.
          </p>
          <p
            className="m-0 mt-1 text-xs sm:text-sm leading-relaxed hidden sm:block"
            style={{ color: '#666', fontFamily: 'system-ui, sans-serif' }}
          >
            Designed and delivered by ingenious targeting laboratory. Quote in 24 hours.
          </p>
        </div>

        <div className="flex items-center justify-end gap-1.5 sm:gap-4 flex-shrink-0">
          <Link
            href="/request-quote/"
            className="group inline-flex items-center gap-1 bg-[#008080] text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-sm hover:opacity-90 no-underline whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Get a Quote</span>
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
            className="p-2 text-[#666] hover:text-[#0a253c] hover:bg-[#f7f7f7] rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            aria-label="Dismiss banner"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
