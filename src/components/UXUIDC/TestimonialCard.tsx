/**
 * |UXUIDC| Testimonial Card Component
 * @version 1.0.0
 * @created 2026
 * @description Card for displaying customer testimonials
 */

interface TestimonialCardProps {
  quote: string;
  author: string;
  title?: string;
  organization?: string;
}

export default function UXUIDCTestimonialCard({
  quote,
  author,
  title,
  organization,
}: TestimonialCardProps) {
  return (
    <blockquote className="bg-[var(--3-grey)] rounded-xl p-6 lg:p-8 hover-card transition-all duration-300">
      {/* Quote Icon */}
      <svg
        className="w-8 h-8 text-[var(--blue)] mb-4 opacity-50"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Quote Text */}
      <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">&quot;{quote}&quot;</p>

      {/* Author Info */}
      <footer className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[var(--dk-blue)] rounded-full flex items-center justify-center text-white font-semibold">
          {author
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)}
        </div>
        <div>
          <cite className="not-italic font-semibold text-[var(--dk-blue)]">{author}</cite>
          {(title || organization) && (
            <p className="text-sm text-gray-500">
              {title}
              {title && organization && ', '}
              {organization}
            </p>
          )}
        </div>
      </footer>
    </blockquote>
  );
}

// Testimonials Section wrapper
interface TestimonialsSectionProps {
  title?: string;
  testimonials: TestimonialCardProps[];
}

export function UXUIDCTestimonialsSection({
  title = 'What Researchers Say',
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <h2 className="text-2xl lg:text-3xl font-semibold text-[var(--dk-blue)] text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <UXUIDCTestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
