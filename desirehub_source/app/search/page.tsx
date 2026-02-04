import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, Play } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-20">
                {/* Search Header */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search videos, models, categories..."
                            className="pl-10 bg-white/5 border-white/10 focus:border-neon-pink"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                            <Filter className="w-4 h-4" /> Filters
                        </Button>
                        {["Latest", "Most Viewed", "Top Rated", "Longest"].map((filter) => (
                            <Button key={filter} variant="ghost" size="sm" className="text-gray-400 hover:text-white whitespace-nowrap">
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Link key={i} href={`/watch/${i}`} className="group block">
                            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 group-hover:border-neon-pink/50 transition-all mb-3">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                {/* Duration Badge */}
                                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs text-white font-medium">
                                    12:45
                                </div>

                                {/* Play Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 rounded-full bg-neon-pink/80 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(255,0,127,0.5)]">
                                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0" />
                                <div>
                                    <h3 className="text-white font-bold text-base leading-tight mb-1 group-hover:text-neon-pink transition-colors line-clamp-2">
                                        Search Result Video Title {i}
                                    </h3>
                                    <p className="text-gray-400 text-xs hover:text-white transition-colors">Creator Name</p>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                        <span>125K views</span>
                                        <span>•</span>
                                        <span>2 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <Button variant="outline" className="mx-auto">Load More Results</Button>
                </div>
            </div>
        </main>
    );
}
