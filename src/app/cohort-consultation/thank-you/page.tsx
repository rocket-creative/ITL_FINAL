'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ThankYouPageShell, IconCheckCircle } from '@/components/UXUIDC';
import { trackQuoteRequestAllPlatforms } from '@/components/analytics/trackConversion';
import { runThankYouConversionOnce } from '@/lib/analytics/googleAdsConversion';
import { NAP } from '@/lib/seo/organization';

const HERO_GRADIENT = 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)';
const HERO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const ctaLinkBase =
  'inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#008080]';

// Own session key so a quote conversion earlier in the same tab does not
// suppress this one. Not exported: page.tsx may only export a Next.js page.
// TODO(analytics): promote this key into @/lib/analytics/googleAdsConversion
// alongside the other THANK_YOU_SESSION_* constants in the shared phase.
const THANK_YOU_SESSION_COHORT_CONSULTATION = 'itl_thankyou_cohort_consultation_conv';

export default function CohortConsultationThankYouPage() {
  useEffect(() => {
    runThankYouConversionOnce(THANK_YOU_SESSION_COHORT_CONSULTATION, () => {
      // TODO(analytics): dedicated cohort consultation conversion label. Reusing
      // the quote-request conversion until a distinct Google Ads label and GA4
      // key event are configured for breeding and cohort leads.
      trackQuoteRequestAllPlatforms({
        contentName: 'Breeding Quote Request',
        contentCategory: 'Mouse Breeding and Cohorts',
        serviceType: 'cohort-consultation',
      });
    });
  }, []);

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
              <IconCheckCircle size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>
                Request received
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
              Thanks. Your request is in.
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
              A PhD scientist will review your scheme and reply to the email address you provided.
              If your study date is close, call us at{' '}
              <a
                href={NAP.telephoneHref}
                className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a4a6e]"
                style={{ color: 'white', fontWeight: 600 }}
              >
                {NAP.telephoneDisplay}
              </a>{' '}
              and reference this request.
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
              While you wait
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: '.9rem',
                lineHeight: 1.6,
                marginBottom: '8px',
              }}
            >
              While you wait, plan your scheme with the Breeding Scheme Architect.
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: '.9rem',
                lineHeight: 1.6,
                marginBottom: '28px',
              }}
            >
              Or read how we build synchronized cohorts.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/breeding-scheme-architect/"
                className={ctaLinkBase}
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '12px 24px',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <span>Open the Breeding Scheme Architect</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/mouse-cohort-development/"
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
                <span>Mouse Cohort Development</span>
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
