import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Plus,
  Save,
  Tag,
  Trash2,
  User,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { deleteBlog, saveBlog } from '../../services/storage';
import { BlogPost } from '../../types';
import { ImageUploadInput } from '../components/ImageUploadInput';
import { RichTextEditor } from '../components/RichTextEditor';

interface BlogsTabProps {
  blogs: BlogPost[];
  onRefresh: () => Promise<void>;
}

export const BlogsTab: React.FC<BlogsTabProps> = ({ blogs, onRefresh }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(blogs[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Corporate Law');
  const [publishedDate, setPublishedDate] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [authorName, setAuthorName] = useState('Adv. Pradeep K. Sharma');
  const [authorRole, setAuthorRole] = useState('Senior Advocate');
  const [authorPhoto, setAuthorPhoto] = useState('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80');
  const [coverImage, setCoverImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [keywords, setKeywords] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const handleSelectBlog = (b: BlogPost) => {
    setSelectedBlog(b);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleStartEdit = (b: BlogPost) => {
    setTitle(b.title);
    setSlug(b.slug);
    setCategory(b.category);
    setPublishedDate(b.publishedDate);
    setReadTime(b.readTime);
    setAuthorName(b.authorName);
    setAuthorRole(b.authorRole);
    setAuthorPhoto(b.authorPhoto);
    setCoverImage(b.coverImage);
    setExcerpt(b.excerpt);
    setContent(b.content);
    setTags(b.tags?.join(', ') || '');
    setKeywords(b.keywords?.join(', ') || '');
    setMetaDescription(b.metaDescription || '');
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    setTitle('');
    setSlug('');
    setCategory('Corporate Law');
    setPublishedDate(today);
    setReadTime('6 min read');
    setAuthorName('Adv. Pradeep K. Sharma');
    setAuthorRole('Senior Advocate & Managing Partner');
    setAuthorPhoto('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80');
    setCoverImage('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80');
    setExcerpt('');
    setContent('');
    setTags('Nepal Law, Supreme Court, Precedent');
    setKeywords('Nepal Law Firm, Advocate Kathmandu, Legal Precedents, FDI Nepal');
    setMetaDescription('Comprehensive legal analysis on Nepal statutory frameworks and Supreme Court precedents by Bodh Law Chambers.');
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleSaveBlog = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please provide a title and article content.');
      return;
    }

    const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const keywordsArray = keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const blogToSave: BlogPost = {
      id: isCreating ? `blog-${Date.now()}` : selectedBlog!.id,
      title,
      slug: generatedSlug,
      category,
      publishedDate: publishedDate || 'Recent',
      readTime: readTime || '5 min read',
      authorName,
      authorRole,
      authorPhoto,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
      excerpt,
      content,
      tags: tagsArray,
      keywords: keywordsArray,
      metaDescription: metaDescription.trim() || excerpt.slice(0, 160)
    };

    await saveBlog(blogToSave);
    await onRefresh();
    setSelectedBlog(blogToSave);
    setIsEditing(false);
    setIsCreating(false);
    setStatusMessage('Legal insight article published.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this legal article?')) {
      await deleteBlog(id);
      await onRefresh();
      setSelectedBlog(blogs.find((b) => b.id !== id) || null);
      setStatusMessage('Article removed.');
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
            Legal Insights & Supreme Court Precedents
          </h3>
          <p className="text-xs text-[#8c887d] mt-1">
            Publish thought-leadership articles, statutory reforms, case commentaries, and legal guides.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Articles List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-[#8c887d] uppercase tracking-wider mb-2">
            Published Insights ({blogs.length})
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {blogs.map((blog) => {
              const isSelected = selectedBlog?.id === blog.id;
              return (
                <div
                  key={blog.id}
                  onClick={() => handleSelectBlog(blog)}
                  className={`p-3 border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#18150f] border-[#c5a059] text-white'
                      : 'bg-[#0c0b09] border-[#242018] text-[#c9c5ba] hover:border-[#383327]'
                  }`}
                >
                  <div className="text-[10px] text-[#c5a059] font-medium uppercase tracking-wider">
                    {blog.category}
                  </div>
                  <div className="font-serif text-sm font-semibold truncate text-[#f3ece0] mt-0.5">
                    {blog.title}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[#7d796e] mt-2">
                    <span>{blog.publishedDate}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Blog Details / Edit Form */}
        <div className="lg:col-span-8 bg-[#0c0b09] border border-[#24211a] p-6 space-y-6">
          {isEditing || isCreating ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#211e17]">
                <h4 className="font-serif text-base text-[#f3ece0]">
                  {isCreating ? 'Publish New Legal Article' : `Edit: ${selectedBlog?.title}`}
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

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                  Article Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Navigating Foreign Direct Investment Regulations in Nepal (2026 Update)"
                  className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Corporate Law, FDI, Arbitration"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                    placeholder="e.g. Oct 12, 2026"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 6 min read"
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              {/* Cover Image Input with Curated Picker */}
              <ImageUploadInput
                label="Article Cover Photo (Upload or Select)"
                value={coverImage}
                onChange={(url) => setCoverImage(url)}
                categoryFilter="blogs"
                helperText="Upload custom image or select legal imagery representing the article subject."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                    Author Designation
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                  Brief Abstract / Excerpt (Card & Homepage Preview)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Key summary of the statutory review or case precedent..."
                  className="w-full bg-[#12100a] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed"
                />
              </div>

              {/* MS Word Rich Text Editor for Content */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Complete Legal Article Content (MS Word Support)
                  </label>
                  <span className="text-[11px] text-[#7d796f]">
                    Copy & Paste directly from MS Word or Google Docs
                  </span>
                </div>
                <RichTextEditor value={content} onChange={setContent} />
              </div>

              {/* SEO & Tags Section */}
              <div className="bg-[#12100a] border border-[#26221a] p-4 rounded-lg space-y-4 mt-6">
                <div className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#24211a] pb-2">
                  <Tag className="w-4 h-4" />
                  SEO, Keywords & Article Categorization Tags
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Article Tags */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="FDI, Nepal Rastra Bank, Industry, Commercial Court"
                      className="w-full bg-[#0a0907] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                    />
                    {tags && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {tags.split(',').map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#1a1710] border border-[#383327] text-[#c5a059] px-2 py-0.5 rounded"
                          >
                            #{t.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SEO Keywords */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                      SEO Search Keywords (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Advocate Kathmandu, Legal Advice Nepal, Supreme Court Precedent"
                      className="w-full bg-[#0a0907] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none"
                    />
                    {keywords && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {keywords.split(',').map((k, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#14120e] border border-[#29251d] text-[#a39f93] px-2 py-0.5 rounded"
                          >
                            🔍 {k.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* SEO Meta Description */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-[#f3ece0] uppercase">
                      Search Engine Meta Description
                    </label>
                    <span className="text-[10px] text-[#7d796f]">
                      {metaDescription.length} / 160 recommended characters
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Short meta description shown in Google search results (150-160 characters)..."
                    className="w-full bg-[#0a0907] border border-[#2b271e] focus:border-[#c5a059] px-3 py-2 text-xs text-[#f3ece0] outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={handleSaveBlog}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </div>
            </div>
          ) : selectedBlog ? (
            /* Selected Blog Overview */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-[#211e17]">
                <div>
                  <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                    {selectedBlog.category}
                  </span>
                  <h4 className="font-serif text-2xl text-[#f3ece0] mt-1">
                    {selectedBlog.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-[#8c887d] mt-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                      {selectedBlog.publishedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      {selectedBlog.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#c5a059]" />
                      {selectedBlog.authorName} ({selectedBlog.authorRole})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(selectedBlog)}
                    className="px-3 py-1.5 text-xs font-medium bg-[#1a1711] text-[#c5a059] border border-[#3b3426] hover:bg-[#252016]"
                  >
                    Edit Article
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(selectedBlog.id)}
                    className="p-1.5 text-[#e57373] hover:bg-[#201010] border border-transparent hover:border-[#521c1c]"
                    title="Delete Article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cover Image Preview */}
              {selectedBlog.coverImage && (
                <div className="aspect-[21/9] rounded overflow-hidden border border-[#2b271e]">
                  <img
                    src={selectedBlog.coverImage}
                    alt={selectedBlog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#a39f93] uppercase tracking-wider">
                  Executive Excerpt
                </div>
                <div className="text-xs text-[#f3ece0] bg-[#0f0e0b] p-3 border border-[#211e17] leading-relaxed italic">
                  &ldquo;{selectedBlog.excerpt}&rdquo;
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#a39f93] uppercase tracking-wider">
                  Full Article Content
                </div>
                <div className="text-xs text-[#c9c5ba] leading-relaxed bg-[#0a0907] p-4 border border-[#211e17] max-h-60 overflow-y-auto whitespace-pre-line">
                  {selectedBlog.content}
                </div>
              </div>

              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedBlog.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] bg-[#14120e] text-[#8c887d] px-2.5 py-1 border border-[#26221a]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#7a766c]">
              Select an article to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
