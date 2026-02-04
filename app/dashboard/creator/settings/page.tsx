"use client";

import { useState } from "react";
import { signOut } from "@/lib/actions/auth.actions";
import Navbar from "@/components/layout/Navbar";
import { Settings as SettingsIcon, Bell, Shield, DollarSign, LogOut } from "lucide-react";

export default function CreatorSettingsPage() {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        autoPublish: false,
        allowComments: true,
        allowDownloads: false,
    });

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <SettingsIcon className="w-8 h-8 text-neon-pink" />
                    <h1 className="text-3xl font-bold text-white font-kanit">Creator Settings</h1>
                </div>

                <div className="space-y-6">
                    {/* Notifications */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-6 h-6 text-neon-pink" />
                            <h2 className="text-xl font-semibold text-white">Notifications</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Email Notifications</p>
                                    <p className="text-gray-400 text-sm">Receive updates about your content</p>
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
                                    <p className="text-gray-400 text-sm">Browser notifications for new activity</p>
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

                    {/* Content Settings */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-neon-pink" />
                            <h2 className="text-xl font-semibold text-white">Content Settings</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Auto-Publish</p>
                                    <p className="text-gray-400 text-sm">Automatically publish uploaded videos</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.autoPublish}
                                    onChange={(e) => setSettings({ ...settings, autoPublish: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Allow Comments</p>
                                    <p className="text-gray-400 text-sm">Let viewers comment on your videos</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.allowComments}
                                    onChange={(e) => setSettings({ ...settings, allowComments: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">Allow Downloads</p>
                                    <p className="text-gray-400 text-sm">Premium subscribers can download</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.allowDownloads}
                                    onChange={(e) => setSettings({ ...settings, allowDownloads: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-neon-pink focus:ring-neon-pink/20"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Payout Settings */}
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign className="w-6 h-6 text-gold" />
                            <h2 className="text-xl font-semibold text-white">Payout Settings</h2>
                        </div>

                        <div className="space-y-4">
                            <button className="text-neon-pink hover:underline text-sm">
                                Configure Payout Method
                            </button>
                            <p className="text-gray-400 text-sm">Minimum payout: $50.00</p>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="backdrop-blur-xl bg-red-500/[0.05] border border-red-500/20 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-red-400 mb-4">Account Actions</h2>

                        <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
