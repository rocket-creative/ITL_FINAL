/**
 * Tracked Component Examples
 * @version 1.0.0
 * @description Pre-built components with analytics tracking
 * Use these as examples or directly in your pages
 */

'use client';

import { useCallback, ReactNode } from 'react';
import Link from 'next/link';
import { useAnalytics } from './useAnalytics';
import { trackQuoteRequest, trackContactSubmission, trackCTAClick } from './GoogleAnalytics';

// ============================================
// Tracked CTA Button
// ============================================
interface TrackedCTAButtonProps {
  children: ReactNode;
  href: string;
  ctaName: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function TrackedCTAButton({
  children,
  href,
  ctaName,
  className = '',
  variant = 'primary',
}: TrackedCTAButtonProps) {
  const { trackCTAClick } = useAnalytics();

  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all';
  const variantStyles = {
    primary: 'bg-[var(--cta)] text-white hover:bg-[var(--cta-hover)]',
    secondary: 'bg-[var(--blue)] text-white hover:bg-[var(--dk-blue)]',
    outline: 'border-2 border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white',
  };

  const handleClick = () => {
    trackCTAClick(ctaName, href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

// ============================================
// Tracked Link Component
// ============================================
interface TrackedLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  linkText?: string;
}

export function TrackedLink({
  children,
  href,
  className = '',
  linkText,
}: TrackedLinkProps) {
  const { trackNavigation } = useAnalytics();

  const handleClick = () => {
    trackNavigation(href, linkText || (typeof children === 'string' ? children : href));
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}

// ============================================
// Quote Request Form Handler
// ============================================
interface QuoteFormData {
  modelType?: string;
  serviceType?: string;
  name?: string;
  email?: string;
  institution?: string;
  [key: string]: unknown;
}

export function handleQuoteFormSubmit(formData: QuoteFormData) {
  // Track the quote request conversion
  trackQuoteRequest(formData.modelType, formData.serviceType);
  
  // Return true to indicate tracking was successful
  return true;
}

// ============================================
// Contact Form Handler
// ============================================
interface ContactFormData {
  inquiryType?: string;
  name?: string;
  email?: string;
  message?: string;
  [key: string]: unknown;
}

export function handleContactFormSubmit(formData: ContactFormData) {
  // Track the contact form submission
  trackContactSubmission(formData.inquiryType);
  
  return true;
}

// ============================================
// Tracked Phone Click
// ============================================
interface TrackedPhoneProps {
  phoneNumber: string;
  displayText?: string;
  className?: string;
}

export function TrackedPhone({ phoneNumber, displayText, className }: TrackedPhoneProps) {
  const handleClick = () => {
    trackCTAClick('phone_call', 'header', `tel:${phoneNumber}`);
  };

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={className}
    >
      {displayText || phoneNumber}
    </a>
  );
}

// ============================================
// Tracked Email Click
// ============================================
interface TrackedEmailProps {
  email: string;
  displayText?: string;
  className?: string;
}

export function TrackedEmail({ email, displayText, className }: TrackedEmailProps) {
  const handleClick = () => {
    trackCTAClick('email_click', 'contact', `mailto:${email}`);
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      className={className}
    >
      {displayText || email}
    </a>
  );
}

// ============================================
// Form Wrapper with Tracking
// ============================================
interface TrackedFormProps {
  children: ReactNode;
  formName: string;
  onSubmit: (formData: FormData) => Promise<void> | void;
  className?: string;
}

export function TrackedForm({ children, formName, onSubmit, className }: TrackedFormProps) {
  const { trackFormSubmission } = useAnalytics();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      // Convert FormData to object for tracking
      const formObject: Record<string, string> = {};
      formData.forEach((value, key) => {
        // Don't track sensitive fields
        if (!['password', 'credit_card', 'ssn'].includes(key.toLowerCase())) {
          formObject[key] = value.toString();
        }
      });

      // Track the form submission
      trackFormSubmission(formName, {
        form_fields: Object.keys(formObject),
      });

      // Call the original onSubmit handler
      await onSubmit(formData);
    },
    [formName, onSubmit, trackFormSubmission]
  );

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}
