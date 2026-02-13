/**
 * |UXUIDC| Workflow Section - Matches Webflow Design
 * @version 4.0.0 - Removed GSAP, using CSS animations only
 * Interactive workflow steps with animations
 */

'use client';

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
}

interface WorkflowSectionProps {
  title?: string;
  subtitle?: string;
  steps: WorkflowStep[];
}

export default function UXUIDCWorkflowSection({
  title = 'Conceptual Workflow',
  subtitle,
  steps,
}: WorkflowSectionProps) {
  return (
    <section 
      className="flex flex-col justify-start items-center"
      style={{ 
        backgroundColor: 'white',
        padding: '40px 20px'
      }}
    >
      {/* Header - h2-blue */}
      <div className="text-center mb-10 animate-initial animate-fade-in-up">
        <h2 style={{
          color: '#2384da',
          textAlign: 'center',
          letterSpacing: '-.5px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1
        }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{
            color: '#666',
            marginTop: '15px',
            fontFamily: 'var(--system-ui)',
            fontSize: '.9rem',
            fontWeight: 200,
            lineHeight: '1.3rem',
            maxWidth: '600px'
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Workflow Steps */}
      <div className="w-full max-w-6xl" style={{ padding: '20px' }}>
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div 
            className="hidden lg:block absolute top-8 left-0 right-0 h-1 animate-initial animate-scale-x" 
            style={{ 
              marginLeft: '10%', 
              marginRight: '10%',
              background: 'linear-gradient(90deg, teal, #2384da)'
            }} 
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className={`relative text-center cursor-pointer group animate-initial animate-fade-in-up animate-delay-${Math.min(step.number * 100, 500)}`}
              >
                {/* Step Number - Interactive */}
                <div 
                  className="w-16 h-16 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-5 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ 
                    backgroundColor: 'teal',
                    boxShadow: '0 4px 15px rgba(0, 128, 128, 0.3)'
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <h3 
                  className="transition-colors duration-300 group-hover:text-teal-600"
                  style={{
                    color: '#2384da',
                    letterSpacing: '-1px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    marginBottom: '8px'
                  }}
                >
                  {step.title}
                </h3>
                <p 
                  className="transition-colors duration-300"
                  style={{
                    color: '#666',
                    fontFamily: 'var(--system-ui)',
                    fontSize: '.85rem',
                    fontWeight: 200,
                    lineHeight: '1.4rem'
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
