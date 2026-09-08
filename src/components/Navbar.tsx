import {
  Clock,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { ContactInfo } from '../types';
import { BodhLogo } from './BodhLogo';

interface NavbarProps {
  contactInfo: ContactInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenConsultationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  contactInfo,
  activeSection,
  onNavigate,
  onOpenConsultationModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'practice-areas', label: 'Practice Areas' },
    { id: 'team', label: 'Our Team' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
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
          <BodhLogo
            size="md"
            onClick={() => handleLinkClick('home')}
          />

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8 text-[13.5px] font-normal tracking-wide text-[#b8b3a7]">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors hover:text-[#f3ece0] ${
                    isActive ? 'text-[#c5a059] font-medium' : ''
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#24211a] flex flex-col gap-2 pb-4 animate-in fade-in duration-200">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                  activeSection === link.id
                    ? 'text-[#c5a059] bg-[#1a1711]'
                    : 'text-[#b8b3a7] hover:text-white hover:bg-[#12100a]'
                }`}
              >
                {link.label}
              </button>
            ))}
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
