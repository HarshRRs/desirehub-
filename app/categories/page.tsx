import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Grid3x3, Play, TrendingUp, Sparkles, Dumbbell, Palette, Crown, Star, Zap, Heart } from "lucide-react";
import Link from "next/link";
import { categoriesMetadata } from "@/lib/seo";

export const metadata = categoriesMetadata;

const categories = [
    {
        id: "amateur",
        name: "Amateur",
        description: "Real homemade content from verified couples and solo creators",
        icon: Heart,
        videoCount: 5240,
        color: "from-pink-500 to-rose-500",
        bgGradient: "from-pink-500/20 to-rose-500/20",
    },
    {
        id: "milf",
        name: "MILF",
        description: "Experienced and mature women",
        icon: Crown,
        videoCount: 3156,
        color: "from-purple-500 to-indigo-500",
        bgGradient: "from-purple-500/20 to-indigo-500/20",
    },
    {
        id: "teen",
        name: "Teen (18+)",
        description: "Young legal adults 18+ only",
        icon: Sparkles,
        videoCount: 4876,
        color: "from-blue-400 to-cyan-500",
        bgGradient: "from-blue-400/20 to-cyan-500/20",
    },
    {
        id: "hentai",
        name: "Hentai & Anime",
        description: "Animated adult content and 3D art",
        icon: Palette,
        videoCount: 1543,
        color: "from-orange-500 to-red-500",
        bgGradient: "from-orange-500/20 to-red-500/20",
    },
    {
        id: "vr",
        name: "VR Experience",
        description: "Immersive virtual reality adult content",
        icon: Zap,
        videoCount: 987,
        color: "from-cyan-500 to-blue-600",
        bgGradient: "from-cyan-500/20 to-blue-600/20",
    },
    {
        id: "anal",
        name: "Anal",
        description: "Backdoor action and deep exploration",
        icon: TrendingUp,
        videoCount: 2654,
        color: "from-red-600 to-crimson",
        bgGradient: "from-red-600/20 to-crimson/20",
    },
    {
        id: "lesbian",
        name: "Lesbian",
        description: "Girl on girl action",
        icon: Heart,
        videoCount: 3341,
        color: "from-fuchsia-500 to-pink-600",
        bgGradient: "from-fuchsia-500/20 to-pink-600/20",
    },
    {
        id: "bbw",
        name: "BBW",
        description: "Beautiful curvy women",
        icon: Star,
        videoCount: 1432,
        color: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-500/20 to-orange-600/20",
    },
    {
        id: "solo",
        name: "Solo",
        description: "Masturbation and solo play",
        icon: Play,
        videoCount: 6421,
        color: "from-violet-500 to-purple-600",
        bgGradient: "from-violet-500/20 to-purple-600/20",
    },
    {
        id: "trans",
        name: "Trans",
        description: "Transgender and shemale content",
        icon: Sparkles,
        videoCount: 1230,
        color: "from-sky-400 to-pink-400",
        bgGradient: "from-sky-400/20 to-pink-400/20",
    },
    {
        id: "group",
        name: "Group Sex",
        description: "Threesomes, orgies, and gangbangs",
        icon: Grid3x3,
        videoCount: 1890,
        color: "from-emerald-500 to-green-600",
        bgGradient: "from-emerald-500/20 to-green-600/20",
    },
    {
        id: "fetish",
        name: "Fetish & BDSM",
        description: "Kink, bondage, and roleplay",
        icon: Dumbbell,
        videoCount: 2100,
        color: "from-gray-600 to-gray-800",
        bgGradient: "from-gray-600/20 to-gray-800/20",
    },
];

function formatNumber(num: number): string {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
}

export default function CategoriesPage() {
    return (
        <main className="min-h-screen bg-midnight">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4 container mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-violet-deep to-neon-pink">
                        <Grid3x3 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-kanit">
                            Browse Categories
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Explore content by your favorite categories
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="pb-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                        const IconComponent = category.icon;

                        return (
                            <Link
                                key={category.id}
                                href={`/categories/${category.id}`}
                                className="group block"
                            >
                                <div className="relative h-full bg-gray-900/50 rounded-xl overflow-hidden border border-white/5 hover:border-neon-pink/50 transition-all duration-300 backdrop-blur-sm">
                                    {/* Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />

                                    {/* Content */}
                                    <div className="relative p-6 flex flex-col h-full">
                                        {/* Icon */}
                                        <div className="mb-4">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${category.color} shadow-lg`}>
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Category Info */}
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white font-kanit mb-2 group-hover:text-neon-pink transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-300 text-sm mb-4">
                                                {category.description}
                                            </p>
                                        </div>

                                        {/* Stats & Action */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Play className="w-4 h-4" />
                                                <span className="text-sm">
                                                    {formatNumber(category.videoCount)} videos
                                                </span>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-neon-pink hover:bg-neon-pink/10 group-hover:translate-x-1 transition-transform"
                                            >
                                                Explore →
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300 pointer-events-none`} />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Popular Tags */}
                <div className="mt-16 pt-12 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white font-kanit mb-6">
                        Popular Tags
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            "Premium", "Exclusive", "4K", "New", "Trending", "Solo",
                            "Creative", "BTS", "Tutorial", "Live", "Interactive", "Custom",
                            "Verified", "Top Rated", "Award Winning", "Popular", "Hot", "Featured"
                        ].map((tag) => (
                            <Link
                                key={tag}
                                href={`/search?tag=${tag.toLowerCase()}`}
                                className="px-4 py-2 rounded-full bg-violet-deep/20 text-violet-deep border border-violet-deep/30 hover:bg-violet-deep/30 hover:border-violet-deep/50 transition-all duration-200 text-sm font-medium"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
