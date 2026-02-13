/**
 * |UXUIDC| Announcement Bar - Matches Screenshot
 * @version 2.2.0
 * Uses useSyncExternalStore to avoid hydration mismatch and setState-in-effect
 */

'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'announcement-dismissed';

/**
 * Hook to safely read dismissed state from sessionStorage
 * Uses useSyncExternalStore to avoid hydration mismatches and setState-in-effect issues
 */
function useAnnouncementDismissed() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  }, []);

  const getServerSnapshot = useCallback(() => {
    return false; // Server always shows the announcement
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function UXUIDCAnnouncementBar() {
  // Use useSyncExternalStore for safe sessionStorage reading
  const isDismissedFromStorage = useAnnouncementDismissed();
  
  // Local state for immediate UI feedback when dismissing
  const [localDismissed, setLocalDismissed] = useState(false);
  
  const isDismissed = isDismissedFromStorage || localDismissed;

  const handleDismiss = () => {
    setLocalDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  if (isDismissed) return null;

  return (
    <div className="bg-[#008080] text-white py-4 sm:py-2 px-4 min-h-[60px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <Link href="/contact" className="flex-1 text-center hover:underline">
          {/* Mobile: More complete version */}
          <span className="block md:hidden text-xs leading-relaxed">
            Is uncertain NIH funding holding you back? <span className="font-medium">Start now, pay later.</span>
          </span>
          {/* Tablet+: Full version */}
          <span className="hidden md:block text-sm leading-relaxed">
            Is uncertain NIH funding holding you back from starting a much needed mouse model project?{' '}
            <span className="font-medium">We have ways for you to start your project now and pay later.</span>
          </span>
        </Link>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
