'use client';

/**
 * Schedule Meeting Page - ingenious targeting laboratory
 * Embeds HubSpot meetings scheduler in hero section
 */

import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
} from '@/components/UXUIDC';
import CustomHubSpotForm from '@/components/UXUIDC/CustomHubSpotForm';
import type { FormField } from '@/components/UXUIDC/CustomHubSpotForm';
import {
  IconPhone,
  IconMail,
  IconCheckCircle,
  IconFileText,
  IconMessageCircle,
  IconUsers,
} from '@/components/UXUIDC/Icons';

// Meeting benefits
const meetingBenefits = [
  'Review your targeting strategy options',
  'Discuss allele design considerations',
  'Understand project timeline & deliverables',
  'Get answers to technical questions',
  'Receive personalized recommendations',
];

// Contact info
const contactInfo = {
  email: 'inquiry@genetargeting.com',
  phone: '+1 (631) 468-8534',
};

// Schedule Meeting Form Fields
const meetingFormFields: FormField[] = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'John',
  },
  {
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Doe',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'john.doe@university.edu',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    required: true,
    placeholder: '(555) 123-4567',
  },
  {
    name: 'company',
    label: 'Institution/Company',
    type: 'text',
    required: true,
    placeholder: 'University of Research',
  },
  {
    name: 'meeting_purpose',
    label: 'Meeting Purpose',
    type: 'select',
    required: true,
    options: [
      { value: 'project_consultation', label: 'New Project Consultation' },
      { value: 'technical_discussion', label: 'Technical Discussion' },
      { value: 'quote_review', label: 'Review Existing Quote' },
      { value: 'partnership', label: 'Partnership Discussion' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    name: 'preferred_time',
    label: 'Preferred Meeting Time',
    type: 'text',
    required: false,
    placeholder: 'e.g., Tuesday afternoons, any weekday morning',
  },
  {
    name: 'message',
    label: 'Additional Information',
    type: 'textarea',
    required: false,
    placeholder: 'Please share any additional details that would help us prepare for our conversation...',
    rows: 4,
  },
];

export default function ScheduleMeetingPage() {

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>

      {/* Hero Section with Embedded Form */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 80px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left Column: Content (40%) */}
            <div className="lg:col-span-2">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(0,128,128,0.3)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  marginBottom: '16px',
                }}
              >
                <IconUsers size={14} color="#00d4d4" />
                <span style={{ color: '#00d4d4', fontSize: '.75rem', fontWeight: 500 }}>
                  Free Scientific Consultation
                </span>
              </div>

              <h1
                style={{
                  color: 'white',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: '20px',
                }}
              >
                We look forward to speaking with you!
              </h1>
              <p
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  lineHeight: '1.7',
                  marginBottom: '25px',
                }}
              >
                If you&apos;d like to schedule a phone appointment with one of our scientific strategy consultants, please fill in your details below. Our consultations are free of charge. We offer complementary strategizing and answer your questions.
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.95rem',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  marginBottom: '25px',
                }}
              >
                The ingenious targeting laboratory team of experts is available to discuss your custom mouse project with you!
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.95rem',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  marginBottom: '30px',
                }}
              >
                If you&apos;re ready to start your project with us, our streamlined design & management team can begin your project immediately!
              </p>

              <div style={{ marginBottom: '25px' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.9rem', marginBottom: '12px', fontWeight: 600 }}>
                  What We&apos;ll Discuss:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {meetingBenefits.map((benefit, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5' }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prominent Direct Contact Callout */}
              <div 
                style={{ 
                  backgroundColor: 'rgba(0, 212, 212, 0.15)',
                  border: '1px solid rgba(0, 212, 212, 0.4)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                }}
              >
                <p style={{ color: 'white', fontSize: '.9rem', marginBottom: '12px', fontWeight: 600 }}>
                  Prefer to contact us directly?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a 
                    href="mailto:inquiry@genetargeting.com"
                    style={{
                      color: '#00d4d4',
                      fontSize: '.95rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontWeight: 500,
                    }}
                  >
                    <IconMail size={18} color="#00d4d4" />
                    <span>inquiry@genetargeting.com</span>
                  </a>
                  <a 
                    href="tel:+16314688534"
                    style={{
                      color: '#00d4d4',
                      fontSize: '.95rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontWeight: 500,
                    }}
                  >
                    <IconPhone size={18} color="#00d4d4" />
                    <span>(631) 468-8534</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Column: HubSpot Form (60%) */}
            <div className="lg:col-span-3">
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              }}>
                <CustomHubSpotForm
                  portalId="242707"
                  formGuid="c0c02dc8-960c-4d14-acff-eaa43b8c7b6a"
                  fields={meetingFormFields}
                  submitButtonText="Schedule Consultation"
                  successMessage="Thank you! Our scientific consultants will review your request and contact you within 1 business day to schedule your free consultation."
                  errorMessage="We're having trouble submitting your request. Please email us directly at inquiry@genetargeting.com or call (631) 468-8534."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section style={{ padding: '50px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Content - moved below form */}
            <div className="lg:col-span-1 space-y-5">
              {/* What to Expect Card */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              >
                <h3
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}
                >
                  What We&apos;ll Discuss
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {meetingBenefits.map((benefit, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: '#4b5563', fontSize: '.85rem', fontFamily: 'var(--system-ui)', lineHeight: '1.4' }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meeting Info Card */}
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #86efac',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <IconCheckCircle size={20} color="#16a34a" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: '#166534', fontSize: '.9rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, margin: '0 0 4px 0' }}>
                      No Obligation
                    </p>
                    <p style={{ color: '#15803d', fontSize: '.8rem', fontFamily: 'var(--system-ui)', margin: 0, lineHeight: '1.4' }}>
                      Consultations are complimentary. Get expert advice with no commitment required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Alternative Contact Card */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              >
                <h3
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}
                >
                  Prefer Another Way?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#0a253c',
                      textDecoration: 'none',
                      fontSize: '.85rem',
                      fontFamily: 'var(--system-ui)',
                    }}
                  >
                    <IconMail size={16} color="#008080" />
                    {contactInfo.email}
                  </a>
                  <a 
                    href={`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#0a253c',
                      textDecoration: 'none',
                      fontSize: '.85rem',
                      fontFamily: 'var(--system-ui)',
                    }}
                  >
                    <IconPhone size={16} color="#008080" />
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Quick Links Card */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              >
                <h3
                  style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}
                >
                  Quick Links
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link
                    href="/request-quote"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    className="hover:bg-gray-100"
                  >
                    <IconFileText size={18} color="#008080" />
                    <div>
                      <p style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'Poppins, sans-serif', fontWeight: 500, margin: 0 }}>
                        Request a Quote
                      </p>
                      <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                        Get project pricing
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="/general-contact"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    className="hover:bg-gray-100"
                  >
                    <IconMessageCircle size={18} color="#008080" />
                    <div>
                      <p style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'Poppins, sans-serif', fontWeight: 500, margin: 0 }}>
                        Contact Form
                      </p>
                      <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                        Send us a message
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Trust Badge */}
              <div
                style={{
                  backgroundColor: '#0a253c',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: 'white', fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, margin: '0 0 4px 0' }}>
                  26+
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.8rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                  Years of Experience
                </p>
                <div style={{ width: '40px', height: '2px', backgroundColor: '#008080', margin: '12px auto' }} />
                <p style={{ color: 'white', fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, margin: '0 0 4px 0' }}>
                  2,500+
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.8rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                  Projects Completed
                </p>
              </div>
            </div>

            {/* Additional Quick Links */}
            <div className="lg:col-span-2">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <Link
                  href="/request-quote"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s',
                  }}
                  className="hover:shadow-md hover:-translate-y-1"
                >
                  <IconFileText size={24} color="#008080" />
                  <div>
                    <p style={{ color: '#0a253c', fontSize: '.9rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, margin: 0 }}>
                      Request a Quote
                    </p>
                    <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                      Get project pricing
                    </p>
                  </div>
                </Link>
                <Link
                  href="/general-contact"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s',
                  }}
                  className="hover:shadow-md hover:-translate-y-1"
                >
                  <IconMessageCircle size={24} color="#008080" />
                  <div>
                    <p style={{ color: '#0a253c', fontSize: '.9rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, margin: 0 }}>
                      Contact Form
                    </p>
                    <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                      Send us a message
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <UXUIDCFooter />
    </div>
  );
}
