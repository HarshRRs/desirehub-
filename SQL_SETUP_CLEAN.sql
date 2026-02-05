-- =====================================================
-- COMPLETE DATABASE SETUP - ONE CLICK SOLUTION
-- DesireHub Production - Clean Start
-- 
-- THIS FILE DOES EVERYTHING:
-- 1. Removes old tables and data
-- 2. Creates fresh schema
-- 3. Sets up policies and storage
-- 4. NO SAMPLE DATA - Clean for production
-- 
-- HOW TO USE: Copy this ENTIRE file and run it once
-- =====================================================

-- =====================================================
-- STEP 1: CLEAN UP OLD DATA
-- =====================================================

-- Drop all existing tables (if they exist)
DROP TABLE IF EXISTS public.analytics CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.videos CASCADE;
DROP TABLE IF EXISTS public.creators CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop existing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
DROP TRIGGER IF EXISTS set_updated_at_videos ON public.videos;
DROP TRIGGER IF EXISTS set_updated_at_comments ON public.comments;

-- Drop existing functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

-- =====================================================
-- STEP 2: CREATE FRESH SCHEMA
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  account_type TEXT NOT NULL CHECK (account_type IN ('user', 'creator')) DEFAULT 'user',
  age_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CREATORS TABLE
CREATE TABLE public.creators (
  id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  display_name TEXT,
  banner_url TEXT,
  verified BOOLEAN DEFAULT false,
  subscriber_count INTEGER DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0.00,
  social_links JSONB DEFAULT '{}'::jsonb,
  categories TEXT[] DEFAULT '{}'::text[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- VIDEOS TABLE
CREATE TABLE public.videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  category TEXT,
  tags TEXT[] DEFAULT '{}'::text[],
  is_premium BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE NOT NULL,
  tier TEXT DEFAULT 'basic',
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, creator_id)
);

-- FAVORITES TABLE
CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, video_id)
);

-- COMMENTS TABLE
CREATE TABLE public.comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- MESSAGES TABLE
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ANALYTICS TABLE
CREATE TABLE public.analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type TEXT CHECK (event_type IN ('view', 'like', 'share', 'watch_time')) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- STEP 3: ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 4: CREATE SECURITY POLICIES
-- =====================================================

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((SELECT auth.uid()) = id);

-- Creators Policies
CREATE POLICY "Creator profiles are viewable by everyone" ON public.creators FOR SELECT USING (true);
CREATE POLICY "Creators can update own profile" ON public.creators FOR UPDATE USING ((SELECT auth.uid()) = id);

-- Videos Policies
CREATE POLICY "Published videos or owner view" ON public.videos FOR SELECT USING (is_published = true OR creator_id = (SELECT auth.uid()));
CREATE POLICY "Creators can insert own videos" ON public.videos FOR INSERT WITH CHECK ((SELECT auth.uid()) = creator_id);
CREATE POLICY "Creators can update own videos" ON public.videos FOR UPDATE USING ((SELECT auth.uid()) = creator_id);
CREATE POLICY "Creators can delete own videos" ON public.videos FOR DELETE USING ((SELECT auth.uid()) = creator_id);

-- Subscriptions Policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Creators can view their subscribers" ON public.subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.creators WHERE id = (SELECT auth.uid()) AND id = creator_id)
);

-- Favorites Policies
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can remove favorites" ON public.favorites FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- Comments Policies
CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.comments FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can update own comments" ON public.comments FOR UPDATE USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users can delete own comments" ON public.comments FOR DELETE USING ((SELECT auth.uid()) = user_id);

-- Messages Policies
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING ((SELECT auth.uid()) = sender_id OR (SELECT auth.uid()) = receiver_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK ((SELECT auth.uid()) = sender_id);

-- Analytics Policies
CREATE POLICY "Creators can view analytics for their videos" ON public.analytics FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.videos v WHERE v.id = public.analytics.video_id AND v.creator_id = (SELECT auth.uid())
  )
);

-- =====================================================
-- STEP 5: CREATE FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, account_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text from 1 for 8)),
    COALESCE(NEW.raw_user_meta_data->>'account_type', 'user')
  );
  IF COALESCE(NEW.raw_user_meta_data->>'account_type', 'user') = 'creator' THEN
    INSERT INTO public.creators (id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to auto-update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_videos BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_comments BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- STEP 6: CREATE STORAGE BUCKETS
-- =====================================================

INSERT INTO storage.buckets (id, name, public) VALUES 
  ('avatars', 'avatars', true),
  ('videos', 'videos', true),
  ('thumbnails', 'thumbnails', true),
  ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STEP 7: STORAGE POLICIES
-- =====================================================

-- Drop existing storage policies first
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Videos are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Creators can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Thumbnails are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Creators can upload thumbnails" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Videos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Creators can upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Thumbnails are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'thumbnails');
CREATE POLICY "Creators can upload thumbnails" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'thumbnails' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]);

-- =====================================================
-- ✅ SETUP COMPLETE!
-- Your database is ready for production!
-- NO sample data - clean start for real users
-- =====================================================
