/**
 * |UXUIDC| HubSpot Form - Client Component
 * @version 3.1.0
 * Uses suppression flag to prevent React from managing HubSpot's DOM
 * Completely isolates HubSpot form from React hydration
 */

'use client';

import { useEffect, useRef } from 'react';
import './HubSpotFormStyles.css';

interface HubSpotFormSimpleProps {
  formId: string;
  portalId?: string;
  region?: string;
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
  portalId = '3977953',
  region = 'na1',
}: HubSpotFormSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    const containerId = `hs-form-${formId}`;

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
        }
      } catch (error) {
        console.error('[HubSpot] Form creation error:', error);
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

    // Delay to ensure container is in DOM
    const timer = setTimeout(loadScript, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [formId, portalId, region]);

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
