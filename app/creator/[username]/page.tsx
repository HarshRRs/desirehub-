"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { User, Users, Video, Calendar, Star, MapPin } from "lucide-react";
import Link from "next/link";

export default function CreatorProfilePage() {
    const params = useParams();
    const [creator, setCreator] = useState<any>(null);
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        loadCreatorProfile();
        loadCreatorVideos();
    }, [params.username]);

    async function loadCreatorProfile() {
        const { data } = await supabase
            .from("profiles")
            .select(`
        *,
        creators (*)
      `)
            .eq("username", params.username)
            .eq("account_type", "creator")
            .single();

        setCreator(data);
        setLoading(false);
    }

    async function loadCreatorVideos() {
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", params.username)
            .single();

        if (profile) {
            const { data } = await supabase
                .from("videos")
                .select("*")
                .eq("creator_id", profile.id)
                .eq("is_published", true)
                .order("created_at", { ascending: false })
                .limit(12);

            setVideos(data || []);
        }
    }

    async function toggleSubscribe() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        if (isSubscribed) {
            await supabase
                .from("subscriptions")
                .delete()
                .eq("user_id", user.id)
                .eq("creator_id", creator.id);
            setIsSubscribed(false);
        } else {
            await supabase
                .from("subscriptions")
                .insert({
                    user_id: user.id,
                    creator_id: creator.id,
                    tier: "basic",
                });
            setIsSubscribed(true);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-midnight">
                <Navbar />
                <div className="h-64 bg-white/5 animate-pulse" />
            </main>
        );
    }

    if (!creator || !creator.creators) {
        return (
            <main className="min-h-screen bg-midnight">
                <Navbar />
                <div className="container mx-auto px-4 py-12 text-center">
                    <p className="text-gray-400 text-lg">Creator not found</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Banner */}
            <div className="relative h-64 bg-gradient-to-r from-violet-deep/20 via-neon-pink/20 to-crimson/20">
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="container mx-auto px-4">
                {/* Creator Info */}
                <div className="relative -mt-20 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center border-4 border-midnight">
                            <User className="w-16 h-16 text-white" />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-white font-kanit">{creator.username}</h1>
                                {creator.creators.verified && (
                                    <div className="w-6 h-6 rounded-full bg-neon-pink flex items-center justify-center">
                                        <Star className="w-4 h-4 text-white fill-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {creator.creators.subscriber_count.toLocaleString()} subscribers
                                </span>
                                <span className="flex items-center gap-1">
                                    <Video className="w-4 h-4" />
                                    {videos.length} videos
                                </span>
                            </div>
                            {creator.bio && (
                                <p className="text-gray-300 max-w-2xl">{creator.bio}</p>
                            )}
                        </div>

                        {/* Subscribe Button */}
                        <button
                            onClick={toggleSubscribe}
                            className={`px-8 py-3 rounded-xl font-semibold transition-all ${isSubscribed
                                    ? "bg-white/10 text-white hover:bg-white/20"
                                    : "bg-gradient-to-r from-violet-deep to-neon-pink text-white hover:shadow-[0_0_30px_rgba(255,27,109,0.4)]"
                                }`}
                        >
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    </div>
                </div>

                {/* Videos Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Videos</h2>
                    {videos.length === 0 ? (
                        <div className="text-center py-12">
                            <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No videos yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {videos.map((video) => (
                                <Link
                                    key={video.id}
                                    href={`/watch/${video.id}`}
                                    className="group relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold">{video.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {video.views_count} views • {new Date(video.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
