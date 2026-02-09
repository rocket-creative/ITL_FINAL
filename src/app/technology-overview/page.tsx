'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconSettings } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Technology Platform",
  title: "Gene Targeting Technology Overview",
  intro: "Ingenious Targeting Laboratory has refined gene targeting technologies through more than 2,500 custom projects. Our methodology combines proven strategies with sophisticated allele designs to deliver mouse models with verified genetic modifications and predictable performance.",
  description: "Understanding these technologies helps researchers design optimal targeting strategies and interpret model capabilities. This overview introduces the core technologies that enable precise genetic modification in mice."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Custom Projects" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];


// Conditional Systems
const conditionalSystems = [
  {
    title: "Cre Lox System",
    description: "Conditional gene modification by placing critical exons between LoxP recognition sites. Cre expression catalyzes recombination to delete flanked sequences.",
    features: [
      "Tissue specific gene deletion through Cre driver lines",
      "Temporal control via inducible Cre systems",
      "Flexible allele design with multiple derivative options",
      "Widely used and well characterized system"
    ],
    href: "/cre-lox-system"
  },
  {
    title: "FLP FRT System",
    description: "Orthogonal recombination approach working independently or with Cre lox, primarily for selection cassette removal and complex multi recombinase strategies.",
    features: [
      "Independent of Cre lox system",
      "Selection cassette removal",
      "Enables derivative allele generation",
      "Supports dual recombinase approaches"
    ],
    href: "/flp-frt-system"
  },
  {
    title: "Dre Rox System",
    description: "Third orthogonal recombinase system enabling sophisticated intersectional strategies requiring expression of multiple recombinases.",
    features: [
      "Orthogonal to both Cre and FLP",
      "Intersectional genetic strategies",
      "Complex conditional control",
      "Multi lineage experiments"
    ],
    href: "/dre-rox-system"
  }
];

// Inducible Systems
const inducibleSystems = [
  {
    title: "Tamoxifen Inducible (CreERT2)",
    description: "Temporal control over gene deletion. CreERT2 remains inactive until tamoxifen administration enables gene deletion at defined timepoints.",
    features: [
      "Permanent genetic change after single administration",
      "Wide variety of tissue specific CreERT2 lines available",
      "Well characterized and reliable system",
      "Enables adult deletion of developmentally essential genes"
    ],
    href: "/tamoxifen-inducible-cre"
  },
  {
    title: "F.A.S.T.™ Technology",
    description: "Flexible Accelerated STOP Tetracycline Operator provides versatile inducible/reversible control enabling multiple expression modes from single knockin allele.",
    features: [
      "Knockout first mode",
      "Inducible expression mode",
      "Conditional knockdown/knockout mode",
      "Single allele multiple applications"
    ],
    href: "/fast-mice"
  }
];

// Proprietary Technologies
const proprietaryTechnologies = [
  {
    title: "Rapid Rosa26™ Targeting",
    description: "Accelerates transgenic model generation through established protocols and proven vector backbones, enabling shorter timelines with reliable, high quality models.",
    href: "/rapid-rosa26-targeting"
  },
  {
    title: "TruView Conditional Knockout™",
    description: "Guarantees strong reporter expression after knockout, enabling reliable visualization of recombined cells regardless of target gene expression levels.",
    href: "/truview-conditional-knockout"
  },
  {
    title: "TruHumanization™",
    description: "Optimizes humanization strategies by analyzing human mouse protein homology, functional domain conservation, and therapeutic target requirements.",
    href: "/truhumanization"
  }
];

// Advanced Targeting
const advancedTargeting = [
  {
    title: "Conditional Targeting Systems",
    description: "Generation of multiple model types using Cre-LoxP and FLP-FRT systems, enabling flexible conditional and constitutive knockout approaches.",
    href: "/cre-lox-system"
  },
  {
    title: "BAC to BAC Large Scale Targeting",
    description: "Targeting of large genomic regions up to 200kb, enabling complex humanization and multi gene targeting projects.",
    href: "/bac-to-bac-large-scale-targeting"
  },
  {
    title: "Safe Harbor Locus Targeting",
    description: "Safe harbor loci including Rosa26, HPRT, and H11 provide predictable transgene integration with stable expression and minimal positional effects.",
    href: "/safe-harbor-locus"
  }
];

// Related Links
const coreTechLinks = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "FLP FRT System", href: "/flp-frt-system" },
];

const inducibleLinks = [
  { title: "Inducible Gene Expression", href: "/inducible-gene-expression" },
  { title: "Tamoxifen Inducible Cre", href: "/tamoxifen-inducible-cre" },
  { title: "F.A.S.T. Mice", href: "/fast-mice" }
];

const safeHarborLinks = [
  { title: "Safe Harbor Locus", href: "/safe-harbor-locus" },
  { title: "Rosa26 Targeting", href: "/rosa26" },
  { title: "H11 Safe Harbor", href: "/h11-safe-harbor" },
  { title: "HPRT Locus Targeting", href: "/hprt-locus-targeting" }
];

// Testimonials
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;
const testimonials = [
  { quote: mirmiraTestimonial.quote, author: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "How do conditional systems (Cre lox, FLP FRT, Dre Rox) differ?",
    answer: "Cre lox is the primary system for conditional gene deletion, with extensive driver line availability. FLP FRT complements Cre lox in dual recombinase strategies. Dre Rox provides a third orthogonal system for sophisticated intersectional strategies. Selection depends on whether you need gene deletion or independent control of multiple modifications."
  },
  {
    question: "What is safe harbor targeting and why is it used?",
    answer: "Safe harbor targeting inserts transgenes at defined genomic locations (Rosa26, H11, HPRT) that support transgene integration without disrupting endogenous genes or causing position effects. This provides single copy integration, predictable expression patterns, and reproducible results across founder lines, unlike random integration."
  },
  {
    question: "What is the difference between tamoxifen inducible and doxycycline inducible systems?",
    answer: "Tamoxifen inducible Cre (CreER) enables permanent genetic changes with temporal control. Doxycycline inducible (Tet) enables reversible transgene expression control. CreER provides permanent effects after induction; Tet provides reversible on/off control. Selection depends on whether you need permanent modification or reversible expression."
  }
];

export default function TechnologyOverviewPage() {
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

        {/* Conditional Systems Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Conditional Gene Targeting Systems
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conditionalSystems.map((system, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {system.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem', marginBottom: '15px' }}>
                    {system.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                    {system.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ color: '#008080', fontSize: '.7rem', marginTop: '4px' }}>•</span>
                        <span style={{ color: '#555', fontSize: '.8rem', lineHeight: '1.4rem' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={system.href} className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#2384da" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inducible Systems Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Inducible Expression Systems
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inducibleSystems.map((system, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {system.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    {system.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                    {system.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <IconCheckCircle size={16} color="white" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={system.href} className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: 'white', fontSize: '.85rem', fontWeight: 500 }}>
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="white" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proprietary Technologies Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Proprietary Technologies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {proprietaryTechnologies.map((tech, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {tech.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem', marginBottom: '15px' }}>
                    {tech.description}
                  </p>
                  <Link href={tech.href} className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#2384da" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Targeting Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Advanced Targeting Strategies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advancedTargeting.map((tech, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                    {tech.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem', marginBottom: '15px' }}>
                    {tech.description}
                  </p>
                  <Link href={tech.href} className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}>
                    <span>Learn more</span>
                    <IconChevronRight size={14} color="#2384da" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              What Researchers Say
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px'
                  }}>
                    <IconQuote size={20} color="#008080" />
                  </div>
                  <blockquote style={{
                    color: '#333',
                    fontSize: '.9rem',
                    lineHeight: '1.6rem',
                    fontStyle: 'italic',
                    marginBottom: '15px'
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem', marginBottom: '2px' }}>
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
              Start Your Technology Consultation
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants can help you select the optimal technologies for your research goals. From basic gene targeting through advanced conditional and inducible systems, we guide technology selection to match your experimental requirements.
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Core Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {coreTechLinks.map((link, index) => (
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
                  Inducible Systems
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {inducibleLinks.map((link, index) => (
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
                  Advanced Targeting
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {safeHarborLinks.map((link, index) => (
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
            "name": "Gene Targeting Technology Overview",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Comprehensive gene targeting technology platform. ES cell targeting, Cre lox, FLP FRT, inducible systems, and proprietary innovations since 1998.",
            "serviceType": "Gene Targeting Technology"
          })
        }}
      />
    </div>
  );
}
