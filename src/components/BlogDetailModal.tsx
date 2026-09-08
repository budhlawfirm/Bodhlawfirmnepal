import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Tag,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  blog,
  onClose,
  onBookConsultation
}) => {
  const [copied, setCopied] = useState(false);

  if (!blog) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#0e0d0b] border border-[#383329] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-[#997a38] via-[#c5a059] to-[#997a38]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[#24211a] flex items-center justify-between bg-[#12100d]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-[#a39f93] hover:text-[#c5a059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-xs text-[#a39f93] hover:text-[#c5a059] border border-[#2e2a22] px-2.5 py-1 rounded"
              title="Copy share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8c887d] hover:text-white hover:bg-[#201c15] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cover image & Title */}
        <div className="relative aspect-[21/9] overflow-hidden bg-[#16140e]">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0b] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#c5a059] bg-[#0c0b09]/90 px-2.5 py-1 rounded border border-[#c5a059]/30">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Blog Article Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-4 text-xs text-[#7d796f] mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
              {blog.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-[#f3ece0] font-normal mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author info pill */}
          <div className="flex items-center gap-3 p-3 rounded bg-[#14120e] border border-[#26231b] mb-8">
            <img
              src={blog.authorPhoto}
              alt={blog.authorName}
              className="w-10 h-10 rounded-full object-cover border border-[#c5a059]/40"
            />
            <div>
              <h4 className="text-xs font-semibold text-[#f3ece0]">{blog.authorName}</h4>
              <p className="text-[11px] text-[#a39f93]">{blog.authorRole}</p>
            </div>
          </div>

          {/* Render Markdown-like paragraphs */}
          <div className="space-y-4 text-sm text-[#b8b3a7] leading-relaxed">
            {blog.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="font-serif text-lg text-[#f3ece0] pt-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return (
                  <p key={pIdx} className="pl-4 border-l-2 border-[#c5a059]/50 py-0.5 text-xs sm:text-sm">
                    {paragraph}
                  </p>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <p key={pIdx} className="pl-4 border-l border-[#4a4539] py-0.5 text-xs sm:text-sm">
                    {paragraph.replace('- ', '• ')}
                  </p>
                );
              }
              return <p key={pIdx}>{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#24211a] flex flex-wrap gap-2 items-center">
              <span className="text-xs text-[#7d796f] flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#c5a059]" />
                Tags:
              </span>
              {blog.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded bg-[#17140f] border border-[#2e2a22] text-[#a39f93]"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-[#24211a] bg-[#12100d] flex items-center justify-between">
          <span className="text-xs text-[#a39f93] hidden sm:inline">
            Need legal advice regarding this topic?
          </span>
          <button
            onClick={() => {
              onClose();
              onBookConsultation();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
          >
            Consult with Author
          </button>
        </div>
      </div>
    </div>
  );
};
