'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Gene Targeting Technologies",
  title: "Gene Targeting Technologies",
  intro: "Since 1998, ingenious targeting laboratory has refined gene targeting technologies through more than 2,500 custom projects. Our methodology combines proven ES cell gene targeting with sophisticated allele design strategies to deliver mouse models with verified genetic modifications and predictable performance.",
  description: "Understanding these technologies helps researchers design optimal targeting strategies and interpret model capabilities. ingenious targeting laboratory's scientific consultants guide project design from initial concept through final allele verification."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Core Technologies
const coreTechnologies = [
  {
    title: "Homologous Recombination",
    desc: "Homologous recombination enables precise genetic modification by exchanging genomic sequences between the targeting vector and chromosomal DNA.",
    features: ["Targeted modifications occur at the intended locus", "Surrounding genomic architecture remains intact", "Single copy integration at native chromosomal position", "Predictable expression under endogenous regulatory control"],
    link: "/homologous-recombination-targeting"
  }
];

// Conditional Systems
const conditionalSystems = [
  {
    name: "Cre Lox System",
    desc: "The Cre lox recombination system enables conditional gene modification by placing critical exons between LoxP recognition sites. Cre recombinase expression catalyzes recombination between LoxP sites to delete the flanked sequence.",
    link: "/cre-lox-system"
  },
  {
    name: "FLP FRT System",
    desc: "The FLP FRT system provides an orthogonal recombination approach that can work independently or in combination with Cre lox for selection cassette removal, sequential recombination, and dual recombinase strategies.",
    link: "/flp-frt-system"
  },
  {
    name: "Inducible Systems",
    desc: "Inducible gene expression systems provide temporal control over genetic modifications. Tamoxifen inducible CreERT2 systems enable adult onset gene deletion or activation.",
    link: "/inducible-gene-expression"
  }
];

// Derivative Allele Features
const derivativeAlleles = [
  { name: "tm1a Allele (knockout first)", desc: "Gene function disrupted by splice acceptor. LacZ reporter indicates endogenous expression pattern." },
  { name: "tm1b Allele (complete null)", desc: "Cre mediated deletion removes critical exon and neomycin cassette. Clean null allele with persistent reporter expression." },
  { name: "tm1c Allele (conditional ready)", desc: "FLP mediated deletion removes gene trap cassette, restoring gene function. Critical exon remains flanked by LoxP sites." },
  { name: "tm1d Allele (conditional null)", desc: "Cre mediated deletion of the tm1c allele removes the critical exon, creating tissue specific or temporally controlled null allele." }
];

// Selection Guides
const selectionGuides = [
  { title: "Knockout Strategy Guide", href: "/knockout-strategy-guide" },
  { title: "Conditional vs Conventional Guide", href: "/conditional-vs-conventional-guide" },
];

// Related Model Types
const relatedModelTypes = [
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Reporter Knockin", href: "/reporter-knockin" },
  { title: "Transgenic Mouse Service", href: "/transgenic-mouse-service" }
];

// Testimonials
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { TECHNOLOGY_TESTIMONIALS, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonials = TECHNOLOGY_TESTIMONIALS.map(t => ({
  quote: t.quote,
  author: formatAuthorWithCredentials(t),
  affiliation: t.affiliation,
}));

// FAQ Data
const faqData = [
  {
    question: "How does the Cre lox system enable conditional gene modification?",
    answer: "The Cre lox system places critical exons between LoxP recognition sites. Cre recombinase expression, driven by tissue specific or inducible promoters, catalyzes recombination between LoxP sites to delete the flanked sequence. This enables tissue specific or temporal control of gene deletion, avoiding developmental lethality and modeling pharmacological intervention."
  },
  {
    question: "What is the difference between FLP FRT and Cre lox systems?",
    answer: "FLP FRT is primarily used for removal of FRT flanked selection cassettes from knockout first alleles, enabling generation of clean conditional alleles. Cre lox is used for conditional gene deletion. Both can be combined in dual recombinase strategies for more sophisticated allele designs requiring independent control of multiple modifications."
  },
  {
    question: "What are derivative alleles and how are they generated?",
    answer: "Derivative alleles are alternative forms of a targeted allele created through recombinase mediated processing. For example, knockout first (tm1a) alleles can be processed into conditional ready (tm1c) alleles via FLP mediated cassette removal, then into conditional knockout (tm1d) alleles via Cre mediated exon deletion. This provides flexibility from a single targeting event."
  }
];

export default function TechnologiesPage() {
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
                  <IconDNA size={16} color="white" />
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

        {/* Core Technologies Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Core Technologies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreTechnologies.map((tech, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                    {tech.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>
                    {tech.desc}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                    {tech.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tech.link} className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#2384da" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conditional Systems Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Conditional Systems
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conditionalSystems.map((system, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{system.name}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem', marginBottom: '15px' }}>{system.desc}</p>
                  <Link href={system.link} className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#2384da" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Derivative Alleles Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Derivative Allele System
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              The knockout first strategy produces a tm1a allele that serves as the foundation for multiple model types from a single targeting event.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {derivativeAlleles.map((allele, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{allele.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{allele.desc}</p>
                </div>
              ))}
            </div>

            <div className="animate-in mt-6">
              <Link
                href="/cre-lox-system"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#008080',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}>
                <span>Learn about Cre-LoxP Systems</span>
                <IconChevronRight size={14} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
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
                    backgroundColor: '#f8f9fa',
                    padding: testimonials.length === 1 ? '40px 48px' : '30px',
                    borderRadius: '8px',
                    width: '100%',
                    boxSizing: 'border-box',
                    textAlign: testimonials.length === 1 ? 'center' : 'left',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                    ...(testimonials.length === 1 && { margin: '0 auto 15px' }),
                  }}>
                    <IconQuote size={20} color="#008080" />
                  </div>
                  <blockquote style={{
                    color: '#333',
                    fontSize: testimonials.length === 1 ? '1.05rem' : '.9rem',
                    lineHeight: '1.6rem',
                    fontStyle: 'italic',
                    marginBottom: '15px',
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p style={{ color: '#0a253c', fontWeight: 600, fontSize: testimonials.length === 1 ? '.95rem' : '.85rem', marginBottom: '2px' }}>
                      — {testimonial.author}
                    </p>
                    <p style={{ color: '#666', fontSize: '.8rem' }}>
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
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants can help you select the optimal technology approach for your research goals. From allele design through study ready animals, ingenious targeting laboratory provides comprehensive technical expertise.
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

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedModelTypes.map((link, index) => (
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
                  Selection Guides
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectionGuides.map((link, index) => (
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
            "name": "Gene Targeting Technologies",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "ES cell gene targeting, Cre lox conditional systems, and derivative allele design. Pre germline characterization for verified mouse models since 1998.",
            "serviceType": "Gene Targeting Technologies"
          })
        }}
      />
    </div>
  );
}
