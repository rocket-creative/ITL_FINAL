'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

const heroData = {
  badge: "Gastrointestinal Research",
  title: "IBD Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported inflammatory bowel disease research with custom mouse models enabling mechanistic studies of intestinal inflammation, mucosal immunity, and therapeutic interventions for Crohn disease and ulcerative colitis.",
  description: "IBD mouse models provide essential platforms for investigating the molecular pathways underlying chronic intestinal inflammation and developing therapies for millions of patients affected by these conditions."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const geneticModels = [
  { model: "IL10 Knockout", description: "Develops spontaneous colitis dependent on intestinal microbiota. Shows importance of regulatory cytokines." },
  { model: "IL2 Knockout", description: "Autoimmune colitis with ulcerative colitis like features." },
  { model: "NOD2 Knockout/Knockin", description: "Crohn disease associated gene. Patient derived variants model Crohn susceptibility." },
  { model: "ATG16L1 Hypomorph", description: "Reduced ATG16L1 causes Paneth cell abnormalities resembling Crohn disease." }
];

const inducedModels = [
  { model: "DSS (Dextran Sulfate Sodium)", description: "Oral DSS damages epithelial barrier, causing acute colitis. Cycles produce chronic colitis." },
  { model: "TNBS", description: "Rectal administration causes transmural inflammation resembling Crohn disease." },
  { model: "Oxazolone", description: "Produces Th2 mediated colitis resembling ulcerative colitis." },
  { model: "CD45RBhigh T Cell Transfer", description: "Transfer of naive CD4+ T cells causes chronic colitis. Models T cell mediated inflammation." }
];

const creDriversIBD = [
  { driver: "Villin Cre", tissue: "Intestinal epithelium", use: "Epithelial barrier function" },
  { driver: "LysM Cre", tissue: "Macrophages/neutrophils", use: "Myeloid cell contributions" },
  { driver: "CD4 Cre", tissue: "T lymphocytes", use: "T cell mediated inflammation" },
  { driver: "CD11c Cre", tissue: "Dendritic cells", use: "Antigen presentation" }
];

const phenotypingEndpoints = [
  { category: "Clinical", endpoints: ["Body weight loss", "Stool consistency", "Occult blood", "Disease activity index"] },
  { category: "Histological", endpoints: ["H&E staining", "Inflammation scoring", "Crypt damage", "Ulceration"] },
  { category: "Molecular", endpoints: ["Cytokine expression (TNF, IL1B, IL6)", "Barrier function (FITC dextran)", "Microbiome analysis (16S sequencing)"] }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;
const testimonials = [
  { quote: mirmiraTestimonial.quote, author: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation },
];

const relatedLinks = [
  { title: "Immunology Mouse Models", href: "/immunology-mouse-models" },
  { title: "Autoimmune Disease Mice", href: "/autoimmune-disease-mice" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" }
];

const faqData = [
  { question: "What Cre drivers are used for IBD studies?", answer: "Common IBD Cre drivers include Villin Cre (intestinal epithelium), LysM Cre (macrophages and neutrophils), CD4 Cre (T lymphocytes), and CD11c Cre (dendritic cells). Selection depends on whether you are studying epithelial barrier function, immune cell contributions, or combined mechanisms." },
  { question: "How do genetic backgrounds affect IBD model phenotypes?", answer: "IBD phenotypes vary dramatically with genetic background. C57BL/6 shows Th1 biased responses and is standard for many models. BALB/c shows Th2 biased responses with different disease characteristics. Consistent background use within studies is critical." },
  { question: "Can IBD models be combined with microbiome manipulation?", answer: "Yes. IBD models can be combined with gnotobiotic approaches to control microbiome composition. DSS or TNBS models can be used in gnotobiotic mice to study specific microbial contributions. Antibiotic treatment can also modify microbiome in IBD models." },
  { question: "How do you phenotype IBD mouse models?", answer: "IBD phenotyping includes clinical assessment (body weight, stool consistency, occult blood), histological analysis (inflammation scoring, crypt damage), endoscopic assessment, and molecular endpoints (cytokine expression, barrier function assays, microbiome analysis)." }
];

export default function IBDMouseModelsPage() {
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Spontaneous IBD Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {geneticModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{model.model}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Induced Colitis Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inducedModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{model.model}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Cre Drivers for IBD Studies</h2>
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <thead><tr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Driver</th><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Target Tissue</th><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Application</th></tr></thead>
                <tbody>{creDriversIBD.map((row, idx) => (<tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}><td style={{ padding: '15px', color: 'white', fontSize: '.85rem', fontWeight: 500 }}>{row.driver}</td><td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.tissue}</td><td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.use}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Phenotyping IBD Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phenotypingEndpoints.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{item.category} Assessment</h3>
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your IBD Model Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants can help design custom IBD models tailored to your research questions, whether studying barrier function, immune cell contributions, or therapeutic interventions.</p>
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

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              title="Stay Current on IBD Research"
              description="Subscribe to Lab Signals for the latest inflammatory bowel disease model updates and research insights."
            />
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedLinks.map((link, index) => (<div key={index} className="animate-in"><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></div>))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "IBD Mouse Models", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Custom inflammatory bowel disease mouse models for gastrointestinal research since 1998.", "serviceType": "IBD Mouse Models" }) }} />
    </div>
  );
}
