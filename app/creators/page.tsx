import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Users, Play, Eye, Heart, Crown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { creatorsMetadata } from "@/lib/seo";

export const metadata = creatorsMetadata;

import { createClient } from "@/lib/supabase/server";

interface Creator {
    id: string;
    display_name: string;
    banner_url: string | null;
    verified: boolean;
    subscriber_count: number;
    categories: string[] | null;
    profiles: {
        username: string;
        avatar_url: string | null;
        bio: string | null;
    } | null;
    videos: { count: number }[];
}

export default async function CreatorsPage() {
    const supabase = await createClient();
    const { data: creatorsData } = await supabase
        .from("creators")
        .select(`
            *,
            profiles (
                username,
                avatar_url,
                bio
            ),
            videos (count)
        `)
        .order("subscriber_count", { ascending: false });

    const creators = (creatorsData as unknown as Creator[])?.map(creator => ({
        id: creator.id,
        username: creator.profiles?.username || "unknown",
        displayName: creator.display_name || "Unknown Creator",
        avatar: creator.profiles?.avatar_url || "/placeholder-avatar.jpg",
        banner: creator.banner_url || "/placeholder-banner.jpg",
        bio: creator.profiles?.bio || "No bio available",
        subscribers: creator.subscriber_count.toLocaleString(),
        verified: creator.verified,
        categories: creator.categories || [],
        totalVideos: creator.videos?.[0]?.count || 0,
    })) || [];
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4 container mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-violet-deep to-neon-pink">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-kanit">
                            Top Creators
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Connect with elite content creators from around the world
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mt-8">
                    <Button variant="default" size="sm" className="gap-2">
                        <Crown className="w-4 h-4" />
                        Top Rated
                    </Button>
                    <Button variant="outline" size="sm">New Creators</Button>
                    <Button variant="outline" size="sm">Most Subscribers</Button>
                    <Button variant="outline" size="sm">Verified Only</Button>
                </div>
            </section>

            {/* Creators Grid */}
            <section className="pb-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creators.map((creator) => (
                        <Link
                            key={creator.id}
                            href={`/creator/${creator.username}`}
                            className="group block"
                        >
                            <div className="relative bg-gray-900/50 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all duration-300 backdrop-blur-sm">
                                {/* Banner */}
                                <div className="relative h-32 bg-gradient-to-br from-violet-deep/30 to-crimson/30">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Crown className="w-12 h-12 text-white/20" />
                                    </div>
                                    {/* Verified Badge */}
                                    {creator.verified && (
                                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-neon-pink text-white text-xs font-bold flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            VERIFIED
                                        </div>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="relative px-6 pb-6">
                                    <div className="relative -mt-12 mb-4">
                                        <div className="w-24 h-24 rounded-full border-4 border-gray-900 bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center overflow-hidden">
                                            <Users className="w-12 h-12 text-white" />
                                        </div>
                                    </div>

                                    {/* Creator Info */}
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white font-kanit group-hover:text-neon-pink transition-colors">
                                                {creator.displayName}
                                            </h3>
                                            <p className="text-gray-400 text-sm">@{creator.username}</p>
                                        </div>

                                        <p className="text-gray-300 text-sm line-clamp-2">
                                            {creator.bio}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Heart className="w-4 h-4 text-neon-pink" />
                                                <span className="font-semibold text-white">{creator.subscribers}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Play className="w-4 h-4 text-violet-deep" />
                                                <span>{creator.totalVideos} videos</span>
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-2">
                                            {creator.categories.slice(0, 3).map((category) => (
                                                <span
                                                    key={category}
                                                    className="px-2 py-1 rounded text-xs bg-violet-deep/20 text-violet-deep border border-violet-deep/30"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-2">
                                            <Button
                                                size="sm"
                                                className="flex-1 bg-neon-pink hover:bg-neon-pink/80"
                                            >
                                                Subscribe
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                View Profile
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-12">
                    <Button size="lg" variant="outline" className="gap-2">
                        Load More Creators
                        <Users className="w-5 h-5" />
                    </Button>
                </div>
            </section>
        </main>
    );
}
