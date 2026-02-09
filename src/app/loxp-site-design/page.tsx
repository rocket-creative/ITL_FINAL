'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconQuote, IconChevronRight, IconDNA } from '@/components/UXUIDC/Icons';

const heroData = {
  badge: "Conditional Allele Architecture",
  title: "LoxP Site Design",
  intro: "Since 1998, ingenious targeting laboratory has designed and implemented LoxP sites in over 1,500 conditional alleles, establishing precise frameworks for Cre mediated recombination that enable spatial and temporal control of gene expression.",
  description: "LoxP site design determines the success of conditional knockout and knockin strategies. Proper positioning ensures normal gene function prior to exposure to Cre."
};

const statsData = [
  { value: 1500, suffix: "+", label: "Conditional Alleles" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const loxPStructure = {
  sequence: "ATAACTTCGTATA GCATACAT TATACGAAGTTAT",
  components: [
    { name: "Inverted Repeats", size: "13 bp each", function: "Cre binding sites" },
    { name: "Spacer Region", size: "8 bp", function: "Determines orientation and outcome" }
  ]
};

const positioningGuidelines = [
  { guideline: "Distance from Splice Sites", recommendation: "At least 100 to 200 bp from exon boundaries to avoid disrupting splicing" },
  { guideline: "Avoid Regulatory Elements", recommendation: "Introns contain enhancers, silencers, and branch points that must be avoided" },
  { guideline: "Minimum Floxed Region", recommendation: "500 bp to 5 kb optimal; regions under 200 bp reduce efficiency" },
  { guideline: "Maximum Floxed Region", recommendation: "Regions over 10 kb can recombine but with decreased efficiency" }
];

const designPatterns = [
  { pattern: "Single Exon Floxing", description: "Simplest approach when one exon contains catalytic domain, is in all isoforms, and deletion causes frameshift" },
  { pattern: "Multi Exon Floxing", description: "Required when gene has multiple functional domains, single exon maintains frame, or isoform specific exons exist" },
  { pattern: "First Coding Exon", description: "Can eliminate all downstream sequence and possibility of truncated functional proteins." }
];

const commonPitfalls = [
  { pitfall: "Hypomorphic Alleles", cause: "LoxP sites or cassette disrupt regulatory elements before Cre exposure", prevention: "Careful intronic placement. Test floxed allele homozygotes for normal phenotype." },
  { pitfall: "Incomplete Null After Recombination", cause: "Floxed exon not essential, alternative splicing bypasses region, or in frame deletion preserves function", prevention: "Thorough gene structure analysis. Target functionally essential domains." },
  { pitfall: "Inefficient Recombination", cause: "LoxP sites too close together, chromatin inaccessibility, or low Cre expression", prevention: "Optimal spacing (500 bp to 5 kb). Use robust Cre drivers." }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;
const testimonials = [{ quote: mirmiraTestimonial.quote, author: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation }];

const relatedLinks = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Cre Recombinase Mice", href: "/cre-recombinase-mice" },
  { title: "Critical Exon Selection", href: "/critical-exon-selection" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" }
];

const faqData = [
  { question: "Where should LoxP sites be placed for conditional knockout?", answer: "LoxP sites should be placed in introns flanking the exon to be deleted, avoiding placement within exons or too close to splice sites. Sites should be at least 100 to 200 bp from exon boundaries to avoid interfering with splicing. The floxed exon should encode critical functional domains." },
  { question: "How far apart should LoxP sites be for efficient recombination?", answer: "LoxP sites can efficiently recombine when separated by distances from a few hundred base pairs to several kilobases. Very large floxed regions (10+ kb) may show reduced efficiency. Standard floxed exons are typically 100 to 500 bp, with intronic LoxP sites placed appropriately." },
  { question: "Can LoxP variant sites be used for more complex designs?", answer: "Yes. LoxP variant sites (lox2272, loxN) enable independent recombination events in the same construct for serial deletions, inversions, or dual recombinase strategies. Standard LoxP is preferred for most applications as variant sites require compatible Cre variants." }
];

export default function LoxPSiteDesignPage() {
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>LoxP Site Structure</h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '20px' }}>The LoxP sequence is a 34 base pair DNA element recognized by Cre recombinase:</p>
            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '25px', textAlign: 'center' }}>
              <code style={{ color: '#008080', fontSize: '1rem', fontFamily: 'monospace' }}>{loxPStructure.sequence}</code>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loxPStructure.components.map((comp, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontSize: '1rem', fontWeight: 600, marginBottom: '5px' }}>{comp.name}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem' }}><strong>Size:</strong> {comp.size}</p>
                  <p style={{ color: '#555', fontSize: '.85rem' }}><strong>Function:</strong> {comp.function}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Positioning Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {positioningGuidelines.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.guideline}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Common Design Patterns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {designPatterns.map((item, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.pattern}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Common Design Pitfalls</h2>
            <div className="grid grid-cols-1 gap-6">
              {commonPitfalls.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #2384da' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.pitfall}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem', marginBottom: '10px' }}><strong>Cause:</strong> {item.cause}</p>
                  <p style={{ color: '#008080', fontSize: '.85rem', lineHeight: '1.5rem' }}><strong>Prevention:</strong> {item.prevention}</p>
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
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your LoxP Design Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific team evaluates each gene for LoxP placement, including gene structure review, exon essentiality analysis, and frameshift verification.</p>
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {relatedLinks.map((link, index) => (<div key={index} className="animate-in"><Link href={link.href} className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600" style={{ color: '#2384da', fontSize: '.85rem' }}><IconChevronRight size={12} color="#2384da" /><span>{link.title}</span></Link></div>))}
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "LoxP Site Design", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "LoxP site design for conditional knockout alleles since 1998.", "serviceType": "LoxP Site Design" }) }} />
    </div>
  );
}
