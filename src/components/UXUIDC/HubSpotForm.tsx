/**
 * |UXUIDC| HubSpot Form Component
 * @version 1.0.0
 * @created 2026
 * @description Reusable HubSpot form embed component for contact forms
 */

'use client';

import { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  /** HubSpot form ID */
  formId: string;
  /** HubSpot portal ID (default: ITL's portal) */
  portalId?: string;
  /** HubSpot region (default: na1) */
  region?: string;
  /** Container ID for the form */
  containerId?: string;
  /** Loading message */
  loadingMessage?: string;
  /** CSS class for container */
  className?: string;
  /** Inline styles for container */
  style?: React.CSSProperties;
}

export default function HubSpotForm({
  formId,
  portalId = '242707',
  region = 'na1',
  containerId,
  loadingMessage = 'Loading form...',
  className = '',
  style = {},
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useRef(`hubspot-form-${Math.random().toString(36).substr(2, 9)}`);
  const targetId = containerId || generatedId.current;

  useEffect(() => {
    // Load HubSpot form script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      // @ts-expect-error - HubSpot global object
      if (window.hbspt) {
        // @ts-expect-error - HubSpot forms API
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: `#${targetId}`,
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src*="hsforms"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [formId, portalId, region, targetId]);

  return (
    <div
      id={targetId}
      ref={containerRef}
      className={className}
      style={{
        minHeight: '400px',
        ...style,
      }}
    >
      {/* Loading state */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '300px',
          color: '#666',
          fontFamily: 'var(--system-ui)',
          fontSize: '.9rem',
        }}
      >
        {loadingMessage}
      </div>
    </div>
  );
}
