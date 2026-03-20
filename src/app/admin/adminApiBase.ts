/**
 * Base URL for admin API requests.
 * On localhost, use http to avoid ERR_SSL_PROTOCOL_ERROR when the app is opened as https.
 */
export function getAdminApiBase(): string {
  if (typeof window === 'undefined') return '';
  if (window.location.hostname === 'localhost') {
    return `http://${window.location.host}`;
  }
  return '';
}
