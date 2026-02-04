import { Button } from "@/components/ui/Button";
import { Play, Heart, Share2, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function CreatorProfilePage() {
    return (
        <div className="space-y-8">
            {/* Cover & Header */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-r from-violet-deep to-crimson">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                    <div className="flex items-end gap-6">
                        <div className="w-32 h-32 rounded-full border-4 border-midnight overflow-hidden bg-gray-800 -mb-12 relative z-10">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Angelina" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="mb-2">
                            <h1 className="text-3xl font-bold text-white font-kanit">Angelina Rose</h1>
                            <p className="text-neon-pink">@angelinarose</p>
                        </div>
                    </div>
                    <div className="flex gap-3 mb-2">
                        <Button className="gap-2">
                            <Heart className="w-4 h-4" /> Subscribe
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <MessageSquare className="w-4 h-4" /> Message
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats & Bio */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex gap-8 text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div>
                            <p className="text-2xl font-bold text-white font-kanit">125K</p>
                            <p className="text-sm text-gray-400">Subscribers</p>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <p className="text-2xl font-bold text-white font-kanit">450</p>
                            <p className="text-sm text-gray-400">Videos</p>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <p className="text-2xl font-bold text-white font-kanit">12.5M</p>
                            <p className="text-sm text-gray-400">Total Views</p>
                        </div>
                    </div>

                    {/* Videos Grid */}
                    <div>
                        <h2 className="text-xl font-bold text-white font-kanit mb-6">Latest Videos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <Link key={i} href={`/watch/${i}`} className="group block">
                                    <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 group-hover:border-neon-pink/50 transition-all mb-3">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Play className="w-10 h-10 text-white fill-current" />
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold group-hover:text-neon-pink transition-colors">
                                        Latest Video Title {i}
                                    </h3>
                                    <p className="text-sm text-gray-400">2 days ago • 15K views</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-bold text-white font-kanit mb-4">About Me</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Professional model and content creator. I love creating artistic and sensual content for my fans. Subscribe for exclusive behind-the-scenes and daily updates!
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-lg font-bold text-white font-kanit mb-4">Links</h3>
                        <div className="space-y-3">
                            <a href="#" className="block text-neon-pink hover:underline">Instagram</a>
                            <a href="#" className="block text-neon-pink hover:underline">Twitter / X</a>
                            <a href="#" className="block text-neon-pink hover:underline">Official Website</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
