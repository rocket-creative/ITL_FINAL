/**
 * |UXUIDC| Trust Badges - Simplified
 * @version 3.0.0 - Removed GSAP, using CSS animations only
 */

'use client';

export default function UXUIDCTrustBadges() {
  const stats = [
    { value: '26+', label: 'Years', isNumber: false },
    { value: '2,500+', label: 'Projects', isNumber: false },
    { value: '800+', label: 'Publications', isNumber: false },
  ];

  return (
    <section className="py-10" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
      <div className="container">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold animate-initial animate-fade-in-up" style={{ color: '#333' }}>
            Trusted by Researchers Worldwide
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`text-center animate-initial animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 400)}`}>
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
