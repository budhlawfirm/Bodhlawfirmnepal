import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle2,
  Compass,
  FileCheck,
  Scale,
  Shield,
  ShieldCheck,
  Users
} from 'lucide-react';
import React from 'react';
import { NepalMountainRange } from '../components/NepalMountainRange';
import { ContactInfo, SiteContent, TeamMember } from '../types';

interface AboutPageProps {
  content: SiteContent;
  teamMembers: TeamMember[];
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  content,
  teamMembers,
  onNavigate,
  onOpenConsultation
}) => {
  const values = [
    {
      title: 'Uncompromising Integrity',
      desc: 'We adhere strictly to highest ethical canons prescribed by the Nepal Bar Council, ensuring honest appraisals and conflict-free counsel.',
      icon: Scale
    },
    {
      title: 'Commercial Acumen',
      desc: 'Our legal strategies are grounded in commercial realities, minimizing friction and optimizing outcomes for domestic & multinational clients.',
      icon: Briefcase
    },
    {
      title: 'Absolute Confidentiality',
      desc: 'Complete attorney-client privilege maintained across all physical case files, encrypted digital communications, and courtroom disclosures.',
      icon: Shield
    },
    {
      title: 'Client-Centered Diligence',
      desc: 'Direct accessibility to senior counsel with transparent fee schedules and timely updates at every procedural milestone.',
      icon: CheckCircle2
    }
  ];

  const courts = [
    'Supreme Court of Nepal (Ramshah Path, Kathmandu)',
    'High Court Patan & Provincial Appellate Divisions',
    'Special Court of Nepal (Anti-Corruption & Money Laundering)',
    'Debt Recovery Tribunal (DRT) & Banking Courts',
    'Department of Industry (DOI) & Foreign Investment Division',
    'Department of Patents, Designs and Trademarks (DPDT)'
  ];

  return (
    <div className="animate-in fade-in duration-300">
      {/* Page Header Banner */}
      <section className="relative py-20 bg-[#060606] border-b border-[#24211a] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#8c887d] mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#c5a059] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#c5a059]">About Us</span>
          </nav>

          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
            ESTABLISHED IN KATHMANDU, NEPAL
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3ece0] font-normal tracking-tight max-w-3xl leading-tight">
            Advocates for Justice.
            <br />
            <span className="text-[#c5a059]">Partners in Success.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#bcb7ab] max-w-2xl mt-6 leading-relaxed">
            Bodh Law Firm Nepal is a premier full-service law firm dedicated to defending legal rights, structuring corporate investments, and resolving complex disputes before Nepal's apex judicial benches.
          </p>
        </div>
      </section>

      {/* Main Firm Narrative & Image Section */}
      <section className="py-20 bg-[#080808] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo & Experience Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative border border-[#2b271f] p-2 bg-[#0e0d0b]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#16140e]">
                  <img
                    src={content.about.image || '/assets/about-library.jpg'}
                    alt="Bodh Law Firm Chambers"
                    className="w-full h-full object-cover filter brightness-90 contrast-105"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-[#14120e] border border-[#c5a059] p-4 shadow-2xl hidden sm:flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1c1912] border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-2xl font-serif text-[#f3ece0] font-bold">
                      {content.about.yearsOfExcellence || 12}+ Years
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#a8a396]">
                      Legal Practice in Nepal
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[11px] text-[#c5a059] font-medium tracking-wider uppercase bg-[#18150f] px-3 py-1 border border-[#c5a059]/30 rounded">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nepal Bar Council & Supreme Court Bar Association</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ece0] font-normal leading-snug">
                Dedicated to Legal Integrity & Precision Across the Himalayas
              </h2>

              <p className="text-sm sm:text-base text-[#b8b3a7] leading-relaxed">
                {content.about.paragraph1}
              </p>

              <p className="text-sm sm:text-base text-[#b8b3a7] leading-relaxed">
                {content.about.paragraph2}
              </p>

              <p className="text-sm sm:text-base text-[#b8b3a7] leading-relaxed">
                Headquartered in Kathmandu's premier legal corridor of Putalisadak, our chambers bring together seasoned senior advocates, commercial transaction specialists, and aggressive courtroom litigators. We represent individuals, multinational corporations, diplomatic missions, and domestic enterprises.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
                >
                  Schedule Initial Consultation
                </button>
                <button
                  onClick={() => onNavigate('team')}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors flex items-center gap-2"
                >
                  <span>Meet Our Advocates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="py-20 bg-[#060606] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-2">
              FOUNDATIONAL PURPOSE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ece0]">
              Our Mission & Long-Term Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/60 transition-colors">
              <div className="w-12 h-12 bg-[#17140e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#f3ece0] mb-4">
                Our Mission
              </h3>
              <p className="text-sm text-[#b8b3a7] leading-relaxed mb-4">
                To deliver top-tier, honest, and cost-effective legal representation while rigorously upholding the rule of law. We strive to empower our clients with proactive legal risk mitigation, meticulous contract structuring, and fearless advocacy in constitutional and commercial disputes.
              </p>
              <ul className="space-y-2 text-xs text-[#a39f93]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                  Ethical transparency with predictable legal fee structures
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                  Rapid response time for time-sensitive injunctions
                </li>
              </ul>
            </div>

            <div className="p-8 sm:p-10 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/60 transition-colors">
              <div className="w-12 h-12 bg-[#17140e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-6">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#f3ece0] mb-4">
                Our Vision
              </h3>
              <p className="text-sm text-[#b8b3a7] leading-relaxed mb-4">
                To be recognized as Nepal's most respected institutional law firm, bridging local jurisprudence with international standards of transactional precision. We envision an accessible, modern legal ecosystem where foreign investors and local citizens navigate Nepalese law with complete confidence.
              </p>
              <ul className="space-y-2 text-xs text-[#a39f93]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                  Pioneering technology-enabled case tracking in Nepal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                  Pro-bono legal aid for public interest litigation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#080808] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-2">
              ETHICAL FOUNDATIONS
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ece0]">
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/60 transition-all"
                >
                  <div className="w-10 h-10 bg-[#16130d] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg text-[#f3ece0] mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-[#8c887d] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Court & Regulatory Jurisdiction */}
      <section className="py-20 bg-[#060606] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
                PRACTICE JURISDICTION
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ece0] leading-snug">
                Admitted to All Superior & Special Courts of Nepal
              </h2>
              <p className="text-xs sm:text-sm text-[#a39f93] leading-relaxed">
                Our advocates are licensed by the Nepal Bar Council to plead and appear before all tiers of the judiciary, regulatory departments, and statutory tribunals throughout the 7 provinces of Nepal.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('practice-areas')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] hover:underline"
                >
                  <span>Explore All Specialized Divisions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courts.map((court, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 bg-[#0d0c0a] border border-[#24211a] flex items-start gap-3"
                >
                  <FileCheck className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#d1ccc2] leading-relaxed">
                    {court}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nepal Mountain Range Heritage Showcase */}
      <NepalMountainRange data={content.mountainRange} />

      {/* Call to Action */}
      <section className="py-16 bg-[#0a0907] border-b border-[#24211a] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-4">
          <h2 className="font-serif text-3xl text-[#f3ece0]">
            Ready to Discuss Your Legal Matters?
          </h2>
          <p className="text-xs sm:text-sm text-[#8c887d] leading-relaxed">
            Our chambers in Putalisadak, Kathmandu are open Sunday through Friday. Connect with our advocates for initial case evaluation.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
            >
              Book Consultation
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
            >
              Contact Chambers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
