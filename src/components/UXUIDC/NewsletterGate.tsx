'use client';

import { useState } from 'react';
import { IconMail, IconCheckCircle } from './Icons';
import FlodeskForm from './FlodeskForm';

interface NewsletterGateProps {
  children: React.ReactNode;
  articleTitle?: string;
  previewContent?: React.ReactNode;
}

const COOKIE_NAME = 'itl_newsletter_verified';
const COOKIE_DAYS = 30;

// Colors: gold, black, grey, white only
const BRAND = {
  gold: '#fb0',
  black: '#000000',
  white: '#ffffff',
  lightGray: '#f5f5f5',
  mediumGray: '#888888',
  darkGray: '#444444',
  borderGray: '#e0e0e0',
};

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default function NewsletterGate({ 
  children, 
  previewContent 
}: NewsletterGateProps) {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return getCookie(COOKIE_NAME) === 'true';
  });
  const [isChecking] = useState(() => {
    // Only show loading state during SSR hydration
    return typeof document === 'undefined';
  });
  const [email, setEmail] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError('');
    setIsVerifying(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setVerifyError('Please enter a valid email address');
      setIsVerifying(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
    setIsVerified(true);
    setIsVerifying(false);
  };

  if (isChecking) {
    return (
      <div style={{ padding: '50px 20px', textAlign: 'center', backgroundColor: BRAND.lightGray, borderRadius: '8px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: `3px solid ${BRAND.borderGray}`,
          borderTopColor: BRAND.mediumGray,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: 'relative' }}>
      {previewContent && (
        <div style={{ position: 'relative', maxHeight: '260px', overflow: 'hidden', marginBottom: '-60px' }}>
          <div style={{ filter: 'blur(4px)', opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>
            {previewContent}
          </div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '160px',
            background: `linear-gradient(transparent, ${BRAND.white})`,
          }} />
        </div>
      )}

      <div style={{
        position: 'relative',
        backgroundColor: BRAND.lightGray,
        borderRadius: '10px',
        padding: '35px 25px',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        zIndex: 10,
        maxWidth: '420px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: BRAND.black,
          color: BRAND.gold,
          padding: '5px 14px',
          borderRadius: '16px',
          marginBottom: '18px',
        }}>
          <IconMail size={14} color={BRAND.gold} />
          <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '0.5px' }}>MEMBERS-ONLY</span>
        </div>

        {!showSignup ? (
          <>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: BRAND.black,
              marginBottom: '6px',
            }}>
              Verify your subscription
            </h3>
            <p style={{ color: BRAND.mediumGray, fontSize: '.85rem', marginBottom: '18px' }}>
              Enter your email to access this article
            </p>

            <form onSubmit={handleVerify}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    padding: '11px 14px',
                    fontSize: '.9rem',
                    border: verifyError ? '2px solid #d00' : `1px solid ${BRAND.borderGray}`,
                    borderRadius: '5px',
                    outline: 'none',
                    backgroundColor: BRAND.white,
                  }}
                />
                {verifyError && <p style={{ color: '#d00', fontSize: '.8rem', margin: 0 }}>{verifyError}</p>}
                <button
                  type="submit"
                  disabled={isVerifying}
                  style={{
                    padding: '11px 20px',
                    fontSize: '.9rem',
                    fontWeight: 700,
                    backgroundColor: isVerifying ? BRAND.mediumGray : BRAND.gold,
                    color: BRAND.black,
                    border: 'none',
                    borderRadius: '5px',
                    cursor: isVerifying ? 'wait' : 'pointer',
                  }}
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </form>

            <div style={{ margin: '22px 0', borderTop: `1px solid ${BRAND.borderGray}`, position: 'relative' }}>
              <span style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: BRAND.lightGray,
                padding: '0 10px',
                color: BRAND.mediumGray,
                fontSize: '.75rem',
              }}>
                or
              </span>
            </div>

            <p style={{ color: BRAND.darkGray, fontSize: '.85rem', marginBottom: '10px' }}>Not subscribed?</p>
            <button
              onClick={() => setShowSignup(true)}
              style={{
                padding: '9px 20px',
                fontSize: '.85rem',
                fontWeight: 600,
                backgroundColor: BRAND.white,
                color: BRAND.darkGray,
                border: `1px solid ${BRAND.borderGray}`,
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Subscribe Free
            </button>
          </>
        ) : (
          <>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: BRAND.black,
              marginBottom: '6px',
            }}>
              Subscribe to Lab Signals
            </h3>
            <p style={{ color: BRAND.mediumGray, fontSize: '.85rem', marginBottom: '15px' }}>
              Free biweekly research insights
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px', textAlign: 'left' }}>
              {['Expert analysis', 'Technical guides', 'Full archive access'].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: BRAND.darkGray, fontSize: '.8rem' }}>
                  <IconCheckCircle size={14} color={BRAND.mediumGray} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <FlodeskForm />

            <button
              onClick={() => setShowSignup(false)}
              style={{
                marginTop: '12px',
                background: 'none',
                border: 'none',
                color: BRAND.mediumGray,
                fontSize: '.75rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              ← Already subscribed? Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
}
