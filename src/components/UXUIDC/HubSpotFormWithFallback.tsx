'use client';

/**
 * |UXUIDC| HubSpot Form With Fallback
 * @version 1.1.0
 * @description Attempts to load HubSpot form, falls back to model generation form if it fails
 *
 * Features:
 * - Renders fallback form immediately (no SDK load until in viewport)
 * - Intersection Observer defers HubSpot SDK until form scrolls into view
 * - 5 second timeout for HubSpot form loading
 * - Form monitoring and diagnostics
 * - Backup submission for all form types
 */

import { useState, useEffect, useRef } from 'react';
import HubSpotFormSimple from './HubSpotFormSimple';
import CustomHubSpotForm, { FormField } from './CustomHubSpotForm';
import { trackFormLoad, trackFormInteraction } from '@/utils/formMonitoring';

interface HubSpotFormWithFallbackProps {
  formId: string;
  formName: string;
  portalId?: string;
  region?: string;
  fallbackFields: FormField[];
  submitButtonText?: string;
  successMessage?: string;
  timeout?: number;
  /** Fired when fallback form submits successfully */
  onFallbackSuccess?: () => void;
  /** Pre-fill fallback form fields (e.g. from URL params) */
  initialValues?: Record<string, string>;
  /** HubSpot embed: navigate after successful submit (form id must match) */
  redirectAfterSubmit?: string;
}

type FormState = 'fallback' | 'hubspot';

export default function HubSpotFormWithFallback({
  formId,
  formName,
  portalId = '3977953',
  region = 'na1',
  fallbackFields,
  submitButtonText = 'Submit',
  successMessage = 'Thank you! We\'ll be in touch soon.',
  timeout = 5000,
  onFallbackSuccess,
  initialValues,
  redirectAfterSubmit,
}: HubSpotFormWithFallbackProps) {
  const [formState, setFormState] = useState<FormState>('fallback');
  const [showWarning, setShowWarning] = useState(false);
  const [shouldLoadHubSpot, setShouldLoadHubSpot] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When pre-fill values are present the generated form handles everything via API.
    // Loading the HubSpot iframe would replace pre-filled fields with an empty embed.
    // This works now that reCAPTCHA is disabled on the form.
    if (initialValues && Object.values(initialValues).some(Boolean)) return;

    let mounted = true;
    let idleId: number | undefined;

    const triggerLoad = () => {
      if (!mounted) return;
      setShouldLoadHubSpot(true);
    };

    // Intersection Observer: load SDK when form container enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (!mounted) return;
        const [entry] = entries;
        if (entry?.isIntersecting) {
          triggerLoad();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Fallback: requestIdleCallback to load after browser idle (e.g. user never scrolls)
    if (typeof requestIdleCallback !== 'undefined') {
      idleId = requestIdleCallback(() => {
        if (mounted) {
          setShouldLoadHubSpot((prev) => prev || true);
        }
      }, { timeout: 3000 });
    } else {
      const timer = setTimeout(triggerLoad, 3000);
      return () => {
        mounted = false;
        clearTimeout(timer);
        observer.disconnect();
      };
    }

    return () => {
      mounted = false;
      observer.disconnect();
      if (idleId !== undefined) cancelIdleCallback(idleId);
    };
  }, [initialValues]);

  // Timeout: if HubSpot hasn't loaded after timeout, show warning (keep fallback)
  useEffect(() => {
    if (!shouldLoadHubSpot || formState === 'hubspot') return;

    const timeoutId = setTimeout(() => {
      setFormState((prev) => {
        if (prev === 'fallback') {
          console.warn('[HubSpot Fallback] Timeout reached, keeping fallback form');

          trackFormLoad({
            formId,
            formName,
            pageUrl: typeof window !== 'undefined' ? window.location.href : '',
            timestamp: Date.now(),
            success: false,
            errorMessage: 'HubSpot form failed to load within timeout period',
          });

          trackFormInteraction({
            formId,
            formName,
            pageUrl: typeof window !== 'undefined' ? window.location.href : '',
            timestamp: Date.now(),
            eventType: 'submission_error',
            errorMessage: 'Fallback form used due to HubSpot load failure',
          });

          setShowWarning(true);
        }
        return prev;
      });
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [shouldLoadHubSpot, formState, formId, formName, timeout]);

  const handleHubSpotLoadSuccess = () => {
    setFormState('hubspot');
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {showWarning && formState === 'fallback' && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '16px',
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            fontSize: '.85rem',
            color: '#92400e',
          }}
        >
          <strong>Note:</strong> We&apos;re using a backup form. Your submission will be received normally.
        </div>
      )}

      {/* Fallback form: always visible until HubSpot loads */}
      <div style={{ display: formState === 'fallback' ? 'block' : 'none' }}>
        <CustomHubSpotForm
          portalId={portalId}
          formGuid={formId}
          fields={fallbackFields}
          submitButtonText={submitButtonText}
          successMessage={successMessage}
          onSuccess={onFallbackSuccess}
          initialValues={initialValues}
        />
      </div>

      {/* HubSpot form: loads in background when in viewport, shown when ready */}
      {shouldLoadHubSpot && (
        <div style={{ display: formState === 'hubspot' ? 'block' : 'none' }}>
          <HubSpotFormSimple
            formId={formId}
            formName={formName}
            portalId={portalId}
            region={region}
            enableBackup={true}
            shouldLoad={true}
            onLoadSuccess={handleHubSpotLoadSuccess}
            redirectAfterSubmit={redirectAfterSubmit}
            initialValues={initialValues}
          />
        </div>
      )}
    </div>
  );
}
