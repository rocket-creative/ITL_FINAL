'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconDNA } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

const heroData = {
  badge: "Immuno Oncology",
  title: "Syngeneic Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported immuno oncology research with custom mouse models that enable syngeneic tumor studies, providing immunocompetent platforms for evaluating cancer immunotherapies, checkpoint inhibitors, and combination treatment strategies.",
  description: "Syngeneic tumor models involve implanting tumor cell lines into genetically compatible mouse hosts, enabling study of tumor immunity in the context of a fully functional immune system."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const keyAdvantages = [
  { title: "Intact Immune System", description: "Unlike xenograft models, syngeneic models have functional T cells, B cells, NK cells, and myeloid populations." },
  { title: "Tumor Microenvironment", description: "Immune infiltration and tumor immune interactions can be studied in physiological context." },
  { title: "Immunotherapy Testing", description: "Essential for checkpoint inhibitors and other immunotherapies that require functional immunity." },
  { title: "Rapid Tumor Growth", description: "Established cell lines produce consistent, reproducible tumors for study." }
];

const c57bl6Lines = [
  { line: "MC38", type: "Colon carcinoma", characteristics: "Widely used for checkpoint studies. Moderate immunogenicity. Good response to anti PD1/PDL1." },
  { line: "B16 F10", type: "Melanoma", characteristics: "Poorly immunogenic. Used for aggressive tumor studies." },
  { line: "LLC", type: "Lewis Lung Carcinoma", characteristics: "Lung adenocarcinoma model. Moderate immunogenicity." },
  { line: "E0771", type: "Breast Cancer", characteristics: "Mammary carcinoma model for breast cancer studies." },
  { line: "Panc02", type: "Pancreatic Cancer", characteristics: "Pancreatic adenocarcinoma model." }
];

const balbcLines = [
  { line: "CT26", type: "Colon carcinoma", characteristics: "Highly used for immunotherapy studies. Good response to checkpoint blockade." },
  { line: "4T1", type: "Breast Cancer", characteristics: "Aggressive mammary carcinoma. Spontaneous metastasis to lung." },
  { line: "Renca", type: "Renal Carcinoma", characteristics: "Kidney cancer model." },
  { line: "A20", type: "Lymphoma", characteristics: "B cell lymphoma model." }
];

const humanizedCheckpoints = [
  { checkpoint: "PD1 Humanized", application: "Testing anti human PD1 antibodies (pembrolizumab, nivolumab)" },
  { checkpoint: "PDL1 Humanized", application: "Testing anti PDL1 antibodies (atezolizumab, durvalumab)" },
  { checkpoint: "CTLA4 Humanized", application: "Testing anti CTLA4 antibodies (ipilimumab)" },
  { checkpoint: "Dual PD1/CTLA4", application: "Combination checkpoint blockade studies" }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const bassonTestimonial = getTestimonialById('basson-kings')!;
const testimonials = [{ quote: bassonTestimonial.quote, author: formatAuthorWithCredentials(bassonTestimonial), affiliation: bassonTestimonial.affiliation }];

const relatedLinks = [
  { title: "PD1 Humanized Mice", href: "/pd1-humanized-mice" },
  { title: "PDL1 Humanized Mice", href: "/pdl1-humanized-mice" },
  { title: "CTLA4 Humanized Mice", href: "/ctla4-humanized-mice" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

const faqData = [
  { question: "What are the advantages of syngeneic tumor models over xenograft models?", answer: "Syngeneic models have intact immune systems (functional T cells, B cells, NK cells, myeloid populations), enabling study of tumor immune interactions and immunotherapy testing. Xenograft models use immunodeficient hosts, preventing evaluation of immune mediated therapeutic responses." },
  { question: "What syngeneic tumor lines are available for C57BL/6 background?", answer: "Common C57BL/6 compatible lines include MC38 (colon carcinoma, responsive to checkpoint blockade), B16 (melanoma, poorly immunogenic), LLC (lung carcinoma), E0771 (breast cancer), and Panc02 (pancreatic cancer). Selection depends on tumor type and immunogenicity requirements." },
  { question: "Can humanized checkpoint models be combined with syngeneic tumors?", answer: "Yes. Humanized checkpoint models (PD1, PDL1, CTLA4, LAG3, TIM3) can be combined with syngeneic tumor cell lines to create systems where both tumor and immune compartments express human targets, enabling evaluation of checkpoint blockade in immunocompetent animals." },
  { question: "How do you validate syngeneic tumor model responses?", answer: "Syngeneic tumor responses are validated through tumor growth measurement, survival analysis, immune cell infiltration (flow cytometry, immunohistochemistry), cytokine profiling, and functional assessment of immune cell activation." }
];

export default function SyngeneicTumorModelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (heroRef.current) { gsap.fromTo(heroRef.current.querySelectorAll('.hero-animate'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }); }
      document.querySelectorAll('.animate-in').forEach((el) => { gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }); });
    };
    loadGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <main id="main-content">
        <section ref={heroRef} style={{ background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)', padding: '80px 20px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="hero-animate" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', marginBottom: '20px' }}><IconDNA size={16} color="white" /><span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span></div>
            <h1 className="hero-animate" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2.8rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px' }}>{heroData.title}</h1>
            <p className="hero-animate" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: 400, lineHeight: '1.7rem', marginBottom: '15px', maxWidth: '800px' }}>{heroData.intro}</p>
            <p className="hero-animate" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem', marginBottom: '25px', maxWidth: '800px' }}>{heroData.description}</p>
            <div className="hero-animate flex flex-wrap gap-4">
              <Link href="/request-quote" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'white', color: '#0a253c', padding: '10px 20px', fontSize: '.85rem', fontWeight: 500 }}><span>Request a Quote</span><span>→</span></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'transparent', color: 'white', padding: '10px 20px', border: '2px solid white', fontSize: '.85rem', fontWeight: 500 }}><span>Talk to a Scientist</span><span>→</span></Link>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#0a253c', padding: '30px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (<div key={index} className="text-center"><div style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700 }}><UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} /></div><div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.85rem' }}>{stat.label}</div></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Key Advantages of Syngeneic Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyAdvantages.map((item, index) => (<div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}><h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.title}</h3><p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Common Syngeneic Tumor Lines</h2>
            <h3 className="animate-in" style={{ color: '#0a253c', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>C57BL/6 Compatible Lines</h3>
            <div className="animate-in" style={{ overflowX: 'auto', marginBottom: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead><tr style={{ backgroundColor: '#008080' }}><th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Line</th><th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Type</th><th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Characteristics</th></tr></thead>
                <tbody>{c57bl6Lines.map((row, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.line}</td><td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.type}</td><td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.characteristics}</td></tr>))}</tbody>
              </table>
            </div>
            <h3 className="animate-in" style={{ color: '#0a253c', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>BALB/c Compatible Lines</h3>
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead><tr style={{ backgroundColor: '#2384da' }}><th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Line</th><th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Type</th><th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Characteristics</th></tr></thead>
                <tbody>{balbcLines.map((row, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '12px 15px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.line}</td><td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.type}</td><td style={{ padding: '12px 15px', color: '#555', fontSize: '.85rem' }}>{row.characteristics}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Humanized Checkpoint Models for Syngeneic Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {humanizedCheckpoints.map((item, index) => (<div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}><h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.checkpoint}</h3><p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.application}</p></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>What Researchers Say</h2>
            {testimonials.map((testimonial, index) => (<div key={index} className="animate-in" style={{ backgroundColor: '#f8f9fa', padding: '40px 48px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}><IconQuote size={20} color="#008080" /></div><blockquote style={{ color: '#333', fontSize: '1rem', lineHeight: '1.7rem', fontStyle: 'italic', marginBottom: '15px' }}>&ldquo;{testimonial.quote}&rdquo;</blockquote><p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '2px' }}>— {testimonial.author}</p><p style={{ color: '#666', fontSize: '.8rem' }}>{testimonial.affiliation}</p></div>))}
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your Syngeneic Tumor Study</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants can help you select the optimal syngeneic models and humanized checkpoint combinations for your immuno oncology program.</p>
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

        {/* Lab Signals Signup */}
        <LabSignalsSignup 
          title="Track Your Syngeneic Tumor Study"
          description="Stay informed on your immuno-oncology model development, tumor cell line compatibility, and checkpoint inhibitor testing progress."
        />

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related Humanized Models</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedLinks.map((link, index) => (<div key={index} className="animate-in"><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></div>))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Syngeneic Tumor Models", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Syngeneic tumor mouse models for immuno oncology research since 1998.", "serviceType": "Syngeneic Tumor Models" }) }} />
    </div>
  );
}
