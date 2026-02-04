import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Play, Eye, Heart, Clock, TrendingUp, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { trendingMetadata } from "@/lib/seo";

export const metadata = trendingMetadata;

import { createClient } from "@/lib/supabase/server";

interface Video {
    id: string;
    title: string;
    thumbnail_url: string | null;
    duration: number | null;
    views_count: number;
    likes_count: number;
    category: string | null;
    is_premium: boolean;
    creators: {
        display_name: string;
        profiles: {
            username: string;
        } | null;
    } | null;
}

function formatViews(views: number): string {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
}

function formatDuration(seconds: number | null): string {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default async function TrendingPage() {
    const supabase = await createClient();
    const { data: videosData } = await supabase
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
        .limit(20);

    const trendingVideos = (videosData as unknown as Video[])?.map(video => ({
        id: video.id,
        title: video.title,
        creator: video.creators?.display_name || "Unknown",
        creatorUsername: video.creators?.profiles?.username || "unknown",
        thumbnail: video.thumbnail_url,
        duration: formatDuration(video.duration),
        views: video.views_count,
        likes: video.likes_count,
        category: video.category || "General",
        isPremium: video.is_premium,
    })) || [];
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4 container mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-neon-pink to-crimson">
                        <Flame className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-kanit">
                            Trending Now
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Most popular videos from our top creators
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mt-8">
                    <Button variant="default" size="sm" className="gap-2">
                        <TrendingUp className="w-4 h-4" />
                        All Time
                    </Button>
                    <Button variant="outline" size="sm">Today</Button>
                    <Button variant="outline" size="sm">This Week</Button>
                    <Button variant="outline" size="sm">This Month</Button>
                </div>
            </section>

            {/* Videos Grid */}
            <section className="pb-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingVideos.map((video, index) => (
                        <Link
                            key={video.id}
                            href={`/watch/${video.id}`}
                            className="group relative block"
                        >
                            {/* Thumbnail Container */}
                            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all duration-300">
                                {/* Rank Badge */}
                                <div className="absolute top-3 left-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-crimson text-white font-bold text-sm shadow-lg">
                                    #{index + 1}
                                </div>

                                {/* Premium Badge */}
                                {video.isPremium && (
                                    <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-gold/90 backdrop-blur-sm border border-gold text-midnight font-bold text-xs flex items-center gap-1">
                                        <Play className="w-3 h-3 fill-current" />
                                        PREMIUM
                                    </div>
                                )}

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {video.duration}
                                </div>

                                {/* Thumbnail Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-deep/20 to-crimson/20 group-hover:scale-105 transition-transform duration-500">
                                    <Play className="w-16 h-16 text-white/30 group-hover:text-white/50 transition-colors duration-300" />
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div className="w-full">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex items-center gap-1 text-white text-sm">
                                                <Eye className="w-4 h-4" />
                                                {formatViews(video.views)}
                                            </div>
                                            <div className="flex items-center gap-1 text-neon-pink text-sm">
                                                <Heart className="w-4 h-4" />
                                                {formatViews(video.likes)}
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="w-full gap-2 bg-neon-pink hover:bg-neon-pink/80"
                                        >
                                            <Play className="w-4 h-4 fill-current" />
                                            Watch Now
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="mt-3">
                                <h3 className="text-white font-semibold text-base line-clamp-2 group-hover:text-neon-pink transition-colors">
                                    {video.title}
                                </h3>
                                <Link
                                    href={`/creator/${video.creatorUsername}`}
                                    className="text-gray-400 text-sm hover:text-neon-pink transition-colors mt-1 inline-block"
                                >
                                    {video.creator}
                                </Link>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="px-2 py-1 rounded text-xs bg-violet-deep/20 text-violet-deep border border-violet-deep/30">
                                        {video.category}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        {formatViews(video.views)} views
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-12">
                    <Button size="lg" variant="outline" className="gap-2">
                        Load More Videos
                        <TrendingUp className="w-5 h-5" />
                    </Button>
                </div>
            </section>
        </main>
    );
}
