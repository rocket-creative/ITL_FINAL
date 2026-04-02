/**
 * |UXUIDC| HubSpot Form - Client Component
 * @version 4.0.0
 * Enhanced with backup submission and monitoring
 * Uses suppression flag to prevent React from managing HubSpot's DOM
 * Completely isolates HubSpot form from React hydration
 */

'use client';

import { useEffect, useRef } from 'react';
import './HubSpotFormStyles.css';
import {
  trackFormLoad,
  trackFormInteraction,
  checkFormVisibility,
  sendBackupSubmission,
} from '@/utils/formMonitoring';

interface HubSpotFormSimpleProps {
  formId: string;
  formName?: string;
  portalId?: string;
  region?: string;
  enableBackup?: boolean;
  /** When false, defer script injection until parent sets to true (e.g. when in viewport) */
  shouldLoad?: boolean;
  /** Called when HubSpot form successfully loads */
  onLoadSuccess?: () => void;
  /** After successful submit, navigate here (only when callback form id matches this form) */
  redirectAfterSubmit?: string;
  /** Pre-fill form fields by HubSpot field name after the form renders */
  initialValues?: Record<string, string>;
}

// Declare HubSpot global
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          // Called when the form iframe/DOM is ready; receives a jQuery-like form object
          onFormReady?: (form: unknown) => void;
        }) => void;
      };
    };
  }
}

export default function HubSpotFormSimple({
  formId,
  formName = 'HubSpot Form',
  portalId = '3977953',
  region = 'na1',
  enableBackup = true,
  shouldLoad = true,
  onLoadSuccess,
  redirectAfterSubmit,
  initialValues,
}: HubSpotFormSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef<HTMLDivElement>(null);
  const loadStartTime = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || !shouldLoad) return;

    let mounted = true;
    const containerId = `hs-form-${formId}`;
    loadStartTime.current = Date.now();

    const createForm = () => {
      if (!mounted) return;

      // Hide loading message
      if (isLoadingRef.current) {
        isLoadingRef.current.style.display = 'none';
      }

      try {
        if (window.hbspt?.forms) {
          window.hbspt.forms.create({
            region,
            portalId,
            formId,
            target: `#${containerId}`,
            onFormReady: ($form: unknown) => {
              // Inject pre-fill values into HubSpot form fields
              if (initialValues) {
                Object.entries(initialValues).forEach(([name, value]) => {
                  if (!value) return;
                  // HubSpot passes a jQuery-like object; index 0 gives the raw DOM element
                  const formEl = ($form as unknown as { 0?: HTMLElement })[0] ?? ($form as unknown as HTMLElement);
                  const input = (formEl as HTMLElement).querySelector?.(`[name="${name}"]`);
                  if (input) {
                    (input as HTMLInputElement).value = value;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                });
              }

              // Track successful load
              const loadTime = Date.now() - loadStartTime.current;
              trackFormLoad({
                formId,
                formName,
                pageUrl: window.location.href,
                timestamp: Date.now(),
                success: true,
                loadTime,
              });

              onLoadSuccess?.();

              // Check form visibility after a short delay
              setTimeout(() => {
                if (containerRef.current) {
                  checkFormVisibility(containerRef.current, formId, formName);
                }
              }, 1000);
            },
          });
        }
      } catch (error) {
        console.error('[HubSpot] Form creation error:', error);
        
        // Track failed load
        trackFormLoad({
          formId,
          formName,
          pageUrl: window.location.href,
          timestamp: Date.now(),
          success: false,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    const loadScript = () => {
      if (window.hbspt?.forms) {
        createForm();
        return;
      }

      const existingScript = document.querySelector('script[src*="hsforms.net"]');
      if (existingScript) {
        const checkInterval = setInterval(() => {
          if (window.hbspt?.forms) {
            clearInterval(checkInterval);
            createForm();
          }
        }, 100);

        setTimeout(() => clearInterval(checkInterval), 5000);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.onload = createForm;
      document.body.appendChild(script);
    };

    // Set up HubSpot form submission listener for backup
    const handleFormSubmit = (event: MessageEvent) => {
      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
        const submittedId = event.data.id != null ? String(event.data.id) : '';
        if (submittedId !== String(formId)) return;

        const formData = event.data.data || {};

        // Track submission
        trackFormInteraction({
          formId,
          formName,
          pageUrl: window.location.href,
          timestamp: Date.now(),
          eventType: 'submission_success',
        });

        // Send backup submission if enabled
        if (enableBackup && formData) {
          const fields: Record<string, string | string[]> = {};

          if (Array.isArray(formData)) {
            formData.forEach((field: { name: string; value: string | string[] }) => {
              if (field.name && field.value !== undefined) {
                fields[field.name] = field.value;
              }
            });
          }

          sendBackupSubmission(formId, formName, fields).catch(error => {
            console.error('[HubSpot] Backup submission failed:', error);
          });
        }

        if (redirectAfterSubmit) {
          window.location.assign(redirectAfterSubmit);
        }
      }
    };

    // Listen for form submissions
    window.addEventListener('message', handleFormSubmit);

    // Use requestIdleCallback when available to defer load, else short delay
    const scheduleLoad = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => loadScript(), { timeout: 500 });
      } else {
        setTimeout(loadScript, 100);
      }
    };

    const timer = setTimeout(scheduleLoad, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      window.removeEventListener('message', handleFormSubmit);
    };
  }, [formId, formName, portalId, region, enableBackup, shouldLoad, onLoadSuccess, redirectAfterSubmit, initialValues]);

  return (
    <div
      ref={containerRef}
      id={`hs-form-${formId}`}
      suppressHydrationWarning
      style={{ minHeight: '500px', position: 'relative' }}
    >
      <div
        ref={isLoadingRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          color: '#666',
          fontSize: '.9rem',
        }}
      >
        Loading form...
      </div>
    </div>
  );
}
