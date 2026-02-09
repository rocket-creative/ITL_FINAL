'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { IconDNA, IconSettings, IconChevronRight, IconCheckCircle } from '@/components/UXUIDC/Icons';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import { UXUIDCResourceLinks, conditionalReversibleResources, BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';

// Hero Data
const heroData = {
  badge: "Inducible Gene Targeting",
  title: "Inducible Conditional Knockout",
  intro: "Since 1998, ingenious targeting laboratory has completed over 2,500 custom gene targeting projects, including conditional alleles compatible with inducible Cre systems. Our knockout models have supported research published in more than 800 peer reviewed articles, including in Science, Nature and Cell.",
  description: "Inducible conditional knockout combines the tissue specificity of conditional gene targeting with temporal control over when deletion occurs. By using tamoxifen inducible CreERT2 or doxycycline regulated systems, researchers can trigger gene deletion at any point in development or adult life, enabling study of gene function independent of developmental requirements and modeling acute versus chronic loss of function phenotypes."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Two Component System Data
const twoComponentData = {
  title: "How Inducible Systems Work",
  subtitle: "The Two Component System",
  intro: "Inducible conditional knockout requires two genetic components working together:",
  components: [
    {
      title: "Floxed (Conditional) Allele",
      description: "The target gene contains LoxP sites flanking critical exons. The floxed allele functions normally until exposed to Cre recombinase. ingenious targeting laboratory can generate these conditional alleles specific to your research."
    },
    {
      title: "Inducible Cre Driver",
      description: "A transgenic or knockin line expressing an inducible form of Cre recombinase. Cre activity is suppressed until an inducing agent (tamoxifen or doxycycline) is administered. There are repositories that offer these inducible lines. However, if you need a specialized inducible Cre driver, ingenious targeting laboratory has the expertise to produce these for you too."
    }
  ],
  note: "When both components are combined in the same animal, gene deletion can be triggered at the time of the investigator's choosing by administering the inducing agent."
};

// CreERT2 System Data
const creERT2Data = {
  title: "Tamoxifen Inducible (CreERT2) System",
  intro: "CreERT2 is the most widely used inducible Cre system. It consists of Cre recombinase fused to a modified estrogen receptor ligand binding domain:",
  steps: [
    "In the absence of tamoxifen, CreERT2 is sequestered in the cytoplasm",
    "Tamoxifen (or its metabolite 4 hydroxytamoxifen) binds the modified estrogen receptor",
    "Ligand binding triggers nuclear translocation of CreERT2",
    "Nuclear Cre catalyzes recombination between LoxP sites",
    "Gene deletion is permanent once recombination occurs"
  ],
  note: "Recombination typically occurs within days of tamoxifen administration, with maximal deletion achieved by 1 to 2 weeks post treatment depending on dosing regimen."
};

// Ubiquitous Cre Drivers Data
const ubiquitousDriversData = {
  title: "Ubiquitous Inducible Cre",
  intro: "Ubiquitous CreERT2 drivers enable global gene deletion in adult animals:",
  drivers: [
    { driver: "Rosa26 CreERT2", expression: "Ubiquitous", applications: "Global adult deletion" },
    { driver: "CAG CreERT2", expression: "Ubiquitous strong", applications: "High efficiency global deletion" },
    { driver: "UBC CreERT2", expression: "Ubiquitous", applications: "Global adult deletion" }
  ],
  note: "Ubiquitous drivers provide adult onset global knockout, bypassing developmental lethality while achieving widespread gene deletion."
};

// Tissue Specific Cre Drivers Data
const tissueDriversData = {
  title: "Tissue Specific Inducible Cre",
  intro: "Tissue specific CreERT2 drivers combine spatial and temporal control:",
  drivers: [
    { driver: "Albumin CreERT2", tissue: "Hepatocytes", applications: "Adult liver metabolism" },
    { driver: "Adiponectin CreERT2", tissue: "Adipocytes", applications: "Adult adipose function" },
    { driver: "CamKII CreERT2", tissue: "Forebrain neurons", applications: "Adult neural function" },
    { driver: "Myh6 CreERT2", tissue: "Cardiomyocytes", applications: "Adult cardiac function" },
    { driver: "LysM CreERT2", tissue: "Macrophages", applications: "Adult innate immunity" },
    { driver: "CD4 CreERT2", tissue: "T cells", applications: "Adult T cell function" }
  ],
  note: "Tissue specific CreERT2 lines enable gene deletion in defined adult cell populations without affecting development of those tissues."
};

// When to Use Data
const whenToUseData = {
  title: "When to Use Inducible Systems",
  useCases: [
    {
      title: "Bypassing Developmental Lethality",
      description: "Many genes are essential for embryonic development. Conventional knockout is lethal, and even tissue specific conditional knockout may cause developmental defects if deletion occurs during organogenesis. Inducible systems enable gene deletion after development is complete, allowing study of adult gene function."
    },
    {
      title: "Distinguishing Developmental from Adult Roles",
      description: "Genes may have distinct functions during development versus adulthood. Constitutive deletion conflates these roles. Inducible deletion in adults reveals the gene's ongoing function independent of its developmental requirements.",
      example: "A gene required for neuronal migration during development may also regulate synaptic plasticity in adults. Inducible knockout allows study of the adult synaptic function without the confounding effects of abnormal neuronal positioning."
    },
    {
      title: "Modeling Drug Target Inhibition",
      description: "Inducible knockout most closely models therapeutic target inhibition: Patient has normal target function before treatment, drug administration causes acute target inhibition. Inducible knockout mirrors this: normal function until tamoxifen triggers deletion.",
      note: "This makes inducible systems valuable for drug target validation, predicting consequences of pharmacological inhibition rather than lifelong gene absence."
    },
    {
      title: "Studying Acute vs Chronic Phenotypes",
      description: "Constitutive knockouts represent chronic, lifelong gene loss. Inducible knockouts enable study of acute effects immediately following gene deletion, as well as progression of phenotypes over time. This temporal resolution is valuable for understanding disease mechanisms and therapeutic windows."
    },
    {
      title: "Avoiding Developmental Compensation",
      description: "When genes are deleted early in development, compensatory mechanisms may mask the full phenotype. Related genes may upregulate, alternative pathways may activate. Deleting genes in adults, after these developmental adaptations have occurred, can reveal stronger or different phenotypes."
    }
  ]
};

// Technical Considerations Data
const technicalData = {
  title: "Technical Considerations",
  sections: [
    {
      title: "Tamoxifen Administration",
      intro: "Tamoxifen dosing affects recombination efficiency:",
      routes: [
        { route: "IP injection", dose: "75 to 100 mg/kg", duration: "3 to 5 days", efficiency: "High" },
        { route: "Oral gavage", dose: "100 to 200 mg/kg", duration: "3 to 5 days", efficiency: "High" },
        { route: "Tamoxifen diet", dose: "400 mg/kg chow", duration: "1 to 4 weeks", efficiency: "Moderate" },
        { route: "Topical (skin)", dose: "Variable", duration: "Variable", efficiency: "Localized" }
      ],
      note: "Higher doses and longer treatment increase recombination efficiency but may cause tamoxifen related effects. Optimize dosing for your specific CreERT2 line and target tissue."
    },
    {
      title: "Recombination Efficiency",
      intro: "Not all cells in a target population may undergo recombination:",
      points: [
        "Efficiency varies by CreERT2 driver and target tissue",
        "Some cells may escape recombination",
        "Mosaic deletion may occur within tissues",
        "Validate recombination efficiency with reporter crosses"
      ],
      note: "Cross inducible Cre to a reporter line (Rosa26 tdTomato) and assess reporter expression after tamoxifen to validate your specific experimental system."
    },
    {
      title: "Controls for Inducible Experiments",
      intro: "Proper controls account for tamoxifen effects and Cre expression:",
      controls: [
        "Floxed only + tamoxifen: Controls for tamoxifen effects",
        "CreERT2 only + tamoxifen: Controls for Cre expression and tamoxifen",
        "Floxed + CreERT2 without tamoxifen: Controls for leaky Cre activity",
        "Floxed + CreERT2 + tamoxifen: Experimental group"
      ]
    },
    {
      title: "Leaky Cre Activity",
      description: "Some CreERT2 lines show low level activity without tamoxifen (leaky expression). This can cause background recombination that accumulates over time. Evaluate potential leaky activity by assessing recombination in uninduced animals, particularly for long term studies."
    }
  ]
};

// Tet Systems Data
const tetSystemsData = {
  title: "Doxycycline Inducible (Tet) Systems",
  intro: "Tetracycline regulated systems use doxycycline to control gene expression:",
  systems: [
    { system: "Tet On", mechanism: "rtTA activates TRE promoter", doxEffect: "Dox induces Cre expression", applications: "Timed gene deletion" },
    { system: "Tet Off", mechanism: "tTA activates TRE promoter", doxEffect: "Dox suppresses Cre expression", applications: "Continuous expression until suppressed" }
  ],
  note: "Unlike CreERT2 where deletion is permanent, Tet systems controlling Cre expression can provide ongoing control. However, once recombination occurs at a locus, that deletion is irreversible regardless of subsequent doxycycline manipulation."
};

// Publications Data
const publicationsData = {
  title: "Selected Publications",
  intro: "Cre models generated by ingenious targeting laboratory:",
  publications: [
    "Lee B, Kwon JT, Jeong Y, Caris H, Oh D, Feng M, Davila Mejia I, Zhang X, Ishikawa T, Watson BR, Moffitt JR, Chung K, Huh JR, Choi GB. 2025. Inflammatory and anti-inflammatory cytokines bidirectionally modulate amygdala circuits regulating anxiety. Cell 8(188): 2190-2202.e15.",
    "Tsvilovskyy V, Ottenheijm R, Kriebs U, Schütz A, Diakopoulos KN, Jha A, Bildl W, Wirth A, Böck J, Jaślan D, Ferro I, Taberner FJ, Kalinina O, et al. 2024. OCaR1 endows exocytic vesicles with autoregulatory competence by preventing uncontrolled Ca2+ release, exocytosis, and pancreatic tissue damage. J Clin Invest 134(7): e169428.",
    "Souza G, Stornetta DS, Shi Y, Lim E, Berry FE, Bayliss DA, Abbott SBG. 2023. Neuromedin B-expressing neurons in the retrotrapezoid nucleus regulate respiratory homeostasis and promote stable breathing in adult mice. J Neurosci 43(30): 5501-5520."
  ]
};

// Testimonials Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const rothTestimonial = getTestimonialById('roth-upenn')!;

const testimonialsData = [
  { quote: rothTestimonial.quote, author: formatAuthorWithCredentials(rothTestimonial), affiliation: rothTestimonial.affiliation },
];

// FAQ Data
const faqData = [
  {
    question: "What is the difference between inducible conditional knockout and regular conditional knockout?",
    answer: "Inducible conditional knockout uses tamoxifen-inducible Cre (CreER) to enable temporal control of gene deletion. Regular conditional knockout uses constitutive Cre drivers that delete genes during development. Inducible systems allow adult-onset deletion, avoiding developmental effects and enabling study of acute gene function."
  },
  {
    question: "When should I use inducible knockout instead of constitutive conditional knockout?",
    answer: "Use inducible knockout when genes are essential for development (would cause lethality if deleted early), when you need to study acute vs chronic phenotypes, when modeling drug target inhibition (requires adult-onset deletion), or when avoiding developmental compensation is important for revealing true gene function."
  },
  {
    question: "How is tamoxifen administered for inducible knockout?",
    answer: "Tamoxifen is typically administered via IP injection, oral gavage, or tamoxifen diet. IP injection and oral gavage provide rapid, high-efficiency recombination. Diet provides more convenient long-term administration. Dosing protocols vary by experimental requirements. Contact us to discuss optimal induction strategies for your study."
  },
  {
    question: "What controls are needed for inducible knockout experiments?",
    answer: "Essential controls include Cre-positive, flox-negative mice (to detect Cre toxicity), flox-positive, Cre-negative mice (to detect tamoxifen effects), and vehicle-treated controls (to detect tamoxifen-specific effects). Reporter crosses (Rosa26-tdTomato) validate recombination efficiency in your specific system."
  }
];

// Related Links Data
const relatedLinksData = {
  modelTypes: [
    { href: "/conditional-knockout-mouse-models", label: "Conditional Knockout Models" },
    { href: "/tissue-specific-knockout", label: "Tissue Specific Knockout" },
    { href: "/knockout-mouse-models", label: "Knockout Mouse Models" }
  ],
  technologies: [
    { href: "/cre-lox-system", label: "Cre Lox System" }
  ],
  guides: [
    { href: "/knockout-strategy-guide", label: "Knockout Strategy Guide" },
    { href: "/conditional-vs-conventional-guide", label: "Conditional vs Conventional Guide" },
    { href: "/cre-line-selection-guide", label: "Cre Line Selection Guide" }
  ]
};

// CTA Data
const ctaData = {
  title: "Start Your Inducible Conditional Knockout Project",
  description: "Our scientific consultants are ready to discuss your research requirements and optimal inducible strategy for your experimental goals. Initial consultation is provided at no charge and includes design considerations, timeline, and price estimates.",
  primaryButton: { href: "/request-quote", label: "Request a Quote" },
  secondaryButton: { href: "/contact", label: "Contact Us" }
};

export default function InducibleConditionalKnockoutPage() {
  const animatedElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const heroElements = document.querySelectorAll('.hero-animate');
      heroElements.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power2.out" }
        );
      });

      const animatedElements = document.querySelectorAll('.animate-in');
      animatedElements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    };

    initGSAP();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Inducible Conditional Knockout Mouse Models",
            "description": "Custom inducible conditional knockout mouse models. Tamoxifen inducible CreERT2 and doxycycline regulated systems for temporal gene control since 1998.",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory",
              "url": "https://www.genetargeting.com"
            },
            "serviceType": "Custom Mouse Model Generation",
            "areaServed": "Worldwide"
          })
        }}
      />
      <UXUIDCNavigation />
      <main ref={animatedElementsRef}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)',
          padding: '80px 20px 60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05
          }}>
            <div style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00d4d4 0%, transparent 70%)',
              top: '-200px',
              right: '-200px'
            }} />
          </div>
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="hero-animate" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,212,212,0.15)',
              border: '1px solid rgba(0,212,212,0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <IconSettings size={14} color="#00d4d4" />
              <span style={{ color: '#00d4d4', fontSize: '.85rem', fontWeight: 500 }}>{heroData.badge}</span>
            </div>
            <h1 className="hero-animate" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: 1.2
            }}>
              {heroData.title}
            </h1>
            <p className="hero-animate" style={{
              fontSize: '1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '16px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.intro}
            </p>
            <p className="hero-animate" style={{
              fontSize: '.9rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '30px',
              lineHeight: 1.7,
              maxWidth: '800px'
            }}>
              {heroData.description}
            </p>
            <div className="hero-animate" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/request-quote" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#008080',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Request a Quote
                <IconChevronRight size={16} color="#ffffff" />
              </Link>
              <Link href="/conditional-knockout-mouse-models" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                Conditional Knockout Models
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ background: '#ffffff', padding: '40px 20px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {statsData.map((stat, index) => (
                <div key={index} className="animate-in" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#008080', marginBottom: '4px' }}>
                    <UXUIDCAnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: '.85rem', color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two Component System Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              {twoComponentData.title}
            </h2>
            <h3 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {twoComponentData.subtitle}
            </h3>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.6
            }}>
              {twoComponentData.intro}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {twoComponentData.components.map((component, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #008080'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,128,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconDNA size={24} color="#008080" />
                  </div>
                  <h4 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {component.title}
                  </h4>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6 }}>
                    {component.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="animate-in" style={{
              fontSize: '.85rem',
              color: '#333',
              fontWeight: 500,
              textAlign: 'center',
              marginTop: '24px',
              lineHeight: 1.6
            }}>
              {twoComponentData.note}
            </p>
          </div>
        </section>

        {/* CreERT2 System Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
              background: '#f7f7f7',
              borderRadius: '8px',
              padding: '32px',
              borderLeft: '4px solid #008080'
            }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '16px'
              }}>
                {creERT2Data.title}
              </h2>
              <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '20px', lineHeight: 1.6 }}>
                {creERT2Data.intro}
              </p>
              <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', counterReset: 'step' }}>
                {creERT2Data.steps.map((step, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '.9rem',
                    color: '#666',
                    marginBottom: '12px',
                    lineHeight: 1.5
                  }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#008080',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '.75rem',
                      fontWeight: 600,
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.6, background: 'rgba(0,128,128,0.05)', padding: '12px', borderRadius: '6px' }}>
                {creERT2Data.note}
              </p>
            </div>
          </div>
        </section>

        {/* Cre Drivers Tables Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Ubiquitous Drivers */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {ubiquitousDriversData.title}
              </h2>
              <p style={{
                fontSize: '.9rem',
                color: '#666',
                textAlign: 'center',
                marginBottom: '24px',
                lineHeight: 1.6
              }}>
                {ubiquitousDriversData.intro}
              </p>
              <div style={{
                background: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#0a253c' }}>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Driver</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Expression</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ubiquitousDriversData.drivers.map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.driver}</td>
                        <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.expression}</td>
                        <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{
                fontSize: '.85rem',
                color: '#333',
                fontWeight: 500,
                textAlign: 'center',
                marginTop: '16px',
                lineHeight: 1.6
              }}>
                {ubiquitousDriversData.note}
              </p>
            </div>

            {/* Tissue Specific Drivers */}
            <div className="animate-in">
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#2384da',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {tissueDriversData.title}
              </h2>
              <p style={{
                fontSize: '.9rem',
                color: '#666',
                textAlign: 'center',
                marginBottom: '24px',
                lineHeight: 1.6
              }}>
                {tissueDriversData.intro}
              </p>
              <div style={{
                background: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#0a253c' }}>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Driver</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Target Tissue</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tissueDriversData.drivers.map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.driver}</td>
                        <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.tissue}</td>
                        <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.applications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{
                fontSize: '.85rem',
                color: '#333',
                fontWeight: 500,
                textAlign: 'center',
                marginTop: '16px',
                lineHeight: 1.6
              }}>
                {tissueDriversData.note}
              </p>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link href="/tissue-specific-knockout" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#008080',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>
                  View Tissue Specific Cre Lines
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {whenToUseData.title}
            </h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {whenToUseData.useCases.map((useCase, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#f7f7f7',
                  borderRadius: '8px',
                  padding: '24px',
                  borderLeft: '4px solid #008080'
                }}>
                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '12px'
                  }}>
                    {useCase.title}
                  </h3>
                  <p style={{ fontSize: '.9rem', color: '#666', marginBottom: useCase.example || useCase.note ? '12px' : 0, lineHeight: 1.6 }}>
                    {useCase.description}
                  </p>
                  {useCase.example && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontStyle: 'italic', marginBottom: useCase.note ? '12px' : 0, lineHeight: 1.6 }}>
                      Example: {useCase.example}
                    </p>
                  )}
                  {useCase.note && (
                    <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.6, background: 'rgba(0,128,128,0.05)', padding: '12px', borderRadius: '6px' }}>
                      {useCase.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Considerations Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              {technicalData.title}
            </h2>
            <div style={{ display: 'grid', gap: '24px' }}>
              {technicalData.sections.map((section, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '24px',
                  borderTop: '4px solid #00d4d4'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(0,128,128,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconSettings size={24} color="#008080" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '12px'
                      }}>
                        {section.title}
                      </h3>
                      {section.intro && (
                        <p style={{ fontSize: '.9rem', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
                          {section.intro}
                        </p>
                      )}
                      {section.description && (
                        <p style={{ fontSize: '.9rem', color: '#666', marginBottom: section.note ? '16px' : 0, lineHeight: 1.6 }}>
                          {section.description}
                        </p>
                      )}
                      {section.routes && (
                        <div style={{ background: '#f7f7f7', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr style={{ background: '#0a253c' }}>
                                <th style={{ padding: '10px 12px', textAlign: 'left', color: '#ffffff', fontSize: '.8rem', fontWeight: 600 }}>Route</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', color: '#ffffff', fontSize: '.8rem', fontWeight: 600 }}>Dose</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', color: '#ffffff', fontSize: '.8rem', fontWeight: 600 }}>Duration</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', color: '#ffffff', fontSize: '.8rem', fontWeight: 600 }}>Efficiency</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.routes.map((row, rIndex) => (
                                <tr key={rIndex} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                  <td style={{ padding: '10px 12px', fontSize: '.85rem', color: '#333', fontWeight: 500 }}>{row.route}</td>
                                  <td style={{ padding: '10px 12px', fontSize: '.85rem', color: '#666' }}>{row.dose}</td>
                                  <td style={{ padding: '10px 12px', fontSize: '.85rem', color: '#666' }}>{row.duration}</td>
                                  <td style={{ padding: '10px 12px', fontSize: '.85rem', color: '#666' }}>{row.efficiency}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {section.points && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                          {section.points.map((point, pIndex) => (
                            <li key={pIndex} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '.85rem',
                              color: '#666',
                              marginBottom: '6px',
                              lineHeight: 1.5
                            }}>
                              <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.controls && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                          {section.controls.map((control, cIndex) => (
                            <li key={cIndex} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '.85rem',
                              color: '#666',
                              marginBottom: '6px',
                              lineHeight: 1.5
                            }}>
                              <IconCheckCircle size={14} color="#008080" style={{ flexShrink: 0, marginTop: '3px' }} />
                              {control}
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.note && (
                        <p style={{ fontSize: '.85rem', color: '#333', fontWeight: 500, lineHeight: 1.5 }}>
                          {section.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tet Systems Section */}
        <section style={{ background: '#ffffff', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {tetSystemsData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.6
            }}>
              {tetSystemsData.intro}
            </p>
            <div className="animate-in" style={{
              background: '#f7f7f7',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a253c' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>System</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Mechanism</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Dox Effect</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#ffffff', fontSize: '.9rem', fontWeight: 600 }}>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {tetSystemsData.systems.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#333', fontWeight: 600 }}>{row.system}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.mechanism}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.doxEffect}</td>
                      <td style={{ padding: '14px 20px', fontSize: '.9rem', color: '#666' }}>{row.applications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="animate-in" style={{
              fontSize: '.85rem',
              color: '#333',
              fontWeight: 500,
              textAlign: 'center',
              marginTop: '20px',
              lineHeight: 1.6
            }}>
              {tetSystemsData.note}
            </p>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {publicationsData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '30px',
              lineHeight: 1.6
            }}>
              {publicationsData.intro}
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {publicationsData.publications.map((pub, index) => (
                <div key={index} className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '20px',
                  borderLeft: '4px solid #008080'
                }}>
                  <p style={{ fontSize: '.9rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{pub}</p>
                </div>
              ))}
            </div>
            <div className="animate-in" style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link href="/publications" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#008080',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                View All Publications
                <IconChevronRight size={16} color="#008080" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonialsData} variant="dark" />

        {/* CTA Section */}
        <section style={{ background: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              {ctaData.title}
            </h2>
            <p className="animate-in" style={{
              fontSize: '.9rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '30px',
              lineHeight: 1.7
            }}>
              {ctaData.description}
            </p>
            <div className="animate-in" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href={ctaData.primaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#008080',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                {ctaData.primaryButton.label}
                <IconChevronRight size={16} color="#008080" />
              </Link>
              <Link href={ctaData.secondaryButton.href} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                {ctaData.secondaryButton.label}
              </Link>
            </div>
          </div>
        </section>

        {/* Breeding Scheme Architect CTA */}
        <BreedingSchemeArchitectCTA variant="gradient" />

        {/* Downloadable Resources Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <UXUIDCResourceLinks
              title="Inducible & Reversible Resources"
              description="Download our free guides for inducible and reversible conditional knockout project planning."
              resources={conditionalReversibleResources}
              variant="card"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ background: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2384da',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup 
              variant="banner"
              title="Inducible Knockout Insights"
              description="Stay updated on inducible gene targeting strategies, temporal control techniques, and breakthrough advances in conditional knockout technology. Expert insights from our PhD scientists."
            />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ background: '#f7f7f7', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Related Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.modelTypes.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Related Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.technologies.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-in">
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  Guides
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {relatedLinksData.guides.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link href={link.href} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#008080',
                        fontSize: '.9rem',
                        textDecoration: 'none'
                      }}>
                        <IconChevronRight size={14} color="#008080" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UXUIDCFooter />
    </div>
  );
}
