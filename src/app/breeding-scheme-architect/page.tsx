'use client';

/**
 * Breeding Scheme Architect - Free Mouse Genetics Planning Tool
 * Master text from: /breeding-scheme-architect.md
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCAnimatedFAQ,
  UXUIDCStartProjectCTA,
} from '@/components/UXUIDC';
import {
  IconDNA,
  IconTarget,
  IconSettings,
  IconClipboard,
  IconCheckCircle,
  IconEye,
  IconBarChart,
  IconCalendar,
  IconMessageCircle,
  IconArrowRight,
  IconDownload,
  IconLink,
  IconBookOpen,
} from '@/components/UXUIDC/Icons';

import { Allele, TargetGenotype, BreedingPlan } from './components/lib/types';
import { generateBreedingPlan } from './components/lib/breedingCalculations';
import AlleleInputPanel from './components/AlleleInputPanel';
import TargetGenotypePanel from './components/TargetGenotypePanel';
import BreedingPathVisualizer from './components/BreedingPathVisualizer';
import StatisticsPanel from './components/StatisticsPanel';
import { AIAccessProvider, AIAssistantPanel, ConsultationModal } from './components/ai';

gsap.registerPlugin(ScrollTrigger);

// ========== FAQ DATA ==========
const faqs = [
  {
    question: 'What breeding schemes can this tool plan?',
    answer:
      'The breeding scheme architect handles complex multi allele crosses including conditional knockouts with Cre lox systems, reporter alleles, humanized models, and combinations of up to six different alleles. It calculates optimal breeding paths, expected genotype ratios, and estimates time to experimental cohorts.',
  },
  {
    question: 'How does the tool calculate breeding pair numbers?',
    answer:
      'The calculator uses established statistical methods similar to published research tools, accounting for Mendelian inheritance ratios, strain specific litter sizes (C57BL/6 averages 6 to 8 pups), breeding efficiency (approximately 80%), and your target sample size requirements.',
  },
  {
    question: 'Can I save my breeding schemes?',
    answer:
      'Yes. Create a free account to save breeding schemes, export them as PDF documents, or generate shareable links for collaborators. Your saved schemes remain accessible for future reference and modification.',
  },
  {
    question: 'What happens if my alleles are on the same chromosome?',
    answer:
      'The tool will alert you when alleles may be linked on the same chromosome, which affects recombination rates and inheritance patterns. In these cases, consult with our scientific team for guidance on optimal breeding strategies for linked alleles.',
  },
  {
    question: 'How do I get help with my specific breeding project?',
    answer:
      'Request a project consultation to discuss your breeding scheme with our scientific team. We can help optimize your strategy, recommend appropriate Cre driver lines, and design custom models if needed. Consultation requests receive responses within one business day.',
  },
];

// ========== HOW IT WORKS DATA ==========
const howItWorksSteps = [
  {
    number: '1',
    title: 'Define Your Alleles',
    description:
      'Enter each allele you need to combine in your final model. Include knockouts, Cre drivers, reporters, or humanized alleles. Specify starting genotypes and chromosomal locations if known to help identify potential linkage issues.',
    icon: IconDNA,
  },
  {
    number: '2',
    title: 'Set Target Genotypes',
    description:
      'Define the experimental and control genotypes you need for your study. Specify how many mice of each genotype are required and any sex requirements. The tool accounts for Mendelian ratios when calculating breeding numbers.',
    icon: IconTarget,
  },
  {
    number: '3',
    title: 'Generate Breeding Plan',
    description:
      'The algorithm calculates the optimal sequence of crosses, identifies when to fix alleles to homozygosity, and maps the path from your starting strains to study ready cohorts. View expected offspring ratios at each generation.',
    icon: IconSettings,
  },
  {
    number: '4',
    title: 'Export or Consult',
    description:
      'Save your breeding plan as a PDF, share with collaborators, or request a consultation with our scientific team. We can help optimize your strategy, recommend Cre driver lines, or design custom models for your research.',
    icon: IconClipboard,
  },
];

// ========== BENEFITS DATA ==========
const benefits = [
  {
    title: 'Visualize Complex Crosses',
    description:
      'See your entire breeding strategy mapped out generation by generation. Understand which crosses to prioritize and when you can expect to have experimental cohorts ready.',
    icon: IconEye,
  },
  {
    title: 'Optimize Resource Use',
    description:
      'Calculate the number of breeding pairs and total mice needed to achieve your target sample sizes. Plan cage requirements and budget before starting.',
    icon: IconBarChart,
  },
  {
    title: 'Avoid Common Mistakes',
    description:
      'The tool warns about embryonic lethal genotype combinations, germline Cre activity issues, and potential linkage problems that could complicate your breeding scheme.',
    icon: IconCheckCircle,
  },
  {
    title: 'Plan Before You Order',
    description:
      'Use the breeding scheme architect before ordering custom models to understand post delivery breeding requirements and timeline to study ready cohorts.',
    icon: IconCalendar,
  },
];

// ========== RELATED RESOURCES ==========
const relatedResources = [
  {
    title: 'Cre Lox System',
    link: '/cre-lox-system',
    description: 'Understanding Cre recombinase and LoxP sites for conditional gene targeting',
  },
  {
    title: 'Conditional vs Conventional Guide',
    link: '/conditional-vs-conventional-guide',
    description: 'Choose the right knockout strategy for your research goals',
  },
  {
    title: 'Breeding Services',
    link: '/speed-expansion-breeding',
    description: 'Professional breeding services to accelerate your project timeline',
  },
  {
    title: 'Request Project Consultation',
    link: '/request-quote',
    description: 'Discuss your project with our scientific team',
  },
];

function BreedingSchemeArchitectContent() {
  const heroRef = useRef<HTMLElement>(null);
  const [alleles, setAlleles] = useState<Allele[]>([]);
  const [targetGenotypes, setTargetGenotypes] = useState<TargetGenotype[]>([]);
  const [breedingPlan, setBreedingPlan] = useState<BreedingPlan | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isAICollapsed, setIsAICollapsed] = useState(true);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      const sections = document.querySelectorAll('.animate-in');
      sections.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const handleGeneratePlan = () => {
    if (alleles.length === 0) return;

    setIsCalculating(true);

    // Simulate calculation time for UX
    setTimeout(() => {
      const plan = generateBreedingPlan(alleles, targetGenotypes);
      setBreedingPlan(plan);
      setIsCalculating(false);

      // Scroll to results
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  };

  // Handler for AI to add alleles
  const handleAIAddAllele = (alleleData: Omit<Allele, 'id'>) => {
    const newAllele: Allele = {
      id: `allele-${Date.now()}`,
      ...alleleData,
    };
    setAlleles((prev) => [...prev, newAllele]);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />

      {/* ========== HERO SECTION ========== */}
      <section
        ref={heroRef}
        style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)',
          padding: '80px 20px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              padding: '6px 16px',
              borderRadius: '20px',
              marginBottom: '20px',
            }}
          >
            <IconDNA size={16} color="#00d4d4" />
            <span
              style={{
                color: 'white',
                fontSize: '.8rem',
                fontWeight: 500,
                fontFamily: 'var(--system-ui)',
              }}
            >
              Free Research Tool
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2.8rem',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-.5px',
              marginBottom: '20px',
              maxWidth: '700px',
            }}
          >
            Plan Complex Breeding Schemes
          </h1>

          {/* Intro Paragraph */}
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'var(--system-ui)',
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: '1.7rem',
              maxWidth: '700px',
              marginBottom: '30px',
            }}
          >
            Visualize multi allele breeding strategies, calculate expected genotype ratios,
            and estimate time to experimental cohorts. The breeding scheme architect helps
            researchers plan knockout, knockin, Cre lox, and humanized model breeding before
            starting a project. Since 1998, ingenious targeting laboratory has helped
            researchers navigate complex breeding strategies for over 2,500 custom mouse
            model projects.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a
              href="#tool-section"
              style={{
                backgroundColor: 'white',
                color: '#0a253c',
                padding: '10px 20px',
                minWidth: '160px',
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s',
              }}
              className="hover:-translate-y-1 hover:shadow-lg"
            >
              Start Planning
              <IconArrowRight size={16} />
            </a>
            <Link
              href="/request-quote"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '10px 20px',
                minWidth: '160px',
                border: '2px solid white',
                fontFamily: 'var(--system-ui)',
                fontSize: '.85rem',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              className="hover:bg-white hover:text-[#0a253c]"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TOOL INTERFACE SECTION ========== */}
      <section
        id="tool-section"
        style={{ backgroundColor: 'white', padding: '60px 20px' }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            className="animate-in"
            style={{
              color: '#2384da',
              textAlign: 'center',
              letterSpacing: '-.5px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: '15px',
            }}
          >
            Design Your Breeding Strategy
          </h2>
          <p
            className="animate-in"
            style={{
              color: '#666',
              textAlign: 'center',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.6rem',
              maxWidth: '700px',
              margin: '0 auto 40px',
            }}
          >
            Add your starting alleles, define your target genotypes, and generate an
            optimized breeding plan. The tool calculates expected offspring ratios,
            identifies optimal cross sequences, and estimates timeline to study ready
            cohorts.
          </p>

          {/* Allele Input */}
          <div className="animate-in">
            <AlleleInputPanel alleles={alleles} onAllelesChange={setAlleles} />
          </div>

          {/* Target Genotypes */}
          <div className="animate-in">
            <TargetGenotypePanel
              alleles={alleles}
              targetGenotypes={targetGenotypes}
              onTargetGenotypesChange={setTargetGenotypes}
            />
          </div>

          {/* Generate Button */}
          <div className="animate-in" style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={handleGeneratePlan}
              disabled={alleles.length === 0 || isCalculating}
              style={{
                backgroundColor: alleles.length > 0 ? '#008080' : '#ccc',
                color: 'white',
                padding: '15px 40px',
                minWidth: '250px',
                fontFamily: 'var(--system-ui)',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: alleles.length > 0 ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
              className={alleles.length > 0 ? 'hover:-translate-y-1 hover:shadow-lg' : ''}
            >
              {isCalculating ? (
                <>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  Calculating optimal breeding path...
                </>
              ) : (
                <>
                  <IconSettings size={20} color="white" />
                  Generate Breeding Plan
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ========== RESULTS SECTION ========== */}
      {breedingPlan && (
        <section
          id="results-section"
          style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              style={{
                color: '#2384da',
                letterSpacing: '-.5px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: '30px',
              }}
            >
              Your Breeding Plan
            </h2>

            <BreedingPathVisualizer plan={breedingPlan} />
            <StatisticsPanel plan={breedingPlan} />

            {/* Export Options */}
            <div
              style={{
                display: 'flex',
                gap: '15px',
                marginTop: '30px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={() => window.print()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#134978',
                  color: 'white',
                  padding: '10px 20px',
                  minWidth: '160px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  transition: 'all 0.3s',
                }}
                className="hover:-translate-y-1 hover:shadow-md"
              >
                <IconDownload size={16} color="white" />
                Export as PDF
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: '#134978',
                  padding: '10px 20px',
                  minWidth: '160px',
                  border: '2px solid #134978',
                  cursor: 'pointer',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  transition: 'all 0.3s',
                }}
                className="hover:bg-[#134978] hover:text-white"
              >
                <IconLink size={16} />
                Copy Share Link
              </button>
              <Link
                href="/request-quote"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#008080',
                  color: 'white',
                  padding: '10px 20px',
                  minWidth: '200px',
                  textDecoration: 'none',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  fontWeight: 500,
                  transition: 'all 0.3s',
                }}
                className="hover:-translate-y-1 hover:shadow-md"
              >
                <IconMessageCircle size={16} color="white" />
                Request Project Consultation
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            className="animate-in"
            style={{
              color: '#2384da',
              textAlign: 'center',
              letterSpacing: '-.5px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: '15px',
            }}
          >
            How the Breeding Scheme Architect Works
          </h2>
          <p
            className="animate-in"
            style={{
              color: '#666',
              textAlign: 'center',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.6rem',
              maxWidth: '700px',
              margin: '0 auto 40px',
            }}
          >
            Planning multi allele breeding schemes can be complex. This tool simplifies
            the process by automating Mendelian genetics calculations and identifying
            optimal breeding strategies.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="animate-in group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: '#f7f7f7',
                  border: '.5px solid #e0e0e0',
                  borderTop: `4px solid ${index % 2 === 0 ? '#008080' : '#134978'}`,
                  padding: '25px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#0a253c',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                  }}
                >
                  <step.icon size={24} color="white" />
                </div>
                <div
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '.75rem',
                    fontWeight: 600,
                    color: '#008080',
                    marginBottom: '8px',
                  }}
                >
                  STEP {step.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.9rem',
                    fontWeight: 400,
                    color: '#666',
                    lineHeight: '1.6rem',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BENEFITS SECTION ========== */}
      <section style={{ backgroundColor: '#f7f7f7', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            className="animate-in"
            style={{
              color: '#2384da',
              textAlign: 'center',
              letterSpacing: '-.5px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: '40px',
            }}
          >
            Why Researchers Use the Breeding Scheme Architect
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="animate-in hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: 'white',
                  border: '.5px solid #e0e0e0',
                  borderTop: `4px solid ${index % 2 === 0 ? '#008080' : '#134978'}`,
                  padding: '25px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#0a253c',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                  }}
                >
                  <benefit.icon size={24} color="white" />
                </div>
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px',
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.9rem',
                    fontWeight: 400,
                    color: '#666',
                    lineHeight: '1.6rem',
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIAL SECTION ========== */}
      <section style={{ backgroundColor: '#0a253c', padding: '60px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div
            className="animate-in"
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '40px',
            }}
          >
            <IconMessageCircle
              size={40}
              color="#00d4d4"
              style={{ marginBottom: '20px' }}
            />
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--system-ui)',
                fontSize: '1.1rem',
                fontWeight: 400,
                lineHeight: '1.8rem',
                fontStyle: 'italic',
                marginBottom: '20px',
              }}
            >
              &quot;Planning the breeding scheme for our triple transgenic model seemed
              overwhelming. This tool helped us visualize the entire process and estimate
              resources before we started.&quot;
            </p>
            <p
              style={{
                color: '#00d4d4',
                fontFamily: 'var(--system-ui)',
                fontSize: '.9rem',
                fontWeight: 500,
              }}
            >
              — Michaela Ballas, Research Scientist
            </p>
          </div>
        </div>
      </section>

      {/* ========== START YOUR PROJECT CTA ========== */}
      <UXUIDCStartProjectCTA
        title="Ready to Start Your Custom Model Project?"
        content="Our scientific consultants are available to discuss your breeding strategy and help design the optimal mouse model for your experimental goals."
        buttons={[
          { label: "Request a Quote", href: "/request-quote" },
          { label: "Schedule Consultation", href: "/contact" }
        ]}
      />

      {/* ========== FAQ SECTION ========== */}
      <UXUIDCAnimatedFAQ
        title="Frequently Asked Questions"
        faqs={faqs}
        backgroundColor="#f7f7f7"
      />

      {/* ========== RELATED RESOURCES SECTION ========== */}
      <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            className="animate-in"
            style={{
              color: '#2384da',
              textAlign: 'center',
              letterSpacing: '-.5px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: '10px',
            }}
          >
            Related Resources
          </h2>
          <p
            className="animate-in"
            style={{
              color: '#666',
              textAlign: 'center',
              fontFamily: 'var(--system-ui)',
              fontSize: '.9rem',
              fontWeight: 400,
              lineHeight: '1.6rem',
              marginBottom: '40px',
            }}
          >
            Learn more about breeding strategies and model design
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {relatedResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.link}
                className="animate-in hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: '#f7f7f7',
                  border: '.5px solid #e0e0e0',
                  borderTop: '4px solid #008080',
                  padding: '25px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#0a253c',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                  }}
                >
                  <IconBookOpen size={24} color="white" />
                </div>
                <h3
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '10px',
                  }}
                >
                  {resource.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.9rem',
                    fontWeight: 400,
                    color: '#666',
                    lineHeight: '1.6rem',
                    flex: 1,
                  }}
                >
                  {resource.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#008080',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.85rem',
                    fontWeight: 500,
                    marginTop: '15px',
                  }}
                >
                  Learn More
                  <IconArrowRight size={14} color="#008080" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <UXUIDCFooter />

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        alleles={alleles}
        targetGenotypes={targetGenotypes}
        onAddAllele={handleAIAddAllele}
        isCollapsed={isAICollapsed}
        onToggleCollapse={() => setIsAICollapsed(!isAICollapsed)}
      />

      {/* Consultation Prompt Modal */}
      <ConsultationModal />

      {/* CSS for spinner animation */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

// Wrap with AIAccessProvider
export default function BreedingSchemeArchitectPage() {
  return (
    <AIAccessProvider>
      <BreedingSchemeArchitectContent />
    </AIAccessProvider>
  );
}
