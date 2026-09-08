import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Phone,
  ShieldCheck,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { PracticeArea, PracticeSubSection } from '../types';

interface PracticeAreaDetailModalProps {
  practiceArea: PracticeArea | null;
  onClose: () => void;
  onBookConsultation: (areaTitle: string) => void;
}

export const PracticeAreaDetailModal: React.FC<PracticeAreaDetailModalProps> = ({
  practiceArea,
  onClose,
  onBookConsultation
}) => {
  const [selectedSubSection, setSelectedSubSection] = useState<PracticeSubSection | null>(null);

  if (!practiceArea) return null;

  const currentSub = selectedSubSection || practiceArea.subSections[0] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0e0d0b] border border-[#383329] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-[#997a38] via-[#c5a059] to-[#997a38]" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#24211a] flex items-start justify-between bg-[#12100d]">
          <div>
            <div className="flex items-center gap-2 text-[#c5a059] text-xs font-semibold uppercase tracking-widest mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Practice Area Specialization</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f3ece0] font-normal">
              {practiceArea.title}
            </h2>
            <p className="text-sm text-[#a39f93] mt-2 max-w-2xl leading-relaxed">
              {practiceArea.fullDescription || practiceArea.shortDescription}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8c887d] hover:text-white hover:bg-[#201c15] rounded transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns for Sub-sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
          {/* Sub-sections Menu on the Left */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-[#24211a] p-4 sm:p-6 bg-[#0a0908]">
            <span className="text-xs uppercase tracking-wider text-[#c5a059] font-medium block mb-3">
              Divisions & Sub-Sections ({practiceArea.subSections.length})
            </span>

            {practiceArea.subSections.length === 0 ? (
              <p className="text-xs text-[#706c62] italic py-4">
                No sub-sections added yet. You can add them from the Admin Panel.
              </p>
            ) : (
              <div className="space-y-2">
                {practiceArea.subSections.map((sub, idx) => {
                  const isActive = currentSub?.id === sub.id;
                  return (
                    <button
                      key={sub.id || idx}
                      onClick={() => setSelectedSubSection(sub)}
                      className={`w-full text-left p-3 text-xs sm:text-sm rounded transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#1e1a13] text-[#c5a059] border border-[#c5a059]/40 font-medium'
                          : 'text-[#a39f93] hover:text-white hover:bg-[#14120e] border border-transparent'
                      }`}
                    >
                      <span className="truncate pr-2">{sub.title}</span>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-[#c5a059] translate-x-0.5'
                            : 'text-[#4d493f] group-hover:text-[#a39f93]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sub-section Details on the Right */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#0e0d0b]">
            {currentSub ? (
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#17140f] border border-[#c5a059]/30 text-[#c5a059] text-xs mb-3 font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Focused Legal Advisory</span>
                </div>

                <h3 className="font-serif text-xl text-[#f3ece0] mb-3">
                  {currentSub.title}
                </h3>

                <p className="text-sm text-[#b8b3a7] leading-relaxed mb-6">
                  {currentSub.description}
                </p>

                {currentSub.keyServices && currentSub.keyServices.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-3">
                      Key Services & Deliverables
                    </h4>
                    <div className="space-y-2">
                      {currentSub.keyServices.map((service, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#a39f93]">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-[#7d796f] text-sm">
                Select a sub-section on the left to review legal coverage and scope.
              </div>
            )}

            {/* Bottom Modal Actions */}
            <div className="pt-6 mt-8 border-t border-[#24211a] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#a39f93]">
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Immediate inquiries: +977 1 590 1234</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#a39f93] hover:text-white border border-[#2e2a22] transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onBookConsultation(practiceArea.title);
                  }}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
