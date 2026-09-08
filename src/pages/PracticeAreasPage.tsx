import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileCheck,
  FileText,
  Gavel,
  HelpCircle,
  Home,
  Layers,
  Lightbulb,
  Search,
  Shield,
  Sparkles,
  Users
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { PracticeArea, PracticeSubSection } from '../types';

interface PracticeAreasPageProps {
  practiceAreas: PracticeArea[];
  onSelectArea: (area: PracticeArea) => void;
  onConsultPracticeArea: (area: PracticeArea) => void;
  onNavigate: (sectionId: string) => void;
}

export const PracticeAreasPage: React.FC<PracticeAreasPageProps> = ({
  practiceAreas,
  onSelectArea,
  onConsultPracticeArea,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Calculate total sub-sections across all practice areas
  const totalSubSections = useMemo(() => {
    return practiceAreas.reduce(
      (acc, area) => acc + (area.subSections ? area.subSections.length : 0),
      0
    );
  }, [practiceAreas]);

  // Filtered practice areas
  const filteredAreas = useMemo(() => {
    return practiceAreas.filter((area) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.subSections?.some(
          (sub) =>
            sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (!matchesSearch) return false;

      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Corporate' && area.title.includes('Corporate')) return true;
      if (selectedCategory === 'Finance' && area.title.includes('Banking')) return true;
      if (selectedCategory === 'Litigation' && area.title.includes('Litigation')) return true;
      if (selectedCategory === 'Property' && area.title.includes('Real Estate')) return true;
      if (selectedCategory === 'Family' && area.title.includes('Family')) return true;
      if (selectedCategory === 'IP' && area.title.includes('Intellectual')) return true;

      return true;
    });
  }, [practiceAreas, searchTerm, selectedCategory]);

  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'briefcase':
        return <Briefcase className="w-6 h-6 text-[#c5a059]" />;
      case 'creditcard':
      case 'bank':
        return <CreditCard className="w-6 h-6 text-[#c5a059]" />;
      case 'gavel':
      case 'scale':
        return <Gavel className="w-6 h-6 text-[#c5a059]" />;
      case 'home':
      case 'building':
        return <Home className="w-6 h-6 text-[#c5a059]" />;
      case 'users':
      case 'heart':
        return <Users className="w-6 h-6 text-[#c5a059]" />;
      case 'lightbulb':
      case 'award':
        return <Lightbulb className="w-6 h-6 text-[#c5a059]" />;
      default:
        return <ScaleIcon className="w-6 h-6 text-[#c5a059]" />;
    }
  };

  const faqs = [
    {
      q: 'How does Bodh Law Firm handle Foreign Direct Investment (FDI) in Nepal?',
      a: 'We guide foreign investors through the Department of Industry (DOI) approval process, Nepal Rastra Bank (NRB) capital repatriation clearances, joint venture agreements, and technology transfer agreements under FITTA 2019.'
    },
    {
      q: 'Can practice sub-sections and specialized divisions be customized for clients?',
      a: 'Yes, our practice groups structure multidisciplinary teams. You can view all sub-divisions below, and our firm administrators can dynamically configure specialized legal focus areas.'
    },
    {
      q: 'What is the standard procedure for Supreme Court commercial writ petitions?',
      a: 'We prepare emergency stay order applications, constitutional review petitions, and interim relief motions under Articles 133 & 144 of the Constitution of Nepal with priority filings.'
    }
  ];

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#060606] border-b border-[#24211a] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-[#8c887d] mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#c5a059] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#c5a059]">Practice Areas</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
                COMPREHENSIVE LEGAL SERVICES IN NEPAL
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3ece0] font-normal tracking-tight">
                Practice Areas & Dynamic Sub-sections
              </h1>
              <p className="text-sm sm:text-base text-[#bcb7ab] max-w-2xl mt-4 leading-relaxed">
                Full-spectrum legal representation spanning corporate compliance, complex litigation, cross-border banking, property disputes, and intellectual property protection.
              </p>
            </div>

            {/* Dynamic Counter Pill */}
            <div className="bg-[#12100a] border border-[#c5a059]/40 p-4 rounded shrink-0">
              <div className="flex items-center gap-3">
                <Layers className="w-8 h-8 text-[#c5a059]" />
                <div>
                  <div className="text-xl font-serif text-[#f3ece0] font-bold">
                    {practiceAreas.length} Practice Areas
                  </div>
                  <div className="text-[11px] text-[#a39f93]">
                    {totalSubSections} Specialized Sub-sections
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-10 pt-8 border-t border-[#1f1b15] flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#7d796f] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search practice areas or sub-sections..."
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] pl-9 pr-4 py-2 text-xs text-[#f3ece0] placeholder:text-[#6b675d] outline-none transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {[
                { id: 'All', label: 'All Areas' },
                { id: 'Corporate', label: 'Corporate' },
                { id: 'Finance', label: 'Banking & Finance' },
                { id: 'Litigation', label: 'Litigation' },
                { id: 'Property', label: 'Real Estate' },
                { id: 'Family', label: 'Family' },
                { id: 'IP', label: 'Intellectual Property' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#c5a059] text-black font-semibold'
                      : 'bg-[#12100a] text-[#8c887d] hover:text-white border border-[#242018]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-20 bg-[#080808] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {filteredAreas.length === 0 ? (
            <div className="text-center py-16 bg-[#0e0d0b] border border-[#24211a]">
              <p className="text-[#a39f93] text-sm">
                No practice areas found matching "{searchTerm}".
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 text-xs bg-[#c5a059] text-black font-semibold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAreas.map((area) => (
                <div
                  key={area.id}
                  className="bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  id={`practice-card-${area.slug}`}
                >
                  <div className="p-8">
                    {/* Header with Icon & Sub-section count badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-[#17140e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] group-hover:scale-110 transition-transform">
                        {renderIcon(area.icon)}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c5a059] bg-[#1a1710] px-2.5 py-1 border border-[#c5a059]/30 rounded">
                        {area.subSections?.length || 0} Sub-sections
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#f3ece0] font-normal mb-3 group-hover:text-[#c5a059] transition-colors">
                      {area.title}
                    </h3>

                    <p className="text-xs text-[#a39f93] leading-relaxed mb-6">
                      {area.shortDescription}
                    </p>

                    {/* Dynamic Sub-Sections Chips */}
                    {area.subSections && area.subSections.length > 0 && (
                      <div className="mb-6 pt-4 border-t border-[#1c1811]">
                        <span className="block text-[10px] uppercase tracking-widest text-[#7a766c] mb-2.5 font-medium">
                          Active Sub-Divisions:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {area.subSections.map((sub) => (
                            <span
                              key={sub.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectArea(area);
                              }}
                              className="text-[11px] px-2.5 py-1 rounded bg-[#14120e] border border-[#2b271d] text-[#c9c4b7] hover:border-[#c5a059] hover:text-[#c5a059] cursor-pointer transition-colors"
                              title={sub.description}
                            >
                              {sub.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-6 pt-0 border-t border-[#1a1711] mt-auto flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectArea(area)}
                      className="text-xs text-[#c5a059] hover:underline flex items-center gap-1 font-semibold tracking-wider uppercase py-2"
                    >
                      <span>Explore Division</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onConsultPracticeArea(area)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1c1810] border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-colors"
                    >
                      Consult
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-[#060606] border-b border-[#24211a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-2">
              FREQUENTLY ASKED LEGAL QUERIES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ece0]">
              Understanding Legal Procedures in Nepal
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#0c0b09] border border-[#24211a]"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm sm:text-base font-serif text-[#f3ece0] font-medium mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9c988c] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-[#0a0907] text-center border-b border-[#24211a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-4">
          <h2 className="font-serif text-3xl text-[#f3ece0]">
            Require Legal Advice for Your Business or Family?
          </h2>
          <p className="text-xs sm:text-sm text-[#8c887d] leading-relaxed">
            Our chambers provide comprehensive evaluations tailored to your specific matter under Nepalese Law.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
            >
              Contact Chambers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

function ScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
