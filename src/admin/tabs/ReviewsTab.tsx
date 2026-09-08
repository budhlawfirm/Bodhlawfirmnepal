import {
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Plus,
  Save,
  Star,
  Trash2,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { deleteTestimonial, saveTestimonial } from '../../services/storage';
import { Testimonial } from '../../types';
import { ImageUploadInput } from '../components/ImageUploadInput';

interface ReviewsTabProps {
  testimonials: Testimonial[];
  onRefresh: () => Promise<void>;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  testimonials,
  onRefresh
}) => {
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(
    testimonials[0] || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form states
  const [clientName, setClientName] = useState('');
  const [clientTitle, setClientTitle] = useState('');
  const [clientPhoto, setClientPhoto] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [practiceArea, setPracticeArea] = useState('Corporate Law');

  const handleSelectReview = (t: Testimonial) => {
    setSelectedReview(t);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleStartEdit = (t: Testimonial) => {
    setClientName(t.clientName);
    setClientTitle(t.clientTitle);
    setClientPhoto(t.clientPhoto || '');
    setQuote(t.quote);
    setRating(t.rating || 5);
    setPracticeArea(t.practiceArea || 'General Legal Consultation');
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setClientName('');
    setClientTitle('Chief Executive Officer, Corporate Client');
    setClientPhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80');
    setQuote('');
    setRating(5);
    setPracticeArea('Corporate Law & FDI');
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleSaveReview = async () => {
    if (!clientName.trim() || !quote.trim()) {
      alert('Please provide client name and review testimonial.');
      return;
    }

    const reviewToSave: Testimonial = {
      id: isCreating ? `rev-${Date.now()}` : selectedReview!.id,
      clientName,
      clientTitle,
      clientPhoto: clientPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      quote,
      rating,
      practiceArea
    };

    await saveTestimonial(reviewToSave);
    await onRefresh();
    setSelectedReview(reviewToSave);
    setIsEditing(false);
    setIsCreating(false);
    setStatusMessage('Client review saved successfully.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleDeleteReview = async (id: string) => {
    if (confirm('Delete this client testimonial?')) {
      await deleteTestimonial(id);
      await onRefresh();
      setSelectedReview(testimonials.find((t) => t.id !== id) || null);
      setStatusMessage('Review deleted.');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="p-3 bg-[#17140e] border border-[#c5a059] text-xs text-[#c5a059] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Header & Add Button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#242018]">
        <div>
          <h3 className="font-serif text-xl text-[#f3ece0]">
            Client Testimonials & Industry Endorsements
          </h3>
          <p className="text-xs text-[#8c887d] mt-1">
            Display social proof, corporate client remarks, and 5-star ratings on the homepage and about page.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-[#8c887d] uppercase tracking-wider mb-2">
            Approved Reviews ({testimonials.length})
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {testimonials.map((t) => {
              const isSelected = selectedReview?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectReview(t)}
                  className={`p-3 border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#18150f] border-[#c5a059] text-white'
                      : 'bg-[#0c0b09] border-[#242018] text-[#c9c5ba] hover:border-[#383327]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold truncate text-[#f3ece0]">
                      {t.clientName}
                    </span>
                    <div className="flex text-[#c5a059]">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-[#c5a059] truncate mt-0.5">
                    {t.clientTitle}
                  </div>
                  <p className="text-[11px] text-[#7d796e] line-clamp-2 mt-1 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Review / Form */}
        <div className="lg:col-span-8 bg-[#0c0b09] border border-[#24211a] p-6 space-y-6">
          {isEditing || isCreating ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#211e17]">
                <h4 className="font-serif text-base text-[#f3ece0]">
                  {isCreating ? 'Add New Client Testimonial' : `Edit: ${selectedReview?.clientName}`}
                </h4>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setIsCreating(false);
                  }}
                  className="text-xs text-[#8c887d] hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rameshwor Adhikari"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Title & Company
                  </label>
                  <input
                    type="text"
                    value={clientTitle}
                    onChange={(e) => setClientTitle(e.target.value)}
                    placeholder="e.g. Managing Director, Everest Infrastructure Ltd"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Practice Area / Case Type
                  </label>
                  <input
                    type="text"
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    placeholder="e.g. Commercial Arbitration & FDI"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Good)</option>
                  </select>
                </div>
              </div>

              {/* Client Photo Input */}
              <ImageUploadInput
                label="Client Avatar / Photo URL"
                value={clientPhoto}
                onChange={(url) => setClientPhoto(url)}
                categoryFilter="team"
                helperText="Client headshot or professional avatar photo."
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                  Testimonial Quote
                </label>
                <textarea
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Client feedback regarding legal diligence, courtroom success, or contractual guidance..."
                  className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed italic"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleSaveReview}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Review</span>
                </button>
              </div>
            </div>
          ) : selectedReview ? (
            /* Selected Review Card */
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-[#211e17]">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedReview.clientPhoto}
                    alt={selectedReview.clientName}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover border border-[#2b271e]"
                  />
                  <div>
                    <h4 className="font-serif text-xl text-[#f3ece0]">
                      {selectedReview.clientName}
                    </h4>
                    <p className="text-xs text-[#c5a059]">
                      {selectedReview.clientTitle}
                    </p>
                    <p className="text-[11px] text-[#8c887d] mt-0.5">
                      Case: {selectedReview.practiceArea || 'General Legal Practice'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(selectedReview)}
                    className="px-3 py-1.5 text-xs font-medium bg-[#1a1711] text-[#c5a059] border border-[#3b3426] hover:bg-[#252016]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(selectedReview.id)}
                    className="p-1.5 text-[#e57373] hover:bg-[#201010] border border-transparent hover:border-[#521c1c]"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#c5a059]">
                {Array.from({ length: selectedReview.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs text-[#8c887d] ml-2">
                  ({selectedReview.rating || 5} out of 5 stars)
                </span>
              </div>

              <div className="bg-[#0f0e0b] p-5 border border-[#211e17] text-sm text-[#f3ece0] italic leading-relaxed">
                &ldquo;{selectedReview.quote}&rdquo;
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#7a766c]">
              Select a testimonial to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
