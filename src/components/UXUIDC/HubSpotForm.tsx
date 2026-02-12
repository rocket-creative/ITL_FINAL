/**
 * |UXUIDC| HubSpot Form Component
 * @version 1.0.0
 * @created 2026
 * @description Reusable HubSpot form embed component for contact forms
 */

'use client';

import { useEffect, useRef, useState } from 'react';

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
  // Use useState with lazy initializer to avoid calling Math.random() during render
  const [generatedId] = useState(() => `hubspot-form-${Math.random().toString(36).substr(2, 9)}`);
  const targetId = containerId || generatedId;

  useEffect(() => {
    // #region agent log
    console.log('[HubSpot Debug] useEffect starting', {formId,portalId,region,targetId});
    // #endregion

    // Load HubSpot form script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;

    // #region agent log
    script.onerror = (err) => {
      console.error('[HubSpot Debug] Script load error', {error:String(err),src:script.src});
    };
    // #endregion

    script.onload = () => {
      // #region agent log
      console.log('[HubSpot Debug] Script loaded successfully', {hbsptExists:!!(window as any).hbspt,hbsptFormsExists:!!((window as any).hbspt?.forms)});
      // #endregion

      // @ts-expect-error - HubSpot global object
      if (window.hbspt) {
        // #region agent log
        const targetElement = document.querySelector(`#${targetId}`);
        console.log('[HubSpot Debug] About to create form', {targetId,targetExists:!!targetElement,targetHTML:targetElement?.outerHTML.substring(0,200)});
        // #endregion

        try {
          // @ts-expect-error - HubSpot forms API
          window.hbspt.forms.create({
            region,
            portalId,
            formId,
            target: `#${targetId}`,
            onFormReady: () => {
              // #region agent log
              console.log('[HubSpot Debug] Form ready callback fired', {targetId});
              // #endregion
            },
            onFormSubmit: () => {
              // #region agent log
              console.log('[HubSpot Debug] Form submitted', {targetId});
              // #endregion
            },
          });
          // #region agent log
          console.log('[HubSpot Debug] Form create called successfully', {targetId});
          // #endregion
        } catch (error) {
          // #region agent log
          console.error('[HubSpot Debug] Form create threw error', {error:String(error),errorName:error instanceof Error ? error.name : 'unknown',errorMessage:error instanceof Error ? error.message : String(error)});
          // #endregion
        }
      } else {
        // #region agent log
        console.error('[HubSpot Debug] window.hbspt not available', {windowKeys:Object.keys(window).filter(k=>k.includes('hbs') || k.includes('hub'))});
        // #endregion
      }
    };

    // #region agent log
    console.log('[HubSpot Debug] About to append script', {scriptSrc:script.src});
    // #endregion

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
