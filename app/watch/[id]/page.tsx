"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import { Heart, Share2, Flag, User, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WatchPage() {
    const params = useParams();
    const [video, setVideo] = useState<any>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        loadVideo();
        checkFavorite();
        checkSubscription();
    }, [params.id]);

    async function loadVideo() {
        const { data } = await supabase
            .from("videos")
            .select(`
        *,
        creators (
          *,
          profiles (username, avatar_url, bio)
        )
      `)
            .eq("id", params.id)
            .single();

        setVideo(data);
        setLoading(false);
    }

    async function checkFavorite() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from("favorites")
            .select("id")
            .eq("user_id", user.id)
            .eq("video_id", params.id)
            .single();

        setIsFavorite(!!data);
    }

    async function toggleFavorite() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        if (isFavorite) {
            await supabase
                .from("favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("video_id", params.id);
        } else {
            await supabase
                .from("favorites")
                .insert({ user_id: user.id, video_id: params.id });
        }

        setIsFavorite(!isFavorite);
    }

    async function checkSubscription() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !video) return;

        const { data } = await supabase
            .from("subscriptions")
            .select("id")
            .eq("user_id", user.id)
            .eq("creator_id", video.creator_id)
            .single();

        setIsSubscribed(!!data);
    }

    async function toggleSubscription() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        if (isSubscribed) {
            await supabase
                .from("subscriptions")
                .delete()
                .eq("user_id", user.id)
                .eq("creator_id", video.creator_id);
        } else {
            await supabase
                .from("subscriptions")
                .insert({ user_id: user.id, creator_id: video.creator_id, tier: 'free' });
        }

        setIsSubscribed(!isSubscribed);
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-midnight">
                <Navbar />
                <div className="container mx-auto px-4 py-12">
                    <div className="aspect-video bg-white/5 rounded-xl animate-pulse mb-6" />
                </div>
            </main>
        );
    }

    if (!video) {
        return (
            <main className="min-h-screen bg-midnight">
                <Navbar />
                <div className="container mx-auto px-4 py-12 text-center">
                    <p className="text-gray-400 text-lg">Video not found</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                    {video.video_url ? (
                        <video controls className="w-full h-full" poster={video.thumbnail_url}>
                            <source src={video.video_url} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Video unavailable</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h1 className="text-2xl font-bold text-white mb-3">{video.title}</h1>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4 text-gray-400 text-sm">
                                <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {video.views_count.toLocaleString()} views
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleFavorite}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isFavorite ? "bg-neon-pink text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
                                    {isFavorite ? "Favorited" : "Favorite"}
                                </button>
                            </div>
                        </div>

                        {/* Creator Info */}
                        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <Link
                                            href={`/creator/${video.creators.profiles.username}`}
                                            className="text-white font-semibold hover:text-neon-pink transition-colors"
                                        >
                                            {video.creators.profiles.username}
                                        </Link>
                                        <p className="text-gray-400 text-sm">{video.creators.subscriber_count} subscribers</p>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleSubscription}
                                    className={`font-semibold px-6 py-2 rounded-full transition-all ${isSubscribed
                                        ? "bg-white/10 text-white hover:bg-white/20"
                                        : "bg-neon-pink hover:bg-neon-pink/80 text-white"
                                        }`}
                                >
                                    {isSubscribed ? "Subscribed" : "Subscribe"}
                                </button>
                            </div>

                            {video.description && (
                                <p className="text-gray-300 mt-4 text-sm">{video.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-bold text-white mb-4">Related Videos</h3>
                        <p className="text-gray-500 text-sm">No related videos yet...</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
