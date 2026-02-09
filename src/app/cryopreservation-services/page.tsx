'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconShield } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Line Preservation",
  title: "Mouse Cryopreservation Services",
  intro: "Since 1998, ingenious targeting laboratory has provided cryopreservation services to protect valuable genetically engineered mouse lines for researchers worldwide. Our cryopreservation expertise ensures your mouse models remain available for future research, protected against colony loss due to disease outbreak, breeding failure, or facility disruption.",
  description: "Cryopreservation converts living mouse lines into stable frozen archives that can be stored indefinitely and recovered when needed. Whether preserving sperm for rapid archiving or embryos for maximum genetic preservation, cryopreservation provides insurance for your research investment and enables efficient management of mouse model resources."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Sperm Cryopreservation Advantages
const spermAdvantages = [
  { name: "Speed", description: "Samples collected and frozen within days" },
  { name: "Efficiency", description: "Single male provides multiple preservation units" },
  { name: "Cost", description: "Lower cost than embryo cryopreservation" },
  { name: "Recovery", description: "IVF with wildtype oocytes regenerates line" }
];

// Embryo Cryopreservation Advantages
const embryoAdvantages = [
  { name: "Genetic preservation", description: "Both maternal and paternal genotypes preserved" },
  { name: "Homozygote recovery", description: "Frozen embryos can be homozygous" },
  { name: "Complex genotypes", description: "Multi allele combinations preserved intact" },
  { name: "Recovery", description: "Direct embryo transfer regenerates line" }
];

// IVF Recovery Steps
const ivfRecoverySteps = [
  "Thaw cryopreserved sperm samples",
  "Fertilize wildtype oocytes in vitro",
  "Transfer resulting embryos to pseudopregnant recipients",
  "Genotype offspring to identify carriers"
];

// Embryo Transfer Steps
const embryoTransferSteps = [
  "Thaw cryopreserved embryos",
  "Transfer to pseudopregnant recipients",
  "Pups born with preserved genotype",
  "No additional breeding required for genotype recovery"
];

// Protection Reasons
const protectionReasons = [
  { name: "Time", description: "Many months for model generation" },
  { name: "Cost", description: "Substantial project investment" },
  { name: "Expertise", description: "Scientific design and characterization" },
  { name: "Irreplaceable", description: "Unique alleles cannot be easily recreated" }
];

// Risk Factors
const riskFactors = [
  { name: "Disease outbreak", description: "Pathogen introduction can require colony elimination" },
  { name: "Breeding failure", description: "Lines can become infertile or lose vigor" },
  { name: "Facility disruption", description: "Equipment failure, natural disaster, or relocation" },
  { name: "Genetic drift", description: "Accumulated mutations over many generations" },
  { name: "Human error", description: "Breeding mistakes or colony mismanagement" }
];

// Resource Efficiency Benefits
const resourceBenefits = [
  { name: "Reduce vivarium costs", description: "Archive inactive lines instead of maintaining live colonies" },
  { name: "Free cage space", description: "Preserve lines not currently needed for experiments" },
  { name: "Maintain options", description: "Keep valuable lines available without ongoing per diem costs" },
  { name: "Share resources", description: "Distribute frozen samples to collaborators" }
];

// Storage Features
const storageFeatures = [
  "Samples remain viable indefinitely at this temperature",
  "No biological activity or degradation occurs",
  "Periodic liquid nitrogen replenishment maintains temperature",
  "Automated monitoring systems alert to any issues"
];

// Redundant Storage Features
const redundantFeatures = [
  "Store backup samples at separate location",
  "Protection against site specific disasters",
  "Multiple recovery options if primary archive is compromised"
];

// Sperm vs Embryo Comparison Tables
const spermComparisonTable = [
  { advantage: "Rapid turnaround", consideration: "Recovery requires IVF" },
  { advantage: "Lower cost", consideration: "Offspring are heterozygous" },
  { advantage: "Minimal animal use", consideration: "Female genotype from oocyte donor" },
  { advantage: "Multiple units from one male", consideration: "Some strains freeze less efficiently" }
];

const embryoComparisonTable = [
  { advantage: "Complete genotype preservation", consideration: "Higher cost than sperm" },
  { advantage: "Homozygotes directly recovered", consideration: "Requires more donor animals" },
  { advantage: "Complex alleles preserved", consideration: "Longer preparation time" },
  { advantage: "Higher recovery rates for some strains", consideration: "Embryo collection scheduling" }
];

// Method Selection Guide
const methodSelectionGuide = [
  { situation: "Routine backup of heterozygous line", method: "Sperm cryopreservation" },
  { situation: "Archiving homozygous line", method: "Embryo cryopreservation" },
  { situation: "Complex multi allele genotype", method: "Embryo cryopreservation" },
  { situation: "Rapid archiving needed", method: "Sperm cryopreservation" },
  { situation: "Maximum genetic security", method: "Both sperm and embryo" },
  { situation: "Cost sensitive archiving", method: "Sperm cryopreservation" }
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
  { title: "Colony Management Services", href: "/colony-management-services" },
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
    question: "What is the difference between sperm cryopreservation and embryo cryopreservation?",
    answer: "Sperm cryopreservation freezes sperm from male mice. To recover the line, frozen sperm is used for IVF with wildtype oocytes. Embryo cryopreservation freezes two-cell embryos. Recovery involves thawing and transferring embryos to surrogate females. Sperm is faster and less expensive; embryos preserve maternal genetics and produce animals more quickly."
  },
  {
    question: "How long can frozen samples remain viable?",
    answer: "Samples stored in liquid nitrogen at -196°C remain viable indefinitely. There is no biological activity or degradation at this temperature. Properly stored samples have been successfully recovered after decades of storage."
  },
  {
    question: "How many straws or embryos should I archive?",
    answer: "For adequate insurance, we typically recommend archiving sperm from 2-3 males (yielding 10-20 straws) or 100-200 embryos. This provides multiple recovery attempts if needed. For particularly valuable lines, redundant storage at geographically separate locations is recommended."
  },
  {
    question: "How long does it take to recover a line from cryopreserved material?",
    answer: "Recovery timelines depend on the preservation method, recipient availability, and embryo/sperm quality. Embryo recovery is generally faster than sperm recovery via IVF. Contact us for current recovery timeline estimates based on your specific situation."
  },
  {
    question: "Can you cryopreserve lines with complex genotypes (multiple alleles)?",
    answer: "Yes. For lines with multiple alleles or complex genotypes, embryo cryopreservation is preferred because it preserves the exact genotype. Sperm cryopreservation only preserves the male genome and requires breeding to reconstruct complex genotypes."
  }
];

export default function CryopreservationServicesPage() {
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
                  <IconShield size={16} color="white" />
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

        {/* Cryopreservation Options */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Cryopreservation Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sperm Cryopreservation */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Sperm Cryopreservation
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Sperm freezing provides rapid, cost effective line preservation:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {spermAdvantages.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: '#555', fontSize: '.85rem', marginTop: '15px', fontStyle: 'italic' }}>
                  Sperm cryopreservation is ideal for routine archiving of established lines and backup preservation of active breeding colonies.
                </p>
              </div>

              {/* Embryo Cryopreservation */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Embryo Cryopreservation
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Embryo freezing preserves complete genotypes including homozygotes and complex allele combinations:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {embryoAdvantages.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                      <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: '#555', fontSize: '.85rem', marginTop: '15px', fontStyle: 'italic' }}>
                  Embryo cryopreservation is preferred when preserving homozygous lines, compound mutants, or genotypes that would be difficult to regenerate through breeding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Choosing Between Methods */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Choosing Between Methods
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Sperm Comparison */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Sperm Cryopreservation
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#0a253c', fontWeight: 600 }}>Advantage</th>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#0a253c', fontWeight: 600 }}>Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spermComparisonTable.map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '10px', color: '#008080' }}>{row.advantage}</td>
                        <td style={{ padding: '10px', color: '#555' }}>{row.consideration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Embryo Comparison */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Embryo Cryopreservation
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#0a253c', fontWeight: 600 }}>Advantage</th>
                      <th style={{ padding: '10px', textAlign: 'left', color: '#0a253c', fontWeight: 600 }}>Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {embryoComparisonTable.map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '10px', color: '#2384da' }}>{row.advantage}</td>
                        <td style={{ padding: '10px', color: '#555' }}>{row.consideration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Method Selection Guide */}
            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                Method Selection Guide
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Situation</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Recommended Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {methodSelectionGuide.map((row, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 15px', color: '#0a253c' }}>{row.situation}</td>
                        <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 500 }}>{row.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Services */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Recovery Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* IVF Recovery */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  IVF Recovery (from Sperm)
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  In vitro fertilization regenerates lines from cryopreserved sperm:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {ivfRecoverySteps.map((step, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{step}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.8rem', marginTop: '15px', fontStyle: 'italic' }}>
                  IVF recovery typically produces heterozygous offspring that can be intercrossed to regenerate homozygotes if needed.
                </p>
              </div>

              {/* Embryo Transfer Recovery */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Embryo Transfer Recovery
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Direct embryo transfer regenerates lines from cryopreserved embryos:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {embryoTransferSteps.map((step, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="white" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{step}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.8rem', marginTop: '15px', fontStyle: 'italic' }}>
                  Embryo transfer recovery is straightforward and regenerates the exact genotype that was frozen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Cryopreserve */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Why Cryopreserve
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Protect Research Investment */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Protect Research Investment
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Genetically engineered mouse models represent significant investment:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {protectionReasons.map((reason, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{reason.name}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{reason.description}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: '#555', fontSize: '.85rem', marginTop: '10px', fontStyle: 'italic' }}>
                  Cryopreservation protects this investment against unforeseen loss.
                </p>
              </div>

              {/* Risk Mitigation */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Risk Mitigation
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Live colonies face multiple risks:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {riskFactors.map((risk, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#2384da', fontWeight: 600, fontSize: '.85rem' }}>{risk.name}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{risk.description}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ color: '#555', fontSize: '.85rem', marginTop: '10px', fontStyle: 'italic' }}>
                  Frozen archives provide recovery options when live colonies are compromised.
                </p>
              </div>

              {/* Resource Efficiency */}
              <div className="animate-in hover-card hover-card-teal group" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 className="card-title transition-colors duration-300 group-hover:text-teal-600" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Resource Efficiency
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Cryopreservation enables efficient resource management:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {resourceBenefits.map((benefit, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#008080', fontWeight: 600, fontSize: '.85rem' }}>{benefit.name}:</span>
                      <span style={{ color: '#555', fontSize: '.8rem', marginLeft: '5px' }}>{benefit.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Storage and Security */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Storage and Security
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Liquid Nitrogen Storage */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Liquid Nitrogen Storage
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Cryopreserved samples are maintained in liquid nitrogen at minus 196 degrees Celsius:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {storageFeatures.map((feature, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#008080" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Redundant Storage */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Redundant Storage
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Critical samples benefit from geographic redundancy:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {redundantFeatures.map((feature, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#008080" />
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inventory Management */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Inventory Management
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Professional inventory tracking ensures sample accessibility:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>Detailed records of all stored samples</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>Location tracking within storage system</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>Sample history and recovery documentation</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.85rem' }}>Regular inventory audits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Integration with Model Generation */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Integration with Model Generation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Archiving New Models */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Archiving New Models
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Cryopreservation integrates seamlessly with model generation projects:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Archive germline confirmed founders as part of project completion</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Preserve characterized ES cell clones for future use</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Create backup before shipping live animals</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#008080" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Establish archive before colony expansion</span>
                  </li>
                </ul>
              </div>

              {/* Ongoing Colony Support */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Ongoing Colony Support
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Cryopreservation supports active research programs:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Periodic backup of valuable breeding lines</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Archive before planned colony reduction</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Preserve intermediate genotypes during complex breeding</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <IconCheckCircle size={16} color="#2384da" />
                    <span style={{ color: '#333', fontSize: '.9rem' }}>Create distribution archives for collaborator requests</span>
                  </li>
                </ul>
                <Link
                  href="/colony-management-services"
                  className="inline-flex items-center gap-2 transition-colors duration-300 mt-4"
                  style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                >
                  <span>Learn about Colony Management Services</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        {/* CTA Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Protect Your Mouse Models
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our team is ready to discuss cryopreservation options for your mouse lines. Whether you need routine archiving of a single line or comprehensive preservation of a large model collection, we can design a preservation strategy that protects your research investment. Initial consultation is provided at no charge.
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
            <LabSignalsSignup title="Cryopreservation Service Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Post Project Services
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
      </main>

      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Mouse Cryopreservation Services",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Mouse cryopreservation services for long term line preservation. Sperm and embryo freezing with validated recovery. Protect your mouse models since 1998.",
            "serviceType": "Cryopreservation Services"
          })
        }}
      />
    </div>
  );
}
