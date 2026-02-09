'use client';

/**
 * Custom Animal Models Page - ingenious targeting laboratory
 * Overview of custom animal model services beyond mice
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UXUIDCNavigation,
  UXUIDCFooter,
  UXUIDCStartProjectCTA,
  UXUIDCAnimatedFAQ,
  IconDNA,
  IconTarget,
  IconMicroscope,
  IconArrowRight,
} from '@/components/UXUIDC';

gsap.registerPlugin(ScrollTrigger);

const heroData = {
  badge: 'Custom Animal Model Services',
  title: 'Custom Animal Models',
  description: 'While mice remain the most widely used model organism for biomedical research, ingenious targeting laboratory also provides custom genetic engineering services for other species. Our expertise in gene targeting extends to rats, rabbits, and other animal models to meet specific research requirements.',
};

const services = [
  {
    title: 'Rat Models',
    description: 'Custom knockout, knockin, and targeted transgenic rat models. Rats offer advantages for certain research applications including larger size for surgical procedures, physiological similarity to humans in cardiovascular and metabolic studies, and established behavioral paradigms.',
    href: '/rat-models',
    Icon: IconTarget,
  },
  {
    title: 'Rabbit Models',
    description: 'Custom genetically modified rabbit models for research applications requiring larger animal size, specific immunological characteristics, or physiological features not available in rodent models.',
    href: '/custom-rabbit-models',
    Icon: IconMicroscope,
  },
  {
    title: 'Mouse Models',
    description: 'Our core expertise in custom mouse model generation spans knockout, knockin, humanized, and targeted transgenic approaches with over 2,500 completed projects since 1998.',
    href: '/custom-mouse-models',
    Icon: IconDNA,
  },
];

const faqData = [
  {
    question: 'What species does ingenious targeting laboratory work with?',
    answer: 'Our primary expertise is in mouse model generation, with over 2,500 completed projects. We also offer custom rat and rabbit model services. Contact us to discuss your specific requirements for other species.',
  },
  {
    question: 'How do rat models differ from mouse models?',
    answer: 'Rats offer larger size for surgical procedures and sample collection, physiological similarities to humans for certain disease models, and well-established behavioral testing paradigms. Project timelines and approaches may differ from mouse projects.',
  },
  {
    question: 'What genetic modifications are available for non-mouse species?',
    answer: 'We offer knockout, knockin, and targeted transgenic modifications for rat models. Available modifications for other species depend on current technology capabilities and reagent availability. Contact us for specific inquiries.',
  },
];

export default function CustomAnimalModelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );
    }

    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
            <div
              className="hero-animate"
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
              <IconDNA size={16} color="white" />
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
                marginBottom: '20px',
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
                maxWidth: '800px',
              }}
            >
              {heroData.description}
            </p>
            <div className="hero-animate flex flex-wrap gap-4 mt-6">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: 'white',
                  color: '#0a253c',
                  padding: '10px 20px',
                  fontSize: '.85rem',
                  fontWeight: 500,
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
                  border: '2px solid white',
                  fontSize: '.85rem',
                  fontWeight: 500,
                }}
              >
                <span>Talk to a Scientist</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              className="animate-in text-center"
              style={{
                color: '#2384da',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              Animal Model Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="animate-in flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                  style={{
                    backgroundColor: '#f7f7f7',
                    padding: '30px',
                    border: '.5px solid #e0e0e0',
                    borderTop: `4px solid ${i === 0 ? '#008080' : i === 1 ? '#134978' : '#2384da'}`,
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#0a253c',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <service.Icon size={28} color="white" />
                  </div>
                  <h3
                    style={{
                      color: '#333',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginBottom: '12px',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      color: '#666',
                      fontSize: '.9rem',
                      fontWeight: 400,
                      lineHeight: '1.6rem',
                      flex: 1,
                    }}
                  >
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 mt-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{
                      backgroundColor: '#008080',
                      color: 'white',
                      padding: '10px 20px',
                      fontSize: '.85rem',
                      fontWeight: 500,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <span>Learn more</span>
                    <IconArrowRight size={14} color="white" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <UXUIDCAnimatedFAQ title="Frequently Asked Questions" faqs={faqData} backgroundColor="#f7f7f7" />

        {/* Related Links */}
        <section style={{ backgroundColor: '#f8f9fa', padding: '50px 20px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h3
              className="animate-in text-center"
              style={{
                color: '#333',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.3rem',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              Explore Our Services
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Custom Mouse Models', href: '/custom-mouse-models' },
                { label: 'Knockout Mouse Models', href: '/knockout-mouse-models' },
                { label: 'Knockin Mouse Models', href: '/knockin-mouse-models' },
                { label: 'Humanized Mouse Models', href: '/humanized-mouse-models' },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="animate-in transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    backgroundColor: '#f7f7f7',
                    padding: '10px 20px',
                    border: '1px solid #e0e0e0',
                    color: '#008080',
                    fontSize: '.9rem',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <UXUIDCStartProjectCTA
          title="Discuss Your Project Requirements"
          content="Our scientific consultants are available to discuss your research needs and help determine the optimal animal model approach for your experimental goals."
          buttons={[
            { label: 'Request a Quote', href: '/request-quote' },
            { label: 'Contact Us', href: '/contact' },
          ]}
        />
      </main>

      <UXUIDCFooter />
    </div>
  );
}
