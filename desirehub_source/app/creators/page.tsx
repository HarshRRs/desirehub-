import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Search, Star, Heart } from "lucide-react";
import Link from "next/link";

export default function CreatorsPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white font-kanit mb-4">Top Creators</h1>
                    <p className="text-gray-400">Discover the most popular talent on DesireHub.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {["All", "Popular", "New", "Trending", "Verified"].map((filter) => (
                        <Button key={filter} variant="outline" className="rounded-full px-6">
                            {filter}
                        </Button>
                    ))}
                </div>

                {/* Creators Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-all">
                            {/* Cover Image */}
                            <div className="h-32 bg-gradient-to-r from-violet-deep to-crimson opacity-50" />

                            {/* Avatar */}
                            <div className="absolute top-16 left-1/2 -translate-x-1/2">
                                <div className="w-24 h-24 rounded-full border-4 border-midnight overflow-hidden bg-gray-800">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Creator" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="pt-12 pb-6 px-4 text-center">
                                <h3 className="text-xl font-bold text-white font-kanit mb-1">Creator Name {i}</h3>
                                <p className="text-neon-pink text-sm mb-4">@creator_handle</p>

                                <div className="flex justify-center gap-4 mb-6 text-sm text-gray-400">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">125K</span>
                                        <span>Subscribers</span>
                                    </div>
                                    <div className="w-px bg-white/10" />
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">450</span>
                                        <span>Videos</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 justify-center">
                                    <Button size="sm" className="w-full">Subscribe</Button>
                                    <Button size="sm" variant="outline" className="px-3">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
