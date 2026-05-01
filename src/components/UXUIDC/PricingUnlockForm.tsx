/**
 * |UXUIDC| PricingUnlockForm
 *
 * Inline email capture used wherever a dollar amount used to live. Submitting
 * posts to /api/unlock-pricing, which sets the signed itl_pricing_unlock
 * cookie and redirects to /pricing-guide/ where the real numbers live.
 *
 * Two visual variants:
 *  - 'inline' (default): horizontal pill, fits inside a price-anchor block
 *  - 'stacked': vertical, fits inside a card or sales banner
 *
 * Submits to a real endpoint (not the previous client-only sham). Surfaces
 * a clear error state and disables the button while in flight.
 */

'use client';

import { useState } from 'react';

export interface PricingUnlockFormProps {
  /** Where to send the user after the cookie is set. Default: /pricing-guide/ */
  next?: string;
  /** Page slug for funnel attribution. Sent to Resend + HubSpot. */
  source?: string;
  /** Service tier the user clicked from. Sent as 'interest' to HubSpot. */
  interest?: string;
  /** Visual layout. */
  variant?: 'inline' | 'stacked';
  /** Override the button copy. */
  ctaLabel?: string;
  /** Override the input placeholder. */
  placeholder?: string;
  /** Tone the widget for use over a dark hero. */
  theme?: 'light' | 'dark';
}

export default function PricingUnlockForm({
  next = '/pricing-guide/',
  source,
  interest,
  variant = 'inline',
  ctaLabel = 'Get prices',
  placeholder = 'Add your work email',
  theme = 'light',
}: PricingUnlockFormProps) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/unlock-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, interest, next }),
      });
      const data = (await res.json()) as { ok?: boolean; redirect?: string; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || 'Please enter a valid work email.');
        setSubmitting(false);
        return;
      }
      window.location.assign(data.redirect || next);
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const isStacked = variant === 'stacked';
  const isDark = theme === 'dark';

  const inputBase =
    'flex-1 min-w-0 px-4 py-3 text-sm rounded-lg border-2 outline-none transition-colors focus:ring-2 focus:ring-offset-1 disabled:opacity-50';
  const inputLight =
    'bg-white text-slate-900 border-slate-300 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500';
  const inputDark =
    'bg-white/95 text-slate-900 border-white/40 placeholder-slate-500 focus:border-white focus:ring-white/60';

  const buttonBase =
    'px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';
  const buttonLight =
    'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500';
  const buttonDark = 'bg-white text-[#008080] hover:bg-slate-100 focus:ring-white';

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full ${isStacked ? 'flex-col gap-2' : 'flex-col gap-2 sm:flex-row sm:items-stretch'}`}
      aria-label="Unlock pricing"
    >
      <label htmlFor="pricing-unlock-email" className="sr-only">
        Work email to receive pricing
      </label>
      <input
        id="pricing-unlock-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        disabled={submitting}
        className={`${inputBase} ${isDark ? inputDark : inputLight}`}
      />
      <button
        type="submit"
        disabled={submitting || !email.trim()}
        className={`${buttonBase} ${isDark ? buttonDark : buttonLight} whitespace-nowrap`}
      >
        {submitting ? 'Sending…' : ctaLabel}
      </button>
      {error && (
        <p
          role="alert"
          className={`text-xs ${isDark ? 'text-white/90' : 'text-red-600'} ${isStacked ? '' : 'sm:basis-full'}`}
        >
          {error}
        </p>
      )}
      <p
        className={`text-[11px] leading-snug ${isDark ? 'text-white/70' : 'text-slate-500'} ${isStacked ? '' : 'sm:basis-full'}`}
      >
        We email pricing in seconds. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
