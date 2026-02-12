/**
 * |UXUIDC| HubSpot Form Component
 * @version 1.1.0
 * @created 2026
 * @description Reusable HubSpot form embed component for contact forms
 */

'use client';

import { useEffect, useRef, useState, useId } from 'react';

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
  portalId = '3977953',
  region = 'na1',
  containerId,
  loadingMessage = 'Loading form...',
  className = '',
  style = {},
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formCreated, setFormCreated] = useState(false);
  // Use React's useId hook for stable, consistent IDs across renders (React 18+)
  const reactId = useId();
  // Convert React's ID format (e.g., ":r1:") to a valid HTML ID (e.g., "hubspot-form-r1")
  const stableId = `hubspot-form-${reactId.replace(/:/g, '')}`;
  const targetId = containerId || stableId;

  useEffect(() => {
    // Prevent duplicate form creation
    if (formCreated) return;

    // Verify container exists in DOM before proceeding
    const container = document.getElementById(targetId);
    if (!container) {
      console.warn(`HubSpot form container #${targetId} not found in DOM`);
      return;
    }

    // Load HubSpot form script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      // Double-check container still exists after script loads
      const containerCheck = document.getElementById(targetId);
      if (!containerCheck) {
        console.warn(`HubSpot form container #${targetId} no longer exists`);
        return;
      }

      // @ts-expect-error - HubSpot global object
      if (window.hbspt) {
        // @ts-expect-error - HubSpot forms API
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: `#${targetId}`,
          onFormReady: () => {
            setIsLoading(false);
            setFormCreated(true);
          },
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
  }, [formId, portalId, region, targetId, formCreated]);

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
      {isLoading && (
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
      )}
    </div>
  );
}
