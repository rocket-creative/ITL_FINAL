'use client';

/**
 * General Contact Page - ingenious targeting laboratory
 * Embeds HubSpot contact form in hero section
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
  IconMapPin,
  IconClock,
  IconCalendar,
  IconFileText,
  IconCheckCircle,
} from '@/components/UXUIDC/Icons';

// Contact information
const contactInfo = {
  email: 'inquiry@genetargeting.com',
  phone: '+1 (631) 468-8534',
  hours: 'Monday - Friday, 9 AM - 5 PM ET',
  address: 'ingenious targeting laboratory\n761-80 Coates Avenue\nHolbrook, NY 11741',
};

// Contact Form Fields
const contactFormFields: FormField[] = [
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
    required: false,
    placeholder: '(555) 123-4567',
  },
  {
    name: 'company',
    label: 'Institution/Company',
    type: 'text',
    required: false,
    placeholder: 'University of Research',
  },
  {
    name: 'inquiry_type',
    label: 'Subject',
    type: 'select',
    required: true,
    options: [
      { value: 'general', label: 'General Inquiry' },
      { value: 'technical', label: 'Technical Question' },
      { value: 'partnership', label: 'Partnership Opportunity' },
      { value: 'career', label: 'Career/Employment' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'Please describe your inquiry...',
    rows: 6,
  },
];

export default function GeneralContactPage() {

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
                Have questions?
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
                A technical consultant will respond within 1 business day.
              </p>
              {/* Prominent Direct Contact Callout */}
              <div 
                style={{ 
                  backgroundColor: 'rgba(0, 212, 212, 0.15)',
                  border: '1px solid rgba(0, 212, 212, 0.4)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  marginBottom: '30px',
                }}
              >
                <p style={{ color: 'white', fontSize: '.9rem', marginBottom: '12px', fontWeight: 600 }}>
                  Prefer to contact us directly?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.9rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                At ingenious, we value every inquiry and are committed to providing you with the highest level of support. Whether you have questions about our services, need assistance with a specific project, or simply want to learn more about our capabilities, our expert team is here to help.
              </p>
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
                  formGuid="efefc866-97ec-4500-a380-4cf28e733f54"
                  fields={contactFormFields}
                  submitButtonText="Send Message"
                  successMessage="Thank you for contacting us! We'll respond to your inquiry within 1 business day."
                  errorMessage="We're having trouble submitting your message. Please email us directly at inquiry@genetargeting.com or call (631) 468-8534."
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
              {/* Contact Info Card */}
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
                  Contact Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <IconMail size={18} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>Email</p>
                      <a href={`mailto:${contactInfo.email}`} style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'var(--system-ui)', textDecoration: 'none' }}>
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <IconPhone size={18} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>Phone</p>
                      <a href={`tel:${contactInfo.phone.replace(/[^+\d]/g, '')}`} style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'var(--system-ui)', textDecoration: 'none' }}>
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <IconClock size={18} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>Hours</p>
                      <p style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                        {contactInfo.hours}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <IconMapPin size={18} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>Address</p>
                      <p style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'var(--system-ui)', margin: 0, whiteSpace: 'pre-line' }}>
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
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
                    href="/schedule-meeting"
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
                    <IconCalendar size={18} color="#008080" />
                    <div>
                      <p style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'Poppins, sans-serif', fontWeight: 500, margin: 0 }}>
                        Schedule a Meeting
                      </p>
                      <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                        Book a consultation
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Response Time Card */}
              <div
                style={{
                  backgroundColor: '#0a253c',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <IconCheckCircle size={20} color="#00d4d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: 'white', fontSize: '.9rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, margin: '0 0 4px 0' }}>
                      Fast Response
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.8rem', fontFamily: 'var(--system-ui)', margin: 0, lineHeight: '1.4' }}>
                      We typically respond to inquiries within 1 business day.
                    </p>
                  </div>
                </div>
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
                  href="/schedule-meeting"
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
                  <IconCalendar size={24} color="#008080" />
                  <div>
                    <p style={{ color: '#0a253c', fontSize: '.9rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, margin: 0 }}>
                      Schedule a Meeting
                    </p>
                    <p style={{ color: '#666', fontSize: '.75rem', fontFamily: 'var(--system-ui)', margin: 0 }}>
                      Book a consultation
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
