import { Check, Copy, ExternalLink, Loader2, RefreshCw, Upload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { listSupabaseStorageImages, SUPABASE_STORAGE_BUCKET, uploadImageToSupabaseStorage } from '../../services/supabase';
import { curatedImages } from '../data/curatedImages';

export const MediaLibraryTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Array<{ id: string; name: string; url: string; createdAt?: string }>>([]);
  const [loadingStorage, setLoadingStorage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchStorageImages = async () => {
    setLoadingStorage(true);
    try {
      const items = await listSupabaseStorageImages('uploads');
      setUploadedImages(items);
    } catch (err) {
      console.warn('Failed to load Supabase storage images:', err);
    } finally {
      setLoadingStorage(false);
    }
  };

  useEffect(() => {
    fetchStorageImages();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const result = await uploadImageToSupabaseStorage(file, 'uploads');
      await fetchStorageImages();
      // Auto copy uploaded URL
      navigator.clipboard.writeText(result.url);
      setCopiedId('just-uploaded');
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err: any) {
      console.error('Failed to upload image:', err);
      setUploadError(err.message || 'Failed to upload file to Supabase storage.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allItems = [
    ...uploadedImages.map((u) => ({
      id: u.id,
      title: u.name,
      category: 'Supabase Storage',
      url: u.url,
      description: `Uploaded on ${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Supabase CDN'}`
    })),
    ...curatedImages
  ];

  const filtered = selectedCategory === 'all'
    ? allItems
    : selectedCategory === 'supabase'
    ? allItems.filter((img) => img.category === 'Supabase Storage')
    : allItems.filter((img) => img.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header & Bucket Upload Area */}
      <div className="bg-[#0e0c08] border border-[#2b271e] p-6 rounded space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#242018]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1a1711] border border-[#c5a059]/40 text-[#c5a059] text-[10px] uppercase font-bold tracking-wider rounded mb-2">
              <Upload className="w-3 h-3 text-[#c5a059]" />
              <span>Supabase Storage Bucket: {SUPABASE_STORAGE_BUCKET}</span>
            </div>
            <h3 className="font-serif text-xl text-[#f3ece0]">
              Legal Media Library & Storage Bucket
            </h3>
            <p className="text-xs text-[#8c887d] mt-1">
              Upload custom photos directly to your Supabase CDN bucket or pick from curated law firm photography.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchStorageImages}
              disabled={loadingStorage}
              className="p-2.5 bg-[#14120e] border border-[#3b3426] text-[#c5a059] hover:text-white rounded transition-colors"
              title="Refresh Storage Bucket List"
            >
              <RefreshCw className={`w-4 h-4 ${loadingStorage ? 'animate-spin' : ''}`} />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c5a059] text-black font-semibold text-xs hover:bg-[#d4b050] transition-colors shadow shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>{isUploading ? 'Uploading to Bucket...' : 'Upload Image to Supabase'}</span>
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs rounded">
            <strong>Upload Failed:</strong> {uploadError}
          </div>
        )}

        {copiedId === 'just-uploaded' && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs rounded flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Success! Image uploaded to Supabase Storage and URL copied to clipboard!</span>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {[
            { id: 'all', label: `All Photos (${allItems.length})` },
            { id: 'supabase', label: `My Supabase Bucket (${uploadedImages.length})` },
            { id: 'hero', label: 'Heroes / Skyline' },
            { id: 'about', label: 'Chambers / Library' },
            { id: 'team', label: 'Advocates' },
            { id: 'blogs', label: 'Case & Articles' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 font-medium transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-[#c5a059] text-black border-[#c5a059] font-semibold'
                  : 'bg-[#12100a] text-[#8c887d] border-[#26221a] hover:text-white'
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
                <span
                  className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold border ${
                    item.category === 'Supabase Storage'
                      ? 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                      : 'bg-black/80 text-[#c5a059] border-[#3d331e]'
                  }`}
                >
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
                <h4 className="font-serif text-sm font-semibold text-[#f3ece0] truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#8c887d] leading-relaxed line-clamp-2">
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

