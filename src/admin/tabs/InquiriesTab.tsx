import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Trash2,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { deleteInquiry, updateInquiryStatus } from '../../services/storage';
import { ContactInquiry } from '../../types';

interface InquiriesTabProps {
  inquiries: ContactInquiry[];
  onRefresh: () => Promise<void>;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({
  inquiries,
  onRefresh
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(
    inquiries[0] || null
  );

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.practiceArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (
    id: string,
    status: 'new' | 'contacted' | 'resolved'
  ) => {
    await updateInquiryStatus(id, status);
    await onRefresh();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this case inquiry?')) {
      await deleteInquiry(id);
      await onRefresh();
      setSelectedInquiry(filteredInquiries.find((i) => i.id !== id) || null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#242018]">
        <div>
          <h3 className="font-serif text-xl text-[#f3ece0]">
            Client Intake & Consultation CRM
          </h3>
          <p className="text-xs text-[#8c887d] mt-1">
            Incoming consultation appointments, case briefs, and direct client correspondence.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7a766c]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search inquiries..."
              className="bg-[#12100a] border border-[#2b271e] pl-8 pr-3 py-1.5 text-xs text-[#f3ece0] outline-none w-48 focus:border-[#c5a059]"
            />
          </div>

          <div className="flex bg-[#12100a] border border-[#242018] p-0.5">
            {(['all', 'new', 'contacted', 'resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-[11px] px-2.5 py-1 uppercase tracking-wider transition-colors ${
                  filterStatus === st
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'text-[#8c887d] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List of Inquiries */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-semibold text-[#8c887d] uppercase tracking-wider mb-2">
            Inquiries ({filteredInquiries.length})
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                const statusColor =
                  inq.status === 'new'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : inq.status === 'contacted'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-3.5 border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#18150f] border-[#c5a059]'
                        : 'bg-[#0c0b09] border-[#242018] hover:border-[#383327]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-[#f3ece0]">
                        {inq.name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 border uppercase tracking-wider ${statusColor}`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#c5a059] mt-1 font-medium truncate">
                      {inq.practiceArea}
                    </div>

                    <p className="text-[11px] text-[#7d796e] line-clamp-1 mt-1">
                      {inq.message}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-[#615e55] mt-2 pt-2 border-t border-[#1c1913]">
                      <span>{inq.phone}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-[#6e6a60] border border-dashed border-[#242018]">
                No inquiries matching filter.
              </div>
            )}
          </div>
        </div>

        {/* Selected Inquiry Detail */}
        <div className="lg:col-span-7 bg-[#0c0b09] border border-[#24211a] p-6 space-y-6">
          {selectedInquiry ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#211e17]">
                <div>
                  <h4 className="font-serif text-2xl text-[#f3ece0]">
                    {selectedInquiry.name}
                  </h4>
                  <p className="text-xs text-[#c5a059] font-medium mt-0.5">
                    Requested Practice: {selectedInquiry.practiceArea}
                  </p>
                  <p className="text-[11px] text-[#7d796e] mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Submitted on: {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                    className="bg-[#16140e] border border-[#3b3426] text-xs text-[#c5a059] px-3 py-1.5 outline-none font-medium"
                  >
                    <option value="new">Status: New Intake</option>
                    <option value="contacted">Status: Contacted</option>
                    <option value="resolved">Status: Resolved</option>
                  </select>

                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="p-1.5 text-[#e57373] hover:bg-[#201010] border border-transparent hover:border-[#521c1c]"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex items-center justify-center gap-2 p-2.5 bg-[#12100a] border border-[#26221a] hover:border-[#c5a059] text-xs text-[#f3ece0] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Call {selectedInquiry.phone}</span>
                </a>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Bodh Law Firm Consultation: ${encodeURIComponent(selectedInquiry.practiceArea)}`}
                  className="flex items-center justify-center gap-2 p-2.5 bg-[#12100a] border border-[#26221a] hover:border-[#c5a059] text-xs text-[#f3ece0] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Send Email</span>
                </a>
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 bg-[#12100a] border border-[#26221a] hover:border-[#25D366] text-xs text-[#f3ece0] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Client Statement / Message */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#a39f93] uppercase tracking-wider">
                  Case Overview / Client Remarks
                </div>
                <div className="bg-[#0f0e0b] p-4 border border-[#211e17] text-xs text-[#f3ece0] leading-relaxed whitespace-pre-line">
                  {selectedInquiry.message || 'No additional notes provided.'}
                </div>
              </div>

              {/* Contact Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#0a0907] p-4 border border-[#1c1913]">
                <div>
                  <span className="text-[#7d796e] block">Email Address:</span>
                  <span className="text-[#f3ece0] font-mono">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="text-[#7d796e] block">Phone / Mobile:</span>
                  <span className="text-[#f3ece0] font-mono">{selectedInquiry.phone}</span>
                </div>
                <div>
                  <span className="text-[#7d796e] block">Preferred Contact Channel:</span>
                  <span className="text-[#c5a059] uppercase">{selectedInquiry.preferredChannel}</span>
                </div>
                <div>
                  <span className="text-[#7d796e] block">Subject:</span>
                  <span className="text-[#f3ece0]">{selectedInquiry.subject || 'Legal Consultation'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#7a766c]">
              Select an inquiry from the left to review details and take action.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
