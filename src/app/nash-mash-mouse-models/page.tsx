'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import UXUIDCFooter from '@/components/UXUIDC/Footer';
import UXUIDCAnimatedFAQ from '@/components/UXUIDC/AnimatedFAQ';
import UXUIDCAnimatedCounter from '@/components/UXUIDC/AnimatedCounter';
import { BreedingSchemeArchitectCTA, LabSignalsSignup } from '@/components/UXUIDC';
import { IconImage, IconQuote, IconChevronRight, IconCheckCircle, IconLayers } from '@/components/UXUIDC/Icons';

// Hero Data
const heroData = {
  badge: "Fatty Liver Disease Models",
  title: "NASH Mouse Models",
  intro: "Since 1998, ingenious targeting laboratory has supported metabolic liver disease research with custom mouse models enabling mechanistic studies of hepatic steatosis, steatohepatitis, and fibrosis progression underlying the global epidemic of metabolic dysfunction associated fatty liver disease.",
  description: "NASH MASH mouse models provide essential platforms for investigating the molecular pathways driving progression from simple steatosis to steatohepatitis and cirrhosis, testing hypotheses about lipotoxicity and inflammation, and developing therapies for this increasingly prevalent condition."
};

// Stats Data
const statsData = [
  { value: 2500, suffix: "+", label: "Projects Completed" },
  { value: 800, suffix: "+", label: "Publications" },
  { value: 26, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Success Rate" }
];

// Nomenclature Data
const nomenclatureData = [
  { term: "MAFLD", fullName: "Metabolic Associated Fatty Liver Disease", description: "Broader term encompassing hepatic steatosis associated with metabolic dysfunction, regardless of alcohol consumption." },
  { term: "MASLD", fullName: "Metabolic Dysfunction Associated Steatotic Liver Disease", description: "Current preferred terminology for non alcoholic fatty liver disease." },
  { term: "MASH", fullName: "Metabolic Dysfunction Associated Steatohepatitis", description: "The progressive form with inflammation and hepatocyte injury, previously termed NASH (non alcoholic steatohepatitis)." }
];

// Disease Progression Stages
const diseaseProgression = [
  { stage: "Simple Steatosis", description: "Hepatic fat accumulation (>5% of hepatocytes) without significant inflammation. Often reversible with lifestyle intervention." },
  { stage: "Steatohepatitis (MASH)", description: "Steatosis plus lobular inflammation, hepatocyte ballooning, and injury. Risk of progression to fibrosis." },
  { stage: "Fibrosis", description: "Collagen deposition and architectural distortion. Staged F0 to F4." },
  { stage: "Cirrhosis", description: "Advanced fibrosis with nodule formation. Risk of hepatocellular carcinoma and liver failure." }
];

// High Fat Diet Models
const highFatDietModels = [
  { name: "Standard High Fat Diet (HFD)", description: "45% to 60% fat calories produces obesity and hepatic steatosis in C57BL/6 mice over 12 to 24 weeks. Produces mild steatohepatitis but minimal fibrosis." },
  { name: "Western Diet", description: "High fat plus high fructose/sucrose mimics Western dietary patterns. More severe metabolic phenotype than HFD alone." },
  { name: "Fast Food Diet", description: "High fat, high cholesterol, high fructose combination produces more severe disease with fibrosis." }
];

// Specialized Dietary Models
const specializedDietModels = [
  { name: "Choline Deficient High Fat Diet (CDHFD)", description: "Choline deficiency accelerates steatohepatitis and fibrosis development. Widely used for rapid disease induction." },
  { name: "Methionine Choline Deficient Diet (MCD)", description: "Produces severe steatohepatitis and fibrosis but with weight loss rather than obesity. Does not model metabolic syndrome." },
  { name: "AMLN Diet (Amylin Liver NASH)", description: "High trans fat, high fructose, high cholesterol diet produces obesity, steatohepatitis, and fibrosis with metabolic syndrome features." },
  { name: "DIAMOND Model", description: "Isogenic C57BL/6J 129S1/SvImJ hybrid on Western diet develops full disease spectrum including hepatocellular carcinoma." }
];

// Lipid Metabolism Genes
const lipidMetabolismGenes = [
  { name: "PNPLA3 I148M Knockin", description: "The most common genetic risk variant for fatty liver disease in humans. Knockin mice with the human I148M variant develop more severe steatosis and fibrosis on lipogenic diets." },
  { name: "TM6SF2 E167K Knockin", description: "Second most common variant. Affects VLDL secretion and hepatic lipid accumulation." },
  { name: "HSD17B13 Loss of Function", description: "Protective variant in humans. HSD17B13 knockout mice show altered lipid metabolism." },
  { name: "MBOAT7 Variants", description: "Membrane bound O acyltransferase 7 variants affect phospholipid remodeling." }
];

// Insulin Signaling Models
const insulinSignalingModels = [
  { name: "Liver Specific Insulin Receptor Knockout (LIRKO)", description: "Hepatocyte insulin resistance model. Develops steatosis and glucose intolerance." },
  { name: "PTEN Liver Knockout", description: "Severe steatohepatitis and hepatocellular carcinoma development." },
  { name: "FXR Knockout", description: "Farnesoid X receptor deficiency affects bile acid and lipid metabolism." }
];

// Inflammatory Pathway Models
const inflammatoryPathwayModels = [
  { name: "NLRP3 Inflammasome", description: "Inflammasome activation drives steatohepatitis. NLRP3 knockout or knockin models for pathway analysis." },
  { name: "ASK1 Pathway", description: "Apoptosis signal regulating kinase 1 mediates lipotoxic injury." },
  { name: "TLR4 and Innate Immunity", description: "Toll like receptor signaling contributes to inflammation and fibrosis." }
];

// Background Strains
const backgroundStrains = [
  { strain: "C57BL/6", description: "Susceptible to diet induced obesity and steatosis. Standard background for MASH studies." },
  { strain: "C57BL/6J vs C57BL/6N", description: "Substrains differ in metabolic phenotypes. C57BL/6J carries Nnt mutation affecting glucose metabolism." },
  { strain: "129 Strains", description: "Generally resistant to diet induced obesity but susceptible when combined with genetic modifications." },
  { strain: "BALB/c", description: "Different metabolic response than C57BL/6." }
];

// Cell Type Specific Approaches
const cellTypeApproaches = [
  { cellType: "Hepatocyte Specific", cre: "Albumin Cre", application: "Targets hepatocytes for studying cell autonomous lipid metabolism and injury responses." },
  { cellType: "Kupffer Cell/Macrophage", cre: "LysM Cre or CX3CR1 Cre", application: "Targets resident and infiltrating macrophages for inflammation studies." },
  { cellType: "Hepatic Stellate Cell", cre: "LRAT Cre", application: "Targets stellate cells for fibrosis mechanism studies." },
  { cellType: "Cholangiocyte", cre: "CK19 Cre or Sox9 Cre", application: "Targets bile duct contributions." }
];

// Phenotyping - Metabolic Assessment
const metabolicAssessment = [
  { name: "Body Composition", description: "Weight, fat mass, lean mass by DEXA or MRI." },
  { name: "Glucose Homeostasis", description: "IPGTT, ITT, fasting glucose and insulin, HOMA IR." },
  { name: "Lipid Profiles", description: "Plasma triglycerides, cholesterol, free fatty acids." }
];

// Phenotyping - Liver Assessment
const liverAssessment = [
  { name: "Liver Weight and Triglycerides", description: "Hepatomegaly and hepatic lipid content." },
  { name: "Histopathology", description: "H&E for steatosis, inflammation, and ballooning. NAFLD Activity Score (NAS) for standardized grading." },
  { name: "Fibrosis Staging", description: "Sirius red or trichrome staining. Alpha SMA immunohistochemistry. Hydroxyproline content." }
];

// Therapeutic Targets
const therapeuticTargets = [
  "FXR agonists",
  "ACC inhibitors",
  "GLP1 analogs",
  "Thyroid hormone receptor agonists",
  "Anti inflammatory approaches",
  "Anti fibrotic therapies"
];

// Publications Data
// Publications Data - Verified with PubMed links (January 2026)
const publicationsData = [
  {
    authors: "Zhou Y et al.",
    year: "2025",
    title: "FAM83A acts as an amplifier for lipogenic signaling to facilitate the pathogenesis of metabolic dysfunction associated steatohepatitis.",
    journal: "Metabolism",
    volume: "166: 156164",
    link: "https://pubmed.ncbi.nlm.nih.gov/41338474/"
  },
  {
    authors: "Xu D et al.",
    year: "2025",
    title: "Decreased LONP1 expression exacerbates MASH induced liver fibrosis via elevated orotic acid levels.",
    journal: "Journal of Hepatology",
    volume: "Online ahead of print",
    link: "https://pubmed.ncbi.nlm.nih.gov/40784490/"
  }
];

// Testimonial Data
// Verified testimonials from master data - https://www.genetargeting.com/testimonials
import { getTestimonialById, formatAuthorWithCredentials } from '@/data/verifiedTestimonials';

const mirmiraTestimonial = getTestimonialById('mirmira-chicago')!;

const testimonials = [
  { quote: mirmiraTestimonial.quote, name: formatAuthorWithCredentials(mirmiraTestimonial), affiliation: mirmiraTestimonial.affiliation },
];

// Related Links
const relatedDiseaseModels = [
  { title: "Metabolic Disease Mouse Models", href: "/metabolic-disease-mouse-models" },
  { title: "Obesity Mouse Models", href: "/obesity-mouse-models" },
  { title: "Diabetes Mouse Models", href: "/diabetes-mouse-models" },
  { title: "Cardiovascular Mouse Models", href: "/cardiovascular-mouse-models" }
];

const relatedModelTypes = [
  { title: "Knockin Mouse Models", href: "/knockin-mouse-models" },
  { title: "Point Mutation Mice", href: "/point-mutation-mice" },
  { title: "Conditional Knockout Mouse Models", href: "/conditional-knockout-mouse-models" }
];

const relatedTechnologies = [
  { title: "Tissue Specific Knockout", href: "/tissue-specific-knockout" },
  { title: "C57BL/6 Mouse Background", href: "/c57bl6-mouse-background" }
];

// FAQ Data
const faqData = [
  {
    question: "What dietary models are used for MASH studies?",
    answer: "Common dietary models include high-fat diet (HFD), methionine-choline-deficient (MCD) diet, Western diet, and choline-deficient amino-acid defined (CDAA) diet. MCD diet rapidly induces steatohepatitis without obesity, while HFD models metabolic syndrome context. Selection depends on research question and timeline."
  },
  {
    question: "How do you model different stages of MASH progression?",
    answer: "Disease progression timelines vary by model and dietary protocol. Steatosis develops first, followed by steatohepatitis, then fibrosis with longer challenge periods or accelerating approaches. Genetic modifications can accelerate specific stages: combining conditional knockouts with dietary challenge enables study of mechanisms driving progression from steatosis to fibrosis. Contact us to discuss model selection for your study timeline."
  },
  {
    question: "What cell-type-specific approaches are used for MASH?",
    answer: "Hepatocyte-specific deletion uses Albumin-Cre for lipid metabolism studies. Macrophage/Kupffer cell deletion uses LysM-Cre or CX3CR1-Cre for inflammation studies. Hepatic stellate cell deletion uses LRAT-Cre for fibrosis mechanism studies. Cholangiocyte targeting uses CK19-Cre or Sox9-Cre."
  },
  {
    question: "Which mouse background is best for MASH studies?",
    answer: "C57BL/6 is the standard background for MASH studies due to susceptibility to diet-induced obesity and steatosis. Substrains differ: C57BL/6J carries Nnt mutation affecting glucose metabolism. C57BL/6N is commonly used and well-characterized. Both work, but consistency within a study is critical."
  },
  {
    question: "How long does it take to generate a MASH mouse model?",
    answer: "Custom model generation includes targeting construct design, ES cell targeting, chimera generation, and germline transmission. Conditional approaches for cell-type-specific studies follow similar workflows. Pre-germline characterization provides early validation of targeting before mouse generation. Contact us for current timeline estimates."
  }
];

export default function NashMashMouseModelsPage() {
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

          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div className="grid grid-cols-1 gap-12 items-center">
              <div>
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
                  <IconLayers size={16} color="white" />
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
                    marginBottom: '15px'
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
                    marginBottom: '25px'
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

        {/* Understanding NASH and MASH */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Understanding NASH and MASH
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              The terminology for fatty liver disease has evolved to better reflect its metabolic etiology:
            </p>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Current Nomenclature
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {nomenclatureData.map((item, index) => (
                <div
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '8px',
                    borderTop: '4px solid #008080'
                  }}
                >
                  <h4 style={{ color: '#008080', fontSize: '1.1rem', fontWeight: 700, marginBottom: '5px' }}>{item.term}</h4>
                  <p style={{ color: '#0a253c', fontSize: '.85rem', fontWeight: 600, marginBottom: '10px' }}>{item.fullName}</p>
                  <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{item.description}</p>
                </div>
              ))}
            </div>

            <h3 className="animate-in" style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Disease Progression
            </h3>
            <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {diseaseProgression.map((stage, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2384da',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#2384da',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.85rem',
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>{stage.stage}</h4>
                    <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dietary Models */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Dietary Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* High Fat Diet Models */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
                  High Fat Diet Models
                </h3>
                <div className="space-y-4">
                  {highFatDietModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#008080', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialized Dietary Models */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>
                  Specialized Dietary Models
                </h3>
                <div className="space-y-4">
                  {specializedDietModels.map((model, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#2384da', fontSize: '.9rem', fontWeight: 600, marginBottom: '5px' }}>{model.name}</h4>
                      <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Genetic Models */}
        <section style={{ backgroundColor: '#008080', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Genetic Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lipid Metabolism */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Lipid Metabolism Genes
                </h3>
                <div className="space-y-3">
                  {lipidMetabolismGenes.map((gene, index) => (
                    <div key={index} style={{ borderBottom: index < lipidMetabolismGenes.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none', paddingBottom: '10px' }}>
                      <h4 style={{ color: 'white', fontSize: '.85rem', fontWeight: 600, marginBottom: '3px' }}>{gene.name}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.8rem', lineHeight: '1.4rem' }}>{gene.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insulin Signaling */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Insulin Signaling and Metabolism
                </h3>
                <div className="space-y-3">
                  {insulinSignalingModels.map((model, index) => (
                    <div key={index} style={{ borderBottom: index < insulinSignalingModels.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none', paddingBottom: '10px' }}>
                      <h4 style={{ color: 'white', fontSize: '.85rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.8rem', lineHeight: '1.4rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inflammatory Pathway */}
              <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Inflammatory Pathway Models
                </h3>
                <div className="space-y-3">
                  {inflammatoryPathwayModels.map((model, index) => (
                    <div key={index} style={{ borderBottom: index < inflammatoryPathwayModels.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none', paddingBottom: '10px' }}>
                      <h4 style={{ color: 'white', fontSize: '.85rem', fontWeight: 600, marginBottom: '3px' }}>{model.name}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '.8rem', lineHeight: '1.4rem' }}>{model.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Design Considerations */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Model Design Considerations
            </h2>

            {/* Background Strain Selection */}
            <div className="animate-in" style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Background Strain Selection
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                Metabolic phenotypes are profoundly strain dependent:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {backgroundStrains.map((strain, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#f8f9fa',
                      padding: '20px',
                      borderRadius: '6px',
                      borderLeft: '4px solid #008080'
                    }}
                  >
                    <h4 style={{ color: '#0a253c', fontSize: '.95rem', fontWeight: 600, marginBottom: '5px' }}>{strain.strain}</h4>
                    <p style={{ color: '#555', fontSize: '.85rem', lineHeight: '1.5rem' }}>{strain.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/c57bl6-mouse-background" className="inline-flex items-center gap-2 transition-colors duration-300" style={{ color: '#008080', fontSize: '.85rem', fontWeight: 500 }}>
                  <span>Learn about C57BL/6 Background</span>
                  <IconChevronRight size={14} color="#008080" />
                </Link>
              </div>
            </div>

            {/* Cell Type Specific Approaches */}
            <div className="animate-in">
              <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px' }}>
                Cell Type Specific Approaches
              </h3>
              <p style={{ color: '#555', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '20px' }}>
                MASH involves multiple liver cell types:
              </p>
              <div className="animate-in" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#0a253c' }}>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cell Type</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Cre Driver</th>
                      <th style={{ padding: '12px 15px', textAlign: 'left', color: 'white', fontWeight: 600 }}>Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cellTypeApproaches.map((row, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white', borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px 15px', color: '#0a253c', fontWeight: 500 }}>{row.cellType}</td>
                        <td style={{ padding: '12px 15px', color: '#008080', fontWeight: 500 }}>{row.cre}</td>
                        <td style={{ padding: '12px 15px', color: '#555' }}>{row.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Phenotyping MASH Models */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>
              Phenotyping MASH Models
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Metabolic Assessment */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #008080' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Metabolic Assessment
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {metabolicAssessment.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <IconCheckCircle size={16} color="#008080" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                          <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Liver Assessment */}
              <div className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', borderTop: '4px solid #2384da' }}>
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Liver Assessment
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {liverAssessment.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <IconCheckCircle size={16} color="#2384da" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ color: '#0a253c', fontWeight: 600, fontSize: '.9rem' }}>{item.name}:</span>
                          <span style={{ color: '#555', fontSize: '.85rem', marginLeft: '5px' }}>{item.description}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Therapeutic Applications */}
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Therapeutic Applications
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '25px' }}>
              MASH models support preclinical development of multiple therapeutic approaches:
            </p>

            <div className="animate-in grid grid-cols-2 md:grid-cols-3 gap-4">
              {therapeuticTargets.map((target, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '15px 20px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <IconCheckCircle size={16} color="#008080" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'white', fontSize: '.85rem' }}>{target}</span>
                </div>
              ))}
            </div>

            <div className="animate-in" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '8px', marginTop: '30px' }}>
              <h3 style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                Combination Approaches
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '.9rem', lineHeight: '1.6rem' }}>
                Advanced MASH may require combination therapy targeting multiple disease mechanisms. Patient variant knockins, cell type specific deletions, and reporter integration enable sophisticated preclinical studies of complex therapeutic strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
              Selected Publications in MASH Research
            </h2>
            <p className="animate-in" style={{ color: '#555', fontSize: '.95rem', marginBottom: '30px' }}>
              According to PubMed, recent publications demonstrate the utility of genetically engineered mouse models in MASH research:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {publicationsData.map((pub, index) => (
                <div
                  key={index}
                  className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #2384da'
                  }}
                >
                  <p style={{ color: '#555', fontSize: '.85rem', marginBottom: '8px' }}>
                    <span style={{ color: '#0a253c', fontWeight: 500 }}>{pub.authors}</span> ({pub.year}).
                  </p>
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        fontSize: '.95rem',
                        color: '#008080',
                        fontWeight: 600,
                        marginBottom: '8px',
                        lineHeight: '1.5',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      {pub.title} ↗
                    </a>
                  ) : (
                    <p style={{ fontSize: '.95rem', color: '#333', fontWeight: 600, marginBottom: '8px', lineHeight: '1.5' }}>
                      {pub.title}
                    </p>
                  )}
                  <p style={{ color: '#666', fontSize: '.85rem', fontStyle: 'italic' }}>
                    <em>{pub.journal}</em>
                    {pub.volume && <span style={{ fontStyle: 'normal' }}> {pub.volume}</span>}
                  </p>
                </div>
              ))}
            </div>

            <div className="animate-in text-center" style={{ marginTop: '25px' }}>
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  backgroundColor: '#2384da',
                  color: 'white',
                  padding: '10px 25px',
                  borderRadius: '4px',
                  fontSize: '.85rem',
                  fontWeight: 500
                }}
              >
                <span>View All Publications</span>
                <IconChevronRight size={16} color="white" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
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
        <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="animate-in" style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '15px' }}>
              Start Your MASH Model Project
            </h2>
            <p className="animate-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.95rem', lineHeight: '1.7rem', marginBottom: '30px' }}>
              Our scientific consultants are ready to discuss your metabolic liver disease research requirements and recommend the optimal model design for your program. Initial consultation is provided at no charge and includes target analysis, model strategy recommendations, and timeline estimates.
            </p>
            <div className="animate-in flex flex-wrap justify-center gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: '#008080',
                  color: 'white',
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
        <BreedingSchemeArchitectCTA />

        {/* FAQ Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="animate-in" style={{ color: '#2384da', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <div className="animate-in">
              <UXUIDCAnimatedFAQ faqs={faqData} />
            </div>
          </div>
        </section>

        {/* Lab Signals Signup */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <LabSignalsSignup title="Metabolic Liver Disease Research Insights" />
          </div>
        </section>

        {/* Related Links Section */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Disease Models
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedDiseaseModels.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Model Types
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedModelTypes.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="#2384da" />
                        <span>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-in">
                <h3 style={{ color: '#0a253c', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '15px' }}>
                  Related Technologies
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {relatedTechnologies.map((link, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-teal-600"
                        style={{ color: '#2384da', fontSize: '.85rem' }}
                      >
                        <IconChevronRight size={12} color="#2384da" />
                        <span>{link.title}</span>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "NASH MASH Mouse Models",
            "provider": {
              "@type": "Organization",
              "name": "ingenious targeting laboratory"
            },
            "description": "Custom NASH and MASH mouse models for fatty liver disease research. Study non alcoholic steatohepatitis and metabolic liver disease.",
            "serviceType": "NASH Mouse Model Generation"
          })
        }}
      />
    </div>
  );
}
