import { Check, Copy, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { curatedImages } from '../data/curatedImages';

export const MediaLibraryTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = selectedCategory === 'all'
    ? curatedImages
    : curatedImages.filter((img) => img.category === selectedCategory);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#242018]">
        <div>
          <h3 className="font-serif text-xl text-[#f3ece0]">
            Legal Photography & Media Assets
          </h3>
          <p className="text-xs text-[#8c887d] mt-1">
            Curated high-resolution imagery for banners, advocates, law libraries, and articles. Copy any URL or paste your own.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-[#12100a] p-1 border border-[#26221a]">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'hero', label: 'Heroes / Skyline' },
            { id: 'about', label: 'Chambers / Library' },
            { id: 'team', label: 'Advocates' },
            { id: 'blogs', label: 'Case & Articles' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1 font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-[#8c887d] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#0c0b09] border border-[#242018] overflow-hidden group hover:border-[#c5a059]/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-[#14120e] relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 text-[10px] bg-black/80 text-[#c5a059] border border-[#3d331e] px-2 py-0.5 uppercase tracking-wider font-semibold">
                  {item.category}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-2 right-2 p-1.5 bg-black/80 hover:bg-[#c5a059] text-white hover:text-black rounded transition-colors"
                  title="Open full resolution"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-serif text-sm font-semibold text-[#f3ece0]">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#8c887d] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => handleCopy(item.url, item.id)}
                className={`w-full py-2 px-3 text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  copiedId === item.id
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-[#14120e] text-[#c5a059] border-[#3b3426] hover:bg-[#252016]'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied Image URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Image URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
