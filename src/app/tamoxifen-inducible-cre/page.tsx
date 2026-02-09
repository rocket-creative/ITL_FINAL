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
  badge: "Temporal Gene Control",
  title: "Tamoxifen Inducible Cre",
  intro: "Since 1998, ingenious targeting laboratory has incorporated tamoxifen inducible Cre systems into hundreds of conditional knockout and knockin projects, providing researchers with precise temporal control over gene manipulation in adult animals.",
  description: "Tamoxifen inducible Cre (CreERT2) enables gene deletion at any chosen time point, avoiding developmental compensation, bypassing embryonic lethality, and enabling study of gene function in mature tissues."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const howItWorks = [
  { step: "CreERT2 Fusion Protein", description: "Cre recombinase fused to mutant estrogen receptor that prevents binding of endogenous estrogen but retains affinity for synthetic ligands." },
  { step: "Cytoplasmic Sequestration", description: "Without ligand, ERT2 domain associates with HSP90, sequestering CreERT2 in cytoplasm away from nuclear DNA." },
  { step: "Tamoxifen Induction", description: "Tamoxifen administration displaces HSP90 and allows nuclear translocation of CreERT2, enabling LoxP recombination." },
  { step: "Permanent Recombination", description: "CreERT2 activity is transient once tamoxifen clears, but recombination events are permanent genetic changes." }
];

const advantages = [
  { title: "Bypass Embryonic Lethality", description: "Genes essential for development can be deleted in adults after normal development is complete." },
  { title: "Avoid Developmental Compensation", description: "Constitutive gene loss may trigger compensatory mechanisms. Adult deletion avoids this adaptation." },
  { title: "Defined Deletion Timing", description: "Know exactly when gene deletion occurs relative to experimental manipulation." },
  { title: "Control Group Simplicity", description: "Same genotype with and without tamoxifen provides matched controls." }
];

const dosingRoutes = [
  { route: "Intraperitoneal Injection", description: "Most common method. Tamoxifen dissolved in corn oil. Typical doses 75 to 100 mg/kg body weight." },
  { route: "Oral Gavage", description: "Direct delivery to stomach. Similar dosing to IP." },
  { route: "Tamoxifen Chow", description: "Convenient for extended dosing. 250 to 500 mg tamoxifen per kg diet. Less precise timing." },
  { route: "Topical (4 OHT)", description: "4 hydroxytamoxifen applied topically for skin specific studies." }
];

const creERT2Lines = [
  { category: "Ubiquitous", lines: [{ name: "Rosa26 CreERT2", tissue: "Ubiquitous" }, { name: "UBC CreERT2", tissue: "Ubiquitin C promoter, widespread" }] },
  { category: "Neuronal", lines: [{ name: "CamKII CreERT2", tissue: "Forebrain excitatory neurons" }, { name: "Thy1 CreERT2", tissue: "Neurons" }, { name: "Nestin CreERT2", tissue: "Neural progenitors" }] },
  { category: "Metabolic", lines: [{ name: "Albumin CreERT2", tissue: "Hepatocytes" }, { name: "Pdx1 CreERT2", tissue: "Pancreatic beta cells" }, { name: "Adiponectin CreERT2", tissue: "Adipocytes" }] },
  { category: "Cardiovascular", lines: [{ name: "Myh6 CreERT2", tissue: "Cardiomyocytes" }, { name: "Cdh5 CreERT2", tissue: "Endothelial cells" }] }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;
const testimonials = [{ quote: mirmiraTestimonial.quote, author: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation }];

const relatedTechnologies = [
  { title: "Cre Lox System", href: "/cre-lox-system" },
  { title: "Inducible Conditional Knockout", href: "/inducible-conditional-knockout" },
  { title: "Tissue Specific Cre Lines", href: "/tissue-specific-cre-lines" }
];

const relatedModelTypes = [
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" },
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" }
];

const faqData = [
  {
    question: "How does tamoxifen inducible Cre (CreERT2) work?",
    answer: "CreERT2 is a fusion protein combining Cre recombinase with a modified estrogen receptor that is inactive until tamoxifen administration. Tamoxifen binds to the receptor, causing translocation to the nucleus where Cre becomes active and excises LoxP flanked sequences. This enables temporal control over gene deletion."
  },
  {
    question: "What is the difference between CreERT2 and regular Cre?",
    answer: "Regular Cre is constitutively active in cells where it is expressed, causing immediate gene deletion. CreERT2 remains inactive until tamoxifen administration, allowing precise temporal control. This is essential for studying gene function in adults without developmental effects."
  },
  {
    question: "How do I administer tamoxifen to activate CreERT2?",
    answer: "Tamoxifen is typically administered via intraperitoneal injection at doses of 75 to 200 mg/kg body weight. Multiple injections over several days improve recombination efficiency. Tamoxifen can also be administered via oral gavage or in food."
  },
  {
    question: "How long does it take for recombination to occur after tamoxifen treatment?",
    answer: "Recombination typically occurs within 2 to 7 days after tamoxifen administration. Peak recombination is usually observed 3 to 5 days post treatment. Some tissues may require longer or multiple doses for efficient recombination."
  },
  {
    question: "Can CreERT2 be used for reversible gene regulation?",
    answer: "No. CreERT2 causes permanent DNA excision (deletion), which is irreversible. Once LoxP flanked sequences are excised, they cannot be restored. For reversible gene regulation, use doxycycline inducible (Tet) systems."
  }
];

export default function TamoxifenInducibleCrePage() {
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
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="hero-animate" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', marginBottom: '20px' }}>
              <IconDNA size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>How the CreERT2 System Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {howItWorks.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#008080', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontSize: '.85rem', fontWeight: 600 }}>{index + 1}</span>
                    </div>
                    <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '.95rem', fontWeight: 600 }}>{item.step}</h3>
                  </div>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Advantages of Temporal Control</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Tamoxifen Administration Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dosingRoutes.map((item, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>{item.route}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Tissue Specific Inducible Cre Lines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creERT2Lines.map((category, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{category.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {category.lines.map((line, idx) => (
                      <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: idx < category.lines.length - 1 ? '1px solid #ddd' : 'none' }}>
                        <span style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>{line.name}</span>
                        <span style={{ color: '#555', fontSize: '.85rem' }}>{line.tissue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
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

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA />

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your Inducible Cre Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants can help you select the optimal inducible Cre system, establish tamoxifen dosing protocols, and design floxed alleles for temporal gene control.</p>
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
        <LabSignalsSignup 
          title="Monitor Your Inducible Cre Project"
          description="Get real-time updates on your CreERT2 model development, floxed allele validation, and tamoxifen induction protocol optimization."
        />

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Tamoxifen Inducible Cre", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Tamoxifen inducible Cre systems for temporal gene control. CreERT2 for time controlled gene activation since 1998.", "serviceType": "Tamoxifen Inducible Cre" }) }} />
    </div>
  );
}
