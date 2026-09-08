import {
  Briefcase,
  Calendar,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { TeamMember } from '../types';

interface TeamSectionProps {
  teamMembers: TeamMember[];
  onConsultMember: (member: TeamMember) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  teamMembers,
  onConsultMember
}) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="py-20 lg:py-28 bg-[#080808] border-b border-[#24211a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase mb-3"
            id="team-eyebrow"
          >
            OUR ADVOCATES & PARTNERS
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3ece0] font-normal tracking-tight"
            id="team-headline"
          >
            Legal Minds You Can Trust
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-4 mb-4" />
          <p className="text-sm text-[#9c988c] leading-relaxed">
            Our team comprises experienced advocates registered with the Nepal Bar Council, bringing extensive courtroom experience and commercial acumen to every matter.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#0d0c0a] border border-[#24211a] hover:border-[#c5a059]/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              id={`team-card-${member.id}`}
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/4] overflow-hidden bg-[#16140e]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-transparent opacity-80" />

                  {/* License Badge */}
                  {member.barRegistration && (
                    <div className="absolute top-3 right-3 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#c5a059]/30 text-[10px] text-[#c5a059] px-2 py-1 rounded flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{member.barRegistration}</span>
                    </div>
                  )}
                </div>

                {/* Profile Information */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-[#f3ece0] font-normal mb-1 group-hover:text-[#c5a059] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#c5a059] font-medium mb-3">
                    {member.role}
                  </p>

                  <p className="text-xs text-[#9c988c] leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  {/* Specializations Tags */}
                  {member.specializations && member.specializations.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.specializations.slice(0, 3).map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#17140f] border border-[#2e2a20] text-[#a8a396]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Direct Contact links */}
                  <div className="pt-4 border-t border-[#1c1913] space-y-1.5 text-xs text-[#8a867b]">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 hover:text-[#c5a059] transition-colors truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 hover:text-[#c5a059] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span>{member.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="flex-1 py-2 text-xs text-center border border-[#2e2a22] text-[#a39f93] hover:text-white hover:border-[#c5a059]/40 transition-colors uppercase tracking-wider"
                >
                  View Bio
                </button>
                <button
                  onClick={() => onConsultMember(member)}
                  className="flex-1 py-2 text-xs font-semibold text-center bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Consult</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#0e0d0b] border border-[#383329] shadow-2xl p-6 sm:p-8">
            <div className="h-1 bg-gradient-to-r from-[#997a38] via-[#c5a059] to-[#997a38] absolute top-0 left-0 right-0" />
            
            <div className="flex items-start gap-6 mb-6">
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded border border-[#c5a059]/40 shrink-0"
              />
              <div>
                <h3 className="font-serif text-2xl text-[#f3ece0] mb-1">
                  {selectedMember.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#c5a059] font-medium mb-2">
                  {selectedMember.role}
                </p>
                <p className="text-xs text-[#a39f93] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{selectedMember.barRegistration}</span>
                </p>
                <p className="text-xs text-[#8a8578] mt-1">
                  {selectedMember.education}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#b8b3a7] leading-relaxed mb-6">
              <p>{selectedMember.bio}</p>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                  Practice Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specializations?.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded bg-[#17140f] border border-[#c5a059]/30 text-[#e0ded8]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#24211a] flex items-center justify-between">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#a39f93] hover:text-white border border-[#2e2a22]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const m = selectedMember;
                  setSelectedMember(null);
                  onConsultMember(m);
                }}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050]"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
