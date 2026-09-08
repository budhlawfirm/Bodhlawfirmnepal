import {
  AlertCircle,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Plus,
  Save,
  Trash2,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { deleteTeamMember, saveTeamMember } from '../../services/storage';
import { TeamMember } from '../../types';
import { ImageUploadInput } from '../components/ImageUploadInput';

interface TeamTabProps {
  teamMembers: TeamMember[];
  onRefresh: () => Promise<void>;
}

export const TeamTab: React.FC<TeamTabProps> = ({ teamMembers, onRefresh }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(
    teamMembers[0] || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState('');
  const [bio, setBio] = useState('');
  const [education, setEducation] = useState('');
  const [barRegistration, setBarRegistration] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specializations, setSpecializations] = useState('');

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleStartEdit = (member: TeamMember) => {
    setName(member.name);
    setRole(member.role);
    setPhoto(member.photo);
    setBio(member.bio);
    setEducation(member.education);
    setBarRegistration(member.barRegistration);
    setEmail(member.email);
    setPhone(member.phone);
    setSpecializations(member.specializations?.join(', ') || '');
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setName('');
    setRole('Senior Associate');
    setPhoto('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80');
    setBio('');
    setEducation('B.A. LL.B., Kathmandu School of Law');
    setBarRegistration('Nepal Bar Council Reg. No: ');
    setEmail('');
    setPhone('+977-1-4267890');
    setSpecializations('Corporate Law, Commercial Contracts, Court Litigation');
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleSaveMember = async () => {
    if (!name.trim()) {
      alert('Please enter advocate name.');
      return;
    }

    const specsArray = specializations
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const memberToSave: TeamMember = {
      id: isCreating ? `team-${Date.now()}` : selectedMember!.id,
      name,
      role,
      photo,
      bio,
      education,
      barRegistration,
      email,
      phone,
      specializations: specsArray,
      order: isCreating ? teamMembers.length + 1 : selectedMember?.order || 1
    };

    await saveTeamMember(memberToSave);
    await onRefresh();
    setSelectedMember(memberToSave);
    setIsEditing(false);
    setIsCreating(false);
    setStatusMessage('Advocate profile updated successfully.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm('Delete this advocate profile?')) {
      await deleteTeamMember(id);
      await onRefresh();
      setSelectedMember(teamMembers.find((m) => m.id !== id) || null);
      setStatusMessage('Advocate removed.');
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
            Legal Team & Advocates Directory
          </h3>
          <p className="text-xs text-[#8c887d] mt-1">
            Manage partner profiles, Bar Council credentials, courtroom roles, and advocate headshots.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Advocate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Members List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-[#8c887d] uppercase tracking-wider mb-2">
            Roster of Advocates ({teamMembers.length})
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {teamMembers.map((member) => {
              const isSelected = selectedMember?.id === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => handleSelectMember(member)}
                  className={`p-3 border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#18150f] border-[#c5a059] text-white'
                      : 'bg-[#0c0b09] border-[#242018] text-[#c9c5ba] hover:border-[#383327]'
                  }`}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded border border-[#2b271e] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-sm font-semibold truncate text-[#f3ece0]">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-[#c5a059] truncate">
                      {member.role}
                    </div>
                    <div className="text-[10px] text-[#7d796e] truncate mt-0.5">
                      {member.barRegistration}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Member View / Form */}
        <div className="lg:col-span-8 bg-[#0c0b09] border border-[#24211a] p-6 space-y-6">
          {isEditing || isCreating ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#211e17]">
                <h4 className="font-serif text-base text-[#f3ece0]">
                  {isCreating ? 'Add New Advocate' : `Edit: ${selectedMember?.name}`}
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
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adv. Pradeep K. Sharma"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Designation / Court Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Advocate & Managing Partner"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              {/* Advocate Photo with Curated Preset Picker */}
              <ImageUploadInput
                label="Advocate Portrait / Headshot"
                value={photo}
                onChange={(url) => setPhoto(url)}
                categoryFilter="team"
                helperText="Upload formal attorney portrait or choose from professional curated headshots."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Bar Council Registration License
                  </label>
                  <input
                    type="text"
                    value={barRegistration}
                    onChange={(e) => setBarRegistration(e.target.value)}
                    placeholder="e.g. Nepal Bar Council Reg. No: 1428"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Academic Qualifications
                  </label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. LL.M. Commercial Law (Delhi Univ), LL.B. (Tribhuvan Univ)"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. advocate@bodhlaw.com.np"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Direct Chambers Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +977-1-4267890"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                  Areas of Specialization (Comma-separated)
                </label>
                <input
                  type="text"
                  value={specializations}
                  onChange={(e) => setSpecializations(e.target.value)}
                  placeholder="e.g. Corporate Law, FDI Approvals, Supreme Court Writ, Commercial Arbitration"
                  className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                  Professional Biography & Courtroom Background
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Advocate bio, court appearances, notable counsel representations..."
                  className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleSaveMember}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Advocate Profile</span>
                </button>
              </div>
            </div>
          ) : selectedMember ? (
            /* Selected Member Preview Card */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-[#211e17]">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded border border-[#2b271e]"
                  />
                  <div>
                    <h4 className="font-serif text-2xl text-[#f3ece0]">
                      {selectedMember.name}
                    </h4>
                    <p className="text-xs text-[#c5a059] font-medium mt-0.5">
                      {selectedMember.role}
                    </p>
                    <p className="text-[11px] text-[#8c887d] mt-1">
                      {selectedMember.barRegistration}
                    </p>
                    <p className="text-[11px] text-[#8c887d]">
                      {selectedMember.education}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(selectedMember)}
                    className="px-3 py-1.5 text-xs font-medium bg-[#1a1711] text-[#c5a059] border border-[#3b3426] hover:bg-[#252016]"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => handleDeleteMember(selectedMember.id)}
                    className="p-1.5 text-[#e57373] hover:bg-[#201010] border border-transparent hover:border-[#521c1c]"
                    title="Delete Advocate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#a39f93] uppercase tracking-wider">
                  Biography & Practice Summary
                </div>
                <div className="text-xs text-[#c9c5ba] leading-relaxed bg-[#0f0e0b] p-4 border border-[#211e17]">
                  {selectedMember.bio}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#a39f93] uppercase tracking-wider">
                  Areas of Specialization
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specializations?.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs bg-[#17140e] text-[#c5a059] px-2.5 py-1 border border-[#332b1c]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#211e17] text-xs">
                <div className="flex items-center gap-2 text-[#8c887d]">
                  <Mail className="w-4 h-4 text-[#c5a059]" />
                  <span>{selectedMember.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[#8c887d]">
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <span>{selectedMember.phone}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#7a766c]">
              Select an advocate from the left roster to review details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
