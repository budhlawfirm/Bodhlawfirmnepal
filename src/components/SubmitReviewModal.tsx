import {
  AlertCircle,
  Award,
  CheckCircle2,
  Loader2,
  Star,
  Upload,
  X
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { saveTestimonial } from '../services/storage';
import { uploadImageToSupabaseStorage } from '../services/supabase';
import { PracticeArea } from '../types';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceAreas: PracticeArea[];
  onReviewSubmitted: () => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  practiceAreas,
  onReviewSubmitted
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [practiceArea, setPracticeArea] = useState(
    practiceAreas[0]?.title || 'Corporate & Commercial Law'
  );
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [clientPhoto, setClientPhoto] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setError('');

    try {
      const result = await uploadImageToSupabaseStorage(file, 'testimonials');
      setClientPhoto(result.url);
    } catch (err: any) {
      console.error('Photo upload failed:', err);
      setError('Could not upload photo to Supabase Storage.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      setError('Please provide your name and your testimonial review.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await saveTestimonial({
        id: 'review-' + Date.now(),
        clientName: name.trim(),
        clientTitle: title.trim() || 'Client',
        clientPhoto:
          clientPhoto ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        quote: quote.trim(),
        rating,
        practiceArea
      });

      setSubmitted(true);
      onReviewSubmitted();
    } catch {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0e0d0b] border border-[#383329] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-[#997a38] via-[#c5a059] to-[#997a38]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[#24211a] flex items-center justify-between bg-[#12100d]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#c5a059]" />
            <h2 className="font-serif text-xl text-[#f3ece0]">
              Submit Client Review
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c887d] hover:text-white hover:bg-[#201c15] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto" />
              <h3 className="font-serif text-xl text-[#f3ece0]">
                Thank You for Your Feedback
              </h3>
              <p className="text-xs text-[#a39f93] max-w-sm mx-auto leading-relaxed">
                Your review has been submitted and added to Bodh Law Firm Nepal's client testimonial registry.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black rounded hover:bg-[#d4b050]"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-[#2d1212] border border-[#7f1d1d] text-xs text-[#fca5a5] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-2">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-[#c5a059] text-[#c5a059]'
                            : 'text-[#423d32]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#c5a059] font-semibold ml-2">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh P."
                    className="w-full bg-[#14120e] border border-[#26221a] focus:border-[#c5a059] px-3 py-2 text-xs sm:text-sm text-[#f3ece0] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                    Designation / Organization
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Managing Director"
                    className="w-full bg-[#14120e] border border-[#26221a] focus:border-[#c5a059] px-3 py-2 text-xs sm:text-sm text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                  Legal Matter / Practice Area
                </label>
                <select
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="w-full bg-[#14120e] border border-[#26221a] focus:border-[#c5a059] px-3 py-2 text-xs sm:text-sm text-[#f3ece0] outline-none"
                >
                  {practiceAreas.map((pa) => (
                    <option key={pa.id} value={pa.title} className="bg-[#14120e]">
                      {pa.title}
                    </option>
                  ))}
                  <option value="General Legal Advisory" className="bg-[#14120e]">
                    General Legal Advisory
                  </option>
                </select>
              </div>

              {/* Photo Upload (Optional) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                  Your Photo / Logo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingPhoto}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-[#1b1812] border border-[#383225] hover:border-[#c5a059] text-xs text-[#c5a059] flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {uploadingPhoto ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingPhoto ? 'Uploading...' : 'Upload Photo'}</span>
                  </button>
                  {clientPhoto && (
                    <div className="flex items-center gap-2">
                      <img
                        src={clientPhoto}
                        alt="Client preview"
                        className="w-7 h-7 rounded-full object-cover border border-[#c5a059]"
                      />
                      <span className="text-[11px] text-emerald-400 font-medium">Uploaded!</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                  Your Testimonial Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Share your experience working with Bodh Law Firm Nepal's legal counsel..."
                  className="w-full bg-[#14120e] border border-[#26221a] focus:border-[#c5a059] px-3 py-2 text-xs sm:text-sm text-[#f3ece0] outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#24211a]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#8a8578] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
