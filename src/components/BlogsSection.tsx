import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react';
import React, { useState } from 'react';
import { BlogPost } from '../types';

interface BlogsSectionProps {
  blogs: BlogPost[];
  onReadBlog: (blog: BlogPost) => void;
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({ blogs, onReadBlog }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

  const filteredBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter(b => b.category === selectedCategory);

  return (
    <section id="blogs" className="py-20 lg:py-28 bg-[#080808] border-b border-[#24211a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p
              className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase mb-3"
              id="blogs-eyebrow"
            >
              LEGAL INSIGHTS & RESOURCES
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3ece0] font-normal tracking-tight"
              id="blogs-headline"
            >
              Legal Knowledge & Updates
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'bg-[#12100a] text-[#a39f93] hover:text-white border border-[#26231b]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => onReadBlog(blog)}
              className="bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer"
              id={`blog-card-${blog.id}`}
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#16140e]">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover filter brightness-[0.9] group-hover:scale-105 transition-transform duration-500"
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

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
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
                  <span className="text-[11px] text-[#a39f93]">{blog.authorName}</span>
                </div>

                <div className="text-[#c5a059] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium pt-3 text-[11px]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
