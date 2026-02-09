'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import { IconQuote, IconChevronRight } from '@/components/UXUIDC/Icons';
import CatalogSearch from '@/components/UXUIDC/CatalogSearch';

const heroData = {
  badge: "Catalog Models",
  title: "Humanized Immune Checkpoint Mice",
  intro: "Humanized immune checkpoint models enable preclinical testing of human specific checkpoint inhibitor antibodies in immunocompetent mice."
};

const checkpointModels = [
  { name: "PD1 Humanized Mice", gene: "PDCD1", description: "Enables testing of anti PD1 antibodies including pembrolizumab and nivolumab.", href: "/pd1-humanized-mice" },
  { name: "PDL1 Humanized Mice", gene: "CD274", description: "Enables testing of anti PDL1 antibodies including atezolizumab, durvalumab, and avelumab.", href: "/pdl1-humanized-mice" },
  { name: "CTLA4 Humanized Mice", gene: "CTLA4", description: "Enables testing of anti CTLA4 antibodies including ipilimumab.", href: "/ctla4-humanized-mice" },
  { name: "LAG3 Humanized Mice", gene: "CD223", description: "Supports development of anti LAG3 antibodies as single agents and in combination with PD1 blockade.", href: "/lag3-humanized-mice" },
  { name: "TIM3 Humanized Mice", gene: "HAVCR2", description: "Enables testing of anti TIM3 antibodies as emerging checkpoint targets.", href: "/tim3-humanized-mice" }
];

const combinationModels = [
  { combination: "PD1/CTLA4 Double Humanized", application: "Testing combinations similar to nivolumab plus ipilimumab" },
  { combination: "PD1/LAG3 Double Humanized", application: "Next generation combination therapies" },
  { combination: "Triple Checkpoint Models", application: "Multi agent regimens testing" },
  { combination: "Custom Combinations", application: "Tailored to specific immunotherapy programs" }
];

const humanizationStrategies = [
  { strategy: "Extracellular Domain Humanization", description: "Humanizes the extracellular domain where therapeutic antibodies bind while retaining mouse transmembrane and intracellular domains. Maintains normal signaling while enabling human antibody binding." },
  { strategy: "Complete Gene Replacement", description: "Complete replacement with the human gene provides a fully humanized target. Preferred when studying antibodies that modulate signaling or when complete humanization is required." }
];

const compatibleTumors = [
  { background: "C57BL/6", tumors: "MC38 (colon), B16 (melanoma), E0771 (breast), Lewis lung carcinoma" },
  { background: "BALB/c", tumors: "CT26 (colon), 4T1 (breast), Renca (kidney)" }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const bassonTestimonial = getTestimonialById('basson-kings')!;
const testimonials = [
  { quote: bassonTestimonial.quote, author: formatAuthorWithCredentials(bassonTestimonial), affiliation: bassonTestimonial.affiliation },
];

const relatedLinks = [
  { title: "PD1 Humanized Mice", href: "/pd1-humanized-mice" },
  { title: "PDL1 Humanized Mice", href: "/pdl1-humanized-mice" },
  { title: "CTLA4 Humanized Mice", href: "/ctla4-humanized-mice" },
  { title: "Syngeneic Tumor Models", href: "/syngeneic-tumor-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Immuno Oncology Models", href: "/immuno-oncology-mouse-models" }
];

const faqData = [
  { question: "Why do I need humanized checkpoint models instead of using mouse checkpoint inhibitors?", answer: "Most clinical checkpoint inhibitor antibodies are designed to target human proteins and do not cross react with mouse orthologs. Humanized checkpoint models express human PD1, PDL1, CTLA4, or other targets, enabling efficacy testing of clinical antibodies in immunocompetent mice with functional immune systems." },
  { question: "What checkpoint models are available as catalog models?", answer: "We offer humanized models for PD1, PDL1, CTLA4, LAG3, TIM3, and other checkpoints, as well as single and dual checkpoint combinations. Catalog models provide study ready mice with shorter lead times than custom projects." },
  { question: "Can I combine multiple humanized checkpoints in one mouse?", answer: "Yes. Dual or triple humanized checkpoint mice are commonly used for combination therapy studies. For example, PD1/CTLA4 double humanized mice enable testing of dual checkpoint blockade, which is increasingly important in clinical practice." },
  { question: "What syngeneic tumors can I use with humanized checkpoint models?", answer: "Humanized checkpoint models on C57BL/6 background are compatible with MC38, B16, E0771, and Lewis lung carcinoma. BALB/c models are compatible with CT26 and 4T1 tumors. Syngeneic tumor compatibility enables evaluation of checkpoint inhibitors in immunocompetent mice." }
];

export default function HumanizedImmuneCheckpointMicePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      document.querySelectorAll('.animate-in').forEach((el) => { gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }); });
    };
    loadGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <main id="main-content">
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            <h1 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
            }}>
              {heroData.title}
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
            </div>
          </div>
        </section>

        {/* Catalog Search Section */}
        <section style={{ backgroundColor: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <CatalogSearch maxResults={15} showTitle={true} />
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Available Checkpoint Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checkpointModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600 }}>{model.name}</h3>
                    <span style={{ backgroundColor: '#008080', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem' }}>{model.gene}</span>
                  </div>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem', marginBottom: '10px' }}>{model.description}</p>
                  <Link href={model.href} className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#2384da', fontSize: '.85rem', fontWeight: 500 }}><span>Learn more</span><IconChevronRight size={14} color="#2384da" /></Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Combination Checkpoint Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {combinationModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{model.combination}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.application}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Humanization Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {humanizationStrategies.map((item, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.strategy}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Tumor Model Compatibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compatibleTumors.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.background} Background</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}><strong>Compatible lines:</strong> {item.tumors}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>What Researchers Say</h2>
            {testimonials.map((testimonial, index) => (<div key={index} className="animate-in" style={{ backgroundColor: 'white', padding: '40px 48px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}><IconQuote size={20} color="#008080" /></div><blockquote style={{ color: '#333', fontSize: '1rem', lineHeight: '1.7rem', fontStyle: 'italic', marginBottom: '15px' }}>&ldquo;{testimonial.quote}&rdquo;</blockquote><p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '2px' }}>— {testimonial.author}</p><p style={{ color: '#666', fontSize: '.8rem' }}>{testimonial.affiliation}</p></div>))}
          </div>
        </section>

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your Checkpoint Model Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Ready to discuss humanized checkpoint models for your immunotherapy program? Our scientific team provides complimentary consultation to help you select the optimal checkpoint model design.</p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link href="/request-quote" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#008080', color: 'white', padding: '12px 30px', fontSize: '.9rem', fontWeight: 500 }}><span>Request a Quote</span><span>→</span></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'transparent', color: 'white', padding: '12px 30px', border: '2px solid white', fontSize: '.9rem', fontWeight: 500 }}><span>Free Consultation</span><span>→</span></Link>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>Frequently asked questions</h2>
            <div className="animate-in"><UXUIDCAnimatedFAQ faqs={faqData} /></div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedLinks.map((link, index) => (<div key={index} className="animate-in"><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></div>))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Humanized Immune Checkpoint Mice", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Humanized immune checkpoint mouse models for immunotherapy testing since 1998.", "serviceType": "Humanized Immune Checkpoint Mice" }) }} />
    </div>
  );
}
