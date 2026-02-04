"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Search as SearchIcon, Filter, X, SlidersHorizontal } from "lucide-react";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: "all",
        quality: "all",
        duration: "all",
        uploadDate: "all",
    });

    const categories = [
        "All Categories",
        "Fitness",
        "Cosplay",
        "Artistic",
        "Fashion",
        "4K Premium",
        "VIP Elite",
        "Lifestyle",
        "Solo",
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log("Searching for:", searchQuery, filters);
    };

    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            <section className="pt-32 pb-12 px-4 container mx-auto">
                {/* Search Header */}
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-kanit mb-6 text-center">
                        Search{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-neon-pink to-crimson">
                            DesireHub
                        </span>
                    </h1>
                    <p className="text-gray-400 text-center mb-8">
                        Discover thousands of videos, creators, and exclusive content
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <SearchIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for videos, creators, categories..."
                                className="w-full pl-16 pr-32 py-5 bg-gray-900/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-transparent transition-all backdrop-blur-sm"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="gap-2"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </Button>
                                <Button type="submit" size="sm" className="bg-neon-pink hover:bg-neon-pink/80">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="mb-6 p-6 bg-gray-900/50 border border-white/10 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-semibold flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-neon-pink" />
                                    Advanced Filters
                                </h3>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat.toLowerCase()}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quality Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Quality
                                    </label>
                                    <select
                                        value={filters.quality}
                                        onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
                                    >
                                        <option value="all">All Qualities</option>
                                        <option value="8k">8K Ultra HD</option>
                                        <option value="4k">4K Ultra HD</option>
                                        <option value="hd">Full HD 1080p</option>
                                        <option value="sd">Standard</option>
                                    </select>
                                </div>

                                {/* Duration Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Duration
                                    </label>
                                    <select
                                        value={filters.duration}
                                        onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
                                    >
                                        <option value="all">Any Duration</option>
                                        <option value="short">Under 10 min</option>
                                        <option value="medium">10-30 min</option>
                                        <option value="long">Over 30 min</option>
                                    </select>
                                </div>

                                {/* Upload Date Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Upload Date
                                    </label>
                                    <select
                                        value={filters.uploadDate}
                                        onChange={(e) => setFilters({ ...filters, uploadDate: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
                                    >
                                        <option value="all">All Time</option>
                                        <option value="today">Today</option>
                                        <option value="week">This Week</option>
                                        <option value="month">This Month</option>
                                        <option value="year">This Year</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFilters({
                                        category: "all",
                                        quality: "all",
                                        duration: "all",
                                        uploadDate: "all",
                                    })}
                                >
                                    Reset Filters
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={handleSearch}
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Popular Searches */}
                    <div className="text-center">
                        <p className="text-gray-500 text-sm mb-3">Popular searches:</p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {["4K Videos", "Top Creators", "New Content", "Premium Shows", "Verified", "Exclusive"].map((term) => (
                                <button
                                    key={term}
                                    onClick={() => setSearchQuery(term)}
                                    className="px-4 py-2 rounded-full bg-violet-deep/20 text-violet-deep border border-violet-deep/30 hover:bg-violet-deep/30 hover:border-violet-deep/50 transition-all duration-200 text-sm font-medium"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Search Results Placeholder */}
            <section className="pb-20 px-4 container mx-auto">
                <div className="max-w-4xl mx-auto text-center py-20">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-violet-deep/20 to-neon-pink/20 mb-6">
                        <SearchIcon className="w-12 h-12 text-neon-pink" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-kanit">
                        Start Your Search
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Enter keywords above to discover amazing content from our premium creators
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
