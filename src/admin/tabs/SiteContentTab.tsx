import {
  ArrowDown,
  ArrowUp,
  Award,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Image as ImageIcon,
  Layers,
  MapPin,
  Mountain,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Shield,
  Sparkles,
  Trash2
} from 'lucide-react';
import React, { useState } from 'react';
import { SiteContent } from '../../types';
import { ImageUploadInput } from '../components/ImageUploadInput';

const RECOMMENDED_LAW_SLIDES = [
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=85',
  'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1920&q=85',
  'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=85',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=85'
];

interface SiteContentTabProps {
  content: SiteContent;
  onChange: (updated: SiteContent) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

export const SiteContentTab: React.FC<SiteContentTabProps> = ({
  content,
  onChange,
  onSave,
  isSaving
}) => {
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'pillars' | 'mountains' | 'stats' | 'contact'>('hero');

  // Helper updater
  const updateHero = (field: keyof SiteContent['hero'], value: any) => {
    onChange({
      ...content,
      hero: {
        ...content.hero,
        [field]: value
      }
    });
  };

  const updateAbout = (field: keyof SiteContent['about'], value: any) => {
    onChange({
      ...content,
      about: {
        ...content.about,
        [field]: value
      }
    });
  };

  const updateContact = (field: keyof SiteContent['contactInfo'], value: any) => {
    onChange({
      ...content,
      contactInfo: {
        ...content.contactInfo,
        [field]: value
      }
    });
  };

  const updatePillar = (index: number, field: string, value: any) => {
    const newPillars = [...content.pillars];
    newPillars[index] = {
      ...newPillars[index],
      [field]: value
    };
    onChange({
      ...content,
      pillars: newPillars
    });
  };

  const updateStat = (index: number, field: string, value: any) => {
    const newStats = [...content.stats];
    newStats[index] = {
      ...newStats[index],
      [field]: value
    };
    onChange({
      ...content,
      stats: newStats
    });
  };

  // Hero Slides Helpers
  const currentHeroSlides = (content.hero.sliderImages && content.hero.sliderImages.length > 0)
    ? content.hero.sliderImages
    : (content.hero.bgImage ? [content.hero.bgImage] : [RECOMMENDED_LAW_SLIDES[0]]);

  const updateHeroSlide = (idx: number, url: string) => {
    const next = [...currentHeroSlides];
    next[idx] = url;
    onChange({
      ...content,
      hero: {
        ...content.hero,
        sliderImages: next,
        bgImage: next[0] || content.hero.bgImage
      }
    });
  };

  const addHeroSlide = () => {
    const fallbackUrl = RECOMMENDED_LAW_SLIDES[currentHeroSlides.length % RECOMMENDED_LAW_SLIDES.length];
    const next = [...currentHeroSlides, fallbackUrl];
    onChange({
      ...content,
      hero: {
        ...content.hero,
        sliderImages: next,
        bgImage: next[0]
      }
    });
  };

  const removeHeroSlide = (idx: number) => {
    if (currentHeroSlides.length <= 1) return;
    const next = currentHeroSlides.filter((_, i) => i !== idx);
    onChange({
      ...content,
      hero: {
        ...content.hero,
        sliderImages: next,
        bgImage: next[0]
      }
    });
  };

  const moveHeroSlide = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= currentHeroSlides.length) return;
    const next = [...currentHeroSlides];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    onChange({
      ...content,
      hero: {
        ...content.hero,
        sliderImages: next,
        bgImage: next[0]
      }
    });
  };

  const resetHeroToRecommended = () => {
    onChange({
      ...content,
      hero: {
        ...content.hero,
        sliderImages: [...RECOMMENDED_LAW_SLIDES],
        bgImage: RECOMMENDED_LAW_SLIDES[0],
        slideInterval: 10
      }
    });
  };

  // Mountain Range Content Helpers
  const mountainContent = content.mountainRange || {
    eyebrow: 'ROOTED IN NEPAL • UPHOLDING THE LAW',
    title: 'Standing Resolute Like the Himalayas',
    subtitle: 'Just as the majestic Himalayan peaks of Nepal stand timeless and unwavering above the clouds, Bodh Law Chambers stands steadfast in defending constitutional liberty, corporate integrity, and justice across the nation.',
    quote: 'यतो धर्मस्ततो जयः',
    quoteTranslation: 'Where there is adherence to Law and Righteousness, there Victory abides.',
    peaks: []
  };

  const updateMountain = (field: string, value: any) => {
    onChange({
      ...content,
      mountainRange: {
        ...mountainContent,
        [field]: value
      }
    });
  };

  const updatePeak = (idx: number, field: string, value: any) => {
    const nextPeaks = [...(mountainContent.peaks || [])];
    nextPeaks[idx] = {
      ...nextPeaks[idx],
      [field]: value
    };
    onChange({
      ...content,
      mountainRange: {
        ...mountainContent,
        peaks: nextPeaks
      }
    });
  };

  const addPeak = () => {
    const nextPeaks = [...(mountainContent.peaks || [])];
    nextPeaks.push({
      id: `peak-${Date.now()}`,
      name: 'New Himalayan Peak',
      nepaliName: 'हिमाल',
      altitude: '7,000 m',
      significance: 'Resolute defense and legal endurance in the courtrooms of Nepal.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    });
    onChange({
      ...content,
      mountainRange: {
        ...mountainContent,
        peaks: nextPeaks
      }
    });
  };

  const removePeak = (idx: number) => {
    const nextPeaks = (mountainContent.peaks || []).filter((_, i) => i !== idx);
    onChange({
      ...content,
      mountainRange: {
        ...mountainContent,
        peaks: nextPeaks
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#242018]">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'hero', label: '1. Hero & Slider' },
            { id: 'about', label: '2. About Chambers' },
            { id: 'pillars', label: '3. Core Pillars' },
            { id: 'mountains', label: '4. Nepal Mountain Range' },
            { id: 'stats', label: '5. Track Record Stats' },
            { id: 'contact', label: '6. Contact & Socials' }
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`text-xs px-4 py-2 font-medium transition-all ${
                activeSection === sec.id
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'bg-[#12100a] text-[#8c887d] hover:text-white border border-[#242018]'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving Changes...' : 'Save Site Content'}</span>
        </button>
      </div>

      {/* 1. HERO SECTION CONTROLS */}
      {activeSection === 'hero' && (
        <div className="space-y-6 bg-[#0c0b09] border border-[#24211a] p-6">
          <div className="border-b border-[#1f1b15] pb-4">
            <h3 className="font-serif text-xl text-[#f3ece0]">
              Hero Section & Top Banner
            </h3>
            <p className="text-xs text-[#8c887d] mt-1">
              Customize the principal landing headline, background imagery, and primary calls-to-action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Eyebrow / Small Header Tag
              </label>
              <input
                type="text"
                value={content.hero.eyebrow}
                onChange={(e) => updateHero('eyebrow', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Main Headline
              </label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
              Subtitle / Descriptive Narrative
            </label>
            <textarea
              rows={3}
              value={content.hero.subtitle}
              onChange={(e) => updateHero('subtitle', e.target.value)}
              className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Primary Button Text
              </label>
              <input
                type="text"
                value={content.hero.primaryCtaText}
                onChange={(e) => updateHero('primaryCtaText', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={content.hero.secondaryCtaText}
                onChange={(e) => updateHero('secondaryCtaText', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          {/* Hero Slider Images Management (10s auto-cycle) */}
          <div className="pt-4 border-t border-[#1f1b15] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-serif text-base text-[#f3ece0] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span>Hero Background Slideshow (Law Imagery)</span>
                </h4>
                <p className="text-xs text-[#8c887d]">
                  Add 3 to 4 (or more) law-related images that automatically slide every {content.hero.slideInterval || 10} seconds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetHeroToRecommended}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#17140e] border border-[#3b3323] hover:border-[#c5a059] text-[11px] text-[#c5a059] hover:text-[#f3ece0] transition-colors"
                  title="Restore 4 recommended law firm hero slides"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Load 4 Law Firm Presets</span>
                </button>

                <button
                  type="button"
                  onClick={addHeroSlide}
                  disabled={currentHeroSlides.length >= 8}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c5a059] hover:bg-[#d4b050] text-black font-semibold text-[11px] transition-colors disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slide</span>
                </button>
              </div>
            </div>

            {/* Slider Duration Config */}
            <div className="flex items-center gap-4 bg-[#080705] p-3 border border-[#26221a]">
              <div className="flex items-center gap-2 text-xs text-[#d1ccc2]">
                <Clock className="w-4 h-4 text-[#c5a059]" />
                <span className="font-semibold">Slide Rotation Interval:</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={3}
                  max={60}
                  value={content.hero.slideInterval || 10}
                  onChange={(e) => updateHero('slideInterval', Math.max(3, parseInt(e.target.value) || 10))}
                  className="w-16 bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-2 py-1 text-xs text-[#f3ece0] font-mono text-center outline-none"
                />
                <span className="text-xs text-[#8c887d]">seconds per slide (default: 10s)</span>
              </div>
            </div>

            {/* Individual Slides List */}
            <div className="space-y-4">
              {currentHeroSlides.map((slideUrl, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#090806] border border-[#231f18] space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#1b1812] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-[#17140e] border border-[#c5a059]/40 text-[#c5a059] font-mono text-xs flex items-center justify-center font-bold">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-medium text-[#f3ece0]">
                        Slide {idx + 1} {idx === 0 ? '(Primary / First Slide)' : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => moveHeroSlide(idx, -1)}
                        disabled={idx === 0}
                        title="Move slide earlier"
                        className="p-1 border border-[#29241b] bg-[#12100a] text-[#8c887d] hover:text-[#c5a059] disabled:opacity-30 disabled:hover:text-[#8c887d]"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveHeroSlide(idx, 1)}
                        disabled={idx === currentHeroSlides.length - 1}
                        title="Move slide later"
                        className="p-1 border border-[#29241b] bg-[#12100a] text-[#8c887d] hover:text-[#c5a059] disabled:opacity-30 disabled:hover:text-[#8c887d]"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeHeroSlide(idx)}
                        disabled={currentHeroSlides.length <= 1}
                        title="Delete slide"
                        className="p-1 border border-[#29241b] bg-[#12100a] text-[#8c887d] hover:text-red-400 disabled:opacity-30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <ImageUploadInput
                    label={`Slide #${idx + 1} Image URL`}
                    value={slideUrl}
                    onChange={(newUrl) => updateHeroSlide(idx, newUrl)}
                    categoryFilter="hero"
                    helperText="Law-related imagery: Supreme Court pillars, law library, advocate chambers desk, or appellate courtroom."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ABOUT SECTION CONTROLS */}
      {activeSection === 'about' && (
        <div className="space-y-6 bg-[#0c0b09] border border-[#24211a] p-6">
          <div className="border-b border-[#1f1b15] pb-4">
            <h3 className="font-serif text-xl text-[#f3ece0]">
              About Chambers & Institutional Background
            </h3>
            <p className="text-xs text-[#8c887d] mt-1">
              Control the firm narrative, court accreditations, and main law library/chambers photo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Eyebrow
              </label>
              <input
                type="text"
                value={content.about.eyebrow}
                onChange={(e) => updateAbout('eyebrow', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Years of Legal Excellence
              </label>
              <input
                type="number"
                value={content.about.yearsOfExcellence}
                onChange={(e) => updateAbout('yearsOfExcellence', parseInt(e.target.value) || 0)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Bar Association Affiliation
              </label>
              <input
                type="text"
                value={content.about.barAffiliation}
                onChange={(e) => updateAbout('barAffiliation', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
              Section Title
            </label>
            <input
              type="text"
              value={content.about.title}
              onChange={(e) => updateAbout('title', e.target.value)}
              className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
              Paragraph 1 (Core History & Purpose)
            </label>
            <textarea
              rows={4}
              value={content.about.paragraph1}
              onChange={(e) => updateAbout('paragraph1', e.target.value)}
              className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
              Paragraph 2 (Courtroom & Commercial Reach)
            </label>
            <textarea
              rows={4}
              value={content.about.paragraph2}
              onChange={(e) => updateAbout('paragraph2', e.target.value)}
              className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed"
            />
          </div>

          {/* About Image with Curated Picker */}
          <div className="pt-2">
            <ImageUploadInput
              label="Chambers / Law Library Photo"
              value={content.about.image}
              onChange={(url) => updateAbout('image', url)}
              categoryFilter="about"
              helperText="Law library, desk with case files, or chambers setting (1200x800 recommended)."
            />
          </div>
        </div>
      )}

      {/* 3. CORE PILLARS */}
      {activeSection === 'pillars' && (
        <div className="space-y-6 bg-[#0c0b09] border border-[#24211a] p-6">
          <div className="border-b border-[#1f1b15] pb-4">
            <h3 className="font-serif text-xl text-[#f3ece0]">
              The 4 Foundational Pillars
            </h3>
            <p className="text-xs text-[#8c887d] mt-1">
              Highlighted directly below the Hero section on the homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.pillars.map((pillar, idx) => (
              <div
                key={pillar.id || idx}
                className="p-5 bg-[#0e0c08] border border-[#26221a] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                    Pillar #{idx + 1}
                  </span>
                  <span className="text-[11px] text-[#7d796e]">Icon: {pillar.icon}</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#a39f93] uppercase">Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-1.5 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#a39f93] uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={pillar.description}
                    onChange={(e) => updatePillar(idx, 'description', e.target.value)}
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-1.5 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. NEPAL MOUNTAIN RANGE BANNER (450px Full-Width) */}
      {activeSection === 'mountains' && (
        <div className="space-y-6 bg-[#0c0b09] border border-[#24211a] p-6">
          <div className="border-b border-[#1f1b15] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl text-[#f3ece0] flex items-center gap-2">
                <Mountain className="w-5 h-5 text-[#c5a059]" />
                <span>Nepal Mountain Range Banner</span>
              </h3>
              <p className="text-xs text-[#8c887d] mt-1">
                Full-width 450px height panoramic photograph spanning across the entire screen.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateMountain('bannerImage', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=85')}
                className="px-3 py-1.5 bg-[#17140e] border border-[#3b3323] hover:border-[#c5a059] text-[11px] text-[#c5a059] hover:text-[#f3ece0] transition-colors"
              >
                Everest Panorama
              </button>
              <button
                type="button"
                onClick={() => updateMountain('bannerImage', 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=2400&q=85')}
                className="px-3 py-1.5 bg-[#17140e] border border-[#3b3323] hover:border-[#c5a059] text-[11px] text-[#c5a059] hover:text-[#f3ece0] transition-colors"
              >
                Machhapuchhre
              </button>
              <button
                type="button"
                onClick={() => updateMountain('bannerImage', 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85')}
                className="px-3 py-1.5 bg-[#17140e] border border-[#3b3323] hover:border-[#c5a059] text-[11px] text-[#c5a059] hover:text-[#f3ece0] transition-colors"
              >
                Annapurna Range
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <ImageUploadInput
              label="Mountain Panoramic Image (450px Height, Full Width Screen)"
              value={mountainContent.bannerImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=85'}
              onChange={(url) => updateMountain('bannerImage', url)}
              categoryFilter="mountains"
              helperText="High-resolution landscape photo of Nepal Himalayas (minimum 1920px wide recommended for full-bleed screens)."
            />

            {/* Live 450px Preview Box */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider block">
                Live Banner Preview (450px Screen Height)
              </label>
              <div className="w-full h-[450px] relative overflow-hidden border border-[#2e291f] bg-[#050505]">
                <img
                  src={mountainContent.bannerImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=85'}
                  alt="Mountain Preview"
                  className="w-full h-[450px] object-cover object-center"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30" />
                <div className="absolute bottom-3 right-4 px-2 py-1 bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] text-[#c5a059] font-mono">
                  Full Width • 450px Height
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TRACK RECORD STATS */}
      {activeSection === 'stats' && (
        <div className="space-y-6 bg-[#0c0b09] border border-[#24211a] p-6">
          <div className="border-b border-[#1f1b15] pb-4">
            <h3 className="font-serif text-xl text-[#f3ece0]">
              Track Record Statistics
            </h3>
            <p className="text-xs text-[#8c887d] mt-1">
              Numerical proof points displayed across the home and about sections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.stats.map((stat, sIdx) => (
              <div
                key={stat.id || sIdx}
                className="p-4 bg-[#0e0c08] border border-[#26221a] space-y-3"
              >
                <div className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                  Stat #{sIdx + 1}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#a39f93] uppercase">Value / Number</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(sIdx, 'value', e.target.value)}
                    placeholder="e.g. 1,200+"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-1.5 text-xs text-[#f3ece0] outline-none font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#a39f93] uppercase">Label / Description</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(sIdx, 'label', e.target.value)}
                    placeholder="e.g. Cases Resolved"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-1.5 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CONTACT & SOCIALS */}
      {activeSection === 'contact' && (
        <div className="space-y-6 bg-[#0c0b09] border border-[#24211a] p-6">
          <div className="border-b border-[#1f1b15] pb-4">
            <h3 className="font-serif text-xl text-[#f3ece0]">
              Contact Details, Channels & Chambers Location
            </h3>
            <p className="text-xs text-[#8c887d] mt-1">
              Directly powers the Contact Us page, Top bar, Floating widget, and Footer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Firm Legal Name
              </label>
              <input
                type="text"
                value={content.contactInfo.firmName}
                onChange={(e) => updateContact('firmName', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Firm Tagline
              </label>
              <input
                type="text"
                value={content.contactInfo.tagline}
                onChange={(e) => updateContact('tagline', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Chambers Address
              </label>
              <input
                type="text"
                value={content.contactInfo.address}
                onChange={(e) => updateContact('address', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                City / Region
              </label>
              <input
                type="text"
                value={content.contactInfo.city}
                onChange={(e) => updateContact('city', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Country
              </label>
              <input
                type="text"
                value={content.contactInfo.country}
                onChange={(e) => updateContact('country', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Chambers Telephone
              </label>
              <input
                type="text"
                value={content.contactInfo.phone}
                onChange={(e) => updateContact('phone', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Direct Mobile
              </label>
              <input
                type="text"
                value={content.contactInfo.mobile}
                onChange={(e) => updateContact('mobile', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Emergency 24/7 Hotline
              </label>
              <input
                type="text"
                value={content.contactInfo.emergencyHotline}
                onChange={(e) => updateContact('emergencyHotline', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                General Email
              </label>
              <input
                type="email"
                value={content.contactInfo.email}
                onChange={(e) => updateContact('email', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Consultation Case Intake Email
              </label>
              <input
                type="email"
                value={content.contactInfo.consultationEmail}
                onChange={(e) => updateContact('consultationEmail', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={content.contactInfo.whatsappNumber}
                onChange={(e) => updateContact('whatsappNumber', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                WhatsApp Direct Link (e.g. https://wa.me/...)
              </label>
              <input
                type="text"
                value={content.contactInfo.whatsappDirectUrl}
                onChange={(e) => updateContact('whatsappDirectUrl', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
                Instagram Profile Link
              </label>
              <input
                type="text"
                value={content.contactInfo.instagramUrl}
                onChange={(e) => updateContact('instagramUrl', e.target.value)}
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
              Chambers Office Working Hours
            </label>
            <input
              type="text"
              value={content.contactInfo.workingHours}
              onChange={(e) => updateContact('workingHours', e.target.value)}
              className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
