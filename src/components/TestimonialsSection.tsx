import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import React, { useState } from 'react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddReviewPrompt: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddReviewPrompt
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 1));
  };

  const visibleTestimonials =
    testimonials.length <= 3
      ? testimonials
      : testimonials.slice(startIndex, startIndex + 3);

  return (
    <section className="py-20 lg:py-28 bg-[#090807] border-b border-[#24211a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p
            className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase mb-3"
            id="testimonials-eyebrow"
          >
            WHAT OUR CLIENTS SAY
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-12 bg-[#c5a059]/40" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#c5a059]" />
            <div className="h-[1px] w-12 bg-[#c5a059]/40" />
          </div>
        </div>

        {/* Testimonials Carousel / Grid */}
        <div className="relative">
          {/* Left Arrow */}
          {testimonials.length > 3 && (
            <button
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#12100a] border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center hover:bg-[#c5a059] hover:text-black transition-all shadow-lg"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((item) => (
              <div
                key={item.id}
                className="p-8 border border-[#24211a] bg-[#0c0b09] hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between"
                id={`testimonial-card-${item.id}`}
              >
                <div>
                  {/* Quote Mark */}
                  <span className="font-serif text-3xl text-[#c5a059] block leading-none mb-3">
                    “
                  </span>

                  {/* Quote Text */}
                  <p className="text-xs sm:text-sm text-[#a39f93] leading-relaxed italic mb-6">
                    {item.quote}
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                    ))}
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#1c1913]">
                  <img
                    src={item.clientPhoto}
                    alt={item.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-[#c5a059]/30"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-[#f3ece0]">
                      {item.clientName}
                    </h4>
                    <p className="text-[10px] text-[#7d796f] uppercase tracking-wider">
                      {item.clientTitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {testimonials.length > 3 && (
            <button
              onClick={handleNext}
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#12100a] border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center hover:bg-[#c5a059] hover:text-black transition-all shadow-lg"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Add Review invitation */}
        <div className="text-center mt-12">
          <button
            onClick={onAddReviewPrompt}
            className="text-xs text-[#a39f93] hover:text-[#c5a059] transition-colors underline underline-offset-4"
          >
            Have you worked with Bodh Law Firm? Submit your experience
          </button>
        </div>
      </div>
    </section>
  );
};
