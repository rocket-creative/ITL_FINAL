'use client';

/**
 * Start Your Project Page - ingenious targeting laboratory
 * Mirrors genetargeting.com/start-your-project with PDF download gated by email
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCAnimatedCounter,
  IconDNA,
  IconCheckCircle,
  IconArrowRight,
  IconFlask,
  IconDownload,
} from '@/components/UXUIDC';

gsap.registerPlugin(ScrollTrigger);

// PDF Download URL (legacy link)
const PRICING_GUIDE_PDF = 'https://3977953.fs1.hubspotusercontent-na1.net/hubfs/3977953/Pricing%20Guide%202024.pdf';

// What's Inside the Guide
const guideContents = [
  'Knockout and Point Mutation Models including project phases, timelines, and deliverables',
  'Conditional Knockout Models with targeted exon removal and genotype validation',
  'Targeted Knock In Models including cDNA, reporter, or Cre designs and insertion strategy',
  'TruView Conditional Knockout for advanced conditional model systems',
  'Conditional Point Mutations for precise mutagenesis and conditional control',
  'TruHumanization Large Fragment Models supporting up to 200 kb region replacements',
  'Custom Rat Models available for specialized studies',
  'Custom Rabbit Models suitable for targeted transgenesis projects',
  'Flexible funding lets you begin your project immediately and pay once your funding is secured',
];

// Catalog Models section
const catalogFeatures = [
  { title: 'Knockout and Conditional Lines', desc: 'For phenotypic studies and disease modeling' },
  { title: 'Immunodeficient and Humanized Models', desc: 'Ideal for xenografts, immunotherapy, and infectious disease work' },
  { title: 'Disease Specific Strains', desc: 'Including oncology, metabolic, autoimmune, and neurological models ready for shipment' },
  { title: 'Germ Free and Microbiome Controlled Models', desc: 'For microbiota and gut immune interaction studies' },
];

// Specialized Services
const specializedServices = [
  { title: 'Genotyping and Screening', desc: 'For rapid identification of alleles and targeted modifications' },
  { title: 'Cryopreservation and Rederivation', desc: 'To secure valuable lines or recover from contamination' },
  { title: 'Colony Management', desc: 'For scalable breeding, maintenance, and colony health monitoring' },
  { title: 'Custom Breeding Schemes', desc: 'For homozygous, heterozygous, or Cre positive outcomes' },
  { title: 'Phenotype Analysis', desc: 'For in depth characterization to validate model performance' },
];

// FAQs
const faqs = [
  {
    question: 'What technologies do you use?',
    answer: 'We use the most appropriate and proven tools—guided by your project\'s complexity and publication goals—to ensure optimal results.',
  },
  {
    question: 'How long does it take to get a model?',
    answer: 'Timelines vary depending on complexity, but many projects can be completed within 8 months. Your proposal will include clear timing.',
  },
  {
    question: 'Can I get help with breeding or cohorts?',
    answer: 'Yes. We support colony management, cohort development, and breeding programs to meet your study size and delivery goals.',
  },
  {
    question: 'Can I get a quote without starting a project?',
    answer: 'Absolutely. Requesting a quote is free and includes expert consultation.',
  },
  {
    question: 'Are your catalog models ready to ship?',
    answer: 'Most colonies are actively maintained for fast delivery.',
  },
];

// Stats
const stats = [
  { value: 26, suffix: '+', label: 'Years Experience' },
  { value: 2500, suffix: '+', label: 'Custom Mouse Models Delivered' },
  { value: 900, suffix: '+', label: 'Research Institutions' },
  { value: 100, suffix: '%', label: 'Germline Guarantee' },
];

export default function StartYourProjectPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handlePdfDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setFormSubmitted(true);
      // Open PDF in new tab
      window.open(PRICING_GUIDE_PDF, '_blank');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero Section */}
        <section
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div
              className="hero-animate"
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
              <IconDNA size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>Custom Mouse Models</span>
            </div>
            <h1
              className="hero-animate"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Start Your Project With Transparent, Predictable Costs
            </h1>
            <p
              className="hero-animate"
              style={{
                color: '#00d4d4',
                fontSize: '1.1rem',
                fontWeight: 600,
                lineHeight: '1.7rem',
                marginBottom: '15px',
              }}
            >
              Every Model Delivered Is Germline Confirmed with Guaranteed Delivery.
            </p>
            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
                maxWidth: '700px',
                marginBottom: '30px',
              }}
            >
              From conventional knockouts to advanced large fragment humanization, <em>ingenious targeting laboratory</em> delivers genetically engineered models built to your specifications, reliably, efficiently, and within budget. Unlock the complete <strong>2026 Pricing Guide</strong> to view starting prices, timelines, and flexible Start Now Pay Later options that align with your funding cycles.
            </p>
          </div>
        </section>

        {/* What's Inside Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
              {/* Left: What's Inside */}
              <div className="animate-in">
                <h2
                  style={{
                    color: '#2384da',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '20px',
                  }}
                >
                  What&apos;s Inside the Guide
                </h2>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {guideContents.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '14px',
                        fontSize: '.9rem',
                        color: '#444',
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          minWidth: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#008080',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '.75rem',
                          fontWeight: 600,
                          marginTop: '2px',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right: Download Form */}
              <div
                className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  borderTop: '4px solid #008080',
                }}
              >
                <h3
                  style={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}
                >
                  Access the 2026 Custom Mouse Model Pricing Guide
                </h3>
                <p style={{ color: '#666', fontSize: '.85rem', marginBottom: '20px', lineHeight: 1.6 }}>
                  We respect your inbox. Access includes exclusive project planning tools and funding strategy resources.
                </p>

                {!formSubmitted ? (
                  <form onSubmit={handlePdfDownload}>
                    <input
                      type="email"
                      placeholder="Enter your work email to unlock the guide"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '.95rem',
                        marginBottom: '12px',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: '#008080',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '.95rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#006666')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#008080')}
                    >
                      <IconDownload size={18} color="white" />
                      Download Pricing Guide
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <IconCheckCircle size={48} color="#008080" />
                    <p style={{ color: '#333', fontWeight: 600, marginTop: '15px' }}>
                      Your download should start automatically.
                    </p>
                    <a
                      href={PRICING_GUIDE_PDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'underline',
                      }}
                    >
                      Click here if it doesn&apos;t start
                    </a>
                  </div>
                )}

                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                  <p style={{ color: '#666', fontSize: '.8rem', marginBottom: '10px' }}>
                    Get detailed insights on:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      'Model types & starting prices by design tier',
                      'Typical project phases and delivery timelines',
                      'Funding flexibility: Start now, pay later',
                      'Workflow overview and support services',
                    ].map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '.8rem',
                          color: '#555',
                          marginBottom: '8px',
                        }}
                      >
                        <IconCheckCircle size={14} color="#008080" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Trust statement */}
            <p
              className="animate-in"
              style={{
                textAlign: 'center',
                marginTop: '40px',
                color: '#666',
                fontSize: '.9rem',
                fontStyle: 'italic',
              }}
            >
              <strong>Trusted by 900+ universities, biotech startups, and global research institutions for over 26 years.</strong>
              <br />
              More than <strong>2,500 custom mouse models delivered</strong>.
            </p>
          </div>
        </section>

        {/* Catalog Mouse Models Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2
                style={{
                  color: '#2384da',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '15px',
                }}
              >
                Catalog Mouse Models
              </h2>
              <p style={{ color: '#666', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
                Not every project requires a custom build. Our catalog of more than <strong>10,000 mouse models</strong> offers study ready solutions for a wide range of research areas.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '30px',
              }}
            >
              {catalogFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f7f7f7',
                    padding: '24px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #008080',
                  }}
                >
                  <h3
                    style={{
                      color: '#333',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.9rem', margin: 0, lineHeight: 1.5 }}>{feature.desc}</p>
                </div>
              ))}
            </div>

            <p className="animate-in" style={{ color: '#555', fontSize: '.9rem', marginBottom: '25px', textAlign: 'center' }}>
              All catalog models are fully documented, pathogen free, and ready for breeding or shipment.
            </p>

            <div className="animate-in" style={{ textAlign: 'center' }}>
              <Link
                href="/all-catalog-mouse-models"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#006666';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#008080';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Search Catalog Models
                <IconArrowRight size={16} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Specialized Services Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2
                style={{
                  color: '#2384da',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '15px',
                }}
              >
                Specialized Services
              </h2>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Comprehensive Support Beyond Model Creation
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
              {specializedServices.map((service, i) => (
                <div
                  key={i}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    borderTop: '4px solid #134978',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <IconFlask size={24} color="#008080" />
                  </div>
                  <h3
                    style={{
                      color: '#333',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '.9rem', margin: 0, lineHeight: 1.5 }}>{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link
                href="/mouse-model-services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#008080',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '2px solid #008080',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#008080';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#008080';
                }}
              >
                Inquire About Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '30px',
                textAlign: 'center',
              }}
            >
              FAQs
            </h2>

            <div>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="animate-in"
                  style={{
                    borderBottom: '1px solid #e0e0e0',
                    marginBottom: '0',
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '20px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        color: '#333',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {faq.question}
                    </span>
                    <span
                      style={{
                        color: '#008080',
                        fontSize: '1.5rem',
                        fontWeight: 400,
                        transition: 'transform 0.2s ease',
                        transform: expandedFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: expandedFaq === i ? '200px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p
                      style={{
                        color: '#666',
                        fontSize: '.9rem',
                        lineHeight: 1.7,
                        paddingBottom: '20px',
                        margin: 0,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="animate-in"
              style={{
                textAlign: 'center',
                marginTop: '30px',
                color: '#666',
                fontSize: '.9rem',
              }}
            >
              Still have questions? Our team is here to help—
              <Link href="/contact" style={{ color: '#008080', textDecoration: 'underline' }}>
                contact us
              </Link>{' '}
              for personalized guidance.
            </p>
          </div>
        </section>

        {/* Proven Partner Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              A Proven Partner in Mouse Model Development
            </h2>
            <p
              className="animate-in"
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1rem',
                lineHeight: 1.7,
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto 40px',
              }}
            >
              With decades of experience and thousands of successful projects delivered, researchers across academia and industry rely on us for precision, transparency, and ongoing support.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '30px',
                marginBottom: '40px',
              }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="animate-in" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#00d4d4', marginBottom: '8px' }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '.85rem', color: 'rgba(255,255,255,0.7)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <ul
              className="animate-in"
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 auto',
                maxWidth: '600px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {[
                'Over 26 years of experience in genetic model development',
                '2500+ custom mouse models delivered',
                'Trusted by NIH-funded labs and global biotech teams',
                'Clear communication, fixed prices and ongoing project support',
                'No obligation — speak to one of our scientists about your goals today',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '.9rem',
                    lineHeight: 1.5,
                    gridColumn: i === 4 ? 'span 2' : 'auto',
                    justifyContent: i === 4 ? 'center' : 'flex-start',
                  }}
                >
                  <IconCheckCircle size={16} color="#00d4d4" style={{ marginTop: '3px', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ready to Start Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
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
              Ready to Start Your Project?
            </h2>
            <p
              className="animate-in"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '30px',
              }}
            >
              Whether you&apos;re requesting a custom model or browsing our catalog, we&apos;re here to support your next breakthrough.
            </p>

            <div
              className="animate-in"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/request-quote"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Request a Custom Quote
                <IconArrowRight size={16} color="#008080" />
              </Link>
              <Link
                href="/all-catalog-mouse-models"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontSize: '.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '2px solid white',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Search Catalog Models
              </Link>
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />
    </div>
  );
}
