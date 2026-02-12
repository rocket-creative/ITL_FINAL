/**
 * |UXUIDC| Announcement Bar - Matches Screenshot
 * @version 2.1.0
 * Fixed hydration mismatch by reading sessionStorage in useEffect
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UXUIDCAnnouncementBar() {
  // Start with false to match server render, check sessionStorage after hydration
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Check sessionStorage after hydration to avoid mismatch
    const dismissed = sessionStorage.getItem('announcement-dismissed') === 'true';
    setIsDismissed(dismissed);
    setHasMounted(true);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('announcement-dismissed', 'true');
  };

  // Don't render until we've checked sessionStorage (prevents flash)
  // But render on server for SEO
  if (hasMounted && isDismissed) return null;

  return (
    <div className="bg-[#008080] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <Link href="/contact" className="flex-1 text-center hover:underline">
          {/* Mobile: Short version */}
          <span className="block md:hidden text-xs leading-tight">
            <span className="font-medium">NIH funding concerns?</span> Start now, pay later.
          </span>
          {/* Tablet+: Full version */}
          <span className="hidden md:block text-sm">
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
