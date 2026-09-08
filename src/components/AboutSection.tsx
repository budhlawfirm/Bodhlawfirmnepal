import { ArrowRight, CheckCircle2, Scale } from 'lucide-react';
import React from 'react';
import { SiteContent } from '../types';

interface AboutSectionProps {
  content?: SiteContent['about'];
  aboutData?: SiteContent['about'];
  onLearnMore?: () => void;
  onNavigateToTeam?: () => void;
  onConsultNow?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  content,
  aboutData,
  onLearnMore,
  onNavigateToTeam,
  onConsultNow
}) => {
  const data = aboutData || content || {
    eyebrow: 'ABOUT US',
    title: 'Advocates for Justice.\nPartners in Success.',
    paragraph1:
      'Bodh Law Firm Nepal is a full-service law firm providing comprehensive legal solutions to individuals, businesses, and organizations across Nepal.',
    paragraph2:
      'We combine in-depth legal knowledge with practical strategies to protect your rights and help you achieve your objectives.',
    ctaText: 'CONSULT NOW',
    image: '/assets/about-library.jpg',
    yearsOfExcellence: 12,
    barAffiliation: 'Licensed under Nepal Bar Council & Supreme Court Bar Association'
  };

  const handleLearnMore = onConsultNow || onLearnMore || (() => {});
  const handleNavigateTeam = onNavigateToTeam || (() => {});

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#080808] border-b border-[#24211a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atmospheric Image with Decorative Gold Border */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#332f26] p-2 bg-[#0e0d0a] shadow-2xl">
              {/* Corner Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#c5a059]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#c5a059]" />

              <div className="relative overflow-hidden aspect-[4/3] bg-[#12100b]">
                <img
                  src={data.image || '/assets/about-library.jpg'}
                  alt="Bodh Law Firm Legal Library"
                  className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#c5a059]/40 py-2.5 px-4 flex items-center gap-3">
                  <div className="p-2 rounded bg-[#1c1810] text-[#c5a059]">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xl font-serif text-[#f3ece0] font-bold leading-none">
                      {data.yearsOfExcellence || 12}+ Years
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#a8a396]">
                      Legal Practice in Nepal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="lg:col-span-6">
            <p
              className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase mb-3"
              id="about-eyebrow"
            >
              {data.eyebrow || 'ABOUT US'}
            </p>

            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3ece0] font-normal leading-[1.2] tracking-tight mb-6"
              id="about-headline"
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
                  Advocates for Justice.
                  <br />
                  Partners in Success.
                </>
              )}
            </h2>

            <p className="text-[#b8b3a7] text-sm sm:text-base leading-relaxed mb-4">
              {data.paragraph1 ||
                'Bodh Law Firm Nepal is a full-service law firm providing comprehensive legal solutions to individuals, businesses, and organizations across Nepal.'}
            </p>

            <p className="text-[#9e998c] text-sm sm:text-base leading-relaxed mb-8">
              {data.paragraph2 ||
                'We combine in-depth legal knowledge with practical strategies to protect your rights and help you achieve your objectives.'}
            </p>

            {/* Credential highlights */}
            <div className="space-y-3 mb-8 pb-8 border-b border-[#24211a]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#b8b3a7]">
                  {data.barAffiliation ||
                    'Licensed under Nepal Bar Council & Supreme Court Bar Association'}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#b8b3a7]">
                  Proven courtroom advocacy in Civil, Corporate, Banking, and Constitutional matters
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleLearnMore}
                className="px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-200 flex items-center gap-2 group"
                id="btn-read-more-about"
              >
                <span>{data.ctaText || 'CONSULT NOW'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleNavigateTeam}
                className="px-5 py-3 text-xs sm:text-sm font-medium text-[#b8b3a7] hover:text-[#c5a059] transition-colors"
                id="btn-meet-our-attorneys"
              >
                Meet Our Legal Team →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

