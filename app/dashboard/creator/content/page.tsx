"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { Video, Edit, Trash2, Eye, Heart, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function CreatorContentPage() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        loadVideos();
    }, []);

    async function loadVideos() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from("videos")
            .select("*")
            .eq("creator_id", user.id)
            .order("created_at", { ascending: false });

        setVideos(data || []);
        setLoading(false);
    }

    async function deleteVideo(id: string) {
        if (!confirm("Are you sure you want to delete this video?")) return;

        await supabase.from("videos").delete().eq("id", id);
        loadVideos();
    }

    async function togglePublish(video: any) {
        await supabase
            .from("videos")
            .update({ is_published: !video.is_published })
            .eq("id", video.id);

        loadVideos();
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Video className="w-8 h-8 text-neon-pink" />
                        <h1 className="text-3xl font-bold text-white font-kanit">My Content</h1>
                    </div>
                    <Link
                        href="/dashboard/creator/upload"
                        className="bg-gradient-to-r from-violet-deep to-neon-pink text-white font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,27,109,0.4)] transition-all"
                    >
                        Upload New Video
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-20">
                        <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No videos yet</p>
                        <p className="text-gray-500 mt-2">Upload your first video to get started</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {videos.map((video) => (
                            <div
                                key={video.id}
                                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    {/* Thumbnail */}
                                    <div className="w-40 aspect-video bg-gray-900 rounded-lg flex-shrink-0 flex items-center justify-center">
                                        <Video className="w-8 h-8 text-gray-600" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                                                <p className="text-gray-400 text-sm line-clamp-1">{video.description || "No description"}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${video.is_published
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-gray-500/20 text-gray-400"
                                                }`}>
                                                {video.is_published ? "Published" : "Draft"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-6 text-gray-400 text-sm">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {video.views_count} views
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-4 h-4" />
                                                {video.likes_count} likes
                                            </span>
                                            <span>{new Date(video.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => togglePublish(video)}
                                            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                                            title={video.is_published ? "Unpublish" : "Publish"}
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <Link
                                            href={`/dashboard/creator/content/edit/${video.id}`}
                                            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => deleteVideo(video.id)}
                                            className="p-2 rounded-lg bg-white/5 text-red-400 hover:bg-red-500/20 transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
