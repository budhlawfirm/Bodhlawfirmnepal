import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  MessageSquare,
  Search,
  Share2,
  Sparkles,
  Tag,
  User
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { BlogPost } from '../types';

interface BlogsPageProps {
  blogs: BlogPost[];
  onReadBlog: (blog: BlogPost) => void;
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({
  blogs,
  onReadBlog,
  onNavigate,
  onOpenConsultation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories extraction
  const categories = useMemo(() => {
    return [
      'All',
      ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))
    ];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (!matchesSearch) return false;
      if (selectedCategory !== 'All' && blog.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [blogs, searchTerm, selectedCategory]);

  // Featured article is the first article or one with highest read time
  const featuredArticle = blogs[0];

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#060606] border-b border-[#24211a] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-[#8c887d] mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#c5a059] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#c5a059]">Blogs & Legal Insights</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1a1710] border border-[#c5a059]/40 text-[11px] text-[#c5a059] font-medium tracking-wider uppercase mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>KNOWLEDGE BASE & NEPAL LEGAL DIGEST</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3ece0] font-normal tracking-tight">
                Legal Insights & Articles
              </h1>
              <p className="text-sm sm:text-base text-[#bcb7ab] max-w-2xl mt-4 leading-relaxed">
                Supreme Court precedents, Foreign Direct Investment policies, Company Act commentaries, and tax dispute analyses written by Bodh Law Firm advocates.
              </p>
            </div>

            <div className="bg-[#12100a] border border-[#c5a059]/40 p-4 rounded shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#c5a059]" />
                <div>
                  <div className="text-xl font-serif text-[#f3ece0] font-bold">
                    {blogs.length} Published Articles
                  </div>
                  <div className="text-[11px] text-[#a39f93]">
                    Updated Weekly by Advocates
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Pills */}
          <div className="mt-10 pt-8 border-t border-[#1f1b15] flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#7d796f] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title, keyword, or author..."
                className="w-full bg-[#0e0c08] border border-[#2b271e] focus:border-[#c5a059] pl-9 pr-4 py-2 text-xs text-[#f3ece0] placeholder:text-[#6b675d] outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#c5a059] text-black font-semibold'
                      : 'bg-[#12100a] text-[#8c887d] hover:text-white border border-[#242018]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Landmark Article Section */}
      {featuredArticle && selectedCategory === 'All' && searchTerm === '' && (
        <section className="py-12 bg-[#0a0907] border-b border-[#24211a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-[11px] uppercase tracking-widest text-[#c5a059] font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED LEGAL BRIEFING</span>
            </div>

            <div
              onClick={() => onReadBlog(featuredArticle)}
              className="bg-[#0e0d0b] border border-[#332e24] hover:border-[#c5a059] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 cursor-pointer group"
            >
              <div className="lg:col-span-6 aspect-[16/10] overflow-hidden bg-[#16140e] relative">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#080808]/90 backdrop-blur-sm border border-[#c5a059]/40 text-xs text-[#c5a059] px-3 py-1 rounded font-medium">
                  {featuredArticle.category}
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#7d796f] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                      {featuredArticle.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[#f3ece0] font-normal leading-snug group-hover:text-[#c5a059] transition-colors mb-4">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#a39f93] leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  {featuredArticle.tags && featuredArticle.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredArticle.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2.5 py-1 rounded bg-[#16140e] border border-[#2b271d] text-[#b8b3a7] flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3 text-[#c5a059]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#1c1811] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.authorPhoto}
                      alt={featuredArticle.authorName}
                      className="w-9 h-9 rounded-full object-cover border border-[#c5a059]/40"
                    />
                    <div>
                      <div className="text-xs text-[#f3ece0] font-medium">
                        {featuredArticle.authorName}
                      </div>
                      <div className="text-[10px] text-[#7d796f]">
                        {featuredArticle.authorRole}
                      </div>
                    </div>
                  </div>

                  <div className="text-[#c5a059] flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Read Full Briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-[#080808] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-[#f3ece0]">
              {selectedCategory === 'All'
                ? 'All Published Legal Articles'
                : `${selectedCategory} Articles`}
              <span className="text-sm font-sans text-[#7d796f] ml-3">
                ({filteredBlogs.length} articles)
              </span>
            </h2>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-[#0e0d0b] border border-[#24211a]">
              <p className="text-[#a39f93] text-sm">
                No legal articles match your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 text-xs bg-[#c5a059] text-black font-semibold uppercase tracking-wider"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => onReadBlog(blog)}
                  className="bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer"
                  id={`blog-card-${blog.id}`}
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#16140e]">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#c5a059]/30 text-[10px] text-[#c5a059] px-2.5 py-1 rounded font-medium">
                        {blog.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[11px] text-[#7d796f] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#c5a059]" />
                          {blog.publishedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#c5a059]" />
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg text-[#f3ece0] font-normal mb-3 group-hover:text-[#c5a059] transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-[#9c988c] leading-relaxed line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {blog.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-[#16140e] text-[#8c887b] flex items-center gap-1"
                            >
                              <Tag className="w-2.5 h-2.5 text-[#c5a059]" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author & Read Action */}
                  <div className="p-6 pt-0 border-t border-[#1a1711] mt-auto flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 pt-3">
                      <img
                        src={blog.authorPhoto}
                        alt={blog.authorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] text-[#a39f93]">
                        {blog.authorName}
                      </span>
                    </div>

                    <div className="text-[#c5a059] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium pt-3 text-[11px]">
                      <span>Read Article</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-16 bg-[#0a0907] border-b border-[#24211a] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 space-y-4">
          <h2 className="font-serif text-3xl text-[#f3ece0]">
            Need Clarification on Any Recent Statutory Ruling?
          </h2>
          <p className="text-xs sm:text-sm text-[#8c887d] leading-relaxed">
            Our authors and advocates provide tailored corporate consultations regarding Nepalese statutory updates, foreign investment compliance, and tax litigation.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
            >
              Book Legal Consultation
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
            >
              Contact Chambers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
