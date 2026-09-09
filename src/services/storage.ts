import {
  initialBlogs,
  initialContactInquiries,
  initialPracticeAreas,
  initialSiteContent,
  initialTeamMembers,
  initialTestimonials
} from '../data/initialData';
import {
  BlogPost,
  ContactInquiry,
  PracticeArea,
  PracticeSubSection,
  SiteContent,
  TeamMember,
  Testimonial
} from '../types';
import { getSupabaseClient } from './supabase';

const KEYS = {
  CONTENT: 'bodh_law_content',
  PRACTICE_AREAS: 'bodh_law_practice_areas',
  TEAM: 'bodh_law_team',
  BLOGS: 'bodh_law_blogs',
  TESTIMONIALS: 'bodh_law_testimonials',
  INQUIRIES: 'bodh_law_inquiries'
};

// --- Site Content ---
export async function getSiteContent(): Promise<SiteContent> {
  const mergeSafe = (data: Partial<SiteContent> | null | undefined): SiteContent => {
    if (!data || typeof data !== 'object') return initialSiteContent;
    return {
      ...initialSiteContent,
      ...data,
      hero: {
        ...initialSiteContent.hero,
        ...(data.hero || {}),
        sliderImages: Array.isArray(data.hero?.sliderImages) && data.hero.sliderImages.length > 0
          ? data.hero.sliderImages
          : initialSiteContent.hero.sliderImages,
        slideInterval: data.hero?.slideInterval || initialSiteContent.hero.slideInterval || 10
      },
      about: {
        ...initialSiteContent.about,
        ...(data.about || {})
      },
      pillars: Array.isArray(data.pillars) && data.pillars.length > 0
        ? data.pillars
        : initialSiteContent.pillars,
      stats: Array.isArray(data.stats) && data.stats.length > 0
        ? data.stats
        : initialSiteContent.stats,
      mountainRange: data.mountainRange
        ? {
            ...initialSiteContent.mountainRange!,
            ...data.mountainRange,
            peaks: Array.isArray(data.mountainRange.peaks) && data.mountainRange.peaks.length > 0
              ? data.mountainRange.peaks
              : initialSiteContent.mountainRange!.peaks
          }
        : initialSiteContent.mountainRange,
      contactInfo: {
        ...initialSiteContent.contactInfo,
        ...(data.contactInfo || {})
      }
    };
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('site_content')
        .select('data')
        .eq('id', 'main')
        .single();
      if (!error && data?.data) {
        const merged = mergeSafe(data.data);
        localStorage.setItem(KEYS.CONTENT, JSON.stringify(merged));
        return merged;
      }
    } catch (e) {
      console.warn('Supabase fetch site_content failed, using local storage cache:', e);
    }
  }

  const cached = localStorage.getItem(KEYS.CONTENT);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return mergeSafe(parsed);
    } catch {
      // ignore
    }
  }

  localStorage.setItem(KEYS.CONTENT, JSON.stringify(initialSiteContent));
  return initialSiteContent;
}


export async function saveSiteContent(content: SiteContent): Promise<void> {
  localStorage.setItem(KEYS.CONTENT, JSON.stringify(content));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client
        .from('site_content')
        .upsert({ id: 'main', data: content, updated_at: new Date().toISOString() });
    } catch (e) {
      console.warn('Supabase sync failed for site_content:', e);
    }
  }
}

// --- Practice Areas & Sub-sections ---
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('practice_areas')
        .select('*')
        .order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        const mapped: PracticeArea[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          icon: row.icon,
          shortDescription: row.short_description,
          fullDescription: row.full_description,
          subSections: row.sub_sections || [],
          featured: row.featured,
          order: row.order
        }));
        localStorage.setItem(KEYS.PRACTICE_AREAS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch practice_areas failed, using local cache:', e);
    }
  }

  const cached = localStorage.getItem(KEYS.PRACTICE_AREAS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  localStorage.setItem(KEYS.PRACTICE_AREAS, JSON.stringify(initialPracticeAreas));
  return initialPracticeAreas;
}

export async function savePracticeArea(area: PracticeArea): Promise<PracticeArea[]> {
  const areas = await getPracticeAreas();
  const existingIdx = areas.findIndex(a => a.id === area.id);
  let updated: PracticeArea[];

  if (existingIdx >= 0) {
    updated = [...areas];
    updated[existingIdx] = area;
  } else {
    updated = [...areas, area];
  }

  localStorage.setItem(KEYS.PRACTICE_AREAS, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('practice_areas').upsert({
        id: area.id,
        title: area.title,
        slug: area.slug,
        icon: area.icon,
        short_description: area.shortDescription,
        full_description: area.fullDescription,
        sub_sections: area.subSections,
        featured: area.featured,
        order: area.order
      });
    } catch (e) {
      console.warn('Supabase upsert practice_area failed:', e);
    }
  }

  return updated;
}

export async function deletePracticeArea(id: string): Promise<PracticeArea[]> {
  const areas = await getPracticeAreas();
  const updated = areas.filter(a => a.id !== id);
  localStorage.setItem(KEYS.PRACTICE_AREAS, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('practice_areas').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete practice_area failed:', e);
    }
  }

  return updated;
}

// Sub-section actions for dynamic sub-section management
export async function addSubSectionToPracticeArea(
  areaId: string,
  subSection: PracticeSubSection
): Promise<PracticeArea[]> {
  const areas = await getPracticeAreas();
  const area = areas.find(a => a.id === areaId);
  if (!area) return areas;

  const updatedArea: PracticeArea = {
    ...area,
    subSections: [...(area.subSections || []), subSection]
  };

  return savePracticeArea(updatedArea);
}

export async function updateSubSectionInPracticeArea(
  areaId: string,
  subSection: PracticeSubSection
): Promise<PracticeArea[]> {
  const areas = await getPracticeAreas();
  const area = areas.find(a => a.id === areaId);
  if (!area) return areas;

  const updatedSubs = (area.subSections || []).map(s =>
    s.id === subSection.id ? subSection : s
  );

  const updatedArea: PracticeArea = {
    ...area,
    subSections: updatedSubs
  };

  return savePracticeArea(updatedArea);
}

export async function deleteSubSectionFromPracticeArea(
  areaId: string,
  subSectionId: string
): Promise<PracticeArea[]> {
  const areas = await getPracticeAreas();
  const area = areas.find(a => a.id === areaId);
  if (!area) return areas;

  const updatedSubs = (area.subSections || []).filter(s => s.id !== subSectionId);
  const updatedArea: PracticeArea = {
    ...area,
    subSections: updatedSubs
  };

  return savePracticeArea(updatedArea);
}

// --- Team Members ---
export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('team_members')
        .select('*')
        .order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        const mapped: TeamMember[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          role: row.role,
          photo: row.photo,
          bio: row.bio,
          education: row.education,
          barRegistration: row.bar_registration,
          email: row.email,
          phone: row.phone,
          specializations: row.specializations || [],
          order: row.order
        }));
        localStorage.setItem(KEYS.TEAM, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch team_members failed:', e);
    }
  }

  const cached = localStorage.getItem(KEYS.TEAM);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  localStorage.setItem(KEYS.TEAM, JSON.stringify(initialTeamMembers));
  return initialTeamMembers;
}

export async function saveTeamMember(member: TeamMember): Promise<TeamMember[]> {
  const members = await getTeamMembers();
  const idx = members.findIndex(m => m.id === member.id);
  let updated: TeamMember[];

  if (idx >= 0) {
    updated = [...members];
    updated[idx] = member;
  } else {
    updated = [...members, member];
  }

  localStorage.setItem(KEYS.TEAM, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('team_members').upsert({
        id: member.id,
        name: member.name,
        role: member.role,
        photo: member.photo,
        bio: member.bio,
        education: member.education,
        bar_registration: member.barRegistration,
        email: member.email,
        phone: member.phone,
        specializations: member.specializations,
        order: member.order
      });
    } catch (e) {
      console.warn('Supabase upsert team_member failed:', e);
    }
  }

  return updated;
}

export async function deleteTeamMember(id: string): Promise<TeamMember[]> {
  const members = await getTeamMembers();
  const updated = members.filter(m => m.id !== id);
  localStorage.setItem(KEYS.TEAM, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('team_members').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete team_member failed:', e);
    }
  }

  return updated;
}

// --- Blogs ---
export async function getBlogs(): Promise<BlogPost[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('blogs')
        .select('*')
        .order('published_date', { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped: BlogPost[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt,
          content: row.content,
          authorName: row.author_name,
          authorRole: row.author_role,
          authorPhoto: row.author_photo,
          coverImage: row.cover_image,
          category: row.category,
          publishedDate: row.published_date,
          readTime: row.read_time,
          tags: row.tags || [],
          keywords: row.keywords || [],
          metaDescription: row.meta_description || ''
        }));
        localStorage.setItem(KEYS.BLOGS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch blogs failed:', e);
    }
  }

  const cached = localStorage.getItem(KEYS.BLOGS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  localStorage.setItem(KEYS.BLOGS, JSON.stringify(initialBlogs));
  return initialBlogs;
}

export async function saveBlog(blog: BlogPost): Promise<BlogPost[]> {
  const blogs = await getBlogs();
  const idx = blogs.findIndex(b => b.id === blog.id);
  let updated: BlogPost[];

  if (idx >= 0) {
    updated = [...blogs];
    updated[idx] = blog;
  } else {
    updated = [blog, ...blogs];
  }

  localStorage.setItem(KEYS.BLOGS, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('blogs').upsert({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        author_name: blog.authorName,
        author_role: blog.authorRole,
        author_photo: blog.authorPhoto,
        cover_image: blog.coverImage,
        category: blog.category,
        published_date: blog.publishedDate,
        read_time: blog.readTime,
        tags: blog.tags,
        keywords: blog.keywords || [],
        meta_description: blog.metaDescription || ''
      });
    } catch (e) {
      console.warn('Supabase upsert blog failed:', e);
    }
  }

  return updated;
}

export async function deleteBlog(id: string): Promise<BlogPost[]> {
  const blogs = await getBlogs();
  const updated = blogs.filter(b => b.id !== id);
  localStorage.setItem(KEYS.BLOGS, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('blogs').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete blog failed:', e);
    }
  }

  return updated;
}

// --- Testimonials / User Reviews ---
export async function getTestimonials(): Promise<Testimonial[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from('testimonials').select('*');
      if (!error && data && data.length > 0) {
        const mapped: Testimonial[] = data.map((row: any) => ({
          id: row.id,
          clientName: row.client_name,
          clientTitle: row.client_title,
          clientPhoto: row.client_photo,
          quote: row.quote,
          rating: row.rating,
          practiceArea: row.practice_area
        }));
        localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch testimonials failed:', e);
    }
  }

  const cached = localStorage.getItem(KEYS.TESTIMONIALS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
  return initialTestimonials;
}

export async function saveTestimonial(testimonial: Testimonial): Promise<Testimonial[]> {
  const list = await getTestimonials();
  const idx = list.findIndex(t => t.id === testimonial.id);
  let updated: Testimonial[];

  if (idx >= 0) {
    updated = [...list];
    updated[idx] = testimonial;
  } else {
    updated = [...list, testimonial];
  }

  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('testimonials').upsert({
        id: testimonial.id,
        client_name: testimonial.clientName,
        client_title: testimonial.clientTitle,
        client_photo: testimonial.clientPhoto,
        quote: testimonial.quote,
        rating: testimonial.rating,
        practice_area: testimonial.practiceArea
      });
    } catch (e) {
      console.warn('Supabase upsert testimonial failed:', e);
    }
  }

  return updated;
}

export async function deleteTestimonial(id: string): Promise<Testimonial[]> {
  const list = await getTestimonials();
  const updated = list.filter(t => t.id !== id);
  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('testimonials').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete testimonial failed:', e);
    }
  }

  return updated;
}

export async function getInquiries(): Promise<ContactInquiry[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        const mapped: ContactInquiry[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          subject: row.subject,
          practiceArea: row.practice_area,
          message: row.message,
          preferredChannel: row.preferred_channel,
          status: row.status,
          createdAt: row.created_at
        }));
        localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetch inquiries failed:', e);
    }
  }

  const cached = localStorage.getItem(KEYS.INQUIRIES);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  // Return empty array — do NOT pollute CRM with demo data
  return [];
}

export async function addInquiry(
  inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>
): Promise<ContactInquiry> {
  const newInq: ContactInquiry = {
    ...inquiry,
    id: 'inq-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  const list = await getInquiries();
  const updated = [newInq, ...list];
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('contact_inquiries').insert({
        id: newInq.id,
        name: newInq.name,
        email: newInq.email,
        phone: newInq.phone,
        subject: newInq.subject,
        practice_area: newInq.practiceArea,
        message: newInq.message,
        preferred_channel: newInq.preferredChannel,
        status: newInq.status,
        created_at: newInq.createdAt
      });
    } catch (e) {
      console.warn('Supabase insert inquiry failed:', e);
    }
  }

  return newInq;
}

export async function updateInquiryStatus(
  id: string,
  status: ContactInquiry['status']
): Promise<ContactInquiry[]> {
  const list = await getInquiries();
  const updated = list.map(i => (i.id === id ? { ...i, status } : i));
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('contact_inquiries').update({ status }).eq('id', id);
    } catch (e) {
      console.warn('Supabase update inquiry status failed:', e);
    }
  }

  return updated;
}

export async function deleteInquiry(id: string): Promise<ContactInquiry[]> {
  const list = await getInquiries();
  const updated = list.filter(i => i.id !== id);
  localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(updated));

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('contact_inquiries').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete inquiry failed:', e);
    }
  }

  return updated;
}

// --- Reset to Defaults ---
export async function resetAllToDefaults(): Promise<void> {
  localStorage.setItem(KEYS.CONTENT, JSON.stringify(initialSiteContent));
  localStorage.setItem(KEYS.PRACTICE_AREAS, JSON.stringify(initialPracticeAreas));
  localStorage.setItem(KEYS.TEAM, JSON.stringify(initialTeamMembers));
  localStorage.setItem(KEYS.BLOGS, JSON.stringify(initialBlogs));
  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(initialTestimonials));
  localStorage.removeItem(KEYS.INQUIRIES);
}

// --- Combined Initial Loader (uses allSettled so partial failures don't break everything) ---
export async function loadSiteData(): Promise<{
  content: SiteContent;
  practiceAreas: PracticeArea[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  inquiries: ContactInquiry[];
}> {
  const [
    contentResult,
    practiceAreasResult,
    teamMembersResult,
    blogsResult,
    testimonialsResult,
    inquiriesResult
  ] = await Promise.allSettled([
    getSiteContent(),
    getPracticeAreas(),
    getTeamMembers(),
    getBlogs(),
    getTestimonials(),
    getInquiries()
  ]);

  return {
    content: contentResult.status === 'fulfilled' ? contentResult.value : initialSiteContent,
    practiceAreas: practiceAreasResult.status === 'fulfilled' ? practiceAreasResult.value : initialPracticeAreas,
    teamMembers: teamMembersResult.status === 'fulfilled' ? teamMembersResult.value : initialTeamMembers,
    blogs: blogsResult.status === 'fulfilled' ? blogsResult.value : initialBlogs,
    testimonials: testimonialsResult.status === 'fulfilled' ? testimonialsResult.value : initialTestimonials,
    inquiries: inquiriesResult.status === 'fulfilled' ? inquiriesResult.value : []
  };
}

