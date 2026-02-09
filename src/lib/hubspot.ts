/**
 * HubSpot Forms API Integration
 * Utilities for programmatic form submission to HubSpot
 */

export interface HubSpotField {
  objectTypeId: string;
  name: string;
  value: string;
}

export interface HubSpotFormData {
  fields: HubSpotField[];
  context?: {
    hutk?: string;
    pageUri?: string;
    pageName?: string;
    ipAddress?: string;
  };
  legalConsentOptions?: {
    consent: {
      consentToProcess: boolean;
      text: string;
      communications: Array<{
        value: boolean;
        subscriptionTypeId: number;
        text: string;
      }>;
    };
  };
}

export interface HubSpotSubmitResponse {
  success: boolean;
  redirectUri?: string;
  inlineMessage?: string;
  errors?: Array<{
    message: string;
    errorType: string;
  }>;
}

/**
 * Get HubSpot tracking cookie (hutk)
 * This cookie is critical for tracking visitor sessions
 */
export function getHubSpotCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const name = 'hubspotutk=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return null;
}

/**
 * Get current page context for HubSpot analytics
 */
export function getPageContext() {
  if (typeof window === 'undefined') {
    return {
      pageUri: '',
      pageName: '',
    };
  }
  
  return {
    pageUri: window.location.href,
    pageName: document.title,
  };
}

/**
 * Format form fields for HubSpot API
 * Converts key-value pairs to HubSpot field format
 */
export function formatFieldsForHubSpot(
  formData: Record<string, string | string[]>
): HubSpotField[] {
  const fields: HubSpotField[] = [];
  
  Object.entries(formData).forEach(([name, value]) => {
    // Handle array values (checkboxes, multi-select)
    if (Array.isArray(value)) {
      fields.push({
        objectTypeId: '0-1', // Contact object
        name,
        value: value.join(';'), // HubSpot expects semicolon-separated values
      });
    } else {
      fields.push({
        objectTypeId: '0-1', // Contact object
        name,
        value: String(value),
      });
    }
  });
  
  return fields;
}

/**
 * Submit form data to HubSpot Forms API
 */
export async function submitToHubSpot(
  portalId: string,
  formGuid: string,
  formData: Record<string, string | string[]>
): Promise<HubSpotSubmitResponse> {
  try {
    const fields = formatFieldsForHubSpot(formData);
    const hutk = getHubSpotCookie();
    const context = getPageContext();
    
    const payload: HubSpotFormData = {
      fields,
      context: {
        ...context,
        ...(hutk && { hutk }),
      },
    };
    
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        errors: errorData.errors || [{
          message: `Submission failed with status ${response.status}`,
          errorType: 'SUBMISSION_ERROR',
        }],
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      redirectUri: data.redirectUri,
      inlineMessage: data.inlineMessage,
    };
    
  } catch (error) {
    console.error('HubSpot submission error:', error);
    return {
      success: false,
      errors: [{
        message: error instanceof Error ? error.message : 'Network error occurred',
        errorType: 'NETWORK_ERROR',
      }],
    };
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (flexible - accepts various formats)
 */
export function isValidPhone(phone: string): boolean {
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Check if remaining is 10-15 digits (handles international)
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone; // Return original if not standard format
}
