import { Award, Briefcase, Trophy, Users } from 'lucide-react';
import React from 'react';
import { StatItem } from '../types';

interface StatsCounterProps {
  stats: StatItem[];
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats }) => {
  const getStatIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'award':
        return <Award className="w-8 h-8 text-[#c5a059]" />;
      case 'users':
        return <Users className="w-8 h-8 text-[#c5a059]" />;
      case 'briefcase':
        return <Briefcase className="w-8 h-8 text-[#c5a059]" />;
      case 'trophy':
      case 'percent':
        return <Trophy className="w-8 h-8 text-[#c5a059]" />;
      default:
        return <Award className="w-8 h-8 text-[#c5a059]" />;
    }
  };

  return (
    <section className="bg-[#0b0a09] border-b border-[#24211a] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className="flex items-center gap-4 sm:gap-5 justify-center sm:justify-start group"
              id={`stat-counter-${idx}`}
            >
              <div className="shrink-0 p-3 rounded-full bg-[#16140e] border border-[#c5a059]/30 group-hover:border-[#c5a059] group-hover:scale-105 transition-all">
                {getStatIcon(stat.icon)}
              </div>
              <div>
                <span className="block font-serif text-3xl sm:text-4xl text-[#f3ece0] font-normal leading-none mb-1.5 group-hover:text-[#c5a059] transition-colors">
                  {stat.value}
                </span>
                <span className="block text-xs sm:text-sm text-[#9c988c] font-normal">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
