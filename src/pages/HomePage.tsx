import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  MessageSquare,
  Phone,
  Shield,
  Tag,
  Users
} from 'lucide-react';
import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { Hero } from '../components/Hero';
import { NepalMountainRange } from '../components/NepalMountainRange';
import { Pillars } from '../components/Pillars';
import { PracticeAreasSection } from '../components/PracticeAreasSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  BlogPost,
  ContactInfo,
  PracticeArea,
  SiteContent,
  TeamMember,
  Testimonial
} from '../types';

interface HomePageProps {
  content: SiteContent;
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: (prefillArea?: string) => void;
  onSelectPracticeArea: (area: PracticeArea) => void;
  onReadBlog: (blog: BlogPost) => void;
  onConsultTeamMember: (member: TeamMember) => void;
  onOpenReviewModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  content,
  practiceAreas,
  teamMembers,
  blogs,
  testimonials,
  onNavigate,
  onOpenConsultation,
  onSelectPracticeArea,
  onReadBlog,
  onConsultTeamMember,
  onOpenReviewModal
}) => {
  // Take top 3 featured blogs for homepage preview
  const featuredBlogs = blogs.slice(0, 3);
  // Take top 4 team members for homepage preview
  const previewTeam = teamMembers.slice(0, 4);

  return (
    <div className="animate-in fade-in duration-300">
      {/* 1. Hero Section (Mockup 1 matching) */}
      <Hero
        content={content.hero}
        onConsultNow={() => onOpenConsultation()}
        onContactUs={() => onNavigate('contact')}
        onExploreServices={() => onNavigate('practice-areas')}
      />

      {/* 2. Four Core Pillars */}
      <Pillars pillars={content.pillars} />

      {/* 3. About Us Preview */}
      <div className="relative">
        <AboutSection
          content={content.about}
          onConsultNow={() => onOpenConsultation()}
          onLearnMore={() => onNavigate('about')}
          onNavigateToTeam={() => onNavigate('team')}
        />
        {/* Banner to view full About page */}
        <div className="bg-[#0b0a08] border-b border-[#24211a] py-4 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#a39f93]">
              Discover our 12+ years of legal advocacy, courtroom presence, and institutional philosophy.
            </span>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 text-[#c5a059] hover:text-[#f3ece0] font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              <span>Explore Firm History & Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Practice Areas Preview (Mockup 2 matching) */}
      <div className="relative">
        <PracticeAreasSection
          practiceAreas={practiceAreas}
          onSelectArea={(area) => onSelectPracticeArea(area)}
          onSelectPracticeArea={(area) => onSelectPracticeArea(area)}
          onConsultPracticeArea={(area) => onOpenConsultation(area.title)}
          onViewAllServices={() => onNavigate('practice-areas')}
        />
        {/* Link to full Practice Areas Page */}
        <div className="bg-[#0b0a08] border-b border-[#24211a] py-4 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#a39f93]">
              Need specialized assistance in Corporate, Arbitration, Banking, FDI, or Intellectual Property?
            </span>
            <button
              onClick={() => onNavigate('practice-areas')}
              className="inline-flex items-center gap-2 text-[#c5a059] hover:text-[#f3ece0] font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              <span>View All Practice Areas & Sub-sections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Nepal Mountain Range Heritage Showcase (Replacing Stats) */}
      <NepalMountainRange data={content.mountainRange} />

      {/* 6. Legal Team Preview Section */}
      <section className="py-20 bg-[#080808] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] text-[#c5a059] font-medium uppercase mb-3">
                OUR ADVOCATES & ATTORNEYS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ece0] font-normal tracking-tight">
                Senior Advocates & Legal Counsel
              </h2>
            </div>
            <button
              onClick={() => onNavigate('team')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-200"
            >
              <span>Meet Full Legal Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewTeam.map((member) => (
              <div
                key={member.id}
                className="bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059]/60 transition-all duration-300 group overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/5] overflow-hidden bg-[#16140e] relative">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover filter brightness-[0.9] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#c5a059]/30 text-[10px] text-[#c5a059] px-2 py-0.5 font-medium rounded">
                      {member.barRegistration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-[#f3ece0] group-hover:text-[#c5a059] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#c5a059] font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#8c887d] line-clamp-2">
                      {member.bio}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0 border-t border-[#1a1711] mt-auto">
                  <button
                    onClick={() => onConsultTeamMember(member)}
                    className="w-full mt-3 py-2 text-xs text-center font-medium border border-[#332f26] hover:border-[#c5a059] hover:text-[#c5a059] text-[#b8b3a7] transition-colors"
                  >
                    Consult Directly
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Client Reviews / Testimonials (Mockup 2 matching) */}
      <TestimonialsSection
        testimonials={testimonials}
        onAddReviewPrompt={onOpenReviewModal}
      />

      {/* 8. PROMINENT BLOGS & LEGAL INSIGHTS PREVIEW */}
      <section className="py-20 lg:py-24 bg-[#080808] border-b border-[#24211a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1c1810] border border-[#c5a059]/30 text-[10px] text-[#c5a059] font-semibold tracking-wider uppercase mb-3">
                <BookOpen className="w-3 h-3" />
                <span>Knowledge & Nepalese Law Digest</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ece0] font-normal tracking-tight">
                Latest Legal Insights & Blogs
              </h2>
              <p className="text-xs sm:text-sm text-[#8c887d] mt-2 max-w-xl">
                Supreme Court precedents, Foreign Direct Investment regulations, and statutory corporate analyses written by our advocates.
              </p>
            </div>
            <button
              onClick={() => onNavigate('blogs')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors shrink-0 shadow-lg shadow-[#c5a059]/10"
              id="home-view-all-blogs-btn"
            >
              <span>Explore All Blogs ({blogs.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => onReadBlog(blog)}
                className="bg-[#0c0b09] border border-[#24211a] hover:border-[#c5a059] transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer"
              >
                <div>
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
                        {blog.tags.slice(0, 2).map((tag, tIdx) => (
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

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('blogs')}
              className="inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-wider border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-200"
            >
              <span>Visit Dedicated Blogs & Legal Digest Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Direct Quick Action Consultation Banner */}
      <section className="py-16 bg-gradient-to-r from-[#14110b] via-[#1c1810] to-[#14110b] border-b border-[#2e2920]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium">
              NEED LEGAL ASSISTANCE IN KATHMANDU OR ACROSS NEPAL?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f3ece0] font-normal">
              Schedule a Privileged Case Evaluation
            </h2>
            <p className="text-xs sm:text-sm text-[#a39f93] max-w-xl">
              Strict legal privilege and attorney-client confidentiality guaranteed under Nepal Legal Practitioners Act.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-black hover:bg-[#d4b050] transition-colors"
            >
              Book Consultation Now
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors"
            >
              Contact Chambers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
