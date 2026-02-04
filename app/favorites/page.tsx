"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Heart, Play, Clock, User } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        loadFavorites();
    }, []);

    async function loadFavorites() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data } = await supabase
            .from("favorites")
            .select(`
        *,
        videos (
          *,
          creators (
            *,
            profiles (username, avatar_url)
          )
        )
      `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        setFavorites(data || []);
        setLoading(false);
    }

    async function removeFavorite(videoId: string) {
        const { data: { user } } = await supabase.auth.getUser();
        await supabase
            .from("favorites")
            .delete()
            .eq("user_id", user?.id)
            .eq("video_id", videoId);

        loadFavorites();
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-8 h-8 text-neon-pink fill-neon-pink" />
                    <h1 className="text-3xl font-bold text-white font-kanit">My Favorites</h1>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-video bg-white/5 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No favorites yet</p>
                        <p className="text-gray-500 mt-2">Videos you favorite will appear here</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {favorites.map((fav) => (
                            <div
                                key={fav.id}
                                className="group relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all duration-300"
                            >
                                <Link href={`/watch/${fav.videos.id}`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold text-lg">{fav.videos.title}</h3>
                                        <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                                            <User className="w-4 h-4" />
                                            <span>{fav.videos.creators?.profiles?.username}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-400 text-xs mt-2">
                                            <span className="flex items-center gap-1">
                                                <Play className="w-3 h-3" />
                                                {fav.videos.views_count} views
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {Math.floor(fav.videos.duration / 60)}:{String(fav.videos.duration % 60).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-12 h-12 opacity-20 group-hover:opacity-100 group-hover:text-neon-pink transition-all" />
                                    </div>
                                </Link>
                                <button
                                    onClick={() => removeFavorite(fav.videos.id)}
                                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                                >
                                    <Heart className="w-5 h-5 text-neon-pink fill-neon-pink" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
