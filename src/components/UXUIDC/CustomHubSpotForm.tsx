/**
 * |UXUIDC| Custom HubSpot Form Component
 * @version 1.0.0
 * @created 2026
 * @description Fully custom-styled form that submits programmatically to HubSpot
 * 
 * Features:
 * - Custom ITL brand styling (no HubSpot embed)
 * - Programmatic API submission
 * - Client-side validation
 * - Loading & success/error states
 * - Accessible & mobile-responsive
 */

'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { submitToHubSpot, isValidEmail, isValidPhone } from '@/lib/hubspot';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  validation?: (value: string) => string | null; // Returns error message or null
}

interface CustomHubSpotFormProps {
  portalId: string;
  formGuid: string;
  fields: FormField[];
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export default function CustomHubSpotForm({
  portalId,
  formGuid,
  fields,
  submitButtonText = 'Submit',
  successMessage = 'Thank you! We\'ll be in touch soon.',
  errorMessage = 'Something went wrong. Please try again or contact us directly.',
  className = '',
}: CustomHubSpotFormProps) {
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const currentValue = formData[name] as string[] || [];
      
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...currentValue, value]
          : currentValue.filter(v => v !== value),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formData[field.name];

      // Check required fields
      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Skip validation if field is empty and not required
      if (!value) return;

      // Email validation
      if (field.type === 'email' && typeof value === 'string' && !isValidEmail(value)) {
        newErrors[field.name] = 'Please enter a valid email address';
      }

      // Phone validation
      if (field.type === 'tel' && typeof value === 'string' && !isValidPhone(value)) {
        newErrors[field.name] = 'Please enter a valid phone number';
      }

      // Custom validation
      if (field.validation && typeof value === 'string') {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitToHubSpot(portalId, formGuid, formData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData({}); // Clear form
      } else {
        setSubmitStatus('error');
        console.error('HubSpot submission failed:', result.errors);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <div
        className={className}
        style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
          border: '2px solid #86efac',
        }}
      >
        <svg
          style={{ margin: '0 auto 16px', display: 'block' }}
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <h3
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#16a34a',
            marginBottom: '12px',
          }}
        >
          Success!
        </h3>
        <p
          style={{
            fontFamily: 'var(--system-ui)',
            fontSize: '.95rem',
            color: '#15803d',
            lineHeight: 1.6,
          }}
        >
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Error banner */}
      {submitStatus === 'error' && (
        <div
          style={{
            padding: '16px',
            marginBottom: '24px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              color: '#dc2626',
              margin: 0,
            }}
          >
            {errorMessage}
          </p>
        </div>
      )}

      {/* Form fields */}
      {fields.map(field => (
        <div key={field.name} style={{ marginBottom: '20px' }}>
          <label
            htmlFor={field.name}
            style={{
              display: 'block',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '.9rem',
              fontWeight: 500,
              color: '#0a253c',
              marginBottom: '8px',
            }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>
            )}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={(formData[field.name] as string) || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontFamily: 'var(--system-ui)',
                fontSize: '.95rem',
                color: '#333',
                backgroundColor: '#ffffff',
                border: `1px solid ${errors[field.name] ? '#dc2626' : '#e0e0e0'}`,
                borderRadius: '6px',
                outline: 'none',
                resize: 'vertical',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#008080';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors[field.name] ? '#dc2626' : '#e0e0e0';
              }}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={(formData[field.name] as string) || ''}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontFamily: 'var(--system-ui)',
                fontSize: '.95rem',
                color: '#333',
                backgroundColor: '#ffffff',
                border: `1px solid ${errors[field.name] ? '#dc2626' : '#e0e0e0'}`,
                borderRadius: '6px',
                outline: 'none',
                cursor: 'pointer',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#008080';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors[field.name] ? '#dc2626' : '#e0e0e0';
              }}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={(formData[field.name] as string) || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontFamily: 'var(--system-ui)',
                fontSize: '.95rem',
                color: '#333',
                backgroundColor: '#ffffff',
                border: `1px solid ${errors[field.name] ? '#dc2626' : '#e0e0e0'}`,
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#008080';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors[field.name] ? '#dc2626' : '#e0e0e0';
              }}
            />
          )}

          {/* Error message */}
          {errors[field.name] && (
            <p
              style={{
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                color: '#dc2626',
                marginTop: '6px',
                marginBottom: 0,
              }}
            >
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '14px 24px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '.95rem',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: isSubmitting ? '#9ca3af' : '#008080',
          border: 'none',
          borderRadius: '6px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
        onMouseOver={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#006666';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseOut={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#008080';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {isSubmitting ? (
          <>
            <svg
              style={{ animation: 'spin 1s linear infinite' }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" opacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
            </svg>
            <span>Submitting...</span>
            <style jsx>{`
              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </>
        ) : (
          <>
            <span>{submitButtonText}</span>
            <span>→</span>
          </>
        )}
      </button>
    </form>
  );
}
