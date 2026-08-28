/**
 * Cohort Consultation Contact Page
 * Server wrapper. The form and page body live in the client component, matching
 * the /request-quote/ pattern so the route file only exports a Next.js page.
 */

import CohortConsultationClient from './CohortConsultationClient';

export default function CohortConsultationPage() {
  return <CohortConsultationClient />;
}
