import {
  Clock,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck
} from 'lucide-react';
import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { ContactInfo, PracticeArea } from '../types';

interface ContactPageProps {
  contactInfo: ContactInfo;
  practiceAreas: PracticeArea[];
  prefilledPracticeArea?: string;
  onNavigate: (sectionId: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  contactInfo,
  practiceAreas,
  prefilledPracticeArea = '',
  onNavigate
}) => {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Page Header Banner */}
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
            <span className="text-[#c5a059]">Contact Us</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
                KATHMANDU CHAMBERS & LITIGATION DESK
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3ece0] font-normal tracking-tight">
                Contact Bodh Law Firm Nepal
              </h1>
              <p className="text-sm sm:text-base text-[#bcb7ab] max-w-2xl mt-4 leading-relaxed">
                Connect with our advocates for initial case appraisal, company secretarial consultation, or urgent stay order filings before Nepal Courts.
              </p>
            </div>

            {/* Privilege Badge */}
            <div className="bg-[#12100a] border border-[#c5a059]/40 p-4 rounded shrink-0">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#c5a059]" />
                <div>
                  <div className="text-sm font-serif text-[#f3ece0] font-bold">
                    Privilege Protected
                  </div>
                  <div className="text-[11px] text-[#a39f93]">
                    Under Legal Practitioners Act 2049
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section with Multi-Channel Hub and Interactive Form */}
      <ContactSection
        contactInfo={contactInfo}
        practiceAreas={practiceAreas}
        prefilledPracticeArea={prefilledPracticeArea}
      />
    </div>
  );
};
