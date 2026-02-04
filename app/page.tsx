import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Play, TrendingUp, Star, Crown } from "lucide-react";
import Image from "next/image";
import { homeMetadata } from "@/lib/seo";

// SEO Metadata
export const metadata = homeMetadata;

import { createClient } from "@/lib/supabase/server";

interface Video {
  id: string;
  title: string;
  thumbnail_url: string | null;
  views_count: number;
  is_premium: boolean;
  creators: {
    display_name: string;
    profiles: {
      username: string;
    } | null;
  } | null;
}

export default async function Home() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select(`
      *,
      creators (
        display_name,
        profiles (username)
      )
    `)
    .eq("is_published", true)
    .order("views_count", { ascending: false })
    .limit(4);

  // Cast to unknown first then to Video[] because Supabase types might not match exactly without generation
  const typedVideos = videos as unknown as Video[];

  return (
    <main className="min-h-screen bg-midnight">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* 35% Dark Overlay */}
        <div className="absolute inset-0 bg-black/35 z-0" />

        <div className="relative z-10 px-4 text-center container mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full border-neon-pink/30 bg-neon-pink/10 backdrop-blur-sm">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-neon-pink"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-neon-pink"></span>
            </span>
            <span className="text-sm font-medium text-neon-pink">Premium Content Live Now</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl font-kanit" style={{ color: '#f0f0f0', textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(255,27,109,0.3)' }}>
            Experience the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-rose-500 animate-pulse">
              Ultimate Desire
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-400 md:text-xl">
            The world's most exclusive adult entertainment platform.
            Stream 4K videos, connect with top creators, and explore your deepest fantasies.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 text-lg h-14 px-10 group">
              <Play className="w-5 h-5 fill-current group-hover:animate-ping" />
              <span className="relative">
                Watch Free Porn
              </span>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Trending Section Preview */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-neon-pink" />
            <h2 className="text-3xl font-bold text-white font-kanit">Trending Now</h2>
          </div>
          <Button variant="link" className="text-neon-pink">View All</Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {typedVideos?.map((video) => (
            <div key={video.id} className="group relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-20">
                <div>
                  <h3 className="text-white font-bold text-lg line-clamp-1">{video.title}</h3>
                  <p className="text-gray-300 text-sm">{video.creators?.display_name} • {video.views_count.toLocaleString()} views</p>
                </div>
              </div>
              {/* Thumbnail */}
              {video.thumbnail_url ? (
                <div className="absolute inset-0">
                  {/* In a real app, use Next.js Image with a valid src. 
                        Since these are sample URLs, we might not have real images yet. 
                        We will use a placeholder if the URL starts with /thumbnails/ and file doesn't exist, 
                        but for now let's assume valid URLs or fallback. 
                    */}
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white/20 group-hover:text-neon-pink/80 transition-colors" />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 group-hover:scale-105 transition-transform duration-500 -z-10 bg-gray-800">
                  <Play className="w-12 h-12 opacity-20" />
                </div>
              )}

              {/* Premium Badge */}
              {video.is_premium && (
                <div className="absolute top-2 right-2 z-30 px-2 py-1 bg-gradient-to-r from-violet-deep to-neon-pink rounded text-xs font-bold text-white flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  PREMIUM
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main >
  );
}
