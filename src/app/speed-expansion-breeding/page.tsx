'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconTarget, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Rapid Cohort Generation",
  title: "Speed Expansion Breeding",
  intro: "ingenious targeting laboratory's speed expansion breeding services generate experimental cohorts rapidly through optimized breeding strategies and large scale production capabilities. Since 1998, we have supported researchers with rapid cohort generation for time sensitive studies and large scale experiments.",
  description: "Speed expansion breeding uses strategic breeding pair management, parallel breeding schemes, and optimized husbandry to accelerate cohort generation while maintaining genetic integrity and health status. This service is ideal when experimental timelines require rapid animal production."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Parallel Breeding Features
const parallelBreeding = [
  { feature: "Multiple Pairs", description: "Simultaneous breeding from multiple pairs" },
  { feature: "Staggered Starts", description: "Overlapping breeding cycles" },
  { feature: "Continuous Production", description: "Maintained production flow" },
  { feature: "Scale", description: "Large numbers of breeding pairs" }
];

// Optimized Breeding Schemes
const optimizedSchemes = [
  { scheme: "Heterozygote Intercrosses", description: "Generate homozygotes efficiently" },
  { scheme: "Backcross Optimization", description: "Minimize generations needed" },
  { scheme: "Age Optimization", description: "Breed at optimal ages" },
  { scheme: "Pair Rotation", description: "Maintain high production rates" }
];

// Large Scale Production
const largeScaleProduction = [
  { capability: "High Capacity Housing", description: "Large numbers of animals" },
  { capability: "Efficient Genotyping", description: "Rapid screening" },
  { capability: "Coordinated Breeding", description: "Synchronized production" },
  { capability: "Quality Control", description: "Maintain genetic integrity" }
];

// Time Sensitive Applications
const timeSensitiveApps = [
  { application: "Grant Deadlines", description: "Meet funding timelines" },
  { application: "Publication Deadlines", description: "Accelerate research" },
  { application: "Therapeutic Development", description: "Drug testing timelines" },
  { application: "Collaborative Studies", description: "Multi site coordination" }
];

// Large Scale Applications
const largeScaleApps = [
  { application: "High Throughput Screening", description: "Large animal numbers" },
  { application: "Multi Arm Studies", description: "Multiple experimental groups" },
  { application: "Dose Response Studies", description: "Multiple dose groups" },
  { application: "Longitudinal Studies", description: "Large baseline cohorts" }
];

// Timeline Optimization Features
const timelineOptimization = [
  "Early Pairing: Begin breeding immediately",
  "Overlapping Cycles: Continuous production",
  "Efficient Genotyping: Rapid screening",
  "Coordinated Delivery: Synchronized cohorts"
];

// Quality Assurance Features
const qualityAssurance = [
  "Genetic Verification: Confirm genotypes",
  "Health Monitoring: Maintain SPF status",
  "Age Matching: Synchronized ages",
  "Sex Balancing: Appropriate ratios"
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const francoTestimonial = getTestimonialById('franco-colorado')!;

const testimonials = [
  { quote: francoTestimonial.quote, name: formatAuthorWithCredentials(francoTestimonial), affiliation: francoTestimonial.affiliation },
];

// Related Links
const relatedServices = [
  { title: "Colony Management Services", href: "/colony-management-services" },
  { title: "Mouse Model Services", href: "/mouse-model-services" }
];

const relatedResources = [
  { title: "FAQs", href: "/faqs" }
];

// FAQ Data
const faqData = [
  {
    question: "How does speed expansion breeding accelerate cohort generation?",
    answer: "Speed expansion breeding uses parallel breeding (multiple breeding pairs simultaneously), optimized breeding schemes (heterozygote intercrosses for efficient homozygote generation), large-scale production infrastructure, and coordinated genotyping to accelerate timeline from founders to experimental cohorts while maintaining genetic integrity."
  },
  {
    question: "Can speed expansion breeding be used for complex genotypes?",
    answer: "Yes. Speed expansion breeding can accommodate complex genotypes including multiple alleles, conditional systems requiring Cre crosses, and multi-component models. Breeding strategies are optimized based on genotype complexity, genetic linkage considerations, and experimental requirements."
  },
  {
    question: "What quality controls are maintained during speed expansion breeding?",
    answer: "Quality controls include accurate genotyping to maintain genetic integrity, health monitoring to ensure pathogen-free status, pedigree documentation for breeding records, and genetic background verification when applicable. Speed expansion maintains the same quality standards as standard breeding services."
  },
  {
    question: "What is included in speed expansion breeding service deliverables?",
    answer: "Speed expansion breeding deliverables include experimental cohorts at specified ages and genotypes, genotyping documentation confirming genotype distribution, health certificates, and breeding records. Cohorts are delivered study-ready for immediate experimental use."
  }
];

export default function SpeedExpansionBreedingPage() {
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
        {/* Hero Section */}
        <section
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
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
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div className="grid grid-cols-1 gap-12 items-center">
              <div>
                <div
                  className="hero-animate"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    marginBottom: '20px'
                  }}
                >
                  <IconTarget size={16} color="white" />
                  <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
                </div>

                <h1
                  className="hero-animate"
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '2.8rem',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: '20px'
                  }}
                >
                  {heroData.title}
                </h1>

                <p
                  className="hero-animate"
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.7rem',
                    marginBottom: '15px'
                  }}
                >
                  {heroData.intro}
                </p>

                <p
                  className="hero-animate"
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: '.9rem',
                    fontWeight: 400,
                    lineHeight: '1.6rem',
                    marginBottom: '25px'
                  }}
                >
                  {heroData.description}
                </p>

                <div className="hero-animate flex flex-wrap gap-4">
                  <Link
                    href="/request-quote"
                    className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: 'white',
                      color: '#0a253c',
                      padding: '10px 20px',
                      minWidth: '160px',
                      fontSize: '.85rem',
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
                      padding: '10px 20px',
                      minWidth: '160px',
                      border: '2px solid white',
                      fontSize: '.85rem',
                      fontWeight: 500
                    }}
                  >
                    <span>Talk to a Scientist</span>
                    <span>→</span>
                  </Link>
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

        {/* Speed Expansion Strategies */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Speed Expansion Strategies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Parallel Breeding */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Parallel Breeding
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Multiple breeding pairs in parallel:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {parallelBreeding.map((item, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{item.feature}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optimized Breeding Schemes */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Optimized Breeding Schemes
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Breeding strategies designed for speed:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {optimizedSchemes.map((item, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.85rem' }}>{item.scheme}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Large Scale Production */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Large Scale Production
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Infrastructure for large cohorts:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {largeScaleProduction.map((item, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{item.capability}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Time Sensitive Studies */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Time Sensitive Studies
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  When experiments require rapid cohort generation:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {timeSensitiveApps.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.9rem' }}>{item.application}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Large Scale Experiments */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Large Scale Experiments
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  For studies requiring large cohorts:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {largeScaleApps.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.9rem' }}>{item.application}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Service Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timeline Optimization */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Timeline Optimization
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Strategies to minimize time:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {timelineOptimization.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quality Assurance */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Quality Assurance
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Maintain quality during expansion:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {qualityAssurance.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: testimonials.length === 1 ? '48px 56px' : '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    boxSizing: 'border-box',
                    textAlign: testimonials.length === 1 ? 'center' : 'left'
                  }}
                >
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px', ...(testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : {}) }} />
                  <p style={{
                    color: '#666',
                    fontFamily: 'Lato, sans-serif',
                    fontSize: testimonials.length === 1 ? '1.1rem' : '.9rem',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    marginBottom: '20px',
                    flex: testimonials.length > 1 ? 1 : undefined,
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
                    <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>
                      — {testimonial.name}
                    </p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem', fontWeight: 400 }}>
                      {testimonial.affiliation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Request Speed Expansion Services
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Contact us to discuss speed expansion breeding for your experimental cohorts. Our team can help you determine the optimal approach for rapid cohort generation.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
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
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup title="Speed Expansion Breeding Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedServices.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedResources.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Speed Expansion Breeding",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Speed expansion breeding services for rapid generation of experimental cohorts. Optimized breeding strategies for large scale studies.",
            "serviceType": "Breeding Services"
          })
        }}
      />
    </div>
  );
}
