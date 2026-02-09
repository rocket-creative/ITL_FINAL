'use client';

import { useEffect, useId } from 'react';

declare global {
  interface Window {
    FlodeskObject: string;
    fd: (type: string, options: { formId: string; containerEl: string }) => void;
  }
}

interface FlodeskFormProps {
  formId?: string;
}

export default function FlodeskForm({ formId = '689e278b40db38a14e1ffe6b' }: FlodeskFormProps) {
  const uniqueId = useId().replace(/:/g, '');
  const containerId = `fd-form-${formId}-${uniqueId}`;

  useEffect(() => {
    // Inject Flodesk script into <head> if not already present
    const existingScript = document.querySelector('script[src*="flodesk"]');
    if (!existingScript) {
      (function(w: Window, d: Document, t: string, h: string, s: string, n: string) {
        w.FlodeskObject = n;
        const fn = function(...args: unknown[]) {
          ((w as Window & { [key: string]: { q?: unknown[] } })[n].q = (w as Window & { [key: string]: { q?: unknown[] } })[n].q || []).push(args);
        };
        (w as Window & { [key: string]: unknown })[n] = (w as Window & { [key: string]: unknown })[n] || fn;
        const f = d.getElementsByTagName(t)[0];
        const v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
        const sm = d.createElement(t) as HTMLScriptElement;
        sm.async = true;
        sm.type = 'module';
        sm.src = h + s + '.mjs' + v;
        f.parentNode?.insertBefore(sm, f);
        const sn = d.createElement(t) as HTMLScriptElement;
        sn.async = true;
        (sn as HTMLScriptElement & { noModule: boolean }).noModule = true;
        sn.src = h + s + '.js' + v;
        f.parentNode?.insertBefore(sn, f);
      })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');
    }

    // Initialize the form
    const initForm = () => {
      if (typeof window.fd === 'function') {
        window.fd('form', {
          formId: formId,
          containerEl: `#${containerId}`
        });
        return true;
      }
      return false;
    };

    if (!initForm()) {
      // Wait for script to load then initialize
      const checkFd = setInterval(() => {
        if (initForm()) {
          clearInterval(checkFd);
        }
      }, 100);

      // Cleanup interval after 10 seconds
      const timeout = setTimeout(() => clearInterval(checkFd), 10000);
      
      return () => {
        clearInterval(checkFd);
        clearTimeout(timeout);
      };
    }
  }, [formId, containerId]);

  return (
    <div id={containerId}></div>
  );
}
