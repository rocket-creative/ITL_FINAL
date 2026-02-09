'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { LabSignalsSignup, BreedingSchemeArchitectCTA } from '@/components/UXUIDC';
import { IconTarget, IconQuote, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Disease Research Models",
  title: "Therapeutic Area Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has generated custom mouse models supporting research across every major therapeutic area. Our 2,500+ completed projects span oncology, neuroscience, metabolic disease, immunology, cardiovascular research, rare disease, and ophthalmology, contributing to over 800 peer reviewed publications.",
  description: "Whether you are studying disease mechanisms, validating therapeutic targets, or testing drug candidates, ingenious targeting laboratory provides the custom knockout, knockin, and humanized models optimized for your specific disease research needs."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Therapeutic Areas
const therapeuticAreas = [
  {
    title: "Oncology Mouse Models",
    description: "Cancer research requires models that accurately recapitulate tumor biology, immune interactions, and therapeutic responses. ingenious targeting laboratory supports oncology programs with tumor suppressor knockouts, oncogene models, and humanized immune checkpoint mice for immuno oncology studies.",
    applications: [
      "Tumor suppressor knockout models enable study of cancer initiation and progression",
      "Conditional approaches allow tissue specific or temporal control over tumor development",
      "Germline knockouts model inherited cancer syndromes",
      "Humanized checkpoint models including PD1, PDL1, CTLA4, LAG3, and TIM3 for immuno oncology"
    ],
    link: "/oncology-mouse-models",
    color: "#008080"
  },
  {
    title: "Neuroscience Mouse Models",
    description: "Neurological and neurodegenerative disease research demands models that reproduce disease pathology while enabling mechanistic studies. ingenious targeting laboratory has generated models for Alzheimer disease, Parkinson disease, ALS, Huntington disease, epilepsy, autism spectrum disorders, and other neurological conditions.",
    applications: [
      "Alzheimer disease models incorporate mutations in APP, presenilin genes, or tau",
      "Movement disorder research uses alpha synuclein models for Parkinson disease",
      "SOD1 or TDP43 models for ALS and huntingtin models for Huntington disease",
      "Reporter knockins enable cell population tracking in neural circuits"
    ],
    link: "/neuroscience-mouse-models",
    color: "#2384da"
  },
  {
    title: "Metabolic Disease Mouse Models",
    description: "Metabolic research spans diabetes, obesity, fatty liver disease, and lipid metabolism disorders. ingenious targeting laboratory provides models for studying metabolic pathways, testing therapeutic interventions, and understanding disease progression.",
    applications: [
      "Diabetes models address type 1 autoimmune mechanisms and type 2 insulin resistance",
      "Tissue specific knockouts in liver, adipose, muscle, or pancreas reveal organ contributions",
      "NASH and obesity research with models developing hepatic steatosis and fibrosis",
      "Humanized models enable testing of human specific therapeutic targets"
    ],
    link: "/nash-mash-mouse-models",
    color: "#008080"
  },
  {
    title: "Immunology Mouse Models",
    description: "Immune system research requires models that accurately reflect human immunology while enabling mechanistic studies. ingenious targeting laboratory supports autoimmune disease research, inflammatory conditions, and basic immunology with knockout, knockin, and humanized models.",
    applications: [
      "Autoimmune disease models for rheumatoid arthritis, lupus, and multiple sclerosis",
      "Inflammatory bowel disease and other inflammatory conditions",
      "Conditional knockouts in specific immune cell populations",
      "Humanized immune models express human cytokines, receptors, or immune checkpoints"
    ],
    link: "/immunology-mouse-models",
    color: "#2384da"
  },
  {
    title: "Cardiovascular Mouse Models",
    description: "Cardiovascular research encompasses atherosclerosis, heart failure, hypertension, cardiac fibrosis, and vascular disease. ingenious targeting laboratory provides models for studying cardiovascular pathophysiology and testing therapeutic approaches.",
    applications: [
      "Atherosclerosis models combine lipid metabolism gene modifications with ApoE or LDLR deficiency",
      "Conditional knockouts enable tissue specific studies in endothelium or smooth muscle",
      "Cardiac disease models address heart failure, arrhythmia, and fibrosis",
      "Ion channels, sarcomeric proteins, or signaling pathway component modifications"
    ],
    link: "/cardiovascular-mouse-models",
    color: "#008080"
  },
  {
    title: "Rare Disease Mouse Models",
    description: "Rare and orphan diseases affect small patient populations but often have high unmet need for effective therapies. ingenious targeting laboratory supports rare disease research with models for muscular dystrophies, lysosomal storage disorders, cystic fibrosis, and other inherited conditions.",
    applications: [
      "Muscular dystrophy models carry mutations in dystrophin, dysferlin, or other muscle proteins",
      "Enable study of disease mechanisms and testing of gene therapy approaches",
      "Lysosomal storage disorder models reproduce enzyme deficiencies",
      "Platforms for enzyme replacement and gene therapy development"
    ],
    link: "/knockout-mouse-models",
    color: "#2384da"
  },
  {
    title: "Ophthalmology Mouse Models",
    description: "Vision research addresses retinal degenerations, glaucoma, macular degeneration, and other ocular conditions. ingenious targeting laboratory provides models for studying photoreceptor biology, retinal pigment epithelium function, and visual pathway development.",
    applications: [
      "Retinal degeneration models carry mutations in rhodopsin, peripherin, or other photoreceptor genes",
      "Conditional approaches enable temporal control over degeneration onset",
      "Reporter knockins enable visualization of specific retinal cell populations",
      "Tracking of cell fate during development and disease"
    ],
    link: "/ophthalmology-mouse-models",
    color: "#008080"
  }
];

// Related Model Types
const relatedModelTypes = [
  { title: "Knockout Mouse Models", href: "/knockout-mouse-models" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" },
  { title: "Humanized Mouse Models", href: "/humanized-mouse-models" },
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const dunaiefTestimonial = getTestimonialById('dunaief-upenn')!;

const testimonials = [
  { quote: dunaiefTestimonial.quote, name: formatAuthorWithCredentials(dunaiefTestimonial), affiliation: dunaiefTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "What types of mouse models are available for different therapeutic areas?",
    answer: "Therapeutic area models include knockout models (loss-of-function studies), knockin models (point mutations, reporters, humanized sequences), conditional models (tissue-specific or temporal control), and humanized models (for therapeutic testing). Selection depends on disease mechanism, research question, and therapeutic strategy."
  },
  {
    question: "How do you select the right model type for a therapeutic area?",
    answer: "Model type selection depends on research question: use knockout for loss-of-function studies, knockin for patient mutations or reporters, conditional for tissue-specific studies or essential genes, and humanized for therapeutic testing requiring human targets. Our scientific consultants help match model type to research goals."
  },
  {
    question: "Can models be combined across therapeutic areas?",
    answer: "Yes. Models can be combined across therapeutic areas for multi-disease studies, comorbidity research, or complex disease modeling. For example, metabolic disease models can be combined with cardiovascular models, or oncology models can be combined with immunology models for immuno-oncology research."
  },
  {
    question: "How do therapeutic area models support drug development?",
    answer: "Therapeutic area models support drug development through target validation (confirming target relevance), efficacy testing (preclinical evaluation of drug candidates), biomarker discovery (identifying disease markers), and safety assessment (evaluating on-target and off-target effects). Humanized models enable testing of human-specific therapeutics."
  }
];

export default function TherapeuticAreasPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }

      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    };

    loadGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      <main id="main-content">
        {/* Hero Section */}
        <section
          ref={heroRef}
          style={{
            background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
            padding: '80px 20px 60px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <div
              className="hero-animate"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '6px 16px',
                borderRadius: '20px',
                marginBottom: '20px'
              }}
            >
              <IconTarget size={16} color="white" />
              <span style={{ color: 'white', fontSize: '.8rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>

            <h1
              className="hero-animate"
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2.8rem',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '20px'
              }}
            >
              {heroData.title}
            </h1>

            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.7rem',
                marginBottom: '15px',
                maxWidth: '800px'
              }}
            >
              {heroData.intro}
            </p>

            <p
              className="hero-animate"
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '.9rem',
                fontWeight: 400,
                lineHeight: '1.6rem',
                marginBottom: '25px',
                maxWidth: '800px'
              }}
            >
              {heroData.description}
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  minWidth: '160px',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>Request a Quote</span>
                <span>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '10px 20px',
                  minWidth: '160px',
                  border: '2px solid white',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>Talk to a Scientist</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ backgroundColor: '#0a253c', padding: '30px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center">
                  <div style={{ color: '#008080', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700 }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.85rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Therapeutic Areas Grid */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px', textAlign: 'center' }}>
              Explore Therapeutic Areas
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '40px', textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
              Custom mouse models for research across major disease categories, supporting both basic research and therapeutic development programs.
            </p>

            <div className="grid grid-cols-1 gap-8">
              {therapeuticAreas.map((area, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '8px', borderLeft: `4px solid ${area.color}` }}>
                  <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>
                    {area.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '.9rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                    {area.description}
                  </p>
                  
                  <h4 style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>
                    Key Applications
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                    {area.applications.map((app, appIndex) => (
                      <li key={appIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <IconCheckCircle size={16} color={area.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{app}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={area.link}
                    className="inline-flex items-center gap-2 transition-colors duration-300"
                    style={{ color: area.color, fontSize: '.85rem', fontWeight: 500 }}
                  >
                    <span>Learn more</span>
                    <IconChevronRight size={14} color={area.color} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: testimonials.length === 1 ? '900px' : '1100px', margin: '0 auto', width: '100%' }}>
            <h2 className="animate-in" style={{ textAlign: 'center', color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>What Researchers Say</h2>
            <div style={{ display: testimonials.length === 1 ? 'block' : 'grid', gridTemplateColumns: testimonials.length === 2 ? 'repeat(2, 1fr)' : testimonials.length >= 3 ? 'repeat(3, 1fr)' : undefined, gap: '24px' }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-in" style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: testimonials.length === 1 ? '48px 56px' : '30px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box', textAlign: testimonials.length === 1 ? 'center' : 'left' }}>
                  <IconQuote size={24} color="#008080" style={{ marginBottom: '15px', ...(testimonials.length === 1 ? { display: 'block', margin: '0 auto 15px' } : {}) }} />
                  <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: testimonials.length === 1 ? '1.1rem' : '.9rem', fontWeight: 400, lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px', flex: testimonials.length > 1 ? 1 : undefined }}>&ldquo;{testimonial.quote}&rdquo;</p>
                  <div style={{ marginTop: testimonials.length > 1 ? 'auto' : undefined }}>
                    <p style={{ color: '#333', fontFamily: 'Poppins, sans-serif', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>— {testimonial.name}</p>
                    <p style={{ color: '#666', fontFamily: 'Lato, sans-serif', fontSize: '.8rem', fontWeight: 400 }}>{testimonial.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Ready to discuss mouse models for your therapeutic area research? Our scientific team provides complimentary project consultation to help you design the optimal model for your disease research.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#008080',
                  padding: '12px 30px',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <span>Request a Quote</span>
                <span>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '12px 30px',
                  border: '2px solid white',
                  fontSize: '.9rem',
                  fontWeight: 500
                }}
              >
                <span>Free Consultation</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Lab Signals Newsletter CTA */}
        <section style={{ backgroundColor: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Disease Research Insights"
              description="Subscribe to Lab Signals for biweekly updates on disease models, therapeutic target validation, and translational research insights from our PhD scientists."
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', textAlign: 'center' }}>
              Related Model Types
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedModelTypes.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="animate-in inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    backgroundColor: 'white',
                    color: '#2384da',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    fontSize: '.85rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <UXUIDCFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Therapeutic Area Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom mouse models for oncology, neuroscience, metabolic disease, immunology, cardiovascular, and rare disease research. 2,500+ models since 1998.",
            "serviceType": "Therapeutic Area Mouse Models"
          })
        }}
      />
    </div>
  );
}
