import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { addInquiry } from '../services/storage';
import { ContactInfo, PracticeArea } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceAreas: PracticeArea[];
  contactInfo: ContactInfo;
  initialPracticeArea?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  practiceAreas,
  contactInfo,
  initialPracticeArea = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceArea: initialPracticeArea || practiceAreas[0]?.title || 'General Legal Consultation',
    message: '',
    preferredDate: '',
    preferredChannel: 'whatsapp' as 'phone' | 'email' | 'whatsapp'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Sync practiceArea when the modal is opened with a different prefill area
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        practiceArea: initialPracticeArea || practiceAreas[0]?.title || 'General Legal Consultation'
      }));
      // Reset submission state when modal opens fresh
      setSubmitted(false);
      setError('');
    }
  }, [isOpen, initialPracticeArea]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email, and brief details of your inquiry.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await addInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Consultation: ${formData.practiceArea}${formData.preferredDate ? ` (Preferred: ${formData.preferredDate})` : ''}`,
        practiceArea: formData.practiceArea,
        message: formData.message,
        preferredChannel: formData.preferredChannel
      });

      setSubmitted(true);
    } catch {
      setError('Failed to book consultation. Please reach out to us via direct WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0e0d0b] border border-[#383329] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-[#997a38] via-[#c5a059] to-[#997a38]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[#24211a] flex items-center justify-between bg-[#12100d]">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center shrink-0" style={{ isolation: 'isolate' }}>
              <img
                src="/assets/bodh-logo.jpg"
                alt="Bodh Law Firm Logo"
                className="w-full h-full object-contain"
                style={{ mixBlendMode: 'screen', filter: 'brightness(1.4) contrast(1.3) saturate(1.2)' }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Direct Legal Consultation</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#f3ece0] font-normal mt-0.5">
                Schedule with Bodh Law Firm
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8c887d] hover:text-white hover:bg-[#201c15] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto" />
              <h3 className="font-serif text-2xl text-[#f3ece0]">
                Consultation Request Submitted
              </h3>
              <p className="text-xs sm:text-sm text-[#b2cfb1] max-w-md mx-auto leading-relaxed">
                Our advocates in Putalisadak, Kathmandu have received your appointment request and will contact you via {formData.preferredChannel.toUpperCase()} promptly.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <a
                  href={contactInfo.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 text-xs font-semibold bg-[#25d366] text-black rounded"
                >
                  Continue on WhatsApp
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2 text-xs border border-[#383329] text-[#a39f93] hover:text-white rounded"
                >
                  Close Window
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-xs sm:text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-xs sm:text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+977 98..."
                    className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-xs sm:text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                    Practice Area
                  </label>
                  <select
                    value={formData.practiceArea}
                    onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                    className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-xs sm:text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none"
                  >
                    {practiceAreas.map((pa) => (
                      <option key={pa.id} value={pa.title} className="bg-[#12100d] text-white">
                        {pa.title}
                      </option>
                    ))}
                    <option value="General Legal Advisory" className="bg-[#12100d] text-white">
                      General Legal Advisory
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9c988c] mb-1">
                  Nature of Legal Matter *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Summarize your legal inquiry or document requirements..."
                  className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-xs sm:text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none resize-none"
                />
              </div>

              {/* Preferred Communication Channel */}
              <div className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-[#9c988c] mb-2">
                  Contact Me Via
                </span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs text-[#b8b3a7] cursor-pointer">
                    <input
                      type="radio"
                      name="modalChannel"
                      checked={formData.preferredChannel === 'whatsapp'}
                      onChange={() => setFormData({ ...formData, preferredChannel: 'whatsapp' })}
                      className="accent-[#c5a059]"
                    />
                    <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
                    <span>WhatsApp</span>
                  </label>

                  <label className="flex items-center gap-1.5 text-xs text-[#b8b3a7] cursor-pointer">
                    <input
                      type="radio"
                      name="modalChannel"
                      checked={formData.preferredChannel === 'phone'}
                      onChange={() => setFormData({ ...formData, preferredChannel: 'phone' })}
                      className="accent-[#c5a059]"
                    />
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Phone Call</span>
                  </label>

                  <label className="flex items-center gap-1.5 text-xs text-[#b8b3a7] cursor-pointer">
                    <input
                      type="radio"
                      name="modalChannel"
                      checked={formData.preferredChannel === 'email'}
                      onChange={() => setFormData({ ...formData, preferredChannel: 'email' })}
                      className="accent-[#c5a059]"
                    />
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Email</span>
                  </label>
                </div>
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
                  {submitting ? 'Submitting...' : 'Confirm Consultation Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
