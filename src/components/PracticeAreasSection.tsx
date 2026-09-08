import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  HeartHandshake,
  Home,
  Landmark,
  Scale,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { PracticeArea } from '../types';

interface PracticeAreasSectionProps {
  practiceAreas: PracticeArea[];
  onSelectPracticeArea?: (area: PracticeArea) => void;
  onSelectArea?: (area: PracticeArea) => void;
  onConsultPracticeArea?: (area: PracticeArea) => void;
  onViewAllServices?: () => void;
}

export const PracticeAreasSection: React.FC<PracticeAreasSectionProps> = ({
  practiceAreas,
  onSelectPracticeArea,
  onSelectArea,
  onConsultPracticeArea,
  onViewAllServices
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleSelect = (area: PracticeArea) => {
    if (onSelectPracticeArea) onSelectPracticeArea(area);
    if (onSelectArea) onSelectArea(area);
  };

  // Render proper icon based on icon string
  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'building':
      case 'building2':
        return <Building2 className="w-7 h-7 text-[#c5a059]" />;
      case 'landmark':
      case 'bank':
        return <Landmark className="w-7 h-7 text-[#c5a059]" />;
      case 'scale':
      case 'court':
        return <Scale className="w-7 h-7 text-[#c5a059]" />;
      case 'home':
      case 'property':
        return <Home className="w-7 h-7 text-[#c5a059]" />;
      case 'heart':
      case 'family':
        return <HeartHandshake className="w-7 h-7 text-[#c5a059]" />;
      case 'shield':
      case 'shield-check':
        return <ShieldCheck className="w-7 h-7 text-[#c5a059]" />;
      default:
        return <Briefcase className="w-7 h-7 text-[#c5a059]" />;
    }
  };

  const displayedAreas = showAll ? practiceAreas : practiceAreas.slice(0, 6);

  return (
    <section
      id="practice-areas"
      className="py-20 lg:py-28 bg-[#090807] border-b border-[#24211a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase mb-3"
            id="practice-areas-eyebrow"
          >
            PRACTICE AREAS
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3ece0] font-normal tracking-tight"
            id="practice-areas-headline"
          >
            Comprehensive Legal Solutions
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-4" />
        </div>

        {/* Practice Areas Grid - Exactly matching mockup card styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedAreas.map((area) => (
            <div
              key={area.id}
              onClick={() => handleSelect(area)}
              className="relative p-8 border border-[#24211a] hover:border-[#c5a059] bg-[#0c0b09] hover:bg-[#100f0c] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              id={`practice-card-${area.slug}`}
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#c5a059] transition-all duration-300" />

              <div>
                {/* Icon Container */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#16140e] border border-[#c5a059]/30 group-hover:border-[#c5a059] group-hover:scale-105 transition-all">
                  {renderIcon(area.icon)}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-[#f3ece0] font-normal mb-3 group-hover:text-[#c5a059] transition-colors">
                  {area.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#9c988c] leading-relaxed mb-6 line-clamp-3">
                  {area.shortDescription}
                </p>

                {/* Sub-sections count badge & preview */}
                {area.subSections && area.subSections.length > 0 && (
                  <div className="mb-4 pt-4 border-t border-[#1c1913]">
                    <span className="text-[11px] text-[#c5a059] uppercase tracking-wider font-medium block mb-2">
                      Specialized Divisions ({area.subSections.length}):
                    </span>
                    <ul className="space-y-1.5">
                      {area.subSections.slice(0, 3).map((sub) => (
                        <li
                          key={sub.id}
                          className="text-[11px] text-[#8a8579] flex items-center gap-1.5 truncate"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
                          <span className="truncate">{sub.title}</span>
                        </li>
                      ))}
                      {area.subSections.length > 3 && (
                        <li className="text-[10px] text-[#c5a059] font-medium pt-0.5">
                          +{area.subSections.length - 3} more sub-sections
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-[#1f1c15] flex items-center justify-between text-xs mt-4">
                <span className="text-[#c5a059] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                  Explore Services <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onConsultPracticeArea(area);
                  }}
                  className="text-[11px] px-2.5 py-1 uppercase tracking-wider border border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-colors"
                >
                  Consult
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {practiceAreas.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-200 inline-flex items-center gap-2"
              id="btn-view-all-practice-areas"
            >
              <span>{showAll ? 'SHOW LESS PRACTICE AREAS' : 'VIEW ALL PRACTICE AREAS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
