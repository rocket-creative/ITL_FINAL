'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';

const heroData = {
  badge: "Metabolic Research",
  title: "Obesity Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported obesity research with custom mouse models enabling mechanistic studies of energy homeostasis, adipose tissue biology, and metabolic dysfunction underlying the global obesity epidemic.",
  description: "Obesity mouse models provide essential platforms for investigating the molecular pathways regulating appetite, energy expenditure, and fat storage."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const geneticModels = [
  { name: "Leptin (ob/ob)", description: "Spontaneous mutation in leptin. Severe obesity due to hyperphagia and reduced energy expenditure. Established leptin as key regulator of energy balance." },
  { name: "Leptin Receptor (db/db)", description: "Mutations in leptin receptor producing leptin resistance. Also used for diabetes research due to pronounced hyperglycemia." },
  { name: "MC4R Knockout", description: "Melanocortin 4 receptor knockout produces severe obesity. MC4R mutations are most common monogenic cause of human obesity." },
  { name: "POMC Knockout", description: "Proopiomelanocortin deficiency eliminates alpha MSH, producing obesity with pigmentation defects." }
];

const dietInducedModels = [
  { approach: "C57BL/6 on High Fat Diet", description: "Most common obesity model. Susceptible to diet induced obesity, insulin resistance, and fatty liver on 45 to 60% fat diet." },
  { approach: "Genetic + DIO", description: "Knockout or knockin alleles combined with high fat diet reveal gene diet interactions and obesity susceptibility modifiers." },
  { approach: "Strain Comparisons", description: "Different inbred strains show varying susceptibility. A/J mice relatively resistant compared to C57BL/6." }
];

const tissueTargets = [
  { tissue: "Hypothalamus", drivers: "Nestin Cre, POMC Cre, AgRP Cre, Sim1 Cre", applications: "Central appetite and energy regulation" },
  { tissue: "Adipose", drivers: "Adiponectin Cre, Fabp4 Cre, UCP1 Cre", applications: "Lipid storage, thermogenesis" },
  { tissue: "Liver", drivers: "Albumin Cre", applications: "Glucose and lipid metabolism" },
  { tissue: "Muscle", drivers: "MCK Cre, MyoD Cre", applications: "Glucose uptake, fatty acid oxidation" }
];

const phenotypingEndpoints = [
  { category: "Body Composition", endpoints: ["Body weight curves", "DEXA/MRI fat and lean mass", "Adipose depot weights"] },
  { category: "Metabolic", endpoints: ["Food intake monitoring", "Indirect calorimetry (O2, CO2)", "Core temperature", "Physical activity"] },
  { category: "Glucose/Lipid", endpoints: ["IPGTT/OGTT", "Insulin tolerance", "Plasma lipids", "Hepatic triglycerides"] }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const bassonTestimonial = getTestimonialById('basson-kings')!;
const testimonials = [{ quote: bassonTestimonial.quote, author: formatAuthorWithCredentials(bassonTestimonial), affiliation: bassonTestimonial.affiliation }];

const relatedLinks = [
  { title: "Diabetes Mouse Models", href: "/diabetes-mouse-models" },
  { title: "Metabolic Disease Models", href: "/metabolic-disease-mouse-models" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" }
];

const faqData = [
  { question: "What metabolic tissues can be targeted for obesity research?", answer: "Common targets include adipose tissue (Adiponectin Cre), hypothalamus (Nestin Cre, POMC Cre, AgRP Cre for appetite control), liver (Albumin Cre for glucose and lipid metabolism), and muscle (MCK Cre for glucose uptake). Tissue selection depends on your research question." },
  { question: "What diet should I use for diet induced obesity studies?", answer: "High fat diets typically contain 45 to 60% fat calories. Higher fat content produces more rapid weight gain. Defined diets are preferable for reproducibility. Duration (8 to 12 weeks for mild, 16+ weeks for severe obesity) and age at initiation affect phenotype development." },
  { question: "What phenotyping assays are used for obesity models?", answer: "Standard assessments include body weight, body composition (DEXA or MRI), food intake, energy expenditure (indirect calorimetry), glucose tolerance testing, insulin tolerance testing, plasma lipid profiles, and adipose depot analysis." },
  { question: "Can I combine genetic modifications with diet induced obesity?", answer: "Yes. Combining tissue specific gene modifications with high fat diet challenge enables study of how specific genes affect diet induced obesity and metabolic dysfunction. For example, adipose specific knockouts on high fat diet reveal adipocyte autonomous effects on systemic metabolism." }
];

export default function ObesityMouseModelsPage() {
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Genetic Obesity Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {geneticModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{model.name}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Diet Induced Obesity Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dietInducedModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{model.approach}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Tissue Specific Targets</h2>
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <thead><tr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Tissue</th><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Drivers</th><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Applications</th></tr></thead>
                <tbody>{tissueTargets.map((row, idx) => (<tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}><td style={{ padding: '15px', color: 'white', fontSize: '.85rem', fontWeight: 500 }}>{row.tissue}</td><td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.drivers}</td><td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.applications}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Phenotyping Endpoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phenotypingEndpoints.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{item.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.endpoints.map((endpoint, idx) => (<li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}><IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} /><span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{endpoint}</span></li>))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (<div key={index} className="animate-in" style={{ backgroundColor: 'white', padding: testimonials.length === 1 ? '40px 48px' : '30px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: testimonials.length === 1 ? '0 auto 15px' : '0 0 15px' }}><IconQuote size={20} color="#008080" /></div><blockquote style={{ color: '#333', fontSize: testimonials.length === 1 ? '1rem' : '.9rem', lineHeight: '1.7rem', fontStyle: 'italic', marginBottom: '15px' }}>&ldquo;{testimonial.quote}&rdquo;</blockquote><p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '2px' }}>— {testimonial.author}</p><p style={{ color: '#666', fontSize: '.8rem' }}>{testimonial.affiliation}</p></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your Obesity Model Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants can help design custom obesity models tailored to your research questions, whether studying central regulation, peripheral metabolism, or therapeutic interventions.</p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link href="/request-quote" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#008080', color: 'white', padding: '12px 30px', fontSize: '.9rem', fontWeight: 500 }}><span>Request a Quote</span><span>→</span></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'transparent', color: 'white', padding: '12px 30px', border: '2px solid white', fontSize: '.9rem', fontWeight: 500 }}><span>Free Consultation</span><span>→</span></Link>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>Frequently asked questions</h2>
            <div className="animate-in"><UXUIDCAnimatedFAQ faqs={faqData} /></div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedLinks.map((link, index) => (<div key={index} className="animate-in"><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></div>))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Obesity Mouse Models", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Custom obesity mouse models for metabolic research since 1998.", "serviceType": "Obesity Mouse Models" }) }} />
    </div>
  );
}
