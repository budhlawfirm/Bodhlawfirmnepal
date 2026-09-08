import { Award, Handshake, Scale, Shield, Users } from 'lucide-react';
import React from 'react';
import { Pillar } from '../types';

interface PillarsProps {
  pillars: Pillar[];
}

export const Pillars: React.FC<PillarsProps> = ({ pillars }) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'users':
        return <Users className="w-6 h-6 text-[#c5a059]" />;
      case 'scale':
        return <Scale className="w-6 h-6 text-[#c5a059]" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-[#c5a059]" />;
      case 'handshake':
        return <Handshake className="w-6 h-6 text-[#c5a059]" />;
      default:
        return <Award className="w-6 h-6 text-[#c5a059]" />;
    }
  };

  return (
    <section className="bg-[#0b0a09] border-b border-[#24211a] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id || idx}
              className="relative p-6 sm:p-7 border border-[#24211a] hover:border-[#c5a059]/50 transition-all duration-300 bg-[#0d0c0a] group"
              id={`pillar-card-${idx}`}
            >
              {/* Subtle top gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-transparent group-hover:bg-[#c5a059] transition-all duration-300" />

              {/* Gold Icon */}
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#17140f] border border-[#c5a059]/30 group-hover:border-[#c5a059] transition-colors">
                {getPillarIcon(pillar.icon)}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg text-[#f3ece0] font-normal mb-2.5 group-hover:text-[#c5a059] transition-colors">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#9e9a8f] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
