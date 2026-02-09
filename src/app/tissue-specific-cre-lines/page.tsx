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
  badge: "Conditional Gene Targeting",
  title: "Tissue Specific Cre Lines",
  intro: "Since 1998, ingenious targeting laboratory has generated and utilized tissue specific Cre driver lines in hundreds of conditional knockout and knockin projects, providing researchers with precise spatial control of gene manipulation in specific cell types and organs.",
  description: "Tissue specific Cre lines enable gene deletion or activation restricted to defined cell populations, distinguishing cell autonomous from non cell autonomous gene functions."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const nervousSystemCre = [
  { category: "Pan Neuronal", lines: [{ name: "Nestin Cre", pattern: "Neural progenitors" }, { name: "Synapsin Cre", pattern: "Mature neurons" }, { name: "CamKII Cre", pattern: "Forebrain excitatory neurons" }] },
  { category: "Cell Type Specific", lines: [{ name: "POMC Cre", pattern: "POMC neurons" }, { name: "AgRP Cre", pattern: "AgRP neurons" }, { name: "DAT Cre", pattern: "Dopaminergic neurons" }, { name: "PV Cre", pattern: "PV+ interneurons" }] },
  { category: "Glial", lines: [{ name: "GFAP Cre", pattern: "Astrocytes" }, { name: "Olig2 Cre", pattern: "Oligodendrocyte lineage" }, { name: "CX3CR1 Cre", pattern: "Microglia" }] }
];

const metabolicCre = [
  { name: "Albumin Cre", tissue: "Hepatocytes", applications: "Liver metabolism" },
  { name: "Adiponectin Cre", tissue: "Adipocytes", applications: "Fat metabolism" },
  { name: "Pdx1 Cre", tissue: "Pancreatic beta cells", applications: "Diabetes studies" },
  { name: "Villin Cre", tissue: "Intestinal epithelium", applications: "Gut metabolism" }
];

const cardiovascularCre = [
  { name: "Myh6 Cre", tissue: "Cardiomyocytes", applications: "Heart function" },
  { name: "SM22 Cre", tissue: "Smooth muscle", applications: "Vascular biology" },
  { name: "Cdh5 Cre", tissue: "Endothelial cells", applications: "Vascular development" },
  { name: "Tie2 Cre", tissue: "Endothelium/hematopoietic", applications: "Angiogenesis" }
];

const selectionConsiderations = [
  { factor: "Specificity", description: "How specific is expression to target cell type? Some drivers have broader expression than expected." },
  { factor: "Expression Level", description: "Sufficient Cre expression for complete recombination? Weak drivers may cause mosaic deletion." },
  { factor: "Developmental Timing", description: "When does Cre expression begin? Early expression affects all descendants." },
  { factor: "Off Target Activity", description: "Does the driver express in unintended tissues? Germline expression causes global recombination." }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;
const testimonials = [
  { quote: mirmiraTestimonial.quote, author: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation },
];

const relatedLinks = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Cre Recombinase Mice", href: "/cre-recombinase-mice" },
  { title: "Tamoxifen Inducible Cre", href: "/tamoxifen-inducible-cre" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Floxed Mouse Models", href: "/floxed-mouse-models" }
];

const faqData = [
  { question: "How do I verify that a Cre driver line works correctly before using it?", answer: "Cross the Cre driver to a reporter line (Rosa26 tdTomato or Rosa26 LacZ) before experimental crosses. This visualizes the recombination pattern and confirms expected tissue distribution and timing. Also verify Cre expression by immunohistochemistry and monitor genotyping for unexpected recombination." },
  { question: "What is the difference between tissue specific and inducible Cre drivers?", answer: "Tissue specific Cre drivers provide spatial control (gene deleted in specific organs from development). Inducible Cre drivers (CreERT2) provide temporal control (gene deleted at specific times via tamoxifen). Tissue specific CreERT2 drivers combine both, providing maximum control with spatial and temporal specificity." },
  { question: "What causes mosaic recombination and how can I improve it?", answer: "Mosaic recombination (incomplete deletion) can result from weak Cre expression, late onset of expression, or inaccessible chromatin at the floxed locus. To improve efficiency, choose stronger Cre drivers, use homozygous floxed alleles, or use inducible systems for more complete activation." },
  { question: "How do I avoid germline recombination?", answer: "Germline recombination occurs when Cre is active in germ cells, causing global deletion in all offspring. To avoid this, choose Cre drivers without reported germline activity, maintain Cre on one gender only, monitor genotyping for unexpected global deletion patterns." }
];

export default function TissueSpecificCreLinesPage() {
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Nervous System Cre Drivers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nervousSystemCre.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{category.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {category.lines.map((line, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: idx < category.lines.length - 1 ? '1px solid #ddd' : 'none' }}>
                        <span style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{line.name}</span>
                        <span style={{ color: '#555', fontSize: '.8rem' }}>{line.pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Metabolic and Cardiovascular Cre Drivers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Metabolic Tissues</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>{metabolicCre.map((row, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '10px 5px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.name}</td><td style={{ padding: '10px 5px', color: '#555', fontSize: '.85rem' }}>{row.tissue}</td></tr>))}</tbody>
                  </table>
                </div>
              </div>
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Cardiovascular Tissues</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>{cardiovascularCre.map((row, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '10px 5px', color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{row.name}</td><td style={{ padding: '10px 5px', color: '#555', fontSize: '.85rem' }}>{row.tissue}</td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Selection Considerations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectionConsiderations.map((item, index) => (<div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}><h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.factor}</h3><p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (<div key={index} className="animate-in" style={{ backgroundColor: '#f8f9fa', padding: testimonials.length === 1 ? '40px 48px' : '30px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: testimonials.length === 1 ? '0 auto 15px' : '0 0 15px' }}><IconQuote size={20} color="#008080" /></div><blockquote style={{ color: '#333', fontSize: testimonials.length === 1 ? '1rem' : '.9rem', lineHeight: '1.6rem', fontStyle: 'italic', marginBottom: '15px' }}>&ldquo;{testimonial.quote}&rdquo;</blockquote><p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem', marginBottom: '2px' }}>— {testimonial.author}</p><p style={{ color: '#666', fontSize: '.8rem' }}>{testimonial.affiliation}</p></div>))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your Cre Driver Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants can help you select the optimal Cre driver line or design custom Cre knockin models for your research goals.</p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link href="/request-quote" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#008080', color: 'white', padding: '12px 30px', fontSize: '.9rem', fontWeight: 500 }}><span>Request a Quote</span><span>→</span></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'transparent', color: 'white', padding: '12px 30px', border: '2px solid white', fontSize: '.9rem', fontWeight: 500 }}><span>Free Consultation</span><span>→</span></Link>
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>Frequently asked questions</h2>
            <div className="animate-in"><UXUIDCAnimatedFAQ faqs={faqData} /></div>
          </div>
        </section>

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Cre Line Technology Insights"
              description="Stay informed on Cre driver selection, tissue-specific targeting strategies, and the latest advances in conditional gene manipulation. Expert insights delivered biweekly."
            />
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {relatedLinks.map((link, index) => (<div key={index} className="animate-in"><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></div>))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Tissue Specific Cre Lines", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Tissue specific Cre driver lines for conditional gene targeting since 1998.", "serviceType": "Tissue Specific Cre Lines" }) }} />
    </div>
  );
}
