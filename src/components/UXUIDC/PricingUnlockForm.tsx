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
  const hasInput = email.trim().length > 0;

  // Inline styles instead of Tailwind so the widget renders correctly even
  // when injected into pages whose parents apply their own typography or
  // utility classes (e.g. the dark hero section in custom-mouse-model-pricing).
  const formStyle: React.CSSProperties = isStacked
    ? { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }
    : { display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%', alignItems: 'stretch' };

  // Input must never collapse below a usable width. If the container is too
  // narrow to fit input + button on one line, the button wraps to a new line
  // (because we set flex-wrap on the form). 200px is small enough that on a
  // 393px iPhone the form fits comfortably inside a hero and wraps cleanly
  // inside narrower 280–320px ServicePricingAnchor cards.
  const inputStyle: React.CSSProperties = {
    flex: '1 1 200px',
    minWidth: '200px',
    padding: '12px 14px',
    fontSize: '0.95rem',
    lineHeight: 1.2,
    borderRadius: '6px',
    border: isDark ? '1px solid rgba(255,255,255,0.55)' : '1px solid #cbd5e1',
    background: '#ffffff',
    color: '#0f172a',
    outline: 'none',
    boxShadow: isDark ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
    boxSizing: 'border-box',
    width: isStacked ? '100%' : undefined,
    maxWidth: '100%',
  };

  const baseBg = isDark ? '#ffffff' : '#008080';
  const baseColor = isDark ? '#0a253c' : '#ffffff';
  const buttonStyle: React.CSSProperties = {
    flex: isStacked ? '1 1 auto' : '0 0 auto',
    padding: '12px 22px',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.3px',
    borderRadius: '6px',
    border: 'none',
    cursor: !hasInput || submitting ? 'not-allowed' : 'pointer',
    backgroundColor: baseBg,
    color: baseColor,
    opacity: !hasInput || submitting ? 0.7 : 1,
    transition: 'opacity 150ms ease, background-color 150ms ease',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  };

  const helperColor = isDark ? 'rgba(255,255,255,0.78)' : '#475569';
  const errorColor = isDark ? '#ffd1d1' : '#b91c1c';

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={onSubmit} style={formStyle} aria-label="Unlock pricing" noValidate>
        <label htmlFor="pricing-unlock-email" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
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
          style={inputStyle}
        />
        <button type="submit" disabled={submitting || !hasInput} style={buttonStyle}>
          {submitting ? 'Sending…' : ctaLabel}
        </button>
      </form>
      {error && (
        <p
          role="alert"
          style={{
            margin: '8px 0 0 0',
            fontSize: '0.78rem',
            lineHeight: 1.4,
            color: errorColor,
          }}
        >
          {error}
        </p>
      )}
      <p
        style={{
          margin: '8px 0 0 0',
          fontSize: '0.72rem',
          lineHeight: 1.4,
          color: helperColor,
        }}
      >
        We email pricing in seconds. No spam, unsubscribe anytime.
      </p>
    </div>
  );
}
