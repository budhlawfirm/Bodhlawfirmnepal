import {
  ArrowUp,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import React from "react";
import { ContactInfo, PracticeArea } from "../types";
import { BodhLogo } from "./BodhLogo";

interface FooterProps {
  contactInfo: ContactInfo;
  practiceAreas: PracticeArea[];
  onNavigate: (sectionId: string) => void;
  onOpenConsultation?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  practiceAreas,
  onNavigate,
  onOpenConsultation,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#24211a] text-[#a39f93]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#1c1913]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <BodhLogo size="md" onClick={() => onNavigate("home")} />
            <p className="text-xs text-[#8c887d] leading-relaxed max-w-sm pt-2">
              Bodh Law Firm Nepal is committed to providing reliable,
              result-oriented and cost-effective legal services across Nepal.
            </p>

            {/* Social & Direct Contact Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#12100d] border border-[#2e2a22] flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
                title="Facebook"
              >
                <span className="text-xs font-bold font-serif">f</span>
              </a>


              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#12100d] border border-[#2e2a22] flex items-center justify-center hover:border-[#c5a059] hover:text-[#e1306c] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href={contactInfo.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#12100d] border border-[#2e2a22] flex items-center justify-center hover:border-[#25d366] hover:text-[#25d366] transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="w-8 h-8 rounded-full bg-[#12100d] border border-[#2e2a22] flex items-center justify-center hover:border-[#c5a059] hover:text-[#c5a059] transition-colors"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8c887d]">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-[#f3ece0] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-[#f3ece0] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("practice-areas")}
                  className="hover:text-[#f3ece0] transition-colors"
                >
                  Practice Areas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("team")}
                  className="hover:text-[#f3ece0] transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("blogs")}
                  className="hover:text-[#f3ece0] transition-colors"
                >
                  Blogs & Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-[#f3ece0] transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("faqs")}
                  className="text-[#c5a059] hover:underline transition-colors flex items-center gap-1"
                >
                  <span>Legal FAQs</span>
                  <span className="text-[10px] bg-[#241f16] px-1 py-0.2 border border-[#c5a059]/40 rounded">
                    Nepal Law
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-4">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8c887d]">
              {practiceAreas.slice(0, 6).map((pa) => (
                <li key={pa.id}>
                  <button
                    onClick={() => onNavigate("practice-areas")}
                    className="hover:text-[#f3ece0] transition-colors text-left"
                  >
                    {pa.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-4">
              Contact Info
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#8c887d]">
              <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span>
                {contactInfo.address}, {contactInfo.city} {contactInfo.country}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#8c887d]">
              <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
              <a
                href={`tel:${contactInfo.phone}`}
                className="hover:text-[#f3ece0] transition-colors"
              >
                {contactInfo.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#8c887d]">
              <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-[#f3ece0] transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#8c887d]">
              <Globe className="w-4 h-4 text-[#c5a059] shrink-0" />
              <a
                href="https://bodhlawfirm.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f3ece0] transition-colors"
              >
                bodhlawfirm.com.np
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#636056] gap-4">
          <p>
            © 2026 Bodh Law Firm Nepal (bodhlawfirm.com.np). All Rights
            Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#9e9a8f] cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#9e9a8f] cursor-pointer">
              Terms of Practice
            </span>
            <span className="hover:text-[#9e9a8f] cursor-pointer">
              Nepal Bar Council Ethics
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#12100d] border border-[#2e2a22] text-[#c5a059] hover:text-white cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
