'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ThankYouPageShell, IconCheckCircle } from '@/components/UXUIDC';
import {
  runThankYouConversionOnce,
  THANK_YOU_SESSION_CATALOG_ORDER,
} from '@/lib/analytics/googleAdsConversion';
import { pushCatalogOrder } from '@/lib/analytics/gtmEvents';

const HERO_GRADIENT =
  'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)';
const HERO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const ctaLinkBase =
  'inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#008080]';

export default function OrderCatalogThankYouPage() {
  useEffect(() => {
    runThankYouConversionOnce(THANK_YOU_SESSION_CATALOG_ORDER, () => {
      pushCatalogOrder({ value: 500, currency: 'USD' });
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase_intent', { method: 'catalog_order' });
      }
    });
  }, []);

  return (
    <ThankYouPageShell>
      <main id="main-content">
        <section
          style={{
            background: HERO_GRADIENT,
            padding: '72px 20px 64px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: HERO_PATTERN,
            }}
            aria-hidden
          />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px',
              }}
            >
              <IconCheckCircle size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>
                Order received
              </span>
            </div>
            <h1
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              Thank you for your catalog order
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.7,
                maxWidth: '640px',
                margin: 0,
              }}
            >
              Your order request has been received. An account manager will contact you within one
              business day to confirm availability, pricing, and shipping details.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '48px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.35rem',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              What happens next
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: '.9rem',
                lineHeight: 1.6,
                marginBottom: '28px',
              }}
            >
              Your account manager will confirm the model, breeding status, and delivery window.
              You can add related services or review technical data while you wait.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/schedule-meeting/"
                className={ctaLinkBase}
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '12px 24px',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <span>Schedule a consultation</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/all-catalog-mouse-models/"
                className={ctaLinkBase}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '12px 24px',
                  border: '2px solid rgba(255,255,255,0.85)',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <span>Browse more models</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '40px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <Link
              href="/"
              className="text-sm font-medium text-[#008080] underline-offset-4 transition-colors hover:text-[#006666] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Return to homepage
            </Link>
          </div>
        </section>
      </main>
    </ThankYouPageShell>
  );
}
