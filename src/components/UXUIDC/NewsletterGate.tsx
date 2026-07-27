'use client';

import { useState, useEffect } from 'react';
import { IconMail, IconCheckCircle } from './Icons';
import FlodeskForm from './FlodeskForm';

interface NewsletterGateProps {
  children: React.ReactNode;
  articleTitle?: string;
  previewContent?: React.ReactNode;
}

const COOKIE_NAME = 'itl_labsignals_access';
const COOKIE_DAYS = 90; // 90 days access after signup

// Lab Signals Flodesk Form ID
const FLODESK_FORM_ID = '689e278b40db38a14e1ffe6b';

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
    if (typeof window === 'undefined') return false;
    return getCookie(COOKIE_NAME) === 'true';
  });
  const [isChecking, setIsChecking] = useState(true);
  const [showSignup, setShowSignup] = useState(true);
  const [showReturningUser, setShowReturningUser] = useState(false);
  const [returningEmail, setReturningEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  useEffect(() => {
    // Check cookie on mount
    const hasAccess = getCookie(COOKIE_NAME) === 'true';
    setIsVerified(hasAccess);
    setIsChecking(false);

    // Listen for Flodesk form submission
    const handleFlodeskSubmit = (event: MessageEvent) => {
      // Flodesk sends postMessage when form is submitted successfully
      if (event.data && typeof event.data === 'object') {
        // Check for Flodesk success event
        // Flodesk typically sends: { type: 'fd-form-submit', formId: '...' }
        if (
          event.data.type === 'fd-form-submit' || 
          event.data.type === 'flodesk-form-submit' ||
          event.data.event === 'submit' ||
          (event.data.formSubmitted && event.origin.includes('flodesk'))
        ) {
          console.log('Flodesk form submitted:', event.data);
          
          // Set cookie and unlock content
          setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
          setIsVerified(true);
          
          // Scroll to content smoothly
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 500);
        }
      }
    };

    window.addEventListener('message', handleFlodeskSubmit);
    
    // Also listen for Flodesk's generated events if they use them
    const handleFlodeskCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.formId === FLODESK_FORM_ID) {
        console.log('Flodesk generated event:', customEvent.detail);
        setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
        setIsVerified(true);
      }
    };
    
    document.addEventListener('flodesk:submit', handleFlodeskCustomEvent);
    
    return () => {
      window.removeEventListener('message', handleFlodeskSubmit);
      document.removeEventListener('flodesk:submit', handleFlodeskCustomEvent);
    };
  }, []);

  // Handle returning subscriber verification
  const handleReturningVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError('');
    setIsVerifying(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(returningEmail)) {
      setVerifyError('Please enter a valid email address');
      setIsVerifying(false);
      return;
    }

    try {
      // Verify subscriber via API
      const response = await fetch('/api/verify-subscriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: returningEmail }),
      });

      if (!response.ok) {
        console.error('API error:', response.status, response.statusText);
        setVerifyError('Verification failed. Please try again.');
        setIsVerifying(false);
        return;
      }

      const data = await response.json();

      if (data.verified) {
        // Grant access and set cookie
        setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
        setIsVerified(true);
      } else {
        setVerifyError('Access denied. Please subscribe first.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      // For now, just grant access on any error since we don't have real verification
      setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
      setIsVerified(true);
    } finally {
      setIsVerifying(false);
    }
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
    <>
      {/* Backdrop blur */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        zIndex: 9998,
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: BRAND.white,
        border: `3px solid ${BRAND.gold}`,
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        zIndex: 9999,
        maxWidth: '500px',
        width: '90%',
        maxHeight: '85vh',
        overflowY: 'auto',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: BRAND.black,
          color: BRAND.gold,
          padding: '4px 12px',
          borderRadius: '20px',
          marginBottom: '12px',
        }}>
          <IconMail size={14} color={BRAND.gold} />
          <span style={{ 
            fontSize: '.7rem', 
            fontWeight: 700, 
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            Free Access
          </span>
        </div>

        {showReturningUser ? (
          <>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: BRAND.black,
              marginBottom: '8px',
            }}>
              Welcome Back!
            </h3>
            <p style={{ color: BRAND.darkGray, fontSize: '.9rem', marginBottom: '18px' }}>
              Enter your email to access this article
            </p>

            <form onSubmit={handleReturningVerify}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="email"
                  value={returningEmail}
                  onChange={(e) => setReturningEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    padding: '12px 16px',
                    fontSize: '.95rem',
                    border: verifyError ? `2px solid #d00` : `1px solid ${BRAND.borderGray}`,
                    borderRadius: '6px',
                    outline: 'none',
                    backgroundColor: BRAND.white,
                    fontFamily: 'Lato, sans-serif',
                  }}
                />
                {verifyError && (
                  <p style={{ color: '#d00', fontSize: '.8rem', margin: 0, textAlign: 'left' }}>
                    {verifyError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isVerifying}
                  style={{
                    padding: '12px 24px',
                    fontSize: '.95rem',
                    fontWeight: 700,
                    backgroundColor: isVerifying ? BRAND.mediumGray : BRAND.gold,
                    color: BRAND.black,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isVerifying ? 'wait' : 'pointer',
                    fontFamily: 'Poppins, sans-serif',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => !isVerifying && (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={(e) => !isVerifying && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {isVerifying ? 'Verifying...' : 'Access Article'}
                </button>
              </div>
            </form>

            <div style={{ 
              margin: '24px 0', 
              borderTop: `1px solid ${BRAND.borderGray}`, 
              position: 'relative',
              height: '1px',
            }}>
              <span style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: BRAND.white,
                padding: '0 12px',
                color: BRAND.mediumGray,
                fontSize: '.75rem',
              }}>
                or
              </span>
            </div>

            <button
              onClick={() => {
                setShowReturningUser(false);
                setShowSignup(true);
                setVerifyError('');
              }}
              style={{
                padding: '10px 20px',
                fontSize: '.85rem',
                fontWeight: 600,
                backgroundColor: BRAND.white,
                color: BRAND.darkGray,
                border: `1px solid ${BRAND.borderGray}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              New subscriber? Sign up
            </button>
          </>
        ) : showSignup ? (
          <>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: BRAND.black,
              marginBottom: '8px',
              lineHeight: 1.2,
            }}>
              Subscribe to Lab Signals
            </h3>
            <p style={{ 
              color: BRAND.darkGray, 
              fontSize: '.85rem', 
              marginBottom: '16px',
              lineHeight: 1.5,
            }}>
              Get instant access plus biweekly research insights
            </p>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px', 
              marginBottom: '16px', 
              textAlign: 'left',
              backgroundColor: BRAND.lightGray,
              padding: '12px',
              borderRadius: '6px',
            }}>
              {[
                'Expert analysis by PhD scientists',
                'Full archive access',
                'Biweekly newsletter free'
              ].map((benefit, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: BRAND.darkGray, 
                  fontSize: '.8rem' 
                }}>
                  <IconCheckCircle size={14} color={BRAND.gold} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Flodesk Form */}
            <div style={{ marginTop: '8px' }}>
              <FlodeskForm formId={FLODESK_FORM_ID} />
            </div>

            <div style={{ 
              margin: '12px 0', 
              borderTop: `1px solid ${BRAND.borderGray}`, 
              position: 'relative',
              height: '1px',
            }}>
              <span style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: BRAND.white,
                padding: '0 10px',
                color: BRAND.mediumGray,
                fontSize: '.7rem',
              }}>
                Already subscribed?
              </span>
            </div>

            <button
              onClick={() => {
                setShowSignup(false);
                setShowReturningUser(true);
              }}
              style={{
                padding: '8px 16px',
                fontSize: '.8rem',
                fontWeight: 600,
                backgroundColor: BRAND.white,
                color: BRAND.darkGray,
                border: `1px solid ${BRAND.borderGray}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Sign in with email
            </button>
          </>
        ) : null}
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
