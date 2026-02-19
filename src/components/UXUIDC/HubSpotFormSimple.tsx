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
}: HubSpotFormSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef<HTMLDivElement>(null);
  const loadStartTime = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

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
          });

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

          // Check form visibility after a short delay
          setTimeout(() => {
            if (containerRef.current) {
              checkFormVisibility(containerRef.current, formId, formName);
            }
          }, 1000);
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
          
          // Extract field values from HubSpot submission data
          if (Array.isArray(formData)) {
            formData.forEach((field: { name: string; value: string | string[] }) => {
              if (field.name && field.value !== undefined) {
                fields[field.name] = field.value;
              }
            });
          }

          // Send backup
          sendBackupSubmission(formId, formName, fields).catch(error => {
            console.error('[HubSpot] Backup submission failed:', error);
          });
        }
      }
    };

    // Listen for form submissions
    window.addEventListener('message', handleFormSubmit);

    // Delay to ensure container is in DOM
    const timer = setTimeout(loadScript, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      window.removeEventListener('message', handleFormSubmit);
    };
  }, [formId, formName, portalId, region, enableBackup]);

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
