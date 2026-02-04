import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { TrendingUp, Play, Calendar, Eye } from "lucide-react";
import Link from "next/link";

export default function TrendingPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20">
                <div className="flex items-center gap-3 mb-10">
                    <TrendingUp className="w-8 h-8 text-neon-pink" />
                    <h1 className="text-4xl font-bold text-white font-kanit">Trending Now</h1>
                </div>

                {/* Time Filters */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {["Today", "This Week", "This Month", "All Time"].map((filter, i) => (
                        <Button
                            key={filter}
                            variant={i === 0 ? "default" : "outline"}
                            size="sm"
                            className="rounded-full whitespace-nowrap"
                        >
                            {filter}
                        </Button>
                    ))}
                </div>

                {/* Trending List */}
                <div className="space-y-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <Link key={i} href={`/watch/${i}`} className="flex flex-col sm:flex-row gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                            {/* Rank Number */}
                            <div className="hidden sm:flex items-center justify-center w-8 text-2xl font-bold text-gray-600 font-kanit">
                                {i}
                            </div>

                            {/* Thumbnail */}
                            <div className="relative w-full sm:w-64 aspect-video bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-all">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-10 h-10 text-white fill-current" />
                                </div>
                                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white font-medium">
                                    18:30
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 py-2">
                                <h3 className="text-lg font-bold text-white font-kanit mb-2 group-hover:text-neon-pink transition-colors line-clamp-2">
                                    Trending Video Title #{i} - Exclusive Content
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                    <span className="text-white hover:underline">Creator Name</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 250K views</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 2 days ago</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 hidden sm:block">
                                    This is a brief description of the trending video content. It gives users a preview of what to expect...
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
