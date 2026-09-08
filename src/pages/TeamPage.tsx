import {
  Award,
  BookOpen,
  GraduationCap,
  Mail,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { TeamMember } from '../types';

interface TeamPageProps {
  teamMembers: TeamMember[];
  onConsultMember: (member: TeamMember) => void;
  onNavigate: (sectionId: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  teamMembers,
  onConsultMember,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const roles = [
    'All',
    ...Array.from(new Set(teamMembers.map((m) => m.role).filter(Boolean)))
  ];

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.specializations?.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (!matchesSearch) return false;
      if (roleFilter !== 'All' && m.role !== roleFilter) return false;

      return true;
    });
  }, [teamMembers, searchTerm, roleFilter]);

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
            <span className="text-[#c5a059]">Our Team</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
                COURT OF APPEAL & SUPREME COURT COUNSEL
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3ece0] font-normal tracking-tight">
                Our Advocates & Legal Counsel
              </h1>
              <p className="text-sm sm:text-base text-[#bcb7ab] max-w-2xl mt-4 leading-relaxed">
                Admitted to the Nepal Bar Council with deep sector expertise across commercial law, constitutional writs, tax litigation, and family disputes.
              </p>
            </div>

            <div className="bg-[#12100a] border border-[#c5a059]/40 p-4 rounded shrink-0">
              <div className="flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-[#c5a059]" />
                <div>
                  <div className="text-xl font-serif text-[#f3ece0] font-bold">
                    {teamMembers.length} Licensed Advocates
                  </div>
                  <div className="text-[11px] text-[#a39f93]">
                    Nepal Bar Council Accredited
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mt-10 pt-8 border-t border-[#1f1b15] flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#7d796f] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by advocate name or specialization..."
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] pl-9 pr-4 py-2 text-xs text-[#f3ece0] placeholder:text-[#6b675d] outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${
                    roleFilter === r
                      ? 'bg-[#c5a059] text-black font-semibold'
                      : 'bg-[#12100a] text-[#8c887d] hover:text-white border border-[#242018]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advocates Grid */}
      <section className="py-20 bg-[#080808] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-16 bg-[#0e0d0b] border border-[#24211a]">
              <p className="text-[#a39f93] text-sm">
                No advocates found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('All');
                }}
                className="mt-4 px-4 py-2 text-xs bg-[#c5a059] text-black font-semibold uppercase tracking-wider"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  id={`team-card-${member.id}`}
                >
                  <div>
                    {/* Photo with Bar License Badge */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#16140e]">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#c5a059]/40 text-[10px] text-[#c5a059] px-2.5 py-1 rounded font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{member.barRegistration}</span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-6">
                      <h3 className="font-serif text-2xl text-[#f3ece0] font-normal mb-1 group-hover:text-[#c5a059] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-[#c5a059] font-medium mb-3">
                        {member.role}
                      </p>

                      {member.education && (
                        <div className="flex items-center gap-2 text-xs text-[#9c988c] mb-3">
                          <GraduationCap className="w-4 h-4 text-[#c5a059] shrink-0" />
                          <span>{member.education}</span>
                        </div>
                      )}

                      <p className="text-xs text-[#a39f93] leading-relaxed mb-4">
                        {member.bio}
                      </p>

                      {/* Specializations */}
                      {member.specializations &&
                        member.specializations.length > 0 && (
                          <div className="pt-3 border-t border-[#1c1811]">
                            <span className="block text-[10px] uppercase tracking-wider text-[#7d796e] mb-2 font-medium">
                              Specialized In:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {member.specializations.map((spec, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[10px] px-2 py-0.5 rounded bg-[#16140e] border border-[#2b271d] text-[#b8b3a7]"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 border-t border-[#1a1711] mt-auto">
                    <button
                      onClick={() => onConsultMember(member)}
                      className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#1c1810] border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-colors"
                    >
                      Book Consultation With {member.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Chambers Careers / Apprenticeship Callout */}
      <section className="py-16 bg-[#060606] border-b border-[#24211a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#f3ece0]">
            Join Bodh Law Firm Chambers
          </h2>
          <p className="text-xs sm:text-sm text-[#8c887d] leading-relaxed max-w-xl mx-auto">
            We are continuously seeking brilliant law graduates, pupil barristers, and experienced litigators admitted to the Nepal Bar Council to join our litigation and corporate advisory groups.
          </p>
          <div className="pt-2">
            <a
              href="mailto:careers@bodhlawnepal.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Submit Resume & Writing Sample</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
