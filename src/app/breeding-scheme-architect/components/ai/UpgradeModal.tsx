'use client';

/**
 * Consultation Prompt Modal - Soft prompt suggesting expert consultation
 * Not a paywall - users can dismiss and continue using the tool
 */

import Link from 'next/link';
import { useAIAccess } from './AIAccessGate';
import { IconX, IconCheckCircle, IconMessageCircle, IconUsers, IconClock } from '@/components/UXUIDC/Icons';

export default function ConsultationModal() {
  const { showConsultModal, dismissConsultPrompt, queriesRemaining, queriesUsed } = useAIAccess();

  if (!showConsultModal) return null;

  const isAtLimit = queriesRemaining === 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={dismissConsultPrompt}
    >
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={dismissConsultPrompt}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            zIndex: 1,
          }}
          aria-label="Close"
        >
          <IconX size={24} color="#666" />
        </button>

        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
            }}
          >
            <IconMessageCircle size={30} color="#00d4d4" />
          </div>
          <h2
            style={{
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            {isAtLimit 
              ? 'You\'ve Been Busy Planning!' 
              : 'Need Expert Guidance?'}
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
            }}
          >
            {isAtLimit
              ? 'You\'ve used all your AI queries for today. They\'ll reset in 24 hours.'
              : 'Our scientific team can provide personalized recommendations for your project.'}
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '25px' }}>
          {/* Benefits of Consultation */}
          <div style={{ marginBottom: '20px' }}>
            <h3
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '.95rem',
                fontWeight: 600,
                color: '#333',
                marginBottom: '12px',
              }}
            >
              What You Get with a Free Consultation
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {[
                'Personalized breeding strategy for your specific project',
                'Expert Cre line recommendations with efficiency data',
                'Timeline and resource estimates tailored to your needs',
                'Answers to complex genetics questions',
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '8px',
                  }}
                >
                  <IconCheckCircle size={16} color="#008080" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span
                    style={{
                      fontFamily: 'var(--system-ui)',
                      fontSize: '.85rem',
                      color: '#666',
                      lineHeight: '1.4',
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Response Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#f7f7f7',
              padding: '12px 15px',
              marginBottom: '20px',
            }}
          >
            <IconClock size={18} color="#008080" />
            <span
              style={{
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                color: '#666',
              }}
            >
              Response within <strong style={{ color: '#333' }}>1 business day</strong>
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
            <Link
              href="/request-quote"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#008080',
                color: 'white',
                padding: '12px 20px',
                textDecoration: 'none',
                fontFamily: 'var(--system-ui)',
                fontSize: '.9rem',
                fontWeight: 500,
                transition: 'all 0.3s',
              }}
              className="hover:-translate-y-1 hover:shadow-md"
            >
              <IconUsers size={18} color="white" />
              Request Free Consultation
            </Link>
            
            <button
              onClick={dismissConsultPrompt}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                color: '#666',
                padding: '12px 20px',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                fontWeight: 500,
                transition: 'all 0.3s',
              }}
              className="hover:bg-[#f7f7f7]"
            >
              {isAtLimit 
                ? 'I\'ll Come Back Tomorrow' 
                : `Continue Using Tool (${queriesRemaining} queries left)`}
            </button>
          </div>

          {/* Usage info */}
          {!isAtLimit && (
            <p
              style={{
                fontFamily: 'var(--system-ui)',
                fontSize: '.75rem',
                color: '#999',
                textAlign: 'center',
                marginTop: '15px',
              }}
            >
              You&apos;ve used {queriesUsed} of 15 daily AI queries. No account needed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
