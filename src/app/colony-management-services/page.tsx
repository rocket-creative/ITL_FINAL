'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconSettings, IconImage, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { UXUIDCResourceLinks, breedingResources, BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Post-Project Services",
  title: "Mouse Colony Management Services",
  intro: "Since 1998, ingenious targeting laboratory has supported researchers with comprehensive colony management services, maintaining and expanding genetically engineered mouse lines for institutions worldwide. Our colony management expertise ensures your valuable mouse models are maintained with consistent genotyping, optimized breeding strategies, and professional animal husbandry.",
  description: "Colony management services enable research programs to focus on experimental work while experts handle the logistics of maintaining breeding colonies, tracking genotypes, and expanding lines for experimental cohorts."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Colony Maintenance Features
const maintenanceFeatures = [
  { name: "Breeding pair management", description: "Maintain optimal breeding pairs for continuous production" },
  { name: "Genotype tracking", description: "Systematic genotyping and record keeping" },
  { name: "Health monitoring", description: "Regular health assessment and veterinary oversight" },
  { name: "Census management", description: "Track animal numbers, ages, and genotypes" },
  { name: "Reporting", description: "Regular updates on colony status and production" }
];

// Breeding Expansion Features
const expansionFeatures = [
  { name: "Cohort development", description: "Breed to specific genotypes and numbers for experiments" },
  { name: "Age matched cohorts", description: "Coordinate breeding for age synchronized animals" },
  { name: "Sex balanced groups", description: "Generate appropriate male and female numbers" },
  { name: "Schedule optimization", description: "Strategic breeding to meet experimental deadlines" },
  { name: "Large scale production", description: "Scale colony for high throughput studies" }
];

// Complex Breeding Schemes
const complexBreedingSchemes = [
  { name: "Conditional knockout breeding", description: "Floxed allele crossed to Cre driver" },
  { name: "Multi allele combinations", description: "Compound mutants with multiple modifications" },
  { name: "Reporter crosses", description: "Breeding for lineage tracing or expression analysis" },
  { name: "Backcrossing programs", description: "Systematic strain background purification" },
  { name: "Intercross management", description: "Generating homozygotes from heterozygote crosses" }
];

// Genotyping Services
const genotypingServices = [
  { name: "PCR based genotyping", description: "Standard endpoint PCR for allele detection" },
  { name: "Multiplex assays", description: "Simultaneous detection of multiple alleles" },
  { name: "Quantitative genotyping", description: "Distinguish heterozygotes from homozygotes" },
  { name: "Cre detection", description: "Confirm presence of Cre transgene" },
  { name: "Quality control", description: "Validated assays with appropriate controls" }
];

// SPF Health Status Features
const spfFeatures = [
  "Regular sentinel testing for common mouse pathogens",
  "Barrier housing with controlled access",
  "HEPA filtered air handling",
  "Autoclaved bedding and supplies",
  "Health certification provided with shipments"
];

// Animal Care Standards
const animalCareStandards = [
  "AAALAC accredited or equivalent standards",
  "Experienced animal care technicians",
  "Veterinary oversight and consultation",
  "Environmental enrichment",
  "Detailed health and breeding records"
];

// Conditional Knockout Breeding Table
const conditionalBreedingTable = [
  { cross: "Flox/+ × Cre/+", offspring: "Flox/+ Cre/+", purpose: "F1 compound heterozygotes" },
  { cross: "Flox/+ Cre/+ × Flox/Flox", offspring: "Flox/Flox Cre/+", purpose: "Experimental animals" },
  { cross: "Flox/Flox Cre-", offspring: "Flox/Flox Cre-", purpose: "Littermate controls" }
];

// Backcrossing Table
const backcrossingTable = [
  { generation: "N1", purity: "50%", time: "Contact us" },
  { generation: "N5", purity: "97%", time: "Contact us" },
  { generation: "N10", purity: "99.9% (congenic)", time: "Contact us" }
];

// Advantages
const resourceAdvantages = [
  "Free vivarium space for active experiments",
  "Reduce per diem costs for maintenance animals",
  "Avoid capital investment in breeding infrastructure",
  "Focus staff time on experimental work"
];

const expertiseAdvantages = [
  "Experienced breeding technicians",
  "Optimized breeding strategies",
  "Consistent genotyping quality",
  "Detailed record keeping",
  "Troubleshooting for difficult breeders"
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const saidTestimonial = getTestimonialById('said-uci')!;

const testimonials = [
  { quote: saidTestimonial.quote, name: formatAuthorWithCredentials(saidTestimonial), affiliation: saidTestimonial.affiliation },
];

// Related Links
const relatedServices = [
  { title: "Cryopreservation Services", href: "/cryopreservation-services" },
  { title: "Rederivation Services", href: "/rederivation-services" },
  { title: "Speed Expansion Breeding", href: "/speed-expansion-breeding" },
  { title: "Mouse Genotyping Service", href: "/mouse-genotyping-service" },
  { title: "Backcrossing Services", href: "/backcrossing-services" }
];

const relatedModels = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

// FAQ Data
const faqData = [
  {
    question: "What is included in colony management services?",
    answer: "Colony management includes breeding to maintain your mouse lines, genotyping to identify animals with desired alleles, health monitoring, cohort production for experiments, and reporting on colony status. Services can be customized based on your needs, from simple maintenance breeding to complex multi-allele cohort production."
  },
  {
    question: "How do you maintain SPF (specific pathogen free) health status?",
    answer: "Our facility uses strict barrier protocols including HEPA-filtered ventilated caging, autoclaved bedding and food, routine sentinel testing, and controlled access. All animals are tested for common murine pathogens. Rederivation services are available to clean up lines with compromised health status."
  },
  {
    question: "Can you manage breeding for conditional knockout experiments?",
    answer: "Yes. Conditional knockout breeding involves multiple crosses to combine floxed alleles with Cre drivers and generate experimental cohorts with proper controls. We design breeding schemes to minimize generations and maximize cohort yield, including littermate controls."
  },
  {
    question: "How do I transfer my mouse lines to your facility?",
    answer: "Lines can be transferred as live animals (with health certification) or as cryopreserved embryos or sperm. We coordinate with your institutional vivarium for shipping logistics. All incoming lines undergo quarantine and health testing before entering the main colony."
  }
];

export default function ColonyManagementServicesPage() {
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

        {/* Service Overview */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Service Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Colony Maintenance */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Colony Maintenance
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Ongoing colony maintenance keeps your mouse lines healthy and productive:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {maintenanceFeatures.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{feature.name}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{feature.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Breeding Expansion */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Breeding Expansion
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Rapid expansion services generate experimental cohorts efficiently:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {expansionFeatures.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.85rem' }}>{feature.name}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{feature.description}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complex Breeding */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Complex Breeding Schemes
                </h3>
                <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '15px' }}>
                  Multi allele breeding requires careful genetic management:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {complexBreedingSchemes.map((scheme, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{scheme.name}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{scheme.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Genotyping Services */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Genotyping Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Routine Genotyping
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Accurate genotyping is essential for colony management:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {genotypingServices.map((service, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                      <IconCheckCircle size={16} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{service.name}:</span>
                        <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{service.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Assay Development
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  For new alleles or complex genotypes, we develop and validate custom genotyping assays:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Primer design for targeted alleles</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Assay optimization and validation</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Positive and negative control establishment</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Protocol documentation for technology transfer</span>
                  </li>
                </ul>
                <Link
                  href="/mouse-genotyping-service"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                  style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Learn about Genotyping Services</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Breeding Tables */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Breeding Strategies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Conditional Knockout Breeding */}
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Conditional Knockout Breeding
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#0a253c' }}>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cross</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Offspring</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conditionalBreedingTable.map((row, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '10px 12px', color: '#008080', fontWeight: 500 }}>{row.cross}</td>
                          <td style={{ padding: '10px 12px', color: '#0a253c' }}>{row.offspring}</td>
                          <td style={{ padding: '10px 12px', color: '#555' }}>{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Backcrossing Programs */}
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Backcrossing Programs
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#0a253c' }}>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Generation</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Background Purity</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Time Required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backcrossingTable.map((row, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '10px 12px', color: '#008080', fontWeight: 500 }}>{row.generation}</td>
                          <td style={{ padding: '10px 12px', color: '#0a253c' }}>{row.purity}</td>
                          <td style={{ padding: '10px 12px', color: '#555' }}>{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link
                  href="/backcrossing-services"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                  style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Learn about Backcrossing Services</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Facility and Health Status */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Facility and Health Status
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SPF Health Status */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  SPF Health Status
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Our facility maintains SPF (specific pathogen free) health status:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {spfFeatures.map((feature, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Animal Care Standards */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Animal Care Standards
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Professional animal husbandry ensures colony health:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {animalCareStandards.map((standard, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{standard}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Advantages of Professional Colony Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Resource Efficiency */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Resource Efficiency
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Outsourcing colony management provides institutional benefits:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {resourceAdvantages.map((advantage, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#008080" />
                      <span style={{ color: '#333', fontSize: '.9rem' }}>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise and Consistency */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Expertise and Consistency
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Professional management provides:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {expertiseAdvantages.map((advantage, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#2384da" />
                      <span style={{ color: '#333', fontSize: '.9rem' }}>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
              What Researchers Say
            </h2>
            <div style={{
              display: testimonials.length === 1 ? 'block' : 'grid',
              gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined,
              gap: '24px',
            }}>
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
                    textAlign: testimonials.length === 1 ? 'center' : 'left',
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
              Discuss Your Colony Management Needs
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our team is ready to discuss colony management solutions for your research program. Whether you need ongoing maintenance of a single line or large scale cohort production across multiple genotypes, we can design a service package that meets your needs. Initial consultation is provided at no charge.
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

        {/* Breeding Resources Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Breeding Tools"
              description="Use our interactive Breeding Scheme Architect to plan your colony expansion strategy."
              resources={breedingResources}
              variant="banner"
            />
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

        {/* Lab Signals Newsletter CTA */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Colony Management Insights"
              description="Subscribe to Lab Signals for expert guides on breeding strategies, colony optimization, and genotyping best practices from our PhD scientists."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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
                  Model Types
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />
      </main>

      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Mouse Colony Management Services",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Professional mouse colony management services. Expert breeding, genotyping, and colony maintenance for genetically engineered mouse models. Since 1998.",
            "serviceType": "Colony Management Services"
          })
        }}
      />
    </div>
  );
}
