'use client';

import { useEffect, useRef } from 'react';

interface FlodeskFormProps {
  formId?: string;
  portalId?: string;
  region?: string;
}

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: any;
    [key: string]: any;
  }
}

export default function FlodeskForm({ 
  formId = '689e278b40db38a14e1ffe6b' 
}: FlodeskFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadFlodeskScript = () => {
      return new Promise<void>((resolve) => {
        // Check if script already loaded
        if (window.fd) {
          resolve();
          return;
        }

        // Check if script is already in DOM
        if (document.querySelector('script[src*="flodesk"]')) {
          const checkLoaded = setInterval(() => {
            if (window.fd) {
              clearInterval(checkLoaded);
              resolve();
            }
          }, 100);
          return;
        }

        // Load the script
        (function(w: any, d: Document, t: string, h: string, s: string, n: string) {
          w.FlodeskObject = n;
          var fn = function() {
            (w[n].q = w[n].q || []).push(arguments);
          };
          w[n] = w[n] || fn;
          var f = d.getElementsByTagName(t)[0];
          var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
          var sm = d.createElement(t) as HTMLScriptElement;
          sm.async = true;
          sm.type = 'module';
          sm.src = h + s + '.mjs' + v;
          sm.onload = () => resolve();
          f.parentNode?.insertBefore(sm, f);
          var sn = d.createElement(t) as HTMLScriptElement;
          sn.async = true;
          sn.noModule = true;
          sn.src = h + s + '.js' + v;
          f.parentNode?.insertBefore(sn, f);
        })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');
      });
    };

    const createForm = () => {
      if (window.fd && containerRef.current) {
        window.fd('form', {
          formId: formId,
          containerEl: `#fd-form-${formId}`
        });
      }
    };

    loadFlodeskScript().then(() => {
      createForm();
    });

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [formId]);

  return (
    <div 
      ref={containerRef}
      id={`fd-form-${formId}`}
      suppressHydrationWarning
    />
  );
}
