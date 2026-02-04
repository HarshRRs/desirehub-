"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Users, Star, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        loadSubscriptions();
    }, []);

    async function loadSubscriptions() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login");
            return;
        }

        const { data } = await supabase
            .from("subscriptions")
            .select(`
        *,
        creators (
          *,
          profiles (username, avatar_url, bio)
        )
      `)
            .eq("user_id", user.id)
            .eq("status", "active");

        setSubscriptions(data || []);
        setLoading(false);
    }

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Star className="w-8 h-8 text-gold fill-gold" />
                    <h1 className="text-3xl font-bold text-white font-kanit">My Subscriptions</h1>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 bg-white/5 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : subscriptions.length === 0 ? (
                    <div className="text-center py-20">
                        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No active subscriptions</p>
                        <p className="text-gray-500 mt-2">Subscribe to creators to support them</p>
                        <Link
                            href="/categories"
                            className="inline-block mt-6 bg-gradient-to-r from-violet-deep to-neon-pink text-white font-semibold px-8 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,27,109,0.4)] transition-all"
                        >
                            Discover Creators
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subscriptions.map((sub) => (
                            <div
                                key={sub.id}
                                className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-neon-pink/50 transition-all"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-deep to-neon-pink flex items-center justify-center">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{sub.creators.profiles.username}</h3>
                                        <p className="text-gray-400 text-sm">{sub.tier} tier</p>
                                    </div>
                                </div>

                                {sub.creators.profiles.bio && (
                                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{sub.creators.profiles.bio}</p>
                                )}

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">
                                        Since {new Date(sub.started_at).toLocaleDateString()}
                                    </span>
                                    <Link
                                        href={`/creator/${sub.creators.profiles.username}`}
                                        className="text-neon-pink hover:underline"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
