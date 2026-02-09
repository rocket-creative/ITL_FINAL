'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconCheckCircle, IconDNA } from '@/components/UXUIDC/Icons';
import { GlossaryTermLink } from '@/components/UXUIDC';

// Note: Metadata exported from metadata.ts for this client component

const heroData = {
  badge: "Site Specific Recombination",
  title: "FLP FRT System",
  intro: "Since 1998, ingenious targeting laboratory has utilized the FLP FRT recombination system in hundreds of gene targeting projects, providing researchers with versatile tools for conditional gene expression and sophisticated allele conversion strategies.",
  description: "The FLP FRT system offers an orthogonal recombination platform that complements Cre lox technology, enabling complex genetic manipulations including dual recombinase strategies and sequential allele conversion."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const applications = [
  {
    title: "Dual Recombinase Strategies",
    items: ["Sequential FLP then Cre recombination", "Intersectional approaches for precise targeting", "Conditional rescue in Cre defined populations"]
  },
  {
    title: "Gene Expression Control",
    items: ["FRT Stop FRT cassettes block downstream expression", "Tissue specific activation via FLP driver lines", "FLP dependent reporter activation for lineage tracing"]
  }
];

const comparisonTable = [
  { feature: "Origin", flp: "Yeast 2 micron plasmid", cre: "Bacteriophage P1" },
  { feature: "Recognition site", flp: "34 bp FRT", cre: "34 bp LoxP" },
  { feature: "Temperature optimum", flp: "30°C (wild type)", cre: "37°C" },
  { feature: "Driver availability", flp: "Limited", cre: "Extensive catalog" },
  { feature: "Primary use", flp: "Cassette removal", cre: "Conditional deletion" },
  { feature: "Toxicity", flp: "Minimal", cre: "Possible at high levels" }
];

const flpVariants = [
  { variant: "FLPe (Enhanced)", description: "Four point mutations improve stability at 37°C, approximately 4 fold higher efficiency" },
  { variant: "FLPo (Optimized)", description: "Codon optimized for mammalian expression, highest recombination efficiency" },
  { variant: "FlpERT2 (Inducible)", description: "Tamoxifen inducible FLP for temporal control of recombination" }
];

const driverLines = [
  { line: "ActFLPe", expression: "Ubiquitous from beta actin promoter", use: "Germline cassette removal" },
  { line: "Rosa26 FLPe", expression: "Ubiquitous from Rosa26 locus", use: "Germline cassette removal" },
  { line: "Nestin FLP", expression: "Neural progenitors", use: "Brain specific recombination" },
  { line: "Syn FLP", expression: "Mature neurons", use: "Neuronal specific recombination" }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { SINGLE_DUNAIEF, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const testimonials = [
  {
    quote: SINGLE_DUNAIEF.quote,
    author: formatAuthorWithCredentials(SINGLE_DUNAIEF),
    affiliation: SINGLE_DUNAIEF.affiliation
  },
];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" }
];

const relatedModelTypes = [
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Reporter Knockin", href: "/reporter-knockin" }
];

const getFaqData = () => [
  {
    question: "How does FLP recombination efficiency compare to Cre?",
    answer: "FLP recombinase activity is generally efficient but may vary by target locus and driver strength, similar to Cre. Enhanced FLP variants (FLPe, FLPo) work well at 37°C in mammalian cells. For cassette removal applications, germline FLP expression provides efficient removal in offspring."
  },
  {
    question: "Can FLP FRT be combined with Cre lox in the same model?",
    answer: (
      <>
        Yes. Dual recombinase designs use both FRT (for FLP) and <GlossaryTermLink term="floxed-gene-loxp-site">LoxP</GlossaryTermLink> (for Cre) sites, enabling independent control. For example, FLP removes FRT flanked cassettes to generate clean conditional alleles, then Cre controls gene deletion. This sequential use enables flexible allele architecture from knockout first designs.
      </>
    )
  },
  {
    question: "What FLP driver lines are available?",
    answer: (
      <>
        <GlossaryTermLink term="germline-transmission">Germline</GlossaryTermLink> FLP expression lines include ActFLPe (ubiquitous from beta actin promoter) and <GlossaryTermLink term="rosa26-locus">Rosa26</GlossaryTermLink> FLPe (ubiquitous from Rosa26 locus). Tissue specific FLP drivers are more limited than <GlossaryTermLink term="cre-driver-line">Cre drivers</GlossaryTermLink>. Nestin FLP and Syn FLP provide neural specific recombination, but fewer options exist for other tissues.
      </>
    )
  }
];

export default function FlpFrtSystemPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
      }

      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
      });
    };
    loadGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <main id="main-content">
        <section ref={heroRef} style={{ background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)', padding: '80px 20px 60px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="hero-animate" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', marginBottom: '20px' }}>
                  <IconDNA size={16} color="white" />
                  <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
                </div>
                <h1 className="hero-animate" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2.8rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px' }}>{heroData.title}</h1>
                <p className="hero-animate" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: 400, lineHeight: '1.7rem', marginBottom: '15px' }}>{heroData.intro}</p>
                <p className="hero-animate" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', fontWeight: 400, lineHeight: '1.6rem', marginBottom: '25px' }}>{heroData.description}</p>
                <div className="hero-animate flex flex-wrap gap-4">
                  <Link href="/request-quote" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'white', color: '#0a253c', padding: '10px 20px', fontSize: '.85rem', fontWeight: 500 }}><span>Request a Quote</span><span>→</span></Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'transparent', color: 'white', padding: '10px 20px', border: '2px solid white', fontSize: '.85rem', fontWeight: 500 }}><span>Talk to a Scientist</span><span>→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#0a253c', padding: '30px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700 }}><UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} /></div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.85rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Applications of the FLP FRT System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((app, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{app.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {app.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item}</span>
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>FLP FRT vs Cre Lox</h2>
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ backgroundColor: '#008080' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Feature</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>FLP FRT</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Cre Lox</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px', color: '#0a253c', fontSize: '.85rem', fontWeight: 500 }}>{row.feature}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '.85rem' }}>{row.flp}</td>
                      <td style={{ padding: '15px', color: '#555', fontSize: '.85rem' }}>{row.cre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>FLP Variants and Driver Lines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {flpVariants.map((item, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.variant}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="animate-in" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Driver Line</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Expression</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontSize: '.85rem', fontWeight: 600 }}>Primary Use</th>
                  </tr>
                </thead>
                <tbody>
                  {driverLines.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '15px', color: 'white', fontSize: '.85rem', fontWeight: 500 }}>{row.line}</td>
                      <td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.expression}</td>
                      <td style={{ padding: '15px', color: 'rgba(255,255,255,0.85)', fontSize: '.85rem' }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>What Researchers Say</h2>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-in" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                  <IconQuote size={20} color="#008080" />
                </div>
                <blockquote style={{ color: '#333', fontSize: '.9rem', lineHeight: '1.6rem', fontStyle: 'italic', marginBottom: '15px' }}>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.85rem', marginBottom: '2px' }}>— {testimonial.author}</p>
                <p style={{ color: '#666', fontSize: '.8rem' }}>{testimonial.affiliation}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your FLP FRT Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants can help you determine whether FLP FRT, Cre lox, or a combination approach best meets your experimental requirements.</p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link href="/request-quote" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#008080', color: 'white', padding: '12px 30px', fontSize: '.9rem', fontWeight: 500 }}><span>Request a Quote</span><span>→</span></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'transparent', color: 'white', padding: '12px 30px', border: '2px solid white', fontSize: '.9rem', fontWeight: 500 }}><span>Free Consultation</span><span>→</span></Link>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>Frequently asked questions</h2>
            <div className="animate-in"><UXUIDCAnimatedFAQ faqs={getFaqData()} /></div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related Technologies</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedTechnologies.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>Related Model Types</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedModelTypes.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "FLP FRT System", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "FLP FRT recombination system for conditional gene targeting and selection cassette removal since 1998.", "serviceType": "FLP FRT System" }) }} />
    </div>
  );
}
