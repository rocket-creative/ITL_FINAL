'use client';

/**
 * Contact Page - ingenious targeting laboratory
 * General contact form for inquiries and questions
 */

import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  HubSpotForm,
  IconPhone,
  IconMail,
  IconClock,
  IconMapPin,
  IconFileText,
  IconCalendar,
  IconCheckCircle,
  IconBriefcase,
  IconPackage,
  IconArrowRight,
  BreadcrumbSchema,
} from '@/components/UXUIDC';

// Contact information
const contactInfo = {
  email: 'inquiry@genetargeting.com',
  phone: '+1 (631) 468-8534',
  hours: 'Monday - Friday, 9 AM - 5 PM ET',
  address: 'ingenious targeting laboratory\n761-80 Coates Avenue\nHolbrook, NY 11741',
};

export default function ContactPage() {
  // GSAP removed - using CSS animations instead

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        {/* ========== HERO SECTION WITH FORM ========== */}
        <section 
          style={{ 
            background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
            padding: '80px 20px 80px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Left Column: Content (40%) */}
              <div className="lg:col-span-2">
                <h1 className="animate-initial animate-fade-in-up" style={{
                  color: 'white',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: '20px',
                }}>
                  Contact Us
                </h1>
                <p className="animate-initial animate-fade-in-up animate-delay-150" style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  lineHeight: '1.7',
                  marginBottom: '25px',
                }}>
                  Have questions? A technical consultant will respond within 1 business day.
                </p>
                
                {/* Direct Contact Callout */}
                <div className="animate-initial animate-fade-in-up animate-delay-300" style={{ 
                  backgroundColor: 'rgba(0, 212, 212, 0.15)',
                  border: '1px solid rgba(0, 212, 212, 0.4)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  marginBottom: '30px',
                }}>
                  <p style={{ color: 'white', fontSize: '.9rem', marginBottom: '12px', fontWeight: 600 }}>
                    Prefer to contact us directly?
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      style={{
                        color: '#ffffff',
                        fontSize: '.95rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 500,
                      }}
                    >
                      <IconMail size={18} color="#00d4d4" />
                      <span>{contactInfo.email}</span>
                    </a>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
                      style={{
                        color: '#ffffff',
                        fontSize: '.95rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 500,
                      }}
                    >
                      <IconPhone size={18} color="#00d4d4" />
                      <span>{contactInfo.phone}</span>
                    </a>
                  </div>
                </div>

                <p className="animate-initial animate-fade-in-up animate-delay-400" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.9rem', lineHeight: '1.6', fontStyle: 'italic', marginTop: '20px' }}>
                  At ingenious, we value every inquiry and are committed to providing you with the highest level of support. Whether you have questions about our services, need assistance with a specific project, or simply want to learn more about our capabilities, our expert team is here to help.
                </p>
              </div>
              
              {/* Right Column: HubSpot Form (60%) */}
              <div className="animate-initial animate-fade-in-up animate-delay-200 lg:col-span-3">
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                }}>
                  {/* HubSpot Form - Simple client component that works on page transitions */}
                  <HubSpotForm
                    formId="efefc866-97ec-4500-a380-4cf28e733f54"
                    portalId="3977953"
                    region="na1"
                  />
                </div>
              </div>
            </div>

            {/* Hero Header for Other Contact Methods */}
            <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '40px' }}>
              <h2 className="animate-initial animate-fade-in-up animate-delay-500" style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '16px',
              }}>
                Other Ways to Connect
              </h2>
              <p className="animate-initial animate-fade-in-up animate-delay-600" style={{
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--system-ui)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.7',
                maxWidth: '600px',
                margin: '0 auto',
              }}>
                Looking for something specific? Choose the best option below.
              </p>
            </div>

            {/* Contact Method Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Request a Quote */}
              <Link
                href="/request-quote"
                className="animate-initial animate-fade-in-up animate-delay-700 group"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#008080',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <IconFileText size={28} color="white" />
                </div>
                <h3 style={{
                  color: '#0a253c',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}>
                  Request a Quote
                </h3>
                <p style={{
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.95rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flex: 1,
                }}>
                  Get detailed pricing and timeline for your custom mouse model project. Submit your project details and receive a quote within 1 business day.
                </p>
                <div 
                  className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                  style={{ 
                    color: '#008080',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.9rem',
                    fontWeight: 600,
                  }}
                >
                  <span>Get pricing</span>
                  <IconArrowRight size={16} />
                </div>
              </Link>

              {/* Card 2: Schedule Meeting */}
              <Link
                href="/schedule-meeting"
                className="animate-initial animate-fade-in-up animate-delay-700 group"
                style={{
                  backgroundColor: '#0a253c',
                  borderRadius: '12px',
                  padding: '32px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  border: '2px solid #008080',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#008080',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <IconCalendar size={28} color="white" />
                </div>
                <h3 style={{
                  color: 'white',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}>
                  Schedule Consultation
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.95rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flex: 1,
                }}>
                  Book a free phone consultation with our scientific team. Discuss your project strategy, timeline, and get expert recommendations.
                </p>
                <div 
                  className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                  style={{ 
                    color: '#ffffff',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.9rem',
                    fontWeight: 600,
                  }}
                >
                  <span>Book meeting</span>
                  <IconArrowRight size={16} />
                </div>
              </Link>

              {/* Card 3: Join Our Team */}
              <Link
                href="/current-openings"
                className="animate-initial animate-fade-in-up animate-delay-700 group"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#0a253c',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <IconBriefcase size={28} color="white" />
                </div>
                <h3 style={{
                  color: '#0a253c',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}>
                  Join Our Team
                </h3>
                <p style={{
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.95rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flex: 1,
                }}>
                  Interested in working at the forefront of genetic engineering? View current openings at ingenious targeting laboratory.
                </p>
                <div 
                  className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                  style={{ 
                    color: '#008080',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.9rem',
                    fontWeight: 600,
                  }}
                >
                  <span>View openings</span>
                  <IconArrowRight size={16} />
                </div>
              </Link>

              {/* Card 4: Partnership Inquiries */}
              <a
                href={`mailto:${contactInfo.email}?subject=Partnership Inquiry`}
                className="animate-initial animate-fade-in-up animate-delay-700 group"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#0a253c',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <IconPackage size={28} color="white" />
                </div>
                <h3 style={{
                  color: '#0a253c',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}>
                  Partnership Inquiries
                </h3>
                <p style={{
                  color: '#666',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.95rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flex: 1,
                }}>
                  Academic core facilities, CROs, and pharma/biotech companies looking to collaborate with ingenious.
                </p>
                <div 
                  className="flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
                  style={{ 
                    color: '#008080',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.9rem',
                    fontWeight: 600,
                  }}
                >
                  <span>Contact us</span>
                  <IconArrowRight size={16} />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ========== ADDITIONAL INFO SECTION ========== */}
        <section style={{ padding: '50px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar Content */}
              <div className="lg:col-span-1 space-y-5">
                {/* Contact Info Card */}
                <div className="animate-initial animate-fade-in-up" style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}>
                  <h3 style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}>
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
                        <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} style={{ color: '#0a253c', fontSize: '.875rem', fontFamily: 'var(--system-ui)', textDecoration: 'none' }}>
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
                <div className="animate-initial animate-fade-in-up" style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}>
                  <h3 style={{
                    color: '#0a253c',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}>
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
                <div className="animate-initial animate-fade-in-up" style={{
                  backgroundColor: '#0a253c',
                  borderRadius: '12px',
                  padding: '20px',
                }}>
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

              {/* Additional Quick Links - 2 Column Grid */}
              <div className="lg:col-span-2">
                <div className="animate-initial animate-fade-in-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
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

      {/* Schema.org Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact ingenious targeting laboratory',
            description: 'Contact ingenious targeting laboratory for custom mouse model projects.',
            mainEntity: {
              '@type': 'Organization',
              name: 'ingenious targeting laboratory',
              telephone: '+1-631-468-8534',
              email: 'inquiry@genetargeting.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '761-80 Coates Avenue',
                addressLocality: 'Holbrook',
                addressRegion: 'NY',
                postalCode: '11741',
                addressCountry: 'US',
              },
            },
          }),
        }}
      />
    </div>
  );
}
