import { ArrowRight, FileText, HelpCircle } from "lucide-react";
import React from "react";
import { FaqSection } from "../components/FaqSection";

interface LegalFaqsPageProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const LegalFaqsPage: React.FC<LegalFaqsPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <div className="bg-[#080808] text-[#f3ece0]">
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 border border-[#c5a059]/40 bg-[#16120d] text-[#c5a059] text-[11px] uppercase tracking-[0.2em] font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Legal FAQs</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#f3ece0] leading-tight">
              Common legal questions answered clearly.
            </h1>
            <p className="text-sm sm:text-base text-[#a39f93] leading-relaxed max-w-2xl">
              Explore practical guidance on Supreme Court matters, family law,
              company registration, land disputes, foreign investment, and legal
              consultation in Nepal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4b050] text-black font-semibold text-xs px-5 py-3 transition-colors shadow cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Ask an Advocate
            </button>

            <button
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center gap-2 border border-[#2e2a22] bg-[#12100d] text-[#f3ece0] hover:border-[#c5a059] hover:text-[#c5a059] text-xs px-5 py-3 transition-colors cursor-pointer"
            >
              Contact the Firm
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <FaqSection
        onOpenConsultation={onOpenConsultation}
        onNavigate={onNavigate}
      />
    </div>
  );
};
