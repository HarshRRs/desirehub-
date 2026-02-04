-- =====================================================
-- PART 1: INITIAL SCHEMA (IMPROVED & FIXED)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE
-- Removed direct FK to auth.users to avoid permission issues
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

-- RLS POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

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

-- FUNCTIONS & TRIGGERS
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

-- Revoke public execution for security
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;

-- Note: Creating triggers on auth.users requires superuser. If this fails, you may need to set up a Trigger in the Supabase Dashboard UI instead.
-- Attempting to create it here:
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_videos BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_comments BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- STORAGE BUCKETS
-- NOTE: It is recommended to create buckets in the Supabase Dashboard -> Storage.
-- If you have permissions, this might work, otherwise ignore errors here and create 'avatars', 'videos', 'thumbnails', 'banners' manually.
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('avatars', 'avatars', true),
  ('videos', 'videos', true),
  ('thumbnails', 'thumbnails', true),
  ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Videos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Creators can upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Thumbnails are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'thumbnails');
CREATE POLICY "Creators can upload thumbnails" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'thumbnails' AND (SELECT auth.uid())::text = (storage.foldername(name))[1]);


-- =====================================================
-- PART 2: SAMPLE DATA
-- =====================================================

-- SAMPLE CREATORS
INSERT INTO public.profiles (id, username, full_name, avatar_url, bio, account_type, age_verified) VALUES
  ('11111111-1111-1111-1111-111111111111', 'scarlett_rose', 'Scarlett Rose', '/creators/scarlett-rose-avatar.jpg', 'Premium content creator • Fitness & Lifestyle • Top 1% Creator', 'creator', true),
  ('22222222-2222-2222-2222-222222222222', 'luna_night', 'Luna Night', '/creators/luna-night-avatar.jpg', 'Exclusive content daily • Join 50K+ subscribers • VIP experiences', 'creator', true),
  ('33333333-3333-3333-3333-333333333333', 'jade_fire', 'Jade Fire', '/creators/jade-fire-avatar.jpg', 'Award-winning creator • Custom content available • Direct messaging', 'creator', true),
  ('44444444-4444-4444-4444-444444444444', 'phoenix_angel', 'Phoenix Angel', '/creators/phoenix-angel-avatar.jpg', 'Top tier creator • Premium videos & photos • Personal interactions', 'creator', true),
  ('55555555-5555-5555-5555-555555555555', 'venus_star', 'Venus Star', '/creators/venus-star-avatar.jpg', 'Verified creator • 4K content • Behind the scenes access', 'creator', true),
  ('66666666-6666-6666-6666-666666666666', 'ruby_diamond', 'Ruby Diamond', '/creators/ruby-diamond-avatar.jpg', 'Elite content • VIP membership • Exclusive shows', 'creator', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.creators (id, display_name, banner_url, verified, subscriber_count, total_earnings, categories, social_links) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Scarlett Rose', '/creators/scarlett-rose-banner.jpg', true, 52341, 125420.50, ARRAY['Fitness', 'Lifestyle', 'Solo'], '{"instagram": "scarlett_rose_official", "twitter": "scarlettrose"}'),
  ('22222222-2222-2222-2222-222222222222', 'Luna Night', '/creators/luna-night-banner.jpg', true, 48920, 98765.00, ARRAY['Fantasy', 'Cosplay', 'Solo'], '{"instagram": "luna_night_vip", "twitter": "lunanight"}'),
  ('33333333-3333-3333-3333-333333333333', 'Jade Fire', '/creators/jade-fire-banner.jpg', true, 41250, 87340.25, ARRAY['Artistic', 'Sensual', 'Premium'], '{"instagram": "jade_fire_art", "twitter": "jadefire"}'),
  ('44444444-4444-4444-4444-444444444444', 'Phoenix Angel', '/creators/phoenix-angel-banner.jpg', true, 39800, 75200.00, ARRAY['Glamour', 'Fashion', 'Exclusive'], '{"instagram": "phoenix_angel_", "twitter": "phoenixangel"}'),
  ('55555555-5555-5555-5555-555555555555', 'Venus Star', '/creators/venus-star-banner.jpg', true, 35600, 62450.75, ARRAY['4K', 'Premium', 'Solo'], '{"instagram": "venus_star_hd", "twitter": "venusstar"}'),
  ('66666666-6666-6666-6666-666666666666', 'Ruby Diamond', '/creators/ruby-diamond-banner.jpg', true, 31200, 58900.00, ARRAY['Elite', 'VIP', 'Exclusive'], '{"instagram": "ruby_diamond_vip", "twitter": "rubydiamond"}')
ON CONFLICT (id) DO NOTHING;

-- SAMPLE VIDEOS
INSERT INTO public.videos (id, creator_id, title, description, video_url, thumbnail_url, duration, views_count, likes_count, category, tags, is_premium, is_published) VALUES
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Morning Yoga Flow', 'Start your day right with this energizing yoga session', '/videos/scarlett-1.mp4', '/thumbnails/scarlett-1.jpg', 1245, 125340, 8920, 'Fitness', ARRAY['yoga', 'fitness', 'morning'], false, true),
  ('a1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'Premium Workout Session', 'Exclusive premium content for subscribers', '/videos/scarlett-2.mp4', '/thumbnails/scarlett-2.jpg', 1890, 45200, 3850, 'Fitness', ARRAY['workout', 'premium', 'exclusive'], true, true),
  ('a1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'Behind The Scenes', 'A day in my life - exclusive BTS footage', '/videos/scarlett-3.mp4', '/thumbnails/scarlett-3.jpg', 980, 89560, 7210, 'Lifestyle', ARRAY['bts', 'lifestyle', 'vlog'], false, true),
  ('a2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'Fantasy Cosplay Collection', 'My favorite cosplay characters', '/videos/luna-1.mp4', '/thumbnails/luna-1.jpg', 1520, 198450, 12340, 'Cosplay', ARRAY['cosplay', 'fantasy', 'creative'], false, true),
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'VIP Photoshoot', 'Exclusive photoshoot for VIP members', '/videos/luna-2.mp4', '/thumbnails/luna-2.jpg', 2100, 67890, 5670, 'Fantasy', ARRAY['photoshoot', 'vip', 'premium'], true, true),
  ('a3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'Artistic Expression', 'Art meets sensuality in this creative piece', '/videos/jade-1.mp4', '/thumbnails/jade-1.jpg', 1680, 145230, 9870, 'Artistic', ARRAY['art', 'creative', 'sensual'], false, true),
  ('a4444444-4444-4444-4444-444444444441', '44444444-4444-4444-4444-444444444444', 'Fashion Week Highlights', 'My favorite moments from fashion week', '/videos/phoenix-1.mp4', '/thumbnails/phoenix-1.jpg', 1450, 167890, 11230, 'Fashion', ARRAY['fashion', 'glamour', 'runway'], false, true),
  ('a5555555-5555-5555-5555-555555555551', '55555555-5555-5555-5555-555555555555', 'Ultra HD Experience', 'Premium 4K content for the best viewing', '/videos/venus-1.mp4', '/thumbnails/venus-1.jpg', 1790, 189450, 13450, '4K', ARRAY['4k', 'uhd', 'premium'], false, true),
  ('a6666666-6666-6666-6666-666666666661', '66666666-6666-6666-6666-666666666666', 'Elite Showcase', 'Premium showcase for elite members', '/videos/ruby-1.mp4', '/thumbnails/ruby-1.jpg', 1650, 143290, 10340, 'Elite', ARRAY['elite', 'premium', 'showcase'], false, true)
ON CONFLICT (id) DO NOTHING;

-- SAMPLE COMMENTS
INSERT INTO public.profiles (id, username, full_name, avatar_url, account_type, age_verified) VALUES
  ('77777777-7777-7777-7777-777777777777', 'john_viewer', 'John Doe', '/users/john-avatar.jpg', 'user', true),
  ('88888888-8888-8888-8888-888888888888', 'sarah_fan', 'Sarah Smith', '/users/sarah-avatar.jpg', 'user', true),
  ('99999999-9999-9999-9999-999999999999', 'mike_subscriber', 'Mike Johnson', '/users/mike-avatar.jpg', 'user', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.comments (video_id, user_id, content, likes_count) VALUES
  ('a1111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'Amazing content! Love your energy! 🔥', 234),
  ('a1111111-1111-1111-1111-111111111111', '88888888-8888-8888-8888-888888888888', 'Best yoga instructor! Thank you!', 156),
  ('a2222222-2222-2222-2222-222222222221', '99999999-9999-9999-9999-999999999999', 'Your cosplay is incredible! 😍', 342),
  ('a3333333-3333-3333-3333-333333333331', '88888888-8888-8888-8888-888888888888', 'This is art at its finest! 🎨', 412),
  ('a4444444-4444-4444-4444-444444444441', '99999999-9999-9999-9999-999999999999', 'Fashion goals! 👗✨', 267),
  ('a5555555-5555-5555-5555-555555555551', '77777777-7777-7777-7777-777777777777', 'The quality is insane! 4K perfection!', 389),
  ('a6666666-6666-6666-6666-666666666661', '88888888-8888-8888-8888-888888888888', 'Elite content deserves elite praise! 💎', 321);
