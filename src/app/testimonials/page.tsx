/**
 * Testimonials Page
 * Displays all verified client testimonials
 * Source: https://www.genetargeting.com/testimonials
 */

import {
  UXUIDCNavigation,
  UXUIDCFooter,
} from '@/components/UXUIDC';
import { IconQuote } from '@/components/UXUIDC/Icons';
import { 
  VERIFIED_TESTIMONIALS, 
  formatAuthorWithCredentials,
  type Testimonial 
} from '@/data/verifiedTestimonials';

export const metadata = {
  title: 'Client Testimonials | What Researchers Say | ingenious targeting laboratory',
  description: 'Read testimonials from researchers at leading institutions worldwide who have partnered with ingenious targeting laboratory for custom mouse models.',
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ 
        borderLeft: '4px solid #008080',
      }}
    >
      <div 
        className="flex items-center justify-center w-10 h-10 rounded-full mb-4"
        style={{ backgroundColor: 'rgba(0, 128, 128, 0.1)' }}
      >
        <IconQuote size={20} color="#008080" />
      </div>
      
      <blockquote 
        className="text-gray-700 leading-relaxed mb-4"
        style={{ fontSize: '0.95rem', fontStyle: 'italic' }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      
      <div className="border-t pt-4" style={{ borderColor: '#e5e7eb' }}>
        <p 
          className="font-semibold mb-1"
          style={{ color: '#0a253c', fontSize: '0.9rem' }}
        >
          — {formatAuthorWithCredentials(testimonial)}
        </p>
        <p 
          className="text-gray-600"
          style={{ fontSize: '0.85rem' }}
        >
          {testimonial.affiliation}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      
      <main id="main-content">
        {/* Hero Section */}
        <section 
          className="py-16 px-6 text-center"
          style={{ 
            background: 'linear-gradient(135deg, #0a253c 0%, #143a5a 100%)',
            color: 'white' 
          }}
        >
          <h1 
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            What Researchers Say
          </h1>
          <p 
            className="max-w-3xl mx-auto opacity-90"
            style={{ fontSize: '1.1rem', lineHeight: '1.7' }}
          >
            For over 26 years, ingenious targeting laboratory has partnered with researchers 
            at leading academic institutions, pharmaceutical companies, and biotechnology 
            organizations worldwide. Here&apos;s what they have to say about working with us.
          </p>
          <div 
            className="mt-8 flex flex-wrap justify-center gap-8"
            style={{ fontSize: '0.95rem', opacity: 0.85 }}
          >
            <span>2,500+ Projects Completed</span>
            <span>•</span>
            <span>800+ Publications</span>
            <span>•</span>
            <span>Global Research Community</span>
          </div>
        </section>

        {/* Featured Quote Banner */}
        <section 
          className="py-12 px-6"
          style={{ backgroundColor: '#008080', color: 'white' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <IconQuote size={40} className="mx-auto mb-4 opacity-50" />
            <blockquote 
              className="text-xl md:text-2xl font-light leading-relaxed mb-6"
              style={{ fontStyle: 'italic' }}
            >
              &ldquo;The Hephaestin flox model ingenious has made for us has been great. 
              It has helped generate eight research publications.&rdquo;
            </blockquote>
            <cite className="not-italic">
              <span className="font-semibold">Joshua Dunaief, PhD, MD</span>
              <span className="block opacity-80 mt-1">University of Pennsylvania</span>
            </cite>
          </div>
        </section>

        {/* All Testimonials Grid */}
        <section className="py-16 px-6" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-center font-bold mb-4"
              style={{ fontSize: '2rem', color: '#0a253c' }}
            >
              Client Testimonials
            </h2>
            <p 
              className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Read what researchers from around the world have shared about their 
              experience partnering with ingenious targeting laboratory.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              {VERIFIED_TESTIMONIALS.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 px-6 text-center"
          style={{ backgroundColor: '#0a253c', color: 'white' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join the thousands of researchers who have trusted ingenious targeting laboratory 
            for their custom mouse model needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/request-quote"
              className="inline-flex items-center px-8 py-3 rounded font-semibold transition-colors"
              style={{ 
                backgroundColor: '#008080', 
                color: 'white',
              }}
            >
              Request a Quote
            </a>
            <a
              href="/publications"
              className="inline-flex items-center px-8 py-3 rounded font-semibold transition-colors"
              style={{ 
                backgroundColor: 'transparent', 
                color: 'white',
                border: '2px solid white',
              }}
            >
              View Publications
            </a>
          </div>
        </section>
      </main>
      
      <UXUIDCFooter />
    </div>
  );
}
