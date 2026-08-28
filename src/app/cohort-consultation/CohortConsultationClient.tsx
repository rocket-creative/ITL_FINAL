'use client';

/**
 * Cohort Consultation Contact Page
 *
 * Conversion destination for the mouse breeding and cohort cluster. The build
 * doc specified a ~20 field intake form; that was reviewed and cut to eight
 * fields plus consent. The full intake list is rendered above the form as a
 * "What to have ready" checklist so researchers can still prepare, without the
 * form itself becoming a conversion killer.
 */

import { useState } from 'react';
import Link from 'next/link';

import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import BreadcrumbSchema from '@/components/UXUIDC/BreadcrumbSchema';
import HubSpotFormWithFallback from '@/components/UXUIDC/HubSpotFormWithFallback';
import type { FormField } from '@/components/UXUIDC/CustomHubSpotForm';
import {
  IconCheckCircle,
  IconChevronRight,
  IconClipboard,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@/components/UXUIDC/Icons';
import { NAP } from '@/lib/seo/organization';
import { buildContactPageSchema } from '@/lib/seo/schemaBlocks';

// TODO(hubspot): replace with the real cohort consultation form GUID.
// Portal 3977953. Contact properties that must exist before go-live:
//   what_do_you_need, approximate_animal_count, study_start_date, project_details,
//   privacy_consent, marketing_optin,
//   ref, utm_source, utm_medium, utm_campaign, landing_page_url, referrer
export const COHORT_CONSULTATION_FORM_GUID = 'REPLACE_WITH_HUBSPOT_FORM_GUID';

const HUBSPOT_PORTAL_ID = '3977953';
const THANK_YOU_PATH = '/cohort-consultation/thank-you/';

const HERO_GRADIENT = 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)';
const HERO_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/** Sticky header clearance for in-page anchor targets. */
const ANCHOR_OFFSET = { scrollMarginTop: '100px' } as const;

const headingStyle = {
  color: '#2384da',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '20px',
} as const;

const bodyStyle = {
  color: '#555',
  fontSize: '.95rem',
  lineHeight: '1.7rem',
} as const;

// H2 "What happens after you submit"
// TODO(ops): the doc asks for a response time commitment here. The homepage
// promises a quote in 24 hours for model generation; nobody has confirmed that
// breeding inquiries carry the same commitment, so no number is published yet.
const afterSubmitSteps = [
  'A PhD scientist reviews your allele, target genotype, and timeline',
  'We check for linkage and any known breeding difficulty with the line',
  'You receive a proposed cross path with expected genotype yields and a pair count',
  'You receive a schedule against your study date and a quote',
  'If we think you should keep the colony in house, we will tell you',
];

// H2 "What to have ready" — the full intake list from the build doc, rendered as
// a preparation checklist instead of as form fields.
const whatToHaveReady = [
  'Allele or line name, and whether it is floxed, a knockin, a reporter, or a transgenic',
  'Cre driver or other recombinase line, if the scheme needs one',
  'Target experimental genotype and the control genotype you plan to use',
  'Number of animals needed, and any sex requirement',
  'Study start date',
  'Current background, and whether backcrossing is needed',
  'Where the line is now: your vivarium, a repository, a collaborator, or cryopreserved',
  'Any known fertility or health status problems',
];

const relatedServices = [
  { title: 'Mouse Breeding Services', href: '/mouse-breeding-services/' },
  { title: 'Mouse Cohort Development', href: '/mouse-cohort-development/' },
  {
    title: 'Conditional Knockout Cohort Breeding',
    href: '/conditional-knockout-cohort-breeding/',
  },
  {
    title: 'In House vs Outsourced Mouse Breeding',
    href: '/in-house-vs-outsourced-mouse-breeding/',
  },
];

/**
 * Eight visible fields plus consent. Everything after the routing dropdown is
 * optional so the form stays short enough to finish in one sitting.
 *
 * Phase 2 progressive profiling queue, to be added as HubSpot smart fields once
 * a contact is known: phone, role, country, genetic background, Cre driver,
 * current line location.
 */
const cohortConsultationFields: FormField[] = [
  {
    name: 'firstname',
    label: 'First name',
    type: 'text',
    required: true,
    autoComplete: 'given-name',
    maxLength: 50,
    requiredMessage: 'Enter your first name.',
  },
  {
    name: 'lastname',
    label: 'Last name',
    type: 'text',
    required: true,
    autoComplete: 'family-name',
    maxLength: 50,
    requiredMessage: 'Enter your last name.',
  },
  {
    name: 'email',
    label: 'Work email',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'you@institution.edu',
    helpText: 'We reply from a genetargeting.com address.',
    requiredMessage: 'Enter a work email address so a scientist can reply.',
  },
  {
    name: 'company',
    label: 'Institution or company',
    type: 'text',
    required: true,
    autoComplete: 'organization',
    maxLength: 120,
    requiredMessage: 'Enter the institution or company you work for.',
  },
  {
    // TODO(hubspot): `what_do_you_need` is a custom contact property and must be
    // created as a dropdown with exactly these internal values before go-live.
    name: 'what_do_you_need',
    label: 'What do you need',
    type: 'select',
    required: true,
    helpText: 'This routes your request to the breeding team.',
    requiredMessage: 'Choose the option closest to what you need.',
    options: [
      { value: 'cohort_production', label: 'Cohort development and production' },
      { value: 'contract_breeding', label: 'Contract breeding' },
      { value: 'conditional_knockout_cohort', label: 'Conditional knockout cohort' },
      { value: 'colony_management', label: 'Ongoing colony management' },
      {
        value: 'expansion_backcross_rederivation',
        label: 'Speed expansion, backcrossing, or rederivation',
      },
      { value: 'not_sure', label: 'Not sure yet' },
    ],
  },
  {
    name: 'approximate_animal_count',
    label: 'Approximate number of animals needed',
    type: 'text',
    required: false,
    helpText: 'Best estimate is fine.',
    maxLength: 60,
  },
  {
    name: 'study_start_date',
    label: 'Study start date',
    type: 'text',
    required: false,
    placeholder: 'e.g. Q1 2027',
    helpText: 'Approximate is fine. Type it however you think about it.',
    maxLength: 60,
  },
  {
    name: 'project_details',
    label: 'Project details',
    type: 'textarea',
    required: false,
    rows: 5,
    maxLength: 2000,
    placeholder:
      'Allele or line name, Cre driver, target genotype, current background, and where the line is now.',
  },
  {
    name: 'privacy_consent',
    label: 'I agree to the privacy policy and consent to being contacted about this inquiry.',
    labelNode: (
      <>
        I agree to the{' '}
        <Link
          href="/privacy/"
          className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          style={{ color: '#008080', fontWeight: 500 }}
        >
          privacy policy
        </Link>{' '}
        and consent to being contacted about this inquiry.
      </>
    ),
    type: 'checkbox',
    required: true,
    requiredMessage: 'Tick the consent box so we are allowed to reply to you.',
  },
  {
    // Unchecked by default and kept separate from the required consent above.
    name: 'marketing_optin',
    label: 'Send me Lab Signals, biweekly research insights from ITL scientists.',
    type: 'checkbox',
    required: false,
  },
];

/**
 * The shared form clears the native outline on text inputs and swaps the border
 * colour instead, which is below the 3:1 focus indicator bar. Restored here
 * with page-scoped CSS rather than by editing the shared component.
 */
const FORM_SCOPED_CSS = `
.cohort-consultation-form input:focus-visible,
.cohort-consultation-form select:focus-visible,
.cohort-consultation-form textarea:focus-visible,
.cohort-consultation-form button:focus-visible {
  outline: 2px solid #0a253c;
  outline-offset: 2px;
}
`;

/**
 * Hidden attribution context. Read from the URL and referrer, never from
 * anything the visitor typed, so no personal data travels in query strings.
 */
function collectSubmissionContext(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const context: Record<string, string> = {
    landing_page_url: `${window.location.origin}${window.location.pathname}`,
    referrer: document.referrer,
  };

  for (const key of ['ref', 'utm_source', 'utm_medium', 'utm_campaign']) {
    const value = params.get(key);
    if (value) context[key] = value;
  }

  return context;
}

const contactPageSchema = buildContactPageSchema({
  name: 'Request a Mouse Breeding and Cohort Consultation',
  path: '/cohort-consultation',
  description:
    'Request a breeding scheme review and quote for mouse cohort production, colony maintenance, or conditional knockout breeding from ingenious targeting laboratory.',
  contactPoints: [
    {
      contactType: 'sales',
      name: 'Breeding and cohort inquiries',
      telephone: NAP.telephone,
      email: NAP.email,
      areaServed: 'US',
    },
    {
      contactType: 'technical support',
      name: 'Scientific consultation',
      email: NAP.email,
    },
  ],
});

export default function CohortConsultationClient() {
  // Lazy initializer so the values exist on the client's first render, before
  // CustomHubSpotForm seeds its state from `initialValues`.
  const [submissionContext] = useState<Record<string, string>>(collectSubmissionContext);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero */}
        <section
          className="page-hero"
          style={{
            background: HERO_GRADIENT,
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: HERO_PATTERN,
            }}
            aria-hidden
          />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px',
              }}
            >
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>
                Breeding and Cohorts
              </span>
            </div>

            <h1
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Request a Mouse Breeding and Cohort Consultation
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                marginBottom: '16px',
                maxWidth: '760px',
              }}
            >
              Tell us the line, target genotype, number of animals, and desired delivery date. A
              PhD scientist will review your requirements and provide a recommended cross path,
              expected yields, pair count, and quote at no cost to you.
            </p>

            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '.95rem',
                lineHeight: 1.7,
                marginBottom: '30px',
                maxWidth: '760px',
              }}
            >
              Since 1998 ingenious targeting laboratory has generated 2,800+ custom genetically
              engineered mouse models, serving 900+ laboratories from our facility in Holbrook,
              New York.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#request-form"
                className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${focusRing} focus-visible:ring-white focus-visible:ring-offset-[#0a253c]`}
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '12px 24px',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <span>Request a Consultation</span>
                <span aria-hidden>→</span>
              </a>
              <Link
                href="/schedule-meeting/"
                className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${focusRing} focus-visible:ring-white focus-visible:ring-offset-[#0a253c]`}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '12px 24px',
                  border: '2px solid rgba(255,255,255,0.85)',
                  fontSize: '.9rem',
                  fontWeight: 500,
                }}
              >
                <span>Schedule a Call</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* What happens after you submit */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={headingStyle}>
              What happens after you submit
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '14px' }}>
              {afterSubmitSteps.map((step) => (
                <li
                  key={step}
                  className="animate-in"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  <IconCheckCircle
                    size={18}
                    color="#008080"
                    style={{ marginTop: '4px', flexShrink: 0 }}
                  />
                  <span style={bodyStyle}>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What to have ready */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={headingStyle}>
              What to have ready
            </h2>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '24px' }}>
              You do not need all of this to submit. The more you include, the more specific the
              first response will be.
            </p>

            <div
              className="animate-in hover-card hover-card-teal group"
              style={{
                backgroundColor: 'white',
                borderTop: '4px solid #008080',
                borderRadius: '8px',
                padding: '28px',
              }}
            >
              <h3
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#0a253c',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '18px',
                }}
              >
                <IconClipboard size={20} color="#008080" />
                <span>Consultation checklist</span>
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                {whatToHaveReady.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <IconCheckCircle
                      size={16}
                      color="#008080"
                      style={{ marginTop: '4px', flexShrink: 0 }}
                    />
                    <span style={bodyStyle}>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={{ ...bodyStyle, marginTop: '20px', marginBottom: 0 }}>
                The form asks for a short summary. If you have a scheme, a vector map, or a
                protocol, attach it in a reply to the confirmation email and it will reach the same
                scientist.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section
          id="request-form"
          style={{ backgroundColor: 'white', padding: '60px 20px', ...ANCHOR_OFFSET }}
        >
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 className="animate-in" style={headingStyle}>
              Request a consultation
            </h2>
            <p className="animate-in" style={{ ...bodyStyle, marginBottom: '28px' }}>
              Fields marked with an asterisk are required. Everything else is optional, and a short
              answer is better than no answer.
            </p>

            <style dangerouslySetInnerHTML={{ __html: FORM_SCOPED_CSS }} />

            <div
              className="cohort-consultation-form animate-in"
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderTop: '4px solid #008080',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 8px 30px rgba(10,37,60,0.08)',
              }}
            >
              <HubSpotFormWithFallback
                formId={COHORT_CONSULTATION_FORM_GUID}
                formName="Cohort Consultation"
                portalId={HUBSPOT_PORTAL_ID}
                region="na1"
                fallbackFields={cohortConsultationFields}
                initialValues={submissionContext}
                submitButtonText="Request a Consultation"
                successMessage="Thanks. Your request is in. A PhD scientist will review your scheme and reply to the email address you provided."
                redirectAfterSubmit={THANK_YOU_PATH}
                onFallbackSuccess={() => {
                  window.location.assign(THANK_YOU_PATH);
                }}
              />
            </div>

            <p style={{ ...bodyStyle, marginTop: '20px', marginBottom: 0 }}>
              We use this to respond to your inquiry. We do not sell your information. Read the{' '}
              <Link
                href="/privacy/"
                className={`underline underline-offset-4 ${focusRing} focus-visible:ring-teal-600`}
                style={{ color: '#008080', fontWeight: 500 }}
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Prefer to talk first — the #schedule anchor target the cluster pages link to */}
        <section
          id="schedule"
          style={{ backgroundColor: '#008080', padding: '60px 20px', ...ANCHOR_OFFSET }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '15px',
              }}
            >
              Prefer to talk first
            </h2>
            <p
              className="animate-in"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '.95rem',
                lineHeight: '1.7rem',
                marginBottom: '28px',
              }}
            >
              Schedule a call with a scientist instead. No form required.
            </p>
            <Link
              href="/schedule-meeting/"
              className={`inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${focusRing} focus-visible:ring-white focus-visible:ring-offset-[#008080]`}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '12px 24px',
                border: '2px solid white',
                fontSize: '.9rem',
                fontWeight: 500,
              }}
            >
              <span>Schedule a Call</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Other ways to reach us */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={headingStyle}>
              Other ways to reach us
            </h2>
            <ul
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              <li
                className="animate-in"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
              >
                <IconPhone size={18} color="#008080" style={{ marginTop: '4px', flexShrink: 0 }} />
                <a
                  href={NAP.telephoneHref}
                  className={`${focusRing} focus-visible:ring-teal-600`}
                  style={{ ...bodyStyle, color: '#008080', fontWeight: 500 }}
                >
                  {NAP.telephoneDisplay}
                </a>
              </li>
              <li
                className="animate-in"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
              >
                <IconMail size={18} color="#008080" style={{ marginTop: '4px', flexShrink: 0 }} />
                <a
                  href={`mailto:${NAP.email}`}
                  className={`${focusRing} focus-visible:ring-teal-600`}
                  style={{ ...bodyStyle, color: '#008080', fontWeight: 500 }}
                >
                  {NAP.email}
                </a>
              </li>
              <li
                className="animate-in"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
              >
                <IconMapPin size={18} color="#008080" style={{ marginTop: '4px', flexShrink: 0 }} />
                <address style={{ ...bodyStyle, fontStyle: 'normal', margin: 0 }}>
                  {NAP.address.streetAddress}, {NAP.address.addressLocality},{' '}
                  {NAP.address.addressRegion} {NAP.address.postalCode}
                </address>
              </li>
            </ul>
          </div>
        </section>

        {/* Related services */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: '#0a253c',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '24px',
              }}
            >
              Related services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={`animate-in group p-4 bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:border-teal-500 hover:shadow-md ${focusRing} focus-visible:ring-teal-600`}
                >
                  <span className="flex items-center gap-2">
                    <IconChevronRight size={14} color="#008080" />
                    <span style={{ color: '#0a253c', fontSize: '.9rem', fontWeight: 500 }}>
                      {service.title}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/mouse-model-services' },
          { name: 'Cohort Consultation', path: '/cohort-consultation' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
    </div>
  );
}
