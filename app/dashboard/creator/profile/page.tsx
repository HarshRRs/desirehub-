"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { User, Camera, Save, Loader2 } from "lucide-react";

export default function CreatorProfileEditPage() {
    const [profile, setProfile] = useState({
        username: "",
        display_name: "",
        bio: "",
        categories: [] as string[],
    });
    const [saving, setSaving] = useState(false);
    const supabase = createClient();

    const CATEGORIES = ["Amateur", "Professional", "Solo", "Couples", "Fetish", "BDSM"];

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        const { data: creatorData } = await supabase
            .from("creators")
            .select("*")
            .eq("id", user.id)
            .single();

        if (profileData && creatorData) {
            setProfile({
                username: profileData.username || "",
                display_name: creatorData.display_name || "",
                bio: profileData.bio || "",
                categories: creatorData.categories || [],
            });
        }
    }

    async function handleSave() {
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();

        await supabase
            .from("profiles")
            .update({
                username: profile.username,
                bio: profile.bio,
            })
            .eq("id", user?.id);

        await supabase
            .from("creators")
            .update({
                display_name: profile.display_name,
                categories: profile.categories,
            })
            .eq("id", user?.id);

        setSaving(false);
        alert("Profile updated successfully!");
    }

    function toggleCategory(cat: string) {
        setProfile({
            ...profile,
            categories: profile.categories.includes(cat)
                ? profile.categories.filter(c => c !== cat)
                : [...profile.categories, cat]
        });
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold text-white mb-8 font-kanit">Edit Creator Profile</h1>

                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center">
                                <User className="w-12 h-12 text-white" />
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center hover:bg-neon-pink/80 transition-colors">
                                <Camera className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">{profile.username}</h2>
                            <p className="text-gray-400 text-sm">Creator Account</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <input
                                type="text"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                                placeholder="Enter username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                            <input
                                type="text"
                                value={profile.display_name}
                                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                                placeholder="Your display name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all resize-none"
                                placeholder="Tell your fans about yourself..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">Content Categories</label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => toggleCategory(cat)}
                                        className={`px-4 py-2 rounded-full transition-all ${profile.categories.includes(cat)
                                                ? "bg-neon-pink text-white"
                                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-gradient-to-r from-violet-deep via-neon-pink to-crimson text-white font-semibold px-8 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,27,109,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
