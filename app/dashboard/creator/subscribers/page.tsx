"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { Users, Mail, UserCheck, UserX, Search } from "lucide-react";

export default function CreatorSubscribersPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        loadSubscribers();
    }, []);

    async function loadSubscribers() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from("subscriptions")
            .select(`
        *,
        profiles (username, avatar_url, created_at)
      `)
            .eq("creator_id", user.id)
            .eq("status", "active")
            .order("started_at", { ascending: false });

        setSubscribers(data || []);
        setLoading(false);
    }

    const filteredSubscribers = subscribers.filter(sub =>
        sub.profiles.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Users className="w-8 h-8 text-neon-pink" />
                    <h1 className="text-3xl font-bold text-white font-kanit">Subscribers</h1>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Total Subscribers</p>
                        <h3 className="text-3xl font-bold text-white">{subscribers.length}</h3>
                    </div>
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">New This Month</p>
                        <h3 className="text-3xl font-bold text-green-400">
                            {subscribers.filter(s => {
                                const startDate = new Date(s.started_at);
                                const monthAgo = new Date();
                                monthAgo.setMonth(monthAgo.getMonth() - 1);
                                return startDate > monthAgo;
                            }).length}
                        </h3>
                    </div>
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-2">Active Rate</p>
                        <h3 className="text-3xl font-bold text-white">98.5%</h3>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search subscribers..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-pink/50 focus:ring-2 focus:ring-neon-pink/20 transition-all"
                        />
                    </div>
                </div>

                {/* Subscribers List */}
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : filteredSubscribers.length === 0 ? (
                    <div className="text-center py-20">
                        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">
                            {searchTerm ? "No subscribers found" : "No subscribers yet"}
                        </p>
                    </div>
                ) : (
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Subscriber</th>
                                        <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Tier</th>
                                        <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Since</th>
                                        <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
                                        <th className="text-right text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubscribers.map((sub) => (
                                        <tr key={sub.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center">
                                                        <Users className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{sub.profiles.username}</p>
                                                        <p className="text-gray-400 text-xs">Member since {new Date(sub.profiles.created_at).getFullYear()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-pink/20 text-neon-pink capitalize">
                                                    {sub.tier}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">
                                                {new Date(sub.started_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-2 text-green-400">
                                                    <UserCheck className="w-4 h-4" />
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-white transition-colors">
                                                    <Mail className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
