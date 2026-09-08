export interface PracticeSubSection {
  id: string;
  title: string;
  description: string;
  keyServices: string[];
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  subSections: PracticeSubSection[];
  featured: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  education: string;
  barRegistration: string;
  email: string;
  phone: string;
  specializations: string[];
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorPhoto: string;
  coverImage: string;
  category: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  clientPhoto: string;
  quote: string;
  rating: number;
  practiceArea?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  practiceArea: string;
  message: string;
  preferredChannel: 'phone' | 'email' | 'whatsapp';
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface ContactInfo {
  firmName: string;
  tagline: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  mobile: string;
  emergencyHotline: string;
  email: string;
  consultationEmail: string;
  website: string;
  whatsappNumber: string;
  whatsappDirectUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  workingHours: string;
  mapEmbedUrl: string;
}

export interface HimalayanPeak {
  id: string;
  name: string;
  nepaliName: string;
  altitude: string;
  significance: string;
  image: string;
}

export interface MountainRangeContent {
  bannerImage?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  quote?: string;
  quoteTranslation?: string;
  peaks?: HimalayanPeak[];
}

export interface SiteContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    bgImage: string;
    sliderImages?: string[];
    slideInterval?: number; // In seconds (default: 10)
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    image: string;
    yearsOfExcellence: number;
    barAffiliation: string;
  };
  pillars: Pillar[];
  stats: StatItem[];
  mountainRange?: MountainRangeContent;
  contactInfo: ContactInfo;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isCustomConfigured: boolean;
}
