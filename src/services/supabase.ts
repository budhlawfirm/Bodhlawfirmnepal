import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment Supabase Credentials
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  const url = envUrl || localStorage.getItem('bodh_custom_supabase_url') || '';
  const key = envKey || localStorage.getItem('bodh_custom_supabase_key') || '';

  if (url && key && url.startsWith('http')) {
    try {
      client = createClient(url, key);
      return client;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return null;
}

export function isSupabaseConnected(): boolean {
  return getSupabaseClient() !== null;
}

export function getSupabaseConfigInfo() {
  const url = envUrl || localStorage.getItem('bodh_custom_supabase_url') || '';
  const isCustom = !envUrl && !!localStorage.getItem('bodh_custom_supabase_url');
  return {
    isConfigured: !!url,
    url: url ? url.replace(/^https?:\/\//, '').split('.')[0] + '.supabase.co' : '',
    fullUrl: url,
    isCustom
  };
}

export const SUPABASE_STORAGE_BUCKET = 'bodh-law-media';

export async function uploadImageToSupabaseStorage(
  file: File,
  folder: string = 'uploads'
): Promise<{ url: string; path: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase client is not connected. Please verify your URL and anon key.');
  }

  // Attempt auto-creation of storage bucket if possible
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some((b) => b.name === SUPABASE_STORAGE_BUCKET);
    if (!exists) {
      await supabase.storage.createBucket(SUPABASE_STORAGE_BUCKET, { public: true });
    }
  } catch (e) {
    console.warn('Storage bucket check note:', e);
  }

  // Create clean filename
  const fileExt = file.name.split('.').pop() || 'png';
  const cleanFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `${folder}/${cleanFileName}`;

  const { data, error } = await supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    throw new Error(`Supabase Storage Upload Error: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(filePath);

  return {
    url: publicUrlData.publicUrl,
    path: filePath
  };
}

export async function listSupabaseStorageImages(folder: string = 'uploads') {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .list(folder, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (error || !data) return [];

    return data.map((item) => {
      const filePath = `${folder}/${item.name}`;
      const { data: pubData } = supabase.storage
        .from(SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(filePath);
      return {
        id: item.id || item.name,
        name: item.name,
        url: pubData.publicUrl,
        createdAt: item.created_at,
        size: item.metadata?.size
      };
    });
  } catch (err) {
    console.warn('Failed to list storage items:', err);
    return [];
  }
}

export const SUPABASE_SQL_SCHEMA = `-- ========================================================
-- BODH LAW FIRM NEPAL - COMPLETE SUPABASE POSTGRES SCHEMA
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ========================================================

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Practice Areas Table
create table if not exists public.practice_areas (
  id text primary key,
  title text not null,
  slug text not null unique,
  icon text default 'scale',
  short_description text,
  full_description text,
  sub_sections jsonb default '[]'::jsonb,
  featured boolean default true,
  "order" int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Team Members Table
create table if not exists public.team_members (
  id text primary key,
  name text not null,
  role text not null,
  photo text,
  bio text,
  education text,
  bar_registration text,
  email text,
  phone text,
  specializations jsonb default '[]'::jsonb,
  "order" int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Blogs & Legal Insights Table
create table if not exists public.blogs (
  id text primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  author_name text,
  author_role text,
  author_photo text,
  cover_image text,
  category text,
  published_date text,
  read_time text,
  tags jsonb default '[]'::jsonb,
  keywords jsonb default '[]'::jsonb,
  meta_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Testimonials & Client Reviews Table
create table if not exists public.testimonials (
  id text primary key,
  client_name text not null,
  client_title text,
  client_photo text,
  quote text not null,
  rating int default 5,
  practice_area text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Contact Inquiries & Consultation Submissions Table
create table if not exists public.contact_inquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  practice_area text,
  message text not null,
  preferred_channel text default 'whatsapp',
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Site Content (Hero, About, Stats, Pillars, Contact Info) Table
create table if not exists public.site_content (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Supabase Public Storage Bucket Setup
insert into storage.buckets (id, name, public) 
values ('bodh-law-media', 'bodh-law-media', true)
on conflict (id) do update set public = true;

-- Enable Row Level Security (RLS)
alter table public.practice_areas enable row level security;
alter table public.team_members enable row level security;
alter table public.blogs enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.site_content enable row level security;

-- Public Read Policies
create policy "Public read practice_areas" on public.practice_areas for select using (true);
create policy "Public read team_members" on public.team_members for select using (true);
create policy "Public read blogs" on public.blogs for select using (true);
create policy "Public read testimonials" on public.testimonials for select using (true);
create policy "Public read site_content" on public.site_content for select using (true);

-- Public Insert for Contact Inquiries
create policy "Public insert contact_inquiries" on public.contact_inquiries for insert with check (true);
create policy "Public read contact_inquiries" on public.contact_inquiries for select using (true);
create policy "Public update contact_inquiries" on public.contact_inquiries for update using (true);

-- Public Storage Bucket Policies
create policy "Public Storage Read Access" on storage.objects for select using (bucket_id = 'bodh-law-media');
create policy "Public Storage Upload Access" on storage.objects for insert with check (bucket_id = 'bodh-law-media');
create policy "Public Storage Update Access" on storage.objects for update using (bucket_id = 'bodh-law-media');

-- Public Full Access for Admin CRUD
create policy "Allow all operations for site_content" on public.site_content for all using (true) with check (true);
create policy "Allow all operations for practice_areas" on public.practice_areas for all using (true) with check (true);
create policy "Allow all operations for team_members" on public.team_members for all using (true) with check (true);
create policy "Allow all operations for blogs" on public.blogs for all using (true) with check (true);
create policy "Allow all operations for testimonials" on public.testimonials for all using (true) with check (true);
`;
