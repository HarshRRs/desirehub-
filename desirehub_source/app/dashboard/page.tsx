import { Play, Clock, Heart } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-white font-kanit mb-2">
                    Welcome back, <span className="text-neon-pink">John</span>
                </h1>
                <p className="text-gray-400">Here's what's happening in your world of desire.</p>
            </div>

            {/* Continue Watching */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-neon-pink" />
                    <h2 className="text-xl font-bold text-white font-kanit">Continue Watching</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-10 h-10 text-white/50 group-hover:text-white transition-colors" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                                <div className="h-full bg-neon-pink" style={{ width: '45%' }} />
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                                12:45 remaining
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recommended */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-crimson" />
                        <h2 className="text-xl font-bold text-white font-kanit">Recommended For You</h2>
                    </div>
                    <Link href="/dashboard/explore" className="text-sm text-neon-pink hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Link key={i} href={`/watch/${i}`} className="group block">
                            <div className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden border border-white/5 group-hover:border-neon-pink/50 transition-all mb-3">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-neon-pink transition-colors">
                                        Exclusive Scene Title {i}
                                    </h3>
                                    <p className="text-gray-400 text-sm">Creator Name</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
