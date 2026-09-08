import React from 'react';

interface BodhLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BodhLogo: React.FC<BodhLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick
}) => {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[11px] tracking-[0.3em]',
    lg: 'text-[13px] tracking-[0.35em]',
    xl: 'text-[16px] tracking-[0.4em]'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
      id="bodh-logo-brand"
    >
      {/* Golden Lotus & Scales Emblem */}
      <div
        className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="absolute inset-0 rounded-full border border-[#c5a059]/40 bg-gradient-to-br from-[#1a160f] to-[#0a0a0a] shadow-inner shadow-[#c5a059]/20" />
        
        {/* Crisp vector scales & veena legal emblem */}
        <svg
          viewBox="0 0 100 100"
          className="relative z-10 w-full h-full text-[#c5a059] fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle lotus petals outline */}
          <path
            d="M50 8 C40 22 28 32 15 42 C28 50 38 62 50 88 C62 62 72 50 85 42 C72 32 60 22 50 8 Z"
            fill="none"
            stroke="#c5a059"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <path
            d="M50 14 C35 30 25 45 20 58 C35 58 45 68 50 84 C55 68 65 58 80 58 C75 45 65 30 50 14 Z"
            fill="none"
            stroke="#e5c07b"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />

          {/* Center Golden Circle Halo */}
          <circle cx="50" cy="50" r="32" fill="none" stroke="#c5a059" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#c5a059" strokeWidth="0.8" strokeDasharray="1.5 2" strokeOpacity="0.6" />

          {/* Central Veena Neck & Balance Pillar */}
          <rect x="48.8" y="26" width="2.4" height="42" rx="1" fill="#e5c07b" />
          <circle cx="50" cy="27" r="3" fill="#c5a059" />
          <circle cx="50" cy="67" r="7.5" fill="#c5a059" stroke="#12100a" strokeWidth="1.5" />
          <circle cx="50" cy="67" r="4.5" fill="#12100a" />

          {/* Veena strings */}
          <line x1="49.5" y1="28" x2="49.5" y2="65" stroke="#f5eedb" strokeWidth="0.6" />
          <line x1="50.5" y1="28" x2="50.5" y2="65" stroke="#f5eedb" strokeWidth="0.6" />

          {/* Balance Scale Crossbar */}
          <path
            d="M30 38 C40 35 60 35 70 38"
            fill="none"
            stroke="#e5c07b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="36.5" r="2" fill="#f5eedb" />

          {/* Left Pan and Strings */}
          <line x1="30" y1="38" x2="25" y2="48" stroke="#c5a059" strokeWidth="0.9" />
          <line x1="30" y1="38" x2="35" y2="48" stroke="#c5a059" strokeWidth="0.9" />
          <path
            d="M23 48 C27 53 33 53 37 48 Z"
            fill="#c5a059"
            stroke="#e5c07b"
            strokeWidth="0.8"
          />

          {/* Right Pan and Strings */}
          <line x1="70" y1="38" x2="65" y2="48" stroke="#c5a059" strokeWidth="0.9" />
          <line x1="70" y1="38" x2="75" y2="48" stroke="#c5a059" strokeWidth="0.9" />
          <path
            d="M63 48 C67 53 73 53 77 48 Z"
            fill="#c5a059"
            stroke="#e5c07b"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif tracking-tight font-medium text-[#f3ece0] group-hover:text-[#c5a059] transition-colors leading-none ${titleSizes[size]}`}
          >
            Bodh
          </span>
          <span
            className={`font-sans uppercase text-[#c5a059] font-semibold mt-1 opacity-90 ${subtitleSizes[size]}`}
          >
            Law Firm Nepal
          </span>
        </div>
      )}
    </div>
  );
};
