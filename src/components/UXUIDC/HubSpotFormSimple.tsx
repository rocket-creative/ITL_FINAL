/**
 * |UXUIDC| HubSpot Form - Client Component
 * @version 3.0.0
 * Uses suppression flag to prevent React from managing HubSpot's DOM
 * Completely isolates HubSpot form from React hydration
 */

'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    let mounted = true;
    const containerId = `hs-form-${formId}`;

    const createForm = () => {
      if (!mounted) return;

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
  }, [isClient, formId, portalId, region]);

  // Server-side render: return placeholder
  if (!isClient) {
    return (
      <div style={{ minHeight: '500px', position: 'relative' }}>
        <div
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

  // Client-side render: HubSpot will manage this div's children
  return (
    <div
      ref={containerRef}
      id={`hs-form-${formId}`}
      suppressHydrationWarning
      style={{ minHeight: '500px', position: 'relative' }}
    />
  );
}
