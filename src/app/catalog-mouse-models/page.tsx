'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconFlask, IconSettings, IconChevronRight, IconCheckCircle, IconShield, IconLayers } from '@/components/UXUIDC/Icons';
import CatalogSearch from '@/components/UXUIDC/CatalogSearch';

// Hero Data
const heroData = {
  badge: "Ready to Ship Models",
  title: "Catalog Mouse Models",
  intro: "In addition to custom gene targeting and editing services, ingenious targeting laboratory maintains catalog models available for rapid shipment. These include humanized immune checkpoint mice for immuno-oncology research, Cre driver lines for conditional gene expression, and reporter strains for cell tracking and imaging.",
  description: "Catalog models provide immediate access to study-ready strains without the timeline required for custom model generation. All catalog models are maintained under rigorous quality standards and shipped with complete documentation."
};

// Stats Data
const statsData = [
  { value: 10000, suffix: "+", label: "Models in Library" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Quality Verified" }
];

// Checkpoint Models Data
const checkpointModelsData = {
  title: "Humanized Immune Checkpoint Mice",
  intro: "Humanized immune checkpoint models enable preclinical testing of human specific checkpoint inhibitor antibodies in immunocompetent mice.",
  categories: [
    {
      title: "Single Checkpoint Models",
      description: "Individual checkpoint humanizations available include:",
      models: [
        "PD1 Humanized: Human PDCD1 extracellular domain for anti PD1 antibody testing",
        "PDL1 Humanized: Human CD274 extracellular domain for anti PDL1 antibody testing",
        "CTLA4 Humanized: Human CTLA4 extracellular domain for anti CTLA4 antibody testing",
        "LAG3 Humanized: Human LAG3 extracellular domain for anti LAG3 antibody testing",
        "TIM3 Humanized: Human HAVCR2 extracellular domain for anti TIM3 antibody testing"
      ],
      href: "/humanized-immune-checkpoint-mice"
    },
    {
      title: "Double Checkpoint Models",
      description: "Combination checkpoint humanizations enable testing of dual checkpoint blockade approaches:",
      models: [
        "PD1/CTLA4 Double Humanized: For combination anti PD1 plus anti CTLA4 studies",
        "PD1/LAG3 Double Humanized: For combination anti PD1 plus anti LAG3 studies",
        "PD1/TIM3 Double Humanized: For combination anti PD1 plus anti TIM3 studies"
      ],
      href: "/double-checkpoint-mice"
    }
  ]
};

// Cre Driver Data
const creDriverData = {
  title: "Cre Driver Lines",
  intro: "Cre driver lines express Cre recombinase in specific tissues or under inducible control. Crossing Cre drivers with floxed alleles enables tissue specific or temporally controlled gene deletion.",
  categories: [
    {
      title: "Tissue Specific Cre Lines",
      description: "Constitutive Cre drivers express Cre recombinase under tissue specific promoters. Available lines include drivers for liver, kidney, heart, brain, immune cells, and other tissues."
    },
    {
      title: "Inducible Cre Lines",
      description: "Tamoxifen inducible CreERT2 and doxycycline inducible rtTA Cre systems enable temporal control over Cre activity. These lines are available with various tissue specific or ubiquitous promoters."
    }
  ]
};

// Reporter Lines Data
const reporterData = {
  title: "Reporter Lines",
  intro: "Reporter mice express fluorescent proteins, enzymatic markers, or other reporters under various promoter systems. These strains enable cell tracking, lineage tracing, and visualization of gene expression.",
  types: [
    {
      title: "Constitutive Reporters",
      description: "Ubiquitous reporter expression enables cell labeling and tracking applications."
    },
    {
      title: "Cre Dependent Reporters",
      description: "Cre dependent reporters are activated only in cells expressing Cre recombinase, enabling fate mapping and lineage tracing when combined with tissue specific Cre drivers."
    },
    {
      title: "Inducible Reporters",
      description: "Inducible reporter systems enable temporally controlled labeling for pulse chase experiments and acute lineage tracing."
    }
  ]
};

// Ordering Info Data
const orderingData = {
  title: "Ordering Information",
  sections: [
    {
      title: "Availability",
      description: "Catalog models are maintained as breeding colonies or cryopreserved stocks. Contact us to confirm current availability and estimated ship dates."
    },
    {
      title: "Shipping",
      description: "Models are shipped as breeding pairs or cohorts depending on your requirements. Domestic and international shipping are available with appropriate documentation."
    },
    {
      title: "Documentation",
      description: "All catalog models include genotyping protocols, strain background information, and health documentation."
    },
    {
      title: "Material Transfer",
      description: "Standard material transfer agreements govern use of catalog models. Contact us to discuss licensing terms for commercial and academic applications."
    }
  ]
};

// FAQ Data
const faqData = [
  {
    question: "How do I know if a catalog model is available?",
    answer: "Contact ingenious targeting laboratory to confirm current availability. Catalog models are maintained as breeding colonies or cryopreserved stocks. Availability and estimated ship dates are provided upon inquiry. Some models may require recovery from cryopreservation."
  },
  {
    question: "What is included when I order a catalog model?",
    answer: "You will receive breeding pairs or cohorts (depending on your order), genotyping protocols, strain background information, and health documentation."
  },
  {
    question: "Can catalog models be customized or modified?",
    answer: "Catalog models are provided as-is. If you need modifications (different background, additional alleles, or custom changes), we recommend a custom model generation project. Custom projects can sometimes build upon existing catalog models to reduce timeline and cost."
  },
  {
    question: "How long does it take to receive catalog models?",
    answer: "Shipping timelines depend on availability. Contact us to determine the timeline for your specific model of interest."
  },
  {
    question: "What is the Ingenious Catalog Library?",
    answer: "The Catalog Library includes 10,000+ mouse and rat models. These models are available for scientific use, and availability is confirmed upon request. Models available include humanized immune checkpoint mice for immuno-oncology research, Cre driver lines for conditional gene expression, and reporter strains for cell tracking and imaging."
  }
];

// Related Links Data
const relatedLinksData = {
  categories: [
    { href: "/humanized-immune-checkpoint-mice", label: "Humanized Immune Checkpoint Mice" },
    { href: "/disease-model-catalog", label: "Disease Model Catalog" }
  ],
  resources: [
    { href: "/custom-mouse-models", label: "Custom Mouse Models" },
    { href: "/cre-lox-system", label: "Cre Lox System" }
  ]
};

// CTA Data
const ctaData = {
  title: "Order Inquiry",
  description: "Ready to order catalog models or need availability information? Contact us with your requirements.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function CatalogMouseModelsPage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const heroElements = document.querySelectorAll('.hero-animate');
      heroElements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power2.out" }
        );
      });

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
            "@type": "Service",
            "name": "Catalog Mouse Models",
            "description": "Catalog mouse models ready for immediate shipment. Humanized immune checkpoint mice, Cre driver lines, and reporter strains.",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory",
              "url": "https://www.genetargeting.com"
            },
            "serviceType": "Mouse Model Distribution",
            "areaServed": "Worldwide"
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
              <IconLayers size={14} color="#00d4d4" />
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
                textDecoration: 'none'
              }}>
                Request a Quote
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
              <Link href="/custom-mouse-models" style={{
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
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                Custom Models
              </Link>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section style={{ 
          background: '#ffffff', 
          padding: '40px 20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <CatalogSearch maxResults={15} showTitle={true} />
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ background: '#f7f7f7', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
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

        {/* Checkpoint Models Section */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {checkpointModelsData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {checkpointModelsData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {checkpointModelsData.categories.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
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
                    marginBottom: '8px'
                  }}>
                    {category.title}
                  </h3>
                  <p style={{ fontSize: '.85rem', color: '#666', marginBottom: '12px' }}>
                    {category.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                    {category.models.map((model, mIndex) => (
                      <li key={mIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '.85rem',
                        color: '#666',
                        marginBottom: '8px',
                        lineHeight: 1.5
                      }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span>{model}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={category.href} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#008080',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}>
                    Learn More
                    <IconChevronRight size={14} color="#008080" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cre Driver Section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {creDriverData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {creDriverData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {creDriverData.categories.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #00d4d4'
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
                    <IconSettings size={24} color="#008080" />
                  </div>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {category.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reporter Lines Section */}
        <section style={{ background: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {reporterData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              {reporterData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {reporterData.types.map((type, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
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
                    {type.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ordering Info Section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {orderingData.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {orderingData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #00d4d4'
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
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
        <section style={{ background: 'white', padding: '60px 20px' }}>
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
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  Catalog Categories
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.categories.map((link, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
                  marginBottom: '20px'
                }}>
                  Related Resources
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.resources.map((link, index) => (
                    <li key={index} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
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
