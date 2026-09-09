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
  // Logo image is square but the golden emblem occupies ~70% center
  // We give it extra space so the full lotus petals are visible
  const logoSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  const subtitleSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.28em]',
    lg: 'text-[13px] tracking-[0.35em]',
    xl: 'text-[16px] tracking-[0.4em]'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 select-none cursor-pointer group ${className}`}
      id="bodh-logo-brand"
    >
      {/* 
        The logo JPG has a pure black (#000) background.
        mix-blend-screen: black pixels (0,0,0) become fully transparent when blended,
        while the golden pixels remain vivid. This is the cleanest way to 
        "remove" the black background without needing a PNG with transparency.
        Wrap in a relative container so the blending is isolated.
      */}
      <div
        className={`relative ${logoSizes[size]} shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        style={{ isolation: 'isolate' }}
      >
        <img
          src="/assets/bodh-logo.png"
          alt="Bodh Law Firm Nepal Official Logo"
          className="w-full h-full object-contain"
          style={{
            mixBlendMode: 'screen',
            filter: 'brightness(1.4) contrast(1.3) saturate(1.2)',
            imageRendering: 'crisp-edges',
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif tracking-tight font-semibold text-[#f3ece0] group-hover:text-[#c5a059] transition-colors leading-none ${titleSizes[size]}`}
          >
            Bodh
          </span>
          <span
            className={`font-sans uppercase text-[#c5a059] font-semibold opacity-90 mt-0.5 ${subtitleSizes[size]}`}
          >
            Law Firm Nepal
          </span>
        </div>
      )}
    </div>
  );
};
