"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { User, Mail, Camera, Save, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        bio: "",
    });
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (data) {
            setProfile(data);
            setFormData({
                username: data.username || "",
                full_name: data.full_name || "",
                bio: data.bio || "",
            });
        }
        setLoading(false);
    }

    async function handleSave() {
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from("profiles")
            .update({
                username: formData.username,
                full_name: formData.full_name,
                bio: formData.bio,
            })
            .eq("id", user?.id);

        if (!error) {
            await loadProfile();
        }
        setSaving(false);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-midnight flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-neon-pink animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold text-white mb-8 font-kanit">My Profile</h1>

                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center">
                                {profile?.avatar_url ? (
                                    <Image src={profile.avatar_url} alt="Avatar" fill className="rounded-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-white" />
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center hover:bg-neon-pink/80 transition-colors">
                                <Camera className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">{formData.username}</h2>
                            <p className="text-gray-400 text-sm">{profile?.account_type === 'creator' ? 'Creator Account' : 'User Account'}</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={profile?.email || ""}
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>
                    </div>

                    {/* Save Button */}
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
