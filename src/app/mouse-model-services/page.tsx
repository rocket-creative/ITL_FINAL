'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Custom Gene Targeting",
  title: "Custom Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 custom gene targeting projects for academic institutions, pharmaceutical companies, and biotech organizations worldwide. Our mouse model generation services have contributed to more than 800 peer reviewed publications across every major therapeutic area.",
  description: "Whether you need a simple knockout to eliminate gene function, a conditional allele for tissue specific studies, a knockin model to introduce precise modifications, or a humanized mouse for translational research, ingenious targeting laboratory provides the scientific expertise and technical infrastructure to bring your project from concept to study ready animals."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Mouse Model Types
const modelTypes = [
  {
    title: "Knockout Mouse Models",
    description: "Knockout mice enable loss of function studies by eliminating specific gene activity. ingenious targeting laboratory offers both conventional knockouts for complete gene inactivation and conditional knockouts that allow spatial and temporal control of gene deletion.",
    features: [
      { name: "Conventional Knockout", desc: "Permanently disrupt target gene function in all tissues throughout development, ideal for understanding essential gene function and creating disease models where complete loss of function is required." },
      { name: "Conditional Knockout", desc: "Use the Cre lox system to enable gene deletion in specific tissues or at defined timepoints, essential for studying genes with embryonic lethal phenotypes or investigating tissue specific gene function." }
    ],
    link: "/knockout-mouse-models"
  },
  {
    title: "Knockin Mouse Models",
    description: "Knockin mice introduce precise genetic modifications at defined loci, enabling reporter expression, point mutations, tag insertions, and gene humanization strategies.",
    features: [
      { name: "cDNA Knockin", desc: "Replace endogenous genes with alternative coding sequences, enabling expression of modified or humanized genes under endogenous regulatory control." },
      { name: "Point Mutation", desc: "Introduce specific nucleotide changes to model human disease variants or study protein function with surgical precision." },
      { name: "Reporter Knockin", desc: "Insert fluorescent proteins, enzymatic reporters, or other detection systems to visualize gene expression patterns and cell populations in vivo." }
    ],
    link: "/knockin-mouse-models"
  },
  {
    title: "Humanized Mouse Models",
    description: "Humanized mice replace mouse genes or gene segments with their human counterparts, creating translational platforms for therapeutic development and human disease modeling.",
    features: [
      { name: "Gene Replacement", desc: "Substitute entire mouse genes with human orthologs, enabling testing of human specific therapeutics and studying human gene function in vivo." },
      { name: "Immune Checkpoint", desc: "Create mice expressing human PD1, PDL1, CTLA4, LAG3, TIM3, and other checkpoint molecules for immunotherapy development." },
      { name: "Receptor Humanization", desc: "Enable preclinical testing of biologics targeting human proteins that lack mouse cross reactivity." }
    ],
    link: "/humanized-mouse-models"
  },
  {
    title: "Transgenic Mouse Models",
    description: "Transgenic mice carry additional genetic sequences integrated into the genome, enabling overexpression studies, reporter lines, and Cre driver strains.",
    features: [
      { name: "Targeted Transgenic", desc: "Use safe harbor loci including Rosa26, HPRT, and Polr2a to achieve predictable, single copy integration with stable expression across generations." }
    ],
    link: "/transgenic-mouse-service"
  }
];

// Advanced Technologies
const advancedTech = {
  title: "Conditional Gene Targeting",
  description: "ingenious targeting laboratory specializes in conditional allele design using the Cre lox recombination system. Our derivative allele approach creates flexible alleles that can generate multiple model types from a single targeted ES cell clone.",
  alleles: [
    { name: "tm1a", desc: "Knockout first allele (LacZ reporter intact)" },
    { name: "tm1b", desc: "Complete null allele" },
    { name: "tm1c", desc: "Conditional ready floxed allele (gene function restored)" },
    { name: "tm1d", desc: "Tissue specific null (after Cre mediated recombination)" }
  ],
  benefit: "This flexibility maximizes research value while minimizing project timelines and costs.",
  link: "/cre-lox-system"
};

// Strain Options
const strainOptions = [
  { name: "C57BL/6", desc: "The most widely used inbred strain, with extensive phenotypic data and compatibility with most disease models." },
  { name: "BALB/c", desc: "Offers advantages for immunology research and certain tumor models." },
  { name: "129 Strain", desc: "ES cells provide exceptional targeting efficiency for complex allele designs." },
  { name: "Mixed Backgrounds", desc: "Can be backcrossed to your preferred strain following model generation." }
];

// Additional Services
const additionalServices = [
  {
    title: "Genotyping Services",
    description: "ingenious targeting laboratory provides comprehensive genotyping services to support your mouse model research.",
    items: [
      "PCR based genotyping for targeted alleles",
      "Quantitative PCR for copy number determination",
      "Sequencing based genotyping for point mutations and small insertions"
    ],
    link: "/mouse-genotyping-service"
  },
  {
    title: "Targeting Vector Design",
    description: "Our scientific team designs and constructs targeting vectors tailored to your specific research requirements.",
    items: [
      "Plasmid based vectors for standard targeting projects",
      "BAC based vectors for large scale targeting (up to 200kb)",
      "Custom cassette configurations for complex allele designs",
      "Validated vector backbones with proven targeting efficiency"
    ]
  },
  {
    title: "Microinjection Services",
    description: "ingenious targeting laboratory's microinjection services deliver targeted ES cells into blastocysts for chimera generation.",
    items: [
      "Blastocyst injection with characterized ES cell clones",
      "Morula injection for accelerated timelines",
      "High efficiency injection protocols",
      "Quality controlled injection procedures"
    ]
  }
];

// Testimonials
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;

const testimonials = [
  { quote: dunaiefTestimonial.quote, author: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation },
];

// Related Links
const relatedServices = [
  { title: "Colony Management Services", href: "/colony-management-services" },
  { title: "Cryopreservation Services", href: "/cryopreservation-services" },
  { title: "Mouse Genotyping Service", href: "/mouse-genotyping-service" },
  { title: "Phenotyping Services", href: "/phenotyping-services" }
];

const modelSelectionGuides = [
  { title: "Knockout Strategy Guide", href: "/knockout-strategy-guide" },
  { title: "Conditional vs Conventional Guide", href: "/conditional-vs-conventional-guide" },
  { title: "Request a Quote", href: "/request-quote" }
];

// FAQ Data
const faqData = [
  {
    question: "Can ingenious targeting laboratory provide partial services if I already have reagents?",
    answer: "Yes. Partial service options are available for researchers with existing targeting vectors, ES cells, or other reagents. Services include ES cell targeting only, microinjection only, or germline transmission breeding. Contact us to discuss your specific requirements and receive a customized quote."
  },
  {
    question: "What strain backgrounds are available for custom models?",
    answer: "ingenious targeting laboratory offers C57BL/6, BALB/c, and 129 strain ES cells for targeted models. C57BL/6 is most commonly requested for its well-characterized genetics and suitability for immunological and metabolic studies. Strain selection depends on your research requirements and downstream breeding plans."
  },
  {
    question: "How long does it take to generate a custom mouse model?",
    answer: "Custom model generation timelines depend on project complexity, model type, and specific requirements. With ongoing advances in gene editing technology, timelines continue to improve. Expedited options may be available for certain project types. Contact us for current timeline estimates tailored to your project."
  },
  {
    question: "What is included in the project consultation?",
    answer: "Initial consultation is provided at no charge and includes target gene analysis, recommended model strategy, construct design review, timeline projection, and detailed price quotation. Our scientific consultants work with you to optimize model design for your research goals."
  }
];

export default function MouseModelServicesPage() {
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
          
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
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
                marginBottom: '15px',
                maxWidth: '800px'
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
                marginBottom: '25px',
                maxWidth: '800px'
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

        {/* Mouse Model Types */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Mouse Model Types
            </h2>
            
            <div className="grid grid-cols-1 gap-8">
              {modelTypes.map((model, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '30px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #008080'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>
                    {model.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                    {model.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {model.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        style={{
                          backgroundColor: 'white',
                          padding: '15px',
                          borderRadius: '6px',
                          borderTop: '3px solid #2384da'
                        }}
                      >
                        <h4 style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '8px' }}>
                          {feature.name}
                        </h4>
                        <p style={{ color: '#666', fontSize: '.85rem', lineHeight: '1.5rem' }}>
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href={model.link}
                    className="inline-flex items-center gap-2 transition-colors duration-300"
                    style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                  >
                    <span>Learn more about {model.title}</span>
                    <IconChevronRight size={14} color="#008080" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Technologies */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Advanced Technologies
            </h2>
            <h3 className="animate-in" style={{ color: 'rgba(255,255,255,0.95)', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
              {advancedTech.title}
            </h3>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              {advancedTech.description}
            </p>
            
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', marginBottom: '20px' }}>
              The tm1a knockout first allele can be converted to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {advancedTech.alleles.map((allele, index) => (
                <div 
                  key={index}
                  className="animate-in"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '15px 20px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{ 
                    backgroundColor: 'white', 
                    color: '#008080', 
                    padding: '4px 10px', 
                    borderRadius: '4px', 
                    fontSize: '.8rem', 
                    fontWeight: 700,
                    fontFamily: 'monospace'
                  }}>
                    {allele.name}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '.9rem' }}>{allele.desc}</span>
                </div>
              ))}
            </div>
            
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', fontStyle: 'italic', marginBottom: '20px' }}>
              {advancedTech.benefit}
            </p>
            
            <Link 
              href={advancedTech.link}
              className="animate-in inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                backgroundColor: 'white',
                color: '#008080',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '.85rem',
                fontWeight: 500
              }}
            >
              <span>Learn about Cre Lox System</span>
              <IconChevronRight size={14} color="#008080" />
            </Link>
          </div>
        </section>

        {/* Strain Options */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Strain Background Options
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              ingenious targeting laboratory generates custom models on the genetic background most appropriate for your research goals:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strainOptions.map((strain, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                    {strain.name}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                    {strain.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="animate-in text-center" style={{ marginTop: '25px' }}>
              <Link 
                href="/mouse-strain-backgrounds"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Learn more about strain backgrounds</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              What Researchers Say
            </h2>
            <div
              style={{
                display: testimonials.length === 1 ? 'block' : 'grid',
                gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : undefined,
                gap: '24px',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: testimonials.length === 1 ? '40px 48px' : '30px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #008080',
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
                    fontSize: testimonials.length === 1 ? '1.05rem' : '.95rem',
                    lineHeight: '1.7rem',
                    fontStyle: 'italic',
                    marginBottom: '20px',
                  }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '2px' }}>
                      — {testimonial.author}
                    </p>
                    <p style={{ color: '#666', fontSize: '.8rem' }}>
                      {testimonial.affiliation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="animate-in text-center" style={{ marginTop: '25px' }}>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 transition-colors duration-300"
                style={{ color: '#008080', fontSize: '.9rem', fontWeight: 500 }}
              >
                <span>Read more testimonials</span>
                <IconChevronRight size={14} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Additional Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <div 
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #2384da'
                  }}
                >
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>
                    {service.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {service.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <IconCheckCircle size={14} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#666', fontSize: '.85rem' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {service.link && (
                    <Link 
                      href={service.link}
                      className="inline-flex items-center gap-2 transition-colors duration-300 mt-3"
                      style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}
                    >
                      <span>Learn more</span>
                      <IconChevronRight size={14} color="#008080" />
                    </Link>
                  )}
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
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants can help you design the optimal mouse model strategy for your research goals. From initial concept through study ready animals, ingenious targeting laboratory provides comprehensive support at every project phase.
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

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup title="Mouse Model Service Insights" />
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
                  Model Selection Guides
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {modelSelectionGuides.map((link, index) => (
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
            "name": "Custom Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom mouse model generation services including knockout, knockin, conditional, and humanized mice. 2,500+ projects since 1998.",
            "serviceType": "Custom Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
