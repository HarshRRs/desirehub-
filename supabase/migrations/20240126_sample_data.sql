-- =====================================================
-- SAMPLE DATA FOR DESIREHUB
-- =====================================================
-- This file contains sample data for testing and demonstration
-- Run this AFTER the initial schema migration

-- =====================================================
-- SAMPLE CREATORS
-- =====================================================
-- Note: These UUIDs should match actual auth.users created through signup
-- For now, we'll create sample data with placeholder UUIDs

-- Insert sample profiles (creators)
INSERT INTO public.profiles (id, username, full_name, avatar_url, bio, account_type, age_verified) VALUES
  ('11111111-1111-1111-1111-111111111111', 'scarlett_rose', 'Scarlett Rose', '/creators/scarlett-rose-avatar.jpg', 'Premium content creator • Fitness & Lifestyle • Top 1% Creator', 'creator', true),
  ('22222222-2222-2222-2222-222222222222', 'luna_night', 'Luna Night', '/creators/luna-night-avatar.jpg', 'Exclusive content daily • Join 50K+ subscribers • VIP experiences', 'creator', true),
  ('33333333-3333-3333-3333-333333333333', 'jade_fire', 'Jade Fire', '/creators/jade-fire-avatar.jpg', 'Award-winning creator • Custom content available • Direct messaging', 'creator', true),
  ('44444444-4444-4444-4444-444444444444', 'phoenix_angel', 'Phoenix Angel', '/creators/phoenix-angel-avatar.jpg', 'Top tier creator • Premium videos & photos • Personal interactions', 'creator', true),
  ('55555555-5555-5555-5555-555555555555', 'venus_star', 'Venus Star', '/creators/venus-star-avatar.jpg', 'Verified creator • 4K content • Behind the scenes access', 'creator', true),
  ('66666666-6666-6666-6666-666666666666', 'ruby_diamond', 'Ruby Diamond', '/creators/ruby-diamond-avatar.jpg', 'Elite content • VIP membership • Exclusive shows', 'creator', true);

-- Insert creator details
INSERT INTO public.creators (id, display_name, banner_url, verified, subscriber_count, total_earnings, categories, social_links) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Scarlett Rose', '/creators/scarlett-rose-banner.jpg', true, 52341, 125420.50, ARRAY['Fitness', 'Lifestyle', 'Solo'], '{"instagram": "scarlett_rose_official", "twitter": "scarlettrose"}'),
  ('22222222-2222-2222-2222-222222222222', 'Luna Night', '/creators/luna-night-banner.jpg', true, 48920, 98765.00, ARRAY['Fantasy', 'Cosplay', 'Solo'], '{"instagram": "luna_night_vip", "twitter": "lunanight"}'),
  ('33333333-3333-3333-3333-333333333333', 'Jade Fire', '/creators/jade-fire-banner.jpg', true, 41250, 87340.25, ARRAY['Artistic', 'Sensual', 'Premium'], '{"instagram": "jade_fire_art", "twitter": "jadefire"}'),
  ('44444444-4444-4444-4444-444444444444', 'Phoenix Angel', '/creators/phoenix-angel-banner.jpg', true, 39800, 75200.00, ARRAY['Glamour', 'Fashion', 'Exclusive'], '{"instagram": "phoenix_angel_', "twitter": "phoenixangel"}'),
  ('55555555-5555-5555-5555-555555555555', 'Venus Star', '/creators/venus-star-banner.jpg', true, 35600, 62450.75, ARRAY['4K', 'Premium', 'Solo'], '{"instagram": "venus_star_hd", "twitter": "venusstar"}'),
  ('66666666-6666-6666-6666-666666666666', 'Ruby Diamond', '/creators/ruby-diamond-banner.jpg', true, 31200, 58900.00, ARRAY['Elite', 'VIP', 'Exclusive'], '{"instagram": "ruby_diamond_vip", "twitter": "rubydiamond"}');

-- =====================================================
-- SAMPLE VIDEOS
-- =====================================================
INSERT INTO public.videos (id, creator_id, title, description, video_url, thumbnail_url, duration, views_count, likes_count, category, tags, is_premium, is_published) VALUES
  -- Scarlett Rose videos
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Morning Yoga Flow', 'Start your day right with this energizing yoga session', '/videos/scarlett-1.mp4', '/thumbnails/scarlett-1.jpg', 1245, 125340, 8920, 'Fitness', ARRAY['yoga', 'fitness', 'morning'], false, true),
  ('a1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'Premium Workout Session', 'Exclusive premium content for subscribers', '/videos/scarlett-2.mp4', '/thumbnails/scarlett-2.jpg', 1890, 45200, 3850, 'Fitness', ARRAY['workout', 'premium', 'exclusive'], true, true),
  ('a1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'Behind The Scenes', 'A day in my life - exclusive BTS footage', '/videos/scarlett-3.mp4', '/thumbnails/scarlett-3.jpg', 980, 89560, 7210, 'Lifestyle', ARRAY['bts', 'lifestyle', 'vlog'], false, true),
  
  -- Luna Night videos
  ('a2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'Fantasy Cosplay Collection', 'My favorite cosplay characters', '/videos/luna-1.mp4', '/thumbnails/luna-1.jpg', 1520, 198450, 12340, 'Cosplay', ARRAY['cosplay', 'fantasy', 'creative'], false, true),
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'VIP Photoshoot', 'Exclusive photoshoot for VIP members', '/videos/luna-2.mp4', '/thumbnails/luna-2.jpg', 2100, 67890, 5670, 'Fantasy', ARRAY['photoshoot', 'vip', 'premium'], true, true),
  ('a2222222-2222-2222-2222-222222222223', '22222222-2222-2222-2222-222222222222', 'Costume Design Process', 'How I create my amazing costumes', '/videos/luna-3.mp4', '/thumbnails/luna-3.jpg', 1340, 76540, 4320, 'Cosplay', ARRAY['tutorial', 'diy', 'creative'], false, true),
  
  -- Jade Fire videos
  ('a3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'Artistic Expression', 'Art meets sensuality in this creative piece', '/videos/jade-1.mp4', '/thumbnails/jade-1.jpg', 1680, 145230, 9870, 'Artistic', ARRAY['art', 'creative', 'sensual'], false, true),
  ('a3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 'Premium Art Collection', 'Exclusive artistic content for subscribers', '/videos/jade-2.mp4', '/thumbnails/jade-2.jpg', 2250, 52340, 4210, 'Premium', ARRAY['art', 'premium', 'exclusive'], true, true),
  ('a3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Studio Tour', 'Take a tour of my creative studio', '/videos/jade-3.mp4', '/thumbnails/jade-3.jpg', 890, 98760, 6540, 'Artistic', ARRAY['studio', 'tour', 'bts'], false, true),
  
  -- Phoenix Angel videos
  ('a4444444-4444-4444-4444-444444444441', '44444444-4444-4444-4444-444444444444', 'Fashion Week Highlights', 'My favorite moments from fashion week', '/videos/phoenix-1.mp4', '/thumbnails/phoenix-1.jpg', 1450, 167890, 11230, 'Fashion', ARRAY['fashion', 'glamour', 'runway'], false, true),
  ('a4444444-4444-4444-4444-444444444442', '44444444-4444-4444-4444-444444444444', 'VIP Glamour Session', 'Exclusive glamour content', '/videos/phoenix-2.mp4', '/thumbnails/phoenix-2.jpg', 1980, 58920, 4890, 'Glamour', ARRAY['glamour', 'vip', 'exclusive'], true, true),
  ('a4444444-4444-4444-4444-444444444443', '44444444-4444-4444-4444-444444444444', 'Style Guide', 'My personal styling tips and tricks', '/videos/phoenix-3.mp4', '/thumbnails/phoenix-3.jpg', 1120, 112340, 8760, 'Fashion', ARRAY['style', 'tips', 'fashion'], false, true),
  
  -- Venus Star videos
  ('a5555555-5555-5555-5555-555555555551', '55555555-5555-5555-5555-555555555555', 'Ultra HD Experience', 'Premium 4K content for the best viewing', '/videos/venus-1.mp4', '/thumbnails/venus-1.jpg', 1790, 189450, 13450, '4K', ARRAY['4k', 'uhd', 'premium'], false, true),
  ('a5555555-5555-5555-5555-555555555552', '55555555-5555-5555-5555-555555555555', 'Exclusive 4K Collection', 'VIP only ultra HD content', '/videos/venus-2.mp4', '/thumbnails/venus-2.jpg', 2340, 71230, 6120, 'Premium', ARRAY['4k', 'vip', 'exclusive'], true, true),
  ('a5555555-5555-5555-5555-555555555553', '55555555-5555-5555-5555-555555555555', 'Behind The Camera', 'See how I create 4K content', '/videos/venus-3.mp4', '/thumbnails/venus-3.jpg', 1230, 95670, 7340, '4K', ARRAY['bts', 'tutorial', '4k'], false, true),
  
  -- Ruby Diamond videos
  ('a6666666-6666-6666-6666-666666666661', '66666666-6666-6666-6666-666666666666', 'Elite Showcase', 'Premium showcase for elite members', '/videos/ruby-1.mp4', '/thumbnails/ruby-1.jpg', 1650, 143290, 10340, 'Elite', ARRAY['elite', 'premium', 'showcase'], false, true),
  ('a6666666-6666-6666-6666-666666666662', '66666666-6666-6666-6666-666666666666', 'VIP Private Show', 'Exclusive private performance', '/videos/ruby-2.mp4', '/thumbnails/ruby-2.jpg', 2180, 62450, 5340, 'VIP', ARRAY['vip', 'private', 'exclusive'], true, true),
  ('a6666666-6666-6666-6666-666666666663', '66666666-6666-6666-6666-666666666666', 'Diamond Experience', 'The ultimate premium experience', '/videos/ruby-3.mp4', '/thumbnails/ruby-3.jpg', 1420, 87650, 6890, 'Exclusive', ARRAY['diamond', 'premium', 'elite'], false, true);

-- =====================================================
-- SAMPLE COMMENTS
-- =====================================================
-- Insert sample user for comments (regular user)
INSERT INTO public.profiles (id, username, full_name, avatar_url, account_type, age_verified) VALUES
  ('77777777-7777-7777-7777-777777777777', 'john_viewer', 'John Doe', '/users/john-avatar.jpg', 'user', true),
  ('88888888-8888-8888-8888-888888888888', 'sarah_fan', 'Sarah Smith', '/users/sarah-avatar.jpg', 'user', true),
  ('99999999-9999-9999-9999-999999999999', 'mike_subscriber', 'Mike Johnson', '/users/mike-avatar.jpg', 'user', true);

INSERT INTO public.comments (video_id, user_id, content, likes_count) VALUES
  ('a1111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'Amazing content! Love your energy! 🔥', 234),
  ('a1111111-1111-1111-1111-111111111111', '88888888-8888-8888-8888-888888888888', 'Best yoga instructor! Thank you!', 156),
  ('a2222222-2222-2222-2222-222222222221', '99999999-9999-9999-9999-999999999999', 'Your cosplay is incredible! 😍', 342),
  ('a2222222-2222-2222-2222-222222222221', '77777777-7777-7777-7777-777777777777', 'Absolutely stunning work!', 289),
  ('a3333333-3333-3333-3333-333333333331', '88888888-8888-8888-8888-888888888888', 'This is art at its finest! 🎨', 412),
  ('a4444444-4444-4444-4444-444444444441', '99999999-9999-9999-9999-999999999999', 'Fashion goals! 👗✨', 267),
  ('a5555555-5555-5555-5555-555555555551', '77777777-7777-7777-7777-777777777777', 'The quality is insane! 4K perfection!', 389),
  ('a6666666-6666-6666-6666-666666666661', '88888888-8888-8888-8888-888888888888', 'Elite content deserves elite praise! 💎', 321);

-- =====================================================
-- CATEGORIES REFERENCE
-- =====================================================
-- These are the main categories used across the platform
-- Not a table, just reference for consistency:
-- - Fitness & Wellness
-- - Fantasy & Cosplay
-- - Artistic & Sensual
-- - Glamour & Fashion
-- - Premium 4K
-- - Elite & VIP
-- - Lifestyle & Vlog
-- - Behind The Scenes
-- - Exclusive Content
-- - Solo Performances
