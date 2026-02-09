'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconSettings, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Comprehensive Support",
  title: "Post Project Services",
  intro: "Beyond custom mouse model generation, ingenious targeting laboratory provides comprehensive support services to maintain, expand, and preserve your valuable mouse colonies. Since 1998, we have supported researchers with colony management, cryopreservation, rederivation, and breeding services that maximize research productivity while ensuring genetic integrity.",
  description: "From colony maintenance through phenotypic characterization, our support services enable you to focus on your research while we manage the logistics."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Colony Management Services
const colonyManagementServices = [
  {
    name: "Breeding Colony Maintenance",
    description: "Documented pedigrees, organized mating schemes, and regular health monitoring to ensure colony productivity and genetic integrity."
  },
  {
    name: "Genotyping Services",
    description: "PCR based assays to identify carriers, homozygotes, and compound mutants. ingenious targeting laboratory develops custom genotyping protocols for each targeted allele."
  },
  {
    name: "Cohort Development",
    description: "Generate study ready animals on your timeline. We can expand from founders to experimental cohorts while you focus on research design and data analysis."
  },
  {
    name: "Strain Background Management",
    description: "Backcrossing to congenic backgrounds and speed congenic services using SNP marker panels to accelerate background conversion."
  }
];

// Cryopreservation Services
const cryopreservationServices = [
  {
    name: "Sperm Cryopreservation",
    description: "The most cost effective archival solution. Frozen sperm from characterized males can regenerate your line through IVF when needed."
  },
  {
    name: "Embryo Cryopreservation",
    description: "Freezes two cell stage embryos for rapid colony recovery. This approach preserves both maternal and paternal genetics in a single archive."
  },
  {
    name: "ES Cell Cryopreservation",
    description: "Maintains targeted ES cell clones for future use, enabling generation of additional mice or derivative alleles without repeating the targeting process."
  },
  {
    name: "Archive and Recovery",
    description: "Quality controlled storage with documented inventory and validated recovery procedures to regenerate colonies from frozen stocks."
  }
];

// Rederivation Services
const rederivationServices = [
  {
    name: "Embryo Transfer Rederivation",
    description: "Uses IVF or natural mating to generate embryos that are transferred to pathogen free recipients, producing offspring with documented clean health status."
  },
  {
    name: "Health Status Upgrade",
    description: "Enables transfer of lines between facilities with different health barriers or recovery of lines from compromised health status."
  },
  {
    name: "Quarantine and Testing",
    description: "Provides documented health screening before integration into clean facilities."
  }
];

// Speed Expansion Services
const speedExpansionServices = [
  {
    name: "Superovulation Protocols",
    description: "Increase embryo yield from valuable females, accelerating colony expansion."
  },
  {
    name: "IVF Recovery",
    description: "Rapid regeneration of archived lines from cryopreserved sperm."
  },
  {
    name: "Strategic Breeding Schemes",
    description: "Optimize mating configurations to achieve target genotypes efficiently."
  },
  {
    name: "Cohort Coordination",
    description: "Delivers animals at specified ages and genotypes aligned with your experimental timeline."
  }
];

// Service Comparison Table
const serviceComparison = [
  { service: "Colony Management", bestFor: "Ongoing breeding support", timeline: "Continuous" },
  { service: "Sperm Cryopreservation", bestFor: "Cost effective archival", timeline: "2 to 4 weeks" },
  { service: "Embryo Cryopreservation", bestFor: "Rapid recovery needed", timeline: "4 to 6 weeks" },
  { service: "Rederivation", bestFor: "Health status upgrade", timeline: "8 to 12 weeks" },
  { service: "Speed Expansion", bestFor: "Accelerated cohort generation", timeline: "Variable" },
  { service: "Phenotyping", bestFor: "Model characterization", timeline: "Variable" }
];

// Related Services
const relatedServices = [
  { title: "Colony Management Services", href: "/colony-management-services" },
  { title: "Cryopreservation Services", href: "/cryopreservation-services" },
  { title: "Rederivation Services", href: "/rederivation-services" },
  { title: "Speed Expansion Breeding", href: "/speed-expansion-breeding" }
];

// Related Models
const relatedModels = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const saidTestimonial = getTestimonialById('said-uci')!;

const testimonials = [
  { quote: saidTestimonial.quote, name: formatAuthorWithCredentials(saidTestimonial), affiliation: saidTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "What support services does ingenious targeting laboratory provide beyond model generation?",
    answer: "ingenious targeting laboratory provides comprehensive support services including colony management (breeding colony maintenance, genotyping, cohort development, strain background management), cryopreservation (sperm, embryo, ES cell archival), rederivation (pathogen-free line establishment), and speed expansion breeding (rapid cohort generation)."
  },
  {
    question: "How do colony management services help maintain mouse lines?",
    answer: "Colony management services provide breeding colony maintenance with documented pedigrees, organized mating schemes, and regular health monitoring. Genotyping services identify carriers, homozygotes, and compound mutants. Cohort development generates study-ready animals on your timeline while you focus on research design."
  },
  {
    question: "What cryopreservation methods are available?",
    answer: "Cryopreservation methods include sperm cryopreservation (most cost-effective archival solution), embryo cryopreservation (preserves both maternal and paternal genetics), and ES cell cryopreservation (maintains targeted ES cell clones for future use). Archive and recovery services include quality-controlled storage with validated recovery procedures."
  },
  {
    question: "When is rederivation needed?",
    answer: "Rederivation is needed when mouse lines become contaminated with pathogens, need to be moved to SPF facilities, or require health status upgrade for specific research protocols. Rederivation eliminates adventitious pathogens and establishes clean health status through embryo transfer or IVF into pathogen-free recipients."
  }
];

export default function SupportServicesPage() {
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
                  <IconSettings size={16} color="white" />
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

        {/* Colony Management Services */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Colony Management Services
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Maintaining a productive mouse colony requires consistent husbandry, accurate genotyping, and strategic breeding decisions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colonyManagementServices.map((service, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ marginTop: '20px' }}>
              <Link
                href="/colony-management-services"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
              >
                <span>Learn More About Colony Management</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Cryopreservation Services */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Cryopreservation Services
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Cryopreservation protects your mouse lines against colony loss while reducing ongoing maintenance costs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cryopreservationServices.map((service, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ marginTop: '20px' }}>
              <Link
                href="/cryopreservation-services"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}
              >
                <span>Learn More About Cryopreservation</span>
                <IconChevronRight size={14} color="#2384da" />
              </Link>
            </div>
          </div>
        </section>

        {/* Rederivation Services */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Rederivation Services
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Rederivation eliminates adventitious pathogens and establishes clean health status for mouse lines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rederivationServices.map((service, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ marginTop: '20px' }}>
              <Link
                href="/rederivation-services"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: 'white', fontSize: '.85rem', fontWeight: 500 }}
              >
                <span>Learn More About Rederivation</span>
                <IconChevronRight size={14} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Speed Expansion Breeding */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Speed Expansion Breeding
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Accelerate timeline from founders to experimental cohorts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {speedExpansionServices.map((service, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconCheckCircle size={20} color="#008080" />
                  </div>
                  <div>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>
                      {service.name}
                    </h3>
                    <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ marginTop: '20px' }}>
              <Link
                href="/speed-expansion-breeding"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
              >
                <span>Learn More About Speed Expansion</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Service Comparison Table */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Service Comparison
            </h2>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Service</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Best For</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceComparison.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '15px', color: '#008080', fontWeight: 500 }}>{row.service}</td>
                      <td style={{ padding: '15px', color: 'rgba(255,255,255,0.9)' }}>{row.bestFor}</td>
                      <td style={{ padding: '15px', color: 'rgba(255,255,255,0.9)' }}>{row.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: testimonials.length === 1 ? '48px 56px' : '30px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}>
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px', ...(testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : {}) }} />
                  <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: testimonials.length === 1 ? '1.1rem' : '.9rem', fontWeight: 400, lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px', flex: testimonials.length > 1 ? 1 : undefined }}>&ldquo;{testimonial.quote}&rdquo;</p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
                    <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonial.name}</p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem', fontWeight: 400 }}>{testimonial.affiliation}</p>
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
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Whether you need ongoing colony support, archival services, or complete project management, ingenious targeting laboratory&apos;s service team can design a support plan aligned with your research goals.
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
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Support Services
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
                  Custom Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedModels.map((link, index) => (
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
            "name": "Mouse Model Support Services",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Mouse colony management, cryopreservation, rederivation, and breeding services. Comprehensive support for your mouse model projects since 1998.",
            "serviceType": "Mouse Model Support Services"
          })
        }}
      />
    </div>
  );
}
