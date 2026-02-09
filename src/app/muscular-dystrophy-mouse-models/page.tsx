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
  badge: "Muscle Disease Research",
  title: "Muscular Dystrophy Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported muscular dystrophy research with custom mouse models enabling mechanistic studies of muscle degeneration, testing gene therapy approaches, and developing therapeutic interventions for Duchenne muscular dystrophy and related myopathies.",
  description: "Muscular dystrophy mouse models provide essential platforms for investigating molecular pathways underlying muscle wasting and testing exon skipping strategies and gene replacement therapies."
};

const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

const dmdModels = [
  { model: "mdx Mouse", description: "Point mutation in exon 23 creating premature stop codon. Complete absence of full length dystrophin. Standard model for preclinical studies.", features: ["Milder than human DMD due to compensatory utrophin", "Elevated CK and muscle regeneration", "Widely used for baseline studies"] },
  { model: "mdx/utrophin Double Knockout", description: "Elimination of both dystrophin and utrophin produces severe muscular dystrophy with shortened lifespan, closely modeling human DMD severity.", features: ["Severe phenotype matching human disease", "Shortened lifespan", "Optimal for therapeutic testing"] },
  { model: "Humanized DMD Models", description: "hDMDTg mice carrying full length human DMD gene enable testing of human specific therapies including exon skipping oligonucleotides.", features: ["Human sequence for ASO testing", "Exon skipping validation", "Clinical translation studies"] }
];

const phenotypingEndpoints = [
  { category: "Functional", endpoints: ["Grip strength (forelimb/hindlimb)", "Rotarod (motor coordination)", "Treadmill endurance", "Voluntary wheel running"] },
  { category: "Pathological", endpoints: ["H&E staining (centralized nuclei, necrosis)", "Fibrosis (Sirius red/trichrome)", "IHC for dystrophin complex"] },
  { category: "Biomarkers", endpoints: ["Serum creatine kinase (CK)", "Cardiac troponin", "Myoglobin"] },
  { category: "Cardiac", endpoints: ["Echocardiography", "ECG", "Hemodynamics"] }
];

const therapeuticApps = [
  { approach: "Gene Therapy", applications: ["AAV microdystrophin delivery", "Utrophin upregulation", "Dual/triple vector strategies"] },
  { approach: "Exon Skipping", applications: ["Antisense oligonucleotides", "Eteplirsen class drugs", "Human sequence specific ASOs"] },
  { approach: "Cell Based", applications: ["Satellite cell transplantation", "iPSC derived myocytes", "Patient specific approaches"] }
];

// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';
const bassonTestimonial = getTestimonialById('basson-kings')!;
const testimonials = [{ quote: bassonTestimonial.quote, author: formatAuthorWithCredentials(bassonTestimonial), affiliation: bassonTestimonial.affiliation }];

const relatedLinks = [
  { title: "Rare Disease Mouse Models", href: "/rare-disease-mouse-models" },
  { title: "Gene Therapy Mouse Models", href: "/gene-therapy-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Conditional Knockout Models", href: "/conditional-knockout-mouse-models" }
];

const faqData = [
  { question: "What types of muscular dystrophy models are available?", answer: "Models include mdx (Duchenne muscular dystrophy with dystrophin mutation), knockout models of dystrophin associated proteins, point mutation knockins modeling specific patient variants, and conditional models for tissue specific studies. Models can be combined with gene therapy testing approaches." },
  { question: "How do you phenotype muscular dystrophy mouse models?", answer: "Phenotyping includes functional assessment (grip strength, rotarod, treadmill endurance), muscle pathology (H&E staining, fibrosis assessment, immunohistochemistry), serum biomarkers (creatine kinase, myoglobin), and cardiac assessment (echocardiography, ECG, hemodynamics)." },
  { question: "Can muscular dystrophy models be used for gene therapy testing?", answer: "Yes. Muscular dystrophy models are extensively used for testing gene therapy approaches including AAV mediated dystrophin delivery, exon skipping strategies, and CRISPR based correction. Models enable evaluation of therapeutic efficacy, safety, and long term persistence." },
  { question: "What Cre drivers are used for muscle specific studies?", answer: "Common muscle Cre drivers include MCK Cre and HSA Cre for skeletal muscle, alphaMHC Cre for cardiac muscle, and MyoD Cre for muscle progenitors. Tamoxifen inducible Cre (CreER) enables temporal control for adult onset studies." }
];

export default function MuscularDystrophyMouseModelsPage() {
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
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Duchenne Muscular Dystrophy Models</h2>
            <div className="grid grid-cols-1 gap-6">
              {dmdModels.map((model, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>{model.model}</h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.6rem', marginBottom: '15px' }}>{model.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {model.features.map((feature, idx) => (<li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '5px' }}><IconCheckCircle size={16} color="#008080" style={{ marginTop: '3px', flexShrink: 0 }} /><span style={{ color: '#555', fontSize: '.85rem' }}>{feature}</span></li>))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Phenotyping Muscular Dystrophy Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phenotypingEndpoints.map((item, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{item.category} Assessment</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.endpoints.map((endpoint, idx) => (<li key={idx} style={{ color: '#555', fontSize: '.85rem', marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#008080' }}>•</span>{endpoint}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Therapeutic Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {therapeuticApps.map((item, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                  <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>{item.approach}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.applications.map((app, idx) => (<li key={idx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.85rem', marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>•</span>{app}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (<div key={index} className="animate-in" style={{ backgroundColor: '#f8f9fa', padding: testimonials.length === 1 ? '40px 48px' : '30px', borderRadius: '8px', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}><div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,128,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: testimonials.length === 1 ? '0 auto 15px' : '0 0 15px' }}><IconQuote size={20} color="#008080" /></div><blockquote style={{ color: '#333', fontSize: testimonials.length === 1 ? '1rem' : '.9rem', lineHeight: '1.7rem', fontStyle: 'italic', marginBottom: '15px' }}>&ldquo;{testimonial.quote}&rdquo;</blockquote><p style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem', marginBottom: '2px' }}>— {testimonial.author}</p><p style={{ color: '#666', fontSize: '.8rem' }}>{testimonial.affiliation}</p></div>))}
            </div>
          </div>
        </section>

        <BreedingSchemeArchitectCTA />

        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>Start Your Muscular Dystrophy Model Project</h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>Our scientific consultants can help design custom muscular dystrophy models tailored to your research questions, whether studying disease mechanisms or testing therapeutic approaches.</p>
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
            <LabSignalsSignup 
              title="Stay Updated on Muscular Dystrophy Research"
              description="Get the latest insights on DMD models, gene therapy approaches, and muscle disease therapeutics."
            />
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Muscular Dystrophy Mouse Models", "provider": { "@type": "Organization", "name": "ingenious targeting laboratory" }, "description": "Custom muscular dystrophy mouse models for muscle disease research since 1998.", "serviceType": "Muscular Dystrophy Mouse Models" }) }} />
    </div>
  );
}
