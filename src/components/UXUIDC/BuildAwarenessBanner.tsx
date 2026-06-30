/**
 * Sitewide build awareness banner — spec §6b.
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
      className="bg-[#0a253c] text-white"
      style={{ minHeight: '52px' }}
      role="region"
      aria-label="Build capability"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold leading-snug m-0">
            We build the exact model your study needs.
          </p>
          <p className="text-xs leading-snug m-0 mt-0.5 opacity-90 hidden sm:block">
            Designed and delivered by ingenious targeting laboratory. Quote in 24 hours.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/request-quote/"
            className="inline-block bg-[#008080] text-white text-xs font-semibold uppercase tracking-wide px-3 py-2 rounded-sm hover:opacity-90 no-underline"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded"
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
