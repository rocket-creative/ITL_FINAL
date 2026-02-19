/**
 * Form Monitoring Utilities
 * Track form health, load status, visibility, and interactions
 */

export interface FormLoadEvent {
  formId: string;
  formName: string;
  pageUrl: string;
  timestamp: number;
  success: boolean;
  loadTime?: number;
  errorMessage?: string;
}

export interface FormVisibilityEvent {
  formId: string;
  formName: string;
  pageUrl: string;
  timestamp: number;
  isVisible: boolean;
  reason?: string;
}

export interface FormInteractionEvent {
  formId: string;
  formName: string;
  pageUrl: string;
  timestamp: number;
  eventType: 'form_start' | 'field_focus' | 'submission_attempt' | 'submission_success' | 'submission_error';
  fieldName?: string;
  errorMessage?: string;
}

/**
 * Track form load success/failure
 */
export function trackFormLoad(event: FormLoadEvent): void {
  if (typeof window === 'undefined') return;

  try {
    // Send to Google Analytics 4 if available
    if (window.gtag) {
      window.gtag('event', 'form_load', {
        form_id: event.formId,
        form_name: event.formName,
        success: event.success,
        load_time: event.loadTime,
        error_message: event.errorMessage,
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Form Monitoring] Load Event:', event);
    }

    // Store in localStorage for admin dashboard
    storeEvent('form_load', event);
  } catch (error) {
    console.error('[Form Monitoring] Error tracking load:', error);
  }
}

/**
 * Track form visibility (detects ad blockers, display issues)
 */
export function trackFormVisibility(event: FormVisibilityEvent): void {
  if (typeof window === 'undefined') return;

  try {
    if (window.gtag) {
      window.gtag('event', 'form_visibility', {
        form_id: event.formId,
        form_name: event.formName,
        is_visible: event.isVisible,
        reason: event.reason,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Form Monitoring] Visibility Event:', event);
    }

    storeEvent('form_visibility', event);
  } catch (error) {
    console.error('[Form Monitoring] Error tracking visibility:', error);
  }
}

/**
 * Track form interactions
 */
export function trackFormInteraction(event: FormInteractionEvent): void {
  if (typeof window === 'undefined') return;

  try {
    if (window.gtag) {
      window.gtag('event', event.eventType, {
        form_id: event.formId,
        form_name: event.formName,
        field_name: event.fieldName,
        error_message: event.errorMessage,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Form Monitoring] Interaction Event:', event);
    }

    storeEvent('form_interaction', event);
  } catch (error) {
    console.error('[Form Monitoring] Error tracking interaction:', error);
  }
}

/**
 * Check if form container is visible (detects ad blockers)
 */
export function checkFormVisibility(
  element: HTMLElement | null,
  formId: string,
  formName: string
): boolean {
  if (!element) return false;

  try {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    
    const isVisible = 
      rect.height > 0 &&
      rect.width > 0 &&
      computedStyle.display !== 'none' &&
      computedStyle.visibility !== 'hidden' &&
      computedStyle.opacity !== '0';

    const reason = !isVisible
      ? 'Element hidden or has zero dimensions (possible ad blocker)'
      : undefined;

    trackFormVisibility({
      formId,
      formName,
      pageUrl: window.location.href,
      timestamp: Date.now(),
      isVisible,
      reason,
    });

    return isVisible;
  } catch (error) {
    console.error('[Form Monitoring] Error checking visibility:', error);
    return false;
  }
}

/**
 * Store event data in localStorage for admin dashboard
 * Keeps last 100 events per type
 */
function storeEvent(eventType: string, eventData: unknown): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

  try {
    const storageKey = `itl_form_events_${eventType}`;
    const existing = localStorage.getItem(storageKey);
    const events = existing ? JSON.parse(existing) : [];
    
    events.unshift(eventData);
    
    // Keep only last 100 events
    const trimmed = events.slice(0, 100);
    
    localStorage.setItem(storageKey, JSON.stringify(trimmed));
  } catch (error) {
    // localStorage might be disabled or full
    console.error('[Form Monitoring] Error storing event:', error);
  }
}

/**
 * Retrieve stored events from localStorage
 */
export function getStoredEvents(eventType: string, limit: number = 50): unknown[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return [];

  try {
    const storageKey = `itl_form_events_${eventType}`;
    const existing = localStorage.getItem(storageKey);
    const events = existing ? JSON.parse(existing) : [];
    
    return events.slice(0, limit);
  } catch (error) {
    console.error('[Form Monitoring] Error retrieving events:', error);
    return [];
  }
}

/**
 * Clear all stored form events
 */
export function clearStoredEvents(): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('itl_form_events_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('[Form Monitoring] Error clearing events:', error);
  }
}

/**
 * Send backup submission to API
 */
export async function sendBackupSubmission(
  formId: string,
  formName: string,
  formData: Record<string, string | string[]>
): Promise<boolean> {
  try {
    const response = await fetch('/api/backup-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formId,
        formName,
        pageUrl: window.location.href,
        submittedAt: new Date().toISOString(),
        fields: formData,
      }),
    });

    if (!response.ok) {
      console.error('[Form Monitoring] Backup submission failed:', await response.text());
      return false;
    }

    console.log('[Form Monitoring] Backup submission successful');
    return true;
  } catch (error) {
    console.error('[Form Monitoring] Error sending backup:', error);
    return false;
  }
}

/**
 * Note: gtag is declared in GoogleAnalytics.tsx component
 * The global Window interface extension is already available
 */
