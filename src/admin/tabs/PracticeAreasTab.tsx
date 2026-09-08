import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Layers,
  Plus,
  Save,
  Trash2,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import {
  addSubSectionToPracticeArea,
  deletePracticeArea,
  deleteSubSectionFromPracticeArea,
  savePracticeArea,
  updateSubSectionInPracticeArea
} from '../../services/storage';
import { PracticeArea, PracticeSubSection } from '../../types';

interface PracticeAreasTabProps {
  practiceAreas: PracticeArea[];
  onRefresh: () => Promise<void>;
}

export const PracticeAreasTab: React.FC<PracticeAreasTabProps> = ({
  practiceAreas,
  onRefresh
}) => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(
    practiceAreas[0] || null
  );
  const [isEditingArea, setIsEditingArea] = useState(false);
  const [isCreatingArea, setIsCreatingArea] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form states for Practice Area
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('Scale');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [featured, setFeatured] = useState(true);

  // Sub-section form state
  const [editingSubSection, setEditingSubSection] = useState<PracticeSubSection | null>(null);
  const [isCreatingSub, setIsCreatingSub] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [subServices, setSubServices] = useState('');

  const handleSelectArea = (area: PracticeArea) => {
    setSelectedArea(area);
    setIsEditingArea(false);
    setIsCreatingArea(false);
    setEditingSubSection(null);
    setIsCreatingSub(false);
  };

  const handleStartEditArea = (area: PracticeArea) => {
    setTitle(area.title);
    setSlug(area.slug);
    setIcon(area.icon || 'Scale');
    setShortDesc(area.shortDescription);
    setFullDesc(area.fullDescription);
    setFeatured(area.featured);
    setIsEditingArea(true);
    setIsCreatingArea(false);
  };

  const handleStartCreateArea = () => {
    setTitle('');
    setSlug('');
    setIcon('Briefcase');
    setShortDesc('');
    setFullDesc('');
    setFeatured(false);
    setIsCreatingArea(true);
    setIsEditingArea(false);
  };

  const handleSaveArea = async () => {
    if (!title.trim()) {
      alert('Please provide a title for the practice area.');
      return;
    }
    const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const areaToSave: PracticeArea = {
      id: isCreatingArea ? `pa-${Date.now()}` : selectedArea!.id,
      title,
      slug: generatedSlug,
      icon,
      shortDescription: shortDesc,
      fullDescription: fullDesc,
      subSections: isCreatingArea ? [] : selectedArea?.subSections || [],
      featured,
      order: isCreatingArea ? practiceAreas.length + 1 : selectedArea?.order || 1
    };

    await savePracticeArea(areaToSave);
    await onRefresh();
    setSelectedArea(areaToSave);
    setIsEditingArea(false);
    setIsCreatingArea(false);
    setStatusMessage('Practice area successfully saved.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleDeleteArea = async (areaId: string) => {
    if (confirm('Are you sure you want to delete this practice area?')) {
      await deletePracticeArea(areaId);
      await onRefresh();
      setSelectedArea(practiceAreas.find((p) => p.id !== areaId) || null);
      setStatusMessage('Practice area removed.');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  // Sub section handlers
  const handleStartCreateSub = () => {
    setSubTitle('');
    setSubDesc('');
    setSubServices('');
    setIsCreatingSub(true);
    setEditingSubSection(null);
  };

  const handleStartEditSub = (sub: PracticeSubSection) => {
    setEditingSubSection(sub);
    setSubTitle(sub.title);
    setSubDesc(sub.description);
    setSubServices(sub.keyServices.join('\n'));
    setIsCreatingSub(false);
  };

  const handleSaveSubSection = async () => {
    if (!selectedArea || !subTitle.trim()) {
      alert('Please provide a title for the sub-section.');
      return;
    }

    const servicesList = subServices
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isCreatingSub) {
      await addSubSectionToPracticeArea(selectedArea.id, {
        id: `sub-${Date.now()}`,
        title: subTitle,
        description: subDesc,
        keyServices: servicesList
      });
    } else if (editingSubSection) {
      await updateSubSectionInPracticeArea(selectedArea.id, {
        ...editingSubSection,
        title: subTitle,
        description: subDesc,
        keyServices: servicesList
      });
    }

    await onRefresh();
    // Update local selected area
    const updated = practiceAreas.find((p) => p.id === selectedArea.id);
    if (updated) setSelectedArea(updated);
    setIsCreatingSub(false);
    setEditingSubSection(null);
    setStatusMessage('Sub-section saved successfully.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleDeleteSubSection = async (subId: string) => {
    if (!selectedArea) return;
    if (confirm('Delete this sub-section?')) {
      await deleteSubSectionFromPracticeArea(selectedArea.id, subId);
      await onRefresh();
      const updated = practiceAreas.find((p) => p.id === selectedArea.id);
      if (updated) setSelectedArea(updated);
      setStatusMessage('Sub-section removed.');
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

      {/* Header & New Button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#242018]">
        <div>
          <h3 className="font-serif text-xl text-[#f3ece0]">
            Practice Areas & Specialized Sub-Divisions
          </h3>
          <p className="text-xs text-[#8c887d] mt-1">
            Manage legal practice areas, dynamic sub-sections, deliverables, and courtroom scope.
          </p>
        </div>
        <button
          onClick={handleStartCreateArea}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Practice Area</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Practice Areas List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-[#8c887d] uppercase tracking-wider mb-2">
            Practice Disciplines ({practiceAreas.length})
          </div>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {practiceAreas.map((area) => {
              const isSelected = selectedArea?.id === area.id;
              return (
                <div
                  key={area.id}
                  onClick={() => handleSelectArea(area)}
                  className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#18150f] border-[#c5a059] text-white'
                      : 'bg-[#0c0b09] border-[#242018] text-[#c9c5ba] hover:border-[#383327]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-semibold truncate text-[#f3ece0]">
                        {area.title}
                      </span>
                      {area.featured && (
                        <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] px-1.5 py-0.5 uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#7d796e] mt-1">
                      {area.subSections?.length || 0} Sub-sections • Slug: /{area.slug}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#c5a059]' : 'text-[#47443c]'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Area Details & Editing */}
        <div className="lg:col-span-8 bg-[#0c0b09] border border-[#24211a] p-6 space-y-6">
          {/* Create or Edit Form */}
          {isEditingArea || isCreatingArea ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#211e17]">
                <h4 className="font-serif text-base text-[#f3ece0]">
                  {isCreatingArea ? 'Create New Practice Area' : `Edit: ${selectedArea?.title}`}
                </h4>
                <button
                  onClick={() => {
                    setIsEditingArea(false);
                    setIsCreatingArea(false);
                  }}
                  className="text-xs text-[#8c887d] hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Corporate & FDI Law"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g., corporate-fdi"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Icon Name (e.g. Scale, Building2, Landmark, Shield, FileCheck)
                  </label>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f3ece0]">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="accent-[#c5a059] w-4 h-4"
                    />
                    <span>Highlight as Featured on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                  Short Summary (Homepage Card)
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                  Full Overview (Modal Explorer & Practice Page)
                </label>
                <textarea
                  rows={4}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleSaveArea}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Practice Area</span>
                </button>
              </div>
            </div>
          ) : selectedArea ? (
            /* Area Summary & Sub-sections */
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-[#211e17]">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-serif text-2xl text-[#f3ece0]">
                      {selectedArea.title}
                    </h4>
                    {selectedArea.featured && (
                      <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] px-2 py-0.5 uppercase tracking-wider font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8c887d] mt-1">
                    Slug: /{selectedArea.slug} • Icon: {selectedArea.icon}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEditArea(selectedArea)}
                    className="px-3 py-1.5 text-xs font-medium bg-[#1a1711] text-[#c5a059] border border-[#3b3426] hover:bg-[#252016]"
                  >
                    Edit Core Details
                  </button>
                  <button
                    onClick={() => handleDeleteArea(selectedArea.id)}
                    className="p-1.5 text-[#e57373] hover:bg-[#201010] border border-transparent hover:border-[#521c1c]"
                    title="Delete Practice Area"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#c9c5ba] leading-relaxed bg-[#0f0e0b] p-3 border border-[#211e17]">
                {selectedArea.shortDescription}
              </div>

              {/* Dynamic Sub-sections Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-serif text-base text-[#f3ece0]">
                      Specialized Sub-Sections & Scope
                    </h5>
                    <p className="text-[11px] text-[#7d796e]">
                      Clients explore these in the Practice Detail Modal and dedicated Practice page.
                    </p>
                  </div>
                  <button
                    onClick={handleStartCreateSub}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#c5a059]/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Sub-section</span>
                  </button>
                </div>

                {/* Sub-section Form */}
                {(isCreatingSub || editingSubSection) && (
                  <div className="p-4 bg-[#14120e] border border-[#3b3426] space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-[#262118]">
                      <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                        {isCreatingSub ? 'New Sub-section' : `Edit: ${editingSubSection?.title}`}
                      </span>
                      <button
                        onClick={() => {
                          setIsCreatingSub(false);
                          setEditingSubSection(null);
                        }}
                        className="text-xs text-[#8c887d] hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#a39f93] uppercase">Title</label>
                      <input
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="e.g. Foreign Direct Investment (FDI) Approvals"
                        className="w-full bg-[#0a0907] border border-[#2b271e] focus:border-[#c5a059] px-3 py-1.5 text-xs text-[#f3ece0] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#a39f93] uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={subDesc}
                        onChange={(e) => setSubDesc(e.target.value)}
                        placeholder="Legal scope, procedures, and statutory regulatory compliance..."
                        className="w-full bg-[#0a0907] border border-[#2b271e] focus:border-[#c5a059] px-3 py-1.5 text-xs text-[#f3ece0] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#a39f93] uppercase">
                        Key Services & Deliverables (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={subServices}
                        onChange={(e) => setSubServices(e.target.value)}
                        placeholder="Due diligence audit&#10;Department of Industry sanction&#10;Nepal Rastra Bank approval"
                        className="w-full bg-[#0a0907] border border-[#2b271e] focus:border-[#c5a059] px-3 py-1.5 text-xs text-[#f3ece0] outline-none"
                      />
                    </div>

                    <div className="pt-1 flex gap-2">
                      <button
                        onClick={handleSaveSubSection}
                        className="px-4 py-1.5 bg-[#c5a059] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#d4b050]"
                      >
                        Save Sub-Section
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-sections list */}
                <div className="space-y-2">
                  {selectedArea.subSections && selectedArea.subSections.length > 0 ? (
                    selectedArea.subSections.map((sub, idx) => (
                      <div
                        key={sub.id || idx}
                        className="p-3.5 bg-[#0e0d0a] border border-[#211e17] space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="font-semibold text-xs text-[#f3ece0]">
                            {idx + 1}. {sub.title}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEditSub(sub)}
                              className="text-[11px] text-[#c5a059] hover:underline px-2 py-0.5"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSubSection(sub.id)}
                              className="text-[11px] text-[#e57373] hover:underline px-2 py-0.5"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#8c887d] leading-relaxed">
                          {sub.description}
                        </p>
                        {sub.keyServices && sub.keyServices.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {sub.keyServices.map((svc, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] bg-[#1a1711] text-[#b8b4a7] px-2 py-0.5 border border-[#2b261b]"
                              >
                                • {svc}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-[#6e6a60] border border-dashed border-[#242018]">
                      No sub-sections added yet. Click &quot;Add Sub-section&quot; above to create one.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#7a766c]">
              Select a practice area from the left to view and modify its content.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
