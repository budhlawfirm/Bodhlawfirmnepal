import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { ContactInfo } from '../types';

interface FloatingContactWidgetProps {
  contactInfo: ContactInfo;
  onOpenConsultationModal: () => void;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({
  contactInfo,
  onOpenConsultationModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />,
      label: 'Chat on WhatsApp',
      href: contactInfo.whatsappDirectUrl,
      bg: 'bg-[#122316]/80 hover:bg-[#1a3821] border-[#25d366]/40',
      textColor: 'text-[#25d366]'
    },
    {
      id: 'phone',
      name: 'Direct Phone',
      icon: <Phone className="w-3.5 h-3.5 text-[#c5a059]" />,
      label: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      bg: 'bg-[#1b1710]/80 hover:bg-[#282115] border-[#c5a059]/40',
      textColor: 'text-[#c5a059]'
    },
    {
      id: 'email',
      name: 'Email Counsel',
      icon: <Mail className="w-3.5 h-3.5 text-[#8ec5fc]" />,
      label: 'Email Counsel',
      href: `mailto:${contactInfo.email}`,
      bg: 'bg-[#0f1722]/80 hover:bg-[#152335] border-[#38bdf8]/40',
      textColor: 'text-[#38bdf8]'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />,
      label: 'Follow on Instagram',
      href: contactInfo.instagramUrl,
      bg: 'bg-[#24111f]/80 hover:bg-[#381830] border-[#e1306c]/40',
      textColor: 'text-[#e1306c]'
    }
  ];

  return (
    <aside
      className="fixed right-3 bottom-5 z-40 flex flex-col items-end"
      aria-label="Quick contact channels"
    >
      {/* Floating Panel (Opens only when user clicks Contact Counsel) */}
      {isOpen ? (
        <div className="w-52 sm:w-56 bg-[#0c0a07]/90 backdrop-blur-xl border border-[#c5a059]/50 p-2.5 shadow-2xl flex flex-col gap-2 transition-all duration-200">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-2 px-1 pb-1.5 border-b border-[#24211a]">
            <span className="text-[10px] uppercase tracking-wider text-[#c5a059] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              Instant Legal Connect
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#7d796f] hover:text-[#f3ece0] p-0.5 rounded transition-colors"
              title="Close"
              aria-label="Close contact dock"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Channels */}
          <div className="flex flex-col gap-1.5">
            {channels.map((ch) => (
              <a
                key={ch.id}
                href={ch.href}
                target={ch.id === 'phone' || ch.id === 'email' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredChannel(ch.id)}
                onMouseLeave={() => setHoveredChannel(null)}
                className={`relative flex items-center gap-2 px-2.5 py-1.5 border rounded text-xs transition-all ${ch.bg}`}
                id={`floating-contact-${ch.id}`}
              >
                {ch.icon}
                <span className={`text-[11px] font-medium ${ch.textColor}`}>
                  {ch.name}
                </span>

                {/* Hover Tooltip / Full Info */}
                {hoveredChannel === ch.id && (
                  <div className="absolute right-full mr-2 px-2.5 py-1 bg-[#12100d] border border-[#c5a059]/40 text-xs text-[#f3ece0] rounded whitespace-nowrap shadow-xl z-50 animate-in fade-in duration-150">
                    {ch.label}
                  </div>
                )}
              </a>
            ))}
          </div>

          {/* Quick Consultation CTA */}
          <button
            onClick={onOpenConsultationModal}
            className="w-full mt-0.5 py-1.5 px-2.5 text-[10px] font-bold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors flex items-center justify-center gap-1.5 shadow-md"
            id="floating-consult-now-btn"
          >
            <Calendar className="w-3 h-3" />
            <span>Book Case Intake</span>
          </button>
        </div>
      ) : (
        /* Minimized Floating Button (Contact Counsel) */
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-2 px-3 py-2 bg-[#0c0a07]/90 hover:bg-[#17140e] backdrop-blur-md border border-[#c5a059]/70 hover:border-[#c5a059] text-[#f3ece0] shadow-xl hover:shadow-[#c5a059]/20 transition-all cursor-pointer"
          id="btn-open-floating-contact"
          title="Open direct contact channels"
          aria-label="Open contact counsel"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a059]" />
          </span>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#c5a059]">
            Contact Counsel
          </span>
          <ChevronLeft className="w-3.5 h-3.5 text-[#c5a059] group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}
    </aside>
  );
};
