/**
 * General Contact Page - Redirect to /contact
 * This page has been merged with the main contact page
 */

import { redirect } from 'next/navigation';

export default function GeneralContactPage() {
  redirect('/contact/');
}
