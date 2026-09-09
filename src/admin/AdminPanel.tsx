import {
  AlertCircle,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Save,
  Search,
  Shield,
  Sparkles,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { saveSiteContent } from '../services/storage';
import { getSupabaseConfigInfo } from '../services/supabase';
import {
  BlogPost,
  ContactInquiry,
  PracticeArea,
  SiteContent,
  TeamMember,
  Testimonial
} from '../types';
import { BlogsTab } from './tabs/BlogsTab';
import { DatabaseTab } from './tabs/DatabaseTab';
import { InquiriesTab } from './tabs/InquiriesTab';
import { MediaLibraryTab } from './tabs/MediaLibraryTab';
import { PracticeAreasTab } from './tabs/PracticeAreasTab';
import { ReviewsTab } from './tabs/ReviewsTab';
import { SeoTab } from './tabs/SeoTab';
import { SiteContentTab } from './tabs/SiteContentTab';
import { TeamTab } from './tabs/TeamTab';

interface AdminPanelProps {
  content: SiteContent;
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
  onRefreshData: () => Promise<void>;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  content: initialContent,
  practiceAreas,
  teamMembers,
  blogs,
  testimonials,
  inquiries,
  onRefreshData,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'inquiries' | 'content' | 'practice' | 'team' | 'blogs' | 'reviews' | 'seo' | 'media' | 'database'
  >('overview');

  // Executive Chambers Partner Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bodh_partner_authenticated') === 'true';
  });
  const [authEmail, setAuthEmail] = useState('admin@bodhlawfirm.com.np');
  const [authPasskey, setAuthPasskey] = useState('bodhlaw2026');
  const [authError, setAuthError] = useState('');

  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const configInfo = getSupabaseConfigInfo();
  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const handleSaveContent = async () => {
    setIsSavingContent(true);
    try {
      await saveSiteContent(content);
      await onRefreshData();
      setToastMessage('Site content and imagery saved successfully.');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      alert('Error saving site content: ' + String(err));
    } finally {
      setIsSavingContent(false);
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (authEmail.trim().toLowerCase().includes('admin') || authPasskey === 'bodhlaw2026') {
      setIsAuthenticated(true);
      localStorage.setItem('bodh_partner_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid partner credentials. Please use admin@bodhlawfirm.com.np or the one-click button.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bodh_partner_authenticated');
  };

  // 1. Unauthenticated Security Gate for admin.bodhlawfirm.com.np
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#060606] text-[#f3ece0] flex items-center justify-center p-4 font-sans selection:bg-[#c5a059] selection:text-black">
        <div className="max-w-md w-full bg-[#0c0b08] border border-[#2b271d] p-8 shadow-2xl space-y-6 relative">
          {/* Subtle gold decorative header line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a6e34] via-[#c5a059] to-[#8a6e34]" />

          <div className="text-center space-y-2 pt-2">
            <div className="w-20 h-20 mx-auto flex items-center justify-center" style={{ isolation: 'isolate' }}>
              <img
                src="/assets/bodh-logo.png"
                alt="Bodh Law Firm Logo"
                className="w-full h-full object-contain"
                style={{ mixBlendMode: 'screen', filter: 'brightness(1.4) contrast(1.3) saturate(1.2)' }}
              />
            </div>
            <h1 className="font-serif text-xl font-bold tracking-wide text-[#f3ece0]">
              Bodh Law Chambers
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1f1a10] border border-[#c5a059]/30 text-[11px] font-mono text-[#c5a059]">
              <Shield className="w-3 h-3" />
              <span>admin.bodhlawfirm.com.np</span>
            </div>
            <p className="text-xs text-[#8c887d] pt-1">
              Executive Partner Administration & Legal CRM Portal
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#a09c91] mb-1 font-medium">
                Partner / Advocate Email
              </label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full bg-[#14120c] border border-[#2e2a20] focus:border-[#c5a059] px-3.5 py-2.5 text-xs text-[#f3ece0] outline-none rounded transition-colors"
                placeholder="advocate@bodhlawfirm.com.np"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#a09c91] mb-1 font-medium">
                Passkey / Security Code
              </label>
              <input
                type="password"
                value={authPasskey}
                onChange={(e) => setAuthPasskey(e.target.value)}
                className="w-full bg-[#14120c] border border-[#2e2a20] focus:border-[#c5a059] px-3.5 py-2.5 text-xs text-[#f3ece0] outline-none rounded transition-colors font-mono"
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d8b260] transition-colors rounded shadow"
            >
              Enter Chambers Workspace
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-2 border-t border-[#1e1b14] space-y-2">
            <button
              onClick={() => {
                setAuthEmail('admin@bodhlawfirm.com.np');
                setAuthPasskey('bodhlaw2026');
                setIsAuthenticated(true);
                localStorage.setItem('bodh_partner_authenticated', 'true');
              }}
              className="w-full py-2 px-3 text-xs font-semibold bg-[#1a1711] text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#252014] transition-colors rounded flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Partner Login (admin@bodhlawfirm.com.np)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-center text-xs text-[#7d796e] hover:text-[#f3ece0] transition-colors"
            >
              ← Return to Public Website (bodhlawfirm.com.np)
            </button>
          </div>

          <div className="text-[10px] text-center text-[#555] leading-tight">
            Restricted to licensed advocates & chambers personnel under the Nepal Legal Practitioners Act 2050.
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dedicated Chambers Executive Application
  return (
    <div className="fixed inset-0 z-[100] bg-[#070707] text-[#f3ece0] flex flex-col font-sans overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[110] bg-[#16130b] border border-[#c5a059] px-4 py-3 text-xs text-[#f3ece0] shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="h-16 bg-[#0a0907] border-b border-[#242018] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ isolation: 'isolate' }}>
            <img
              src="/assets/bodh-logo.png"
              alt="Bodh Law Firm Logo"
              className="w-full h-full object-contain"
              style={{ mixBlendMode: 'screen', filter: 'brightness(1.4) contrast(1.3) saturate(1.2)' }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-semibold text-sm tracking-wide text-[#f3ece0]">
                Bodh Law Chambers
              </span>
              <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30 px-2 py-0.5 uppercase tracking-wider font-semibold">
                admin.bodhlawfirm.com.np
              </span>
            </div>
            <p className="text-[11px] text-[#7d796e]">
              Kathmandu, Nepal • Supreme Court & Appellate Chambers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Cloud Sync Status Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs px-3 py-1 bg-[#12100a] border border-[#242018]">
            <span
              className={`w-2 h-2 rounded-full ${configInfo.isConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
            />
            <span className="text-[#8c887d]">
              {configInfo.isConfigured ? 'Supabase Sync Active' : 'Local Storage Mode'}
            </span>
          </div>

          {/* Return to Public Website */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#16130b] text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#252014] transition-colors rounded"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Public Site (bodhlawfirm.com.np)</span>
          </button>

          {/* Sign Out / Lock Chambers */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs text-[#8c887d] hover:text-red-400 transition-colors px-2 py-1"
            title="Lock Chambers & Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 bg-[#090806] border-r border-[#242018] p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1">
            <div className="text-[10px] font-semibold text-[#6e6a60] uppercase tracking-widest px-3 mb-2">
              Management Modules
            </div>

            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
              {
                id: 'inquiries',
                label: 'Client Intake & CRM',
                icon: Mail,
                badge: pendingInquiriesCount > 0 ? `${pendingInquiriesCount} New` : null
              },
              { id: 'content', label: 'Site Content & Images', icon: FileText, badge: null },
              { id: 'practice', label: 'Practice Areas', icon: Briefcase, badge: `${practiceAreas.length}` },
              { id: 'team', label: 'Legal Team & Advocates', icon: Users, badge: `${teamMembers.length}` },
              { id: 'blogs', label: 'Blogs & Precedents', icon: BookOpen, badge: `${blogs.length}` },
              { id: 'reviews', label: 'Client Testimonials', icon: MessageSquare, badge: `${testimonials.length}` },
              { id: 'seo', label: 'SEO & Nepal Rankings', icon: Search, badge: 'bodhlawfirm.com.np' },
              { id: 'media', label: 'Legal Media Gallery', icon: ImageIcon, badge: null },
              { id: 'database', label: 'Database & Supabase', icon: Database, badge: null }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium transition-all text-left ${isActive
                      ? 'bg-[#18150f] text-[#c5a059] border-l-2 border-[#c5a059] font-semibold'
                      : 'text-[#8c887d] hover:bg-[#12100a] hover:text-[#f3ece0]'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#c5a059]' : 'text-[#6e6a60]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${item.badge.includes('New')
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'bg-[#1a1711] text-[#7d796e]'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Footer inside sidebar */}
          <div className="pt-4 border-t border-[#1c1913] space-y-2">
            <button
              onClick={async () => {
                await onRefreshData();
                setToastMessage('Data reloaded from store.');
                setTimeout(() => setToastMessage(''), 3000);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-[#8c887d] hover:text-[#f3ece0] bg-[#100f0b] border border-[#211e17] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Workspace</span>
            </button>
            <div className="text-[10px] text-center text-[#59554c]">
              Bodh Law Management v2.5 • admin.bodhlawfirm.com.np
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#070707]">
          {/* TAB 0: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#f3ece0]">
                  Chambers Administration Overview
                </h2>
                <p className="text-xs text-[#8c887d] mt-1">
                  Manage all content, photography, practice disciplines, advocate profiles, and client inquiries from this unified portal.
                </p>
              </div>

              {/* Quick Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('inquiries')}
                  className="p-5 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-[#8c887d]">
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      New Inquiries
                    </span>
                    <Mail className="w-4 h-4 text-[#c5a059]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#f3ece0]">
                    {pendingInquiriesCount}
                  </div>
                  <div className="text-[11px] text-[#7d796e]">
                    Total consultations: {inquiries.length}
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('practice')}
                  className="p-5 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-[#8c887d]">
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      Practice Disciplines
                    </span>
                    <Briefcase className="w-4 h-4 text-[#c5a059]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#f3ece0]">
                    {practiceAreas.length}
                  </div>
                  <div className="text-[11px] text-[#7d796e]">
                    With dynamic sub-sections
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('team')}
                  className="p-5 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-[#8c887d]">
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      Legal Advocates
                    </span>
                    <Users className="w-4 h-4 text-[#c5a059]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#f3ece0]">
                    {teamMembers.length}
                  </div>
                  <div className="text-[11px] text-[#7d796e]">
                    Bar Council registered
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('blogs')}
                  className="p-5 bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-[#8c887d]">
                    <span className="text-xs uppercase tracking-wider font-semibold">
                      Published Insights
                    </span>
                    <BookOpen className="w-4 h-4 text-[#c5a059]" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#f3ece0]">
                    {blogs.length}
                  </div>
                  <div className="text-[11px] text-[#7d796e]">
                    Precedents & digests
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Intake */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Inquiries Preview */}
                <div className="lg:col-span-7 bg-[#0c0b09] border border-[#24211a] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-[#f3ece0]">
                      Recent Consultation Appointments
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-[#c5a059] hover:underline"
                    >
                      View All ({inquiries.length})
                    </button>
                  </div>

                  <div className="space-y-2">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-3 bg-[#0f0e0b] border border-[#211e17] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-xs text-[#f3ece0]">
                            {inq.name}
                          </div>
                          <div className="text-[11px] text-[#c5a059]">
                            {inq.practiceArea}
                          </div>
                          <div className="text-[10px] text-[#7d796e] mt-0.5">
                            {inq.phone} • {new Date(inq.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 uppercase tracking-wider border ${inq.status === 'new'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-[#18150f] text-[#8c887d] border-[#2b271e]'
                            }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <div className="p-6 text-center text-xs text-[#6e6a60]">
                        No client inquiries received yet.
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Editor Shortcuts */}
                <div className="lg:col-span-5 bg-[#0c0b09] border border-[#24211a] p-6 space-y-4">
                  <h3 className="font-serif text-lg text-[#f3ece0]">
                    Quick Content Shortcuts
                  </h3>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab('content')}
                      className="w-full text-left p-3 bg-[#0f0e0b] border border-[#211e17] hover:border-[#c5a059] transition-colors"
                    >
                      <div className="text-xs font-semibold text-[#f3ece0]">
                        Edit Hero Headline & Banner Photo
                      </div>
                      <div className="text-[11px] text-[#7d796e] mt-0.5">
                        Current: &ldquo;{content.hero.title}&rdquo;
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('content')}
                      className="w-full text-left p-3 bg-[#0f0e0b] border border-[#211e17] hover:border-[#c5a059] transition-colors"
                    >
                      <div className="text-xs font-semibold text-[#f3ece0]">
                        Update Chambers Contact & Hotline
                      </div>
                      <div className="text-[11px] text-[#7d796e] mt-0.5">
                        Tel: {content.contactInfo.phone} • WhatsApp: {content.contactInfo.whatsappNumber}
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('media')}
                      className="w-full text-left p-3 bg-[#0f0e0b] border border-[#211e17] hover:border-[#c5a059] transition-colors"
                    >
                      <div className="text-xs font-semibold text-[#f3ece0]">
                        Browse Curated Legal Photography
                      </div>
                      <div className="text-[11px] text-[#7d796e] mt-0.5">
                        Find high-resolution courthouse, chambers & library images
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <InquiriesTab inquiries={inquiries} onRefresh={onRefreshData} />
          )}

          {/* TAB 2: SITE CONTENT & IMAGES */}
          {activeTab === 'content' && (
            <SiteContentTab
              content={content}
              onChange={setContent}
              onSave={handleSaveContent}
              isSaving={isSavingContent}
            />
          )}

          {/* TAB 3: PRACTICE AREAS */}
          {activeTab === 'practice' && (
            <PracticeAreasTab
              practiceAreas={practiceAreas}
              onRefresh={onRefreshData}
            />
          )}

          {/* TAB 4: LEGAL TEAM */}
          {activeTab === 'team' && (
            <TeamTab teamMembers={teamMembers} onRefresh={onRefreshData} />
          )}

          {/* TAB 5: BLOGS & PRECEDENTS */}
          {activeTab === 'blogs' && (
            <BlogsTab blogs={blogs} onRefresh={onRefreshData} />
          )}

          {/* TAB 6: CLIENT REVIEWS */}
          {activeTab === 'reviews' && (
            <ReviewsTab
              testimonials={testimonials}
              onRefresh={onRefreshData}
            />
          )}

          {/* TAB 7: SEO & NEPAL SEARCH RANKING */}
          {activeTab === 'seo' && (
            <SeoTab content={content} />
          )}

          {/* TAB 8: MEDIA GALLERY */}
          {activeTab === 'media' && <MediaLibraryTab />}

          {/* TAB 9: DATABASE & SUPABASE */}
          {activeTab === 'database' && (
            <DatabaseTab
              content={content}
              practiceAreas={practiceAreas}
              teamMembers={teamMembers}
              blogs={blogs}
              testimonials={testimonials}
              inquiries={inquiries}
              onRefresh={onRefreshData}
            />
          )}
        </main>
      </div>
    </div>
  );
};
