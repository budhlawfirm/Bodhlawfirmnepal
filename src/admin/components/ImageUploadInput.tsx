import { Check, ExternalLink, Image as ImageIcon, Loader2, Sparkles, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { uploadImageToSupabaseStorage } from '../../services/supabase';
import { curatedImages } from '../data/curatedImages';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  categoryFilter?: 'hero' | 'about' | 'law' | 'team' | 'blogs';
  helperText?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  categoryFilter,
  helperText
}) => {
  const [showGallery, setShowGallery] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availablePresets = categoryFilter
    ? curatedImages.filter((img) => img.category === categoryFilter)
    : curatedImages;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');
    setImgError(false);

    try {
      const folder = categoryFilter || 'uploads';
      const result = await uploadImageToSupabaseStorage(file, folder);
      onChange(result.url);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setUploadError(err.message || 'Failed to upload image to Supabase Storage.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#f3ece0] uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowGallery(!showGallery)}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#c5a059] hover:text-[#f3ece0] transition-colors"
        >
          <Sparkles className="w-3 h-3 text-[#c5a059]" />
          <span>{showGallery ? 'Hide Gallery' : 'Select from Curated Legal Images'}</span>
        </button>
      </div>

      <div className="flex gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="w-16 h-16 rounded border border-[#2e2a21] bg-[#12100a] overflow-hidden shrink-0 relative group flex items-center justify-center">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center text-[#c5a059] p-1 text-center">
              <Loader2 className="w-5 h-5 animate-spin mb-1" />
              <span className="text-[9px]">Uploading...</span>
            </div>
          ) : value && !imgError ? (
            <>
              <img
                src={value}
                alt="Preview"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                onLoad={() => setImgError(false)}
                className="w-full h-full object-cover"
              />
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                title="Open full size"
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#7d796e] text-[10px] p-1 text-center">
              <ImageIcon className="w-5 h-5 mb-0.5 opacity-60" />
              <span>No image</span>
            </div>
          )}
        </div>

        {/* URL Input & Upload Button */}
        <div className="flex-1 space-y-1.5">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setImgError(false);
                  setUploadError('');
                  onChange(e.target.value);
                }}
                placeholder="Paste image URL or click Upload File"
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] placeholder:text-[#6b675d] outline-none transition-colors"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7d796e] hover:text-[#f3ece0]"
                  title="Clear"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Upload Button */}
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1c1810] border border-[#3b3323] hover:border-[#c5a059] hover:text-[#c5a059] text-[#d4cebd] text-xs font-medium transition-colors shrink-0 disabled:opacity-50"
              title="Upload photo directly to Supabase Storage Bucket"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#c5a059]" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#c5a059]" />
              )}
              <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
            </button>
          </div>

          {uploadError && (
            <p className="text-[11px] text-red-400 font-medium leading-tight">
              {uploadError}
            </p>
          )}
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-[#8c887d] leading-relaxed">
          {helperText}
        </p>
      )}

      {/* Preset Gallery Drawer */}
      {showGallery && (
        <div className="p-3 bg-[#0d0c0a] border border-[#2b271e] rounded mt-2 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#211e17]">
            <span className="text-[11px] font-medium text-[#c5a059] uppercase tracking-wider">
              Curated Professional Legal Photography ({availablePresets.length})
            </span>
            <span className="text-[10px] text-[#7a766c]">
              Click any photo to apply immediately
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
            {availablePresets.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setImgError(false);
                    onChange(preset.url);
                    setShowGallery(false);
                  }}
                  className={`group relative text-left border rounded overflow-hidden transition-all ${
                    isSelected
                      ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                      : 'border-[#242018] hover:border-[#c5a059]/60'
                  }`}
                >
                  <div className="aspect-[16/10] bg-[#16140e] overflow-hidden">
                    <img
                      src={preset.url}
                      alt={preset.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-1.5 bg-[#0a0907]">
                    <div className="text-[10px] font-medium text-[#f3ece0] truncate">
                      {preset.title}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-[#c5a059] text-black p-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
