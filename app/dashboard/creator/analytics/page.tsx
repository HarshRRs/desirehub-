"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { BarChart3, TrendingUp, Eye, Heart, Users, DollarSign } from "lucide-react";

export default function CreatorAnalyticsPage() {
    const [stats, setStats] = useState({
        totalViews: 0,
        totalLikes: 0,
        totalSubscribers: 0,
        totalEarnings: 0,
        viewsThisMonth: 0,
        newSubscribers: 0,
    });
    const supabase = createClient();

    useEffect(() => {
        loadAnalytics();
    }, []);

    async function loadAnalytics() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get creator data
        const { data: creator } = await supabase
            .from("creators")
            .select("*")
            .eq("id", user.id)
            .single();

        // Get video stats
        const { data: videos } = await supabase
            .from("videos")
            .select("views_count, likes_count")
            .eq("creator_id", user.id);

        const totalViews = videos?.reduce((sum, v) => sum + v.views_count, 0) || 0;
        const totalLikes = videos?.reduce((sum, v) => sum + v.likes_count, 0) || 0;

        setStats({
            totalViews,
            totalLikes,
            totalSubscribers: creator?.subscriber_count || 0,
            totalEarnings: parseFloat(creator?.total_earnings || "0"),
            viewsThisMonth: Math.floor(totalViews * 0.3), // Mock data
            newSubscribers: Math.floor((creator?.subscriber_count || 0) * 0.1), // Mock data
        });
    }

    const statCards = [
        {
            label: "Total Views",
            value: stats.totalViews.toLocaleString(),
            change: "+12.5%",
            icon: Eye,
            gradient: "from-blue-500 to-blue-600",
        },
        {
            label: "Total Likes",
            value: stats.totalLikes.toLocaleString(),
            change: "+8.2%",
            icon: Heart,
            gradient: "from-neon-pink to-crimson",
        },
        {
            label: "Subscribers",
            value: stats.totalSubscribers.toLocaleString(),
            change: `+${stats.newSubscribers}`,
            icon: Users,
            gradient: "from-violet-deep to-purple-600",
        },
        {
            label: "Total Earnings",
            value: `$${stats.totalEarnings.toFixed(2)}`,
            change: "+15.3%",
            icon: DollarSign,
            gradient: "from-gold to-amber-600",
        },
    ];

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <BarChart3 className="w-8 h-8 text-neon-pink" />
                    <h1 className="text-3xl font-bold text-white font-kanit">Analytics</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Views Over Time</h3>
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            Chart placeholder - integrate Chart.js or Recharts
                        </div>
                    </div>

                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Videos</h3>
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            Chart placeholder - integrate Chart.js or Recharts
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
