/**
 * Why Choose ingenious targeting laboratory Page
 * Built from approved content: src/content/pages/why-choose-itl.md
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconCheckCircle, IconChevronRight, IconAward, IconUsers, IconGlobe } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Import verified testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaief = getTestimonialById('dunaief-upenn');
const basson = getTestimonialById('roth-upenn');

// Hero Data
const heroData = {
  badge: "28 Years of Excellence",
  title: "Why Choose ingenious targeting laboratory",
  intro: "Selecting a mouse model provider is a consequential decision that affects research timelines, budgets, and scientific outcomes. ingenious targeting laboratory has earned the trust of researchers worldwide through 28 years of consistent performance, scientific expertise, and commitment to project success.",
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 28, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Key Differentiators
const differentiators = [
  {
    title: "Proven Track Record",
    icon: IconAward,
    points: [
      "28 years of exclusive focus on custom mouse model generation",
      "2,500+ custom projects completed across every model type",
      "800+ peer reviewed publications in Nature, Cell, Science",
      "Clients worldwide across academic and industry sectors"
    ]
  },
  {
    title: "Scientific Expertise",
    icon: IconUsers,
    points: [
      "Specialists in molecular biology, mouse genetics, and biomedical research",
      "Active optimization of allele design for your specific application",
      "Deep experience across all model types and therapeutic areas",
      "Creative solutions to complex targeting problems"
    ]
  },
  {
    title: "Comprehensive Service",
    icon: IconGlobe,
    points: [
      "End to end capability from consultation through delivery",
      "Flexible engagement with partial services available",
      "Colony management, cryopreservation, and rederivation",
      "Genotyping and phenotyping support"
    ]
  }
];

// Quality Standards
const qualityStandards = [
  {
    title: "AAALAC Accreditation",
    description: "Animal facilities meet the highest standards for animal care and welfare"
  },
  {
    title: "Documented Processes",
    description: "Standardized protocols and quality control checkpoints ensure consistent results"
  },
  {
    title: "Pre-Germline Characterization",
    description: "Validates allele structure before mouse generation to prevent downstream surprises"
  },
  {
    title: "Transparent Communication",
    description: "Regular milestone notifications and responsive answers throughout your project"
  }
];

// Comparison Table
const comparisonFactors = [
  { factor: "Experience", why: "Volume of completed projects predicts problem solving capability" },
  { factor: "Characterization", why: "Pre germline verification prevents downstream surprises" },
  { factor: "Communication", why: "Responsive updates reduce uncertainty and enable planning" },
  { factor: "Flexibility", why: "Ability to adjust approaches when challenges arise" },
  { factor: "Support", why: "Ongoing assistance after project completion" },
  { factor: "Track Record", why: "Publications demonstrate model utility in real research" }
];

// FAQ Data
const faqData = [
  { 
    question: "What makes ingenious targeting laboratory different from other mouse model providers?", 
    answer: "ingenious targeting laboratory has 28 years of exclusive focus on custom mouse model generation, 2,500+ completed projects, 800+ peer-reviewed publications, and pre-germline characterization that validates allele structure before mouse generation. This sustained focus has built institutional knowledge and refined processes that translate directly to project success." 
  },
  { 
    question: "How does ingenious targeting laboratory's experience benefit my project?", 
    answer: "ingenious targeting laboratory's 2,500+ projects across every model type and therapeutic area mean we have likely encountered challenges similar to yours and developed effective solutions. Our scientific team includes specialists in molecular biology, mouse genetics, and biomedical research who actively optimize allele design, exon selection, and cassette configuration for your specific research application." 
  },
  { 
    question: "What support does ingenious targeting laboratory provide after model delivery?", 
    answer: "ingenious targeting laboratory provides ongoing support including colony management services, cryopreservation for line archival, rederivation for health status upgrade, and technical consultation. We work with you throughout your research program to ensure model performance and address any questions that arise." 
  },
  { 
    question: "How do I get started with a custom mouse model project?", 
    answer: "Contact ingenious targeting laboratory through our request quote form or schedule a consultation. Our scientific team provides complimentary consultation to discuss your research goals, recommend optimal targeting strategies, and develop a project proposal. We work with you throughout the project to ensure the model meets your research needs." 
  }
];

export default function WhyChooseItlPage() {
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
          
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div 
              className="hero-animate"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(0,212,212,0.2)',
                border: '1px solid rgba(0,212,212,0.4)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px'
              }}
            >
              <IconAward size={16} color="#00d4d4" />
              <span style={{ color: '#00d4d4', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            
            <h1 
              className="hero-animate"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
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
                fontSize: '1.05rem',
                fontWeight: 400,
                lineHeight: '1.7',
                marginBottom: '25px',
                maxWidth: '800px'
              }}
            >
              {heroData.intro}
            </p>
            
            <div className="hero-animate flex flex-wrap gap-4">
              <Link 
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span>Request a Quote</span>
                <IconChevronRight size={16} />
              </Link>
              <Link 
                href="/testimonials"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span>Read Testimonials</span>
                <IconChevronRight size={16} />
              </Link>
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

        {/* Key Differentiators */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {differentiators.map((diff, index) => {
                const Icon = diff.icon;
                return (
                  <div key={index} className="animate-in">
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: 'rgba(0,128,128,0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <Icon size={28} color="#008080" />
                    </div>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#0a253c',
                      marginBottom: '16px'
                    }}>
                      {diff.title}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {diff.points.map((point, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '12px'
                        }}>
                          <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ fontSize: '.9rem', color: '#666', lineHeight: '1.5' }}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section style={{ backgroundColor: '#f8fafc', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Quality Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="animate-in" style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '28px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#0a253c',
                    marginBottom: '8px'
                  }}>
                    {standard.title}
                  </h3>
                  <p style={{
                    fontSize: '.9rem',
                    color: '#666',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {standard.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Comparison Considerations
            </h2>
            <p className="animate-in" style={{
              fontSize: '.95rem',
              color: '#666',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              When evaluating mouse model providers, consider these factors:
            </p>
            <div className="animate-in" style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0a253c' }}>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '.9rem',
                      fontWeight: 600,
                      color: 'white'
                    }}>
                      Factor
                    </th>
                    <th style={{
                      padding: '16px 20px',
                      textAlign: 'left',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '.9rem',
                      fontWeight: 600,
                      color: 'white'
                    }}>
                      Why It Matters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFactors.map((item, index) => (
                    <tr key={index} style={{
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <td style={{
                        padding: '16px 20px',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '.9rem',
                        fontWeight: 600,
                        color: '#0a253c'
                      }}>
                        {item.factor}
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        fontSize: '.9rem',
                        color: '#666',
                        lineHeight: '1.5'
                      }}>
                        {item.why}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Testimonials */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              What Researchers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                dunaief ? { quote: dunaief.quote, name: formatAuthorWithCredentials(dunaief), affiliation: dunaief.affiliation } : null,
                basson ? { quote: basson.quote, name: formatAuthorWithCredentials(basson), affiliation: basson.affiliation } : null
              ].filter((t): t is {quote: string; name: string; affiliation: string} => t !== null).map((testimonial, index) => (
                <div key={index} className="animate-in" style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: '1.7',
                    fontStyle: 'italic',
                    marginBottom: '20px'
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p style={{
                    fontSize: '.9rem',
                    fontWeight: 600,
                    color: '#00d4d4',
                    marginBottom: '4px'
                  }}>
                    — {testimonial.name}
                  </p>
                  <p style={{
                    fontSize: '.85rem',
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    {testimonial.affiliation}
                  </p>
                </div>
              ))}
            </div>
            <div className="animate-in text-center" style={{ marginTop: '32px' }}>
              <Link
                href="/testimonials"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#00d4d4',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                View All Testimonials
                <IconChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#0a253c',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Lab Signals Newsletter */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Expert Research Insights Delivered"
              description="Join researchers worldwide who receive cutting-edge insights, breakthrough studies, and practical guidance from our team of PhD scientists. Delivered biweekly to your inbox."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '16px'
            }}>
              Experience the ingenious Difference
            </h2>
            <p className="animate-in" style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: '1.7'
            }}>
              Start your next mouse model project with a team you can trust.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
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
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Request a Quote
                <IconChevronRight size={16} />
              </Link>
              <Link 
                href="/publications"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                View Publications
                <IconChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      
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
                  "name": "Why Choose ingenious targeting laboratory",
                  "item": "https://www.genetargeting.com/why-choose-itl"
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
