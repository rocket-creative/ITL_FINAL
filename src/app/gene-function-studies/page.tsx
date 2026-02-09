/**
 * Gene Function Studies Page
 * Built from FINAL TEXT PAGES ALL content
 */

'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconDNA, IconChevronRight } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Our Services",
  title: "Gene Function Studies",
  intro: "Since 1998, ingenious targeting laboratory has generated over 540 mouse models specifically designed for gene function analysis, including knockout models for loss of function studies, knockin models for gain of function investigations, and conditional approaches enabling tissue specific and temporal investigation of gene function, contributing to 287+ peer reviewed publications studying how specific genes control biological processes.",
  description: "Understanding gene function—what does this gene do? Which tissues require this gene? When during development is this gene essential?—forms the foundation of modern biomedical research. Appropriate mouse models transform these questions from speculation into testable biological hypotheses."
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
  { question: "When should I use conventional knockout vs conditional knockout for gene function studies?", answer: "Use conventional knockout when gene deletion does not cause embryonic lethality and you want to study global gene function throughout development and adult life. Use conditional knockout when genes are essential for development (would cause lethality), when you need tissue specific deletion, or when avoiding developmental compensation is important." },
  { question: "How do I design experiments to study gene function in specific cell types?", answer: "Use conditional knockout with tissue specific Cre drivers (e.g., LysM-Cre for macrophages, Albumin-Cre for hepatocytes, Nestin-Cre for neural cells). This enables study of gene function in specific cell populations without systemic effects. Validate Cre driver specificity and recombination efficiency before experimental studies." },
  { question: "Can I study multiple genes simultaneously in gene function studies?", answer: "Yes. Generate double-knockout mice (both genes deleted) to study gene interactions, epistasis, and genetic hierarchies. Breeding requires careful planning to combine alleles. Conditional approaches enable cell type specific study of multiple genes by using different Cre drivers or combining Cre with other recombinase systems (FLP, Dre)." },
  { question: "What controls are essential for gene function studies?", answer: "Essential controls include wild-type littermates (genetic background control), heterozygous carriers (dose-response), Cre-positive flox-negative controls (to detect Cre toxicity), and vehicle-treated controls (for inducible systems). Reporter crosses validate recombination efficiency. Multiple controls ensure phenotypes are due to gene deletion, not experimental artifacts." }
];

// Related Links
const relatedLinks: Array<{ title: string; href: string }> = [];

export default function GeneFunctionStudiesPage() {
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

        <BreedingSchemeArchitectCTA variant="gradient" />

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

        <section style={{ backgroundColor: '#f8f9fa', padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="card"
              title="Gene Function Research Updates"
              description="Stay current with knockout strategies, conditional approaches, and functional genomics insights from PhD scientists."
            />
          </div>
        </section>

        {/* Related Links Section */}
        {relatedLinks.length > 0 && (
          <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
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
                "name": "Gene Function Studies",
                "item": "https://www.genetargeting.com/gene-function-studies"
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
