/**
 * |UXUIDC| Cookie Consent Component
 * @version 1.2.0
 * @created 2026
 * @description GDPR/CCPA compliant cookie consent banner with multi-platform tracking
 * @features
 * - Cookie preferences management
 * - Granular consent options
 * - Persistent storage
 * - Google Consent Mode v2 integration
 * - Facebook, LinkedIn, Twitter, AdRoll consent handling
 * - Accessible
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { gtag, updateFBConsent } from '@/components/analytics';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

/**
 * Update all platform consent based on user preferences
 */
function updateAllPlatformConsent(prefs: CookiePreferences, shouldReload = false) {
  // Google Analytics consent
  if (prefs.analytics) {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  } else {
    gtag('consent', 'update', { analytics_storage: 'denied' });
  }

  // Marketing/Ads consent (Google Ads)
  if (prefs.marketing) {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
    
    // Update Facebook consent
    updateFBConsent(true);
  } else {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    
    // Revoke Facebook consent
    updateFBConsent(false);
  }

  // Functional consent
  if (prefs.functional) {
    gtag('consent', 'update', {
      functionality_storage: 'granted',
      personalization_storage: 'granted',
    });
  } else {
    gtag('consent', 'update', {
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    });
  }

  // Reload page if marketing preferences changed to load/unload pixels
  // LinkedIn, Twitter, and AdRoll check localStorage on load
  if (shouldReload && typeof window !== 'undefined') {
    window.location.reload();
  }
}

export default function UXUIDCCookieConsent() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const defaultPrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    if (typeof window === 'undefined') return defaultPrefs;
    const saved = localStorage.getItem('itl-cookie-preferences');
    if (saved) {
      try {
        return { ...defaultPrefs, ...JSON.parse(saved) };
      } catch {
        return defaultPrefs;
      }
    }
    return defaultPrefs;
  });

  useEffect(() => {
    const consent = localStorage.getItem('itl-cookie-consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (acceptAll = false) => {
    const prefs = acceptAll
      ? {
          necessary: true,
          analytics: true,
          marketing: true,
          functional: true,
        }
      : preferences;

    // Check if marketing preference changed (for reload)
    const oldPrefs = JSON.parse(localStorage.getItem('itl-cookie-preferences') || '{}');
    const marketingChanged = oldPrefs.marketing !== prefs.marketing;

    localStorage.setItem('itl-cookie-consent', 'true');
    localStorage.setItem('itl-cookie-preferences', JSON.stringify(prefs));

    // Update all platform consent (reload if marketing changed to load pixels)
    updateAllPlatformConsent(prefs, marketingChanged && prefs.marketing);

    setShow(false);
    setShowPreferences(false);
  };

  const rejectAll = () => {
    const prefs = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(prefs);
    localStorage.setItem('itl-cookie-consent', 'true');
    localStorage.setItem('itl-cookie-preferences', JSON.stringify(prefs));
    setShow(false);
    setShowPreferences(false);
  };

  if (!show) return null;

  // Button style constants for consistency
  const primaryButtonStyle = `
    px-6 py-3 
    bg-emerald-600 text-white 
    rounded-lg 
    font-medium text-sm
    shadow-sm
    transition-all duration-150
    hover:bg-emerald-700 hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
    active:bg-emerald-800 active:scale-[0.98]
  `;
  
  const secondaryButtonStyle = `
    px-6 py-3 
    bg-white text-slate-700
    border-2 border-slate-300
    rounded-lg 
    font-medium text-sm
    transition-all duration-150
    hover:bg-slate-50 hover:border-slate-400
    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
    active:bg-slate-100 active:scale-[0.98]
  `;
  
  const outlineButtonStyle = `
    px-6 py-3 
    bg-white text-emerald-600
    border-2 border-emerald-500
    rounded-lg 
    font-medium text-sm
    transition-all duration-150
    hover:bg-emerald-50 hover:border-emerald-600
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
    active:bg-emerald-100 active:scale-[0.98]
  `;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" aria-hidden="true" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-slate-200 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!showPreferences ? (
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  We Value Your Privacy
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze site traffic. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies. See our{' '}
                  <Link href="/cookies" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                    Cookie Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => savePreferences(true)}
                  className={`${primaryButtonStyle} order-first sm:order-none`}
                >
                  Accept All
                </button>
                <button
                  onClick={rejectAll}
                  className={secondaryButtonStyle}
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className={secondaryButtonStyle}
                >
                  Cookie Settings
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg text-slate-900 mb-4">
                Cookie Preferences
              </h3>

              <div className="space-y-3 mb-6 max-h-[50vh] overflow-y-auto">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-bold text-slate-900">Strictly Necessary</h4>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded font-medium">Always Active</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Essential for the website to function. Cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-1 pr-4">
                    <h4 className="font-bold text-slate-900 mb-1">Analytics Cookies</h4>
                    <p className="text-sm text-slate-600">
                      Help us understand how visitors interact with our website using Google Analytics.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-200 after:rounded-full after:h-6 after:w-6 after:shadow-sm after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-1 pr-4">
                    <h4 className="font-bold text-slate-900 mb-1">Functional Cookies</h4>
                    <p className="text-sm text-slate-600">
                      Enable enhanced functionality and personalization.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences({ ...preferences, functional: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-200 after:rounded-full after:h-6 after:w-6 after:shadow-sm after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-1 pr-4">
                    <h4 className="font-bold text-slate-900 mb-1">Marketing Cookies</h4>
                    <p className="text-sm text-slate-600">
                      Used for advertising and retargeting across platforms including Google Ads, 
                      Meta (Facebook/Instagram), LinkedIn, X (Twitter), and AdRoll.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({ ...preferences, marketing: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-slate-200 after:rounded-full after:h-6 after:w-6 after:shadow-sm after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end flex-wrap border-t border-slate-200 pt-4">
                <button
                  onClick={() => setShowPreferences(false)}
                  className={secondaryButtonStyle}
                >
                  Back
                </button>
                <button
                  onClick={rejectAll}
                  className={secondaryButtonStyle}
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={() => savePreferences(false)}
                  className={outlineButtonStyle}
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => savePreferences(true)}
                  className={primaryButtonStyle}
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
