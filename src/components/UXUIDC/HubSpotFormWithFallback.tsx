/**
 * |UXUIDC| HubSpot Form With Fallback
 * @version 1.0.0
 * @description Attempts to load HubSpot form, falls back to custom form if it fails
 * 
 * Features:
 * - 5 second timeout for HubSpot form loading
 * - Automatic fallback to custom form if HubSpot fails
 * - Form monitoring and diagnostics
 * - Backup submission for all form types
 */

'use client';

import { useState, useEffect } from 'react';
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
}

type FormState = 'loading' | 'hubspot' | 'fallback';

export default function HubSpotFormWithFallback({
  formId,
  formName,
  portalId = '3977953',
  region = 'na1',
  fallbackFields,
  submitButtonText = 'Submit',
  successMessage = 'Thank you! We\'ll be in touch soon.',
  timeout = 5000,
}: HubSpotFormWithFallbackProps) {
  const [formState, setFormState] = useState<FormState>('loading');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let checkInterval: NodeJS.Timeout;
    let mounted = true;

    const checkHubSpotLoad = () => {
      if (!mounted) return;

      // Check if HubSpot script is loaded
      if (window.hbspt?.forms) {
        setFormState('hubspot');
        clearTimeout(timeoutId);
        clearInterval(checkInterval);
        return true;
      }

      // Check if form container has content (HubSpot rendered)
      const formContainer = document.getElementById(`hs-form-${formId}`);
      if (formContainer) {
        const hasForm = formContainer.querySelector('form') !== null;
        if (hasForm) {
          setFormState('hubspot');
          clearTimeout(timeoutId);
          clearInterval(checkInterval);
          return true;
        }
      }

      return false;
    };

    // Check every 200ms if HubSpot loaded
    checkInterval = setInterval(checkHubSpotLoad, 200);

    // Timeout fallback
    timeoutId = setTimeout(() => {
      if (!mounted) return;

      const loaded = checkHubSpotLoad();
      
      if (!loaded) {
        console.warn('[HubSpot Fallback] Timeout reached, switching to fallback form');
        
        // Track fallback trigger
        trackFormLoad({
          formId,
          formName,
          pageUrl: window.location.href,
          timestamp: Date.now(),
          success: false,
          errorMessage: 'HubSpot form failed to load within timeout period',
        });

        trackFormInteraction({
          formId,
          formName,
          pageUrl: window.location.href,
          timestamp: Date.now(),
          eventType: 'submission_error',
          errorMessage: 'Fallback form activated due to HubSpot load failure',
        });

        setFormState('fallback');
        setShowWarning(true);
      }
    }, timeout);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      clearInterval(checkInterval);
    };
  }, [formId, formName, timeout]);

  return (
    <div style={{ position: 'relative' }}>
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

      {formState === 'loading' && (
        <div style={{ minHeight: '500px' }}>
          <HubSpotFormSimple
            formId={formId}
            formName={formName}
            portalId={portalId}
            region={region}
            enableBackup={true}
          />
        </div>
      )}

      {formState === 'hubspot' && (
        <HubSpotFormSimple
          formId={formId}
          formName={formName}
          portalId={portalId}
          region={region}
          enableBackup={true}
        />
      )}

      {formState === 'fallback' && (
        <CustomHubSpotForm
          portalId={portalId}
          formGuid={formId}
          fields={fallbackFields}
          submitButtonText={submitButtonText}
          successMessage={successMessage}
        />
      )}
    </div>
  );
}
