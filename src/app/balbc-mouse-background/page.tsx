'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconFlask, IconSettings, IconChevronRight, IconCheckCircle, IconShield, IconTarget } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';

// Hero Data
const heroData = {
  badge: "Strain Background",
  title: "BALB/c Mouse Background",
  intro: "Since 1998, ingenious targeting laboratory has generated custom mouse models on multiple strain backgrounds including BALB/c. Understanding strain specific characteristics is essential for selecting the optimal genetic background for your research.",
  description: "BALB/c mice are particularly valuable for immunological studies, syngeneic tumor models, and research where the strain's unique characteristics provide experimental advantages. Whether you are generating new knockout or knockin models on BALB/c background or backcrossing existing models onto this strain, ingenious targeting laboratory provides the expertise to deliver well characterized models suited to your research needs."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Strain Characteristics Data
const characteristicsData = {
  title: "BALB/c Strain Characteristics",
  sections: [
    {
      title: "Strain Origin and History",
      description: "BALB/c is one of the oldest and most widely used inbred mouse strains, developed by Halsey Bagg in 1913 and inbred by George Snell beginning in 1932. The albino (c) designation reflects the tyrosinase mutation that eliminates pigmentation.",
      highlight: "BALB/c has been inbred for over 200 generations, making it highly genetically uniform and reproducible across experiments."
    },
    {
      title: "Physical Characteristics",
      description: "BALB/c mice are albino with pink eyes and white fur. They are docile and easy to handle, making them suitable for studies requiring regular manipulation. Adults typically weigh 25 to 30 grams with relatively low body fat compared to C57BL/6."
    },
    {
      title: "Reproductive Characteristics",
      description: "BALB/c females are good mothers with typical litter sizes of 5 to 8 pups. The strain breeds reliably and is compatible with standard breeding protocols for genetically modified mice."
    }
  ]
};

// Immunological Characteristics Data
const immunologicalData = {
  title: "Immunological Characteristics",
  sections: [
    {
      title: "Th2 Biased Immune Response",
      description: "BALB/c mice show a tendency toward Th2 type immune responses, characterized by IL4, IL5, and IL13 production. This makes them particularly useful for studying allergic diseases, asthma, and parasitic infections.",
      note: "In contrast, C57BL/6 mice tend toward Th1 responses. This fundamental difference in immune bias should inform strain selection for immunology research."
    },
    {
      title: "Antibody Production",
      description: "BALB/c mice are widely used for monoclonal antibody production due to their ability to generate strong antibody responses. The strain is the source of myeloma cell lines used in hybridoma technology."
    },
    {
      title: "Complement System",
      description: "BALB/c mice have a functional complement system, making them suitable for studies of complement mediated immunity and inflammation."
    }
  ]
};

// Research Applications Data
const applicationsData = {
  title: "Research Applications",
  applications: [
    {
      title: "Syngeneic Tumor Models",
      description: "Multiple tumor cell lines are derived from BALB/c background and are compatible for syngeneic transplantation:",
      points: [
        "CT26 (colon carcinoma)",
        "4T1 (breast carcinoma)",
        "RENCA (renal carcinoma)",
        "A20 (lymphoma)"
      ],
      note: "These models enable immunotherapy studies in immunocompetent mice with functional immune systems."
    },
    {
      title: "Allergy and Asthma Research",
      description: "The Th2 bias of BALB/c mice makes them particularly suitable for modeling allergic airway disease, atopic dermatitis, and other allergic conditions."
    },
    {
      title: "Infectious Disease",
      description: "BALB/c mice are commonly used in infectious disease research. Their susceptibility or resistance to various pathogens is well characterized, enabling reproducible infection studies."
    },
    {
      title: "Autoimmune Disease",
      description: "BALB/c mice are susceptible to certain autoimmune phenotypes and are used in models of lupus, arthritis, and other autoimmune conditions, often in combination with genetic modifications."
    }
  ]
};

// Gene Targeting Data
const geneTargetingData = {
  title: "Gene Targeting on BALB/c Background",
  sections: [
    {
      title: "Strain Availability",
      description: "For more complex targeting projects, BALB/c derived ES cells can be used for direct targeting on this background. For simpler project types, direct injection into BALB/c embryos is possible."
    },
    {
      title: "Backcrossing Strategy",
      description: "Models initially generated on other backgrounds can be backcrossed onto BALB/c. Speed congenic approaches using marker assisted selection can accelerate establishment of BALB/c congenic lines.",
      link: { href: "/support-services", label: "Backcrossing Services" }
    },
    {
      title: "Background Considerations",
      intro: "When planning gene targeting on BALB/c background, consider the strain's specific characteristics:",
      advantages: [
        "Th2 immune bias for allergy and parasitology",
        "Syngeneic tumor model compatibility",
        "Docile temperament",
        "Extensive historical data"
      ],
      considerations: [
        "Some phenotypes may differ from C57BL/6",
        "Fewer characterized Cre driver lines available on pure BALB/c background"
      ]
    }
  ]
};

// Comparison Data
const comparisonData = {
  title: "BALB/c vs C57BL/6",
  intro: "Understanding differences between BALB/c and C57BL/6 helps guide strain selection:",
  comparisons: [
    {
      title: "Immune Response",
      description: "BALB/c shows Th2 bias while C57BL/6 shows Th1 bias. This affects susceptibility to infections, vaccine responses, and autoimmune phenotypes."
    },
    {
      title: "Susceptibility to Disease",
      description: "The strains differ in susceptibility to many disease models. BALB/c is more susceptible to Leishmania major infection while C57BL/6 is resistant. C57BL/6 is more susceptible to diet induced obesity."
    },
    {
      title: "Behavioral Differences",
      description: "BALB/c mice show higher anxiety-like behaviors than C57BL/6 in standard behavioral tests. This should be considered for neurobehavioral studies."
    },
    {
      title: "Metabolic Differences",
      description: "C57BL/6 is more susceptible to diet induced obesity and metabolic dysfunction. BALB/c is relatively resistant to high fat diet induced weight gain."
    }
  ]
};

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { FEATURED_TESTIMONIALS, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonialsData = FEATURED_TESTIMONIALS.map(t => ({
  quote: t.quote,
  author: formatAuthorWithCredentials(t),
  affiliation: t.affiliation,
}));

// FAQ Data
const faqData = [
  {
    question: "What are the key differences between BALB/c and C57BL/6 backgrounds?",
    answer: "BALB/c shows Th2 immune bias while C57BL/6 shows Th1 bias, affecting susceptibility to infections and autoimmune phenotypes. BALB/c is more susceptible to Leishmania major infection; C57BL/6 is resistant. C57BL/6 is more susceptible to diet-induced obesity. BALB/c shows higher anxiety-like behaviors in behavioral tests."
  },
  {
    question: "When should I choose BALB/c over C57BL/6 for my model?",
    answer: "Choose BALB/c for Th2-biased immune responses, infectious disease models where BALB/c susceptibility is advantageous, or when matching existing BALB/c-based research protocols. Choose C57BL/6 for metabolic studies, standard behavioral assays, or when using C57BL/6N ES cells for targeting."
  },
  {
    question: "Can I backcross my existing model to BALB/c background?",
    answer: "Yes. ingenious targeting laboratory provides backcrossing services to transfer models to BALB/c or other backgrounds. Contact us for more information."
  },
  {
    question: "How do strain backgrounds affect model phenotypes?",
    answer: "Genetic background profoundly influences phenotypes. The same genetic modification can show different severity, penetrance, or even opposite effects on different backgrounds. Modifier genes on different backgrounds can mask or enhance phenotypes. Consistent background use within studies is critical for reproducibility."
  },
  {
    question: "What is involved in generating a model on BALB/c background?",
    answer: "Custom mouse model generation timelines vary based on project complexity, model type, and specific requirements. Contact us for a detailed timeline estimate tailored to your project."
  }
];

// Related Links Data
const relatedLinksData = {
  strainInfo: [
    { href: "/c57bl6-mouse-background", label: "C57BL/6 Mouse Background" }
  ],
  services: [
    { href: "/support-services", label: "Backcrossing Services" },
    { href: "/colony-management-services", label: "Colony Management Services" },
    { href: "/cryopreservation-services", label: "Cryopreservation Services" }
  ]
};

// CTA Data
const ctaData = {
  title: "Start Your Project",
  description: "Ready to discuss custom mouse models on BALB/c or other strain backgrounds? Our scientific team provides complimentary consultation to help you select the optimal genetic background for your research.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function BALBcMouseBackgroundPage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Hero animations
      const heroElements = document.querySelectorAll('.hero-animate');
      heroElements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power2.out" }
        );
      });

      // Scroll-triggered animations
      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    };

    initGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "name": "BALB/c Mouse Background",
            "description": "BALB/c mouse strain characteristics, immunological applications, and gene targeting considerations. Custom mouse models on BALB/c background since 1998.",
            "publisher": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory",
              "url": "https://www.genetargeting.com"
            }
          })
        }}
      />
      <UXUIDCNavigation />
      <main ref={animatedElementsRef}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05
          }}>
            <div style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
              top: '-200px',
              right: '-200px'
            }} />
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="hero-animate" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <IconDNA size={14} color="#00d4d4" />
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            <h1 className="hero-animate" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: 1.2
            }}>
              {heroData.title}
            </h1>
            <p className="hero-animate" style={{
              fontSize: '1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '16px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            <p className="hero-animate" style={{
              fontSize: '.9rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.description}
            </p>
            <div className="hero-animate" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#008080',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s ease'
              }}>
                Request a Quote
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
              <Link href="/c57bl6-mouse-background" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'border-color 0.2s ease'
              }}>
                Compare C57BL/6
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {statsData.map((stat, index) => (
                <div key={index} className="animate-in" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#008080', marginBottom: '4px' }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '.85rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strain Characteristics Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {characteristicsData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {characteristicsData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                    {section.description}
                  </p>
                  {section.highlight && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5, background: 'rgba(0,128,128,0.05)', padding: '12px', borderRadius: '6px' }}>
                      {section.highlight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Immunological Characteristics Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {immunologicalData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {immunologicalData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconShield size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {section.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                    {section.description}
                  </p>
                  {section.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5 }}>
                      {section.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Applications Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {applicationsData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {applicationsData.applications.map((app, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #00d4d4'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconFlask size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {app.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                    {app.description}
                  </p>
                  {app.points && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px 0' }}>
                      {app.points.map((point, pIndex) => (
                        <li key={pIndex} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '.85rem',
                          color: '#666',
                          marginBottom: '6px',
                          lineHeight: 1.5
                        }}>
                          <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  {app.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5 }}>
                      {app.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gene Targeting Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {geneTargetingData.title}
            </h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {geneTargetingData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconSettings size={24} color="#008080" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '12px'
                      }}>
                        {section.title}
                      </h3>
                      {section.description && (
                        <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                          {section.description}
                        </p>
                      )}
                      {section.intro && (
                        <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                          {section.intro}
                        </p>
                      )}
                      {section.advantages && (
                        <div style={{ marginBottom: '12px' }}>
                          <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 600, marginBottom: '8px' }}>Advantages:</p>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {section.advantages.map((advantage, aIndex) => (
                              <li key={aIndex} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                fontSize: '.85rem',
                                color: '#666',
                                marginBottom: '4px',
                                lineHeight: 1.5
                              }}>
                                <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section.considerations && (
                        <div>
                          <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 600, marginBottom: '8px' }}>Considerations:</p>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {section.considerations.map((consideration, cIndex) => (
                              <li key={cIndex} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                fontSize: '.85rem',
                                color: '#666',
                                marginBottom: '4px',
                                lineHeight: 1.5
                              }}>
                                <IconTarget size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                                {consideration}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section.link && (
                        <Link href={section.link.href} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#008080',
                          fontSize: '.85rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          marginTop: '12px'
                        }}>
                          {section.link.label}
                          <IconChevronRight size={14} color="#008080" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {comparisonData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              lineHeight: 1.6
            }}>
              {comparisonData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {comparisonData.comparisons.map((comparison, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {comparison.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6 }}>
                    {comparison.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="animate-in" style={{ textAlign: 'center', marginTop: '30px' }}>
              <Link href="/c57bl6-mouse-background" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#008080',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Learn More About C57BL/6 Background
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonialsData} variant="dark" />

        {/* CTA Section */}
        <section style={{ background: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              {ctaData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7
            }}>
              {ctaData.description}
            </p>
            <div className="animate-in" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={ctaData.primaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#008080',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                {ctaData.primaryButton.label}
                <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link href={ctaData.secondaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                {ctaData.secondaryButton.label}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Related Strain Information
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.strainInfo.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Related Services
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.services.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
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
    </div>
  );
}
