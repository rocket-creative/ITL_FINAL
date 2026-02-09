'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';

const heroData = {
  badge: "Metabolic Research",
  title: "Metabolic Disease Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported metabolic disease researchers with custom mouse models contributing to peer reviewed publications in Diabetes, Cell Metabolism, Nature Medicine, and leading metabolism journals worldwide.",
  description: "Our metabolic disease mouse models have advanced understanding of glucose homeostasis, lipid metabolism, and the pathophysiology of obesity related complications."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const diseaseCategories = [
  {
    title: "Diabetes Mouse Models",
    items: ["Immune gene modifications for T1D", "Beta cell specific deletions", "Liver specific knockouts for hepatic glucose production", "Adipose specific knockouts for adipokine signaling"]
  },
  {
    title: "Obesity Mouse Models",
    items: ["Leptin pathway modifications", "Adipocyte specific knockouts", "Hypothalamic gene deletions", "Brown adipose thermogenesis models"]
  },
  {
    title: "NASH and Liver Disease",
    items: ["Hepatocyte specific knockouts", "Stellate cell modifications for fibrosis", "Kupffer cell knockouts for inflammation", "Diet induced models with genetic susceptibility"]
  }
];

const creDriverTable = [
  { driver: "Albumin Cre", tissue: "Hepatocytes", applications: "Glucose production, lipid metabolism" },
  { driver: "Adiponectin Cre", tissue: "Adipocytes", applications: "Lipid storage, adipokine secretion" },
  { driver: "Insulin Cre / Pdx1 Cre", tissue: "Beta cells", applications: "Insulin secretion, beta cell mass" },
  { driver: "MyoD Cre / MCK Cre", tissue: "Skeletal muscle", applications: "Glucose uptake, insulin sensitivity" },
  { driver: "Nestin Cre", tissue: "Hypothalamus", applications: "Central metabolic regulation" },
  { driver: "LysM Cre", tissue: "Macrophages", applications: "Metabolic inflammation" }
];

const strainConsiderations = [
  { strain: "C57BL/6J", characteristics: "Susceptible to diet induced obesity; Nnt mutation affects insulin secretion" },
  { strain: "C57BL/6N", characteristics: "Different metabolic profile; intact Nnt gene" },
  { strain: "BALB/c", characteristics: "Relatively resistant to diet induced obesity" },
  { strain: "129 strains", characteristics: "Variable metabolic phenotypes depending on substrain" }
];

// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  { authors: "Turner MB et al.", year: "2025", title: "Adipocyte specific deletion of the mineralocorticoid receptor improves glucose homeostasis.", journal: "Diabetes, Obesity and Metabolism", volume: "27(5): 2341-2355", link: "https://pubmed.ncbi.nlm.nih.gov/41153082/" },
  { authors: "Philippe MA et al.", year: "2025", title: "BMAL2 controls adipose tissue inflammation and metabolic adaptation during obesity.", journal: "Metabolism", volume: "174: 156396", link: "https://pubmed.ncbi.nlm.nih.gov/40983272/" },
  { authors: "Vacher CM et al.", year: "2021", title: "Placental endocrine function shapes cerebellar development and social behavior.", journal: "Nature Neuroscience", volume: "24(10): 1392-1401", link: "https://pubmed.ncbi.nlm.nih.gov/34400844/" }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;
const testimonials = [{ quote: dunaiefTestimonial.quote, author: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation }];

const relatedDiseaseModels = [
  { title: "Diabetes Mouse Models", href: "/diabetes-mouse-models" },
  { title: "Obesity Mouse Models", href: "/obesity-mouse-models" },
  { title: "NASH MASH Mouse Models", href: "/nash-mash-mouse-models" },
  { title: "Lipid Metabolism Mice", href: "/lipid-metabolism-mice" }
];

const relatedModelTypes = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" }
];

const faqData = [
  { question: "What metabolic tissues can be targeted for conditional knockout studies?", answer: "Common metabolic Cre drivers include Insulin Cre (beta cells), Albumin Cre (liver), MCK Cre (muscle), Adiponectin Cre (adipose tissue), and Nestin Cre (hypothalamus). Selection depends on whether you are studying insulin secretion, glucose production, insulin action, or central metabolic control." },
  { question: "What is the difference between C57BL/6J and C57BL/6N for metabolic studies?", answer: "C57BL/6J has a mutation in the Nnt gene that affects insulin secretion, making them more susceptible to diabetes. C57BL/6N has intact Nnt and different metabolic characteristics. Choose based on whether you want diabetes susceptibility (6J) or intact insulin secretion (6N)." },
  { question: "What phenotyping assays are typically performed on metabolic disease models?", answer: "Standard assays include glucose tolerance testing (GTT), insulin tolerance testing (ITT), fasting glucose and insulin levels, body composition analysis (DEXA or MRI), and indirect calorimetry. Advanced studies may include hyperinsulinemic euglycemic clamps and islet perifusion." },
  { question: "How do I model obesity related metabolic dysfunction?", answer: "Obesity models typically involve high fat diet feeding combined with genetic modifications affecting adipose tissue, liver, or central metabolism. Conditional knockouts in adipose (Adiponectin Cre) or liver (Albumin Cre) can be combined with dietary challenges to study gene environment interactions." }
];

export default function MetabolicDiseaseMouseModelsPage() {
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Metabolic Disease Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diseaseCategories.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{category.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {category.items.map((item, idx) => (<li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}><IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} /><span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item}</span></li>))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Metabolic Tissue Cre Drivers</h2>
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead><tr style={{ backgroundColor: '#008080' }}><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Driver</th><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Target Tissue</th><th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Applications</th></tr></thead>
                <tbody>{creDriverTable.map((row, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '15px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.driver}</td><td style={{ padding: '15px', color: '#555', fontSize: '.85rem' }}>{row.tissue}</td><td style={{ padding: '15px', color: '#555', fontSize: '.85rem' }}>{row.applications}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Strain Background Considerations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strainConsiderations.map((item, index) => (<div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}><h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.strain}</h3><p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.characteristics}</p></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Selected Publications</h2>
            <div className="grid grid-cols-1 gap-4">
              {publicationsData.map((pub, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                  <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '8px' }}>
                    <span style={{ color: '#0a253c', fontWeight: 500 }}>{pub.authors}</span> ({pub.year}).
                  </p>
                  {pub.link ? (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '.95rem', color: '#008080', fontWeight: 600, marginBottom: '8px', lineHeight: '1.5', textDecoration: 'none' }} onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')} onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}>{pub.title} ↗</a>
                  ) : (
                    <p style={{ fontSize: '.95rem', color: '#333', fontWeight: 600, marginBottom: '8px', lineHeight: '1.5' }}>{pub.title}</p>
                  )}
                  <p style={{ color: '#666', fontSize: '.85rem', fontStyle: 'italic' }}><em>{pub.journal}</em>{pub.volume && <span style={{ fontStyle: 'normal' }}> {pub.volume}</span>}</p>
                </div>
              ))}
            </div>
            <div className="animate-in text-center" style={{ marginTop: '25px' }}><Link href="/publications" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#2384da', color: 'white', padding: '10px 25px', borderRadius: '4px', fontSize: '.85rem', fontWeight: 500 }}><span>View All Publications</span><IconChevronRight size={16} color="white" /></Link></div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (<div key={index} className="animate-in" style={{ backgroundColor: '#f8f9fa', padding: testimonials.length === 1 ? '40px 48px' : '30px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: testimonials.length === 1 ? '0 auto 15px' : '0 0 15px' }}><IconQuote size={20} color="#008080" /></div><blockquote style={{ color: '#333', fontSize: testimonials.length === 1 ? '1rem' : '.9rem', lineHeight: '1.7rem', fontStyle: 'italic', marginBottom: '15px' }}>&ldquo;{testimonial.quote}&rdquo;</blockquote><p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '2px' }}>— {testimonial.author}</p><p style={{ color: '#666', fontSize: '.8rem' }}>{testimonial.affiliation}</p></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your Metabolic Disease Model Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants are ready to discuss your metabolic research requirements and recommend the optimal model design for your program.</p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link href="/request-quote" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#008080', color: 'white', padding: '12px 30px', fontSize: '.9rem', fontWeight: 500 }}><span>Request a Quote</span><span>→</span></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'transparent', color: 'white', padding: '12px 30px', border: '2px solid white', fontSize: '.9rem', fontWeight: 500 }}><span>Free Consultation</span><span>→</span></Link>
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>Frequently asked questions</h2>
            <div className="animate-in"><UXUIDCAnimatedFAQ faqs={faqData} /></div>
          </div>
        </section>

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup title="Metabolic Disease Research Insights" />
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in"><h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Metabolic Disease Models</h3><ul style={{ listStyle: 'none', padding: 0 }}>{relatedDiseaseModels.map((link, index) => (<li key={index} style={{ marginBottom: '10px' }}><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></li>))}</ul></div>
              <div className="animate-in"><h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related Model Types</h3><ul style={{ listStyle: 'none', padding: 0 }}>{relatedModelTypes.map((link, index) => (<li key={index} style={{ marginBottom: '10px' }}><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></li>))}</ul></div>
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Metabolic Disease Mouse Models", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Custom metabolic disease mouse models for diabetes, obesity, and NASH research since 1998.", "serviceType": "Metabolic Disease Mouse Models" }) }} />
    </div>
  );
}
