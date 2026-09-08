import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Database,
  Download,
  ExternalLink,
  RefreshCw,
  Save,
  Trash2,
  Upload
} from 'lucide-react';
import React, { useState } from 'react';
import { resetAllToDefaults } from '../../services/storage';
import { getSupabaseConfigInfo, SUPABASE_SQL_SCHEMA } from '../../services/supabase';
import {
  BlogPost,
  ContactInquiry,
  PracticeArea,
  SiteContent,
  TeamMember,
  Testimonial
} from '../../types';

interface DatabaseTabProps {
  content: SiteContent;
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  onRefresh: () => Promise<void>;
}

export const DatabaseTab: React.FC<DatabaseTabProps> = ({
  content,
  practiceAreas,
  teamMembers,
  blogs,
  testimonials,
  inquiries,
  onRefresh
}) => {
  const configInfo = getSupabaseConfigInfo();
  const [customUrl, setCustomUrl] = useState(
    localStorage.getItem('bodh_custom_supabase_url') || ''
  );
  const [customKey, setCustomKey] = useState(
    localStorage.getItem('bodh_custom_supabase_key') || ''
  );
  const [isSaved, setIsSaved] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleSaveConfig = () => {
    if (customUrl.trim()) {
      localStorage.setItem('bodh_custom_supabase_url', customUrl.trim());
    } else {
      localStorage.removeItem('bodh_custom_supabase_url');
    }

    if (customKey.trim()) {
      localStorage.setItem('bodh_custom_supabase_key', customKey.trim());
    } else {
      localStorage.removeItem('bodh_custom_supabase_key');
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      window.location.reload();
    }, 1500);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 3000);
  };

  const handleExportBackup = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      firm: 'Bodh Law Associates & Chambers Nepal',
      content,
      practiceAreas,
      teamMembers,
      blogs,
      testimonials,
      inquiries
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bodh-law-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDefaults = async () => {
    if (
      confirm(
        'Are you sure you want to reset all site content, practice areas, team members, blogs, and testimonials to defaults? This cannot be undone.'
      )
    ) {
      setResetting(true);
      await resetAllToDefaults();
      await onRefresh();
      setResetting(false);
      alert('Default data successfully restored.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#242018]">
        <h3 className="font-serif text-xl text-[#f3ece0]">
          Database Synchronization, Supabase & Data Backups
        </h3>
        <p className="text-xs text-[#8c887d] mt-1">
          Configure cloud persistence via Supabase PostgreSQL, copy database SQL schemas, or create JSON backups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supabase Connection Setup */}
        <div className="bg-[#0c0b09] border border-[#24211a] p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#c5a059] uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Supabase Connection</span>
          </div>

          <p className="text-xs text-[#8c887d] leading-relaxed">
            Status: {configInfo.isConfigured ? (
              <span className="text-emerald-400 font-semibold">
                Active ({configInfo.isCustom ? 'Custom Cloud Credentials' : 'Project Environment'})
              </span>
            ) : (
              <span className="text-amber-400 font-semibold">Offline / Local Storage Mode</span>
            )}
          </p>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#f3ece0] uppercase">
              Supabase Project URL
            </label>
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#f3ece0] uppercase">
              Supabase Anon / Public Key
            </label>
            <input
              type="password"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="eyJhbGciOi..."
              className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none font-mono"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleSaveConfig}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Connect</span>
            </button>
            {isSaved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved! Reloading...
              </span>
            )}
          </div>
        </div>

        {/* Backups & Reset */}
        <div className="bg-[#0c0b09] border border-[#24211a] p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#c5a059] uppercase tracking-wider">
              <Download className="w-4 h-4" />
              <span>JSON Backup & Recovery</span>
            </div>
            <p className="text-xs text-[#8c887d] leading-relaxed mt-2">
              Export all law firm content, staff profiles, blogs, practice areas, reviews, and client inquiries to a clean JSON file for disaster recovery.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#1c1913]">
            <button
              onClick={handleExportBackup}
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#14120e] text-[#c5a059] border border-[#3b3426] hover:bg-[#252016] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Full Law Firm Backup (.json)</span>
            </button>

            <button
              onClick={handleResetDefaults}
              disabled={resetting}
              className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#1a0f0f] text-[#e57373] border border-[#4d1f1f] hover:bg-[#2e1212] flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
              <span>Reset Everything to Law Firm Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* SQL Schema Copy Section */}
      <div className="bg-[#0c0b09] border border-[#24211a] p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif text-base text-[#f3ece0]">
              PostgreSQL Tables Schema for Supabase
            </h4>
            <p className="text-xs text-[#8c887d] mt-0.5">
              Copy this SQL script into your Supabase SQL Editor if you are initializing tables on a new project.
            </p>
          </div>
          <button
            onClick={handleCopySql}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              sqlCopied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-[#14120e] text-[#c5a059] border-[#3b3426] hover:bg-[#252016]'
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{sqlCopied ? 'SQL Copied!' : 'Copy SQL Script'}</span>
          </button>
        </div>

        <pre className="bg-[#060504] p-4 text-[11px] font-mono text-[#a8a396] border border-[#1f1c16] max-h-48 overflow-y-auto">
          {SUPABASE_SQL_SCHEMA}
        </pre>
      </div>
    </div>
  );
};
