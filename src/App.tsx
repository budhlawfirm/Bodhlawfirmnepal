import React, { useEffect, useState } from "react";
import { AdminPanel } from "./admin/AdminPanel";
import { BlogDetailModal } from "./components/BlogDetailModal";
import { ConsultationModal } from "./components/ConsultationModal";
import { FloatingContactWidget } from "./components/FloatingContactWidget";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { PracticeAreaDetailModal } from "./components/PracticeAreaDetailModal";
import { SubmitReviewModal } from "./components/SubmitReviewModal";
import {
  initialBlogs,
  initialPracticeAreas,
  initialSiteContent,
  initialTeamMembers,
  initialTestimonials,
} from "./data/initialData";
import { AboutPage } from "./pages/AboutPage";
import { BlogsPage } from "./pages/BlogsPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { LegalFaqsPage } from "./pages/LegalFaqsPage";
import { PracticeAreasPage } from "./pages/PracticeAreasPage";
import { TeamPage } from "./pages/TeamPage";
import { loadSiteData } from "./services/storage";
import {
  BlogPost,
  ContactInquiry,
  PracticeArea,
  SiteContent,
  TeamMember,
  Testimonial,
} from "./types";

export function App() {
  const [loading, setLoading] = useState(true);

  // Core Data initialized with complete legal firm data
  const [content, setContent] = useState<SiteContent>(initialSiteContent);
  const [practiceAreas, setPracticeAreas] =
    useState<PracticeArea[]>(initialPracticeAreas);
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(initialTestimonials);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Page Routing & Navigation state
  const validPages = [
    "home",
    "about",
    "practice-areas",
    "team",
    "blogs",
    "contact",
    "faqs",
    "admin",
  ];

  const getInitialPage = () => {
    const path = window.location.pathname.replace(/^\//, "").toLowerCase().replace(/\/$/, "");
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (validPages.includes(path)) return path;
    if (validPages.includes(hash)) return hash;
    return "home";
  };

  const initialPage = getInitialPage();
  const [activeSection, setActiveSection] = useState<string>(
    initialPage === "admin" ? "home" : initialPage,
  );

  // Subdomain and path detection for dedicated admin portal
  const checkIsAdminSubdomain = () => {
    const host = window.location.hostname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");
    const search = window.location.search.toLowerCase();
    return (
      host === "admin.bodhlawfirm.com.np" ||
      host.startsWith("admin.") ||
      hash === "#admin" ||
      pathname === "/admin" ||
      pathname.startsWith("/admin/") ||
      search.includes("admin=true")
    );
  };

  const [isAdminPortalActive, setIsAdminPortalActive] = useState<boolean>(() =>
    checkIsAdminSubdomain(),
  );
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedPracticeArea, setSelectedPracticeArea] =
    useState<PracticeArea | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [consultationPrefillArea, setConsultationPrefillArea] =
    useState<string>("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Synchronize route URL paths & listen for partner shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const path = window.location.pathname.replace(/^\//, "").toLowerCase().replace(/\/$/, "");
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const route = validPages.includes(path) ? path : validPages.includes(hash) ? hash : "home";

      if (route === "admin" || checkIsAdminSubdomain()) {
        setIsAdminPortalActive(true);
      } else {
        setIsAdminPortalActive(false);
        setActiveSection(route);
      }
    };

    // Secret Chambers Partner keyboard shortcut (Ctrl+Shift+A or Alt+A) to access admin portal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") ||
        (e.altKey && e.key.toLowerCase() === "a")
      ) {
        e.preventDefault();
        setIsAdminPortalActive((prev) => {
          const nextState = !prev;
          const newPath = nextState ? "/admin" : activeSection === "home" ? "/" : `/${activeSection}`;
          window.history.pushState(null, "", newPath);
          return nextState;
        });
      }
    };

    window.addEventListener("popstate", syncRouteFromUrl);
    window.addEventListener("hashchange", syncRouteFromUrl);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("popstate", syncRouteFromUrl);
      window.removeEventListener("hashchange", syncRouteFromUrl);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection]);

  // Initial Load
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await loadSiteData();
      setContent(data.content);
      setPracticeAreas(data.practiceAreas);
      setTeamMembers(data.teamMembers);
      setBlogs(data.blogs);
      setTestimonials(data.testimonials);
      setInquiries(data.inquiries);
    } catch (err) {
      console.error("Failed to load law firm site data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (pageId: string) => {
    const target = validPages.includes(pageId) ? pageId : "home";
    if (target === "admin") {
      setIsAdminPortalActive(true);
      window.history.pushState(null, "", "/admin");
    } else {
      setIsAdminPortalActive(false);
      setActiveSection(target);
      const newPath = target === "home" ? "/" : `/${target}`;
      window.history.pushState(null, "", newPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenConsultation = (areaTitle?: string) => {
    setConsultationPrefillArea(areaTitle || "");
    setIsConsultationModalOpen(true);
  };

  const handleConsultMember = (member: TeamMember) => {
    setConsultationPrefillArea(
      `Consultation with ${member.name} (${member.role})`,
    );
    setIsConsultationModalOpen(true);
  };

  if (loading && !isAdminPortalActive) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium font-serif">
            BODH LAW FIRM NEPAL
          </p>
          <p className="text-xs text-[#7d796f]">
            Loading legal counsel repository...
          </p>
        </div>
      </div>
    );
  }

  // If current host is admin.bodhlawfirm.com.np or admin portal is active, render dedicated Chambers Administration
  if (isAdminPortalActive) {
    return (
      <AdminPanel
        content={content}
        practiceAreas={practiceAreas}
        teamMembers={teamMembers}
        blogs={blogs}
        testimonials={testimonials}
        inquiries={inquiries}
        onRefreshData={fetchData}
        onClose={() => {
          if (window.location.hostname === "admin.bodhlawfirm.com.np") {
            window.location.href = "https://bodhlawfirm.com.np";
          } else {
            setIsAdminPortalActive(false);
            const newPath = activeSection === "home" ? "/" : `/${activeSection}`;
            window.history.pushState(null, "", newPath);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f3ece0] font-sans antialiased selection:bg-[#c5a059] selection:text-black flex flex-col justify-between">
      {/* Primary Navigation Bar (Public Client View - No Admin Buttons) */}
      <div>
        <Navbar
          activeSection={activeSection}
          practiceAreas={practiceAreas}
          onNavigate={handleNavigate}
          onSelectPracticeArea={(area) => {
            setSelectedPracticeArea(area);
            handleNavigate("practice-areas");
          }}
          onOpenConsultationModal={() => handleOpenConsultation()}
          contactInfo={content.contactInfo}
        />

        {/* Dedicated Page Views */}
        <main>
          {activeSection === "home" && (
            <HomePage
              content={content}
              practiceAreas={practiceAreas}
              teamMembers={teamMembers}
              blogs={blogs}
              testimonials={testimonials}
              onNavigate={handleNavigate}
              onOpenConsultation={handleOpenConsultation}
              onSelectPracticeArea={(area) => setSelectedPracticeArea(area)}
              onReadBlog={(blog) => setSelectedBlog(blog)}
              onConsultTeamMember={handleConsultMember}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
            />
          )}

          {activeSection === "about" && (
            <AboutPage
              content={content}
              teamMembers={teamMembers}
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          )}

          {activeSection === "practice-areas" && (
            <PracticeAreasPage
              practiceAreas={practiceAreas}
              onSelectArea={(area) => setSelectedPracticeArea(area)}
              onConsultPracticeArea={(area) =>
                handleOpenConsultation(area.title)
              }
              onNavigate={handleNavigate}
            />
          )}

          {activeSection === "team" && (
            <TeamPage
              teamMembers={teamMembers}
              onConsultMember={handleConsultMember}
              onNavigate={handleNavigate}
            />
          )}

          {activeSection === "blogs" && (
            <BlogsPage
              blogs={blogs}
              onReadBlog={(blog) => setSelectedBlog(blog)}
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          )}

          {activeSection === "contact" && (
            <ContactPage
              contactInfo={content.contactInfo}
              practiceAreas={practiceAreas}
              prefilledPracticeArea={consultationPrefillArea}
              onNavigate={handleNavigate}
            />
          )}

          {activeSection === "faqs" && (
            <LegalFaqsPage
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          )}
        </main>
      </div>

      {/* Footer (Public Client View - No Admin Buttons) */}
      <Footer
        contactInfo={content.contactInfo}
        practiceAreas={practiceAreas}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Floating Multi-Channel Contact Widget (WhatsApp, Instagram, Phone, Mail) */}
      <FloatingContactWidget
        contactInfo={content.contactInfo}
        onOpenConsultationModal={() => handleOpenConsultation()}
      />

      {/* Consultation Request Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setConsultationPrefillArea("");
        }}
        practiceAreas={practiceAreas}
        contactInfo={content.contactInfo}
        initialPracticeArea={consultationPrefillArea}
      />

      {/* Practice Area Sub-sections Details Modal */}
      {selectedPracticeArea && (
        <PracticeAreaDetailModal
          practiceArea={selectedPracticeArea}
          onClose={() => setSelectedPracticeArea(null)}
          onBookConsultation={(title) => handleOpenConsultation(title)}
        />
      )}

      {/* Full Blog Article Reader Modal */}
      {selectedBlog && (
        <BlogDetailModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          onBookConsultation={() =>
            handleOpenConsultation(selectedBlog.category)
          }
        />
      )}

      {/* Client Testimonial Submission Modal */}
      <SubmitReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        practiceAreas={practiceAreas}
        onReviewSubmitted={fetchData}
      />
    </div>
  );
}

export default App;
