import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { SiteContent } from '../types';

interface HeroProps {
  content?: SiteContent['hero'];
  onExploreServices?: () => void;
  onContactUs?: () => void;
  onConsultNow?: () => void;
}

const defaultLawImages = [
  {
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85',
    title: 'Supreme Court & Classical Columns'
  },
  {
    url: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1920&q=85',
    title: 'Grand Law Library & Gavel'
  },
  {
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=85',
    title: 'Senior Advocate Chambers & Scales of Justice'
  },
  {
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=85',
    title: 'Judicial Benches & Precedent Archives'
  }
];

export const Hero: React.FC<HeroProps> = ({
  content,
  onExploreServices,
  onContactUs,
  onConsultNow
}) => {
  const data = content || {
    eyebrow: 'YOUR TRUST. OUR COMMITMENT.',
    title: 'Defending Rights.\nDelivering Justice.',
    subtitle:
      'Bodh Law Firm Nepal is dedicated to providing exceptional legal services with integrity, professionalism, and a client-first approach.',
    primaryCtaText: 'OUR SERVICES',
    secondaryCtaText: 'CONSULT NOW',
    bgImage: defaultLawImages[0].url,
    sliderImages: defaultLawImages.map((img) => img.url),
    slideInterval: 10
  };

  // Compile active images — admin slider images take priority, then bgImage, then defaults
  const slides = (data.sliderImages && data.sliderImages.length > 0)
    ? data.sliderImages
    : data.bgImage
      ? [data.bgImage]
      : defaultLawImages.map(d => d.url);

  const intervalSeconds = data.slideInterval && data.slideInterval > 0 ? data.slideInterval : 10;
  const intervalMs = intervalSeconds * 1000;

  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Background smooth auto-cycling every interval without UI clutter
  useEffect(() => {
    if (slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, intervalMs]);

  const handleConsult = onConsultNow || onContactUs || (() => { });
  const handleExplore = onExploreServices || (() => { });

  return (
    <section
      id="home"
      className="relative min-h-[500px] lg:min-h-[580px] flex items-center overflow-hidden border-b border-[#24211a]"
    >
      {/* Background Image Slider with Crossfade Effect */}
      <div className="absolute inset-0 z-0 bg-[#080808]">
        {slides.map((slideUrl, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img
              src={slideUrl}
              alt={`Law Chambers Hero Slide ${idx + 1}`}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.15] transition-transform duration-[10000ms] ease-out ${currentSlide === idx ? 'scale-105' : 'scale-100'
                }`}
            />
          </div>
        ))}

        {/* Cinematic gradient overlays to ensure razor-sharp text readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-transparent sm:w-4/5 lg:w-3/5" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/75" />
        <div className="absolute inset-0 z-20 bg-[#080808]/30" />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Headlines and CTAs */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#c5a059]" />
              <p
                className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase"
                id="hero-eyebrow"
              >
                {data.eyebrow || 'YOUR TRUST. OUR COMMITMENT.'}
              </p>
            </div>

            {/* Heading */}
            <h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3ece0] font-normal leading-[1.15] tracking-tight mb-4"
              id="hero-headline"
            >
              {data.title ? (
                data.title.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < data.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))
              ) : (
                <>
                  Defending Rights.
                  <br />
                  Delivering Justice.
                </>
              )}
            </h1>

            {/* Description */}
            <p
              className="text-[#bcb7ab] text-sm sm:text-base leading-relaxed mb-6 max-w-xl font-normal"
              id="hero-subtitle"
            >
              {data.subtitle ||
                'Bodh Law Firm Nepal is dedicated to providing exceptional legal services with integrity, professionalism, and a client-first approach.'}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExplore}
                className="px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#c5a059] text-[#0a0a0a] hover:bg-[#d4b050] transition-all duration-200 shadow-lg shadow-[#c5a059]/10 flex items-center gap-2 group cursor-pointer"
                id="hero-cta-services"
              >
                <span>{data.primaryCtaText || 'OUR SERVICES'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleConsult}
                className="px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10 hover:text-[#f3ece0] transition-all duration-200 flex items-center gap-2 cursor-pointer"
                id="hero-cta-contact"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{data.secondaryCtaText || 'CONSULT NOW'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bodh Law Chambers Trust Card with Frosted Glass Effect */}
          <div className="col-span-1 lg:col-span-5 mt-4 lg:mt-0">
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/[0.08] via-[#100d08]/75 to-[#c5a059]/[0.06] border border-white/[0.15] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
              {/* Glass subtle inner light glow & specular border */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

              {/* Corner Ornaments */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#c5a059]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#c5a059]" />

              <div className="flex items-center gap-3 pb-5 border-b border-white/[0.1] relative z-10">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c5a059]/80 shrink-0 bg-[#050505] shadow-[0_0_12px_rgba(197,160,89,0.4)]">
                  <img
                    src="/assets/logo2.png"
                    alt="Bodh Law Chambers Emblem"
                    className="w-full h-full object-cover scale-[1.3] filter brightness-[1.35] contrast-[1.25] saturate-[1.2]"
                  />
                </div>
                <div>
                  <div className="font-serif text-base sm:text-lg text-[#f3ece0] font-semibold tracking-wide">
                    Bodh Law Chambers
                  </div>
                  <div className="text-[11px] text-[#c5a059] flex items-center gap-1 font-medium mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Nepal Bar Council Licensed Advocates</span>
                  </div>
                </div>
              </div>

              {/* Core Accreditations Checklist */}
              <div className="py-4 space-y-3 text-xs text-[#d8d3c7] relative z-10">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span className="font-medium">Supreme Court & High Court Appellate Practice</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span className="font-medium">Cross-Border FDI & Commercial Arbitration</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span className="font-medium">Putalisadak, Kathmandu Legal Chambers</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span className="font-medium">Strict Attorney-Client Confidentiality Enforced</span>
                </div>
              </div>

              {/* Fast Intake Footer */}
              <div className="pt-4 border-t border-white/[0.1] flex items-center justify-between relative z-10">
                <div>
                  <span className="text-[10px] text-[#9c9688] block uppercase tracking-wider font-semibold">
                    Response Window
                  </span>
                  <span className="text-xs text-[#f3ece0] font-medium flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                    Within 2 Business Hours
                  </span>
                </div>

                <button
                  onClick={handleConsult}
                  className="px-4 py-2 bg-[#c5a059]/20 hover:bg-[#c5a059] border border-[#c5a059]/70 hover:border-[#c5a059] text-xs font-semibold text-[#c5a059] hover:text-black transition-all shadow-md backdrop-blur-md cursor-pointer"
                  id="hero-card-intake-btn"
                >
                  Book Case Intake
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
