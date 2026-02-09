'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconShield } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Respiratory Disease Models",
  title: "Allergy Asthma Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported allergy and asthma research with custom mouse models enabling mechanistic studies of airway inflammation, allergic responses, and therapeutic interventions. Our allergy and asthma models have contributed to research on Th2 immune responses, airway remodeling, and anti inflammatory therapeutics.",
  description: "Allergy and asthma mouse models provide essential platforms for investigating the molecular pathways underlying allergic inflammation, testing hypotheses about immune cell contributions, and developing therapies for respiratory diseases affecting millions of patients worldwide."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Th2 Immune Response Features
const th2Features = [
  "IL4, IL5, IL13 production",
  "Eosinophil recruitment",
  "IgE production",
  "Airway hyperresponsiveness"
];

// Airway Remodeling Features
const remodelingFeatures = [
  "Epithelial changes",
  "Smooth muscle hypertrophy",
  "Mucus production",
  "Basement membrane thickening"
];

// Induced Asthma Models
const inducedModels = [
  { name: "OVA (ovalbumin) sensitization", description: "Classic allergen sensitization model for airway inflammation studies" },
  { name: "House dust mite models", description: "Clinically relevant allergen for chronic airway disease" },
  { name: "Cockroach allergen models", description: "Urban asthma allergen exposure models" },
  { name: "Pollen allergen models", description: "Seasonal allergy and asthma research" }
];

// Genetic Models
const geneticModels = [
  { name: "Th2 cytokine knockouts", description: "Study cytokine contributions to allergic inflammation" },
  { name: "Transcription factor models", description: "Investigate transcriptional regulation of allergic responses" },
  { name: "Receptor modifications", description: "Study receptor signaling in airway disease" },
  { name: "Signaling pathway models", description: "Dissect intracellular pathways driving allergic responses" }
];

// Therapeutic Testing Applications
const therapeuticApplications = [
  { name: "Corticosteroid efficacy", description: "Evaluate anti-inflammatory corticosteroid responses" },
  { name: "Biologic therapeutics", description: "Test monoclonal antibodies targeting cytokines and receptors" },
  { name: "Small molecule inhibitors", description: "Assess novel small molecule drug candidates" },
  { name: "Combination therapies", description: "Evaluate multi-target therapeutic approaches" }
];

// Mechanism Study Applications
const mechanismStudies = [
  { name: "Immune cell contributions", description: "Define roles of specific immune populations" },
  { name: "Cytokine networks", description: "Map cytokine signaling in allergic inflammation" },
  { name: "Airway remodeling mechanisms", description: "Study structural changes in chronic disease" },
  { name: "Genetic susceptibility", description: "Investigate genetic risk factors for allergic disease" }
];

// Cre Drivers for Lung Studies
const creDrivers = [
  { driver: "CC10-Cre", target: "Clara cells", application: "Airway epithelium studies" },
  { driver: "SPC-Cre", target: "Type II pneumocytes", application: "Alveolar epithelium targeting" },
  { driver: "α-SMA-Cre", target: "Smooth muscle", application: "Airway smooth muscle function" },
  { driver: "Tie2-Cre", target: "Endothelial cells", application: "Vascular remodeling studies" }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const bassonTestimonial = getTestimonialById('basson-kings')!;

const testimonials = [
  { quote: bassonTestimonial.quote, name: formatAuthorWithCredentials(bassonTestimonial), affiliation: bassonTestimonial.affiliation },
];

// Related Links
const relatedModels = [
  { title: "Immunology Mouse Models", href: "/immunology-mouse-models" },
  { title: "Autoimmune Disease Mice", href: "/autoimmune-disease-mice" },
  { title: "Inflammatory Disease Mice", href: "/inflammatory-disease-mice" }
];

const relatedResources = [
  { title: "Therapeutic Areas", href: "/therapeutic-areas" },
];

// FAQ Data
const faqData = [
  {
    question: "What mouse models are used for asthma research?",
    answer: "Common asthma models include OVA-induced allergic airway inflammation, house dust mite models, and genetic models with conditional deletion of genes in lung epithelial cells, smooth muscle cells, or immune cells. Conditional knockout approaches enable tissue-specific study of asthma mechanisms without systemic effects."
  },
  {
    question: "Can you create models for specific asthma phenotypes?",
    answer: "Yes. We can design conditional knockout or knockin models targeting genes involved in airway hyperresponsiveness, mucus production, airway remodeling, or Th2 inflammation. Models can be combined with allergen challenge protocols to study specific asthma phenotypes."
  },
  {
    question: "What Cre drivers are appropriate for lung-specific studies?",
    answer: "Common lung Cre drivers include CC10-Cre (Clara cells), SPC-Cre (type II pneumocytes), alpha-SMA-Cre (smooth muscle), and Tie2-Cre (endothelial cells). Selection depends on whether you're studying airway epithelium, smooth muscle function, vascular remodeling, or immune cell recruitment."
  },
  {
    question: "How do you model allergic sensitization in mice?",
    answer: "Allergic sensitization is typically modeled through intranasal or intraperitoneal administration of allergens (OVA, house dust mite extract) with adjuvants, followed by repeated airway challenge. Genetic models can enhance susceptibility by modifying immune or epithelial barrier function."
  }
];

export default function AllergyAsthmaMouseModelsPage() {
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

        {/* Disease Mechanisms */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Allergy and Asthma Disease Mechanisms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Th2 Immune Responses */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Th2 Immune Responses
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Allergic asthma involves Th2 mediated inflammation:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {th2Features.map((feature, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#008080" />
                      <span style={{ color: '#333', fontSize: '.9rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Airway Remodeling */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Airway Remodeling
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Chronic inflammation leads to:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {remodelingFeatures.map((feature, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <IconCheckCircle size={16} color="#2384da" />
                      <span style={{ color: '#333', fontSize: '.9rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Model Types */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Model Types
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Induced Asthma Models */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Induced Asthma Models
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Models using allergen sensitization:
                </p>
                <div className="space-y-3">
                  {inducedModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Genetic Models */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Genetic Models
                </h3>
                <p style={{ color: '#555', fontSize: '.9rem', marginBottom: '15px' }}>
                  Gene targeted models for asthma research:
                </p>
                <div className="space-y-3">
                  {geneticModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cre Drivers Table */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '25px' }}>
              Lung-Specific Cre Drivers
            </h2>

            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Target Cell Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Application</th>
                  </tr>
                </thead>
                <tbody>
                  {creDrivers.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 500 }}>{row.driver}</td>
                      <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.target}</td>
                      <td style={{ padding: '12px 15px', color: '#555' }}>{row.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Therapeutic Testing */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Therapeutic Testing
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Evaluate anti inflammatory agents:
                </p>
                <div className="space-y-3">
                  {therapeuticApplications.map((app, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <IconCheckCircle size={16} color="white" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <span style={{ color: 'white', fontWeight: 500, fontSize: '.85rem' }}>{app.name}:</span>
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{app.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mechanism Studies */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Mechanism Studies
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', marginBottom: '15px' }}>
                  Investigate disease pathways:
                </p>
                <div className="space-y-3">
                  {mechanismStudies.map((study, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <IconCheckCircle size={16} color="white" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <span style={{ color: 'white', fontWeight: 500, fontSize: '.85rem' }}>{study.name}:</span>
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginLeft: '5px' }}>{study.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
              Request Allergy and Asthma Models
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Contact us to discuss allergy and asthma mouse models for your research. Our scientific team provides complimentary consultation to help you design the optimal model for your respiratory disease research goals.
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
                  Related Models
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

              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Resources
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
            "name": "Allergy Asthma Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom allergy and asthma mouse models for respiratory disease research. Airway inflammation, allergic responses, and therapeutic testing platforms.",
            "serviceType": "Allergy Asthma Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
