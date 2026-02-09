/**
 * Mouse Model Quote Request Page
 * With embedded HubSpot form in hero section
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import CustomHubSpotForm from '@/components/UXUIDC/CustomHubSpotForm';
import type { FormField } from '@/components/UXUIDC/CustomHubSpotForm';
import { IconDNA, IconCheckCircle, IconChevronRight, IconMail, IconPhone } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Our Services",
  title: "Mouse Model Quote Request",
  intro: "Submit your mouse model project details to receive a customized quote including timeline, deliverables, and pricing. ingenious targeting laboratory\'s scientific consultants will review your request and provide strategic recommendations along with project pricing.",
  description: ""
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// FAQ Data
const faqData = [
  { question: "What information do I need to provide for a quote request?", answer: "Provide target gene information (gene symbol, species, target region), model type (knockout, knockin, conditional, humanized, transgenic), strain background preference (C57BL/6, BALB/c, 129, or no preference), project scope (complete project or partial services), and cohort requirements (founders, breeding pairs, or study-ready cohort)." },
  { question: "How long does it take to receive a quote?", answer: "Quotes are typically delivered within 1 business day after receiving your request. For complex projects requiring additional technical review, ingenious targeting laboratory will provide an estimated timeline for quote delivery." },
  { question: "What is included in a project quote?", answer: "Quotes include recommended targeting strategy, allele design overview, project timeline by phase, deliverables at each milestone, pricing breakdown, and terms and conditions. Quotes are customized based on your specific research requirements and project scope." },
  { question: "Can I get a quote for partial services?", answer: "Yes. We provide quotes for partial services including targeting vector only, ES cell targeting only, microinjection only, or other partial services. Pricing is based on the specific scope of work requested. Contact us to discuss your partial service needs." },
  { question: "What happens after I receive my quote?", answer: "After receiving your quote, our team is available to discuss any questions or concerns. We can adjust project scope, explore alternative approaches, or provide additional detail about any aspect of the proposed work. Our goal is to ensure you have all the information needed to make informed decisions." }
];

// Related Links
const relatedLinks: Array<{ title: string; href: string }> = [];

// Quote Request Form Fields
const quoteFormFields: FormField[] = [
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
    required: true,
    placeholder: 'University of Research',
  },
  {
    name: 'gene_target',
    label: 'Gene Target',
    type: 'text',
    required: false,
    placeholder: 'e.g., Brca1, Tp53',
  },
  {
    name: 'model_type',
    label: 'Model Type',
    type: 'select',
    required: true,
    options: [
      { value: 'knockout', label: 'Knockout (Conventional or Conditional)' },
      { value: 'knockin', label: 'Knockin (Point Mutation, Reporter, Tag, cDNA)' },
      { value: 'humanized', label: 'Humanized Mouse Model' },
      { value: 'transgenic', label: 'Transgenic Mouse Model' },
      { value: 'not_sure', label: 'Not Sure - Need Consultation' },
    ],
  },
  {
    name: 'strain_background',
    label: 'Strain Background',
    type: 'select',
    required: false,
    options: [
      { value: 'c57bl6', label: 'C57BL/6' },
      { value: 'balbc', label: 'BALB/c' },
      { value: '129', label: '129' },
      { value: 'other', label: 'Other' },
      { value: 'no_preference', label: 'No Preference' },
    ],
  },
  {
    name: 'project_description',
    label: 'Project Description',
    type: 'textarea',
    required: true,
    placeholder: 'Please describe your project goals, experimental design, and any specific requirements...',
    rows: 5,
  },
];

export default function RequestQuotePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }
      
      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    };
    
    loadGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Hero Section with Embedded Form */}
        <section 
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 80px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Left Column: Content (40%) */}
              <div className="lg:col-span-2">
                <h1 
                  className="hero-animate"
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    marginBottom: '20px'
                  }}
                >
                  Custom Animal Model Quote Request Form
                </h1>
                
                <p 
                  className="hero-animate"
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.7',
                    marginBottom: '25px'
                  }}
                >
                  Please fill in the form below, and one of our scientific consultants will contact you within 1 business day.
                </p>

                {/* Prominent Direct Contact Callout */}
                <div 
                  className="hero-animate" 
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

                <div className="hero-animate">
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
                        Detailed project proposal with timeline
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5' }}>
                        Transparent pricing and deliverables
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5' }}>
                        Free scientific consultation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Right Column: Custom HubSpot Form (60%) */}
              <div className="lg:col-span-3 hero-animate">
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '32px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                }}>
                  <CustomHubSpotForm
                    portalId="242707"
                    formGuid="b854ed46-fed3-4b54-9d01-62173106ad8c"
                    fields={quoteFormFields}
                    submitButtonText="Request Quote"
                    successMessage="Thank you for your quote request! Our scientific consultants will review your project and respond within 1 business day."
                    errorMessage="We're having trouble submitting your request. Please email us directly at inquiry@genetargeting.com or call (631) 468-8534."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ backgroundColor: '#0a253c', padding: '30px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700 }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.85rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start your project today
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your research requirements and recommend the optimal approach for your program. Initial consultation is provided at no charge.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link 
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '12px 30px',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <span>Request a Quote</span>
                <span>→</span>
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '12px 30px',
                  border: '2px solid white',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <span>Free Consultation</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqData.length > 0 && (
          <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
                Frequently asked questions
              </h2>
              <div className="animate-in">
                <UXUIDCAnimatedFAQ faqs={faqData} />
              </div>
            </div>
          </section>
        )}

        {/* Related Links Section */}
        {relatedLinks.length > 0 && (
          <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 600, marginBottom: '30px', textAlign: 'center' }}>
                Related resources
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="animate-in group p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <IconChevronRight size={14} color="#008080" />
                      <span style={{ color: '#0a253c', fontSize: '.9rem', fontWeight: 500 }}>{link.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.genetargeting.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Request Quote",
                "item": "https://www.genetargeting.com/request-quote"
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      </main>
      
      <UXUIDCFooter />
    </div>
  );
}
