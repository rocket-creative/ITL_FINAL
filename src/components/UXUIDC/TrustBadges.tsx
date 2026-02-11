/**
 * |UXUIDC| Trust Badges - Simplified
 * @version 2.1.0
 * Scroll-triggered animations with GSAP (number counting)
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/UXUIDC/gsap';

export default function UXUIDCTrustBadges() {
  const stats = [
    { value: '26+', label: 'Years', isNumber: false },
    { value: '2,500+', label: 'Projects', isNumber: false },
    { value: '800+', label: 'Publications', isNumber: false },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats stagger animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
      <div className="container">
        <div className="text-center mb-6">
          <h2 ref={titleRef} className="text-lg font-semibold" style={{ opacity: 0, color: '#333' }}>
            Trusted by Researchers Worldwide
          </h2>
        </div>
        
        <div ref={statsRef} className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center" style={{ opacity: 0 }}>
              <div className="text-2xl lg:text-3xl font-bold" style={{ color: '#008080' }}>{stat.value}</div>
              <div className="text-xs" style={{ color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: '#666' }}>
            Featured in: <span className="italic">Nature · Science · Cell</span>
          </p>
        </div>
      </div>
    </section>
  );
}
