'use client';

/**
 * Test Contact Page (Internal)
 * Team-only page for testing HubSpot form embeds.
 * Password gated, noindex, excluded from robots.txt and sitemap.
 */

import { useState } from 'react';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  HubSpotFormWithFallback,
} from '@/components/UXUIDC';
import type { FormField } from '@/components/UXUIDC/CustomHubSpotForm';

const TEAM_PASSWORD =
  process.env.NEXT_PUBLIC_TEST_CONTACT_PASSWORD ||
  process.env.NEXT_PUBLIC_LAB_SIGNALS_PREVIEW_PASSWORD ||
  'KristenITL3165!';

const fallbackFields: FormField[] = [
  { name: 'firstname', label: 'First Name', type: 'text', required: true },
  { name: 'lastname', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: false },
  { name: 'company', label: 'Institution/Company', type: 'text', required: false },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    rows: 5,
    placeholder: 'Test message',
  },
];

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TEAM_PASSWORD) {
      setShowError(false);
      onUnlock();
    } else {
      setShowError(true);
    }
  };

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
      }}
    >
      <p
        style={{
          color: '#008080',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        Internal only
      </p>
      <h2
        style={{
          color: '#0a253c',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.35rem',
          fontWeight: 700,
          marginBottom: '8px',
        }}
      >
        Team access required
      </h2>
      <p
        style={{
          color: '#666',
          fontFamily: 'var(--system-ui)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          marginBottom: '24px',
        }}
      >
        Enter the team password to open the test contact form.
      </p>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="test-contact-password"
          style={{
            display: 'block',
            color: '#0a253c',
            fontFamily: 'var(--system-ui)',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '8px',
          }}
        >
          Password
        </label>
        <input
          id="test-contact-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (showError) setShowError(false);
          }}
          autoComplete="current-password"
          style={{
            width: '100%',
            padding: '12px 14px',
            border: showError ? '1px solid #c53030' : '1px solid #d1d5db',
            borderRadius: '8px',
            fontFamily: 'var(--system-ui)',
            fontSize: '1rem',
            marginBottom: showError ? '8px' : '16px',
            outline: 'none',
          }}
        />
        {showError ? (
          <p
            role="alert"
            style={{
              color: '#c53030',
              fontFamily: 'var(--system-ui)',
              fontSize: '0.875rem',
              marginBottom: '16px',
            }}
          >
            Incorrect password. Try again.
          </p>
        ) : null}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px 20px',
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Unlock test form
        </button>
      </form>
    </div>
  );
}

export default function TestContactPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <section
          className="page-hero"
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '80px 20px 80px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2">
                <p
                  className="animate-initial animate-fade-in-up"
                  style={{
                    color: '#00d4d4',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Internal test page
                </p>
                <h1
                  className="animate-initial animate-fade-in-up"
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    marginBottom: '20px',
                  }}
                >
                  Test Contact Form
                </h1>
                <p
                  className="animate-initial animate-fade-in-up animate-delay-150"
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.7',
                    marginBottom: '25px',
                  }}
                >
                  Team only. Use this page to verify HubSpot form submissions before going live.
                  Not linked from the public site and blocked from search engines.
                </p>

                <div
                  className="animate-initial animate-fade-in-up animate-delay-300"
                  style={{
                    backgroundColor: 'rgba(0, 212, 212, 0.15)',
                    border: '1px solid rgba(0, 212, 212, 0.4)',
                    borderRadius: '10px',
                    padding: '16px 20px',
                  }}
                >
                  <p style={{ color: 'white', fontSize: '.9rem', margin: 0, lineHeight: 1.6 }}>
                    Form ID: <span style={{ color: '#00d4d4', fontFamily: 'monospace' }}>33db5512-e78d-493c-be5b-ebc4e82cfc51</span>
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.85rem', margin: '8px 0 0 0' }}>
                    Portal 3977953 · Region na1
                  </p>
                </div>
              </div>

              <div className="animate-initial animate-fade-in-up animate-delay-200 lg:col-span-3">
                {!isUnlocked ? (
                  <PasswordGate onUnlock={() => setIsUnlocked(true)} />
                ) : (
                  <div
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '32px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    }}
                  >
                    <p
                      style={{
                        color: '#008080',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                      }}
                    >
                      HubSpot test embed
                    </p>
                    <h2
                      style={{
                        color: '#0a253c',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        marginBottom: '20px',
                      }}
                    >
                      Submit a test inquiry
                    </h2>
                    <HubSpotFormWithFallback
                      formId="33db5512-e78d-493c-be5b-ebc4e82cfc51"
                      formName="Test Contact Form"
                      portalId="3977953"
                      region="na1"
                      fallbackFields={fallbackFields}
                      submitButtonText="Send Test Message"
                      successMessage="Test submission received. Check HubSpot to confirm."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />
    </div>
  );
}
