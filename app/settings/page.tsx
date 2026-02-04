"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Settings as SettingsIcon, Bell, Shield, CreditCard, LogOut, Trash2 } from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        contentRecommendations: true,
        adultContentFilter: false,
    });
    const supabase = createClient();
    const router = useRouter();

    async function handleLogout() {
        await signOut();
    }

    async function handleDeleteAccount() {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            const { data: { user } } = await supabase.auth.getUser();
            // Delete from Supabase (this would need RLS policies configured)
            // await supabase.from("profiles").delete().eq("id", user?.id);
            // await supabase.auth.admin.deleteUser(user?.id);

            alert("Account deletion requested. This feature requires admin configuration.");
        }
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <SettingsIcon className="w-8 h-8 text-neon-pink" />
                    <h1 className="text-3xl font-bold text-white font-kanit">Settings</h1>
                </div>

                <div className="space-y-6">
                    {/* Notifications Section */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-6 h-6 text-neon-pink" />
                            <h2 className="text-xl font-semibold text-white">Notifications</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Email Notifications</p>
                                    <p className="text-gray-400 text-sm">Receive updates via email</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Push Notifications</p>
                                    <p className="text-gray-400 text-sm">Browser push notifications</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications}
                                    onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Privacy Section */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-neon-pink" />
                            <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Content Recommendations</p>
                                    <p className="text-gray-400 text-sm">Personalized video suggestions</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.contentRecommendations}
                                    onChange={(e) => setSettings({ ...settings, contentRecommendations: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Adult Content Filter</p>
                                    <p className="text-gray-400 text-sm">Filter explicit content</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.adultContentFilter}
                                    onChange={(e) => setSettings({ ...settings, adultContentFilter: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                />
                            </label>

                            <button className="text-neon-pink hover:underline text-sm">
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Subscription Section */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-neon-pink" />
                            <h2 className="text-xl font-semibold text-white">Subscription</h2>
                        </div>

                        <div>
                            <p className="text-gray-400 mb-4">You are currently on the <span className="text-white font-semibold">Free Plan</span></p>
                            <button className="bg-gradient-to-r from-violet-deep to-neon-pink text-white font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,27,109,0.4)] transition-all">
                                Upgrade to Premium
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="backdrop-blur-xl bg-red-500/[0.05] border border-red-500/20 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>

                        <div className="space-y-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Log Out
                            </button>

                            <button
                                onClick={handleDeleteAccount}
                                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
