'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThankYouPageShell, IconCheckCircle, IconDNA } from '@/components/UXUIDC';
import {
  runThankYouConversionOnce,
  THANK_YOU_SESSION_START_PROJECT,
} from '@/lib/analytics/googleAdsConversion';
import { pushStartProject } from '@/lib/analytics/gtmEvents';

const HERO_GRADIENT =
  'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)';
const HERO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const ctaLinkBase =
  'inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#008080]';

function safeInternalNextPath(raw: string | null): string | null {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return null;
  return raw;
}

export default function StartProjectThankYouPage() {
  const [nextPath, setNextPath] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(safeInternalNextPath(params.get('next')));
  }, []);

  useEffect(() => {
    runThankYouConversionOnce(THANK_YOU_SESSION_START_PROJECT, () => {
      pushStartProject({ value: 1, currency: 'USD' });
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', { method: 'start_project_pricing_guide' });
      }
    });
  }, []);

  const guideHref = nextPath ?? '/pricing-guide/';

  return (
    <ThankYouPageShell>
      <main id="main-content">
        <section
          className="page-hero"
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
              <IconDNA size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>
                Pricing guide
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
              You are all set
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
              Thank you. Your pricing guide access is ready. Open the guide for starting prices,
              and flexible payment options.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '48px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <Link
              href={guideHref}
              className={`${ctaLinkBase} hover:shadow-lg`}
              style={{
                backgroundColor: 'white',
                color: '#008080',
                padding: '14px 28px',
                fontSize: '.9rem',
                fontWeight: 600,
              }}
            >
              <IconCheckCircle size={18} color="#008080" />
              <span>Open the 2026 pricing guide</span>
              <span aria-hidden>→</span>
            </Link>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
              <Link
                href="/start-your-project/"
                className="text-sm font-medium text-white underline-offset-4 transition-opacity hover:opacity-90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#008080]"
              >
                Back to Start your project
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-white underline-offset-4 transition-opacity hover:opacity-90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#008080]"
              >
                Homepage
              </Link>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '32px 20px' }}>
          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              textAlign: 'center',
              fontSize: '.85rem',
              color: '#666',
              lineHeight: 1.6,
            }}
          >
            Need a formal quote for your model?{' '}
            <Link
              href="/request-quote/"
              className="font-medium text-[#008080] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Request a quote
            </Link>
          </p>
        </section>
      </main>
    </ThankYouPageShell>
  );
}
