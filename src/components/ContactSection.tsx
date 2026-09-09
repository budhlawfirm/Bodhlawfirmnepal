import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Send,
  ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';
import { addInquiry } from '../services/storage';
import { ContactInfo, PracticeArea } from '../types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  practiceAreas: PracticeArea[];
  prefilledPracticeArea?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  practiceAreas,
  prefilledPracticeArea = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    practiceArea: prefilledPracticeArea || (practiceAreas[0]?.title || 'General Legal Consultation'),
    message: '',
    preferredChannel: 'whatsapp' as 'phone' | 'email' | 'whatsapp'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email address, and consultation details.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      await addInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || `${formData.practiceArea} Consultation Request`,
        practiceArea: formData.practiceArea,
        message: formData.message,
        preferredChannel: formData.preferredChannel
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        practiceArea: practiceAreas[0]?.title || 'General Legal Consultation',
        message: '',
        preferredChannel: 'whatsapp'
      });
    } catch (err: any) {
      setErrorMessage('Failed to submit consultation request. Please try direct WhatsApp or phone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#090807] border-b border-[#24211a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase mb-3"
            id="contact-eyebrow"
          >
            CONTACT & LEGAL CONSULTATION
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3ece0] font-normal tracking-tight"
            id="contact-headline"
          >
            Reach Our Legal Counsel
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-4 mb-4" />
          <p className="text-sm text-[#9c988c]">
            Schedule a confidential consultation with our advocates in Kathmandu or connect across our multi-channel communication hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Channels & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="p-6 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#16140e] border border-[#c5a059]/30 text-[#c5a059]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-1">
                    Kathmandu Head Office
                  </h3>
                  <p className="text-sm text-[#f3ece0] font-medium">
                    {contactInfo.address}
                  </p>
                  <p className="text-xs text-[#8a8578] mt-0.5">
                    {contactInfo.city}, {contactInfo.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#16140e] border border-[#c5a059]/30 text-[#c5a059]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-1">
                    Direct Phone Lines
                  </h3>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="block text-sm text-[#f3ece0] hover:text-[#c5a059] font-medium"
                  >
                    Office: {contactInfo.phone}
                  </a>
                  <a
                    href={`tel:${contactInfo.mobile}`}
                    className="block text-xs text-[#a39f93] hover:text-[#c5a059]"
                  >
                    Mobile / Counsel: {contactInfo.mobile}
                  </a>
                  {contactInfo.emergencyHotline && (
                    <div className="text-[11px] text-[#c5a059] pt-1 flex items-center gap-1 font-medium">
                      <span>Emergency Hotline: {contactInfo.emergencyHotline}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#16140e] border border-[#c5a059]/30 text-[#c5a059]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold mb-1">
                    Email Correspondence
                  </h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="block text-sm text-[#f3ece0] hover:text-[#c5a059]"
                  >
                    {contactInfo.email}
                  </a>
                  <a
                    href={`mailto:${contactInfo.consultationEmail}`}
                    className="block text-xs text-[#a39f93] hover:text-[#c5a059]"
                  >
                    {contactInfo.consultationEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Multi-channel Action Hub */}
            <div className="p-6 bg-[#12100d] border border-[#c5a059]/30">
              <span className="text-xs uppercase tracking-wider text-[#c5a059] font-semibold block mb-3">
                Instant Multi-Channel Connect
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={contactInfo.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-[#1d3322] border border-[#25d366]/40 hover:bg-[#25d366]/20 text-[#25d366] text-xs font-semibold rounded transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-[#2d1527] border border-[#e1306c]/40 hover:bg-[#e1306c]/20 text-[#e1306c] text-xs font-semibold rounded transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram DM</span>
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-4 bg-[#0a0a0a] border border-[#1f1c15] text-xs text-[#8a8578] flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#c5a059]" />
              <span>{contactInfo.workingHours}</span>
            </div>
          </div>

          {/* Right Column: Confidential Legal Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c0b09] border border-[#2e2a22] p-8 sm:p-10 relative">
              <div className="h-1 bg-gradient-to-r from-[#997a38] via-[#c5a059] to-[#997a38] absolute top-0 left-0 right-0" />

              <div className="flex items-center gap-2 text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Privileged & Confidential</span>
              </div>
              <h3 className="font-serif text-2xl text-[#f3ece0] font-normal mb-6">
                Request a Consultation
              </h3>

              {submitted ? (
                <div className="p-8 bg-[#141d13] border border-[#2d572c] text-center my-6 rounded">
                  <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto mb-3" />
                  <h4 className="font-serif text-xl text-[#f3ece0] mb-2">
                    Consultation Request Received
                  </h4>
                  <p className="text-xs sm:text-sm text-[#b2cfb1] leading-relaxed mb-6">
                    Thank you. Our legal team will review your inquiry and contact you via your preferred channel within 2 hours during court working hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050]"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-[#2d1212] border border-[#7f1d1d] text-xs text-[#fca5a5] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#9c988c] uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rameshwor Acharya"
                        className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#9c988c] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. client@example.com"
                        className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#9c988c] uppercase tracking-wider mb-1.5">
                        Phone / Mobile (with country code)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+977 98..."
                        className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#9c988c] uppercase tracking-wider mb-1.5">
                        Relevant Practice Area
                      </label>
                      <select
                        value={formData.practiceArea}
                        onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                        className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none transition-colors"
                      >
                        {practiceAreas.map((pa) => (
                          <option key={pa.id} value={pa.title} className="bg-[#12100d] text-white">
                            {pa.title}
                          </option>
                        ))}
                        <option value="General Advisory" className="bg-[#12100d] text-white">
                          General Legal Advisory
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#9c988c] uppercase tracking-wider mb-1.5">
                      Case Summary or Legal Question *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your legal dispute, agreement requirements, or consultation topic..."
                      className="w-full bg-[#12100d] border border-[#29251e] focus:border-[#c5a059] text-sm text-[#f3ece0] px-3.5 py-2.5 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Preferred contact channel */}
                  <div>
                    <label className="block text-xs text-[#9c988c] uppercase tracking-wider mb-2">
                      Preferred Follow-up Method
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-xs text-[#b8b3a7] cursor-pointer">
                        <input
                          type="radio"
                          name="channel"
                          checked={formData.preferredChannel === 'whatsapp'}
                          onChange={() => setFormData({ ...formData, preferredChannel: 'whatsapp' })}
                          className="accent-[#c5a059]"
                        />
                        <span>WhatsApp</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-[#b8b3a7] cursor-pointer">
                        <input
                          type="radio"
                          name="channel"
                          checked={formData.preferredChannel === 'phone'}
                          onChange={() => setFormData({ ...formData, preferredChannel: 'phone' })}
                          className="accent-[#c5a059]"
                        />
                        <span>Phone Call</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-[#b8b3a7] cursor-pointer">
                        <input
                          type="radio"
                          name="channel"
                          checked={formData.preferredChannel === 'email'}
                          onChange={() => setFormData({ ...formData, preferredChannel: 'email' })}
                          className="accent-[#c5a059]"
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      id="btn-submit-consultation"
                    >
                      {submitting ? (
                        <span>Submitting to Legal Counsel...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Confidential Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── LOCATION / MAP SECTION ── */}
        <div className="mt-16">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-full bg-[#16140e] border border-[#c5a059]/30 text-[#c5a059]">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#c5a059] font-medium">
                Find Us
              </p>
              <p className="text-xs text-[#8a8578] mt-0.5">
                Bhawan Marg, Kathmandu, Nepal
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/hvkU3EzxsovriDNK7"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#c5a059]/10 px-4 py-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Get Directions
            </a>
          </div>

          {/* Map Wrapper */}
          <div className="relative border border-[#2e2a22] overflow-hidden" style={{ height: '420px' }}>
            {/* Gold accent bar on top */}
            <div className="h-1 bg-gradient-to-r from-[#997a38] via-[#c5a059] to-[#997a38] absolute top-0 left-0 right-0 z-10" />

            <iframe
              src={contactInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(40%) contrast(1.05) brightness(0.9)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bodh Law Firm Nepal – Office Location"
            />

            {/* Bottom overlay bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0c0b09]/95 to-transparent px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2 text-xs text-[#f3ece0]">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="font-medium">{contactInfo.address}, {contactInfo.city}, {contactInfo.country}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8a8578]">
                <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>{contactInfo.workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
