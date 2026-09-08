import React from 'react';
import { MountainRangeContent } from '../types';

interface NepalMountainRangeProps {
  data?: MountainRangeContent;
}

const DEFAULT_MOUNTAIN_BANNER = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=85';

export const NepalMountainRange: React.FC<NepalMountainRangeProps> = ({ data }) => {
  const imageUrl = data?.bannerImage || DEFAULT_MOUNTAIN_BANNER;

  return (
    <div
      className="w-full h-[450px] relative overflow-hidden border-y border-[#24211a] bg-[#070605]"
      id="nepal-mountain-banner"
    >
      <img
        src={imageUrl}
        alt="Nepal Himalayan Mountain Range Panorama"
        className="w-full h-[450px] object-cover object-center block"
        loading="lazy"
      />
      {/* Subtle vignette for elegant blending with dark theme */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30" />
    </div>
  );
};
