/**
 * About ingenious targeting laboratory Page
 * Built from FINAL TEXT PAGES ALL content
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconChevronRight } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Our Services",
  title: "About ingenious targeting laboratory",
  intro: "Since 1998, ingenious targeting laboratory has been generating custom mouse, rat, and rabbit models for researchers worldwide. From our facilities in Holbrook, New York, we have completed more than 2,500 gene targeting projects contributing to over 800 peer reviewed publications across every major therapeutic area.",
  description: ""
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// FAQ Data
const faqData = [
  { question: "What services does ingenious targeting laboratory provide?", answer: "We provide custom genetically engineered mouse, rat, and rabbit model generation, including knockout, knockin, conditional knockout, humanized models, and transgenic models. Additional services include colony management, cryopreservation, backcrossing, and preclinical services." },
  { question: "How long has ingenious targeting laboratory been in business?", answer: "We have been generating custom mouse models since 1998, with over 26 years of experience and 2,500+ successful projects. Our models have been published in leading journals including Nature, Cell, Science, and Journal of Clinical Investigation, demonstrating consistent quality and scientific impact." },
  { question: "How do I get started with a custom mouse model project?", answer: "Contact us through our request quote form or schedule a consultation. Our scientific team provides complimentary consultation to discuss your research goals, recommend optimal targeting strategies, and develop a project proposal. We work with you throughout the project to ensure the model meets your research needs." }
];

// Related Links
const relatedLinks = [
  { title: "Mouse Model Services", href: "/mouse-model-services" },
  { title: "Technologies", href: "/technologies" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "Current Openings", href: "/current-openings" }
];

export default function AboutItlPage() {
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
            
            {heroData.description && (
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
            )}
            
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
        <section style={{ backgroundColor: '#ffffff', padding: '30px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700 }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: '#666', fontSize: '.85rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company History Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '80px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              History of ingenious targeting laboratory
            </h2>
            <div className="animate-in" style={{ color: '#333', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '25px' }}>
              <p style={{ marginBottom: '20px' }}>
                ingenious targeting laboratory's story began in the early 1990s. The founders worked as researchers in the same lab at Rockefeller University. During their time at Rockefeller, they developed custom atherosclerotic knockout mouse models for studying heart disease. In 1998, they founded ingenious targeting laboratory and still continue to work directly in the lab, oversee mouse model production, and also handle the operation and business side of things.
              </p>
              <p style={{ marginBottom: '20px' }}>
                As ingenious targeting laboratory, we first settled in at the Long Island High Technology Incubator (LIHTI) at Stony Brook University, discussing and sharing ideas with other researchers and companies in that space. A little over 10 years later, we expanded and moved to a larger facility on Long Island with 20,000 square feet. We still work closely with Stony Brook's Division of Laboratory Animal Resources (DLAR) to house many of our mice.
              </p>
              <p>
                From our small beginnings as one of the very first mouse gene targeting companies in the world, we've grown and streamlined our model generation process. Today ingenious uses both traditional and cutting edge technologies to design custom mouse lines for our clients globally.
              </p>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section style={{ backgroundColor: 'white', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Our Location
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  Holbrook, New York
                </h3>
                <p style={{ color: '#333', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '15px' }}>
                  Our corporate headquarters and laboratories are located in Holbrook, New York, USA. We are fortunate to be surrounded by, and enjoy relationships with, world class research institutions such as Stony Brook University, Cold Spring Harbor and Brookhaven National Laboratory.
                </p>
                <p style={{ color: '#333', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '15px' }}>
                  In addition, being located near New York City places us at a global hub of travel, providing us with a gateway to our clients across the USA and the world. Our convenient location also gives us the opportunity to bring top talent to the ingenious team.
                </p>
                <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', marginTop: '20px' }}>
                  <p style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '8px' }}>
                    761-80 Coates Avenue<br/>
                    Holbrook, NY 11741
                  </p>
                  <p style={{ color: '#666', fontSize: '.9rem' }}>
                    All Work Performed in the USA 🇺🇸
                  </p>
                </div>
              </div>
              <div className="animate-in">
                <h3 style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                  Research Partnerships
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', borderLeft: '3px solid #008080' }}>
                    <p style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>Stony Brook University</p>
                    <p style={{ color: '#666', fontSize: '.85rem' }}>Division of Laboratory Animal Resources (DLAR)</p>
                  </div>
                  <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', borderLeft: '3px solid #008080' }}>
                    <p style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>Cold Spring Harbor Laboratory</p>
                    <p style={{ color: '#666', fontSize: '.85rem' }}>World renowned research institution</p>
                  </div>
                  <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', borderLeft: '3px solid #008080' }}>
                    <p style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>Brookhaven National Laboratory</p>
                    <p style={{ color: '#666', fontSize: '.85rem' }}>Leading scientific research center</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '80px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Dedicated scientists are with you from start to finish
            </h2>
            <p className="animate-in" style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8rem', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
              Drs. Jennifer Parla, Milen Kirilov, and Arielle Bryan are part of our team of scientific experts who work directly in the lab and oversee every aspect of your project.
            </p>
          </div>
        </section>

        {/* Our Guarantee Section */}
        <section style={{ backgroundColor: 'white', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>
              Our Guarantee
            </h2>
            <p className="animate-in" style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7rem', marginBottom: '40px', textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
              As part of our commitment to you, we guarantee delivery of your germline confirmed F1 heterozygous mice. We achieve our guarantee by providing the following:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="animate-in" style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Best Quality Constructs
                </h3>
                <p style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                  Best quality targeting vector constructs, ranging in sizes from plasmid to BAC.
                </p>
              </div>
              <div className="animate-in" style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  Proprietary ES Cell Lines
                </h3>
                <p style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                  Proprietary mouse ES cell lines that consistently and reliably transmit to germline.
                </p>
              </div>
              <div className="animate-in" style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '15px' }}>
                  FLP ES Cell Technology
                </h3>
                <p style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                  Our own FLP ES cell technology for streamlined deletion of antibiotic selection cassette without extra steps.
                </p>
              </div>
            </div>
            <p className="animate-in" style={{ color: '#0a253c', fontSize: '1rem', lineHeight: '1.7rem', marginTop: '30px', textAlign: 'center', fontWeight: 500 }}>
              With our guarantee, you can be confident in knowing that you will receive the mice you need at the cost you agreed to.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '80px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
              Why researchers choose ingenious targeting laboratory
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="animate-in" style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#008080', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>
                  ✓
                </div>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>
                  Certainty
                </h3>
                <p style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                  The model you design is the model we deliver.
                </p>
              </div>
              <div className="animate-in" style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#008080', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>
                  ✓
                </div>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>
                  Guaranteed Delivery
                </h3>
                <p style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                  Assurance of your mouse model, not just your money back.
                </p>
              </div>
              <div className="animate-in" style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#008080', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>
                  ✓
                </div>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>
                  Value
                </h3>
                <p style={{ color: '#666', fontSize: '.95rem', lineHeight: '1.7rem' }}>
                  Our proprietary technologies save time and money.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="animate-in" style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ color: '#008080', fontSize: '1rem', fontWeight: 600 }}>Trusted Precision</p>
                <p style={{ color: '#666', fontSize: '.9rem' }}>Exactly what you need, our experts make it happen.</p>
              </div>
              <div className="animate-in" style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ color: '#008080', fontSize: '1rem', fontWeight: 600 }}>Fast Timelines</p>
                <p style={{ color: '#666', fontSize: '.9rem' }}>Germline in less time than ever before.</p>
              </div>
              <div className="animate-in" style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ color: '#008080', fontSize: '1rem', fontWeight: 600 }}>Assured Quality</p>
                <p style={{ color: '#666', fontSize: '.9rem' }}>The quality you need, the value you seek.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonial Section */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '8px' }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.8rem', fontStyle: 'italic', marginBottom: '20px' }}>
                "iTL generated our angiotensin II type 1a receptor conditional mouse. We found this company very responsive. The project started with discussions on possible construct designs. Following approval, a project manager sent monthly reports alerting us to project milestones. Our experience with iTL was so positive that we have generated more conditional mice with them."
              </p>
              <p style={{ color: '#00d4d4', fontSize: '.95rem', fontWeight: 500 }}>
                — Debra Rateri, BS, University of Kentucky
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start your project today
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your research requirements and recommend the optimal approach for your program. Initial consultation is provided at no charge.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link 
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
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
        {faqData.length > 0 && (
          <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
                Frequently asked questions
              </h2>
              <div className="animate-in">
                <UXUIDCAnimatedFAQ faqs={faqData} />
              </div>
            </div>
          </section>
        )}

        {/* Related Links Section */}
        {relatedLinks.length > 0 && (
          <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 600, marginBottom: '30px', textAlign: 'center' }}>
                Related resources
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="animate-in group p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <IconChevronRight size={14} color="#008080" />
                      <span style={{ color: '#0a253c', fontSize: '.9rem', fontWeight: 500 }}>{link.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ingenious targeting laboratory",
            "alternateName": "ITL",
            "url": "https://www.genetargeting.com",
            "logo": "https://www.genetargeting.com/images/logo.png",
            "description": "Leading provider of custom genetically modified mouse, rat, and rabbit models since 1998",
            "foundingDate": "1998",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "761-80 Coates Avenue",
              "addressLocality": "Holbrook",
              "addressRegion": "NY",
              "postalCode": "11741",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-631-468-8530",
              "contactType": "customer service",
              "email": "inquiry@genetargeting.com",
              "areaServed": "US",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.linkedin.com/company/ingenious-targeting-laboratory",
              "https://www.youtube.com/@ingeniouslab"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ingenious targeting laboratory",
            "image": "https://www.genetargeting.com/images/mouse-hero-blue.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "761-80 Coates Avenue",
              "addressLocality": "Holbrook",
              "addressRegion": "NY",
              "postalCode": "11741",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 40.8117,
              "longitude": -73.0779
            },
            "telephone": "+1-631-468-8530",
            "openingHours": "Mo-Fr 09:00-17:00",
            "priceRange": "$$$$"
          })
        }}
      />
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
                "name": "About itl",
                "item": "https://www.genetargeting.com/about-itl"
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
