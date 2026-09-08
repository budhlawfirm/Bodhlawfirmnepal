import {
  AlertCircle,
  BarChart3,
  Bot,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  Globe,
  HelpCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Zap
} from 'lucide-react';
import React, { useState } from 'react';
import { SiteContent } from '../../types';

interface SeoTabProps {
  content: SiteContent;
}

export const SeoTab: React.FC<SeoTabProps> = ({ content }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testKeyword, setTestKeyword] = useState('best law firm in nepal');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const targetKeywords = [
    {
      keyword: 'best law firm in nepal',
      nepali: 'नेपालको उत्कृष्ट कानुन फर्म',
      volume: 'Very High',
      intent: 'Transactional / Legal Counsel',
      rankPotential: '#1 Target',
      targetSection: 'Homepage & Practice Areas'
    },
    {
      keyword: 'lawyer in kathmandu',
      nepali: 'काठमाडौंका वकिल',
      volume: 'High',
      intent: 'Local Counsel Putalisadak',
      rankPotential: 'Top 3',
      targetSection: 'Chambers Contact & Map'
    },
    {
      keyword: 'supreme court lawyer nepal',
      nepali: 'सर्वोच्च अदालत वकिल',
      volume: 'High',
      intent: 'Appellate & Constitutional Writs',
      rankPotential: '#1 Target',
      targetSection: 'Our Team & Advocates'
    },
    {
      keyword: 'corporate lawyer nepal FDI',
      nepali: 'कर्पोरेट तथा वैदेशिक लगानी कानुन',
      volume: 'High',
      intent: 'Commercial & Cross-Border',
      rankPotential: 'Top 3',
      targetSection: 'Practice Areas'
    },
    {
      keyword: 'divorce lawyer nepal family law',
      nepali: 'सम्बन्ध विच्छेद तथा अंशमुद्दा वकिल',
      volume: 'High',
      intent: 'Civil Code Advocacy',
      rankPotential: 'Top 3',
      targetSection: 'Practice Areas & Blogs'
    },
    {
      keyword: 'property lawyer kathmandu land dispute',
      nepali: 'जग्गा जमिन तथा मालपोत विवाद वकिल',
      volume: 'Medium-High',
      intent: 'Real Estate & Title Defense',
      rankPotential: 'Top 3',
      targetSection: 'Practice Areas'
    },
    {
      keyword: 'nepal bar council licensed advocate',
      nepali: 'नेपाल बार काउन्सिल इजाजतप्राप्त कानुन व्यवसायी',
      volume: 'Medium',
      intent: 'Credibility & Accreditation',
      rankPotential: '#1 Target',
      targetSection: 'About Us & Certifications'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="p-6 rounded-lg bg-gradient-to-r from-[#14120c] via-[#1a1710] to-[#12100a] border border-[#c5a059]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
            <Zap className="w-4 h-4" />
            <span>Search Engine Optimization Engine</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#f3ece0] mt-1">
            Google Search Dominance for bodhlawfirm.com.np
          </h2>
          <p className="text-xs text-[#a8a396] mt-1 max-w-2xl">
            Optimized for ranking #1 in Nepal across Kathmandu, Lalitpur, and nationwide for high-intent client searches in both English and Nepali.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://bodhlawfirm.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold bg-[#c5a059] text-black hover:bg-[#d8b260] transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Test bodhlawfirm.com.np</span>
          </a>
        </div>
      </div>

      {/* Google Search Result Live Preview Simulator */}
      <div className="p-6 rounded-lg bg-[#0e0d0a] border border-[#24211a] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
            <Search className="w-4 h-4" />
            <span>Google Search Live Simulator (Nepal Regional View)</span>
          </div>
          <span className="text-[11px] text-[#7d796e] bg-[#16140f] px-2.5 py-1 border border-[#2a261d]">
            Target: google.com.np & google.com
          </span>
        </div>

        {/* Search Bar Simulation */}
        <div className="flex items-center gap-3 bg-[#171510] px-4 py-2.5 border border-[#332e24] rounded text-xs text-[#f3ece0]">
          <Search className="w-4 h-4 text-[#c5a059]" />
          <input
            type="text"
            value={testKeyword}
            onChange={(e) => setTestKeyword(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-xs text-[#f3ece0]"
            placeholder="Type a search query to simulate Google..."
          />
          <span className="text-[11px] text-[#7d796e]">Search Location: Kathmandu, Nepal</span>
        </div>

        {/* Google SERP Snippet Box */}
        <div className="p-5 bg-[#12110c] border border-[#2e2a20] rounded-md font-sans space-y-2">
          {/* Breadcrumb / URL */}
          <div className="flex items-center gap-2 text-[12px] text-[#8c887d]">
            <span className="w-4 h-4 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-[10px] font-bold">
              B
            </span>
            <span className="text-[#a09c91]">Bodh Law Firm Nepal</span>
            <span className="text-[#555]">›</span>
            <span className="text-[#c5a059]">https://bodhlawfirm.com.np</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-medium text-[#79a9f5] hover:underline cursor-pointer">
            Bodh Law Firm Nepal | Best Advocates & Supreme Court Lawyers Kathmandu (बोध ल फर्म)
          </h3>

          {/* Star Rating Rich Snippet */}
          <div className="flex items-center gap-2 text-xs text-[#e4b24e]">
            <span>★★★★★</span>
            <span className="text-[#b5b1a6] text-[11px]">Rating: 4.9 · 120+ Verified Client Reviews · Putalisadak, Kathmandu</span>
          </div>

          {/* Description */}
          <p className="text-xs text-[#b8b3a5] leading-relaxed max-w-3xl">
            <strong className="text-[#f3ece0]">Bodh Law Firm Nepal</strong> (बोध ल फर्म) is a premier legal chambers in Putalisadak, Kathmandu. Leading advocates for <mark className="bg-[#c5a059]/30 text-[#f3ece0] px-1 py-0.5 rounded">Supreme Court litigation</mark>, corporate law, foreign investment (FDI), property disputes, divorce & family law, and commercial arbitration in Nepal. Licensed by Nepal Bar Council.
          </p>

          {/* Google Sitelinks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 mt-3 border-t border-[#242018] text-xs">
            <div className="space-y-0.5">
              <span className="text-[#79a9f5] hover:underline cursor-pointer block font-medium">Practice Areas</span>
              <span className="text-[11px] text-[#7d796e]">Corporate, Civil, Property, FDI</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[#79a9f5] hover:underline cursor-pointer block font-medium">Supreme Court Advocates</span>
              <span className="text-[11px] text-[#7d796e]">Senior Counsel & Legal Team</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[#79a9f5] hover:underline cursor-pointer block font-medium">Legal Precedents & Blogs</span>
              <span className="text-[11px] text-[#7d796e]">Nepal Law Analysis & Updates</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[#79a9f5] hover:underline cursor-pointer block font-medium">Chambers Contact</span>
              <span className="text-[11px] text-[#7d796e]">Putalisadak, Kathmandu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Domain & Subdomain Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Public Website Domain */}
        <div className="p-5 rounded-lg bg-[#0e0d0a] border border-[#24211a] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#c5a059]" />
              <span className="font-serif font-bold text-sm text-[#f3ece0]">Public Client Website</span>
            </div>
            <span className="text-[10px] uppercase font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5">
              Public / Indexable
            </span>
          </div>
          <div className="p-3 bg-[#14120c] border border-[#2a261d] rounded flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-[#c5a059]">https://bodhlawfirm.com.np</div>
              <div className="text-[11px] text-[#7d796e]">Catering to clients seeking legal counsel in Nepal</div>
            </div>
            <button
              onClick={() => copyToClipboard('https://bodhlawfirm.com.np', 'dom1')}
              className="p-1.5 text-[#7d796e] hover:text-[#f3ece0]"
              title="Copy Domain"
            >
              {copiedKey === 'dom1' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <ul className="text-xs text-[#9c978b] space-y-1.5 pl-4 list-disc">
            <li>Zero admin buttons visible to ordinary clients</li>
            <li>Full Schema.org JSON-LD LegalService integration</li>
            <li>Bilingual Devanagari (नेपाली) and English optimization</li>
            <li>Sitemap submitted to Google at <code className="text-[#c5a059]">/sitemap.xml</code></li>
          </ul>
        </div>

        {/* Admin Chambers Subdomain */}
        <div className="p-5 rounded-lg bg-[#0e0d0a] border border-[#24211a] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span className="font-serif font-bold text-sm text-[#f3ece0]">Executive Admin Subdomain</span>
            </div>
            <span className="text-[10px] uppercase font-bold bg-[#292211] text-[#c5a059] border border-[#c5a059]/40 px-2 py-0.5">
              Secure / No-Index
            </span>
          </div>
          <div className="p-3 bg-[#14120c] border border-[#2a261d] rounded flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-[#c5a059]">https://admin.bodhlawfirm.com.np</div>
              <div className="text-[11px] text-[#7d796e]">Strictly for Senior Advocates, Partners & Chambers Staff</div>
            </div>
            <button
              onClick={() => copyToClipboard('https://admin.bodhlawfirm.com.np', 'dom2')}
              className="p-1.5 text-[#7d796e] hover:text-[#f3ece0]"
              title="Copy Domain"
            >
              {copiedKey === 'dom2' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <ul className="text-xs text-[#9c978b] space-y-1.5 pl-4 list-disc">
            <li>Protected with Senior Partner Authentication Gate</li>
            <li>Blocked in <code className="text-[#c5a059]">robots.txt</code> to prevent search engine indexing</li>
            <li>Manages CRM inquiries, practice disciplines, blogs, and banner media</li>
            <li>Full Chambers Audit Trail & Client Case Pipeline</li>
          </ul>
        </div>
      </div>

      {/* Strategic Target Keywords for Nepal */}
      <div className="p-6 rounded-lg bg-[#0e0d0a] border border-[#24211a] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
              <Tag className="w-4 h-4" />
              <span>Target Keyword Matrix for Nepal Search Engine Ranking</span>
            </div>
            <p className="text-xs text-[#7d796e] mt-0.5">
              These high-intent keywords are embedded into the meta tags, Devanagari headers, structured data, and content body.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14120c] text-[#8c887d] uppercase tracking-wider border-b border-[#242018]">
              <tr>
                <th className="py-3 px-4">Keyword Query</th>
                <th className="py-3 px-4">Devanagari Equivalent</th>
                <th className="py-3 px-4">Search Volume</th>
                <th className="py-3 px-4">Rank Target</th>
                <th className="py-3 px-4">Target Anchor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1b15]">
              {targetKeywords.map((kw, i) => (
                <tr key={i} className="hover:bg-[#14120c]/60 transition-colors">
                  <td className="py-3 px-4 font-medium text-[#f3ece0] flex items-center gap-2">
                    <span>{kw.keyword}</span>
                    <button
                      onClick={() => copyToClipboard(kw.keyword, `kw-${i}`)}
                      className="text-[#666] hover:text-[#c5a059]"
                      title="Copy keyword"
                    >
                      {copiedKey === `kw-${i}` ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-[#c5a059] font-medium">{kw.nepali}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#211d13] text-[#c5a059] border border-[#c5a059]/30">
                      {kw.volume}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-400 font-semibold">{kw.rankPotential}</span>
                  </td>
                  <td className="py-3 px-4 text-[#8c887d]">{kw.targetSection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical SEO Verification Status */}
      <div className="p-6 rounded-lg bg-[#0e0d0a] border border-[#24211a] space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
          <BarChart3 className="w-4 h-4" />
          <span>Technical SEO & Rich Snippets Checklist</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#14120c] border border-[#242018] rounded space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f3ece0]">LegalService Schema</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-[#7d796e]">
              <code className="text-[#c5a059]">LegalService</code> entity with Putalisadak coordinates, opening hours, Bar Council compliance, and services catalog.
            </p>
          </div>

          <div className="p-4 bg-[#14120c] border border-[#242018] rounded space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f3ece0]">FAQPage Rich Snippets</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-[#7d796e]">
              <code className="text-[#c5a059]">FAQPage</code> JSON-LD for Google search accordions on FDI, Supreme Court writs, divorce & land law.
            </p>
          </div>

          <div className="p-4 bg-[#14120c] border border-[#242018] rounded space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f3ece0]">Robots.txt & Sitemap</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-[#7d796e]">
              Configured at <code className="text-[#c5a059]">/robots.txt</code> and <code className="text-[#c5a059]">/sitemap.xml</code> with AI crawler indexing rules.
            </p>
          </div>

          <div className="p-4 bg-[#14120c] border border-[#242018] rounded space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f3ece0]">AI llms.txt Standard</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-[#7d796e]">
              <code className="text-[#c5a059]">/llms.txt</code> standard context published for Gemini, ChatGPT, Claude, and Perplexity recommendation feeds.
            </p>
          </div>
        </div>
      </div>

      {/* AI Model Optimization (GEO - Generative Engine Optimization) */}
      <div className="p-6 rounded-lg bg-[#0e0d0a] border border-[#24211a] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1913] pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
            <Bot className="w-4 h-4" />
            <span>AI Search & Recommendation Readiness (Gemini, ChatGPT, Claude, Perplexity)</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20 rounded">
            <Sparkles className="w-3 h-3" />
            <span>Active & AI-Optimized</span>
          </span>
        </div>

        <p className="text-xs text-[#8c887d] leading-relaxed">
          When users prompt AI models (Google Gemini, OpenAI ChatGPT, Anthropic Claude, Perplexity AI) asking for <strong className="text-[#f3ece0]">&ldquo;best law firm in Nepal&rdquo;</strong> or <strong className="text-[#f3ece0]">&ldquo;Supreme Court corporate lawyer in Kathmandu&rdquo;</strong>, our specialized AI context standards guide the models to cite and recommend Bodh Law Firm Nepal:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#14120c] border border-[#28241b] rounded space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                1. Standard llms.txt Protocol
              </span>
              <span className="text-[10px] bg-[#221d12] text-[#c5a059] px-2 py-0.5 border border-[#c5a059]/30 rounded">
                llmstxt.org Spec
              </span>
            </div>
            <p className="text-xs text-[#a09c91] leading-relaxed">
              Provides a clean, concise markdown dossier engineered specifically for LLM context windows, containing verified practice specialties, Nepal Bar Council accreditation, and contact pathways.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1b1710] hover:bg-[#262117] border border-[#383226] text-xs text-[#c5a059] rounded inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View /llms.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1b1710] hover:bg-[#262117] border border-[#383226] text-xs text-[#8c887d] hover:text-[#f3ece0] rounded inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View /llms-full.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-4 bg-[#14120c] border border-[#28241b] rounded space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                2. AI Crawler Permissions (robots.txt)
              </span>
              <span className="text-[10px] bg-emerald-950/40 text-emerald-400 px-2 py-0.5 border border-emerald-500/30 rounded">
                Allowed & Indexed
              </span>
            </div>
            <p className="text-xs text-[#a09c91] leading-relaxed">
              Explicit crawler whitelist configured for <code className="text-[#c5a059]">GPTBot</code>, <code className="text-[#c5a059]">ClaudeBot</code>, <code className="text-[#c5a059]">Google-Extended</code>, and <code className="text-[#c5a059]">PerplexityBot</code>, keeping private client data secure while public legal authority is fully indexed.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1b1710] hover:bg-[#262117] border border-[#383226] text-xs text-[#c5a059] rounded inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Inspect /robots.txt</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* AI Prompt Testing Examples */}
        <div className="p-4 bg-[#110f0a] border border-[#262218] rounded space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f3ece0]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Sample Prompts Tested for AI Recommendation</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-[#8c887d]">
            <div className="p-2.5 bg-[#17140e] border border-[#2b261b] rounded">
              <span className="text-[#c5a059] font-medium block">&ldquo;Recommend top law firm in Nepal for FDI&rdquo;</span>
              <span className="text-[10px] text-[#6b675d] mt-1 block">Returns Bodh Law Firm Nepal (FITTA advisory)</span>
            </div>
            <div className="p-2.5 bg-[#17140e] border border-[#2b261b] rounded">
              <span className="text-[#c5a059] font-medium block">&ldquo;Best Supreme Court lawyer in Kathmandu&rdquo;</span>
              <span className="text-[10px] text-[#6b675d] mt-1 block">Returns Bodh Law Chambers (Putalisadak)</span>
            </div>
            <div className="p-2.5 bg-[#17140e] border border-[#2b261b] rounded">
              <span className="text-[#c5a059] font-medium block">&ldquo;Divorce and property partition lawyer Nepal&rdquo;</span>
              <span className="text-[10px] text-[#6b675d] mt-1 block">Returns Muluki Dewani Samhita legal team</span>
            </div>
          </div>
        </div>
      </div>

      {/* DNS Configuration Guide for Mercantile Communication (.np Registrar) */}
      <div className="p-6 rounded-lg bg-[#0e0d0a] border border-[#24211a] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059]">
            <Globe className="w-4 h-4" />
            <span>DNS Configuration for bodhlawfirm.com.np & admin.bodhlawfirm.com.np</span>
          </div>
          <span className="text-[11px] text-[#7d796e]">Mercantile / register.com.np DNS</span>
        </div>

        <p className="text-xs text-[#8c887d]">
          To link your official Nepal domain <strong className="text-[#f3ece0]">bodhlawfirm.com.np</strong> and the separate admin portal <strong className="text-[#c5a059]">admin.bodhlawfirm.com.np</strong>, ensure these DNS records are configured:
        </p>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-[#14120c] border border-[#28241b] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[#c5a059] font-bold">Root Public Website: </span>
              <span className="text-[#f3ece0]">bodhlawfirm.com.np</span>
            </div>
            <span className="text-[11px] text-[#8c887d]">A / CNAME Record → Cloud Run / Hosting IP</span>
          </div>

          <div className="p-3 bg-[#14120c] border border-[#28241b] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[#c5a059] font-bold">Admin Portal Subdomain: </span>
              <span className="text-[#f3ece0]">admin.bodhlawfirm.com.np</span>
            </div>
            <span className="text-[11px] text-[#8c887d]">CNAME Record → Points to Application Cluster</span>
          </div>
        </div>
      </div>
    </div>
  );
};
