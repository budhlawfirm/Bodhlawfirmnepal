import {
  ChevronDown,
  ChevronRight,
  Clock,
  Gavel,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  X
} from "lucide-react";
import React, { useRef, useState } from "react";
import { ContactInfo, PracticeArea } from "../types";
import { BodhLogo } from "./BodhLogo";

interface NavbarProps {
  contactInfo: ContactInfo;
  activeSection: string;
  practiceAreas?: PracticeArea[];
  onNavigate: (sectionId: string) => void;
  onSelectPracticeArea?: (area: PracticeArea) => void;
  onOpenConsultationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  contactInfo,
  activeSection,
  practiceAreas = [],
  onNavigate,
  onSelectPracticeArea,
  onOpenConsultationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  const [mobilePracticeExpanded, setMobilePracticeExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "practice-areas", label: "Practice Areas", hasDropdown: true },
    { id: "team", label: "Our Team" },
    { id: "blogs", label: "Blogs" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setIsPracticeDropdownOpen(false);
  };

  const handleAreaClick = (area: PracticeArea) => {
    if (onSelectPracticeArea) {
      onSelectPracticeArea(area);
    }
    onNavigate("practice-areas");
    setIsPracticeDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPracticeDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPracticeDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Contact Bar with Quick Info */}
      <div className="bg-[#050505] border-b border-[#c5a059]/20 text-xs text-[#a39f93] py-2 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-2 hover:text-[#c5a059] transition-colors"
              id="top-bar-phone"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{contactInfo.phone}</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 hover:text-[#c5a059] transition-colors"
              id="top-bar-email"
            >
              <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{contactInfo.email}</span>
            </a>
            <div className="flex items-center gap-2 text-[#7d796f]">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{contactInfo.workingHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#c5a059] font-medium text-[11px] bg-[#1a1711] px-2.5 py-0.5 rounded border border-[#c5a059]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kathmandu Bar Council Licensed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#080808]/95 backdrop-blur-md border-b border-[#24211a] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <BodhLogo size="md" onClick={() => handleLinkClick("home")} />

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8 text-[13.5px] font-normal tracking-wide text-[#b8b3a7]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    className="relative py-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => handleLinkClick(link.id)}
                      className={`flex items-center gap-1 transition-colors hover:text-[#f3ece0] ${
                        isActive ? "text-[#c5a059] font-medium" : ""
                      }`}
                      id={`nav-link-${link.id}`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isPracticeDropdownOpen ? "rotate-180 text-[#c5a059]" : ""
                        }`}
                      />
                    </button>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a059]" />
                    )}

                    {/* Interactive Dropdown Menu */}
                    {isPracticeDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-[#0e0d0b] border border-[#332e24] shadow-2xl rounded-lg overflow-hidden z-50 animate-in fade-in duration-150">
                        <div className="bg-[#14120e] px-4 py-2.5 border-b border-[#24211a] flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold flex items-center gap-1.5">
                            <Gavel className="w-3 h-3" />
                            PRACTICE AREAS & LEGAL FOCUS
                          </span>
                        </div>

                        <div className="py-1 max-h-80 overflow-y-auto divide-y divide-[#171510]">
                          {practiceAreas.map((area) => (
                            <button
                              key={area.id}
                              onClick={() => handleAreaClick(area)}
                              className="w-full text-left px-4 py-2.5 hover:bg-[#181510] transition-colors flex items-center justify-between group"
                            >
                              <div>
                                <div className="text-xs font-serif text-[#f3ece0] group-hover:text-[#c5a059] transition-colors">
                                  {area.title}
                                </div>
                                {area.subSections && area.subSections.length > 0 && (
                                  <div className="text-[10px] text-[#7d796f] mt-0.5">
                                    {area.subSections.length} specialized sub-sections
                                  </div>
                                )}
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-[#5e5a50] group-hover:text-[#c5a059] transition-colors" />
                            </button>
                          ))}
                        </div>

                        <div className="p-2 bg-[#12100a] border-t border-[#24211a]">
                          <button
                            onClick={() => handleLinkClick("practice-areas")}
                            className="w-full py-1.5 text-center text-[11px] font-semibold text-[#c5a059] hover:text-white transition-colors uppercase tracking-wider"
                          >
                            Explore All Practice Areas →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-[#f3ece0] ${
                    isActive ? "text-[#c5a059] font-medium" : ""
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a059]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenConsultationModal}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] border border-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-200 shadow-sm"
              id="btn-consult-now-nav"
            >
              CONSULT NOW
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#b8b3a7] hover:text-white hover:bg-[#1a1711] rounded"
              id="btn-mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#24211a] flex flex-col gap-1 pb-4 animate-in fade-in duration-200">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.id} className="flex flex-col">
                    <div className="flex items-center justify-between pr-2">
                      <button
                        onClick={() => handleLinkClick(link.id)}
                        className={`text-left px-3 py-2 text-sm font-medium rounded transition-colors flex-1 ${
                          activeSection === link.id
                            ? "text-[#c5a059] bg-[#1a1711]"
                            : "text-[#b8b3a7] hover:text-white"
                        }`}
                      >
                        {link.label}
                      </button>
                      <button
                        onClick={() => setMobilePracticeExpanded(!mobilePracticeExpanded)}
                        className="p-2 text-[#8c887d] hover:text-[#c5a059]"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobilePracticeExpanded ? "rotate-180 text-[#c5a059]" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {mobilePracticeExpanded && (
                      <div className="pl-6 pr-2 py-1 space-y-1 bg-[#0c0b09] border-l border-[#2e2a20] my-1">
                        {practiceAreas.map((area) => (
                          <button
                            key={area.id}
                            onClick={() => handleAreaClick(area)}
                            className="w-full text-left px-2 py-1.5 text-xs text-[#a39f93] hover:text-[#c5a059] block truncate"
                          >
                            • {area.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                    activeSection === link.id
                      ? "text-[#c5a059] bg-[#1a1711]"
                      : "text-[#b8b3a7] hover:text-white hover:bg-[#12100a]"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#24211a] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultationModal();
                }}
                className="w-full py-2.5 text-xs font-bold tracking-wider uppercase bg-[#c5a059] text-black text-center"
              >
                CONSULT NOW
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
