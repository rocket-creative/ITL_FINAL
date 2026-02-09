'use client';

/**
 * Order Inquiry for Catalog Models Page
 * Built following RULES_2026 guidelines
 * Inquiry form for ready-made catalog mouse models
 */

import { useState } from 'react';
import Link from 'next/link';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCCookieConsent,
  IconChevronRight,
  IconPackage,
  IconCheckCircle,
  IconMail,
  IconPhone,
} from '@/components/UXUIDC';

// Brand colors
const BRAND = {
  navy: '#0a253c',
  teal: '#008080',
  lightGray: '#f7f7f7',
  white: '#ffffff',
  text: '#333333',
  error: '#dc2626',
};

// Catalog models available
const catalogModels = [
  { id: 'pd1', name: 'Humanized PD1 mouse', category: 'Immune Checkpoint' },
  { id: 'pdl1', name: 'Humanized PDL1 mouse', category: 'Immune Checkpoint' },
  { id: 'ctla4', name: 'Humanized CTLA4 mouse', category: 'Immune Checkpoint' },
  { id: 'lag3', name: 'Humanized LAG3 mouse', category: 'Immune Checkpoint' },
  { id: 'tim3', name: 'Humanized TIM3 mouse', category: 'Immune Checkpoint' },
  { id: 'pd1-ctla4', name: 'Double humanized PD1/CTLA4 mouse', category: 'Double Checkpoint' },
  { id: 'pd1-lag3', name: 'Double humanized PD1/LAG3 mouse', category: 'Double Checkpoint' },
  { id: 'pd1-tim3', name: 'Double humanized PD1/TIM3 mouse', category: 'Double Checkpoint' },
  { id: 'other', name: 'Other / Not listed', category: 'Other' },
];

const quantityOptions = [
  { value: '1-5', label: '1 to 5 mice' },
  { value: '6-10', label: '6 to 10 mice' },
  { value: '11-20', label: '11 to 20 mice' },
  { value: '21-50', label: '21 to 50 mice' },
  { value: '50+', label: 'More than 50 mice' },
  { value: 'breeding-pairs', label: 'Breeding pairs' },
];

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  fontSize: '1rem',
  border: `1px solid #ddd`,
  borderRadius: '8px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.95rem',
  fontWeight: 600,
  color: BRAND.navy,
  marginBottom: '8px',
};

export default function OrderInquiryCatalogModelsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    model: '',
    quantity: '',
    timeline: '',
    background: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
    if (!formData.model) newErrors.model = 'Please select a model';
    if (!formData.quantity) newErrors.quantity = 'Please select quantity';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <UXUIDCNavigation />
        <main id="main-content" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <IconCheckCircle size={64} color={BRAND.teal} style={{ marginBottom: '24px' }} />
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: BRAND.navy, marginBottom: '16px' }}>
              Thank you for your inquiry
            </h1>
            <p style={{ fontSize: '1.1rem', color: BRAND.text, marginBottom: '24px', lineHeight: 1.6 }}>
              We have received your catalog model inquiry. Our team will review your request and 
              contact you within 1 business day with availability and pricing information.
            </p>
            <Link 
              href="/catalog-mouse-models"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: BRAND.teal,
                color: BRAND.white,
                padding: '14px 28px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Browse more models
              <IconChevronRight size={18} color={BRAND.white} />
            </Link>
          </div>
        </main>
        <UXUIDCFooter />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ padding: '20px 24px', background: BRAND.lightGray }}>
          <ol style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            listStyle: 'none', 
            margin: 0, 
            padding: 0,
            fontSize: '14px',
            color: BRAND.text,
            flexWrap: 'wrap'
          }}>
            <li><Link href="/" style={{ color: BRAND.teal, textDecoration: 'none' }}>Home</Link></li>
            <li><IconChevronRight size={14} color={BRAND.text} /></li>
            <li><Link href="/catalog-mouse-models" style={{ color: BRAND.teal, textDecoration: 'none' }}>Catalog Models</Link></li>
            <li><IconChevronRight size={14} color={BRAND.text} /></li>
            <li aria-current="page" style={{ color: BRAND.navy, fontWeight: 600 }}>Order Inquiry</li>
          </ol>
        </nav>

        {/* Hero Section with Form Above the Fold */}
        <section style={{ 
          padding: '70px 24px 60px', 
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          position: 'relative',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Left Column: Content (40%) */}
              <div className="lg:col-span-2">
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(0,128,128,0.3)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  marginBottom: '16px',
                }}>
                  <IconPackage size={14} color="#00d4d4" />
                  <span style={{ color: '#00d4d4', fontSize: '.75rem', fontWeight: 500 }}>
                    Ready Made Models
                  </span>
                </div>
                
                <h1 style={{ 
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                  fontWeight: 600, 
                  marginBottom: '16px',
                  lineHeight: 1.2,
                  color: BRAND.white,
                  fontFamily: 'Poppins, sans-serif',
                }}>
                  Order catalog models
                </h1>
                
                <p style={{ 
                  fontSize: '1rem', 
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.7,
                  marginBottom: '25px',
                }}>
                  Submit an inquiry for our ready made mouse models. Our team will confirm availability, provide pricing, and coordinate shipping within 1 business day.
                </p>

                {/* Direct Contact Callout */}
                <div 
                  style={{ 
                    marginBottom: '25px',
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

                {/* What to Expect */}
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.9rem', marginBottom: '12px', fontWeight: 600 }}>
                    What to expect:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5' }}>
                        Response within 1 business day
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5' }}>
                        Availability and pricing confirmation
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5' }}>
                        Coordinated shipping to your facility
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5' }}>
                        Complete documentation included
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Right Column: Form (60%) */}
              <div className="lg:col-span-3">
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                }}>
                  <form onSubmit={handleSubmit}>
                    {/* Contact Information */}
                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 600, 
                        color: BRAND.navy,
                        marginBottom: '16px',
                      }}>
                        Contact information
                      </h2>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label htmlFor="name" style={labelStyle}>
                            Full name <span style={{ color: BRAND.error }}>*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.name ? BRAND.error : '#ddd' }}
                            placeholder="Dr. Jane Smith"
                          />
                          {errors.name && <span style={{ color: BRAND.error, fontSize: '0.85rem' }}>{errors.name}</span>}
                        </div>
                        
                        <div>
                          <label htmlFor="email" style={labelStyle}>
                            Email address <span style={{ color: BRAND.error }}>*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.email ? BRAND.error : '#ddd' }}
                            placeholder="jsmith@university.edu"
                          />
                          {errors.email && <span style={{ color: BRAND.error, fontSize: '0.85rem' }}>{errors.email}</span>}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" style={labelStyle}>Phone number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="(555) 123 4567"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="institution" style={labelStyle}>
                            Institution / Company <span style={{ color: BRAND.error }}>*</span>
                          </label>
                          <input
                            type="text"
                            id="institution"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.institution ? BRAND.error : '#ddd' }}
                            placeholder="University or Company Name"
                          />
                          {errors.institution && <span style={{ color: BRAND.error, fontSize: '0.85rem' }}>{errors.institution}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Model Selection */}
                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 600, 
                        color: BRAND.navy,
                        marginBottom: '16px',
                      }}>
                        Model selection
                      </h2>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label htmlFor="model" style={labelStyle}>
                            Select model <span style={{ color: BRAND.error }}>*</span>
                          </label>
                          <select
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.model ? BRAND.error : '#ddd', cursor: 'pointer' }}
                          >
                            <option value="">Choose a model...</option>
                            {catalogModels.map(model => (
                              <option key={model.id} value={model.id}>
                                {model.name}
                              </option>
                            ))}
                          </select>
                          {errors.model && <span style={{ color: BRAND.error, fontSize: '0.85rem' }}>{errors.model}</span>}
                        </div>
                        
                        <div>
                          <label htmlFor="quantity" style={labelStyle}>
                            Quantity needed <span style={{ color: BRAND.error }}>*</span>
                          </label>
                          <select
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            style={{ ...inputStyle, borderColor: errors.quantity ? BRAND.error : '#ddd', cursor: 'pointer' }}
                          >
                            <option value="">Select quantity...</option>
                            {quantityOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          {errors.quantity && <span style={{ color: BRAND.error, fontSize: '0.85rem' }}>{errors.quantity}</span>}
                        </div>
                        
                        <div>
                          <label htmlFor="background" style={labelStyle}>Preferred background strain</label>
                          <input
                            type="text"
                            id="background"
                            name="background"
                            value={formData.background}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g., C57BL/6, BALB/c"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="timeline" style={labelStyle}>Desired timeline</label>
                          <input
                            type="text"
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g., Within 4 weeks"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div style={{ marginBottom: '24px' }}>
                      <label htmlFor="additionalInfo" style={labelStyle}>
                        Additional information or questions
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        placeholder="Any specific requirements, questions about the model, or additional details..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '14px 28px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: BRAND.white,
                        background: isSubmitting ? '#999' : BRAND.teal,
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
                    </button>
                    
                    {/* Note */}
                    <p style={{ 
                      marginTop: '16px', 
                      fontSize: '0.85rem', 
                      color: '#666',
                      textAlign: 'center'
                    }}>
                      By submitting this form, you agree to our{' '}
                      <Link href="/privacy" style={{ color: BRAND.teal }}>Privacy Policy</Link>.
                      We will respond within 1 business day.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section style={{ padding: '60px 24px', background: BRAND.lightGray }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              color: BRAND.navy,
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Explore our catalog
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '16px' 
            }}>
              {[
                { title: 'All catalog models', href: '/catalog-mouse-models' },
                { title: 'Humanized checkpoint mice', href: '/humanized-immune-checkpoint-mice' },
                { title: 'Double checkpoint mice', href: '/double-checkpoint-mice' },
                { title: 'Custom mouse models', href: '/custom-mouse-models' },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    background: BRAND.white,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: BRAND.navy,
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  {link.title}
                  <IconChevronRight size={18} color={BRAND.teal} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />
      <UXUIDCCookieConsent />
    </div>
  );
}
